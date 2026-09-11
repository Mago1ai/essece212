import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Truck,
  QrCode,
  Copy,
  Check,
  User,
} from 'lucide-react';
import { CartItem } from '../types';
import { createWhatsAppLink, BRAND_INFO } from '../data/perfumes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (perfumeId: string, quantity: number) => void;
  onRemoveItem: (perfumeId: string) => void;
  enablePixCheckout?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  enablePixCheckout = true,
}) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'pix'>('whatsapp');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);

  // Chave Pix configurável da loja
  const pixKey = '31975394776';
  const pixReceiverName = 'Máximo Eau de Parfum';

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.perfume.priceNumeric * item.quantity,
    0
  );

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.perfume.name}* (${item.perfume.brand} · ${item.size || item.perfume.size})\n   - Quantidade: ${item.quantity} un\n   - Valor Unitário: ${item.perfume.price}\n   - Subtotal: R$ ${(item.perfume.priceNumeric * item.quantity).toFixed(2).replace('.', ',')}`
      )
      .join('\n\n');

    const addressText = customerAddress.trim()
      ? `\n📍 *Endereço de Entrega:* ${customerAddress.trim()}`
      : '\n📍 *Endereço de Entrega:* (Combinar no chat)';

    const nameText = customerName.trim()
      ? `\n👤 *Nome do Cliente:* ${customerName.trim()}`
      : '';

    const message = `Olá! Gostaria de finalizar meu pedido na *Máximo Eau de Parfum*:

📦 *ITENS DA SACOLA:*
${itemsList}

💰 *VALOR TOTAL:* R$ ${subtotal.toFixed(2).replace('.', ',')}
🚚 *Frete:* Cortesia Inclusa para todo o Brasil${nameText}${addressText}

