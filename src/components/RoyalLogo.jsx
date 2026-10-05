import React from 'react';
import { Crown } from 'lucide-react';

export default function RoyalLogo({ size = "md", showTagline = true }) {
  const isLarge = size === "lg";

  return (
    <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group text-left cursor-pointer" aria-label="Royal Auto Hub Home">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-zinc-900 to-black border border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-105 group-hover:border-amber-400 ${isLarge ? 'w-14 h-14' : 'w-11 h-11'}`}>
        <Crown className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} text-amber-400 transition-transform duration-300 group-hover:rotate-6 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]`} />
        {/* Subtle shimmer ring */}
        <span className="absolute inset-0 rounded-xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
      </div>

      <div className="flex flex-col">
        <span className={`font-royal font-bold uppercase whitespace-nowrap leading-tight text-white transition-colors duration-300 group-hover:text-amber-300 ${isLarge ? 'text-2xl tracking-[0.2em]' : 'text-base tracking-[0.12em] sm:text-xl sm:tracking-[0.18em]'}`}>
          Royal Auto Hub
        </span>
        {showTagline && (
          <span className="hidden sm:block mt-0.5 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-amber-400/90 font-medium">
            Where Elegance Meets Performance
          </span>
        )}
      </div>
    </a>
  );
}
