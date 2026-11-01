import React from "react";
import { useSEO } from "../hooks/useSEO";

const terms: { title: string; body: string }[] = [
  {
    title: "1. Content",
    body: "The Customer shall not submit any content (including electronic files, photos, or graphic images) that is unlawful, defamatory, obscene, pornographic, or otherwise objectionable, nor any content that incites criminal activity. The Company reserves the right to refuse any design, including those promoting hate groups, terrorism, foreign political groups, or bullying.",
  },
  {
    title: "2. Copyright and Trademarks",
    body: "The Customer assumes full responsibility for all trademark or copyright issues relating to submitted designs. The Company does not verify the legal rights of submitted materials. Customers indemnify the Company from any claims related to trademark infringement. Authorization may be requested for certain designs.",
  },
  {
    title: "3. Hold Harmless",
    body: "The Customer agrees to hold the Company, its owners, officers, employees, and agents harmless from liability related to content submitted. This includes all damages, legal fees, and expenses arising from the reproduction of submitted content.",
  },
  {
    title: "4. Turnaround Time",
    body: "Standard turnaround is 10–15 business days from the date of artwork approval and order confirmation. Production will not begin until artwork is approved and the required deposit is received. Rush services may be available at an additional fee. National holidays and fulfillment services may extend this timeframe. Turnaround times are estimates only and not guaranteed.",
  },
  {
    title: "5. Minimums",
    body: "Screen printing orders require a minimum of 12 garments per design. Orders below this minimum may be subject to an additional charge. The Company reserves the right to combine compatible orders to meet minimum requirements where appropriate.",
  },
  {
    title: "6. Payments",
    body: "Private orders require 100% payment prior to production. Payment is due upon invoice unless other arrangements have been made in writing. Late payments may incur additional charges or suspension of services. The Company does not accept partial payments for private orders.",
  },
  {
    title: "7. Artwork & Design Services",
    body: "All artwork must be submitted at 300dpi or higher and sized to actual print dimensions. Preferred file types include EPS, PSD, AI, CDR, and PDF. Artwork submitted in unusable formats may incur additional design charges. If the Company provides artwork creation or modification services, fees will be quoted separately and must be paid in full prior to the release of any artwork or production of the order.",
  },
  {
    title: "8. Setup Charges",
    body: "Design setup charges apply for screen creation and other production preparation. Reorders may receive discounted setup charges. Any change to an existing design will result in a new setup fee.",
  },
  {
    title: "9. Art Approval",
    body: "Proofs will be provided for each order. The Customer is responsible for checking all details, including spelling, color, and placement. The Company is not liable for errors in approved artwork. Once artwork is approved, any changes may incur a change fee as outlined in Section 14.",
  },
  {
    title: "10. Color Matching",
    body: "Pantone matches or non-stock inks incur a fee per color. Stock colors are available upon request at no additional charge. The Company can only guarantee the ink colors used, not a match to colors displayed on screen.",
  },
  {
    title: "11. Placement & Sizing",
    body: "If placement or sizing details are not specified, standard industry sizes and locations will be used at the Company's discretion. Customers should specify exact placement and sizing requirements at the time of order.",
  },
  {
    title: "12. Over/Under Policy",
    body: "Up to 2% spoilage or 3 pieces (whichever is greater) is considered acceptable. Exact quantities must be requested in advance, and extra garments should be ordered accordingly. The Company is not liable for shortages within this tolerance.",
  },
  {
    title: "13. Difficult Items or Placement",
    body: 'Items or placements deemed "difficult" may require pre-testing and could incur additional production charges. The Customer will be notified of any additional charges before production begins.',
  },
  {
    title: "14. Order Changes",
    body: "Changes after artwork approval may incur a $100.00 change fee and could result in a revised production timeline. The Company reserves the right to reject changes that would significantly alter the scope of the original order.",
  },
  {
    title: "15. All Sales Final",
    body: "Custom-decorated items are not eligible for refunds, returns, or exchanges unless the error is determined to be on the part of the Company. See our Refund & Returns Policy for details.",
  },
  {
    title: "16. Order Cancellation",
    body: "Orders may be cancelled within 24 hours of placement at no charge. After 24 hours, a cancellation fee of 20% may apply for any materials already procured. Artwork and design charges are non-refundable. No refunds will be issued once production is complete.",
  },
  {
    title: "17. Returns",
    body: "We do not offer refunds, but will remake any order if the error is determined to be our fault. Issues must be reported within 48 hours of delivery. Replacement shipping is covered via ground method only unless expedited shipping is requested and paid for by the Customer.",
  },
  {
    title: "18. Out-of-Stock Items",
    body: "The Company is not responsible for supplier inventory shortages. Alternatives will be offered if a requested item is backordered or discontinued. The Customer may choose to wait for restocking or accept an alternative at no additional cost.",
  },
  {
    title: "19. Manufacturer Defects",
    body: "The Company is not liable for garment inconsistencies including size, color, or construction variations. Customers are advised to order extras to accommodate for manufacturer defects. The Company will assist in facilitating claims with the garment supplier when applicable.",
  },
  {
    title: "20. Bank Charges & Fees",
    body: "Chargebacks and returned checks are not permitted. The Customer agrees to reimburse any penalties or fees incurred as a result of disputed charges without valid cause.",
  },
  {
    title: "21. Customer-Supplied Goods",
    body: "Customer-supplied garments must be new and unused. The Company is not liable for defects or inconsistencies in Customer-provided items. Spoilage policies still apply to Customer-supplied goods. The Customer assumes all risk for items provided for printing.",
  },
  {
    title: "22. Shipping",
    body: "Shipping costs are calculated based on destination, weight, and service level selected. Delivery times are estimates only. Tracking numbers will be provided. Final charges may differ from quoted rates due to package dimensions and weight. The Company is not liable for delays or loss of shipments once handed off to carriers.",
  },
  {
    title: "23. Blind Shipping",
    body: "Blind shipments (shipping under the Customer's name and return address) incur a $20.00 handling fee in addition to standard shipping costs.",
  },
  {
    title: "24. Split Shipments",
    body: "Split shipments to multiple locations incur a $20.00 handling fee per additional shipment location.",
  },
  {
    title: "25. Care & Washing Instructions",
    body: "To maximize the life of your printed apparel: turn garments inside out, wash in cold water, and air dry. Do not bleach or iron directly over embellishment. Following these instructions will help maintain print quality and durability.",
  },
  {
    title: "26. Customer Relations",
    body: "The Company reserves the right to refuse service to individuals who are abusive, disrespectful, or otherwise uncooperative. All communication will be conducted in a professional manner.",
  },
  {
    title: "27. Promotions",
    body: "Promotions are automatically applied when available and are limited to one per Customer per month unless otherwise stated. Promotions have no cash value and cannot be combined with other offers.",
  },
  {
    title: "28. Limitation of Liability",
    body: "In no event shall ST Custom Screen Printing's total liability exceed the amount paid by the Customer for the product or service in question. The Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of products or services provided.",
  },
  {
    title: "29. Force Majeure",
    body: "ST Custom Screen Printing shall not be held liable for any failure or delay in performance due to circumstances beyond its reasonable control, including acts of God, natural disasters, war, terrorism, labor strikes, or government action.",
  },
  {
    title: "30. Governing Law",
    body: "Any disputes arising from these Terms and Conditions or the use of services shall be governed by the laws of the State of New Jersey, without regard to conflicts of law principles. The Customer agrees to submit to the jurisdiction of the courts located in New Jersey.",
  },
  {
    title: "31. Severability",
    body: "If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
  },
  {
    title: "32. Entire Agreement",
    body: "These Terms and Conditions, along with any other agreements or policies referenced herein, constitute the entire agreement between the Customer and ST Custom Screen Printing regarding the sale of products and services. Any prior negotiations, representations, or agreements are superseded by these Terms and Conditions.",
  },
  {
    title: "33. Acknowledgement",
    body: "By placing an order or requesting a quote, the Customer acknowledges and agrees to all terms and conditions outlined herein.",
  },
];

