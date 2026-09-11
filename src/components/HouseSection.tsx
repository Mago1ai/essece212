import React from 'react';
import { ArrowUpRight, Sparkles, Droplets, ShieldCheck, Flame, Award } from 'lucide-react';
import { Perfume } from '../types';

interface HouseSectionProps {
  onOpenStoryModal: () => void;
  onSelectPerfume?: (perfume: Perfume) => void;
}

export const HouseSection: React.FC<HouseSectionProps> = ({
  onOpenStoryModal,
}) => {
  return (
    <section
      id="casa"
      className="relative w-full bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] py-20 sm:py-28 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="font-mono-subtle text-xs sm:text-[13px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
            01 — A CASA & FILOSOFIA OLFATIVA
          </span>
          <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Bold Display Heading */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em]">
              Uma presença <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">sem pressa.</span>
            </h2>
            <p className="font-mono-subtle text-xs tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
              Perfumaria de nicho · Maceração artesanal · Alta concentração
            </p>
          </div>

          {/* Right Column: Poetic Body Copy & Textual Action */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <p className="font-sans-clean text-base sm:text-lg md:text-xl text-[#24221F]/85 dark:text-[#F5F2EB]/85 font-light leading-[1.7] max-w-xl">
              <strong className="font-medium text-[#24221F] dark:text-[#F5F2EB]">Máximo Eau de Parfum</strong> nasce da paixão pelo extraordinário. Criamos fragrâncias com acordes nobres, evolução olfativa em 3 momentos cronológicos e sensorialidade tátil que acaricia a pele como um toque de seda.
            </p>

            <div className="pt-2">
              <button
                id="house-story-btn"
                onClick={onOpenStoryModal}
                className="group inline-flex items-center gap-2 font-mono-subtle text-xs sm:text-[13px] tracking-[0.22em] text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors duration-200 border-b border-[#24221F]/30 dark:border-white/20 hover:border-[#A96227] dark:hover:border-[#D4AF37] pb-1 font-semibold"
              >
                <span>CONHEÇA NOSSA FILOSOFIA & PROCESSO</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A96227] dark:text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-[#24221F]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-5 bg-[#FAF8F5]/80 dark:bg-[#1C1A17]/80 border border-[#24221F]/8 dark:border-white/10 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Flame className="w-4 h-4" />
              <span className="font-mono-subtle text-xs tracking-[0.2em] uppercase font-bold">
                MACERAÇÃO
              </span>
            </div>
            <h4 className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] font-normal">
              90 Dias em Repouso
            </h4>
            <p className="font-sans-clean text-xs text-[#24221F]/75 dark:text-[#F5F2EB]/75 leading-relaxed">
              Tempo natural de maturação para que os óleos nobres atinjam harmonia e fixação máxima.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5]/80 dark:bg-[#1C1A17]/80 border border-[#24221F]/8 dark:border-white/10 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Droplets className="w-4 h-4" />
              <span className="font-mono-subtle text-xs tracking-[0.2em] uppercase font-bold">
                EXPERIÊNCIA TÁTIL
              </span>
            </div>
            <h4 className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] font-normal">
              Toque de Seda
            </h4>
            <p className="font-sans-clean text-xs text-[#24221F]/75 dark:text-[#F5F2EB]/75 leading-relaxed">
              Gotas que deslizam na pele sem oleosidade pesada, deixando um rastro aveludado e íntimo.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5]/80 dark:bg-[#1C1A17]/80 border border-[#24221F]/8 dark:border-white/10 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Award className="w-4 h-4" />
              <span className="font-mono-subtle text-xs tracking-[0.2em] uppercase font-bold">
                CONCENTRAÇÃO
              </span>
            </div>
            <h4 className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] font-normal">
              Eau de Parfum Real
            </h4>
            <p className="font-sans-clean text-xs text-[#24221F]/75 dark:text-[#F5F2EB]/75 leading-relaxed">
              Alta dosagem de essências finas importadas garantindo silagem marcante de 8h a 14h+.
            </p>
          </div>

          <div className="p-5 bg-[#FAF8F5]/80 dark:bg-[#1C1A17]/80 border border-[#24221F]/8 dark:border-white/10 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono-subtle text-xs tracking-[0.2em] uppercase font-bold">
                CURADORIA
              </span>
            </div>
            <h4 className="font-serif-editorial text-lg text-[#24221F] dark:text-[#F5F2EB] font-normal">
              Linha Autoral & Importados
            </h4>
            <p className="font-sans-clean text-xs text-[#24221F]/75 dark:text-[#F5F2EB]/75 leading-relaxed">
              Criações autorais exclusivas Máximo e as fragrâncias mais aclamadas do mundo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

