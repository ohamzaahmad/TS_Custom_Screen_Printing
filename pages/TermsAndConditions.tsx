import React from 'react';

interface TermsAndConditionsProps {
  onNavigate?: (page: string) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 animate-in pt-24 md:pt-28 lg:pt-32">

      {/* Hero */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto mb-12">
        <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
          <span className="text-gradient-orange">Terms</span> &amp; Conditions
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-base mb-2">
          Please review these terms carefully. By using our services, you agree to be bound by these conditions.
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
            The Terms and Conditions contained herein are the exclusive terms and conditions for the sale of products and services from ST Custom Screen Printing ("Company") to the Customer. The Customer agrees that these terms constitute the final, complete, and exclusive expression of the agreement between the Company and Customer. Hereafter, the "Customer" refers to the individual(s) or entity submitting an order or request for services from the Company.
          </p>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">1. Content</h2>
            <p>
              The Customer shall not submit any content (including electronic files, photos, or graphic images) that is unlawful, defamatory, obscene, pornographic, or otherwise objectionable, nor any content that incites criminal activity. The Company reserves the right to refuse any design, including those promoting hate groups, terrorism, foreign political groups, or bullying.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">2. Copyright and Trademarks</h2>
            <p>
              The Customer assumes full responsibility for all trademark or copyright issues relating to submitted designs. The Company does not verify the legal rights of submitted materials. Customers indemnify the Company from any claims related to trademark infringement. Authorization may be requested for certain designs.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">3. Hold Harmless</h2>
            <p>
              The Customer agrees to hold the Company, its owners, officers, employees, and agents harmless from liability related to content submitted. This includes all damages, legal fees, and expenses arising from the reproduction of submitted content.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">4. Turnaround Time</h2>
            <p>
              Standard turnaround is 10–15 business days from the date of artwork approval and order confirmation. Production will not begin until artwork is approved and the required deposit is received. Rush services may be available at an additional fee. National holidays and fulfillment services may extend this timeframe. Turnaround times are estimates only and not guaranteed.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">5. Minimums</h2>
            <p>
              Screen printing orders require a minimum of 12 garments per design. Orders below this minimum may be subject to an additional charge. The Company reserves the right to combine compatible orders to meet minimum requirements where appropriate.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">6. Payments</h2>
            <p>
              Private orders require 100% payment prior to production. Payment is due upon invoice unless other arrangements have been made in writing. Late payments may incur additional charges or suspension of services. The Company does not accept partial payments for private orders.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">7. Artwork &amp; Design Services</h2>
            <p>
              All artwork must be submitted at 300dpi or higher and sized to actual print dimensions. Preferred file types include EPS, PSD, AI, CDR, and PDF. Artwork submitted in unusable formats may incur additional design charges. If the Company provides artwork creation or modification services, fees will be quoted separately and must be paid in full prior to the release of any artwork or production of the order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">8. Setup Charges</h2>
            <p>
              Design setup charges apply for screen creation and other production preparation. Reorders may receive discounted setup charges. Any change to an existing design will result in a new setup fee.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">9. Art Approval</h2>
            <p>
              Proofs will be provided for each order. The Customer is responsible for checking all details, including spelling, color, and placement. The Company is not liable for errors in approved artwork. Once artwork is approved, any changes may incur a change fee as outlined in Section 14.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">10. Color Matching</h2>
            <p>
              Pantone matches or non-stock inks incur a fee per color. Stock colors are available upon request at no additional charge. The Company can only guarantee the ink colors used, not a match to colors displayed on screen.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">11. Placement &amp; Sizing</h2>
            <p>
              If placement or sizing details are not specified, standard industry sizes and locations will be used at the Company's discretion. Customers should specify exact placement and sizing requirements at the time of order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">12. Over/Under Policy</h2>
            <p>
              Up to 2% spoilage or 3 pieces (whichever is greater) is considered acceptable. Exact quantities must be requested in advance, and extra garments should be ordered accordingly. The Company is not liable for shortages within this tolerance.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">13. Difficult Items or Placement</h2>
            <p>
              Items or placements deemed "difficult" may require pre-testing and could incur additional production charges. The Customer will be notified of any additional charges before production begins.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">14. Order Changes</h2>
            <p>
              Changes after artwork approval may incur a $100.00 change fee and could result in a revised production timeline. The Company reserves the right to reject changes that would significantly alter the scope of the original order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">15. All Sales Final</h2>
            <p>
              Custom-decorated items are not eligible for refunds, returns, or exchanges unless the error is determined to be on the part of the Company. See our Refund &amp; Returns Policy for details.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">16. Order Cancellation</h2>
            <p>
              Orders may be cancelled within 24 hours of placement at no charge. After 24 hours, a cancellation fee of 20% may apply for any materials already procured. Artwork and design charges are non-refundable. No refunds will be issued once production is complete.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">17. Returns</h2>
            <p>
              We do not offer refunds, but will remake any order if the error is determined to be our fault. Issues must be reported within 48 hours of delivery. Replacement shipping is covered via ground method only unless expedited shipping is requested and paid for by the Customer.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">18. Out-of-Stock Items</h2>
            <p>
              The Company is not responsible for supplier inventory shortages. Alternatives will be offered if a requested item is backordered or discontinued. The Customer may choose to wait for restocking or accept an alternative at no additional cost.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">19. Manufacturer Defects</h2>
            <p>
              The Company is not liable for garment inconsistencies including size, color, or construction variations. Customers are advised to order extras to accommodate for manufacturer defects. The Company will assist in facilitating claims with the garment supplier when applicable.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">20. Bank Charges &amp; Fees</h2>
            <p>
              Chargebacks and returned checks are not permitted. The Customer agrees to reimburse any penalties or fees incurred as a result of disputed charges without valid cause.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">21. Customer-Supplied Goods</h2>
            <p>
              Customer-supplied garments must be new and unused. The Company is not liable for defects or inconsistencies in Customer-provided items. Spoilage policies still apply to Customer-supplied goods. The Customer assumes all risk for items provided for printing.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">22. Shipping</h2>
            <p>
              Shipping costs are calculated based on destination, weight, and service level selected. Delivery times are estimates only. Tracking numbers will be provided. Final charges may differ from quoted rates due to package dimensions and weight. The Company is not liable for delays or loss of shipments once handed off to carriers.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">23. Blind Shipping</h2>
            <p>
              Blind shipments (shipping under the Customer's name and return address) incur a $20.00 handling fee in addition to standard shipping costs.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">24. Split Shipments</h2>
            <p>
              Split shipments to multiple locations incur a $20.00 handling fee per additional shipment location.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">25. Care &amp; Washing Instructions</h2>
            <p>
              To maximize the life of your printed apparel: turn garments inside out, wash in cold water, and air dry. Do not bleach or iron directly over embellishment. Following these instructions will help maintain print quality and durability.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">26. Customer Relations</h2>
            <p>
              The Company reserves the right to refuse service to individuals who are abusive, disrespectful, or otherwise uncooperative. All communication will be conducted in a professional manner.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">27. Promotions</h2>
            <p>
              Promotions are automatically applied when available and are limited to one per Customer per month unless otherwise stated. Promotions have no cash value and cannot be combined with other offers.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">28. Limitation of Liability</h2>
            <p>
              In no event shall ST Custom Screen Printing's total liability exceed the amount paid by the Customer for the product or service in question. The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of products or services provided.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">29. Force Majeure</h2>
            <p>
              ST Custom Screen Printing shall not be held liable for any failure or delay in performance due to circumstances beyond its reasonable control, including acts of God, natural disasters, war, terrorism, labor strikes, or government action.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">30. Governing Law</h2>
            <p>
              Any disputes arising from these Terms and Conditions or the use of services shall be governed by the laws of the State of New Jersey, without regard to conflicts of law principles. The Customer agrees to submit to the jurisdiction of the courts located in New Jersey.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">31. Severability</h2>
            <p>
              If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">32. Entire Agreement</h2>
            <p>
              These Terms and Conditions, along with any other agreements or policies referenced herein, constitute the entire agreement between the Customer and ST Custom Screen Printing regarding the sale of products and services. Any prior negotiations, representations, or agreements are superseded by these Terms and Conditions.
            </p>
          </div>

          <div className="pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">33. Acknowledgement</h2>
            <p>
              By placing an order or requesting a quote, the Customer acknowledges and agrees to all terms and conditions outlined herein.
            </p>
          </div>

        </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-3">
              Contact Us
            </h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              If you have any questions about these terms, please don't hesitate to contact us.
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

export default TermsAndConditions;
