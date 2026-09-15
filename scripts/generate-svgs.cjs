const fs = require("fs");
const path = require("path");

const logoBlack = fs.readFileSync("public/assets/logo.png").toString("base64");
const logoGold = fs.readFileSync("public/assets/logo-gold.png").toString("base64");
const LOGO_BASE64_BLACK = "data:image/png;base64," + logoBlack;
const LOGO_BASE64_GOLD = "data:image/png;base64," + logoGold;

// 1. SABONETE LIQUIDO (viewBox: 110 35 180 415)
const svgSabonete = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="110 35 180 415" width="100%" height="100%">
  <defs>
    <radialGradient id="sl-contact-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.65"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sl-dispenser-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5820"/>
      <stop offset="25%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FBF0B9"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#5B3E12"/>
    </linearGradient>
    <linearGradient id="sl-amber-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#782918" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="#B84928" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#E57A42" stop-opacity="0.85"/>
      <stop offset="80%" stop-color="#B84928" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#601F12" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="sl-label-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FBF9F4"/>
      <stop offset="100%" stop-color="#F4EFE6"/>
    </linearGradient>
    <linearGradient id="sl-glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
      <stop offset="12%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="95%" stop-color="#FFFFFF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.5"/>
    </linearGradient>
    <filter id="sl-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Ground Contact Shadow -->
  <ellipse cx="200" cy="426" rx="68" ry="12" fill="url(#sl-contact-shadow)" />

  <g id="sabonete-bottle" filter="url(#sl-shadow)">
    <!-- Pump Dispenser Spout & Collar -->
    <path d="M 194 65 L 206 65 L 206 95 L 194 95 Z" fill="url(#sl-dispenser-gold)"/>
    <path d="M 194 68 C 175 66 150 72 138 78 C 136 79 135 83 138 85 C 145 88 170 82 194 80 Z" fill="url(#sl-dispenser-gold)"/>
    <!-- Pump head cap -->
    <rect x="185" y="60" width="30" height="12" rx="3" fill="url(#sl-dispenser-gold)"/>
    <!-- Collar & Ring -->
    <rect x="182" y="95" width="36" height="18" rx="2" fill="url(#sl-dispenser-gold)"/>
    <rect x="180" y="113" width="40" height="8" rx="2" fill="url(#sl-dispenser-gold)"/>
    <!-- Shoulder Transition -->
    <path d="M 184 121 C 184 135 136 142 136 158 L 264 158 C 264 142 216 135 216 121 Z" fill="url(#sl-amber-liquid)"/>

    <!-- Main Glass Body with Rich Amber Liquid -->
    <rect x="136" y="156" width="128" height="262" rx="16" fill="url(#sl-amber-liquid)"/>
    
    <!-- Heavy Glass Base -->
    <path d="M 136 398 L 264 398 L 264 410 C 264 416 256 418 248 418 L 152 418 C 144 418 136 416 136 410 Z" fill="#42140A" opacity="0.95"/>

    <!-- High-End Luxury Label -->
    <g id="label">
      <!-- Label Background Card -->
      <rect x="146" y="182" width="108" height="206" rx="6" fill="url(#sl-label-bg)" stroke="#D4AF37" stroke-width="1"/>
      <rect x="150" y="186" width="100" height="198" rx="4" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-dasharray="3,1"/>

      <!-- OFFICIAL MÁXIMO LOGO (Centered, Crisp & Prominent) -->
      <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="150" y="192" width="100" height="44" preserveAspectRatio="xMidYMid meet" />

      <!-- Refined Gold Divider -->
      <line x1="168" y1="244" x2="232" y2="244" stroke="#D4AF37" stroke-width="0.8"/>
      <circle cx="200" cy="244" r="1.5" fill="#D4AF37"/>

      <!-- Product Name & Description -->
      <text x="200" y="262" font-family="'Cinzel', 'Playfair Display', serif" font-size="9.5" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">SABONETE</text>
      <text x="200" y="275" font-family="'Cinzel', 'Playfair Display', serif" font-size="9.5" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">LÍQUIDO</text>

      <text x="200" y="292" font-family="'Cormorant Garamond', serif" font-size="8" font-style="italic" fill="#7C5820" text-anchor="middle">Perfumaria de Luxo</text>

      <rect x="172" y="304" width="56" height="13" rx="6.5" fill="#C59B4B" fill-opacity="0.15" stroke="#C59B4B" stroke-width="0.6"/>
      <text x="200" y="313" font-family="'DM Sans', sans-serif" font-size="5.5" font-weight="700" fill="#7C5820" letter-spacing="1" text-anchor="middle">USO DIÁRIO</text>

      <text x="200" y="338" font-family="'DM Sans', sans-serif" font-size="6" font-weight="600" fill="#605445" letter-spacing="0.5" text-anchor="middle">HIDRATAÇÃO &amp; PERFUME</text>

      <!-- Volume -->
      <line x1="175" y1="352" x2="225" y2="352" stroke="#D4AF37" stroke-width="0.5"/>
      <text x="200" y="367" font-family="'DM Sans', sans-serif" font-size="9" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">190 ml</text>
    </g>

    <!-- Glass Specular Reflection Highlight -->
    <rect x="136" y="156" width="128" height="262" rx="16" fill="url(#sl-glass-sheen)" pointer-events="none"/>
    <path d="M 142 165 L 148 165 L 145 410 L 139 410 Z" fill="#FFFFFF" fill-opacity="0.45" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-sabonete-liquido.svg", svgSabonete);
