import { ExternalLink, Github, Code, Shield, Database, Network, AlertTriangle, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type ComponentType } from 'react';
import C2Visualization from '../components/C2Visualization';
import ArbitrageVisualization from '../components/ArbitrageVisualization';
import WebAppPenTestingViz from '../components/WebAppPenTestingViz';
import NetworkSecurityScannerViz from '../components/NetworkSecurityScannerViz';
import PasswordManagerViz from '../components/PasswordManagerViz';
import SecurityEventAnalysisViz from '../components/SecurityEventAnalysisViz';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/LanguageContext';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  codeLink: string;
  icon: LucideIcon;
  visualization: ComponentType;
}

const projects: Project[] = [
  {
    title: 'Distributed Agent Management System (C2)',
    description: 'A comprehensive Command & Control dashboard built with Node.js. Automates the deployment of agents, manages dynamic SOCKS5 proxy routing to evade detection, and provides real-time telemetry and secure session management.',
    technologies: ['Node.js', 'Socket.IO', 'Discord API', 'OPSEC'],
    codeLink: 'https://github.com/dexsterr/Node.js-Botnet-C2-Dashboard-PoC-',
    icon: Network,
    visualization: C2Visualization,
  },
  {
    title: 'Automated Market Arbitrage System',
    description: 'An event-driven, high-frequency automation framework. Performs rapid market data analysis, parses complex metadata via Regex, and executes trades autonomously with robust error handling and network latency optimization.',
    technologies: ['Node.js', 'Data Parsing', 'Automation', 'Network Optimization'],
    codeLink: 'https://github.com/dexsterr/automated-market-arbitrage-bot',
    icon: Database,
    visualization: ArbitrageVisualization,
  },
  {
    title: 'Web Application Penetration Testing Tool',
    description: 'An automated tool for detecting common web vulnerabilities including SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal, and missing HTTP security headers.',
    technologies: ['Python', 'Requests', 'BeautifulSoup'],
    codeLink: 'https://github.com/dexsterr/Web-Application-Penetration-Testing-Tool',
    icon: Code,
    visualization: WebAppPenTestingViz,
  },
  {
    title: 'Network Security Scanner',
    description: 'A concise network vulnerability scanner built with Python. Detects open ports, services, and potential security issues, identifies devices, and alerts on ARP spoofing.',
    technologies: ['Python', 'Nmap', 'Scapy', 'Tkinter'],
    codeLink: 'https://github.com/dexsterr/network-security-scanner',
    icon: Network,
    visualization: NetworkSecurityScannerViz,
  },
  {
    title: 'Encrypted Password Manager',
    description: 'A secure password manager with AES encryption, master password protection, and secure password generation, requiring user authentication.',
    technologies: ['Python', 'Cryptography', 'SQLite'],
    codeLink: 'https://github.com/dexsterr/encrypted-password-manager',
    icon: Shield,
    visualization: PasswordManagerViz,
  },
  {
    title: 'Security Event Analysis Automation Tool',
    description: 'SOC analyst toolkit that automates IOC investigation, phishing email analysis, brand monitoring, and threat validation to improve incident response times.',
    technologies: ['Python', 'IOC', 'Automation', 'Threat Intelligence'],
    codeLink: 'https://github.com/dexsterr/Security-Event-Analysis-Automation-Tool',
    icon: AlertTriangle,
    visualization: SecurityEventAnalysisViz,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useT();
  return (
  <article className="glass-card p-6 h-full flex flex-col group">
    <div
      className="relative mb-5 h-56 rounded-xl overflow-hidden border border-green-500/15 bg-[#06100c]"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 50px rgba(0,0,0,0.6)' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent z-10" />
      <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500/60" />
        <span className="h-2 w-2 rounded-full bg-green-500/25" />
        <span className="h-2 w-2 rounded-full bg-green-500/25" />
      </div>
      <span className="pointer-events-none absolute top-3 right-3 z-10 font-mono text-[0.6rem] uppercase tracking-widest text-green-400/40">
        {String(index + 1).padStart(2, '0')} / live
      </span>
      <project.visualization />
    </div>

    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-xl bg-green-500/15 border border-green-500/20 transition-colors group-hover:bg-green-500/25">
        <project.icon className="text-green-400" size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors leading-snug">
          {t(project.title)}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{t(project.description)}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-5">
      {project.technologies.map((tech) => (
        <span key={tech} className="tag">{tech}</span>
      ))}
    </div>

    <div className="mt-auto flex">
      <a
        href={project.codeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-green-500/25 px-4 py-2 text-sm text-gray-200 font-mono transition-all hover:border-green-400/60 hover:text-green-300 hover:bg-green-500/10"
      >
        <Github size={18} />
        <span>{t('View Code')}</span>
      </a>
    </div>
  </article>
  );
};

const Portfolio = () => {
  const { t } = useT();
  const [horizontal, setHorizontal] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [wrapHeight, setWrapHeight] = useState<number | undefined>(undefined);

  // decide mode + wire the pinned horizontal translate
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let distance = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const vw = window.innerWidth;
      distance = Math.max(0, track.scrollWidth - vw);
      setWrapHeight(window.innerHeight + distance);
    };

    const onScroll = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track || distance === 0) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const top = wrap.getBoundingClientRect().top + window.scrollY;
        const p = Math.min(1, Math.max(0, (window.scrollY - top) / distance));
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
      });
    };

    const activate = () => {
      const on = mqDesktop.matches && !reduced;
      setHorizontal(on);
      if (on) {
        // measure after layout settles
        setTimeout(() => { measure(); onScroll(); }, 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
      } else {
        setWrapHeight(undefined);
        if (trackRef.current) trackRef.current.style.transform = '';
      }
    };

    activate();
    mqDesktop.addEventListener('change', activate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      mqDesktop.removeEventListener('change', activate);
    };
  }, []);

  return (
    <section id="portfolio" className="relative z-10 scroll-mt-24">
      {/* header */}
      <div className="container mx-auto px-6 pt-24 relative">
        <span className="section-index crt">01</span>
        <Reveal>
          <p className="font-mono text-sm text-green-400/60 mb-3">// 01 — selected work</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight">
            {t('Selected')} <span className="gradient-text">{t('Work')}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl">
            {t("A collection of cybersecurity projects and tools I've developed to enhance digital security and demonstrate my skills.")}
          </p>
        </Reveal>
      </div>

      {/* showcase: horizontal pinned on desktop, vertical grid otherwise */}
      {horizontal ? (
        <div ref={wrapRef} style={{ height: wrapHeight }} className="relative mt-10">
          <div className="h-pin">
            <div ref={trackRef} className="h-track">
              {projects.map((project, index) => (
                <div key={index} className="h-card">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div ref={wrapRef} className="container mx-auto px-6 mt-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Reveal key={index} delay={(index % 2) * 90}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* footer link */}
      <div className="container mx-auto px-6">
        <Reveal className="text-center mt-16 py-8">
          <p className="text-gray-400 text-lg mb-4">
            {t('If you want to see more of my projects, the link is here:')}
          </p>
          <a
            href="https://github.com/dexsterr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/5 px-6 py-3 text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-all text-lg font-semibold"
          >
            <Github size={24} />
            <span>{t('GitHub Profile')}</span>
            <ExternalLink size={20} />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Portfolio;
