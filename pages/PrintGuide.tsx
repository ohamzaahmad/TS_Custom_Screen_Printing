
import React from 'react';

type GarmentType = 'tee' | 'polo' | 'vneck' | 'tank' | 'hoodie' | 'zip-up' | 'sweatshirt' | 'sleeve-long' | 'sleeve-short' | 'infant' | 'pocket-tee';

interface ShirtDiagramProps {
  type: GarmentType;
  w: string;
  h: string;
  t: string;
  l: string;
  label: string;
  subLabel?: string;
  isMaxPrint?: boolean;
  isStandardBoundary?: boolean;
  isBackView?: boolean;
}

const GarmentSVG = ({ type, isBackView }: { type: GarmentType; isBackView?: boolean }) => {
  // Common paths for reusable parts
  const teeBody = "M20 20 L35 5 L65 5 L80 20 L80 95 L20 95 Z";
  const teeSleeves = "M20 20 L5 35 L15 45 L20 40 M80 20 L95 35 L85 45 L80 40";
  
  switch (type) {
    case 'polo':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M20 22 L35 12 L45 18 L50 15 L55 18 L65 12 L80 22 L80 95 L20 95 Z" />
          <path d="M46 18 L46 38 L54 38 L54 18" fill="white" />
          <path d="M20 22 L5 32 L12 42 L20 38 M80 22 L95 32 L88 42 L80 38" />
          <circle cx="50" cy="22" r="1" fill="#94a3b8" />
          <circle cx="50" cy="28" r="1" fill="#94a3b8" />
          <circle cx="50" cy="34" r="1" fill="#94a3b8" />
        </svg>
      );
    case 'vneck':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M20 20 L38 5 L50 22 L62 5 L80 20 L80 95 L20 95 Z" />
          <path d={teeSleeves} />
        </svg>
      );
    case 'tank':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M30 5 C30 5 35 25 50 25 C65 25 70 5 70 5 L82 5 L82 95 L18 95 L18 5 Z" />
          <path d="M30 5 L18 5 L18 35 C18 35 25 22 30 22 Z" />
          <path d="M70 5 L82 5 L82 35 C82 35 75 22 70 22 Z" />
        </svg>
      );
    case 'zip-up':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M20 20 L35 5 L65 5 L80 20 L80 95 L20 95 Z" />
          <path d="M50 5 L50 95" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M30 75 L70 75 L75 90 L25 90 Z" fill="white" />
          <path d="M35 5 L30 0 L70 0 L65 5" fill="#e2e8f0" />
          <path d={teeSleeves} />
        </svg>
      );
    case 'hoodie':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M20 20 L35 5 L65 5 L80 20 L80 95 L20 95 Z" />
          <path d="M30 75 L70 75 L75 90 L25 90 Z" fill="white" />
          <path d="M35 5 L30 0 L70 0 L65 5" fill="#e2e8f0" />
          <path d={teeSleeves} />
        </svg>
      );
    case 'sleeve-long':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-100 fill-current">
          <path d="M35 10 L65 10 L75 90 L25 90 Z" className="text-slate-200" />
          <path d="M25 80 L75 80" fill="none" stroke="#cbd5e1" strokeWidth="4" />
        </svg>
      );
    case 'sleeve-short':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-100 fill-current">
          <path d="M30 20 L70 20 L85 60 L15 60 Z" className="text-slate-200" />
          <path d="M15 55 L85 55" fill="none" stroke="#cbd5e1" strokeWidth="3" />
        </svg>
      );
    case 'infant':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d="M30 15 L70 15 L80 30 L80 75 C80 90 20 90 20 75 L20 30 Z" />
          <path d="M35 90 L50 98 L65 90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M30 15 L20 25 L25 35 L30 30" />
          <path d="M70 15 L80 25 L75 35 L70 30" />
        </svg>
      );
    case 'pocket-tee':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d={teeBody} />
          <path d="M22 35 L38 35 L38 55 L30 62 L22 55 Z" fill="white" stroke="#94a3b8" />
          <path d={teeSleeves} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-200 fill-current stroke-slate-300 stroke-[0.5]">
          <path d={teeBody} />
          <path d={teeSleeves} />
        </svg>
      );
  }
};

const ShirtDiagram = ({ type, w, h, t, l, label, subLabel, isMaxPrint, isStandardBoundary, isBackView }: ShirtDiagramProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-square bg-white border border-slate-100 rounded-[2rem] overflow-hidden mb-6 group hover:border-purple-200 transition-all shadow-sm">
        {/* Technical Grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-10 h-full w-full">
            {[...Array(10)].map((_, i) => <div key={i} className="border-r border-slate-300"></div>)}
          </div>
          <div className="grid grid-rows-10 h-full w-full absolute inset-0">
            {[...Array(10)].map((_, i) => <div key={i} className="border-b border-slate-300"></div>)}
          </div>
        </div>

        {/* Center vertical reference line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 opacity-20 border-dashed"></div>

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <GarmentSVG type={type} isBackView={isBackView} />
        </div>
        
        {/* Red boundary line (Max area indicator) */}
        {(isMaxPrint || isStandardBoundary) && (
          <div 
            className="absolute border border-red-500 border-dashed transition-all"
            style={{ 
              width: isMaxPrint ? '55%' : '40%', 
              height: isMaxPrint ? '65%' : '50%', 
              top: '25%', 
              left: isMaxPrint ? '22.5%' : '30%'
            }}
          />
        )}

        {/* Print Area Block */}
        <div 
          className="absolute border-[1.5px] border-sky-400 bg-sky-400/40 flex items-center justify-center transition-all duration-700"
          style={{ width: w, height: h, top: t, left: l }}
        >
          <div className="bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded shadow-sm border border-sky-200 scale-75">
            <span className="text-[7px] font-black text-sky-700 uppercase tracking-tighter whitespace-nowrap">Print Area</span>
          </div>
        </div>
      </div>
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1 text-center">{label}</h4>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center leading-tight max-w-[200px]">{subLabel}</p>
    </div>
  );
};

