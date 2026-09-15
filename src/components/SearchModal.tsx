import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Perfume } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  perfumes,
  onSelectPerfume,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = searchTerm.toLowerCase().trim();
  const results = normalized
    ? perfumes.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(normalized);
        const matchesBrand = p.brand.toLowerCase().includes(normalized);
        const matchesFamily = p.family.toLowerCase().includes(normalized);
        const matchesShortNotes = p.shortNotes.toLowerCase().includes(normalized);
        const matchesDesc = p.sensoryDescription.toLowerCase().includes(normalized);
        const matchesAccords = p.accords?.some((a) => a.toLowerCase().includes(normalized)) || false;
        const matchesRefCode = p.referenceCode ? p.referenceCode.toLowerCase().includes(normalized) : false;
        const matchesInspired = p.inspiredBy ? p.inspiredBy.toLowerCase().includes(normalized) : false;
        const matchesHouse = p.originalHouse ? p.originalHouse.toLowerCase().includes(normalized) : false;
        const matchesNotes = [
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ].some((n) => n.toLowerCase().includes(normalized));

        return (
          matchesName ||
          matchesBrand ||
          matchesFamily ||
          matchesShortNotes ||
          matchesDesc ||
          matchesAccords ||
          matchesRefCode ||
          matchesInspired ||
          matchesHouse ||
          matchesNotes
        );
      })
    : [];

  const quickPills = [
    'Máximo',
    'MX-07',
    'MX-01',
    'Aventus',
    'Good Girl',
    'Althaïr',
    'Body Splash',
    '1 Million',
    'Baunilha',
    'Delina',
  ];

  return (
    <div
      id="search-modal-backdrop"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/15 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#24221F]/20 dark:border-white/15 pb-4">
          <Search className="w-5 h-5 text-[#A96227] dark:text-[#D4AF37] mr-3" />
          <input
            id="search-query-input"
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por marca, notas (baunilha, rosa, âmbar), acordes..."
            className="w-full bg-transparent text-lg sm:text-xl font-serif-editorial text-[#24221F] dark:text-[#F5F2EB] placeholder:text-[#24221F]/40 dark:placeholder:text-[#F5F2EB]/40 placeholder:font-sans-clean placeholder:text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#24221F]/60 dark:text-[#F5F2EB]/60 hover:text-[#24221F] dark:hover:text-white"
            aria-label="Fechar busca"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!searchTerm && (
          <div className="space-y-3">
            <span className="font-mono-subtle text-[10px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block font-medium">
              SUGESTÕES DE BUSCA
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => setSearchTerm(pill)}
                  className="px-3 py-1 bg-[#EAE3D9] dark:bg-[#1E1C1A] hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-[#D4AF37] dark:hover:text-[#121110] font-mono-subtle text-xs tracking-wider uppercase transition-colors border border-[#24221F]/10 dark:border-white/10"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            <span className="font-mono-subtle text-[10px] tracking-widest text-[#24221F]/50 dark:text-[#F5F2EB]/50 uppercase block">
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </span>

            {results.length === 0 ? (
              <p className="font-serif-editorial text-xl italic text-[#24221F]/60 dark:text-[#F5F2EB]/60 py-6 text-center">
                Nenhuma fragrância encontrada para “{searchTerm}”. Tente buscar por família olfativa ou notas.
              </p>
            ) : (
              <div className="space-y-2">
                {results.map((perfume) => (
                  <div
                    key={perfume.id}
                    onClick={() => {
                      onSelectPerfume(perfume);
                      onClose();
                    }}
                    className="p-3 bg-[#EAE3D9] dark:bg-[#1E1C1A] hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-[#262320] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
                        <img
                          src={perfume.image}
                          alt={perfume.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            if (perfume.secondaryImage && (e.currentTarget.src !== perfume.secondaryImage)) {
                              e.currentTarget.src = perfume.secondaryImage;
                            }
                          }}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          {perfume.referenceCode && (
                            <span className="font-mono-subtle text-[8px] bg-[#A96227]/20 dark:bg-[#D4AF37]/25 text-[#A96227] dark:text-[#D4AF37] px-1 py-0.2 rounded-xs font-bold">
                              {perfume.referenceCode}
                            </span>
                          )}
                          <span className="font-mono-subtle text-[9px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider block font-medium group-hover:text-[#EAE3D9]">
                            {perfume.brand} · {perfume.family}
                          </span>
                        </div>
                        <h4 className="font-serif-editorial text-lg leading-tight">
                          {perfume.name}
                        </h4>
                        {perfume.inspiredBy && (
                          <p className="text-xs text-[#A96227] dark:text-[#D4AF37] font-medium">
                            <span className="text-[9px] uppercase font-mono-subtle opacity-75">Inspirado em: </span>
                            {perfume.inspiredBy} {perfume.originalHouse ? `(${perfume.originalHouse})` : ''}
                          </p>
                        )}
                        <p className="font-mono-subtle text-[10px] opacity-70">
                          {perfume.size} · {perfume.concentration}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37] group-hover:text-white transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
