
import React, { useState, useEffect } from 'react';
import * as DataService from '../services/dataService';
import { Product } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [inks, setInks] = useState<any>({ stock: [], additional: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [p, pr, i] = await Promise.all([
      DataService.fetchProducts(),
      DataService.fetchPricing(),
      DataService.fetchInks()
    ]);
    setProducts(p);
    setPricing(pr);
    setInks(i);
    setLoading(false);
  };

  const saveProducts = () => {
    DataService.updateProducts(products);
    showSuccessToast('Catalog Synchronized');
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: 'New Premium Item',
      category: 't-shirts',
      price: 15.00,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
      description: 'New product description goes here.',
      colors: ['Black', 'White']
    };
    setProducts([newProduct, ...products]);
  };

  const savePricing = () => {
    DataService.updatePricing(pricing);
    showSuccessToast('Rates Updated');
  };

  const saveInks = () => {
    DataService.updateInks(inks);
    showSuccessToast('Inks Updated');
  };

  const showSuccessToast = (msg: string) => {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-10 right-10 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] z-[100] animate-in flex items-center gap-4 border border-white/10';
      toast.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></span> ${msg}`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
      }, 3000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-16 h-16 border-[4px] border-slate-100 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-40 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0015] text-white text-[9px] font-black uppercase tracking-widest mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]"></span>
               Network Status: Operational
            </div>
            <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">Command Center</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-3">Infrastructure & Dynamic Pricing Control</p>
          </div>
          <div className="flex gap-4">
              <button 
                onClick={() => window.location.hash = 'home'}
                className="text-slate-900 font-black uppercase text-[10px] tracking-widest px-8 py-4 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-xl transition-all"
              >
                View Public Site
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('ts_admin_authenticated');
                  window.location.hash = 'admin';
                }}
                className="bg-red-50 text-red-500 font-black uppercase text-[10px] tracking-widest px-8 py-4 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-100"
              >
                Terminate Session
              </button>
          </div>
        </div>

        {/* Dynamic Navigation */}
        <div className="flex p-2.5 bg-slate-200/50 rounded-[2.5rem] w-full md:w-fit mb-12 border border-slate-100 backdrop-blur-md">
          {[
            { id: 'products', label: 'Product Catalog', icon: 'fa-tshirt' },
            { id: 'pricing', label: 'Pricing Matrix', icon: 'fa-chart-line' },
            { id: 'inks', label: 'Ink Libraries', icon: 'fa-palette' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-10 py-4 rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${
                activeTab === tab.id 
                  ? 'bg-white text-slate-900 shadow-2xl' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <i className={`fas ${tab.icon} ${activeTab === tab.id ? 'text-purple-600' : 'opacity-40'}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Management Panels */}
        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-10 md:p-16">
          {activeTab === 'products' && (
            <div className="space-y-12 animate-in">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Blank Inventory</h3>
                <div className="flex gap-4">
                    <button onClick={handleAddProduct} className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Add New Item</button>
                    <button onClick={saveProducts} className="bg-gradient-brand text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">Publish Catalog</button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {products.map((p, idx) => (
                  <div key={p.id} className="group flex flex-col md:flex-row gap-10 items-center p-10 bg-slate-50/50 rounded-[3.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="relative">
                      <img src={p.imageUrl} className="w-32 h-32 object-cover rounded-[2rem] border border-slate-200 shadow-sm" alt={p.name} />
                      <button className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-purple-600 shadow-xl flex items-center justify-center transition-colors"><i className="fas fa-camera text-sm"></i></button>
                    </div>
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Title</label>
                        <input 
                            className="w-full bg-white px-6 py-4 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                            value={p.name} 
                            onChange={e => {
                            const newP = [...products];
                            newP[idx].name = e.target.value;
                            setProducts(newP);
                            }}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Standard Base Price ($)</label>
                        <input 
                            className="w-full bg-white px-6 py-4 rounded-2xl text-sm font-bold border border-slate-200 outline-none focus:ring-4 focus:ring-purple-100 transition-all"
                            type="number"
                            step="0.01"
                            value={p.price} 
                            onChange={e => {
                            const newP = [...products];
                            newP[idx].price = parseFloat(e.target.value);
                            setProducts(newP);
                            }}
                        />
                      </div>
                      <div className="flex items-end justify-between">
                         <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Type</label>
                            <span className="block px-6 py-4 bg-slate-200/40 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-100">{p.category}</span>
                         </div>
                         <button 
                            onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                            className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-50 px-6 py-4 rounded-2xl transition-all"
                         >
                            Delete Item
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-12 animate-in">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Economic Models</h3>
                <button onClick={savePricing} className="bg-gradient-orange text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">Update Live Rates</button>
              </div>
              <div className="overflow-x-auto rounded-[3rem] border border-slate-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                      <th className="py-8 px-10">Volume Break</th>
                      <th className="py-8 px-6 text-slate-900">1C Ink</th>
                      <th className="py-8 px-6 text-slate-900">2C Ink</th>
                      <th className="py-8 px-6 text-slate-900">3C Ink</th>
                      <th className="py-8 px-6 text-slate-900">4C Ink</th>
                      <th className="py-8 px-6 text-slate-900">5C Ink</th>
                      <th className="py-8 px-6 text-slate-900">6C Ink</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pricing.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-8 px-10 font-black text-slate-900 text-lg tracking-tighter">{row.qty}</td>
                        {['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].map(col => (
                          <td key={col} className="py-4 px-4">
                            <div className="relative group/input">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xs">$</span>
                                <input 
                                className="w-full bg-white pl-8 pr-4 py-4 rounded-xl text-sm font-bold border border-slate-100 outline-none focus:ring-4 focus:ring-orange-100 transition-all"
                                value={row[col]} 
                                onChange={e => {
                                    const newPr = [...pricing];
                                    newPr[idx][col] = e.target.value;
                                    setPricing(newPr);
                                }}
                                />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inks' && (
            <div className="space-y-20 animate-in">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Pigment Registry</h3>
                <button onClick={saveInks} className="bg-[#0A0015] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-purple-600 transition-all">Sync Palette</button>
              </div>
              
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Standard Pigments</h4>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {inks.stock.map((ink: any, idx: number) => (
                    <div key={idx} className="flex flex-col p-8 bg-slate-50/50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-16 h-16 rounded-[1.5rem] shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: ink.hex }}></div>
                        <div className="relative">
                            <input type="color" className="w-10 h-10 rounded-full border-none p-0 cursor-pointer overflow-hidden bg-transparent relative z-10" value={ink.hex} onChange={e => {
                                const newInks = {...inks};
                                newInks.stock[idx].hex = e.target.value;
                                setInks(newInks);
                            }} />
                            <div className="absolute inset-0 bg-white rounded-full border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 pointer-events-none"><i className="fas fa-eye-dropper"></i></div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Ink Name</label>
                            <input className="block w-full text-xs font-black uppercase bg-transparent outline-none border-b border-transparent focus:border-purple-200 transition-all pb-2" value={ink.name} onChange={e => {
                                const newInks = {...inks};
                                newInks.stock[idx].name = e.target.value;
                                setInks(newInks);
                            }} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Pantone Solid Coated</label>
                            <input className="block w-full text-[10px] font-bold text-slate-500 bg-transparent outline-none border-b border-transparent focus:border-slate-200 transition-all pb-2" value={ink.pantone} onChange={e => {
                                const newInks = {...inks};
                                newInks.stock[idx].pantone = e.target.value;
                                setInks(newInks);
                            }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
