import React, { useState, useRef } from 'react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]', 'aspect-square', 'h-full'
  padding?: string;
  showContactShadow?: boolean;
  brand?: string;
  name?: string;
  enableTilt?: boolean;
  showMistParticles?: boolean;
  objectFit?: 'object-contain' | 'object-cover';
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[3/4]',
  padding = 'p-5 sm:p-6 md:p-7',
  showContactShadow = true,
  brand = 'Máximo',
  name = 'Perfume',
  enableTilt = true,
  showMistParticles = true,
  objectFit = 'object-contain',
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      {/* Subtle Studio Ambient Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(169,98,39,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(201,125,62,0.06),transparent_75%)] pointer-events-none" />

      {/* Subtle Soft Diffused Ground Shadow under the bottle silhouette */}
      {showContactShadow && (
        <div
          aria-hidden="true"
          style={{
            transform: `translateX(calc(-50% + ${tilt.y * 1.2}px)) scale(${isHovered ? 1.05 : 1})`,
          }}
          className="absolute bottom-5 sm:bottom-6 left-1/2 w-1/2 max-w-[140px] h-2.5 bg-black/15 dark:bg-black/50 rounded-full blur-[8px] transition-all duration-300 pointer-events-none z-0"
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
              ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.045)`
              : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full ${objectFit} ${padding} transition-all duration-300 drop-shadow-[0_16px_20px_rgba(0,0,0,0.20)] dark:drop-shadow-[0_20px_25px_rgba(0,0,0,0.65)] ${
              isLoaded ? 'opacity-100' : 'opacity-85'
            } ${className}`}
          />
        </div>
      )}
    </div>
  );
};

