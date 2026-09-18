export type OlfactoryFamily =
  | 'Todos'
  | 'Linha Máximo'
  | 'Linha Masculina'
  | 'Linha Feminina'
  | 'Florais'
  | 'Florais Orientais'
  | 'Florais Gourmand'
  | 'Amadeirados'
  | 'Amadeirados Frescos'
  | 'Amadeirados Frutados'
  | 'Ambarados'
  | 'Orientais'
  | 'Frescos'
  | 'Gourmand'
  | 'Gourmand & Frutados'
  | string;

export interface PerfumeNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  family: string;
  gender?: 'Feminino' | 'Masculino' | 'Unissex';
  category?: 'Linha Masculina' | 'Linha Feminina' | 'Perfumes' | 'Linha Máximo' | 'Body Mist & Capilar' | string;
  notes: PerfumeNotes;
  accords?: string[];
  shortNotes: string;
  price: string;
  priceNumeric: number;
  size: string;
  concentration: string;
  badge?: string;
  sensoryDescription: string;
  atmosphere: string;
  longevity: string;
  sillage: string;
  tactileSensation?: string;
  image: string;
  secondaryImage?: string;
  inspiradoEm?: string; // ex: "Good Girl - Carolina Herrera" — para contratipos
  isFavorite?: boolean;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
  size: string;
}

export interface DiscoverySelection {
  mood: string;
  familyFilter: OlfactoryFamily;
}
