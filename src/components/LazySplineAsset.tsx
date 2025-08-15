import { useEffect, useRef, useState } from 'react';

interface HoverSplineAssetProps {
  src: string;
  className?: string;
  title?: string;
  previewImage?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        style?: React.CSSProperties;
        loading?: 'lazy' | 'eager';
        'background-color'?: string;
        'background-alpha'?: string;
        children?: React.ReactNode;
        id?: string;
        className?: string;
      };
    }
  }
}

const HoverSplineAsset = ({ src, className = "", title }: HoverSplineAssetProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSplineError = () => {
    setHasError(true);
    console.log('Spline viewer failed to load:', src);
  };

  console.log('Spline URL:', src);

  return (
    <div className={`w-full h-full relative overflow-hidden rounded-lg bg-transparent ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-green-500/20">
          <div className="text-center text-gray-300">
            <div className="w-12 h-12 mx-auto bg-green-500/30 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-400/60 rounded animate-pulse"></div>
            </div>
            <p className="text-xs mt-2 text-green-400">Loading 3D...</p>
          </div>
        </div>
      )}
      
      {/* Spline Animation */}
      {isLoaded && !hasError && (
        <spline-viewer
          url={src}
          loading="lazy"
          style={{ 
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px',
            background: 'transparent'
          }}
          background-color="transparent"
          background-alpha="0"
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-gray-500/20">
          <div className="text-center text-gray-300">
            <div className="w-12 h-12 mx-auto bg-gray-500/30 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400/60 rounded"></div>
            </div>
            <p className="text-xs mt-2">3D Asset</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverSplineAsset;