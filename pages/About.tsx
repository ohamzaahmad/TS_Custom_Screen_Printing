import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const SPLASH_COLORS = ['bg-orange-500', 'bg-purple-600', 'bg-yellow-400', 'bg-cyan-400', 'bg-pink-500', 'bg-lime-400'];

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  useSEO({
    title: 'About',
    description: 'Learn about ST Custom Screen Printing — 40+ years of screen printing expertise in New Jersey. Custom apparel for businesses, events, and personal use.',
    canonical: '/about',
    ogTitle: 'About ST Custom Screen Printing',
    ogDescription: '40+ years of screen printing expertise in New Jersey. Custom apparel for businesses, events, and personal use.',
  });

  const reduceMotion = useReducedMotion();

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: EASE_OUT },
      };

  const containerProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.8, ease: EASE_OUT },
      };

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative">
        <div className="absolute top-20 right-[10%] w-36 h-14 bg-orange-500 rounded-[2rem] rotate-[-5deg] opacity-90" aria-hidden="true"></div>
        <div className="absolute top-18 right-[9%] w-36 h-14 border-2 border-slate-900 rounded-[2rem] rotate-[-5deg]" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-[5%] w-28 h-12 bg-purple-600 rounded-[2rem] rotate-[3deg] opacity-90" aria-hidden="true"></div>
        <div className="absolute bottom-8 left-[4%] w-28 h-12 border-2 border-slate-900 rounded-[2rem] rotate-[3deg]" aria-hidden="true"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...revealProps}>
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">
              About TS Custom
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-8">
              40+ Years of{' '}
              <span className="text-gradient-orange">Screen Printing</span> Excellence
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl mb-8">
              Based in New Jersey, we combine decades of hands-on expertise with modern techniques to deliver high-quality custom apparel and promotional products with unmatched craftsmanship.
            </p>
          </motion.div>

          <motion.div
            {...revealProps}
            className="grid grid-cols-2 gap-4 md:gap-5"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-3xl translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-7">
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">40+</div>
                <p className="text-slate-600 text-xs font-black uppercase tracking-[0.15em]">Years Experience</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-3xl translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-7">
                <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">100%</div>
                <p className="text-slate-600 text-xs font-black uppercase tracking-[0.15em]">Quality Commitment</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-3xl translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-7">
                <div className="text-3xl md:text-4xl font-black text-yellow-500 mb-2">5000+</div>
                <p className="text-slate-600 text-xs font-black uppercase tracking-[0.15em]">Projects Done</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-3xl translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-7">
                <div className="text-3xl md:text-4xl font-black text-cyan-500 mb-2">DTF</div>
                <p className="text-slate-600 text-xs font-black uppercase tracking-[0.15em]">Advanced Printing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true"></div>

      {/* Our Story Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-[80px]" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-12">
              We Love What We Print
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="space-y-5">
              <h3 className="text-xl font-black uppercase tracking-tight">Core Expertise</h3>
              <ul className="space-y-3">
                {[
                  'Printing on T-shirts, sweatshirts, hoodies, trousers, and bags',
                  'Specialty finishes like raised and glitter printing',
                  'Vibrant, durable prints on every garment',
                  'Custom apparel for businesses, events, schools, and personal use',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(255,103,32,0.4)]"></span>
                    <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl font-black uppercase tracking-tight">Our Commitment</h3>
              <ul className="space-y-3">
                {[
                  'Quality, consistency, and customer satisfaction at our core',
                  'We work closely with each client to bring their vision to life',
                  'Transparent communication from start to finish',
                  'Attention to detail and commitment to excellence in every order',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-2 shadow-[0_0_8px_rgba(147,51,234,0.4)]"></span>
                    <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true"></div>

      {/* Services Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-[10%] w-40 h-16 bg-yellow-400 rounded-[2rem] rotate-[2deg] opacity-80" aria-hidden="true"></div>
        <div className="absolute top-10 right-[8%] w-24 h-24 bg-cyan-400 rounded-full opacity-60" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Services & Capabilities
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: 'Screen Printing',
                description: 'High-fidelity industrial-grade screen printing with precision registration and consistent opacity for maximum durability.',
                color: 'bg-orange-500',
              },
              {
                title: 'DTF Printing',
                description: 'Direct-to-film printing technology for complex designs with unlimited colors and exceptional detail preservation.',
                color: 'bg-purple-600',
              },
              {
                title: 'Specialty Finishes',
                description: 'Raised printing, glitter finishes, and custom treatments that add unique character to your apparel.',
                color: 'bg-yellow-400',
              },
              {
                title: 'Custom Apparel',
                description: 'Tailored solutions for T-shirts, sweatshirts, hoodies, trousers, bags, and specialty garments.',
                color: 'bg-cyan-400',
              },
              {
                title: 'Volume Production',
                description: 'Scalable capacity to handle everything from small runs to large-scale production with consistent quality.',
                color: 'bg-pink-500',
              },
              {
                title: 'Fast Turnaround',
                description: 'Reliable, expedited service without compromising on quality or precision of execution.',
                color: 'bg-lime-400',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_OUT }}
                className="relative"
              >
                <div className={`absolute inset-0 ${service.color} rounded-3xl translate-x-1.5 translate-y-1.5 opacity-20`} aria-hidden="true"></div>
                <div className="relative bg-white border-2 border-slate-900 rounded-3xl p-7">
                  <h3 className="text-base font-black uppercase tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" aria-hidden="true"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-400 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              Why TS Custom
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              What Sets Us Apart
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {[
              {
                title: 'Craftsmanship',
                description: 'Unmatched attention to detail with 40+ years of hands-on expertise in every project.',
              },
              {
                title: 'Modern Techniques',
                description: 'Advanced technology including DTF printing and specialty finishes combined with traditional excellence.',
              },
              {
                title: 'Reliability',
                description: 'Consistent quality across every order with transparent communication from start to finish.',
              },
              {
                title: 'Customer Focus',
                description: 'We work closely with each client to bring their unique vision to life with personalized service.',
              },
              {
                title: 'Quick Turnaround',
                description: 'Fast production without sacrificing quality, because your timeline matters.',
              },
              {
                title: 'Versatility',
                description: 'From small custom orders to large-scale productions, we scale to meet your unique needs.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_OUT }}
                className="flex gap-5"
              >
                <div className="shrink-0 relative">
                  <div className={`absolute inset-0 ${SPLASH_COLORS[idx]} rounded-full translate-x-1 translate-y-1 opacity-70`} aria-hidden="true"></div>
                  <div className={`relative flex items-center justify-center h-12 w-12 rounded-full ${SPLASH_COLORS[idx]}`}>
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed font-medium text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden="true"></div>

      {/* Our Process Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-10 left-[5%] w-20 h-20 bg-purple-600/20 rounded-full blur-[60px]" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Our Process
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Discuss your vision, requirements, and timeline to create the perfect custom apparel solution.',
                color: 'bg-orange-500',
              },
              {
                step: '02',
                title: 'Design & Setup',
                description: 'Artwork optimization and setup for printing, ensuring technical precision and design integrity.',
                color: 'bg-purple-600',
              },
              {
                step: '03',
                title: 'Production',
                description: 'Precision printing with quality control at every stage using advanced techniques and equipment.',
                color: 'bg-yellow-400',
              },
              {
                step: '04',
                title: 'Quality Check & Delivery',
                description: 'Final inspection and packaging before your custom apparel is shipped directly to you.',
                color: 'bg-cyan-400',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: EASE_OUT }}
                className="relative"
              >
                <div className="relative">
                  <div className={`absolute inset-0 ${item.color} rounded-3xl translate-x-1.5 translate-y-1.5 opacity-20`} aria-hidden="true"></div>
                  <div className="relative bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
                    <div className={`inline-flex items-center justify-center w-10 h-10 ${item.color} rounded-full text-white text-sm font-black mb-4`}>{item.step}</div>
                    <h3 className="text-base font-black uppercase tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-8 right-[15%] w-32 h-12 bg-orange-500 rounded-[2rem] rotate-[-3deg] opacity-80" aria-hidden="true"></div>
        <div className="absolute bottom-8 left-[12%] w-28 h-12 bg-purple-600 rounded-[2rem] rotate-[3deg] opacity-80" aria-hidden="true"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div {...containerProps}>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-lg text-white/60 leading-relaxed font-medium mb-12">
              Get in touch with our team to discuss your custom apparel needs and experience the TS Custom difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-full translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
                <button
                  onClick={() => onNavigate('quote')}
                  className="relative bg-white text-slate-950 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Request Quote
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-600 rounded-full translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="relative bg-white text-slate-950 border-2 border-white px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
