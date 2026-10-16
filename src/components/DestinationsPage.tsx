import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  MapPin,
  ArrowRight,
  Palmtree,
  Mountain,
  Landmark,
  LayoutGrid,
  Sparkles,
  Calendar,
  X,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Destination } from '../types';
import { WaveDivider } from './WaveDivider';

interface DestinationsPageProps {
  destinations: Destination[];
  activeDestination: Destination;
  onSelectDestination: (dest: Destination) => void;
  onOpenLightbox: (imageUrl: string, index: number, dest?: Destination) => void;
  onOpenBookingFor: (destOrNote?: Destination | string) => void;
  onNavigateHome: () => void;
}

// Custom Paw icon for Wildlife
const PawIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <ellipse cx="6.5" cy="8.5" rx="2" ry="2.8" />
    <ellipse cx="11" cy="6" rx="2" ry="3" />
    <ellipse cx="15.5" cy="7" rx="2" ry="3" />
    <ellipse cx="19" cy="10.5" rx="1.8" ry="2.5" />
    <path d="M7 14.5 C7 12 10 11.5 12.5 11.5 C15 11.5 18 12 18 14.5 C18 18 15 20.5 12.5 20.5 C10 20.5 7 18 7 14.5 Z" />
  </svg>
);

// Custom Hiker / Adventure icon
const HikerIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13" cy="4" r="2" />
    <path d="M10 8 L12 14 L15 11 L18 15" />
    <path d="M8 12 L10 8 L13 9" />
    <path d="M9 16 L11 21" />
    <path d="M14 16 L16 22" />
    <path d="M18 10 L19 22" />
  </svg>
);

export type CategoryFilter = 'all' | 'beach' | 'wildlife' | 'culture' | 'hills' | 'adventure';

export interface ArchPlaceCardData {
  id: string;
  number: string;
  title: string;
  province: string;
  description: string;
  duration: string;
  category: 'beach' | 'wildlife' | 'culture' | 'hills' | 'adventure';
  categoryLabel: string;
  heroImage: string;
  fallbackImage: string;
  highlights: string[];
  bestSeason: string;
}

