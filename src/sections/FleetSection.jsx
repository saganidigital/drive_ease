import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { fleetCategories, fleetVehicles } from '../data/fleet';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Gauge, Zap, Flame, KeyRound, Shield, Check, ArrowUpRight } from 'lucide-react';

export default function FleetSection({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState("All Showroom");
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const filteredCars = activeCategory === "All Showroom"
    ? fleetVehicles
    : fleetVehicles.filter(car => car.category === activeCategory);

  return (
    <section id="fleet" ref={sectionRef} className="py-24 sm:py-32 relative bg-[#090b10] border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            badge="The Royal Fleet"
            title="Masterpieces of"
            highlightText="Power & Prestige"
            subtitle="Explore our certified fleet of world-class supercars, ultra-luxury sedans, and high-performance SUVs available for immediate acquisition or white-glove rental."
          />
        </div>

        {/* Category Filter Pills */}
        <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {fleetCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-zinc-900/80 text-slate-400 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Staggered Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => {
            // Calculate staggered transition delay
            const staggerDelay = (index % 6) * 100;

            return (
              <div
                key={car.id}
                className={`group relative rounded-2xl bg-[#0f111a] border border-amber-500/15 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.25)] flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${staggerDelay}ms` }}
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-black/20" />

                  {/* Highlight Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {car.highlightBadge}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider bg-zinc-900/80 text-slate-300 border border-white/10">
                    {car.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/90 block mb-1">
                      {car.tagline}
                    </span>
                    <h3 className="font-royal text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {car.name}
                    </h3>
                  </div>

                  {/* Performance Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> Power
                      </span>
                      <p className="text-xs font-bold text-white font-mono mt-0.5">{car.specs.power}</p>
                    </div>

                    <div className="border-x border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                        <Gauge className="w-3 h-3 text-amber-400" /> 0-60
                      </span>
                      <p className="text-xs font-bold text-white font-mono mt-0.5">{car.specs.acceleration}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" /> Top Spd
                      </span>
                      <p className="text-xs font-bold text-white font-mono mt-0.5">{car.specs.topSpeed}</p>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Daily VIP Hire</span>
                      <span className="text-sm font-bold text-amber-400 font-mono">{car.rentalPrice}<span className="text-[10px] text-slate-400 font-normal">/day</span></span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Direct Sale</span>
                      <span className="text-sm font-bold text-white font-mono">{car.salePrice}</span>
                    </div>
                  </div>

                  {/* Actions: Rent or Inquire */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onOpenBooking(car)}
                      className="py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Rent VIP</span>
                    </button>

                    <button
                      onClick={() => onOpenBooking(car)}
                      className="py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Purchase</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
