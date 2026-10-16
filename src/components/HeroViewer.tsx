import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '../types';

interface HeroViewerProps {
  destinations: Destination[];
  activeDestination: Destination;
  onSelectDestination: (destination: Destination) => void;
  onOpenBooking: (destination: Destination) => void;
  onOpenLightbox: (imageUrl: string, index: number, targetDest?: Destination) => void;
}

export const HeroViewer: React.FC<HeroViewerProps> = ({
  destinations,
  activeDestination,
  onSelectDestination,
  onOpenBooking,
  onOpenLightbox,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const currentIndex = destinations.findIndex((d) => d.id === activeDestination.id);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  // Track hero visibility so auto-advance only runs when hero is actually in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Calculate responsive curve offsets for circular bubbles arc
  const getCurveOffsets = (idx: number, total: number) => {
    const t = idx / Math.max(1, total - 1);
    const arcFactor = Math.sin(t * Math.PI); // 0 at ends, 1 in middle
    const desktopOffset = -(1 - arcFactor) * 125; // sweeps 125px on desktop
    const mobileOffset = -(1 - arcFactor) * 45; // sweeps 45px on mobile

    return {
      '--curve-desktop': `${desktopOffset}px`,
      '--curve-mobile': `${mobileOffset}px`,
    } as React.CSSProperties;
  };

  const nextDestination = () => {
    const nextIdx = (safeIndex + 1) % destinations.length;
    onSelectDestination(destinations[nextIdx]);
  };

  const prevDestination = () => {
    const prevIdx = (safeIndex - 1 + destinations.length) % destinations.length;
    onSelectDestination(destinations[prevIdx]);
  };

  // Auto-play timer: advances cleanly once every 6 seconds without continuous re-renders
  useEffect(() => {
    if (!isPlaying || !isHeroVisible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      const nextIdx = (safeIndex + 1) % destinations.length;
      onSelectDestination(destinations[nextIdx]);
    }, 6000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, isHeroVisible, safeIndex, destinations, onSelectDestination]);

  // Touch gestures: ONLY intercept clear horizontal swipes, never block natural vertical scroll!
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only switch on definitive horizontal swipes (> 55px and horizontally dominant)
    if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) {
        nextDestination();
      } else {
        prevDestination();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={heroRef}
      id="hero-viewer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 lg:pb-14 px-6 sm:px-10 lg:px-14 bg-sky-950/20 text-white select-none touch-pan-y gpu-layer"
    >
      {/* Cinematic Full-Bleed Background Image with Smooth Cross-Fade and Soft Light Blue/White Tones */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDestination.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={() => nextDestination()}
          title="Tap anywhere to advance scenery"
        >
          <img
            src={activeDestination.heroImage}
            alt={`${activeDestination.name}, Sri Lanka`}
            referrerPolicy="no-referrer"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.01]"
          />
          {/* Atmospheric soft dark gradient overlays - illuminated and airy */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-slate-900/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/25 to-transparent" />
          {/* Subtle luminous warm overlay */}
          <div className="absolute inset-0 bg-amber-400/[0.04] mix-blend-screen pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Stage: Left Editorial Title + Right Floating Image Bubbles */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-12 pt-2">
        {/* Left Side: Sri Lanka Brand & Active Scenery Highlights */}
        <div className="max-w-2xl hero-content">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="hero-title select-none">
              <span className="lali">LALI</span>
              <span className="ceylon">CEYLON</span>
              <span className="tours">TOURS</span>
            </h1>

            {/* Separator Accent: ONE ISLAND · MANY WORLDS as in image.png */}
            <div className="flex items-center gap-3 sm:gap-4 mt-3.5 mb-5 select-none">
              <div className="h-[1.5px] w-10 sm:w-16 bg-[#f5d15c]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-bold text-[#f5d15c] font-manrope">
                ONE ISLAND · MANY WORLDS
              </span>
              <div className="h-[1.5px] w-10 sm:w-16 bg-[#f5d15c]" />
            </div>
          </motion.div>

          {/* Active Landmark Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDestination.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="mt-4 sm:mt-5 max-w-xl"
            >
              <div className="hero-location drop-shadow">
                {activeDestination.name.toUpperCase()}
                <span className="text-white/80 font-normal"> — {activeDestination.region.toUpperCase()}</span>
              </div>

              <p className="hero-description mt-2.5 drop-shadow">
                "{activeDestination.slogan}"
              </p>

              <div className="hero-buttons mt-6 flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking(activeDestination);
                  }}
                  className="btn px-7 py-3 rounded-full bg-white hover:bg-[#f5d15c] text-slate-950 font-bold uppercase transition-all shadow-xl shadow-black/40 cursor-pointer flex items-center gap-2"
                >
                  <span>PLAN JOURNEY</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Floating Circular Image Bubbles with Script Titles */}
        <div className="relative z-20 flex items-center justify-end gap-3 sm:gap-6 max-h-[75vh] sm:max-h-none overflow-visible py-1 pr-1 sm:pr-2 mb-6 sm:mb-8 lg:mb-10">
          {/* Curved Bubbles Rail */}
          <div className="flex flex-col items-end gap-2 sm:gap-2.5 md:gap-3 pr-1 sm:pr-3">
            {destinations.map((dest, idx) => {
              const isActive = idx === safeIndex;
              return (
                <div
                  key={dest.id}
                  style={getCurveOffsets(idx, destinations.length)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className={`curved-bubble-item destination flex items-center justify-end gap-3 sm:gap-4 cursor-pointer group select-none ${
                    isActive ? 'active' : ''
                  }`}
                >
                  {/* Destination Name & Location on the Left of Bubble */}
                  <div
                    className={`text-right transition-opacity duration-300 ${
                      isActive
                        ? 'opacity-100'
                        : 'opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    <p
                      className={`destination-name ${
                        isActive ? 'active' : ''
                      } drop-shadow-lg`}
                    >
                      {dest.name}
                    </p>
                    <p className="destination-location drop-shadow mt-0.5">
                      {dest.region}, Sri Lanka
                    </p>
                  </div>

                  {/* Circular Image Bubble */}
                  <div
                    className={`relative rounded-full overflow-hidden transition-all duration-500 flex-shrink-0 cursor-pointer ${
                      isActive
                        ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 sm:border-3 border-white ring-4 sm:ring-8 ring-amber-300/40 shadow-2xl scale-105 shadow-black/80'
                        : 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-white/40 shadow-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:border-white/80'
                    }`}
                  >
                    <img
                      src={dest.cardImage}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-115 transition-transform duration-700"
                    />
                    {/* Glass glare overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/30 pointer-events-none rounded-full" />
                    {isActive && (
                      <div className="absolute inset-0 border border-white/50 rounded-full pointer-events-none" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vertical Slider Dots on the far right */}
          <div className="hidden sm:flex flex-col items-center gap-2.5 ml-1">
            {destinations.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDestination(destinations[i]);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === safeIndex
                    ? 'w-2.5 h-2.5 bg-white ring-4 ring-white/40 shadow-lg'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Go to landmark ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Timeline Progress on Left + Slideshow Controls (sitting directly on the wave with z-30) */}
      <div className="relative z-30 w-full pt-4 mb-2 sm:mb-4 flex items-end justify-between gap-4">
        {/* Bottom Left: Minimal Timeline & Counter */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#051522]/90 backdrop-blur-xl border border-cyan-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <span className="text-xs font-mono tracking-widest text-amber-300 font-bold">
              {String(safeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/40 text-xs">/</span>
            <span className="text-white/70 text-xs font-mono tracking-widest">
              {String(destinations.length).padStart(2, '0')}
            </span>
          </div>

          {/* Auto-play pause toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="w-8 h-8 rounded-full bg-[#051522]/90 backdrop-blur-xl border border-cyan-400/40 flex items-center justify-center text-white/90 hover:text-white hover:border-cyan-300 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
            aria-label="Toggle slideshow"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-amber-300" />}
          </button>

          {/* Prev / Next Minimal Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevDestination();
              }}
              className="w-8 h-8 rounded-full bg-[#051522]/90 backdrop-blur-xl border border-cyan-400/40 flex items-center justify-center text-white/90 hover:text-white hover:border-cyan-300 hover:bg-[#071f30] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              title="Previous scenery"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextDestination();
              }}
              className="w-8 h-8 rounded-full bg-[#051522]/90 backdrop-blur-xl border border-cyan-400/40 flex items-center justify-center text-white/90 hover:text-white hover:border-cyan-300 hover:bg-[#071f30] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              title="Next scenery (or touch/swipe)"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Organic Curved Wave Divider - Curves across the slideshow buttons in the bottom-left with oceanic shaded background in the main view */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden leading-none pointer-events-none select-none -mb-[1px]">
        <svg
          className="relative block w-full h-32 sm:h-40 md:h-48 lg:h-56"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
        >
          {/* Subtle translucent ocean spray crest echoing the curve */}
          <path
            d="M0,240 L0,58 C50,56 105,102 160,112 C215,122 265,70 310,62 C365,54 420,96 480,110 C560,128 660,168 760,188 C860,210 980,218 1100,221 C1220,223 1340,224 1440,224 L1440,240 Z"
            fill="#38bdf8"
            fillOpacity="0.18"
          />
          {/* Second delicate foam tier */}
          <path
            d="M0,240 L0,70 C50,68 105,114 160,124 C215,134 265,84 310,76 C365,68 420,110 480,124 C560,142 660,180 760,198 C860,216 980,221 1100,223 C1220,224 1340,224 1440,224 L1440,240 Z"
            fill="#0ea5e9"
            fillOpacity="0.32"
          />
          {/* Main Solid Wave Divider transitioning seamlessly into the shaded About Us section */}
          <path
            d="M0,240 L0,82 C50,80 105,126 160,136 C215,146 265,96 310,88 C365,80 420,122 480,136 C560,154 660,192 760,206 C860,220 980,223 1100,224 C1220,225 1340,225 1440,225 L1440,240 Z"
            fill="#031320"
          />
        </svg>
      </div>
    </section>
  );
};
