import React, { useState, useEffect } from 'react';
import { PERFUMES, BRAND_INFO } from './data/perfumes';
import { Perfume, OlfactoryFamily, CartItem } from './types';
import { Header } from './components/Header';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { HouseSection } from './components/HouseSection';
import { CollectionSection } from './components/CollectionSection';
import { CollectionIntro } from './components/CollectionIntro';
import { ProductLineSection } from './components/ProductLineSection';
import { ManifestoSection } from './components/ManifestoSection';
import { DiscoverySection } from './components/DiscoverySection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { ManifestoModal } from './components/ManifestoModal';
import { InfoModals } from './components/InfoModals';

export default function App() {
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const theme = 'light';

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maximo_favorites') || localStorage.getItem('materia_elementar_favorites');
      return saved ? JSON.parse(saved) : ['maximo-signature'];
    } catch {
      return ['maximo-signature'];
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maximo_cart') || localStorage.getItem('materia_elementar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'contact' | 'returns' | 'privacy' | null>(null);

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem('maximo_theme', theme);
    } catch {
      // Ignore
    }
    document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleToggleTheme = () => {
    // No-op, tema sempre claro
  };

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('maximo_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore in strict private mode
    }
  }, [favorites]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('maximo_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore in strict private mode
    }
  }, [cartItems]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (perfume: Perfume) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.perfume.id === perfume.id);
      if (existing) {
        return prev.map((item) =>
          item.perfume.id === perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { perfume, quantity: 1, size: perfume.size }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (perfumeId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(perfumeId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.perfume.id === perfumeId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (perfumeId: string) => {
    setCartItems((prev) => prev.filter((item) => item.perfume.id !== perfumeId));
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] font-sans-clean selection:bg-[#A96227]/20 relative transition-colors duration-300">
      {/* Top Bar Anúncios */}
      <TopBar />

      {/* Editorial Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onNavigateSection={handleNavigateSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onExploreCollection={() => handleNavigateSection('colecao')}
          onScrollToNext={() => handleNavigateSection('casa')}
        />

        <CollectionIntro
          onExplore={() => handleNavigateSection('colecao')}
        />

        {/* 2. Collection Section (Catálogo Comercial) */}
        <CollectionSection
          perfumes={PERFUMES}
          onSelectPerfume={(perfume) => {
            setSelectedPerfume(perfume);
          }}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />

        {/* MÁXIMO — LINHA DE PRODUTOS */}
        <ProductLineSection />

        {/* 3. House Section (01 — A CASA) */}
        <HouseSection onOpenStoryModal={() => setIsStoryOpen(true)} />

        {/* 4. Manifesto Section (03 — O GESTO) */}
        <ManifestoSection onOpenManifestoModal={() => setIsManifestoOpen(true)} />

        {/* 5. Olfactory Discovery Section (04 — DESCOBERTA) */}
        <DiscoverySection onExplore={() => handleNavigateSection('colecao')} />

        {/* 6. Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 8. Editorial Footer */}
      <Footer
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenPrivacyModal={() => setInfoModalType('privacy')}
        onOpenReturnsModal={() => setInfoModalType('returns')}
        onOpenContactModal={() => setInfoModalType('contact')}
      />

      {/* Product Details Modal */}
      <ProductModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={handleAddToCart}
        isFavorite={selectedPerfume ? favorites.includes(selectedPerfume.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        enablePixCheckout={true}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onSelectPerfume={setSelectedPerfume}
      />

      {/* Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        perfumes={PERFUMES}
        onSelectPerfume={setSelectedPerfume}
      />

      {/* House Story Modal */}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* Manifesto Modal */}
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />

      {/* Contact, Privacy & Returns Modals */}
      <InfoModals type={infoModalType} onClose={() => setInfoModalType(null)} />
    </div>
  );
}
