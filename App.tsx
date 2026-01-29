
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Contact from './pages/Contact';
import PrintGuide from './pages/PrintGuide';
import ColorGuide from './pages/ColorGuide';
import Pricing from './pages/Pricing';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [quoteInitialProduct, setQuoteInitialProduct] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      
      const isAuth = localStorage.getItem('ts_admin_authenticated') === 'true';
      setIsAdminAuth(isAuth);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // `Catalogue` page removed; product quote flow handled from other pages

  const renderPage = () => {
    if (currentPage === 'dashboard' && !isAdminAuth) {
      navigate('admin');
      return null;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      // catalogue route removed
      case 'quote':
        return <Quote initialProduct={quoteInitialProduct} />;
      case 'contact':
        return <Contact />;
      case 'guide':
        return <PrintGuide />;
      case 'colors':
        return <ColorGuide />;
      case 'pricing':
        return <Pricing />;
      case 'admin':
        return <AdminLogin onLogin={() => navigate('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return (
            <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-6 animate-in">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Our Manifest</span>
            <h1 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight leading-tight">The TS<br /><span className="text-gradient-orange italic">Standard.</span></h1>
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-lg text-slate-500 leading-relaxed font-medium mb-8 max-w-2xl">
                Founded with a mission to eliminate the average. TS Custom Screen Printing combines architectural precision with industrial-grade production for high-fidelity apparel solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
                  <div className="bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm">
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Artisanal Scale</h3>
                      <p className="text-slate-500 font-medium">We don't just "print shirts." We manufacture tactical brand assets. Our team treats every ink deposit as a chemical equation for quality.</p>
                  </div>
                  <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-xl">
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Industrial Truth</h3>
                      <p className="text-white/40 font-medium">Garments should survive the lifestyle of the wearer. Our forced-air curing processes guarantee structural ink integrity for the life of the cotton.</p>
                  </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  const showNav = !['admin', 'dashboard'].includes(currentPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] selection:bg-purple-600 selection:text-white">
      {showNav && <Navbar currentPage={currentPage} onNavigate={navigate} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {showNav && <Footer />}
    </div>
  );
};

export default App;
