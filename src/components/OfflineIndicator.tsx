import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 px-4 py-2 text-xs font-sans text-[#F4F0E9] shadow-2xl backdrop-blur-md animate-bounce">
      <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
      <WifiOff className="w-3.5 h-3.5 text-[#D4AF37]" />
      <span>Modo Offline — Catálogo Máximo em cache ativo.</span>
    </div>
  );
};
