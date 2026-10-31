import React from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

/**
 * Footer modeled on blackdogapparelco.com's footer:
 * no logo, a left-aligned contact block ("Let's get to work." + address +
 * social icons + hours/phone/email), and a centered bottom bar with the
 * copyright and legal links.
 */
const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigateTo = (path: string, pageId?: string) => {
    if (onNavigate && pageId) {
      onNavigate(pageId);
    } else {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/5 relative z-30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="footer-blob footer-blob-1" aria-hidden="true"></div>
        <div className="footer-blob footer-blob-2" aria-hidden="true"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="mb-12">
          <span className="mb-4 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-orange-500">
            <span className="h-px w-8 bg-orange-500/60" aria-hidden="true"></span>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight text-white">
            Let&rsquo;s get to work.
          </h2>
        </div>

        {/* Contact data — two balanced columns of icon-anchored rows */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:gap-20">
          {/* Column 1: Visit + Hours */}
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-500 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <i className="fas fa-map-marker-alt text-sm"></i>
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                  Studio
                </p>
                <p className="text-[15px] font-semibold leading-snug text-white/90">
                  1 Bradshaw Drive
                  <br />
                  Manahawkin, NJ 08050
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-500 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <i className="far fa-clock text-sm"></i>
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                  Hours
                </p>
                <p className="text-[15px] font-semibold leading-snug text-white/90">
                  Monday – Friday
                  <span className="mx-1.5 text-white/30">|</span>9am – 5pm
                </p>
              </div>
            </li>
          </ul>

          {/* Column 2: Call + Email */}
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-500 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <i className="fas fa-phone-alt text-sm"></i>
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                  Call / Text
                </p>
                <a
                  href="tel:+17323470101"
                  className="text-[15px] font-semibold leading-snug text-white/90 transition-colors hover:text-orange-500"
                >
                  (732) 347-0101
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-500 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <i className="far fa-envelope text-sm"></i>
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                  Email
                </p>
                <a
                  href="mailto:info@stcsprinting.com"
                  className="break-words text-[15px] font-semibold leading-snug text-white/90 transition-colors hover:text-orange-500"
                >
                  info@stcsprinting.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Social row */}
        <div className="mt-12 flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Follow
          </span>
          <span className="h-px flex-1 bg-white/10" aria-hidden="true"></span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 ring-1 ring-white/10 transition-all hover:bg-orange-500 hover:text-white hover:ring-orange-500"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/70 ring-1 ring-white/10 transition-all hover:bg-orange-500 hover:text-white hover:ring-orange-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Centered bottom bar: copyright + legal links */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-5 text-center">
          <p className="flex items-center gap-2 text-white/70 text-[11px] font-black uppercase tracking-[0.25em]">
            <i className="far fa-copyright text-sm"></i>
            ST Custom Screen Printing {new Date().getFullYear()}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] font-black uppercase tracking-[0.2em]">
            <button
              onClick={() => navigateTo("/privacy", "privacy")}
              className="text-white/75 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo("/refund", "refund")}
              className="text-white/75 hover:text-white transition-colors"
            >
              Refund Policy
            </button>
            <button
              onClick={() => navigateTo("/terms", "terms")}
              className="text-white/75 hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
