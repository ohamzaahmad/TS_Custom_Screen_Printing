import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface GalleryProps {
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

const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
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
    <div className="bg-[#fcfcfc] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 sm:px-8 lg:px-12">
        <motion.div {...revealProps} className="max-w-6xl mx-auto">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-[10px] mb-4 block">
            Gallery
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight mb-4">
            <span className="text-orange-500">Our</span> <span className="text-purple-500">Recent</span> <span className="text-slate-900">Portfolio</span>
          </h1>
          <p className="text-base text-slate-600 leading-snug font-medium max-w-2xl">
            Browse our finest screen print projects showcasing precision, consistency, and artisanal quality in every design.
          </p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 sm:px-8 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECT_IMAGES.map((src, idx) => {
              const badgeColors = ['bg-orange-500', 'bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-green-500', 'bg-red-500'];
              return (
              <motion.button
                key={src}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: EASE_OUT }}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
                onClick={() => openLightbox(idx)}
                className="group relative text-left overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-2xl bg-white transition-all h-96 cursor-pointer shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              >
                <img
                  src={src}
                  alt={`${PROJECT_DETAILS[idx]?.title || `Screen printed project ${idx + 1}`}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                
                <div className={`absolute top-4 right-4 ${badgeColors[idx % badgeColors.length]} text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {PROJECT_DETAILS[idx]?.label || `Drop ${idx + 1}`}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="space-y-2">
                    <p className="font-black text-2xl leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] group-hover:text-yellow-300 transition-colors">
                      {PROJECT_DETAILS[idx]?.title || 'Premium Screen Print'}
                    </p>
                    <p className="text-sm text-white/90 font-bold leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                      {PROJECT_DETAILS[idx]?.subtitle || 'A recent screen print run showcasing quality.'}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-white/80 text-xs font-bold group-hover:text-white transition-colors">
                    <span>View Project</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </motion.button>
            );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-linear-to-br from-slate-50 to-slate-100 border-t border-slate-200">
        <motion.div {...revealProps} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-4">
            <span className="text-orange-500">Ready</span> to Print Your Vision?
          </h2>
          <p className="text-base text-slate-600 leading-snug font-medium mb-10 max-w-2xl mx-auto">
            Whether you need a small custom run or large-scale production, our team delivers the same precision and quality you see in our gallery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => onNavigate('quote')}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="bg-linear-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Order
            </motion.button>
            <motion.button
              onClick={() => onNavigate('contact')}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Get a Quote
            </motion.button>
          </div>
        </motion.div>
      </section>

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
              <button
                ref={closeBtnRef}
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a] focus:outline-none focus:ring-2 focus:ring-orange-500 hover:scale-110 transition-transform"
                aria-label="Close lightbox"
              >
                ✕
              </button>
              <button
                onClick={() => setActiveIndex(i => (i - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={() => setActiveIndex(i => (i + 1) % PROJECT_IMAGES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white text-black border-2 border-slate-900 rounded-full w-11 h-11 shadow-[3px_3px_0_#0f172a] hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Next image"
              >
                ›
              </button>

              <div className="bg-black flex items-center justify-center p-3 md:p-5 max-h-[calc(100vh-12rem)] overflow-hidden">
                <img
                  src={PROJECT_IMAGES[activeIndex]}
                  alt={`Project ${activeIndex + 1}: ${PROJECT_DETAILS[activeIndex]?.title}`}
                  decoding="async"
                  className="max-h-[60vh] md:max-h-[68vh] w-auto object-contain mx-auto rounded-2xl border border-white/20"
                />
              </div>

              <div className="p-5 bg-white text-center border-t-2 border-slate-900">
                <p className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 border border-slate-300 rounded-full px-3 py-1 mb-2">
                  {PROJECT_DETAILS[activeIndex]?.label || `Project ${activeIndex + 1}`}
                </p>
                <h5 className="font-black text-2xl text-slate-950 tracking-tight mb-2">
                  {PROJECT_DETAILS[activeIndex]?.title || `Screen Print Project #${activeIndex + 1}`}
                </h5>
                <p className="text-sm text-slate-700 font-bold max-w-2xl mx-auto">
                  {PROJECT_DETAILS[activeIndex]?.subtitle || 'A recent screen print run showcasing pigment and texture on blanks.'}
                </p>
              </div>

              {/* Image counter */}
              <div className="absolute top-3 left-3 z-30 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                {activeIndex + 1} / {PROJECT_IMAGES.length}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
