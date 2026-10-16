import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles, Crown } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

interface ExperienceSlide {
  id: string;
  num: string;
  tagline: string;
  location: string;
  category: string;
  subtext: string;
  description: string;
  liveExperience: string;
  image: string;
}

const ISLAND_CHAPTERS: ExperienceSlide[] = [
  {
    id: 'chp-1',
    num: '01',
    tagline: 'CHASE THE WAVES & COASTAL LIVING',
    location: 'Arugam Bay & Weligama',
    category: 'Coast & Surf Culture',
    subtext: 'World-class point breaks. Laid-back surf lifestyle.',
    description: 'A crescent of golden sand where Indian Ocean swells peel endlessly along pristine right-hand reef points. Dawn patrol sessions, barefoot beachfront cafes, stilt fishermen at sunrise, and unforgettable golden hours.',
    liveExperience: 'Catching sunrise glass waves with local surf coaches and dining barefoot on fresh catch grilled over coconut husk fires.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-2',
    num: '02',
    tagline: 'RIDE INTO THE CLOUDS & TEA HERITAGE',
    location: 'Ella & Nuwara Eliya',
    category: 'Highlands & Ceylon Tea',
    subtext: "One of the world's most unforgettable train journeys.",
    description: 'Hang out of the iconic blue carriage doorway as the train glides over colonial stone viaducts, piercing through rolling cloud forests, mountain tea slopes, and plunging valleys tended by generations of master tea pluckers.',
    liveExperience: 'Stepping off at 1,900m altitude to taste hand-plucked Single Estate Ceylon Orange Pekoe beside a crackling colonial stone fireplace.',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-3',
    num: '03',
    tagline: 'ANCIENT KINGDOMS & SKY CITADELS',
    location: 'Sigiriya & Anuradhapura',
    category: 'Living Heritage & Dynasties',
    subtext: '2,500 years of documented dynasties and sheer royal marvels.',
    description: 'A 200-meter sheer monolith carved into King Kashyapa’s palace citadel. Walk past giant lion paws, gaze at 1,500-year-old celestial maiden frescoes, and explore ancient hydraulic lakes so vast they have tides.',
    liveExperience: 'Cycling through moonlit brick stupas as fragrant temple frangipani blossoms fall onto ancient stone walkways.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-4',
    num: '04',
    tagline: 'UNTAMED WILD FRONTIERS',
    location: 'Yala & Minneriya',
    category: 'Wildlife & Safari',
    subtext: 'Enter the wilderness where elephants and leopards roam freely.',
    description: 'Thick monsoon scrublands bordering untamed ocean beaches. Track leopards lounging on sun-warmed granite rocks, sloth bears digging termite mounds, and majestic elephant herds gathering by freshwater reservoirs.',
    liveExperience: 'Open-top 4x4 safari at dawn tracking fresh leopard pugmarks along secluded jungle waterholes.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-5',
    num: '05',
    tagline: 'SACRED TEMPLE BELLS & FIRE RITUALS',
    location: 'Kandy & Esala Perahera',
    category: 'Spirituality & Fire Rites',
    subtext: 'Sacred Bodhi trees, butter-lamp twilight, and hypnotic drum pulses.',
    description: 'The spiritual heart of Sri Lanka. At the Temple of the Sacred Tooth Relic, golden caskets, silver conch shells, and the thunderous polyrhythms of Geta Beraya drums accompany barefoot dancers performing acrobatics over red-hot coconut embers.',
    liveExperience: 'Offering white lotus buds during evening temple pooja as silver trumpets echo across the sacred Kandy lake.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-6',
    num: '06',
    tagline: 'LIVING COLONIAL RAMPARTS & GEMS',
    location: 'Galle Fort',
    category: 'Living Fortress & Artisans',
    subtext: 'Colonial architecture, tiny cafés, Ceylon sapphires and ocean sunsets.',
    description: 'Cobblestoned 17th-century ramparts where ocean waves crash against coral walls. Discover fragrant cinnamon attics, hand-carved demon masks, and world-renowned cornflower-blue Ceylon sapphires.',
    liveExperience: 'Walking the bastion walls at golden hour with spiced coconut water, watching daredevil locals dive into the surging turquoise sea.',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'chp-7',
    num: '07',
    tagline: 'AYUBOWAN: WARM VILLAGE SOUL & OCEAN',
    location: 'Mirissa & Southern Villages',
    category: 'Hospitality & Serenity',
    subtext: 'Golden beaches, palm hills, and the generous smile of Ayubowan.',
    description: 'Sri Lankan hospitality is a genuine art. Step into open courtyards where elders greet you with palms pressed together (May you live long), sharing clay-pot curries before sailing out to where the magnificent Blue Whale surfaces.',
    liveExperience: 'Sharing a banana-leaf lunch cooked on a clay woodfire hearth with a local family under swaying king coconut palms.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75',
  },
];

