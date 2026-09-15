import React, { useEffect } from 'react';
import { X, Sparkles, Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import { DISCOVERY_SET_DETAILS, createWhatsAppLink } from '../data/perfumes';
import { Perfume } from '../types';

interface DiscoverySetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoverySetModal: React.FC<DiscoverySetModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  const discoveryPerfumeMock: Perfume = {
    id: 'coffret-descoberta',
    brand: 'Máximo',
    name: DISCOVERY_SET_DETAILS.name,
    subtitle: DISCOVERY_SET_DETAILS.subtitle,
    family: 'Amadeirados',
    notes: {
      top: ['Cedro Oculto (3 ml)'],
      heart: ['Íris Branca (3 ml)'],
      base: ['Âmbar Primal (3 ml)'],
    },
    shortNotes: 'Cedro Oculto · Íris Branca · Âmbar Primal',
    price: DISCOVERY_SET_DETAILS.price,
    priceNumeric: DISCOVERY_SET_DETAILS.priceNumeric,
    size: '3 x 3 ml',
    concentration: 'Coffret Curado',
    sensoryDescription: DISCOVERY_SET_DETAILS.description,
    atmosphere: 'O rito pessoal de descoberta olfativa no conforto de sua casa.',
    longevity: 'Duração estimada para 2 semanas de uso diário',
    sillage: 'Variado conforme a fragrância',
    image: DISCOVERY_SET_DETAILS.image,
  };

  const handleWhatsApp = () => {
    const text = `Olá! Gostaria de pedir o ${DISCOVERY_SET_DETAILS.name} (${DISCOVERY_SET_DETAILS.subtitle}) da Máximo Eau de Parfum com o crédito para frasco completo.`;
    window.open(createWhatsAppLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="discovery-set-modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="discovery-set-modal-container"
        className="relative w-full max-w-4xl bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/15 dark:border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-discovery-set-modal-btn"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] z-20 focus:outline-none"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Visual Column */}
          <div className="md:col-span-5 bg-[#EAE3D9] dark:bg-[#11100F] p-8 sm:p-10 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#24221F]/10 dark:border-white/10 relative">
            <div className="w-full aspect-square max-w-[280px] bg-[#F4F0E9] dark:bg-[#181614] border border-[#24221F]/10 dark:border-white/10 p-6 flex items-center justify-center shadow-inner">
              <img
                src={DISCOVERY_SET_DETAILS.image}
                alt={DISCOVERY_SET_DETAILS.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <span className="font-mono-subtle text-[10px] tracking-widest uppercase text-[#A96227] dark:text-[#D4AF37] mt-6">
              ESTÚDIO MÁXIMO · EDIÇÃO LIMITADA
            </span>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-8 sm:p-10 md:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono-subtle text-[10px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                <span>RITO DE DEGUSTAÇÃO</span>
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB] font-light">
                {DISCOVERY_SET_DETAILS.name}
              </h3>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-mono-subtle text-xl text-[#24221F] dark:text-[#F5F2EB] font-bold">
                  Valores sob consulta
                </span>
                <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-semibold">
                  CONSULTORIA VIA WHATSAPP
                </span>
              </div>

              <p className="font-sans-clean text-sm sm:text-base text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
                {DISCOVERY_SET_DETAILS.description}
              </p>

              {/* Sample Breakdown */}
              <div className="space-y-3 pt-2">
                <span className="font-mono-subtle text-[10px] tracking-[0.2em] text-[#24221F]/60 dark:text-[#F5F2EB]/60 uppercase block">
                  AS 3 FRAGRÂNCIAS INCLUSAS NO COFFRET:
                </span>
                <div className="grid grid-cols-1 gap-2 font-mono-subtle text-xs">
                  {DISCOVERY_SET_DETAILS.samples.map((item, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-[#EAE3D9] dark:bg-[#1E1C1A] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-between"
                    >
                      <span className="text-[#24221F] dark:text-[#F5F2EB] font-medium">{item}</span>
                      <span className="text-[#A96227] dark:text-[#D4AF37] text-[11px]">3 ml spray</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advantages List */}
              <div className="pt-2 space-y-2 border-t border-[#24221F]/10 dark:border-white/10 font-mono-subtle text-xs text-[#24221F]/80 dark:text-[#F5F2EB]/80">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                  <span>Frete cortesia para todo o território nacional.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                  <span>Voucher de crédito digital enviado junto ao rastreio.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#24221F]/10 dark:border-white/10">
              <button
                id="discovery-modal-whatsapp-btn"
                onClick={handleWhatsApp}
                className="w-full py-4 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.98] font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                <span>SOLICITAR DISCOVERY SET VIA WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
