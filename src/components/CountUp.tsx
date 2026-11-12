import { useEffect, useRef, useState } from 'react';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `to` the first time it scrolls into view. */
const CountUp = ({ to, suffix = '', duration = 1300, className = '' }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVal(to); return; }

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref} className={`tnum ${className}`}>{val}{suffix}</span>;
};

export default CountUp;
