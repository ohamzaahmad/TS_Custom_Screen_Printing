import React, { useState, useEffect, useRef } from "react";
import { Logo } from "../constants";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const resourcesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close resources dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Accessibility: trap focus in mobile nav when open, close on Escape, restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const root = overlayRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ) as HTMLElement[];
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // store last active element and lock scroll
      lastActiveElementRef.current =
        document.activeElement as HTMLElement | null;
      document.body.classList.add("no-scroll");
      // focus first focusable element inside overlay
      setTimeout(() => {
        const root = overlayRef.current;
        const first = root?.querySelector<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])',
        );
        first?.focus();
      }, 50);
    } else {
      document.body.classList.remove("no-scroll");
      // restore focus
      setTimeout(() => lastActiveElementRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Pages that have a dark header background by default
  const darkHeaderPages = ["home"];
  const isDarkBg = !scrolled && darkHeaderPages.includes(currentPage);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Catalogue", id: "catalogue" },
    { label: "Contact", id: "contact" },
  ];

  const resourceItems = [
    { label: "Pricing Guide", id: "pricing" },
    { label: "Placement Guide", id: "guide" },
    { label: "Ink Color Lab", id: "colors" },
    { label: "Full Catalogue", id: "catalogue" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/95 nav-blur border-b border-slate-100 shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Mobile Backdrop Blur */}
      <div
        className={`fixed inset-0 bg-slate-950/20 backdrop-blur-md transition-opacity duration-500 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <div
            className={`flex items-center cursor-pointer transition-all duration-500 pr-4 lg:pr-8 lg:[&_.logo-subtitle-top]:text-[24px]! lg:[&_.logo-subtitle-bottom]:text-[24px]! hover:opacity-80 active:scale-95 ${isDarkBg ? "text-white" : "text-slate-900"}`}
            onClick={() => {
              onNavigate("home");
              setIsOpen(false);
            }}
          >
            <Logo className="h-12 md:h-12 lg:h-20 pr-2 lg:pr-3" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex lg:flex items-center gap-2 lg:gap-4">
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-2 border transition-all ${
                isDarkBg
                  ? "bg-white/5 border-white/15 backdrop-blur-xl"
                  : "bg-white/90 border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.08)]"
              }`}
            >
              {navItems.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.external) {
                      window.open(
                        item.external,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                  aria-label={
                    item.external
                      ? `${item.label} (opens in a new tab)`
                      : item.label
                  }
                  className={`px-2 lg:px-4 py-2 rounded-full text-[9px] lg:text-[12px] uppercase tracking-[0.12em] lg:tracking-[0.24em] font-black transition-all duration-300 ${
                    isDarkBg
                      ? currentPage === item.id
                        ? "bg-white text-slate-900"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                      : currentPage === item.id
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions — always visible so the resource menu and primary CTA are
              reachable on mobile as well as desktop */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resources Dropdown */}
            <div ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                className={`px-2.5 sm:px-4 py-2.5 rounded-full text-[9px] sm:text-[10px] lg:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.24em] font-black transition-all duration-300 flex items-center gap-1.5 border ${
                  isDarkBg
                    ? resourcesOpen
                      ? "bg-white text-slate-900 border-white"
                      : "text-white/75 hover:text-white border-white/20 bg-white/5"
                    : resourcesOpen
                      ? "bg-slate-900 text-white border-slate-900"
                      : "text-slate-500 hover:text-slate-900 border-slate-200 bg-white/90"
                }`}
              >
                <span className="hidden sm:inline">Project Resources</span>
                <span className="sm:hidden">Resources</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                  {resourceItems.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { onNavigate(r.id); setResourcesOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate("quote")}
              className="bg-slate-950 text-white border-2 border-slate-950 px-3 sm:px-6 py-2.5 rounded-full font-black text-[10px] lg:text-[13px] uppercase tracking-[0.14em] sm:tracking-[0.2em] shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all active:translate-y-0 active:scale-95 whitespace-nowrap"
            >
              Start Order
            </button>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className={`relative z-80 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-slate-950 border-slate-900 text-white rotate-90 shadow-xl"
                    : isDarkBg
                      ? "text-white border-white/20 bg-white/5 backdrop-blur-lg"
                      : "text-slate-900 border-slate-200 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
                }`}
              >
                <div className="w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
                  <span
                    className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? "w-6 rotate-45 translate-y-2.25" : "w-6"}`}
                  ></span>
                  <span
                    className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? "-translate-x-10 opacity-0" : "w-4 translate-x-1"}`}
                  ></span>
                  <span
                    className={`h-0.5 bg-current transition-all duration-500 ease-out ${isOpen ? "w-6 -rotate-45 -translate-y-2.25" : "w-5 translate-x-0.5"}`}
                  ></span>
                </div>
              </button>
            </div>
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
        className={`md:hidden fixed right-4 left-4 top-24 rounded-[2.5rem] border border-slate-200/60 bg-white/98 backdrop-blur-2xl transition-all duration-500 cubic-bezier(0.3, 0, 0, 1) overflow-hidden z-70 ${
          isOpen
            ? "opacity-100 visible translate-y-0 shadow-[0_40px_100px_rgba(15,23,42,0.25)]"
            : "opacity-0 invisible -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative pt-10 pb-12 px-8 flex flex-col gap-8">
          {/* Menu Branding Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div>
            <p
              className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 transition-all duration-500 delay-100 ${isOpen ? "opacity-40 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {navItems.map((item: any, index: number) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.external) {
                      window.open(
                        item.external,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    } else {
                      onNavigate(item.id);
                    }
                    setIsOpen(false);
                  }}
                  className={`group w-full text-left flex items-center justify-between px-6 py-5 rounded-3xl text-[13px] font-black uppercase tracking-[0.22em] transition-all duration-500 border ${
                    isOpen
                      ? `menu-item-appear stagger-${index + 1}`
                      : "opacity-0"
                  } ${
                    currentPage === item.id
                      ? "text-slate-900 bg-slate-50 border-slate-200 shadow-sm"
                      : "text-slate-500 hover:text-slate-900 bg-white/50 border-transparent hover:border-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {currentPage === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    )}
                    {item.label}
                  </span>
                  <i
                    className={`fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1 ${currentPage === item.id ? "opacity-100" : "opacity-0"}`}
                  ></i>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4">
              Project Resources
            </p>
            <div className="grid grid-cols-2 gap-3">
              {resourceItems.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onNavigate(r.id);
                    setIsOpen(false);
                  }}
                  className="px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.18em] text-slate-600 bg-white/50 border border-transparent hover:border-slate-100 hover:text-slate-900 transition-all text-left"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-400 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <button
              onClick={() => {
                onNavigate("quote");
                setIsOpen(false);
              }}
              className="w-full bg-slate-950 text-white border-2 border-slate-950 py-5 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] shadow-lg transition-all hover:shadow-xl active:translate-x-0.5 active:translate-y-0.5 active:shadow-md"
            >
              Start Order
            </button>
          </div>

          {/* Menu Footer */}
          <div
            className={`mt-4 pt-8 border-t border-slate-100 flex flex-col gap-6 transition-all duration-700 delay-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <i className="fab fa-facebook text-lg"></i>
                </a>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Manahawkin, NJ
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
