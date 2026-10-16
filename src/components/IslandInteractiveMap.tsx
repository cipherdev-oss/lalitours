import React, { useState } from 'react';
import { WaveDivider } from './WaveDivider';
import {
  MapPin,
  Compass,
  Calendar,
  Sparkles,
  Navigation,
  ArrowRight,
  X,
  Route,
  Clock,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import {
  REAL_SRI_LANKA_PROVINCES,
  ELEVATION_MASSIF_PATH,
  ELEVATION_HIGH_PEAKS_PATH,
  SIGNATURE_TRAVEL_ROUTES,
  MapTravelRoute,
} from '../data/sriLankaRealMapData';

export interface MapLocation {
  id: string;
  name: string;
  region: string;
  category: 'Highlands' | 'Coast' | 'Heritage' | 'Wilderness' | 'North';
  x: number; // percentage coordinate 0-100 on real map projection
  y: number; // percentage coordinate 0-100 on real map projection
  svgX: number; // in 600x880 viewBox
  svgY: number; // in 600x880 viewBox
  shortStory: string;
  photo: string;
  experiences: string[];
  bestTime: string;
  nearby: string[];
}

const LOCATIONS: MapLocation[] = [
  {
    id: 'jaffna',
    name: 'Jaffna',
    region: 'Northern Peninsula',
    category: 'North',
    x: 27.6,
    y: 9.6,
    svgX: 165.3,
    svgY: 84.8,
    shortStory:
      'A world unto itself of golden Hindu gopurams, vibrant blue sea lagoons, crab curries infused with roasted spices, and resilient timeless warmth.',
    photo: '/img/map/jaffna-nallur-temple.webp',
    experiences: [
      'Nallur Kandaswamy Temple rituals',
      'Ferry to remote Delft Island wild horses',
      'Authentic Jaffna fiery crab feast',
    ],
    bestTime: 'January to September (Dry & Sunny)',
    nearby: ['Delft Island', 'Point Pedro', 'Nagadeepa'],
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura',
    region: 'North Central',
    category: 'Heritage',
    x: 40.3,
    y: 39.6,
    svgX: 241.8,
    svgY: 348.8,
    shortStory:
      'The sacred 2,500-year-old kingdom where giant white brick stupas kiss the sky and the oldest documented tree on Earth still flourishes.',
    photo: '/img/experiences/ancient-stupa.webp',
    experiences: [
      'Dawn meditation beneath Jaya Sri Maha Bodhi',
      'Cycling past Ruwanwelisaya stupa',
      'Exploring ancient monastic stone baths',
    ],
    bestTime: 'May to September & December to March',
    nearby: ['Mihintale', 'Wilpattu National Park'],
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    region: 'Eastern Shore',
    category: 'Coast',
    x: 67.6,
    y: 33.9,
    svgX: 405.5,
    svgY: 298.7,
    shortStory:
      'One of the world’s finest natural deep-water harbors, with dramatic ocean-cliff Hindu shrines and powdery white shores bordering turquoise bays.',
    photo: '/img/map/trincomalee-koneswaram.webp',
    experiences: [
      'Koneswaram Temple cliff-top sunset',
      'Snorkeling Pigeon Island coral reefs',
      'Blue whale & spinner dolphin boat charters',
    ],
    bestTime: 'March to October (Calm seas & sun)',
    nearby: ['Nilaveli Beach', 'Pigeon Island', 'Marble Beach'],
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    region: 'Cultural Triangle',
    category: 'Heritage',
    x: 52.0,
    y: 48.2,
    svgX: 312.2,
    svgY: 424.1,
    shortStory:
      'The legendary Lion Rock rising 200 meters above emerald jungle canopies, harboring 5th-century frescoes, water gardens, and royal genius.',
    photo: '/img/sigiriya.webp',
    experiences: [
      'Sunrise ascent up the sheer monolith',
      'Panoramic view from Pidurangala rock',
      'Sunset elephant safaris at Minneriya tank',
    ],
    bestTime: 'Year-round; mornings and sunsets best',
    nearby: ['Pidurangala', 'Dambulla Cave Temple', 'Minneriya'],
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa',
    region: 'Cultural Triangle',
    category: 'Heritage',
    x: 60.0,
    y: 48.6,
    svgX: 360.0,
    svgY: 427.5,
    shortStory:
      'The medieval capital where colossal Buddha statues were carved directly from single granite rock faces, framed by whispering ancient trees.',
    photo: '/img/map/polonnaruwa-gal-vihara.webp',
    experiences: [
      'Gal Vihara granite rock sculptures',
      'Cycling the ancient Royal Palace ruins',
      'Parakrama Samudra inland sea at twilight',
    ],
    bestTime: 'January to April & June to September',
    nearby: ['Sigiriya', 'Minneriya', 'Wasgamuwa'],
  },
  {
    id: 'kandy',
    name: 'Kandy',
    region: 'Central Foothills',
    category: 'Heritage',
    x: 47.9,
    y: 63.3,
    svgX: 287.6,
    svgY: 556.7,
    shortStory:
      'The sacred hill citadel wrapped around a misty lake, sanctuary of the sacred Tooth Relic and heart of vibrant Kandyan drum rhythms.',
    photo: '/img/kandy.webp',
    experiences: [
      'Evening drum ritual at Temple of the Tooth',
      'Peradeniya Royal Botanical Gardens giant palms',
      'Trek into Knuckles mountain cloud forest',
    ],
    bestTime: 'December to April & July/August (Esala Perahera)',
    nearby: ['Knuckles Range', 'Pinnawala', 'Nuwara Eliya'],
  },
  {
    id: 'colombo',
    name: 'Colombo',
    region: 'Western Province',
    category: 'Coast',
    x: 22.5,
    y: 71.5,
    svgX: 134.9,
    svgY: 629.1,
    shortStory:
      'A lively Indian Ocean capital where Galle Face Green’s open waterfront, the historic Fort district, and a modern skyline meet.',
    photo: '/img/map/colombo-skyline.webp',
    experiences: [
      'Street food tasting on Galle Face Green at dusk',
      'Pettah sensory floating bazaar exploration',
      'Dinner at Ministry of Crab in Old Dutch Hospital',
    ],
    bestTime: 'November to April (Pleasant coastal breezes)',
    nearby: ['Negombo', 'Mount Lavinia', 'Kalutara'],
  },
  {
    id: 'nuwara_eliya',
    name: 'Nuwara Eliya',
    region: 'Central Highlands',
    category: 'Highlands',
    x: 52.8,
    y: 70.5,
    svgX: 316.6,
    svgY: 620.8,
    shortStory:
      'Misty green valleys, cascading silver waterfalls, Tudor-style cottages, and the world’s most pristine high-grown Ceylon tea estates.',
    photo: '/img/n.webp',
    experiences: [
      'Single-estate tea factory plucking tour',
      'Dawn trek across Hortons Plains & Worlds End',
      'Boating on mist-covered Gregory Lake',
    ],
    bestTime: 'February to May (Clear skies & blooming flora)',
    nearby: ['Horton Plains', 'Adam’s Peak', 'Ella'],
  },
  {
    id: 'ella',
    name: 'Ella',
    region: 'Highlands',
    category: 'Highlands',
    x: 61.4,
    y: 72.9,
    svgX: 368.6,
    svgY: 641.3,
    shortStory:
      'A bohemian mountain gap town blessed with dramatic gorges, forest hiking trails, and the world-famous Nine Arch stone railway bridge.',
    photo: '/img/9.webp',
    experiences: [
      'Watching the blue train cross Nine Arch Bridge',
      'Hiking Little Adams Peak at dawn',
      'Swimming beneath Ravana Waterfall spray',
    ],
    bestTime: 'January to May (Sunny days & lush hiking)',
    nearby: ['Nuwara Eliya', 'Haputale (Lipton’s Seat)', 'Yala'],
  },
  {
    id: 'arugam_bay',
    name: 'Arugam Bay',
    region: 'East Coast',
    category: 'Coast',
    x: 87.1,
    y: 73.4,
    svgX: 522.9,
    svgY: 646.0,
    shortStory:
      'A laid-back surf paradise where untamed coastline meets wild lagoons, elephant corridors, and legendary Indian Ocean point breaks.',
    photo: '/img/experiences/arugam-bay-surf.webp',
    experiences: [
      'Surfing Main Point and Whiskey Point breaks',
      'Kumana National Park bird & leopard safari',
      'Sunset lagoon boat safari with wild elephants',
    ],
    bestTime: 'May to October (Peak surf season)',
    nearby: ['Kumana National Park', 'Pottuvil Lagoon', 'Panama Beach'],
  },
  {
    id: 'yala',
    name: 'Yala',
    region: 'Southeast Wilderness',
    category: 'Wilderness',
    x: 77.0,
    y: 84.1,
    svgX: 462.1,
    svgY: 740.0,
    shortStory:
      'Dry-zone scrub, rocky outcrops, and coastal lagoons make Yala one of Sri Lanka’s best-known habitats for leopards and elephants.',
    photo: '/img/yala.jpg',
    experiences: [
      'Dawn 4x4 open safari for wild leopards',
      'Sloth bear and crocodile tracking',
      'Stargazing at a luxury eco safari camp',
    ],
    bestTime: 'February to June (Best leopard sightings)',
    nearby: ['Bundala National Park', 'Kataragama Shrine', 'Kirinda'],
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    region: 'South Coast',
    category: 'Coast',
    x: 42.1,
    y: 93.6,
    svgX: 252.5,
    svgY: 824.0,
    shortStory:
      'A golden crescent beach town famous for playful ocean waves, swaying palm headlands, and deep oceanic trenches where blue whales cruise.',
    photo: '/img/mirissa.webp',
    experiences: [
      'Blue Whale boat expedition at sunrise',
      'Sunset drinks atop Coconut Tree Hill',
      'Surfing gentle breaks and snorkeling with turtles',
    ],
    bestTime: 'November to April (Calm ocean & whale season)',
    nearby: ['Weligama Bay', 'Matara', 'Galle'],
  },
  {
    id: 'galle',
    name: 'Galle Fort',
    region: 'Southwest Coast',
    category: 'Heritage',
    x: 34.2,
    y: 91.7,
    svgX: 205.1,
    svgY: 807.1,
    shortStory:
      'A living 17th-century UNESCO World Heritage sea fortress where Dutch colonial villas house boutique hotels, spice shops, and gelato parlors.',
    photo: '/img/galle.jpg',
    experiences: [
      'Walking the ocean ramparts at golden hour',
      'Shopping cinnamon, sapphires, and linen',
      'Sunset cocktails overlooking Galle Lighthouse',
    ],
    bestTime: 'October to April (Warm sea breeze & clear skies)',
    nearby: ['Unawatuna', 'Hikkaduwa', 'Mirissa'],
  },
];

interface IslandInteractiveMapProps {
  onOpenBooking?: (locName?: string) => void;
  hideWaveDivider?: boolean;
}

export const IslandInteractiveMap: React.FC<IslandInteractiveMapProps> = ({
  onOpenBooking,
  hideWaveDivider = false,
}) => {
  const [selectedId, setSelectedId] = useState<string>('ella');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedId) || LOCATIONS[0];
  const activeRoute = SIGNATURE_TRAVEL_ROUTES.find((r) => r.id === activeRouteId) || null;

  const categories = ['All', 'Highlands', 'Coast', 'Heritage', 'Wilderness', 'North'];

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (activeRoute) {
      return activeRoute.stops.includes(loc.name);
    }
    if (activeFilter === 'All') return true;
    return loc.category === activeFilter;
  });

  return (
    <section
      id="island-map"
      className="w-full py-20 sm:py-28 bg-gradient-to-b from-[#0b2438] via-[#0d2e46] to-[#0a2033] text-slate-100 relative overflow-hidden section-lazy touch-pan-y"
    >
      {/* Ambient map aura - visible on larger screens to avoid mobile GPU fillrate choke */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none gpu-layer" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none gpu-layer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
            Official Geographic Survey Map
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold tracking-tight text-white uppercase">
            EXPLORE THE ISLAND, POINT BY POINT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Real surveyed geography of Sri Lanka. From the arid palmyrah lagoons of Jaffna down to the southern whale waters of Mirissa, explore every iconic realm and curated travel route.
          </p>

          {/* Mode Switchers: Categories or Travel Route Circuits */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#071929]/90 border border-cyan-500/30 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 px-2 flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" /> Realms:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setActiveRouteId(null);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    activeFilter === cat && activeRouteId === null
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Travel Route Circuits Toggle (Like Pinterest Guide Map) */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#071929]/90 border border-amber-500/30 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 px-2 flex items-center gap-1">
                <Route className="w-3 h-3 text-amber-400" /> Circuits:
              </span>
              {SIGNATURE_TRAVEL_ROUTES.map((route) => (
                <button
                  key={route.id}
                  onClick={() => {
                    if (activeRouteId === route.id) {
                      setActiveRouteId(null);
                    } else {
                      setActiveRouteId(route.id);
                      // Select first stop of this route
                      const firstLoc = LOCATIONS.find((l) => l.name === route.stops[0]);
                      if (firstLoc) setSelectedId(firstLoc.id);
                    }
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    activeRouteId === route.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/25'
                      : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-500/10'
                  }`}
                >
                  <span>{route.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75 font-mono">({route.days})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map & Destination Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Authentic Real Sri Lankan SVG Map */}
          <div className="lg:col-span-6 bg-[#081d2f]/95 rounded-3xl p-5 sm:p-7 border border-cyan-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs uppercase tracking-widest text-slate-300 font-mono font-semibold">
                  SRI LANKA (CEYLON) · 65,610 KM²
                </span>
              </div>
              <div className="flex items-center gap-3">
                {activeRoute && (
                  <span className="text-[11px] text-amber-300 font-mono font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    <Route className="w-3 h-3 text-amber-400" />
                    {activeRoute.stops.length} Stops Active
                  </span>
                )}
                <span className="text-xs text-cyan-300 font-mono font-bold">
                  {filteredLocations.length} Realms Visible
                </span>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative w-full aspect-[600/880] max-h-[660px] flex items-center justify-center select-none bg-gradient-to-b from-[#051522] via-[#071c2e] to-[#04121d] rounded-2xl border border-cyan-500/25 overflow-hidden p-2 shadow-inner touch-pan-y">
              {/* Cartographic Coordinate Marks */}
              <div className="absolute top-2 left-3 text-[9px] font-mono text-cyan-400/40 pointer-events-none select-none">
                80°E · 9°45'N (POINT PEDRO)
              </div>
              <div className="absolute bottom-2 left-3 text-[9px] font-mono text-cyan-400/40 pointer-events-none select-none">
                80°35'E · 5°55'N (DONDRA HEAD)
              </div>
              <div className="absolute top-2 right-3 text-[9px] font-mono text-cyan-400/40 pointer-events-none select-none">
                INDIAN OCEAN / BAY OF BENGAL
              </div>

              {/* Real Sri Lanka SVG Map */}
              <svg
                viewBox="0 0 600 880"
                className="w-full h-full drop-shadow-[0_15px_35px_rgba(6,182,212,0.3)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Outer ocean glow filter */}
                  <filter id="oceanGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Gradient for district fills */}
                  <linearGradient id="islandLandmassGrad" x1="300" y1="50" x2="300" y2="850" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0a2a44" />
                    <stop offset="40%" stopColor="#0b3858" />
                    <stop offset="70%" stopColor="#0b3d60" />
                    <stop offset="100%" stopColor="#09304e" />
                  </linearGradient>

                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                {/* Ocean depth bathymetry rings surrounding true island geometry */}
                <ellipse cx="300" cy="460" rx="270" ry="410" stroke="#0ea5e9" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="6 6" />
                <ellipse cx="300" cy="460" rx="245" ry="380" stroke="#38bdf8" strokeOpacity="0.18" strokeWidth="1" />
                <ellipse cx="300" cy="460" rx="220" ry="350" stroke="#06b6d4" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" />

                {/* Latitude & Longitude grid lines */}
                <line x1="60" y1="200" x2="540" y2="200" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="60" y1="400" x2="540" y2="400" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="60" y1="600" x2="540" y2="600" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="80" y1="800" x2="520" y2="800" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="200" y1="60" x2="200" y2="840" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />
                <line x1="400" y1="60" x2="400" y2="840" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 4" />

                {/* Real Geographic Provinces & Districts Rendered */}
                <g id="sri-lanka-real-provinces">
                  {REAL_SRI_LANKA_PROVINCES.map((prov) => (
                    <g key={prov.id} className="province-group">
                      {prov.districts.map((dist, dIdx) => (
                        <path
                          key={`${prov.id}-${dist.name}-${dIdx}`}
                          d={dist.path}
                          fill={prov.fillColor}
                          stroke="#38bdf8"
                          strokeWidth="0.8"
                          strokeOpacity="0.45"
                          className="transition-colors duration-300 hover:fill-[#0e4872]"
                        >
                          <title>{dist.name} District ({prov.name})</title>
                        </path>
                      ))}
                    </g>
                  ))}
                </g>

                {/* Central Highlands Elevation Topography Massif (Pidurutalagala, Adams Peak, Ella Gaps) */}
                <path
                  d={ELEVATION_MASSIF_PATH}
                  fill="#0369a1"
                  fillOpacity="0.32"
                  stroke="#38bdf8"
                  strokeWidth="1.2"
                  strokeOpacity="0.65"
                  strokeDasharray="4 3"
                >
                  <title>Central Highland Mountain Massif (&gt; 1,000m)</title>
                </path>
                <path
                  d={ELEVATION_HIGH_PEAKS_PATH}
                  fill="#0284c7"
                  fillOpacity="0.45"
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                  strokeOpacity="0.85"
                >
                  <title>High Mountain Peaks (&gt; 2,000m - Nuwara Eliya &amp; Hortons)</title>
                </path>

                {/* Active Travel Route Spline (Like Pinterest guide route with travel trail) */}
                {activeRoute && (
                  <g id="active-travel-route">
                    {/* Route Background Glow */}
                    <path
                      d={activeRoute.pathD}
                      fill="none"
                      stroke={activeRoute.color}
                      strokeWidth="6"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                    {/* Animated Dashed Route Line */}
                    <path
                      d={activeRoute.pathD}
                      fill="none"
                      stroke={activeRoute.color}
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  </g>
                )}

                {/* Cartographic Compass Rose in South-West Ocean */}
                <g transform="translate(85, 780)">
                  <circle cx="0" cy="0" r="26" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1" fill="#071b2d" fillOpacity="0.6" />
                  <line x1="0" y1="-24" x2="0" y2="24" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
                  <line x1="-24" y1="0" x2="24" y2="0" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
                  <polygon points="0,-24 -5,-8 0,0" fill="#38bdf8" />
                  <polygon points="0,-24 5,-8 0,0" fill="#0284c7" />
                  <polygon points="0,24 -5,8 0,0" fill="#0284c7" />
                  <polygon points="0,24 5,8 0,0" fill="#38bdf8" />
                  <text x="0" y="-28" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">N</text>
                  <text x="0" y="36" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">S</text>
                  <text x="32" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">E</text>
                  <text x="-32" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">W</text>
                </g>

                {/* Scale Bar in North-West Ocean */}
                <g transform="translate(60, 140)">
                  <rect x="0" y="0" width="80" height="4" fill="#38bdf8" fillOpacity="0.8" rx="2" />
                  <line x1="0" y1="-3" x2="0" y2="7" stroke="#38bdf8" strokeWidth="1.5" />
                  <line x1="40" y1="-2" x2="40" y2="6" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
                  <line x1="80" y1="-3" x2="80" y2="7" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="40" y="-6" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    100 KM
                  </text>
                </g>
              </svg>

              {/* Glowing Interactive Location Pins Positioned on Real Survey Coordinates */}
              {LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedId;
                const isVisible = filteredLocations.some((f) => f.id === loc.id);
                const isHovered = loc.id === hoveredLocationId;
                const isRouteStop = activeRoute ? activeRoute.stops.includes(loc.name) : false;
                const routeStopIndex = activeRoute ? activeRoute.stops.indexOf(loc.name) + 1 : 0;

                if (!isVisible) return null;

                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedId(loc.id)}
                    onMouseEnter={() => setHoveredLocationId(loc.id)}
                    onMouseLeave={() => setHoveredLocationId(null)}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    {/* Pulsing radar halo for active/hover */}
                    <div
                      className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-cyan-400/50 animate-ping'
                          : isRouteStop
                          ? 'bg-amber-400/40 animate-ping'
                          : isHovered
                          ? 'bg-cyan-400/30'
                          : 'opacity-0'
                      }`}
                    />

                    {/* Location Pin Head */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg ${
                        isSelected
                          ? 'w-7 h-7 sm:w-8 sm:h-8 bg-cyan-400 text-slate-950 scale-110 ring-4 ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
                          : isRouteStop
                          ? 'w-6 h-6 sm:w-7 sm:h-7 bg-amber-400 text-slate-950 scale-105 ring-2 ring-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.7)]'
                          : 'w-5 h-5 sm:w-6 sm:h-6 bg-[#041a2f] text-cyan-300 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 hover:scale-110'
                      }`}
                    >
                      {activeRoute && isRouteStop ? (
                        <span className="text-[10px] sm:text-xs font-mono font-black">{routeStopIndex}</span>
                      ) : (
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </div>

                    {/* Location Label Badge */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-1 sm:mt-1.5 px-2 py-0.5 rounded-md whitespace-nowrap text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 pointer-events-none ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-md font-extrabold ring-1 ring-cyan-300'
                          : isRouteStop
                          ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                          : 'bg-[#041829]/90 text-cyan-200 border border-cyan-500/40 backdrop-blur-sm group-hover:bg-cyan-900 group-hover:text-white'
                      }`}
                    >
                      {loc.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Circuit Route Legend Footer */}
            {activeRoute && (
              <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-200">{activeRoute.name}</span>
                    <span className="text-slate-400 ml-2">({activeRoute.days})</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenBooking?.(activeRoute.name)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  Book Circuit
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Destination Inspector Card */}
          <div className="lg:col-span-6 bg-[#081d2f]/95 rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 group border border-cyan-500/20">
              <img
                src={selectedLoc.photo}
                alt={selectedLoc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061726] via-[#061726]/40 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-widest shadow-md">
                  {selectedLoc.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 text-cyan-200 text-xs font-medium">
                  {selectedLoc.region}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl sm:text-3xl font-archivo font-extrabold text-white uppercase drop-shadow-md">
                  {selectedLoc.name}
                </h3>
              </div>
            </div>

            {/* Narrative Story */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-6">
              {selectedLoc.shortStory}
            </p>

            {/* Curated Experiences */}
            <div className="mb-6 space-y-2.5">
              <h4 className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Signature Experiences
              </h4>
              <div className="space-y-2">
                {selectedLoc.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Window & Nearby Spots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cyan-500/20 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-1">
                  Optimal Climate Window
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedLoc.bestTime}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-1">
                  Nearby Excursions
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedLoc.nearby.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* CTA: Plan my visit to this location */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenBooking?.(selectedLoc.name)}
                className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-archivo font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/20 transition-all duration-300 cursor-pointer"
              >
                Plan My Journey to {selectedLoc.name}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  // Cycle to next point
                  const currIdx = LOCATIONS.findIndex((l) => l.id === selectedId);
                  const nextLoc = LOCATIONS[(currIdx + 1) % LOCATIONS.length];
                  setSelectedId(nextLoc.id);
                }}
                className="py-3.5 px-5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                Next Realm
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curvy Wave Boundary Under Official Geographic Survey Map / Above Hidden Serendipity */}
      {!hideWaveDivider && (
        <WaveDivider
          position="bottom"
          fill="#040d16"
          variant={2}
          heightClass="h-14 sm:h-20 lg:h-28"
        />
      )}
    </section>
  );
};
