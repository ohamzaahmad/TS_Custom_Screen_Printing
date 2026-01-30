
import React, { useState, useEffect, useRef } from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const images = ["/1.jpg","/2.jpg","/3.png","/4.png","/5.jpg","/6.jpg"];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openLightbox = (index: number) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
      lastActiveElementRef.current.focus();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % images.length);
    };
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
      // focus the close button when opened
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, images.length]);

  return (
    <div className="animate-in">
      {/* Cinematic Hero - Brand Entry */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[200px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-orange-600/10 blur-[200px] rounded-full"></div>
          <video
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-110 motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/1.jpg"
            aria-hidden="true"
          >
            <source src="/loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 md:pt-16">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-dark text-white/90 text-[9px] font-black uppercase tracking-[0.5em] mb-12 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shadow-[0_0_12px_rgba(189,0,255,0.8)]"></span>
              EST. 2018 | THE GOLD STANDARD
            </div>
            
            <h1 className="fluid-h1 text-white leading-tight mb-8 tracking-tight uppercase select-none">
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
                onClick={() => window.location.href = 'https://www.sportswearcollection.com/?site='}
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
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  alt="Detail of a screen-printed t-shirt on a male model"
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
                <h2 className="fluid-h2 text-slate-900 leading-[0.95] tracking-tighter uppercase mb-8">
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

      {/* Operational Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-black text-slate-900 mb-8">What We Do</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg border border-slate-100 shadow-sm">
              <h4 className="text-xl font-black mb-2">Screen Printing</h4>
              <p className="text-slate-500 text-sm">High-solid inks, expert separations, and consistent registration across high-volume runs.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-slate-100 shadow-sm">
              <h4 className="text-xl font-black mb-2">Production Management</h4>
              <p className="text-slate-500 text-sm">Job tracking, QC checkpoints, and automated curing for repeatable results.</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-slate-100 shadow-sm">
              <h4 className="text-xl font-black mb-2">Fulfillment & Logistics</h4>
              <p className="text-slate-500 text-sm">Kitting, bagging, and global shipping options to simplify post-production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black">Recent Projects</h3>
            <button onClick={() => onNavigate('quote')} className="text-sm bg-orange-500 text-white px-4 py-2 rounded-md font-black">Start A Project</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((src, idx) => (
              <button key={src} onClick={() => openLightbox(idx)} className="text-left rounded-xl overflow-hidden border border-slate-100 shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-300">
                <img src={src} alt={`Screen printed project ${idx+1}`} className="w-full h-48 object-cover" />
                <div className="p-4 bg-white">
                  <h5 className="font-black mb-1">Screen Print Project #{idx+1}</h5>
                  <p className="text-sm text-slate-500">A recent screen print run showcasing pigment and texture on blanks.</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" role="dialog" aria-modal="true" aria-label="Project image lightbox">
          <div className="relative max-w-4xl w-full rounded-lg overflow-hidden">
            <button ref={closeBtnRef} onClick={closeLightbox} className="absolute top-3 right-3 z-20 bg-white/90 text-black rounded-full p-2 shadow-md focus:outline-none" aria-label="Close lightbox">✕</button>
            <button onClick={() => setActiveIndex(i => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-black rounded-full p-2 shadow-md">‹</button>
            <button onClick={() => setActiveIndex(i => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 text-black rounded-full p-2 shadow-md">›</button>

            <div className="bg-black flex items-center justify-center">
              <img src={images[activeIndex]} alt={`Project ${activeIndex+1}`} className="max-h-[80vh] w-auto object-contain mx-auto" />
            </div>

            <div className="p-4 bg-white text-center">
              <h5 className="font-black">Screen Print Project #{activeIndex+1}</h5>
              <p className="text-sm text-slate-500">A recent screen print run showcasing pigment and texture on blanks.</p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-black mb-6">What clients say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'Fast turnaround and flawless print.', by: 'Creative Studio' },
              { quote: 'Outstanding consistency across sizes.', by: 'Retail Brand' },
              { quote: 'They understood our brand instincts.', by: 'Agency Partner' },
            ].map((t, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg border border-slate-100">
                <p className="text-slate-700 mb-4">“{t.quote}”</p>
                <div className="text-sm font-black text-slate-500">{t.by}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 bg-gradient-to-r from-orange-400 to-orange-600">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h4 className="text-white font-black text-2xl">Ready to make something permanent?</h4>
            <p className="text-white/90 text-sm mt-2">Start your project and get a predictable production timeline.</p>
          </div>
          <div>
            <button onClick={() => onNavigate('quote')} className="bg-white text-orange-500 px-5 py-3 rounded-full font-black">Request A Quote</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
