
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {children}
      
      {/* Route transition overlay */}
      <div
        className={`fixed inset-0 z-[200] pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Digital wave effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent transform transition-transform duration-800 ease-out ${
            isTransitioning ? 'translate-x-0' : '-translate-x-full'
          }`} style={{ width: '150%', left: '-50%' }}>
            {/* Binary code pattern overlay */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-green-400 font-mono text-xs whitespace-nowrap"
                  style={{
                    top: `${i * 12.5}%`,
                    left: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
                    01101000 01100001 01100011 01101011 01101001 01101110 01100111
                  </div>
                </div>
              ))}
            </div>
            
            {/* Circuit lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Floating security icons */}
        <div className="absolute inset-0">
          <Shield 
            size={32} 
            className={`absolute top-1/4 left-1/4 text-green-400 transition-all duration-700 ${
              isTransitioning ? 'opacity-80 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ animationDelay: '0.2s' }}
          />
          <Lock 
            size={28} 
            className={`absolute top-1/2 right-1/3 text-green-400 transition-all duration-700 ${
              isTransitioning ? 'opacity-80 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ animationDelay: '0.4s' }}
          />
          <Shield 
            size={24} 
            className={`absolute bottom-1/3 left-1/2 text-green-400 transition-all duration-700 ${
              isTransitioning ? 'opacity-60 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ animationDelay: '0.3s' }}
          />
          <Lock 
            size={30} 
            className={`absolute top-1/3 right-1/4 text-green-400 transition-all duration-700 ${
              isTransitioning ? 'opacity-70 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Scan line effect */}
        <div className={`absolute top-0 left-0 w-full h-0.5 bg-green-400 shadow-lg shadow-green-400/50 transition-all duration-800 ease-out ${
          isTransitioning ? 'translate-y-screen opacity-100' : 'translate-y-0 opacity-0'
        }`} />
      </div>
    </>
  );
};

export default RouteTransition;
