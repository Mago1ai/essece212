import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="relative w-full bg-[#EAE3D9] dark:bg-[#121110] text-[#24221F] dark:text-[#F5F2EB] py-24 sm:py-32 border-b border-[#24221F]/8 dark:border-white/10 transition-colors duration-500"
    >
      <div className="max-w-xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Large Monogram Circle with Initials "M" */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#24221F]/20 dark:border-white/15 flex flex-col items-center justify-center mb-6 sm:mb-8 bg-[#F4F0E9]/80 dark:bg-[#1A1816] shadow-xs">
          <span className="font-signature text-2xl sm:text-3xl text-[#24221F] dark:text-[#F5F2EB] font-normal leading-none" style={{ fontStyle: 'italic' }}>
            M
          </span>
          <span className="font-mono-subtle text-[7px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase mt-0.5">
            MÁXIMO
          </span>
        </div>

        {/* Micro-Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
          <span className="font-mono-subtle text-[10px] sm:text-[11px] tracking-[0.28em] text-[#A96227] dark:text-[#D4AF37] uppercase">
            CORRESPONDÊNCIA PRIVADA
          </span>
          <div className="w-8 h-[1px] bg-[#A96227]/40 dark:bg-[#D4AF37]/40" />
        </div>

        {/* Heading */}
        <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-[-0.01em] mb-5">
          Cartas do <span className="italic font-normal text-[#A96227] dark:text-[#D4AF37]">Atelier.</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans-clean text-base sm:text-lg text-[#24221F]/75 dark:text-[#F5F2EB]/75 font-light leading-relaxed max-w-md mb-8">
          Anotações sobre matérias-primas raras, o processo de criação de novos acordes e acesso prioritário aos lotes limitados.
        </p>

        {/* Form or Success State */}
        <div className="w-full max-w-md">
          {isSubmitted ? (
            <div
              id="newsletter-success-feedback"
              className="p-6 bg-[#F4F0E9] dark:bg-[#1A1816] border border-[#A96227]/30 dark:border-[#D4AF37]/30 text-center animate-in fade-in duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-[#A96227]/10 dark:bg-[#D4AF37]/15 text-[#A96227] dark:text-[#D4AF37] flex items-center justify-center mx-auto mb-3">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-serif-editorial text-2xl text-[#24221F] dark:text-[#F5F2EB]">
                Você está no círculo Máximo.
              </p>
              <p className="font-mono-subtle text-xs text-[#24221F]/60 dark:text-[#F5F2EB]/60 mt-1">
                Enviamos correspondências discretas, apenas quando há algo digno de ser partilhado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Seu endereço de e-mail"
                  className="w-full bg-[#F4F0E9] dark:bg-[#1A1816] border border-[#24221F]/20 dark:border-white/20 text-[#24221F] dark:text-[#F5F2EB] placeholder-[#24221F]/40 dark:placeholder-[#F5F2EB]/40 px-5 py-3.5 font-mono-subtle text-xs tracking-wider focus:outline-none focus:border-[#24221F] dark:focus:border-[#D4AF37] transition-colors rounded-none"
                  aria-label="Endereço de e-mail para newsletter"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="absolute right-1.5 px-4 py-2.5 bg-[#24221F] dark:bg-[#D4AF37] hover:bg-[#A96227] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] text-[11px] font-mono-subtle tracking-[0.16em] uppercase font-medium transition-colors flex items-center gap-1.5"
                  aria-label="Confirmar inscrição"
                >
                  <span>Receber</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {errorMessage && (
                <p className="font-mono-subtle text-[11px] text-red-700 dark:text-red-400 text-left pl-1">
                  {errorMessage}
                </p>
              )}

              <p className="font-mono-subtle text-[10px] text-[#24221F]/50 dark:text-[#F5F2EB]/50 text-center pt-1">
                Privacidade garantida. Cancele quando desejar.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
