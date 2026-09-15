import React, { useState } from 'react';
import { Heart, ArrowRight, MessageCircle, Droplets, Sparkles, Gem } from 'lucide-react';
import { Perfume, OlfactoryFamily } from '../types';
import { createProductWhatsAppLink, getPerfumeTactileSensation } from '../data/perfumes';
import { EditorialImage } from './EditorialImage';

interface CollectionSectionProps {
  perfumes: Perfume[];
  activeFamily: OlfactoryFamily;
  onSelectFamily: (family: OlfactoryFamily) => void;
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (perfume: Perfume) => void;
}

const PRIMARY_FILTERS = [
  { label: 'Todos', value: 'all', family: 'Todos', gender: 'Todos' },
  { label: 'Linha Própria Máximo', value: 'maximo', family: 'Linha Máximo', gender: 'Todos' },
  { label: 'Inspirações Femininas', value: 'fem_insp', family: 'Todos', gender: 'Feminino' },
  { label: 'Inspirações Masculinas', value: 'masc_insp', family: 'Todos', gender: 'Masculino' },
];

const OLFACTORY_FAMILIES: OlfactoryFamily[] = [
  'Todos',
  'Florais',
  'Amadeirados',
  'Ambarados',
  'Orientais',
  'Frescos',
  'Gourmand & Frutados',
];

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  perfumes,
  activeFamily,
  onSelectFamily,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'Todos' | 'Feminino' | 'Masculino'>('Todos');

  const filteredPerfumes = perfumes.filter((p) => {
    // Check primary filter tab
    if (activeFilterTab === 'maximo') {
      if (p.brand !== 'Máximo' && p.category !== 'Linha Máximo') return false;
    } else if (activeFilterTab === 'fem_insp') {
      if (p.brand === 'Máximo' || p.gender !== 'Feminino') return false;
    } else if (activeFilterTab === 'masc_insp') {
      if (p.brand === 'Máximo' || p.gender !== 'Masculino') return false;
    }

    // Check olfactory family
    const matchesFamily =
      activeFamily === 'Todos' ||
      p.family === activeFamily ||
      (activeFamily === 'Linha Máximo' && (p.brand === 'Máximo' || p.category === 'Linha Máximo'));

    // Check gender
    const matchesGender =
      selectedGender === 'Todos' ||
      p.gender === selectedGender ||
      p.gender === 'Compartilhável';

    return matchesFamily && matchesGender;
  });

  const handlePrimaryFilter = (tab: typeof PRIMARY_FILTERS[0]) => {
    setActiveFilterTab(tab.value);
    if (tab.value === 'maximo') {
      onSelectFamily('Linha Máximo');
      setSelectedGender('Todos');
    } else if (tab.value === 'fem_insp') {
      onSelectFamily('Todos');
      setSelectedGender('Feminino');
    } else if (tab.value === 'masc_insp') {
      onSelectFamily('Todos');
      setSelectedGender('Masculino');
    } else {
      onSelectFamily('Todos');
      setSelectedGender('Todos');
    }
  };

  return (
    <section
      id="colecao"
      className="relative w-full bg-[#EAE3D9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] py-24 sm:py-32 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] sm:text-xs tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                02 — O CATÁLOGO EXCLUSIVO
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em]">
              Perfumes <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">Contratipo.</span>
            </h2>
          </div>

          <div className="max-w-md text-xs sm:text-[13px] text-[#24221F]/75 dark:text-[#F5F2EB]/75 space-y-1.5 border-l-2 border-[#A96227]/30 dark:border-[#D4AF37]/40 pl-4">
            <p className="uppercase tracking-[0.16em] text-[#24221F] dark:text-[#F5F2EB] font-semibold text-[11px]">
              Máximo Eau de Parfum
            </p>
            <p className="tracking-normal font-light">
              Fragrâncias contratipo de alta fidelidade. Masculino 30ml · Feminino 60ml. Pedidos via WhatsApp.
            </p>
          </div>
        </div>

        {/* Primary Editorial Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          {PRIMARY_FILTERS.map((tab) => {
            const isActive = activeFilterTab === tab.value;
            return (
              <button
                key={tab.value}
                id={`primary-filter-${tab.value}`}
                onClick={() => handlePrimaryFilter(tab)}
                className={`px-4 sm:px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 border font-semibold active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#24221F] dark:bg-[#D4AF37] text-[#F4F0E9] dark:text-[#121110] border-[#24221F] dark:border-[#D4AF37] shadow-md'
                    : 'bg-[#FAF8F5]/80 dark:bg-[#181614]/80 text-[#24221F]/70 dark:text-[#F5F2EB]/70 border-[#24221F]/15 dark:border-white/10 hover:border-[#A96227] dark:hover:border-[#D4AF37] hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filter Navigation: Olfactory Families */}
        <div className="mb-6 overflow-x-auto pb-2 pt-1 -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-max">
            {OLFACTORY_FAMILIES.map((family) => {
              const isActive = activeFamily === family;
              return (
                <button
                  key={family}
                  id={`filter-${family.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    onSelectFamily(family);
                    if (family !== 'Todos' && activeFilterTab !== 'all') {
                      // maintain or reset sub-filter
                    }
                  }}
                  className={`px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 border active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#A96227] dark:bg-[#C97D3E] text-white border-[#A96227] dark:border-[#C97D3E] font-semibold shadow-xs'
                      : 'bg-transparent text-[#24221F]/70 dark:text-[#F5F2EB]/70 border-[#24221F]/15 dark:border-white/10 hover:border-[#A96227] dark:hover:border-[#D4AF37] hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                  }`}
                  aria-pressed={isActive}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gender / Sub-filter Pill Row */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4 border-b border-[#24221F]/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#24221F]/60 dark:text-[#F5F2EB]/60 mr-2 font-medium">
              Público:
            </span>
            {(['Todos', 'Feminino', 'Masculino'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] transition-all duration-200 border rounded-xs active:scale-95 ${
                  selectedGender === g
                    ? 'bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-[#121110] border-transparent font-semibold shadow-xs'
                    : 'bg-transparent border-[#24221F]/15 dark:border-white/10 text-[#24221F]/70 dark:text-[#F5F2EB]/70 hover:border-[#A96227] dark:hover:border-[#D4AF37] hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#24221F]/60 dark:text-[#F5F2EB]/60 font-medium tracking-[0.18em] uppercase">
            Mostrando <span className="text-[#A96227] dark:text-[#D4AF37] font-semibold">{filteredPerfumes.length}</span> produtos
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {filteredPerfumes.map((perfume) => {
            const isFav = favorites.includes(perfume.id);
            const tactilePhrase = getPerfumeTactileSensation(perfume);

            return (
              <article
                key={perfume.id}
                id={`perfume-card-${perfume.id}`}
                className="group relative flex flex-col bg-[#FAF8F5] dark:bg-[#161513] border border-[#24221F]/10 dark:border-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#A96227]/60 dark:hover:border-[#D4AF37]/60 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
              >
                {/* Image Container with Studio Pedestal and Hover Zoom */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-gradient-to-b from-[#F2ECE2]/50 via-[#EAE3D7]/20 to-transparent dark:from-[#1A1816]/60 dark:via-[#141210]/30 dark:to-transparent"
                  onClick={() => onSelectPerfume(perfume)}
                >
                  <EditorialImage
                    src={perfume.image}
                    alt={`Frasco de ${perfume.name} - ${perfume.brand}`}
                    brand={perfume.brand}
                    name={perfume.name}
                    aspectRatio="aspect-[3/4]"
                    padding="p-6 sm:p-7 md:p-8"
                    showContactShadow={true}
                    enableTilt={true}
                    showMistParticles={true}
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
                    <span className="bg-[#24221F]/90 dark:bg-[#201E1B]/95 text-[#F4F0E9] dark:text-[#D4AF37] text-[9px] sm:text-[10px] tracking-[0.22em] px-2.5 py-1 uppercase font-semibold border border-[#24221F]/20 dark:border-[#D4AF37]/30 shadow-xs">
                      {perfume.brand}
                    </span>
                    {perfume.badge && (
                      <span className="bg-[#A96227] dark:bg-[#C97D3E] text-white text-[8px] sm:text-[9px] tracking-[0.2em] px-2.5 py-0.5 uppercase font-semibold shadow-xs">
                        {perfume.badge}
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    id={`favorite-btn-${perfume.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(perfume.id);
                    }}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#F4F0E9]/90 dark:bg-[#1E1C1A]/90 backdrop-blur-md text-[#24221F] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#2A2622] hover:scale-110 active:scale-90 transition-all duration-300 focus:outline-none shadow-sm border border-[#24221F]/10 dark:border-white/15"
                    aria-label={isFav ? `Remover ${perfume.name} dos favoritos` : `Favoritar ${perfume.name}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav
                          ? 'fill-[#A96227] dark:fill-[#D4AF37] text-[#A96227] dark:text-[#D4AF37]'
                          : 'text-[#24221F]/70 dark:text-[#F5F2EB]/70 hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                      }`}
                    />
                  </button>

                  {/* Accords preview tags at bottom of image */}
                  {perfume.accords && perfume.accords.length > 0 && (
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity z-20">
                      {perfume.accords.slice(0, 3).map((acc, idx) => (
                        <span
                          key={idx}
                          className="bg-[#24221F]/80 dark:bg-black/80 backdrop-blur-md text-[#F4F0E9] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-white/15 font-medium"
                        >
                          {acc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tactile Sensory Highlight Ribbon on Card */}
                <div className="px-6 py-2.5 bg-[#F0EBE2]/70 dark:bg-[#1A1816] border-b border-[#24221F]/8 dark:border-white/8 flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37] transition-colors group-hover:bg-[#EAE3D9] dark:group-hover:bg-[#201D1A]">
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] tracking-wide font-medium truncate">
                    {tactilePhrase}
                  </span>
                </div>

                {/* Card Information */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1.5 font-semibold">
                      <span>{perfume.family}</span>
                      <span className="text-[#24221F]/60 dark:text-[#F5F2EB]/60 font-medium">{perfume.size}</span>
                    </div>

                    {/* Perfume Title & Brand */}
                    <h3
                      onClick={() => onSelectPerfume(perfume)}
                      className="font-serif-editorial text-2xl sm:text-[26px] text-[#24221F] dark:text-[#F5F2EB] font-normal leading-snug group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {perfume.name}
                    </h3>

                    {/* Inspirado em badge — só exibe para contratipos */}
                    {perfume.inspiradoEm && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <Gem className="w-3 h-3 text-[#A96227]/70 dark:text-[#D4AF37]/70 shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#24221F]/55 dark:text-[#F5F2EB]/55 font-medium">
                          Ref.:&nbsp;
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#A96227] dark:text-[#D4AF37] font-semibold truncate">
                          {perfume.inspiradoEm}
                        </span>
                      </div>
                    )}

                    {/* Olfactory Notes */}
                    <p className="font-sans-clean text-xs sm:text-[13px] text-[#24221F]/75 dark:text-[#F5F2EB]/75 font-light mt-2 leading-relaxed line-clamp-2">
                      {perfume.shortNotes}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-[#24221F]/10 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl sm:text-2xl text-[#24221F] dark:text-[#F5F2EB] font-serif font-medium tracking-tight">
                          {perfume.price}
                        </span>
                        <span className="block text-[10px] text-[#24221F]/55 dark:text-[#F5F2EB]/55 uppercase tracking-wider font-medium">
                          {perfume.concentration}
                        </span>
                      </div>

                      <button
                        id={`card-view-details-${perfume.id}`}
                        onClick={() => onSelectPerfume(perfume)}
                        className="group/btn inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors font-medium py-1"
                      >
                        <span>DETALHES</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                    {/* Dual Action: WhatsApp direct link & Cart */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <a
                        id={`whatsapp-order-${perfume.id}`}
                        href={createProductWhatsAppLink(
                          perfume.name,
                          perfume.brand,
                          perfume.size,
                          perfume.price
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/wa flex items-center justify-center gap-2 py-3 px-3 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] text-[11px] tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.97] text-center font-bold shadow-xs hover:shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5 transition-transform group-hover/wa:scale-110" />
                        <span>WHATSAPP</span>
                      </a>

                      <button
                        id={`add-to-bag-${perfume.id}`}
                        onClick={() => onAddToCart(perfume)}
                        className="py-3 px-3 border border-[#24221F]/20 dark:border-white/20 hover:border-[#24221F] dark:hover:border-white hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-white dark:hover:text-[#121110] text-[#24221F] dark:text-[#F5F2EB] text-[11px] tracking-[0.16em] uppercase transition-all duration-300 active:scale-[0.97] text-center font-semibold"
                      >
                        + SACOLA
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
