import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Heart, Moon, Sun, Sparkles, Smartphone, MessageCircle } from 'lucide-react';
import { BRAND_INFO, createWhatsAppLink } from '../data/perfumes';
import { MaximoLogo } from './MaximoLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { PWAInstallModal } from './PWAInstallModal';

interface HeaderProps {
  onOpenSearch: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onNavigateSection: (sectionId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onTriggerEasterEgg?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  favoritesCount,
  onOpenFavorites,
  onNavigateSection,
  theme,
  onToggleTheme,
  onTriggerEasterEgg,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    handleNavClick('hero');

    if (logoClickTimeoutRef.current) {
      clearTimeout(logoClickTimeoutRef.current);
    }

    const nextCount = logoClicks + 1;
    if (nextCount >= 7) {
      setLogoClicks(0);
      onTriggerEasterEgg?.();
    } else {
      setLogoClicks(nextCount);
      logoClickTimeoutRef.current = setTimeout(() => {
        setLogoClicks(0);
      }, 3500);
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pt-[env(safe-area-inset-top,0px)] ${
          isScrolled
            ? 'bg-[#F4F0E9]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#24221F]/10 dark:border-white/10 text-[#24221F] dark:text-[#F5F2EB] py-3 sm:py-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
            : 'bg-[#F4F0E9]/80 dark:bg-black/60 backdrop-blur-xs border-b border-[#24221F]/5 dark:border-white/5 text-[#24221F] dark:text-[#F4F0E9] py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Easter Egg Trigger (7 Clicks) - Hidden at top on mobile to prevent repetition with Hero */}
          <button
            id="brand-logo-btn"
            onClick={handleLogoClick}
            className={`group text-left focus:outline-none transition-all duration-300 py-1 ${
              isScrolled
                ? 'scale-95 opacity-100 pointer-events-auto translate-y-0'
                : 'scale-100 max-md:opacity-0 max-md:pointer-events-none max-md:-translate-y-1 md:opacity-100 md:pointer-events-auto md:translate-y-0'
            }`}
            aria-label="Máximo Eau de Parfum Home"
            title="Máximo Eau de Parfum"
          >
            <MaximoLogo
              variant={theme === 'dark' ? 'light' : 'dark'}
              size="sm"
              id="header-official-logo"
              className="transition-transform duration-300 group-hover:scale-[1.02] sm:w-48 md:w-56"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            <button
              id="nav-link-colecao"
              onClick={() => handleNavClick('colecao')}
              className="text-[13px] tracking-[0.2em] uppercase font-semibold transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-current hover:text-[#A96227] dark:hover:text-[#D4AF37]"
            >
              A Coleção
            </button>
            <button
              id="nav-link-casa"
              onClick={() => handleNavClick('casa')}
              className="text-[13px] tracking-[0.2em] uppercase font-semibold transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-current hover:text-[#A96227] dark:hover:text-[#D4AF37]"
            >
              A Casa
            </button>
            <button
              id="nav-link-descoberta"
              onClick={() => handleNavClick('descoberta')}
              className="text-[13px] tracking-[0.2em] uppercase font-semibold transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-current hover:text-[#A96227] dark:hover:text-[#D4AF37]"
            >
              Descoberta
            </button>
            <button
              id="nav-link-manifesto"
              onClick={() => handleNavClick('manifesto')}
              className="text-[13px] tracking-[0.2em] uppercase font-semibold transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-current hover:text-[#A96227] dark:hover:text-[#D4AF37]"
            >
              Manifesto
            </button>
          </nav>

          {/* Actions: PWA Install, Theme Toggle, Search, Wishlist, Bag, Mobile Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-3.5">
            {/* PWA Install Button (Desktop/Tablet) */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="header" />
            </div>

            {/* Dark / Light Atmosphere Toggle (Sensorial) */}
            <button
              id="theme-atmosphere-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 sm:p-2.5 min-w-[40px] min-h-[40px] transition-all duration-300 rounded-full flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#A96227] dark:focus:ring-[#D4AF37] bg-[#24221F]/5 dark:bg-white/10 hover:bg-[#24221F]/10 dark:hover:bg-white/15 text-[#24221F] dark:text-[#D4AF37] active:scale-95"
              title={
                theme === 'dark'
                  ? 'Alternar para Modo Atelier Diurno'
                  : 'Alternar para Modo Noturno / Velvet Dark'
              }
              aria-label={
                theme === 'dark'
                  ? 'Ativar Modo Atelier Diurno'
                  : 'Ativar Modo Noturno / Velvet Dark'
              }
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#D4AF37] animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#A96227] animate-in spin-in-180 duration-300" />
              )}
            </button>

            {/* Search */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 min-w-[40px] min-h-[40px] transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full hover:bg-[#24221F]/5 dark:hover:bg-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] flex items-center justify-center"
              aria-label="Buscar fragrâncias ou notas"
              title="Buscar no catálogo"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {/* Favorites / Curadoria */}
            <button
              id="favorites-trigger-btn"
              onClick={onOpenFavorites}
              className="relative p-2 sm:p-2.5 min-w-[40px] min-h-[40px] transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full hover:bg-[#24221F]/5 dark:hover:bg-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] flex items-center justify-center"
              aria-label={`Ver ${favoritesCount} perfumes salvos na sua curadoria`}
              title="Ver perfumes favoritados"
            >
              <Heart
                className={`w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.75] transition-colors ${
                  favoritesCount > 0
                    ? 'text-[#A96227] dark:text-[#D4AF37] fill-[#A96227] dark:fill-[#D4AF37]'
                    : 'text-[#24221F] dark:text-[#F5F2EB]'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono text-[10px] rounded-full flex items-center justify-center font-bold shadow-xs animate-in zoom-in-50 duration-200">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Concierge Link */}
            <a
              id="header-whatsapp-concierge-btn"
              href={createWhatsAppLink('Olá! Estou visitando o catálogo digital da Máximo Eau de Parfum e gostaria de tirar dúvidas / atendimento personalizado.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-[11px] uppercase tracking-wider font-bold rounded-full transition-all duration-300 shadow-xs hover:shadow-sm active:scale-95 ml-1"
              title="Atendimento direto via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.75]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-50 bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] flex flex-col justify-between px-6 py-6 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] animate-in fade-in duration-300 md:hidden overflow-y-auto no-scrollbar"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between pb-4 border-b border-[#24221F]/10 dark:border-white/10">
            <MaximoLogo
              variant={theme === 'dark' ? 'light' : 'dark'}
              size="sm"
              id="mobile-menu-logo"
            />
            <button
              id="close-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] focus:outline-none rounded-full"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="py-6 space-y-5">
            {/* Mobile Atmosphere Selector */}
            <div className="flex items-center justify-between p-3.5 bg-[#EAE3D9] dark:bg-[#1A1816] border border-[#24221F]/10 dark:border-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
                <span className="font-mono-subtle text-xs tracking-wider uppercase font-medium">
                  {theme === 'dark' ? 'Modo Velvet Dark' : 'Modo Atelier Diurno'}
                </span>
              </div>
              <button
                onClick={onToggleTheme}
                className="px-3.5 py-2 bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono-subtle text-xs tracking-wider uppercase flex items-center gap-1.5 rounded min-h-[38px] active:scale-95 transition-transform"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>Diurno</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Noturno</span>
                  </>
                )}
              </button>
            </div>

            {/* PWA Direct Mobile Banner in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPwaModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#1E1B17] to-[#2D2821] text-[#F4F0E9] border border-[#D4AF37]/40 shadow-lg text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#141210] p-1 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <img src="/icon.svg" alt="App Icon" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                    App Máximo PWA
                  </div>
                  <div className="text-xs text-[#F4F0E9] font-medium">
                    Adicionar à Tela de Início
                  </div>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-[#D4AF37]" />
            </button>

            {/* Direct WhatsApp Concierge Button */}
            <a
              href={createWhatsAppLink('Olá! Gostaria de atendimento exclusivo para tirar dúvidas sobre as fragrâncias Máximo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#24221F] dark:bg-[#D4AF37] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-wider uppercase font-bold shadow-md active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CONSULTORIA VIA WHATSAPP</span>
            </a>

            <div>
              <span className="font-mono-subtle text-[10px] tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-2 pt-2">
                NAVEGAÇÃO EDITORIAL
              </span>
              <nav className="flex flex-col divide-y divide-[#24221F]/8 dark:divide-white/8">
                <button
                  onClick={() => handleNavClick('colecao')}
                  className="text-left font-serif-editorial text-2xl py-3.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between active:translate-x-1"
                >
                  <span>01 — A Coleção</span>
                  <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37]">Ver</span>
                </button>
                <button
                  onClick={() => handleNavClick('casa')}
                  className="text-left font-serif-editorial text-2xl py-3.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between active:translate-x-1"
                >
                  <span>02 — A Casa & Filosofia</span>
                  <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37]">Ver</span>
                </button>
                <button
                  onClick={() => handleNavClick('descoberta')}
                  className="text-left font-serif-editorial text-2xl py-3.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between active:translate-x-1"
                >
                  <span>03 — Descoberta Olfativa</span>
                  <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37]">Ver</span>
                </button>
                <button
                  onClick={() => handleNavClick('manifesto')}
                  className="text-left font-serif-editorial text-2xl py-3.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors flex items-center justify-between active:translate-x-1"
                >
                  <span>04 — O Manifesto</span>
                  <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37]">Ver</span>
                </button>
                <button
                  onClick={() => handleNavClick('discovery-set')}
                  className="text-left font-serif-editorial text-2xl py-3.5 text-[#A96227] dark:text-[#D4AF37] transition-colors flex items-center justify-between active:translate-x-1"
                >
                  <span>05 — Discovery Set</span>
                  <span className="font-mono-subtle text-xs text-[#A96227] dark:text-[#D4AF37]">Pedir</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="pt-4 border-t border-[#24221F]/10 dark:border-white/10 space-y-1 font-mono-subtle text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70">
            <p className="text-[11px] uppercase tracking-wider text-[#24221F] dark:text-[#F5F2EB]">
              {BRAND_INFO.origin}
            </p>
            <p className="text-[11px] text-[#A96227] dark:text-[#D4AF37]">
              Atendimento e consultoria olfativa personalizada
            </p>
          </div>
        </div>
      )}

      {/* PWA Modal Triggered from Mobile Menu */}
      <PWAInstallModal isOpen={pwaModalOpen} onClose={() => setPwaModalOpen(false)} />
    </>
  );
};
