
import React from 'react';

export const BRAND_COLORS = {
  purple: '#BD00FF', // Magenta/Purple from T
  deepPurple: '#2E005C', // Dark Purple from T base
  orange: '#FF8A00', // Orange from S
  yellow: '#FFC700', // Yellow from S top
  dark: '#0A0015' // Near black for text
};

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
  <div className={`flex items-center justify-center transition-transform duration-300 hover:scale-105 group select-none ${className}`}>
    <svg 
      viewBox="0 0 1200 450" 
      preserveAspectRatio="xMidYMid meet"
      className="w-auto h-full drop-shadow-lg"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="t-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BD00FF" />
          <stop offset="100%" stopColor="#2E005C" />
        </linearGradient>
        <linearGradient id="s-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC700" />
          <stop offset="100%" stopColor="#FF8A00" />
        </linearGradient>
        <linearGradient id="printing-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFC700" />
          <stop offset="100%" stopColor="#FF8A00" />
        </linearGradient>
      </defs>

      {/* The "T" Shape - Icon part */}
      <path 
        d="M60 20H340V120H245V360H155V120H60V20Z" 
        fill="url(#t-grad)" 
        className="group-hover:opacity-90 transition-opacity"
      />

      {/* The Intertwined "S" Shape - Icon part */}
      <path 
        d="M280 120C280 120 320 160 320 210C320 260 270 300 200 300C130 300 100 260 100 260L140 220C140 220 160 250 200 250C240 250 260 230 260 210C260 190 240 180 200 170C140 155 110 130 110 80C110 30 160 0 220 0C280 0 320 40 320 40L280 80C280 80 260 50 220 50C180 50 170 70 170 85C170 100 180 110 220 120C260 130 280 120 280 120Z" 
        fill="url(#s-grad)"
        style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }}
      />

      {/* TEXT: CUSTOM SCREEN - Positioned horizontally in front of the logo */}
      <text 
        x="380" 
        y="180" 
        textAnchor="start" 
        className="font-black" 
        style={{ fill: 'currentColor', fontSize: '90px', letterSpacing: '-0.02em', textTransform: 'uppercase' }}
      >
        CUSTOM SCREEN
      </text>

      {/* TEXT: PRINTING - Positioned horizontally in front of the logo */}
      <text 
        x="380" 
        y="280" 
        textAnchor="start" 
        className="font-black" 
        style={{ fill: 'url(#printing-grad)', fontSize: '110px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
      >
        PRINTING
      </text>
    </svg>
  </div>
);
