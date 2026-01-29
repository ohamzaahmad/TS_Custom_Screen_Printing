
import React, { useState } from 'react';

// Fix: Make children optional to avoid JSX type mismatch where children are provided as content but expected in props
interface InputLabelProps {
  children?: React.ReactNode;
}

const InputLabel = ({ children }: InputLabelProps) => (
  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
    {children}
  </label>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen pb-24 bg-white animate-in pt-24 md:pt-28 lg:pt-32">
      {/* dark stripe behind fixed navbar to avoid contrast issues */}
      <div className="absolute top-0 left-0 w-full h-20 md:h-24 lg:h-28 bg-[#0A0015]" aria-hidden="true"></div>
      {/* Header removed: showing contact form and footer only */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tight text-gray-900">GET IN TOUCH</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-purple-600 text-xl group-hover:bg-purple-600 group-hover:text-white transition-all border border-gray-50">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-1">Our Studio</h4>
                    <p className="text-xl font-bold text-gray-800">123 Print Blvd, Ink City, ST 90210</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-orange-500 text-xl group-hover:bg-orange-500 group-hover:text-white transition-all border border-gray-50">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-1">Call Us</h4>
                    <p className="text-xl font-bold text-gray-800">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-purple-600 text-xl group-hover:bg-purple-600 group-hover:text-white transition-all border border-gray-50">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-1">Email Us</h4>
                    <p className="text-xl font-bold text-gray-800">hello@tscustoms.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-10 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">BUSINESS HOURS</h3>
                <ul className="space-y-6 text-gray-400 font-medium">
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-orange-500 font-black">CLOSED</span>
                  </li>
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Contact Form (compact) */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md">
              {submitted ? (
                <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center animate-in">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight uppercase">Message Sent</h2>
                  <p className="text-gray-500 mb-6 text-sm">We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-md font-black uppercase tracking-wider text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <InputLabel>Full Name</InputLabel>
                      <input 
                        type="text" required placeholder="Enter your name"
                        className="w-full bg-gray-50 border-0 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none font-bold text-sm"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <InputLabel>Email Address</InputLabel>
                      <input 
                        type="email" required placeholder="your@email.com"
                        className="w-full bg-gray-50 border-0 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none font-bold text-sm"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <InputLabel>Subject</InputLabel>
                      <input 
                        type="text" required placeholder="How can we help?"
                        className="w-full bg-gray-50 border-0 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none font-bold text-sm"
                        value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <InputLabel>Your Message</InputLabel>
                      <textarea 
                        rows={4} required placeholder="Tell us more about your project or question..."
                        className="w-full bg-gray-50 border-0 px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-100 outline-none font-medium text-sm resize-none"
                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#0A0015] text-white py-3 rounded-md font-black text-sm uppercase tracking-[0.1em] shadow-sm hover:scale-[1.01] transition-all duration-200"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
