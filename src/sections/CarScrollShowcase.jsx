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
  Layers, 
  Compass, 
  ChevronRight
} from 'lucide-react';
import { frameImages, TOTAL_FRAMES } from '../utils/frameCache';

gsap.registerPlugin(ScrollTrigger);

// Milestone feature callouts mapped to scroll progress ranges (BMW M4 Competition G82)
const MILESTONES = [
  {
    range: [0.03, 0.25],
    icon: Wind,
    tag: '01 / AERODYNAMICS',
    title: 'M Carbon Exterior Package',
    desc: 'Sculpted front air intakes, CFRP roof with aerodynamic fins, and rear diffuser channel airflow for high-speed stability.',
    specs: [{ label: 'Drag Coeff.', val: '0.34 Cd' }, { label: 'Roof Panel', val: 'CFRP Carbon' }]
  },
  {
    range: [0.28, 0.50],
    icon: ShieldCheck,
    tag: '02 / ARCHITECTURE',
    title: 'Adaptive M Chassis & xDrive',
    desc: 'Electronically controlled dampers, M Compound brakes, and Active M Differential deliver razor-sharp cornering and grand-touring poise.',
    specs: [{ label: 'Drivetrain', val: 'M xDrive AWD' }, { label: 'Kerb Weight', val: '1,780 kg' }]
  },
  {
    range: [0.53, 0.75],
    icon: Gauge,
    tag: '03 / PERFORMANCE',
    title: '3.0L M TwinPower Turbo I6',
    desc: 'S58 high-revving inline-six engine paired with an 8-speed M Steptronic transmission with Drivelogic for relentless acceleration.',
    specs: [{ label: 'Horsepower', val: '503 HP' }, { label: '0–60 MPH', val: '3.4s' }]
  },
  {
    range: [0.78, 0.98],
    icon: Sparkles,
    tag: '04 / COCKPIT & DELIVERY',
    title: 'M Carbon Bucket Cabin & Curved Display',
    desc: 'Driver-oriented BMW Curved Display with M-specific HUD, illuminated carbon bucket seats, and immediate white-glove delivery.',
    specs: [{ label: 'Top Speed', val: '180 MPH' }, { label: 'Availability', val: 'Immediate' }]
  }
];

