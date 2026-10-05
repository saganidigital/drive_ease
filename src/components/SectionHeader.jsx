import React from 'react';
import { Crown } from 'lucide-react';

export default function SectionHeader({
  badge,
  title,
  highlightText,
  subtitle,
  centered = true
}) {
  return (
    <div className={`space-y-3 mb-12 sm:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {/* Crown / Badge */}
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(212,175,55,0.15)]`}>
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2 className="font-royal text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="gold-gradient-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
          {subtitle}
        </p>
      )}

      {/* Decorative Gold Divider line */}
      {centered && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
          <div className="w-2 h-2 rotate-45 border border-amber-400/80 bg-amber-500/20" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
      )}
    </div>
  );
}
