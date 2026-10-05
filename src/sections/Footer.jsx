import React from 'react';
import RoyalLogo from '../components/RoyalLogo';
import { companyInfo } from '../data/company';
import { ArrowUp, Phone, MessageSquare, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-amber-500/20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <RoyalLogo size="md" />
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Royal Auto Hub is the leading destination for certified supercar acquisitions, exotic luxury rentals, and bespoke presidential chauffeur services. Where elegance meets performance.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-400 flex items-center justify-center text-emerald-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-400 flex items-center justify-center text-amber-400 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-400 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Showroom Fleet */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider">
              Showroom Fleet
            </h4>
            <ul className="space-y-2">
              {['Aston Martin DBS', 'Rolls-Royce Ghost', 'Lamborghini Urus', 'Porsche 911 GT3', 'Ferrari Roma Spider', 'Mercedes-Maybach'].map((car, idx) => (
                <li key={idx}>
                  <a href="#fleet" className="hover:text-amber-400 transition-colors">
                    {car}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: VIP Services */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider">
              VIP Services
            </h4>
            <ul className="space-y-2">
              {['Latest European Imports', 'Certified 300-Pt Audits', 'VIP Rental Agreements', 'Structured Financing', 'Chauffeur Presidential', 'Private Salon Consultation'].map((service, idx) => (
                <li key={idx}>
                  <a href="#services" className="hover:text-amber-400 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Location & Direct Hotline */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-white uppercase tracking-wider">
              Showroom
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{companyInfo.address}, {companyInfo.city}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{companyInfo.phone}</span>
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-amber-400 font-semibold block uppercase tracking-wider">
                  Showroom Access
                </span>
                <span className="text-[11px] text-slate-400">By appointment or VIP walk-in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>&copy; {new Date().getFullYear()} Royal Auto Hub. All Rights Reserved. Where Elegance Meets Performance.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-slate-300 transition-colors">Privacy Protocol</a>
            <a href="#experience" className="hover:text-slate-300 transition-colors">Terms of Rental</a>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-amber-400 hover:text-white transition-all text-xs"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
