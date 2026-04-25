
import React, { useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { fetchPricing } from '../services/dataService';

const Pricing: React.FC = () => {
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPricing().then((data) => {
      setPricingData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="fluid-h1 font-black text-slate-900 leading-none tracking-tighter uppercase mb-2">
            SCREEN PRINT <span className="text-gradient-orange">PRICING 2025</span>
          </h1>
          <h2 className="text-xl font-black text-slate-400 uppercase tracking-[0.3em]">PLASTISOL BASED INKS</h2>
        </div>

        <div className="overflow-x-auto mb-10 rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E9F3F8]">
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">Quantity</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">1 Color</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">2 Color</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">3 Color</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">4 Color</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">5 Color</th>
                <th className="py-5 px-6 text-sm font-black uppercase tracking-widest text-slate-700">6 Color</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-16" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                    <td className="py-5 px-6"><Skeleton className="h-6 w-12" /></td>
                  </tr>
                ))
              ) : (
                pricingData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-6 font-black text-slate-600">{row.qty}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c1 === '-' ? '-' : `$${row.c1}`}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c2 === '-' ? '-' : `$${row.c2}`}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c3 === '-' ? '-' : `$${row.c3}`}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c4 === '-' ? '-' : `$${row.c4}`}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c5 === '-' ? '-' : `$${row.c5}`}</td>
                    <td className="py-5 px-6 font-bold text-slate-800">{row.c6 === '-' ? '-' : `$${row.c6}`}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="flex items-center gap-2 text-sm text-slate-500 font-bold mb-20 italic">
          <i className="fas fa-info-circle text-sky-500"></i>
          Prices listed above do not include garment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900">DEPOSITS</h3>
            <div className="border-[3px] border-slate-900 p-10 md:p-14 min-h-[280px] flex flex-col justify-center">
              <h4 className="text-2xl font-black mb-4 uppercase">EFFECTIVE 1/1/2025</h4>
              <p className="text-xl font-bold text-slate-600 leading-relaxed">
                A minimum deposit of <span className="text-slate-900 font-black underline decoration-orange-500">100%</span> is required to start your order. No exceptions.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900">CHARGES</h3>
            <div className="border-[3px] border-slate-900 p-10 md:p-14 min-h-[280px]">
              <ul className="space-y-6 text-lg font-bold text-slate-600">
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span><span className="text-slate-900 font-black uppercase">Screen Charges:</span> $25 per color/location</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span><span className="text-slate-900 font-black uppercase">Artwork Charges:</span> $45/hour (1 hour min.)</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span><span className="text-slate-900 font-black uppercase">Digitizing Charges:</span> $45/hour (1 hour min.)</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span><span className="text-slate-900 font-black uppercase">Pantone Matching:</span> $50</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
