import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const About: React.FC<AboutProps> = ({ onNavigate }) => {
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
    <div className="bg-[#fcfcfc] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
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
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">40+</div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Years Experience</p>
            </div>
            <div className="bg-slate-900 text-white rounded-3xl p-8">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">100%</div>
              <p className="text-white/60 text-sm font-bold uppercase tracking-wide">Quality Commitment</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">5000+</div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Projects Completed</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-purple-600 text-white rounded-3xl p-8">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">DTF</div>
              <p className="text-white/80 text-sm font-bold uppercase tracking-wide">Advanced Printing</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-12">
              Specialized in Professional Printing
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tight">Core Expertise</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                We specialize in professional printing on T-shirts, sweatshirts, hoodies, trousers, and bags, along with specialty finishes such as raised and glitter printing that add a unique and eye-catching touch to every design.
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                Our team combines decades of hands-on expertise with modern techniques to ensure every print is vibrant, durable, and precisely crafted. Whether you need custom apparel for businesses, events, schools, or personal use, we are committed to providing reliable service, fast turnaround times, and exceptional attention to detail.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tight">Our Commitment</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                At the core of our business is a dedication to quality, consistency, and customer satisfaction. We work closely with each client to bring their vision to life, making sure every order meets the highest standards.
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                From the initial design consultation to final delivery, we maintain transparent communication and ensure your custom apparel is exactly what you envisioned. Our attention to detail and commitment to excellence is what sets us apart in the industry.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Screen Printing',
                description: 'High-fidelity industrial-grade screen printing with precision registration and consistent opacity for maximum durability.',
                icon: '🖨️',
              },
              {
                title: 'DTF Printing',
                description: 'Direct-to-film printing technology for complex designs with unlimited colors and exceptional detail preservation.',
                icon: '🎨',
              },
              {
                title: 'Specialty Finishes',
                description: 'Raised printing, glitter finishes, and custom treatments that add unique character to your apparel.',
                icon: '✨',
              },
              {
                title: 'Custom Apparel',
                description: 'Tailored solutions for T-shirts, sweatshirts, hoodies, trousers, bags, and specialty garments.',
                icon: '👕',
              },
              {
                title: 'Volume Production',
                description: 'Scalable capacity to handle everything from small runs to large-scale production with consistent quality.',
                icon: '📦',
              },
              {
                title: 'Fast Turnaround',
                description: 'Reliable, expedited service without compromising on quality or precision of execution.',
                icon: '⚡',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE_OUT }}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...containerProps} className="mb-16">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
              Why TS Custom
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              What Sets Us Apart
            </h2>
          </motion.div>

          <motion.div
            {...containerProps}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
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
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Discuss your vision, requirements, and timeline to create the perfect custom apparel solution.',
              },
              {
                step: '02',
                title: 'Design & Setup',
                description: 'Artwork optimization and setup for printing, ensuring technical precision and design integrity.',
              },
              {
                step: '03',
                title: 'Production',
                description: 'Precision printing with quality control at every stage using advanced techniques and equipment.',
              },
              {
                step: '04',
                title: 'Quality Check & Delivery',
                description: 'Final inspection and packaging before your custom apparel is shipped directly to you.',
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
                <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-3xl p-8 border border-slate-200">
                  <div className="text-5xl font-black text-slate-200 mb-6">{item.step}</div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <svg
                      className="w-8 h-8 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...containerProps}>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
              Get in touch with our team to discuss your custom apparel needs and experience the TS Custom difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('quote')}
                className="bg-slate-950 text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
              >
                Request Quote
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white text-slate-950 border-2 border-slate-950 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
