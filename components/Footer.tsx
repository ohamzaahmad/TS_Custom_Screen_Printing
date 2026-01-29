
import React from 'react';
import { Logo } from '../constants';

const Footer: React.FC = () => {
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0015] text-white pt-12 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="bg-white rounded-2xl p-3 inline-block mb-6 shadow-lg">
              <Logo className="h-10" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              High-fidelity apparel solutions for modern brands. We combine architectural precision with industrial-grade screen printing.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-[11px] mb-8 uppercase tracking-[0.4em] text-orange-500">Service Suite</h4>
            <ul className="space-y-4 text-white/50 text-sm font-bold uppercase tracking-widest">
              <li className="text-white flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Industrial Printing
              </li>
              <li className="flex items-center justify-between opacity-30">
                <span>Embroidery</span>
                <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded-full">Q3 2025</span>
              </li>
              <li className="flex items-center justify-between opacity-30">
                <span>DTG Solutions</span>
                <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded-full">Q4 2025</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[11px] mb-8 uppercase tracking-[0.4em] text-orange-500">Project Resources</h4>
            <ul className="space-y-4 text-white/60 text-sm font-bold uppercase tracking-widest">
              <li>
                <button 
                  onClick={() => window.location.href = 'https://www.google.com'} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Full Catalogue
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('pricing')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Pricing Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('guide')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Placement Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('colors')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Ink Color Lab
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[11px] mb-8 uppercase tracking-[0.4em] text-orange-500">HQ Data</h4>
            <ul className="space-y-4 text-white/40 text-[13px] font-medium leading-relaxed">
              <li className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-orange-500 mt-1"></i>
                123 Print Blvd, Ink City, ST 90210
              </li>
              <li className="flex items-center gap-4">
                <i className="fas fa-phone-alt text-orange-500"></i>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-4">
                <i className="fas fa-envelope text-orange-500"></i>
                hello@tscustoms.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-black uppercase tracking-[0.3em] gap-8">
          <p>&copy; {new Date().getFullYear()} TS Custom Screen Printing. Precision Manufactured.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram text-base"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter text-base"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fab fa-vimeo-v text-base"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
