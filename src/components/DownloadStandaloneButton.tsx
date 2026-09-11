import React, { useState } from 'react';
import { Download, Check, Code, Sparkles } from 'lucide-react';
import { downloadStandaloneHtml } from '../utils/standaloneHtml';

export function DownloadStandaloneButton() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadStandaloneHtml();
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 3500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      <button
        id="btn-download-standalone-html"
        onClick={handleDownload}
        title="Baixar código HTML completo e autossuficiente (.html)"
        className={`group flex items-center gap-2.5 px-4 py-3 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.4)] border backdrop-blur-md active:scale-95 ${
          downloaded
            ? 'bg-emerald-600 text-white border-emerald-400'
            : 'bg-[#24221F]/95 dark:bg-[#D4AF37] hover:bg-[#A96227] dark:hover:bg-[#C29D29] text-[#F4F0E9] dark:text-[#121110] border-white/20 dark:border-black/20'
        }`}
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 text-white" />
            <span>ARQUIVO HTML BAIXADO!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">BAIXAR CÓDIGO HTML COMPLETO (.HTML)</span>
            <span className="sm:hidden">BAIXAR .HTML</span>
          </>
        )}
      </button>
    </div>
  );
}
