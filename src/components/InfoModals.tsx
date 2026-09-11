import React, { useEffect } from 'react';
import { X, MapPin, Mail, Clock } from 'lucide-react';
import { BRAND_INFO, createWhatsAppLink } from '../data/perfumes';

interface InfoModalProps {
  type: 'contact' | 'returns' | 'privacy' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      id="info-modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="info-modal-container"
        className="relative w-full max-w-2xl bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/15 dark:border-white/10 shadow-2xl p-8 sm:p-10 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] focus:outline-none"
          aria-label="Fechar janela informativa"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {type === 'contact' && (
          <div className="space-y-6">
            <span className="font-mono-subtle text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block">
              ATELIER & ATENDIMENTO
            </span>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB]">
              Venha sentir de perto.
            </h3>
            <p className="font-sans-clean text-base text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
              Atendimento consultivo e personalizado para ajudar você a escolher as fragrâncias e itens de autocuidado ideais para sua rotina ou presente.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#24221F]/10 dark:border-white/10 font-mono-subtle text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37] mt-0.5" />
                <div>
                  <strong className="block text-[#24221F] dark:text-[#F5F2EB] uppercase">Origem & Envios</strong>
                  <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70">{BRAND_INFO.atelierAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37] mt-0.5" />
                <div>
                  <strong className="block text-[#24221F] dark:text-[#F5F2EB] uppercase">Horário de Atendimento</strong>
                  <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70">Segunda a Sábado, das 9h às 20h</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37] mt-0.5" />
                <div>
                  <strong className="block text-[#24221F] dark:text-[#F5F2EB] uppercase">E-mail</strong>
                  <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70">{BRAND_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={createWhatsAppLink('Olá! Gostaria de falar com um especialista da Máximo Eau de Parfum.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#24221F] dark:bg-[#D4AF37] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-[0.2em] uppercase hover:bg-[#151413] dark:hover:bg-[#C29D29] transition-colors font-bold"
              >
                <span>FALAR NO WHATSAPP AGORA</span>
              </a>
            </div>
          </div>
        )}

        {type === 'returns' && (
          <div className="space-y-6">
            <span className="font-mono-subtle text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block">
              POLÍTICA DE EXPERIMENTAÇÃO
            </span>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB]">
              Garantia do frasco intocado.
            </h3>
            <div className="space-y-4 font-sans-clean text-sm sm:text-base text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
              <p>
                Sabemos que a escolha de um perfume é íntima. Por isso, todo frasco de 50 ml adquirido é acompanhado de uma amostra de 3 ml da mesma fragrância.
              </p>
              <div className="p-4 bg-[#EAE3D9] dark:bg-[#1E1C1A] border-l-2 border-[#A96227] dark:border-[#D4AF37] font-mono-subtle text-xs text-[#24221F] dark:text-[#F5F2EB]">
                <strong>Como funciona:</strong> Ao receber sua encomenda, teste primeiro a amostra de 3 ml na sua pele. Se por qualquer razão não for a fragrância ideal, você pode solicitar a troca ou devolução integral do frasco de 50 ml com lacre intacto em até 15 dias, sem qualquer custo de frete.
              </div>
              <p>
                Para iniciar uma troca ou devolução, basta entrar em contato pelo nosso WhatsApp ou e-mail com o número do pedido.
              </p>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-6">
            <span className="font-mono-subtle text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block">
              SEGURANÇA & PRIVACIDADE
            </span>
            <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB]">
              Transparência e respeito.
            </h3>
            <div className="space-y-3 font-sans-clean text-sm text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
              <p>
                Os dados fornecidos em sua navegação e compras são utilizados estritamente para o processamento de pedidos, entrega e, caso autorizado, envio discreto de nossa carta periódica.
              </p>
              <p>
                Nunca comercializamos dados com terceiros nem realizamos campanhas de remarketing agressivo. Suas informações de pagamento são processadas sob criptografia de ponta a ponta.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
