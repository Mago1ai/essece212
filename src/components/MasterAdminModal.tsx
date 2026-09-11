import React, { useState, useRef } from 'react';
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
  Droplet,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { Perfume, OlfactoryFamily } from '../types';
import { PERFUMES as DEFAULT_PERFUMES } from '../data/perfumes';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'json'>('list');
  const [jsonText, setJsonText] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form state
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
    badge: 'NOVIDADE',
    sensoryDescription: 'Fragrância refinada com notas marcantes e envolventes.',
    atmosphere: 'Sofisticação e presença inesquecível em qualquer ocasião.',
    longevity: '8 a 12 horas na pele',
    sillage: 'Projeção marcante e aveludada',
    notes: {
      top: ['Bergamota', 'Pimenta Rosa'],
      heart: ['Rosa Nobre', 'Jasmim'],
      base: ['Âmbar', 'Baunilha', 'Madeiras Nobres'],
    },
    shortNotes: 'Bergamota · Rosa Nobre · Âmbar & Baunilha',
    accords: ['floral', 'amadeirado', 'sensual', 'aveludado'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
  };

  const [formData, setFormData] = useState<Perfume>(initialForm);
  const [topNotesInput, setTopNotesInput] = useState('Bergamota, Pimenta Rosa');
  const [heartNotesInput, setHeartNotesInput] = useState('Rosa Nobre, Jasmim');
  const [baseNotesInput, setBaseNotesInput] = useState('Âmbar, Baunilha, Madeiras Nobres');
  const [accordsInput, setAccordsInput] = useState('floral, amadeirado, sensual, aveludado');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!isOpen) return null;

  const handleOpenNewForm = () => {
    const newId = `perfume-${Date.now()}`;
    setFormData({
      ...initialForm,
      id: newId,
    });
    setTopNotesInput('Bergamota, Pimenta Rosa');
    setHeartNotesInput('Rosa Nobre, Jasmim');
    setBaseNotesInput('Âmbar, Baunilha, Madeiras Nobres');
    setAccordsInput('floral, amadeirado, sensual, aveludado');
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
    if (window.confirm(`Tem certeza que deseja remover o perfume "${name}" do catálogo?`)) {
      const updated = perfumes.filter((p) => p.id !== id);
      onSavePerfumes(updated);
      showToast(`Perfume "${name}" excluído com sucesso!`);
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
    showToast(`Perfume "${p.name}" duplicado com sucesso!`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setFormData((prev) => ({ ...prev, image: base64 }));
        showToast('Foto do frasco carregada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
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

    const priceNum = typeof formData.priceNumeric === 'number' && !isNaN(formData.priceNumeric)
      ? formData.priceNumeric
      : parseFloat(formData.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 189;

    const formattedPrice = formData.price.startsWith('R$')
      ? formData.price
      : `R$ ${priceNum.toFixed(2).replace('.', ',')}`;

    const shortNotesStr = [parsedTop[0], parsedHeart[0], parsedBase[0]]
      .filter(Boolean)
      .join(' · ');

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
      accords: parsedAccords.length ? parsedAccords : ['elegante', 'marcante'],
    };

    let updated: Perfume[];
    if (isEditing && editingId) {
      updated = perfumes.map((p) => (p.id === editingId ? completePerfume : p));
      showToast(`Perfume "${completePerfume.name}" atualizado!`);
    } else {
      updated = [completePerfume, ...perfumes];
      showToast(`Perfume "${completePerfume.name}" adicionado ao catálogo!`);
    }

    onSavePerfumes(updated);
    setActiveTab('list');
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(perfumes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalogo-maximo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Arquivo JSON do catálogo exportado com sucesso!');
  };

  const handleOpenJsonTab = () => {
    setJsonText(JSON.stringify(perfumes, null, 2));
    setActiveTab('json');
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onSavePerfumes(parsed);
        setJsonSuccess(true);
        setTimeout(() => setJsonSuccess(false), 2000);
        showToast(`${parsed.length} perfumes importados com sucesso!`);
        setActiveTab('list');
      } else {
        alert('O JSON deve ser uma lista (array) de perfumes válida.');
      }
    } catch (err) {
      alert('Erro ao processar JSON. Verifique a sintaxe.');
    }
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
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="master-admin-modal"
        className="w-full max-w-5xl h-[90vh] bg-[#141210] border border-[#D4AF37]/50 text-[#F4F0E9] rounded-xs shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#1A1815] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-subtle text-[10px] tracking-[0.24em] text-[#D4AF37] uppercase font-bold">
                  EASTER EGG MASTER PANEL
                </span>
                <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-xs font-mono-subtle">
                  ADMIN ONLINE
                </span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal">
                Gerenciador do Catálogo Máximo
              </h2>
            </div>
          </div>

          {/* Action Tabs & Close */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3.5 py-2 text-xs tracking-wider uppercase rounded-xs transition-all font-semibold flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-[#D4AF37] text-[#121110] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lista ({perfumes.length})</span>
            </button>

            <button
              onClick={handleOpenNewForm}
              className={`px-3.5 py-2 text-xs tracking-wider uppercase rounded-xs transition-all font-semibold flex items-center gap-1.5 ${
                activeTab === 'form' && !isEditing
                  ? 'bg-[#D4AF37] text-[#121110] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Novo Perfume</span>
            </button>

            <button
              onClick={handleOpenJsonTab}
              className={`px-3 py-2 text-xs tracking-wider uppercase rounded-xs transition-all font-semibold flex items-center gap-1.5 ${
                activeTab === 'json'
                  ? 'bg-[#D4AF37] text-[#121110] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              title="Backup e Edição em JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors ml-2"
              aria-label="Fechar painel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="bg-[#D4AF37] text-[#141210] font-bold text-xs tracking-wider uppercase py-2 px-4 text-center transition-all animate-in fade-in">
            {toastMessage}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#121110]">
          {/* TAB 1: LIST VIEW */}
          {activeTab === 'list' && (
            <div className="space-y-6">
              {/* Search and Global Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por nome, marca, preço..."
                    className="w-full bg-black/60 border border-white/15 text-white text-xs pl-9 pr-4 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleExportJson}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs tracking-wider uppercase rounded-xs transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Backup JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Deseja restaurar todo o catálogo para os perfumes originais de fábrica? Isso substituirá as edições atuais.'
                        )
                      ) {
                        onResetToDefault();
                        showToast('Catálogo restaurado com sucesso!');
                      }
                    }}
                    className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs tracking-wider uppercase rounded-xs transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Fábrica</span>
                  </button>
                </div>
              </div>

              {/* Perfume Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPerfumes.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#1A1815] border border-white/10 p-4 rounded-xs flex flex-col justify-between group hover:border-[#D4AF37]/50 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex gap-4">
                        <div className="w-20 h-24 bg-black/40 border border-white/10 rounded-xs overflow-hidden flex items-center justify-center p-2 shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain filter drop-shadow-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] text-[#D4AF37] font-mono-subtle uppercase tracking-wider font-semibold truncate">
                              {p.brand}
                            </span>
                            {p.badge && (
                              <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-xs font-mono-subtle">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif-editorial text-lg text-white font-normal truncate">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-white/60 font-light truncate">
                            {p.size} · {p.concentration}
                          </p>
                          <div className="mt-2 text-sm font-semibold text-[#D4AF37]">
                            {p.price}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] text-white/50 line-clamp-2">
                        {p.shortNotes}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDuplicatePerfume(p)}
                          className="p-1.5 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-xs transition-colors"
                          title="Duplicar este perfume"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePerfume(p.id, p.name)}
                          className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-xs transition-colors"
                          title="Excluir perfume"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleEditPerfume(p)}
                        className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#121110] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPerfumes.length === 0 && (
                <div className="text-center py-16 text-white/50">
                  <p>Nenhum perfume encontrado com o termo "{searchTerm}".</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FORM (ADD / EDIT) */}
          {activeTab === 'form' && (
            <form onSubmit={handleSaveForm} className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white">
                    {isEditing ? `Editar: ${formData.name}` : 'Cadastrar Novo Perfume'}
                  </h3>
                  <p className="text-xs text-white/60 font-mono-subtle">
                    Preencha as informações do frasco para atualização instantânea no catálogo.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs"
                >
                  Voltar à Lista
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Nome do Perfume *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Good Girl Supreme, Máximo Signature..."
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Brand */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Marca / Casa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Ex: Máximo, Carolina Herrera, Creed, Dior..."
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Family */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Família Olfativa
                  </label>
                  <select
                    value={formData.family}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        family: e.target.value as any,
                      })
                    }
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
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

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Gênero / Linha
                  </label>
                  <select
                    value={formData.gender || 'Unissex'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as any,
                      })
                    }
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Unissex">Unissex</option>
                  </select>
                </div>

                {/* Price Display */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Preço (Exibição) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ex: R$ 189 ou R$ 189,90"
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Price Numeric */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Preço Numérico (para somar no carrinho)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.priceNumeric}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priceNumeric: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Ex: 189.90"
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Size & Concentration */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Volume / Tamanho
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="Ex: 100 ml, 50 ml, 190 ml, 200 g"
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Concentração
                  </label>
                  <input
                    type="text"
                    value={formData.concentration}
                    onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                    placeholder="Ex: Eau de Parfum, Extrait de Parfum, Body Splash..."
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37]">
                    Selo / Badge em Destaque (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: LINHA PRÓPRIA, MAIS VENDIDO, AUTORAL, LANÇAMENTO, NOVIDADE"
                    className="w-full bg-black/60 border border-white/20 text-white text-sm px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Image URL & Upload */}
              <div className="p-4 bg-black/40 border border-white/15 rounded-xs space-y-3">
                <label className="block text-xs font-mono-subtle uppercase text-[#D4AF37] flex items-center justify-between">
                  <span>Foto do Frasco (URL ou Upload de Imagem)</span>
                  <span className="text-white/50 text-[10px]">Preview ao lado</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-24 h-28 bg-black border border-white/20 rounded-xs flex items-center justify-center overflow-hidden shrink-0 p-1">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-white/30" />
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Cole o link da imagem (URL HTTPS ou /assets/...)"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Carregar Foto do Computador/Celular</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Olfactory Pyramid Inputs */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-mono-subtle tracking-widest uppercase text-[#D4AF37]">
                  Pirâmide Olfativa (Separar notas por vírgula)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-white/70 block">Notas de Topo (Saída)</label>
                    <input
                      type="text"
                      value={topNotesInput}
                      onChange={(e) => setTopNotesInput(e.target.value)}
                      placeholder="Ex: Bergamota, Pêra, Pimenta Rosa"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-white/70 block">Notas de Coração (Corpo)</label>
                    <input
                      type="text"
                      value={heartNotesInput}
                      onChange={(e) => setHeartNotesInput(e.target.value)}
                      placeholder="Ex: Rosa Damascena, Jasmim, Lírio"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-white/70 block">Notas de Fundo (Base)</label>
                    <input
                      type="text"
                      value={baseNotesInput}
                      onChange={(e) => setBaseNotesInput(e.target.value)}
                      placeholder="Ex: Âmbar, Baunilha, Cedro, Almíscar"
                      className="w-full bg-black/60 border border-white/20 text-white text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-white/70 block">Acordes Principais</label>
                  <input
                    type="text"
                    value={accordsInput}
                    onChange={(e) => setAccordsInput(e.target.value)}
                    placeholder="Ex: floral, amadeirado, aveludado, fresco"
                    className="w-full bg-black/60 border border-white/20 text-white text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Sensory Description & Atmosphere */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono-subtle uppercase text-[#D4AF37]">
                    Descrição Sensorial
                  </label>
                  <textarea
                    rows={3}
                    value={formData.sensoryDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, sensoryDescription: e.target.value })
                    }
                    placeholder="Descreva a experiência olfativa com elegância..."
                    className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono-subtle uppercase text-[#D4AF37]">
                    Atmosfera Olfativa
                  </label>
                  <input
                    type="text"
                    value={formData.atmosphere}
                    onChange={(e) => setFormData({ ...formData, atmosphere: e.target.value })}
                    placeholder="Ex: A elegância magnética de uma noite inesquecível em Paris."
                    className="w-full bg-black/60 border border-white/20 text-white text-xs px-3.5 py-2.5 rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xs shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'SALVAR ALTERAÇÕES' : 'SALVAR NOVO PERFUME'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: JSON BACKUP / RAW EDITOR */}
          {activeTab === 'json' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-editorial text-2xl text-white">
                    Editor de Código JSON do Catálogo
                  </h3>
                  <p className="text-xs text-white/60 font-mono-subtle">
                    Você pode colar uma lista inteira de perfumes ou copiar o código para backup.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(jsonText);
                      showToast('JSON copiado para a área de transferência!');
                    }}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider rounded-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </button>
                  <button
                    onClick={handleApplyJson}
                    className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#121110] font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Aplicar JSON</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={16}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full bg-black/80 border border-white/20 text-green-400 font-mono text-xs p-4 rounded-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                placeholder="Cole o array JSON de perfumes aqui..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
