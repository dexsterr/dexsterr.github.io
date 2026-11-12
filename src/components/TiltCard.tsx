import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
}

/**
 * 3D pointer tilt with a moving specular glare. Writes rotateX/rotateY inline
 * and feeds --mx/--my (for the glass glow) plus --gx/--gy (glare position).
 * Resets smoothly on leave. Disabled effect is harmless on touch (no hover).
 */
const TiltCard = ({ children, className = '', max = 7 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  };

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
};

export default TiltCard;
