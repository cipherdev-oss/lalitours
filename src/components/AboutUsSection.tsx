import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Sparkles,
  Heart,
  Compass,
  Leaf,
  Users,
  ShieldCheck,
  Award,
  Globe2,
  Smile,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Destination } from '../types';

interface AboutUsSectionProps {
  onOpenLightbox?: (imageUrl: string, index: number, dest?: Destination) => void;
  onOpenBooking?: (notes?: string) => void;
}

interface AboutTabContent {
  id: string;
  pillLabel: string;
  tagline: string;
  titlePart1: string;
  titleHighlight: string;
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
    icon: 'local' | 'shield' | 'heart' | 'eco' | 'compass' | 'users';
    line1: string;
    line2: string;
  }>;
  calloutTitle: string;
  calloutSubtitle: string;
  calloutAction: string;
}

const ABOUT_TABS: Record<string, AboutTabContent> = {
  story: {
    id: 'story',
    pillLabel: 'Our Story & Vision',
    tagline: 'ABOUT US · OUR STORY',
    titlePart1: 'Born From The Island',
    titleHighlight: ', Crafting Unforgettable Journeys',
    description:
      'Founded by passionate native islanders and seasoned travel architects, we set out with a singular vision: to share the untamed beauty, vibrant culture, and timeless soul of Sri Lanka with discerning travelers worldwide. From mist-shrouded highland peaks and ancient monolithic fortresses to untouched southern bays, we craft deeply personal, authentic journeys that linger in your heart forever.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
      caption: 'Nuwara Eliya Tea Valleys & Highland Workers',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=85',
      caption: 'Sigiriya Sky Monolith at Dawn',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=85',
      caption: 'Historic Galle Ramparts & Coastal Watch',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=85',
      caption: 'Mirissa Palm Groves & Azure Bays',
    },
    badges: [
      { icon: 'local', line1: '100% Local', line2: 'Born & Raised' },
      { icon: 'shield', line1: '12+ Years', line2: 'Island Expertise' },
      { icon: 'heart', line1: 'Heartfelt', line2: 'Hospitality' },
    ],
    calloutTitle: 'Headquartered in Colombo, Kandy & Galle',
    calloutSubtitle: 'Crafting bespoke Sri Lankan expeditions for conscious global travelers',
    calloutAction: 'Plan With Us',
  },
  guides: {
    id: 'guides',
    pillLabel: 'Passionate Local Guides',
    tagline: 'OUR PEOPLE · LOCAL EXPERTS',
    titlePart1: 'Guided By Storytellers',
    titleHighlight: ', Who Call This Island Home',
    description:
      'Our team comprises certified national naturalists, archaeological historians, and local village elders. They do not merely show you the sights; they reveal the untold folklore, track elusive leopards by fresh pugmarks in Yala, and invite you into roadside tea stalls where authentic Sri Lankan memories are born.',
    mainImage: {
      url: '/img/kandy.webp',
      caption: 'Sacred Temple of the Tooth & Kandy Heritage',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1566836610593-62a56241a77c?auto=format&fit=crop&w=800&q=85',
      caption: 'Wild Elephants in Minneriya National Park',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
      caption: 'Traditional Southern Stilt Fishermen',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=800&q=85',
      caption: 'Nine Arch Viaduct & Highland Forest Train',
    },
    badges: [
      { icon: 'users', line1: 'Certified', line2: 'Naturalists' },
      { icon: 'compass', line1: 'Insider', line2: 'Hidden Paths' },
      { icon: 'shield', line1: '24/7 On-Island', line2: 'Guest Support' },
    ],
    calloutTitle: 'Over 40 Handpicked Licensed Storytellers',
    calloutSubtitle: 'Deep cultural fluency, multi-lingual guides, and intimate local access',
    calloutAction: 'Meet Our Guides',
  },
  sustainable: {
    id: 'sustainable',
    pillLabel: 'Ethical & Eco-Travel',
    tagline: 'SUSTAINABILITY · OUR PLEDGE',
    titlePart1: 'Preserving Ceylon',
    titleHighlight: ', For Generations To Come',
    description:
      'We believe responsible tourism is the greatest guardian of natural wonder. We enforce strict zero single-use plastic policies on our expeditions, partner with ethical wildlife reserves, support turtle hatcheries in Kosgoda, and direct 10% of tour earnings back to rural schools and reforestation projects in the Knuckles mountain range.',
    mainImage: {
      url: 'https://images.unsplash.com/photo-1566836610593-62a56241a77c?auto=format&fit=crop&w=1200&q=85',
      caption: 'Gentle Giants in Protected Wilderness Sanctuaries',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85',
      caption: 'Ethical Organic Ceylon Tea Cultivation',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
      caption: 'Pristine Marine Sanctuaries & Living Reefs',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=85',
      caption: 'Leopard Sanctuaries & Protected Yala Habitats',
    },
    badges: [
      { icon: 'eco', line1: 'Eco-Certified', line2: 'Partner Lodges' },
      { icon: 'heart', line1: 'Community', line2: 'First Giving' },
      { icon: 'shield', line1: 'Wildlife', line2: 'Ethical Standards' },
    ],
    calloutTitle: 'Carbon-Conscious Expeditions Across Sri Lanka',
    calloutSubtitle: 'Supporting rural artisan villages, clean oceans, and rainforest restoration',
    calloutAction: 'Our Eco Pledge',
  },
  hospitality: {
    id: 'hospitality',
    pillLabel: "The 'Ayubowan' Spirit",
    tagline: 'HOSPITALITY · PHILOSOPHY',
    titlePart1: 'Ancient Warmth',
    titleHighlight: ', In Every Single Welcome',
    description:
      "In Sri Lanka, greeting someone with 'Ayubowan' is an ancient blessing wishing you long life, good health, and peace. That genuine warmth shapes every interaction with us—from the warm king coconut handed to you upon landing, to home-cooked claypot curries shared in remote mountain homesteads.",
    mainImage: {
      url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85',
      caption: 'Coastal Heritage & Timeless Island Smiles',
    },
    topRightImage: {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=85',
      caption: 'Serene Sunset Views Over Southern Waves',
    },
    bottomLeftImage: {
      url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=85',
      caption: 'Ceremonial Traditions & Temple Blessings',
    },
    bottomRightImage: {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=85',
      caption: 'Ancient Cultural Triangle Sunsets',
    },
    badges: [
      { icon: 'heart', line1: 'Genuine', line2: 'Island Smiles' },
      { icon: 'compass', line1: 'Curated', line2: 'Bespoke Days' },
      { icon: 'local', line1: 'Authentic', line2: 'Local Food' },
    ],
    calloutTitle: '24/7 Dedicated Island Travel Concierge',
    calloutSubtitle: 'Private chauffeured travel, boutique heritage villas, and frictionless care',
    calloutAction: 'Start Your Journey',
  },
};

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onOpenLightbox,
  onOpenBooking,
}) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('story');
  const currentData = ABOUT_TABS[activeTabKey] || ABOUT_TABS.story;

  const renderBadgeIcon = (type: string) => {
    switch (type) {
      case 'local':
        return <Award className="w-5 h-5" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5 fill-sky-100" />;
      case 'eco':
        return <Leaf className="w-5 h-5" />;
      case 'compass':
        return <Compass className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="about-us" className="relative w-full z-10 bg-gradient-to-b from-[#031320] via-[#051c2e] to-[#07111a] text-white pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden section-lazy touch-pan-y">
      {/* Atmospheric ambient lighting & shaded depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 30%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.06) 45%, transparent 80%)',
        }}
      />
      <div className="hidden md:block absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none gpu-layer" />
      <div className="hidden md:block absolute bottom-10 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none gpu-layer" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Quick About Us Dimension Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-6 scrollbar-none mb-4 sm:mb-8">
            {Object.values(ABOUT_TABS).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabKey(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTabKey === tab.id
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-lg shadow-cyan-400/25 font-bold'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-md'
                }`}
              >
                {tab.pillLabel}
              </button>
            ))}
          </div>

          {/* Two-Column Layout keeping the exact structure */}
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
                <div className="absolute right-0 top-3 transform rotate-[25deg] text-cyan-400">
                  <Send className="w-5 h-5 sm:w-7 sm:h-7 fill-cyan-400 stroke-cyan-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                </div>
              </div>

              {/* Sparkle / Burst Doodles */}
              <div className="absolute -right-2 sm:right-2 top-1/2 -translate-y-20 z-30 pointer-events-none select-none">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-9 sm:w-12 h-9 sm:h-12">
                  <path
                    d="M24,6 L24,16 M40,24 L30,24 M35,12 L28,19"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Polaroid Container Stage */}
              <div className="relative w-full max-w-[620px] aspect-[4/3.5] sm:aspect-[4/3.3] min-h-[400px] sm:min-h-[500px] lg:min-h-[540px]">
                {/* PHOTO 1 (Center Main Card): Dominant central showcase */}
                <motion.div
                  key={`main-${activeTabKey}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03, rotate: -1, zIndex: 40 }}
                  onClick={() =>
                    onOpenLightbox?.(currentData.mainImage.url, 0)
                  }
                  className="absolute left-[6%] sm:left-[8%] top-[3%] w-[72%] sm:w-[70%] aspect-[4/3.1] bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border-[6px] sm:border-[10px] border-white -rotate-2 z-20 cursor-pointer transition-shadow hover:shadow-cyan-500/30 group"
                >
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
                    <img
                      src={currentData.mainImage.url}
                      alt={currentData.mainImage.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs sm:text-sm text-white font-medium drop-shadow">
                        {currentData.mainImage.caption}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* PHOTO 2 (Top Right Card): Generous size, tilted right */}
                <motion.div
                  key={`tr-${activeTabKey}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 4, zIndex: 40 }}
                  onClick={() =>
                    onOpenLightbox?.(currentData.topRightImage.url, 1)
                  }
                  className="absolute right-[0%] sm:right-[1%] top-[8%] w-[50%] sm:w-[48%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.45)] border-[5px] sm:border-[8px] border-white rotate-6 z-10 cursor-pointer transition-shadow hover:shadow-cyan-500/25 group"
                >
                  <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                    <img
                      src={currentData.topRightImage.url}
                      alt={currentData.topRightImage.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-xs text-white font-medium drop-shadow truncate">
                        {currentData.topRightImage.caption}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* PHOTO 3 (Bottom Left Card): Tilted left, generous landscape */}
                <motion.div
                  key={`bl-${activeTabKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  whileHover={{ scale: 1.05, rotate: -4, zIndex: 40 }}
                  onClick={() =>
                    onOpenLightbox?.(currentData.bottomLeftImage.url, 2)
                  }
                  className="absolute left-[0%] bottom-[3%] w-[50%] sm:w-[48%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.45)] border-[5px] sm:border-[8px] border-white -rotate-6 z-30 cursor-pointer transition-shadow hover:shadow-cyan-500/25 group"
                >
                  <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                    <img
                      src={currentData.bottomLeftImage.url}
                      alt={currentData.bottomLeftImage.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-xs text-white font-medium drop-shadow truncate">
                        {currentData.bottomLeftImage.caption}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* PHOTO 4 (Bottom Right Card): Tilted right */}
                <motion.div
                  key={`br-${activeTabKey}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 2, zIndex: 40 }}
                  onClick={() =>
                    onOpenLightbox?.(currentData.bottomRightImage.url, 3)
                  }
                  className="absolute right-[2%] sm:right-[4%] bottom-[0%] w-[54%] sm:w-[52%] aspect-[4/3.1] bg-white p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] border-[5px] sm:border-[8px] border-white rotate-4 z-20 cursor-pointer transition-shadow hover:shadow-cyan-500/25 group"
                >
                  <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative">
                    <img
                      src={currentData.bottomRightImage.url}
                      alt={currentData.bottomRightImage.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-xs text-white font-medium drop-shadow truncate">
                        {currentData.bottomRightImage.caption}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: Editorial Content matching the exact reference design */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              {/* Tagline with accent bar */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2.5px] bg-cyan-400 rounded-full" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                  {currentData.tagline}
                </span>
              </div>

              {/* Title with two-tone accent */}
              <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-archivo font-black tracking-tight leading-[1.1] text-white">
                {currentData.titlePart1}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
                  {currentData.titleHighlight}
                </span>
              </h2>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                {currentData.description}
              </p>

              {/* 3 Circular Feature Badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
                {currentData.badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-cyan-400/40 bg-cyan-950/70 flex items-center justify-center text-cyan-300 shadow-md flex-shrink-0">
                      {renderBadgeIcon(badge.icon)}
                    </div>
                    <div className="leading-tight text-xs sm:text-sm font-semibold text-slate-200">
                      <div>{badge.line1}</div>
                      <div>{badge.line2}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Callout Card */}
              <div
                onClick={() => onOpenBooking?.(`About Us inquiry: ${currentData.pillLabel}`)}
                className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/95 hover:border-cyan-400/60 transition-all duration-300 shadow-lg group backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {currentData.calloutTitle}
                    </h4>
                    <p className="text-xs text-slate-300/80 font-normal">
                      {currentData.calloutSubtitle}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-xs font-semibold text-cyan-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  {currentData.calloutAction} &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};
