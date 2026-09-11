import React, { useState } from 'react';
import { Perfume } from '../types';
import { Eye, Heart, Pause, Play } from 'lucide-react';

interface BottleSlowReelProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

// Sub-component for robust image loading
const ReelBottleImage: React.FC<{ perfume: Perfume }> = ({ perfume }) => {
  const [imgSrc, setImgSrc] = useState(perfume.image);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (perfume.secondaryImage && imgSrc !== perfume.secondaryImage) {
      setImgSrc(perfume.secondaryImage);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-white/20 dark:bg-white/5 rounded-xs">
        <span className="font-mono-subtle text-[8px] uppercase tracking-widest text-[#A96227] dark:text-[#D4AF37]">
          {perfume.brand}
        </span>
        <span className="font-serif-editorial text-xs text-[#24221F] dark:text-white line-clamp-1">
          {perfume.name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={perfume.name}
      referrerPolicy="no-referrer"
      onError={handleError}
      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700 ease-out"
      loading="lazy"
    />
  );
};

export const BottleSlowReel: React.FC<BottleSlowReelProps> = ({
  perfumes,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  if (!perfumes || perfumes.length === 0) return null;

  // Duplicate list to create a seamless infinite marquee loop
  const marqueeItems = [...perfumes, ...perfumes];

  return (
    <div className="w-full py-5 sm:py-6 bg-[#EFE9DF] dark:bg-[#151311] border-y border-[#24221F]/10 dark:border-white/10 overflow-hidden relative select-none">
      {/* Subtle Section Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A96227] dark:bg-[#D4AF37] animate-pulse" />
          <span className="font-mono-subtle text-[10px] sm:text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase font-bold">
            PASSARELA DO ATELIÊ · MOVIMENTO SUAVE
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 text-[10px] font-mono-subtle uppercase px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 text-[#24221F] dark:text-white border border-[#24221F]/10 hover:border-[#A96227] transition-all cursor-pointer"
            aria-label={isPaused ? "Retomar movimento" : "Pausar movimento"}
          >
            {isPaused ? <Play className="w-3 h-3 text-[#A96227]" /> : <Pause className="w-3 h-3 text-[#A96227]" />}
            <span>{isPaused ? "Retomar" : "Pausar"}</span>
          </button>
          
          <span className="hidden sm:inline font-mono-subtle text-[10px] text-[#24221F]/60 dark:text-white/50 uppercase tracking-wider">
            Toque para inspecionar
          </span>
        </div>
      </div>

      {/* Left/Right Fading Vignettes */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#EFE9DF] dark:from-[#151311] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#EFE9DF] dark:from-[#151311] to-transparent z-10 pointer-events-none" />

      {/* Continuous Ultra Slow Gliding Track */}
      <div className="overflow-hidden w-full">
        <div
          className={`animate-marquee-slow flex items-center gap-4 sm:gap-6 py-2 px-4 cursor-grab active:cursor-grabbing ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
        >
          {marqueeItems.map((perfume, idx) => {
            const isFav = favorites.includes(perfume.id);

            return (
              <div
                key={`${perfume.id}-${idx}`}
                onClick={() => onSelectPerfume(perfume)}
                className="group w-44 sm:w-52 flex-shrink-0 bg-[#FAF8F5] dark:bg-[#1C1A17] border border-[#24221F]/10 dark:border-white/10 rounded-xs p-3.5 shadow-xs hover:shadow-xl hover:border-[#A96227] dark:hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Bottle Visual Box */}
                <div className="relative aspect-[3/4] w-full rounded-xs bg-gradient-to-b from-[#F2ECE2]/50 to-transparent dark:from-[#141210]/60 p-2.5 flex items-center justify-center overflow-hidden">
                  <ReelBottleImage perfume={perfume} />

                  {/* Top Brand Pill */}
                  <span className="absolute top-2 left-2 bg-[#24221F]/90 dark:bg-black/80 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-mono-subtle rounded-xs">
                    {perfume.brand}
                  </span>

                  {/* Mini Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(perfume.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-black/80 text-[#24221F] dark:text-white shadow-xs hover:scale-110 active:scale-90 transition-transform"
                    aria-label="Favoritar"
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        isFav
                          ? 'fill-[#A96227] text-[#A96227] dark:fill-[#D4AF37] dark:text-[#D4AF37]'
                          : 'text-[#24221F]/60 dark:text-white/60'
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-2.5 pt-2 border-t border-[#24221F]/10 dark:border-white/10">
                  <span className="text-[10px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider block font-semibold truncate">
                    {perfume.family}
                  </span>
                  <h4 className="font-serif-editorial text-base text-[#24221F] dark:text-[#F5F2EB] truncate group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors">
                    {perfume.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-serif font-medium text-[#24221F] dark:text-white">
                      {perfume.price}
                    </span>
                    <span className="text-[10px] uppercase font-mono-subtle text-[#A96227] dark:text-[#D4AF37] flex items-center gap-0.5 font-bold">
                      <Eye className="w-2.5 h-2.5" /> Ver
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
