import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Heart, Mountain, Palmtree, Send, Sparkles, Compass } from 'lucide-react';
import { Destination } from '../types';

interface PopularDestinationCollageProps {
  destinations: Destination[];
  activeDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  onOpenLightbox: (imageUrl: string, index: number, dest?: Destination) => void;
  onOpenBooking: (dest?: Destination) => void;
}

// Preset photo collages per destination or general Sri Lanka showcase
interface DestinationCollageData {
  title: string;
  subtitle: string;
  locationLabel: string;
  locationSub: string;
  description: string;
  mainImage: {
    url: string;
    caption: string;
  };
  topRightImage: {
    url: string;
    caption: string;
  };
  bottomLeftImage: {
    url: string;
    caption: string;
  };
  bottomRightImage: {
    url: string;
    caption: string;
  };
  badges: Array<{
    icon: 'beach' | 'mountain' | 'culture';
    line1: string;
    line2: string;
  }>;
}

const COLLAGE_DATA: Record<string, DestinationCollageData> = {
  default: {
    title: 'Sri Lanka, South Asia',
    subtitle: 'The Pearl of the Indian Ocean',
    locationLabel: 'Sri Lanka, Indian Ocean',
    locationSub: 'A paradise for every traveler',
    description:
      'Sri Lanka is a tropical paradise known for its stunning beaches, rich culture, and breathtaking landscapes. From the golden palm-fringed coastlines of Mirissa to the serene rock citadel of Sigiriya, Sri Lanka offers the perfect blend of adventure, relaxation, and unforgettable experiences.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=85',
      caption: 'Mirissa Coastal Headland & Turquoise Bays',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=85',
      caption: 'Sigiriya Sky Fortress at Dusk',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=85',
      caption: 'Galle Maritime Heritage & Coastline',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
      caption: 'Golden Palms & Outrigger Boat',
    },
    badges: [
      { icon: 'beach', line1: 'Beautiful', line2: 'Beaches' },
      { icon: 'mountain', line1: 'Stunning', line2: 'Landscapes' },
      { icon: 'culture', line1: 'Rich', line2: 'Culture' },
    ],
  },
  sigiriya: {
    title: 'Sigiriya, Sri Lanka',
    subtitle: 'Ancient Sky Fortress & Citadels',
    locationLabel: 'Sigiriya, Cultural Triangle',
    locationSub: 'Eighth wonder of the ancient world',
    description:
      'Rising sheer from central plains, Sigiriya is an ancient royal citadel perched atop a 200-meter monolith. From royal water gardens and millennium-old frescoes to 360-degree canopy vistas, Sigiriya offers awe-inspiring wonder and heritage.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85',
      caption: 'Lion Rock Monolith at Dawn',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=85',
      caption: 'Highland Forest Panoramas',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=85',
      caption: 'Heritage Ramparts & Stone Craft',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=85',
      caption: 'Lush Tropical Canopies',
    },
    badges: [
      { icon: 'culture', line1: 'Ancient', line2: 'Heritage' },
      { icon: 'mountain', line1: 'Monolithic', line2: 'Panoramas' },
      { icon: 'beach', line1: 'Sacred', line2: 'Gardens' },
    ],
  },
  mirissa: {
    title: 'Mirissa, Sri Lanka',
    subtitle: 'Golden Palms & Whale Encounters',
    locationLabel: 'Mirissa & South Coast',
    locationSub: 'Tropical surf, palms & whale migration',
    description:
      'Mirissa is a quintessential tropical haven where coconut palms slope over azure waves. Famed for blue whale migrations, secret coves, and beachside fresh seafood, it is the soul of Sri Lanka’s southern ocean paradise.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=85',
      caption: 'Mirissa Turquoise Ocean & Bay',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
      caption: 'Leaning Palms on Golden Sands',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=85',
      caption: 'Historic Galle Coastline Nearby',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
      caption: 'Crystal Clear Lagoon Waters',
    },
    badges: [
      { icon: 'beach', line1: 'Beautiful', line2: 'Beaches' },
      { icon: 'mountain', line1: 'Marine', line2: 'Wildlife' },
      { icon: 'culture', line1: 'Coastal', line2: 'Lifestyle' },
    ],
  },
  ella: {
    title: 'Ella, Sri Lanka',
    subtitle: 'Misty Viaducts & Tea Country',
    locationLabel: 'Ella, Central Highlands',
    locationSub: 'The world’s most scenic highland railway',
    description:
      'Tucked within the central mountain amphitheater, Ella is enveloped by cloud forests, tea estates, and cascading falls. The legendary Nine Arch Bridge emerges timelessly through emerald valleys.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=85',
      caption: 'Nine Arch Viaduct in Misty Valley',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
      caption: 'Rolling Green Ceylon Tea Hills',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=85',
      caption: 'Mountain Escarpments',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=85',
      caption: 'Highland Waterfalls & Flora',
    },
    badges: [
      { icon: 'mountain', line1: 'Stunning', line2: 'Highlands' },
      { icon: 'culture', line1: 'Historic', line2: 'Railway' },
      { icon: 'beach', line1: 'Pure', line2: 'Mountain Air' },
    ],
  },
};

