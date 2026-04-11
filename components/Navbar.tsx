
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
        ? 'py-3 bg-white/95 nav-blur border-b border-slate-100 shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div 
            className={`flex items-center cursor-pointer transition-colors duration-500 pr-4 ${isDarkBg ? 'text-white' : 'text-slate-900'}`} 
            onClick={() => onNavigate('home')}
          >
            <Logo className="h-10 md:h-12 pr-2" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
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
                className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-300 relative group ${
                  isDarkBg 
                    ? (currentPage === item.id ? 'text-white' : 'text-white/60 hover:text-white')
                    : (currentPage === item.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900')
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-orange-500 rounded-full transition-all duration-300 ${
                  currentPage === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`}></span>
              </button>
            ))}
            
            <div className={`pl-4 border-l ml-4 transition-colors ${isDarkBg ? 'border-white/10' : 'border-slate-100'}`}>
              <button 
                onClick={() => onNavigate('quote')}
                className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-md hover:bg-orange-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 btn-pulse"
              >
                Start Order
              </button>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className={`p-2 focus:outline-none transition-colors ${isDarkBg ? 'text-white' : 'text-slate-900'}`}
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
        className={`lg:hidden absolute w-full top-full left-0 glass border-b border-slate-100 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100 visible shadow-2xl' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="py-12 px-10 flex flex-col items-center space-y-10">
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
              className={`text-[11px] font-black uppercase tracking-[0.5em] transition-all ${
                currentPage === item.id ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'
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
              className="w-full bg-orange-500 text-white py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] shadow-md"
            >
              Start Order
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
