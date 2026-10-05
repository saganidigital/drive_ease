import React, { useEffect, useState } from 'react';
import { Crown, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
import { companyInfo } from '../data/company';
import { useScroll } from '../hooks/useScroll';

export default function HeroSection({ onOpenBooking }) {
  const { scrollY } = useScroll();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax translation and scale based on scroll
  const parallaxOffset = Math.min(scrollY * 0.25, 120);
  const scaleAmount = 1 + Math.min(scrollY * 0.0004, 0.08);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-20 lg:pt-36 lg:pb-28 flex items-center justify-center overflow-hidden bg-radial from-[#12141e] via-[#08090d] to-[#040507]"
    >
      {/* Background Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))` }}
      />
      <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-700/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Royal Crown Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-amber-300">
              Where Elegance Meets Performance
            </span>
          </div>

          {/* Main Headline */}
          <div 
            className={`space-y-3 transition-all duration-700 delay-150 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Royal Auto Hub
            </h1>
            <p className="font-royal text-lg sm:text-2xl md:text-3xl font-semibold tracking-wide gold-gradient-text uppercase">
              Luxury Car Sales and Rent Services
            </p>
          </div>

          {/* Subheadline description */}
          <p 
            className={`text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Access the pinnacle of automotive prestige. Direct European imports, certified showroom supercars, bespoke financing, and white-glove chauffeur reservations.
          </p>

          {/* High-Conversion CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 transition-all duration-700 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking(null)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>{companyInfo.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Fleet Explorer Button */}
            <a
              href="#fleet"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-slate-200 bg-zinc-900/80 hover:bg-zinc-800/90 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
            >
              <span>Explore Fleet Showroom</span>
            </a>
          </div>

          {/* Direct WhatsApp Callout Pill from flyer */}
          <div 
            className={`inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 text-xs text-slate-300 transition-all duration-700 delay-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-white/10 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>VIP Showroom Tours Daily</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Element (Featured Aston Martin Supercar with Parallax Scale) */}
        <div 
          className={`mt-12 sm:mt-16 relative max-w-5xl mx-auto transition-all duration-1000 ease-out delay-500 ${
            loaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-12'
          }`}
        >
          {/* Decorative Gold Frame Border matching flyer */}
          <div className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-amber-400/50 via-amber-600/20 to-transparent shadow-[0_20px_70px_-20px_rgba(212,175,55,0.3)]">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0d0f18] border border-amber-500/30">
              
              {/* Parallax Image Container */}
              <div 
                className="relative h-[280px] sm:h-[440px] md:h-[540px] w-full overflow-hidden transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${scaleAmount}) translateY(${parallaxOffset * 0.1}px)`
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=85"
                  alt="Aston Martin DBS Superleggera - Royal Auto Hub Signature Showroom Fleet"
                  className="w-full h-full object-cover object-center transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08090d]/60 via-transparent to-[#08090d]/60 pointer-events-none" />
              </div>

              {/* Floating Bottom Showroom Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-[#0c0e16]/85 backdrop-blur-md border border-amber-500/30 shadow-2xl">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                    Featured Signature Icon
                  </span>
                  <h3 className="font-royal text-base sm:text-xl font-bold text-white">
                    Aston Martin DBS Superleggera V12
                  </h3>
                  <p className="text-xs text-slate-300 font-light hidden sm:block">
                    715 Horsepower · 0-60 in 3.4s · Showroom Ready in Obsidian Black
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Daily VIP Hire</span>
                    <span className="text-sm sm:text-base font-bold text-amber-300 font-mono">$1,850/day</span>
                  </div>
                  <button
                    onClick={() => onOpenBooking({ name: "Aston Martin DBS Superleggera" })}
                    className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shrink-0"
                  >
                    Inquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Floating Trust Badges below image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
            <div className="glass-panel rounded-xl p-4 flex items-center gap-3.5 border border-amber-500/20">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Certified & Inspected</h4>
                <p className="text-[11px] text-slate-400">Exhaustive 300-point mechanical check</p>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 flex items-center gap-3.5 border border-amber-500/20">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Latest Imports</h4>
                <p className="text-[11px] text-slate-400">Exclusive 2025/2026 factory allocations</p>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4 flex items-center gap-3.5 border border-amber-500/20">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Doorstep Dispatch</h4>
                <p className="text-[11px] text-slate-400">Private jet tarmac & residence delivery</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
