import React, { useState } from 'react';
import { Utensils, Sparkles, Flame, Coffee, Fish, Citrus, Soup, Heart } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  sinhalaName: string;
  subtitle: string;
  tagline: string;
  description: string;
  icon: any;
  image: string;
  keyNotes: string[];
  ritual: string;
}

const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'rice_curry',
    name: 'Rice & Curry',
    sinhalaName: 'Bath & Curry',
    subtitle: 'The Soul of Sri Lankan Gastronomy',
    tagline: 'An alchemical feast of five distinct curries, clay pots, and coconut embers.',
    description: 'Never a single dish, but a vibrant mandala on a fresh banana leaf: aromatic red heirloom samba rice surrounded by creamy slow-simmered dhal, jackfruit kalupol curry, spicy pol sambol with Maldive fish, and crispy fried papadams.',
    icon: Soup,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Fresh coconut milk base', 'Roasted curry powder (thunapaha)', 'Clay pot simmered over woodfire'],
    ritual: 'Eaten traditionally with the fingertips to blend textures and heat perfectly.',
  },
  {
    id: 'hoppers',
    name: 'Hoppers & String Hoppers',
    sinhalaName: 'Appa & Idiyappa',
    subtitle: 'Crisp Lace Edges & Steaming Noodle Nests',
    tagline: 'Bowl-shaped fermented rice-flour crepes with a soft, pillowy center.',
    description: 'Swirled into hot hemispherical woks, plain hoppers develop paper-thin lacy edges while the center remains tender. The famous Egg Hopper features a fresh farm egg steamed directly into the core, served with fiery seeni sambol (caramelized onion & chili relish).',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Fermented coconut water batter', 'Runny golden egg yolk', 'Seeni & Katta sambol accompaniments'],
    ritual: 'Best enjoyed at twilight street carts straight from the glowing charcoal burner.',
  },
  {
    id: 'kottu',
    name: 'Kottu Roti',
    sinhalaName: 'Kottu Rotti',
    subtitle: 'The Street-Side Symphony of Chopping Blades',
    tagline: 'The iconic midnight rhythm heard echoing down every Sri Lankan city street.',
    description: 'Hot godamba flatbread shredded and stir-fried on a searing iron griddle with crunchy leeks, carrots, egg, aromatic spices, and your choice of rich curry gravy. Chefs duel with two heavy steel cleavers, playing syncopated musical beats that draw crowds from blocks away.',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Flaky griddled godamba roti', 'Aromatic curry gravy reduction', 'Syncopated blade performance'],
    ritual: 'The definitive Sri Lankan late-night comfort food after an ocean surf.',
  },
  {
    id: 'seafood',
    name: 'Lagoon Crab & Coastal Seafood',
    sinhalaName: 'Malu & Kakuluwo',
    subtitle: 'Harvested at Dawn from Ocean & Estuary',
    tagline: 'Colossal wild lagoon crabs, yellowfin tuna steaks, and garlic jumbo prawns.',
    description: 'Sri Lanka’s colossal mud crabs are celebrated across international culinary capitals. Prepared in rich chili garlic oil, aromatic black pepper broth, or coconut milk with crushed curry leaves, freshly caught by fishermen casting traditional outrigger nets.',
    icon: Fish,
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Wild giant mangrove crabs', 'Jaffna-style fiery curry', 'Fresh ocean-to-table catch daily'],
    ritual: 'Cracked open ocean-side with crusty wood-fired roast paan bread to sop up gravy.',
  },
  {
    id: 'ceylon_tea',
    name: 'Pure Ceylon Tea',
    sinhalaName: 'The Kahata',
    subtitle: 'The Champagne of the World’s Teas',
    tagline: 'Hand-plucked high-grown golden tips from mist-shrouded cloud forests.',
    description: 'Hand-harvested two leaves and a bud across Nuwara Eliya, Dimbula, and Uva. From delicate silver needle white teas to rich, malty Orange Pekoe, Ceylon tea owes its world-renowned clarity and citrus undertones to high altitude, ocean breezes, and volcanic soil.',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Hand-plucked two leaves and a bud', 'High-grown altitude notes', 'Single estate traceability'],
    ritual: 'Served piping hot in fine porcelain or frothy street-side "plain tea" with jaggery.',
  },
  {
    id: 'tropical_fruits',
    name: 'Tropical Fruits & King Coconut',
    sinhalaName: 'Thambili & Palathuru',
    subtitle: 'Sun-Drenched Island Sweetness',
    tagline: 'Golden king coconuts, ruby wood apples, and perfumed passionfruits.',
    description: 'The golden Thambili (King Coconut) is endemic to Sri Lanka, machete-hacked open by smiling roadside vendors to deliver electrolyte-rich nectar. Indulge in velvety purple mangosteens, sweet sour soursop smoothies, and creamy curd drizzled with wild kitul palm treacle.',
    icon: Citrus,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1000&q=80',
    keyNotes: ['Endemic Thambili nectar', 'Kitul palm treacle with buffalo curd', 'Roadside roadside machete cutting'],
    ritual: 'Sipped cold beside a sun-drenched coastal palm grove to rejuvenate your spirit.',
  },
];

export const TasteTheIsland: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('rice_curry');
  const activeFood = FOOD_ITEMS.find((f) => f.id === selectedId) || FOOD_ITEMS[0];

  return (
    <section id="taste-srilanka" className="w-full py-20 sm:py-28 bg-[#091522] text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            Culinary Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-white">
            Taste the Island
          </h2>
          <blockquote className="mt-3 text-lg sm:text-xl font-serif italic text-amber-200/90 max-w-xl mx-auto">
            "Every journey through Sri Lanka has a flavour."
          </blockquote>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto">
            From sizzling midnight kottu beats to hand-harvested Ceylon teas and colossal clay-pot crab feasts.
          </p>
        </div>

        {/* Food Navigation Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {FOOD_ITEMS.map((item) => {
            const isSelected = item.id === selectedId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-[#102436] text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Food Spotlight Showcase */}
        <div className="bg-[#0e2132] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            {/* Left: Giant Food Photography */}
            <div className="lg:col-span-6 h-72 sm:h-96 rounded-2xl overflow-hidden relative group shadow-xl">
              <img
                src={activeFood.image}
                alt={activeFood.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2132] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 bg-black/60 px-2.5 py-1 rounded backdrop-blur-md">
                  {activeFood.sinhalaName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeFood.subtitle}
                </h3>
              </div>
            </div>

            {/* Right: Rich Culinary Context */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Signature Island Flavor
                </span>
                <h3 className="text-2xl sm:text-3xl font-archivo font-extrabold text-white mt-1">
                  {activeFood.name}
                </h3>
                <p className="text-sm sm:text-base font-serif italic text-amber-200/90 mt-1">
                  "{activeFood.tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {activeFood.description}
              </p>

              {/* Key Notes */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  The Alchemy & Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeFood.keyNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs bg-[#16334a] text-slate-200 px-3 py-1 rounded-full border border-slate-700/60"
                    >
                      ✓ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ritual Callout */}
              <div className="bg-[#122b3e] p-4 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block">The Local Ritual:</strong>
                  <span>{activeFood.ritual}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
