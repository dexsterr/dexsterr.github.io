
import { Shield, Lock, Zap, Eye } from 'lucide-react';

const CyberBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 cyber-pattern opacity-30" />
      
      {/* Floating icons */}
      <div className="absolute top-20 right-20 text-green-500/20 animate-pulse">
        <Shield size={80} />
      </div>
      <div className="absolute bottom-32 right-32 text-green-500/15 animate-pulse delay-1000">
        <Lock size={60} />
      </div>
      <div className="absolute top-1/3 right-10 text-green-500/10 animate-pulse delay-2000">
        <Zap size={100} />
      </div>
      <div className="absolute bottom-20 right-20 text-green-500/20 animate-pulse delay-500">
        <Eye size={50} />
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent" />
      </div>
    </div>
  );
};

export default CyberBackground;
