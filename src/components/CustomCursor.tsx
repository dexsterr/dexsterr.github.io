import { useEffect, useRef } from 'react';

/**
 * Two-part cursor: a small solid dot that tracks 1:1 and a larger ring that
 * lags with easing. The ring grows and brightens over interactive elements.
 * Disabled on touch / coarse pointers and under prefers-reduced-motion.
 */
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    document.body.classList.add('has-custom-cursor');
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest('a, button, [data-cursor="hover"], input, textarea');
      if (interactive !== hovering) {
        hovering = interactive;
        ring.classList.toggle('cursor-hover', hovering);
      }
    };

    let raf = 0;
    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = () => ring.classList.add('cursor-down');
    const onUp = () => ring.classList.remove('cursor-down');
    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
