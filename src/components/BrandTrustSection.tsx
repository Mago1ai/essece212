import React from 'react';
import { ShieldCheck, Sparkles, Truck, MessageCircle, Award, CheckCircle2 } from 'lucide-react';

export const BrandTrustSection: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      tag: 'ORIGINALIDADE',
      title: 'Curadoria de Prestígio 100%',
      description: 'Frascos originais de importados e formulações autorais próprias produzidas sob rigoroso controle de pureza e qualidade.',
    },
    {
      icon: Sparkles,
      tag: 'MATÉRIAS-PRIMAS',
      title: 'Essências Finas & Óleos Raros',
      description: 'Concentrações elevadas de Eau de Parfum com evolução em 3 tempos cromáticos e fixação de alta durabilidade.',
    },
    {
      icon: Truck,
      tag: 'LOGÍSTICA CUIDADOSA',
      title: 'Embalagem Hermética & Envio Seguro',
      description: 'Proteção isotérmica contra calor e luminosidade com rastreamento expresso para todas as regiões do Brasil.',
    },
    {
      icon: MessageCircle,
      tag: 'CONCIERGE DEDICADO',
      title: 'Atendimento Personalizado',
      description: 'Consultoria olfativa individualizada para harmonizar sua assinatura pessoal com cada ocasião de uso.',
    },
  ];

  return (
    <section
      id="confianca"
      className="relative w-full bg-[#F0EBE1] dark:bg-[#151412] text-[#1E1C1A] dark:text-[#F4F0E9] py-20 sm:py-28 border-b border-[#1E1C1A]/10 dark:border-white/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono-subtle tracking-[0.32em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                07 — ATELIER & CONFIANÇA
              </span>
              <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-light leading-[1.08] tracking-[-0.01em]">
              O compromisso de uma <br />
              <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">
                verdadeira Casa de Perfumaria.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 font-light leading-relaxed">
            Cada etapa — da maceração dos acordes ao empacotamento com lacre de cera — é executada para entregar uma experiência sensorial impecável.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 bg-[#FAF7F2] dark:bg-[#1A1816] border border-[#1E1C1A]/10 dark:border-white/10 rounded-xs space-y-3 flex flex-col justify-between hover:border-[#A96227]/40 dark:hover:border-[#D4AF37]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37] mb-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-mono-subtle uppercase tracking-[0.24em] font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-xl text-[#1E1C1A] dark:text-[#F4F0E9] font-normal mb-2">
                    {item.title}
                  </h3>

                  <p className="font-sans-clean text-xs text-[#1E1C1A]/70 dark:text-[#F4F0E9]/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E1C1A]/8 dark:border-white/8 flex items-center gap-1.5 text-[10px] font-mono-subtle text-[#A96227] dark:text-[#D4AF37] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PADRÃO CASA MÁXIMO</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
