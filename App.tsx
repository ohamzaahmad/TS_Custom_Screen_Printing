
import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { 
  HomePageLoader, 
  FormPageLoader, 
  GalleryPageLoader, 
  CataloguePageLoader, 
  AccordionPageLoader,
  ColorGuidePageLoader,
  PricingPageLoader
} from './components/PageLoaders';

const Home = lazy(() => import('./pages/Home'));
const Quote = lazy(() => import('./pages/Quote'));
const Contact = lazy(() => import('./pages/Contact'));
const PrintGuide = lazy(() => import('./pages/PrintGuide'));
const ColorGuide = lazy(() => import('./pages/ColorGuide'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

const PAGE_TO_PATH: Record<string, string> = {
  home: '/',
  quote: '/quote',
  contact: '/contact',
  guide: '/guide',
  colors: '/colors',
  pricing: '/pricing',
  about: '/about',
  gallery: '/gallery',
  catalogue: '/catalogue',
  terms: '/terms',
  refund: '/refund',
  privacy: '/privacy',
};

const pathToPage = (pathname: string): string => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const match = Object.entries(PAGE_TO_PATH).find(([, path]) => path === normalizedPath);
  return match ? match[0] : 'not-found';
};

const getPageLoader = (page: string) => {
  switch (page) {
    case 'home':
      return HomePageLoader;
    case 'quote':
    case 'contact':
      return FormPageLoader;
    case 'gallery':
      return GalleryPageLoader;
    case 'catalogue':
      return CataloguePageLoader;
    case 'terms':
    case 'refund':
    case 'privacy':
      return AccordionPageLoader;
    case 'colors':
      return ColorGuidePageLoader;
    case 'pricing':
      return PricingPageLoader;
    case 'guide':
      return FormPageLoader;
    default:
      return HomePageLoader;
  }
};

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
      document.title = `ST Custom Screen Printing`;
    } else {
      document.title = `Page Not Found | ST Custom Screen Printing`;
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'about':
        return <About onNavigate={navigate} />;
      case 'gallery':
        return <Gallery onNavigate={navigate} />;
      case 'catalogue':
        return <Catalogue onNavigate={navigate} />;
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
      case 'terms':
        return <TermsAndConditions onNavigate={navigate} />;
      case 'refund':
        return <RefundPolicy onNavigate={navigate} />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={navigate} />;
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
        <Suspense fallback={React.createElement(getPageLoader(currentPage))}>
          {renderPage()}
        </Suspense>
      </main>
      {showNav && <Footer onNavigate={navigate} />}
    </div>
  );
};

export default App;
