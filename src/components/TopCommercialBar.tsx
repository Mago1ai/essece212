import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { createWhatsAppLink } from '../data/perfumes';

interface TopCommercialBarProps {}

export const TopCommercialBar: React.FC<TopCommercialBarProps> = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const announcements = [
    {
      icon: Truck,
      highlight: 'FRETE DIFERENCIADO',
      text: 'Entregas em embalagem nobre com rastreamento para todo o Brasil',
      actionText: 'Aproveitar',
      actionType: 'scroll' as const,
    },
    {
      icon: Sparkles,
      highlight: 'ALTA PERFUMARIA',
      text: 'Fragrâncias nobres Eau de Parfum criadas para marcar presença',
      actionText: 'Ver Acervo',
      actionType: 'scroll' as const,
    },
    {
      icon: MessageCircle,
      highlight: 'CONCIERGE VIA WHATSAPP',
      text: 'Consultoria olfativa personalizada e pedidos diretos',
      actionText: 'Conversar',
      actionType: 'whatsapp' as const,
    },
    {
      icon: ShieldCheck,
      highlight: 'ALTA PERFORMANCE',
      text: 'Fixação de 8h a 14h com óleos importados de alta densidade',
      actionText: 'Ver Acervo',
      actionType: 'scroll' as const,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentAnnouncementIndex];
  const IconComponent = current.icon;

  const handleActionClick = () => {
    if (current.actionType === 'whatsapp') {
      window.open(
        createWhatsAppLink('Olá! Gostaria de consultoria para escolher minha fragrância na Máximo Eau de Parfum.'),
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      const el = document.getElementById('colecao');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Avisos e benefícios comerciais da Maison Máximo"
      className="w-full bg-[#181614] text-[#FAF8F5] border-b border-[#D4AF37]/20 text-[11px] font-mono-subtle tracking-wider py-2 px-4 transition-colors relative z-45"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center relative min-h-[22px]">
        {/* Dynamic Rotator */}
        <div
          key={currentAnnouncementIndex}
          className="flex items-center gap-2 sm:gap-2.5 mx-auto text-center animate-in fade-in slide-in-from-bottom-1 duration-300 select-none"
        >
          <IconComponent className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-[#D4AF37] font-bold uppercase tracking-widest hidden xs:inline">
            {current.highlight}:
          </span>
          <span className="text-[#F4F0E9]/90 font-light truncate max-w-[240px] xs:max-w-[340px] sm:max-w-none">
            {current.text}
          </span>
          <button
            onClick={handleActionClick}
            className="inline-flex items-center gap-0.5 text-[#D4AF37] hover:text-white underline underline-offset-2 font-semibold transition ml-1 cursor-pointer shrink-0"
          >
            <span>{current.actionText}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Direct WhatsApp Concierge Shortcut on desktop */}
        <div className="hidden lg:flex items-center gap-3 absolute right-0 text-[10px] text-[#F4F0E9]/70">
          <a
            href={createWhatsAppLink('Olá! Gostaria de tirar uma dúvida sobre entrega ou fragrâncias Máximo.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition flex items-center gap-1.5"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366]" />
            <span>Suporte WhatsApp: (85) 99616-5606</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
