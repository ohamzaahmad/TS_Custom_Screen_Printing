
import React from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in">
      {/* Cinematic Hero - Brand Entry */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[200px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-orange-600/10 blur-[200px] rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=2000" 
            alt="TS Brand Atmosphere"
            className="w-full h-full object-cover opacity-20 mix-blend-screen scale-110 motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 md:pt-16">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-dark text-white/90 text-[9px] font-black uppercase tracking-[0.5em] mb-12 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shadow-[0_0_12px_rgba(189,0,255,0.8)]"></span>
              EST. 2018 | THE GOLD STANDARD
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tight uppercase select-none">
              A CULTURE OF<br />
              <span className="text-gradient-orange italic font-extrabold">PRECISION.</span>
            </h1>
            
            <p className="text-base md:text-lg text-white/40 mb-10 leading-relaxed font-medium max-w-xl border-l-2 border-purple-600/30 pl-6">
              We don't just print garments. We manufacture physical brand identity through a meticulous fusion of chemical engineering and technical artistry.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => onNavigate('quote')}
                className="bg-white text-black px-6 py-3 rounded-full font-black text-sm shadow-lg hover:scale-102 active:scale-95 transition-all duration-300 uppercase tracking-widest btn-pulse"
              >
                Start A Project
              </button>
              <button 
                onClick={() => window.location.href = 'https://www.google.com'}
                className="glass-dark text-white px-6 py-3 rounded-full font-black text-sm hover:bg-white/10 transition-all uppercase tracking-widest border border-white/10 active:scale-95"
              >
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-6 opacity-30">
          <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Industrial Scale</span>
          <div className="w-24 h-px bg-white/20"></div>
          <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Boutique Quality</span>
        </div>
      </section>

      {/* The Brand Narrative Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden relative border border-slate-100 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  alt="The Process"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="glass px-8 py-6 rounded-3xl border border-white/20">
                      <span className="text-[10px] text-white font-black uppercase tracking-[0.4em] mb-2 block text-purple-600">Our DNA</span>
                      <p className="text-white font-bold leading-relaxed">Every screen is exposed with surgical precision to capture the finest halftone details.</p>
                   </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-2xl rotate-12 transition-transform group-hover:rotate-0 duration-700">
                100%
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <span className="text-purple-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Philosophy</span>
                <h2 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
                  WE BELIEVE IN THE<br /><span className="text-purple-600 italic">PERMANENT.</span>
                </h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                  In a world of fast-fashion and fleeting quality, TS Custom Screen Printing stands for durability. We use high-solid plastisol and forced-air convection curing to ensure your message lasts as long as the garment itself.
                </p>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  Our brand was built on the simple realization that high-end brands were being underserved by mediocre print shops. We filled that gap with industrial automation and artisanal care.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-4xl font-black text-slate-900 mb-2">500k+</h4>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Impressions YTD</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-slate-900 mb-2">99.8%</h4>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Client Retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
