import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Sparkles, Droplets, Eye, MessageCircle } from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';

interface HeroProps {
  perfumes: Perfume[];
  onExploreCollection: () => void;
  onScrollToNext: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const Hero: React.FC<HeroProps> = ({
  perfumes,
  onExploreCollection,
  onScrollToNext,
  onSelectPerfume,
}) => {
  // Featured spotlight perfumes
  const featuredIds = [
    'maximo-body-splash',
    'maximo-sabonete-liquido',
    'maximo-creme-acetinado',
    'aventus-creed',
    'good-girl-carolina-herrera',
  ];

  const featuredPerfumes = perfumes.filter((p) => featuredIds.includes(p.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const activePerfume = featuredPerfumes[currentIndex] || perfumes[0];

  // Auto cycle every 7 seconds if user isn't interacting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPerfumes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredPerfumes.length]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center bg-[#F7F4EE] dark:bg-[#141210] text-[#24221F] dark:text-[#F4F0E9] overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Editorial Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=2200&q=85"
          alt="Frasco de alta perfumaria autoral em vidro âmbar sobre pedra de travertino e linho marfim"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[70%_center] sm:object-[65%_center] md:object-center brightness-[0.95] dark:brightness-[0.75] contrast-[1.05] dark:contrast-[1.1] transition-all duration-500"
        />
        {/* Vignette & Left Gradient for Maximum Typographic Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EE]/98 via-[#F7F4EE]/85 to-[#F7F4EE]/50 dark:from-[#121110]/98 dark:via-[#121110]/85 dark:to-[#121110]/40 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4EE] via-transparent to-white/30 dark:from-[#121110] dark:via-transparent dark:to-black/50 transition-colors duration-500" />
        {/* Subtle Luxury Gold Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#A96227]/10 dark:bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28 flex flex-col justify-between min-h-[85vh] md:min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-8 sm:mt-12">
          {/* Left Column: Editorial Display Typography */}
          <div className="lg:col-span-7 max-w-xl">
            {/* Subtle Label */}
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 h-[1px] bg-[#A96227] dark:bg-[#D4AF37]" />
              <span className="text-[11px] sm:text-[12px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                MÁXIMO EAU DE PARFUM · ALTA PERFUMARIA
              </span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.01em] leading-[1.08] text-[#24221F] dark:text-[#F4F0E9] mb-6 sm:mb-8">
              A presença que <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">permanece.</span>
            </h1>

            {/* Poetic Subtitle */}
            <p className="font-sans-clean text-lg sm:text-xl md:text-2xl text-[#24221F]/85 dark:text-[#F4F0E9]/90 font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e sensorialidade aveludada.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-cta-btn"
                onClick={onExploreCollection}
                className="group inline-flex items-center gap-3.5 px-8 py-4 bg-[#24221F] hover:bg-[#A96227] text-white dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] dark:text-[#121110] text-sm tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.97] focus:outline-none font-bold shadow-lg shadow-black/10 dark:shadow-[#D4AF37]/15"
              >
                <span>VER CATÁLOGO COMPLETO</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href="https://wa.me/5531975394776?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20as%20fragr%C3%A2ncias%20da%20M%C3%A1ximo%20Eau%20de%20Parfum."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-4 border border-[#24221F]/20 dark:border-white/20 hover:border-[#A96227] dark:hover:border-[#D4AF37] bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 backdrop-blur-md text-[#24221F] dark:text-[#F4F0E9] text-sm tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.97] font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
                <span>CONSULTORIA WHATSAPP</span>
              </a>
            </div>

            {/* Brand Distinctions */}
            <div className="flex items-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-[#24221F]/10 dark:border-white/10 text-sm text-[#24221F]/80 dark:text-white/70 font-mono-subtle">
              <div>
                <span className="block text-[#A96227] dark:text-[#D4AF37] font-semibold text-base">Envio Cortesia</span>
                <span className="text-xs sm:text-sm text-[#24221F]/70 dark:text-white/60">Todo o Brasil</span>
              </div>
              <div className="w-[1px] h-9 bg-[#24221F]/15 dark:bg-white/15" />
              <div>
                <span className="block text-[#24221F] dark:text-white font-semibold text-base">Edições Numeradas</span>
                <span className="text-xs sm:text-sm text-[#24221F]/70 dark:text-white/60">Lotes Artesanais</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Perfume Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {activePerfume && (
              <div className="w-full max-w-md relative group">
                {/* Floating Glow Behind Bottle */}
                <div className="absolute inset-0 bg-radial from-[#A96227]/15 dark:from-[#D4AF37]/20 via-transparent to-transparent rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

                {/* Main Interactive Animated Bottle Container */}
                <div
                  className="relative z-10 bg-[#FAF8F5]/90 dark:bg-gradient-to-b dark:from-[#1E1C19]/90 dark:to-[#141210]/95 border border-[#24221F]/10 dark:border-white/15 p-6 sm:p-7 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-[#A96227]/60 dark:hover:border-[#D4AF37]/60"
                  onClick={() => onSelectPerfume(activePerfume)}
                >
                  {/* Top Badge on Stage */}
                  <div className="flex items-center justify-between mb-4 text-xs tracking-[0.2em] uppercase font-semibold">
                    <span className="text-[#A96227] dark:text-[#D4AF37] flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                      EM DESTAQUE
                    </span>
                    <span className="text-[#24221F]/80 dark:text-white/80 bg-[#24221F]/5 dark:bg-white/10 px-2.5 py-1 rounded-xs text-[11px]">
                      {activePerfume.family}
                    </span>
                  </div>

                  {/* Animated Bottle Image with Float Effect */}
                  <div className="relative aspect-[3/4] w-full flex items-center justify-center animate-float">
                    <EditorialImage
                      src={activePerfume.image}
                      fallbackSrc={activePerfume.secondaryImage}
                      alt={activePerfume.name}
                      brand={activePerfume.brand}
                      name={activePerfume.name}
                      aspectRatio="aspect-[3/4]"
                      padding="p-4 sm:p-6"
                      showContactShadow={true}
                      enableTilt={true}
                      showMistParticles={true}
                    />
                  </div>

                  {/* Bottle Info Overlay */}
                  <div className="mt-5 pt-4 border-t border-[#24221F]/10 dark:border-white/10 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-[#A96227] dark:text-[#D4AF37] font-semibold uppercase tracking-widest block">
                        {activePerfume.brand}
                      </span>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#24221F] dark:text-white font-normal leading-tight group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors mt-0.5">
                        {activePerfume.name}
                      </h3>
                      <p className="text-sm text-[#24221F]/80 dark:text-white/80 font-light mt-1">
                        {activePerfume.size} · {activePerfume.concentration}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl text-[#24221F] dark:text-white font-serif font-medium block">
                        {activePerfume.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPerfume(activePerfume);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#A96227] dark:text-[#D4AF37] hover:underline mt-1 font-semibold ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>DETALHES</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interactive Bottle Selector Pills */}
                <div className="flex items-center justify-center gap-2.5 mt-5 overflow-x-auto py-1 max-w-full">
                  {featuredPerfumes.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`px-4 py-2 text-xs tracking-[0.16em] uppercase border transition-all duration-300 whitespace-nowrap rounded-xs font-semibold ${
                        currentIndex === idx
                          ? 'bg-[#24221F] text-white border-[#24221F] dark:bg-[#D4AF37] dark:text-[#121110] dark:border-[#D4AF37] scale-105 shadow-md'
                          : 'bg-white/90 dark:bg-black/60 text-[#24221F]/80 dark:text-white/80 border-[#24221F]/20 dark:border-white/20 hover:border-[#A96227] dark:hover:border-white/40'
                      }`}
                    >
                      {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Editorial Coordinates & Scroll Indicator */}
        <div className="flex items-end justify-between pt-12 border-t border-[#24221F]/10 dark:border-white/15 text-[#24221F]/70 dark:text-white/70">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-medium">
              01 / 04
            </span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-[#24221F]/20 dark:bg-white/20" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.18em] uppercase text-[#24221F]/60 dark:text-white/50 font-medium">
              MÁXIMO EAU DE PARFUM & INSPIRAÇÕES
            </span>
          </div>

          <button
            id="hero-scroll-down-btn"
            onClick={onScrollToNext}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Deslizar para a próxima seção"
          >
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#A96227] dark:text-[#D4AF37] group-hover:text-[#24221F] dark:group-hover:text-white transition-colors font-semibold">
              DESLIZE PARA A COLEÇÃO
            </span>
            <div className="w-8 h-8 rounded-full border border-[#24221F]/30 dark:border-white/30 flex items-center justify-center group-hover:border-[#A96227] dark:group-hover:border-[#D4AF37] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