console.log("Saved maximo-sabonete-liquido.svg");

// 2. BODY SPLASH (viewBox: 130 35 140 415)
const svgBodySplash = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="130 35 140 415" width="100%" height="100%">
  <defs>
    <radialGradient id="bs-contact-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bs-gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5820"/>
      <stop offset="25%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FBF0B9"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#5B3E12"/>
    </linearGradient>
    <linearGradient id="bs-liquid-rose" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8E2D4B" stop-opacity="0.85"/>
      <stop offset="25%" stop-color="#C75276" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#E882A2" stop-opacity="0.75"/>
      <stop offset="75%" stop-color="#C75276" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#78233C" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="bs-label-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FBF9F6"/>
      <stop offset="100%" stop-color="#F5EFE8"/>
    </linearGradient>
    <linearGradient id="bs-glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.5"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="95%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.5"/>
    </linearGradient>
    <filter id="bs-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.38"/>
    </filter>
  </defs>

  <!-- Contact Shadow -->
  <ellipse cx="200" cy="428" rx="55" ry="10" fill="url(#bs-contact-shadow)" />

  <g id="bodysplash-bottle" filter="url(#bs-shadow)">
    <!-- Clear/Gold Cap -->
    <rect x="180" y="65" width="40" height="42" rx="4" fill="url(#bs-gold-cap)"/>
    <rect x="186" y="55" width="28" height="12" rx="2" fill="url(#bs-gold-cap)"/>
    <rect x="176" y="107" width="48" height="12" rx="2" fill="url(#bs-gold-cap)"/>

    <!-- Dip Tube -->
    <line x1="200" y1="115" x2="198" y2="415" stroke="#FFFFFF" stroke-width="1.8" opacity="0.6"/>

    <!-- Tall Glass Body -->
    <rect x="150" y="119" width="100" height="300" rx="14" fill="url(#bs-liquid-rose)"/>
    <!-- Glass Base -->
    <rect x="150" y="405" width="100" height="14" rx="6" fill="#581A2C" opacity="0.95"/>

    <!-- High-End Luxury Label -->
    <g id="bs-label">
      <rect x="158" y="180" width="84" height="188" rx="5" fill="url(#bs-label-bg)" stroke="#D4AF37" stroke-width="1"/>
      <rect x="161" y="183" width="78" height="182" rx="3" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-dasharray="2.5,1"/>

      <!-- OFFICIAL MÁXIMO LOGO -->
      <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="160" y="188" width="80" height="36" preserveAspectRatio="xMidYMid meet" />

      <!-- Gold Divider -->
      <line x1="172" y1="230" x2="228" y2="230" stroke="#D4AF37" stroke-width="0.8"/>
      <circle cx="200" cy="230" r="1.5" fill="#D4AF37"/>

      <!-- Product Title -->
      <text x="200" y="247" font-family="'Cinzel', 'Playfair Display', serif" font-size="8.5" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">BODY SPLASH</text>
      <text x="200" y="260" font-family="'Cormorant Garamond', serif" font-size="7" font-style="italic" fill="#7C5820" text-anchor="middle">Bruma Desodorante</text>

      <rect x="174" y="272" width="52" height="12" rx="6" fill="#C59B4B" fill-opacity="0.15" stroke="#C59B4B" stroke-width="0.6"/>
      <text x="200" y="280.5" font-family="'DM Sans', sans-serif" font-size="5" font-weight="700" fill="#7C5820" letter-spacing="1" text-anchor="middle">FRESCOR INTENSO</text>

      <text x="200" y="304" font-family="'DM Sans', sans-serif" font-size="5.5" font-weight="600" fill="#605445" letter-spacing="0.5" text-anchor="middle">FLORAL &amp; AMADEIRADO</text>

      <!-- Volume -->
      <line x1="178" y1="324" x2="222" y2="324" stroke="#D4AF37" stroke-width="0.5"/>
      <text x="200" y="342" font-family="'DM Sans', sans-serif" font-size="9" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">100 ML</text>
    </g>

    <!-- Glass Specular Reflection -->
    <rect x="150" y="119" width="100" height="300" rx="14" fill="url(#bs-glass-sheen)" pointer-events="none"/>
    <path d="M 155 125 L 160 125 L 157 410 L 152 410 Z" fill="#FFFFFF" fill-opacity="0.45" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-body-splash.svg", svgBodySplash);
console.log("Saved maximo-body-splash.svg");

