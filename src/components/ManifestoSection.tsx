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
      className="relative w-full bg-[#121110] text-[#F4F0E9] py-24 sm:py-32 md:py-36 border-b border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-20 items-center">
          
          {/* Left Column: Pure Black & White Photography */}
          <div className="xl:col-span-5 order-2 xl:order-1 relative">
            <div className="aspect-[3/4] w-full overflow-hidden bg-black border border-white/10">
              <img 
                src="/images/manifesto-skin.jpg"
                alt="Detalhe editorial em preto e branco"
                className="w-full h-full object-cover grayscale opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Typography & Negative Space */}
          <div className="xl:col-span-7 order-1 xl:order-2 flex flex-col space-y-6 sm:space-y-8 max-w-2xl">
            <div>
              {/* Subtle Label */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
                  O MANIFESTO
                </span>
                <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
              </div>

              {/* Title */}
              <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-light leading-[1.08] tracking-[-0.01em] text-[#F4F0E9] mb-8">
                O luxo está <br />
                <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">no detalhe.</span>
              </h2>

              {/* Poetic Paragraph */}
              <p className="font-sans-clean text-base sm:text-lg lg:text-xl text-[#EAE3D9]/80 font-light leading-[1.75] mb-10">
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
            <div className="pt-8 mt-4 border-t border-white/10 grid grid-cols-2 gap-6 font-mono-subtle text-xs text-[#EAE3D9]/60 w-full">
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
