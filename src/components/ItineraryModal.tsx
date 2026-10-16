import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { destinations as defaultDestinations } from '../data/destinations';
import { Destination } from '../types';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: Destination | string | null;
  destinations?: Destination[];
  prefillDestination?: string;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  isOpen,
  onClose,
  destination,
  destinations = defaultDestinations,
  prefillDestination = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [selectedDest, setSelectedDest] = useState('All of Sri Lanka');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillDestination) {
      setSelectedDest(prefillDestination);
    } else if (destination) {
      if (typeof destination === 'string') {
        setSelectedDest(destination);
      } else if (destination && 'name' in destination) {
        setSelectedDest(destination.name);
      }
    }
  }, [prefillDestination, destination]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-xl rounded-3xl bg-[#081826]/95 border border-cyan-500/25 shadow-2xl p-6 sm:p-10 my-auto text-slate-100 backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cyan-500/20 pb-6 mb-6">
          <div>
            <span className="text-[10px] font-light tracking-[0.3em] uppercase text-cyan-400 block mb-1">
              Curated Sri Lankan Expedition
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-white tracking-wide">
              Plan Your Journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <h4 className="font-serif-display text-2xl text-cyan-200 font-normal">
              Your Expedition Inquiry is Received
            </h4>
            <p className="text-sm text-cyan-100/80 font-light max-w-md mx-auto leading-relaxed">
              Our bespoke Sri Lankan travel concierge will tailor an itinerary crafted around your preferences and contact you shortly at <span className="text-white font-medium">{email || 'your email'}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 px-8 py-2.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-semibold tracking-widest uppercase hover:bg-cyan-300 transition-all cursor-pointer shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white placeholder-slate-500 outline-none focus:border-cyan-400/80 transition-colors"
                />
              </div>

              <div>
                <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white placeholder-slate-500 outline-none focus:border-cyan-400/80 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                  Destination Focus
                </label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white outline-none focus:border-cyan-400/80 transition-colors"
                >
                  <option value="All of Sri Lanka">Full Island Exploration</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                  Travel Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. October 2026 (10 Days)"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white placeholder-slate-500 outline-none focus:border-cyan-400/80 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                Party Size
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white outline-none focus:border-cyan-400/80 transition-colors"
              >
                <option value="Solo Traveler">Solo Traveler</option>
                <option value="2 Guests">2 Guests (Couple / Friends)</option>
                <option value="Family (3-5 Guests)">Family (3-5 Guests)</option>
                <option value="Private Group (6+ Guests)">Private Group (6+ Guests)</option>
              </select>
            </div>

            <div>
              <label className="block text-cyan-200/70 tracking-wider uppercase mb-1.5 text-[10px]">
                Special Desires or Preferred Experiences
              </label>
              <textarea
                rows={3}
                placeholder="Share your interests (e.g. Private tea estate bungalows, wildlife safari, coastal wellness, ancient architecture)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-white placeholder-slate-500 outline-none focus:border-cyan-400/80 transition-colors resize-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-[11px] text-cyan-100/60 font-light">
                Tailored journeys with private chauffeurs & boutique retreats.
              </span>
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-cyan-400 text-slate-950 font-semibold text-xs tracking-widest uppercase hover:bg-cyan-300 transition-all cursor-pointer shadow-lg"
              >
                Send Request
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
