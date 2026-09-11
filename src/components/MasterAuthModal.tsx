import React, { useState } from 'react';
import { Lock, KeyRound, X, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

interface MasterAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MasterAuthModal: React.FC<MasterAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Default accepted passwords for the owner
  const VALID_PASSWORDS = ['maximo2026', 'admin123', 'afmkt', 'maximo', '123456'];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PASSWORDS.includes(password.trim().toLowerCase())) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div
      id="master-auth-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="master-auth-modal"
        className="w-full max-w-md bg-[#181614] border border-[#D4AF37]/40 text-[#F4F0E9] rounded-xs shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-7 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 mx-auto flex items-center justify-center text-[#D4AF37]">
            <Lock className="w-6 h-6" />
          </div>
          <span className="font-mono-subtle text-[11px] tracking-[0.26em] text-[#D4AF37] uppercase block font-semibold">
            ÁREA RESTRITA · EASTER EGG
          </span>
          <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white font-normal">
            Painel Master Administrativo
          </h3>
          <p className="font-sans-clean text-xs sm:text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
            Digite a senha de administrador para gerenciar o catálogo, adicionar ou editar perfumes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono-subtle uppercase tracking-widest text-white/80">
              Senha de Acesso
            </label>
            <div className="relative flex items-center">
              <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3 pointer-events-none" />
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Digite a senha master..."
                className={`w-full bg-black/60 border ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-[#D4AF37]'
                } text-white text-sm pl-10 pr-4 py-3 rounded-xs placeholder:text-white/30 focus:outline-none transition-colors`}
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Senha incorreta. Tente "maximo2026" ou "admin123".
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C29D29] text-[#141210] font-bold text-xs tracking-[0.2em] uppercase transition-all duration-200 rounded-xs shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ACESSAR PAINEL MASTER</span>
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-white/10">
          <p className="text-[11px] text-white/40 font-mono-subtle">
            Dica do Administrador: senha padrão <span className="text-[#D4AF37]">maximo2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};
