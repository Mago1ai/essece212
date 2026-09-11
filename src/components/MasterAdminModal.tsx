import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  Save,
  Check,
  Search,
  Image as ImageIcon,
  Copy,
  Layers,
  Tag,
  DollarSign,
  Droplets,
  Flame,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  Wand2,
  Sliders,
  Eye,
  FileCode,
  Crop,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Perfume, StoreSettings, OlfactoryFamily } from '../types';
import {
  getStoreSettings,
  saveStoreSettings,
  DEFAULT_STORE_SETTINGS,
  createProductWhatsAppLink,
  createWhatsAppLink,
} from '../data/perfumes';
import { InteractiveBottleShowcase } from './InteractiveBottleShowcase';

interface MasterAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  onSavePerfumes: (updated: Perfume[]) => void;
  onResetToDefault: () => void;
}

export const MasterAdminModal: React.FC<MasterAdminModalProps> = ({
  isOpen,
  onClose,
  perfumes,
  onSavePerfumes,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'settings' | 'image_studio' | 'code' | 'json'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Store settings state
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(getStoreSettings());

  // Form editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm: Perfume = {
    id: '',
    name: '',
    brand: 'Máximo',
    subtitle: '100 ml · Eau de Parfum',
    family: 'Linha Máximo',
    gender: 'Unissex',
    category: 'Perfumes',
    price: 'R$ 189',
    priceNumeric: 189,
    size: '100 ml',
    concentration: 'Eau de Parfum',
    badge: 'LINHA PRÓPRIA',
    sensoryDescription: 'Fragrância refinada com notas nobres e marcantes.',
    atmosphere: 'Sofisticação e presença inesquecível em qualquer ocasião.',
    longevity: '8 a 12 horas na pele',
    sillage: 'Projeção marcante e aveludada',
    notes: {
      top: ['Flor de Laranjeira', 'Bergamota'],
      heart: ['Rosa Damascena', 'Jasmim Branco'],
      base: ['Âmbar', 'Baunilha', 'Madeiras Nobres'],
    },
    shortNotes: 'Rosa Damascena · Bergamota · Âmbar & Baunilha',
    accords: ['floral', 'aveludado', 'nobre'],
    tactileSensation: 'Toque sedoso e aveludado na pele',
    image: '/assets/maximo-sabonete-liquido.svg',
  };

  const [formData, setFormData] = useState<Perfume>(initialForm);
  const [topNotesInput, setTopNotesInput] = useState('Flor de Laranjeira, Bergamota');
  const [heartNotesInput, setHeartNotesInput] = useState('Rosa Damascena, Jasmim Branco');
  const [baseNotesInput, setBaseNotesInput] = useState('Âmbar, Baunilha, Madeiras Nobres');
  const [accordsInput, setAccordsInput] = useState('floral, aveludado, nobre');

  // JSON Tab State
  const [jsonText, setJsonText] = useState('');

  // Image Studio State
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  const [studioBrightness, setStudioBrightness] = useState<number>(105);
  const [studioContrast, setStudioContrast] = useState<number>(110);
  const [studioPadding, setStudioPadding] = useState<number>(20);
  const [studioAutoTransparency, setStudioAutoTransparency] = useState<boolean>(true);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync settings on mount/open
  useEffect(() => {
    if (isOpen) {
      setStoreSettings(getStoreSettings());
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Image Studio processing logic (HTML5 Canvas)
  const processImageOnCanvas = useCallback(
    (sourceSrc: string, brightness: number, contrast: number, paddingPct: number, autoTrans: boolean) => {
      setIsProcessingImage(true);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          setIsProcessingImage(false);
          return;
        }

        // Set high resolution vertical canvas for perfume bottle
        const targetW = 800;
        const targetH = 1000;
        canvas.width = targetW;
        canvas.height = targetH;

        // Clear canvas
        ctx.clearRect(0, 0, targetW, targetH);

        // Calculate aspect-ratio preserving dimensions with padding
        const padding = (targetW * paddingPct) / 100;
        const availableW = targetW - padding * 2;
        const availableH = targetH - padding * 2;

        const imgAspect = img.width / img.height;
        const containerAspect = availableW / availableH;

        let drawW = availableW;
        let drawH = availableH;

        if (imgAspect > containerAspect) {
          drawH = availableW / imgAspect;
        } else {
          drawW = availableH * imgAspect;
        }

        const drawX = (targetW - drawW) / 2;
        const drawY = (targetH - drawH) / 2;

        // Draw image onto temporary offscreen canvas for filter/pixel processing
        const offCanvas = document.createElement('canvas');
        offCanvas.width = drawW;
        offCanvas.height = drawH;
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

        if (offCtx) {
          offCtx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
          offCtx.drawImage(img, 0, 0, drawW, drawH);

          const imgData = offCtx.getImageData(0, 0, drawW, drawH);
          const data = imgData.data;

          // If auto transparency is enabled, turn plain white/near-white or flat corners into smooth transparent alpha
          if (autoTrans) {
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              // Check if pixel is near-white background
              if (r > 238 && g > 238 && b > 238) {
                // Feather edge alpha
                const diff = Math.max(r, g, b) - 238;
                data[i + 3] = Math.max(0, 255 - diff * 15);
              }
            }
            offCtx.putImageData(imgData, 0, 0);
          }

          // Composite onto main studio canvas with subtle studio contact shadow
          // 1. Soft pedestal base shadow
          const shadowY = drawY + drawH - 12;
          const shadowGradient = ctx.createRadialGradient(
            targetW / 2,
            shadowY,
            10,
            targetW / 2,
            shadowY,
            drawW * 0.45
          );
          shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
          shadowGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
          shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = shadowGradient;
          ctx.beginPath();
          ctx.ellipse(targetW / 2, shadowY, drawW * 0.45, 18, 0, 0, Math.PI * 2);
          ctx.fill();

          // 2. Draw processed bottle
          ctx.drawImage(offCanvas, drawX, drawY, drawW, drawH);

          // 3. Subtle glass highlight gleam on the bottle edge
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fillRect(drawX, drawY, drawW * 0.15, drawH);
          ctx.restore();

          const dataUrl = canvas.toDataURL('image/png', 0.95);
          setProcessedImageSrc(dataUrl);
        }
        setIsProcessingImage(false);
      };
      img.onerror = () => {
        setIsProcessingImage(false);
        showToast('Erro ao carregar e processar imagem.');
      };
      img.src = sourceSrc;
    },
    []
  );

  // Re-run canvas processing whenever adjustments change
  useEffect(() => {
    if (rawImageSrc) {
      processImageOnCanvas(rawImageSrc, studioBrightness, studioContrast, studioPadding, studioAutoTransparency);
    }
  }, [rawImageSrc, studioBrightness, studioContrast, studioPadding, studioAutoTransparency, processImageOnCanvas]);

  // Handle file input / drag-and-drop
  const handleLoadImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecione um arquivo de imagem válido (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setRawImageSrc(result);
        showToast('Imagem carregada no Estúdio! Ajuste e aplique ao frasco.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Clipboard paste listener for screenshots (Ctrl+V)
  const handlePasteEvent = useCallback((e: React.ClipboardEvent | ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleLoadImageFile(file);
          setActiveTab('image_studio');
          showToast('Print colado da área de transferência com sucesso!');
          break;
        }
      }
    }
  }, []);

  if (!isOpen) return null;

  // --- Handlers for Products ---
  const handleOpenNewForm = () => {
    const newId = `perfume-${Date.now()}`;
    setFormData({
      ...initialForm,
      id: newId,
    });
    setTopNotesInput('Flor de Laranjeira, Bergamota');
    setHeartNotesInput('Rosa Damascena, Jasmim Branco');
    setBaseNotesInput('Âmbar, Baunilha, Madeiras Nobres');
    setAccordsInput('floral, aveludado, nobre');
    setIsEditing(false);
    setEditingId(null);
    setActiveTab('form');
  };

  const handleEditPerfume = (p: Perfume) => {
    setFormData({ ...p });
    setTopNotesInput(p.notes?.top ? p.notes.top.join(', ') : '');
    setHeartNotesInput(p.notes?.heart ? p.notes.heart.join(', ') : '');
    setBaseNotesInput(p.notes?.base ? p.notes.base.join(', ') : '');
    setAccordsInput(p.accords ? p.accords.join(', ') : '');
    setIsEditing(true);
    setEditingId(p.id);
    setActiveTab('form');
  };

  const handleDeletePerfume = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja remover "${name}" do catálogo?`)) {
      const updated = perfumes.filter((p) => p.id !== id);
      onSavePerfumes(updated);
      showToast(`Produto "${name}" excluído!`);
    }
  };

  const handleDuplicatePerfume = (p: Perfume) => {
    const duplicated: Perfume = {
      ...p,
      id: `perfume-${Date.now()}`,
      name: `${p.name} (Cópia)`,
      badge: 'NOVO',
    };
    const updated = [duplicated, ...perfumes];
    onSavePerfumes(updated);
    showToast(`"${p.name}" duplicado no catálogo!`);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const parseList = (str: string) =>
      str
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const parsedTop = parseList(topNotesInput);
    const parsedHeart = parseList(heartNotesInput);
    const parsedBase = parseList(baseNotesInput);
    const parsedAccords = parseList(accordsInput);

    const priceNum =
      typeof formData.priceNumeric === 'number' && !isNaN(formData.priceNumeric)
        ? formData.priceNumeric
        : parseFloat(formData.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 189;

    const formattedPrice = formData.price.startsWith('R$')
      ? formData.price
      : `R$ ${priceNum.toFixed(2).replace('.', ',')}`;

    const shortNotesStr = [parsedTop[0], parsedHeart[0], parsedBase[0]].filter(Boolean).join(' · ');

    const completePerfume: Perfume = {
      ...formData,
      id: formData.id || `perfume-${Date.now()}`,
      price: formattedPrice,
      priceNumeric: priceNum,
      notes: {
        top: parsedTop.length ? parsedTop : ['Notas Cítricas Nobres'],
        heart: parsedHeart.length ? parsedHeart : ['Pétalas Florais'],
        base: parsedBase.length ? parsedBase : ['Madeiras & Âmbar'],
      },
      shortNotes: formData.shortNotes || shortNotesStr || 'Notas Nobres & Envolventes',
      accords: parsedAccords.length ? parsedAccords : ['elegante', 'nobre'],
    };

    let updated: Perfume[];
    if (isEditing && editingId) {
      updated = perfumes.map((p) => (p.id === editingId ? completePerfume : p));
      showToast(`"${completePerfume.name}" atualizado com sucesso!`);
    } else {
      updated = [completePerfume, ...perfumes];
      showToast(`"${completePerfume.name}" adicionado ao catálogo!`);
    }

    onSavePerfumes(updated);
    setActiveTab('list');
  };

  // Apply processed studio image to current form or active product
  const handleApplyStudioImageToProduct = () => {
    if (!processedImageSrc) return;
    setFormData((prev) => ({ ...prev, image: processedImageSrc }));
    showToast('Imagem tratada aplicada ao produto!');
    setActiveTab('form');
  };

  // --- Handlers for Store Settings ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreSettings(storeSettings);
    showToast('Configurações da Loja e WhatsApp salvas com sucesso!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Deseja restaurar as configurações originais de WhatsApp e Loja?')) {
      setStoreSettings(DEFAULT_STORE_SETTINGS);
      saveStoreSettings(DEFAULT_STORE_SETTINGS);
      showToast('Configurações restauradas para o padrão.');
    }
  };

  // --- Handlers for JSON / Supabase Code Export ---
  const handleExportJson = () => {
    const dataStr = JSON.stringify(perfumes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalogo-maximo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Arquivo JSON exportado!');
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onSavePerfumes(parsed);
        showToast(`${parsed.length} produtos importados!`);
        setActiveTab('list');
      } else {
        alert('O JSON deve ser uma lista (array) de perfumes válida.');
      }
    } catch {
      alert('Erro ao processar JSON. Verifique a sintaxe.');
    }
  };

  // Code generation for Supabase / TypeScript database
  const generateSupabaseTypeScriptBlock = () => {
    return `// ==========================================
