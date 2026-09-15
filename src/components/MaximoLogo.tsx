import React, { useState, useEffect, useId } from 'react';
import { getStoreSettings } from '../data/perfumes';

export interface MaximoLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'amber' | 'gold' | 'adaptive';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'custom';
  showSubtitle?: boolean;
  id?: string;
}

export const MaximoLogo: React.FC<MaximoLogoProps> = ({
  className = '',
  variant = 'adaptive',
  size = 'md',
  id,
}) => {
  const rawId = useId();
  const safeId = (id || rawId).replace(/[^a-zA-Z0-9-_]/g, '_');

  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return getStoreSettings().logoUrl || 'https://i.postimg.cc/JHBpWK7K/image.png';
  });

  useEffect(() => {
    const handleSettingsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.logoUrl) {
        setLogoUrl(customEvent.detail.logoUrl);
      } else {
        setLogoUrl(getStoreSettings().logoUrl || 'https://i.postimg.cc/JHBpWK7K/image.png');
      }
    };

    window.addEventListener('maximo_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('maximo_settings_updated', handleSettingsUpdate);
  }, []);

  // Dimension scaling designed for balanced, high-end optical proportion without vertical overflow
  const sizeClasses: Record<string, string> = {
    sm: 'h-10 sm:h-12 md:h-14 max-w-[180px] sm:max-w-[220px]',
    md: 'h-14 sm:h-16 md:h-20 max-w-[240px] sm:max-w-[280px]',
    lg: 'h-20 sm:h-24 md:h-28 max-w-[320px]',
    xl: 'h-28 sm:h-32 md:h-36 max-w-[400px]',
    hero: 'h-24 sm:h-32 md:h-36 max-w-[420px]',
    custom: '',
  };

  return (
    <div
      id={id || `maximo-logo-container-${safeId}`}
      className={`relative inline-flex items-center justify-center select-none text-center transition-all duration-300 ${sizeClasses[size] || ''} ${className}`}
      aria-label="Máximo Eau de Parfum Logo Oficial"
    >
      {variant === 'adaptive' ? (
        <>
          {/* Light Theme Logo */}
          <img
            src={logoUrl}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/logo.png';
            }}
            alt="Máximo Eau de Parfum"
            className="max-h-full max-w-full w-auto h-auto object-contain dark:hidden transition-opacity duration-300 select-none pointer-events-none mix-blend-multiply drop-shadow-xs"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Dark Theme Logo */}
          <img
            src={logoUrl}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/logo-white.png';
            }}
            alt="Máximo Eau de Parfum"
            className="max-h-full max-w-full w-auto h-auto object-contain hidden dark:block transition-opacity duration-300 select-none pointer-events-none mix-blend-screen brightness-125 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </>
      ) : variant === 'light' ? (
        <img
          src={logoUrl}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/logo-white.png';
          }}
          alt="Máximo Eau de Parfum"
          className="max-h-full max-w-full w-auto h-auto object-contain transition-opacity duration-300 select-none pointer-events-none mix-blend-screen brightness-125 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : variant === 'gold' || variant === 'amber' ? (
        <img
          src={logoUrl}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/logo-gold.png';
          }}
          alt="Máximo Eau de Parfum"
          className="max-h-full max-w-full w-auto h-auto object-contain transition-opacity duration-300 select-none pointer-events-none filter sepia-[0.3] contrast-125 brightness-110"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      ) : (
        <img
          src={logoUrl}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/logo.png';
          }}
          alt="Máximo Eau de Parfum"
          className="max-h-full max-w-full w-auto h-auto object-contain transition-opacity duration-300 select-none pointer-events-none mix-blend-multiply"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};


