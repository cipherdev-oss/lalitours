import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Car,
  ShieldCheck,
} from 'lucide-react';
import { StadiumTourPackage } from './ToursPage';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TourDetailModalProps {
  tour: StadiumTourPackage | null;
  allTours?: StadiumTourPackage[];
  onClose: () => void;
  onSelectTour?: (tour: StadiumTourPackage) => void;
  onBookTour: (inquiryNote: string) => void;
}

// 3 concise, essential highlights for each tour
const ESSENTIAL_HIGHLIGHTS: Record<string, string[]> = {
  'cultural-triangle-tour': [
    'Dawn climb of King Kashyapa’s 5th-century Sigiriya sky citadel',
    'Golden rock cave frescoes of Dambulla & royal Polonnaruwa ruins',
    'Temple of the Sacred Tooth Relic & botanical gardens in Kandy',
  ],
  'hill-country-tour': [
    'World-famous blue train voyage through mist-veiled tea ravines',
    'Iconic 1921 Nine Arch Bridge viaduct & Little Adam’s Peak gorge hike',
    'Single-origin Ceylon tea estate tour with hand-plucking & tasting',
  ],
  'southern-beach-tour': [
    'Blue whale ocean tracking catamaran off the Mirissa shelf',
    'Sunset stroll on 17th-century cobblestone Dutch ramparts in Galle Fort',
    'Secluded golden coves, turtle conservation & mangrove river safari',
  ],
  'wildlife-tour': [
    'Open-top 4x4 game drives tracking wild leopards in Yala National Park',
    'The great wild elephant gathering across ancient Minneriya reservoirs',
    'Feeding baby orphaned calves at Udawalawe Elephant Transit Home',
  ],
  'honeymoon-tour': [
    'Private candlelit seafood dinner on warm Indian Ocean sand',
    'Colonial tea planter’s bungalow retreat with crackling fireplace',
    'Champagne sunrise over Sigiriya rock and private sundowner safari',
  ],
  'family-tour': [
    'Feeding playful orphaned baby elephants at Udawalawe sanctuary',
    'Kids-favorite scenic mountain blue train over curved bridges',
    'Releasing baby sea turtles into calm, warm coastal waters at dusk',
  ],
  'adventure-tour': [
    'Grade 3/4 white-water river rafting through Kitulgala rain-forest',
    'Pre-dawn boulder scramble up Pidurangala for sunrise over Sigiriya',
    'Ella Rock ridge trek, Flying Ravana zipline & Weligama bay surfing',
  ],
  'custom-private-tour': [
    'Design your ideal mix of ancient UNESCO cities, tea hills & beaches',
    'Dedicated air-conditioned vehicle with personal chauffeur-guide',
    'Complete pacing freedom with spontaneous stops and schedule adjustments',
  ],
};

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  onClose,
  onBookTour,
}) => {
  // Keyboard listener: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  const highlights =
    ESSENTIAL_HIGHLIGHTS[tour.id] || [
      'Private air-conditioned chauffeur-guided journey across Sri Lanka',
      'Handcrafted daily route with flexible pacing and photo stops',
      'Scenic viewpoints, UNESCO landmarks, and local experiences',
    ];

  const whatsappUrl = `https://wa.me/94771234567?text=${encodeURIComponent(
    `Hello Lali Ceylon Tours! I am interested in the ${tour.title} (${tour.duration}). Could you share available dates and pricing?`
  )}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto overscroll-contain"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-t-[28px] rounded-b-2xl sm:rounded-3xl bg-[#071726] border border-cyan-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-slate-100 overflow-hidden sm:my-auto"
      >
        {/* Mobile Pull Indicator */}
        <div className="w-10 h-1 rounded-full bg-white/20 sm:hidden mx-auto mt-2 shrink-0" />

        {/* Top Image Window (Responsive Height: 38% shorter on mobile to ensure all content fits comfortably) */}
        <div className="relative w-full h-36 sm:h-48 shrink-0 overflow-hidden bg-slate-900 mt-1 sm:mt-0">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            onError={(e) => {
              e.currentTarget.src = tour.fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071726] via-[#071726]/50 to-transparent" />

          {/* Close Button with generous touch target on mobile */}
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-slate-950/75 border border-white/20 text-slate-200 hover:text-white active:scale-90 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Clean Unboxed Metadata & Title */}
          <div className="absolute bottom-2.5 left-4 right-4 sm:bottom-3 sm:left-5 sm:right-5 z-10">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] text-cyan-300 font-medium tracking-wide">
              <span>{tour.duration}</span>
              <span aria-hidden="true" className="text-cyan-400/50">·</span>
              <span>{tour.pax}</span>
              <span aria-hidden="true" className="text-cyan-400/50">·</span>
              <span className="text-amber-300 font-semibold">Private Chauffeur</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif text-white font-bold tracking-tight mt-0.5 leading-snug">
              {tour.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Essential Content Body on Mobile / Compact view on Desktop */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          {/* Route Trail (Multi-line wrap support on mobile so long routes don't get truncated into obscurity) */}
          <div className="flex items-start sm:items-center gap-2 text-[11px] sm:text-xs text-slate-300 bg-slate-900/80 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-cyan-500/20">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-medium text-cyan-100 leading-snug line-clamp-2 sm:line-clamp-1">
              {tour.route}
            </span>
          </div>

          {/* 3 Core Highlights (Bite-sized, readable on mobile screens) */}
          <div className="space-y-2 pt-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
              Key Experiences
            </span>
            <div className="space-y-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Inclusions - 3 Quiet Trust Points */}
          <div className="pt-2.5 border-t border-white/10 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/50 border border-white/5">
              <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] text-slate-300 block font-medium leading-tight">
                Private AC Car
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/50 border border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] text-slate-300 block font-medium leading-tight">
                Expressway & Fuel
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/50 border border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] text-slate-300 block font-medium leading-tight">
                Flexible Pacing
              </span>
            </div>
          </div>

          {/* Action Row: 44px+ touch targets on mobile for effortless thumb tap */}
          <div className="pt-1 sm:pt-2 flex items-center gap-2 sm:gap-2.5">
            {/* WhatsApp Direct Chat */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              title="Chat directly on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onBookTour(`Inquiry for ${tour.title} (${tour.duration} · ${tour.pax})`)}
              className="min-h-[44px] flex-1 py-2.5 px-4 sm:px-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 active:from-cyan-500 active:to-sky-500 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-[0.98]"
            >
              <span>Book This Tour</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
