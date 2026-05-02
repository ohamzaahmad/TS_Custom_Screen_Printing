
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CatalogueProps {
  onNavigate: (page: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const Catalogue: React.FC<CatalogueProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion();

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: EASE_OUT },
      };

  return (
    <div className="bg-[#fcfcfc] min-h-screen overflow-hidden">
      {/* Hero Section - Brief Intro */}
      <section className="pt-24 pb-12 px-6 sm:px-8 lg:px-12">
        <motion.div {...revealProps} className="max-w-6xl mx-auto text-center">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-[10px] mb-4 block">
            Order Workflow
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight mb-4">
              <span className="text-orange-500">Browse.</span> <span className="text-purple-500">Select.</span> <span className="text-slate-900">Order.</span>
          </h1>
          <p className="text-base text-slate-600 leading-snug font-medium max-w-xl mx-auto">
            Simple 3-step process to bring your custom apparel to life
          </p>
        </motion.div>
      </section>

      {/* Main Visual Workflow */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Step 1: Browse Catalog */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-8 md:mb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  {/* Step Number */}
                  <div className="text-5xl md:text-6xl font-black text-orange-100 mb-4 leading-none">01</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">
                    Browse Our Partners
                  </h2>
                  <p className="text-slate-600 text-sm leading-snug font-medium mb-6">
                    Choose from premium fabric and garment catalogues
                  </p>
                  
                  <div className="space-y-4">
                    <motion.a
                      href="https://www.companycasuals.com/stcsprinting/start.jsp"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={reduceMotion ? undefined : { scale: 1.03, y: -4 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className="flex flex-col gap-3 p-6 border-3 border-orange-500 rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden"
                    >
                      {/* Animated background pulse */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 right-3 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        Click Here
                      </div>

                      <div className="relative z-10">
                        <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <h3 className="font-black text-white uppercase tracking-tight text-lg">Browse our Catalogue Now</h3>
                        {/* <p className="text-orange-50 text-sm leading-snug font-semibold">S&S Active Wear - Premium Blanks & Garments</p> */}
                      </div>

                      <div className="relative z-10 flex items-center gap-2 text-white font-bold text-sm mt-2">
                        <span>Open External Link</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>

              <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} className="order-1 lg:order-2">
                  <div className="relative h-56 md:h-72 rounded-xl overflow-hidden border border-slate-200 shadow-md bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                  <div className="text-center space-y-4 px-6">
                    <svg className="w-8 h-8 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <p className="text-slate-600 font-bold text-sm uppercase tracking-wide">Browse & Explore</p>
                    <p className="text-slate-500 text-xs font-medium">Find styles, colors & sizes</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Arrow Down */}
          <motion.div animate={reduceMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-center mb-8 md:mb-16">
            <svg className="w-8 h-8 text-orange-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>

          {/* Step 2: Note Selection */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_OUT }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <motion.div whileHover={reduceMotion ? undefined : { y: -2 }}>
                  <div className="relative h-56 md:h-72 rounded-xl overflow-hidden border border-slate-200 shadow-md bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                  <div className="text-center space-y-4 px-6">
                    <svg className="w-8 h-8 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <p className="text-slate-600 font-bold text-sm uppercase tracking-wide">Note Details</p>
                    <p className="text-slate-500 text-xs font-medium">Item codes, colors, sizes</p>
                  </div>
                </div>
              </motion.div>

              <div>
                <div className="relative">
                  {/* Step Number */}
                  <div className="text-5xl md:text-6xl font-black text-purple-100 mb-4 leading-none">02</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">
                    Note Your Picks
                  </h2>
                  <p className="text-slate-600 text-sm leading-snug font-medium mb-6">
                    Remember the item codes, colors, and quantities you selected
                  </p>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-6">
                    <div className="space-y-3 text-sm font-medium text-slate-700">
                      <div className="flex gap-2">
                        <span className="text-xl">✓</span>
                        <span>Item codes (e.g., XL-001)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xl">✓</span>
                        <span>Color selections</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xl">✓</span>
                        <span>Quantities needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow Down */}
          <motion.div animate={reduceMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-center mb-8 md:mb-16">
            <svg className="w-8 h-8 text-purple-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>

          {/* Step 3: Complete Order */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_OUT }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  {/* Step Number */}
                  <div className="text-5xl md:text-6xl font-black text-slate-900 mb-4 leading-none">03</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">
                    Complete Your Order
                  </h2>
                  <p className="text-slate-600 text-sm leading-snug font-medium mb-8">
                    Return here and fill out your quote form with the selections
                  </p>

                  <div className="space-y-4">
                      <button onClick={() => onNavigate('quote')} className="w-full bg-linear-to-r from-slate-900 to-purple-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-[0.2em] text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Fill Quote Form
                    </button>
                      <button onClick={() => onNavigate('contact')} className="w-full bg-linear-to-r from-orange-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-[0.2em] text-sm hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="order-1 lg:order-2"
              >
                <div className="relative h-56 md:h-72 rounded-xl overflow-hidden border border-slate-900 shadow-md bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="text-center space-y-4 px-6">
                    <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-white font-bold text-sm uppercase tracking-wide">Submit Your Order</p>
                    <p className="text-slate-300 text-xs font-medium">Get your custom apparel printed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-orange-500 via-purple-500 to-slate-900" aria-hidden="true"></div>

              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-black border-4 border-white shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-black text-center text-slate-900 uppercase tracking-tight mb-2">
                  External Catalog
                </h3>
                <p className="text-center text-slate-600 text-sm font-medium">
                  S&S Active Wear
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-black border-4 border-white shadow-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-black text-center text-slate-900 uppercase tracking-tight mb-2">
                  Note Selections
                </h3>
                <p className="text-center text-slate-600 text-sm font-medium">
                  Item codes, colors, qty
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-black border-4 border-white shadow-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-black text-center text-slate-900 uppercase tracking-tight mb-2">
                  Our Website
                </h3>
                <p className="text-center text-slate-600 text-sm font-medium">
                  Fill & submit quote
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Support */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-blue-50 border-t border-blue-200">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border-2 border-blue-300 rounded-3rem p-8 md:p-12 flex items-start gap-6">
            <svg className="w-10 h-10 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <div className="grow">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-slate-900">
                Need Help?
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Our team is ready to guide you through the entire process. Call, email, or chat with us anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+17323470101" className="bg-slate-900 text-white px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.029a2.42 2.42 0 010 4.33l-2.048 1.029a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" />
                  </svg>
                  Call us
                </a>
                <a href="mailto:info@stcsprinting.com" className="bg-blue-600 text-white px-6 py-3 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-700 transition-all inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Catalogue;
