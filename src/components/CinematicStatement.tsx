import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const WORDS = [
  { text: 'BEACHES', color: 'from-cyan-400 to-blue-500', desc: '1,340 km of sun-drenched Indian Ocean coastline.' },
  { text: 'MOUNTAINS', color: 'from-sky-400 to-cyan-500', desc: 'Misty tea terraces rising above 2,500 meters.' },
  { text: 'WILDLIFE', color: 'from-amber-400 to-orange-500', desc: 'Leopards, blue whales, and roaming elephant herds.' },
  { text: 'HISTORY', color: 'from-yellow-400 to-amber-500', desc: '2,500 years of documented royal kingdoms.' },
  { text: 'FOOD', color: 'from-orange-400 to-rose-500', desc: 'Explosive clay-pot curries and fresh coastal crab.' },
  { text: 'CULTURE', color: 'from-rose-400 to-pink-500', desc: 'Hypnotic fire dancers and sacred temple bells.' },
  { text: 'ADVENTURE', color: 'from-teal-400 to-cyan-500', desc: 'World-class surf point breaks and cloud forest hikes.' },
];

export const CinematicStatement: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeWord = WORDS[activeWordIndex];

  return (
    <section className="w-full bg-[#02070d] text-white py-24 sm:py-36 relative overflow-hidden flex items-center justify-center">
      {/* Deep starry/ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(#1e3a5f 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a1826] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-widest uppercase mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          The Serendipity Paradox
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-archivo font-black tracking-tight text-slate-100 uppercase leading-none">
          ONE ISLAND.
        </h2>
        <h3 className="text-3xl sm:text-5xl lg:text-7xl font-archivo font-black tracking-tight text-white uppercase mt-2 sm:mt-4 leading-none">
          ENDLESS EXPERIENCES.
        </h3>

        {/* Dynamic Animated Word Spotlight */}
        <div className="my-10 sm:my-14 h-20 sm:h-28 flex flex-col items-center justify-center">
          <div
            key={activeWord.text}
            className={`text-4xl sm:text-6xl lg:text-7xl font-archivo font-black tracking-wider uppercase bg-gradient-to-r ${activeWord.color} bg-clip-text text-transparent animate-fadeIn`}
          >
            {activeWord.text}.
          </div>
          <p className="text-xs sm:text-base text-slate-300 font-light mt-2 max-w-md mx-auto">
            {activeWord.desc}
          </p>
        </div>

        {/* The Punchline */}
        <div className="max-w-2xl mx-auto mt-6 pt-6 border-t border-slate-800">
          <p className="text-lg sm:text-2xl font-serif italic text-slate-200 leading-relaxed">
            "And somehow, they're all within a few hours of each other."
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-2">
            No endless domestic flights. Surf at sunrise, lunch among misty tea plantations, and witness wild leopards before sunset.
          </p>
        </div>

        {/* Interactive Word Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {WORDS.map((w, idx) => (
            <button
              key={w.text}
              onClick={() => setActiveWordIndex(idx)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                activeWordIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold scale-105'
                  : 'bg-[#0a1826] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {w.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
