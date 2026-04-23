
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const PROJECT_IMAGES = ['/1.jpg', '/2.jpg', '/3.png', '/4.png', '/5.jpg', '/6.jpg'];
const PROJECT_DETAILS = [
  { label: 'Drop 01', title: 'Oversized Streetwear Set', subtitle: 'Soft-hand print with tight registration and consistent opacity.' },
  { label: 'Drop 02', title: 'Athletic Club Series', subtitle: 'Durable team graphics engineered for repeat wash cycles.' },
  { label: 'Drop 03', title: 'Tour Merch Capsule', subtitle: 'High-impact front and back prints built for launch day.' },
  { label: 'Drop 04', title: 'Retail Essentials Batch', subtitle: 'Clean, minimal branding optimized for premium shelf presence.' },
  { label: 'Drop 05', title: 'Festival Graphic Run', subtitle: 'Vibrant ink layering tuned for sharp detail under stage light.' },
  { label: 'Drop 06', title: 'Core Logo Program', subtitle: 'Reliable brand consistency across multiple garment styles.' },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lockedScrollYRef = useRef(0);

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: EASE_OUT },
      };

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
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % PROJECT_IMAGES.length);
    };

    const html = document.documentElement;
    const body = document.body;

    if (lightboxOpen) {
      lockedScrollYRef.current = window.scrollY;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${lockedScrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      window.addEventListener('keydown', onKey);
      // focus the close button when opened
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      window.scrollTo(0, lockedScrollYRef.current);
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen]);

  return (
    <div className="animate-in">
      {/* Cinematic Hero - Brand Entry */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {!reduceMotion ? (
              <>
                <motion.div
                  className="blob blob-1"
                  aria-hidden="true"
                  animate={{ y: [0, -20, 0], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: EASE_OUT }}
                />
                <motion.div
                  className="blob blob-2"
                  aria-hidden="true"
                  animate={{ y: [0, -12, 0], rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: EASE_OUT }}
                />
                <motion.div
                  className="blob blob-3"
                  aria-hidden="true"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: EASE_OUT }}
                />
              </>
            ) : (
              <>
                <div className="blob blob-1" aria-hidden="true" />
                <div className="blob blob-2" aria-hidden="true" />
                <div className="blob blob-3" aria-hidden="true" />
              </>
            )}
          <video
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-110"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 md:pt-16">
          <div className="flex flex-col items-start max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.6, ease: EASE_OUT }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-dark text-white/90 text-[9px] font-black uppercase tracking-[0.5em] mb-12 border border-white/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shadow-[0_0_12px_rgba(189,0,255,0.8)]"></span>
              EST. 2018 | THE GOLD STANDARD
            </motion.div>
            
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.8, delay: 0.08, ease: EASE_OUT }}
              className="fluid-h1 text-white leading-tight mb-8 tracking-tight uppercase select-none"
            >
              A CULTURE OF<br />
              <span className="text-gradient-orange italic font-extrabold">PRECISION.</span>
            </motion.h1>
            
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.7, delay: 0.16, ease: EASE_OUT }}
              className="text-base md:text-lg text-white/40 mb-10 leading-relaxed font-medium max-w-xl border-l-2 border-purple-600/30 pl-6"
            >
              We don't just print garments. We manufacture physical brand identity through a meticulous fusion of chemical engineering and technical artistry.
            </motion.p>
            
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.6, delay: 0.24, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
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
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reduceMotion ? undefined : { duration: 0.6, delay: 0.32, ease: EASE_OUT }}
              className="mt-10 grid grid-cols-3 gap-4 w-full max-w-xl"
            >
              <div className="glass-dark rounded-2xl p-4 border border-white/10">
                <p className="text-white text-xl font-black">500K+</p>
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-black">Prints YTD</p>
              </div>
              <div className="glass-dark rounded-2xl p-4 border border-white/10">
                <p className="text-white text-xl font-black">99.8%</p>
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-black">Repeat Clients</p>
              </div>
              <div className="glass-dark rounded-2xl p-4 border border-white/10">
                <p className="text-white text-xl font-black">10-12</p>
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-black">Business Days</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-6 opacity-30">
          <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Industrial Scale</span>
          <div className="w-24 h-px bg-white/20"></div>
          <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Boutique Quality</span>
        </div>
      </section>

      {/* Studio Standard */}
      <motion.section {...revealProps} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-600 block mb-4">Studio Standard</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[0.95] mb-5">
                Minimal process.
                <br />
                Maximum consistency.
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Every order follows a focused production system designed to reduce errors, protect detail, and keep delivery predictable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                <button
                  onClick={() => onNavigate('quote')}
                  className="bg-slate-900 text-white px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs border-2 border-slate-900 shadow-[3px_3px_0_#fb923c] hover:-translate-y-0.5 transition-transform"
                >
                  Start Your Order
                </button>
                <button
                  onClick={() => onNavigate('guide')}
                  className="bg-slate-100 text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs border-2 border-slate-200 hover:bg-slate-200 transition-colors"
                >
                  Print Guide
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => onNavigate('colors')}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs border-2 border-orange-400 hover:bg-orange-400 hover:text-slate-950 transition-colors"
                >
                  Color Guide
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">Fast Turnarounds</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">Color Consistency</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-1">Quality Checks</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Pre-Press Accuracy',
                  metric: 'Color Locked',
                  desc: 'Artwork and separations are validated before production starts.',
                },
                {
                  title: 'Controlled Print Run',
                  metric: 'QC Checks',
                  desc: 'Registration and cure are monitored from first pull to final pack.',
                },
                {
                  title: 'Reliable Turnaround',
                  metric: '10-12 Days',
                  desc: 'Clear timelines built for launches, drops, and repeat orders.',
                },
              ].map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  className="bg-slate-50 border-2 border-slate-200 rounded-3rem p-6 shadow-[4px_4px_0_#e2e8f0] hover:shadow-[6px_6px_0_#cbd5e1] transition-all"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{item.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 whitespace-nowrap mt-1 border border-orange-300 bg-orange-50 rounded-full px-3 py-1">{item.metric}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curated Projects */}
      <motion.section {...revealProps} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div className="border-2 border-slate-900 bg-white rounded-3rem p-5 shadow-[6px_6px_0_#0f172a]">
              <span className="inline-flex items-center border-2 border-slate-900 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.34em] text-slate-900 mb-3">
                Curated Projects
              </span>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-slate-950 uppercase">
                Recent Production Work
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-20 rounded-full bg-slate-900"></span>
                <span className="h-1.5 w-14 rounded-full bg-orange-500"></span>
              </div>
            </div>
            <button onClick={() => openLightbox(0)} className="text-sm bg-slate-950 text-white border-2 border-slate-950 px-5 py-3 rounded-full font-black uppercase tracking-[0.2em] w-full md:w-auto shadow-[4px_4px_0_#fb923c] hover:-translate-y-0.5 transition-transform">
              View Gallery
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-5">
            {PROJECT_IMAGES.slice(0, 4).map((src, idx) => (
              <motion.button
                whileHover={reduceMotion ? undefined : { y: -3 }}
                key={src}
                onClick={() => openLightbox(idx)}
                className={`group relative text-left overflow-hidden border-2 border-slate-900 shadow-[6px_6px_0_#0f172a] focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3rem bg-white transition-transform hover:-translate-y-1 ${idx === 0 ? 'lg:col-span-2 lg:row-span-2 h-96 lg:h-full' : 'h-64 lg:h-full'}`}
              >
                <img
                  src={src}
                  alt={`Screen printed project ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="inline-flex flex-col items-start border-2 border-white/75 bg-black/45 backdrop-blur-sm rounded-2xl px-3.5 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.35)] max-w-[92%]">
                    <p className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/70 bg-black/45 rounded-full px-3 py-1 mb-2">{PROJECT_DETAILS[idx]?.label ?? `Project ${idx + 1}`}</p>
                    <p className="font-black text-xl leading-tight tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">{PROJECT_DETAILS[idx]?.title ?? 'Premium Screen Print'}</p>
                    <p className="text-[12px] text-white/95 font-bold mt-1.5 leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">{PROJECT_DETAILS[idx]?.subtitle ?? 'A recent screen print run showcasing pigment and texture on blanks.'}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      {lightboxOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 overflow-hidden bg-black/80 backdrop-blur-sm p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Project image lightbox"
          style={{ zIndex: 2147483000 }}
        >
          <div className="min-h-full flex items-center justify-center">
            <div className="relative max-w-5xl w-full rounded-3rem overflow-hidden border-2 border-white/75 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
              <button ref={closeBtnRef} onClick={closeLightbox} className="absolute top-3 right-3 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a] focus:outline-none" aria-label="Close lightbox">✕</button>
              <button onClick={() => setActiveIndex(i => (i - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a]">‹</button>
              <button onClick={() => setActiveIndex(i => (i + 1) % PROJECT_IMAGES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a]">›</button>

              <div className="bg-black flex items-center justify-center p-3 md:p-5 max-h-[calc(100vh-12rem)] overflow-hidden">
                <img src={PROJECT_IMAGES[activeIndex]} alt={`Project ${activeIndex+1}`} decoding="async" className="max-h-[60vh] md:max-h-[68vh] w-auto object-contain mx-auto rounded-2xl border border-white/20" />
              </div>

              <div className="p-5 bg-white text-center border-t-2 border-slate-900">
                <p className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 border border-slate-300 rounded-full px-3 py-1 mb-2">{PROJECT_DETAILS[activeIndex]?.label ?? `Project ${activeIndex + 1}`}</p>
                <h5 className="font-black text-2xl text-slate-950 tracking-tight">{PROJECT_DETAILS[activeIndex]?.title ?? `Screen Print Project #${activeIndex + 1}`}</h5>
                <p className="text-sm text-slate-700 font-bold max-w-2xl mx-auto">{PROJECT_DETAILS[activeIndex]?.subtitle ?? 'A recent screen print run showcasing pigment and texture on blanks.'}</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Final CTA */}
      <motion.section {...revealProps} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-brand-dark rounded-4rem border border-white/10 p-8 md:p-12 text-white">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/20 rounded-full blur-180" aria-hidden="true"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-500/20 rounded-full blur-180" aria-hidden="true"></div>

            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 block mb-4">Ready To Move</span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Let&apos;s build your next print run.</h3>
              <p className="text-white/60 text-lg font-medium leading-relaxed mb-8 max-w-2xl">
                Share your requirements and we&apos;ll respond with the cleanest path to quality, speed, and consistency.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <a href="tel:+19053384034" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-black">(732) 347-0101</a>
                <a href="mailto:info@stcsprinting.com" className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm font-black">info@stcsprinting.com</a>
              </div>

              <button
                onClick={() => onNavigate('quote')}
                className="bg-white text-brand-dark px-7 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs"
              >
                Request A Quote
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
