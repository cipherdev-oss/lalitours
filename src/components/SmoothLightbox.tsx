import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '../types';

interface SmoothLightboxProps {
  isOpen: boolean;
  destination: Destination | null;
  initialIndex?: number;
  onClose: () => void;
  destinations?: Destination[];
  onSelectDestination?: (dest: Destination) => void;
}

export const SmoothLightbox: React.FC<SmoothLightboxProps> = ({
  isOpen,
  destination,
  onClose,
  destinations = [],
  onSelectDestination,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && destinations.length > 0 && destination && onSelectDestination) {
        const curIdx = destinations.findIndex((d) => d.id === destination.id);
        const nextIdx = (curIdx + 1) % destinations.length;
        onSelectDestination(destinations[nextIdx]);
      }
      if (e.key === 'ArrowLeft' && destinations.length > 0 && destination && onSelectDestination) {
        const curIdx = destinations.findIndex((d) => d.id === destination.id);
        const prevIdx = (curIdx - 1 + destinations.length) % destinations.length;
        onSelectDestination(destinations[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, destination, destinations, onSelectDestination, onClose]);

  if (!isOpen || !destination) return null;

  const curIdx = destinations.findIndex((d) => d.id === destination.id);
  const safeIdx = curIdx === -1 ? 0 : curIdx;

  const handleNext = () => {
    if (!onSelectDestination || destinations.length === 0) return;
    const nextIdx = (safeIdx + 1) % destinations.length;
    onSelectDestination(destinations[nextIdx]);
  };

  const handlePrev = () => {
    if (!onSelectDestination || destinations.length === 0) return;
    const prevIdx = (safeIdx - 1 + destinations.length) % destinations.length;
    onSelectDestination(destinations[prevIdx]);
  };

  return (
    <AnimatePresence>
      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none"
      >
        {/* Minimal Top Header */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-sm uppercase tracking-widest text-white font-medium">
              Sri Lanka
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-cyan-400 font-light tracking-wider">
              {destination.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="relative flex-1 flex items-center justify-center my-4">
          {/* Previous image arrow */}
          {destinations.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer shadow-lg backdrop-blur-md"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Fullscreen Photo */}
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="max-h-[75vh] max-w-[90vw] rounded-2xl overflow-hidden shadow-2xl border border-white/20 ring-4 ring-white/10"
            onClick={handleNext}
          >
            <img
              src={destination.heroImage}
              alt={destination.name}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain cursor-pointer"
            />
          </motion.div>

          {/* Next image arrow */}
          {destinations.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer shadow-lg backdrop-blur-md"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Minimal Bottom Caption */}
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm font-light text-white italic">
            "{destination.slogan}"
          </p>
          <p className="text-[11px] uppercase tracking-widest text-white/50 mt-1 font-light">
            {destination.region} • Tap image or press arrow keys to view next
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