export default function CarScrollShowcase({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ambilightCanvasRef = useRef(null);
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

  // High-performance canvas paint + Real-Time Mirrored Ambilight Canvas
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

    // 1. Paint low-res Mirrored Ambilight Canvas (GPU-accelerated CSS blur & saturation)
    const ambi = ambilightCanvasRef.current;
    if (ambi) {
      const ambiCtx = ambi.getContext('2d');
      if (ambiCtx) {
        if (ambi.width !== 96 || ambi.height !== 54) {
          ambi.width = 96;
          ambi.height = 54;
        }
        ambiCtx.drawImage(img, 0, 0, 96, 54);
      }
    }

    // 2. Paint high-DPI Foreground Stage Canvas
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

  // Snappy GSAP ScrollTrigger setup with scrub: 0.1 (disabled if prefers-reduced-motion)
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveMilestoneIdx(2);
      return;
    }

    let lastKnownMilestone = -1;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=250%',
      pin: true,
      anticipatePin: 1,
      scrub: 0.1,
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

  // Auto-play Spin Mode (0.5x speed)
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) return;

    let animId;
    const spinStep = () => {
      if (!isPlayingRef.current) return;
      let next = currentFrameRef.current + 0.5;
      if (next > TOTAL_FRAMES) next = 1;
      currentFrameRef.current = next;

      // Sync milestone card during auto-play or drag
      const p = (next - 1) / (TOTAL_FRAMES - 1);
      let foundIdx = -1;
      for (let i = 0; i < MILESTONES.length; i++) {
        if (p >= MILESTONES[i].range[0] && p <= MILESTONES[i].range[1]) {
          foundIdx = i;
          break;
        }
      }
      setActiveMilestoneIdx(foundIdx);

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

    const p = (target - 1) / (TOTAL_FRAMES - 1);
    let foundIdx = -1;
    for (let i = 0; i < MILESTONES.length; i++) {
      if (p >= MILESTONES[i].range[0] && p <= MILESTONES[i].range[1]) {
        foundIdx = i;
        break;
      }
    }
    setActiveMilestoneIdx(foundIdx);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const activeMilestone = activeMilestoneIdx >= 0 ? MILESTONES[activeMilestoneIdx] : MILESTONES[0];

  return (
    <section 
      id="cinematic-showcase" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#07080b] text-slate-100 overflow-hidden select-none flex flex-col justify-between py-6 sm:py-8 border-t border-white/5"
    >
      {/* Subtle Architectural Grid & Obsidian Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_40%_50%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Top HUD Header */}
      <div className="relative z-20 px-4 sm:px-8 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-12 sm:pt-14 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400 block">
              Royal Auto Hub · Fly Around
            </span>
            <h2 className="font-royal text-base sm:text-xl font-bold text-white tracking-wide">
              BMW M4 Competition Coupe (G82)
            </h2>
          </div>
        </div>

        {/* Hint Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-md border border-amber-500/25 text-[13px] text-slate-200 shadow-lg">
          <Layers className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Scroll or drag to explore</span>
        </div>
      </div>

      {/* Main Split Showcase Area: Canvas + Dedicated Side/Bottom Info Panel (Never overlaps the car) */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto py-2">
        
        {/* Left / Main Column: Real-Time Mirrored Ambilight + Foreground Canvas Stage */}
        <div className="lg:col-span-8 relative w-full h-[38vh] sm:h-[52vh] lg:h-[62vh] flex items-center justify-center">
          {/* Layer 1: Warm Royal Gold & Cool Cyan Rim Glow */}
          <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-tr from-amber-500/25 via-sky-500/15 to-amber-400/25 rounded-[2.5rem] blur-[70px] opacity-80 pointer-events-none" />

          {/* Layer 2: Real-Time Mirrored Canvas Ambilight (Projects live frame colors outward) */}
          <canvas
            ref={ambilightCanvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain scale-115 blur-[65px] opacity-85 saturate-200 brightness-125 pointer-events-none select-none"
          />

          {/* Layer 3: High-Contrast Foreground Car Canvas with Crisp 3.5% Edge Feather */}
          <canvas 
            ref={canvasRef} 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative z-10 w-full h-full object-contain cursor-grab active:cursor-grabbing touch-none select-none canvas-edge-mask"
          />
        </div>

        {/* Right / Bottom Column: Dynamic Milestone Callout Card (Outside the car stage) */}
        <div className="lg:col-span-4 w-full z-20 pointer-events-auto">
          {activeMilestone && (
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <activeMilestone.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                  {activeMilestone.tag}
                </span>
              </div>

              <h3 className="font-royal text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                {activeMilestone.title}
              </h3>

              <p className="text-[13px] sm:text-sm text-slate-200 font-normal leading-relaxed mb-4">
                {activeMilestone.desc}
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
                {activeMilestone.specs.map((s, idx) => (
                  <div key={idx} className="bg-zinc-900/90 border border-white/10 rounded-lg p-2.5 text-center">
                    <span className="text-xs text-slate-300 block uppercase tracking-wider">{s.label}</span>
                    <span className="text-sm font-bold text-amber-300 font-mono mt-0.5 block">{s.val}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenBooking && onOpenBooking({ name: 'BMW M4 Competition Coupe' })}
                className="mt-4 w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <span>Reserve BMW M4 Competition</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar & Interactive Scrubber */}
      <div className="relative z-20 px-4 sm:px-8 max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pointer-events-auto">
        
        {/* Left: Auto-play Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/35 hover:border-amber-400 text-[13px] font-medium text-slate-100 transition-all duration-300 shadow-lg cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Play Sequence</span>
              </>
            )}
          </button>
        </div>

        {/* Center/Right: Realtime Progress Bar updated via DOM ref without React state lag */}
        <div className="w-full sm:max-w-md flex items-center gap-3">
          <span className="text-xs font-mono text-slate-300">Exterior</span>
          <div className="relative flex-1 h-2 bg-zinc-800/90 rounded-full overflow-hidden border border-white/10">
            <div 
              ref={progressLineRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 to-yellow-400 transition-none"
              style={{ width: '0%' }}
            />
          </div>
          <span className="text-xs font-mono text-slate-300">Cabin</span>
        </div>
      </div>
    </section>
  );
}
