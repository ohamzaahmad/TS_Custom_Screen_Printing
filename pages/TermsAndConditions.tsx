import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TermsAndConditionsProps {
  onNavigate?: (page: string) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const sections = [
    {
      title: 'CONTENT',
      content: `The information, materials and services contained in this website (the "Content") are provided on an "as is" basis without warranties of any kind, either express or implied. ST Custom Screen Printing makes no warranty that the Content is error-free or that access to the Content will be uninterrupted or error-free.`
    },
    {
      title: 'COPYRIGHT AND TRADEMARKS',
      content: `The Content on this website, including all text, graphics, logos, images, and software is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, transmit, display, or create derivative works from the Content without prior written permission from ST Custom Screen Printing or the respective copyright holder.`
    },
    {
      title: 'HOLD HARMLESS',
      content: `You agree to hold harmless and indemnify ST Custom Screen Printing, its owners, employees, and agents from any and all claims, damages, liabilities, costs, and expenses (including legal fees) arising from your use of this website or any Content therein, or from your violation of these Terms and Conditions.`
    },
    {
      title: 'TURNAROUND TIME',
      content: `Turnaround times are estimates only and not guaranteed. Rush orders may be available upon request with additional charges. ST Custom Screen Printing is not responsible for delays caused by factors beyond its control, including but not limited to material delays, equipment failures, or acts of God.`
    },
    {
      title: 'LIABILITY WAIVER',
      content: `To the fullest extent permitted by law, ST Custom Screen Printing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or any services provided.`
    },
    {
      title: 'PRICING AND PAYMENT',
      content: `All prices are subject to change without notice. Payment is due upon invoice unless other arrangements have been made. Late payments may incur additional charges or suspension of services.`
    },
    {
      title: 'PRODUCT SPECIFICATIONS',
      content: `ST Custom Screen Printing provides specifications and samples based on available materials. Color matching is approximate and subject to variations in materials and printing processes. Custom orders are non-refundable once production has begun.`
    },
    {
      title: 'USER CONDUCT',
      content: `You agree not to use this website for any unlawful purposes or in any way that violates these Terms and Conditions. Prohibited conduct includes, but is not limited to: harassment, threats, defamation, copyright infringement, and transmission of viruses or malware.`
    },
    {
      title: 'INTELLECTUAL PROPERTY',
      content: `Any designs, artwork, or intellectual property you submit to ST Custom Screen Printing for production remain your property. However, you grant ST Custom Screen Printing a non-exclusive license to reproduce your work for fulfillment purposes and may authorize ST Custom Screen Printing to retain samples for portfolio or reference purposes.`
    },
    {
      title: 'THIRD-PARTY LINKS',
      content: `This website may contain links to third-party websites. ST Custom Screen Printing is not responsible for the content, accuracy, or practices of third-party websites. Your use of third-party websites is governed by their respective terms and conditions.`
    },
    {
      title: 'LIMITATION OF LIABILITY',
      content: `In no event shall ST Custom Screen Printing's total liability exceed the amount paid by you for the product or service in question. This limitation applies even if ST Custom Screen Printing has been advised of the possibility of such damages.`
    },
    {
      title: 'MODIFICATIONS TO TERMS',
      content: `ST Custom Screen Printing reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of any modified terms.`
    },
    {
      title: 'DISPUTE RESOLUTION',
      content: `Any disputes arising from these Terms and Conditions or your use of this website shall be governed by the laws of the State of New Jersey, without regard to conflicts of law principles. You agree to submit to the jurisdiction of the courts located in New Jersey.`
    },
    {
      title: 'CONFIDENTIALITY',
      content: `ST Custom Screen Printing will maintain the confidentiality of any proprietary information or trade secrets you provide, except as required by law or as necessary to fulfill your order.`
    },
    {
      title: 'WARRANTIES DISCLAIMER',
      content: `EXCEPT AS EXPRESSLY STATED IN THESE TERMS AND CONDITIONS, ST Custom Screen Printing MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.`
    },
    {
      title: 'CANCELLATION POLICY',
      content: `Orders may be cancelled within 24 hours of placement at no charge. After 24 hours, a cancellation fee may apply. Orders in production or completed cannot be cancelled.`
    },
    {
      title: 'QUALITY ASSURANCE',
      content: `ST Custom Screen Printing performs quality control checks on all products. Minor variations in color, placement, or print density may occur and are considered normal and acceptable. Claims must be submitted within 7 days of delivery.`
    },
    {
      title: 'RETURNS AND EXCHANGES',
      content: `Defective products may be returned within 7 days of delivery with photographic evidence. Returns are subject to inspection and approval. Approved returns will be replaced at no charge; shipping costs are the responsibility of the customer.`
    },
    {
      title: 'ENVIRONMENTAL COMPLIANCE',
      content: `ST Custom Screen Printing is committed to environmentally responsible practices in our manufacturing processes. We comply with all applicable environmental regulations and encourage customers to properly dispose of packaging materials.`
    },
    {
      title: 'ACCESSIBILITY',
      content: `ST Custom Screen Printing is committed to ensuring this website is accessible to all users. If you encounter accessibility issues, please contact us at info@stcsprinting.com or (732) 347-0101.`
    },
    {
      title: 'BULK ORDERS',
      content: `Bulk orders of 100+ units may qualify for volume discounts. Quote requests for bulk orders should include quantity, specifications, and timeline. Custom pricing will be provided upon review.`
    },
    {
      title: 'CUSTOM ARTWORK',
      content: `ST Custom Screen Printing can assist with artwork creation and modification. Design services are quoted separately. Final artwork approval by the customer is required before production begins.`
    },
    {
      title: 'SHIPPING',
      content: `Shipping costs are calculated based on destination, weight, and service level selected. Delivery times are estimates only. ST Custom Screen Printing is not liable for delays or loss of shipments once handed off to carriers. Customers may purchase shipping insurance at checkout.`
    },
    {
      title: 'PRIVACY POLICY',
      content: `Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.`
    },
    {
      title: 'CONTACT FOR DISPUTES',
      content: `If you have questions or concerns about these Terms and Conditions, please contact ST Custom Screen Printing at info@stcsprinting.com or (732) 347-0101. We will make reasonable efforts to resolve any disputes promptly.`
    },
    {
      title: 'SEVERABILITY',
      content: `If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.`
    },
    {
      title: 'ENTIRE AGREEMENT',
      content: `These Terms and Conditions, along with any other agreements or policies referenced herein, constitute the entire agreement between you and ST Custom Screen Printing regarding your use of this website and services provided. Any prior negotiations, representations, or agreements are superseded by these Terms and Conditions.`
    },
    {
      title: 'FORCE MAJEURE',
      content: `ST Custom Screen Printing shall not be held liable for any failure or delay in performance under these Terms and Conditions due to circumstances beyond its reasonable control, including acts of God, natural disasters, war, terrorism, labor strikes, or government action.`
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div ref={contentRef} className="min-h-screen bg-linear-to-b from-brand-dark to-[#1a0f2e] pt-36 pb-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            <span className="text-orange-500">Terms </span>
            <span className="text-purple-500">&amp; </span>
            <span className="text-white">Conditions</span>
          </h1>
          <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
            Please review these terms carefully. By using our services, you agree to be bound by these conditions.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-12 p-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-medium text-center"
        >
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.div>

        {/* Accordion Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/3 hover:bg-white/6 transition-colors"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-black uppercase tracking-[0.2em] text-white text-sm flex items-center gap-3">
                  <span className="text-[10px] font-black text-orange-500 bg-white/10 px-2 py-1 rounded-full">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </span>
                <motion.div
                  animate={{ rotate: expandedSections.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-purple-500 shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </button>

              <motion.div
                animate={{
                  height: expandedSections.has(index) ? 'auto' : 0,
                  opacity: expandedSections.has(index) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-white/70 text-sm font-medium leading-relaxed border-t border-white/5">
                  {section.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 p-8 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-white/10 rounded-2xl text-center"
        >
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-[0.2em]">Questions?</h3>
          <p className="text-white/60 text-sm font-medium mb-6">
            If you have any questions about these terms, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@stcsprinting.com"
              className="px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              Email Us
            </a>
            <a
              href="tel:+17323470101"
              className="px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              Call Us
            </a>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} ST Custom Screen Printing
          </p>
          {onNavigate && (
            <button
              onClick={() => onNavigate('home')}
              className="text-orange-400 hover:text-orange-300 text-xs font-black uppercase tracking-[0.2em] transition-colors"
            >
              Back to Home
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
