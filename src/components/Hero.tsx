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
      className="relative w-full min-h-[70vh] flex items-center bg-[#1A1816] text-[#F4F0E9] overflow-hidden select-none"
    >
      {/* Background Editorial Image - Kit Máximo Real Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bf85031b26?auto=format&fit=crop&w=1600&q=80"
          alt="Alta Perfumaria Máximo em ambiente editorial"
          className="w-full h-full object-cover object-[50%_30%] brightness-[0.7] contrast-[1.05]"
        />
        {/* Subtle Dark Vignette & Left Gradient for Maximum Typographic Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/75 to-black/20 sm:via-[#141210]/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-transparent to-black/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col justify-center min-h-[70vh]">
        <div className="max-w-xl lg:max-w-2xl mt-12 sm:mt-16">
          {/* Subtle Label */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-[1px] bg-[#A96227]" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.26em] text-[#EAE3D9] uppercase font-medium">
              MÁXIMO EAU DE PARFUM · ALTA PERFUMARIA
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.01em] leading-[1.08] text-[#F4F0E9] mb-6">
            A presença que <br />
            <span className="italic font-normal text-[#EAE3D9]">permanece.</span>
          </h1>

          {/* Poetic Subtitle */}
          <p className="font-sans-clean text-base sm:text-lg text-[#F4F0E9]/90 font-light leading-relaxed max-w-lg mb-10">
            Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e intensidade. Explore nossas coleções.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreCollection}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#F4F0E9] text-[#121110] text-xs tracking-[0.2em] uppercase font-semibold transition-all hover:bg-white active:scale-95"
            >
              Conheça a Coleção
            </button>
            <button
              onClick={onScrollToNext}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#F4F0E9]/40 text-[#F4F0E9] text-xs tracking-[0.2em] uppercase font-medium hover:border-white hover:bg-white/5 transition-all active:scale-95"
            >
              Nossa História
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
