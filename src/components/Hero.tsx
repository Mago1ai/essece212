import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, Sparkles, MessageCircle, Compass } from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';
import { MaximoLogo } from './MaximoLogo';

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
  // Select 5 real iconic perfumes for the hero campaign rotation
  const featuredIds = [
    'maximo-pour-homme-edp',
    'maximo-pour-femme-edp',
    'maximo-sabonete-liquido',
    'maximo-body-splash',
    'aventus-creed',
  ];

  const featuredPerfumes = perfumes.filter((p) => featuredIds.includes(p.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const activePerfume = featuredPerfumes[currentIndex] || perfumes[0];

  // Subtle auto-rotation every 8 seconds
  useEffect(() => {
    if (featuredPerfumes.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPerfumes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredPerfumes.length]);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center bg-[#F4EFE6] dark:bg-[#11100E] text-[#1E1C1A] dark:text-[#F4F0E9] overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Editorial Atmosphere with Fine Ambient Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial from-transparent via-[#F4EFE6]/70 to-[#EAE4D9] dark:via-[#11100E]/70 dark:to-[#0A0908] transition-colors duration-500" />
        {/* Extremely Discreet Champagne Jewelry Glow */}
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#C5A059]/8 dark:bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-[#1E1C1A]/5 dark:bg-black/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container with safe top clearance for fixed header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 flex flex-col justify-between min-h-[85vh] md:min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-12 items-center my-auto">
          {/* Left Column: Quiet Luxury Display Typography */}
          <div className="lg:col-span-7 max-w-2xl space-y-6 sm:space-y-8">
            {/* Brand Logo Stamp */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-xs tracking-[0.32em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                CASA DE ALTA PERFUMARIA
              </span>
              <div className="w-10 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>

            {/* Campaign Central Concept */}
            <h1 className="font-serif-editorial text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-light tracking-[-0.01em] leading-[1.06] text-[#1E1C1A] dark:text-[#F4F0E9]">
              A presença que <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">permanece.</span>
            </h1>

            {/* Poetic Subtitle */}
            <p className="font-sans-clean text-base sm:text-lg md:text-xl text-[#1E1C1A]/75 dark:text-[#F4F0E9]/80 font-light leading-relaxed max-w-lg">
              Fragrâncias nobres e rituais de autocuidado com maceração artesanal, desenhados para deixar uma assinatura inesquecível na pele e no ar.
            </p>

            {/* Elegant Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-cta-btn"
                onClick={onExploreCollection}
                className="group inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 min-h-[50px] bg-[#1E1C1A] hover:bg-[#A96227] text-white dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] dark:text-[#121110] text-xs sm:text-[13px] tracking-[0.22em] uppercase transition-all duration-300 active:scale-[0.98] font-bold shadow-lg shadow-black/10 dark:shadow-[#D4AF37]/15 rounded-xs cursor-pointer touch-press"
              >
                <span>DESCOBRIR A COLEÇÃO</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-fragrances-btn"
                onClick={onScrollToNext}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 min-h-[50px] border border-[#1E1C1A]/20 dark:border-white/20 hover:border-[#A96227] dark:hover:border-[#D4AF37] bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/60 backdrop-blur-md text-[#1E1C1A] dark:text-[#F4F0E9] text-xs sm:text-[13px] tracking-[0.18em] uppercase transition-all duration-300 active:scale-[0.98] font-semibold rounded-xs cursor-pointer touch-press"
              >
                <Compass className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
                <span>EXPLORAR FRAGRÂNCIAS</span>
              </button>
            </div>

            {/* Quiet Atelier Guarantees */}
            <div className="flex items-center gap-6 sm:gap-10 pt-6 border-t border-[#1E1C1A]/10 dark:border-white/10 text-xs text-[#1E1C1A]/70 dark:text-white/70 font-mono-subtle">
              <div>
                <span className="block text-[#A96227] dark:text-[#D4AF37] font-semibold text-xs sm:text-sm">90 Dias de Maceração</span>
                <span className="text-[11px] text-[#1E1C1A]/60 dark:text-white/50">Harmonia & Fixação</span>
              </div>
              <div className="w-[1px] h-7 bg-[#1E1C1A]/15 dark:bg-white/15" />
              <div>
                <span className="block text-[#1E1C1A] dark:text-white font-semibold text-xs sm:text-sm">Envio Seguro</span>
                <span className="text-[11px] text-[#1E1C1A]/60 dark:text-white/50">Todo o Brasil</span>
              </div>
              <div className="w-[1px] h-7 bg-[#1E1C1A]/15 dark:bg-white/15" />
              <div>
                <span className="block text-[#1E1C1A] dark:text-white font-semibold text-xs sm:text-sm">Atelier Concierge</span>
                <span className="text-[11px] text-[#1E1C1A]/60 dark:text-white/50">Via WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Bottle Spotlight Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {activePerfume && (
              <div className="w-full max-w-md relative group">
                {/* Floating Studio Halo Glow */}
                <div className="absolute inset-0 bg-radial from-[#C5A059]/20 dark:from-[#D4AF37]/25 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Main Luxury Pedestal Container */}
                <div
                  className="relative z-10 bg-[#FAF7F2] dark:bg-[#161513] border border-[#1E1C1A]/10 dark:border-white/15 p-6 sm:p-8 rounded-xs shadow-[0_24px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:border-[#A96227]/60 dark:hover:border-[#D4AF37]/60"
                  onClick={() => onSelectPerfume(activePerfume)}
                >
                  {/* Top Spotlight Tag */}
                  <div className="flex items-center justify-between mb-4 text-xs tracking-[0.2em] uppercase font-semibold">
                    <span className="text-[#A96227] dark:text-[#D4AF37] flex items-center gap-1.5 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                      ÍCONE EM DESTAQUE
                    </span>
                    <span className="text-[#1E1C1A]/70 dark:text-white/70 bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono-subtle">
                      {activePerfume.family}
                    </span>
                  </div>

                  {/* Bottle Visual Stage */}
                  <div className="relative aspect-[3/4] w-full flex items-center justify-center">
                    <EditorialImage
                      src={activePerfume.image}
                      fallbackSrc={activePerfume.secondaryImage}
                      alt={activePerfume.name}
                      brand={activePerfume.brand}
                      name={activePerfume.name}
                      aspectRatio="aspect-[3/4]"
                      padding="p-3 sm:p-5"
                      showContactShadow={true}
                      enableTilt={true}
                      showMistParticles={true}
                    />
                  </div>

                  {/* Bottle Details Header */}
                  <div className="mt-4 pt-4 border-t border-[#1E1C1A]/10 dark:border-white/10 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-[#A96227] dark:text-[#D4AF37] font-semibold uppercase tracking-[0.2em] block">
                        {activePerfume.brand}
                      </span>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1E1C1A] dark:text-white font-normal leading-tight group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors mt-0.5">
                        {activePerfume.name}
                      </h3>
                      <p className="text-xs text-[#1E1C1A]/70 dark:text-white/70 font-light mt-1">
                        {activePerfume.size} · {activePerfume.concentration}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl text-[#1E1C1A] dark:text-white font-serif font-medium block">
                        {activePerfume.price}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#A96227] dark:text-[#D4AF37] font-semibold">
                        Ver Dossiê →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottle Carousel Selectors */}
                <div className="flex items-center justify-center gap-1.5 mt-4 overflow-x-auto py-1 max-w-full no-scrollbar">
                  {featuredPerfumes.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`px-3 py-1.5 text-[11px] font-mono-subtle uppercase border transition-all duration-300 whitespace-nowrap rounded-xs font-semibold cursor-pointer ${
                        currentIndex === idx
                          ? 'bg-[#1E1C1A] text-white border-[#1E1C1A] dark:bg-[#D4AF37] dark:text-[#121110] dark:border-[#D4AF37] shadow-sm'
                          : 'bg-[#FAF7F2] dark:bg-[#181614] text-[#1E1C1A]/70 dark:text-white/70 border-[#1E1C1A]/15 dark:border-white/15 hover:border-[#A96227]'
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
        <div className="flex items-end justify-between pt-8 sm:pt-10 border-t border-[#1E1C1A]/10 dark:border-white/10 text-[#1E1C1A]/60 dark:text-white/60 mt-6 sm:mt-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] font-mono font-semibold">
              01 / 08
            </span>
            <span className="hidden sm:inline-block w-8 h-[1px] bg-[#1E1C1A]/20 dark:bg-white/20" />
            <span className="hidden sm:inline-block text-[11px] tracking-[0.2em] uppercase font-mono-subtle">
              MÁXIMO EAU DE PARFUM · CURADORIA DE PRESTÍGIO
            </span>
          </div>

          <button
            id="hero-scroll-down-btn"
            onClick={onScrollToNext}
            className="group flex items-center gap-2.5 text-left focus:outline-none min-h-[44px] py-1 cursor-pointer"
            aria-label="Deslizar para a próxima seção"
          >
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#A96227] dark:text-[#D4AF37] group-hover:text-[#1E1C1A] dark:group-hover:text-white transition-colors font-semibold">
              CONHEÇA A CASA
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#1E1C1A]/25 dark:border-white/25 flex items-center justify-center group-hover:border-[#A96227] dark:group-hover:border-[#D4AF37] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};


