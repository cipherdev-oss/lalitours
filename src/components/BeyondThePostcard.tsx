import React, { useState } from 'react';
import { WaveDivider } from './WaveDivider';
import { Compass, ArrowRight, Eye, Sparkles, MapPin } from 'lucide-react';

interface HiddenSpot {
  name: string;
  region: string;
  secret: string;
  tagline: string;
  image: string;
  badge: string;
}

const HIDDEN_SPOTS: HiddenSpot[] = [
  {
    name: 'Jaffna & Islands',
    region: 'Far North',
    secret: 'Towering saffron Hindu gopurams, quiet lagoons, and ancient palmyrah forests where tourists are rare and hospitality is legendary.',
    tagline: 'The vibrant Tamil cultural kingdom of the north.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    badge: 'Cultural Frontier',
  },
  {
    name: 'Knuckles Mountain Range',
    region: 'Central Massif',
    secret: 'Rugged mist-veiled peaks shaped like clenched fists. Cloud forests home to rare orchids, secret river pools, and isolated cardamom farming hamlets.',
    tagline: 'Untamed hiking with zero crowds.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    badge: 'Trekker Sanctuary',
  },
  {
    name: 'Kalpitiya Peninsula',
    region: 'Northwest Shore',
    secret: 'A narrow finger of land bordered by a massive flat-water lagoon and the ocean, hosting dolphin mega-pods and world-class kiteboarding winds.',
    tagline: 'Dolphins, sandbars, and howling kite winds.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    badge: 'Kite & Marine Haven',
  },
  {
    name: 'Nilaveli & Pigeon Island',
    region: 'Eastern Coastline',
    secret: 'Powdery bone-white beaches meeting aquamarine waters where blacktip reef sharks and sea turtles glide through protected coral gardens.',
    tagline: 'Untouched eastern marine paradise.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Coral Sanctuary',
  },
  {
    name: 'Hiriketiya Horseshoe Bay',
    region: 'Deep South',
    secret: 'A lush jungle-wrapped crescent cove with gentle peeling waves, wooden treehouse smoothie shacks, and sun-dappled yoga lofts.',
    tagline: 'The bohemian ocean hideaway.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    badge: 'Boho Surf Cove',
  },
  {
    name: 'Riverston & The Gap',
    region: 'Matale Highlands',
    secret: 'Known as the windy gap where sudden cliff drops reveal panoramic cloud valleys, miniature Worlds End viewpoints, and rushing waterfalls.',
    tagline: 'High-altitude ridges kissed by clouds.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
    badge: 'Highland Secret',
  },
  {
    name: 'Gal Oya National Park',
    region: 'Eastern Interior',
    secret: 'Sri Lanka’s only boat safari park. Watch wild elephants swim between lush forested islands across the vast Senanayake Samudra reservoir.',
    tagline: 'Swimming elephants on inland seas.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
    badge: 'Boat Safaris',
  },
  {
    name: 'Delft Island (Neduntheevu)',
    region: 'Palk Strait',
    secret: 'A windswept island of wild Portuguese ponies descended from 17th-century horses, ancient baobab trees, and fences built entirely of bleached coral rock.',
    tagline: 'Coral fences and wild horses.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    badge: 'Living Time Capsule',
  },
];

interface BeyondThePostcardProps {
  onOpenBooking?: (spotName?: string) => void;
}

export const BeyondThePostcard: React.FC<BeyondThePostcardProps> = ({ onOpenBooking }) => {
  const [selectedSpot, setSelectedSpot] = useState<HiddenSpot | null>(null);

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
          {HIDDEN_SPOTS.map((spot) => (
            <div
              key={spot.name}
              onClick={() => setSelectedSpot(spot)}
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

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-cyan-400">
                  <span className="font-semibold text-[11px] uppercase tracking-wider">
                    Uncover Secret
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail for Selected Spot */}
        {selectedSpot && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#091f30] rounded-3xl max-w-xl w-full border border-cyan-400/40 p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm bg-black/40 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
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
              <h3 className="text-2xl font-archivo font-extrabold text-white mt-1">
                {selectedSpot.name}
              </h3>
              <p className="text-sm font-serif italic text-cyan-200/90 mt-1">
                "{selectedSpot.tagline}"
              </p>

              <p className="text-sm text-slate-200 leading-relaxed font-light mt-3">
                {selectedSpot.secret}
              </p>

              <div className="mt-6 flex gap-3">
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
