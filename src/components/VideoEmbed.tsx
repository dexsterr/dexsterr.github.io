import { useMemo, useRef } from 'react';

interface VideoEmbedProps {
  videoPath: string;
  title?: string;
  className?: string;
}

const VideoEmbed = ({ videoPath, title, className = "" }: VideoEmbedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const src = useMemo(() => {
    if (/^https?:\/\//i.test(videoPath)) return videoPath;
    // Always use direct path for videos
    return videoPath;
  }, [videoPath]);

  return (
    <div className={`w-full h-full relative overflow-hidden rounded-lg ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          borderRadius: '8px',
          transform: 'scale(1.03)',
          pointerEvents: 'none',
        }}
        title={title}
        aria-hidden="true"
        tabIndex={-1}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoEmbed;