import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { MaximoLogo } from './MaximoLogo';

interface FinalCTASectionProps {
  onExploreCatalog: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onExploreCatalog,
}) => {
  return (
    <section
      id="cta-final"
      className="relative w-full bg-[#161412] text-[#F4F0E9] py-28 sm:py-36 md:py-44 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#C5A059]/10 dark:from-[#D4AF37]/15 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 text-center relative z-10 space-y-8 sm:space-y-10">
        {/* Brand Logo in Fine Gold */}
        <div className="flex justify-center mb-4">
          <MaximoLogo variant="light" size="md" />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono-subtle uppercase tracking-[0.34em] text-[#D4AF37] font-semibold block">
            A ASSINATURA INVISÍVEL
          </span>

          <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-[-0.01em]">
            Uma marca pode ser vista. <br />
            <span className="italic font-normal text-[#D4AF37]">
              Uma fragrância é lembrada.
            </span>
          </h2>
        </div>

        <p className="font-sans-clean text-base sm:text-lg md:text-xl text-[#F4F0E9]/75 font-light leading-relaxed max-w-2xl mx-auto">
          Permita que a Casa Máximo guie você na escolha do acorde perfeito para a sua presença.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          <button
            id="final-cta-explore-btn"
            onClick={onExploreCatalog}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#C29D29] text-[#121110] text-xs sm:text-[13px] font-mono-subtle uppercase tracking-[0.22em] font-bold rounded-xs shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer touch-press"
          >
            <span>ENCONTRE SUA FRAGRÂNCIA</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            id="final-cta-whatsapp-btn"
            href="https://wa.me/5531975394776?text=Ol%C3%A1!%20Gostaria%20de%20consultoria%20olfativa%20para%20encontrar%20minha%20fragr%C3%A2ncia%20na%20Casa%20M%C3%A1ximo."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-white/10 backdrop-blur-md text-[#F4F0E9] text-xs sm:text-[13px] font-mono-subtle uppercase tracking-[0.18em] font-semibold rounded-xs transition-all duration-300 active:scale-[0.98] cursor-pointer touch-press"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>FALAR COM CONCIERGE</span>
          </a>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs font-mono-subtle text-white/50 tracking-widest uppercase">
          MÁXIMO EAU DE PARFUM · DESDE 2024 · BELO HORIZONTE · BRASIL
        </div>
      </div>
    </section>
  );
};
