import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { Smartphone, Download, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'footer' | 'minimal';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'header',
  className = ''
}) => {
  const { isInstalled } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  // If app is already installed in standalone mode, hide the install button
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={() => setModalOpen(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-[#1E1B17] text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#2A2621] transition shadow-sm ${className}`}
          title="Instalar App no Celular / Computador"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline">Instalar App</span>
        </button>
      )}

      {variant === 'floating' && (
        <button
          onClick={() => setModalOpen(true)}
          className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#181614] text-[#F4F0E9] border border-[#D4AF37]/50 shadow-2xl shadow-black/80 hover:scale-105 active:scale-95 transition-all group ${className}`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C4A10] p-0.5 flex items-center justify-center shadow">
            <img src="/icon.svg" alt="App" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="text-left pr-1 hidden xs:block">
            <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1 leading-none">
              <Sparkles className="w-2.5 h-2.5" /> App Máximo
            </div>
            <div className="text-[11px] text-[#F4F0E9]/90 font-light leading-tight">
              Instalar no Celular
            </div>
          </div>
          <Download className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
        </button>
      )}

      {variant === 'footer' && (
        <button
          onClick={() => setModalOpen(true)}
          className={`flex items-center gap-2 text-xs text-[#D4AF37] hover:text-[#F9E8B2] transition py-1 font-sans ${className}`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Instalar Aplicativo (PWA Mobile)</span>
        </button>
      )}

      {variant === 'minimal' && (
        <button
          onClick={() => setModalOpen(true)}
          className={`p-2 rounded-full text-[#F4F0E9]/80 hover:text-[#D4AF37] hover:bg-white/5 transition ${className}`}
          title="Instalar App no Celular"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      )}

      <PWAInstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
