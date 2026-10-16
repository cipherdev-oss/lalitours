import React from 'react';
import { motion } from 'motion/react';
import { Eye, ArrowRight, Compass } from 'lucide-react';
import { Destination } from '../types';

interface DestinationGridProps {
  destinations: Destination[];
  activeDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  onOpenLightbox: (imageUrl: string, index: number, dest: Destination) => void;
  onOpenBookingFor: (dest: Destination) => void;
}

interface PlaceFeature {
  destId: string;
  tag: string;
  headline: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  primaryImage: string;
  primaryAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
}

const SRI_LANKA_PLACES: PlaceFeature[] = [
  {
    destId: 'sigiriya',
    tag: 'THE ANCIENT CITADEL',
    headline: 'Descending Into The Ancient Citadel',
    paragraph1:
      'As morning mist lifts over the cultural triangle plains, King Kashyapa’s fifth-century royal sky fortress emerges 200 meters above virgin canopy. Sculpted atop a sheer monolith, Sigiriya fuses celestial engineering with royal grandeur.',
    paragraph2:
      'Symmetrical water gardens, landscaped terraced boulder pavilions, and sheer granite walls carrying ancient frescoes preserve a legendary millennium-old legacy untouched by time.',
    buttonText: 'LEARN MORE',
    primaryImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=900&q=85',
    primaryAlt: 'Sigiriya Lion Rock citadel rising above virgin jungle canopy',
    secondaryImage: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=800&q=85',
    secondaryAlt: 'Ancient boulder gardens and royal pavilions at Sigiriya',
  },
  {
    destId: 'ella',
    tag: 'HIGHLAND EXPEDITIONS',
    headline: 'Traversing Misty Mountain Viaducts',
    paragraph1:
      'Gliding along historic mountain rail lines through forested ravines and silver waterfalls, the journey into Ella is hailed as one of the world’s most scenic rail voyages. The iconic 1921 Nine Arch viaduct spans 300 feet of emerald gorge without a single steel rod.',
    paragraph2:
      'Surrounded by crisp mountain air and cloud-kissed peaks, hike Little Adam’s Peak at sunrise or savor fresh single-origin Ceylon tea harvests beside cascading natural springs.',
    buttonText: 'VIEW JOURNEY',
    primaryImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=900&q=85',
    primaryAlt: 'Nine Arch Bridge viaduct with scenic blue mountain train in Ella',
    secondaryImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
    secondaryAlt: 'Lush rolling green tea plantation hills in the central highlands',
  },
  {
    destId: 'mirissa',
    tag: 'SOUTHERN OCEAN',
    headline: 'Hidden Azure Realms & Giant Whales',
    paragraph1:
      'Where golden palm-fringed headlands meet the profound sapphire currents of the Indian Ocean. Mirissa is renowned globally as the ultimate sanctuary for ethical encounters with the magnificent Blue Whale, the largest creature ever to inhabit Earth.',
    paragraph2:
      'Leaning coconut groves atop Coconut Tree Hill offer panoramic coastal sunsets, while tranquil turquoise bays provide calm waters for evening catamaran sails and luminous marine life.',
    buttonText: 'EXPLORE OCEAN',
    primaryImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=85',
    primaryAlt: 'Mirissa palm tree hill overlooking crystal turquoise ocean waters',
    secondaryImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=85',
    secondaryAlt: 'Profound sapphire deep ocean waves along the southern coast of Sri Lanka',
  },
  {
    destId: 'yala',
    tag: 'UNTOUCHED WILDERNESS',
    headline: 'Dawn Safaris & The Realm Of Leopards',
    paragraph1:
      'Where rugged dry-zone thorn forest meets untamed ocean breakers. Yala holds one of the highest leopard densities on the planet, offering rare glimpses of the elusive Panthera pardus kotiya lounging on giant sun-warmed monoliths.',
    paragraph2:
      'Track wild Asian elephant herds wandering through coastal lagoons, observe sloth bears and painted storks, and glamp beneath starry southern skies in eco-luxury canvas retreats.',
    buttonText: 'DISCOVER WILD',
    primaryImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=900&q=85',
    primaryAlt: 'Majestic wild Asian elephant herd in Yala natural sanctuary',
    secondaryImage: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=85',
    secondaryAlt: 'Wild leopard perched quietly on granite boulders in Yala',
  },
  {
    destId: 'nuwara-eliya',
    tag: 'TEA COUNTRY & MIST',
    headline: 'Emerald Carpets & Velvet Tea Valleys',
    paragraph1:
      'Perched 1,868 meters above sea level amidst eternal spring mist, Nuwara Eliya is the historical heart of Ceylon tea. Manicured rolling hills, heritage estates, and cool alpine breezes evoke timeless colonial grandeur.',
    paragraph2:
      'Walk through historic tea factories, sample single-estate artisan harvests, and stand atop the sheer 1,000-meter vertical drop of World’s End at Horton Plains National Park.',
    buttonText: 'EXPLORE HIGHLANDS',
    primaryImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
    primaryAlt: 'Manicured tea hills in Nuwara Eliya covered in fresh morning dew',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    secondaryAlt: 'Highland mountain lake surrounded by pine ridges and mist',
  },
];

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  destinations,
  activeDestination,
  onSelectDestination,
  onOpenLightbox,
  onOpenBookingFor,
}) => {
  return (
    <section id="destinations-grid" className="w-full relative">
      {/* Organic Wavy Break from previous White section into Oceanic Navy */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px] bg-white">
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-28 lg:h-36"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          {/* Ambient cyan sea spray wave layer */}
          <path
            d="M0,50 C320,120 540,15 820,70 C1100,125 1300,40 1440,75 L1440,160 L0,160 Z"
            fill="#0ea5e9"
            fillOpacity="0.22"
          />
          {/* Intermediate deep crest layer */}
          <path
            d="M0,80 C260,20 580,135 900,55 C1180,0 1340,85 1440,48 L1440,160 L0,160 Z"
            fill="#08354c"
            fillOpacity="0.65"
          />
          {/* Solid oceanic navy wave base */}
          <path
            d="M0,160 L0,95 C240,35 480,135 740,65 C1000,0 1240,115 1440,55 L1440,160 Z"
            fill="#021420"
          />
        </svg>
      </div>

      <div className="w-full bg-[#021420] text-white pt-8 sm:pt-12 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Blue Canyon Background Image from User Reference */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-screen transition-opacity duration-700"
          style={{
            backgroundImage: 'url(/assets/places_bg.jpg)',
          }}
        />

        {/* Ambient Chasm Crevasse Glow matching the vertical blue canyon lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 50% 25%, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.12) 45%, rgba(2, 20, 32, 0.85) 80%, #021420 100%)',
          }}
        />

        {/* Flank Canyon Wall Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010912]/85 via-transparent to-[#010912]/85 pointer-events-none" />

        {/* Top and Bottom fades for smooth integration with wavy break */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#021420] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#021420] to-transparent pointer-events-none" />

        {/* Subtle Dot-Matrix Texture & Cyan Ambient Lighting from Reference Design */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#1c4763 1.25px, transparent 1.25px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-1/6 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-4 w-96 h-96 bg-sky-600/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/6 right-12 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header with Cyan Pill & Refined Title */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#072c40] text-[#38bdf8] text-[11px] font-semibold tracking-widest uppercase border border-[#0ea5e9]/40 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              Natural Wonders of Sri Lanka
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-archivo font-extrabold text-white tracking-tight mt-2.5">
              Places of Sri Lanka
            </h2>
            <p className="text-slate-300/80 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed font-normal">
              An extraordinary convergence of ancient sky citadels, misty viaduct railways, deep azure whale sanctuaries, and untamed leopard realms.
            </p>
          </div>

        {/* Compact Alternating Editorial Rows */}
        <div className="space-y-14 sm:space-y-18">
          {SRI_LANKA_PLACES.map((place, idx) => {
            const isEven = idx % 2 === 0;
            const targetDest =
              destinations.find((d) => d.id === place.destId) || activeDestination;

            if (isEven) {
              // ROW STYLE 1: Editorial Text on LEFT + Small Overlapping Dual-Image Mosaic on RIGHT
              return (
                <div
                  key={place.destId}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center"
                >
                  {/* Left Column: Editorial Text */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-6 space-y-3 sm:space-y-3.5"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#082e44] text-[#38bdf8] border border-[#0ea5e9]/40 shadow-sm">
                      {place.tag}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold font-archivo text-white tracking-tight leading-snug">
                      {place.headline}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
                      {place.paragraph1}
                    </p>

                    <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed font-light max-w-md line-clamp-3">
                      {place.paragraph2}
                    </p>

                    <div className="pt-1.5">
                      <button
                        onClick={() => {
                          onSelectDestination(targetDest);
                          onOpenBookingFor(targetDest);
                        }}
                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#08354c] hover:bg-[#0c496a] text-[#38bdf8] hover:text-white border border-[#0ea5e9]/50 text-[11px] font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-cyan-500/20 cursor-pointer"
                      >
                        <span>{place.buttonText}</span>
                        <ArrowRight className="w-3 h-3 text-[#38bdf8] group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Right Column: Small Overlapping Dual-Image Mosaic */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-6 relative w-full max-w-[340px] sm:max-w-[380px] mx-auto py-2"
                  >
                    {/* Primary Image Card (Top / Left) */}
                    <div
                      onClick={() => onOpenLightbox(place.primaryImage, 0, targetDest)}
                      className="relative z-0 w-[78%] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-black/80 border border-cyan-400/25 group cursor-pointer bg-slate-900"
                    >
                      <img
                        src={place.primaryImage}
                        alt={place.primaryAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021420]/60 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1 opacity-90 group-hover:opacity-100">
                        <Eye className="w-2.5 h-2.5 text-[#38bdf8]" />
                        <span>View photo</span>
                      </div>
                    </div>

                    {/* Secondary Image Card (Staggered Bottom / Right - Overlapping) */}
                    <div
                      onClick={() => onOpenLightbox(place.secondaryImage, 1, targetDest)}
                      className="relative z-10 w-[66%] aspect-[4/3] -mt-16 sm:-mt-20 ml-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/95 border border-cyan-400/40 group cursor-pointer ring-4 ring-[#021420] bg-slate-900"
                    >
                      <img
                        src={place.secondaryImage}
                        alt={place.secondaryAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021420]/60 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1 opacity-90 group-hover:opacity-100">
                        <Eye className="w-2.5 h-2.5 text-[#38bdf8]" />
                        <span>Explore details</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            } else {
              // ROW STYLE 2: Small Overlapping Dual-Image Mosaic on LEFT + Editorial Text on RIGHT
              return (
                <div
                  key={place.destId}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center"
                >
                  {/* Left Column: Small Overlapping Dual-Image Mosaic */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-6 order-2 md:order-1 relative w-full max-w-[340px] sm:max-w-[380px] mx-auto py-2"
                  >
                    {/* Primary Image Card (Top / Left) */}
                    <div
                      onClick={() => onOpenLightbox(place.primaryImage, 0, targetDest)}
                      className="relative z-0 w-[78%] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-black/80 border border-cyan-400/25 group cursor-pointer bg-slate-900"
                    >
                      <img
                        src={place.primaryImage}
                        alt={place.primaryAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021420]/60 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1 opacity-90 group-hover:opacity-100">
                        <Eye className="w-2.5 h-2.5 text-[#38bdf8]" />
                        <span>View photo</span>
                      </div>
                    </div>

                    {/* Secondary Image Card (Staggered Bottom / Right - Overlapping) */}
                    <div
                      onClick={() => onOpenLightbox(place.secondaryImage, 1, targetDest)}
                      className="relative z-10 w-[66%] aspect-[4/3] -mt-16 sm:-mt-20 ml-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/95 border border-cyan-400/40 group cursor-pointer ring-4 ring-[#021420] bg-slate-900"
                    >
                      <img
                        src={place.secondaryImage}
                        alt={place.secondaryAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021420]/60 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1 opacity-90 group-hover:opacity-100">
                        <Eye className="w-2.5 h-2.5 text-[#38bdf8]" />
                        <span>Explore details</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Editorial Text */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-6 order-1 md:order-2 space-y-3 sm:space-y-3.5"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#082e44] text-[#38bdf8] border border-[#0ea5e9]/40 shadow-sm">
                      {place.tag}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold font-archivo text-white tracking-tight leading-snug">
                      {place.headline}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
                      {place.paragraph1}
                    </p>

                    <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed font-light max-w-md line-clamp-3">
                      {place.paragraph2}
                    </p>

                    <div className="pt-1.5">
                      <button
                        onClick={() => {
                          onSelectDestination(targetDest);
                          onOpenBookingFor(targetDest);
                        }}
                        className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#08354c] hover:bg-[#0c496a] text-[#38bdf8] hover:text-white border border-[#0ea5e9]/50 text-[11px] font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-cyan-500/20 cursor-pointer"
                      >
                        <span>{place.buttonText}</span>
                        <ArrowRight className="w-3 h-3 text-[#38bdf8] group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            }
          })}
        </div>
      </div>
      </div>
    </section>
  );
};
