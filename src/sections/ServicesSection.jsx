import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data/services';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Sparkles, ShieldCheck, Crown, UserCheck, BadgePercent, CarFront, Check, ArrowRight } from 'lucide-react';

const iconMap = {
  Sparkles,
  ShieldCheck,
  Crown,
  UserCheck,
  BadgePercent,
  CarFront
};

export default function ServicesSection({ onOpenBooking }) {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="services" ref={sectionRef} className="py-24 sm:py-32 relative bg-[#07080c] overflow-hidden">
      {/* Decorative Golden Ambient Backdrops */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            badge="Bespoke Offerings"
            title="White-Glove Automotive"
            highlightText="Excellence"
            subtitle="Tailored for executive discretion, collector demands, and unforgettable road journeys. Explore our six signature pillars of prestige service."
          />
        </div>

        {/* Staggered Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Crown;
            const staggerDelay = (index % 6) * 100;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl bg-[#0c0e16] p-7 sm:p-8 border border-amber-500/15 hover:border-amber-400/60 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.22)] flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${staggerDelay}ms` }}
              >
                {/* Background Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-amber-500/20 via-zinc-900 to-black border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                      <Icon className="w-6 h-6 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-slate-300 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-royal text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                    {service.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-6">
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => onOpenBooking({ name: service.title })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors group/btn"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">0{index + 1}</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
