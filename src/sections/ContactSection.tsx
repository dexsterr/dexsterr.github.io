import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import { useT } from '../i18n/LanguageContext';

const ContactSection = () => {
  const { t } = useT();
  return (
    <section id="contact" className="container mx-auto px-6 py-32 relative z-10 scroll-mt-24">
      <span className="section-index crt">03</span>
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="font-mono text-sm text-green-400/60 mb-5">// 03 — contact</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            {t("Let's")} <span className="gradient-text">{t('talk.')}</span>
          </h2>
          <p className="mt-8 text-gray-400 text-lg max-w-xl mx-auto">
            {t('Interested in collaborating or have questions about cybersecurity? Feel free to reach out.')}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <MagneticButton className="inline-block mt-12">
            <a
              href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=oskarchudoba@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-green-500 px-10 py-5 text-lg font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(34,210,120,0.5)]"
            >
              <Mail size={22} />
              <span>oskarchudoba@gmail.com</span>
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </MagneticButton>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 flex items-center justify-center gap-5">
            {[
              { href: 'https://github.com/dexsterr', label: 'GitHub', Icon: Github },
              { href: 'https://www.linkedin.com/in/oskar-chudoba-474849340/', label: 'LinkedIn', Icon: Linkedin },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-green-500/20 px-5 py-2.5 font-mono text-sm text-gray-300 transition-colors hover:border-green-400/50 hover:text-green-300"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-600">
          <span>© {new Date().getFullYear()} Oskar Chudoba</span>
          <span>{t('Cybersecurity · SOC Analyst · Blue Team')}</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
