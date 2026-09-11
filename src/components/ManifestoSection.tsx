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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Fine Art Editorial Still Life Image */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-white/15 dark:border-white/10 bg-[#1F1D1B]">
              <img
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85"
                alt="Matérias-primas botânicas de alta perfumaria: resinas naturais, madeiras de cedro, bergamota e raízes aromáticas sobre pedra calcária"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono-subtle text-[10px] tracking-[0.22em] text-[#EAE3D9]/70 uppercase">
                ESTUDO Nº 04 · MATÉRIA CRUA
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto Text */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
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
              <p className="font-sans-clean text-lg sm:text-xl md:text-2xl text-[#EAE3D9]/90 font-light leading-[1.7] max-w-xl mb-8">
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
            <div className="pt-8 border-t border-white/15 grid grid-cols-2 gap-6 font-mono-subtle text-xs text-[#EAE3D9]/60">
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
