import React from 'react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#121110] text-[#EAE3D9] w-full py-2 px-4 flex items-center justify-center text-center z-50 relative border-b border-[#EAE3D9]/10">
      <p className="font-mono-subtle text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
        Envio para todo o Brasil
      </p>
    </div>
  );
};
