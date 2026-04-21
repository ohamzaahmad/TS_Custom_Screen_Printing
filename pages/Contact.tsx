
import React, { useEffect } from 'react';

const Contact: React.FC = () => {
  useEffect(() => {
    const id = 'cognito-contact-embed';
    const container = document.getElementById(id);
    if (!container) return;
    const existing = container.querySelector('script[data-cognito]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = 'https://www.cognitoforms.com/f/seamless.js';
    script.setAttribute('data-key', 'gzpyeDOGH0GjzjW1uBxIDg');
    script.setAttribute('data-form', '3');
    script.setAttribute('data-cognito', 'true');
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen pb-24 bg-white animate-in pt-24 md:pt-28 lg:pt-32">
      <div className="absolute top-0 left-0 w-full h-20 md:h-24 lg:h-28 bg-brand-dark" aria-hidden="true"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-4">Contact</span>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">Let&apos;s Talk Production</h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
                Share your project requirements and our team will respond with timelines, recommendations, and next steps.
              </p>
            </div>

            <div className="bg-slate-900 rounded-3rem p-8 text-white shadow-2xl">
              <ul className="space-y-5 text-sm">
                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-black">Phone</span>
                  <span className="font-bold">(905) 338-4034</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-black">Email</span>
                  <span className="font-bold">info@stcsprinting.com</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/60 uppercase tracking-[0.2em] text-[10px] font-black">Hours</span>
                  <span className="font-bold">Mon-Sat, 9am-6pm</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div id="cognito-contact-embed" className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 min-h-105">
              <div className="h-full flex items-center justify-center text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">
                Loading Contact Form
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
