export type CollectionOrigin = 'all' | 'autorais' | 'importados' | 'renomeados';

export type OlfactoryFamily =
  | 'Todos'
  | 'Linha Máximo'
  | 'Florais'
  | 'Amadeirados'
  | 'Ambarados'
  | 'Orientais'
  | 'Frescos'
  | 'Gourmand & Frutados';

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
  family: 'Linha Máximo' | 'Florais' | 'Amadeirados' | 'Ambarados' | 'Orientais' | 'Frescos' | 'Gourmand & Frutados';
  gender?: 'Feminino' | 'Masculino' | 'Unissex';
  category?: 'Perfumes' | 'Linha Máximo' | 'Body Mist & Capilar';
  collectionOrigin?: 'autorais' | 'importados' | 'renomeados';
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

export interface StoreSettings {
  phoneWhatsApp: string;
  phoneDisplay: string;
  storeName: string;
  tagline: string;
  instagram: string;
  email: string;
  orderMessagePrefix: string;
  adminPassword?: string;
}
