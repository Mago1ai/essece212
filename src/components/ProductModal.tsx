import React, { useEffect, useState } from 'react';
import {
  X,
  Heart,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Truck,
  Clock,
  Wind,
  Layers,
  ChevronRight,
  Droplets,
} from 'lucide-react';
import { Perfume } from '../types';
import { createProductWhatsAppLink, getPerfumeTactileSensation } from '../data/perfumes';
import { InteractiveBottleShowcase } from './InteractiveBottleShowcase';

interface ProductModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  perfume,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeSensoryStage, setActiveSensoryStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (perfume) {
      setActiveSensoryStage(0);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [perfume, onClose]);

  if (!perfume) return null;

  const whatsAppLink = createProductWhatsAppLink(
    perfume.name,
    perfume.brand,
    perfume.size,
    perfume.price
  );

  const tactileDescription = getPerfumeTactileSensation(perfume);

  // Sensory Evolution Stages Definition
  const sensoryStages = [
    {
      timeframe: '0 a 15 min',
      title: 'A Primeira Borrifada',
      subtitle: 'Frescor e impacto imediato',
      description:
        'A explosão vibrante dos óleos essenciais voláteis desperta os sentidos no instante do contato, abrindo caminho para a aura da fragrância.',
      notes: perfume.notes.top,
      type: 'Notas de Saída',
      accentColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      timeframe: '30 min a 2h',
      title: 'A Fragrância na Pele',
      subtitle: 'O coração aconchegante e assinatura',
      description:
        'Ao se fundir com o calor da pele, a criação atinge seu ápice de harmonia, revelando a verdadeira alma e personalidade do perfume.',
      notes: perfume.notes.heart,
      type: 'Notas de Coração',
      accentColor: 'text-[#A96227] dark:text-[#D4AF37]',
    },
    {
      timeframe: '4h a 12h',
      title: 'O Rastro que Fica',
      subtitle: 'Fixação profunda, madeiras e calor residual',
      description:
        'As moléculas nobres e densas se fixam profundamente, criando uma memória olfativa inesquecível, envolvente e magnética por onde você passar.',
      notes: perfume.notes.base,
      type: 'Notas de Fundo',
      accentColor: 'text-amber-800 dark:text-amber-300',
    },
  ];

  // Helper to determine projection meter level (1 to 4)
  const getProjectionLevel = (sillage: string) => {
    const s = sillage.toLowerCase();
    if (s.includes('opulent') || s.includes('explosiv') || s.includes('altíssim') || s.includes('poderos')) return 4;
    if (s.includes('marcant') || s.includes('alta') || s.includes('intensa') || s.includes('irradi')) return 3;
    if (s.includes('suave') || s.includes('íntim') || s.includes('pele') || s.includes('delicad')) return 1;
    return 2; // Moderada
  };

  // Helper to determine longevity level (1 to 3)
  const getLongevityLevel = (longevity: string) => {
    const l = longevity.toLowerCase();
    if (l.includes('12') || l.includes('14') || l.includes('24') || l.includes('eterna') || l.includes('extrema')) return 3;
    if (l.includes('8') || l.includes('10') || l.includes('dia')) return 2;
    return 1; // 6h a 8h
  };

  const projectionLevel = getProjectionLevel(perfume.sillage);
  const longevityLevel = getLongevityLevel(perfume.longevity);

  return (
    <div
      id="product-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 bg-black/80 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="product-modal-container"
        className="relative w-full max-w-5xl bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] border border-[#24221F]/15 dark:border-white/10 shadow-2xl max-h-[95vh] sm:max-h-[92vh] overflow-y-auto transform transition-all duration-300 my-auto rounded-xs no-scrollbar pb-[env(safe-area-inset-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-11 h-11 flex items-center justify-center bg-[#F4F0E9]/90 dark:bg-[#1E1C1A]/90 backdrop-blur-xs text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors focus:outline-none rounded-full border border-[#24221F]/10 dark:border-white/10 shadow-sm touch-press"
          aria-label="Fechar modal do perfume"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
          {/* Left: 3D Interactive Bottle Showcase */}
          <div className="md:col-span-5 relative flex flex-col items-center justify-between">
            <InteractiveBottleShowcase
              src={perfume.image}
              fallbackSrc={perfume.secondaryImage}
              alt={`Frasco de ${perfume.name} - ${perfume.brand}`}
              brand={perfume.brand}
              name={perfume.name}
              badge={perfume.badge}
              tactileDescription={tactileDescription}
            />
          </div>

          {/* Right: Detailed Perfume Dossier & Chronological Sensory Journey */}
          <div className="md:col-span-7 p-4 sm:p-8 lg:p-9 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-4 sm:space-y-5">
              {/* Category & Concentration */}
              <div className="flex items-center justify-between font-mono-subtle text-[11px] sm:text-xs tracking-[0.22em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                <span>{perfume.family} · {perfume.concentration}</span>
                <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70 font-medium">{perfume.size}</span>
              </div>

              {/* Title & Brand */}
              <div>
                <h2
                  id="product-modal-title"
                  className="font-serif-editorial text-2xl sm:text-4xl text-[#24221F] dark:text-[#F5F2EB] font-light leading-tight mb-1"
                >
                  {perfume.name}
                </h2>
                <p className="font-mono-subtle text-xs sm:text-sm text-[#24221F]/75 dark:text-[#F5F2EB]/75 tracking-wider uppercase">
                  Casa de Perfumaria: <span className="font-semibold text-[#24221F] dark:text-[#D4AF37]">{perfume.brand}</span>
                </p>
              </div>

              {/* Fragrantica Accords */}
              {perfume.accords && perfume.accords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {perfume.accords.map((accord, idx) => (
                    <span
                      key={idx}
                      className="bg-[#24221F]/5 dark:bg-white/5 text-[#24221F]/85 dark:text-[#F5F2EB]/85 border border-[#24221F]/10 dark:border-white/10 font-mono-subtle text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-xs font-medium"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              )}

              {/* Atmosphere Quote */}
              <p className="font-serif-editorial italic text-base sm:text-lg text-[#24221F]/85 dark:text-[#F5F2EB]/85 border-l-2 border-[#A96227] dark:border-[#D4AF37] pl-3 py-0.5">
                “{perfume.atmosphere}”
              </p>

              {/* Sensory Description */}
              <p className="font-sans-clean text-xs sm:text-[15px] text-[#24221F]/85 dark:text-[#F5F2EB]/80 font-light leading-relaxed">
                {perfume.sensoryDescription}
              </p>

              {/* --- PIRÂMIDE SENSORIAL DINÂMICA EM 3 MOMENTOS CRONOLÓGICOS --- */}
              <div className="bg-[#EAE3D9]/70 dark:bg-[#1F1D1A] p-3.5 sm:p-5 border border-[#24221F]/10 dark:border-white/10 space-y-2.5 sm:space-y-3 rounded-xs shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                    <span className="font-mono-subtle text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase font-bold">
                      PIRÂMIDE CRONOLÓGICA
                    </span>
                  </div>
                  <span className="font-mono-subtle text-[9px] sm:text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60 tracking-wider uppercase font-medium">
                    Selecione a fase
                  </span>
                </div>

                {/* 3 Chronological Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/10 dark:border-white/10">
                  {sensoryStages.map((stage, idx) => {
                    const isActive = activeSensoryStage === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSensoryStage(idx as 0 | 1 | 2)}
                        className={`py-2 px-1 text-center transition-all duration-300 min-h-[44px] flex flex-col items-center justify-center active:scale-95 touch-press ${
                          isActive
                            ? 'bg-[#24221F] dark:bg-[#2A2622] text-[#F4F0E9] dark:text-[#D4AF37] shadow-sm font-semibold'
                            : 'text-[#24221F]/70 dark:text-[#F5F2EB]/60 hover:text-[#24221F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="font-mono-subtle text-[9px] uppercase tracking-wider block opacity-75">
                          {stage.timeframe}
                        </span>
                        <span className="font-serif-editorial text-[11px] sm:text-xs truncate max-w-full font-medium">
                          {stage.title.split(' ')[0]} {stage.title.split(' ')[1]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Sensory Stage Dossier */}
                <div className="p-3 sm:p-3.5 bg-[#F4F0E9]/90 dark:bg-[#161513] border border-[#24221F]/10 dark:border-white/10 space-y-1.5 sm:space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono-subtle text-[11px] sm:text-xs tracking-wider uppercase font-semibold ${sensoryStages[activeSensoryStage].accentColor}`}>
                      {sensoryStages[activeSensoryStage].title} ({sensoryStages[activeSensoryStage].timeframe})
                    </span>
                    <span className="font-mono-subtle text-[9px] sm:text-[10px] uppercase tracking-wider text-[#24221F]/60 dark:text-[#F5F2EB]/60 font-medium">
                      {sensoryStages[activeSensoryStage].type}
                    </span>
                  </div>

                  <p className="font-sans-clean text-xs sm:text-sm text-[#24221F]/85 dark:text-[#F5F2EB]/85 leading-relaxed">
                    {sensoryStages[activeSensoryStage].description}
                  </p>

                  <div className="pt-2 border-t border-[#24221F]/10 dark:border-white/10">
                    <span className="text-[10px] uppercase tracking-wider font-mono-subtle text-[#24221F]/70 dark:text-[#F5F2EB]/70 block mb-1 font-medium">
                      Notas Evidenciadas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {sensoryStages[activeSensoryStage].notes.map((note, i) => (
                        <span
                          key={i}
                          className="bg-[#24221F] dark:bg-[#D4AF37]/15 text-[#F4F0E9] dark:text-[#D4AF37] font-mono-subtle text-[11px] sm:text-xs px-2 py-0.5 border border-transparent dark:border-[#D4AF37]/30 shadow-xs font-semibold"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- GUIA DE PROJEÇÃO & FIXAÇÃO (MEDIDORES MINIMALISTAS) --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-0.5">
                {/* Projeção Meter */}
                <div className="p-3 bg-[#EAE3D9]/50 dark:bg-[#1F1D1A] border border-[#24221F]/10 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-mono-subtle text-xs">
                    <span className="text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-semibold flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5" />
                      <span>PROJEÇÃO / SILAGEM</span>
                    </span>
                    <span className="text-[#24221F]/90 dark:text-[#F5F2EB]/90 font-medium">
                      {projectionLevel === 1 ? 'Intimista' : projectionLevel === 2 ? 'Moderada' : projectionLevel === 3 ? 'Marcante' : 'Opulenta'}
                    </span>
                  </div>
                  {/* Visual 4-step bar */}
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1.5 rounded-xs transition-colors ${
                          lvl <= projectionLevel
                            ? 'bg-[#A96227] dark:bg-[#D4AF37]'
                            : 'bg-[#24221F]/15 dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-mono-subtle text-[10px] text-[#24221F]/70 dark:text-[#F5F2EB]/70">
                    {perfume.sillage}
                  </p>
                </div>

                {/* Fixação Meter */}
                <div className="p-3 bg-[#EAE3D9]/50 dark:bg-[#1F1D1A] border border-[#24221F]/10 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-mono-subtle text-xs">
                    <span className="text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>LONGEVIDADE / FIXAÇÃO</span>
                    </span>
                    <span className="text-[#24221F]/90 dark:text-[#F5F2EB]/90 font-medium">
                      {longevityLevel === 1 ? '6h - 8h' : longevityLevel === 2 ? '8h - 12h' : '12h - 24h+'}
                    </span>
                  </div>
                  {/* Visual 3-step bar */}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    {[1, 2, 3].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1.5 rounded-xs transition-colors ${
                          lvl <= longevityLevel
                            ? 'bg-[#A96227] dark:bg-[#D4AF37]'
                            : 'bg-[#24221F]/15 dark:bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-mono-subtle text-[10px] text-[#24221F]/70 dark:text-[#F5F2EB]/70">
                    {perfume.longevity}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Price */}
            <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-[#24221F]/10 dark:border-white/10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono-subtle text-xl sm:text-3xl text-[#24221F] dark:text-[#F5F2EB] font-bold tracking-tight">
                    {perfume.price}
                  </span>
                  <span className="ml-1.5 sm:ml-2 font-mono-subtle text-[11px] sm:text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70">
                    / {perfume.size} · Frete Incluso
                  </span>
                </div>
                <button
                  id={`modal-favorite-${perfume.id}`}
                  onClick={() => onToggleFavorite(perfume.id)}
                  className="flex items-center gap-1.5 font-mono-subtle text-xs text-[#24221F]/80 dark:text-[#F5F2EB]/80 hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors font-medium min-h-[44px] px-2 touch-press"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite
                        ? 'fill-[#A96227] dark:fill-[#D4AF37] text-[#A96227] dark:text-[#D4AF37]'
                        : 'text-[#24221F]/60 dark:text-[#F5F2EB]/60'
                    }`}
                  />
                  <span>{isFavorite ? 'FAVORITADO' : 'SALVAR'}</span>
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <a
                id="modal-whatsapp-inquiry-btn"
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa w-full min-h-[48px] py-3.5 sm:py-4 px-4 sm:px-6 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-md hover:shadow-lg active:scale-[0.98] font-bold rounded-xs touch-press"
              >
                <MessageCircle className="w-5 h-5 transition-transform group-hover/wa:scale-110" />
                <span>TENHO INTERESSE (WHATSAPP)</span>
              </a>

              {/* Guarantees */}
              <div className="pt-2 grid grid-cols-3 gap-1 sm:gap-2 font-mono-subtle text-[10px] sm:text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 border-t border-[#24221F]/10 dark:border-white/10">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] shrink-0" />
                  <span>Envios Brasil</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] shrink-0" />
                  <span>Amostra cortesia</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37] shrink-0" />
                  <span>100% Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
