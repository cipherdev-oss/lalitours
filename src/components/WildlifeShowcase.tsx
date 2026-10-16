import React, { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

interface WildlifeCategory {
  id: string;
  name: string;
  scientific: string;
  sanctuary: string;
  highlight: string;
  description: string;
  image: string;
  stat: string;
}

const WILDLIFE_CATEGORIES: WildlifeCategory[] = [
  {
    id: 'elephants',
    name: 'Asian Elephants',
    scientific: 'Elephas maximus maximus',
    sanctuary: 'Udawalawe, Minneriya & Kaudulla',
    highlight: 'The Great Gathering — Over 300 gentle giants congregated by ancient water reservoirs.',
    description: 'Home to the largest subspecies of the Asian Elephant. Watch massive matriarch herds guide playful calves through lush riverbanks, bathe in red dirt, and stroll freely through protected wilderness corridors.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
    stat: '7,500+ Wild Elephants',
  },
  {
    id: 'leopards',
    name: 'Sri Lankan Leopards',
    scientific: 'Panthera pardus kotiya',
    sanctuary: 'Yala & Wilpattu National Parks',
    highlight: 'Highest concentration of apex wild leopards anywhere on planet Earth.',
    description: 'Unlike African leopards that hide from lions and hyenas, the Sri Lankan leopard reigns as the undisputed supreme predator of the island. Spot them draped gracefully across giant granite boulders and stalking through coastal scrub.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    stat: 'Top Density in Block 1 Yala',
  },
  {
    id: 'whales',
    name: 'Blue Whales & Megafauna',
    scientific: 'Balaenoptera musculus',
    sanctuary: 'Mirissa, Trincomalee & Kalpitiya',
    highlight: 'The largest living creatures to ever exist on planet Earth, just miles from shore.',
    description: 'The deep oceanic continental shelf brings abyssal nutrient upwellings right up to Sri Lanka’s coastline. Witness colossal 30-meter Blue Whales breach, alongside Sperm Whales and super-pods of over 1,000 acrobatic Spinner Dolphins.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    stat: '30m Colossal Ocean Giants',
  },
  {
    id: 'birds',
    name: 'Endemic & Migratory Birds',
    scientific: '34 Endemic Species',
    sanctuary: 'Sinharaja, Kumana & Bundala UNESCO',
    highlight: 'A tropical birdwatchers pilgrimage from misty cloud forests to coastal wetlands.',
    description: 'Spot dazzling endemic gems including the Sri Lanka Blue Magpie, Serendib Scops Owl, and Crimson-fronted Barbet, alongside tens of thousands of migratory flamingos, pelicans, and sea eagles circling saltwater lagoons.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    stat: '450+ Recorded Avian Species',
  },
  {
    id: 'turtles',
    name: 'Ancient Sea Turtles',
    scientific: '5 of 7 Global Marine Species',
    sanctuary: 'Rekawa, Kosgoda & Bentota',
    highlight: 'Green, Leatherback, Hawksbill, Loggerhead, and Olive Ridley turtles nesting on moonlit sands.',
    description: 'Under the quiet glow of the Southern stars, colossal female sea turtles crawl ashore on protected nesting beaches where their ancestors nested for over 100 million years. Swim gently alongside green turtles in crystalline shallow bays.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    stat: '5 of 7 World Species Nest Here',
  },
  {
    id: 'jungle',
    name: 'Prehistoric Virgin Jungles',
    scientific: 'Sinharaja Rainforest UNESCO Biosphere',
    sanctuary: 'Sinharaja & Knuckles Cloud Forest',
    highlight: 'A living Gondwana remnant untouched since prehistoric epochs.',
    description: 'Trek under a dense 45-meter high rainforest canopy enveloped in cool emerald mist, walking past towering Dipterocarp hardwoods, carnivorous pitcher plants, natural crystalline swimming pools, and cascading hidden waterfalls.',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    stat: 'UNESCO Biosphere Reserve',
  },
];

interface WildlifeShowcaseProps {
  onOpenBooking?: () => void;
}

export const WildlifeShowcase: React.FC<WildlifeShowcaseProps> = ({ onOpenBooking }) => {
  const [activeWild, setActiveWild] = useState<string>('elephants');
  const current = WILDLIFE_CATEGORIES.find((w) => w.id === activeWild) || WILDLIFE_CATEGORIES[0];

  return (
    <section id="wildlife-showcase" className="w-full py-20 sm:py-28 bg-gradient-to-b from-[#dff0fb] via-[#ebf6fd] to-[#d8ecf8] text-slate-900 relative overflow-hidden">
      {/* Top Wavy Break from FeelSriLankaSensory (#040d16) */}
      <WaveDivider position="top" fill="#040d16" variant={1} />

      {/* Background cinematic aura */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-sky-300 text-sky-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            Untamed Biodiversity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-[#082238] uppercase">
            Where the Wild Still Roams
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            One of the top 36 global biodiversity hotspots on Earth. In Sri Lanka, human reverence and raw wilderness coexist in breathless harmony.
          </p>
        </div>

        {/* Wildlife Category Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {WILDLIFE_CATEGORIES.map((w) => {
            const isSelected = w.id === activeWild;
            return (
              <button
                key={w.id}
                onClick={() => setActiveWild(w.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/30 scale-105'
                    : 'bg-white hover:bg-sky-50 text-slate-700 border border-sky-200/90 shadow-sm hover:border-sky-400'
                }`}
              >
                {w.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Giant Cinematic Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border border-sky-300/80 shadow-2xl bg-slate-900 group min-h-[480px] sm:min-h-[540px] flex flex-col justify-end">
          {/* Giant Photography Background */}
          <img
            src={current.image}
            alt={current.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
          />

          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent hidden lg:block" />

          {/* Card Details */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-sky-950/90 border border-sky-400/40 text-sky-200 text-xs font-mono font-bold tracking-wider">
                {current.stat}
              </span>
              <span className="text-xs font-serif italic text-slate-200">
                {current.scientific}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold text-white tracking-tight drop-shadow-md">
              {current.name}
            </h3>

            <p className="text-sm sm:text-base text-sky-300 font-medium mt-2">
              Primary Habitats: {current.sanctuary}
            </p>

            <blockquote className="text-sm sm:text-base font-serif italic text-slate-100 mt-3 border-l-4 border-sky-400 pl-4 py-1 leading-relaxed">
              "{current.highlight}"
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-200 font-light mt-3 leading-relaxed max-w-2xl">
              {current.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-archivo font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all duration-300 cursor-pointer"
              >
                ENTER THE WILD
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wavy Break into TasteTheIsland (#081420) */}
      <WaveDivider position="bottom" fill="#081420" variant={3} />
    </section>
  );
};
