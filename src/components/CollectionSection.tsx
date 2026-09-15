import React, { useState, useMemo, useEffect } from 'react';
import { Heart, ArrowRight, MessageCircle, Droplets, SlidersHorizontal, Sparkles, MoreHorizontal, X, RotateCcw, Globe, Award, Layers, ChevronRight, ArrowLeft, Users, UserCheck } from 'lucide-react';
import { Perfume, OlfactoryFamily, CollectionOrigin, GenderSelection } from '../types';
import {
  createProductWhatsAppLink,
  getPerfumeTactileSensation,
  COLLECTIONS_DATA,
  getPerfumeCollectionOrigin,
} from '../data/perfumes';
import { EditorialImage } from './EditorialImage';
import { FilterDrawer, FilterOptions } from './FilterDrawer';

interface CollectionSectionProps {
  perfumes: Perfume[];
  activeFamily: OlfactoryFamily;
  onSelectFamily: (family: OlfactoryFamily) => void;
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  activeCollection?: CollectionOrigin;
  onSelectCollection?: (collection: CollectionOrigin) => void;
  activeGender?: GenderSelection;
  onSelectGender?: (gender: GenderSelection) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  perfumes,
  activeFamily,
  onSelectFamily,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
  activeCollection = 'all',
  onSelectCollection,
  activeGender = 'Todos',
  onSelectGender,
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: activeCollection || 'all',
    family: activeFamily,
    gender: activeGender || 'Todos',
    sortBy: 'featured',
  });

  // Keep internal state synchronized with external props
  useEffect(() => {
    if (activeCollection && activeCollection !== filters.category) {
      setFilters((prev) => ({
        ...prev,
        category: activeCollection,
      }));
    }
  }, [activeCollection]);

  useEffect(() => {
    if (activeGender && activeGender !== filters.gender) {
      setFilters((prev) => ({
        ...prev,
        gender: activeGender,
      }));
    }
  }, [activeGender]);

  useEffect(() => {
    if (activeFamily !== filters.family) {
      setFilters((prev) => ({
        ...prev,
        family: activeFamily,
      }));
    }
  }, [activeFamily]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    if (newFilters.family !== activeFamily) {
      onSelectFamily(newFilters.family);
    }
    if (newFilters.category !== activeCollection && onSelectCollection) {
      onSelectCollection(newFilters.category);
    }
    if (newFilters.gender !== activeGender && onSelectGender) {
      onSelectGender(newFilters.gender);
    }
  };

  const handleSelectCollectionOrigin = (origin: CollectionOrigin) => {
    handleFilterChange({
      ...filters,
      category: origin,
    });
  };

  const handleSelectAudienceGender = (gender: GenderSelection) => {
    handleFilterChange({
      ...filters,
      gender: gender,
    });
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterOptions = {
      category: 'all',
      family: 'Todos',
      gender: 'Todos',
      sortBy: 'featured',
    };
    setFilters(defaultFilters);
    onSelectFamily('Todos');
    if (onSelectCollection) {
      onSelectCollection('all');
    }
    if (onSelectGender) {
      onSelectGender('Todos');
    }
  };

  // Back step logic for breadcrumb & back button
  const handleBackOneStep = () => {
    if (filters.gender !== 'Todos') {
      // Step back from Gender to 'Todos os Públicos' in the current collection
      handleSelectAudienceGender('Todos');
    } else if (filters.category !== 'all') {
      // Step back from specific Collection to 'Todas as Coleções'
      handleSelectCollectionOrigin('all');
    }
  };

  // Dynamic counts for Level 1 (Collections) and Level 2 (Genders inside current collection)
  const statistics = useMemo(() => {
    // 1. Overall counts by collection
    const collectionCounts = {
      all: perfumes.length,
      autorais: 0,
      importados: 0,
      renomeados: 0,
    };

    // 2. Gender counts within the currently active collection (or across all if category is 'all')
    const genderCounts = {
      Todos: 0,
      Feminino: 0,
      Masculino: 0,
      Unissex: 0,
    };

    perfumes.forEach((p) => {
      const origin = getPerfumeCollectionOrigin(p);
      if (origin === 'autorais') collectionCounts.autorais++;
      else if (origin === 'renomeados') collectionCounts.renomeados++;
      else collectionCounts.importados++;

      // Check if product belongs to current collection filter
      const matchesCollection = filters.category === 'all' || origin === filters.category;

      if (matchesCollection) {
        genderCounts.Todos++;
        if (p.gender === 'Feminino') genderCounts.Feminino++;
        else if (p.gender === 'Masculino') genderCounts.Masculino++;
        else if (p.gender === 'Unissex' || p.gender === 'Compartilhável') genderCounts.Unissex++;
      }
    });

    return { collectionCounts, genderCounts };
  }, [perfumes, filters.category]);

  // Filter and sort products
  const filteredPerfumes = useMemo(() => {
    let result = perfumes.filter((p) => {
      // 1. Collection Origin Filter
      if (filters.category !== 'all') {
        const pOrigin = getPerfumeCollectionOrigin(p);
        if (pOrigin !== filters.category) return false;
      }

      // 2. Gender / Target Audience Filter
      if (filters.gender !== 'Todos') {
        if (p.gender !== filters.gender && p.gender !== 'Compartilhável') {
          return false;
        }
      }

      // 3. Olfactory family
      if (filters.family !== 'Todos') {
        if (filters.family === 'Linha Máximo') {
          if (p.brand !== 'Máximo' && p.category !== 'Linha Máximo') return false;
        } else if (p.family !== filters.family) {
          return false;
        }
      }

      return true;
    });

    // Sort result
    if (filters.sortBy === 'price-asc') {
      result = [...result].sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        const pB = parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        return pA - pB;
      });
    } else if (filters.sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        const pB = parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        return pB - pA;
      });
    } else if (filters.sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [perfumes, filters]);

  // Current active collection metadata if specific collection is selected
  const currentCollectionMeta = filters.category !== 'all' ? COLLECTIONS_DATA[filters.category] : null;

  // Active collection title display
  const collectionLabel =
    filters.category === 'autorais'
      ? 'Autorais'
      : filters.category === 'importados'
      ? 'Importados'
      : filters.category === 'renomeados'
      ? 'Renomeados'
      : 'Todas as Coleções';

  const genderLabel =
    filters.gender === 'Feminino'
      ? 'Femininos'
      : filters.gender === 'Masculino'
      ? 'Masculinos'
      : filters.gender === 'Unissex'
      ? 'Unissex'
      : 'Todos os Públicos';

  // Count active non-default filters
  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.family !== 'Todos' ? 1 : 0) +
    (filters.gender !== 'Todos' ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0);

  const isDeepNavigating = filters.category !== 'all' || filters.gender !== 'Todos';

  return (
    <section
      id="colecao"
      className="relative w-full bg-[#EAE3D9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] py-16 sm:py-24 md:py-28 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Breadcrumb & Context Navigation */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-subtle text-[#24221F]/70 dark:text-[#F5F2EB]/70">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                handleFilterChange({
                  ...filters,
                  category: 'all',
                  gender: 'Todos',
                });
              }}
              className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition font-semibold cursor-pointer uppercase tracking-wider text-[11px] sm:text-xs"
            >
              Catálogo
            </button>

            <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />

            <button
              onClick={() => handleSelectAudienceGender('Todos')}
              className={`hover:text-[#A96227] dark:hover:text-[#D4AF37] transition uppercase tracking-wider text-[11px] sm:text-xs cursor-pointer ${
                filters.category !== 'all' ? 'font-semibold text-[#24221F] dark:text-[#F5F2EB]' : 'font-normal'
              }`}
            >
              {collectionLabel}
            </button>

            {filters.gender !== 'Todos' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                <span className="font-bold text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider text-[11px] sm:text-xs">
                  {genderLabel}
                </span>
              </>
            )}
          </nav>

          {/* Contextual Back Button */}
          {isDeepNavigating && (
            <button
              onClick={handleBackOneStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5]/80 dark:bg-[#1A1816]/80 hover:bg-[#A96227] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#121110] border border-[#24221F]/10 dark:border-white/10 text-[11px] font-mono-subtle uppercase tracking-wider font-semibold transition cursor-pointer touch-press min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                {filters.gender !== 'Todos'
                  ? `Voltar para ${collectionLabel}`
                  : 'Voltar para Coleções'}
              </span>
            </button>
          )}
        </div>

        {/* Section Main Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                CURADORIA EDITORIAL
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-editorial text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em]">
              {filters.category !== 'all' ? (
                <>
                  Coleção {collectionLabel} <br />
                  <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
                    {filters.gender !== 'Todos' ? `Seleção ${genderLabel}` : 'Acervo Completo.'}
                  </span>
                </>
              ) : (
                <>
                  Fragrâncias & <br />
                  <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
                    {filters.gender !== 'Todos' ? `Criações ${genderLabel}.` : 'criações nobres.'}
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="max-w-md text-xs sm:text-[13px] text-[#24221F]/75 dark:text-[#F5F2EB]/75 space-y-1 border-l-2 border-[#A96227]/30 dark:border-[#D4AF37]/40 pl-3 sm:pl-4 hidden sm:block">
            <p className="uppercase tracking-[0.16em] text-[#24221F] dark:text-[#F5F2EB] font-semibold text-[11px]">
              {currentCollectionMeta ? currentCollectionMeta.badge : 'Navegação por Origem & Público'}
            </p>
            <p className="tracking-normal font-light leading-relaxed">
              {currentCollectionMeta
                ? currentCollectionMeta.tagline
                : 'Selecione a origem e o público desejado para refinar a curadoria da Casa Máximo.'}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* LEVEL 1: NÍVEL DE ORIGEM / COLEÇÃO (AUTORAIS | IMPORTADOS | RENOMEADOS | TODAS) */}
        {/* ============================================================ */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[11px] font-mono-subtle uppercase tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-bold">
              1. Escolha a Origem / Coleção:
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {[
              {
                id: 'autorais' as const,
                label: 'Autorais',
                desc: 'Casa Máximo',
                icon: Droplets,
                count: statistics.collectionCounts.autorais,
              },
              {
                id: 'importados' as const,
                label: 'Importados',
                desc: 'Nicho & Grifes',
                icon: Globe,
                count: statistics.collectionCounts.importados,
              },
              {
                id: 'renomeados' as const,
                label: 'Renomeados',
                desc: 'Consagrados',
                icon: Award,
                count: statistics.collectionCounts.renomeados,
              },
              {
                id: 'all' as const,
                label: 'Todas as Coleções',
                desc: 'Catálogo Geral',
                icon: Layers,
                count: statistics.collectionCounts.all,
              },
            ].map((tab) => {
              const isSelected = filters.category === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  id={`origin-tab-${tab.id}`}
                  onClick={() => handleSelectCollectionOrigin(tab.id)}
                  className={`p-3 sm:p-4 rounded-xs border transition-all duration-200 text-left cursor-pointer touch-press flex flex-col justify-between min-h-[72px] sm:min-h-[82px] ${
                    isSelected
                      ? 'bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] border-[#24221F] dark:border-[#D4AF37] shadow-md ring-1 ring-[#A96227]/30 dark:ring-[#D4AF37]/30'
                      : 'bg-[#FAF8F5] dark:bg-[#181614] border-[#24221F]/10 dark:border-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:border-[#A96227]/50 hover:bg-[#F5EFE6] dark:hover:bg-[#201D1A]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-medium tracking-wide">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37] dark:text-[#121110]' : 'text-[#A96227] dark:text-[#D4AF37]'}`} />
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono-subtle font-semibold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 dark:bg-black/20 text-white dark:text-[#121110]'
                          : 'bg-[#24221F]/5 dark:bg-white/10 text-[#24221F]/70 dark:text-[#F5F2EB]/70'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-sans truncate ${
                      isSelected
                        ? 'text-white/80 dark:text-[#121110]/80 font-medium'
                        : 'text-[#24221F]/60 dark:text-[#F5F2EB]/60'
                    }`}
                  >
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* LEVEL 2: NÍVEL DE PÚBLICO (FEMININOS | MASCULINOS | UNISSEX | TODOS) */}
        {/* ============================================================ */}
        <div className="bg-[#FAF8F5]/90 dark:bg-[#181614]/90 backdrop-blur-md border border-[#24221F]/10 dark:border-white/10 p-3 sm:p-4 rounded-xl mb-6 sm:mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono-subtle uppercase tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-bold">
                2. Escolha o Público em {collectionLabel}:
              </span>
            </div>

            {/* Quick Filter Drawer Trigger Button */}
            <button
              id="open-filter-drawer-btn"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-[#A96227]/15 dark:hover:bg-[#D4AF37]/20 text-[#24221F] dark:text-[#F5F2EB] rounded-full text-[11px] font-mono-subtle uppercase tracking-wider font-semibold transition cursor-pointer touch-press"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
              <span>Mais Filtros Olfativos (⋮)</span>
              {activeFiltersCount > 2 && (
                <span className="w-4 h-4 rounded-full bg-[#A96227] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Level 2 Audience Pills Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                id: 'Todos' as const,
                label: 'Todos os Públicos',
                count: statistics.genderCounts.Todos,
              },
              {
                id: 'Feminino' as const,
                label: 'Femininos',
                count: statistics.genderCounts.Feminino,
              },
              {
                id: 'Masculino' as const,
                label: 'Masculinos',
                count: statistics.genderCounts.Masculino,
              },
              ...(statistics.genderCounts.Unissex > 0
                ? [
                    {
                      id: 'Unissex' as const,
                      label: 'Unissex',
                      count: statistics.genderCounts.Unissex,
                    },
                  ]
                : []),
            ].map((aud) => {
              const isSelected = filters.gender === aud.id;
              const hasItems = aud.count > 0;

              return (
                <button
                  key={aud.id}
                  id={`audience-pill-${aud.id}`}
                  onClick={() => handleSelectAudienceGender(aud.id)}
                  disabled={!hasItems && aud.id !== 'Todos'}
                  className={`px-3 py-2.5 min-h-[44px] rounded-xs border text-xs font-mono-subtle uppercase tracking-wider font-bold transition-all flex items-center justify-between gap-1.5 cursor-pointer touch-press ${
                    isSelected
                      ? 'bg-[#A96227] dark:bg-[#C97D3E] text-white border-[#A96227] dark:border-[#C97D3E] shadow-sm ring-1 ring-[#A96227]/40'
                      : hasItems
                      ? 'bg-[#F2ECE2] dark:bg-[#1E1C19] border-[#24221F]/10 dark:border-white/10 text-[#24221F]/80 dark:text-[#F5F2EB]/80 hover:bg-[#EAE3D7] dark:hover:bg-[#25221F] hover:border-[#A96227]'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-[#24221F]/30 dark:text-[#F5F2EB]/30 cursor-not-allowed'
                  }`}
                >
                  <span className="truncate">{aud.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-black/10 dark:bg-white/10 text-[#24221F]/70 dark:text-[#F5F2EB]/70'
                    }`}
                  >
                    {aud.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Applied Filters Summary Indicator */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs animate-in fade-in">
            <span className="font-mono-subtle text-[10px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-bold mr-1">
              Filtros Ativos:
            </span>

            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24221F]/10 dark:bg-white/10 rounded-full font-medium text-[11px]">
                Coleção: {collectionLabel}
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 p-0.5"
                  onClick={() => handleSelectCollectionOrigin('all')}
                />
              </span>
            )}

            {filters.gender !== 'Todos' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24221F]/10 dark:bg-white/10 rounded-full font-medium text-[11px]">
                Público: {genderLabel}
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 p-0.5"
                  onClick={() => handleSelectAudienceGender('Todos')}
                />
              </span>
            )}

            {filters.family !== 'Todos' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24221F]/10 dark:bg-white/10 rounded-full font-medium text-[11px]">
                Família: {filters.family}
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 p-0.5"
                  onClick={() => handleFilterChange({ ...filters, family: 'Todos' })}
                />
              </span>
            )}

            {filters.sortBy !== 'featured' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#24221F]/10 dark:bg-white/10 rounded-full font-medium text-[11px]">
                Ordenação ativa
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-red-500 p-0.5"
                  onClick={() => handleFilterChange({ ...filters, sortBy: 'featured' })}
                />
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-[#A96227] dark:text-[#D4AF37] hover:underline flex items-center gap-1 ml-1 sm:ml-2 font-semibold font-mono-subtle cursor-pointer min-h-[36px]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpar tudo
            </button>
          </div>
        )}

        {/* Counter Info */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#24221F]/10 dark:border-white/10 text-xs font-mono-subtle text-[#24221F]/70 dark:text-[#F5F2EB]/70">
          <span>
            Exibindo <strong className="text-[#A96227] dark:text-[#D4AF37] font-bold">{filteredPerfumes.length}</strong>{' '}
            {filteredPerfumes.length === 1 ? 'frasco selecionado' : 'frascos no catálogo'}
          </span>
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="hover:text-[#A96227] dark:hover:text-[#D4AF37] transition sm:hidden flex items-center gap-1 font-semibold cursor-pointer min-h-[40px] px-2"
          >
            Ajustar filtros (⋮)
          </button>
        </div>

        {/* Product Grid */}
        {filteredPerfumes.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#FAF8F5]/60 dark:bg-[#161412]/60 border border-dashed border-[#24221F]/20 dark:border-white/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl italic text-[#24221F]/80 dark:text-[#F5F2EB]/80">
              Nenhum frasco encontrado para {collectionLabel} {filters.gender !== 'Todos' ? `(${genderLabel})` : ''}.
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#24221F]/60 dark:text-[#F5F2EB]/60 max-w-md mx-auto">
              {filters.category === 'autorais' && filters.gender === 'Masculino'
                ? 'No momento, a Coleção Autoral Máximo conta exclusivamente com criações femininas e rituais corporais de luxo.'
                : 'Experimente selecionar outro público ou explorar todas as criações da Casa Máximo.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {filters.gender !== 'Todos' && (
                <button
                  onClick={() => handleSelectAudienceGender('Todos')}
                  className="px-5 py-2.5 min-h-[44px] bg-[#A96227] text-white font-mono-subtle text-xs uppercase tracking-wider font-bold rounded-xs shadow-sm transition cursor-pointer touch-press"
                >
                  Ver Todos em {collectionLabel}
                </button>
              )}
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 min-h-[44px] bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono-subtle text-xs uppercase tracking-wider font-bold rounded-xs shadow-md transition cursor-pointer touch-press"
              >
                Ver Catálogo Completo
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {filteredPerfumes.map((perfume) => {
              const isFav = favorites.includes(perfume.id);
              const tactilePhrase = getPerfumeTactileSensation(perfume);
              const origin = getPerfumeCollectionOrigin(perfume);
              const originLabel = origin === 'autorais' ? 'Autoral' : origin === 'renomeados' ? 'Renomeado' : 'Importado';

              return (
                <article
                  key={perfume.id}
                  id={`perfume-card-${perfume.id}`}
                  className="group relative flex flex-col bg-[#FAF8F5] dark:bg-[#161513] border border-[#24221F]/10 dark:border-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A96227]/60 dark:hover:border-[#D4AF37]/60 hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)] rounded-xs overflow-hidden"
                >
                  {/* Image Container with Studio Pedestal */}
                  <div
                    className="relative aspect-[4/3.8] sm:aspect-[4/3.9] w-full overflow-hidden cursor-pointer bg-gradient-to-b from-[#F2ECE2]/50 via-[#EAE3D7]/20 to-transparent dark:from-[#1A1816]/60 dark:via-[#141210]/30 dark:to-transparent flex items-center justify-center"
                    onClick={() => onSelectPerfume(perfume)}
                  >
                    <EditorialImage
                      src={perfume.image}
                      fallbackSrc={perfume.secondaryImage}
                      alt={`Frasco de ${perfume.name} - ${perfume.brand}`}
                      brand={perfume.brand}
                      name={perfume.name}
                      aspectRatio="w-full h-full"
                      padding="p-1 sm:p-1.5"
                      showContactShadow={true}
                      enableTilt={true}
                      showMistParticles={true}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-1.5 z-20 pointer-events-none">
                      <span className="bg-[#24221F]/90 dark:bg-[#201E1B]/95 text-[#F4F0E9] dark:text-[#D4AF37] text-[10px] sm:text-[11px] tracking-[0.2em] px-2.5 sm:px-3 py-0.5 sm:py-1 uppercase font-semibold border border-[#24221F]/20 dark:border-[#D4AF37]/30 shadow-xs">
                        {perfume.brand}
                      </span>
                      {perfume.badge ? (
                        <span className="bg-[#A96227] dark:bg-[#C97D3E] text-white text-[9px] sm:text-[10px] tracking-[0.18em] px-2 sm:px-2.5 py-0.5 uppercase font-semibold shadow-xs">
                          {perfume.badge}
                        </span>
                      ) : (
                        <span className="bg-[#24221F]/70 text-white/90 text-[9px] tracking-[0.18em] px-2 py-0.5 uppercase font-mono-subtle shadow-xs">
                          {originLabel}
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
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-11 h-11 rounded-full bg-[#F4F0E9]/90 dark:bg-[#1E1C1A]/90 backdrop-blur-md text-[#24221F] dark:text-[#F5F2EB] hover:bg-white dark:hover:bg-[#2A2622] hover:scale-110 active:scale-90 transition-all duration-300 focus:outline-none shadow-sm border border-[#24221F]/10 dark:border-white/15 cursor-pointer flex items-center justify-center touch-press"
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
                      <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex flex-wrap gap-1 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity z-20">
                        {perfume.accords.slice(0, 3).map((acc, idx) => (
                          <span
                            key={idx}
                            className="bg-[#24221F]/80 dark:bg-black/80 backdrop-blur-md text-[#F4F0E9] text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-white/15 font-medium"
                          >
                            {acc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tactile Sensory Highlight Ribbon on Card */}
                  <div className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#F0EBE2]/70 dark:bg-[#1A1816] border-b border-[#24221F]/8 dark:border-white/8 flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37] transition-colors group-hover:bg-[#EAE3D9] dark:group-hover:bg-[#201D1A]">
                    <Droplets className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] sm:text-xs tracking-wide font-medium truncate">
                      {tactilePhrase}
                    </span>
                  </div>

                  {/* Card Information */}
                  <div className="p-4 sm:p-6 lg:p-7 flex flex-col flex-grow justify-between space-y-3 sm:space-y-4">
                    <div>
                      {/* Header info */}
                      <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1 sm:mb-1.5 font-semibold">
                        <span>{perfume.family}</span>
                        <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-medium">{perfume.size}</span>
                      </div>

                      {/* Perfume Title & Brand */}
                      <h3
                        onClick={() => onSelectPerfume(perfume)}
                        className="font-serif-editorial text-xl sm:text-[26px] text-[#24221F] dark:text-[#F5F2EB] font-normal leading-snug group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        {perfume.name}
                      </h3>

                      {/* Olfactory Notes */}
                      <p className="font-sans-clean text-xs sm:text-sm text-[#24221F]/80 dark:text-[#F5F2EB]/80 font-light mt-1.5 sm:mt-2 leading-relaxed line-clamp-2">
                        {perfume.shortNotes}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 sm:pt-4 border-t border-[#24221F]/10 dark:border-white/10 space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl sm:text-2xl text-[#24221F] dark:text-[#F5F2EB] font-serif font-medium tracking-tight">
                            {perfume.price}
                          </span>
                          <span className="block text-[10px] sm:text-xs text-[#24221F]/60 dark:text-[#F5F2EB]/60 uppercase tracking-wider font-medium">
                            {perfume.concentration}
                          </span>
                        </div>

                        <button
                          id={`card-view-details-${perfume.id}`}
                          onClick={() => onSelectPerfume(perfume)}
                          className="group/btn inline-flex items-center gap-1.5 text-xs tracking-[0.18em] text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors font-semibold py-2 min-h-[44px] cursor-pointer touch-press"
                        >
                          <span>VER DOSSIÊ</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>

                      {/* Single Premium WhatsApp Conversion Action */}
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
                        className="group/wa w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] text-xs tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.98] text-center font-bold shadow-xs hover:shadow-md cursor-pointer rounded-xs touch-press"
                      >
                        <MessageCircle className="w-4 h-4 transition-transform group-hover/wa:scale-110" />
                        <span>TENHO INTERESSE (WHATSAPP)</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter Drawer / Side Sheet */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChangeFilters={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalProductsCount={filteredPerfumes.length}
      />
    </section>
  );
};

