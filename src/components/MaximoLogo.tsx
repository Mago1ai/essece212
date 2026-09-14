import React, { useId } from 'react';

export interface MaximoLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'amber' | 'gold' | 'adaptive';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'custom';
  showSubtitle?: boolean;
  revealProgress?: number;
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
      {/* Real Transparent PNG Logo ("imagem sem fundo em PNG") */}
      {variant === 'dark' && (
        <img
          src="/assets/logo.png"
          alt="Máximo Eau de Parfum"
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xs"
          loading="eager"
          decoding="async"
        />
      )}

      {variant === 'light' && (
        <img
          src="/assets/logo-white.png"
          alt="Máximo Eau de Parfum"
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xs"
          loading="eager"
          decoding="async"
        />
      )}

      {variant === 'adaptive' && (
        <>
          <img
            src="/assets/logo.png"
            alt="Máximo Eau de Parfum"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xs dark:hidden block"
            loading="eager"
            decoding="async"
          />
          <img
            src="/assets/logo-white.png"
            alt="Máximo Eau de Parfum"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xs hidden dark:block"
            loading="eager"
            decoding="async"
          />
        </>
      )}

      {(variant === 'amber' || variant === 'gold') && (
        <img
          src="/assets/logo.png"
          alt="Máximo Eau de Parfum"
          className={`w-full h-auto object-contain select-none pointer-events-none drop-shadow-xs ${
            variant === 'amber'
              ? 'filter sepia hue-rotate-[-30deg] saturate-[3]'
              : 'filter sepia hue-rotate-[10deg] saturate-[2.5]'
          }`}
          loading="eager"
          decoding="async"
        />
      )}
    </div>
  );
};
