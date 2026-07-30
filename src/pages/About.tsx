import { Award, BookOpen, Code, ExternalLink, Mail } from 'lucide-react';
import { useEffect } from 'react';
import capgeminiLogo from '@/assets/capgemini.png';
import pgeLogo from '@/assets/pge.svg';
import trecomLogo from '@/assets/trecom.png';

const About = () => {
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
    {
      name: "CompTIA Cybersecurity Analyst (CySA+)",
      provider: "CompTIA",
      status: "2026",
    },
    {
      name: "Microsoft Certified: Security Operations Analyst Associate (SC-200)",
      provider: "Microsoft",
      status: "2026",
      link: "https://learn.microsoft.com/en-gb/users/oskarchudoba-9307/credentials/ec125e97a8013f64"
    },
    {
      name: "Security Analyst Level 1 (SAL1)",
      provider: "TryHackMe",
      status: "2026",
      link: "https://assets.tryhackme.com/certification-certificate/6a64c1b37d9eef287cebcac0.pdf"
    },
    {
      name: "CompTIA Security+",
      provider: "Comptia",
      status: "2025",
      link: "https://www.credly.com/badges/32023631-a420-4515-81d1-75b17e20b890/linked_in_profile"
    },
    {
      name: "Git Fundamentals Course",
      provider: "Boot dev",
      status: "2025",
      link: "https://www.youtube.com/watch?si=edccBtgdCJL8gWNH&v=rH3zE7VlIMs&feature=youtu.be"
    },
    {
      name: "Python Course",
      provider: "Bro Code",
      status: "2025",
      link: "https://www.youtube.com/watch?v=ix9cRaBkVe0"
    },
    {
      name: "Google Cybersecurity Certificate",
      provider: "Google",
      status: "2025",
      link: "https://www.coursera.org/account/accomplishments/specialization/12DQ0E8D3N3N"
    },
    {
      name: "IT Technician Vocational Qualification",
      provider: "EE.08/INF.02",
      status: "2024",
    },
  ];

  // Set document title for browser tab
  useEffect(() => {
    document.title = 'Oskar Chudoba - Cybersecurity';
  }, []);

  return (
      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              About <span className="text-green-400 glow-text">Me</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Passionate cybersecurity enthusiast dedicated to protecting digital assets
            </p>
          </div>

          {/* Bio Section */}
          <div className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold text-white">My Story</h2>
            </div>
            <div className="text-gray-300 leading-relaxed">
              <p>
                Ambitious 21-year-old cybersecurity student and active SOC Analyst. Dedicated to continuous learning in threat detection and incident response, with a strong focus on developing my career in a Blue Team environment. Experienced in utilizing security tools and platforms such as ElasticSearch, Splunk, SecureVisio, Windows Defender, and Wazuh to maintain robust security postures.
              </p>
            </div>
          </div>

          {/* Courses Section */}
          <div className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold text-white">Courses & Certifications</h2>
            </div>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <div className="flex-1">
                    {course.link ? (
                      <a
                        href={course.link}
                        target="_blank"
                        className="text-white font-medium hover:text-green-400 transition-colors flex items-center space-x-2"
                      >
                        <span>{course.name}</span>
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <h3 className="text-white font-medium">{course.name}</h3>
                    )}
                    <p className="text-gray-400 text-sm">{course.provider}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ml-4
${course.status === 'Learning'
  ? 'bg-green-500/20 text-green-400'
    : course.status?.startsWith('Planned')
  ? 'bg-red-900/40 text-red-600 border border-red-600/50'
  : (course.status === '2024' || course.status === '2025' || course.status === '2026')
  ? 'bg-blue-600 text-white'
  : 'bg-blue-500/20 text-blue-400'
}`}
                  >
                    {course.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Code className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold text-white">Skills & Expertise</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-center text-sm hover:bg-green-500/30 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-8">
              <Award className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold text-white">Professional Experience</h2>
            </div>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-400"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {/* Target Position - SOC Analyst L2 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 bg-amber-400/30 border-2 border-amber-400 rounded-full relative z-10 mt-6"></div>
                  <div className="ml-8 rounded-lg p-6 flex-1 bg-gradient-to-r from-amber-950/90 to-amber-900/50 border border-amber-500/40">
                    <h3 className="text-amber-300 font-semibold text-lg mb-1">SOC Analyst L2</h3>
                    <p className="text-amber-200/80 text-sm mb-2 font-medium">Target Position</p>
                    <p className="text-amber-50/90 text-sm">
                      Building on my current L1 SOC role, I am actively developing toward Level 2 responsibilities: deeper incident investigation, advanced SIEM correlation and tuning, and stronger threat detection in a Blue Team environment. I study and certify continuously to grow into a full L2 SOC Analyst position.
                    </p>
                  </div>
                </div>

                {/* SOC Analyst L1 - Trecom */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-400 border-2 border-green-400 rounded-full relative z-10 mt-6"></div>
                  <div className="ml-8 rounded-lg p-6 flex-1 bg-gradient-to-r from-blue-900/80 to-blue-700/80 border border-blue-500/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4 shrink-0"
                        style={{ background: '#001133' }}
                      >
                        <img src={trecomLogo} alt="Trecom logo" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">SOC Analyst L1</h3>
                        <p className="text-blue-200 font-medium">Trecom · 2026 – Present · Remote</p>
                      </div>
                    </div>
                    <ul className="text-blue-50 text-sm space-y-2 list-disc list-inside">
                      <li>Monitor and analyze security events and incidents using SIEM platforms.</li>
                      <li>Analyze and escalate security alerts to reduce incident response time.</li>
                      <li>Investigate security incidents and generate detailed technical reports.</li>
                      <li>Tune SIEM correlation rules to minimize false positives and improve threat detection.</li>
                      <li>Conduct proactive cybersecurity operations within a Blue Team environment.</li>
                    </ul>
                  </div>
                </div>

                  {/* Cybersecurity Internship - PGE Energia Ciepla S.A. */}
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 bg-green-400 border-2 border-green-400 rounded-full relative z-10 mt-6"></div>
                    <div className="ml-8 rounded-lg p-6 flex-1 bg-black/30 border border-green-400/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 60%, #1b2b3a 100%)' }}>
                          <img src={pgeLogo} alt="PGE logo" className="w-8 h-8 object-contain mx-auto my-auto" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Cybersecurity Internship</h3>
                          <p className="text-gray-400 font-medium">PGE Energia Ciepła · 2026 · Remote</p>
                        </div>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                        <li>Analyzed system logs using ElasticSearch to identify and report security anomalies.</li>
                        <li>Managed and triaged security tickets and alerts through Freescout, improving workflow efficiency.</li>
                      </ul>
                    </div>
                  </div>

                  {/* IT Infrastructure Support Specialist - Capgemini */}
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 bg-green-400 border-2 border-green-400 rounded-full relative z-10 mt-6"></div>
                    <div className="ml-8 rounded-lg p-6 flex-1 bg-black/30 border border-green-400/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 60%, #232946 100%)' }}>
                          <img
                            src={capgeminiLogo}
                            alt="Capgemini logo"
                            className="w-8 h-8 object-contain mx-auto my-auto"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">IT Infrastructure Support Specialist</h3>
                          <p className="text-gray-400 font-medium">Capgemini Polska · 2025 – 2026 · On-site</p>
                        </div>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                        <li>Delivered Level 1 technical support for local and remote users, resolving hardware and software issues efficiently.</li>
                        <li>Administered user accounts and devices via Active Directory and Microsoft Intune.</li>
                        <li>Resolved infrastructure alerts, maintaining optimal service availability and minimizing downtime.</li>
                      </ul>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="text-green-400" size={24} />
              <h2 className="text-2xl font-semibold text-white">Connect With Me</h2>
            </div>
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                Interested in collaborating or have questions about cybersecurity? Feel free to reach out!
              </p>
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=oskarchudoba@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-glow"
              >
                <Mail size={20} />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;