export const ARCH_DESTINATIONS_DATA: ArchPlaceCardData[] = [
  {
    id: 'mirissa',
    number: '01',
    title: 'Mirissa & South Coast',
    province: 'Southern Province',
    description: 'Golden sands, azure ocean breakers, and leaning coconut palms — serene coastal charm touched by the Indian Ocean.',
    duration: '5 Days / 4 Nights',
    category: 'beach',
    categoryLabel: 'BEACH',
    heroImage: '/img/mirissa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Blue Whale Migrations', 'Coconut Tree Hill Sunset', 'Secret Beach Cove'],
    bestSeason: 'Nov – Apr'
  },
  {
    id: 'sigiriya',
    number: '02',
    title: 'Sigiriya Sky Citadel',
    province: 'Cultural Triangle',
    description: 'Fifth-century royal fortress sculpted atop a 200-meter monolith, adorned with celestial frescoes and water gardens.',
    duration: '4 Days / 3 Nights',
    category: 'culture',
    categoryLabel: 'CULTURE',
    heroImage: '/img/sigiriya.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85',
    highlights: ['UNESCO Sky Monolith', 'Mirror Wall Frescoes', 'Royal Hydraulic Gardens'],
    bestSeason: 'Dec – Apr & Jul – Sep'
  },
  {
    id: 'ella',
    number: '03',
    title: 'Ella & Nine Arch Viaduct',
    province: 'Central Highlands',
    description: 'Misty mountain peaks, lush tea plantations, and the iconic blue train gliding across colonial stone arches.',
    duration: '4 Days / 3 Nights',
    category: 'hills',
    categoryLabel: 'HILLS',
    heroImage: '/img/ella.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=85',
    highlights: ['1921 Stone Viaduct', 'Blue Train Scenic Ride', 'Little Adam’s Peak'],
    bestSeason: 'Dec – May'
  },
  {
    id: 'yala',
    number: '04',
    title: 'Yala National Park Safari',
    province: 'Southern Province',
    description: 'Where wild leopard trails meet sunlit coastal lagoons and majestic Asian elephant herds roam at dawn.',
    duration: '3 Days / 2 Nights',
    category: 'wildlife',
    categoryLabel: 'WILDLIFE',
    heroImage: '/img/yala.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
    highlights: ['High Leopard Density', 'Elephant Family Herds', 'Coastal Dunes & Lagoons'],
    bestSeason: 'Feb – Jul'
  },
  {
    id: 'nuwara-eliya',
    number: '05',
    title: 'Nuwara Eliya Tea Valleys',
    province: 'Central Highlands',
    description: 'Cool mountain breezes, endless emerald tea estates, colonial stone lodges, and cascading highland falls.',
    duration: '3 Days / 2 Nights',
    category: 'hills',
    categoryLabel: 'HILLS',
    heroImage: '/img/nuwara.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Single-Origin Tea Tasting', 'Horton Plains World’s End', 'Alpine Gregory Lake'],
    bestSeason: 'Dec – Apr'
  },
  {
    id: 'galle-fort',
    number: '06',
    title: 'Galle Fort & Ramparts',
    province: 'South Coast',
    description: 'Centuries of living history echoing across Dutch sea bastions, cobblestone lanes, and sunset ocean breezes.',
    duration: '3 Days / 2 Nights',
    category: 'culture',
    categoryLabel: 'CULTURE',
    heroImage: '/img/galle.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Dutch UNESCO Ramparts', 'Galle Lighthouse Sunset', 'Artisan Boutiques & Cafes'],
    bestSeason: 'Oct – Apr'
  },
  {
    id: 'kandy',
    number: '07',
    title: 'Kandy Royal Kingdom',
    province: 'Central Province',
    description: 'Sacred Tooth Relic temple cradled by misty green hills, royal botanical flora, and timeless evening chants.',
    duration: '3 Days / 2 Nights',
    category: 'culture',
    categoryLabel: 'CULTURE',
    heroImage: '/img/kandy.webp',
    fallbackImage: '/img/kandy.jpg',
    highlights: ['Temple of the Tooth', 'Peradeniya Botanical Gardens', 'Kandyan Cultural Dances'],
    bestSeason: 'Jan – Apr & Jul – Sep'
  },
  {
    id: 'trincomalee',
    number: '08',
    title: 'Trincomalee & Pigeon Island',
    province: 'Eastern Province',
    description: 'Powdery white shores, turquoise coral reefs, peaceful coves, and cliffside ocean temples facing the dawn.',
    duration: '4 Days / 3 Nights',
    category: 'beach',
    categoryLabel: 'BEACH',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Pigeon Island Snorkeling', 'Koneswaram Cliff Temple', 'Nilaveli Calm Bay'],
    bestSeason: 'Mar – Oct'
  },
  {
    id: 'arugam-bay',
    number: '09',
    title: 'Arugam Bay Surf Coast',
    province: 'Eastern Province',
    description: 'World-class ocean point breaks, bohemian beach cafes, lagoon wildlife, and golden sunset sand dunes.',
    duration: '4 Days / 3 Nights',
    category: 'adventure',
    categoryLabel: 'ADVENTURE',
    heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85',
    highlights: ['World Surf Championship Breaks', 'Elephant Rock Sunset', 'Kumana National Park'],
    bestSeason: 'May – Sep'
  }
];

