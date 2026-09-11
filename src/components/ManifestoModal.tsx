import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="manifesto-modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="manifesto-modal-container"
        className="relative w-full max-w-3xl bg-[#161514] text-[#F4F0E9] border border-white/15 shadow-2xl p-8 sm:p-12 md:p-16 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-manifesto-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#F4F0E9] hover:text-[#A96227] focus:outline-none"
          aria-label="Fechar manifesto"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="space-y-8">
          <div>
            <span className="font-mono-subtle text-[11px] tracking-[0.28em] text-[#A96227] uppercase block mb-3">
              03 — O MANIFESTO DA CASA
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl font-light leading-tight">
              Sete princípios <br />
              <span className="italic font-normal text-[#A96227]">do luxo silencioso.</span>
            </h2>
          </div>

          <div className="space-y-6 font-sans-clean text-base text-[#EAE3D9]/85 font-light leading-[1.8] border-t border-white/10 pt-6">
            <div className="space-y-2">
              <span className="font-mono-subtle text-xs text-[#A96227] tracking-wider block">
                I. O SILÊNCIO COMO MATÉRIA-PRIMA
              </span>
              <p>
                Não há sofisticação no excesso. A verdadeira elegância vive no espaço negativo — o intervalo que permite à pele respirar e à fragrância evoluir organicamente.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-subtle text-xs text-[#A96227] tracking-wider block">
                II. O TEMPO COMO INGREDIENTE
              </span>
              <p>
                Não aceleramos reações químicas. Nossas macerações duram o tempo necessário para que as matérias brutas se tornem una com o álcool neutro orgânico.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-subtle text-xs text-[#A96227] tracking-wider block">
                III. A REVERÊNCIA À PELE
              </span>
              <p>
                O perfume só existe plenamente em contato com o calor humano. Criamos bases que se fundem ao aroma individual de quem o veste, nunca o mascarando.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono-subtle text-xs text-[#A96227] tracking-wider block">
                IV. SOBRIEDADE FORMAL
              </span>
              <p>
                Vidro âmbar denso para proteger o líquido da luz. Tampas táteis e peso balanceado. Nada de ornamentos descartáveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
