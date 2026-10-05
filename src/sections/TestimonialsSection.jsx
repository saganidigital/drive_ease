import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { testimonialsData } from '../data/testimonials';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function TestimonialsSection() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 sm:py-32 relative bg-[#06070a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeader
            badge="Verified Endorsements"
            title="Trusted by"
            highlightText="Elite Collectors & Executives"
            subtitle="Read real accounts from private collectors, corporate executives, and international dignitaries who rely exclusively on Royal Auto Hub."
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((review, idx) => {
            const staggerDelay = idx * 120;

            return (
              <div
                key={review.id}
                className={`relative rounded-2xl bg-[#0c0e16] p-7 sm:p-8 border border-amber-500/15 hover:border-amber-400/50 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.18)] flex flex-col justify-between ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${staggerDelay}ms` }}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-amber-500/20" />
                  </div>

                  {/* Comment */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light mb-6 italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-royal text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" title="Verified Client" />
                    </h4>
                    <span className="text-[11px] text-slate-400 block">{review.role} · {review.location}</span>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-amber-400/90 text-right">
                    {review.vehicle}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
