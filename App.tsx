
import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Skeleton from './components/Skeleton';

const Home = lazy(() => import('./pages/Home'));
const Quote = lazy(() => import('./pages/Quote'));
const Contact = lazy(() => import('./pages/Contact'));
const PrintGuide = lazy(() => import('./pages/PrintGuide'));
const ColorGuide = lazy(() => import('./pages/ColorGuide'));
const Pricing = lazy(() => import('./pages/Pricing'));

const PAGE_TO_PATH: Record<string, string> = {
  home: '/',
  quote: '/quote',
  contact: '/contact',
  guide: '/guide',
  colors: '/colors',
  pricing: '/pricing',
  about: '/about',
};

const pathToPage = (pathname: string): string => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const match = Object.entries(PAGE_TO_PATH).find(([, path]) => path === normalizedPath);
  return match ? match[0] : 'not-found';
};

const PageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-[#0A0015] animate-in">
    <div className="pt-36 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-16">
        {/* Hero Section Skeleton */}
        <div className="space-y-8">
          <Skeleton className="h-6 w-32 rounded-full skeleton-dark" />
          <div className="space-y-4">
            <Skeleton className="h-16 md:h-24 w-3/4 lg:w-1/2 skeleton-dark" />
            <Skeleton className="h-16 md:h-24 w-1/2 lg:w-1/3 skeleton-dark" />
          </div>
          <Skeleton className="h-24 w-full md:w-2/3 lg:w-1/2 rounded-3xl skeleton-dark" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-14 w-full sm:w-48 rounded-full skeleton-dark" />
            <Skeleton className="h-14 w-full sm:w-48 rounded-full skeleton-dark" />
          </div>
        </div>
        
        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-64 w-full rounded-3rem shadow-sm skeleton-dark" />
              <div className="space-y-3">
                <Skeleton className="h-8 w-3/4 skeleton-dark" />
                <Skeleton className="h-4 w-full skeleton-dark" />
                <Skeleton className="h-4 w-5/6 skeleton-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(pathToPage(window.location.pathname));

  useEffect(() => {
    const hashPage = window.location.hash.replace('#', '').trim();
    if (hashPage && PAGE_TO_PATH[hashPage]) {
      const targetPath = PAGE_TO_PATH[hashPage];
      window.history.replaceState({}, '', targetPath);
    }

    const handleRouteChange = () => {
      setCurrentPage(pathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navigate = (page: string) => {
    const targetPath = PAGE_TO_PATH[page] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPage !== 'not-found') {
      document.title = `TS Custom Screen Printing`;
    } else {
      document.title = `Page Not Found | TS Custom Screen Printing`;
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      // catalogue route removed
      case 'quote':
        return <Quote />;
      case 'contact':
        return <Contact />;
      case 'guide':
        return <PrintGuide />;
      case 'colors':
        return <ColorGuide />;
      case 'pricing':
        return <Pricing />;
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
                  <div className="bg-white border border-slate-100 p-12 rounded-3rem shadow-sm">
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Artisanal Scale</h3>
                      <p className="text-slate-500 font-medium">We don't just "print shirts." We manufacture tactical brand assets. Our team treats every ink deposit as a chemical equation for quality.</p>
                  </div>
                  <div className="bg-slate-900 text-white p-12 rounded-3rem shadow-xl">
                      <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Industrial Truth</h3>
                      <p className="text-white/40 font-medium">Garments should survive the lifestyle of the wearer. Our forced-air curing processes guarantee structural ink integrity for the life of the cotton.</p>
                  </div>
              </div>
            </div>
          </div>
        );
      case 'not-found':
        return (
          <section className="min-h-screen pt-36 pb-20 px-6 bg-linear-to-b from-slate-50 to-white">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">404</span>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 mb-6">Page Not Found</h1>
              <p className="text-slate-500 font-medium mb-10">The page you requested is unavailable. Use the actions below to continue browsing.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('home')}
                  className="bg-slate-900 text-white px-7 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs"
                >
                  Back Home
                </button>
                <button
                  onClick={() => navigate('quote')}
                  className="bg-orange-500 text-white px-7 py-3 rounded-full font-black uppercase tracking-[0.2em] text-xs"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  const showNav = !['not-found'].includes(currentPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] selection:bg-purple-600 selection:text-white">
      {showNav && <Navbar currentPage={currentPage} onNavigate={navigate} />}
      <main key={currentPage} className="grow">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      {showNav && <Footer onNavigate={navigate} />}
    </div>
  );
};

export default App;
