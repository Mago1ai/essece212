import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink } from '../data/perfumes';

interface ProductCardProps {
  perfume: Perfume;
  onSelect: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  perfume,
  onSelect,
  onAddToCart,
}) => {
  const whatsappUrl = createProductWhatsAppLink(perfume.name, perfume.size, perfume.price);

  // Mapeamento de cores premium para diferenciar visualmente os frascos iguais
  const getFamilyBgColor = (family: string) => {
    const f = family.toLowerCase();
    if (f.includes('fresco')) return 'bg-sky-50 dark:bg-sky-900/10';
    if (f.includes('floral gourmand')) return 'bg-red-50 dark:bg-red-900/10';
    if (f.includes('floral oriental')) return 'bg-fuchsia-50 dark:bg-fuchsia-900/10';
    if (f.includes('floral')) return 'bg-rose-50 dark:bg-rose-900/10';
    if (f.includes('ambarado') || f.includes('oriental')) return 'bg-amber-100/50 dark:bg-amber-900/10';
    if (f.includes('gourmand')) return 'bg-orange-50 dark:bg-orange-900/10';
    if (f.includes('amadeirado')) return 'bg-stone-100 dark:bg-stone-900/10';
    return 'bg-[#F4F0E9] dark:bg-[#141210]'; // Default
  };

  const getFamilyAccentColor = (family: string) => {
    const f = family.toLowerCase();
    if (f.includes('fresco')) return 'text-sky-700 dark:text-sky-400';
    if (f.includes('floral')) return 'text-rose-700 dark:text-rose-400';
    if (f.includes('ambarado') || f.includes('oriental') || f.includes('gourmand')) return 'text-amber-700 dark:text-amber-500';
    if (f.includes('amadeirado')) return 'text-stone-700 dark:text-stone-400';
    return 'text-[#A96227] dark:text-[#D4AF37]';
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#FDFBF7] dark:bg-[#1A1816] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      {/* Imagem e Selos */}
      <div 
        className={`relative aspect-[4/5] overflow-hidden cursor-pointer transition-colors duration-500 ${getFamilyBgColor(perfume.family)}`}
        onClick={() => onSelect(perfume)}
      >
        {perfume.badge && (
          <div className="absolute top-4 left-4 z-20 bg-[#121110] text-[#EAE3D9] dark:bg-[#EAE3D9] dark:text-[#121110] text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-mono-subtle">
            {perfume.badge}
          </div>
        )}

        {/* Nome da Inspiração como "Marca D'água" tipográfica sutil no fundo */}
        {perfume.inspiradoEm && (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none z-0 overflow-hidden">
            <span className="font-serif-editorial text-[120px] font-bold leading-none tracking-tighter -rotate-12 whitespace-nowrap">
              {perfume.inspiradoEm}
            </span>
          </div>
        )}
        
        <img
          src={perfume.image}
          alt={perfume.name}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500 z-10 mix-blend-multiply dark:mix-blend-normal group-hover:opacity-0"
        />
        
        {perfume.secondaryImage ? (
          <img
            src={perfume.secondaryImage}
            alt={`${perfume.name} detalhe`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10"
          />
        ) : (
          <img
            src={perfume.image}
            alt={perfume.name}
            className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 z-10 mix-blend-multiply dark:mix-blend-normal"
          />
        )}
      </div>

      {/* Informações do Produto */}
      <div className="flex flex-col flex-grow p-5 sm:p-6 text-center">
        <h3 
          className="font-serif-editorial text-lg sm:text-xl text-[#24221F] dark:text-[#F5F2EB] mb-1 cursor-pointer hover:text-[#A96227] transition-colors"
          onClick={() => onSelect(perfume)}
        >
          {perfume.name}
        </h3>
        
        {perfume.inspiradoEm ? (
          <p className="text-[10px] text-[#A96227] tracking-[0.1em] mb-3 font-mono-subtle">
            Ref: {perfume.inspiradoEm}
          </p>
        ) : (
          <p className="text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60 tracking-[0.1em] uppercase mb-3 font-mono-subtle">
            {perfume.category || perfume.family}
          </p>
        )}

        <p className="text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 mb-4 font-light flex-grow">
          {perfume.shortNotes}
        </p>

        <div className="flex items-center justify-center gap-4 mb-5 text-[11px] uppercase tracking-wider font-mono-subtle text-[#24221F] dark:text-[#F5F2EB]">
          <span>{perfume.size}</span>
          <span>|</span>
          <span className="font-semibold">{perfume.price}</span>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(perfume)}
            className="w-full flex items-center justify-center gap-2 bg-[#121110] dark:bg-[#F4F0E9] text-[#F4F0E9] dark:text-[#121110] py-3 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#A96227] dark:hover:bg-[#D4AF37] hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Adicionar à Sacola
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-transparent text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/20 dark:border-white/20 py-3 text-[11px] tracking-[0.2em] uppercase font-medium hover:border-[#A96227] hover:text-[#A96227] dark:hover:border-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Atendimento
          </a>
        </div>
      </div>
    </div>
  );
};
