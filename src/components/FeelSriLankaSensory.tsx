import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface SensoryItem {
  title: string;
  desc: string;
  image: string;
}

interface SensorySense {
  id: string;
  label: string;
  icon: string;
  leadWord: string;
  color: string;
  items: SensoryItem[];
}

const SENSES: SensorySense[] = [
  {
    id: 'see',
    label: 'SEE',
    icon: '🌊',
    leadWord: 'Visual Poetry',
    color: 'from-cyan-500 to-blue-500',
    items: [
      {
        title: 'Turquoise Oceans',
        desc: 'Crystalline waters peeling onto untouched golden sands where the Indian Ocean meets palm-fringed coastlines.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Emerald Mountains',
        desc: 'Endless rolling tea estates blanketed in morning mist, punctuated by tumbling silver waterfalls.',
        image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Golden Sunsets',
        desc: 'Violet, peach, and liquid gold skies silhouetting leaning coconut palms along deserted beaches.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'smell',
    label: 'SMELL',
    icon: '🌿',
    leadWord: 'Aromas of Ceylon',
    color: 'from-cyan-500 to-blue-500',
    items: [
      {
        title: 'Fresh Ceylon Tea',
        desc: 'The crisp, sweet fragrance of newly picked mountain buds wafting from high-altitude artisan drying lofts.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Ancient Spices',
        desc: 'Warm crushed true Ceylon cinnamon quills, fragrant cardamoms, and sun-dried black peppercorns.',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Rain-Soaked Jungle',
        desc: 'Petrichor rising from ancient forest loam as monsoon downpours cleanse tropical rainforest canopies.',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'taste',
    label: 'TASTE',
    icon: '🍛',
    leadWord: 'Culinary Fire',
    color: 'from-amber-500 to-orange-500',
    items: [
      {
        title: 'Clay-Pot Rice & Curry',
        desc: 'A vibrant spread of creamy coconut dhal, fiery pol sambol, beetroot curry, and fragrant heirloom red rice.',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Fresh Hoppers & Sambol',
        desc: 'Crispy bowl-shaped coconut-crepe edges giving way to a soft, steamed center with seeni sambol sweetness.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Sweet King Coconut',
        desc: 'The golden Thambili nut freshly sliced open, delivering electrolyte-rich sweet tropical water in the midday heat.',
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'hear',
    label: 'HEAR',
    icon: '🥁',
    leadWord: 'Soundscapes',
    color: 'from-blue-500 to-indigo-500',
    items: [
      {
        title: 'Indian Ocean Swell',
        desc: 'The thunderous, calming rhythm of deep ocean rollers breaking on reefs under a canopy of southern stars.',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Sacred Temple Bells',
        desc: 'The resonance of bronze bells and chanted pirith blessing ancient stone temples at dusk.',
        image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Traditional Drums (Geta Beraya)',
        desc: 'The hypnotic polyrhythms of ceremonial drums and whip-crackers echoing through festival nights.',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export const FeelSriLankaSensory: React.FC = () => {
  const [activeSense, setActiveSense] = useState<string>('see');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNodeRef.current = gain;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const stopAmbientSound = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  const currentSense = SENSES.find((s) => s.id === activeSense) || SENSES[0];

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <section id="feel-srilanka" className="w-full py-20 sm:py-28 bg-[#040c14] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            An Emotional Immersion
          </div>
          <h2 className="text-3xl sm:text-5xl font-archivo font-extrabold tracking-tight text-white">
            Feel Sri Lanka
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Before you pack your bags, let the island stir your senses. Look, smell, taste, and listen.
          </p>

          {/* Sensory Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {SENSES.map((sense) => {
              const isActive = activeSense === sense.id;
              return (
                <button
                  key={sense.id}
                  onClick={() => setActiveSense(sense.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/25 scale-105'
                      : 'bg-[#0d1e2e] text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span className="text-base">{sense.icon}</span>
                  <span>{sense.label}</span>
                </button>
              );
            })}

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleAmbientSound}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-pulse'
                  : 'bg-[#0d1e2e] border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
              title="Play ambient Sri Lankan ocean & temple atmosphere"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-sky-300" />
                  <span>Ambient Audio Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Listen to Island Ambience</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Sensory Showcase Cards for Active Sense */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {currentSense.items.map((item, idx) => (
            <div
              key={item.title + idx}
              className="group bg-[#091826] rounded-3xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091826] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                  {currentSense.icon} {currentSense.label} 0{idx + 1}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-archivo font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 mt-2.5 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400/80">
                  <span className="font-mono text-[11px] tracking-wider uppercase">
                    {currentSense.leadWord}
                  </span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