// 3. CREME ACETINADO (viewBox: 35 150 265 230)
const svgCreme = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="35 150 265 230" width="100%" height="100%">
  <defs>
    <radialGradient id="ca-contact-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ca-lid-gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5820"/>
      <stop offset="20%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FBF0B9"/>
      <stop offset="80%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#5B3E12"/>
    </linearGradient>
    <linearGradient id="ca-jar-glass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7A2218"/>
      <stop offset="25%" stop-color="#B83A2A"/>
      <stop offset="50%" stop-color="#E05B46"/>
      <stop offset="75%" stop-color="#B83A2A"/>
      <stop offset="100%" stop-color="#601810"/>
    </linearGradient>
    <linearGradient id="ca-label-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FAF7F2"/>
      <stop offset="100%" stop-color="#F2ECE1"/>
    </linearGradient>
    <linearGradient id="ca-glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="95%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.45"/>
    </linearGradient>
    <filter id="ca-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Contact Shadow -->
  <ellipse cx="167" cy="365" rx="98" ry="12" fill="url(#ca-contact-shadow)" />

  <g id="creme-jar" filter="url(#ca-shadow)">
    <!-- Brushed Gold Lid -->
    <rect x="75" y="168" width="185" height="36" rx="6" fill="url(#ca-lid-gold)"/>
    <rect x="70" y="196" width="195" height="10" rx="2" fill="url(#ca-lid-gold)"/>

    <!-- Heavy Rounded Glass Jar Body -->
    <rect x="80" y="206" width="175" height="150" rx="20" fill="url(#ca-jar-glass)"/>
    <!-- Glass Base -->
    <rect x="84" y="344" width="167" height="12" rx="6" fill="#42120C" opacity="0.95"/>

    <!-- Wide Luxury Front Label -->
    <g id="ca-label">
      <rect x="98" y="222" width="139" height="116" rx="6" fill="url(#ca-label-bg)" stroke="#D4AF37" stroke-width="1"/>
      <rect x="102" y="226" width="131" height="108" rx="4" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-dasharray="3,1"/>

      <!-- OFFICIAL MÁXIMO LOGO -->
      <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="106" y="228" width="123" height="38" preserveAspectRatio="xMidYMid meet" />

      <!-- Gold Divider -->
      <line x1="125" y1="270" x2="210" y2="270" stroke="#D4AF37" stroke-width="0.8"/>
      <circle cx="167.5" cy="270" r="1.5" fill="#D4AF37"/>

      <!-- Product Name -->
      <text x="167.5" y="285" font-family="'Cinzel', 'Playfair Display', serif" font-size="8.5" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">CREME ACETINADO</text>
      <text x="167.5" y="297" font-family="'Cormorant Garamond', serif" font-size="7" font-style="italic" fill="#7C5820" text-anchor="middle">Hidratação Sedosa 48h</text>

      <!-- Weight/Volume -->
      <text x="167.5" y="320" font-family="'DM Sans', sans-serif" font-size="9" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">200 g</text>
    </g>

    <!-- Glass Specular Reflection -->
    <rect x="80" y="206" width="175" height="150" rx="20" fill="url(#ca-glass-sheen)" pointer-events="none"/>
    <path d="M 88 215 L 96 215 L 92 345 L 85 345 Z" fill="#FFFFFF" fill-opacity="0.45" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-creme-acetinado.svg", svgCreme);
console.log("Saved maximo-creme-acetinado.svg");

