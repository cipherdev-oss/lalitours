import React, { useState } from 'react';
import { Compass, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Destination } from '../types';

interface FindYourSriLankaProps {
  onSelectDestination?: (dest: Destination) => void;
  onOpenBooking?: (dest?: Destination) => void;
}

interface Persona {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  quote: string;
  image: string;
  vibe: string;
  destinations: {
    name: string;
    region: string;
    highlight: string;
    image: string;
    tags: string[];
  }[];
}

const PERSONAS: Persona[] = [
  {
    id: 'explorer',
    badge: '🌊',
    title: 'The Explorer',
    tagline: 'Surf. Dive. Discover hidden beaches.',
    quote: 'Wake up to the roar of Indian Ocean barrels, leap from cliffs into emerald pools, and paddle alongside green turtles.',
    vibe: 'Sun-drenched, saltwater-crusted, untamed adventure.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    destinations: [
      {
        name: 'Arugam Bay',
        region: 'East Coast',
        highlight: 'World-class point breaks, chilled surf shacks, and wild lagoon safaris.',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
        tags: ['Point Break Surfing', 'Tuk-Tuk Safaris', 'Lagoon Sunset'],
      },
      {
        name: 'Kalpitiya Peninsula',
        region: 'Northwest Coast',
        highlight: 'Flat-water kite lagoons, dolphin super-pods, and remote sandbars.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tags: ['Kitesurfing', 'Dolphin Watching', 'Bar Reef Diving'],
      },
      {
        name: 'Hiriketiya Horseshoe Bay',
        region: 'South Coast',
        highlight: 'A turquoise jungle-fringed cove with peeling waves and barefoot smoothie shacks.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        tags: ['Crescent Bay', 'Beginner to Pro Waves', 'Jungle Cafés'],
      },
    ],
  },
  {
    id: 'wild_soul',
    badge: '🌿',
    title: 'The Wild Soul',
    tagline: 'Elephants. Leopards. Jungles. Safaris.',
    quote: 'Hear the deep rumble of an elephant herd crossing misty grasslands and lock eyes with a solitary leopard resting on a sun-warmed granite boulder.',
    vibe: 'Raw biodiversity, untamed wilderness, sensory awe.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    destinations: [
      {
        name: 'Yala National Park',
        region: 'Southern Province',
        highlight: 'The highest concentration of leopards on planet Earth amidst coastal scrubland.',
        image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
        tags: ['Panthera Pardus Kotiya', 'Sloth Bears', 'Open Jeep Safari'],
      },
      {
        name: 'Minneriya & Kaudulla',
        region: 'Cultural Triangle',
        highlight: 'The Great Elephant Gathering — hundreds of wild gentle giants congregating at twilight.',
        image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
        tags: ['The Gathering', '300+ Elephants', 'Ancient Tank Reservoirs'],
      },
      {
        name: 'Sinharaja Rainforest',
        region: 'Sabaragamuwa',
        highlight: 'UNESCO biosphere of prehistoric towering canopy, glowing flora, and rare endemic birds.',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        tags: ['Virgin Jungle Trek', 'Endemic Species', 'Crystal Streams'],
      },
    ],
  },
  {
    id: 'mountain_dreamer',
    badge: '🏔️',
    title: 'The Mountain Dreamer',
    tagline: 'Tea country. Misty mountains. Scenic trains.',
    quote: 'Lean from an open blue train door as it curves over stone viaducts through velvet emerald hills, enveloped in eucalyptus mist.',
    vibe: 'Cool highland air, rhythmic rail journeys, endless green horizons.',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80',
    destinations: [
      {
        name: 'Ella & Nine Arch Bridge',
        region: 'Central Highlands',
        highlight: 'Iconic colonial masonry bridge rising through lush forest, tea trails, and ridge-top viewpoints.',
        image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
        tags: ['Nine Arch Bridge', 'Little Adams Peak', 'Ravana Falls'],
      },
      {
        name: 'Nuwara Eliya (Little England)',
        region: 'Tea Country',
        highlight: 'Misty plateau of Tudor estates, rose gardens, cascading waterfalls, and world-renowned Ceylon tea.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Tea Plucking', 'Single Estate Tastings', 'Gregory Lake'],
      },
      {
        name: 'Knuckles Mountain Range',
        region: 'Matale / Kandy',
        highlight: 'Rugged jagged knuckles shaped peaks, cascading cloud valleys, and isolated cardamom villages.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        tags: ['Cloud Forest Trek', 'Mini Worlds End', 'Zero Tourists'],
      },
    ],
  },
  {
    id: 'history_seeker',
    badge: '🏛️',
    title: 'The History Seeker',
    tagline: 'Ancient cities. Temples. Fortresses.',
    quote: 'Ascend colossal granite citadels into the clouds and walk sacred moonstones beneath ancient Bodhi trees older than empires.',
    vibe: 'Mystical ruins, 2,500 years of documented chronicles, sacred serenity.',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80',
    destinations: [
      {
        name: 'Sigiriya Rock Fortress',
        region: 'Matale District',
        highlight: 'King Kashyapas 5th-century palace atop a 200m sheer monolith, mirror walls, and ancient water gardens.',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
        tags: ['8th Wonder', 'Lions Paw Gateway', 'Ancient Frescoes'],
      },
      {
        name: 'Anuradhapura Sacred Realm',
        region: 'North Central',
        highlight: 'Towering white stupas that rival Giza, sacred ponds, and the oldest living recorded tree on Earth.',
        image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=80',
        tags: ['Jaya Sri Maha Bodhi', 'Ruwanwelisaya', 'Ancient Engineering'],
      },
      {
        name: 'Galle Dutch Fort',
        region: 'Southern Coast',
        highlight: 'Living 17th-century UNESCO sea fortress with cobbled alleys, spice boutiques, and lighthouse sunsets.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Rampart Walk', 'Colonial Mansions', 'Ocean Sunset'],
      },
    ],
  },
  {
    id: 'romantic',
    badge: '❤️',
    title: 'The Romantic',
    tagline: 'Sunsets. Boutique stays. Private escapes.',
    quote: 'Private infinity pools suspended over tea plantations, candlelit seafood dinners under swaying palm canopies, and secluded ocean coves.',
    vibe: 'Intimate, cinematic luxury, unforgettable sunsets.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    destinations: [
      {
        name: 'Mirissa & Coconut Tree Hill',
        region: 'Southern Coast',
        highlight: 'Sunsets glowing over a solitary palm-crowned cliff and luxury private catamaran cruises.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tags: ['Coconut Tree Hill', 'Whale Catamarans', 'Sunset Dinners'],
      },
      {
        name: 'Tangalle Silent Beaches',
        region: 'Deep South',
        highlight: 'Kilometers of deserted golden shores lined with wild coconut palms and ultra-luxury cliffside retreats.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        tags: ['Goyambokka Bay', 'Turtle Hatcheries', 'Private Hideaways'],
      },
      {
        name: 'Hatton Tea Bungalows',
        region: 'Highlands',
        highlight: 'Restored colonial planter bungalows with roaring fireplaces, butler service, and private croquet lawns.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Relais & Châteaux', 'Castlereagh Lake', 'Private Seaplane'],
      },
    ],
  },
];

