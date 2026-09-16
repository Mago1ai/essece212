import React, { useState, useEffect } from 'react';
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
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F4F0E9]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-[#24221F]/10 dark:border-white/10 text-[#24221F] dark:text-[#F5F2EB] py-3.5 sm:py-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
            : 'bg-gradient-to-b from-black/65 via-black/30 to-transparent text-[#F4F0E9] py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Dynamic Transitions */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className={`group text-left focus:outline-none transition-all duration-300 py-1 ${
              isScrolled ? 'w-auto' : 'w-full'
            }`}
            aria-label="Máximo Eau de Parfum Home"
          >
            <MaximoLogo
              variant={theme === 'dark' ? 'light' : (isScrolled ? 'dark' : 'light')}
              size={isScrolled ? 'md' : 'lg'}
              className="transition-all duration-300"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center space-x-9 lg:space-x-11"
          >
            <button
              onClick={() => handleNavClick('colecao')}
              className={`text-[11px] lg:text-[12px] tracking-[0.22em] uppercase font-medium transition-colors duration-200 py-1 border-b border-transparent hover:border-current ${
                isScrolled ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]' : 'hover:text-white'
              }`}
            >
              Fragrâncias
            </button>
            <button
              onClick={() => handleNavClick('colecao')}
              className={`text-[11px] lg:text-[12px] tracking-[0.22em] uppercase font-medium transition-colors duration-200 py-1 border-b border-transparent hover:border-current ${
                isScrolled ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]' : 'hover:text-white'
              }`}
            >
              Feminino
            </button>
            <button
              onClick={() => handleNavClick('colecao')}
              className={`text-[11px] lg:text-[12px] tracking-[0.22em] uppercase font-medium transition-colors duration-200 py-1 border-b border-transparent hover:border-current ${
                isScrolled ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]' : 'hover:text-white'
              }`}
            >
              Masculino
            </button>
            <button
              onClick={() => handleNavClick('casa')}
              className={`text-[11px] lg:text-[12px] tracking-[0.22em] uppercase font-medium transition-colors duration-200 py-1 border-b border-transparent hover:border-current ${
                isScrolled ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]' : 'hover:text-white'
              }`}
            >
              A Casa
            </button>
          </nav>

          {/* Actions: Search, Wishlist, Bag, Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className={`p-2 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-sm ${
                isScrolled
                  ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                  : 'hover:text-white'
              }`}
              aria-label="Buscar fragrâncias ou notas"
            >
              <Search className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* Favorites */}
            <button
              id="favorites-trigger-btn"
              onClick={onOpenFavorites}
              className={`relative p-2 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-sm ${
                isScrolled
                  ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                  : 'hover:text-white'
              }`}
              aria-label={`Ver ${favoritesCount} perfumes favoritados`}
            >
              <Heart
                className={`w-[19px] h-[19px] sm:w-5 sm:h-5 stroke-[1.5] transition-colors ${
                  favoritesCount > 0
                    ? 'text-[#A96227] dark:text-[#D4AF37] fill-[#A96227] dark:fill-[#D4AF37]'
                    : isScrolled
                    ? 'text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                    : 'text-[#F4F0E9] hover:text-white'
                }`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono text-[9px] rounded-full flex items-center justify-center font-bold shadow-xs animate-in zoom-in-50 duration-200">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              id="cart-trigger-btn"
              onClick={onOpenCart}
              className={`relative p-2 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-sm flex items-center gap-2 ${
                isScrolled
                  ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                  : 'hover:text-white'
              }`}
              aria-label={`Sacola com ${cartCount} itens`}
            >
              <ShoppingBag className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-[#121110] font-mono text-[10px] rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#A96227] rounded-sm ${
                isScrolled
                  ? 'hover:text-[#A96227] dark:hover:text-[#D4AF37]'
                  : 'hover:text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
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
