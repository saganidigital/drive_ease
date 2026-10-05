import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { companyInfo } from '../data/company';
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, CheckCircle, Shield } from 'lucide-react';

export default function ContactSection({ onShowToast }) {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Rent a Supercar',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onShowToast) {
        onShowToast("Your VIP message has been safely delivered to our Client Relations Director.");
      }
    }, 800);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 sm:py-32 relative bg-[#07080d] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            badge="Connect Directly"
            title="Initiate Your"
            highlightText="VIP Consultation"
            subtitle="Connect with our senior automotive curators to arrange private showroom viewings, bespoke acquisitions, or instant exotic car delivery."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Direct Contact Info from Flyer */}
          <div className={`lg:col-span-5 rounded-2xl bg-[#0e1017] p-8 border border-amber-500/25 flex flex-col justify-between transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  Immediate Concierge Assistance
                </span>
                <h3 className="font-royal text-2xl font-bold text-white">
                  Visit Us Today!
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Our private salon provides an exclusive setting for high-profile clients to inspect rare vehicles and discuss bespoke financing in total privacy.
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 pt-2">
                {/* Phone / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">Call / WhatsApp Hotline</span>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">Instant WhatsApp Chat</span>
                    <a 
                      href={companyInfo.whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Start Chat With Concierge</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>

                {/* Showroom Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">Showroom Location</span>
                    <p className="text-xs sm:text-sm font-medium text-white">{companyInfo.address}</p>
                    <p className="text-[11px] text-slate-400">{companyInfo.city}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">Hours of Operation</span>
                    <p className="text-xs sm:text-sm font-medium text-slate-200">{companyInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Confidentiality assurance */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2.5 text-[11px] text-slate-400">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Registered luxury automotive vendor with discreet escrow handling.</span>
            </div>
          </div>

          {/* Right Column: High Conversion Lead Capture Form */}
          <div className={`lg:col-span-7 rounded-2xl bg-[#0e1017] p-8 border border-amber-500/25 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-royal text-2xl font-bold text-white">Inquiry Received</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-amber-400">{form.name}</strong>. Your consultation request regarding <strong className="text-amber-300">{form.inquiryType}</strong> has been logged. Our Senior Curator will respond shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', phone: '', email: '', inquiryType: 'Rent a Supercar', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                    Request Private Consultation
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the VIP briefing below for immediate scheduling.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sardar Farooq"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Contact Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="vip@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Purpose of Inquiry</label>
                      <select
                        value={form.inquiryType}
                        onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white outline-none"
                      >
                        <option value="Rent a Supercar">Rent a Supercar</option>
                        <option value="Vehicle Purchase / Import">Vehicle Purchase / Import</option>
                        <option value="Executive Chauffeur Service">Executive Chauffeur Service</option>
                        <option value="Financing & Lease Advisory">Financing & Lease Advisory</option>
                        <option value="Private Showroom Tour">Private Showroom Tour</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">Specific Requirements or Preferred Model</label>
                    <textarea
                      rows={3}
                      placeholder="Specify dates, vehicle model (e.g. Aston Martin DBS, Maybach), or special event requirements..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Transmitting Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch VIP Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
