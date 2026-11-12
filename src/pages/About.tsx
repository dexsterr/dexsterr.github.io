import { Award, BookOpen, Code, ExternalLink } from 'lucide-react';
import capgeminiLogo from '@/assets/capgemini.png';
import pgeLogo from '@/assets/pge.svg';
import trecomLogo from '@/assets/trecom.png';
import Reveal from '../components/Reveal';
import { useT } from '../i18n/LanguageContext';

const About = () => {
  const { t } = useT();
  const skills = [
    "Computer disassembly",
    "Threats incidents SIEM",
    "Security SQL fundamentals",
    "Version Control Git",
    "Protocols basic configs",
    "Python/JS/HTML/CSS",
    "Communication Team Collab",
    "Cybersecurity Basics",
    "Linux (CLI/Hardening)",
    "Ticketing via servicecentral",
    "ElasticSearch Log Analysis",
    "Alert Triage & Ticketing",
  ];

  const courses = [
    { name: "CompTIA Cybersecurity Analyst (CySA+)", provider: "CompTIA", status: "2026" },
    { name: "Microsoft Certified: Security Operations Analyst Associate (SC-200)", provider: "Microsoft", status: "2026", link: "https://learn.microsoft.com/en-gb/users/oskarchudoba-9307/credentials/ec125e97a8013f64" },
    { name: "Security Analyst Level 1 (SAL1)", provider: "TryHackMe", status: "2026", link: "https://assets.tryhackme.com/certification-certificate/6a64c1b37d9eef287cebcac0.pdf" },
    { name: "CompTIA Security+", provider: "Comptia", status: "2025", link: "https://www.credly.com/badges/32023631-a420-4515-81d1-75b17e20b890/linked_in_profile" },
    { name: "Git Fundamentals Course", provider: "Boot dev", status: "2025", link: "https://www.youtube.com/watch?si=edccBtgdCJL8gWNH&v=rH3zE7VlIMs&feature=youtu.be" },
    { name: "Python Course", provider: "Bro Code", status: "2025", link: "https://www.youtube.com/watch?v=ix9cRaBkVe0" },
    { name: "Google Cybersecurity Certificate", provider: "Google", status: "2025", link: "https://www.coursera.org/account/accomplishments/specialization/12DQ0E8D3N3N" },
    { name: "IT Technician Vocational Qualification", provider: "EE.08/INF.02", status: "2024" },
  ];

  const statusClass = (status?: string) =>
    status === 'Learning'
      ? 'bg-green-500/20 text-green-400'
      : status?.startsWith('Planned')
      ? 'bg-red-900/40 text-red-600 border border-red-600/50'
      : (status === '2024' || status === '2025' || status === '2026')
      ? 'bg-blue-600 text-white'
      : 'bg-blue-500/20 text-blue-400';

  return (
    <section id="about" className="container mx-auto px-6 py-24 relative z-10 scroll-mt-24">
      <span className="section-index crt">02</span>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="font-mono text-sm text-green-400/60 mb-3">// 02 — profile</p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            {t('About')} <span className="gradient-text">{t('Me')}</span>
          </h2>
          <p className="text-gray-300 text-lg">
            {t('Passionate cybersecurity enthusiast dedicated to protecting digital assets')}
          </p>
          <div className="divider-glow mt-8 max-w-xs mx-auto" />
        </Reveal>

        {/* Bio Section */}
        <Reveal>
          <div className="glass-card border-beam p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-green-500/15"><BookOpen className="text-green-400" size={22} /></span>
              <h2 className="font-display text-2xl font-bold text-white">{t('My Story')}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('Ambitious 21-year-old cybersecurity student and active SOC Analyst. Dedicated to continuous learning in threat detection and incident response, with a strong focus on developing my career in a Blue Team environment. Experienced in utilizing security tools and platforms such as ElasticSearch, Splunk, SecureVisio, Windows Defender, and Wazuh to maintain robust security postures.')}
            </p>
          </div>
        </Reveal>

        {/* Courses Section */}
        <Reveal>
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-green-500/15"><Award className="text-green-400" size={22} /></span>
              <h2 className="font-display text-2xl font-bold text-white">{t('Courses & Certifications')}</h2>
            </div>
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="group flex justify-between items-center p-4 rounded-xl bg-black/40 border border-green-500/10 transition-all duration-300 hover:border-green-500/35 hover:bg-green-500/[0.06] hover:translate-x-1"
                >
                  <div className="flex-1">
                    {course.link ? (
                      <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-green-400 transition-colors flex items-center gap-2">
                        <span>{course.name}</span>
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <h3 className="text-white font-medium">{course.name}</h3>
                    )}
                    <p className="text-gray-400 text-sm font-mono">{course.provider}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ml-4 font-mono ${statusClass(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Skills Section */}
        <Reveal>
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 rounded-lg bg-green-500/15"><Code className="text-green-400" size={22} /></span>
              <h2 className="font-display text-2xl font-bold text-white">{t('Skills & Expertise')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-green-500/20 bg-green-500/[0.07] px-4 py-3 text-center text-sm text-green-300 font-mono transition-all duration-300 hover:border-green-400/50 hover:bg-green-500/15 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(34,210,120,0.5)]"
                >
                  {t(skill)}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Professional Experience Section */}
        <Reveal>
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="p-2 rounded-lg bg-green-500/15"><Award className="text-green-400" size={22} /></span>
              <h2 className="font-display text-2xl font-bold text-white">{t('Professional Experience')}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-400 via-green-400 to-green-500/20" />

              <div className="space-y-8">
                {/* Target Position - SOC Analyst L2 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full relative z-10 mt-6 bg-amber-400/30 border-2 border-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.7)]" />
                  <div className="ml-8 rounded-xl p-6 flex-1 bg-gradient-to-r from-amber-950/90 to-amber-900/50 border border-amber-500/40">
                    <h3 className="text-amber-300 font-semibold text-lg mb-1">SOC Analyst L2</h3>
                    <p className="text-amber-200/80 text-sm mb-2 font-medium font-mono">{t('Target Position')}</p>
                    <p className="text-amber-50/90 text-sm leading-relaxed">
                      {t('Building on my current L1 SOC role, I am actively developing toward Level 2 responsibilities: deeper incident investigation, advanced SIEM correlation and tuning, and stronger threat detection in a Blue Team environment. I study and certify continuously to grow into a full L2 SOC Analyst position.')}
                    </p>
                  </div>
                </div>

                {/* SOC Analyst L1 - Trecom */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full relative z-10 mt-6 bg-green-400 border-2 border-green-400 shadow-[0_0_14px_rgba(34,210,120,0.8)]" />
                  <div className="ml-8 rounded-xl p-6 flex-1 bg-gradient-to-r from-blue-900/80 to-blue-700/70 border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4 shrink-0" style={{ background: '#001133' }}>
                        <img src={trecomLogo} alt="Trecom logo" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">SOC Analyst L1</h3>
                        <p className="text-blue-200 font-medium font-mono text-sm">{t('Trecom · 2026 – Present · Remote')}</p>
                      </div>
                    </div>
                    <ul className="text-blue-50 text-sm space-y-2 list-disc list-inside">
                      <li>{t('Monitor and analyze security events and incidents using SIEM platforms.')}</li>
                      <li>{t('Analyze and escalate security alerts to reduce incident response time.')}</li>
                      <li>{t('Investigate security incidents and generate detailed technical reports.')}</li>
                      <li>{t('Tune SIEM correlation rules to minimize false positives and improve threat detection.')}</li>
                      <li>{t('Conduct proactive cybersecurity operations within a Blue Team environment.')}</li>
                    </ul>
                  </div>
                </div>

                {/* Cybersecurity Internship - PGE Energia Ciepla S.A. */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full relative z-10 mt-6 bg-green-400 border-2 border-green-400 shadow-[0_0_14px_rgba(34,210,120,0.8)]" />
                  <div className="ml-8 rounded-xl p-6 flex-1 bg-black/40 border border-green-400/15">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 60%, #1b2b3a 100%)' }}>
                        <img src={pgeLogo} alt="PGE logo" className="w-8 h-8 object-contain mx-auto my-auto" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{t('Cybersecurity Internship')}</h3>
                        <p className="text-gray-400 font-medium font-mono text-sm">{t('PGE Energia Ciepła · 2026 · Remote')}</p>
                      </div>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                      <li>{t('Analyzed system logs using ElasticSearch to identify and report security anomalies.')}</li>
                      <li>{t('Managed and triaged security tickets and alerts through Freescout, improving workflow efficiency.')}</li>
                    </ul>
                  </div>
                </div>

                {/* IT Infrastructure Support Specialist - Capgemini */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full relative z-10 mt-6 bg-green-400 border-2 border-green-400 shadow-[0_0_14px_rgba(34,210,120,0.7)]" />
                  <div className="ml-8 rounded-xl p-6 flex-1 bg-black/40 border border-green-400/15">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 60%, #232946 100%)' }}>
                        <img src={capgeminiLogo} alt="Capgemini logo" className="w-8 h-8 object-contain mx-auto my-auto" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{t('IT Infrastructure Support Specialist')}</h3>
                        <p className="text-gray-400 font-medium font-mono text-sm">{t('Capgemini Polska · 2025 – 2026 · On-site')}</p>
                      </div>
                    </div>
                    <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                      <li>{t('Delivered Level 1 technical support for local and remote users, resolving hardware and software issues efficiently.')}</li>
                      <li>{t('Administered user accounts and devices via Active Directory and Microsoft Intune.')}</li>
                      <li>{t('Resolved infrastructure alerts, maintaining optimal service availability and minimizing downtime.')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
