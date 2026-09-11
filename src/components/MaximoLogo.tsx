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
  // Mobile-first sizing: responsive scaling
  const sizeClasses = {
    sm: 'w-36 sm:w-40 md:w-44',
    md: 'w-44 sm:w-52 md:w-60 lg:w-64',
    lg: 'w-56 sm:w-64 md:w-72 lg:w-80',
    xl: 'w-64 sm:w-76 md:w-88 lg:w-96',
    custom: '',
  };

  const variantClassMap = {
    adaptive: 'text-[#24221F] dark:text-[#FFFFFF]',
    dark: 'text-[#24221F]',
    light: 'text-[#FFFFFF]',
    amber: 'text-[#A96227] dark:text-[#C97D3E]',
    gold: 'text-[#D4AF37] dark:text-[#F3E5AB]',
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none text-center transition-all duration-300 group ${sizeClasses[size]} ${variantClassMap[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 380 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs transition-all duration-300 group-hover:drop-shadow-[0_2px_14px_rgba(201,125,62,0.35)] dark:group-hover:drop-shadow-[0_2px_18px_rgba(255,255,255,0.45)]"
        aria-label="Máximo Eau de Parfum Logo Oficial"
      >
        <g id="maximo-official-brandmark">
          {/* Main "Máximo" Calligraphic Vector Lettering */}
          <text
            x="190"
            y="72"
            textAnchor="middle"
            fill="currentColor"
            style={{
              fontFamily: '"Alex Brush", "Parisienne", "Great Vibes", "Pinyon Script", cursive',
              fontSize: '84px',
              fontStyle: 'normal',
              fontWeight: '400',
              letterSpacing: '0.02em',
            }}
          >
            Máximo
          </text>

          {/* Underline Swash Flourish originating beneath 'M' and sweeping harmoniously under 'áximo' */}
          <path
            d="M 64 82 C 95 104, 158 112, 236 101 C 278 95, 314 88, 338 80 C 312 84, 266 91, 226 94 C 162 99, 108 95, 68 80 C 63 78, 58 80, 64 82 Z"
            fill="currentColor"
          />

          {/* Secondary delicate underline taper matching the stroke dynamics */}
          <path
            d="M 130 99 C 192 105, 272 97, 330 81 C 286 91, 214 97, 146 94 C 135 93, 127 96, 130 99 Z"
            fill="currentColor"
          />

          {/* Upper Initial Flourish on 'M' */}
          <path
            d="M 42 66 C 33 61, 23 58, 14 62 C 10 64, 7 67, 6 70 C 9 67, 15 64, 23 63 C 31 62, 38 64, 42 66 Z"
            fill="currentColor"
          />

          {/* Terminal Swash extension flick on letter 'o' */}
          <path
            d="M 298 62 C 314 65, 334 66, 354 63 C 360 62, 364 60, 366 57 C 362 59, 354 61, 342 61 C 324 61, 308 59, 298 62 Z"
            fill="currentColor"
          />

          {/* Crisp refined acute accent mark on 'á' */}
          <path
            d="M 188 16 C 191 13, 198 8, 206 5 C 202 9, 196 14, 191 18 C 189 19, 187 18, 188 16 Z"
            fill="currentColor"
          />
        </g>

        {/* Subtitle "EAU DE PARFUM" - crisp uppercase sans-serif centered with wide tracking */}
        {showSubtitle && (
          <g id="subtitle-eau-de-parfum" transform="translate(0, 10)">
            <text
              x="190"
              y="116"
              textAnchor="middle"
              fill="currentColor"
              style={{
                fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
              }}
            >
              EAU DE PARFUM
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

