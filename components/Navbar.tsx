import React, { useState, useEffect, useRef } from "react";
import { Logo } from "../constants";
import { Magnetic } from "./ui";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  label: string;
  id: string;
  external?: string;
}

interface ResourceItem {
  title: string;
  description: string;
  id: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Catalogue", id: "catalogue" },
  { label: "Contact", id: "contact" },
];

const RESOURCE_ITEMS: ResourceItem[] = [
  {
    title: "Pricing Guide",
    description: "Per-shirt breakdown for screen prints & bulk volumes",
    id: "pricing",
    icon: "fa-tags",
    badge: "2026 Rates",
  },
  {
    title: "Placement Guide",
    description: "Standard chest, sleeve, nape, and back print dimensions",
    id: "guide",
    icon: "fa-ruler-combined",
  },
  {
    title: "Ink Color Lab",
    description: "Specialty plastisol inks, metallic, and Pantone matches",
    id: "colors",
    icon: "fa-palette",
  },
  {
    title: "Full Catalogue",
    description: "Premium blanks from S&S Activewear, tees, and hoodies",
    id: "catalogue",
    icon: "fa-book-open",
  },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const resourcesRef = useRef<HTMLDivElement | null>(null);
  const dropdownTimeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);

  // Sync menu state ref so scroll listener has latest value
  useEffect(() => {
    menuOpenRef.current = isOpen || resourcesOpen;
  }, [isOpen, resourcesOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 20);

      // Keep navbar visible if mobile drawer or resources dropdown is open
      if (menuOpenRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Always show at the top of page
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (delta > 8 && currentScrollY > 100) {
        // Scrolling DOWN -> smoothly hide out of view
        setIsVisible(false);
      } else if (delta < -8) {
        // Scrolling UP even a little bit -> smoothly reveal
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close resources dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility
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
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        );
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
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.classList.add("no-scroll");
      setTimeout(() => {
        const root = overlayRef.current;
        const first = root?.querySelector<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }, 50);
    } else {
      document.body.classList.remove("no-scroll");
      setTimeout(() => lastActiveElementRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Dark header page detection (Home has a dark hero background)
  const isDarkHeroPage = currentPage === "home";
  const isDarkBg = !scrolled && isDarkHeroPage;

  const handleMouseEnterResources = () => {
    if (dropdownTimeoutRef.current) {
      window.clearTimeout(dropdownTimeoutRef.current);
    }
    setResourcesOpen(true);
  };

  const handleMouseLeaveResources = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setResourcesOpen(false);
    }, 150);
  };

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
    setResourcesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      } ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.08)] py-2.5 sm:py-3"
          : isDarkBg
          ? "bg-transparent py-4 sm:py-5"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-3 sm:py-3.5"
      }`}
    >
      <div className="container-breakout max-w-[1348px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            aria-label="TS Custom Screen Printing Home"
          >
            <Logo
              isDarkBg={isDarkBg}
              isScrolled={scrolled}
              subtitleAlwaysVisible={true}
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative px-4 py-2 rounded-full font-display text-[13px] uppercase tracking-[0.14em] font-bold cursor-pointer transition-all duration-200 ${
                    isDarkBg
                      ? isActive
                        ? "text-white bg-white/15 shadow-xs"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                      : isActive
                      ? "text-slate-950 bg-slate-900/5 shadow-xs"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-orange-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}

            {/* Resources Dropdown */}
            <div
              ref={resourcesRef}
              className="relative"
              onMouseEnter={handleMouseEnterResources}
              onMouseLeave={handleMouseLeaveResources}
            >
              <button
                onClick={() => setResourcesOpen((prev) => !prev)}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                aria-label="Project Resources"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-[13px] uppercase tracking-[0.14em] font-bold cursor-pointer transition-all duration-200 ${
                  isDarkBg
                    ? resourcesOpen
                      ? "text-white bg-white/20"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                    : resourcesOpen
                    ? "text-slate-950 bg-slate-900/5"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                <span>Project Resources</span>
                <i
                  className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Mega Dropdown Panel */}
              {resourcesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.18)] p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Print &amp; Ordering Tools
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {RESOURCE_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-all text-left"
                        role="menuitem"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <i className={`fas ${item.icon} text-xs`} />
                          </div>
                          <span className="font-display font-bold text-[13px] uppercase tracking-wide text-slate-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                            {item.title}
                          </span>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Number Link (B2B Standard) */}
            <a
              href="tel:+17323470101"
              className={`hidden xl:inline-flex items-center gap-2 text-xs font-bold cursor-pointer transition-colors ${
                isDarkBg
                  ? "text-white/80 hover:text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span className="w-7 h-7 rounded-full bg-orange-500/15 text-orange-500 flex items-center justify-center text-[11px]">
                <i className="fas fa-phone-alt" />
              </span>
              <span>(732) 347-0101</span>
            </a>

            {/* Primary High-Converting CTA */}
            <Magnetic range={60} intensity={0.25}>
              <button
                onClick={() => handleNavigate("quote")}
                className="bg-slate-950 text-white font-display text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] px-4 sm:px-6 py-2.5 rounded-full shadow-[0_4px_16px_rgba(15,23,42,0.25)] hover:bg-orange-600 hover:shadow-[0_6px_20px_rgba(255,138,0,0.35)] cursor-pointer transition-all duration-300 active:scale-95 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Request A Quote</span>
                <span className="sm:hidden">Get Quote</span>
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                className={`w-11 h-11 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-300 ${
                  isOpen
                    ? "bg-slate-950 text-white border-slate-950"
                    : isDarkBg
                    ? "bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20"
                    : "bg-white text-slate-900 border-slate-200 shadow-xs hover:bg-slate-50"
                }`}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center">
                  <span
                    className={`h-0.5 bg-current transition-all duration-300 ease-out ${
                      isOpen ? "w-5 rotate-45 translate-y-1.75" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-current transition-all duration-200 ease-out ${
                      isOpen ? "opacity-0" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-current transition-all duration-300 ease-out ${
                      isOpen ? "w-5 -rotate-45 -translate-y-1.75" : "w-5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`lg:hidden fixed top-20 right-4 left-4 max-h-[calc(100vh-6rem)] rounded-3xl bg-white border border-slate-200/90 shadow-[0_25px_70px_rgba(15,23,42,0.3)] overflow-y-auto transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <div className="p-6 flex flex-col gap-6">
          {/* Main Navigation Links */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 px-2">
              Menu
            </p>
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full min-h-[48px] flex items-center justify-between px-4 py-3.5 rounded-2xl font-display text-base uppercase tracking-wider font-bold cursor-pointer transition-all text-left ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    <i
                      className={`fas fa-arrow-right text-xs transition-transform ${
                        isActive ? "text-orange-500 translate-x-1" : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Resources Grid */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3 px-2">
              Project Resources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RESOURCE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                      <i className={`fas ${item.icon} text-xs`} />
                    </div>
                    <span className="font-display font-bold text-xs uppercase tracking-wide text-slate-900 truncate">
                      {item.title}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={() => handleNavigate("quote")}
              className="w-full bg-slate-950 text-white font-display text-sm font-bold uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg hover:bg-orange-600 cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <span>Request A Quote</span>
              <i className="fas fa-arrow-right text-xs" />
            </button>
          </div>

          {/* Contact Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2">
            <a
              href="tel:+17323470101"
              className="flex items-center gap-2 font-bold text-slate-700 hover:text-orange-600 cursor-pointer transition-colors"
            >
              <i className="fas fa-phone-alt text-orange-500" />
              <span>(732) 347-0101</span>
            </a>
            <span className="text-slate-400 font-medium">Manahawkin, NJ</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
