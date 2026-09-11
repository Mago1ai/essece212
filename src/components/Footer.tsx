import React, { useState, useRef } from 'react';
import { BRAND_INFO } from '../data/perfumes';
import { MaximoLogo } from './MaximoLogo';

interface FooterProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacyModal: () => void;
  onOpenReturnsModal: () => void;
  onOpenContactModal: () => void;
  onTriggerEasterEgg?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSearch,
  onNavigateSection,
  onOpenPrivacyModal,
  onOpenReturnsModal,
  onOpenContactModal,
  onTriggerEasterEgg,
}) => {
  const [versionClicks, setVersionClicks] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVersionClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    const next = versionClicks + 1;
    if (next >= 7) {
      setVersionClicks(0);
      onTriggerEasterEgg?.();
    } else {
      setVersionClicks(next);
      clickTimeoutRef.current = setTimeout(() => {
        setVersionClicks(0);
      }, 3500);
    }
  };

  return (
    <footer
      id="main-footer"
      className="w-full bg-[#F4F0E9] dark:bg-[#0D0C0B] text-[#24221F] dark:text-[#F5F2EB] pt-24 pb-16 border-t border-[#24221F]/10 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#24221F]/10 dark:border-white/10">
          {/* Brand Identity & Origin */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-mono-subtle text-xs tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase block font-semibold">
              ALTA PERFUMARIA & AUTOCUIDADO
            </span>
            <div className="pt-1">
              <MaximoLogo size="md" variant="adaptive" className="items-start text-left" />
            </div>
            <p className="font-serif-editorial italic text-xl text-[#24221F]/80 dark:text-[#F5F2EB]/80 pt-1">
              “A presença que permanece.”
            </p>
            <p className="font-mono-subtle text-sm text-[#24221F]/70 dark:text-[#F5F2EB]/70">
              {BRAND_INFO.origin} · Atendimento exclusivo via WhatsApp
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3 font-mono-subtle text-sm tracking-[0.18em] uppercase">
            <span className="text-xs text-[#A96227] dark:text-[#D4AF37] block tracking-[0.24em] mb-4 font-semibold">
              EXPLORAÇÃO
            </span>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigateSection('colecao')}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
                >
                  A Coleção
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('casa')}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
                >
                  A Casa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('descoberta')}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
                >
                  Descoberta Olfativa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('manifesto')}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
                >
                  O Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSearch}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors text-left"
                >
                  Busca no Catálogo
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Contact Column */}
          <div className="md:col-span-4 space-y-3 font-mono-subtle text-sm tracking-[0.18em] uppercase">
            <span className="text-xs text-[#A96227] dark:text-[#D4AF37] block tracking-[0.24em] mb-4 font-semibold">
              ATENDIMENTO & INFORMAÇÕES
            </span>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onOpenContactModal}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors text-left"
                >
                  Fale Conosco / Contato
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReturnsModal}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors text-left"
                >
                  Políticas de Envio & Entregas
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors text-left"
                >
                  Privacidade & Dados
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Version Number Easter Egg */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#24221F]/70 dark:text-[#F5F2EB]/70">
          <p>© {new Date().getFullYear()} {BRAND_INFO.fullName}. Todos os direitos reservados.</p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 uppercase tracking-wider font-mono-subtle text-xs">
            <span>Alta Perfumaria</span>
            <span>·</span>
            <span>Edições Numeradas</span>
            <span>·</span>
            <button
              onClick={handleVersionClick}
              title="Versão do Sistema"
              className="text-[#24221F]/60 dark:text-[#F5F2EB]/60 hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors cursor-default select-none focus:outline-none"
            >
              v2.4.0 · AF MKT
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
