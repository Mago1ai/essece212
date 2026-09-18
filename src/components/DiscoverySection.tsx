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
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-24 sm:py-32 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
                DESCOBERTA OLFATIVA
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>

            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em] mb-6">
              Encontre o seu <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">ponto de partida.</span>
            </h2>

            <p className="font-sans-clean text-base sm:text-lg text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed max-w-lg">
              Não sabe por onde começar? Comece pela sensação que você quer deixar no ar. Nossa curadoria olfativa foi pensada para guiar você pela emoção.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE3D9] dark:bg-[#121110] border border-[#24221F]/8 dark:border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80" 
                alt="Frascos âmbar em laboratório olfativo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Three Large Clickable Interactive Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Block 1: Quero Profundidade */}
          <button
            id="discovery-block-profundidade"
            onClick={onExplore}
            className="group relative text-left bg-[#EAE3D9] dark:bg-[#1C1A18] hover:bg-[#E3D9CC] dark:hover:bg-[#23201D] p-8 sm:p-10 min-h-[300px] flex flex-col justify-between border border-[#24221F]/8 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
          >
            <div>
              <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
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

          {/* Block 2: Quero Luminosidade */}
          <button
            id="discovery-block-luminosidade"
            onClick={onExplore}
            className="group relative text-left bg-[#E4DDD3] dark:bg-[#181715] hover:bg-[#DCD4C8] dark:hover:bg-[#201E1C] p-8 sm:p-10 min-h-[300px] flex flex-col justify-between border border-[#24221F]/8 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
          >
            <div>
              <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
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

          {/* Block 3: Quero Presença */}
          <button
            id="discovery-block-presenca"
            onClick={onExplore}
            className="group relative text-left bg-[#1A1816] dark:bg-[#121110] hover:bg-[#201D1A] dark:hover:bg-[#171513] text-[#F4F0E9] p-8 sm:p-10 min-h-[300px] flex flex-col justify-between border border-[#24221F]/15 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
          >
            <div>
              <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-6">
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
