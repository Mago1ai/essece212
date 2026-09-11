import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Share2, PlusSquare, X, Sparkles, Check, ChevronRight } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installing, setInstalling] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setInstalling(true);
    const success = await install();
    setInstalling(false);
    if (success) {
      setInstalledSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-[#181614] border border-[#D4AF37]/30 shadow-2xl p-6 md:p-8 text-[#F4F0E9] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#F4F0E9]/60 hover:text-[#F4F0E9] hover:bg-white/5 transition"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* App Icon & Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#944B10] to-[#141210] shadow-xl shadow-black/60 flex items-center justify-center">
              <img 
                src="/icon.svg" 
                alt="Ícone Máximo Perfumaria" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#D4AF37] text-[#141210] p-1 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-medium font-sans">
            Experiência Mobile PWA
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[#F4F0E9] mt-1 mb-2 font-light">
            Instalar <span className="italic font-normal">Máximo</span> no Celular
          </h3>
          <p className="text-xs text-[#F4F0E9]/70 leading-relaxed font-sans max-w-xs mb-6">
            Acesse nosso acervo de alta perfumaria direto da sua tela inicial, com navegação fluida em tela cheia e resposta instantânea.
          </p>
        </div>

        {/* Status / Actions */}
        {installedSuccess ? (
          <div className="p-4 rounded-xl bg-[#25221E] border border-[#D4AF37]/40 text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#F4F0E9]">Aplicativo instalado com sucesso!</p>
            <p className="text-xs text-[#F4F0E9]/60">Verifique a tela de início do seu aparelho.</p>
          </div>
        ) : isInstallable ? (
          <div className="space-y-3">
            <button
              onClick={handleInstallClick}
              disabled={installing}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA7C11] text-[#141210] font-sans font-semibold text-sm tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {installing ? 'Instalando...' : 'Instalar Aplicativo Agora'}
            </button>
            <p className="text-[11px] text-center text-[#F4F0E9]/50">
              Sem precisar baixar da Play Store · Leve e seguro
            </p>
          </div>
        ) : isIOS ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#201D1A] border border-white/10 text-xs space-y-3">
              <p className="font-medium text-[#D4AF37] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" /> Como instalar no iPhone ou iPad:
              </p>
              <ol className="space-y-2.5 text-[#F4F0E9]/80 pl-1 list-none font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center text-[#D4AF37]">1</span>
                  <span>Toque no botão <strong>Compartilhar</strong> (<Share2 className="w-3.5 h-3.5 inline mx-0.5 text-[#D4AF37]" />) na barra inferior do Safari.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center text-[#D4AF37]">2</span>
                  <span>Role a tela e toque em <strong>"Adicionar à Tela de Início"</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-[#D4AF37]" />).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center text-[#D4AF37]">3</span>
                  <span>Confirme em <strong>Adicionar</strong> no canto superior direito.</span>
                </li>
              </ol>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-white/10 text-xs text-[#F4F0E9]/70 hover:bg-white/5 transition"
            >
              Entendi, obrigado
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#201D1A] border border-white/10 text-xs text-center space-y-2">
              <p className="text-[#D4AF37] font-medium">Como adicionar no seu navegador:</p>
              <p className="text-[#F4F0E9]/70 leading-relaxed font-sans">
                Abra o menu de opções do navegador (três pontos no topo/rodapé) e selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 text-xs text-[#F4F0E9] hover:bg-white/15 transition"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
