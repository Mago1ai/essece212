import React from 'react';
import { X, Heart, Trash2, ShoppingBag, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Perfume } from '../types';
import { PERFUMES, createProductWhatsAppLink } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (perfume: Perfume) => void;
  onSelectPerfume: (perfume: Perfume) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onAddToCart,
  onSelectPerfume,
}) => {
  if (!isOpen) return null;

  const favoritePerfumes = PERFUMES.filter((p) => favorites.includes(p.id));

  return (
    <div
      id="favorites-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-xs flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="favorites-drawer-container"
        className="w-full max-w-md bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] h-full shadow-2xl flex flex-col justify-between border-l border-[#24221F]/15 dark:border-white/10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#24221F]/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A96227]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#A96227] dark:text-[#D4AF37] fill-[#A96227] dark:fill-[#D4AF37]" />
            </div>
            <div>
              <span className="font-mono-subtle text-[10px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block">
                SUA CURADORIA PESSOAL
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#24221F] dark:text-[#F5F2EB]">
                Perfumes Favoritados ({favoritePerfumes.length})
              </h3>
            </div>
          </div>
          <button
            id="close-favorites-btn"
            onClick={onClose}
            className="p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors focus:outline-none rounded-full"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* List of Favorited Items */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-5">
          {favoritePerfumes.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#EAE3D9] dark:bg-[#221F1C] flex items-center justify-center text-[#24221F]/40 dark:text-[#F5F2EB]/40">
                <Heart className="w-7 h-7 stroke-[1.5] text-[#A96227] dark:text-[#D4AF37]" />
              </div>
              <h4 className="font-serif-editorial text-2xl text-[#24221F]/60 dark:text-[#F5F2EB]/60 italic">
                Nenhum perfume favoritado ainda.
              </h4>
              <p className="font-sans-clean text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 max-w-xs mx-auto leading-relaxed">
                Clique no ícone de coração nos frascos da coleção para salvar suas fragrâncias prediletas e consultá-las a qualquer momento.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 border border-[#24221F] dark:border-white/20 font-mono-subtle text-xs tracking-[0.2em] uppercase hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-white dark:hover:text-[#121110] transition-all"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {favoritePerfumes.map((perfume) => {
                const whatsAppLink = createProductWhatsAppLink(
                  perfume.name,
                  perfume.brand,
                  perfume.size
                );

                return (
                  <div
                    key={perfume.id}
                    id={`favorite-item-${perfume.id}`}
                    className="p-4 bg-[#EAE3D9] dark:bg-[#1E1C1A] border border-[#24221F]/10 dark:border-white/10 flex flex-col gap-3 group transition-all duration-200 hover:border-[#A96227]/30 dark:hover:border-[#D4AF37]/40"
                  >
                    <div className="flex gap-4">
                      {/* Product Image Thumbnail */}
                      <div
                        className="w-20 h-24 bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-center p-2 cursor-pointer overflow-hidden shrink-0"
                        onClick={() => {
                          onSelectPerfume(perfume);
                          onClose();
                        }}
                      >
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className="font-mono-subtle text-[9px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-semibold">
                              {perfume.brand}
                            </span>
                            <button
                              onClick={() => onToggleFavorite(perfume.id)}
                              className="text-[#24221F]/40 dark:text-[#F5F2EB]/40 hover:text-red-700 dark:hover:text-red-400 p-1 transition-colors"
                              title="Remover dos favoritos"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4
                            onClick={() => {
                              onSelectPerfume(perfume);
                              onClose();
                            }}
                            className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] leading-tight hover:text-[#A96227] dark:hover:text-[#D4AF37] cursor-pointer transition-colors"
                          >
                            {perfume.name}
                          </h4>

                          <p className="font-mono-subtle text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60 mt-0.5">
                            {perfume.size} · {perfume.concentration}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37] font-semibold uppercase tracking-wider">
                            Sob Consulta
                          </span>

                          <button
                            onClick={() => {
                              onSelectPerfume(perfume);
                              onClose();
                            }}
                            className="inline-flex items-center gap-1 font-mono-subtle text-[10px] tracking-wider text-[#A96227] dark:text-[#D4AF37] uppercase hover:underline"
                          >
                            <span>Dossiê</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#24221F]/10 dark:border-white/10">
                      <a
                        href={whatsAppLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-2 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 text-center font-semibold shadow-xs active:scale-[0.98]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          onAddToCart(perfume);
                          onClose();
                        }}
                        className="py-2.5 px-2 border border-[#24221F]/25 dark:border-white/20 hover:border-[#24221F] dark:hover:border-white hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-white dark:hover:text-[#121110] text-[#24221F] dark:text-[#F5F2EB] font-mono-subtle text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 text-center font-medium active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>+ Sacola</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {favoritePerfumes.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#24221F]/10 dark:border-white/10 bg-[#EAE3D9] dark:bg-[#141311] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-subtle">
              <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70 uppercase tracking-wider">
                Total de Selecionados:
              </span>
              <span className="font-bold text-[#24221F] dark:text-[#F5F2EB]">
                {favoritePerfumes.length} {favoritePerfumes.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            <button
              onClick={() => {
                favoritePerfumes.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3.5 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-[0.2em] uppercase transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 font-bold shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADICIONAR TODOS À SACOLA</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
