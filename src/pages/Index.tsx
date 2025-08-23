
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import CyberBackground from '../components/CyberBackground';
import TypingAnimation from '../components/TypingAnimation';
import MatrixAnimation from '../components/MatrixAnimation';
import SocialLinks from '../components/SocialLinks';

const Index = () => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());
  const [gifError, setGifError] = useState(false);

  useEffect(() => {
    document.title = 'Oskar Chudoba - Cybersecurity';
  }, []);

  const handleAvatarClick = () => {
    setShowMatrix(true);
    setAvatarKey(Date.now());
    setGifError(false);
  };

  const handleMatrixComplete = () => {
    setShowMatrix(false);
  };

  const handleGifLoad = () => {
    setGifError(false);
  };

  const handleGifError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    
    if (!gifError) {
      setGifError(true);
      const fallbackPaths = [
        `/public/avatar.gif`,
        `/uploads/avatar.gif`,
        `/lovable-uploads/g-ezgif.com-video-to-gif-converter.gif`
      ];
      
      const currentIndex = fallbackPaths.findIndex(path => img.src.includes(path));
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < fallbackPaths.length) {
        img.src = fallbackPaths[nextIndex];
      }
    }
  };


  return (
    <div className="min-h-screen cyber-bg relative">
      <Navigation />
      <CyberBackground />
      
      {/* Social Links - Bottom Left */}
      <SocialLinks />
      
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
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-800/20 rounded-full" />
              <div 
                className="absolute inset-4 cyber-border rounded-full bg-black/50 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 hover-glow"
                onClick={handleAvatarClick}
                style={{ 
                  border: showMatrix ? '2px solid #22c55e' : undefined,
                  boxShadow: showMatrix ? '0 0 20px #22c55e' : undefined
                }}
              >
                <img 
                  key={`avatar-${avatarKey}`}
                  src={`/avatar.gif`}
                  alt="Oskar Chudoba - animowany GIF z machaniem ręką" 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center rounded-full"
                  style={{
                    imageRendering: 'auto',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                  onLoad={handleGifLoad}
                  onError={handleGifError}
                />
              </div>
              <div className="absolute inset-8 cyber-border rounded-full bg-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Matrix Animation */}
      {showMatrix && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black/90">
          <MatrixAnimation isActive={showMatrix} onComplete={handleMatrixComplete} />
        </div>
      )}
      
    </div>
  );
};

export default Index;