const CULTURE_PILLARS: ExperienceSlide[] = [
  {
    id: 'cul-1',
    num: '01',
    tagline: 'ANCIENT KINGDOMS & MONUMENTAL HYDROLOGY',
    location: 'Anuradhapura & Polonnaruwa',
    category: 'Dynasties & Architecture',
    subtext: '2,500 years of documented dynasties and sky stupas.',
    description: 'Flourishing when ancient Rome was in its infancy, Sri Lanka’s ancient capitals featured monumental brick stupas taller than the pyramids of Egypt and vast artificial reservoirs (wewas) with gravity-defying canals.',
    liveExperience: 'Cycling between colossal 2,000-year-old stupas at dusk as monk chants drift across lotus-covered waterways.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'cul-2',
    num: '02',
    tagline: 'TEMPLES, JAYA SRI MAHA BODHI & SPIRIT',
    location: 'Sacred Kandy & Anuradhapura',
    category: 'Living Faith',
    subtext: 'The southern branch of the original Bodhi tree, tended for 23 centuries.',
    description: 'In Sri Lanka, history is not locked in glass cabinets. It breathes in nightly butter lamps, saffron-robed monks, white-clad devotees, and the fragrance of crushed jasmine on ancient stone altars.',
    liveExperience: 'Participating in the dawn pirith ceremony with aromatic oil lamps and lotus blossom offerings.',
    image: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'cul-3',
    num: '03',
    tagline: 'TRADITIONAL KANDYAN DANCE & THUNDERING DRUMS',
    location: 'Central Highlands',
    category: 'Acrobatics & Sacred Drums',
    subtext: 'Acrobatic leaps, silver headdresses, and hypnotic drum pulses.',
    description: 'Born in rituals to appease island deities, Kandyan dance pairs athletic somersaults and shimmering silver headdresses with the polyrhythmic resonance of the double-ended Geta Beraya drum.',
    liveExperience: 'Backstage access with master dancers tuning hand-stretched goat-hide drums beside fire-lit courtyards.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'cul-4',
    num: '04',
    tagline: 'ESALA PERAHERA: NOCTURNAL FESTIVAL OF FIRE',
    location: 'Kandy Kingdom',
    category: 'Grand Festival',
    subtext: 'A thousand whip-crackers, fire-jugglers, and regal caparisoned tuskers.',
    description: 'During the full moon of Esala, Kandy erupts into Asia’s most spectacular nocturnal pageant: hundreds of barefoot acrobats, torch-bearers whirling fiery wheels, and majestic tuskers bearing golden caskets.',
    liveExperience: 'Feeling the heat of flaming torches and the ground vibrating under 500 ceremonial master drummers.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'cul-5',
    num: '05',
    tagline: 'MASTER CRAFTSMEN, MASKS & CEYLON SAPPHIRES',
    location: 'Ambalangoda & Ratnapura',
    category: 'Artisans & Gems',
    subtext: 'Hand-carved demon masks, wax-resist silks, and world-renowned gems.',
    description: 'Carvers shape Kaduru wood into fierce Raksha masks to ward off misfortune, while in Ratnapura (City of Gems), artisanal miners unearth royal cornflower-blue sapphires that have adorned royal crowns for millennia.',
    liveExperience: 'Carving and painting your own miniature protective mask using authentic botanical vegetable dyes.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=75',
  },
  {
    id: 'cul-6',
    num: '06',
    tagline: 'AYUBOWAN: THE ART OF ISLAND HOSPITALITY',
    location: 'Rural Hamlets & Chena Farms',
    category: 'Village Soul',
    subtext: 'Open courtyards, clay woodfires, sweet milk tea, and boundless kindness.',
    description: 'Sri Lankan hospitality is effortless warmth. Enter rural farming hamlets where every traveler is treated like honored family with the blessing of "Ayubowan" (May you live long) and sweet king coconut.',
    liveExperience: 'Grinding fresh sambol on a traditional stone miris gala and enjoying lunch under clay-tiled village eaves.',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=75',
  },
];

interface SevenExperiencesProps {
  onOpenBooking?: () => void;
}

