import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Wind, 
  ShieldCheck, 
  Gauge, 
  Sparkles, 
  Play, 
  Pause, 
  ArrowDown, 
  Layers, 
  Compass, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { frameImages, TOTAL_FRAMES } from '../utils/frameCache';

gsap.registerPlugin(ScrollTrigger);

// Milestone feature callouts mapped to scroll progress ranges
const MILESTONES = [
  {
    range: [0.03, 0.25],
    icon: Wind,
    tag: '01 / AERODYNAMICS',
    title: 'Wind Tunnel Sculpted Form',
    desc: 'Aggressive front splitters and active venturi channels guide laminar airflow, reducing drag while producing over 300kg of functional downforce.',
    specs: [{ label: 'Drag Coeff.', val: '0.28 Cd' }, { label: 'Downforce', val: '320 kg' }]
  },
  {
    range: [0.28, 0.50],
    icon: ShieldCheck,
    tag: '02 / ARCHITECTURE',
    title: 'Carbon Composite Monocoque',
    desc: 'Engineered with race-proven carbon-fiber weaves and aerospace-grade bonded aluminum, delivering unrivaled torsional rigidity and razor-sharp agility.',
    specs: [{ label: 'Chassis Rigidity', val: '45,000 Nm/°' }, { label: 'Kerb Weight', val: '1,420 kg' }]
  },
  {
    range: [0.53, 0.75],
    icon: Gauge,
    tag: '03 / PERFORMANCE',
    title: 'Twin-Turbocharged V12 Heart',
    desc: 'Uncompromising engineering unleashing explosive power, rapid dual-clutch transmission shifts, and an intoxicating titanium exhaust acoustic signature.',
    specs: [{ label: 'Horsepower', val: '715 BHP' }, { label: '0–60 MPH', val: '3.4 sec' }]
  },
  {
    range: [0.78, 0.98],
    icon: Sparkles,
    tag: '04 / ROYAL EXCLUSIVITY',
    title: 'White-Glove Showroom Delivery',
    desc: 'Available for bespoke chauffeur bookings, VIP executive hire, or turnkey acquisition with guaranteed provenance and private hangar dispatch.',
    specs: [{ label: 'Showroom Tier', val: 'Signature' }, { label: 'Availability', val: 'Immediate' }]
  }
];

