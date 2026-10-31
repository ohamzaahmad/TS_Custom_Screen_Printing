import React, { useState } from "react";
import { Maximize2 } from "lucide-react";
import { useSEO } from "../hooks/useSEO";
import { Dialog, DialogContent } from "../components/ui/dialog";

const popularPlacements = [
  {
    src: "/size-guide/assets/centered-chest.png",
    title: "Center Chest",
    note: '2½" down from bottom of collar',
  },
  {
    src: "/size-guide/assets/nape.png",
    title: "Nape",
    note: '½" down from bottom of collar',
  },
  {
    src: "/size-guide/assets/full-front.png",
    title: "Full Front",
    note: '3" down from bottom of collar',
  },
  {
    src: "/size-guide/assets/full-back.png",
    title: "Full Back",
    note: '3" down from bottom of collar',
  },
  {
    src: "/size-guide/assets/Sleeve.png",
    title: 'Sleeve (2½" wide)',
    note: '1" up from seam',
  },
  {
    src: "/size-guide/assets/left-chest.png",
    title: "Left Chest",
    note: '2½" down from bottom of collar',
  },
];

const measurements = [
  {
    src: "/size-guide/assets/unisex.png",
    title: "Unisex",
    note: 'Standard: 11"W x 15"H',
  },
  {
    src: "/size-guide/assets/ladies.png",
    title: "Ladies",
    note: 'Standard: 9.5"W x 15"H',
  },
  {
    src: "/size-guide/assets/youth.png",
    title: "Youth",
    note: 'Standard: 9.5"W x 14"H',
  },
  {
    src: "/size-guide/assets/infant.png",
    title: "Infant",
    note: 'Standard: 3.5"W x 6"H',
  },
  {
    src: "/size-guide/assets/V-Neck.png",
    title: "V-Neck",
    note: 'Standard: 11"W x 15"H',
  },
  {
    src: "/size-guide/assets/above_pocket.png",
    title: "Above Pocket",
    note: 'Standard: 3"W x 2.5"H',
  },
  {
    src: "/size-guide/assets/left-chest.png",
    title: "Left/Right Chest",
    note: 'Standard: 3.5"W x 4"H',
  },
  {
    src: "/size-guide/assets/short_sleeves.png",
    title: "Short Sleeve",
    note: 'Standard: 2.5"W x 2.5"H',
  },
  {
    src: "/size-guide/assets/back_tag.png",
    title: "Nape / Back Tag",
    note: 'Standard: 3"W x 3"H',
  },
  {
    src: "/size-guide/assets/long_sleeve.png",
    title: "Long Sleeve",
    note: 'Standard: 3"W x 11"H',
  },
  {
    src: "/size-guide/assets/zip_up.png",
    title: "Zip Up",
    note: 'Standard: 6"W x 10"H',
  },
  {
    src: "/size-guide/assets/pullover.png",
    title: "Pullover",
    note: 'Standard: 12"W x 10"H',
  },
  {
    src: "/size-guide/assets/hoodie_back.png",
    title: "Hoodie Back",
    note: 'Standard: 10"W x 10"H',
  },
  {
    src: "/size-guide/assets/youth_hoodie.png",
    title: "Youth Hoodie",
    note: 'Standard: 9"W x 6.5"H',
  },
];

const PrintGuide: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  useSEO({
    title: "Print Placement Guide",
    description:
      "ST Custom Screen Printing placement guide. Standard print locations and sizes for t-shirts, hoodies, sweatshirts, and custom apparel.",
    canonical: "/guide",
    ogTitle: "Print Placement Guide - ST Custom Screen Printing",
    ogDescription:
      "Standard print locations and sizes for t-shirts, hoodies, sweatshirts, and custom apparel.",
  });

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">
            Print Placement Guide
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">
            For specific placement you must let us know and ensure it is listed
            on your mockup before you approve it.
          </p>
        </div>

        {/* Popular Placements */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Popular Placements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlacements.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-slate-100 rounded-xl p-4 md:p-5 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setActiveImage({ src: p.src, title: p.title })}
                  className="group relative w-full aspect-[4/3] bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center mb-4 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  aria-label={`Open ${p.title} placement diagram at full size`}
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-full object-contain p-2 md:p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                  <Maximize2 className="absolute bottom-2 right-2 h-4 w-4 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
                <h3 className="font-black text-sm md:text-base text-slate-900 uppercase mb-1 text-center">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 text-center">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Print Measurements */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            Print Measurements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {measurements.map((m) => (
              <div
                key={m.title}
                className="bg-white border border-slate-100 rounded-xl p-4 md:p-5 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setActiveImage({ src: m.src, title: m.title })}
                  className="group relative w-full aspect-[4/3] bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center mb-3 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  aria-label={`Open ${m.title} measurement diagram at full size`}
                >
                  <img
                    src={m.src}
                    alt={m.title}
                    className="w-full h-full object-contain p-2 md:p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                  <Maximize2 className="absolute bottom-2 right-2 h-4 w-4 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
                <h4 className="font-black text-xs md:text-sm text-slate-900 uppercase mb-1 text-center">
                  {m.title}
                </h4>
                <p className="text-[11px] md:text-xs text-slate-600 text-center">
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Dialog
        open={!!activeImage}
        onOpenChange={(open) => {
          if (!open) setActiveImage(null);
        }}
      >
        <DialogContent aria-describedby={undefined}>
          <span className="sr-only">{activeImage?.title ?? "Placement diagram"}</span>
          {activeImage && (
            <div className="max-h-[80vh] w-full overflow-auto">
              <img
                src={activeImage.src}
                alt={`${activeImage.title} placement diagram enlarged`}
                className="mx-auto h-auto w-auto max-w-full object-contain"
              />
              <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                {activeImage.title}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrintGuide;
