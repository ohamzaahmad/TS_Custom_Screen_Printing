import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

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
      title: 'Privacy Policy Overview',
      content: 'This Privacy Policy governs the manner in which TS Custom Screen Printing collects, uses, maintains and discloses information collected from users (each, a "User") of the TS Custom Screen Printing website ("Site"). This privacy policy applies to the Site and all products and services offered by TS Custom Screen Printing.'
    },
    {
      title: 'Information We Collect',
      content: 'We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our Site, place an order, respond to a survey and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and payment information for the purpose of processing your order. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain Site related activities, such as placing an order.'
    },
    {
      title: 'Non-Personal Identification Information',
      content: 'We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users\' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.'
    },
    {
      title: 'Web Browser Cookies',
      content: 'Our Site may use "cookies" to enhance User experience. User\'s web browser saves cookies for record-keeping purposes and sometimes to track information about their Site usage. Users may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.'
    },
    {
      title: 'How We Use Your Information',
      content: 'TS Custom Screen Printing collects and uses Users\' personal information for the following purposes: (1) To improve customer service - Your information helps us to more effectively respond to your customer service requests and support needs. (2) To personalize User experience - We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site. (3) To improve our Site - We continually strive to improve our website offerings based on the information and feedback we receive from you. (4) To process transactions - We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide service. (5) To administer content, promotions, surveys or other Site features - To send Users information about topics we think will be of interest to them.'
    },
    {
      title: 'Periodic Emails & Communications',
      content: 'The email address Users provide for order processing will be used to send them information and updates pertaining to their order. It will also be used to respond to their inquiries and/or other requests or questions. Every User who decides to opt-in to our mailing list will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we allow Users to unsubscribe at the bottom of each mailer or User may contact us via our Site.'
    },
    {
      title: 'How We Protect Your Information',
      content: 'We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site. Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.'
    },
    {
      title: 'Sharing Your Personal Information',
      content: 'We do not sell, trade, or rent Users\' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and Users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you are giving us your permission when you sign up or order with us.'
    },
    {
      title: 'Consent to Phone Messages',
      content: 'By providing your phone number, you consent to receive text messages from TS Custom Screen Printing regarding your inquiry, updates, and other relevant information. Message frequency may vary. Message and data rates may apply. For assistance, reply HELP or contact info@stcsprinting.com. To stop receiving messages, reply STOP. No further messages will be sent. For details, see our Privacy Policy.'
    },
    {
      title: 'Changes to This Privacy Policy',
      content: 'TS Custom Screen Printing has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.'
    },
    {
      title: 'Your Acceptance of These Terms',
      content: 'By using this Site, you signify your acceptance of this policy and terms of service. If you do not agree to this policy, please do not use our Site. If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at info@stcsprinting.com or (732) 347-0101.'
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
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Privacy</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            <span className="text-orange-500">Privacy </span>
            <span className="text-purple-500">Policy</span>
          </h1>
          <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
            Your privacy is important to us. Please review how we collect, use, and protect your personal information.
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
          className="mb-12 p-6 bg-linear-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="text-purple-500 shrink-0 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2">Your Data is Secure</p>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                We are committed to protecting your privacy and maintaining the security of your personal information at all times.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
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
                  <span className="text-[10px] font-black text-purple-500 bg-white/10 px-2 py-1 rounded-full">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </span>
                <motion.div
                  animate={{ rotate: expandedSections.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-orange-500 shrink-0"
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
          <h3 className="text-xl font-black text-white mb-3 uppercase tracking-[0.2em]">Questions About Privacy?</h3>
          <p className="text-white/60 text-sm font-medium mb-6">
            If you have concerns about how we handle your personal information, please reach out to us directly.
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

export default PrivacyPolicy;
