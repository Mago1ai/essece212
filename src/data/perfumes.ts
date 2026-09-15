import { Perfume, StoreSettings, CollectionOrigin } from '../types';

export interface CollectionMeta {
  id: 'autorais' | 'importados' | 'renomeados';
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  editorialAtmosphere: string;
  curatorshipHighlights: string[];
  image: string;
  badge: string;
  accentColor: string;
}

export const COLLECTIONS_DATA: Record<'autorais' | 'importados' | 'renomeados', CollectionMeta> = {
  autorais: {
    id: 'autorais',
    title: 'Autorais & Rituais',
    subtitle: 'Assinaturas Exclusivas da Casa Máximo',
    tagline: 'Fórmulas autorais desenvolvidas com matérias-primas nobres e toque aveludado',
    description:
      'A assinatura autêntica da Casa Máximo. Linha de alta perfumaria e cosméticos de luxo desenvolvidos com extratos botânicos refinados, texturas acetinadas e fixação prolongada.',
    editorialAtmosphere: 'O ritual íntimo de autocuidado com toque de seda e perfumação nobre em camadas.',
    curatorshipHighlights: [
      'Máximo Pour Homme 30ml',
      'Máximo Pour Femme 60ml',
      'Sabonete Líquido Iluminador',
      'Body Splash Floral Acetinado',
      'Creme Corporal Toque de Seda',
    ],
    image: '/assets/maximo-pour-homme.svg',
    badge: 'COLEÇÃO DA CASA',
    accentColor: '#A96227',
  },
  importados: {
    id: 'importados',
    title: 'Referências de Nicho',
    subtitle: 'Contratipos Inspirados na Alta Perfumaria Mundial',
    tagline: 'Fragrâncias nobres inspiradas nos ícones mais cobiçados de casas francesas e internacionais',
    description:
      'Fragrâncias contratipo desenvolvidas com matérias-primas de alta fixação no frasco proprietário da Máximo. Inspiradas nas maiores obras-primas da perfumaria mundial.',
    editorialAtmosphere: 'A sofisticação atemporal das grandes fragrâncias do mundo no frasco exclusivo Máximo.',
    curatorshipHighlights: [
      'Inspiração Aventus (Creed)',
      'Inspiração Delina & Althaïr (Parfums de Marly)',
      'Inspiração Good Girl (Carolina Herrera)',
      'Inspiração Libre (YSL)',
    ],
    image: '/assets/maximo-pour-femme.svg',
    badge: 'CONTRATIPOS DE PRESTÍGIO',
    accentColor: '#D4AF37',
  },
  renomeados: {
    id: 'renomeados',
    title: 'Clássicos Consagrados',
    subtitle: 'Contratipos de Fragrâncias Históricas',
    tagline: 'Fragrâncias consagradas com formulação nobre e alta fixação',
    description:
      'Nossas versões refinadas de fragrâncias históricas e amadas, mantendo a intensidade e o rastro marcante característicos da Maison Máximo.',
    editorialAtmosphere: 'O charme vibrante e a elegância de fragrâncias que marcaram gerações.',
    curatorshipHighlights: [
      'Inspiração Glamour',
      'Inspiração Fantasy',
      'Florais Envolventes',
    ],
    image: '/assets/maximo-pour-homme.svg',
    badge: 'LINHA CONSAGRADA',
    accentColor: '#8C5A3C',
  },
};

export function getPerfumeCollectionOrigin(perfume: Perfume): 'autorais' | 'importados' | 'renomeados' {
  if (perfume.collectionOrigin) return perfume.collectionOrigin;
  if (perfume.brand === 'Máximo' || perfume.category === 'Linha Máximo' || perfume.badge?.includes('LINHA PRÓPRIA')) {
    return 'autorais';
  }
  if (
    perfume.brand === 'O Boticário' ||
    perfume.brand?.toLowerCase().includes('boticário') ||
    perfume.badge?.includes('RENOMEADO') ||
    perfume.category?.includes('Renomeado')
  ) {
    return 'renomeados';
  }
  return 'importados';
}

