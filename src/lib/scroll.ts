import { getLenis } from '../components/SmoothScroll';

/** Smooth-scroll to a section id, accounting for the fixed 64px header. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