export const SevenExperiences: React.FC<SevenExperiencesProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'iconic' | 'culture'>('iconic');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeDataset = activeTab === 'iconic' ? ISLAND_CHAPTERS : CULTURE_PILLARS;
  // Ensure index is within range when switching tabs
  const currentIndex = activeIndex >= activeDataset.length ? 0 : activeIndex;
  const current = activeDataset[currentIndex] || activeDataset[0];

  return (
    <section
      id="seven-experiences"
      className="w-full bg-[#07111a] text-white pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 relative overflow-hidden section-lazy touch-pan-y"
    >
      {/* Top Wavy Break from AboutUsSection (shaded oceanic tone) */}
      <WaveDivider position="top" fill="#051c2e" variant={1} heightClass="h-14 sm:h-20 lg:h-28" />

      {/* Target anchor for living culture navigation links */}
      <div id="culture-section" className="absolute -top-12 left-0 pointer-events-none" />

      {/* Subtle background ambient lights - desktop only to prevent mobile overdraw */}
      <div className="hidden md:block absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none gpu-layer" />
      <div className="hidden md:block absolute bottom-1/3 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none gpu-layer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold tracking-widest uppercase mb-3">
              <Compass className="w-3 h-3 text-cyan-400" />
              Living Heritage & Iconic Bucket List
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold text-white tracking-tight">
              Sri Lanka in 7 Experiences
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base font-light max-w-xl">
              Huge moments, living culture, minimal noise. Seven foundational chapters of ancient kingdoms, wild frontiers, sacred traditions, and oceanic serenity.
            </p>
          </div>

          {/* Tab Switcher: 7 Iconic Wonders vs Living Culture */}
          <div className="flex items-center bg-[#0d2232] p-1.5 rounded-2xl border border-cyan-500/30">
            <button
              onClick={() => {
                setActiveTab('iconic');
                setActiveIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'iconic'
                  ? 'bg-cyan-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              7 Island Chapters
            </button>
            <button
              onClick={() => {
                setActiveTab('culture');
                setActiveIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'culture'
                  ? 'bg-cyan-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              Living Culture
            </button>
          </div>
        </div>

        {/* Number Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeDataset.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20 scale-105 font-extrabold'
                  : 'bg-[#0f2130] text-slate-400 hover:text-white hover:bg-[#152e42] border border-slate-700/50'
              }`}
            >
              <span>{exp.num}</span>
              <span className="hidden sm:inline font-sans text-[11px] font-normal opacity-80">
                · {exp.location.split('&')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Giant Experience Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-[#091824] group min-h-[500px] sm:min-h-[580px] flex flex-col justify-end">
          {/* HUGE Photograph Background */}
          <img
            src={current.image}
            alt={current.location}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
          />

          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e16] via-[#060e16]/65 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060e16]/85 via-transparent to-transparent hidden lg:block" />

          {/* Experience Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-cyan-400 font-mono text-sm sm:text-base font-extrabold tracking-widest">
                {current.num} —
              </span>
              <span className="text-cyan-300 uppercase tracking-widest text-xs sm:text-sm font-semibold">
                {current.location}
              </span>
              <span className="text-[11px] font-mono text-slate-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                {current.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-archivo font-black tracking-tight text-white uppercase drop-shadow-md">
              {current.tagline}
            </h3>

            <p className="text-base sm:text-xl font-serif text-slate-200 mt-3 italic leading-relaxed">
              "{current.subtext}"
            </p>

            <p className="text-xs sm:text-sm text-slate-300/90 mt-3 font-light leading-relaxed max-w-2xl">
              {current.description}
            </p>

            {/* Cultural / Live Immersion Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-100 flex items-start gap-2.5 max-w-2xl">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">Signature Live Experience:</strong>
                <span>{current.liveExperience}</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-cyan-400/20 transition-all duration-300 cursor-pointer"
              >
                Experience This Chapter
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} of {activeDataset.length} Chapters
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Thumbnail Gallery Bar */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 ${activeTab === 'iconic' ? 'lg:grid-cols-7' : 'lg:grid-cols-6'} gap-3 mt-6`}>
          {activeDataset.map((exp, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <div
                key={exp.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-xl overflow-hidden cursor-pointer h-24 border transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-102'
                    : 'border-slate-700/60 opacity-60 hover:opacity-100 hover:border-slate-500'
                }`}
              >
                <img
                  src={exp.image.replace('w=1200&q=75', 'w=350&q=70')}
                  alt={exp.location}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold block">
                    {exp.num}
                  </span>
                  <span className="text-[11px] font-bold text-white truncate block">
                    {exp.location.split('&')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wavy Section Transition into IslandInteractiveMap (#0b2438) */}
      <WaveDivider position="bottom" fill="#0b2438" variant={1} />
    </section>
  );
};
