import { useEffect, useState } from 'react';
import { scrollToSection } from '../lib/scroll';
import { useT } from '../i18n/LanguageContext';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Fixed top bar for the single-page scroll. Clicking a link smooth-scrolls to
 * its section (scroll-margin on each section handles the header offset). The
 * active link tracks the section crossing the viewport's vertical centre via
 * one IntersectionObserver. A scroll-progress line sits under the bar.
 */
const Navigation = () => {
  const { t } = useT();
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => scrollToSection(id);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="bg-black/80 border-b border-white/5">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => go('home')}
            className="group flex items-center gap-2 font-display font-bold tracking-wider text-sm"
          >
            <span className="grid place-items-center h-7 w-7 rounded-md border border-green-400/40 text-green-400">OC</span>
            <span className="hidden sm:inline text-white/80 group-hover:text-green-400 transition-colors">OSKAR CHUDOBA</span>
          </button>

          <div className="flex items-center gap-1">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`relative px-3 sm:px-4 py-2 text-sm font-mono transition-colors ${
                  active === id ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {active === id && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-green-400 shadow-[0_0_8px_rgba(34,210,120,0.8)]" />
                )}
                {t(label)}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="h-px bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-300 origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
};

export default Navigation;
