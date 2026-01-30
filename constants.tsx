
import React, { useState } from 'react';

export const BRAND_COLORS = {
  purple: '#BD00FF', // Magenta/Purple from T
  deepPurple: '#2E005C', // Dark Purple from T base
  orange: '#FF8A00', // Orange from S
  yellow: '#FFC700', // Yellow from S top
  dark: '#0A0015' // Near black for text
};

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 md:h-10" }) => {
  // Always use the provided PNG logo from the `public` folder.
  // Wrapper controls the height so image preserves its aspect ratio.
  return (
    <div className={`flex items-center justify-center transition-transform duration-300 hover:scale-105 group select-none ${className}`}>
      <img src="/logo.png" alt="TS Custom Screen Printing" className="site-logo" loading="eager" />
    </div>
  );
};
