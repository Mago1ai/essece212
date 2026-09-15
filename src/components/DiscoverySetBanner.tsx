import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { DISCOVERY_SET_DETAILS } from '../data/perfumes';

interface DiscoverySetBannerProps {
  onOrderDiscoverySet: () => void;
}

export const DiscoverySetBanner: React.FC<DiscoverySetBannerProps> = ({
  onOrderDiscoverySet,
}) => {
  return (
    <section
      id="discovery-set"
      className="relative w-full bg-[#A96227] text-[#F4F0E9] py-20 sm:py-24 overflow-hidden border-y border-[#8F511E]"
    >
      {/* Subtle organic texture effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Heading and Curated Samples */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono-subtle text-[11px] tracking-[0.24em] text-white/80 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-white/90" />
              <span>EXPERIÊNCIA DE AMOSTRAGEM</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12] text-[#F4F0E9]">
              Experimente <br />
              <span className="italic font-normal text-white">antes de escolher.</span>
            </h2>

            <p className="font-sans-clean text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-xl">
              Receba uma seleção de três amostras em casa e encontre a fragrância que conversa com a sua pele.
            </p>

            <div className="pt-2 font-mono-subtle text-xs text-white/75 flex flex-wrap gap-x-6 gap-y-1">
              <span>· 3 x 3 ml em vidro âmbar</span>
              <span>· Condições sob consulta via WhatsApp</span>
              <span>· Frete cortesia</span>
            </div>
          </div>

          {/* Right: Editorial Action */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              id="discovery-set-order-btn"
              onClick={onOrderDiscoverySet}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#F4F0E9] hover:bg-white text-[#24221F] font-mono-subtle text-xs tracking-[0.24em] uppercase transition-all duration-300 shadow-lg active:scale-[0.97] focus:outline-none"
            >
              <span>PEDIR DISCOVERY SET</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A96227]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
