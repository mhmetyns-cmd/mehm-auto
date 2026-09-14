import React from 'react';

interface LicensePlateProps {
  plate?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LicensePlate: React.FC<LicensePlateProps> = ({
  plate = '34 MMT 34',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      wrapper: 'h-6 rounded-[3px] border-[1.5px] border-black shadow-md',
      blueBand: 'w-4 text-[8px] py-0.5',
      text: 'text-[11px] px-2 font-black tracking-wider',
    },
    md: {
      wrapper: 'h-7 sm:h-8 rounded-[4px] border-2 border-black shadow-lg',
      blueBand: 'w-5 text-[9px] py-0.5',
      text: 'text-xs sm:text-sm px-2.5 font-black tracking-widest',
    },
    lg: {
      wrapper: 'h-9 sm:h-10 rounded-[5px] border-2 border-black shadow-xl',
      blueBand: 'w-6 sm:w-7 text-[10px] py-1',
      text: 'text-sm sm:text-base px-3 sm:px-4 font-black tracking-widest',
    },
  }[size];

  return (
    <div
      title={`Araç Plakası: ${plate}`}
      className={`inline-flex items-stretch bg-white select-none overflow-hidden font-mono shadow-black/50 ${sizeStyles.wrapper} ${className}`}
    >
      {/* Turkish Flag TR Blue Band */}
      <div
        className={`bg-[#003399] flex flex-col items-center justify-center text-white font-sans font-black tracking-tighter leading-none shrink-0 ${sizeStyles.blueBand}`}
      >
        <span className="text-[7px] leading-none mb-0.5 opacity-90">★</span>
        <span>TR</span>
      </div>

      {/* Embossed License Plate Text */}
      <div
        className={`flex items-center justify-center bg-white text-gray-950 font-mono whitespace-nowrap uppercase font-black ${sizeStyles.text}`}
      >
        {plate}
      </div>
    </div>
  );
};
