import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/perfumes';

interface HouseSectionProps {
  onOpenStoryModal: () => void;
}

export const HouseSection: React.FC<HouseSectionProps> = ({ onOpenStoryModal }) => {
  return (
    <section
      id="casa"
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-28 sm:py-36 md:py-44 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
            01 — A CASA
          </span>
          <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Display Heading & Text */}
          <div className="xl:col-span-5 flex flex-col justify-between space-y-8">
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-light leading-[1.08] tracking-[-0.01em]">
              Uma presença <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">sem pressa.</span>
            </h2>

            <p className="font-sans-clean text-lg sm:text-xl md:text-2xl text-[#24221F]/85 dark:text-[#F5F2EB]/85 font-light leading-[1.7] max-w-xl">
              <strong className="font-medium text-[#24221F] dark:text-[#F5F2EB]">Máximo Eau de Parfum</strong> é uma casa dedicada à alta perfumaria e ao cuidado corporal sublime. Unimos formulações ricas, acordes nobres e atendimento exclusivo para quem aprecia distinção e sensorialidade.
            </p>

            <div className="pt-2">
              <button
                id="house-story-btn"
                onClick={onOpenStoryModal}
                className="group inline-flex items-center gap-2 font-mono-subtle text-xs sm:text-[13px] tracking-[0.22em] text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors duration-200 border-b border-[#24221F]/30 dark:border-white/20 hover:border-[#A96227] dark:hover:border-[#D4AF37] pb-1"
              >
                <span>CONHEÇA NOSSA HISTÓRIA</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A96227] dark:text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Image */}
          <div className="xl:col-span-7 relative">
             <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE3D9] dark:bg-[#121110]">
               <img 
                 src="/images/house-couple.jpg" 
                 alt="Casal elegante representando a sensualidade e presença da Máximo Eau de Parfum"
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
             </div>
          </div>
        </div>

        {/* Quiet Detail Strip */}
        <div className="mt-20 sm:mt-28 pt-8 border-t border-[#24221F]/10 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-mono-subtle text-xs">
          <div>
            <span className="block text-[10px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1">
              PROCESSO
            </span>
            <span className="text-[#24221F] dark:text-[#F5F2EB] font-normal">Maceração de 90 dias</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1">
              PRODUÇÃO
            </span>
            <span className="text-[#24221F] dark:text-[#F5F2EB] font-normal">Lotes de 300 frascos</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1">
              CONCENTRAÇÃO
            </span>
            <span className="text-[#24221F] dark:text-[#F5F2EB] font-normal">18% a 24% Extrait & EdP</span>
          </div>
          <div>
            <span className="block text-[10px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase mb-1">
              COMPROMISSO
            </span>
            <span className="text-[#24221F] dark:text-[#F5F2EB] font-normal">100% Vegano & Cruelty-Free</span>
          </div>
        </div>
      </div>
    </section>
  );
};
