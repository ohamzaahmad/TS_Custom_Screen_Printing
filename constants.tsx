import React from "react";

export interface LogoProps {
  className?: string;
  subtitleAlwaysVisible?: boolean;
  isDarkBg?: boolean;
  isScrolled?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  subtitleAlwaysVisible = true,
  isDarkBg = false,
  isScrolled = false,
}) => {
  // Determine text color based on backdrop state
  const isLightText = !isScrolled && isDarkBg;

  return (
    <div
      className={`flex items-center gap-2.5 sm:gap-3.5 group select-none transition-transform duration-200 ${className}`}
    >
      {/* High-Resolution ST Monogram Mark */}
      <img
        src="/logo.png"
        alt="ST Custom Screen Printing"
        className="site-logo shrink-0 transition-transform duration-300 group-hover:scale-105"
        loading="eager"
      />

      {/* Brand Typography Lockup: Perfectly Justified Custom Screen Printing */}
      <div
        className={`flex flex-col justify-center leading-none ${
          subtitleAlwaysVisible ? "flex" : "hidden sm:flex"
        }`}
      >
        <span
          className={`font-display font-extrabold uppercase text-[15px] sm:text-[18px] md:text-[20px] tracking-[0.05em] whitespace-nowrap transition-colors duration-200 ${
            isLightText ? "text-white" : "text-slate-950"
          }`}
        >
          CUSTOM SCREEN
        </span>
        {/* Mathematically flush justified PRINTING: 0px offset on left and right */}
        <div
          role="text"
          aria-label="PRINTING"
          className={`flex justify-between w-full font-display font-black uppercase text-[11px] sm:text-[13px] md:text-[14px] transition-colors duration-200 mt-0.5 select-none ${
            isLightText ? "text-orange-400" : "text-orange-600"
          }`}
        >
          <span>P</span>
          <span>R</span>
          <span>I</span>
          <span>N</span>
          <span>T</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
