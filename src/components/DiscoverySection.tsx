import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DiscoverySectionProps {
  onExplore: () => void;
}

export const DiscoverySection: React.FC<DiscoverySectionProps> = ({
  onExplore,
}) => {
  return (
    <section
      id="descoberta"
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-28 sm:py-36 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
                04 — DESCOBERTA
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>

            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em] mb-6">
              Encontre o seu <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">ponto de partida.</span>
            </h2>

            <p className="font-sans-clean text-lg sm:text-xl text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
              Não sabe por onde começar? Comece pela sensação que você quer deixar no ar. Nossa curadoria olfativa foi pensada para guiar você pela emoção.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE3D9] dark:bg-[#121110]">
              <img 
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80" 
                alt="Pequenos frascos âmbar, laboratório olfativo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Three Large Clickable Interactive Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Block 1: Soft Amber Tone */}
          <button
            id="discovery-block-profundidade"
            onClick={onExplore}
            className="group relative text-left bg-[#E7DDD0] dark:bg-[#1F1D1A] hover:bg-[#DFCDBB] dark:hover:bg-[#2A2723] p-8 sm:p-10 lg:p-12 min-h-[320px] flex flex-col justify-between border border-[#24221F]/10 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1.5 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#A96227] dark:focus:ring-[#D4AF37]"
          >
            <div>
              <span className="font-mono-subtle text-[11px] sm:text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
                QUERO PROFUNDIDADE
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB] font-light leading-snug">
                Madeirados <br />
                <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">e quentes.</span>
              </h3>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[#24221F]/10 dark:border-white/10">
              <span className="font-mono-subtle text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 tracking-wider">
                Cedro · Âmbar · Resinas
              </span>
              <div className="w-9 h-9 rounded-full border border-[#24221F]/20 dark:border-white/20 flex items-center justify-center group-hover:border-[#A96227] dark:group-hover:border-[#D4AF37] group-hover:bg-[#A96227] dark:group-hover:bg-[#D4AF37] transition-all">
                <ArrowRight className="w-4 h-4 text-[#24221F] dark:text-[#F5F2EB] group-hover:text-white dark:group-hover:text-[#121110] transition-colors" />
              </div>
            </div>
          </button>

          {/* Block 2: Soft Taupe/Light Stone Tone */}
          <button
            id="discovery-block-luminosidade"
            onClick={onExplore}
            className="group relative text-left bg-[#DFD9CE] dark:bg-[#1A1916] hover:bg-[#D5CDC0] dark:hover:bg-[#252320] p-8 sm:p-10 lg:p-12 min-h-[320px] flex flex-col justify-between border border-[#24221F]/10 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1.5 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#A96227] dark:focus:ring-[#D4AF37]"
          >
            <div>
              <span className="font-mono-subtle text-[11px] sm:text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
                QUERO LUMINOSIDADE
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB] font-light leading-snug">
                Florais <br />
                <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">e transparentes.</span>
              </h3>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[#24221F]/10 dark:border-white/10">
              <span className="font-mono-subtle text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 tracking-wider">
                Íris · Bergamota · Almíscar
              </span>
              <div className="w-9 h-9 rounded-full border border-[#24221F]/20 dark:border-white/20 flex items-center justify-center group-hover:border-[#A96227] dark:group-hover:border-[#D4AF37] group-hover:bg-[#A96227] dark:group-hover:bg-[#D4AF37] transition-all">
                <ArrowRight className="w-4 h-4 text-[#24221F] dark:text-[#F5F2EB] group-hover:text-white dark:group-hover:text-[#121110] transition-colors" />
              </div>
            </div>
          </button>

          {/* Block 3: Charcoal / Deep Contrast Tone */}
          <button
            id="discovery-block-presenca"
            onClick={onExplore}
            className="group relative text-left bg-[#24221F] dark:bg-[#121110] hover:bg-[#1A1816] dark:hover:bg-[#1D1B18] text-[#F4F0E9] p-8 sm:p-10 lg:p-12 min-h-[320px] flex flex-col justify-between border border-[#24221F] dark:border-[#D4AF37]/30 transition-all duration-300 transform hover:-translate-y-1.5 shadow-md focus:outline-none focus:ring-1 focus:ring-white dark:focus:ring-[#D4AF37]"
          >
            <div>
              <span className="font-mono-subtle text-[11px] sm:text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
                QUERO PRESENÇA
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#F4F0E9] font-light leading-snug">
                Intensos <br />
                <span className="italic font-normal text-[#EAE3D9] dark:text-[#D4AF37]">e noturnos.</span>
              </h3>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-white/15 dark:border-white/10">
              <span className="font-mono-subtle text-xs text-[#F4F0E9]/70 tracking-wider">
                Sândalo · Mirra · Couro
              </span>
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#A96227] dark:group-hover:border-[#D4AF37] group-hover:bg-[#A96227] dark:group-hover:bg-[#D4AF37] transition-all">
                <ArrowRight className="w-4 h-4 text-[#F4F0E9] dark:text-[#F5F2EB] group-hover:text-white dark:group-hover:text-[#121110] transition-colors" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
