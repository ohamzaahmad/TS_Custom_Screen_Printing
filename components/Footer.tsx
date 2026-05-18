
import React, { useState } from 'react';
import { Logo } from '../constants';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const navigateTo = (path: string, pageId?: string) => {
    if (onNavigate && pageId) {
      onNavigate(pageId);
    } else {
      window.location.href = path;
    }
  };

  const faqs = [
    {
      question: 'What is your typical turnaround time?',
      answer: 'Our standard turnaround is 10-12 business days for most orders. Rush options are available for expedited production. Contact us to discuss timeline options for your specific project.',
    },
    {
      question: 'What types of garments do you print on?',
      answer: 'We print on a wide range of apparel including T-shirts, hoodies, sweatshirts, trousers, jackets, hats, bags, and more. We work with various garment types and can accommodate custom requests.',
    },
    {
      question: 'What printing methods do you offer?',
      answer: 'We specialize in screen printing with advanced techniques including DTF (Direct-to-Film) printing, specialty finishes like raised and glitter printing, and traditional silk screening for maximum durability.',
    },
    {
      question: 'Do you have a minimum order quantity?',
      answer: 'We accept orders of various sizes, from small custom runs to large-scale production. Contact our team to discuss minimum quantities for your specific project and requirements.',
    },
    {
      question: 'How do I submit my design?',
      answer: 'You can submit designs through our quote form, via email, or by contacting our team directly. We accept vector files (AI, EPS), high-res PNGs, and other standard formats. Our design team can also help optimize your artwork.',
    },
    {
      question: 'Can you help with design adjustments?',
      answer: 'Absolutely! Our experienced team can provide design recommendations, color adjustments, and placement suggestions to ensure your print looks perfect on your chosen garment.',
    },
    {
      question: 'What if I need to change my order after submitting?',
      answer: 'Contact us immediately. Depending on the production stage, we may be able to accommodate changes. It\'s best to reach out as soon as possible to discuss your modification.',
    },
    {
      question: 'How do I browse fabric options?',
      answer: 'We partner with leading suppliers like S&S Active Wear. Visit our Catalogue page to browse available options, select your preferred fabrics and colors, then return to our quote form to complete your order.',
    },
    {
      question: 'Do you offer custom color matching?',
      answer: 'Yes, we offer color matching services to ensure your prints match your brand specifications exactly. Check our Ink Color Lab for available options and contact us for custom color requirements.',
    },
    {
      question: 'How can I get a quote?',
      answer: 'Simply fill out our online quote form with your project details, or contact us directly via phone at (732) 347-0101 or email at info@stcsprinting.com for a personalized quote.',
    },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-12 pb-8 border-t border-white/5 relative z-30 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="footer-blob footer-blob-1" aria-hidden="true"></div>
        <div className="footer-blob footer-blob-2" aria-hidden="true"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* FAQ Section */}
        <div className="mb-20 pb-20 border-b border-white/5">
          <div className="mb-12">
            <h3 className="font-black text-[11px] mb-6 uppercase tracking-[0.4em] text-orange-500">Common Questions</h3>
            <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">Frequently Asked Questions</h4>
            <p className="text-white/40 text-sm font-medium max-w-2xl">Get answers to common questions about our services, process, and capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <h5 className="font-black text-white text-sm leading-relaxed pr-2">
                    {faq.question}
                  </h5>
                  <div className={`shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center transition-transform duration-300 ${expandedFAQ === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                {expandedFAQ === idx && (
                  <p className="mt-4 text-white/60 text-sm leading-relaxed font-medium border-t border-white/5 pt-4">
                    {faq.answer}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* FAQ CTA */}
          <div className="mt-8 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-white/80 text-sm font-medium">
                Didn't find what you're looking for?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href="tel:+17323470101" className="text-orange-400 hover:text-orange-300 text-sm font-black uppercase tracking-[0.2em]">
                Call us
              </a>
              <span className="hidden sm:block text-white/20">•</span>
              <a href="mailto:info@stcsprinting.com" className="text-orange-400 hover:text-orange-300 text-sm font-black uppercase tracking-[0.2em]">
                Email us
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-start mb-6">
              <div className="bg-black rounded-2xl p-3 inline-block shadow-lg">
                <Logo className="h-10" subtitleAlwaysVisible />
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              High-fidelity apparel solutions for modern brands. We combine architectural precision with industrial-grade screen printing.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-[11px] mb-8 uppercase tracking-[0.4em] text-orange-500">Legal</h4>
            <ul className="space-y-4 text-white/60 text-sm font-bold uppercase tracking-widest">
              <li>
                <button 
                  onClick={() => navigateTo('/terms', 'terms')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('/refund', 'refund')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('/privacy', 'privacy')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[11px] mb-8 uppercase tracking-[0.4em] text-orange-500">Project Resources</h4>
            <ul className="space-y-4 text-white/60 text-sm font-bold uppercase tracking-widest">
              <li>
                <button 
                  onClick={() => navigateTo('https://www.companycasuals.com/stcsprinting/start.jsp')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Full Catalogue
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('/pricing', 'pricing')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Pricing Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('/guide', 'guide')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-2 group"
                >
                  <i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                  Placement Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('/colors', 'colors')} 
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
                1 Bradshaw Drive, Manahawkin NJ 08050
              </li>
              <li className="flex items-center gap-4">
                <i className="fas fa-phone-alt text-orange-500"></i>
                (732) 347-0101
              </li>
              <li className="flex items-center gap-4">
                <i className="fas fa-envelope text-orange-500"></i>
                info@stcsprinting.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] font-black uppercase tracking-[0.3em] gap-8">
          <p>&copy; {new Date().getFullYear()} ST Custom Screen Printing. Precision Manufactured.</p>
          <div className="flex space-x-8">
            <a href="#" aria-label="Follow us on Instagram" className="hover:text-white transition-colors"><i className="fab fa-instagram text-base"></i></a>
            <a href="#" aria-label="Follow us on Twitter" className="hover:text-white transition-colors"><i className="fab fa-twitter text-base"></i></a>
            <a href="#" aria-label="Follow us on Vimeo" className="hover:text-white transition-colors"><i className="fab fa-vimeo-v text-base"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
