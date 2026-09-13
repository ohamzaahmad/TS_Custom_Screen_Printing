
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const PROJECT_IMAGES = ['/1.jpg', '/2.jpg', '/3.png', '/4.png', '/5.jpg', '/6.jpg'];
const HERO_CAROUSEL_IMAGES = ['/1.jpg', '/2.jpg', '/3.png', '/4.png', '/5.jpg', '/6.jpg'];
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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lockedScrollYRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reduceMotion]);

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
          <img
            src="/loop.gif"
            alt=""
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-110"
            aria-hidden="true"
          />
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
                onClick={() => window.location.href = 'https://www.sportswearcollection.com/st-screen-printing'}
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

      {/* Order Custom Apparel */}
      <motion.section {...revealProps} className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-orange-500/15 rounded-full blur-[100px]" aria-hidden="true"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px]" aria-hidden="true"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 block mb-4">What We Do</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[0.95] mb-6">
                Order custom<br />
                apparel and merch<br />
                <span className="text-gradient-orange">today.</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-8 max-w-lg">
                We specialize in custom screen printing, branded apparel, and promotional products for businesses, organizations, teams, and events.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-full translate-x-1 translate-y-1" aria-hidden="true"></div>
                  <button
                    onClick={() => onNavigate('quote')}
                    className="relative bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.18em] text-[11px] border-2 border-slate-900 hover:-translate-y-0.5 transition-all"
                  >
                    Start Your Order
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-600 rounded-full translate-x-1 translate-y-1" aria-hidden="true"></div>
                  <button
                    onClick={() => onNavigate('guide')}
                    className="relative bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.18em] text-[11px] border-2 border-slate-900 hover:-translate-y-0.5 transition-all"
                  >
                    Print Guide
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full translate-x-1 translate-y-1" aria-hidden="true"></div>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="relative bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.18em] text-[11px] border-2 border-slate-900 hover:-translate-y-0.5 transition-all"
                  >
                    Pricing
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full translate-x-1 translate-y-1" aria-hidden="true"></div>
                  <button
                    onClick={() => onNavigate('colors')}
                    className="relative bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-[0.18em] text-[11px] border-2 border-slate-900 hover:-translate-y-0.5 transition-all"
                  >
                    Color Guide
                  </button>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  'Screen printing on t-shirts, hoodies, jackets & more',
                  'Quality inks and durable, long-lasting prints',
                  'Fast turnaround and reliable service',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_10px_rgba(255,103,32,0.5)]"></span>
                    <span className="text-white/80 font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative rounded-3rem overflow-hidden aspect-[4/5] bg-white/5 border border-white/10 shadow-[8px_8px_0_#FF6720]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={carouselIndex}
                    src={HERO_CAROUSEL_IMAGES[carouselIndex]}
                    alt="Custom screen printing work"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-center gap-2 mt-5">
                {HERO_CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === carouselIndex
                        ? 'w-8 bg-orange-500'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Curated Projects */}
      <motion.section {...revealProps} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>

        {/* Splash decorations */}
        <div className="absolute top-8 right-[15%] w-40 h-16 bg-orange-500 rounded-[2rem] rotate-[-6deg] opacity-90" aria-hidden="true"></div>
        <div className="absolute top-6 right-[14%] w-40 h-16 border-2 border-slate-900 rounded-[2rem] rotate-[-6deg]" aria-hidden="true"></div>
        <div className="absolute bottom-12 left-[8%] w-32 h-14 bg-purple-600 rounded-[2rem] rotate-[4deg] opacity-90" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-[7%] w-32 h-14 border-2 border-slate-900 rounded-[2rem] rotate-[4deg]" aria-hidden="true"></div>
        <div className="absolute top-1/2 right-[5%] w-20 h-20 bg-yellow-400 rounded-full opacity-80" aria-hidden="true"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-4">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-slate-900 uppercase mb-4">
                Recent Production Work
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
                Every project represents our commitment to precision, color, and quality across every print run.
              </p>
            </div>
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-orange-500 rounded-full translate-x-1 translate-y-1" aria-hidden="true"></div>
              <button onClick={() => openLightbox(0)} className="relative text-sm bg-white text-slate-950 border-2 border-slate-950 px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] w-full md:w-auto hover:-translate-y-0.5 hover:shadow-lg transition-all">
                View Gallery
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_IMAGES.slice(0, 6).map((src, idx) => (
              <motion.button
                whileHover={reduceMotion ? undefined : { y: -4 }}
                key={`${src}-${idx}`}
                onClick={() => openLightbox(idx)}
                className={`group relative text-left overflow-hidden border border-slate-200 hover:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3rem bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${idx === 0 ? 'col-span-2 row-span-2 min-h-[33rem]' : 'min-h-[16rem]'}`}
              >
                <img
                  src={src}
                  alt={`Screen printed project ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-2 -rotate-2">{PROJECT_DETAILS[idx]?.label ?? `Project ${idx + 1}`}</div>
                  <p className="font-black text-xl md:text-2xl leading-tight tracking-tight text-white mb-1">{PROJECT_DETAILS[idx]?.title ?? 'Premium Screen Print'}</p>
                  <p className="text-[12px] text-white/70 font-bold leading-relaxed">{PROJECT_DETAILS[idx]?.subtitle ?? 'A recent screen print run showcasing pigment and texture on blanks.'}</p>
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
