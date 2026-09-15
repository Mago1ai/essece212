// Generator and content for single-file standalone maximo-eau-de-parfum.html
import { PERFUMES } from '../data/perfumes';

export function getStandaloneHtmlContent(): string {
  const perfumesJson = JSON.stringify(PERFUMES, null, 2);

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Máximo Eau de Parfum — Alta Perfumaria & Catálogo Exclusivo</title>
  <meta name="description" content="Catálogo exclusivo de alta perfumaria e cosméticos autorais Máximo Eau de Parfum. Fragrâncias nobres, acordes refinados e atendimento personalizado via WhatsApp." />
  
  <!-- Google Fonts: Cormorant Garamond (Editorial Luxury Serif) & DM Sans (Modern Body) & Alex Brush (Signature) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Parisienne&family=Pinyon+Script&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            amber: {
              gold: '#D4AF37',
              noble: '#A96227',
              warm: '#C97D3E',
            },
            parfum: {
              dark: '#121110',
              card: '#161513',
              charcoal: '#24221F',
              ivory: '#F4F0E9',
              velvet: '#1A1816',
            }
          },
          fontFamily: {
            serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
            sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
            signature: ['"Alex Brush"', '"Parisienne"', '"Pinyon Script"', 'cursive'],
          }
        }
      }
    };
  </script>

  <!-- React 18 & ReactDOM 18 (UMD) & Babel Standalone -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    :root {
      --font-serif: "Cormorant Garamond", Georgia, serif;
      --font-sans: "DM Sans", system-ui, sans-serif;
    }
    html {
      scroll-behavior: smooth;
      font-family: var(--font-sans);
    }
    body {
      overflow-x: hidden;
      background-color: #121110;
      color: #F4F0E9;
    }
    html:not(.dark) body {
      background-color: #F4F0E9;
      color: #24221F;
    }
    h1, h2, h3, h4, .font-serif-editorial {
      font-family: var(--font-serif);
      letter-spacing: -0.01em;
    }
    ::selection {
      background-color: rgba(169, 98, 39, 0.35);
      color: #FFFFFF;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #161513;
    }
    ::-webkit-scrollbar-thumb {
      background: #3A3530;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #A96227;
    }
    .text-balance {
      text-wrap: balance;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.25s ease-out forwards;
    }
  </style>
