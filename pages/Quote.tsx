
import React, { useEffect } from 'react';

interface QuoteProps {
  initialProduct?: string;
}

const Quote: React.FC<QuoteProps> = () => {

  useEffect(() => {
    const id = 'cognito-embed';
    const container = document.getElementById(id);
    if (!container) return;
    const existing = container.querySelector('script[data-cognito]');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.src = 'https://www.cognitoforms.com/f/seamless.js';
    script.setAttribute('data-key', 'gzpyeDOGH0GjzjW1uBxIDg');
    script.setAttribute('data-form', '5');
    script.setAttribute('data-cognito', 'true');
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 md:pt-28 lg:pt-32 px-4 md:px-6 pb-24 animate-in">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-orange-50 to-white"></div>

      <section className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-4">Quote Request</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-3">Start Your Project</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Submit your print requirements through our hosted form. Our team reviews every request and replies with pricing and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Step 1</p>
            <h3 className="font-black text-slate-900 mb-1">Project Details</h3>
            <p className="text-sm text-slate-500">Share garment type, quantity, print locations, and deadline.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Step 2</p>
            <h3 className="font-black text-slate-900 mb-1">Artwork Upload</h3>
            <p className="text-sm text-slate-500">Attach your files directly in the hosted form workflow.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Step 3</p>
            <h3 className="font-black text-slate-900 mb-1">Team Response</h3>
            <p className="text-sm text-slate-500">Expect a response with recommendations and pricing guidance.</p>
          </div>
        </div>

        <div id="cognito-embed" className="bg-white/95 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 min-h-120">
          <div className="h-full flex items-center justify-center text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Loading Quote Form
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
