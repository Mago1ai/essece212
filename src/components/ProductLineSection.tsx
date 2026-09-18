import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../data/perfumes';

interface ProductLineItem {
  id: string;
  number: string;
  category: string;
  sizes: string[];
  image: string;
  whatsappMessage: string;
}

const PRODUCT_LINE_ITEMS: ProductLineItem[] = [
  {
    id: 'perfumes-femininos',
    number: '01',
    category: 'PERFUMES FEMININOS',
    sizes: ['30 ml', '50 ml'],
    image: '/images/products/maximo-feminino-60ml-novo.jpg',
    whatsappMessage: 'Olá! Tenho interesse nos Perfumes Femininos (30 ml · 50 ml) da Máximo — Linha de Produtos. Poderiam me informar a disponibilidade?',
  },
  {
    id: 'perfumes-masculinos',
    number: '02',
    category: 'PERFUMES MASCULINOS',
    sizes: ['30 ml', '50 ml'],
    image: '/images/products/maximo-masculino-30ml-novo.jpg',
    whatsappMessage: 'Olá! Tenho interesse nos Perfumes Masculinos (30 ml · 50 ml) da Máximo — Linha de Produtos. Poderiam me informar a disponibilidade?',
  },
  {
    id: 'perfume-cabelo',
    number: '03',
    category: 'PERFUME PARA CABELO',
    sizes: ['60 ml'],
    image: '/images/products/amore-perfume-capilar-60ml.jpg',
    whatsappMessage: 'Olá! Tenho interesse no Perfume para Cabelo (60 ml) da Máximo — Linha de Produtos. Poderiam me informar a disponibilidade?',
  },
  {
    id: 'creme-acetinado',
    number: '04',
    category: 'CREME ACETINADO',
    sizes: ['200 g'],
    image: '/images/products/maximo-creme-acetinado.jpg',
    whatsappMessage: 'Olá! Tenho interesse no Creme Acetinado (200 g) da Máximo — Linha de Produtos. Poderiam me informar a disponibilidade?',
  },
];

export const ProductLineSection: React.FC = () => {
  return (
    <section
      id="linha-produtos"
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-16 sm:py-24 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
              Catálogo Oficial
            </span>
            <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-[-0.01em] uppercase">
            MÁXIMO — LINHA DE PRODUTOS
          </h2>
        </div>

        {/* Grid de Grupos de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PRODUCT_LINE_ITEMS.map((item) => {
            const whatsappUrl = createWhatsAppLink(item.whatsappMessage);

            return (
              <div
                key={item.id}
                className="group relative flex flex-col h-full bg-[#FDFBF7] dark:bg-[#1A1816] border border-[#24221F]/8 dark:border-white/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Imagem do Produto */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F4F0E9] dark:bg-[#141210]">
                  {/* Badge de Especificação */}
                  <div className="absolute top-4 left-4 z-20 bg-[#121110] text-[#EAE3D9] dark:bg-[#EAE3D9] dark:text-[#121110] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 font-mono-subtle shadow-xs">
                    <span>{item.sizes.join(' · ')}</span>
                  </div>

                  <img
                    src={item.image}
                    alt={item.category}
                    className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply dark:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Informações do Grupo */}
                <div className="flex flex-col flex-grow p-6 text-center">
                  <span className="font-mono-subtle text-[10px] tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-2">
                    {item.number}
                  </span>

                  <h3 className="font-serif-editorial text-lg sm:text-xl font-light tracking-wide text-[#24221F] dark:text-[#F5F2EB] mb-2">
                    {item.category}
                  </h3>

                  {/* Apresentação dos Tamanhos */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] font-semibold uppercase">
                      {item.sizes.join(' · ')}
                    </span>
                  </div>

                  {/* Botão de Ação / Atendimento */}
                  <div className="mt-auto pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#121110] dark:bg-[#F4F0E9] text-[#F4F0E9] dark:text-[#121110] py-3 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#A96227] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#121110] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Atendimento
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
