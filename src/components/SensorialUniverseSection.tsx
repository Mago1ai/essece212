import React, { useState } from 'react';
import { ArrowRight, Sparkles, Wind, Droplets, Sun, Moon, Flame, Shield } from 'lucide-react';
import { OlfactoryFamily } from '../types';

interface SensorialUniverseSectionProps {
  onSelectFamily: (family: OlfactoryFamily) => void;
}

export const SensorialUniverseSection: React.FC<SensorialUniverseSectionProps> = ({
  onSelectFamily,
}) => {
  const [activeTab, setActiveTab] = useState<'piramide' | 'texturas' | 'ocasiao'>('piramide');

  const families = [
    {
      name: 'Amadeirados' as OlfactoryFamily,
      title: 'Quentes & Nobres',
      subtitle: 'Cedro, Sândalo & Âmbar Puro',
      feeling: 'Sensação de elegância atemporal, acolhimento e presença imponente.',
      intensity: 'Intensidade Alta',
      time: 'Noturno & Ocasiões Especiais',
      bgClass: 'bg-[#EDE4D8] dark:bg-[#1C1A17]',
    },
    {
      name: 'Florais' as OlfactoryFamily,
      title: 'Aveludados & Raros',
      subtitle: 'Rosas de Maio, Jasmim & Íris Imperial',
      feeling: 'Sensação de sofisticação fluida, feminilidade magnética e toque sedoso.',
      intensity: 'Intensidade Moderada a Marcante',
      time: 'Diurno & Encontros Elegantes',
      bgClass: 'bg-[#EAE4DB] dark:bg-[#1A1816]',
    },
    {
      name: 'Orientais' as OlfactoryFamily,
      title: 'Misteriosos & Envolventes',
      subtitle: 'Baunilha Bourbon, Fava Tonka & Resinas',
      feeling: 'Sensação de calor hipnótico, rastro inesquecível e luxo profundo.',
      intensity: 'Intensidade Intensa',
      time: 'Climas Amenos & Noites Marcantes',
      bgClass: 'bg-[#E5DCD0] dark:bg-[#181614]',
    },
    {
      name: 'Cítricos' as OlfactoryFamily,
      title: 'Luminosos & Frescos',
      subtitle: 'Bergamota da Calábria & Néroli',
      feeling: 'Sensação de frescor radiante, energia solar e clareza revigorante.',
      intensity: 'Intensidade Leve a Moderada',
      time: 'Manhãs, Verão & Cotidiano Nobre',
      bgClass: 'bg-[#F2ECE2] dark:bg-[#1E1C1A]',
    },
  ];

  return (
    <section
      id="sensorial"
      className="relative w-full bg-[#F4EFE6] dark:bg-[#100F0E] text-[#1E1C1A] dark:text-[#F4F0E9] py-24 sm:py-32 md:py-36 border-b border-[#1E1C1A]/10 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono-subtle tracking-[0.32em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
              04 — O UNIVERSO SENSORIAL
            </span>
            <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
          </div>

          <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-light leading-[1.06] tracking-[-0.01em] mb-6">
            Mais do que uma fragrância, <br />
            <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
              uma assinatura.
            </span>
          </h2>

          <p className="font-sans-clean text-base sm:text-xl text-[#1E1C1A]/75 dark:text-[#F4F0E9]/80 font-light leading-relaxed">
            A perfumaria de luxo não se mede pela força do primeiro instante, mas pela harmonia de sua evolução silenciosa na pele ao longo das horas.
          </p>
        </div>

        {/* 3 Pillars of Sensorial Anatomy: Topo, Coração, Fundo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Topo / Saída */}
          <div className="p-8 sm:p-10 bg-white/70 dark:bg-[#161412]/80 border border-[#1E1C1A]/10 dark:border-white/10 rounded-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-subtle uppercase tracking-[0.24em] font-bold text-[#A96227] dark:text-[#D4AF37]">
                PRIMEIRO CONTATO · 0 a 30 MIN
              </span>
              <Sun className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
            </div>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Notas de Saída
            </h3>
            <p className="font-sans-clean text-xs sm:text-[13px] text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              O frescor imediato e volátil que desperta os sentidos. Bergamota, especiarias frescas e nuances florais efêmeras.
            </p>
          </div>

          {/* Coração / Corpo */}
          <div className="p-8 sm:p-10 bg-white/70 dark:bg-[#161412]/80 border border-[#A96227]/30 dark:border-[#D4AF37]/30 rounded-xs space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-subtle uppercase tracking-[0.24em] font-bold text-[#A96227] dark:text-[#D4AF37]">
                IDENTIDADE CENTRAL · 2 a 6 HORAS
              </span>
              <Flame className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
            </div>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Notas de Coração
            </h3>
            <p className="font-sans-clean text-xs sm:text-[13px] text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              A verdadeira alma e personalidade da criação. Flores opulentas, madeiras nobres e acordes aromáticos encorpados.
            </p>
          </div>

          {/* Fundo / Rastro */}
          <div className="p-8 sm:p-10 bg-white/70 dark:bg-[#161412]/80 border border-[#1E1C1A]/10 dark:border-white/10 rounded-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-subtle uppercase tracking-[0.24em] font-bold text-[#A96227] dark:text-[#D4AF37]">
                A PRESENÇA FINAL · 8 a 16 HORAS
              </span>
              <Moon className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
            </div>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal">
              Notas de Fundo
            </h3>
            <p className="font-sans-clean text-xs sm:text-[13px] text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed">
              A assinatura duradoura que se funde à química natural da sua pele. Âmbar, sândalo, almíscar e resinas preciosas.
            </p>
          </div>
        </div>

        {/* Sensorial Family Selector */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#1E1C1A]/10 dark:border-white/10 pb-4">
            <span className="text-xs font-mono-subtle uppercase tracking-[0.24em] font-semibold text-[#A96227] dark:text-[#D4AF37]">
              EXPLORE POR SENSAÇÃO & FAMÍLIA OLFATIVA
            </span>
            <span className="text-xs font-mono-subtle text-[#1E1C1A]/50 dark:text-white/50 hidden sm:inline-block">
              Clique em uma família para ver as criações
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {families.map((fam) => (
              <button
                key={fam.name}
                onClick={() => onSelectFamily(fam.name)}
                className={`text-left p-6 sm:p-8 rounded-xs border border-[#1E1C1A]/10 dark:border-white/10 transition-all duration-300 hover:border-[#A96227] dark:hover:border-[#D4AF37] hover:-translate-y-1 group cursor-pointer ${fam.bgClass}`}
              >
                <span className="text-[10px] font-mono-subtle uppercase tracking-[0.22em] text-[#A96227] dark:text-[#D4AF37] font-bold block mb-2">
                  {fam.name}
                </span>
                <h4 className="font-serif-editorial text-xl sm:text-2xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal mb-1">
                  {fam.title}
                </h4>
                <p className="text-[11px] font-mono-subtle text-[#1E1C1A]/60 dark:text-white/60 mb-3">
                  {fam.subtitle}
                </p>
                <p className="text-xs text-[#1E1C1A]/75 dark:text-[#F4F0E9]/75 font-light leading-relaxed mb-6">
                  {fam.feeling}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E1C1A]/10 dark:border-white/10 text-[11px] font-mono-subtle font-semibold text-[#A96227] dark:text-[#D4AF37]">
                  <span>VER CRIAÇÕES</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
