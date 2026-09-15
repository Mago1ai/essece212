import React from 'react';

interface MaximoLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'amber' | 'gold' | 'adaptive';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showSubtitle?: boolean;
}

export const MaximoLogo: React.FC<MaximoLogoProps> = ({
  className = '',
  variant = 'adaptive',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeClasses = {
    sm: 'w-24 sm:w-28 md:w-32',
    md: 'w-32 sm:w-36 md:w-40 lg:w-48',
    lg: 'w-40 sm:w-48 md:w-56 lg:w-64',
    xl: 'w-56 sm:w-64 md:w-72 lg:w-80',
    custom: '',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return 'invert';
      case 'dark':
        return '';
      case 'amber':
        return 'brightness-0 saturate-100 invert-[0.8] sepia-[1] hue-rotate-[15deg]';
      case 'gold':
        return 'brightness-0 saturate-100 invert-[0.7] sepia-[0.8] hue-rotate-[25deg]';
      case 'adaptive':
      default:
        return 'dark:invert';
    }
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none text-center transition-all duration-300 group ${sizeClasses[size]} ${className}`}
    >
      <img
        src="/images/LOGO-ESSECE212.png"
        alt="Máximo Eau de Parfum Logo"
        className={`w-full h-auto object-contain ${getVariantClasses()}`}
      />
    </div>
  );
};
