
import React, { useState, useEffect } from 'react';
import { fetchInks } from '../services/dataService';

interface ColorSwatchProps {
  name: string;
  pantone: string;
  hex: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, pantone, hex }) => {
  const isWhite = name.toLowerCase() === 'white';
  const isLight = ['white', 'lemon yellow', 'primrose', 'flesh', 'light gray', 'fluorescent yellow'].includes(name.toLowerCase());

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100">
      <div 
        className={`h-24 md:h-32 w-full flex items-end p-4 transition-transform duration-500 group-hover:scale-[1.02] ${isWhite ? 'border-b border-slate-100' : ''}`}
        style={{ backgroundColor: hex }}
      >
        <div className={`flex flex-col ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <span className="text-sm md:text-lg font-black uppercase tracking-tighter leading-none mb-1">{name}</span>
          <span className="text-[9px] md:text-[11px] font-bold opacity-80 uppercase tracking-widest">{pantone}</span>
        </div>
      </div>
    </div>
  );
};

const ColorGuide: React.FC = () => {
  const [inks, setInks] = useState<any>({ stock: [], additional: [] });

  useEffect(() => {
    fetchInks().then(setInks);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 leading-none tracking-tighter uppercase">
            INK COLOR <span className="text-gradient-orange">GUIDE</span>
          </h1>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-xs md:text-sm text-orange-800 font-bold uppercase tracking-widest leading-relaxed">
              <span className="text-orange-600 mr-2">IMPORTANT:</span> 
              The colors shown are only approximated on any monitor. Color appearance may vary from computer to computer depending on color, contrast, and brightness settings. We highly suggest referring to a Pantone Solid Coated book when picking final colors.
            </p>
          </div>
        </div>

        <section className="mb-24">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">STOCK COLORS</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inks.stock.map((c: any, i: number) => (
              <ColorSwatch key={i} {...c} />
            ))}
          </div>
        </section>

        {inks.additional.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">ADDITIONAL COLORS</h2>
              <div className="h-px flex-grow bg-slate-200"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {inks.additional.map((c: any, i: number) => (
                <ColorSwatch key={i} {...c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ColorGuide;
