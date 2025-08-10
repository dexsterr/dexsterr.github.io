
import { ExternalLink, Github, Code, Shield, Database, Network, Linkedin, Eye, Search, AlertTriangle } from 'lucide-react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import SocialLinks from '../components/SocialLinks';

const Portfolio = () => {
  const projects = [
    {
      title: "Network Security Scanner",
      description: "A concise network vulnerability scanner built with Python. Detects open ports, services, and potential security issues, identifies devices, and alerts on ARP spoofing.",
      technologies: ["Python", "Nmap", "Scapy", "Tkinter"],
      codeLink: "https://github.com/dexsterr/network-security-scanner",
      icon: Network,
    },
    {
      title: "Telegram Data Collector",
      description: "A tool that uses OTP codes to log into Telegram accounts, extract files and conversations, and update data in real-time via Telegram API.",
      technologies: ["Python", "Telegram API", "Data Collection"],
      codeLink: "https://github.com/dexsterr/telegram-data-collector",
      icon: Database,
    },
    {
      title: "Encrypted Password Manager",
      description: "A secure password manager with AES encryption, master password protection, and secure password generation, requiring user authentication.",
      technologies: ["Python", "Cryptography", "SQLite"],
      codeLink: "https://github.com/dexsterr/encrypted-password-manager",
      icon: Shield,
    },
    {
      title: "Web Application Penetration Testing Tool",
      description: "An automated tool for detecting common web vulnerabilities including SQL injection, XSS, CSRF, LFI, RFI, Directory Traversal, and missing HTTP security headers.",
      technologies: ["Python", "Requests", "BeautifulSoup"],
      codeLink: "https://github.com/dexsterr/Web-Application-Penetration-Testing-Tool",
      icon: Code,
    },
    {
      title: "Login Anomaly Detector",
      description: "Real-time log analyzer that detects unusual authentication activities, flagging suspicious events like unexpected geolocations and failed login attempts for SOC analysts.",
      technologies: ["Python", "Log Analysis", "SIEM", "Geolocation"],
      codeLink: "https://github.com/dexsterr/Login-Anomaly-Detector",
      icon: Search,
    },
    {
      title: "Security Event Analysis Automation Tool",
      description: "SOC analyst toolkit that automates IOC investigation, phishing email analysis, brand monitoring, and threat validation to improve incident response times.",
      technologies: ["Python", "IOC", "Automation", "Threat Intelligence"],
      codeLink: "https://github.com/dexsterr/Security-Event-Analysis-Automation-Tool",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      {/* Social Links - Bottom Left */}
      <SocialLinks />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            My <span className="text-green-400 glow-text">Portfolio</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A collection of cybersecurity projects and tools I've developed to enhance digital security and demonstrate my skills.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="cyber-border bg-black/50 backdrop-blur-sm rounded-lg p-6 hover-glow transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <project.icon className="text-green-400" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <button
                    key={techIndex}
                    className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full cyber-border hover:bg-green-500/30 hover:text-green-300 transition-colors"
                  >
                    {tech}
                  </button>
                ))}
              </div>
              
              <div className="flex">
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <Github size={18} />
                  <span>Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
