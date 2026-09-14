import React, { useState, useRef } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]', 'aspect-square', 'h-full'
  padding?: string;
  showContactShadow?: boolean;
  brand?: string;
  name?: string;
  enableTilt?: boolean;
  showMistParticles?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[4/4.2] sm:aspect-[4/4.3]',
  padding = 'p-2 sm:p-2.5',
  showContactShadow = true,
  brand = 'Máximo',
  name = 'Perfume',
  enableTilt = true,
  showMistParticles = true,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setCurrentSrc(src);
    setImageError(false);
    setIsLoaded(false);
  }, [src]);

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImageError(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3.5 to 5 degrees rotation
    setTilt({
      x: -y * 8, // rotateX
      y: x * 8,  // rotateY
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: -y * 6,
      y: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-b from-[#F2ECE2]/50 via-[#EAE3D7]/30 to-transparent dark:from-[#1A1816]/60 dark:via-[#141210]/40 dark:to-transparent flex items-center justify-center select-none transition-colors duration-500 rounded-t-xs ${containerClassName}`}
      style={{
        perspective: '900px',
      }}
    >
      {/* Subtle Studio Ambient Highlight with Breathing Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(169,98,39,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.12),transparent_75%)] pointer-events-none animate-pulse-glow" />

      {/* Atmospheric Mist Particles on Hover */}
      {showMistParticles && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/20 dark:bg-[#D4AF37]/15 rounded-full blur-xl animate-mist" />
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-[#A96227]/15 dark:bg-[#D4AF37]/20 rounded-full blur-2xl animate-mist" style={{ animationDelay: '1.5s' }} />
        </div>
      )}

      {/* Subtle Soft Diffused Ground Shadow under the bottle silhouette */}
      {showContactShadow && (
        <div
          aria-hidden="true"
          style={{
            transform: `translateX(calc(-50% + ${tilt.y * 1.2}px)) scale(${isHovered ? 1.08 : 0.95})`,
          }}
          className="absolute bottom-3 sm:bottom-4 left-1/2 w-3/5 max-w-[170px] h-3.5 bg-black/25 dark:bg-black/65 rounded-full blur-[10px] transition-all duration-300 pointer-events-none z-0"
        />
      )}

      {/* Fallback Editorial Placeholder if image fails */}
      {imageError ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 text-[#24221F]/70 dark:text-[#F5F2EB]/70">
          <div className="w-16 h-20 border border-[#24221F]/20 dark:border-white/15 rounded-t-lg rounded-b-sm bg-white/40 dark:bg-white/5 backdrop-blur-xs flex flex-col items-center justify-center p-2 mb-3 shadow-sm">
            <span className="font-serif-editorial text-xs font-light text-[#A96227] dark:text-[#D4AF37] uppercase tracking-widest">
              {brand.slice(0, 3)}
            </span>
            <div className="w-6 h-[1px] bg-[#24221F]/20 dark:bg-white/10 my-1" />
            <span className="font-mono-subtle text-[8px] text-[#24221F]/60 dark:text-[#F5F2EB]/60">EDP</span>
          </div>
          <span className="font-mono-subtle text-[10px] tracking-widest uppercase text-[#A96227] dark:text-[#D4AF37]">
            {brand}
          </span>
          <span className="font-serif-editorial text-sm text-[#24221F] dark:text-[#F5F2EB] font-light max-w-[160px] line-clamp-1">
            {name}
          </span>
        </div>
      ) : (
        <div
          className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: enableTilt && isHovered
              ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px) scale(1.18)`
              : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1.10)',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full max-h-[380px] sm:max-h-[410px] object-contain ${padding} transition-all duration-500 drop-shadow-[0_18px_26px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_22px_32px_rgba(0,0,0,0.75)] ${
              isLoaded ? 'opacity-100' : 'opacity-85'
            } ${isHovered ? 'brightness-105 contrast-105' : ''} ${className}`}
          />
        </div>
      )}
    </div>
  );
};

