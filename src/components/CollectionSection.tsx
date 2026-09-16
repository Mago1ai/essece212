import React, { useState, useMemo } from 'react';
import { Perfume } from '../types';
import { ProductCard } from './ProductCard';

interface CollectionSectionProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (perfume: Perfume) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  perfumes,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'masculina' | 'feminina'>('masculina');

  const filteredPerfumes = useMemo(() => {
    const targetCategory = activeTab === 'masculina' ? 'Linha Masculina' : 'Linha Feminina';
    return perfumes.filter(p => p.category === targetCategory);
  }, [perfumes, activeTab]);

  return (
    <section
      id="colecao"
      className="relative w-full bg-[#EAE3D9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] py-16 sm:py-24 border-b border-[#24221F]/8 dark:border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-[-0.01em] text-center mb-8">
            Catálogo
          </h2>

          <div className="flex items-center justify-center border-b border-[#24221F]/20 dark:border-white/20">
            <button
              onClick={() => setActiveTab('masculina')}
              className={`px-8 py-4 font-mono-subtle text-xs sm:text-[13px] tracking-[0.2em] uppercase transition-all relative ${
                activeTab === 'masculina'
                  ? 'text-[#A96227] dark:text-[#D4AF37] font-semibold'
                  : 'text-[#24221F]/60 dark:text-[#F5F2EB]/60 hover:text-[#24221F] dark:hover:text-[#F5F2EB]'
              }`}
            >
              Coleção Masculina
              {activeTab === 'masculina' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A96227] dark:bg-[#D4AF37]"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('feminina')}
              className={`px-8 py-4 font-mono-subtle text-xs sm:text-[13px] tracking-[0.2em] uppercase transition-all relative ${
                activeTab === 'feminina'
                  ? 'text-[#A96227] dark:text-[#D4AF37] font-semibold'
                  : 'text-[#24221F]/60 dark:text-[#F5F2EB]/60 hover:text-[#24221F] dark:hover:text-[#F5F2EB]'
              }`}
            >
              Coleção Feminina
              {activeTab === 'feminina' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A96227] dark:bg-[#D4AF37]"></span>
              )}
            </button>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto">
          {filteredPerfumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredPerfumes.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  onSelect={onSelectPerfume}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-light opacity-60 mb-4">Nenhuma fragrância encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

