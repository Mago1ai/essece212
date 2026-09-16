import React from 'react';

interface CollectionIntroProps {
  onExplore: () => void;
}

export const CollectionIntro: React.FC<CollectionIntroProps> = ({ onExplore }) => {
  return (
    <section className="w-full bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] py-20 lg:py-28 border-b border-[#24221F]/10 dark:border-white/10">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light mb-6">
          Nossas <span className="italic text-[#A96227] dark:text-[#D4AF37]">Fragrâncias</span>
        </h2>
        
        <p className="font-sans-clean text-sm sm:text-base font-light opacity-80 leading-relaxed mb-10 max-w-2xl mx-auto">
          Descubra a arte da perfumaria Máximo. Uma curadoria exclusiva de fragrâncias de alta fidelidade,
          inspiradas nos maiores clássicos e novidades da perfumaria mundial, recriadas com precisão 
          para garantir projeção e uma presença inesquecível.
        </p>

        <button
          onClick={onExplore}
          className="px-8 py-3 bg-[#24221F] text-[#F4F0E9] dark:bg-white dark:text-[#121110] text-xs tracking-[0.15em] uppercase font-mono-subtle hover:bg-[#A96227] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#121110] transition-colors"
        >
          Explorar Catálogo
        </button>
      </div>
    </section>
  );
};
