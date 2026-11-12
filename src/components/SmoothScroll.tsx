import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/**
 * Inertia smooth-scroll (Lenis). Lenis drives native window scroll, so the
 * page still scrolls natively if JS fails and the CSS fallbacks in index.css
 * keep layout correct. Disabled under prefers-reduced-motion. One instance.
 */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
