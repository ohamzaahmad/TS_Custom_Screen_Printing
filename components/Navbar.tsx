
import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../constants';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility: trap focus in mobile nav when open, close on Escape, restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const root = overlayRef.current;
        if (!root) return;
        const focusable = Array.from(root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )) as HTMLElement[];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // store last active element and lock scroll
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      // focus first focusable element inside overlay
      setTimeout(() => {
        const root = overlayRef.current;
        const first = root?.querySelector<HTMLElement>('button, a, input, [tabindex]:not([tabindex="-1"])');
        first?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      // restore focus
      setTimeout(() => lastActiveElementRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Pages that have a dark header background by default
  const darkHeaderPages = ['home', 'contact'];
  const isDarkBg = !scrolled && darkHeaderPages.includes(currentPage);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'catalog', id: 'catalogue', external: 'https://www.sportswearcollection.com/?site=' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-white/92 nav-blur border-b border-slate-100 shadow-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="w-full px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className={`flex items-center cursor-pointer transition-colors duration-500 pr-4 lg:pr-8 lg:[&_.logo-subtitle-top]:text-[24px]! lg:[&_.logo-subtitle-bottom]:text-[24px]! ${isDarkBg ? 'text-white' : 'text-slate-900'}`} 
            onClick={() => onNavigate('home')}
          >
            <Logo className="h-11 md:h-14 lg:h-16 pr-2 lg:pr-3" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex items-center gap-1 rounded-full px-2 py-2 border transition-all ${
              isDarkBg
                ? 'bg-white/5 border-white/15 backdrop-blur-xl'
                : 'bg-white/90 border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
            }`}>
              {navItems.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.external) {
                      window.open(item.external, '_blank', 'noopener,noreferrer');
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                  aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
                  className={`px-4 py-2 rounded-full text-[10px] lg:text-[12px] uppercase tracking-[0.24em] font-black transition-all duration-300 ${
                    isDarkBg
                      ? (currentPage === item.id ? 'bg-white text-slate-900' : 'text-white/75 hover:text-white hover:bg-white/10')
                      : (currentPage === item.id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('quote')}
              className="bg-slate-950 text-white border-2 border-slate-950 px-6 py-2.5 rounded-full font-black text-[11px] lg:text-[13px] uppercase tracking-[0.2em] shadow-[4px_4px_0_#fb923c] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#fb923c] transition-all active:translate-y-0 active:scale-95"
            >
              Start Order
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className={`p-2.5 rounded-xl border focus:outline-none transition-all ${isDarkBg ? 'text-white border-white/20 bg-white/5' : 'text-slate-900 border-slate-200 bg-white/90 shadow-[0_6px_16px_rgba(15,23,42,0.08)]'}`}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-5'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-3'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`lg:hidden fixed left-4 right-4 top-21 rounded-3rem border border-slate-200/80 bg-white/95 backdrop-blur-xl transition-all duration-400 ease-out overflow-hidden z-70 ${
          isOpen ? 'opacity-100 visible translate-y-0 shadow-[0_22px_60px_rgba(15,23,42,0.2)]' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-8 px-6 flex flex-col gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-2 pb-2">Navigation</p>
          {navItems.map((item: any) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.external) {
                  window.open(item.external, '_blank', 'noopener,noreferrer');
                } else {
                  onNavigate(item.id);
                }
                setIsOpen(false);
              }}
              aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
              className={`w-full text-left px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.22em] transition-all border ${
                currentPage === item.id
                  ? 'text-slate-900 bg-orange-50 border-orange-300'
                  : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => {
              onNavigate('quote');
              setIsOpen(false);
            }}
            className="w-full mt-2 bg-slate-950 text-white border-2 border-slate-950 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.24em] shadow-[4px_4px_0_#fb923c] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#fb923c]"
          >
            Start Order
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