export const PERFUMES: Perfume[] = [
  // --- ASSINATURAS AUTORAIS OFICIAIS DA MAISON MÁXIMO ---
  {
    id: 'maximo-pour-homme-edp',
    name: 'Máximo Pour Homme',
    referenceCode: 'MX-01',
    brand: 'Máximo',
    subtitle: '30 ml · Linha Masculina · Alta Fixação',
    family: 'Linha Máximo',
    gender: 'Masculino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['âmbar nobre', 'madeiras preciosas', 'cardamomo', 'couro sutil', 'especiarias quentes'],
    notes: {
      top: ['Cardamomo Negro da Guatemala', 'Bergamota Siciliana', 'Pimenta Rosa'],
      heart: ['Âmbar Nobre Cristalizado', 'Cedro da Virgínia', 'Madeira de Cashmere'],
      base: ['Vetiver do Haiti', 'Fava Tonka Tostada', 'Almíscar Quente', 'Acorde de Couro Suave'],
    },
    shortNotes: 'Cardamomo Negro · Âmbar Nobre · Cedro da Virgínia · Vetiver',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ASSINATURA DA CASA',
    sensoryDescription:
      'A assinatura emblemática da Maison Máximo no frasco masculino de 30 ml em vidro cristalino nobre com tampa metálica canelada e colar com pingente de coroa banhada a ouro. Uma composição amadeirada ambarada opulenta, com cardamomo e cedro da Virgínia.',
    atmosphere: 'O magnetismo sofisticado de um terno de alfaiataria e um lounge exclusivo à meia-luz.',
    longevity: '10 a 14 horas na pele (Eau de Parfum Concentrado)',
    sillage: 'Marcante, sofisticado e envolvente sem agredir',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: 'maximo-pour-femme-edp',
    name: 'Máximo Pour Femme',
    referenceCode: 'MX-02',
    brand: 'Máximo',
    subtitle: '60 ml · Linha Feminina · Alta Fixação',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['floral branco', 'baunilha de bourbon', 'âmbar dourado', 'sândalo cremoso', 'toque de seda'],
    notes: {
      top: ['Flor de Laranjeira Imperial', 'Mandarina Dourada', 'Pera Cristal'],
      heart: ['Jasmim Sambac Real', 'Baunilha de Bourbon', 'Ylang-Ylang Aveludado'],
      base: ['Âmbar Dourado Lapidado', 'Sândalo Cremoso', 'Almíscar Branco de Seda'],
    },
    shortNotes: 'Flor de Laranjeira · Jasmim Sambac · Baunilha de Bourbon · Âmbar',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ASSINATURA DA CASA',
    sensoryDescription:
      'A silhueta autêntica do frasco feminino de 60 ml em cristal luminoso lapidado, adornado com colar de coroa real dourada e assinatura Máximo serigrafada. Uma dança olfativa entre flor de laranjeira, jasmim sambac e a cremosidade do âmbar.',
    atmosphere: 'O esplendor luminoso de seda champanhe, joias douradas e elegância sublime.',
    longevity: '10 a 12 horas na pele (Eau de Parfum Concentrado)',
    sillage: 'Aura aveludada, luminosa e irresistivelmente elegante',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },

  // --- RITUAL DE AUTOCUIDADO & CORPO (LINHA MÁXIMO) ---
  {
    id: 'maximo-sabonete-liquido',
    name: 'Sabonete Líquido Iluminador',
    referenceCode: 'MX-SB',
    brand: 'Máximo',
    subtitle: '190 ml · Espuma Cremosa & Toque Aveludado',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['limpeza suave', 'floral nobre', 'aveludado', 'hidratante', 'toque de seda'],
    notes: {
      top: ['Flor de Laranjeira', 'Pera Francesa', 'Toque de Bergamota'],
      heart: ['Rosa Damascena Nobre', 'Jasmim Branco', 'Extrato de Camomila'],
      base: ['Baunilha Suave', 'Almíscar Branco', 'Glicerina Vegetal Pura'],
    },
    shortNotes: 'Rosa Damascena · Pera Francesa · Glicerina Vegetal Pura',
    price: '',
    priceNumeric: 0,
    size: '190 ml',
    concentration: 'Sabonete Líquido Iluminador',
    badge: 'RITUAL DE BANHO',
    sensoryDescription:
      'Uma espuma densa, perfumada e acetinada que limpa delicadamente enquanto protege a barreira natural de hidratação da pele. Transforma o banho em um prelúdio perfumado de alta nobreza.',
    atmosphere: 'A sensação purificante e relaxante de um banho com pétalas e água morna.',
    longevity: 'Fragrância suave de pele limpa e hidratada',
    sillage: 'Aura íntima e acolhedora',
    image: '/assets/maximo-sabonete-liquido.svg',
    secondaryImage: '/assets/maximo-sabonete-liquido.svg',
  },
  {
    id: 'maximo-body-splash',
    name: 'Body Splash Acetinado',
    referenceCode: 'MX-BS',
    brand: 'Máximo',
    subtitle: '100 ml · Edição Floral Acetinada',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['floral', 'frutado', 'aveludado', 'baunilha', 'almiscarado'],
    notes: {
      top: ['Pera Francesa', 'Pétalas de Peônia Rosa', 'Toque de Bergamota'],
      heart: ['Rosa Damascena Nobre', 'Jasmim Branco', 'Flor de Cerejeira'],
      base: ['Baunilha Acetinada', 'Almíscar Sedoso', 'Âmbar Dourado'],
    },
    shortNotes: 'Rosa Damascena · Pera Francesa · Baunilha Acetinada',
    price: '',
    priceNumeric: 0,
    size: '100 ml',
    concentration: 'Body Splash Perfumado',
    badge: 'NÉVOA PERFUMADA',
    sensoryDescription:
      'Uma névoa perfumada acetinada e envolvente. Desenvolvida para envelopar o corpo com o frescor de pétalas nobres e o conforto do almíscar puro, proporcionando uma sensação revigorante ao longo do dia.',
    atmosphere: 'O frescor floral e aveludado de uma manhã iluminada em um jardim de rosas.',
    longevity: '6 a 8 horas com sensação de frescor contínuo',
    sillage: 'Aura suave, agradável e convidativa',
    image: '/assets/maximo-body-splash.svg',
    secondaryImage: '/assets/maximo-body-splash.svg',
  },
  {
    id: 'maximo-creme-acetinado',
    name: 'Creme Acetinado Corporal',
    referenceCode: 'MX-CR',
    brand: 'Máximo',
    subtitle: '200 g · Hidratação Profunda & Toque de Seda',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['hidratante', 'floral suave', 'baunilha', 'manteiga de karité'],
    notes: {
      top: ['Néroli Suave', 'Flor de Algodão'],
      heart: ['Manteiga de Karité Pura', 'Extrato de Rosa Centifolia'],
      base: ['Baunilha Cremosa', 'Óleo de Amêndoas Doces', 'Vitamina E'],
    },
    shortNotes: 'Manteiga de Karité · Rosa Centifolia · Baunilha Cremosa',
    price: '',
    priceNumeric: 0,
    size: '200 g',
    concentration: 'Creme Hidratante Perfumado',
    badge: 'TOQUE DE SEDA',
    sensoryDescription:
      'Fórmula rica em emolientes nobres que hidrata profundamente sem pesar. Deixa a pele com toque aveludado acetinado e uma perfumação sofisticada que potencializa a fixação das fragrâncias.',
    atmosphere: 'O carinho reconfortante de um manto de seda perfumado sobre a pele.',
    longevity: 'Hidratação ativa por até 24 horas',
    sillage: 'Perfume íntimo de pele hidratada',
    image: '/assets/maximo-creme-acetinado.svg',
    secondaryImage: '/assets/maximo-creme-acetinado.svg',
  },
  {
    id: 'maximo-perfume-capilar',
    name: 'Perfume Capilar Nobre',
    referenceCode: 'MX-PC',
    brand: 'Máximo',
    subtitle: '60 ml · Brilho & Neutralização de Odores',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['brilho radiante', 'floral leve', 'fresco', 'anti-frizz'],
    notes: {
      top: ['Gotas de Orvalho', 'Maçã Verde'],
      heart: ['Flor de Cerejeira', 'Jasmim Transparente', 'Óleo de Argan Nobre'],
      base: ['Almíscar Branco', 'Silicone Nobre Volátil'],
    },
    shortNotes: 'Flor de Cerejeira · Óleo de Argan · Gotas de Orvalho',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Hair Mist Protetor',
    badge: 'BRILHO E AROMA',
    sensoryDescription:
      'Criado para conferir brilho tridimensional, maciez e proteção antifrizz aos fios enquanto neutraliza odores externos. Não resseca e deixa um rastro inesquecível a cada movimento.',
    atmosphere: 'A brisa leve que faz os cabelos dançarem e perfumarem o ar.',
    longevity: 'Perfume ativo nos fios durante todo o dia',
    sillage: 'Rastro etéreo e marcante no movimento',
    image: '/assets/maximo-perfume-capilar.svg',
    secondaryImage: '/assets/maximo-perfume-capilar.svg',
  },
  {
    id: 'maximo-kit-completo',
    name: 'Kit Ritual Máximo Completo',
    referenceCode: 'MX-KIT',
    brand: 'Máximo',
    subtitle: 'Coffret Exclusivo · 4 Itens de Autocuidado',
    family: 'Linha Máximo',
    gender: 'Feminino',
    category: 'Linha Máximo',
    collectionOrigin: 'autorais',
    status: 'Disponível',
    accords: ['ritual completo', 'banho & corpo', 'alta perfumação'],
    notes: {
      top: ['Sabonete Líquido 190ml'],
      heart: ['Body Splash 100ml', 'Creme Acetinado 200g'],
      base: ['Perfume Capilar 60ml', 'Caixa de Presente Máximo'],
    },
    shortNotes: 'Sabonete 190ml · Body Splash 100ml · Creme 200g · Hair Mist 60ml',
    price: '',
    priceNumeric: 0,
    size: 'Kit 4 Peças',
    concentration: 'Coffret Ritual de Luxo',
    badge: 'COFFRET COMPLETO',
    sensoryDescription:
      'A experiência completa de banho, hidratação profunda e perfumação em camadas da casa Máximo. Inclui Sabonete Líquido Iluminador, Body Splash Floral, Creme Acetinado e Perfume para Cabelo.',
    atmosphere: 'Um santuário de bem-estar e sofisticação no conforto do seu dia a dia.',
    longevity: 'Duração prolongada por sobreposição de camadas aromáticas',
    sillage: 'Presença elegante, limpa e refinada',
    image: '/assets/maximo-kit-ritual.svg',
    secondaryImage: '/assets/maximo-kit-ritual.svg',
  },

  // --- CONTRATIPOS MASCULINOS MÁXIMO (30 ML) ---
  {
    id: 'aventus-creed',
    name: 'Máximo Imperial',
    referenceCode: 'MX-03',
    brand: 'Máximo',
    inspiredBy: 'Aventus',
    originalHouse: 'Creed',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Amadeirados',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['frutado', 'amadeirado nobre', 'bétula defumada', 'âmbar cinzento', 'cítrico fresco'],
    notes: {
      top: ['Abacaxi Real', 'Bergamota Siciliana', 'Groselha Preta', 'Maçã Crocante'],
      heart: ['Bétula Defumada', 'Patchouli Puro', 'Jasmim Marroquino', 'Rosa'],
      base: ['Almíscar', 'Musgo de Carvalho', 'Âmbar Cinzento', 'Baunilha'],
    },
    shortNotes: 'Abacaxi · Bétula Defumada · Âmbar Cinzento · Almíscar',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'BEST SELLER',
    sensoryDescription:
      'Fragrância contratipo nobre da Máximo formulada no frasco masculino de 30 ml. Inspirada na clássica estrutura chipre frutada de Aventus da Creed, com abertura suculenta de abacaxi e bergamota evoluindo para um coração aristocrático de bétula defumada e âmbar cinzento.',
    atmosphere: 'A imponência e a determinação de quem conquista com presença e distinção.',
    longevity: '10 a 14 horas na pele',
    sillage: 'Projeção imponente e rastro inconfundível',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: '1-million-rabanne',
    name: 'Máximo Golden Lingot',
    referenceCode: 'MX-04',
    brand: 'Máximo',
    inspiredBy: '1 Million',
    originalHouse: 'Paco Rabanne',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Ambarados',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['especiado quente', 'canela', 'cítrico luminoso', 'couro aveludado', 'âmbar dourado'],
    notes: {
      top: ['Mandarina Sanguínea', 'Toranja Espumante', 'Hortelã'],
      heart: ['Canela Especiada', 'Notas Especiadas', 'Absoluto de Rosa'],
      base: ['Âmbar Dourado', 'Couro Aveludado', 'Madeiras Nobres', 'Patchouli Indiano'],
    },
    shortNotes: 'Mandarina Sanguínea · Canela · Âmbar · Couro',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'CLÁSSICO OURO',
    sensoryDescription:
      'Contratipo masculino Máximo de 30 ml inspirado na sedução magnética de 1 Million da Paco Rabanne. Combina notas cítricas vibrantes com um coração aquecido de canela e especiarias sobre base densa de couro e âmbar.',
    atmosphere: 'O magnetismo e a energia vibrante de uma noite de celebração.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Marcante, quente e envolvente',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: 'althair-parfums-de-marly',
    name: 'Máximo Vanille Bourbon',
    referenceCode: 'MX-05',
    brand: 'Máximo',
    inspiredBy: 'Althaïr',
    originalHouse: 'Parfums de Marly',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Orientais',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['baunilha bourbon', 'canela do ceilão', 'especiarias nobres', 'âmbar', 'madeiras nobres'],
    notes: {
      top: ['Flor de Laranjeira', 'Bergamota da Calábria', 'Canela do Ceilão', 'Cardamomo da Guatemala'],
      heart: ['Baunilha Bourbon de Madagascar', 'Elemi Resinoso'],
      base: ['Pralinê Crocante', 'Ambroxan', 'Almíscar', 'Madeira de Guaiaco'],
    },
    shortNotes: 'Baunilha Bourbon · Canela do Ceilão · Pralinê · Flor de Laranjeira',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'NICHO REAL',
    sensoryDescription:
      'Contratipo nobre da Máximo no frasco masculino de 30 ml. Inspirado na alta perfumaria de nicho de Althaïr da Parfums de Marly, celebrando a nobreza e o calor da Baunilha Bourbon envolta em canela e madeiras ricas.',
    atmosphere: 'O requinte caloroso de salões aristocráticos aquecidos por madeiras nobres.',
    longevity: '12 a 14 horas na pele',
    sillage: 'Aura aveludada, rica e magnética',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: 'sauvage-dior',
    name: 'Máximo Sauvage Noir',
    referenceCode: 'MX-06',
    brand: 'Máximo',
    inspiredBy: 'Sauvage',
    originalHouse: 'Dior',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Frescos',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['fresco especiado', 'âmbar mineral', 'bergamota da calábria', 'pimenta de sichuan', 'lavanda nobre'],
    notes: {
      top: ['Bergamota da Calábria Radiante', 'Pimenta de Sichuan', 'Pimenta Rosa'],
      heart: ['Lavanda Francesa', 'Gerânio', 'Elemi', 'Pimenta Rosa', 'Vetiver'],
      base: ['Ambroxan Nobre', 'Cedro', 'Ládano'],
    },
    shortNotes: 'Bergamota da Calábria · Ambroxan · Pimenta de Sichuan · Lavanda',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ÍCONE MODERNO',
    sensoryDescription:
      'Contratipo masculino Máximo no frasco de 30 ml. Inspirado na eletricidade selvagem de Sauvage da Dior. Uma overdose de bergamota fresca e ambroxan magnético que cria um rastro poderoso e altamente elogiado.',
    atmosphere: 'A vastidão de um deserto sob o céu azul profundo da hora mágica.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Projeção expansiva, magnética e viril',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: '212-men-carolina-herrera',
    name: 'Máximo NYC Urban',
    referenceCode: 'MX-07',
    brand: 'Máximo',
    inspiredBy: '212 Men NYC',
    originalHouse: 'Carolina Herrera',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Frescos',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['verde fresco', 'cítrico', 'gengibre aromático', 'sândalo', 'almíscar limpo'],
    notes: {
      top: ['Folhas Verdes', 'Toranja', 'Especiarias', 'Bergamota', 'Lavanda', 'Petitgrain'],
      heart: ['Gengibre Fresco', 'Pimenta Verde', 'Gardênia', 'Sálvia Esclareia'],
      base: ['Almíscar Branco', 'Sândalo', 'Incenso', 'Madeira de Guaiaco', 'Vetiver'],
    },
    shortNotes: 'Folhas Verdes · Gengibre · Gardênia · Sândalo & Almíscar',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo masculino Máximo no frasco de 30 ml inspirado no clássico urbano 212 Men NYC da Carolina Herrera. Estrutura verde-aromática contemporânea com frescor de folhas cortadas e base de madeiras macias.',
    atmosphere: 'O ritmo cosmopolita e o ar limpo da manhã em uma grande metrópole.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Fresco, limpo e energizante',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },
  {
    id: 'bvlgari-man-in-black',
    name: 'Máximo Cuir & Épices',
    referenceCode: 'MX-08',
    brand: 'Máximo',
    inspiredBy: 'Man In Black',
    originalHouse: 'Bvlgari',
    subtitle: '30 ml · Contratipo Masculino Alta Fixação',
    family: 'Amadeirados',
    gender: 'Masculino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['rum envelhecido', 'tabaco especiado', 'couro negro', 'benjoim', 'âmbar'],
    notes: {
      top: ['Rum Envelhecido', 'Tabaco Picante', 'Especiarias Quentes'],
      heart: ['Couro Negro', 'Íris Nobre', 'Tuberosa Masculina'],
      base: ['Fava Tonka', 'Madeira Guaiaco', 'Benjoim'],
    },
    shortNotes: 'Rum Envelhecido · Tabaco · Couro Negro · Benjoim',
    price: '',
    priceNumeric: 0,
    size: '30 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'LUXO MASCULINO',
    sensoryDescription:
      'Contratipo masculino Máximo no frasco de 30 ml inspirado em Man In Black da Bvlgari. Notas embriagantes de rum e tabaco especiado que se fundem ao calor do couro e benjoim, criando aura de cavalheiro imponente.',
    atmosphere: 'O ambiente intimista de um lounge privativo com poltronas de couro e charutos nobres.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Envolvente, austero e refinado',
    image: '/assets/maximo-pour-homme.svg',
    secondaryImage: '/assets/maximo-pour-homme.svg',
  },

  // --- CONTRATIPOS FEMININOS MÁXIMO (60 ML) ---
  {
    id: 'good-girl-carolina-herrera',
    name: 'Máximo Midnight Muse',
    referenceCode: 'MX-09',
    brand: 'Máximo',
    inspiredBy: 'Good Girl',
    originalHouse: 'Carolina Herrera',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['tuberosa nobre', 'fava tonka torrada', 'cacau nobre', 'amêndoa', 'jasmim sambac'],
    notes: {
      top: ['Amêndoa Torrada', 'Café Arábica', 'Bergamota', 'Limão Siciliano'],
      heart: ['Tuberosa Nobre', 'Jasmim Sambac', 'Flor de Laranjeira', 'Rosa Búlgara'],
      base: ['Fava Tonka Torrada', 'Cacau Amargo', 'Baunilha', 'Pralinê', 'Sândalo', 'Canela'],
    },
    shortNotes: 'Tuberosa · Fava Tonka · Cacau · Amêndoa',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ICÔNICO',
    sensoryDescription:
      'Contratipo feminino Máximo no elegante frasco torre slim de 60 ml. Inspirado no contraste magnético de Good Girl da Carolina Herrera, unindo a luminosidade do jasmim e tuberosa à escuridão tentadora do cacau e da fava tonka.',
    atmosphere: 'A intensidade hipnótica de passos confiantes em um vestido de gala sob as luzes da cidade.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Sedutor, potente e inesquecível',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'delina-parfums-de-marly',
    name: 'Máximo Rose Majesté',
    referenceCode: 'MX-10',
    brand: 'Máximo',
    inspiredBy: 'Delina',
    originalHouse: 'Parfums de Marly',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['rosa turca majestosa', 'lichia doce', 'peônia rosada', 'cashmeran', 'ruibarbo fresco'],
    notes: {
      top: ['Lichia Doce', 'Ruibarbo Crocante', 'Bergamota', 'Noz-moscada'],
      heart: ['Rosa Turca Majestosa', 'Peônia Rosada', 'Almíscar Transparente', 'Petalia', 'Baunilha'],
      base: ['Cashmeran', 'Cedro', 'Incenso Nobre', 'Vetiver do Haiti'],
    },
    shortNotes: 'Rosa Turca · Lichia · Peônia · Cashmeran & Ruibarbo',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ALTA REALEZA',
    sensoryDescription:
      'Contratipo feminino nobre da Máximo apresentado no frasco torre de 60 ml. Inspirado na obra de arte Delina da Parfums de Marly. Um buquê floral aristocrático onde a rosa turca desabrocha acompanhada de lichia e ruibarbo.',
    atmosphere: 'O esplendor dos jardins reais franceses em plena primavera dourada.',
    longevity: '12 a 14 horas na pele',
    sillage: 'Projeção estelar e rastro memorável',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'baccarat-rouge-mfk',
    name: 'Máximo Cristal Rouge',
    referenceCode: 'MX-11',
    brand: 'Máximo',
    inspiredBy: 'Baccarat Rouge 540',
    originalHouse: 'Maison Francis Kurkdjian',
    subtitle: '60 ml · Contratipo Alta Fixação',
    family: 'Ambarados',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['âmbar cinzento', 'açafrão nobre', 'madeira de cedro', 'açúcar caramelizado', 'mineral'],
    notes: {
      top: ['Açafrão Vermelho', 'Jasmim Grandiflorum do Egito'],
      heart: ['Madeira de Cedro Lapidada', 'Acorde de Âmbar Cinzento Cristal'],
      base: ['Resina de Abeto', 'Almíscar Quente', 'Ambroxan'],
    },
    shortNotes: 'Açafrão · Jasmim · Âmbar Cinzento · Cedro',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'CRISTAL PURO',
    sensoryDescription:
      'Contratipo de alta perfumaria da Máximo no frasco de 60 ml. Inspirado na assinatura luminosa e hipnótica de Baccarat Rouge 540 da Maison Francis Kurkdjian. Uma fusão de açafrão, jasmim egípcio e âmbar cinzento que paira no ar como cristal incandescente.',
    atmosphere: 'O brilho lapidado de um lustre de cristal vermelho em um palácio moderno.',
    longevity: '12 a 16 horas na pele',
    sillage: 'Aura aérea, magnética e inconfundível',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'libre-yves-saint-laurent',
    name: 'Máximo Liberté',
    referenceCode: 'MX-12',
    brand: 'Máximo',
    inspiredBy: 'Libre',
    originalHouse: 'Yves Saint Laurent',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['flor de laranjeira marroquina', 'lavanda francesa', 'baunilha de madagascar', 'cítrico nobre'],
    notes: {
      top: ['Lavanda Francesa', 'Mandarina', 'Groselha Preta', 'Petitgrain'],
      heart: ['Flor de Laranjeira Marroquina', 'Lavanda Diva', 'Jasmim Sambac'],
      base: ['Baunilha de Madagascar', 'Almíscar', 'Cedro da Virgínia', 'Âmbar Cinzento'],
    },
    shortNotes: 'Flor de Laranjeira · Lavanda Francesa · Baunilha de Madagascar',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'ALTA COSTURA',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado na fragrância de liberdade de Libre da Yves Saint Laurent. A tensão refinada entre a sensualidade ardente da flor de laranjeira e a ousadia aromática da lavanda francesa.',
    atmosphere: 'A elegância de um smoking sob os holofotes da alta costura em Paris.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Radiante, sofisticado e marcante',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'scandal-jean-paul-gaultier',
    name: 'Máximo Miel Audacieux',
    referenceCode: 'MX-13',
    brand: 'Máximo',
    inspiredBy: 'Scandal',
    originalHouse: 'Jean Paul Gaultier',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['mel dourado', 'gardênia aveludada', 'laranja sanguínea', 'caramelo', 'patchouli'],
    notes: {
      top: ['Laranja Sanguínea', 'Mandarina Suculenta'],
      heart: ['Mel Dourado', 'Gardênia Aveludada', 'Flor de Laranjeira', 'Jasmim', 'Pêssego'],
      base: ['Cera de Abelha', 'Caramelo Quente', 'Patchouli', 'Alcaçuz'],
    },
    shortNotes: 'Mel Dourado · Gardênia · Laranja Sanguínea · Caramelo',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado no provocante Scandal de Jean Paul Gaultier. Um mel gourmand irresistível que envolve flores brancas opulentas com o toque cítrico e suculento da laranja sanguínea.',
    atmosphere: 'A audácia e o magnetismo sedutor de uma noite parisiense irreverente.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Viciante, doce e sensual',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'angel-mugler',
    name: 'Máximo Star Gourmand',
    referenceCode: 'MX-14',
    brand: 'Máximo',
    inspiredBy: 'Angel',
    originalHouse: 'Mugler',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Gourmand & Frutados',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['patchouli terroso', 'chocolate belga', 'caramelo quente', 'mel silvestre', 'baunilha'],
    notes: {
      top: ['Algodão Doce', 'Coco', 'Cassis', 'Melão', 'Bergamota', 'Abacaxi'],
      heart: ['Mel Silvestre', 'Bagas Vermelhas', 'Amora', 'Ameixa', 'Damasco', 'Jasmim'],
      base: ['Patchouli Puro', 'Chocolate Belga', 'Caramelo', 'Baunilha', 'Fava Tonka'],
    },
    shortNotes: 'Patchouli · Chocolate & Caramelo · Mel Silvestre · Baunilha',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado no pioneiro gourmand Angel de Mugler. Doçura celestial unida à densidade imponente do patchouli e toques de chocolate nobre.',
    atmosphere: 'Um céu noturno pontilhado de constelações e memórias doces.',
    longevity: '12 a 16 horas na pele',
    sillage: 'Ultra potente e inconfundível',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'la-vie-est-belle-rose-lancome',
    name: 'Máximo Bella Vita',
    referenceCode: 'MX-15',
    brand: 'Máximo',
    inspiredBy: 'La Vie Est Belle',
    originalHouse: 'Lancôme',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['íris nobre', 'flor de laranjeira', 'baunilha gourmand', 'patchouli', 'pralinê'],
    notes: {
      top: ['Groselha Preta', 'Pera Francesa Suculenta', 'Bergamota'],
      heart: ['Íris Pallida Nobre', 'Flor de Laranjeira', 'Jasmim Sambac'],
      base: ['Pralinê Doce', 'Baunilha de Bourbon', 'Patchouli', 'Fava Tonka'],
    },
    shortNotes: 'Íris Pallida · Flor de Laranjeira · Pralinê · Baunilha',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'SORRISO DE CRISTAL',
    sensoryDescription:
      'Contratipo feminino Máximo de 60 ml inspirado no ícone de felicidade e elegância La Vie Est Belle da Lancôme. Uma declaração floral gourmand centrada na rara íris pallida com fundo de pralinê e baunilha.',
    atmosphere: 'A alegria contagiante de um dia ensolarado e a elegância de um sorriso genuíno.',
    longevity: '10 a 12 horas na pele',
    sillage: 'Luminoso, aveludado e envolvente',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: '212-vip-rose-carolina-herrera',
    name: 'Máximo Rosé VIP',
    referenceCode: 'MX-16',
    brand: 'Máximo',
    inspiredBy: '212 VIP Rosé',
    originalHouse: 'Carolina Herrera',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['champagne rosé', 'flor de pêssego', 'madeira nobre', 'almíscar branco', 'frutas vermelhas'],
    notes: {
      top: ['Champagne Rosé Efervescente', 'Frutas Vermelhas'],
      heart: ['Flor de Pêssego Nobre', 'Rosa Suave'],
      base: ['Madeira Rainha', 'Almíscar Branco', 'Âmbar'],
    },
    shortNotes: 'Champagne Rosé · Flor de Pêssego · Madeira Rainha',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado no clima efervescente de 212 VIP Rosé da Carolina Herrera. O frescor borbulhante do champagne rosé em sintonia com a delicadeza da flor de pêssego.',
    atmosphere: 'Um brinde com taças de cristal no rooftop mais sofisticado da cidade.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Chic, efervescente e vibrante',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'fantasy-britney-spears',
    name: 'Máximo Sweet Fantasy',
    referenceCode: 'MX-17',
    brand: 'Máximo',
    inspiredBy: 'Fantasy',
    originalHouse: 'Britney Spears',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Gourmand & Frutados',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'renomeados',
    status: 'Disponível',
    accords: ['kiwi exótico', 'chocolate branco', 'cupcake', 'lichia doce', 'almíscar'],
    notes: {
      top: ['Kiwi Exótico', 'Lichia Vermelha', 'Marmelo Dourado'],
      heart: ['Chocolate Branco Cremoso', 'Acorde de Cupcake', 'Orquídea', 'Pétalas de Jasmim'],
      base: ['Almíscar Sensual', 'Raiz de Orris', 'Madeiras Suaves'],
    },
    shortNotes: 'Kiwi · Chocolate Branco · Cupcake · Lichia Vermelha',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'DOÇURA MÁGICA',
    sensoryDescription:
      'Contratipo feminino Máximo de 60 ml inspirado na famosa poção doce e tentadora de Fantasy da Britney Spears. A mistura viciante de kiwi fresco, chocolate branco e acordes de confeitaria fina.',
    atmosphere: 'Um conto de fadas moderno e lúdico repleto de encanto e doçura.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Doce, jovial e acolhedor',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'glamour-o-boticario',
    name: 'Máximo Charme & Glamour',
    referenceCode: 'MX-18',
    brand: 'Máximo',
    inspiredBy: 'Glamour',
    originalHouse: 'O Boticário',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Florais',
    gender: 'Feminino',
    category: 'Perfumes',
    collectionOrigin: 'renomeados',
    status: 'Disponível',
    accords: ['mandarina fresca', 'flor de laranjeira', 'íris aveludada', 'sândalo nobre', 'baunilha'],
    notes: {
      top: ['Mandarina', 'Ameixa Preta', 'Néroli', 'Cítricos Frescos'],
      heart: ['Flor de Laranjeira', 'Íris', 'Lilás', 'Canela'],
      base: ['Sândalo', 'Baunilha', 'Almíscar', 'Patchouli'],
    },
    shortNotes: 'Mandarina · Flor de Laranjeira · Íris · Sândalo',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado no clássico brasileiro Glamour de O Boticário. Uma fragrância floral cítrica e aveludada com rastro refinado de madeiras nobres.',
    atmosphere: 'A elegância feminina e a simpatia natural que iluminam qualquer ambiente.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Elegante, equilibrado e agradável',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'bare-vanilla-victorias-secret',
    name: 'Máximo Sweet Vanilla',
    referenceCode: 'MX-19',
    brand: 'Máximo',
    inspiredBy: 'Bare Vanilla',
    originalHouse: "Victoria's Secret",
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Gourmand & Frutados',
    gender: 'Feminino',
    category: 'Body Mist & Capilar',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['baunilha batida', 'âmbar aconchegante', 'almíscar aveludado', 'doce'],
    notes: {
      top: ['Baunilha Batida Doce', 'Flor de Maçã'],
      heart: ['Pétalas de Orquídea Baunilha', 'Almíscar Quente'],
      base: ['Âmbar Aconchegante', 'Almíscar Macio', 'Sândalo Doce'],
    },
    shortNotes: 'Baunilha Batida · Âmbar Aconchegante · Almíscar Macio',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado na aconchegante Bare Vanilla da Victoria’s Secret. Uma experiência pura e aveludada de baunilha batida com almíscares confortáveis.',
    atmosphere: 'O abraço macio de um suéter de cashmere em um entardecer acolhedor.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Confortável, doce e acolhedor',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
  {
    id: 'cheirosa-68-sol-de-janeiro',
    name: 'Máximo Rio Solar',
    referenceCode: 'MX-20',
    brand: 'Máximo',
    inspiredBy: "Cheirosa '68",
    originalHouse: 'Sol de Janeiro',
    subtitle: '60 ml · Contratipo Feminino Alta Fixação',
    family: 'Gourmand & Frutados',
    gender: 'Feminino',
    category: 'Body Mist & Capilar',
    collectionOrigin: 'importados',
    status: 'Disponível',
    accords: ['jasmim brasileiro', 'fruta do dragão', 'brisa oceânica', 'baunilha solar'],
    notes: {
      top: ['Jasmim Brasileiro', 'Fruta do Dragão Rosa'],
      heart: ['Brisa Oceânica Fresca', 'Hibisco Tropical'],
      base: ['Baunilha Solar', 'Almíscar Cristalino'],
    },
    shortNotes: 'Jasmim Brasileiro · Fruta do Dragão · Brisa Oceânica · Baunilha',
    price: '',
    priceNumeric: 0,
    size: '60 ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    badge: 'TROPICAL CHIC',
    sensoryDescription:
      'Contratipo feminino Máximo no frasco de 60 ml inspirado na energia solar e floral de Cheirosa ’68 da Sol de Janeiro. Flores frescas e frutas tropicais beijadas pelo sol e pela brisa oceânica.',
    atmosphere: 'O calor dourado do sol tropical sobre a pele com a energia vibrante do litoral.',
    longevity: '8 a 10 horas na pele',
    sillage: 'Alegre, solar e irresistível',
    image: '/assets/maximo-pour-femme.svg',
    secondaryImage: '/assets/maximo-pour-femme.svg',
  },
];

export const DISCOVERY_SET_DETAILS = {
  name: 'Kit Experiência Máximo',
  subtitle: '4 Peças · Coleção Autoral Máximo',
  price: 'Sob Consulta',
  priceNumeric: 0,
  description:
    'O ritual completo da casa Máximo Eau de Parfum: Sabonete Líquido Iluminador 190ml, Body Splash 100ml, Creme Acetinado 200g e Perfume Capilar 45ml. Permite experimentar a rotina completa de autocuidado com acabamento de alta perfumaria.',
  samples: [
    'Sabonete Líquido Iluminador (190 ml)',
    'Body Splash Floral Acetinado (100 ml)',
    'Creme Acetinado Corporal Toque de Seda (200 g)',
    'Perfume Capilar Brilho Tridimensional (45 ml)',
  ],
  image: '/assets/maximo-kit-ritual.svg',
};

export function getPerfumeTactileSensation(perfume: Perfume): string {
  if (perfume.tactileSensation) return perfume.tactileSensation;
  
  switch (perfume.family) {
    case 'Linha Máximo':
      return 'Sensação aveludada imediata e hidratação acetinada';
    case 'Amadeirados':
      return 'Toque seco e nobre de madeiras nobres e calor sóbrio';
    case 'Ambarados':
    case 'Orientais':
      return 'Rastro denso e envolvente com magnetismo cristalino';
    case 'Florais':
      return 'Toque sedoso de pétalas orvalhadas na pele';
    case 'Frescos':
      return 'Frescor revigorante e efervescência cristalina';
    case 'Gourmand & Frutados':
      return 'Sensação licorosa e aconchego aveludado';
    default:
      return 'Toque sedoso e rastro sofisticado na pele';
  }
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  phoneWhatsApp: '5531975394776',
  phoneDisplay: '(31) 97539-4776',
  storeName: 'Máximo Eau de Parfum',
  tagline: 'A arte da alta perfumaria e do autocuidado refinado.',
  instagram: '@maximoeaudeparfum',
  email: 'contato@maximoperfumes.com.br',
  orderMessagePrefix: 'Olá! Tenho interesse no perfume',
  logoUrl: 'https://i.postimg.cc/JHBpWK7K/image.png',
  adminPassword: '@Luangalo013',
};

export function getStoreSettings(): StoreSettings {
  try {
    const saved = localStorage.getItem('maximo_store_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_STORE_SETTINGS, ...parsed };
    }
  } catch {
    // Fallback
  }
  return DEFAULT_STORE_SETTINGS;
}

export function saveStoreSettings(settings: StoreSettings): void {
  try {
    localStorage.setItem('maximo_store_settings', JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('maximo_settings_updated', { detail: settings }));
  } catch {
    // Fallback
  }
}

export const BRAND_INFO = {
  name: 'Máximo',
  fullName: 'Máximo Eau de Parfum',
  shortName: 'MX',
  monogram: 'M',
  tagline: 'A arte da alta perfumaria e do autocuidado refinado.',
  fullTagline: 'Fragrâncias e cosméticos nobres criados para marcar presença com distinção, elegância e intensidade.',
  city: 'Belo Horizonte / São Paulo',
  country: 'Brasil',
  origin: 'Brasil',
  phoneWhatsApp: '5531975394776',
  phoneDisplay: '(31) 97539-4776',
  instagram: '@maximoeaudeparfum',
  email: 'contato@maximoperfumes.com.br',
  atelierAddress: 'Atendimento Exclusivo e Entregas para Todo o Brasil',
};

export function createWhatsAppLink(message: string, phone?: string): string {
  const currentPhone = phone || getStoreSettings().phoneWhatsApp || BRAND_INFO.phoneWhatsApp;
  // Clean phone string to digits only
  const cleanPhone = currentPhone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function createProductWhatsAppLink(
  perfumeName: string,
  referenceCodeOrBrand: string = 'Máximo',
  size: string = '',
  _price?: string,
  inspiredBy?: string,
  originalHouse?: string
): string {
  const settings = getStoreSettings();
  const code = referenceCodeOrBrand && referenceCodeOrBrand.startsWith('MX') ? referenceCodeOrBrand : '';
  const itemIdentifier = code ? `${code} - ${perfumeName}` : perfumeName;

  let message = '';
  if (inspiredBy && originalHouse) {
    message = `Olá! Tenho interesse no contratipo Máximo ${itemIdentifier}, inspirado no ${inspiredBy} da ${originalHouse}. Gostaria de consultoria olfativa.`;
  } else if (inspiredBy) {
    message = `Olá! Tenho interesse no contratipo Máximo ${itemIdentifier}, inspirado no ${inspiredBy}. Gostaria de consultoria olfativa.`;
  } else {
    const sizePart = size ? ` (${size})` : '';
    message = `Olá! Tenho interesse no produto Máximo ${itemIdentifier}${sizePart}. Gostaria de consultoria olfativa.`;
  }

  return createWhatsAppLink(message, settings.phoneWhatsApp);
}

export function createPerfumeWhatsAppLink(perfume: Perfume): string {
  return createProductWhatsAppLink(
    perfume.name,
    perfume.referenceCode || perfume.brand,
    perfume.size,
    undefined,
    perfume.inspiredBy,
    perfume.originalHouse
  );
}
