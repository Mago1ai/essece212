import React from 'react';
import { X, Check, RotateCcw, Sparkles, Filter, MoreHorizontal, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { OlfactoryFamily } from '../types';

export interface FilterOptions {
  category: 'all' | 'maximo' | 'inspiracoes';
  family: OlfactoryFamily;
  gender: 'Todos' | 'Feminino' | 'Masculino';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

const OLFACTORY_FAMILIES: OlfactoryFamily[] = [
  'Todos',
  'Florais',
  'Amadeirados',
  'Ambarados',
  'Orientais',
  'Frescos',
  'Gourmand & Frutados',
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChangeFilters,
  onResetFilters,
  totalProductsCount,
}) => {
  if (!isOpen) return null;

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.family !== 'Todos' ||
    filters.gender !== 'Todos' ||
    filters.sortBy !== 'featured';

  return (
    <div
      id="filter-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="filter-drawer-container"
        className="w-full max-w-md bg-[#F4F0E9] dark:bg-[#161412] text-[#24221F] dark:text-[#F5F2EB] h-full shadow-2xl flex flex-col justify-between border-l border-[#24221F]/15 dark:border-white/10 animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#24221F]/10 dark:border-white/10 flex items-center justify-between bg-[#EAE3D9]/60 dark:bg-[#1C1A17]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#A96227]/10 dark:bg-[#D4AF37]/15 flex items-center justify-center text-[#A96227] dark:text-[#D4AF37]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono-subtle text-[10px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block font-semibold">
                CURADORIA DE FRASCOS
              </span>
              <h3 className="font-serif-editorial text-2xl text-[#24221F] dark:text-[#F5F2EB]">
                Filtros & Categorias
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors rounded-full focus:outline-none"
            aria-label="Fechar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Body with Scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-7">
          {/* Section 1: Linhas e Categorias */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-mono-subtle tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-semibold">
                01 · Linhas & Origem
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'all',
                  title: 'Todos os Frascos',
                  desc: 'Acervo completo com linha própria e inspirações',
                },
                {
                  id: 'maximo',
                  title: 'Linha Própria Máximo',
                  desc: 'Criações exclusivas, sabonetes nobres e hidratantes acetinados',
                },
                {
                  id: 'inspiracoes',
                  title: 'Inspirações Olfativas',
                  desc: 'Fragrâncias renomadas e casas internacionais',
                },
              ].map((item) => {
                const isSelected = filters.category === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      onChangeFilters({
                        ...filters,
                        category: item.id as FilterOptions['category'],
                      })
                    }
                    className={`p-3.5 text-left border rounded-xs transition-all duration-200 flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] border-[#24221F] dark:border-[#D4AF37] shadow-sm'
                        : 'bg-[#FAF8F5] dark:bg-[#1E1C19] border-[#24221F]/10 dark:border-white/10 hover:border-[#A96227]/50 text-[#24221F] dark:text-[#F5F2EB]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-lg font-medium leading-tight">
                        {item.title}
                      </div>
                      <div
                        className={`text-xs mt-0.5 font-sans ${
                          isSelected
                            ? 'text-white/80 dark:text-[#121110]/80'
                            : 'text-[#24221F]/60 dark:text-[#F5F2EB]/60'
                        }`}
                      >
                        {item.desc}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Público / Gênero */}
          <div>
            <span className="text-xs uppercase font-mono-subtle tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-semibold block mb-3">
              02 · Público / Identidade
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['Todos', 'Feminino', 'Masculino'] as const).map((g) => {
                const isSelected = filters.gender === g;
                return (
                  <button
                    key={g}
                    onClick={() => onChangeFilters({ ...filters, gender: g })}
                    className={`py-2.5 px-3 text-xs tracking-wider uppercase font-semibold border rounded-xs transition-all text-center ${
                      isSelected
                        ? 'bg-[#A96227] dark:bg-[#C97D3E] text-white border-[#A96227] dark:border-[#C97D3E] shadow-xs'
                        : 'bg-[#FAF8F5] dark:bg-[#1E1C19] border-[#24221F]/10 dark:border-white/10 text-[#24221F]/80 dark:text-[#F5F2EB]/80 hover:border-[#A96227]'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Famílias Olfativas */}
          <div>
            <span className="text-xs uppercase font-mono-subtle tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-semibold block mb-3">
              03 · Famílias Olfativas
            </span>
            <div className="flex flex-wrap gap-2">
              {OLFACTORY_FAMILIES.map((fam) => {
                const isSelected = filters.family === fam;
                return (
                  <button
                    key={fam}
                    onClick={() => onChangeFilters({ ...filters, family: fam })}
                    className={`py-2 px-3 text-xs tracking-[0.14em] uppercase border rounded-xs transition-all ${
                      isSelected
                        ? 'bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] border-[#24221F] dark:border-[#D4AF37] font-semibold shadow-xs'
                        : 'bg-[#FAF8F5] dark:bg-[#1E1C19] border-[#24221F]/10 dark:border-white/10 text-[#24221F]/80 dark:text-[#F5F2EB]/80 hover:border-[#A96227]'
                    }`}
                  >
                    {fam}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Ordenação */}
          <div>
            <span className="text-xs uppercase font-mono-subtle tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-semibold block mb-3">
              04 · Ordenar Por
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'featured', label: 'Destaques do Ateliê' },
                { id: 'price-asc', label: 'Menor Preço' },
                { id: 'price-desc', label: 'Maior Preço' },
                { id: 'name-asc', label: 'Nome A-Z' },
              ].map((sort) => {
                const isSelected = filters.sortBy === sort.id;
                return (
                  <button
                    key={sort.id}
                    onClick={() =>
                      onChangeFilters({
                        ...filters,
                        sortBy: sort.id as FilterOptions['sortBy'],
                      })
                    }
                    className={`p-2.5 text-xs uppercase tracking-wider border rounded-xs text-left transition-all ${
                      isSelected
                        ? 'bg-[#A96227]/15 dark:bg-[#D4AF37]/20 border-[#A96227] dark:border-[#D4AF37] text-[#A96227] dark:text-[#D4AF37] font-bold'
                        : 'bg-[#FAF8F5] dark:bg-[#1E1C19] border-[#24221F]/10 dark:border-white/10 text-[#24221F]/70 dark:text-[#F5F2EB]/70 hover:border-[#A96227]'
                    }`}
                  >
                    {sort.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#24221F]/10 dark:border-white/10 bg-[#EAE3D9]/60 dark:bg-[#1C1A17] space-y-2.5">
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="px-4 py-3.5 border border-[#24221F]/20 dark:border-white/20 text-[#24221F] dark:text-[#F5F2EB] hover:bg-white/20 font-mono-subtle text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition rounded-xs"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-4 bg-[#24221F] dark:bg-[#D4AF37] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-[0.2em] uppercase font-bold text-center rounded-xs shadow-md hover:brightness-110 active:scale-[0.98] transition"
            >
              Exibir {totalProductsCount} {totalProductsCount === 1 ? 'Frasco' : 'Frascos'}
            </button>
          </div>
          <p className="text-[11px] text-center text-[#24221F]/60 dark:text-[#F5F2EB]/60">
            Filtros aplicados instantaneamente ao catálogo.
          </p>
        </div>
      </div>
    </div>
  );
};
