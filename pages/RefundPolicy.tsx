import React from 'react';

interface RefundPolicyProps {
  onNavigate?: (page: string) => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 animate-in pt-24 md:pt-28 lg:pt-32">

      {/* Hero */}
      <section className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto mb-12">
        <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
          Policy
        </span>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-3">
          <span className="text-gradient-orange">Refund</span> &amp; Returns
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed text-base mb-2">
          Please review our refund and reprint policy to understand our commitment to quality and fair claim resolution.
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
            All custom screen printing orders are final. Due to the personalized nature of our products, we do not offer refunds, returns, or exchanges unless the error is determined to be on our part. Please review the following policies carefully before placing your order.
          </p>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Sales Order &amp; Invoice Approval</h2>
            <p>
              We will not refund or reprint due to misreading the sales order and invoice. If the mistake was ours, we will make it right. If it was approved on your end, we will not consider that claim. It is the Customer's responsibility to review all order details, quantities, and specifications before confirming the order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Artwork Approval</h2>
            <p>
              We will not refund or reprint due to misreading the final artwork approval. If it was approved and we followed that approval, we will not consider a claim. Proofs will be provided for each order. The Customer is responsible for checking all details, including spelling, color, and placement. ST Custom Screen Printing is not liable for errors in approved artwork.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Print Size Discrepancies</h2>
            <p>
              We will not refund or reprint for the size of the print not matching the virtual proof. We only match the sizing called out. The mockups are a close approximation, but are not what will be used in production.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Screen Color Differences</h2>
            <p>
              We do not consider claims due to screen color differences. Since it is impossible to replicate "on screen" images and actual colors, we can only guarantee the ink colors used, not a match to the colors displayed on screen. Pantone matching is available upon request for an additional fee per color.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Garment Sizing &amp; Defects</h2>
            <p>
              We do not provide refunds or reprints due to sizing issues unless the garment is defective. Since we only print on the garments and do not manufacture them, we cannot control the fit of the garments. Customers are advised to order extras to accommodate manufacturer defects. Any claims related to garment defects must be reported within 48 hours of delivery.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Wear &amp; Tear</h2>
            <p>
              We do not reprint or refund for pilling of hoodies or discoloration due to wear and sun exposure. To maximize the life of your printed apparel, follow the care instructions provided with your order.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Satisfaction</h2>
            <p>
              We do not provide refunds due to not liking the final outcome. If the print matches the proof and the print is what was ordered, no refunds or reprints will be provided. However, we may offer a better solution for you for future orders.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Specialty Ink Conditions</h2>
            <p>
              We do not refund or reprint orders that are glow in the dark due to glow intensity variations. We do not refund or reprint discharge orders that have adverse effects due to fabric conflicts with discharge, since discharge is a re-dyeing process that only works with certain colors of cotton and results cannot be guaranteed.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Reprints</h2>
            <p>
              Any reprints may use a different print method to fulfill the order which may vary slightly from the original. We may require the items to be sent back to our main office for inspection prior to determining the status of a claim.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Claim Time Limit</h2>
            <p>
              We do not consider claims on orders that are more than 30 days old from reception of product. All issues must be reported within 48 hours of delivery.
            </p>
          </div>

          <div className="pb-6">
            <h2 className="text-base font-black uppercase tracking-tight text-slate-900 mb-2">Group Orders</h2>
            <p>
              We do not accept claims from members of a group order. Only the point of contact who placed the initial order is authorized to submit claims or requests for reprints.
            </p>
          </div>

        </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <span className="text-orange-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Have a Question?
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-3">
              Contact Us
            </h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto">
              If you have concerns about a specific order, contact us right away and we'll work to resolve it.
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

export default RefundPolicy;
