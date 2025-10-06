import { Github, Linkedin } from 'lucide-react';
import tryhackmeMask from '@/assets/tryhackme-logo.png';

const SocialLinks = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3">
      <a
        href="https://tryhackme.com/p/0dexster"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow flex items-center justify-center"
        aria-label="TryHackMe profile"
      >
        <img
          src={tryhackmeMask}
          alt="TryHackMe"
          className="w-5 h-5 filter-green"
          style={{ filter: 'brightness(0) saturate(100%) invert(73%) sepia(99%) saturate(749%) hue-rotate(74deg) brightness(102%) contrast(101%)' }}
          aria-hidden="true"
        />
      </a>
      <a
        href="https://github.com/dexsterr"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow"
        aria-label="GitHub profile"
      >
        <Github size={20} />
      </a>
      <a
        href="https://www.linkedin.com/in/oskar-chudoba-474849340/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-black/80 backdrop-blur-md rounded-lg cyber-border text-green-400 hover:text-green-300 transition-colors hover-glow"
        aria-label="LinkedIn profile"
      >
        <Linkedin size={20} />
      </a>
    </div>
  );
};

export default SocialLinks;
