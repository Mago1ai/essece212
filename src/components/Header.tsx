import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Menu, X, Heart, Moon, Sun, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/perfumes';
import { MaximoLogo } from './MaximoLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onNavigateSection: (sectionId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onTriggerEasterEgg?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F4F0E9]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#24221F]/10 dark:border-white/10 text-[#24221F] dark:text-[#F5F2EB] py-3.5 sm:py-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
            : 'bg-[#F4F0E9]/80 dark:bg-black/60 backdrop-blur-xs border-b border-[#24221F]/5 dark:border-white/5 text-[#24221F] dark:text-[#F4F0E9] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Easter Egg Trigger (7 Clicks) */}
          <button
            id="brand-logo-btn"
            onClick={handleLogoClick}
            className={`group text-left focus:outline-none transition-all duration-300 py-1 ${
              isScrolled ? 'scale-95' : 'scale-100'
            }`}
            aria-label="Máximo Eau de Parfum Home"
            title="Máximo Eau de Parfum"
          >
            <MaximoLogo
              variant={theme === 'dark' ? 'light' : 'dark'}
              size="md"
              className="transition-all duration-300 group-hover:scale-[1.02]"
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

          {/* Actions: Theme Atmosphere Toggle, Search, Wishlist, Bag, Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Dark / Light Atmosphere Toggle (Sensorial) */}
            <button
              id="theme-atmosphere-toggle-btn"
              onClick={onToggleTheme}
              className="p-2.5 transition-all duration-300 rounded-full flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#A96227] dark:focus:ring-[#D4AF37] bg-[#24221F]/5 dark:bg-white/10 hover:bg-[#24221F]/10 dark:hover:bg-white/15 text-[#24221F] dark:text-[#D4AF37]"
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
                <Sun className="w-5 h-5 text-[#D4AF37] animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-[#A96227] animate-in spin-in-180 duration-300" />
              )}
            </button>

            {/* Search */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="p-2.5 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full hover:bg-[#24221F]/5 dark:hover:bg-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]"
              aria-label="Buscar fragrâncias ou notas"
              title="Buscar no catálogo"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Favorites */}
            <button
              id="favorites-trigger-btn"
              onClick={onOpenFavorites}
              className="relative p-2.5 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full hover:bg-[#24221F]/5 dark:hover:bg-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]"
              aria-label={`Ver ${favoritesCount} perfumes favoritados`}
              title="Ver favoritos"
            >
              <Heart
                className={`w-5 h-5 stroke-[1.75] transition-colors ${
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

            {/* Cart */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className="relative p-2.5 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full hover:bg-[#24221F]/5 dark:hover:bg-white/10 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]"
              aria-label={`Sacola com ${cartCount} itens`}
              title="Ver sacola de compras"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono text-[10px] rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-full text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]"
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
          className="fixed inset-0 z-50 bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-300 md:hidden"
        >
          <button
            id="close-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] focus:outline-none"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          <div className="space-y-4">
            {/* Mobile Atmosphere Selector */}
            <div className="flex items-center justify-between p-3.5 bg-[#EAE3D9] dark:bg-[#1A1816] border border-[#24221F]/10 dark:border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A96227] dark:text-[#D4AF37]" />
                <span className="font-mono-subtle text-xs tracking-wider uppercase font-medium">
                  {theme === 'dark' ? 'Modo Velvet Dark' : 'Modo Atelier Diurno'}
                </span>
              </div>
              <button
                onClick={onToggleTheme}
                className="px-3 py-1.5 bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono-subtle text-[10px] tracking-wider uppercase flex items-center gap-1.5"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3 h-3" />
                    <span>Diurno</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3" />
                    <span>Noturno</span>
                  </>
                )}
              </button>
            </div>

            <span className="font-mono-subtle text-[10px] tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase block mb-4">
              NAVEGAÇÃO EDITORIAL
            </span>
            <nav className="flex flex-col space-y-5">
              <button
                onClick={() => handleNavClick('colecao')}
                className="text-left font-serif-editorial text-3xl text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
              >
                01 — A Coleção
              </button>
              <button
                onClick={() => handleNavClick('casa')}
                className="text-left font-serif-editorial text-3xl text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
              >
                02 — A Casa
              </button>
              <button
                onClick={() => handleNavClick('descoberta')}
                className="text-left font-serif-editorial text-3xl text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
              >
                03 — Descoberta Olfativa
              </button>
              <button
                onClick={() => handleNavClick('manifesto')}
                className="text-left font-serif-editorial text-3xl text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
              >
                04 — O Manifesto
              </button>
              <button
                onClick={() => handleNavClick('discovery-set')}
                className="text-left font-serif-editorial text-3xl text-[#A96227] dark:text-[#D4AF37] transition-colors"
              >
                05 — Discovery Set
              </button>
            </nav>
          </div>

          <div className="pt-8 border-t border-[#24221F]/10 dark:border-white/10 space-y-2 font-mono-subtle text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70">
            <p className="text-[11px] uppercase tracking-wider text-[#24221F] dark:text-[#F5F2EB]">
              {BRAND_INFO.origin}
            </p>
            <p className="text-[11px] text-[#A96227] dark:text-[#D4AF37]">
              Atendimento e consultoria olfativa personalizada
            </p>
          </div>
        </div>
      )}
    </>
  );
};
