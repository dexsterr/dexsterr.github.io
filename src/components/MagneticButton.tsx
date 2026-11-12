import { useRef, type ReactNode, type ElementType } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  strength?: number;
  [key: string]: unknown;
}

/**
 * Wraps an interactive element so it leans toward the pointer while hovered and
 * springs back on leave. Pure transform math; no deps. Falls back to a static
 * element on coarse pointers (the handlers simply never fire via hover there).
 */
const MagneticButton = ({ children, className = '', as, strength = 0.35, ...rest }: Props) => {
  const Tag = (as || 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