Por favor, confirmem a disponibilidade dos itens e as orientações para envio.`;

    window.open(createWhatsAppLink(message, BRAND_INFO.phoneWhatsApp), '_blank', 'noopener,noreferrer');
  };

  const handlePixWhatsAppConfirmation = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `· ${item.quantity}x ${item.perfume.name} (${item.size}) - ${item.perfume.price}`
      )
      .join('\n');

    const message = `Olá! Realizei o pagamento PIX no valor de R$ ${subtotal
      .toFixed(2)
      .replace('.', ',')} para o pedido:\n\n${itemsList}\n\n${customerName ? `Nome: ${customerName}\n` : ''}${
      customerAddress ? `Endereço: ${customerAddress}\n` : ''
    }Envio o comprovante a seguir.`;

    window.open(createWhatsAppLink(message, BRAND_INFO.phoneWhatsApp), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/65 dark:bg-black/85 backdrop-blur-xs flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#F4F0E9] dark:bg-[#161513] text-[#24221F] dark:text-[#F5F2EB] h-full shadow-2xl flex flex-col justify-between border-l border-[#24221F]/15 dark:border-white/10 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-[#24221F]/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <span className="font-mono-subtle text-[10px] tracking-[0.24em] text-[#A96227] dark:text-[#D4AF37] uppercase block">
              SACOLA DE COMPRAS
            </span>
            <h3 className="font-serif-editorial text-2xl text-[#24221F] dark:text-[#F5F2EB]">
              Seus Frascos ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-2 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] transition-colors focus:outline-none rounded-full"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#EAE3D9] dark:bg-[#221F1C] flex items-center justify-center text-[#24221F]/40 dark:text-[#F5F2EB]/40">
                <Sparkles className="w-7 h-7 stroke-[1.5] text-[#A96227] dark:text-[#D4AF37]" />
              </div>
              <span className="font-serif-editorial text-3xl text-[#24221F]/50 dark:text-[#F5F2EB]/50 italic block">
                Sua sacola está vazia.
              </span>
              <p className="font-sans-clean text-xs text-[#24221F]/70 dark:text-[#F5F2EB]/70 max-w-xs mx-auto leading-relaxed">
                Explore o catálogo de perfumes e cosméticos nobres da Máximo Eau de Parfum e adicione seus produtos.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 border border-[#24221F] dark:border-white/20 font-mono-subtle text-xs tracking-[0.2em] uppercase hover:bg-[#24221F] hover:text-[#F4F0E9] dark:hover:bg-white dark:hover:text-[#121110] transition-all"
              >
                Ver Coleção
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Items List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.perfume.id}
                    id={`cart-item-${item.perfume.id}`}
                    className="group/item flex gap-4 p-3.5 bg-[#EAE3D9] dark:bg-[#1E1C1A] border border-[#24221F]/10 dark:border-white/10 transition-all duration-300 hover:border-[#A96227]/40 dark:hover:border-[#D4AF37]/50 hover:shadow-xs"
                  >
                    <div className="w-16 h-20 bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/10 dark:border-white/10 flex items-center justify-center p-1.5 overflow-hidden shrink-0 transition-transform duration-300 group-hover/item:scale-[1.02]">
                      <img
                        src={item.perfume.image}
                        alt={item.perfume.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (item.perfume.secondaryImage && (e.currentTarget.src !== item.perfume.secondaryImage)) {
                            e.currentTarget.src = item.perfume.secondaryImage;
                          }
                        }}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono-subtle text-[9px] text-[#A96227] dark:text-[#D4AF37] tracking-wider uppercase font-semibold">
                            {item.perfume.brand}
                          </span>
                          <h4 className="font-serif-editorial text-base sm:text-lg text-[#24221F] dark:text-[#F5F2EB] leading-tight">
                            {item.perfume.name}
                          </h4>
                          <span className="font-mono-subtle text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60">
                            {item.size} · {item.perfume.concentration}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.perfume.id)}
                          className="text-[#24221F]/40 dark:text-[#F5F2EB]/40 hover:text-red-700 dark:hover:text-red-400 hover:scale-110 active:scale-90 transition-all p-1"
                          aria-label={`Remover ${item.perfume.name}`}
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#24221F]/20 dark:border-white/20 bg-[#F4F0E9] dark:bg-[#161513] shadow-xs">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.perfume.id, item.quantity - 1)
                            }
                            className="p-1.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] hover:bg-black/5 dark:hover:bg-white/5 active:scale-90 transition-all"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-mono-subtle text-xs font-semibold text-[#24221F] dark:text-[#F5F2EB]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.perfume.id, item.quantity + 1)
                            }
                            className="p-1.5 text-[#24221F] dark:text-[#F5F2EB] hover:text-[#A96227] dark:hover:text-[#D4AF37] hover:bg-black/5 dark:hover:bg-white/5 active:scale-90 transition-all"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono-subtle text-sm text-[#24221F] dark:text-[#F5F2EB] font-bold">
                          R${' '}
                          {(item.perfume.priceNumeric * item.quantity)
                            .toFixed(2)
                            .replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info */}
              <div className="p-3.5 bg-[#E7DDD0] dark:bg-[#1E1C1A] border border-[#A96227]/20 dark:border-[#D4AF37]/20 space-y-1 font-mono-subtle text-xs text-[#24221F]/85 dark:text-[#F5F2EB]/85">
                <div className="flex items-center gap-2 text-[#A96227] dark:text-[#D4AF37] font-semibold">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Frete cortesia incluso para todo o Brasil.</span>
                </div>
                <div className="flex items-center gap-2 text-[#24221F]/70 dark:text-[#F5F2EB]/70 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                  <span>Acompanha amostra cortesia e embalagem de presente.</span>
                </div>
              </div>

              {/* Quick Customer Delivery Details Form */}
              <div className="p-4 bg-[#EAE3D9]/70 dark:bg-[#1A1816] border border-[#24221F]/10 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-subtle text-[10px] tracking-[0.2em] text-[#A96227] dark:text-[#D4AF37] uppercase font-medium flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    <span>DADOS DE ENTREGA (OPCIONAL)</span>
                  </span>
                  <span className="font-mono-subtle text-[9px] text-[#24221F]/50 dark:text-[#F5F2EB]/50">
                    Agiliza o pedido
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Seu Nome Completo"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/15 dark:border-white/15 px-3 py-2 text-xs font-sans-clean placeholder:text-[#24221F]/40 dark:placeholder:text-[#F5F2EB]/40 text-[#24221F] dark:text-[#F5F2EB] focus:outline-none focus:border-[#A96227] dark:focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Endereço, Bairro e Cidade/UF"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#F4F0E9] dark:bg-[#141311] border border-[#24221F]/15 dark:border-white/15 px-3 py-2 text-xs font-sans-clean placeholder:text-[#24221F]/40 dark:placeholder:text-[#F5F2EB]/40 text-[#24221F] dark:text-[#F5F2EB] focus:outline-none focus:border-[#A96227] dark:focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Selection & Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#24221F]/10 dark:border-white/10 space-y-4 bg-[#EAE3D9] dark:bg-[#141311]">
            {/* Subtotal Display */}
            <div className="flex items-baseline justify-between">
              <span className="font-mono-subtle text-xs tracking-[0.2em] text-[#24221F]/70 dark:text-[#F5F2EB]/70 uppercase">
                Subtotal da Sacola
              </span>
              <span className="font-mono-subtle text-2xl text-[#24221F] dark:text-[#F5F2EB] font-bold">
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Checkout Selector Tabs (WhatsApp vs PIX) */}
            {enablePixCheckout && (
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#F4F0E9] dark:bg-[#1E1C1A] border border-[#24221F]/15 dark:border-white/10 rounded-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('whatsapp')}
                  className={`py-2 text-[11px] font-mono-subtle tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'whatsapp'
                      ? 'bg-[#24221F] dark:bg-[#2A2622] text-[#F4F0E9] dark:text-[#D4AF37] shadow-xs font-semibold'
                      : 'text-[#24221F]/70 dark:text-[#F5F2EB]/70 hover:text-[#24221F] dark:hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                  <span>Via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pix')}
                  className={`py-2 text-[11px] font-mono-subtle tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'pix'
                      ? 'bg-[#24221F] dark:bg-[#2A2622] text-[#F4F0E9] dark:text-[#D4AF37] shadow-xs font-semibold'
                      : 'text-[#24221F]/70 dark:text-[#F5F2EB]/70 hover:text-[#24221F] dark:hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-[#A96227] dark:text-[#D4AF37]" />
                  <span>Pagar via Pix</span>
                </button>
              </div>
            )}

            {/* Tab 1: Primary WhatsApp Checkout (Active Default) */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-2">
                <button
                  id="whatsapp-order-checkout-btn"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 bg-[#24221F] hover:bg-[#121110] dark:bg-[#D4AF37] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] font-mono-subtle text-xs tracking-[0.22em] uppercase transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-center gap-3 group font-bold"
                >
                  <MessageCircle className="w-4 h-4 text-[#A96227] dark:text-[#121110] group-hover:scale-110 transition-transform" />
                  <span>FINALIZAR VIA WHATSAPP</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-center font-mono-subtle text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60">
                  Envia a lista para o número oficial (31) 97539-4776 com confirmação imediata.
                </p>
              </div>
            )}

            {/* Tab 2: PIX Checkout Tab (Configurable) */}
            {activeTab === 'pix' && enablePixCheckout && (
              <div className="p-4 bg-[#F4F0E9] dark:bg-[#1E1C1A] border border-[#24221F]/15 dark:border-white/10 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono-subtle text-[10px] text-[#A96227] dark:text-[#D4AF37] uppercase tracking-wider block font-semibold">
                      CHAVE PIX OFICIAL (CELULAR)
                    </span>
                    <p className="font-mono text-xs text-[#24221F] dark:text-[#F5F2EB] font-bold mt-0.5">
                      {pixKey}
                    </p>
                    <span className="font-sans-clean text-[10px] text-[#24221F]/60 dark:text-[#F5F2EB]/60">
                      Favorecido: {pixReceiverName}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyPix}
                    className="px-3 py-2 bg-[#24221F] dark:bg-[#D4AF37] hover:bg-[#A96227] dark:hover:bg-[#C29D29] text-white dark:text-[#121110] font-mono-subtle text-[10px] tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-xs font-semibold"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400 dark:text-[#121110]" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Chave</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 border-t border-[#24221F]/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono-subtle">
                  <span className="text-[#24221F]/70 dark:text-[#F5F2EB]/70">Valor exato:</span>
                  <span className="font-bold text-[#24221F] dark:text-[#D4AF37]">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={handlePixWhatsAppConfirmation}
                  className="w-full py-3 bg-[#A96227] dark:bg-[#C97D3E] hover:bg-[#8F511E] text-white font-mono-subtle text-[11px] tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 shadow-sm font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>ENVIAR COMPROVANTE WHATSAPP</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
