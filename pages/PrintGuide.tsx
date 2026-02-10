
import React from 'react';

const popularPlacements = [
  { src: '/size-guide/assets/centered-chest.png', title: 'Center Chest', note: '2½" down from bottom of collar' },
  { src: '/size-guide/assets/nape.png', title: 'Nape', note: '½" down from bottom of collar' },
  { src: '/size-guide/assets/full-front.png', title: 'Full Front', note: '3" down from bottom of collar' },
  { src: '/size-guide/assets/full-back.png', title: 'Full Back', note: '3" down from bottom of collar' },
  { src: '/size-guide/assets/Sleeve.png', title: 'Sleeve (2½" wide)', note: '1" up from seam' },
  { src: '/size-guide/assets/left-chest.png', title: 'Left Chest', note: '2½" down from bottom of collar' },
];

const measurements = [
  { src: '/size-guide/assets/unisex.png', title: 'Unisex', note: 'Standard: 11"W x 15"H' },
  { src: '/size-guide/assets/ladies.png', title: 'Ladies', note: 'Standard: 9.5"W x 15"H' },
  { src: '/size-guide/assets/youth.png', title: 'Youth', note: 'Standard: 9.5"W x 14"H' },
  { src: '/size-guide/assets/infant.png', title: 'Infant', note: 'Standard: 3.5"W x 6"H' },
  { src: '/size-guide/assets/V-Neck.png', title: 'V-Neck', note: 'Standard: 11"W x 15"H' },
  { src: '/size-guide/assets/above_pocket.png', title: 'Above Pocket', note: 'Standard: 3"W x 2.5"H' },
  { src: '/size-guide/assets/left-chest.png', title: 'Left/Right Chest', note: 'Standard: 3.5"W x 4"H' },
  { src: '/size-guide/assets/short_sleeves.png', title: 'Short Sleeve', note: 'Standard: 2.5"W x 2.5"H' },
  { src: '/size-guide/assets/back_tag.png', title: 'Nape / Back Tag', note: 'Standard: 3"W x 3"H' },
  { src: '/size-guide/assets/long_sleeve.png', title: 'Long Sleeve', note: 'Standard: 3"W x 11"H' },
  { src: '/size-guide/assets/zip_up.png', title: 'Zip Up', note: 'Standard: 6"W x 10"H' },
  { src: '/size-guide/assets/pullover.png', title: 'Pullover', note: 'Standard: 12"W x 10"H' },
  { src: '/size-guide/assets/hoodie_back.png', title: 'Hoodie Back', note: 'Standard: 10"W x 10"H' },
  { src: '/size-guide/assets/youth_hoodie.png', title: 'Youth Hoodie', note: 'Standard: 9"W x 6.5"H' },
];

const PrintGuide: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">Print Placement Guide</h1>
          <p className="text-sm text-slate-500 max-w-3xl mx-auto">For specific placement you must let us know and ensure it is listed on your mockup before you approve it.</p>
        </div>

        {/* Top placement guide image */}
        {/* <div className="bg-white border border-slate-100 rounded-lg p-6 mb-10">
          <img src="/size-guide/assets/placementguide.png" alt="Print placement guide" className="w-full h-auto object-contain rounded" />
        </div> */}

        {/* Popular Placements */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Popular Placements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularPlacements.map((p) => (
              <div key={p.title} className="bg-white border border-slate-100 rounded-lg p-4 flex flex-col items-center">
                <div className="w-full h-44 bg-slate-50 rounded overflow-hidden flex items-center justify-center mb-4">
                  <img src={p.src} alt={p.title} className="max-h-full object-contain" />
                </div>
                <h3 className="font-black text-sm text-slate-900 uppercase mb-1 text-center">{p.title}</h3>
                <p className="text-xs text-slate-400 text-center">{p.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Print Measurements */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Print Measurements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {measurements.map((m) => (
              <div key={m.title} className="bg-white border border-slate-100 rounded-lg p-3 flex flex-col items-center">
                <div className="w-full h-32 bg-slate-50 rounded overflow-hidden flex items-center justify-center mb-3">
                  <img src={m.src} alt={m.title} className="max-h-full object-contain" />
                </div>
                <h4 className="font-black text-xs text-slate-900 uppercase mb-1 text-center">{m.title}</h4>
                <p className="text-[11px] text-slate-400 text-center">{m.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrintGuide;
