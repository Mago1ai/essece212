import React, { useState, useRef, useCallback } from 'react';
import { Droplets, Sparkles } from 'lucide-react';

interface InteractiveBottleShowcaseProps {
  src: string;
  alt: string;
  brand: string;
  name: string;
  badge?: string;
  tactileDescription: string;
}

export const InteractiveBottleShowcase: React.FC<InteractiveBottleShowcaseProps> = ({
  src,
  alt,
  brand,
  name,
  badge,
  tactileDescription,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Smooth tilt & translation state (subtle, elegant range)
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    translateX: 0,
    translateY: 0,
    glintX: 50,
    glintY: 50,
  });

  const [isInteracting, setIsInteracting] = useState(false);

  // Calculate mouse position relative to container center
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized coordinates (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Subtle, restrained luxury angles and translations
    setTilt({
      rotateY: normX * 12,        // Max 12 deg tilt sideways
      rotateX: -normY * 9,        // Max 9 deg tilt up/down
      translateX: normX * 10,     // Max 10px subtle shift
      translateY: normY * 7,      // Max 7px subtle vertical shift
      glintX: ((normX + 1) / 2) * 100,
      glintY: ((normY + 1) / 2) * 100,
    });
    setIsInteracting(true);
  }, []);

  // Touch tracking for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    const normX = Math.max(-1, Math.min(1, ((touch.clientX - rect.left) / rect.width - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, ((touch.clientY - rect.top) / rect.height - 0.5) * 2));

    setTilt({
      rotateY: normX * 12,
      rotateX: -normY * 9,
      translateX: normX * 10,
      translateY: normY * 7,
      glintX: ((normX + 1) / 2) * 100,
      glintY: ((normY + 1) / 2) * 100,
    });
    setIsInteracting(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsInteracting(false);
    // Smooth reset back to center
    setTilt({
      rotateX: 0,
      rotateY: 0,
      translateX: 0,
      translateY: 0,
      glintX: 50,
      glintY: 50,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
      className="relative w-full h-full min-h-[440px] sm:min-h-[500px] md:min-h-[560px] flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none bg-gradient-to-b from-[#FAF7F2] via-[#F3ECE0] to-[#E5DCD0] dark:from-[#1E1C19] dark:via-[#161412] dark:to-[#0D0C0B] border-b md:border-b-0 md:border-r border-[#24221F]/10 dark:border-white/10"
      style={{ perspective: '1200px' }}
    >
      {/* Studio Atmosphere Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(169,98,39,0.12),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.18),transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#24221F]/5 dark:from-black/50 to-transparent pointer-events-none" />

      {/* Top Brand Badges */}
      <div className="w-full flex items-start justify-between z-20 pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <span className="bg-[#24221F] dark:bg-[#2A2622] text-[#F4F0E9] dark:text-[#D4AF37] font-mono-subtle text-xs tracking-[0.24em] px-3.5 py-1.5 uppercase shadow-md border border-transparent dark:border-[#D4AF37]/30 font-semibold">
            {brand}
          </span>
          {badge && (
            <span className="bg-[#A96227] dark:bg-[#C97D3E] text-white font-mono-subtle text-[11px] tracking-[0.2em] px-3 py-1 uppercase shadow-md font-semibold">
              {badge}
            </span>
          )}
        </div>

        {/* Dynamic Micro-Label Indicator */}
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-[#1E1C1A]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#24221F]/10 dark:border-white/15 text-[10px] font-mono-subtle text-[#24221F]/70 dark:text-[#F5F2EB]/70 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A96227] dark:bg-[#D4AF37] animate-pulse" />
          <span>Toque / Movimento Sensorial</span>
        </div>
      </div>

      {/* Main Bottle Showcase Area */}
      <div className="relative w-full flex-grow flex items-center justify-center my-3 sm:my-5 z-10">
        {/* Soft Dynamic Contact Shadow on Pedestal */}
        <div
          aria-hidden="true"
          style={{
            transform: `translateX(${tilt.translateX * 1.2}px) translateY(${tilt.translateY * 0.5}px) scale(${
              1 + Math.abs(tilt.rotateX) * 0.015
            })`,
            opacity: isInteracting ? 0.45 : 0.35,
          }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-8 bg-black/45 dark:bg-black/85 rounded-full blur-[16px] transition-all duration-300 pointer-events-none"
        />

        {/* 3D Parallax Bottle Transform Node */}
        <div
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.translateX}px, ${tilt.translateY}px, 0px)`,
            transformStyle: 'preserve-3d',
            transition: isInteracting ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] h-[310px] sm:h-[370px] md:h-[420px]"
        >
          {/* Elegant Specular Glass Highlight */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl mix-blend-overlay opacity-30 dark:opacity-40 transition-opacity"
            style={{
              background: `radial-gradient(circle at ${tilt.glintX}% ${tilt.glintY}%, rgba(255,255,255,0.95) 0%, transparent 60%)`,
            }}
          />

          {imageError ? (
            <div className="flex flex-col items-center justify-center text-center p-6 text-[#24221F]/70 dark:text-[#F5F2EB]/70">
              <div className="w-24 h-32 border-2 border-[#24221F]/20 dark:border-white/15 rounded-t-2xl rounded-b-md bg-white/40 dark:bg-white/5 backdrop-blur-xs flex flex-col items-center justify-center p-3 mb-3 shadow-lg">
                <span className="font-serif-editorial text-sm font-light text-[#A96227] dark:text-[#D4AF37] uppercase tracking-widest">
                  {brand.slice(0, 4)}
                </span>
                <div className="w-10 h-[1px] bg-[#24221F]/20 dark:bg-white/10 my-2" />
                <span className="font-mono-subtle text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60">EAU DE PARFUM</span>
              </div>
              <span className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] font-light max-w-[200px]">
                {name}
              </span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              loading="eager"
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-auto h-full max-h-[310px] sm:max-h-[370px] md:max-h-[410px] object-contain transition-all duration-300 drop-shadow-[0_22px_32px_rgba(0,0,0,0.28)] dark:drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)] ${
                isLoaded ? 'opacity-100' : 'opacity-80'
              }`}
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* Bottom Tactile Sensory Card */}
      <div className="w-full z-20">
        <div className="bg-[#24221F]/90 dark:bg-[#121110]/95 backdrop-blur-md p-3 sm:p-3.5 border border-[#24221F]/20 dark:border-white/15 text-center shadow-md rounded-xs">
          <span className="font-mono-subtle text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase block mb-1 font-semibold flex items-center justify-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" />
            <span>EXPERIÊNCIA TÁTIL NA PELE</span>
          </span>
          <p className="font-sans-clean text-xs sm:text-[13px] text-[#F5F2EB]/95 leading-relaxed font-normal">
            {tactileDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
