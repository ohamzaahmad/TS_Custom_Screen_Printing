import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "../hooks/useSEO";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const Contact: React.FC = () => {
  useSEO({
    title: "Contact",
    description:
      "Contact ST Custom Screen Printing for custom apparel orders, quotes, and inquiries. Located in Manahawkin, NJ. Call (732) 347-0101 or email info@stcsprinting.com.",
    canonical: "/contact",
    ogTitle: "Contact ST Custom Screen Printing",
    ogDescription:
      "Get in touch for custom apparel orders, quotes, and inquiries. Located in Manahawkin, NJ.",
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

  useEffect(() => {
    const id = "cognito-contact-embed";
    const container = document.getElementById(id);
    if (!container) return;
    const existing = container.querySelector("script[data-cognito]");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = "https://www.cognitoforms.com/f/seamless.js";
    script.setAttribute("data-key", "gzpyeDOGH0GjzjW1uBxIDg");
    script.setAttribute("data-form", "3");
    script.setAttribute("data-cognito", "true");
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen bg-white animate-in pt-24 md:pt-28 lg:pt-32">
      <div
        className="absolute inset-0 z-0 bg-linear-to-b from-orange-50 via-white to-white"
        aria-hidden="true"
      ></div>

      {/* Header */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            reduceMotion ? undefined : { duration: 0.7, ease: EASE_OUT }
          }
        >
          <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Let&apos;s Start Your{" "}
            <span className="text-gradient-orange">Project</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl text-lg">
            Ready to bring your vision to life? Reach out to our team for a
            consultation, quote, or any questions about our services.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-20">
        <motion.div
          {...revealProps}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10"
        >
          {/* Left Column - Info & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info Card */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-6">
                Contact Information
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+17323470101"
                      className="font-bold hover:text-orange-400 transition-colors"
                    >
                      (732) 347-0101
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@stcsprinting.com"
                      className="font-bold hover:text-orange-400 transition-colors"
                    >
                      info@stcsprinting.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                      Hours
                    </p>
                    <p className="font-bold">Mon-Sat, 9am-6pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">
                      Location
                    </p>
                    <p className="font-bold leading-relaxed">
                      1 Bradshaw Drive
                      <br />
                      Manahawkin, NJ 08050
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden h-72 border border-slate-200">
              <iframe
                title="ST Custom Screen Printing Location"
                src="https://www.google.com/maps?q=ST+Custom+Screen+Printing,+1+Bradshaw+Dr,+Manahawkin,+NJ+08050,+United+States&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
                Send A Message
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-6">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>
              <div id="cognito-contact-embed" className="min-h-[450px]"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 py-16 bg-slate-50 border-t border-slate-100">
        <motion.div {...revealProps} className="max-w-7xl mx-auto text-center">
          <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
            Prefer To Talk?
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Call Us Directly
          </h2>
          <p className="text-slate-500 font-medium mb-8 max-w-xl mx-auto">
            Our team is available during business hours to discuss your project
            requirements and provide immediate assistance.
          </p>
          <a
            href="tel:+17323470101"
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            (732) 347-0101
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