// 4. PERFUME CAPILAR (viewBox: 110 50 135 395)
const svgCapilar = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="110 50 135 395" width="100%" height="100%">
  <defs>
    <radialGradient id="pc-contact-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="pc-gold-pump" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5820"/>
      <stop offset="25%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FBF0B9"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#5B3E12"/>
    </linearGradient>
    <linearGradient id="pc-liquid-amber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#803518"/>
      <stop offset="25%" stop-color="#C25A2A"/>
      <stop offset="50%" stop-color="#EA8E48"/>
      <stop offset="75%" stop-color="#C25A2A"/>
      <stop offset="100%" stop-color="#6B2912"/>
    </linearGradient>
    <linearGradient id="pc-label-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#FAF7F2"/>
      <stop offset="100%" stop-color="#F3ECE2"/>
    </linearGradient>
    <linearGradient id="pc-glass-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="85%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="95%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.45"/>
    </linearGradient>
    <filter id="pc-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.38"/>
    </filter>
  </defs>

  <!-- Contact Shadow -->
  <ellipse cx="177" cy="424" rx="46" ry="9" fill="url(#pc-contact-shadow)" />

  <g id="capilar-bottle" filter="url(#pc-shadow)">
    <!-- Gold Mist Sprayer Cap -->
    <rect x="166" y="80" width="22" height="34" rx="3" fill="url(#pc-gold-pump)"/>
    <rect x="160" y="114" width="34" height="14" rx="2" fill="url(#pc-gold-pump)"/>

    <!-- Slender Frosted Glass Bottle Body -->
    <rect x="135" y="128" width="85" height="286" rx="14" fill="url(#pc-liquid-amber)"/>
    <!-- Glass Base -->
    <rect x="135" y="402" width="85" height="12" rx="6" fill="#4E1C0C" opacity="0.95"/>

    <!-- High-End Luxury Label -->
    <g id="pc-label">
      <rect x="143" y="180" width="69" height="178" rx="5" fill="url(#pc-label-bg)" stroke="#D4AF37" stroke-width="1"/>
      <rect x="146" y="183" width="63" height="172" rx="3" fill="none" stroke="#D4AF37" stroke-width="0.5" stroke-dasharray="2.5,1"/>

      <!-- OFFICIAL MÁXIMO LOGO -->
      <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="146" y="188" width="63" height="30" preserveAspectRatio="xMidYMid meet" />

      <!-- Gold Divider -->
      <line x1="155" y1="224" x2="200" y2="224" stroke="#D4AF37" stroke-width="0.8"/>
      <circle cx="177.5" cy="224" r="1.5" fill="#D4AF37"/>

      <!-- Product Title -->
      <text x="177.5" y="239" font-family="'Cinzel', 'Playfair Display', serif" font-size="7.5" font-weight="700" fill="#181614" letter-spacing="1" text-anchor="middle">PERFUME</text>
      <text x="177.5" y="249" font-family="'Cinzel', 'Playfair Display', serif" font-size="7.5" font-weight="700" fill="#181614" letter-spacing="1" text-anchor="middle">CAPILAR</text>

      <text x="177.5" y="263" font-family="'Cormorant Garamond', serif" font-size="6.5" font-style="italic" fill="#7C5820" text-anchor="middle">Brilho &amp; Anti-Frizz</text>

      <rect x="154" y="274" width="47" height="11" rx="5.5" fill="#C59B4B" fill-opacity="0.15" stroke="#C59B4B" stroke-width="0.6"/>
      <text x="177.5" y="281.5" font-family="'DM Sans', sans-serif" font-size="4.5" font-weight="700" fill="#7C5820" letter-spacing="0.8" text-anchor="middle">PROTEÇÃO TÉRMICA</text>

      <text x="177.5" y="302" font-family="'DM Sans', sans-serif" font-size="5" font-weight="600" fill="#605445" letter-spacing="0.5" text-anchor="middle">NUTRIÇÃO &amp; PERFUME</text>

      <!-- Volume -->
      <line x1="158" y1="320" x2="197" y2="320" stroke="#D4AF37" stroke-width="0.5"/>
      <text x="177.5" y="336" font-family="'DM Sans', sans-serif" font-size="8.5" font-weight="700" fill="#181614" letter-spacing="1.5" text-anchor="middle">60 ml</text>
    </g>

    <!-- Glass Specular Reflection -->
    <rect x="135" y="128" width="85" height="286" rx="14" fill="url(#pc-glass-sheen)" pointer-events="none"/>
    <path d="M 139 135 L 144 135 L 142 405 L 137 405 Z" fill="#FFFFFF" fill-opacity="0.45" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-perfume-capilar.svg", svgCapilar);
console.log("Saved maximo-perfume-capilar.svg");

