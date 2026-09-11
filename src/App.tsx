import React, { useState, useEffect } from 'react';
import { PERFUMES as INITIAL_PERFUMES, BRAND_INFO } from './data/perfumes';
import { Perfume, OlfactoryFamily, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HouseSection } from './components/HouseSection';
import { CollectionSection } from './components/CollectionSection';
import { ManifestoSection } from './components/ManifestoSection';
import { DiscoverySection } from './components/DiscoverySection';
import { DiscoverySetBanner } from './components/DiscoverySetBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { ManifestoModal } from './components/ManifestoModal';
import { DiscoverySetModal } from './components/DiscoverySetModal';
import { InfoModals } from './components/InfoModals';
import { MasterAuthModal } from './components/MasterAuthModal';
import { MasterAdminModal } from './components/MasterAdminModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [perfumesList, setPerfumesList] = useState<Perfume[]>(() => {
    try {
      const saved = localStorage.getItem('maximo_perfumes_catalog');
      return saved ? JSON.parse(saved) : INITIAL_PERFUMES;
    } catch {
      return INITIAL_PERFUMES;
    }
  });

  const [activeFamily, setActiveFamily] = useState<OlfactoryFamily>('Todos');
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('maximo_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // Fallback
    }
    return 'light';
  });

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
  const [isDiscoverySetOpen, setIsDiscoverySetOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'contact' | 'returns' | 'privacy' | null>(null);
  
  // Easter Egg Master Admin States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    try {
      localStorage.setItem('maximo_theme', theme);
    } catch {
      // Ignore
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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

  // Sync perfumes catalog
  const handleSavePerfumes = (updated: Perfume[]) => {
    setPerfumesList(updated);
    try {
      localStorage.setItem('maximo_perfumes_catalog', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleResetPerfumes = () => {
    setPerfumesList(INITIAL_PERFUMES);
    try {
      localStorage.removeItem('maximo_perfumes_catalog');
    } catch {
      // Ignore
    }
  };

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
    if (sectionId === 'discovery-set') {
      setIsDiscoverySetOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDiscoveryOption = (family: OlfactoryFamily) => {
    setActiveFamily(family);
    handleNavigateSection('colecao');
  };

  const handleEasterEggTrigger = () => {
    setIsAuthModalOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] font-sans-clean selection:bg-[#A96227]/20 relative transition-colors duration-300">
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
        onTriggerEasterEgg={handleEasterEggTrigger}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          perfumes={perfumesList}
          onExploreCollection={() => handleNavigateSection('colecao')}
          onScrollToNext={() => handleNavigateSection('casa')}
          onSelectPerfume={setSelectedPerfume}
        />

        {/* 2. House Section (01 — A CASA) */}
        <HouseSection
          onOpenStoryModal={() => setIsStoryOpen(true)}
          onSelectPerfume={setSelectedPerfume}
        />

        {/* 3. Collection Section (02 — A COLEÇÃO) */}
        <CollectionSection
          perfumes={perfumesList}
          activeFamily={activeFamily}
          onSelectFamily={setActiveFamily}
          onSelectPerfume={setSelectedPerfume}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Manifesto Section (03 — O GESTO) */}
        <ManifestoSection onOpenManifestoModal={() => setIsManifestoOpen(true)} />

        {/* 5. Olfactory Discovery Section (04 — DESCOBERTA) */}
        <DiscoverySection onSelectDiscoveryOption={handleSelectDiscoveryOption} />

        {/* 6. Discovery Set Horizontal Banner */}
        <DiscoverySetBanner onOrderDiscoverySet={() => setIsDiscoverySetOpen(true)} />

        {/* 7. Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* 8. Editorial Footer */}
      <Footer
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenPrivacyModal={() => setInfoModalType('privacy')}
        onOpenReturnsModal={() => setInfoModalType('returns')}
        onOpenContactModal={() => setInfoModalType('contact')}
        onTriggerEasterEgg={handleEasterEggTrigger}
      />

      {/* Floating PWA Install Button for easy access */}
      <PWAInstallButton variant="floating" />

      {/* Offline Status Badge */}
      <OfflineIndicator />

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
        perfumes={perfumesList}
        onSelectPerfume={setSelectedPerfume}
      />

      {/* House Story Modal */}
      <StoryModal isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />

      {/* Manifesto Modal */}
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />

      {/* Discovery Set Modal */}
      <DiscoverySetModal
        isOpen={isDiscoverySetOpen}
        onClose={() => setIsDiscoverySetOpen(false)}
        onAddToCart={(item) => handleAddToCart(item as unknown as Perfume)}
      />

      {/* Contact, Privacy & Returns Modals */}
      <InfoModals type={infoModalType} onClose={() => setInfoModalType(null)} />

      {/* Secret Master Admin Easter Egg Auth Modal */}
      <MasterAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          setIsAdminModalOpen(true);
        }}
      />

      {/* Secret Master Admin Catalog Manager */}
      <MasterAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        perfumes={perfumesList}
        onSavePerfumes={handleSavePerfumes}
        onResetToDefault={handleResetPerfumes}
      />
    </div>
  );
}
