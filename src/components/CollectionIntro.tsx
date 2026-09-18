import React from 'react';

interface CollectionIntroProps {
  onExplore: () => void;
}

export const CollectionIntro: React.FC<CollectionIntroProps> = ({ onExplore }) => {
  return (
    <section className="w-full bg-[#F4F0E9] dark:bg-[#141210] text-[#24221F] dark:text-[#F5F2EB] py-20 sm:py-24 lg:py-28 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-[850px] mx-auto px-6 text-center">
        {/* Subtle Label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
          <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
            CURADORIA EXCLUSIVA
          </span>
          <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.01em] leading-tight mb-6">
          Nossas <span className="italic text-[#A96227] dark:text-[#D4AF37]">Fragrâncias</span>
        </h2>
        
        <p className="font-sans-clean text-base sm:text-lg text-[#24221F]/75 dark:text-[#F5F2EB]/75 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          Descubra a arte da perfumaria Máximo. Uma curadoria exclusiva de fragrâncias de alta fidelidade,
          inspiradas nos maiores clássicos e novidades da perfumaria mundial, recriadas com precisão 
          para garantir projeção e uma presença inesquecível.
        </p>

        <button
          onClick={onExplore}
          className="px-8 py-3.5 bg-[#24221F] text-[#F4F0E9] dark:bg-[#F4F0E9] dark:text-[#121110] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#A96227] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#121110] transition-colors"
        >
          Explorar Catálogo
        </button>
      </div>
    </section>
  );
};
