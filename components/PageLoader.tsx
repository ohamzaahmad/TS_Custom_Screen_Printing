import React from "react";

/**
 * Brand loader used as the Suspense fallback while a page chunk loads.
 *
 * Replaces the old grey skeleton page loaders with a single, on-brand mark:
 * the ST logo with a rotating orange/purple ring and a "Loading" caption.
 */
export const PageLoader: React.FC = () => (
  <div
    className="flex min-h-screen flex-col items-center justify-center bg-white px-6"
    role="status"
    aria-live="polite"
  >
    <div className="relative flex h-24 w-24 items-center justify-center">
      {/* Rotating brand ring */}
      <span
        className="brand-loader-ring absolute inset-0 rounded-full border-[3px] border-slate-100"
        aria-hidden="true"
      >
        <span className="absolute -top-0.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.65)]" />
        <span className="absolute -bottom-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-purple-600 shadow-[0_0_14px_rgba(147,51,234,0.6)]" />
      </span>

      {/* Pulsing backdrop */}
      <span
        className="brand-loader-pulse absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/10 to-purple-600/10"
        aria-hidden="true"
      ></span>

      <img
        src="/logo-mobile.png"
        alt=""
        aria-hidden="true"
        className="brand-loader-mark relative h-12 w-auto object-contain"
      />
    </div>

    <div className="mt-7 flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.2s]"></span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-600 [animation-delay:-0.1s]"></span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-900"></span>
    </div>

    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
      Loading
    </p>

    <span className="sr-only">Loading page</span>
  </div>
);

/**
 * Compact branded loader for in-page content (tables, grids) that is fetching.
 */
export const InlineLoader: React.FC<{ label?: string }> = ({
  label = "Loading",
}) => (
  <div
    className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 py-12"
    role="status"
    aria-live="polite"
  >
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span
        className="brand-loader-ring absolute inset-0 rounded-full border-2 border-slate-100"
        aria-hidden="true"
      >
        <span className="absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
        <span className="absolute -bottom-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-600 shadow-[0_0_12px_rgba(147,51,234,0.55)]" />
      </span>
      <span className="brand-loader-pulse absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/10 to-purple-600/10" aria-hidden="true" />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
      {label}
    </p>
    <span className="sr-only">{label}</span>
  </div>
);

export default PageLoader;
