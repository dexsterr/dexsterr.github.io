import { Github, Linkedin, Award, BookOpen, Code, ExternalLink, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import SocialLinks from '../components/SocialLinks';
import { useMemo, useEffect } from 'react';

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
  ];

  const courses = [
    {
      name: "Security Analyst Level 1 (SAL1)",
      provider: "TryHackMe",
      status: "Learning",
      link: "https://tryhackme.com/certification/security-analyst-level-1"
    },
    {
      name: "CompTIA Security+",
      provider: "Comptia",
      status: "Planned - October 2025",
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

  // Dynamic experience date calculation
  // Poprawka: start od 1 lipca 2025, więc drugi miesiąc pracy w sierpniu 2025
  const experienceStart = useMemo(() => new Date(2025, 6, 1), []); // July 2025 (month is 0-based)
  const now = new Date();
  let months = (now.getFullYear() - experienceStart.getFullYear()) * 12 + (now.getMonth() - experienceStart.getMonth()) + 1;
  if (months < 1) months = 1;
  const years = Math.floor(months / 12);
  const monthsRemainder = months % 12;
  const duration = years > 0
    ? `${years} yr${years > 1 ? 's' : ''}${monthsRemainder > 0 ? ` ${monthsRemainder} mo${monthsRemainder > 1 ? 's' : ''}` : ''}`
    : `${monthsRemainder} mo${monthsRemainder !== 1 ? 's' : ''}`;
  const experienceText = `Jul 2025 - Present · ${duration}`;

  // Slightly expanded job description for Onsite Service Engineer
  const onsiteEngineerDesc =
    'Onsite Service Engineer: technical support, troubleshooting, ticketing, alerts, AD, Intune, ITP. Responsible for resolving user issues, maintaining IT infrastructure, and ensuring smooth daily operations.';

  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      {/* Social Links - Bottom Left */}
      <SocialLinks />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
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
                I'm a 20-year-old Cybersecurity student, eager to grow and skilled in teamwork. I'm passionate about learning and actively training in Cybersecurity. In my free time, I maintain an active lifestyle at the gym.
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
                        rel="noopener noreferrer"
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
                        : course.status === 'Planned - October 2025'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : (course.status === '2024' || course.status === '2025')
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
                {/* Target Position - SOC Analyst */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-400/20 border-2 border-green-400 rounded-full relative z-10 mt-6"></div>
                  <div className="ml-8 bg-black/30 rounded-lg p-6 flex-1 border border-green-400/20">
                    <h3 className="text-green-400 font-semibold text-lg mb-1">SOC Analyst</h3>
                    <p className="text-gray-400 text-sm mb-2">Target Position</p>
                    <p className="text-gray-300 text-sm">
                      Actively seeking opportunities in Security Operations Center environments. I'm working very hard to secure this position and currently targeting SOC Analyst roles. I'm taking specialized courses and studying cybersecurity daily to enhance my skills in threat detection, incident response, and security monitoring.
                    </p>
                  </div>
                </div>

                {/* Current Position - Onsite Service Engineer */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-400 border-2 border-green-400 rounded-full relative z-10 mt-6"></div>
                  <div className="ml-8 rounded-lg p-6 flex-1 bg-gradient-to-r from-blue-900/80 to-blue-700/80 border border-blue-500/30">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden mr-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 60%, #232946 100%)' }}>
                        <img
                          src="/uploads/CAPGEMINI%20LOGO.png"
                          alt="Capgemini Logo"
                          className="object-contain w-8 h-8"
                          style={{ background: 'none', display: 'block' }}
                          loading="eager"
                          fetchPriority="high"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Onsite Service Engineer</h3>
                        <p className="text-blue-200 font-medium">Capgemini · Full-time</p>
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm mb-2">{experienceText}</p>
                    <p className="text-blue-50 text-sm">
                      {onsiteEngineerDesc}
                    </p>
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
    </div>
  );
};

export default About;