// 5. KIT RITUAL COMPLETO (Coffret with 4 Items, each bearing the official logo)
const svgKit = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 380" width="100%" height="100%">
  <defs>
    <radialGradient id="kit-podium-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.7"/>
      <stop offset="65%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="kit-box-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#231F1C"/>
      <stop offset="100%" stop-color="#141210"/>
    </linearGradient>
    <linearGradient id="kit-gold-trim" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C5820"/>
      <stop offset="25%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FBF0B9"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#5B3E12"/>
    </linearGradient>
    <filter id="kit-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Ground Shadows -->
  <ellipse cx="250" cy="355" rx="230" ry="20" fill="url(#kit-podium-shadow)" />

  <!-- Luxury Presentation Box Backing -->
  <g filter="url(#kit-shadow)">
    <rect x="25" y="30" width="450" height="315" rx="14" fill="url(#kit-box-bg)" stroke="#D4AF37" stroke-width="1.2"/>
    <rect x="32" y="37" width="436" height="301" rx="10" fill="none" stroke="#D4AF37" stroke-width="0.6" stroke-dasharray="4,2"/>

    <!-- Coffret Header Logo -->
    <image href="${LOGO_BASE64_GOLD}" xlink:href="${LOGO_BASE64_GOLD}" x="160" y="44" width="180" height="48" preserveAspectRatio="xMidYMid meet" />
    <text x="250" y="98" font-family="'Cormorant Garamond', serif" font-size="11" font-style="italic" fill="#D4AF37" text-anchor="middle">Le Coffret Rituel Parfumé • 4 Pièces</text>
  </g>

  <!-- 4 Items Arranged Inside the Coffret -->
  <!-- 1. Sabonete Liquido (Left) -->
  <g transform="translate(48, 105) scale(0.6)">
    <rect x="136" y="156" width="128" height="262" rx="16" fill="#A44024"/>
    <rect x="180" y="105" width="40" height="26" fill="url(#kit-gold-trim)"/>
    <rect x="146" y="185" width="108" height="190" rx="6" fill="#F8F6F0" stroke="#D4AF37" stroke-width="1"/>
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="150" y="194" width="100" height="42" />
    <text x="200" y="260" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="#181614" text-anchor="middle">SABONETE</text>
    <text x="200" y="278" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="#181614" text-anchor="middle">LÍQUIDO</text>
    <text x="200" y="340" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">190 ml</text>
  </g>

  <!-- 2. Body Splash (Center Left) -->
  <g transform="translate(150, 95) scale(0.62)">
    <rect x="150" y="119" width="100" height="300" rx="14" fill="#B84468"/>
    <rect x="176" y="65" width="48" height="54" rx="4" fill="url(#kit-gold-trim)"/>
    <rect x="158" y="180" width="84" height="185" rx="5" fill="#F8F6F0" stroke="#D4AF37" stroke-width="1"/>
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="160" y="188" width="80" height="36" />
    <text x="200" y="248" font-family="'Cinzel', serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">BODY SPLASH</text>
    <text x="200" y="338" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">100 ML</text>
  </g>

  <!-- 3. Creme Acetinado (Center Right) -->
  <g transform="translate(258, 175) scale(0.55)">
    <rect x="75" y="168" width="185" height="38" rx="6" fill="url(#kit-gold-trim)"/>
    <rect x="80" y="206" width="175" height="150" rx="20" fill="#A83020"/>
    <rect x="98" y="222" width="139" height="116" rx="6" fill="#F8F6F0" stroke="#D4AF37" stroke-width="1"/>
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="106" y="228" width="123" height="38" />
    <text x="167.5" y="285" font-family="'Cinzel', serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">CREME ACETINADO</text>
    <text x="167.5" y="318" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">200 g</text>
  </g>

  <!-- 4. Perfume Capilar (Right) -->
  <g transform="translate(355, 100) scale(0.6)">
    <rect x="135" y="128" width="85" height="286" rx="14" fill="#B04E22"/>
    <rect x="160" y="80" width="34" height="48" rx="3" fill="url(#kit-gold-trim)"/>
    <rect x="143" y="180" width="69" height="175" rx="5" fill="#F8F6F0" stroke="#D4AF37" stroke-width="1"/>
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="146" y="188" width="63" height="30" />
    <text x="177.5" y="240" font-family="'Cinzel', serif" font-size="9.5" font-weight="700" fill="#181614" text-anchor="middle">PERFUME</text>
    <text x="177.5" y="252" font-family="'Cinzel', serif" font-size="9.5" font-weight="700" fill="#181614" text-anchor="middle">CAPILAR</text>
    <text x="177.5" y="334" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#181614" text-anchor="middle">60 ml</text>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-kit-ritual.svg", svgKit);
console.log("Saved maximo-kit-ritual.svg");

