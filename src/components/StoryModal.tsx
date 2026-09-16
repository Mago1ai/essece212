import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BRAND_INFO } from '../data/perfumes';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
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
      id="story-modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="story-modal-container"
        className="relative w-full max-w-3xl bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/15 dark:border-white/10 shadow-2xl p-8 sm:p-12 md:p-16 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-story-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] focus:outline-none"
          aria-label="Fechar história da casa"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="space-y-8">
          <div>
            <span className="font-mono-subtle text-[11px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-3">
              CADERNOS DO ATELIER · {BRAND_INFO.origin}
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl font-light leading-tight">
              A permanência <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">do invisível.</span>
            </h2>
          </div>

          <div className="space-y-6 font-sans-clean text-base sm:text-lg text-[#24221F]/85 dark:text-[#F5F2EB]/85 font-light leading-[1.8] border-t border-[#24221F]/10 dark:border-white/10 pt-6">
            <p>
              A <strong>{BRAND_INFO.name}</strong> nasceu da recusa à pressa e à saturação da perfumaria industrial. Acreditamos que o perfume não deve anunciar a chegada de alguém com estardalhaço, mas sim deixar uma impressão indelével e íntima quando a pessoa já partiu.
            </p>

            <p>
              Nossas fórmulas são concebidas em pequenos lotes no Brasil, mesclando óleos essenciais e absolutos de procedência ética: resinas da Somália, madeiras ancestrais do Atlas, manteiga de íris da Toscana e botânicos selecionados da flora nativa.
            </p>

            <blockquote className="p-6 bg-[#EAE3D9] dark:bg-[#1F1D1A] border-l-2 border-[#A96227] dark:border-[#D4AF37] font-serif-editorial italic text-xl text-[#24221F] dark:text-[#F5F2EB] my-6">
              “Não criamos fragrâncias para disfarçar quem você é, mas para dar contorno ao seu silêncio.”
            </blockquote>

            <p>
              Cada fragrância é produzida com matérias-primas premium e processos minuciosos para garantir alta fixação, projeção e sofisticação sobre a pele.
            </p>
          </div>

          <div className="pt-6 border-t border-[#24221F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono-subtle text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70">
            <span>Atelier em {BRAND_INFO.atelierAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
