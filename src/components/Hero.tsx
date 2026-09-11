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
      className="relative w-full min-h-[88vh] md:min-h-[92vh] flex items-center bg-[#1A1816] text-[#F4F0E9] overflow-hidden select-none"
    >
      {/* Background Editorial Image - Neutral Fine Fragrance & Travertine Stone */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=2200&q=85"
          alt="Frasco de alta perfumaria autoral em vidro âmbar sobre pedra de travertino e linho marfim"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[70%_center] sm:object-[65%_center] md:object-center brightness-[0.85] contrast-[1.05]"
        />
        {/* Subtle Dark Vignette & Left Gradient for Maximum Typographic Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/75 to-black/30 sm:via-[#141210]/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-transparent to-black/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 flex flex-col justify-between min-h-[82vh] md:min-h-[88vh]">
        <div className="max-w-xl lg:max-w-2xl mt-12 sm:mt-16">
          {/* Subtle Label */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-[1px] bg-[#A96227]" />
            <span className="text-[11px] sm:text-[12px] tracking-[0.26em] text-[#EAE3D9] uppercase font-medium">
              MÁXIMO EAU DE PARFUM · ALTA PERFUMARIA
            </span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.01em] leading-[1.08] text-[#F4F0E9] mb-6 sm:mb-8">
            A presença que <br />
            <span className="italic font-normal text-[#EAE3D9]">permanece.</span>
          </h1>

          {/* Poetic Subtitle */}
          <p className="font-sans-clean text-base sm:text-lg md:text-xl text-[#F4F0E9]/90 font-light leading-relaxed max-w-lg mb-8 sm:mb-10">
            Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e intensidade.
          </p>

          {/* Primary Action Button */}
          <div>
            <button
              id="hero-cta-btn"
              onClick={onExploreCollection}
              className="group inline-flex items-center gap-4 px-7 py-3.5 border border-[#F4F0E9]/60 hover:border-[#F4F0E9] bg-[#F4F0E9]/5 hover:bg-[#F4F0E9]/15 backdrop-blur-xs text-[#F4F0E9] text-xs tracking-[0.22em] uppercase transition-all duration-300 active:scale-[0.97] focus:outline-none focus:ring-1 focus:ring-white font-medium"
            >
              <span>CONHEÇA A COLEÇÃO</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#EAE3D9]" />
            </button>
          </div>
        </div>

        {/* Bottom Editorial Coordinates & Scroll Indicator */}
        <div className="flex items-end justify-between pt-12 border-t border-white/15 text-white/70">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] text-[#EAE3D9] font-medium">
              01 / 03
            </span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-white/20" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.18em] uppercase text-white/50 font-medium">
              EDIÇÃO PERMANENTE
            </span>
          </div>

          <button
            id="hero-scroll-down-btn"
            onClick={onScrollToNext}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Deslizar para a próxima seção"
          >
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#EAE3D9]/80 group-hover:text-white transition-colors font-medium">
              DESLIZE PARA DESCOBRIR
            </span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#EAE3D9] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
