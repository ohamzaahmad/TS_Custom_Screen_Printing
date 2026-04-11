
import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/dataService';
import { Product, Category } from '../types';

interface CategoriesProps {
  onNavigateToQuote: (productName: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onNavigateToQuote }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const prods = await fetchProducts();
      setProducts(prods);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen pb-32 bg-white animate-in">
      {/* Editorial Catalog Header */}
      <div className="bg-brand-dark py-48 md:py-64 mb-24 relative overflow-hidden">
        <div className="absolute inset-0">
            <div className="grid grid-cols-12 h-full opacity-5">
                {[...Array(48)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/40"></div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-purple-600/20 blur-[250px] rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-10 text-center relative z-10">
          <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[11px] mb-10 block">The Curated Essentials</span>
          <h1 className="text-7xl md:text-[10rem] font-black text-white mb-10 uppercase tracking-tighter leading-none select-none">THE <span className="text-gradient-orange italic">STUDIO.</span></h1>
          <p className="text-white/30 max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
            Every blank in our collection has passed industrial wash-tests and color-depth requirements. Only the best for your brand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-48 space-y-10">
            <div className="w-24 h-24 border-4 border-slate-100 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[11px]">Synchronizing Blank Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col items-center md:items-start transition-all">
                <div className="w-full aspect-4/5 overflow-hidden relative bg-slate-50 rounded-4rem border border-slate-100 transition-all duration-700 hover:shadow-3xl hover:shadow-purple-100 hover:border-purple-200 hover:-translate-y-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 mix-blend-multiply group-hover:mix-blend-normal" 
                  />
                  
                  {/* Interactive Action Area */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-12 flex flex-col justify-end items-center">
                      <button 
                        onClick={() => onNavigateToQuote(product.name)}
                        className="w-full bg-white text-slate-900 py-6 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                      >
                        Customize This Style
                      </button>
                  </div>

                  <div className="absolute top-10 right-10">
                    <div className="glass px-6 py-3 rounded-full border border-white shadow-2xl backdrop-blur-xl">
                        <span className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-12 px-6 text-center md:text-left">
                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-6 group-hover:text-purple-600 transition-colors">{product.name}</h3>
                  <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium line-clamp-2">{product.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    {product.colors.map(color => (
                      <span key={color} className="w-6 h-6 rounded-full border border-slate-200 shadow-sm transition-transform hover:scale-125" title={color} style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() === 'black' ? '#000' : color.toLowerCase().includes('navy') ? '#000080' : color.toLowerCase().includes('rose') ? '#f4c2c2' : color.toLowerCase().includes('olive') ? '#808000' : '#cbd5e1' }}></span>
                    ))}
                    <span className="text-[11px] font-black text-slate-300 ml-6 uppercase tracking-[0.2em]">{product.colors.length} Stock Bases</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specialty Request Section */}
      <div className="max-w-7xl mx-auto px-6 mt-48">
        <div className="bg-brand-dark rounded-[5rem] p-20 md:p-32 flex flex-col lg:flex-row items-center justify-between gap-16 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-160 h-160 bg-orange-600/10 blur-200 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="max-w-2xl relative z-10 text-center lg:text-left">
                <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.9]">Custom Sourcing Request?</h3>
                <p className="text-white/30 font-medium text-xl md:text-2xl leading-relaxed">
                    We maintain global accounts with Comfort Colors, Bella+Canvas, and AS Colour. If your desired silhouette isn't in our core collection, we can secure it.
                </p>
            </div>
            <button 
              onClick={() => window.location.href = '/contact'} 
              className="bg-white text-brand-dark px-16 py-8 rounded-full font-black uppercase tracking-widest text-xs hover:scale-110 transition-all shadow-3xl active:scale-95 whitespace-nowrap btn-pulse"
            >
              Contact Sourcing
            </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
