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
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-20 sm:py-28 lg:py-32 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Editorial da Seção */}
        <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
              Catálogo Oficial
            </span>
            <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-[-0.01em] uppercase mb-4">
            Máximo — Linha de Produtos
          </h2>

          <p className="font-sans-clean text-base sm:text-lg text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-light max-w-xl mx-auto leading-relaxed">
            Uma arquitetura de fragrâncias e cuidados corporais desenvolvida com matérias-primas nobres e volumetrias pensadas para cada ritual.
          </p>
        </div>

        {/* Lista Editorial com Divisores Horizontais e Amplo Espaçamento */}
        <div className="border-t border-[#24221F]/15 dark:border-white/15">
          {PRODUCT_LINE_ITEMS.map((item) => {
            const whatsappUrl = createWhatsAppLink(item.whatsappMessage);

            return (
              <div
                key={item.id}
                className="group relative border-b border-[#24221F]/10 dark:border-white/10 py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-[#24221F]/[0.015] dark:hover:bg-white/[0.015]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                  {/* Bloco de Informações e Imagem */}
                  <div className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-grow">
                    {/* Numeração Editorial */}
                    <span className="font-mono-subtle text-xs sm:text-sm tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] font-medium w-8 sm:w-10 shrink-0">
                      {item.number}
                    </span>

                    {/* Pré-visualização do Frasco */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 bg-[#EAE3D9]/50 dark:bg-[#121110] border border-[#24221F]/8 dark:border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-full h-full object-contain p-2 sm:p-3 mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Categoria e Volumetria */}
                    <div className="flex flex-col justify-center">
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-[#24221F] dark:text-[#F5F2EB] group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors leading-tight">
                        {item.category}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 sm:mt-2.5">
                        <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] font-medium uppercase">
                          {item.sizes.join(' · ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ação / Atendimento WhatsApp */}
                  <div className="flex items-center justify-start md:justify-end pl-14 sm:pl-16 md:pl-0 shrink-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 border border-[#24221F]/20 dark:border-white/20 text-[#24221F] dark:text-[#F5F2EB] group-hover:border-[#24221F] dark:group-hover:border-[#F4F0E9] group-hover:bg-[#24221F] group-hover:text-[#F4F0E9] dark:group-hover:bg-[#F4F0E9] dark:group-hover:text-[#121110] text-[11px] font-mono-subtle tracking-[0.2em] uppercase font-medium transition-all duration-300 active:scale-98"
                    >
                      <MessageCircle className="w-3.5 h-3.5 opacity-80" />
                      <span>Atendimento</span>
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
