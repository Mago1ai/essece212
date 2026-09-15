import React from 'react';
import { X, Heart, Trash2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink, createWhatsAppLink } from '../data/perfumes';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  perfumes: Perfume[];
  onToggleFavorite: (id: string) => void;
  onClearAllFavorites?: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  perfumes,
  onToggleFavorite,
  onClearAllFavorites,
  onSelectPerfume,
}) => {
  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const favoritePerfumes = perfumes.filter((p) => favorites.includes(p.id));

  const handleConsultAllOnWhatsApp = () => {
    if (favoritePerfumes.length === 0) return;

    const itemsText = favoritePerfumes
      .map(
        (p, idx) =>
          `${idx + 1}. *${p.name}* (${p.brand} · ${p.size}) - ${p.price}`
      )
      .join('\n');

    const totalEstimate = favoritePerfumes.reduce((acc, curr) => acc + curr.priceNumeric, 0);

    const message = `Olá! Salvei ${favoritePerfumes.length} ${
      favoritePerfumes.length === 1 ? 'fragrância' : 'fragrâncias'
    } na minha Curadoria Pessoal no catálogo Máximo Eau de Parfum:\n\n${itemsText}\n\nValor estimado: R$ ${totalEstimate
      .toFixed(2)
      .replace('.', ',')}\n\nGostaria de consultar a disponibilidade e tirar dúvidas sobre esses itens.`;

    window.open(createWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="favorites-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-xs flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="favorites-drawer-container"
        className="w-full max-w-md bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] h-full shadow-2xl flex flex-col justify-between border-l border-[#24221F]/15 dark:border-white/10 animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Safe Area Top */}
        <div className="p-4 sm:p-7 border-b border-[#24221F]/10 dark:border-white/10 flex items-center justify-between pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A96227]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#A96227] dark:text-[#D4AF37] fill-[#A96227] dark:fill-[#D4AF37]" />
            </div>
            <div>
              <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block font-semibold">
                SUA CURADORIA PESSOAL
              </span>
              <h3 className="font-serif-editorial text-xl sm:text-3xl text-[#24221F] dark:text-[#F5F2EB]">
                Perfumes Salvos ({favoritePerfumes.length})
              </h3>
            </div>
          </div>
          <button
            id="close-favorites-btn"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors focus:outline-none rounded-full touch-press"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* List of Favorited Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-4 sm:space-y-5 no-scrollbar overscroll-contain">
          {favoritePerfumes.length === 0 ? (
            <div className="text-center py-16 sm:py-20 space-y-3.5 sm:space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-[#EAE3D9] dark:bg-[#221F1C] flex items-center justify-center text-[#24221F]/40 dark:text-[#F5F2EB]/40">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5] text-[#A96227] dark:text-[#D4AF37]" />
              </div>
              <h4 className="font-serif-editorial text-xl sm:text-3xl text-[#24221F]/80 dark:text-[#F5F2EB]/80 italic">
                Nenhum perfume salvo ainda.
              </h4>
              <p className="font-sans-clean text-xs sm:text-sm text-[#24221F]/70 dark:text-[#F5F2EB]/70 max-w-xs mx-auto leading-relaxed">
                Clique no ícone de coração nos frascos da coleção para salvar suas fragrâncias prediletas e consultá-las a qualquer momento.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 sm:px-7 py-3 min-h-[44px] border border-[#24221F] dark:border-white/20 font-mono-subtle text-xs tracking-[0.2em] uppercase hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-white dark:hover:text-[#121110] transition-all font-semibold touch-press"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-mono-subtle">
                  {favoritePerfumes.length} {favoritePerfumes.length === 1 ? 'fragrância salva' : 'fragrâncias salvas'}
                </span>
                {onClearAllFavorites && (
                  <button
                    onClick={onClearAllFavorites}
                    className="text-xs text-red-700 dark:text-red-400 hover:underline font-mono-subtle flex items-center gap-1 min-h-[44px] px-2 touch-press"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Limpar todos</span>
                  </button>
                )}
              </div>

              {favoritePerfumes.map((perfume) => {
                const whatsAppLink = createProductWhatsAppLink(
                  perfume.name,
                  perfume.brand,
                  perfume.size,
                  perfume.price
                );

                return (
                  <div
                    key={perfume.id}
                    id={`favorite-item-${perfume.id}`}
                    className="p-3.5 sm:p-4 bg-[#EAE3D9] dark:bg-[#1E1C1A] border border-[#24221F]/10 dark:border-white/10 flex flex-col gap-2.5 sm:gap-3 group transition-all duration-200 hover:border-[#A96227]/30 dark:hover:border-[#D4AF37]/40 shadow-xs rounded-xs"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image Thumbnail */}
                      <div
                        className="w-18 h-22 sm:w-20 sm:h-24 bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-center p-2 cursor-pointer overflow-hidden shrink-0 rounded-xs touch-press"
                        onClick={() => {
                          onSelectPerfume(perfume);
                          onClose();
                        }}
                      >
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            if (perfume.secondaryImage && (e.currentTarget.src !== perfume.secondaryImage)) {
                              e.currentTarget.src = perfume.secondaryImage;
                            }
                          }}
                          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className="font-mono-subtle text-[10px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-semibold">
                              {perfume.brand}
                            </span>
                            <button
                              onClick={() => onToggleFavorite(perfume.id)}
                              className="text-[#24221F]/50 dark:text-[#F5F2EB]/50 hover:text-red-700 dark:hover:text-red-400 p-2 transition-colors touch-press"
                              title="Remover dos favoritos"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h4
                            onClick={() => {
                              onSelectPerfume(perfume);
                              onClose();
                            }}
                            className="font-serif-editorial text-lg sm:text-xl text-[#24221F] dark:text-[#F5F2EB] leading-tight hover:text-[#A96227] dark:hover:text-[#D4AF37] cursor-pointer transition-colors mt-0.5"
                          >
                            {perfume.name}
                          </h4>

                          <p className="font-mono-subtle text-[11px] sm:text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 mt-0.5 sm:mt-1">
                            {perfume.size} · {perfume.concentration}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1.5 sm:pt-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#A96227] dark:text-[#D4AF37] font-semibold">
                            Exclusivo
                          </span>

                          <button
                            onClick={() => {
                              onSelectPerfume(perfume);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 font-mono-subtle text-[11px] sm:text-xs tracking-wider text-[#A96227] dark:text-[#D4AF37] uppercase hover:underline font-semibold touch-press min-h-[36px] px-1"
                          >
                            <span>Dossiê</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action: Direct WhatsApp */}
                    <div className="pt-2 border-t border-[#24221F]/10 dark:border-white/10">
                      <a
                        href={whatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] py-2.5 px-3 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 text-center font-bold shadow-xs active:scale-[0.98] rounded-xs touch-press"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>CONSULTAR NO WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary / Bulk WhatsApp Consultation with Safe Area Bottom */}
        {favoritePerfumes.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#24221F]/10 dark:border-white/10 bg-[#EAE3D9] dark:bg-[#141311] space-y-2.5 sm:space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between text-xs font-mono-subtle">
              <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70 uppercase tracking-wider">
                Total de Itens:
              </span>
              <span className="font-bold text-[#24221F] dark:text-[#F5F2EB] text-sm">
                {favoritePerfumes.length} {favoritePerfumes.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            <button
              id="consult-all-favorites-whatsapp-btn"
              onClick={handleConsultAllOnWhatsApp}
              className="w-full min-h-[48px] py-3.5 px-3 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 font-bold shadow-md rounded-xs touch-press"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CONSULTAR CURADORIA NO WHATSAPP</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