// MÁXIMO EAU DE PARFUM - CATÁLOGO SUPABASE / TS
// Exportado em: ${new Date().toLocaleString('pt-BR')}
// ==========================================

export interface PerfumeItem {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  family: string;
  gender: string;
  category: string;
  price: string;
  priceNumeric: number;
  size: string;
  concentration: string;
  badge?: string;
  shortNotes: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  accords: string[];
  sensoryDescription: string;
  atmosphere: string;
  longevity: string;
  sillage: string;
  tactileSensation: string;
  image: string;
}

export const CATALOG_PRODUCTS: PerfumeItem[] = ${JSON.stringify(perfumes, null, 2)};
`;
  };

  const filteredPerfumes = perfumes.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q) ||
      p.price.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="master-admin-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onPaste={handlePasteEvent}
    >
      <div
        id="master-admin-container"
        className="w-full max-w-6xl h-[92vh] max-h-[900px] bg-[#161412] border border-[#D4AF37]/40 text-[#F4F0E9] rounded-xs shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden relative"
      >
        {/* Hidden Canvas for High-Res Image Treatment */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D4AF37] text-[#141210] font-bold text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#1C1A17]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-subtle text-[10px] tracking-[0.22em] text-[#D4AF37] uppercase font-semibold">
                  SISTEMA DE GESTÃO EXCLUSIVO
                </span>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] px-2 py-0.5 rounded-full font-mono-subtle">
                  PRODUÇÃO
                </span>
              </div>
              <h2 className="font-serif-editorial text-lg sm:text-xl text-white font-normal">
                Painel Administrativo Máximo
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fechar Painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-5 sm:px-7 py-2.5 border-b border-white/10 bg-[#12110F] overflow-x-auto select-none">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'list'
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Catálogo ({perfumes.length})</span>
          </button>

          <button
            onClick={handleOpenNewForm}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'form' && !isEditing
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Produto</span>
          </button>

          <button
            onClick={() => setActiveTab('image_studio')}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'image_studio'
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Estúdio de Frascos (Tratar Foto / Print)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp & Loja</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Código Supabase / TS</span>
          </button>

          <button
            onClick={() => {
              setJsonText(JSON.stringify(perfumes, null, 2));
              setActiveTab('json');
            }}
            className={`px-3.5 py-2 rounded-xs font-mono-subtle text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'json'
                ? 'bg-[#D4AF37] text-[#141210] font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar / Importar</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-7">
          {/* TAB 1: PRODUCT LIST */}
          {activeTab === 'list' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-grow max-w-md">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por nome, marca, notas ou família..."
                    className="w-full bg-black/40 border border-white/20 text-white text-xs pl-9 pr-4 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenNewForm}
                    className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Novo Produto</span>
                  </button>
                </div>
              </div>

              {/* Grid of Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPerfumes.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1C1A17] border border-white/10 hover:border-[#D4AF37]/50 p-4 rounded-xs transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-20 bg-black/40 border border-white/10 rounded-xs flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain drop-shadow-md"
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono-subtle text-[#D4AF37] uppercase tracking-widest font-semibold">
                            {p.brand}
                          </span>
                          {p.badge && (
                            <span className="text-[9px] bg-[#A96227] text-white px-1.5 py-0.5 rounded-xs font-mono-subtle uppercase">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif-editorial text-base text-white truncate font-normal">
                          {p.name}
                        </h4>
                        <p className="text-xs text-white/60 truncate">{p.subtitle || p.size}</p>
                        <p className="text-xs text-[#D4AF37] font-semibold mt-1">{p.price}</p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono-subtle text-white/50">{p.family}</span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicatePerfume(p)}
                          title="Duplicar"
                          className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditPerfume(p)}
                          title="Editar"
                          className="p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/15 rounded-xs transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePerfume(p.id, p.name)}
                          title="Excluir"
                          className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT EDIT / CREATE FORM */}
          {activeTab === 'form' && (
            <form onSubmit={handleSaveForm} className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono-subtle text-[11px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                    {isEditing ? 'MODO EDIÇÃO' : 'NOVO CADASTRO'}
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    {isEditing ? `Editar: ${formData.name}` : 'Cadastrar Novo Frasco / Produto'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 border border-white/20 text-white/80 hover:text-white text-xs uppercase tracking-wider rounded-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Produto</span>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Core Product Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Nome do Produto / Perfume *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Sabonete Líquido Máximo ou Baccarat Rouge 540"
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Marca / Casa *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="Ex: Máximo, Dior, Tom Ford..."
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Selo / Badge
                      </label>
                      <input
                        type="text"
                        value={formData.badge || ''}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        placeholder="Ex: LINHA PRÓPRIA, DESTAQUE, NOVO"
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Preço Formatado *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Ex: R$ 189"
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Volume / Tamanho
                      </label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="Ex: 100 ml, 190 ml, 50 ml"
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Família Olfativa *
                      </label>
                      <select
                        value={formData.family}
                        onChange={(e) =>
                          setFormData({ ...formData, family: e.target.value as Perfume['family'] })
                        }
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      >
                        <option value="Linha Máximo">Linha Máximo (Própria)</option>
                        <option value="Florais">Florais</option>
                        <option value="Amadeirados">Amadeirados</option>
                        <option value="Ambarados">Ambarados</option>
                        <option value="Orientais">Orientais</option>
                        <option value="Frescos">Frescos</option>
                        <option value="Gourmand & Frutados">Gourmand & Frutados</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                        Gênero
                      </label>
                      <select
                        value={formData.gender || 'Unissex'}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value as Perfume['gender'] })
                        }
                        className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                      >
                        <option value="Unissex">Unissex</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Sensação Tátil na Pele
                    </label>
                    <input
                      type="text"
                      value={formData.tactileSensation || ''}
                      onChange={(e) => setFormData({ ...formData, tactileSensation: e.target.value })}
                      placeholder="Ex: Espuma cremosa com toque de seda e hidratação imediata"
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Descrição Sensorial
                    </label>
                    <textarea
                      rows={3}
                      value={formData.sensoryDescription}
                      onChange={(e) => setFormData({ ...formData, sensoryDescription: e.target.value })}
                      placeholder="Descreva a personalidade, o acorde olfativo e a sensação da fragrância..."
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Right Column: Olfactory Pyramid & Image */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Notas de Saída / Topo (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={topNotesInput}
                      onChange={(e) => setTopNotesInput(e.target.value)}
                      placeholder="Ex: Flor de Laranjeira, Bergamota, Pera"
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Notas de Coração (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={heartNotesInput}
                      onChange={(e) => setHeartNotesInput(e.target.value)}
                      placeholder="Ex: Rosa Damascena, Jasmim, Lírio"
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/70 uppercase tracking-wider mb-1">
                      Notas de Fundo / Base (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={baseNotesInput}
                      onChange={(e) => setBaseNotesInput(e.target.value)}
                      placeholder="Ex: Baunilha, Âmbar, Almíscar Branco"
                      className="w-full bg-black/50 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {/* Image Field & Preview */}
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono-subtle text-[#D4AF37] uppercase tracking-wider font-semibold">
                        Imagem do Frasco
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveTab('image_studio')}
                        className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-mono-subtle"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Abrir Estúdio / Tratar Foto</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="URL da imagem ou Base64 gerado pelo Estúdio..."
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-24 bg-black/60 border border-white/15 rounded-xs p-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="text-xs text-white/60 space-y-1">
                        <p className="text-white font-medium">Pré-visualização do Frasco</p>
                        <p className="text-[11px]">
                          Para obter o melhor efeito 3D e sombra de contato, utilize o Estúdio de Frascos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 border border-white/20 text-white/80 hover:text-white text-xs uppercase tracking-wider rounded-xs"
                >
                  Voltar para a Lista
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Produto</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: IMAGE STUDIO (TRATAMENTO DE FOTOS & PRINTS) */}
          {activeTab === 'image_studio' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <span className="font-mono-subtle text-[11px] text-[#D4AF37] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5" />
                    ESTÚDIO DE TRATAMENTO DE FRASCOS
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    Tratar Fotos, Prints e Screenshots de Frascos
                  </h3>
                  <p className="text-xs text-white/70">
                    Cole uma captura com <kbd className="bg-white/10 px-1 py-0.5 rounded text-[11px]">Ctrl+V</kbd> ou envie a foto. O estúdio ajusta a proporção, o contraste do vidro, a sombra de contato e o movimento 3D.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLoadImageFile(file);
                    }}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 border border-white/20"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                  </button>

                  {processedImageSrc && (
                    <button
                      type="button"
                      onClick={handleApplyStudioImageToProduct}
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Aplicar ao Produto</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Studio Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Controls (4 Cols) */}
                <div className="lg:col-span-4 bg-[#1C1A17] border border-white/10 p-5 rounded-xs space-y-5">
                  <div className="space-y-1">
                    <h4 className="font-mono-subtle text-xs text-[#D4AF37] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Ajustes Óticos de Estúdio</span>
                    </h4>
                    <p className="text-[11px] text-white/60">
                      Realce o frasco sem distorcer o rótulo ou a cor real da essência.
                    </p>
                  </div>

                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-subtle text-white/80">
                      <span>Brilho do Vidro</span>
                      <span className="text-[#D4AF37]">{studioBrightness}%</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={140}
                      value={studioBrightness}
                      onChange={(e) => setStudioBrightness(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-subtle text-white/80">
                      <span>Contraste & Nitidez</span>
                      <span className="text-[#D4AF37]">{studioContrast}%</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={150}
                      value={studioContrast}
                      onChange={(e) => setStudioContrast(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  {/* Padding / Margin */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-subtle text-white/80">
                      <span>Margem / Enquadramento</span>
                      <span className="text-[#D4AF37]">{studioPadding}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      value={studioPadding}
                      onChange={(e) => setStudioPadding(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  {/* Auto Transparency Toggle */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white block font-medium">Suavizar Fundo Branco</span>
                      <span className="text-[10px] text-white/50">Recorta fundos claros automaticamente</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={studioAutoTransparency}
                      onChange={(e) => setStudioAutoTransparency(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37]"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-mono-subtle text-white/60 uppercase tracking-wider block">
                      Predefinições Rápidas
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStudioBrightness(105);
                          setStudioContrast(112);
                          setStudioPadding(18);
                          setStudioAutoTransparency(true);
                        }}
                        className="p-2 bg-black/40 hover:bg-black/60 border border-white/15 text-[11px] text-white rounded-xs text-left"
                      >
                        ✨ Alta Perfumaria
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setStudioBrightness(100);
                          setStudioContrast(105);
                          setStudioPadding(15);
                          setStudioAutoTransparency(false);
                        }}
                        className="p-2 bg-black/40 hover:bg-black/60 border border-white/15 text-[11px] text-white rounded-xs text-left"
                      >
                        📷 Original Fiel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Preview (8 Cols) */}
                <div className="lg:col-span-8 bg-[#12110F] border border-white/10 rounded-xs overflow-hidden flex flex-col items-center justify-center relative min-h-[420px]">
                  {processedImageSrc ? (
                    <div className="w-full h-full flex flex-col">
                      <div className="p-3 bg-black/40 border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono-subtle text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>TESTE AO VIVO: INTERAÇÃO SUAVE COM O MOUSE</span>
                        </span>
                        <span className="text-[11px] text-white/60">Mova o cursor para testar</span>
                      </div>

                      <div className="flex-grow flex items-center justify-center p-4">
                        <InteractiveBottleShowcase
                          src={processedImageSrc}
                          alt="Frasco Tratado"
                          brand={formData.brand || 'Máximo'}
                          name={formData.name || 'Frasco em Tratamento'}
                          badge="ESTÚDIO ATIVO"
                          tactileDescription="Sensação aveludada imediata e reflexos de estúdio refinados."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 space-y-4 max-w-sm">
                      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mx-auto flex items-center justify-center text-[#D4AF37]">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif-editorial text-xl text-white">
                        Nenhuma foto selecionada ainda
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Tire um print de qualquer frasco e pressione <kbd className="bg-white/15 px-1.5 py-0.5 rounded text-white text-[11px]">Ctrl+V</kbd> aqui, ou clique no botão de Upload.
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs inline-flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Carregar Imagem</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP & STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono-subtle text-[11px] text-[#D4AF37] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    CONFIGURAÇÕES DE ATENDIMENTO & WHATSAPP
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    Editar WhatsApp e Dados da Loja
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetSettings}
                    className="px-3.5 py-2 border border-white/20 text-white/80 hover:text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Padrão</span>
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4 bg-[#1C1A17] border border-white/10 p-6 rounded-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/80 uppercase tracking-wider mb-1">
                      Número do WhatsApp (com DDI e DDD) *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeSettings.phoneWhatsApp}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, phoneWhatsApp: e.target.value })
                      }
                      placeholder="Ex: 5531975394776"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                    <p className="text-[10px] text-white/50 mt-1">
                      Apenas números (Ex: 55 + DDD + 9 dígitos)
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/80 uppercase tracking-wider mb-1">
                      Telefone Formatado para Exibição
                    </label>
                    <input
                      type="text"
                      value={storeSettings.phoneDisplay}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, phoneDisplay: e.target.value })
                      }
                      placeholder="Ex: (31) 97539-4776"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-subtle text-white/80 uppercase tracking-wider mb-1">
                    Prefixo Padrão da Mensagem de Pedido
                  </label>
                  <input
                    type="text"
                    value={storeSettings.orderMessagePrefix}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, orderMessagePrefix: e.target.value })
                    }
                    placeholder="Ex: Olá! Gostaria de fazer o pedido de"
                    className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/80 uppercase tracking-wider mb-1">
                      Nome da Loja / Marca
                    </label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, storeName: e.target.value })
                      }
                      placeholder="Ex: Máximo Eau de Parfum"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-subtle text-white/80 uppercase tracking-wider mb-1">
                      Instagram Oficial
                    </label>
                    <input
                      type="text"
                      value={storeSettings.instagram}
                      onChange={(e) =>
                        setStoreSettings({ ...storeSettings, instagram: e.target.value })
                      }
                      placeholder="Ex: @maximoeaudeparfum"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Configuration */}
                <div className="pt-3 border-t border-white/10">
                  <label className="block text-[11px] font-mono-subtle text-[#D4AF37] uppercase tracking-wider mb-1 font-semibold">
                    Senha de Acesso ao Painel Administrador
                  </label>
                  <input
                    type="text"
                    value={storeSettings.adminPassword || '@Luangalo013'}
                    onChange={(e) =>
                      setStoreSettings({ ...storeSettings, adminPassword: e.target.value })
                    }
                    placeholder="Defina a senha master..."
                    className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:border-[#D4AF37] focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-white/50 mt-1">
                    Senha atual configurada: <span className="text-[#D4AF37]">@Luangalo013</span>
                  </p>
                </div>
              </div>

              {/* Live WhatsApp Test Button */}
              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#D4AF37] block">
                    Teste do Link de Pedido no WhatsApp
                  </span>
                  <span className="text-[11px] text-white/70">
                    Clique para abrir uma mensagem de teste com o número configurado.
                  </span>
                </div>

                <a
                  href={createWhatsAppLink('Olá! Testando conexão direta com o WhatsApp da Máximo Eau de Parfum.', storeSettings.phoneWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider rounded-xs inline-flex items-center gap-2 shadow-md shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Testar no WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Todas as Configurações</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: CODE GENERATOR (SUPABASE / TYPESCRIPT) */}
          {activeTab === 'code' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono-subtle text-[11px] text-[#D4AF37] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    INTEGRAÇÃO & BANCO DE DADOS
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    Código TypeScript / Supabase do Catálogo
                  </h3>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateSupabaseTypeScriptBlock());
                    showToast('Código TypeScript copiado para a área de transferência!');
                  }}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </button>
              </div>

              <div className="relative">
                <pre className="w-full h-96 bg-black/80 border border-white/20 text-[#A3E635] font-mono text-[11px] p-4 rounded-xs overflow-auto select-all leading-relaxed">
                  {generateSupabaseTypeScriptBlock()}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 6: JSON IMPORT & EXPORT */}
          {activeTab === 'json' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono-subtle text-[11px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                    BACKUP & SINCRONIZAÇÃO
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    Exportar / Importar Catálogo JSON
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJson}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 border border-white/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Arquivo JSON</span>
                  </button>
                  <button
                    onClick={handleApplyJson}
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Aplicar JSON</span>
                  </button>
                </div>
              </div>

              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Cole o array JSON de perfumes aqui..."
                className="w-full h-80 bg-black/70 border border-white/20 text-white font-mono text-xs p-4 rounded-xs focus:border-[#D4AF37] focus:outline-none"
              />

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja restaurar o catálogo de fábrica?')) {
                      onResetToDefault();
                      showToast('Catálogo restaurado para o padrão de fábrica.');
                      setActiveTab('list');
                    }
                  }}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Catálogo Padrão</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