export default function CarScrollShowcase({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameTextRef = useRef(null);
  const progressLineRef = useRef(null);

  // Active frame tracked in ref for zero-react-overhead canvas rendering
  const currentFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Mouse / Touch Dragging State
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(1);

  // Component React state (only updated on key milestones to prevent re-render jank)
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // High-performance canvas paint
  const paintFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));

    let img = frameImages[clamped - 1];
    // Nearest-neighbor fallback if frame isn't ready
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = frameImages[clamped - 1 - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = frameImages[clamped - 1 + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const displayW = rect.width;
    const displayH = rect.height;

    if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
      canvas.width = Math.round(displayW * dpr);
      canvas.height = Math.round(displayH * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayW, displayH);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayW / displayH;

    let drawW, drawH, posX, posY;
    if (canvasAspect > imgAspect) {
      drawH = displayH;
      drawW = displayH * imgAspect;
      posX = (displayW - drawW) / 2;
      posY = 0;
    } else {
      drawW = displayW;
      drawH = displayW / imgAspect;
      posX = 0;
      posY = (displayH - drawH) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, posX, posY, drawW, drawH);
    ctx.restore();

    lastDrawnFrameRef.current = clamped;
  }, []);

  // Continuous RAF loop that checks if the active frame changed and paints it directly
  useEffect(() => {
    let active = true;

    // Paint initial frame immediately on mount
    paintFrame(currentFrameRef.current);

    const renderLoop = () => {
      if (!active) return;

      const target = currentFrameRef.current;
      if (target !== lastDrawnFrameRef.current) {
        paintFrame(target);

        // Update DOM HUD elements directly without React re-render lag
        if (frameTextRef.current) {
          frameTextRef.current.innerText = `FRAME ${String(Math.round(target)).padStart(3, '0')} / ${TOTAL_FRAMES}`;
        }
        if (progressLineRef.current) {
          const pct = ((target - 1) / (TOTAL_FRAMES - 1)) * 100;
          progressLineRef.current.style.width = `${pct}%`;
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [paintFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      paintFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [paintFrame]);

  // Snappy GSAP ScrollTrigger setup with scrub: 0.1
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let lastKnownMilestone = -1;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=350%',
      pin: true,
      anticipatePin: 1,
      scrub: 0.1, // Instant and snappy scroll response
      onUpdate: (self) => {
        const p = self.progress;
        const targetFrame = 1 + p * (TOTAL_FRAMES - 1);
        currentFrameRef.current = targetFrame;

        // Check if milestone changed (only re-render React state when crossing milestone thresholds)
        let foundIdx = -1;
        for (let i = 0; i < MILESTONES.length; i++) {
          if (p >= MILESTONES[i].range[0] && p <= MILESTONES[i].range[1]) {
            foundIdx = i;
            break;
          }
        }

        if (foundIdx !== lastKnownMilestone) {
          lastKnownMilestone = foundIdx;
          setActiveMilestoneIdx(foundIdx);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Auto-play Spin Mode
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) return;

    let animId;
    const spinStep = () => {
      if (!isPlayingRef.current) return;
      let next = currentFrameRef.current + 1;
      if (next > TOTAL_FRAMES) next = 1;
      currentFrameRef.current = next;
      animId = requestAnimationFrame(spinStep);
    };

    animId = requestAnimationFrame(spinStep);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Pointer Drag Handlers (Interactive Turntable)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = currentFrameRef.current;
    if (isPlaying) setIsPlaying(false);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const frameDelta = Math.round(deltaX / 5);
    let target = dragStartFrameRef.current - frameDelta;
    while (target < 1) target += TOTAL_FRAMES;
    target = ((target - 1) % TOTAL_FRAMES) + 1;
    currentFrameRef.current = target;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const activeMilestone = activeMilestoneIdx >= 0 ? MILESTONES[activeMilestoneIdx] : null;

  return (
    <section 
      id="cinematic-showcase" 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#06070a] text-slate-100 overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-[#07080b] to-[#040507] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[60vh] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Top HUD Header */}
      <div className="absolute top-6 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/90 block">
              Royal Auto Hub · 360° Studio
            </span>
            <h2 className="font-royal text-sm sm:text-base font-bold text-white tracking-wide">
              Ultra-Responsive Sequence
            </h2>
          </div>
        </div>

        {/* Right Info: Frame Counter & 60 FPS Badge */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">GPU ACCELERATED</span>
          </div>

          <div 
            ref={frameTextRef} 
            className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 min-w-[140px] text-center"
          >
            FRAME 001 / {TOTAL_FRAMES}
          </div>
        </div>
      </div>

      {/* The Smooth Canvas Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-10">
        <canvas 
          ref={canvasRef} 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-full max-h-[82vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-grab active:cursor-grabbing touch-none select-none"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-[#06070a]/70 pointer-events-none" />
      </div>

      {/* Dynamic Milestone Callout Card (Updated only when milestones change) */}
      <div className="absolute bottom-24 sm:bottom-28 left-4 sm:left-10 z-20 max-w-sm sm:max-w-md pointer-events-auto">
        {activeMilestone ? (
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl animate-float transition-all duration-300">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                <activeMilestone.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                {activeMilestone.tag}
              </span>
            </div>

            <h3 className="font-royal text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              {activeMilestone.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
              {activeMilestone.desc}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
              {activeMilestone.specs.map((s, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-2 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">{s.label}</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">{s.val}</span>
                </div>
              ))}
            </div>

            {activeMilestoneIdx === 3 && (
              <button
                onClick={() => onOpenBooking && onOpenBooking({ name: 'Royal Signature Supercar' })}
                className="mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <span>Reserve This Vehicle</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/60 backdrop-blur-md border border-white/10 text-xs text-slate-300 shadow-xl">
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Scroll or drag horizontally to inspect 360° exterior geometry</span>
          </div>
        )}
      </div>

      {/* Bottom Control Bar & Interactive Scrubber */}
      <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
        
        {/* Left: Auto-play Toggle & Lenis indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-medium text-slate-200 transition-all duration-300 shadow-lg cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Auto-Spin</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto 360° Spin</span>
              </>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
            <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Instant Scrub (0.1s lock)</span>
          </div>
        </div>

        {/* Center: Realtime Scrub Line updated via DOM ref without React state lag */}
        <div className="w-full max-w-md flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-400">01</span>
          <div className="relative flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              ref={progressLineRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 to-yellow-400 transition-none"
              style={{ width: '0%' }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400">{TOTAL_FRAMES}</span>
        </div>

        {/* Right: Pre-decode Status */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400/90 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">1080p GPU Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
