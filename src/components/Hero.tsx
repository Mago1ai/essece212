import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { BRAND_INFO } from '../data/perfumes';

interface HeroProps {
  onExploreCollection: () => void;
  onScrollToNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onScrollToNext,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[75vh] sm:min-h-[82vh] flex items-center bg-[#1A1816] text-[#F4F0E9] overflow-hidden select-none"
    >
      {/* Background Editorial Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bf85031b26?auto=format&fit=crop&w=1600&q=80"
          alt="Alta Perfumaria Máximo em ambiente editorial"
          className="w-full h-full object-cover object-[50%_30%] brightness-[0.65] contrast-[1.05]"
        />
        {/* Subtle Dark Vignette & Left Gradient for Maximum Typographic Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121110]/95 via-[#121110]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/90 via-transparent to-black/30" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 flex flex-col justify-center min-h-[75vh] sm:min-h-[82vh]">
        <div className="max-w-xl lg:max-w-2xl mt-8 sm:mt-12">
          {/* Subtle Editorial Micro-Label */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-8 h-[1px] bg-[#A96227] dark:bg-[#D4AF37]" />
            <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.3em] text-[#EAE3D9]/90 uppercase">
              MÁXIMO EAU DE PARFUM · ALTA PERFUMARIA
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-[68px] font-light tracking-[-0.01em] leading-[1.06] text-[#F4F0E9] mb-6">
            A presença que <br />
            <span className="italic font-normal text-[#EAE3D9]">permanece.</span>
          </h1>

          {/* Poetic Subtitle */}
          <p className="font-sans-clean text-base sm:text-lg text-[#F4F0E9]/80 font-light leading-[1.7] max-w-lg mb-10">
            Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e intensidade. Explore nossas coleções.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreCollection}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#F4F0E9] text-[#121110] text-xs tracking-[0.2em] uppercase font-medium transition-all hover:bg-white active:scale-98"
            >
              Conheça a Coleção
            </button>
            <button
              onClick={onScrollToNext}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#F4F0E9]/30 text-[#F4F0E9] text-xs tracking-[0.2em] uppercase font-medium hover:border-[#F4F0E9] hover:bg-white/5 transition-all active:scale-98"
            >
              Nossa História
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
