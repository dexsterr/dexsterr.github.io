import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Github, Linkedin, Code } from 'lucide-react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import TypingAnimation from '../components/TypingAnimation';
import MatrixAnimation from '../components/MatrixAnimation';

const Index = () => {
  const [showMatrix, setShowMatrix] = useState(false);

  const handleAvatarClick = () => {
    setShowMatrix(true);
  };

  const handleMatrixComplete = () => {
    setShowMatrix(false);
  };

  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      {/* Matrix Animation Overlay */}
      <MatrixAnimation isActive={showMatrix} onComplete={handleMatrixComplete} />
      
      {/* Social Links - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3">
        <a
          href="https://tryhackme.com/p/0dexster"
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
      
      <div className="container mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 z-10 relative">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Terminal size={20} />
                <span className="text-sm font-mono">~/cybersec-portfolio</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="text-green-400 glow-text">Oskar Chudoba</span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
                <TypingAnimation />
              </h2>
              
              <p className="text-gray-400 text-lg">
                20 years old • Passionate about digital security
              </p>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              Exploring the depths of cybersecurity, one challenge at a time. 
              Focused on ethical hacking, SOC Analyst, and building secure systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/portfolio"
                className="group flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-glow"
              >
                <span>View Portfolio</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="flex items-center justify-center space-x-2 cyber-border bg-transparent hover:bg-green-500/10 text-green-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover-glow"
              >
                <span>About Me</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Right Content - Clickable Avatar */}
          <div className="hidden lg:block relative">
            <div className="w-96 h-96 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-800/20 rounded-full animate-pulse" />
              <div 
                className="absolute inset-4 cyber-border rounded-full bg-black/50 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 hover-glow"
                onClick={handleAvatarClick}
              >
                <img 
                  src="/uploads/g-ezgif.com-video-to-gif-converter.gif" 
                  alt="Oskar's Avatar" 
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <div className="absolute inset-8 cyber-border rounded-full bg-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
