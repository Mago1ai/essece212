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

  // Dimension scaling designed for balanced, high-end optical proportion
  const sizeClasses: Record<string, string> = {
    sm: 'w-36 sm:w-44 md:w-52',
    md: 'w-48 sm:w-56 md:w-64 lg:w-72',
    lg: 'w-64 sm:w-80 md:w-96',
    xl: 'w-80 sm:w-96 md:w-[28rem]',
    hero: 'w-72 sm:w-88 md:w-[28rem] lg:w-[34rem] max-w-full',
    custom: '',
  };

  return (
    <div
      id={id || `maximo-logo-container-${safeId}`}
      className={`relative inline-flex flex-col items-center justify-center select-none text-center transition-all duration-300 ${sizeClasses[size] || ''} ${className}`}
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
            className="w-full h-auto object-contain dark:hidden transition-opacity duration-300 select-none pointer-events-none mix-blend-multiply drop-shadow-xs"
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
            className="w-full h-auto object-contain hidden dark:block transition-opacity duration-300 select-none pointer-events-none mix-blend-screen brightness-125 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
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
          className="w-full h-auto object-contain transition-opacity duration-300 select-none pointer-events-none mix-blend-screen brightness-125 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
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
          className="w-full h-auto object-contain transition-opacity duration-300 select-none pointer-events-none filter sepia-[0.3] contrast-125 brightness-110"
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
          className="w-full h-auto object-contain transition-opacity duration-300 select-none pointer-events-none mix-blend-multiply"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};


