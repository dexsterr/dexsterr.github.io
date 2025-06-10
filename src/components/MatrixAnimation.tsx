import { useEffect, useState, useRef } from 'react';
import { Shield, Lock, Zap, Eye, Terminal, Wifi, AlertTriangle, Key, Database } from 'lucide-react';

interface MatrixAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]<>&gt;';
const icons = [Shield, Lock, Zap, Eye, Terminal, Wifi, AlertTriangle, Key, Database];
const hackingMessages = [
  'INITIALIZING...',
  'BYPASSING FIREWALL...',
  'DECRYPTING DATA...',
  'ACCESS GRANTED',
  'SYSTEM INFILTRATED'
];

const MatrixAnimation = ({ isActive, onComplete }: MatrixAnimationProps) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [securityIcons, setSecurityIcons] = useState<any[]>([]);
  const [holographicShards, setHolographicShards] = useState<any[]>([]);
  const [glitchText, setGlitchText] = useState('INITIALIZING...');
  const [phase, setPhase] = useState(0);
  const [hideAfterClick, setHideAfterClick] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // For animation frame
  const animationFrame = useRef<number | null>(null);

  // Reset animation state on click if already faded out
  const handleClick = () => {
    if (fadeOut) {
      // Reset all state to initial for replay
      setCharacters([]);
      setSecurityIcons([]);
      setHolographicShards([]);
      setGlitchText('INITIALIZING...');
      setPhase(0);
      setHideAfterClick(false);
      setFadeOut(false);
    } else {
      setHideAfterClick(true);
    }
  };

  // Always show "ACCESS GRANTED" on fade out
  useEffect(() => {
    if (fadeOut) setGlitchText('ACCESS GRANTED');
  }, [fadeOut]);

  // Animation setup and reset
  useEffect(() => {
    if (!isActive || fadeOut) return;

    // Generate matrix rain
    const newCharacters = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
      x: Math.random() * 100,
      y: Math.random() * -100,
      speed: Math.random() * 1.5 + 0.7,
      opacity: Math.random() * 0.7 + 0.3,
      trail: Array.from({ length: 6 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
    }));

    // Security icons
    const newIcons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 1.1 + 0.5,
      pulse: Math.random() > 0.5,
    }));

    // Holographic shards
    const newShards = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.7 + 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    setCharacters(newCharacters);
    setSecurityIcons(newIcons);
    setHolographicShards(newShards);
    setGlitchText('INITIALIZING...');
    setPhase(0);
  }, [isActive, fadeOut]);

  // Animation loop (requestAnimationFrame for smoothness)
  useEffect(() => {
    if (!isActive || fadeOut) return;

    let lastTime = performance.now();

    function animate(now: number) {
      const delta = Math.min(now - lastTime, 40); // clamp delta for smoother effect
      lastTime = now;

      setCharacters(prev =>
        prev
          .map(char => ({
            ...char,
            y: char.y + char.speed * (delta / 16.67),
            char: Math.random() < 0.12 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char.char,
            trail: char.trail.map(() =>
              Math.random() < 0.18 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char.trail[0]
            ),
          }))
          .filter(char => char.y < 120)
          .concat(
            Math.random() < 0.3
              ? Array.from({ length: 1 }, () => ({
                  id: Date.now() + Math.random(),
                  char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
                  x: Math.random() * 100,
                  y: -10,
                  speed: Math.random() * 1.5 + 0.7,
                  opacity: Math.random() * 0.7 + 0.3,
                  trail: Array.from({ length: 6 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
                }))
              : []
          )
      );

      setSecurityIcons(prev =>
        prev.map(icon => ({
          ...icon,
          rotation: icon.rotation + (Math.random() * 6 - 3),
          scale: Math.max(0.5, Math.min(1.6, icon.scale + (Math.random() * 0.08 - 0.04))),
        }))
      );

      setHolographicShards(prev =>
        prev.map(shard => ({
          ...shard,
          rotation: shard.rotation + (Math.random() * 8 - 4),
          scale: Math.max(0.3, Math.min(1, shard.scale + (Math.random() * 0.05 - 0.025))),
          opacity: Math.max(0.2, Math.min(1, shard.opacity + (Math.random() * 0.1 - 0.05))),
        }))
      );

      animationFrame.current = requestAnimationFrame(animate);
    }

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isActive, fadeOut]);

  // Glitch text and phase logic
  useEffect(() => {
    if (!isActive || fadeOut) return;
    setGlitchText(hackingMessages[phase]);
    const glitchTimeout = setTimeout(() => {
      setGlitchText(
        hackingMessages[phase]
          .split('')
          .map(char => (Math.random() < 0.12 ? matrixChars[Math.floor(Math.random() * 15)] : char))
          .join('')
      );
    }, 60);

    const phaseTimeout = setTimeout(() => {
      setPhase(prev => (prev + 1) % hackingMessages.length);
    }, 1000);

    return () => {
      clearTimeout(glitchTimeout);
      clearTimeout(phaseTimeout);
    };
  }, [isActive, phase, fadeOut]);

  // Fade out logic: po kliknięciu lub po 6s, uruchom fade, po 1s zakończ animację
  useEffect(() => {
    if (!isActive) return;
    if (!hideAfterClick) return;
    setFadeOut(true);
    const timeout = setTimeout(() => {
      onComplete();
      setFadeOut(false);
      setHideAfterClick(false);
    }, 1000); // fade trwa 1s
    return () => clearTimeout(timeout);
  }, [hideAfterClick, isActive, onComplete]);

  // Fade out logic: automatycznie po 6s jeśli nie kliknięto
  useEffect(() => {
    if (!isActive) return;
    if (hideAfterClick) return;
    const timeout = setTimeout(() => {
      setFadeOut(true);
      setHideAfterClick(true);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [isActive, hideAfterClick]);

  if (!isActive && !fadeOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/98 backdrop-blur-sm animate-fade-in overflow-hidden transition-opacity duration-1000`}
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'auto',
        transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)',
        willChange: 'opacity',
      }}
    >
      {/* Matrix rain */}
      <div className="absolute inset-0 overflow-hidden">
        {characters.map((char) => (
          <div key={char.id} className="absolute">
            <div
              className="text-green-400 font-mono text-sm pointer-events-none"
              style={{
                left: `${char.x}%`,
                top: `${char.y}%`,
                opacity: char.opacity,
                textShadow: '0 0 16px #22c55e, 0 0 32px #22c55e88',
                filter: 'blur(0.2px)',
                fontWeight: 700,
              }}
            >
              {char.char}
            </div>
            {char.trail.map((trailChar: string, i: number) => (
              <div
                key={i}
                className="absolute text-green-400/50 font-mono text-xs pointer-events-none"
                style={{
                  left: `${char.x}%`,
                  top: `${char.y - (i + 1) * 2.2}%`,
                  opacity: char.opacity * (1 - i * 0.18),
                  textShadow: '0 0 8px #22c55e99',
                }}
              >
                {trailChar}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Holographic shards */}
      <div className="absolute inset-0">
        {holographicShards.map((shard: any) => (
          <div
            key={shard.id}
            className="absolute w-4 h-8 bg-gradient-to-b from-green-400/60 to-transparent animate-pulse"
            style={{
              left: `${shard.x}%`,
              top: `${shard.y}%`,
              transform: `rotate(${shard.rotation}deg) scale(${shard.scale})`,
              opacity: shard.opacity,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              filter: 'drop-shadow(0 0 8px #22c55e99)',
            }}
          />
        ))}
      </div>

      {/* Security icons */}
      <div className="absolute inset-0">
        {securityIcons.map((icon: any) => (
          <icon.Icon
            key={icon.id}
            size={44}
            className={`absolute text-green-400/40 ${icon.pulse ? 'animate-pulse' : ''}`}
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
              filter: 'drop-shadow(0 0 12px #22c55e) drop-shadow(0 0 24px #22c55e88)',
            }}
          />
        ))}
      </div>

      {/* Central hacker message - zawsze ACCESS GRANTED przy końcu */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6 animate-scale-in" style={{ animationDelay: '1s' }}>
          <div className="relative">
            <div className="text-7xl md:text-8xl text-green-400 glow-text font-mono animate-pulse font-bold drop-shadow-[0_0_32px_#22c55e]">
              {fadeOut ? 'ACCESS GRANTED' : glitchText}
            </div>
            {/* Multiple glitch overlays */}
            <div className="absolute inset-0 text-7xl md:text-8xl text-red-500/40 font-mono font-bold animate-pulse"
                 style={{
                   transform: 'translateX(3px) translateY(2px)',
                   animationDelay: '0.1s',
                   filter: 'blur(1px)',
                 }}>
              {fadeOut ? 'ACCESS GRANTED' : glitchText}
            </div>
            <div className="absolute inset-0 text-7xl md:text-8xl text-blue-500/20 font-mono font-bold animate-pulse"
                 style={{
                   transform: 'translateX(-2px) translateY(-1px)',
                   animationDelay: '0.2s',
                   filter: 'blur(1.5px)',
                 }}>
              {fadeOut ? 'ACCESS GRANTED' : glitchText}
            </div>
          </div>

          {phase >= 1 && !fadeOut && (
            <div className="text-2xl text-green-300 font-mono animate-fade-in">
              &gt; System breach detected...
            </div>
          )}

          {phase >= 2 && !fadeOut && (
            <div className="text-xl text-green-400/80 font-mono animate-fade-in">
              &gt; Quantum encryption bypassed
            </div>
          )}

          {phase >= 3 && !fadeOut && (
            <div className="text-2xl text-green-200 font-mono animate-fade-in font-bold">
              &gt; Neural network infiltrated
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixAnimation;