import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Crown, Flame, Sun, Hammer, Users } from 'lucide-react';

interface CulturePillar {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  icon: any;
  image: string;
  liveExperience: string;
}

const CULTURE_PILLARS: CulturePillar[] = [
  {
    id: 'kingdoms',
    title: 'Ancient Kingdoms',
    subtitle: '2,500 Years of Documented Dynasties',
    tagline: 'Hydraulic marvels, sky palaces, and colossal stone stupas.',
    description: 'Walk through Anuradhapura, Polonnaruwa, and Sigiriya — ancient capitals that flourished when Rome was still in its infancy. Sri Lanka’s ancient hydraulic engineers constructed artificial inland seas (wewas) so vast they have wave tides.',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    liveExperience: 'Cycling through moonlit brick stupas as temple frangipani blossoms fall onto ancient stone paths.',
  },
  {
    id: 'spirituality',
    title: 'Temples & Spirituality',
    subtitle: 'The Reverent Living Heart of Theravada',
    tagline: 'Sacred Bodhi trees, butter-lamp twilight, and chanted pirith.',
    description: 'Witness the serene reverence at the Sri Dalada Maligawa (Temple of the Sacred Tooth Relic) in Kandy and the Jaya Sri Maha Bodhi — the southern branch of the original tree under which the Buddha attained enlightenment, tended continuously for 23 centuries.',
    icon: Sun,
    image: '/img/kandy.webp',
    liveExperience: 'Participating in the evening pooja offering fragrant white lotus buds amid the resonance of silver conch shells.',
  },
  {
    id: 'dance',
    title: 'Traditional Dance & Drums',
    subtitle: 'The Thunder of Geta Beraya & Fire Acrobatics',
    tagline: 'Acrobatic leaps, silver headdresses, and hypnotic drum pulses.',
    description: 'Originating in ancient rituals to appease island spirits, Kandyan dance combines extraordinary athletic somersaults, shimmering silver castanets, and the complex polyrhythms of the double-ended Geta Beraya drum.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
    liveExperience: 'Watching dancers perform barefoot over red-hot coconut embers with unflinching grace.',
  },
  {
    id: 'festivals',
    title: 'Festivals of Fire & Wonder',
    subtitle: 'The Grand Kandy Esala Perahera',
    tagline: 'A nocturnal spectacle of a thousand whip-crackers, fire-jugglers, and regal tuskers.',
    description: 'During the full moon of Esala (July/August), Kandy erupts into one of Asia’s most extravagant historical pageants: whip crackers clearing the road, hundreds of fire-dancers, and richly caparisoned tuskers bearing the golden casket.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    liveExperience: 'Feeling the heat of flaming torches and the ground tremble to the beat of 500 ceremonial drummers.',
  },
  {
    id: 'handcrafts',
    title: 'Master Handcrafts',
    subtitle: 'Ceylon Sapphires, Masks & Batiks',
    tagline: 'Hand-carved demon masks, wax-resist silks, and ratnapura gems.',
    description: 'Watch master craftsmen in Ambalangoda carve vibrant Kaduru wood Raksha masks believed to ward off misfortune. In Ratnapura (The City of Gems), miners unearth royal cornflower blue Ceylon sapphires that have adorned royal crowns worldwide.',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
    liveExperience: 'Carving and painting your own miniature traditional protection mask with natural vegetable dyes.',
  },
  {
    id: 'village_life',
    title: 'Warm Village Life',
    subtitle: 'The Generous Smile of "Ayubowan"',
    tagline: 'Open courtyards, sweet milk tea, and boundless island kindness.',
    description: 'Sri Lankan hospitality is a genuine cultural art. Enter rural Chena farming hamlets where elders greet you with palms pressed together and the blessing of "Ayubowan" (May you live long), sharing wood-fired jaggery treats and sweet king coconut.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80',
    liveExperience: 'Sharing a fresh banana-leaf lunch cooked inside a rural clay kitchen with an extended local family.',
  },
];

export const LivingCulture: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>('kingdoms');
  const current = CULTURE_PILLARS.find((p) => p.id === activePillar) || CULTURE_PILLARS[0];

  return (
    <section id="culture-section" className="w-full py-20 sm:py-28 bg-gradient-to-b from-[#dff0fb] via-[#ebf6fd] to-[#d8ecf8] text-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-sky-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            Living Identity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-[#082238] uppercase">
            Living Culture, Not a Museum
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            In Sri Lanka, history is not preserved in glass cabinets. It breathes in nightly temple bells, acrobatic fire rituals, and genuine village smiles.
          </p>
        </div>

        {/* Culture Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {CULTURE_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillar;
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/30 scale-105'
                    : 'bg-white hover:bg-sky-50 text-slate-700 border border-sky-200/90 shadow-sm hover:border-sky-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Spotlight Showcase */}
        <div className="bg-white/95 rounded-3xl overflow-hidden border border-sky-200/90 shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Atmospheric Photograph */}
            <div className="lg:col-span-6 h-72 sm:h-96 rounded-2xl overflow-hidden relative shadow-xl group border border-sky-100">
              <img
                src={current.image}
                alt={current.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-75" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-semibold">
                  Cultural Realm
                </span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {current.subtitle}
                </h4>
              </div>
            </div>

            {/* Right: Narrative Context */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold">
                  Living Tradition
                </span>
                <h3 className="text-2xl sm:text-3xl font-archivo font-extrabold text-slate-900 mt-1">
                  {current.title}
                </h3>
                <p className="text-sm font-serif italic text-sky-900 mt-1">
                  "{current.tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Live Experience Callout */}
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-xs text-slate-700 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">How Foreigners Experience This:</strong>
                  <span>{current.liveExperience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
