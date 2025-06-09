
import { ExternalLink, Github, Code, Shield, Database, Network, Linkedin } from 'lucide-react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';

const Portfolio = () => {
  const projects = [
    {
      title: "Network Security Scanner",
      description: "A comprehensive network vulnerability scanner built with Python. Detects open ports, services, and potential security issues.",
      technologies: ["Python", "Nmap", "Scapy", "Network Security"],
      github: "https://github.com/dexsterr/Encrypted-Password-Manager",
      icon: Network,
    },
    {
      title: "Web Application Penetration Testing Tool",
      description: "Automated tool for detecting common web vulnerabilities including SQL injection, XSS, and CSRF attacks.",
      technologies: ["Python", "Requests", "BeautifulSoup", "Web Security"],
      github: "https://github.com/dexsterr/Encrypted-Password-Manager",
      icon: Shield,
    },
    {
      title: "Encrypted Password Manager",
      description: "Secure password manager with AES encryption, master password protection, and secure password generation.",
      technologies: ["Python", "Cryptography", "SQLite", "Tkinter"],
      github: "https://github.com/dexsterr/Encrypted-Password-Manager",
      icon: Database,
    },
    {
      title: "Security Audit Automation Script",
      description: "Automated security audit script for Linux systems. Checks for common misconfigurations and security issues.",
      technologies: ["Bash", "Linux", "System Security", "Automation"],
      github: "https://github.com/dexsterr/Encrypted-Password-Manager",
      icon: Code,
    },
  ];

  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      {/* Social Links - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3">
        <a
          href="https://ctf.hackthebox.com/user/profile/711503"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow"
        >
          <Code size={20} />
        </a>
        <a
          href="https://github.com/dexsterr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/oskar-chudoba-474849340/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow"
        >
          <Linkedin size={20} />
        </a>
      </div>
      
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
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
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
