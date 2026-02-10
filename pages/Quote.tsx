
import React, { useState } from 'react';

interface InputLabelProps {
  children?: React.ReactNode;
  required?: boolean;
}

const InputLabel = ({ children, required = false }: InputLabelProps) => (
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 mb-4 block">
    {children} {required && <span className="text-orange-500">*</span>}
  </label>
);

const SectionTitle = ({ children, step }: { children?: React.ReactNode; step: string }) => (
  <div className="mt-12 mb-8 flex items-center gap-8">
    <div className="w-14 h-14 rounded-2xl bg-[#0A0015] flex items-center justify-center text-white font-black text-sm shadow-lg">
      {step}
    </div>
    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">
      {children}
    </h3>
    <div className="h-px flex-grow bg-slate-100 ml-6"></div>
  </div>
);

interface QuoteProps {
  initialProduct?: string;
}

const Quote: React.FC<QuoteProps> = ({ initialProduct = '' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    itemNumber: initialProduct || '',
    color: '',
    quantity: '50',
    basicDescription: '',
    method: 'Screen Print',
    hasArtwork: 'No',
    locations: [] as string[],
    frontColors: '0',
    backColors: '0',
    sleeveColors: '0',
    otherColors: '0',
    deadline: '',
    additionalDetails: '',
  });
  const [uploads, setUploads] = useState<Record<string, File[]>>({
    front: [],
    back: [],
    sleeve: [],
    other: []
  });

  const fileInputs = {
    front: React.useRef<HTMLInputElement | null>(null),
    back: React.useRef<HTMLInputElement | null>(null),
    sleeve: React.useRef<HTMLInputElement | null>(null),
    other: React.useRef<HTMLInputElement | null>(null),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('type', 'quote');
    payload.append('recipient', 'hamza.work.omega+tscustom@gmail.com');
    Object.keys(formData).forEach(key => {
      const v = (formData as any)[key];
      if (Array.isArray(v)) payload.append(key, JSON.stringify(v));
      else payload.append(key, v ?? '');
    });
    // append files
    Object.entries(uploads).forEach(([slot, files]) => {
      files.forEach((f, i) => payload.append(slot + (files.length>1?`_${i}`:''), f));
    });

    fetch('http://localhost:3001/send', { method: 'POST', body: payload })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        alert('Quote submitted — we will contact you shortly.');
      })
      .catch(err => { console.error(err); alert('Failed to send quote. Try again.'); });
  };

  const handleFileClick = (key: keyof typeof fileInputs) => {
    fileInputs[key].current?.click();
  };

  const handleFileChange = (key: keyof typeof fileInputs, files: FileList | null) => {
    if (!files) return;
    setUploads(prev => ({ ...prev, [key]: [...prev[key], ...Array.from(files)] }));
  };

  const toggleLocation = (loc: string) => {
    setFormData(prev => {
      const has = prev.locations.includes(loc);
      return { ...prev, locations: has ? prev.locations.filter(l => l !== loc) : [...prev.locations, loc] };
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col pt-24 md:pt-28 lg:pt-32 px-4 md:px-6 pb-32">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-orange-50 to-white"></div>

      {/* Subtle halftone / screen-print pattern */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <pattern id="dots" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="#f97316" />
          </pattern>
          <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10 mb-12">
        <form onSubmit={handleSubmit} className="bg-white/95 p-6 rounded-lg shadow-md border border-slate-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text" required placeholder="First"
                className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none"
                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
              <input
                type="text" required placeholder="Last"
                className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none"
                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="email" required placeholder="Email"
                className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="tel" required placeholder="Phone"
                className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text" placeholder="Department / Organization"
              className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none"
              value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})}
            />
          </div>

          <h3 className="text-lg font-black mb-3">Enter your product's details below:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input type="text" placeholder="Item Number" className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.itemNumber} onChange={e => setFormData({...formData, itemNumber: e.target.value})} />
            <input type="text" placeholder="Color" className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
            <input type="number" min="1" placeholder="Quantity" className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">OR, you can give us a basic description. Be sure to tell us how many items.</label>
            <textarea rows={3} placeholder="Example, black short sleeve tee, hooded sweatshirts, etc." className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.basicDescription} onChange={e => setFormData({...formData, basicDescription: e.target.value})} />
          </div>

          <h3 className="text-lg font-black mb-2">Tell us about your design</h3>
          <p className="text-sm text-slate-500 mb-3">Tell us where to print and how many ink colors we're using:</p>

          <div className="mb-3">
            <div className="inline-block bg-[#0A0015] text-white px-3 py-2 rounded-md font-black">Screen Print</div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {['Full Front','Left Chest','Right Chest','Full Back','Left Sleeve','Right Sleeve','Other'].map(loc => (
              <label key={loc} className="text-sm bg-white border border-slate-100 px-3 py-2 rounded-md">
                <input type="checkbox" className="mr-2" checked={formData.locations.includes(loc)} onChange={() => toggleLocation(loc)} />{loc}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Front # of colors', key: 'frontColors' },
              { label: 'Back # of colors', key: 'backColors' },
              { label: 'Sleeve # of colors', key: 'sleeveColors' },
              { label: 'Other # of colors', key: 'otherColors' },
            ].map(field => (
              <div key={field.key}>
                <div className="text-xs text-slate-500 mb-2">{field.label}</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setFormData({...formData, [field.key]: Math.max(0, parseInt(formData[field.key as keyof typeof formData] as string) - 1).toString()})} className="px-3 py-1 bg-white border rounded">−</button>
                  <input type="number" min="0" className="w-full text-center bg-transparent outline-none" value={formData[field.key as keyof typeof formData] as string} onChange={e => setFormData({...formData, [field.key]: e.target.value})} />
                  <button type="button" onClick={() => setFormData({...formData, [field.key]: (parseInt(formData[field.key as keyof typeof formData] as string) + 1).toString()})} className="px-3 py-1 bg-white border rounded">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Front Artwork', key: 'front' },
                { label: 'Back Artwork', key: 'back' },
                { label: 'Sleeve Artwork', key: 'sleeve' },
                { label: 'Other Artwork', key: 'other' },
              ].map((entry, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-md text-center text-sm w-full"> 
                  <div className="mb-2 font-semibold">{entry.label}</div>
                  <div className="text-xs text-slate-500 mb-2">or drag files here</div>
                  <input
                    ref={fileInputs[entry.key as keyof typeof fileInputs]}
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={e => handleFileChange(entry.key as keyof typeof fileInputs, e.target.files)}
                  />
                  <button type="button" onClick={() => handleFileClick(entry.key as keyof typeof fileInputs)} className="bg-white border border-orange-300 text-orange-500 px-3 py-1 rounded">Upload</button>
                  <div className="mt-2 text-xs text-slate-600">
                    {(uploads[entry.key as keyof typeof uploads]||[]).map((f, idx) => (
                      <div key={idx} className="truncate">{f.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">When does your order need to be in-hands?</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Other details or things you want us to know:</label>
              <input type="text" placeholder="Notes" className="w-full bg-slate-50 border border-slate-100 px-3 py-2 rounded-md outline-none" value={formData.additionalDetails} onChange={e => setFormData({...formData, additionalDetails: e.target.value})} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md font-black w-full sm:w-auto">Request Quote</button>
            <div className="text-sm text-slate-500 text-center sm:text-left">Our standard production time is 10-12 business days after deposit and artwork.</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;
