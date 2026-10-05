import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Shield, Sparkles, Key, Lock, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function ExperienceSection({ onOpenBooking }) {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  const pillars = [
    {
      icon: Shield,
      title: "100% Certified Assurance",
      desc: "Every vehicle arrives with complete manufacturer provenance, certified service records, and zero accident history."
    },
    {
      icon: Lock,
      title: "Total Client Discretion",
      desc: "High net-worth and diplomatic clientele enjoy confidential transactions, private viewing lounges, and strict NDA protocols."
    },
    {
      icon: Key,
      title: "Seamless Handoff",
      desc: "Delivered fully detailed and fueled to your private residence, corporate headquarters, or private aviation hangar."
    },
    {
      icon: Sparkles,
      title: "Bespoke Concierge",
      desc: "Dedicated 24/7 client concierge for tailored itineraries, track bookings, and specialized event security details."
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-24 sm:py-32 relative bg-[#080a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            badge="The Royal Standard"
            title="An Unrivaled"
            highlightText="Ownership & Rental Journey"
            subtitle="Engineered for high-performing individuals who refuse to compromise on prestige, mechanical precision, and white-glove privacy."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showroom Feature */}
          <div className={`lg:col-span-6 relative transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-amber-400/40 via-amber-600/10 to-transparent shadow-[0_20px_60px_-15px_rgba(212,175,55,0.25)]">
              <div className="relative rounded-[22px] overflow-hidden bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                  alt="Royal Auto Hub Executive Showroom Lounge"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-black/30 pointer-events-none" />

                {/* Floating Quote Box */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#0d0f18]/90 backdrop-blur-md border border-amber-500/30 shadow-xl">
                  <p className="text-xs sm:text-sm text-slate-200 italic font-light">
                    "From the moment you step into our private salon, you are not merely selecting a vehicle—you are claiming a masterwork of engineering."
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Showroom Director · Royal Auto Hub
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Private Salon 01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Key Pillars */}
          <div className="lg:col-span-6 space-y-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const delay = 200 + idx * 100;

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl bg-[#0d0f18] border border-amber-500/15 hover:border-amber-400/40 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg flex items-start gap-4 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-royal text-base sm:text-lg font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className={`pt-4 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button
                onClick={() => onOpenBooking(null)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Schedule Private Showroom Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