// Bottom "More Destinations" horizontal pill items
const MORE_DESTINATIONS = [
  {
    id: 'unawatuna',
    name: 'Unawatuna',
    province: 'Southern Province',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    province: 'Central Highlands',
    image: '/img/nuwara.jpg'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    province: 'Central Province',
    image: '/img/kandy.webp'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    province: 'Eastern Province',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    province: 'Eastern Province',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'jaffna',
    name: 'Jaffna',
    province: 'Northern Province',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=300&q=80'
  }
];

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  destinations: _destinations,
  activeDestination: _activeDestination,
  onSelectDestination: _onSelectDestination,
  onOpenLightbox,
  onOpenBookingFor,
  onNavigateHome: _onNavigateHome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [likedCardIds, setLikedCardIds] = useState<Record<string, boolean>>({});

  // Toggle favorite / wishlist heart
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter destination cards based on category and search query
  const filteredCards = useMemo(() => {
    return ARCH_DESTINATIONS_DATA.filter((card) => {
      const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        card.title.toLowerCase().includes(query) ||
        card.province.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        card.highlights.some((h) => h.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#040e18] text-white overflow-hidden font-sans touch-pan-y">
      {/* =========================================================================
          HERO PANORAMA BACKGROUND
          ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[640px] pointer-events-none select-none overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=75"
          alt="Sri Lanka Coastline Panorama"
          decoding="async"
          className="w-full h-full object-cover object-top filter brightness-[0.72] contrast-[1.08]"
        />
        {/* Atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#031320]/80 via-[#040e18]/85 to-[#040e18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040e18]/90 via-[#040e18]/40 to-transparent" />
        {/* Warm sunset beam overlay on right - desktop only */}
        <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] gpu-layer" />
      </div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 pb-20">
        {/* =========================================================================
            HEADER & SEARCH/FILTER BAR
            ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          {/* Top Left Title */}
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#f5d15c] font-bold mb-2">
              E X P L O R E
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight font-normal leading-[1.08]">
              Sri Lanka’s<br />
              <span className="font-serif italic font-light text-slate-100">Many Worlds</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300/85 max-w-xl leading-relaxed font-light">
              From golden beaches and misty highlands to ancient citadels and wild jungle safaris — discover handpicked destinations that define the wonder of Sri Lanka.
            </p>
          </div>

          {/* Top Right Artistic Script Accent: "One Island Many Worlds" */}
          <div className="hidden lg:block text-right self-start pt-2">
            <span className="font-serif italic text-3xl sm:text-4xl text-amber-200/80 drop-shadow-[0_2px_12px_rgba(245,209,92,0.3)] tracking-wide">
              One Island<br />
              <span className="text-2xl sm:text-3xl text-amber-100/70">Many Worlds</span>
            </span>
          </div>
        </div>

        {/* Filter & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14 pb-5 border-b border-slate-800/80">
          {/* Search Input */}
          <div className="relative w-full md:w-88">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations, provinces, highlights..."
              className="w-full bg-[#051726]/90 border border-cyan-500/30 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-lg backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {/* All */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All</span>
            </button>

            {/* Beach */}
            <button
              onClick={() => setActiveCategory('beach')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'beach'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5 text-amber-300" />
              <span>Beach</span>
            </button>

            {/* Wildlife */}
            <button
              onClick={() => setActiveCategory('wildlife')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'wildlife'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <PawIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>Wildlife</span>
            </button>

            {/* Culture */}
            <button
              onClick={() => setActiveCategory('culture')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'culture'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-300" />
              <span>Culture</span>
            </button>

            {/* Hills */}
            <button
              onClick={() => setActiveCategory('hills')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'hills'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-300" />
              <span>Hills</span>
            </button>

            {/* Adventure */}
            <button
              onClick={() => setActiveCategory('adventure')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'adventure'
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#061726]/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <HikerIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>Adventure</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            ARCH-FRAMED EDITORIAL BOUTIQUE CARDS GRID (Matches image.png)
            3 CARDS IN A ROW · ROMAN VAULTED ARCH WINDOWS · DELICATE TYPOGRAPHY
            ========================================================================= */}
        {filteredCards.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-300">No destinations found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-20">
            {filteredCards.map((card) => {
              const isLiked = !!likedCardIds[card.id];
              return (
                <div
                  key={card.id}
                  className="group relative flex flex-col items-center text-center transition-all duration-500"
                >
                  {/* -------------------------------------------------------------
                      THE ARCHED WINDOW FRAME (Matches exact silhouette of image.png)
                      Delicate outer contour line with inner arched photograph
                      ------------------------------------------------------------- */}
                  <div
                    onClick={() => onOpenLightbox(card.heroImage, 0)}
                    className="relative w-full max-w-[360px] p-2.5 sm:p-3 rounded-t-[170px] sm:rounded-t-[200px] rounded-b-3xl border border-[#d4be9f]/35 hover:border-[#f5d15c]/80 bg-[#061827]/60 backdrop-blur-md transition-all duration-500 hover:shadow-[0_15px_45px_rgba(245,209,92,0.18)] shadow-xl cursor-pointer group-hover:-translate-y-1.5"
                  >
                    {/* Inner Arch Photo Container */}
                    <div className="relative w-full aspect-[3/3.8] rounded-t-[155px] sm:rounded-t-[185px] rounded-b-2xl overflow-hidden shadow-inner bg-[#03101c]">
                      <img
                        src={card.heroImage}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-[0.92] contrast-[1.03]"
                        onError={(e) => {
                          e.currentTarget.src = card.fallbackImage;
                        }}
                      />
                      {/* Atmospheric gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />

                      {/* Top Category Tag Badge */}
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/25 text-white text-[10px] uppercase tracking-widest font-medium shadow-md">
                          {card.category === 'beach' && <Palmtree className="w-3 h-3 text-amber-300" />}
                          {card.category === 'culture' && <Landmark className="w-3 h-3 text-amber-300" />}
                          {card.category === 'hills' && <Mountain className="w-3 h-3 text-amber-300" />}
                          {card.category === 'wildlife' && <PawIcon className="w-3 h-3 text-amber-300" />}
                          {card.category === 'adventure' && <HikerIcon className="w-3 h-3 text-amber-300" />}
                          <span>{card.categoryLabel}</span>
                        </span>
                      </div>

                      {/* Wishlist Heart on top right */}
                      <button
                        type="button"
                        onClick={(e) => toggleLike(card.id, e)}
                        className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md z-10 ${
                          isLiked
                            ? 'bg-rose-500 text-white scale-110 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                            : 'bg-slate-950/60 border border-white/30 text-white/80 hover:text-white hover:border-white'
                        }`}
                        title={isLiked ? 'Saved' : 'Save to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-white' : ''}`} />
                      </button>

                      {/* Best Season Tag on bottom of image */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 text-[10px] font-medium text-amber-200 bg-slate-950/80 backdrop-blur-md border border-amber-300/30 px-3 py-0.5 rounded-full shadow">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        <span>Best: {card.bestSeason}</span>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------------------------------
                      TYPOGRAPHY & DETAILS BELOW ARCH (Exact match to image.png)
                      ------------------------------------------------------------- */}
                  {/* Title in bookish quotation style: «Title» */}
                  <h3 className="font-serif italic text-xl sm:text-2xl text-white font-normal mt-5 group-hover:text-amber-200 transition-colors tracking-wide max-w-[320px]">
                    «{card.title}»
                  </h3>

                  {/* Province line */}
                  <div className="flex items-center justify-center gap-1 text-xs text-amber-300/90 font-light mt-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{card.province}, Sri Lanka</span>
                  </div>

                  {/* Poetic 2-3 line description matching image.png */}
                  <p className="text-xs sm:text-[13px] text-slate-300/85 font-light mt-2.5 line-clamp-2 max-w-[300px] leading-relaxed">
                    {card.description}
                  </p>

                  {/* Duration & Private Journey Badge */}
                  <div className="mt-3.5 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-amber-300/90 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25">
                      {card.duration} · Private Tour
                    </span>
                  </div>

                  {/* Soft Pill Button matching the "купить букет" button in image.png */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenBookingFor(`Inquiry for ${card.title} (${card.province})`);
                      }}
                      className="px-8 py-2.5 rounded-full text-xs font-serif italic tracking-wider text-amber-100 bg-[#c89b6d]/20 hover:bg-[#c89b6d]/40 border border-[#c89b6d]/60 hover:border-[#f5d15c] transition-all shadow-[0_2px_12px_rgba(200,155,109,0.2)] cursor-pointer hover:scale-105 active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            BOTTOM ROW: "More Destinations →"
            ========================================================================= */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Left Title with Circle Arrow */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <h4 className="font-serif text-lg sm:text-xl text-[#f5d15c] font-medium tracking-tight">
              More Destinations
            </h4>
            <div className="w-7 h-7 rounded-full border border-[#f5d15c]/40 text-[#f5d15c] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Right Horizontal Scrolling Destination Pills */}
          <div className="flex items-center gap-3 overflow-x-auto w-full pb-2 scrollbar-none">
            {MORE_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  onOpenBookingFor(`Inquiry for ${dest.name} (${dest.province})`);
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#061928]/80 hover:bg-[#092942] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex-shrink-0 cursor-pointer group text-left"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/40 group-hover:scale-105 transition-transform flex-shrink-0">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>
                <div className="whitespace-nowrap pr-2">
                  <p className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {dest.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {dest.province}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEAMLESS CURVY WAVE BOUNDARY LEADING DIRECTLY INTO THE FOOTER
          ========================================================================= */}
      <WaveDivider
        position="bottom"
        fill="#02070d"
        variant={2}
        heightClass="h-16 sm:h-24 lg:h-32"
      />
    </div>
  );
};
