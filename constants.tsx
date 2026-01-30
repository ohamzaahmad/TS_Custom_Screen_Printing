


import React from 'react';
import { BRAND_COLORS } from './brandColors';

interface LogoProps {
  className?: string;
  subtitleAlwaysVisible?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 md:h-10", subtitleAlwaysVisible = false }) => {
  // Always use the provided PNG logo from the `public` folder.
  // Wrapper controls the height so image preserves its aspect ratio.
  return (
    <div className={`flex items-center transition-transform duration-300 hover:scale-105 group select-none ${className}`}>
      <img src="/logo.png" alt="TS Custom Screen Printing" className="site-logo" loading="eager" />
      <div className={`ml-2 logo-subtitle ${subtitleAlwaysVisible ? 'flex flex-col items-start text-[10px]' : 'hidden md:flex md:flex-col md:items-start md:text-[10px]'}`}>
        <span className="logo-subtitle-top uppercase font-black tracking-[0.15em]">CUSTOM SCREEN</span>
        <span className="logo-subtitle-bottom uppercase font-black tracking-[0.15em]">PRINTING</span>
      </div>
    </div>
  );
};
