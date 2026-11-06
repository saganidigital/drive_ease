import React from 'react';
import { statsData } from '../data/stats';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountUp } from '../hooks/useCountUp';
import { Award, ShieldCheck, Star, Clock } from 'lucide-react';

function StatCard({ stat, isVisible, index }) {
  const count = useCountUp(stat.value, isVisible, 2000, stat.decimals || 0);
  const staggerDelay = index * 120;

  const iconMap = [Award, ShieldCheck, Star, Clock];
  const Icon = iconMap[index % iconMap.length];

  return (
    <div
      className={`relative rounded-2xl bg-[#0e1017] p-6 sm:p-8 border border-amber-500/20 text-center transition-all duration-700 ease-out hover:border-amber-400/50 hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.2)] flex flex-col justify-between ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      <div>
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <Icon className="w-6 h-6" />
        </div>

        {/* Number + Unit: Single font (font-royal) and single color (text-amber-300), normal case so units like "<60 mins" and "300-point" match */}
        <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-300 mb-2 flex items-baseline justify-center tracking-tight whitespace-nowrap">
          <span>{stat.prefix}{count}{stat.suffix}</span>
        </div>

        {/* Title & Sublabel */}
        <h3 className="font-royal text-sm sm:text-base font-bold text-slate-100 uppercase tracking-wider mb-1.5">
          {stat.label}
        </h3>
        <p className="text-[13px] text-slate-300 font-normal leading-relaxed">
          {stat.sublabel}
        </p>
      </div>

      {/* Subtle bottom accent line */}
      <div className="w-8 h-[2px] bg-amber-400/40 mx-auto mt-5 rounded-full" />
    </div>
  );
}

export default function StatsSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="stats" ref={sectionRef} className="section-padding relative bg-[#06070a] border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400 block mb-2">
            Proven Prestige & Trust
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-white">
            Numbers Defining <span className="gold-gradient-text">Royal Standards</span>
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
