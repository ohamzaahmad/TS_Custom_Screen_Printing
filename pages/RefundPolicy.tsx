import React from "react";
import { useSEO } from "../hooks/useSEO";

const policies = [
  {
    title: "Sales Order & Invoice Approval",
    body: "We will not refund or reprint due to misreading the sales order and invoice. If the mistake was ours, we will make it right. If it was approved on your end, we will not consider that claim. It is the Customer's responsibility to review all order details, quantities, and specifications before confirming the order.",
  },
  {
    title: "Artwork Approval",
    body: "We will not refund or reprint due to misreading the final artwork approval. If it was approved and we followed that approval, we will not consider a claim. Proofs will be provided for each order. The Customer is responsible for checking all details, including spelling, color, and placement. ST Custom Screen Printing is not liable for errors in approved artwork.",
  },
  {
    title: "Print Size Discrepancies",
    body: "We will not refund or reprint for the size of the print not matching the virtual proof. We only match the sizing called out. Mockups are a close approximation, but are not what will be used in production.",
  },
  {
    title: "Screen Color Differences",
    body: 'We do not consider claims due to screen color differences. Since it is impossible to replicate "on screen" images and actual colors, we can only guarantee the ink colors used, not a match to the colors displayed on screen. Pantone matching is available upon request for an additional fee per color.',
  },
  {
    title: "Garment Sizing & Defects",
    body: "We do not provide refunds or reprints due to sizing issues unless the garment is defective. Since we only print on the garments and do not manufacture them, we cannot control the fit of the garments. Customers are advised to order extras to accommodate manufacturer defects. Any claims related to garment defects must be reported within 48 hours of delivery.",
  },
  {
    title: "Wear & Tear",
    body: "We do not reprint or refund for pilling of hoodies or discoloration due to wear and sun exposure. To maximize the life of your printed apparel, follow the care instructions provided with your order.",
  },
  {
    title: "Satisfaction",
    body: "We do not provide refunds due to not liking the final outcome. If the print matches the proof and the print is what was ordered, no refunds or reprints will be provided. However, we may offer a better solution for you for future orders.",
  },
  {
    title: "Specialty Ink Conditions",
    body: "We do not refund or reprint orders that are glow in the dark due to glow intensity variations. We do not refund or reprint discharge orders that have adverse effects due to fabric conflicts with discharge, since discharge is a re-dyeing process that only works with certain colors of cotton and results cannot be guaranteed.",
  },
  {
    title: "Reprints",
    body: "Any reprints may use a different print method to fulfill the order which may vary slightly from the original. We may require the items to be sent back to our main office for inspection prior to determining the status of a claim.",
  },
  {
    title: "Claim Time Limit",
    body: "We do not consider claims on orders that are more than 30 days old from reception of product. All issues must be reported within 48 hours of delivery.",
  },
  {
    title: "Group Orders",
    body: "We do not accept claims from members of a group order. Only the point of contact who placed the initial order is authorized to submit claims or requests for reprints.",
  },
];

const RefundPolicy: React.FC<{ onNavigate?: (page: string) => void }> = () => {
  useSEO({
    title: "Refund & Returns Policy",
    description:
      "ST Custom Screen Printing refund and returns policy for custom screen printing orders. Review our claim process, time limits, and reprint policies.",
    canonical: "/refund",
    ogTitle: "Refund & Returns Policy",
    ogDescription:
      "Review ST Custom Screen Printing refund and reprint policy for custom screen printing orders.",
  });

  return (
    <div className="min-h-screen bg-white animate-in pt-28 md:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <header className="mb-14 border-b border-slate-200 pb-10">
          <span className="mb-4 block text-[11px] font-black uppercase tracking-[0.4em] text-orange-500">
            Policy
          </span>
          <h1 className="mb-6 text-4xl font-black uppercase leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
            Refund &amp; Returns
          </h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">
            Please review our refund and reprint policy to understand our
            commitment to quality and fair claim resolution.
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
            All custom screen printing orders are final. Due to the personalized
            nature of our products, we do not offer refunds, returns, or
            exchanges unless the error is determined to be on our part. Please
            review the following policies carefully before placing your order.
          </p>

          {policies.map((policy) => (
            <section key={policy.title}>
              <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                {policy.title}
              </h2>
              <p className="text-lg leading-8 text-slate-700">{policy.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
