
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
      document.body.classList.add('no-scroll');
      // focus first focusable element inside overlay
      setTimeout(() => {
        const root = overlayRef.current;
        const first = root?.querySelector<HTMLElement>('button, a, input, [tabindex]:not([tabindex="-1"])');
        first?.focus();
      }, 50);
    } else {
      document.body.classList.remove('no-scroll');
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
        ? 'py-3 bg-white/95 nav-blur border-b border-slate-100 shadow-lg' 
        : 'py-5 bg-transparent'
    }`}>
      {/* Mobile Backdrop Blur */}
      <div 
        className={`fixed inset-0 bg-slate-950/20 backdrop-blur-md transition-opacity duration-500 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      />

      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className={`flex items-center cursor-pointer transition-all duration-500 pr-4 lg:pr-8 lg:[&_.logo-subtitle-top]:text-[24px]! lg:[&_.logo-subtitle-bottom]:text-[24px]! hover:opacity-80 active:scale-95 ${isDarkBg ? 'text-white' : 'text-slate-900'}`} 
            onClick={() => {
              onNavigate('home');
              setIsOpen(false);
            }}
          >
            <Logo className="h-[54px] md:h-[68px] lg:h-[80px] pr-2 lg:pr-3" />
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
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className={`relative z-80 w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                isOpen 
                  ? 'bg-slate-950 border-slate-900 text-white rotate-90 shadow-xl' 
                  : (isDarkBg 
                      ? 'text-white border-white/20 bg-white/5 backdrop-blur-lg' 
                      : 'text-slate-900 border-slate-200 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.08)]')
              }`}
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
                <span className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-2.25' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? '-translate-x-10 opacity-0' : 'w-4 translate-x-1'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-2.25' : 'w-5 translate-x-0.5'}`}></span>
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
        className={`lg:hidden fixed right-4 left-4 top-24 rounded-[2.5rem] border border-slate-200/60 bg-white/98 backdrop-blur-2xl transition-all duration-500 cubic-bezier(0.3, 0, 0, 1) overflow-hidden z-70 ${
          isOpen ? 'opacity-100 visible translate-y-0 shadow-[0_40px_100px_rgba(15,23,42,0.25)]' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="relative pt-10 pb-12 px-8 flex flex-col gap-8">
          {/* Menu Branding Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 transition-all duration-500 delay-100 ${isOpen ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {navItems.map((item: any, index: number) => (
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
                  className={`group w-full text-left flex items-center justify-between px-6 py-5 rounded-3xl text-[13px] font-black uppercase tracking-[0.22em] transition-all duration-500 border ${
                    isOpen ? `menu-item-appear stagger-${index + 1}` : 'opacity-0'
                  } ${
                    currentPage === item.id
                      ? 'text-slate-900 bg-slate-50 border-slate-200 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 bg-white/50 border-transparent hover:border-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {currentPage === item.id && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>}
                    {item.label}
                  </span>
                  <i className={`fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1 ${currentPage === item.id ? 'opacity-100' : 'opacity-0'}`}></i>
                </button>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-400 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={() => {
                onNavigate('quote');
                setIsOpen(false);
              }}
              className="w-full bg-slate-950 text-white border-2 border-slate-950 py-5 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] shadow-[6px_6px_0_#fb923c] transition-all hover:shadow-[8px_8px_0_#fb923c] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Start Order
            </button>
          </div>

          {/* Menu Footer */}
          <div className={`mt-4 pt-8 border-t border-slate-100 flex flex-col gap-6 transition-all duration-700 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><i className="fab fa-instagram text-lg"></i></a>
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><i className="fab fa-facebook text-lg"></i></a>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Manahawkin, NJ</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
