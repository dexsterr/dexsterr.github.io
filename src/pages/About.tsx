
import { Github, Linkedin, Award, BookOpen, Code, ExternalLink, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';

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
      name: "Networking by Steve Tarzia",
      provider: "Steve Tarzia",
      status: "Planned",
      link: "https://www.youtube.com/watch?si=UnM3GgNtD4NGrK1k&v=EN0efud3M5U&feature=youtu.be"
    },
    {
      name: "CompTIA Security+",
      provider: "Comptia",
      status: "Still Learning",
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
    ${course.status === 'Planned'
      ? 'bg-green-600 text-white'
      : (course.status === '2024' || course.status === '2025')
      ? 'bg-blue-600 text-white'
      : course.status === 'Still Learning'
      ? 'bg-yellow-500/20 text-yellow-400'
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