export const PopularDestinationCollage: React.FC<PopularDestinationCollageProps> = ({
  destinations,
  activeDestination,
  onSelectDestination,
  onOpenLightbox,
  onOpenBooking,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('default');

  const currentData =
    COLLAGE_DATA[selectedKey] ||
    COLLAGE_DATA[activeDestination.id] ||
    COLLAGE_DATA['default'];

  return (
    <section id="popular-destination" className="relative w-full -mt-16 sm:-mt-24 md:-mt-32 z-20">
      {/* Organic Curved Wave Divider that cuts directly into the hero image */}
      <div className="relative w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px]">
        <svg
          className="relative block w-full h-16 sm:h-24 md:h-36 lg:h-44 text-white fill-current"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
        >
          {/* Fluid wave with organic crests and dips matching the reference design */}
          <path d="M0,200 L0,95 C220,15 480,180 760,80 C1020,-10 1260,150 1440,65 L1440,200 Z" />
        </svg>
      </div>

      {/* Main Solid White Content Section */}
      <div className="w-full bg-white text-slate-800 pt-2 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          {/* Quick Destination Pill Switcher */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-6 scrollbar-none mb-4 sm:mb-8">
          <button
            onClick={() => setSelectedKey('default')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedKey === 'default'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                : 'bg-sky-50 text-slate-600 hover:bg-sky-100'
            }`}
          >
            All Island Highlights
          </button>
          {destinations.slice(0, 4).map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setSelectedKey(d.id);
                onSelectDestination(d);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedKey === d.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-sky-50 text-slate-600 hover:bg-sky-100'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Two-Column Layout identical to user reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Polaroid Photo Collage with playful travel doodles */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center py-4 sm:py-6">
            {/* Paper Airplane with Curved Dashed Flight Path */}
            <div className="absolute -left-2 sm:-left-4 top-0 sm:top-2 z-10 pointer-events-none select-none">
              <svg
                width="160"
                height="120"
                viewBox="0 0 160 120"
                fill="none"
                className="overflow-visible w-28 sm:w-40"
              >
                <path
                  d="M10,105 C30,50 75,35 110,50 C135,62 145,45 150,25"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute right-0 top-3 transform rotate-[25deg] text-sky-500">
                <Send className="w-5 h-5 sm:w-7 sm:h-7 fill-sky-400 stroke-sky-600 drop-shadow-md" />
              </div>
            </div>

            {/* Sparkle / Burst Doodles */}
            <div className="absolute -right-2 sm:right-2 top-1/2 -translate-y-20 z-30 pointer-events-none select-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-9 sm:w-12 h-9 sm:h-12">
                <path
                  d="M24,6 L24,16 M40,24 L30,24 M35,12 L28,19"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Enlarged, Well-Balanced Polaroid Container Stage */}
            <div className="relative w-full max-w-[620px] aspect-[4/3.5] sm:aspect-[4/3.3] min-h-[400px] sm:min-h-[500px] lg:min-h-[540px]">
              {/* PHOTO 1 (Center Main Card): Dominant central showcase */}
              <motion.div
                key={`main-${selectedKey}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03, rotate: -1, zIndex: 40 }}
                onClick={() =>
                  onOpenLightbox(
                    currentData.mainImage.url,
                    0,
                    activeDestination
                  )
                }
                className="absolute left-[6%] sm:left-[8%] top-[3%] w-[72%] sm:w-[70%] aspect-[4/3.1] bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border-[6px] sm:border-[10px] border-white -rotate-2 z-20 cursor-pointer transition-shadow hover:shadow-sky-500/25 group"
              >
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
                  <img
                    src={currentData.mainImage.url}
                    alt={currentData.mainImage.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs sm:text-sm text-white font-medium drop-shadow">
                      {currentData.mainImage.caption}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* PHOTO 2 (Top Right Card): Generous size, tilted right */}
              <motion.div
                key={`tr-${selectedKey}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05, rotate: 4, zIndex: 40 }}
                onClick={() =>
                  onOpenLightbox(
                    currentData.topRightImage.url,
                    1,
                    activeDestination
                  )
                }
                className="absolute right-[0%] sm:right-[1%] top-[8%] w-[50%] sm:w-[48%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-xl border-[5px] sm:border-[8px] border-white rotate-6 z-10 cursor-pointer transition-shadow hover:shadow-sky-500/20 group"
              >
                <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                  <img
                    src={currentData.topRightImage.url}
                    alt={currentData.topRightImage.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-xs text-white font-medium drop-shadow truncate">
                      {currentData.topRightImage.caption}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* PHOTO 3 (Bottom Left Card): Tilted left, generous landscape */}
              <motion.div
                key={`bl-${selectedKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.05, rotate: -4, zIndex: 40 }}
                onClick={() =>
                  onOpenLightbox(
                    currentData.bottomLeftImage.url,
                    2,
                    activeDestination
                  )
                }
                className="absolute left-[0%] bottom-[3%] w-[50%] sm:w-[48%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-xl border-[5px] sm:border-[8px] border-white -rotate-6 z-30 cursor-pointer transition-shadow hover:shadow-sky-500/20 group"
              >
                <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                  <img
                    src={currentData.bottomLeftImage.url}
                    alt={currentData.bottomLeftImage.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-xs text-white font-medium drop-shadow truncate">
                      {currentData.bottomLeftImage.caption}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* PHOTO 4 (Bottom Right Card): Tilted right, beach with palms & boat */}
              <motion.div
                key={`br-${selectedKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2, zIndex: 40 }}
                onClick={() =>
                  onOpenLightbox(
                    currentData.bottomRightImage.url,
                    3,
                    activeDestination
                  )
                }
                className="absolute right-[2%] sm:right-[4%] bottom-[0%] w-[54%] sm:w-[52%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-2xl border-[5px] sm:border-[8px] border-white rotate-4 z-20 cursor-pointer transition-shadow hover:shadow-sky-500/20 group"
              >
                <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                  <img
                    src={currentData.bottomRightImage.url}
                    alt={currentData.bottomRightImage.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-xs text-white font-medium drop-shadow truncate">
                      {currentData.bottomRightImage.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Editorial Content directly reflecting the reference design */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {/* Tagline with accent bar: "— POPULAR DESTINATION" */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[2.5px] bg-[#0284c7] rounded-full" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#0284c7]">
                POPULAR DESTINATION
              </span>
            </div>

            {/* Title: "Bali, Indonesia" style typography */}
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-archivo font-black tracking-tight leading-[1.1] text-slate-900">
              {currentData.title.split(',')[0]}
              <span className="text-[#0284c7]">
                , {currentData.title.split(',')[1] || 'Sri Lanka'}
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              {currentData.description}
            </p>

            {/* 3 Circular Feature Badges (Beautiful Beaches / Stunning Landscapes / Rich Culture) */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              {currentData.badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-sky-300 bg-sky-50 flex items-center justify-center text-[#0284c7] shadow-sm flex-shrink-0">
                    {badge.icon === 'beach' && <Palmtree className="w-5 h-5" />}
                    {badge.icon === 'mountain' && <Mountain className="w-5 h-5" />}
                    {badge.icon === 'culture' && <Heart className="w-5 h-5 fill-sky-100" />}
                  </div>
                  <div className="leading-tight text-xs sm:text-sm font-semibold text-slate-800">
                    <div>{badge.line1}</div>
                    <div>{badge.line2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Location Callout Card */}
            <div
              onClick={() => onOpenBooking(activeDestination)}
              className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#f0f8ff] border border-sky-200/80 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#e7f3ff] hover:border-sky-300 transition-all duration-300 shadow-sm group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md shadow-sky-600/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                    {currentData.locationLabel}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal">
                    {currentData.locationSub}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex text-xs font-semibold text-[#0284c7] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                Inquire &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
