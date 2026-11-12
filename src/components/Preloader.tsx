import { useEffect, useRef, useState } from 'react';
import { getLenis } from './SmoothScroll';

/**
 * Cinematic boot sequence shown once per session. Runs a fake "decrypt" log
 * while a counter climbs 0→100, then lifts away as a curtain to reveal the
 * site. Session-gated via sessionStorage so navigation doesn't replay it.
 */
const LINES = [
  '> establishing secure channel ...',
  '> handshake [TLS 1.3] ........ OK',
  '> decrypting profile payload ...',
  '> mounting portfolio modules ...',
  '> SOC uplink ................. READY',
];

const Preloader = () => {
  const [done, setDone] = useState(() => {
    try { return sessionStorage.getItem('oc_booted') === '1'; } catch { return false; }
  });
  const [count, setCount] = useState(0);
  const [line, setLine] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = reduced ? 1 : 1100;
    const started = performance.now();
    let raf = 0;

    const unlock = () => {
      document.body.style.overflow = '';
      try { getLenis()?.start(); } catch { /* ignore */ }
    };

    document.body.style.overflow = 'hidden';
    try { getLenis()?.stop(); } catch { /* ignore */ }
    // hard safety: never leave the page locked
    const safety = window.setTimeout(unlock, 3500);

    const tick = (t: number) => {
      const p = Math.min(1, (t - started) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setLine(Math.min(LINES.length - 1, Math.floor(eased * LINES.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem('oc_booted', '1'); } catch { /* ignore */ }
        if (rootRef.current) rootRef.current.classList.add('boot-exit');
        unlock();
        setTimeout(() => setDone(true), reduced ? 0 : 850);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); clearTimeout(safety); unlock(); };
  }, [done]);

  if (done) return null;

  return (
    <div ref={rootRef} className="preloader">
      <div className="preloader-inner">
        <div className="font-mono text-sm text-green-400/80 space-y-1 mb-8 h-32 overflow-hidden">
          {LINES.slice(0, line + 1).map((l, i) => (
            <div key={i} style={{ opacity: i === line ? 1 : 0.5 }}>
              {l}{i === line && <span className="boot-caret">_</span>}
            </div>
          ))}
        </div>
        <div className="flex items-end justify-between gap-6">
          <span className="font-display text-2xl text-white/80 tracking-widest">OSKAR&nbsp;CHUDOBA</span>
          <span className="font-display text-6xl md:text-8xl font-black gradient-text leading-none tabular-nums">
            {String(count).padStart(3, '0')}
          </span>
        </div>
        <div className="mt-4 h-[2px] w-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-cyan-400" style={{ width: `${count}%` }} />
        </div>
      </div>
      <div className="preloader-curtain" />
    </div>
  );
};

export default Preloader;
