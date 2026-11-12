import { Shield, Lock } from 'lucide-react';

/**
 * Minimal decorative overlay above the (now subtle) ShaderBackground.
 * DOM-only, zero per-frame cost. Kept deliberately sparse for a clean look:
 * a faint masked grid, a soft vignette and two low-opacity glyphs.
 */
const CyberBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 cyber-pattern opacity-[0.18]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 40%, transparent 62%, rgba(4,7,10,0.9) 100%)' }}
      />

      <div className="absolute top-28 right-24 text-green-500/[0.05] animate-float" style={{ animationDelay: '0s' }}>
        <Shield size={72} />
      </div>
      <div className="absolute bottom-40 left-20 text-cyan-400/[0.05] animate-float" style={{ animationDelay: '1.8s' }}>
        <Lock size={54} />
      </div>
    </div>
  );
};

export default CyberBackground;
