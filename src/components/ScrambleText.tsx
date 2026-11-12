import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  /** delay in ms before the scramble begins once in view */
  delay?: number;
  as?: 'span' | 'h1' | 'h2';
}

const CHARS = '!<>-_\\/[]{}—=+*^?#01ABCDEF';

/**
 * Reveals `text` with a decrypt/scramble effect the first time it scrolls into
 * view. Each character locks in left-to-right; unlocked slots flicker through
 * random glyphs. Honours prefers-reduced-motion (renders final text at once).
 */
const ScrambleText = ({ text, className = '', delay = 0, as = 'span' }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setOut(text); return; }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const total = Math.max(18, text.length * 2.5);
      let frame = 0;
      let raf = 0;
      const step = () => {
        frame++;
        const revealed = (frame / total) * text.length;
        let s = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { s += ' '; continue; }
          s += i < revealed ? text[i] : CHARS[(Math.random() * CHARS.length) | 0];
        }
        setOut(s);
        if (frame < total) raf = requestAnimationFrame(step);
        else setOut(text);
      };
      raf = requestAnimationFrame(step);
      cleanup = () => cancelAnimationFrame(raf);
    };

    let cleanup = () => {};
    let timer: number;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timer = window.setTimeout(run, delay);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { io.disconnect(); clearTimeout(timer); cleanup(); };
  }, [text, delay]);

  const Tag = as;
  return <Tag ref={ref as never} className={className} aria-label={text}>{out}</Tag>;
};

export default ScrambleText;
