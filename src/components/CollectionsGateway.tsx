import React from 'react';
import { ArrowRight, Sparkles, Globe, Award, Droplets, Layers } from 'lucide-react';
import { Perfume, CollectionOrigin } from '../types';
import { COLLECTIONS_DATA, getPerfumeCollectionOrigin, CollectionMeta } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';

interface CollectionsGatewayProps {
  perfumes: Perfume[];
  activeCollection: CollectionOrigin;
  onSelectCollection: (collection: CollectionOrigin) => void;
}

export const CollectionsGateway: React.FC<CollectionsGatewayProps> = ({
  perfumes,
  activeCollection,
  onSelectCollection,
}) => {
  // Compute item counts dynamically based on current perfumes state
  const counts = React.useMemo(() => {
    const res = {
      autorais: 0,
      importados: 0,
      renomeados: 0,
      all: perfumes.length,
    };
    perfumes.forEach((p) => {
      const origin = getPerfumeCollectionOrigin(p);
      if (origin === 'autorais') res.autorais++;
      else if (origin === 'renomeados') res.renomeados++;
      else res.importados++;
    });
    return res;
  }, [perfumes]);

  const collectionsList: Array<CollectionMeta & { icon: React.ComponentType<{ className?: string }> }> = [
    {
      ...COLLECTIONS_DATA.autorais,
      icon: Droplets,
    },
    {
      ...COLLECTIONS_DATA.importados,
      icon: Globe,
    },
    {
      ...COLLECTIONS_DATA.renomeados,
      icon: Award,
    },
  ];

  const handleCardClick = (id: 'autorais' | 'importados' | 'renomeados') => {
    onSelectCollection(id);
    const element = document.getElementById('colecao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="colecoes-gateway"
      className="relative w-full bg-[#F0EBE1] dark:bg-[#151412] text-[#24221F] dark:text-[#F5F2EB] py-20 sm:py-28 border-b border-[#24221F]/10 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A96227]/5 dark:bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#24221F]/5 dark:bg-black/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                CURADORIA & ORIGEM
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em]">
              Explore Nossas <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
                Grandes Coleções.
              </span>
            </h2>
          </div>

          <div className="max-w-md text-xs sm:text-[13px] text-[#24221F]/75 dark:text-[#F5F2EB]/75 space-y-1 border-l-2 border-[#A96227]/40 dark:border-[#D4AF37]/40 pl-3 sm:pl-4">
            <p className="uppercase tracking-[0.16em] text-[#24221F] dark:text-[#F5F2EB] font-semibold text-[10px] sm:text-[11px]">
              Classificação Editorial & Origem
            </p>
            <p className="tracking-normal font-light leading-relaxed">
              Navegue pelos universos olfativos da Casa Máximo: fórmulas autorais, ícones importados e fragrâncias consagradas.
            </p>
          </div>
        </div>

        {/* 3 Large Editorial Collection Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
          {collectionsList.map((col) => {
            const Icon = col.icon;
            const count = counts[col.id];
            const isCurrentActive = activeCollection === col.id;

            return (
              <div
                key={col.id}
                id={`collection-gateway-card-${col.id}`}
                onClick={() => handleCardClick(col.id)}
                className={`group relative flex flex-col justify-between bg-[#FAF8F5] dark:bg-[#1A1816] rounded-xs border transition-all duration-300 cursor-pointer overflow-hidden p-5 sm:p-7 lg:p-9 touch-press ${
                  isCurrentActive
                    ? 'border-[#A96227] dark:border-[#D4AF37] shadow-[0_20px_48px_rgba(169,98,39,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-[#A96227]/30 dark:ring-[#D4AF37]/30'
                    : 'border-[#24221F]/10 dark:border-white/10 hover:border-[#A96227]/60 dark:hover:border-[#D4AF37]/60 hover:shadow-[0_20px_44px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_48px_rgba(0,0,0,0.65)] hover:-translate-y-1.5'
                }`}
              >
                {/* Top Badge & Count */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-subtle uppercase tracking-[0.2em] font-bold bg-[#A96227]/10 dark:bg-[#D4AF37]/15 text-[#A96227] dark:text-[#D4AF37]">
                      <Icon className="w-3 h-3" />
                      {col.badge}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono-subtle text-[#24221F]/60 dark:text-[#F5F2EB]/60 font-semibold tracking-wider">
                      {count} {count === 1 ? 'criação' : 'criações'}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif-editorial text-2xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB] font-light mb-1.5 sm:mb-2 group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-medium text-[#A96227] dark:text-[#D4AF37] mb-3 sm:mb-4 tracking-wide">
                    {col.subtitle}
                  </p>

                  <p className="text-xs sm:text-[13px] text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed mb-4 sm:mb-6">
                    {col.description}
                  </p>
                </div>

                {/* Card Visual Hero Preview */}
                <div className="relative w-full h-40 sm:h-52 my-3 sm:my-4 rounded-xs bg-[#EFE9DF]/70 dark:bg-[#12110F]/70 flex items-center justify-center overflow-hidden border border-[#24221F]/5 dark:border-white/5 group-hover:bg-[#EFE9DF] dark:group-hover:bg-[#12110F] transition-colors">
                  {/* Subtle Pedestal Lighting */}
                  <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent dark:from-white/10 opacity-70 pointer-events-none" />
                  
                  <div className="relative w-28 sm:w-32 h-32 sm:h-40 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:-translate-y-1">
                    <EditorialImage
                      src={col.image}
                      alt={col.title}
                      brand="Máximo"
                      name={col.title}
                      aspectRatio="h-full w-full"
                      padding="p-0"
                      showContactShadow={false}
                    />
                  </div>

                  {/* Curatorship Chips */}
                  <div className="absolute bottom-2 inset-x-2 flex flex-wrap gap-1 justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {col.curatorshipHighlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-[#24221F]/80 dark:bg-[#121110]/90 text-white dark:text-[#D4AF37] backdrop-blur-xs font-mono-subtle truncate max-w-[140px]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 sm:pt-4 border-t border-[#24221F]/10 dark:border-white/10 flex items-center justify-between min-h-[44px]">
                  <span className="font-mono-subtle text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#24221F] dark:text-[#F5F2EB] group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 sm:gap-2">
                    EXPLORAR COLEÇÃO
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono-subtle text-[#A96227] dark:text-[#D4AF37] font-semibold">
                    Ver {count} {count === 1 ? 'item' : 'itens'} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick View All Collections Anchor Bar */}
        <div className="mt-8 pt-6 border-t border-[#24221F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#24221F]/60 dark:text-[#F5F2EB]/60 font-mono-subtle">
            Prefere ver todo o acervo junto?
          </p>
          <button
            onClick={() => handleCardClick('autorais')}
            className="text-xs font-mono-subtle uppercase tracking-wider text-[#A96227] dark:text-[#D4AF37] hover:underline font-bold flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            Navegar por todas as {perfumes.length} criações no catálogo completo
          </button>
        </div>
      </div>
    </section>
  );
};
