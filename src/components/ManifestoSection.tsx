import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ManifestoSectionProps {
  onOpenManifestoModal: () => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({
  onOpenManifestoModal,
}) => {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#161514] dark:bg-[#0E0D0C] text-[#F4F0E9] py-28 sm:py-36 md:py-44 border-b border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <div className="xl:col-span-5 order-2 xl:order-1 relative">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#000000]">
              <img 
                src="/images/manifesto-skin.jpg"
                alt="Detalhe macro de pele em movimento fluido e luxuoso"
                className="w-full h-full object-cover grayscale opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="xl:col-span-7 order-1 xl:order-2 flex flex-col space-y-8 max-w-2xl">
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
                  03 — O GESTO
                </span>
                <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
              </div>

              {/* Title */}
              <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-light leading-[1.08] tracking-[-0.01em] text-[#F4F0E9] mb-8">
                O luxo está <br />
                <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">no detalhe.</span>
              </h2>

              {/* Poetic Paragraph */}
              <p className="font-sans-clean text-lg sm:text-xl md:text-2xl text-[#EAE3D9]/90 font-light leading-[1.7] mb-10">
                Cada fragrância começa com uma pergunta: que sensação merece voltar? Depois, vem a matéria. O tempo. O silêncio entre uma nota e outra.
              </p>

              <div className="pt-2">
                <button
                  id="manifesto-cta-btn"
                  onClick={onOpenManifestoModal}
                  className="group inline-flex items-center gap-3 font-mono-subtle text-xs sm:text-[13px] tracking-[0.22em] text-[#F4F0E9] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors duration-200 border-b border-white/30 hover:border-[#A96227] dark:hover:border-[#D4AF37] pb-1.5 focus:outline-none"
                >
                  <span>LEIA O MANIFESTO</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A96227] dark:text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Quiet Manifesto Principles */}
            <div className="pt-8 mt-4 border-t border-white/15 grid grid-cols-2 gap-6 font-mono-subtle text-xs text-[#EAE3D9]/60 w-full">
              <div>
                <span className="text-[#A96227] dark:text-[#D4AF37] text-[10px] tracking-widest uppercase block mb-1">
                  TEMPO
                </span>
                <p className="text-[12px] text-[#EAE3D9]">Frascos repousados antes do engarrafamento.</p>
              </div>
              <div>
                <span className="text-[#A96227] dark:text-[#D4AF37] text-[10px] tracking-widest uppercase block mb-1">
                  PUREZA
                </span>
                <p className="text-[12px] text-[#EAE3D9]">Sem corantes artificiais ou aditivos supérfluos.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
