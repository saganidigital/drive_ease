import React, { useEffect, useState } from 'react';
import { Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import { preloadAndDecodeFrames, TOTAL_FRAMES } from '../utils/frameCache';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';
    if (window.__lenis) {
      window.__lenis.stop();
    }

    let active = true;

    preloadAndDecodeFrames((pct) => {
      if (!active) return;
      setPercent(pct);

      if (pct === 100) {
        // Allow brief visual completion pause
        setTimeout(() => {
          if (!active) return;
          setIsFinished(true);

          // Unlock scrolling
          document.body.style.overflow = '';
          if (window.__lenis) {
            window.__lenis.start();
          }

          if (onComplete) onComplete();

          // Remove DOM element after transition completes
          setTimeout(() => {
            if (active) setShouldRender(false);
          }, 800);
        }, 400);
      }
    });

    return () => {
      active = false;
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#07080b] flex flex-col items-center justify-center transition-all duration-700 ease-out ${
        isFinished ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative flex flex-col items-center text-center p-6 sm:p-8 max-w-md mx-auto z-10">
        
        {/* Pulsing Royal Crown Ring */}
        <div className="relative w-24 h-24 mb-7 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping opacity-25" />
          <div className="absolute inset-0 rounded-full border border-amber-500/40 shadow-[0_0_35px_rgba(212,175,55,0.35)]" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-amber-500/15 to-transparent flex items-center justify-center">
            <Crown className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Brand Headline */}
        <div className="space-y-1 mb-3">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-400 block">
            Royal Auto Hub · Luxury Showcase
          </span>
          <h1 className="font-royal text-2xl sm:text-3xl font-bold text-white tracking-wider">
            Where Elegance Meets Performance
          </h1>
        </div>

        <p className="text-xs text-slate-300 font-normal max-w-xs mb-8">
          Calibrating interactive fly-around showcase and pre-decoding {TOTAL_FRAMES} frames into GPU memory.
        </p>

        {/* Luxury Gold Progress Bar */}
        <div className="w-64 sm:w-80 h-2 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-amber-500/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-150 shadow-[0_0_20px_rgba(212,175,55,0.7)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Footer Metrics */}
        <div className="flex items-center justify-between w-64 sm:w-80 mt-3.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            {percent < 100 ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>GPU DECODING...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">READY</span>
              </>
            )}
          </div>
          <span className="font-bold text-amber-300">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

