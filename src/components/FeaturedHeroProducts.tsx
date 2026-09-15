import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, Eye, Droplets, Heart } from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';

interface FeaturedHeroProductsProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const FeaturedHeroProducts: React.FC<FeaturedHeroProductsProps> = ({
  perfumes,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
}) => {
  // Select 4 existing real iconic hero products across origins
  const heroIds = [
    'maximo-pour-homme-edp',
    'maximo-pour-femme-edp',
    'aventus-creed',
    'delina-parfums-de-marly',
  ];

  const heroProducts = perfumes.filter((p) => heroIds.includes(p.id));
  const displayProducts = heroProducts.length > 0 ? heroProducts : perfumes.slice(0, 4);

  return (
    <section
      id="destaques"
      className="relative w-full bg-[#FAF7F2] dark:bg-[#121110] text-[#1E1C1A] dark:text-[#F4F0E9] py-24 sm:py-32 md:py-36 border-b border-[#1E1C1A]/10 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      {/* Discreet Atmospheric Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#C5A059]/8 dark:from-[#D4AF37]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono-subtle tracking-[0.32em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                03 — ÍCONES DA CASA
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em]">
              Fragrâncias que <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
                definem a presença.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 font-light leading-relaxed">
            Uma seleção criteriosa das fórmulas e criações mais emblemáticas do acervo, concebidas com matérias-primas raras e fixação memorável.
          </p>
        </div>

        {/* Hero Products Large Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {displayProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const waLink = createProductWhatsAppLink(product.name, product.brand, product.price);

            return (
              <div
                key={product.id}
                id={`hero-fragrance-card-${product.id}`}
                className="group relative bg-[#F4EFE6] dark:bg-[#181614] border border-[#1E1C1A]/10 dark:border-white/10 rounded-xs p-6 sm:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#A96227]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
              >
                {/* Top Category Tag & Favorite */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] font-mono-subtle uppercase tracking-[0.24em] font-bold text-[#A96227] dark:text-[#D4AF37]">
                      {product.brand}
                    </span>
                    <span className="text-[10px] text-[#1E1C1A]/30 dark:text-white/30">•</span>
                    <span className="text-[10px] sm:text-[11px] font-mono-subtle uppercase tracking-wider text-[#1E1C1A]/60 dark:text-white/60">
                      {product.family}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product.id);
                    }}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      isFav
                        ? 'border-[#A96227] dark:border-[#D4AF37] bg-[#A96227]/10 dark:bg-[#D4AF37]/15 text-[#A96227] dark:text-[#D4AF37]'
                        : 'border-[#1E1C1A]/15 dark:border-white/15 text-[#1E1C1A]/50 dark:text-white/50 hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                    }`}
                    aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Large Bottle Spotlight Stage */}
                <div
                  onClick={() => onSelectPerfume(product)}
                  className="relative aspect-[4/3] sm:aspect-[16/10] w-full my-4 rounded-xs bg-[#EAE4D9]/60 dark:bg-[#11100E]/70 flex items-center justify-center overflow-hidden border border-[#1E1C1A]/5 dark:border-white/5 cursor-pointer"
                >
                  <div className="relative w-44 sm:w-56 h-44 sm:h-56 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                    <EditorialImage
                      src={product.image}
                      fallbackSrc={product.secondaryImage}
                      alt={product.name}
                      brand={product.brand}
                      name={product.name}
                      aspectRatio="h-full w-full"
                      padding="p-2 sm:p-4"
                      showContactShadow={true}
                    />
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#1E1C1A]/90 dark:bg-[#11100E]/90 text-white dark:text-[#D4AF37] text-[9px] sm:text-[10px] font-mono-subtle uppercase tracking-[0.2em] px-2.5 py-1 rounded-xs backdrop-blur-xs border border-white/10">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info & Olfactory Notes */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        onClick={() => onSelectPerfume(product)}
                        className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1E1C1A] dark:text-[#F4F0E9] font-light group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#1E1C1A]/60 dark:text-white/60 font-mono-subtle mt-0.5">
                        {product.size} · {product.concentration} · {product.gender}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] dark:text-white font-medium block">
                        {product.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1E1C1A]/75 dark:text-[#F4F0E9]/75 font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Olfactory Notes Pill Strip */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {[
                      ...(product.notes?.top || []),
                      ...(product.notes?.heart || []),
                      ...(product.notes?.base || []),
                    ]
                      .slice(0, 4)
                      .map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-[11px] font-mono-subtle px-2.5 py-1 bg-[#FAF7F2] dark:bg-[#201D1A] border border-[#1E1C1A]/10 dark:border-white/10 text-[#1E1C1A]/75 dark:text-[#F4F0E9]/75 rounded-xs"
                        >
                          {note}
                        </span>
                      ))}
                  </div>

                  {/* Actions: Ver Dossiê & WhatsApp */}
                  <div className="pt-4 border-t border-[#1E1C1A]/10 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => onSelectPerfume(product)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] bg-[#1E1C1A] hover:bg-[#A96227] text-white dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] dark:text-[#121110] text-[11px] sm:text-xs font-mono-subtle uppercase tracking-[0.2em] font-bold rounded-xs transition-colors cursor-pointer touch-press"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VER DOSSIÊ</span>
                    </button>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 min-h-[44px] border border-[#1E1C1A]/20 dark:border-white/20 hover:border-[#A96227] dark:hover:border-[#D4AF37] bg-white/60 dark:bg-black/40 text-[#1E1C1A] dark:text-[#F4F0E9] text-[11px] sm:text-xs font-mono-subtle uppercase tracking-[0.16em] font-semibold rounded-xs transition-colors cursor-pointer touch-press"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>ENCOMENDAR</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
