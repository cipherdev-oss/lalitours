import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, RotateCcw, MapPin } from 'lucide-react';

interface JourneyCloserProps {
  onOpenBooking?: () => void;
  onNavigate?: (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => void;
}

const STOPS = [
  { x: 30, y: 250, label: 'Colombo', sub: 'Touchdown', delay: '0.4s' },
  { x: 165, y: 130, label: 'Highlands', sub: 'Tea trails', delay: '2.1s' },
  { x: 285, y: 60, label: 'Sigiriya', sub: 'Sky citadel', delay: '3.8s' },
];

const STARS = [
  { x: 22, y: 30, d: '0s' }, { x: 70, y: 14, d: '0.7s' }, { x: 130, y: 34, d: '1.3s' },
  { x: 200, y: 18, d: '0.4s' }, { x: 262, y: 40, d: '1.8s' }, { x: 296, y: 120, d: '1.0s' },
  { x: 44, y: 200, d: '2.1s' }, { x: 288, y: 220, d: '0.2s' }, { x: 150, y: 260, d: '1.5s' },
];

const ISLAND_PATH =
  'M168,18 C196,20 214,44 218,74 C222,104 214,118 220,142 C226,168 244,182 240,212 C236,242 214,252 206,272 C198,292 178,304 156,300 C134,296 128,272 108,266 C88,260 66,268 58,248 C50,228 70,214 72,192 C74,170 58,158 64,134 C70,110 92,108 104,88 C116,68 140,16 168,18 Z';

const ROUTE_PATH = 'M30,250 C90,210 110,150 165,130 C220,110 235,70 285,60';

const KM_TOTAL = 1340;

export const JourneyCloser: React.FC<JourneyCloserProps> = ({ onOpenBooking, onNavigate }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-18% 0px' });
  const [playKey, setPlayKey] = useState(0);
  const [km, setKm] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      setPlayKey((k) => k + 1);
    }
    if (!inView) startedRef.current = false;
  }, [inView]);

  useEffect(() => {
    if (playKey === 0) return;
    setKm(0);
    const t0 = performance.now();
    const dur = 5000;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setKm(Math.round(eased * KM_TOTAL));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey]);

  return (
    <section ref={sectionRef} aria-label="Watch your island route unfold" className="w-full pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden touch-pan-y">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[320px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#02070d]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.32em] text-cyan-300/90">
            Watch it unfold
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }} className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-archivo font-black tracking-tight text-white uppercase leading-[0.95]">
            One Island.
            <span className="block mt-1 bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200 bg-clip-text text-transparent">Your Route.</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="mt-5 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-3xl sm:text-4xl font-archivo font-black text-white tabular-nums">{km.toLocaleString()}</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 text-left leading-relaxed">km of coastline<br />traced live</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.35 }} className="mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <button type="button" onClick={() => onOpenBooking?.()} className="min-h-[52px] px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_32px_rgba(34,211,238,0.45)] transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer">
              Trace My Route <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setPlayKey((k) => k + 1)} className="min-h-[52px] px-6 py-3.5 rounded-full border border-white/15 hover:border-cyan-300/50 text-slate-200 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-all cursor-pointer">
              <RotateCcw className="w-4 h-4" /> Replay
            </button>
          </motion.div>
          <button type="button" onClick={() => onNavigate?.('tours')} className="mt-4 text-xs text-slate-500 hover:text-cyan-300 transition-colors underline underline-offset-4 cursor-pointer">
            or browse tour packages
          </button>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1 }} className="order-1 lg:order-2 mx-auto w-full max-w-[420px]">
          <div key={playKey} className={`jc-playing relative rounded-3xl border border-cyan-400/20 bg-[#04121e]/80 backdrop-blur-md p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden ${inView ? '' : ''}`}>
            <svg viewBox="0 0 320 320" className="w-full h-auto" role="img" aria-label="Animated map of a Sri Lanka journey route">
              <defs>
                <radialGradient id="jcSea" cx="50%" cy="45%" r="65%">
                  <stop offset="0%" stopColor="#0b2f47" />
                  <stop offset="100%" stopColor="#04121e" />
                </radialGradient>
                <linearGradient id="jcRouteGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="60%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <filter id="jcGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect x="0" y="0" width="320" height="320" rx="20" fill="url(#jcSea)" />
              {STARS.map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r="1.3" fill="#a5f3fc" className="jc-star" style={{ animationDelay: s.d }} />
              ))}
              <g className="jc-float">
                <path d={ISLAND_PATH} fill="#0a2436" stroke="rgba(103,232,249,0.5)" strokeWidth="1.5" />
                <path d={ISLAND_PATH} fill="none" stroke="rgba(103,232,249,0.25)" strokeWidth="5" />
              </g>
              <path d={ROUTE_PATH} fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="7" strokeLinecap="round" />
              <path d={ROUTE_PATH} fill="none" stroke="url(#jcRouteGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#jcGlow)" strokeDasharray="520" strokeDashoffset="520" className="jc-route" />
              {STOPS.map((s) => (
                <g key={s.label} transform={`translate(${s.x},${s.y})`}>
                  <circle r="9" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="jc-ring" style={{ animationDelay: s.delay, transformOrigin: 'center', transformBox: 'fill-box' }} />
                  <g className="jc-pin" style={{ animationDelay: s.delay, transformOrigin: 'center bottom', transformBox: 'fill-box' }}>
                    <circle r="8" fill="#04121e" stroke="#22d3ee" strokeWidth="1.5" />
                    <g transform="translate(0,-1) scale(0.55)">
                      <path d="M0,-14 C-7,-14 -11,-9 -11,-4 C-11,3 0,12 0,12 C0,12 11,3 11,-4 C11,-9 7,-14 0,-14 Z" fill="#22d3ee" />
                      <circle r="3" cy="-4" fill="#04121e" />
                    </g>
                  </g>
                </g>
              ))}
              <g className="jc-boat">
                <circle r="7" fill="#fbbf24" opacity="0.9" filter="url(#jcGlow)" />
                <circle r="3" fill="#fff7ed" />
              </g>
            </svg>
            <div className="mt-1 space-y-2">
              {STOPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 text-left">
                  <span className="w-6 h-6 rounded-full bg-cyan-400/15 border border-cyan-300/40 text-cyan-200 text-[10px] font-mono font-bold flex items-center justify-center">{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white tracking-wide">{s.label}</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-500">{s.sub}</div>
                  </div>
                  <MapPin className="w-3.5 h-3.5 text-cyan-300/60" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