</head>
<body class="transition-colors duration-300">
  <div id="root"></div>

  <!-- React Application Logic Compiled by Babel -->
  <script type="text/babel">
    const { useState, useEffect, useMemo, useRef } = React;

    // --- WHATSAPP CONFIGURATION ---
    const WHATSAPP_PHONE = '5531975394776';

    function getWhatsappUrl(message) {
      return \`https://wa.me/\${WHATSAPP_PHONE}?text=\${encodeURIComponent(message)}\`;
    }

    // --- EMBEDDED COMPLETE DATASET ---
    const PERFUMES_DATA = ${perfumesJson};

    // --- SVG ICONS (Native embedded SVG components) ---
    const Icons = {
      Search: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      Heart: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill={props.filled ? "currentColor" : "none"} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      Bag: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
      Sun: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ),
      Moon: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),
      Close: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ),
      ArrowRight: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      ),
      Check: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
      Whatsapp: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      Droplets: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
          <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
        </svg>
      ),
      Sparkles: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
          <path d="M5 3v4"></path>
          <path d="M19 17v4"></path>
          <path d="M3 5h4"></path>
          <path d="M17 19h4"></path>
        </svg>
      ),
      Shield: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      Download: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      ),
      Trash: (props) => (
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      )
    };

    // --- MÁXIMO OFFICIAL LOGO COMPONENT ---
    function MaximoLogo({ isDark, className = "w-48 sm:w-56 md:w-64" }) {
      return (
        <div className={\`inline-flex flex-col items-center justify-center select-none text-center group \${className}\`}>
          <img
            src="https://i.postimg.cc/wMwZLbCK/image.png"
            alt="Máximo Eau de Parfum"
            className="w-full h-auto object-contain transition-all duration-300 select-none pointer-events-none"
            style={{
              filter: isDark ? 'invert(1) brightness(1.2)' : 'none',
              mixBlendMode: isDark ? 'screen' : 'multiply'
            }}
            loading="eager"
          />
        </div>
      );
    }

    // --- BOTTLE STUDIO PEDESTAL COMPONENT ---
    function StudioBottleImage({ src, alt, className = "" }) {
      const [tilt, setTilt] = useState({ x: 0, y: 0 });
      const [isHovered, setIsHovered] = useState(false);

      const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 10, y: y * 10 });
      };

      return (
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
          className={\`relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#F2ECE2]/40 via-[#EAE3D7]/20 to-transparent dark:from-[#1A1816]/60 dark:via-[#141210]/30 dark:to-transparent flex items-center justify-center select-none rounded-t-xs \${className}\`}
          style={{ perspective: '900px' }}
        >
          {/* Subtle Radial Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(169,98,39,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(201,125,62,0.14),transparent_75%)] pointer-events-none" />

          {/* 3D Minimalist Circular Pedestal Platform */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 w-4/5 max-w-[210px] h-8 pointer-events-none z-0 transition-transform duration-300"
            style={{
              transform: \`translateX(calc(-50% + \${tilt.x * 1.2}px)) scale(\${isHovered ? 1.03 : 1})\`,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-[100%] bg-gradient-to-b from-[#E8DFD1]/80 via-[#DDD2C1]/60 to-[#CEC2AF]/40 dark:from-[#24211E] dark:via-[#1A1816] dark:to-[#121110] border border-black/5 dark:border-white/10 shadow-[0_6px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] transform -scale-y-75" />
              <div className="absolute top-[2px] left-[8%] right-[8%] h-[65%] rounded-[100%] border-t border-white/60 dark:border-[#D4AF37]/30 pointer-events-none" />
            </div>
          </div>

          {/* Realistic Diffuse Contact Shadow */}
          <div
            style={{
              transform: \`translateX(calc(-50% + \${tilt.x * 1.6}px)) scale(\${isHovered ? 1.08 : 1})\`,
            }}
            className="absolute bottom-6 left-1/2 w-3/5 max-w-[170px] h-3 bg-black/20 dark:bg-black/75 rounded-full blur-[6px] transition-all duration-300 pointer-events-none z-0"
          />

          {/* Main High Res Perfume Bottle */}
          <img
            src={src}
            alt={alt}
            className="relative z-10 max-h-[78%] max-w-[76%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] transition-transform duration-300"
            style={{
              transform: \`rotateY(\${tilt.x}deg) rotateX(\${-tilt.y}deg) scale(\${isHovered ? 1.05 : 1})\`,
            }}
            loading="lazy"
          />
        </div>
      );
    }

    // --- MAIN REACT APPLICATION COMPONENT ---
    function App() {
      const [isDark, setIsDark] = useState(true);
      const [activeFamily, setActiveFamily] = useState('Todos');
      const [selectedGender, setSelectedGender] = useState('Todos');
      const [selectedPerfume, setSelectedPerfume] = useState(null);
      const [searchQuery, setSearchQuery] = useState('');
      const [isSearchOpen, setIsSearchOpen] = useState(false);
      const [isCartOpen, setIsCartOpen] = useState(false);
      const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
      const [isStoryOpen, setIsStoryOpen] = useState(false);
      const [isDiscoverySetOpen, setIsDiscoverySetOpen] = useState(false);
      
      const [favorites, setFavorites] = useState(() => {
        try {
          const saved = localStorage.getItem('maximo_favorites');
          return saved ? JSON.parse(saved) : ['maximo-body-splash', 'maximo-creme-acetinado'];
        } catch {
          return ['maximo-body-splash'];
        }
      });

      const [cart, setCart] = useState(() => {
        try {
          const saved = localStorage.getItem('maximo_cart');
          return saved ? JSON.parse(saved) : [];
        } catch {
          return [];
        }
      });

      useEffect(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDark]);

      useEffect(() => {
        try {
          localStorage.setItem('maximo_favorites', JSON.stringify(favorites));
        } catch (e) {}
      }, [favorites]);

      useEffect(() => {
        try {
          localStorage.setItem('maximo_cart', JSON.stringify(cart));
        } catch (e) {}
      }, [cart]);

      const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
      };

      const addToCart = (perfume) => {
        setCart(prev => {
          const existing = prev.find(item => item.id === perfume.id);
          if (existing) {
            return prev.map(item => item.id === perfume.id ? { ...item, qty: item.qty + 1 } : item);
          }
          return [...prev, { ...perfume, qty: 1 }];
        });
        setIsCartOpen(true);
      };

      const updateCartQty = (id, delta) => {
        setCart(prev => prev.map(item => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        }).filter(Boolean));
      };

      const removeCartItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
      };

      const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
      const cartSubtotal = cart.reduce((sum, item) => sum + (item.priceNumeric * item.qty), 0);

      // Filtering products
      const filteredPerfumes = useMemo(() => {
        return PERFUMES_DATA.filter(p => {
          const matchesFamily = activeFamily === 'Todos' || p.family === activeFamily || (activeFamily === 'Linha Máximo' && (p.brand === 'Máximo' || p.category === 'Linha Máximo'));
          const matchesGender = selectedGender === 'Todos' || p.gender === selectedGender || p.gender === 'Compartilhável';
          return matchesFamily && matchesGender;
        });
      }, [activeFamily, selectedGender]);

      // Search results
      const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return PERFUMES_DATA.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.family.toLowerCase().includes(q) ||
          p.shortNotes.toLowerCase().includes(q) ||
          p.accords.some(a => a.toLowerCase().includes(q))
        );
      }, [searchQuery]);

      const families = ['Todos', 'Linha Máximo', 'Amadeirado Nobre', 'Floral Nobre', 'Oriental Especiado', 'Cítrico Aromático', 'Gourmand Fascinante'];

      const sendCartWhatsApp = () => {
        if (cart.length === 0) return;
        let msg = \`*MÁXIMO EAU DE PARFUM — PEDIDO EXCLUSIVO*\\n\\n\`;
        msg += \`Olá! Gostaria de confirmar meu pedido com atendimento personalizado:\\n\\n\`;
        cart.forEach((item, idx) => {
          msg += \`\${idx + 1}. *\${item.name}* (\${item.brand})\\n   • Quantidade: \${item.qty}\\n   • Volume: \${item.size}\\n   • Valor Unitário: \${item.price}\\n\\n\`;
        });
        msg += \`*VALOR TOTAL ESTIMADO: R$ \${cartSubtotal.toFixed(2).replace('.', ',')}*\\n\\n\`;
        msg += \`Por favor, me informe as opções de pagamento via PIX/Cartão e o prazo de entrega.\`;
        window.open(getWhatsappUrl(msg), '_blank');
      };

      return (
        <div className="min-h-screen bg-[#F4F0E9] dark:bg-[#121110] text-[#24221F] dark:text-[#F4F0E9] transition-colors duration-300">
          
          {/* TOP ANNOUNCEMENT BAR */}
          <div className="bg-[#1A1816] text-[#EAE3D9] text-[11px] uppercase tracking-[0.24em] py-2 px-4 text-center border-b border-white/5 font-medium flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>MÁXIMO EAU DE PARFUM · ATENDIMENTO EXCLUSIVO VIA WHATSAPP (31) 97539-4776</span>
          </div>

          {/* HEADER NAV */}
          <header className="sticky top-0 z-40 bg-[#F4F0E9]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-4 sm:px-8 py-3.5 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Left Nav Actions */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsStoryOpen(true)}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#24221F]/80 dark:text-[#F4F0E9]/80 hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors hidden md:block"
                >
                  A CASA
                </button>
                <a
                  href="#catalogo"
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#24221F]/80 dark:text-[#F4F0E9]/80 hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors"
                >
                  CATÁLOGO
                </a>
              </div>

              {/* Center Vector Logo */}
              <a href="#" className="flex items-center justify-center py-1">
                <MaximoLogo isDark={isDark} className="w-44 sm:w-56" />
              </a>

              {/* Right User Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Buscar fragrâncias"
                >
                  <Icons.Search />
                </button>

                <button
                  onClick={() => setIsFavoritesOpen(true)}
                  className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Ver favoritos"
                >
                  <Icons.Heart />
                  {favorites.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-black rounded-full text-[9px] font-bold flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-label="Ver sacola"
                >
                  <Icons.Bag />
                  {totalCartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-black rounded-full text-[9px] font-bold flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#A96227] dark:text-[#D4AF37]"
                  aria-label="Alternar tema"
                >
                  {isDark ? <Icons.Sun /> : <Icons.Moon />}
                </button>
              </div>
            </div>
          </header>

          {/* HERO SECTION */}
          <section className="relative min-h-[82vh] flex items-center justify-center bg-[#1A1816] text-[#F4F0E9] px-6 py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(169,98,39,0.22),transparent_70%)] pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                <span className="text-xs sm:text-[13px] tracking-[0.28em] text-[#D4AF37] uppercase font-semibold">
                  MÁXIMO EAU DE PARFUM · ALTA PERFUMARIA
                </span>
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-light leading-[1.08] tracking-tight">
                A presença que <br />
                <span className="italic font-normal text-[#EAE3D9]">permanece.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#F4F0E9]/85 max-w-xl mx-auto font-light leading-relaxed">
                Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e intensidade.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#catalogo"
                  className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#121110] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <span>CONHEÇA A COLEÇÃO</span>
                  <Icons.ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsDiscoverySetOpen(true)}
                  className="px-8 py-3.5 border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-[0.2em] uppercase transition-all"
                >
                  DISCOVERY SET (4 FLACONS)
                </button>
              </div>
            </div>
          </section>

          {/* CATALOG SECTION */}
          <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
            
            {/* Catalog Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs tracking-[0.26em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                    02 — O CATÁLOGO EXCLUSIVO
                  </span>
                  <div className="w-12 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40"></div>
                </div>
                <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#24221F] dark:text-[#F4F0E9] font-light">
                  A Coleção <span className="italic">Completa</span>
                </h2>
              </div>
              <div className="text-xs text-[#24221F]/70 dark:text-[#F4F0E9]/70 space-y-1 border-l-2 border-[#A96227]/40 pl-4 max-w-sm">
                <p className="font-semibold text-[11px] uppercase tracking-wider text-[#24221F] dark:text-[#F4F0E9]">
                  Máximo Eau de Parfum & Importados
                </p>
                <p>Consultoria olfativa, pedidos diretos e curadoria sob medida.</p>
              </div>
            </div>

            {/* Olfactory Family Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {families.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFamily(f)}
                  className={\`px-4 py-2 text-xs tracking-[0.16em] uppercase whitespace-nowrap transition-all border \${
                    activeFamily === f
                      ? 'bg-[#24221F] dark:bg-[#D4AF37] text-white dark:text-[#121110] border-transparent font-semibold shadow-sm'
                      : 'bg-transparent text-[#24221F]/70 dark:text-[#F4F0E9]/70 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                  }\`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Sub Filter: Gender */}
            <div className="flex items-center justify-between pb-6 mb-10 border-b border-black/5 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#24221F]/60 dark:text-[#F4F0E9]/60 uppercase tracking-wider font-medium mr-2">
                  Público:
                </span>
                {['Todos', 'Feminino', 'Masculino'].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={\`px-3 py-1 rounded-xs uppercase tracking-wider font-medium text-[11px] transition-colors \${
                      selectedGender === g
                        ? 'bg-[#A96227] dark:bg-[#D4AF37] text-white dark:text-black font-semibold'
                        : 'bg-black/5 dark:bg-white/5 text-[#24221F]/70 dark:text-[#F4F0E9]/70'
                    }\`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <span className="text-[#24221F]/60 dark:text-[#F4F0E9]/60 uppercase tracking-wider">
                Mostrando {filteredPerfumes.length} produtos
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredPerfumes.map(perfume => {
                const isFav = favorites.includes(perfume.id);
                return (
                  <article
                    key={perfume.id}
                    className="group flex flex-col bg-[#FAF8F5] dark:bg-[#161513] border border-black/[0.06] dark:border-white/[0.06] hover:border-[#A96227]/40 dark:hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Bottle Pedestal Box */}
                    <div className="relative cursor-pointer" onClick={() => setSelectedPerfume(perfume)}>
                      <StudioBottleImage src={perfume.image} alt={perfume.name} />

                      {/* Brand & Badge Tags */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
                        <span className="bg-[#24221F]/90 dark:bg-[#201E1B]/95 text-white dark:text-[#D4AF37] text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-semibold">
                          {perfume.brand}
                        </span>
                        {perfume.badge && (
                          <span className="bg-[#A96227] dark:bg-[#C97D3E] text-white text-[8px] tracking-[0.16em] px-2 py-0.5 uppercase font-medium">
                            {perfume.badge}
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(perfume.id); }}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xs text-[#24221F] dark:text-white hover:scale-110 transition-transform shadow-sm"
                        aria-label="Favoritar"
                      >
                        <Icons.Heart filled={isFav} className={isFav ? "text-red-500 fill-red-500" : ""} />
                      </button>
                    </div>

                    {/* Tactile Ribbon */}
                    <div className="px-5 py-2 bg-[#F0EBE2]/60 dark:bg-[#1A1816] border-b border-black/[0.04] dark:border-white/[0.04] flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37] text-[10px] font-medium">
                      <Icons.Droplets className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{perfume.shortNotes}</span>
                    </div>

                    {/* Info Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-[11px] tracking-[0.18em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold mb-1">
                          <span>{perfume.family}</span>
                          <span className="text-[#24221F]/60 dark:text-[#F4F0E9]/60 font-medium">{perfume.size}</span>
                        </div>
                        <h3
                          onClick={() => setSelectedPerfume(perfume)}
                          className="font-serif-editorial text-2xl text-[#24221F] dark:text-[#F4F0E9] font-normal cursor-pointer group-hover:text-[#A96227] dark:group-hover:text-[#D4AF37] transition-colors leading-snug"
                        >
                          {perfume.name}
                        </h3>
                        <p className="text-xs text-[#24221F]/70 dark:text-[#F4F0E9]/70 line-clamp-2 mt-2 leading-relaxed">
                          {perfume.sensoryDescription}
                        </p>
                      </div>

                      {/* Exclusivity & Actions */}
                      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-mono uppercase tracking-widest text-[#A96227] dark:text-[#D4AF37] font-semibold">
                              Exclusivo
                            </span>
                            <span className="block text-[10px] uppercase text-[#24221F]/50 dark:text-[#F4F0E9]/50 tracking-wider">
                              {perfume.concentration}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedPerfume(perfume)}
                            className="text-xs tracking-[0.16em] uppercase font-medium text-[#24221F] dark:text-[#F4F0E9] hover:text-[#A96227] dark:hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                          >
                            <span>DETALHES</span>
                            <Icons.ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={getWhatsappUrl(\`Olá! Tenho interesse no perfume \${perfume.name} (\${perfume.brand}, \${perfume.size}) da Maison Máximo Eau de Parfum. Gostaria de atendimento exclusivo.\`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-3 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-white dark:text-black text-[11px] tracking-[0.12em] uppercase font-semibold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <Icons.Whatsapp className="w-3.5 h-3.5" />
                            <span>WHATSAPP</span>
                          </a>
                          <button
                            onClick={() => addToCart(perfume)}
                            className="py-2.5 px-3 border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white text-[11px] tracking-[0.12em] uppercase font-medium text-center transition-colors"
                          >
                            + SACOLA
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* PRODUCT DETAIL MODAL */}
          {selectedPerfume && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-[#FAF8F5] dark:bg-[#161513] text-[#24221F] dark:text-[#F4F0E9] w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-black/10 dark:border-white/10 shadow-2xl relative">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPerfume(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:scale-110 transition-transform"
                >
                  <Icons.Close />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: Product Media with Pedestal */}
                  <div className="p-8 flex items-center justify-center bg-gradient-to-b from-[#F2ECE2]/50 via-transparent to-transparent dark:from-[#1A1816]/50">
                    <StudioBottleImage src={selectedPerfume.image} alt={selectedPerfume.name} />
                  </div>

                  {/* Right: Technical Sheet & Pyramid */}
                  <div className="p-8 space-y-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase font-semibold">
                        <span>{selectedPerfume.brand}</span>
                        <span>·</span>
                        <span>{selectedPerfume.family}</span>
                      </div>
                      <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal mt-1 text-[#24221F] dark:text-[#F4F0E9]">
                        {selectedPerfume.name}
                      </h2>
                      <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-3xl font-serif font-medium text-[#A96227] dark:text-[#D4AF37]">
                          {selectedPerfume.price}
                        </span>
                        <span className="text-xs text-[#24221F]/60 dark:text-[#F4F0E9]/60 uppercase">
                          {selectedPerfume.size} · {selectedPerfume.concentration}
                        </span>
                      </div>
                      <p className="text-sm text-[#24221F]/80 dark:text-[#F4F0E9]/80 mt-4 leading-relaxed">
                        {selectedPerfume.sensoryDescription}
                      </p>

                      {/* Olfactory Pyramid */}
                      <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A96227] dark:text-[#D4AF37]">
                          PIRÂMIDE OLFATIVA OFICIAL
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex gap-2">
                            <span className="font-semibold w-16 text-[#24221F]/60 dark:text-[#F4F0E9]/60">TOPO:</span>
                            <span>{selectedPerfume.notes.top.join(', ')}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold w-16 text-[#24221F]/60 dark:text-[#F4F0E9]/60">CORAÇÃO:</span>
                            <span>{selectedPerfume.notes.heart.join(', ')}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-semibold w-16 text-[#24221F]/60 dark:text-[#F4F0E9]/60">FUNDO:</span>
                            <span>{selectedPerfume.notes.base.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Modal CTAs */}
                    <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10">
                      <a
                        href={getWhatsappUrl(\`Olá! Gostaria de atendimento exclusivo para o perfume \${selectedPerfume.name} (\${selectedPerfume.brand}, \${selectedPerfume.size}) no valor de \${selectedPerfume.price}.\`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-white dark:text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Icons.Whatsapp className="w-4 h-4" />
                        <span>COMPRAR VIA WHATSAPP (31) 97539-4776</span>
                      </a>
                      <button
                        onClick={() => { addToCart(selectedPerfume); setSelectedPerfume(null); }}
                        className="w-full py-3 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white font-medium text-xs tracking-[0.16em] uppercase text-center"
                      >
                        ADICIONAR À SACOLA (+ R$ {selectedPerfume.priceNumeric})
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CART DRAWER */}
          {isCartOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
              <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#161513] text-[#24221F] dark:text-[#F4F0E9] shadow-2xl flex flex-col justify-between border-l border-black/10 dark:border-white/10">
                  
                  {/* Cart Header */}
                  <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.Bag />
                      <h3 className="font-serif-editorial text-2xl font-normal">Sua Sacola</h3>
                      <span className="text-xs text-[#A96227] dark:text-[#D4AF37] font-semibold">({totalCartCount})</span>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-1 hover:scale-110">
                      <Icons.Close />
                    </button>
                  </div>

                  {/* Cart List */}
                  <div className="p-6 overflow-y-auto flex-grow space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-16 space-y-4 text-[#24221F]/60 dark:text-[#F4F0E9]/60">
                        <Icons.Bag className="w-12 h-12 mx-auto stroke-1" />
                        <p className="text-sm">Sua sacola está vazia.</p>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 items-center">
                          <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                          <div className="flex-grow">
                            <h4 className="text-sm font-semibold truncate">{item.name}</h4>
                            <p className="text-xs text-[#A96227] dark:text-[#D4AF37]">{item.price} · {item.size}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 border rounded flex items-center justify-center text-xs">-</button>
                              <span className="text-xs font-semibold">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 border rounded flex items-center justify-center text-xs">+</button>
                            </div>
                          </div>
                          <button onClick={() => removeCartItem(item.id)} className="p-2 text-red-500 hover:scale-110">
                            <Icons.Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cart.length > 0 && (
                    <div className="p-6 border-t border-black/10 dark:border-white/10 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs uppercase tracking-wider">Subtotal:</span>
                        <span className="text-2xl font-serif font-semibold text-[#A96227] dark:text-[#D4AF37]">
                          R$ {cartSubtotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <button
                        onClick={sendCartWhatsApp}
                        className="w-full py-3.5 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-white dark:text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Icons.Whatsapp className="w-4 h-4" />
                        <span>FECHAR PEDIDO NO WHATSAPP</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* SEARCH OVERLAY */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="bg-[#FAF8F5] dark:bg-[#161513] text-[#24221F] dark:text-[#F4F0E9] w-full max-w-2xl border border-black/10 dark:border-white/10 shadow-2xl p-6 relative">
                <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 p-2">
                  <Icons.Close />
                </button>
                <h3 className="font-serif-editorial text-2xl mb-4">Busca de Fragrâncias & Notas</h3>
                <input
                  type="text"
                  placeholder="Ex: Rosa Damascena, Baunilha, Máximo, Baccarat, Amadeirado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3.5 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 focus:outline-none focus:border-[#A96227] dark:focus:border-[#D4AF37] text-sm"
                  autoFocus
                />

                <div className="mt-6 max-h-80 overflow-y-auto space-y-3">
                  {searchQuery && searchResults.length === 0 && (
                    <p className="text-sm text-center py-6 text-[#24221F]/60 dark:text-[#F4F0E9]/60">Nenhum perfume encontrado com esse termo.</p>
                  )}
                  {searchResults.map(p => (
                    <div
                      key={p.id}
                      onClick={() => { setSelectedPerfume(p); setIsSearchOpen(false); }}
                      className="p-3 bg-black/5 dark:bg-white/5 hover:bg-[#A96227]/15 dark:hover:bg-[#D4AF37]/15 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-semibold text-sm">{p.name}</h4>
                        <p className="text-xs text-[#24221F]/60 dark:text-[#F4F0E9]/60">{p.brand} · {p.shortNotes}</p>
                      </div>
                      <span className="font-serif font-medium text-sm text-[#A96227] dark:text-[#D4AF37]">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DISCOVERY SET MODAL */}
          {isDiscoverySetOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-[#FAF8F5] dark:bg-[#161513] text-[#24221F] dark:text-[#F4F0E9] w-full max-w-lg border border-black/10 dark:border-white/10 p-8 relative shadow-2xl">
                <button onClick={() => setIsDiscoverySetOpen(false)} className="absolute top-4 right-4 p-2">
                  <Icons.Close />
                </button>
                <span className="text-xs uppercase tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] font-semibold">EXPERIÊNCIA OLFATIVA</span>
                <h3 className="font-serif-editorial text-3xl font-light mt-1">Discovery Set Máximo</h3>
                <p className="text-sm text-[#24221F]/80 dark:text-[#F4F0E9]/80 mt-3 leading-relaxed">
                  Receba um estojo luxuoso com 4 flacons de 5ml para experimentar as fragrâncias no conforto da sua pele antes de escolher o frasco principal.
                </p>
                <div className="my-6 p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold">Coffret 4 Amostras (5ml)</p>
                    <p className="text-[11px] text-[#24221F]/60 dark:text-[#F4F0E9]/60">Valor 100% revertido em desconto no frasco grande</p>
                  </div>
                  <span className="text-xl font-serif font-bold text-[#A96227] dark:text-[#D4AF37]">R$ 149</span>
                </div>
                <a
                  href={getWhatsappUrl("Olá! Gostaria de pedir o Discovery Set Máximo (4 flacons de 5ml) por R$ 149 com valor revertido em desconto.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#24221F] hover:bg-[#A96227] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-white dark:text-black font-semibold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 shadow-lg"
                >
                  <Icons.Whatsapp className="w-4 h-4" />
                  <span>PEDIR DISCOVERY SET NO WHATSAPP</span>
                </a>
              </div>
            </div>
          )}

          {/* HOUSE STORY MODAL */}
          {isStoryOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-[#FAF8F5] dark:bg-[#161513] text-[#24221F] dark:text-[#F4F0E9] w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-black/10 dark:border-white/10 p-8 relative shadow-2xl space-y-4">
                <button onClick={() => setIsStoryOpen(false)} className="absolute top-4 right-4 p-2">
                  <Icons.Close />
                </button>
                <span className="text-xs uppercase tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] font-semibold">A CASA</span>
                <h3 className="font-serif-editorial text-3xl font-light">Máximo Eau de Parfum</h3>
                <p className="text-sm text-[#24221F]/85 dark:text-[#F4F0E9]/85 leading-relaxed">
                  A <strong>Máximo Eau de Parfum</strong> nasceu da união entre a alta perfumaria clássica e o requinte da cosmética acetinada contemporânea. Cada frasco é trabalhado como uma joia escultórica, abrigando concentrações elevadas de óleos essenciais nobres.
                </p>
                <p className="text-sm text-[#24221F]/85 dark:text-[#F4F0E9]/85 leading-relaxed">
                  Nosso compromisso é entregar fragrâncias com sillage inesquecível, fixação impecável e um atendimento personalizado direto do ateliê para a sua coleção.
                </p>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="bg-[#161513] text-[#F4F0E9] border-t border-white/10 py-16 px-4 sm:px-8 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2 space-y-4">
                <MaximoLogo isDark={true} className="w-48" />
                <p className="text-xs text-white/70 max-w-sm leading-relaxed">
                  Alta perfumaria autoral e fragrâncias importadas nobres. Elegância, presença marcante e consultoria personalizada.
                </p>
              </div>
              <div className="space-y-3 text-xs">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">CONTATO & ATENDIMENTO</h4>
                <p className="text-white/80">WhatsApp Oficial: (31) 97539-4776</p>
                <p className="text-white/80">Atendimento de Segunda a Sábado</p>
                <p className="text-white/80">Envio para todo o Brasil</p>
              </div>
              <div className="space-y-3 text-xs">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D4AF37]">GARANTIA & PADRÃO</h4>
                <p className="text-white/80">✓ 100% Fragrâncias Originais</p>
                <p className="text-white/80">✓ Concentração Eau de Parfum</p>
                <p className="text-white/80">✓ Embalagens com Lacre Nobre</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/10 text-center text-xs text-white/40">
              © 2026 Máximo Eau de Parfum. Todos os direitos reservados.
            </div>
          </footer>

        </div>
      );
    }

    // Render React 18 App
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtml(): void {
  const htmlContent = getStandaloneHtmlContent();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'maximo-eau-de-parfum.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
