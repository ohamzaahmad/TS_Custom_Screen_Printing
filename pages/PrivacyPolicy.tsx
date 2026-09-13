import React from 'react';

interface PrivacyPolicyProps {
  onNavigate?: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 animate-in pt-24 md:pt-28 lg:pt-32">

      {/* Hero */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto mb-12">
        <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
          <span className="text-gradient-orange">Privacy</span> Policy
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-base mb-2">
          Your privacy is important to us. Please review how we collect, use, and protect your personal information.
        </p>
        <p className="text-slate-400 text-xs font-medium">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      {/* Content */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto pb-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(15,23,42,0.06)]">
        <div className="text-base leading-relaxed text-slate-600 space-y-0">

          <p className="pb-6">
            This Privacy Policy governs the manner in which ST Custom Screen Printing collects, uses, maintains and discloses information collected from users (each, a "User") of the ST Custom Screen Printing website ("Site"). This privacy policy applies to the Site and all products and services offered by ST Custom Screen Printing.
          </p>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Personal Identification Information</h2>
            <p>
              We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our Site, place an order, respond to a survey and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, and payment information for the purpose of processing your order. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain Site related activities, such as placing an order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Non-Personal Identification Information</h2>
            <p>
              We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Web Browser Cookies</h2>
            <p>
              Our Site may use "cookies" to enhance User experience. User's web browser saves cookies for record-keeping purposes and sometimes to track information about their Site usage. Users may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">How We Use Your Information</h2>
            <p>
              ST Custom Screen Printing collects and uses Users' personal information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To improve customer service — Your information helps us to more effectively respond to your customer service requests and support needs.</li>
              <li>To personalize User experience — We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
              <li>To improve our Site — We continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
              <li>To process transactions — We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide service.</li>
              <li>To administer content, promotions, surveys or other Site features — To send Users information about topics we think will be of interest to them.</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Periodic Emails &amp; Communications</h2>
            <p>
              The email address Users provide for order processing will be used to send them information and updates pertaining to their order. It will also be used to respond to their inquiries and/or other requests or questions. Every User who decides to opt-in to our mailing list will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we allow Users to unsubscribe at the bottom of each mailer or User may contact us via our Site.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">How We Protect Your Information</h2>
            <p>
              We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site. Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Sharing Your Personal Information</h2>
            <p>
              We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and Users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you are giving us your permission when you sign up or order with us.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Consent to Phone Messages</h2>
            <p>
              By providing your phone number, you consent to receive text messages from ST Custom Screen Printing regarding your inquiry, updates, and other relevant information. Message frequency may vary. Message and data rates may apply. For assistance, reply HELP or contact info@stcsprinting.com. To stop receiving messages, reply STOP. No further messages will be sent.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Changes to This Privacy Policy</h2>
            <p>
              ST Custom Screen Printing has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
            </p>
          </div>

          <div className="pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Your Acceptance of These Terms</h2>
            <p>
              By using this Site, you signify your acceptance of this policy and terms of service. If you do not agree to this policy, please do not use our Site. If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at info@stcsprinting.com or (732) 347-0101.
            </p>
          </div>

        </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Questions About Privacy?
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-3">
              Contact Us
            </h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              If you have concerns about how we handle your personal information, please reach out to us directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <a
                href="mailto:info@stcsprinting.com"
                className="relative bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Email Us
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-full translate-x-1.5 translate-y-1.5" aria-hidden="true"></div>
              <a
                href="tel:+17323470101"
                className="relative bg-white text-slate-900 border-2 border-slate-900 px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} ST Custom Screen Printing
          </p>
          {onNavigate && (
            <button
              onClick={() => onNavigate('home')}
              className="text-orange-500 hover:text-orange-600 text-xs font-black uppercase tracking-[0.2em] transition-colors"
            >
              Back to Home
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