const TermsAndConditions: React.FC<{ onNavigate?: (page: string) => void }> = () => {
  useSEO({
    title: "Terms & Conditions",
    description:
      "ST Custom Screen Printing terms and conditions for custom screen printing orders. Review payment, production, shipping, and cancellation policies.",
    canonical: "/terms",
    ogTitle: "Terms & Conditions",
    ogDescription:
      "Review ST Custom Screen Printing terms and conditions for custom screen printing orders.",
  });

  return (
    <div className="min-h-screen bg-white animate-in pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <header className="mb-14 border-b border-slate-200 pb-10">
          <span className="mb-4 block text-[11px] font-black uppercase tracking-[0.4em] text-orange-500">
            Legal
          </span>
          <h1 className="mb-6 text-4xl font-black uppercase leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">
            Please review these terms carefully. By using our services, you
            agree to be bound by these conditions.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="space-y-12">
          <p className="text-lg leading-8 text-slate-700">
            The Terms and Conditions contained herein are the exclusive terms
            and conditions for the sale of products and services from ST Custom
            Screen Printing ("Company") to the Customer. The Customer agrees
            that these terms constitute the final, complete, and exclusive
            expression of the agreement between the Company and Customer.
            Hereafter, the "Customer" refers to the individual(s) or entity
            submitting an order or request for services from the Company.
          </p>

          {terms.map((term) => (
            <section key={term.title}>
              <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                {term.title}
              </h2>
              <p className="text-lg leading-8 text-slate-700">{term.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