export const FindYourSriLanka: React.FC<FindYourSriLankaProps> = ({
  onOpenBooking,
}) => {
  const [selectedId, setSelectedId] = useState<string>('explorer');
  const activePersona = PERSONAS.find((p) => p.id === selectedId) || PERSONAS[0];

  return (
    <section
      id="find-your-srilanka"
      className="w-full relative pt-24 pb-24 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44 bg-gradient-to-b from-[#dff0fb] via-[#ebf6fd] to-[#d8ecf8] text-slate-900 overflow-hidden"
    >
      {/* Top Wavy Breakdown Transition (Flows from previous About Us section white) */}
      <div className="w-full overflow-hidden leading-none absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-28 text-white"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,40 C1140,110 820,10 540,80 C320,135 120,30 0,60 Z" />
        </svg>
      </div>

      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300/80 text-sky-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            Curated For Your Travel Style
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-[#082238]">
            What kind of Sri Lanka are you looking for?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Every traveler experiences a different island. Choose your travel spirit to instantly reveal the places made for you.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12">
          {PERSONAS.map((persona) => {
            const isSelected = persona.id === selectedId;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedId(persona.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-600/30 scale-105 border border-sky-500'
                    : 'bg-white hover:bg-sky-50/90 text-slate-700 border border-sky-200/90 hover:border-sky-400 shadow-sm hover:text-sky-900'
                }`}
              >
                <span className="text-base">{persona.badge}</span>
                <span>{persona.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Persona Banner & Editorial Story */}
        <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 bg-white/95 shadow-xl shadow-sky-950/5 p-6 sm:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Inspiring Editorial */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePersona.badge}</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-archivo font-extrabold text-slate-900">
                    {activePersona.title}
                  </h3>
                  <p className="text-sky-700 text-xs sm:text-sm font-semibold tracking-wide">
                    {activePersona.tagline}
                  </p>
                </div>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-700 italic font-serif leading-relaxed border-l-4 border-sky-500 pl-4 py-1">
                "{activePersona.quote}"
              </blockquote>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 bg-sky-50 px-3 py-1.5 rounded-md border border-sky-200">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <strong className="text-slate-900">Vibe:</strong> {activePersona.vibe}
                </span>

                <button
                  onClick={() => onOpenBooking?.()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-sky-600/20 cursor-pointer"
                >
                  Plan this persona escape <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Featured Atmosphere Photo */}
            <div className="lg:col-span-5 h-56 sm:h-72 rounded-2xl overflow-hidden relative shadow-lg group border border-sky-100">
              <img
                src={activePersona.image}
                alt={activePersona.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-widest text-cyan-300 uppercase font-semibold">
                  Curated Itinerary Focus
                </span>
                <p className="text-sm font-medium text-white">
                  Hand-crafted route tailored for {activePersona.title}s
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Matched Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePersona.destinations.map((dest, i) => (
            <div
              key={dest.name + i}
              className="group bg-white rounded-2xl overflow-hidden border border-sky-200/80 hover:border-sky-500/70 transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-sky-950/5 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-sky-200 border border-sky-400/30">
                  {dest.region}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-sky-700 font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    <span>{dest.region}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {dest.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sky-100 flex flex-wrap gap-1.5">
                  {dest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wavy Breakdown Transition (Flows into next dark section #07111a) */}
      <div className="w-full overflow-hidden leading-none absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-28 text-[#07111a]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L1440,120 L1440,80 C1160,10 840,110 560,40 C340,-15 140,90 0,60 Z" />
        </svg>
      </div>
    </section>
  );
};
