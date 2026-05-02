import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RefundPolicyProps {
  onNavigate?: (page: string) => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const policies = [
    {
      title: 'Sales Order & Invoice Misreading',
      content: 'We will not refund or reprint due to misreading the sales order and invoice. If the mistake was ours, we will make it right. If it was approved on your end, we will not consider that claim.'
    },
    {
      title: 'Artwork Approval Issues',
      content: 'We will not refund or reprint due to misreading the final artwork approval. If it was approved and we followed that approval, we will not consider a claim.'
    },
    {
      title: 'Print Size Discrepancies',
      content: 'We will not refund or reprint for the size of the print not matching the virtual proof. We only match the sizing called out. The mockups are a close guess, but aren\'t what will be used in production.'
    },
    {
      title: 'Claim Inspection Process',
      content: 'We may require the items to be sent back to our main office for inspection prior to determining the status of a claim.'
    },
    {
      title: 'Claim Time Limit',
      content: 'We do not consider claims on orders that are more than 30 days old from reception of product.'
    },
    {
      title: 'Screen Color Differences',
      content: 'We do not consider claims due to screen color differences. Since it\'s impossible to replicate "on screen" images and actual colors, we can only guarantee the ink colors used, not a match to the colors on the screen.'
    },
    {
      title: 'Garment Sizing Issues',
      content: 'We do not provide refunds or reprints due to sizing issues unless the garment is defective. Since we only print on the garments and don\'t manufacture them, we can\'t control the fit of the garments.'
    },
    {
      title: 'Wear & Tear',
      content: 'We do not reprint or refund for pilling of hoodies or discoloration due to wear and sun exposure.'
    },
    {
      title: 'Satisfaction Guarantee',
      content: 'We do not provide refunds due to just not liking the final outcome. If the print matches the proof and the print is what was ordered, no refunds or reprints will be provided. However, we may offer a better solution for you for the future.'
    },
    {
      title: 'Glow in the Dark Intensity',
      content: 'We do not refund or reprint orders that are glow in the dark due to glow intensity.'
    },
    {
      title: 'Discharge Ink Fabric Conflicts',
      content: 'We do not refund or reprint discharge orders that have adverse effects due to fabric conflicts with discharge. Since discharge is a re-dyeing process that only works with certain colors of cotton, we can\'t guarantee results.'
    },
    {
      title: 'Reprint Methods',
      content: 'Any reprints may use a different print method to fulfill the order which may vary slightly from the original.'
    },
    {
      title: 'Group Order Claims',
      content: 'We do not accept claims from members of a group order. Only our point of contact who placed the initial order.'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-brand-dark to-[#1a0f2e] pt-36 pb-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Policy</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            <span className="text-orange-500">Refund </span>
            <span className="text-purple-500">Policy</span>
          </h1>
          <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
            Please review our refund and reprint policy to understand our commitment to quality and fair claim resolution.
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

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-12 p-6 bg-linear-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="text-orange-500 shrink-0 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2">Important Note</p>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                We stand behind our work. If a mistake is ours, we will make it right. Our policies are designed to ensure fair treatment for both our business and our customers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Policy Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/3 hover:bg-white/6 transition-colors"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-black uppercase tracking-[0.2em] text-white text-sm flex items-center gap-3">
                  <span className="text-[10px] font-black text-orange-500 bg-white/10 px-2 py-1 rounded-full">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {policy.title}
                </span>
                <motion.div
                  animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
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
                  height: expandedItems.has(index) ? 'auto' : 0,
                  opacity: expandedItems.has(index) ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-white/70 text-sm font-medium leading-relaxed border-t border-white/5">
                  {policy.content}
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
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-[0.2em]">Have a Question?</h3>
          <p className="text-white/60 text-sm font-medium mb-6">
            If you have concerns about a specific order, contact us right away and we'll work to resolve it.
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
            © {new Date().getFullYear()} TS Custom Screen Printing
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

export default RefundPolicy;