// 6. MÁXIMO POUR HOMME (MASCULINO - FRASCO REAL RETANGULAR ROBUSTO COM PINGENTE DE COROA)
// ViewBox: 80 20 240 430
const svgPourHomme = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="80 20 240 430" width="100%" height="100%">
  <defs>
    <!-- Soft Contact Shadow -->
    <radialGradient id="ph-ground-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Warm Amber Cognac Perfume Liquid -->
    <linearGradient id="ph-amber-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C28236" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="#DE9E4E" stop-opacity="0.88"/>
      <stop offset="50%" stop-color="#EBB365" stop-opacity="0.82"/>
      <stop offset="80%" stop-color="#DE9E4E" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#A66822" stop-opacity="0.98"/>
    </linearGradient>

    <!-- Fluted Metallic Gold Cap -->
    <linearGradient id="ph-gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6E4C17"/>
      <stop offset="15%" stop-color="#C59B4B"/>
      <stop offset="35%" stop-color="#FFF3C4"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#FFF3C4"/>
      <stop offset="85%" stop-color="#C59B4B"/>
      <stop offset="100%" stop-color="#55380F"/>
    </linearGradient>

    <!-- Polished Gold Charm -->
    <linearGradient id="ph-crown-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0B3"/>
      <stop offset="40%" stop-color="#D4AF37"/>
      <stop offset="80%" stop-color="#8C631A"/>
      <stop offset="100%" stop-color="#5A3D0B"/>
    </linearGradient>

    <!-- Glass Highlights and Bevel Reflections -->
    <linearGradient id="ph-glass-edge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="8%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="92%" stop-color="#FFFFFF" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.55"/>
    </linearGradient>

    <!-- Realistic Glass Base -->
    <linearGradient id="ph-glass-base" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C28236" stop-opacity="0.2"/>
      <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.65"/>
    </linearGradient>

    <!-- Bottle Drop Shadow Filter -->
    <filter id="ph-shadow" x="-20%" y="-15%" width="140%" height="135%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="200" cy="410" rx="72" ry="14" fill="url(#ph-ground-shadow)" />

  <g id="masculine-bottle" filter="url(#ph-shadow)">
    <!-- 1. Metallic Fluted Cap -->
    <!-- Cap Top Crown Step -->
    <rect x="184" y="32" width="32" height="6" rx="1.5" fill="url(#ph-gold-cap)" stroke="#55380F" stroke-width="0.5"/>
    <!-- Main Fluted Cap Body -->
    <rect x="180" y="38" width="40" height="48" rx="2" fill="url(#ph-gold-cap)"/>
    <!-- Vertical Ribbing Lines for Fluted Texture -->
    <line x1="186" y1="38" x2="186" y2="86" stroke="#55380F" stroke-width="0.8" opacity="0.6"/>
    <line x1="188" y1="38" x2="188" y2="86" stroke="#FFF3C4" stroke-width="0.8" opacity="0.8"/>
    <line x1="193" y1="38" x2="193" y2="86" stroke="#55380F" stroke-width="0.8" opacity="0.5"/>
    <line x1="195" y1="38" x2="195" y2="86" stroke="#FFF3C4" stroke-width="0.8" opacity="0.8"/>
    <line x1="200" y1="38" x2="200" y2="86" stroke="#55380F" stroke-width="0.8" opacity="0.5"/>
    <line x1="202" y1="38" x2="202" y2="86" stroke="#FFF3C4" stroke-width="0.8" opacity="0.9"/>
    <line x1="207" y1="38" x2="207" y2="86" stroke="#55380F" stroke-width="0.8" opacity="0.5"/>
    <line x1="209" y1="38" x2="209" y2="86" stroke="#FFF3C4" stroke-width="0.8" opacity="0.8"/>
    <line x1="214" y1="38" x2="214" y2="86" stroke="#55380F" stroke-width="0.8" opacity="0.6"/>

    <!-- Clear Collar Ring & Metallic Neck Ring -->
    <rect x="182" y="86" width="36" height="14" rx="2" fill="url(#ph-gold-cap)"/>
    <rect x="178" y="100" width="44" height="10" rx="2" fill="url(#ph-gold-cap)"/>

    <!-- 2. Outer Glass Wall (Heavy Rectangular Cristallin) -->
    <!-- Solid Glass Flacon Outline with Chamfered Corners -->
    <rect x="124" y="110" width="152" height="286" rx="10" fill="#FFFFFF" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="1.2"/>

    <!-- Inner Glass Chamber Containing the Amber Liquid -->
    <rect x="136" y="122" width="128" height="228" rx="6" fill="url(#ph-amber-liquid)"/>

    <!-- Heavy Solid Crystal Base (Pedestal) -->
    <path d="M 124 350 L 276 350 L 276 386 C 276 392 270 396 264 396 L 136 396 C 130 396 124 392 124 386 Z" fill="url(#ph-glass-base)" stroke="#FFFFFF" stroke-width="0.8"/>
    <line x1="130" y1="352" x2="270" y2="352" stroke="#FFFFFF" stroke-width="1.2" opacity="0.8"/>
    <line x1="138" y1="390" x2="262" y2="390" stroke="#FFFFFF" stroke-width="1" opacity="0.9"/>

    <!-- Dip Tube inside the perfume -->
    <line x1="200" y1="110" x2="201" y2="348" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.45"/>
    <line x1="201" y1="110" x2="202" y2="348" stroke="#55380F" stroke-width="0.6" stroke-opacity="0.25"/>

    <!-- 3. GOLD CHAIN & 3D ROYAL CROWN CHARM (Exact representation of real photo) -->
    <!-- Hanging Chain Links -->
    <g id="charm-necklace">
      <!-- Chain draping from neck to pendant -->
      <path d="M 184 108 C 188 122 192 136 198 148" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,2"/>
      <path d="M 216 108 C 212 122 208 136 202 148" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,2"/>
      <!-- Connector Loop Ring -->
      <circle cx="200" cy="151" r="4.5" fill="none" stroke="url(#ph-crown-gold)" stroke-width="1.8"/>
      
      <!-- 3D ROYAL CROWN PENDANT -->
      <g transform="translate(178, 156)">
        <!-- Crown Base Band with Gem insets -->
        <rect x="4" y="24" width="36" height="6" rx="2" fill="url(#ph-crown-gold)" stroke="#55380F" stroke-width="0.5"/>
        <circle cx="9" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="15" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="22" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="29" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="35" cy="27" r="1.2" fill="#FFFFFF"/>

        <!-- Crown Arches & Spires -->
        <!-- Center High Arch with Cross/Orb -->
        <path d="M 22 24 C 22 12 18 4 22 1 C 26 4 22 12 22 24 Z" fill="url(#ph-crown-gold)"/>
        <circle cx="22" cy="1" r="2.2" fill="url(#ph-crown-gold)" stroke="#55380F" stroke-width="0.4"/>
        
        <!-- Left & Right Main Arches -->
        <path d="M 8 24 C 6 14 12 6 16 6 C 20 12 16 18 16 24" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 36 24 C 38 14 32 6 28 6 C 24 12 28 18 28 24" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="16" cy="6" r="1.6" fill="url(#ph-crown-gold)"/>
        <circle cx="28" cy="6" r="1.6" fill="url(#ph-crown-gold)"/>

        <!-- Outer Small Fleur Spikes -->
        <path d="M 5 24 C 4 18 6 14 8 13" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2"/>
        <path d="M 39 24 C 40 18 38 14 36 13" fill="none" stroke="url(#ph-crown-gold)" stroke-width="2"/>
        <circle cx="8" cy="13" r="1.3" fill="url(#ph-crown-gold)"/>
        <circle cx="36" cy="13" r="1.3" fill="url(#ph-crown-gold)"/>
      </g>
    </g>

    <!-- 4. OFFICIAL MÁXIMO LOGO (Crisp Black Serigraphy on Glass) -->
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="142" y="272" width="116" height="52" preserveAspectRatio="xMidYMid meet" />

    <!-- 5. Glass Bevels & Specular Light Reflections -->
    <rect x="124" y="110" width="152" height="286" rx="10" fill="url(#ph-glass-edge)" pointer-events="none"/>
    <!-- Left Vertical White Sheen -->
    <path d="M 129 116 L 134 116 L 132 388 L 127 388 Z" fill="#FFFFFF" fill-opacity="0.55" pointer-events="none"/>
    <!-- Right Subtle Edge Sheen -->
    <path d="M 270 116 L 273 116 L 271 388 L 268 388 Z" fill="#FFFFFF" fill-opacity="0.3" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-pour-homme.svg", svgPourHomme);
console.log("Saved maximo-pour-homme.svg");

// 7. MÁXIMO POUR FEMME (FEMININO - FRASCO REAL TORRE SLIM COM PINGENTE DE COROA)
// ViewBox: 100 20 200 440
const svgPourFemme = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="100 20 200 440" width="100%" height="100%">
  <defs>
    <!-- Soft Contact Shadow -->
    <radialGradient id="pf-ground-shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Luminous Champagne Gold Liquid -->
    <linearGradient id="pf-gold-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DCA038" stop-opacity="0.95"/>
      <stop offset="20%" stop-color="#F2C85C" stop-opacity="0.88"/>
      <stop offset="50%" stop-color="#FCE182" stop-opacity="0.8"/>
      <stop offset="80%" stop-color="#F2C85C" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#B87E20" stop-opacity="0.98"/>
    </linearGradient>

    <!-- Polished Mirror Gold Cap -->
    <linearGradient id="pf-gold-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7A561E"/>
      <stop offset="15%" stop-color="#D4AF37"/>
      <stop offset="35%" stop-color="#FFF8D6"/>
      <stop offset="55%" stop-color="#D4AF37"/>
      <stop offset="80%" stop-color="#FFF8D6"/>
      <stop offset="100%" stop-color="#55390F"/>
    </linearGradient>

    <!-- Polished Gold Charm -->
    <linearGradient id="pf-crown-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C8"/>
      <stop offset="40%" stop-color="#E2B743"/>
      <stop offset="80%" stop-color="#9C6E20"/>
      <stop offset="100%" stop-color="#5F4010"/>
    </linearGradient>

    <!-- Glass Facet Highlights -->
    <linearGradient id="pf-glass-edge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.65"/>
      <stop offset="12%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="88%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.6"/>
    </linearGradient>

    <!-- Base Glass Solid Reflection -->
    <linearGradient id="pf-glass-base" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DCA038" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#FFFFFF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.75"/>
    </linearGradient>

    <!-- Drop Shadow -->
    <filter id="pf-shadow" x="-25%" y="-15%" width="150%" height="135%">
      <feDropShadow dx="0" dy="10" stdDeviation="7" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="200" cy="422" rx="46" ry="11" fill="url(#pf-ground-shadow)" />

  <g id="feminine-bottle" filter="url(#pf-shadow)">
    <!-- 1. Polished Mirror Gold Cap -->
    <!-- Cap Top Bevel -->
    <rect x="186" y="32" width="28" height="5" rx="1.5" fill="url(#pf-gold-cap)"/>
    <!-- Main Cylindrical Cap -->
    <rect x="183" y="36" width="34" height="48" rx="2" fill="url(#pf-gold-cap)"/>
    <line x1="190" y1="36" x2="190" y2="84" stroke="#FFF8D6" stroke-width="1.2" opacity="0.8"/>
    <line x1="208" y1="36" x2="208" y2="84" stroke="#FFF8D6" stroke-width="1" opacity="0.6"/>

    <!-- Collar & Atomizer Ring -->
    <rect x="185" y="84" width="30" height="14" rx="2" fill="url(#pf-gold-cap)"/>
    <rect x="182" y="98" width="36" height="8" rx="1.5" fill="url(#pf-gold-cap)"/>

    <!-- 2. Outer Glass Column (Tall Slender Tower / Flacon Tour) -->
    <rect x="156" y="106" width="88" height="306" rx="7" fill="#FFFFFF" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="1.2"/>

    <!-- Inner Chamber with Champagne Gold Liquid -->
    <rect x="164" y="116" width="72" height="264" rx="4" fill="url(#pf-gold-liquid)"/>

    <!-- Heavy Crystal Solid Base -->
    <path d="M 156 380 L 244 380 L 244 406 C 244 410 240 412 236 412 L 164 412 C 160 412 156 410 156 406 Z" fill="url(#pf-glass-base)" stroke="#FFFFFF" stroke-width="0.8"/>
    <line x1="160" y1="382" x2="240" y2="382" stroke="#FFFFFF" stroke-width="1.2" opacity="0.85"/>
    <line x1="166" y1="407" x2="234" y2="407" stroke="#FFFFFF" stroke-width="1" opacity="0.9"/>

    <!-- Dip Tube -->
    <line x1="200" y1="106" x2="200.5" y2="378" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.4"/>
    <line x1="200.5" y1="106" x2="201" y2="378" stroke="#55390F" stroke-width="0.5" stroke-opacity="0.2"/>

    <!-- 3. GOLD CHAIN & 3D ROYAL CROWN CHARM -->
    <g id="charm-necklace-femme">
      <!-- Chain draping from neck to pendant -->
      <path d="M 188 106 C 191 118 194 130 198 140" fill="none" stroke="url(#pf-crown-gold)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2,2"/>
      <path d="M 212 106 C 209 118 206 130 202 140" fill="none" stroke="url(#pf-crown-gold)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2,2"/>
      <circle cx="200" cy="143" r="3.8" fill="none" stroke="url(#pf-crown-gold)" stroke-width="1.5"/>
      
      <!-- 3D ROYAL CROWN PENDANT -->
      <g transform="translate(182, 147) scale(0.88)">
        <!-- Base Band -->
        <rect x="4" y="24" width="36" height="6" rx="2" fill="url(#pf-crown-gold)" stroke="#55390F" stroke-width="0.5"/>
        <circle cx="9" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="15" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="22" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="29" cy="27" r="1.2" fill="#FFFFFF"/>
        <circle cx="35" cy="27" r="1.2" fill="#FFFFFF"/>

        <!-- Crown Arches & Spires -->
        <path d="M 22 24 C 22 12 18 4 22 1 C 26 4 22 12 22 24 Z" fill="url(#pf-crown-gold)"/>
        <circle cx="22" cy="1" r="2.2" fill="url(#pf-crown-gold)" stroke="#55390F" stroke-width="0.4"/>
        
        <path d="M 8 24 C 6 14 12 6 16 6 C 20 12 16 18 16 24" fill="none" stroke="url(#pf-crown-gold)" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M 36 24 C 38 14 32 6 28 6 C 24 12 28 18 28 24" fill="none" stroke="url(#pf-crown-gold)" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="16" cy="6" r="1.6" fill="url(#pf-crown-gold)"/>
        <circle cx="28" cy="6" r="1.6" fill="url(#pf-crown-gold)"/>

        <path d="M 5 24 C 4 18 6 14 8 13" fill="none" stroke="url(#pf-crown-gold)" stroke-width="2"/>
        <path d="M 39 24 C 40 18 38 14 36 13" fill="none" stroke="url(#pf-crown-gold)" stroke-width="2"/>
        <circle cx="8" cy="13" r="1.3" fill="url(#pf-crown-gold)"/>
        <circle cx="36" cy="13" r="1.3" fill="url(#pf-crown-gold)"/>
      </g>
    </g>

    <!-- 4. OFFICIAL MÁXIMO LOGO (Serigraphy along the lower face) -->
    <image href="${LOGO_BASE64_BLACK}" xlink:href="${LOGO_BASE64_BLACK}" x="166" y="278" width="68" height="68" preserveAspectRatio="xMidYMid meet" />

    <!-- 5. Glass Bevels & Specular Light Reflections -->
    <rect x="156" y="106" width="88" height="306" rx="7" fill="url(#pf-glass-edge)" pointer-events="none"/>
    <!-- Left Vertical White Sheen -->
    <path d="M 160 110 L 163 110 L 162 404 L 159 404 Z" fill="#FFFFFF" fill-opacity="0.6" pointer-events="none"/>
    <!-- Right Subtle Sheen -->
    <path d="M 241 110 L 243 110 L 242 404 L 240 404 Z" fill="#FFFFFF" fill-opacity="0.35" pointer-events="none"/>
  </g>
</svg>`;

fs.writeFileSync("public/assets/maximo-pour-femme.svg", svgPourFemme);
console.log("Saved maximo-pour-femme.svg");

