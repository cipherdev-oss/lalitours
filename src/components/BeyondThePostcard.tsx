import React, { useState } from 'react';
import { WaveDivider } from './WaveDivider';
import { Compass, ArrowRight, Eye, Sparkles, MapPin } from 'lucide-react';
import { HIDDEN_SPOT_CARDS } from '../data/hiddenSpotCards';
import type { HiddenSpotCard } from '../data/hiddenSpotCards';

interface BeyondThePostcardProps {
  onOpenBooking?: (spotName?: string) => void;
}

export const BeyondThePostcard: React.FC<BeyondThePostcardProps> = ({ onOpenBooking }) => {
  const [selectedSpot, setSelectedSpot] = useState<HiddenSpotCard | null>(null);

  return (
    <section id="beyond-postcard" className="w-full py-20 sm:py-28 bg-[#040d16] text-white relative overflow-hidden section-lazy touch-pan-y">
      {/* Subtle background ambient mesh - desktop only to prevent mobile fillrate choke */}
      <div className="hidden md:block absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none gpu-layer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Hidden Serendipity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-white uppercase">
            Beyond the Postcard
          </h2>
          <blockquote className="mt-3 text-lg sm:text-xl font-serif italic text-cyan-200/90 max-w-xl mx-auto">
            "You've seen Sri Lanka. Now discover the Sri Lanka few travellers know."
          </blockquote>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto">
            Step off the well-trodden circuit into untamed cloud forests, wild coral islands, and swimming elephant lakes.
          </p>
        </div>

        {/* 8 Hidden Gems Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HIDDEN_SPOT_CARDS.map((spot) => (
            <a
              key={spot.slug}
              href={`/hidden-serendipity/${spot.slug}/`}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setSelectedSpot(spot);
              }}
              className="group bg-[#081b2b] rounded-2xl overflow-hidden border border-slate-700/60 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col cursor-pointer"
            >
              {/* Photo Frame */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081b2b] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  {spot.badge}
                </div>
              </div>

              {/* Text info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{spot.region}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-cyan-200/90 font-medium mt-1">
                    {spot.tagline}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 font-light line-clamp-3 leading-relaxed">
                    {spot.secret}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2 text-xs text-cyan-300">
                  <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                    <Eye aria-hidden="true" className="w-3.5 h-3.5" />
                    Preview guide
                  </span>
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Modal Detail for Selected Spot */}
        {selectedSpot && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="hidden-spot-preview-title" className="bg-[#091f30] rounded-3xl max-w-xl w-full border border-cyan-400/40 p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
              <button
                onClick={() => setSelectedSpot(null)}
                aria-label="Close preview"
                className="absolute top-3 right-3 z-20 min-w-[86px] h-11 px-3.5 rounded-full bg-slate-950/90 border-2 border-cyan-400/70 text-cyan-100 hover:text-white hover:bg-cyan-500/30 hover:border-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <span aria-hidden="true" className="text-lg leading-none font-bold">✕</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Close</span>
              </button>

              <div className="h-56 rounded-xl overflow-hidden mb-5 relative">
                <img
                  src={selectedSpot.image}
                  alt={selectedSpot.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs text-cyan-300 font-mono">
                  {selectedSpot.badge}
                </div>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                {selectedSpot.region}
              </span>
              <h3 id="hidden-spot-preview-title" className="text-2xl font-archivo font-extrabold text-white mt-1">
                {selectedSpot.name}
              </h3>
              <p className="text-sm font-serif italic text-cyan-200/90 mt-1">
                "{selectedSpot.tagline}"
              </p>

              <p className="text-sm text-slate-200 leading-relaxed font-light mt-3">
                {selectedSpot.secret}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`/hidden-serendipity/${selectedSpot.slug}/`}
                  className="flex-1 py-3 rounded-xl border border-cyan-500/50 text-cyan-100 hover:bg-cyan-950/60 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  Read full guide
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    const spot = selectedSpot;
                    setSelectedSpot(null);
                    onOpenBooking?.(spot.name);
                  }}
                  className="flex-1 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Include {selectedSpot.name} in My Trip
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Curvy Wave Boundary Flowing Directly Into The Footer */}
      <WaveDivider
        position="bottom"
        fill="#02070d"
        variant={1}
        heightClass="h-14 sm:h-20 lg:h-28"
      />
    </section>
  );
};
