import React from 'react';
import { ArrowUpRight, Sparkles, Droplets, ShieldCheck, Flame, Award, Clock } from 'lucide-react';
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
      className="relative w-full bg-[#FAF7F2] dark:bg-[#141210] text-[#1E1C1A] dark:text-[#F4F0E9] py-24 sm:py-32 md:py-36 border-b border-[#1E1C1A]/8 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-10 sm:mb-16">
          <span className="font-mono-subtle text-xs tracking-[0.32em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
            01 — POSICIONAMENTO DA MARCA
          </span>
          <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
        </div>

        {/* Asymmetric Editorial Luxury Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Bold Display Heading & Manifesto Excerpt */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-light leading-[1.06] tracking-[-0.01em]">
              A arte do silêncio <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">e da memória.</span>
            </h2>
            <p className="font-mono-subtle text-xs tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
              Perfumaria Autoral · Maceração Lenta · Alta Concentração
            </p>
            <div className="w-16 h-[1px] bg-[#1E1C1A]/15 dark:bg-white/15" />
          </div>

          {/* Right Column: Poetic Body Copy & Luxury Action */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <p className="font-sans-clean text-base sm:text-xl text-[#1E1C1A]/80 dark:text-[#F4F0E9]/85 font-light leading-[1.75] max-w-xl">
              A <strong className="font-medium text-[#1E1C1A] dark:text-[#F4F0E9]">Casa Máximo</strong> concebe perfumes e cosméticos como extensões da própria aura. Cada acorde é maturado no tempo exato, sem pressa industrial, para que a pirâmide olfativa revele suas nuances com elegância intimista e presença magnética.
            </p>

            <div className="pt-2">
              <button
                id="house-story-btn"
                onClick={onOpenStoryModal}
                className="group inline-flex items-center gap-2.5 font-mono-subtle text-xs tracking-[0.22em] text-[#1E1C1A] dark:text-[#F4F0E9] hover:text-[#A96227] dark:hover:text-[#D4AF37] uppercase transition-colors duration-200 border-b border-[#1E1C1A]/30 dark:border-white/25 hover:border-[#A96227] dark:hover:border-[#D4AF37] pb-1.5 font-semibold cursor-pointer"
              >
                <span>LER A HISTÓRIA DO ATELIER</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A96227] dark:text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Atelier Distinction */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#1E1C1A]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-6 bg-white/70 dark:bg-[#1A1816]/70 border border-[#1E1C1A]/8 dark:border-white/10 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Clock className="w-4 h-4" />
              <span className="font-mono-subtle text-[11px] tracking-[0.24em] uppercase font-bold">
                MATURAÇÃO
              </span>
            </div>
            <h4 className="font-serif-editorial text-xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              90 Dias em Repouso
            </h4>
            <p className="font-sans-clean text-xs text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              Tempo natural de maturação para que os óleos essenciais nobres alcancem perfeita sinergia e fixação máxima.
            </p>
          </div>

          <div className="p-6 bg-white/70 dark:bg-[#1A1816]/70 border border-[#1E1C1A]/8 dark:border-white/10 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Droplets className="w-4 h-4" />
              <span className="font-mono-subtle text-[11px] tracking-[0.24em] uppercase font-bold">
                TEXTURA TÁTIL
              </span>
            </div>
            <h4 className="font-serif-editorial text-xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Toque Acetinado
            </h4>
            <p className="font-sans-clean text-xs text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              Fórmulas cosméticas e brumas perfumadas que abraçam o corpo com toque sedoso e sem oleosidade.
            </p>
          </div>

          <div className="p-6 bg-white/70 dark:bg-[#1A1816]/70 border border-[#1E1C1A]/8 dark:border-white/10 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <Award className="w-4 h-4" />
              <span className="font-mono-subtle text-[11px] tracking-[0.24em] uppercase font-bold">
                POTÊNCIA
              </span>
            </div>
            <h4 className="font-serif-editorial text-xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Eau de Parfum Puro
            </h4>
            <p className="font-sans-clean text-xs text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              Alta concentração de óleos importados garantindo silagem nobre de 8 a 14 horas de evolução contínua.
            </p>
          </div>

          <div className="p-6 bg-white/70 dark:bg-[#1A1816]/70 border border-[#1E1C1A]/8 dark:border-white/10 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono-subtle text-[11px] tracking-[0.24em] uppercase font-bold">
                CURADORIA
              </span>
            </div>
            <h4 className="font-serif-editorial text-xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Autoral & Importados
            </h4>
            <p className="font-sans-clean text-xs text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              Equilíbrio harmônico entre formulações autorais da Casa e as maiores referências da alta perfumaria internacional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


