import { ArrowRight, Terminal, ShieldCheck, Activity } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import TypingAnimation from '../components/TypingAnimation';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import CountUp from '../components/CountUp';
import { scrollToSection } from '../lib/scroll';
import { useT } from '../i18n/LanguageContext';

const Index = () => {
  const { t } = useT();
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Oskar Chudoba - Cybersecurity';
  }, []);

  // subtle pointer parallax on the avatar cluster
  useEffect(() => {
    const hero = heroRef.current;
    const layer = parallaxRef.current;
    if (!hero || !layer) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      layer.style.transform = `translate3d(${dx * 24}px, ${dy * 24}px, 0)`;
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section ref={heroRef} id="home" className="container mx-auto px-6 min-h-screen flex items-center relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full pt-24 lg:pt-0">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-green-400/70 font-mono text-sm mask-line">
              <span style={{ animationDelay: '0.05s' }}>
                <Terminal size={16} className="inline mb-0.5 mr-1.5" />~/cybersec-portfolio <span className="opacity-50">$ whoami</span>
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              <span className="mask-line"><span className="text-white/90" style={{ animationDelay: '0.1s' }}>{t("Hi, I'm")}</span></span>
              <span className="mask-line"><span className="gradient-text" style={{ animationDelay: '0.22s' }}>Oskar Chudoba</span></span>
            </h1>

            <h2 className="text-xl lg:text-2xl text-gray-400 font-light font-mono mask-line">
              <span style={{ animationDelay: '0.36s' }}><TypingAnimation /></span>
            </h2>

            <p className="text-gray-500 text-base font-mono mask-line">
              <span style={{ animationDelay: '0.46s' }}>{t('21 years old • Passionate about digital security')}</span>
            </p>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
            {t('Cybersecurity student and active SOC Analyst focused on threat detection, incident response, and Blue Team operations.')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MagneticButton strength={0.2}>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-green-500 px-8 py-4 font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(34,210,120,0.45)]"
              >
                <ShieldCheck size={20} />
                <span>{t('View Work')}</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <button
                onClick={() => scrollToSection('about')}
                className="group flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-transparent px-8 py-4 font-semibold text-green-400 transition-colors duration-300 hover:bg-green-500/10"
              >
                <Activity size={20} />
                <span>{t('About Me')}</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>
          </div>

          {/* Stat grid with count-up */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-lg">
            <Stat value={<><CountUp to={6} /></>} label={t('Projects')} />
            <Stat value={<><CountUp to={8} /></>} label={t('Certs')} />
            <Stat value="L1" label={t('SOC Analyst')} />
            <Stat value="24/7" label={t('Blue Team')} />
          </div>
        </div>

        {/* Right Content - Avatar (decorative, non-interactive) */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div ref={parallaxRef} style={{ transition: 'transform 0.3s ease-out' }}>
            <TiltCard max={8} className="relative w-[26rem] h-[26rem] flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full animate-ring-spin"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, hsl(142 80% 50% / 0.45), transparent 45%, hsl(160 70% 48% / 0.35), transparent 85%)',
                  filter: 'blur(16px)',
                }}
              />
              <div className="absolute inset-6 rounded-full border border-green-500/30" style={{ animation: 'ring-spin 26s linear infinite reverse' }} />
              <div className="absolute inset-12 rounded-full border border-dashed border-green-400/15 animate-ring-spin" />

              <div
                className="relative w-72 h-72 overflow-hidden rounded-full border border-green-400/40 bg-black/60"
                style={{ boxShadow: '0 0 50px -12px rgba(34,210,120,0.4), inset 0 0 40px rgba(34,210,120,0.08)' }}
              >
                <img
                  src={`/avatar.gif`}
                  alt="Oskar Chudoba"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center rounded-full"
                  style={{ imageRendering: 'auto', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
                />
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollToSection('portfolio')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-400/50 hover:text-green-400 transition-colors font-mono text-[0.65rem] tracking-widest"
        aria-label="Scroll to work"
      >
        {t('SCROLL')}
        <span className="h-10 w-5 rounded-full border border-green-400/30 grid place-items-start p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-bounce" />
        </span>
      </button>
    </section>
  );
};

const Stat = ({ value, label }: { value: ReactNode; label: string }) => (
  <div className="rounded-xl border border-green-500/10 bg-black/30 px-3 py-3 text-center transition-colors hover:border-green-500/30">
    <div className="font-display text-2xl font-semibold text-green-400">{value}</div>
    <div className="font-mono text-[0.6rem] uppercase tracking-widest text-gray-500">{label}</div>
  </div>
);

export default Index;