const PrintGuide: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 leading-none tracking-tighter uppercase">
            PLACEMENT <span className="text-gradient-orange">BLUEPRINT</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            Technical standards for precision screen printing. All measurements are based on industry standards for adult unisex garments.
          </p>
        </div>

        {/* T-Shirt Section */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">STANDARD T-SHIRT</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Fix: use single quotes for subLabel attribute values to avoid double-quote escaping issues in JSX */}
            <ShirtDiagram type="tee" label="Full Front" subLabel='11"W x 15"H (3" DOWN)' w="40%" h="50%" t="28%" l="30%" />
            <ShirtDiagram type="tee" label="Full Back" subLabel='11"W x 15"H (3" DOWN)' w="40%" h="50%" t="28%" l="30%" />
            <ShirtDiagram type="tee" label="Center Chest" subLabel='11"W x 6"H (2.5" DOWN)' w="40%" h="18%" t="22%" l="30%" />
            <ShirtDiagram type="tee" label="Center Chest (Max)" subLabel='MAX WIDTH: 12.5"' w="50%" h="22%" t="25%" l="25%" isStandardBoundary />
            <ShirtDiagram type="tee" label="Max Print" subLabel='UP TO 12"W x 16"H' w="52%" h="60%" t="26%" l="24%" isMaxPrint />
          </div>
        </section>

        {/* Specialty Garments */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">SPECIALTY & FASHION</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Fix: use single quotes for subLabel attribute values to avoid double-quote escaping issues in JSX */}
            <ShirtDiagram type="polo" label="Polo Left Chest" subLabel='3.5"W x 4"H' w="15%" h="12%" t="32%" l="55%" />
            <ShirtDiagram type="polo" label="Polo L/R Chests" subLabel="DUAL PLACEMENT" w="15%" h="12%" t="32%" l="27%" />
            <ShirtDiagram type="vneck" label="V-Neck Front" subLabel='1.5" DOWN FROM V' w="35%" h="40%" t="35%" l="32.5%" />
            <ShirtDiagram type="pocket-tee" label="Above Pocket" subLabel='3"W x 2.5"H' w="15%" h="8%" t="24%" l="22%" />
            <ShirtDiagram type="tank" label="Racerback Nape" subLabel="BACK TAG AREA" w="12%" h="12%" t="18%" l="44%" />
          </div>
        </section>

        {/* Sweatshirts & Hoodies */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">SWEATS & HOODIES</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Fix: use single quotes for subLabel attribute values to avoid double-quote escaping issues in JSX */}
            <ShirtDiagram type="hoodie" label="Pullover Front" subLabel='MAX 12"W x 10"H' w="40%" h="35%" t="32%" l="30%" />
            <ShirtDiagram type="hoodie" label="Pullover (Large)" subLabel="MAX ABOVE POCKET" w="45%" h="40%" t="30%" l="27.5%" isStandardBoundary />
            <ShirtDiagram type="zip-up" label="Zip-Up Split" subLabel='6"W x 10"H (SIDE)' w="18%" h="35%" t="32%" l="27%" />
            <ShirtDiagram type="zip-up" label="Zip-Up L/R" subLabel="DUAL SIDES" w="18%" h="35%" t="32%" l="55%" />
            <ShirtDiagram type="sweatshirt" label="Sweatshirt Front" subLabel="STANDARD FRONT" w="40%" h="40%" t="28%" l="30%" />
          </div>
        </section>

        {/* Details & Accessories */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">SLEEVES, TAGS & INFANT</h2>
            <div className="h-px flex-grow bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Fix: use single quotes for subLabel attribute values to avoid double-quote escaping issues in JSX */}
            <ShirtDiagram type="sleeve-short" label="Short Sleeve" subLabel="CENTERED ON SLEEVE" w="30%" h="25%" t="35%" l="35%" />
            <ShirtDiagram type="sleeve-long" label="Long Sleeve" subLabel='3"W x 11"H' w="30%" h="55%" t="25%" l="35%" />
            <ShirtDiagram type="tee" label="Nape / Back Tag" subLabel='3" x 3" (CENTERED)' w="12%" h="12%" t="15%" l="44%" isBackView />
            <ShirtDiagram type="infant" label="Infant Onesie" subLabel='3.5"W x 6"H' w="25%" h="30%" t="35%" l="37.5%" />
            <ShirtDiagram type="tee" label="Ladies Fashion" subLabel='9.5"W x 15"H' w="32%" h="45%" t="28%" l="34%" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrintGuide;
