
import { useEffect, useRef } from 'react';

interface SplineAssetProps {
  src: string;
  className?: string;
  title?: string;
}

const SplineAsset = ({ src, className = "", title }: SplineAssetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  console.log('SplineAsset rendering with src:', src);
  
  useEffect(() => {
    console.log('SplineAsset useEffect triggered, src:', src);
    
    // Load Spline viewer script if not already loaded
    const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
    console.log('Existing script found:', !!existingScript);
    
    if (!existingScript) {
      console.log('Loading Spline viewer script...');
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js';
      script.onload = () => console.log('Spline viewer script loaded successfully');
      script.onerror = (error) => console.error('Failed to load Spline viewer script:', error);
      document.head.appendChild(script);
    }

    // Add a delay to ensure the script is loaded before creating the viewer
    const timer = setTimeout(() => {
      console.log('Creating spline-viewer element...');
      if (containerRef.current) {
        const viewer = containerRef.current.querySelector('spline-viewer');
        if (viewer) {
          console.log('Spline viewer element found, URL:', viewer.getAttribute('url'));
        } else {
          console.log('No spline-viewer element found');
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <spline-viewer 
        url={src}
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '200px',
          display: 'block'
        }}
        loading="lazy"
      />
    </div>
  );
};

export default SplineAsset;
