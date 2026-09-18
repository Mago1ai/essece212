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
  const whatsappUrl = createProductWhatsAppLink(perfume.name, perfume.brand, perfume.size);

  return (
    <div className="group relative flex flex-col h-full bg-[#FDFBF7] dark:bg-[#1A1816] border border-[#24221F]/8 dark:border-white/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
      {/* 1. Fotografia do Produto (Mesmo enquadramento, proporção e espaço interno) */}
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-[#F4F0E9] dark:bg-[#141210] flex items-center justify-center transition-colors duration-300"
        onClick={() => onSelect(perfume)}
      >
        {perfume.badge && (
          <div className="absolute top-4 left-4 z-20 bg-[#121110] text-[#EAE3D9] dark:bg-[#EAE3D9] dark:text-[#121110] text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-mono-subtle shadow-xs">
            {perfume.badge}
          </div>
        )}
        
        <img
          src={perfume.image}
          alt={perfume.name}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 z-10"
          loading="lazy"
        />
      </div>

      {/* Corpo do Card com Hierarquia Padronizada */}
      <div className="flex flex-col flex-grow p-6 text-center">
        {/* 2. Nome do Produto */}
        <h3 
          className="font-serif-editorial text-lg sm:text-xl font-light text-[#24221F] dark:text-[#F5F2EB] mb-1.5 cursor-pointer hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors leading-snug"
          onClick={() => onSelect(perfume)}
        >
          {perfume.name}
        </h3>
        
        {/* 3. Informações do Produto (Referência / Família + Notas) */}
        {perfume.inspiradoEm ? (
          <span className="font-mono-subtle text-[10px] sm:text-[11px] text-[#A96227] dark:text-[#D4AF37] tracking-[0.16em] uppercase mb-2">
            Ref: {perfume.inspiradoEm}
          </span>
        ) : (
          <span className="font-mono-subtle text-[10px] sm:text-[11px] text-[#24221F]/60 dark:text-[#F5F2EB]/60 tracking-[0.16em] uppercase mb-2">
            {perfume.category || perfume.family}
          </span>
        )}

        <p className="font-sans-clean text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-light leading-relaxed line-clamp-2 mb-4 flex-grow">
          {perfume.shortNotes}
        </p>

        {/* 4. Preço / Informação Existente */}
        <div className="flex items-center justify-center gap-2.5 mb-5 font-mono-subtle text-xs tracking-wider text-[#24221F] dark:text-[#F5F2EB]">
          <span>{perfume.size}</span>
          <span className="text-[#24221F]/30 dark:text-white/30">·</span>
          <span className="text-[#A96227] dark:text-[#D4AF37] font-medium">Sob Consulta</span>
        </div>

        {/* 5. Botões de Ação */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(perfume)}
            className="w-full flex items-center justify-center gap-2 bg-[#121110] dark:bg-[#F4F0E9] text-[#F4F0E9] dark:text-[#121110] py-3 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#A96227] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#121110] transition-colors"
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
