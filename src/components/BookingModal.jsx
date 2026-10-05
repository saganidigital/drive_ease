import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Car, Calendar, User, Phone, Mail, Shield, Sparkles, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function BookingModal({ isOpen, onClose, selectedCar, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'rental',
    carName: '',
    date: '',
    duration: '3 Days',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedCar) {
      setFormData(prev => ({
        ...prev,
        carName: selectedCar.name,
        serviceType: 'rental'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        carName: 'Aston Martin DBS Superleggera'
      }));
    }
    setIsSuccess(false);
  }, [selectedCar, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onShowToast) {
        onShowToast("VIP reservation request received. Our senior automotive concierge will contact you within 15 minutes.");
      }
    }, 900);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Royal Auto Hub, I am inquiring about VIP ${formData.serviceType.toUpperCase()} for ${formData.carName}. My name is ${formData.name || 'Client'}.`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0e1017] border border-amber-500/40 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.25)] text-slate-100 animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-royal text-2xl font-bold text-white">VIP Request Confirmed</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-amber-400">{formData.name}</strong>. Your inquiry for the <strong className="text-amber-300">{formData.carName}</strong> has been routed to our Senior Client Concierge.
            </p>
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 text-xs text-slate-400 space-y-1">
              <p>Direct Showroom Line: <span className="text-amber-400 font-semibold">{companyInfo.phone}</span></p>
              <p>Reference: <span className="font-mono text-white">#RAH-{Math.floor(100000 + Math.random() * 900000)}</span></p>
            </div>
            <div className="pt-3 flex gap-3 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp Now
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-all"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Priority Concierge Booking</span>
              </div>
              <h3 id="modal-headline" className="font-royal text-xl sm:text-2xl font-bold text-white">
                Reserve Your Luxury Experience
              </h3>
              <p className="text-xs text-slate-400">
                Direct vehicle allocation, white-glove delivery, and confidential consultation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Desired Service</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rental', label: 'VIP Rental' },
                    { id: 'purchase', label: 'Car Purchase' },
                    { id: 'chauffeur', label: 'Chauffeur' }
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceType: service.id })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                        formData.serviceType === service.id
                          ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                          : 'border-zinc-800 bg-zinc-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Vehicle of Interest</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/80">
                    <Car className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.carName}
                    onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                    placeholder="e.g. Aston Martin DBS, Rolls-Royce Ghost..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Malik Ahmad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Preferred Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Duration / Consultation</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs text-white outline-none"
                  >
                    <option value="1 Day (24h)">1 Day (24 Hours)</option>
                    <option value="Weekend (3 Days)">Weekend (3 Days)</option>
                    <option value="1 Week (7 Days)">1 Week (7 Days)</option>
                    <option value="Monthly Prestige">Monthly Prestige</option>
                    <option value="Showroom Purchase Tour">Showroom Purchase Tour</option>
                  </select>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>100% Confidential. All data protected by Non-Disclosure Protocol.</span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Routing to Concierge..." : "Confirm VIP Reservation"}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
