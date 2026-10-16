import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MapPin,
  ArrowRight,
  Car,
  Train,
  CheckCircle2,
  Tag,
  X,
  Eye,
} from 'lucide-react';
import { WaveDivider } from './WaveDivider';
import { TourDetailModal } from './TourDetailModal';
import { smoothScrollTo } from '../utils/smoothScroll';

interface ToursPageProps {
  onOpenBooking: (notes?: string) => void;
  onNavigateHome: () => void;
  onNavigateDestinations: () => void;
}

export interface StadiumTourPackage {
  id: string;
  title: string;
  duration: string;
  pax: string;
  image: string;
  fallbackImage: string;
  route: string;
  tagline: string;
  highlight: string;
  bestTimeToVisit?: string;
  inclusions: string[];
  notIncluded?: string[];
  stops: {
    days: string;
    place: string;
    focus: string;
  }[];
}

export const STADIUM_TOURS: StadiumTourPackage[] = [
  {
    id: 'cultural-triangle-tour',
    title: 'Cultural Triangle Tour',
    duration: '06Days - 05 Nights',
    pax: '2–4 persons',
    image: '/img/sigiriya.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Sigiriya & Dambulla → Polonnaruwa → Anuradhapura → Kandy',
    tagline: 'Ancient UNESCO Civilizations, Sky Citadel & Sacred Kings',
    highlight: 'Step back in time to discover the fascinating history, ancient civilizations, and cultural treasures of Sri Lanka. Ascend King Kashyapa’s 5th-century Sigiriya sky citadel at dawn, marvel at the Dambulla Cave Temples, explore the royal ruins of Polonnaruwa, pay homage at sacred Anuradhapura, and receive blessings at Kandy’s Temple of the Tooth.',
    bestTimeToVisit: 'Year-round destination with warm, sunny conditions across the central Cultural Triangle.',
    inclusions: [
      'Private air-conditioned vehicle with dedicated English-speaking chauffeur-guide',
      'Door-to-door hotel and Colombo Airport pickup and drop-off',
      'Flexible touring schedule optimized for early morning and golden hour photography',
      'Fuel, highway expressway tolls, parking fees, and driver lodging allowances included'
    ],
    notIncluded: [
      'UNESCO entrance permits (Sigiriya, Dambulla, Polonnaruwa, Anuradhapura)',
      'Hotel accommodations & meals (customizable upon request)',
      'Personal expenses, tips, and international travel insurance'
    ],
    stops: [
      { days: 'Day 1', place: 'Arrival in Colombo', focus: 'Airport pickup, scenic transit to Cultural Triangle hotel & evening relaxation.' },
      { days: 'Day 2', place: 'Sigiriya & Dambulla Caves', focus: 'Climb Lion Rock at dawn, explore mirror wall frescoes & royal golden cave temples.' },
      { days: 'Day 3', place: 'Polonnaruwa Medieval City', focus: 'Royal palaces, lotus baths, ancient reservoirs, and stone-carved Gal Vihara Buddhas.' },
      { days: 'Day 4', place: 'Anuradhapura Sacred Kingdom', focus: 'Ancient Ruwanwelisaya stupa, sacred Sri Maha Bodhi tree & millennia-old stone shrines.' },
      { days: 'Day 5', place: 'Kandy Kingdom Heritage', focus: 'Temple of the Tooth Relic, Peradeniya Royal Botanical Gardens & evening cultural drumming.' },
      { days: 'Day 6', place: 'Spice Gardens & Departure', focus: 'Aromatic Matale spice garden walk, scenic descent & transfer to Colombo Airport.' }
    ]
  },
  {
    id: 'hill-country-tour',
    title: 'Hill Country & Rail Tour',
    duration: '07Days - 06 Nights',
    pax: '2 persons',
    image: '/img/9.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Kandy → Nuwara Eliya → Scenic Train → Ella → Horton Plains',
    tagline: 'Rolling Tea Terraces, Misty Mountains & Iconic 1921 Viaduct',
    highlight: 'Escape to the cool, misty mountains of Sri Lanka’s spectacular hill country. Glide past emerald ravines on the famous blue train, marvel at the Nine Arch Bridge, tour heritage single-origin Ceylon tea factories, hike Little Adam’s Peak, and gaze over the 1,000-meter drop at Horton Plains World’s End.',
    bestTimeToVisit: 'December to April offers clear sunny days; delightful cool highland climate year-round.',
    inclusions: [
      'Private air-conditioned car/van with seasoned mountain chauffeur-guide',
      'Assistance securing reserved seats on the scenic blue train to Ella',
      'Guided Ceylon tea estate masterclass and single-origin tasting session',
      'Flexible stops at cascading waterfalls (Ramboda, St. Clair’s & Ravana Falls)'
    ],
    notIncluded: [
      'Horton Plains National Park entrance ticket',
      'Train ticket fares & hotel accommodation (custom packages available)',
      'Personal expenses and gratuities'
    ],
    stops: [
      { days: 'Day 1', place: 'Arrival in Colombo', focus: 'Airport greeting, drive into lush mountain foothills & Kandy lake walk.' },
      { days: 'Day 2', place: 'Explore Kandy', focus: 'Temple of the Tooth Relic, vibrant spice bazaars & panoramic hill viewpoints.' },
      { days: 'Day 3', place: 'Nuwara Eliya Tea Country', focus: 'Ascent into "Little England", colonial estates, golf course & waterfall photo stops.' },
      { days: 'Day 4', place: 'Nuwara Eliya Exploration', focus: 'Pedro Tea Factory tour, Gregory Lake cruise & fresh highland strawberry farm tasting.' },
      { days: 'Day 5', place: 'Scenic Train Journey to Ella', focus: 'World-renowned blue train voyage through cloud forests; Nine Arch Bridge walk.' },
      { days: 'Day 6', place: 'Horton Plains or Ella Adventure', focus: 'Trek to World’s End precipice or climb Little Adam’s Peak & Ravana gorge.' },
      { days: 'Day 7', place: 'Descent to Coast & Departure', focus: 'Picturesque descent past rubber plantations and transfer to Colombo Airport.' }
    ]
  },
  {
    id: 'southern-beach-tour',
    title: 'Southern Beach Tour',
    duration: '07Days - 06 Nights',
    pax: '2 persons',
    image: '/img/mirissa.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Bentota → Galle Fort → Unawatuna → Mirissa → Tangalle',
    tagline: 'Golden Palm Shores, Azure Waters, Blue Whales & Dutch Bastions',
    highlight: 'Experience the beauty of Sri Lanka’s spectacular southern coastline. Enjoy thrilling water sports in Bentota, stroll the historic cobblestone streets of Galle Fort, swim at pristine Unawatuna bay, encounter majestic Blue Whales in Mirissa, and unwind on tranquil secluded beaches in Tangalle.',
    bestTimeToVisit: 'November to April brings calm sapphire waters, ideal surfing, and peak whale watching.',
    inclusions: [
      'Private modern air-conditioned vehicle with dedicated coastal driver-guide',
      'Expressway transfers to and from Bandaranaike International Airport',
      'Galle Fort historical walking orientation with local insights',
      '24/7 on-island concierge assistance, highway tolls, and fuel included'
    ],
    notIncluded: [
      'Whale watching boat tickets & water sports activity fees',
      'Madu River boat safari entrance & turtle hatchery conservation fee',
      'Hotel accommodation & personal expenses'
    ],
    stops: [
      { days: 'Day 1', place: 'Arrival in Colombo & Bentota', focus: 'Fast expressway transit to golden sands, resort check-in & ocean sunset.' },
      { days: 'Day 2', place: 'Bentota Beach & Mangrove Safari', focus: 'Madu River boat ride through mangrove tunnels, fish therapy & turtle conservation.' },
      { days: 'Day 3', place: 'Galle Fort Living Bastions', focus: 'Walk 17th-century ramparts, white lighthouse, artisan gem shops & colonial cafes.' },
      { days: 'Day 4', place: 'Unawatuna & Jungle Beach', focus: 'Snorkeling over coral reefs, tranquil sheltered bay swimming & seafood dining.' },
      { days: 'Day 5', place: 'Mirissa Blue Whales & Sunset', focus: 'Dawn ocean catamaran safari tracking Blue Whales; sunset at Coconut Tree Hill.' },
      { days: 'Day 6', place: 'Tangalle Secluded Coves', focus: 'Quiet golden beaches, natural sea blowhole & candlelit dining on the sand.' },
      { days: 'Day 7', place: 'Coastal Highway & Departure', focus: 'Smooth expressway return to Colombo or airport transfer for flight home.' }
    ]
  },
  {
    id: 'wildlife-tour',
    title: 'Wildlife Safari Tour',
    duration: '05Days - 04 Nights',
    pax: '2–6 persons',
    image: '/img/e.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Wilpattu / Minneriya → Yala National Park → Udawalawe → Mirissa',
    tagline: 'Over 20 National Parks: Leopards, Elephants, Sloth Bears & Whales',
    highlight: 'Sri Lanka is one of Asia’s top wildlife destinations with unmatched biodiversity. Track elusive leopards across Yala’s granite boulders, witness the great Minneriya elephant gathering, seek sloth bears in Wilpattu, and observe orphaned elephants at Udawalawe Transit Home.',
    bestTimeToVisit: 'Yala: Feb–Jul · Udawalawe: Year-round · Minneriya: Jul–Sep · Wilpattu: Feb–Oct',
    inclusions: [
      'Private air-conditioned vehicle with professional English-speaking wildlife chauffeur',
      'Door-to-door hotel and airport pickup and drop-off',
      'Strategic safari route planning around peak animal sighting hours',
      'Fuel, highway tolls, parking charges, and driver allowances'
    ],
    notIncluded: [
      'National park entry tickets & private 4x4 open-top safari jeep charges',
      'Hotel stays & meals (custom safari lodging packages available)',
      'Travel insurance and personal tips'
    ],
    stops: [
      { days: 'Day 1', place: 'Airport Pickup & Transit', focus: 'Greeting at airport, transfer to wildlife reserve hotel & evening nature briefing.' },
      { days: 'Day 2', place: 'Minneriya / Wilpattu Safari', focus: 'Dawn 4x4 game drive tracking wild elephant herds, sloth bears & wetland birds.' },
      { days: 'Day 3', place: 'Yala National Park Safari', focus: 'Afternoon jeep safari in Yala Block 1 for leopards, spotted deer, and mugger crocodiles.' },
      { days: 'Day 4', place: 'Udawalawe Elephant Sanctuary', focus: 'Visit Udawalawe Elephant Transit Home during feeding hour; coastal transit.' },
      { days: 'Day 5', place: 'Coastal Return & Departure', focus: 'Scenic coastal highway drive, roadside king coconut stops & airport drop-off.' }
    ]
  },
  {
    id: 'honeymoon-tour',
    title: 'Honeymoon / Couple Tour',
    duration: '07Days - 06 Nights',
    pax: 'Couple (2 persons)',
    image: '/img/fort.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Sigiriya → Kandy & Hills → Nuwara Eliya Train → Yala → Mirissa / Bentota',
    tagline: 'Private Romantic Escapes: Intimate Sunsets, Tea Bungalows & Secluded Beaches',
    highlight: 'Begin your new journey together in one of the world’s most romantic island destinations. Tailored for couples: champagne sunrise over Sigiriya, private 1st-class train voyage, colonial fireplace tea bungalows, thrilling private leopard safari, and candlelit seafood dinners set right on ocean sand.',
    bestTimeToVisit: 'Year-round romantic escape; routes dynamically customized for ideal sunny weather.',
    inclusions: [
      'Dedicated private luxury vehicle with discreet English-speaking chauffeur',
      'Warm VIP welcome with fresh tropical garland and chilled king coconuts',
      'Assistance arranging private candlelit dinners, couples spa sessions & train seats',
      'Complete privacy and flexible pacing tailored entirely to the couple'
    ],
    notIncluded: [
      'Couple spa treatments & private candlelit dinner surcharges',
      'Monument entrance permits and safari jeep hire',
      'Hotel accommodations (romantic boutique stays can be pre-arranged)'
    ],
    stops: [
      { days: 'Day 1', place: 'Welcome to Sri Lanka', focus: 'VIP airport greeting, transfer to romantic boutique hideaway & welcome drinks.' },
      { days: 'Day 2', place: 'Sigiriya Sky Citadel', focus: 'Early morning climb of Lion Rock fortress & romantic catamaran cruise across lotus lake.' },
      { days: 'Day 3', place: 'Kandy & Hill Country', focus: 'Temple of the Tooth blessing, panoramic hill viewpoints & misty highland ascent.' },
      { days: 'Day 4', place: 'Nuwara Eliya & Scenic Train', focus: 'Highland high tea, colonial fireplace estate, and scenic blue train journey.' },
      { days: 'Day 5', place: 'Yala Luxury Safari', focus: 'Private open-top 4x4 game safari tracking leopards with sundowner drinks.' },
      { days: 'Day 6', place: 'Mirissa / Bentota Beach', focus: 'Relax on golden sands, optional whale watching & private candlelight dinner on the beach.' },
      { days: 'Day 7', place: 'Departure Transfer', focus: 'Scenic coastal transfer back to Colombo Airport with lifelong romantic memories.' }
    ]
  },
  {
    id: 'family-tour',
    title: 'Family Discovery Tour',
    duration: '08Days - 07 Nights',
    pax: 'Family (3–5 persons / Multi-Gen)',
    image: '/img/e.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Sigiriya → Kandy → Nuwara Eliya → Ella Train → Udawalawe / Yala → Bentota',
    tagline: 'Child-Friendly Pacing: Baby Elephants, Blue Trains, Sea Turtles & Sandy Bays',
    highlight: 'Create unforgettable memories with your loved ones on a family holiday designed for comfort and wonder. Features kid-friendly pacing, feeding orphaned baby elephants at Udawalawe, the exciting blue mountain train ride, feeding sea turtles, and swimming in calm shallow coastal lagoons.',
    bestTimeToVisit: 'Year-round family destination; routes selected for best seasonal sunshine and calm waters.',
    inclusions: [
      'Spacious air-conditioned family van / mini-coach with ample luggage room',
      'Family-specialist English-speaking chauffeur trained in traveling with children',
      'Complimentary child safety seats upon request & flexible rest stops',
      'Assistance booking family-friendly activities, boat safaris & train tickets'
    ],
    notIncluded: [
      'Theme park, sanctuary & monument entrance tickets',
      'Family safari jeep hire & meals',
      'Hotel stays (family suites available on request)'
    ],
    stops: [
      { days: 'Day 1', place: 'Arrival in Sri Lanka', focus: 'Airport pickup, relaxed family check-in & pool time at family-friendly resort.' },
      { days: 'Day 2', place: 'Sigiriya Family Adventure', focus: 'Lion Rock fortress exploration, village cart ride & friendly elephant sightings.' },
      { days: 'Day 3', place: 'Kandy Cultural Wonder', focus: 'Temple of the Tooth, traditional cultural fire dancing & spice gardens.' },
      { days: 'Day 4', place: 'Nuwara Eliya & Strawberries', focus: 'Fresh highland strawberry tasting, Gregory Lake pedal boats & tea factory.' },
      { days: 'Day 5', place: 'Scenic Train to Ella', focus: 'Kids-favorite blue train adventure across the magnificent Nine Arch Bridge.' },
      { days: 'Day 6', place: 'Udawalawe / Yala Safari', focus: 'Feed baby orphan elephants at Transit Home & open-top jeep safari to see elephant families.' },
      { days: 'Day 7', place: 'Bentota Beach & Turtles', focus: 'Baby sea turtle hatchery, mangrove river safari, swimming and beach sandcastles.' },
      { days: 'Day 8', place: 'Colombo & Departure', focus: 'Souvenir shopping, Colombo seaside promenade & airport transfer.' }
    ]
  },
  {
    id: 'adventure-tour',
    title: 'Adventure & Active Tour',
    duration: '08Days - 07 Nights',
    pax: '2–6 persons (Active Travelers)',
    image: '/img/9.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=85',
    route: 'Colombo → Sigiriya → Kitulgala → Nuwara Eliya → Ella → Yala Safari → Mirissa',
    tagline: 'Thrills & Peaks: White Water Rafting, Mountain Treks, Safaris & Surfing',
    highlight: 'Sri Lanka is an island full of adrenaline. Experience thrilling Grade 3/4 white-water rafting on the Kelani River in Kitulgala, scale Pidurangala Rock for sunrise, hike challenging Ella Rock, soar over tea valleys on the Flying Ravana zipline, and ride ocean waves in Weligama.',
    bestTimeToVisit: 'December to April offers ideal conditions for hiking, river rafting, safaris, and surfing.',
    inclusions: [
      'Private rugged air-conditioned vehicle with active adventure chauffeur-guide',
      'Coordination of certified safety equipment and local rafting/hiking guides',
      'Flexible departure times for sunrise summits and morning surf tides',
      'All vehicle fuel, highway tolls, parking, and driver allowances'
    ],
    notIncluded: [
      'White-water rafting and adventure activity entrance fees',
      'Ziplining, surf rental, and national park jeep charges',
      'Hotel accommodations and meals'
    ],
    stops: [
      { days: 'Day 1', place: 'Arrival in Colombo', focus: 'Airport pickup, equipment check & transfer towards the cultural highlands.' },
      { days: 'Day 2', place: 'Pidurangala & Sigiriya Climb', focus: 'Pre-dawn summit of Pidurangala Rock for sunrise panoramic views over Sigiriya.' },
      { days: 'Day 3', place: 'Kitulgala White Water Rafting', focus: 'Thrilling Grade 3 & 4 rafting on Kelani River rapids, stream canyoning & cliff jumping.' },
      { days: 'Day 4', place: 'Nuwara Eliya Mountain Trails', focus: 'Chilly highland trek through cloud forests, waterfalls & tea estate trails.' },
      { days: 'Day 5', place: 'Ella Rock & Flying Ravana', focus: 'Challenging hike up Ella Rock, mega zipline over tea canopies & Nine Arch Bridge.' },
      { days: 'Day 6', place: 'Yala Primal 4x4 Safari', focus: 'Deep wilderness open-top jeep expedition tracking leopards and apex predators.' },
      { days: 'Day 7', place: 'Mirissa Ocean & Surfing', focus: 'Deep-ocean whale encounter followed by afternoon surf lessons at Weligama Bay.' },
      { days: 'Day 8', place: 'Departure Transfer', focus: 'Fast expressway drive back to Colombo Airport.' }
    ]
  },
  {
    id: 'custom-private-tour',
    title: 'Custom Private Tour',
    duration: '08Days - 07 Nights (Flexible)',
    pax: 'Tailored Pax (Solo to Group)',
    image: '/img/n.webp',
    fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    route: 'Fully Customizable Route (Culture, Mountains, Wildlife & Beaches)',
    tagline: 'Your Vision, Your Pace, Your Sri Lanka · 100% Bespoke Private Travel',
    highlight: 'No two travelers are the same, and your journey shouldn’t be either. Whether you wish to relax on golden beaches, explore ancient UNESCO ruins, climb misty mountain ridges, or experience thrilling wildlife safaris, Turtle Lanka and Lali Ceylon Tours design a personalized private tour that matches your interests, schedule, and budget.',
    bestTimeToVisit: 'Year-round flexibility; our team recommends the best route based on your travel dates.',
    inclusions: [
      'Dedicated private air-conditioned vehicle tailored to your party size',
      'Professional, courteous English-speaking chauffeur-guide throughout',
      'Door-to-door hotel and airport pickup and drop-off across Sri Lanka',
      'Complete freedom to adjust pacing, photo stops, and daily itinerary on the go',
      'Fuel, expressway tolls, parking fees, and driver expenses included'
    ],
    notIncluded: [
      'Activity, monument, and safari entrance tickets (payable on arrival or packaged)',
      'Hotel accommodations (can be selected to match your preferred tier)',
      'Personal dining and travel insurance'
    ],
    stops: [
      { days: 'Day 1', place: 'Personalized Welcome', focus: 'Airport pickup & tailored transfer to your chosen starting destination.' },
      { days: 'Day 2', place: 'Cultural Exploration of Choice', focus: 'Ancient cities, sacred temples, or local artisan village workshops.' },
      { days: 'Day 3', place: 'Highland or Wildlife Scenic Transit', focus: 'Misty tea hills, botanical gardens, or tranquil inland lakes.' },
      { days: 'Day 4', place: 'Scenic Train & Mountain Landscapes', focus: 'Reserved train voyages, iconic viaducts, and panoramic viewpoints.' },
      { days: 'Day 5', place: 'National Park Wildlife Safari', focus: 'Leopard, elephant, or marine life safaris tailored to your wildlife interests.' },
      { days: 'Day 6', place: 'Coastal Escape & Ocean Breezes', focus: 'Golden sand beaches, coastal fortresses, seafood dining, or watersports.' },
      { days: 'Day 7', place: 'Relaxation & Local Experiences', focus: 'Ayurvedic wellness massage, spice shopping, or tranquil beach hours.' },
      { days: 'Day 8', place: 'Customized Departure Transfer', focus: 'Smooth transfer to Colombo International Airport according to your flight.' }
    ]
  }
];

export const ToursPage: React.FC<ToursPageProps> = ({
  onOpenBooking,
  onNavigateHome,
  onNavigateDestinations,
}) => {
  // Modal State for Viewing Detailed Itinerary
  const [selectedTour, setSelectedTour] = useState<StadiumTourPackage | null>(null);

  return (
    <div className="min-h-screen bg-[#021321] text-white pt-24 sm:pt-28 pb-20 relative overflow-hidden font-sans">
      {/* Ambient Chasm Crevasse & Oceanic Shaded Lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 mix-blend-screen z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 70% at 50% 25%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.08) 45%, rgba(2, 19, 33, 0.95) 85%, #021321 100%)',
        }}
      />
      <div
        className="hidden md:block fixed inset-0 pointer-events-none opacity-15 z-0 gpu-layer"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Ambient glowing radial orbs - desktop only to avoid mobile fillrate strain */}
      <div className="hidden md:block absolute top-[35%] -left-32 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0 gpu-layer" />
      <div className="hidden md:block absolute top-[65%] -right-32 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none z-0 gpu-layer" />

      {/* =========================================================================
          PROMOTIONAL BANNER SECTION
          Sunny tropical beach with sunbed loungers + 4 Cascading Stadium Cards
          "Attractive Offers!!" Showcase
          ========================================================================= */}
      <section className="relative w-full overflow-hidden touch-pan-y">
        {/* Top Tropical Beach Background with Deck Chairs & Ocean */}
        <div className="absolute top-0 left-0 right-0 h-[460px] sm:h-[520px] lg:h-[580px] overflow-hidden select-none pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=75"
            alt="Sunny Tropical Beach with Wooden Loungers"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
          />
          {/* Subtle warm sunlight overlay and top smooth gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#021321]/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-sky-400/10 pointer-events-none" />
        </div>

        {/* Curving Blue Ocean Wave Graphic Ribbons at Base (Matching image.png) */}
        <div className="absolute bottom-0 left-0 right-0 h-[380px] sm:h-[420px] pointer-events-none z-0">
          {/* Layered oceanic wave curves */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#021321] via-[#0b3c61]/90 to-transparent" />
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-44 text-[#062c47]/80 preserve-3d"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,122.7C840,128,960,192,1080,208C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-32 text-[#021321] opacity-90"
            viewBox="0 0 1440 320"
            fill="currentColor"
          >
            <path d="M0,96L80,117.3C160,139,320,181,480,181.3C640,181,800,139,960,133.3C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-12 sm:pb-16">
          {/* Beautiful Frosted Glass Floating Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-950/50 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/25">
            {/* Left side: Pulsing dot + Island Breadcrumb */}
            <div className="flex items-center gap-2.5 px-2 sm:px-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-amber-300 font-mono">
                  SRI LANKA
                </span>
                <span className="text-white/40 text-xs">/</span>
                <span className="font-semibold text-white/95 tracking-wide">
                  Tour Packages & Special Departures
                </span>
              </div>
            </div>

            {/* Right side: Elegant Pill Action Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={onNavigateDestinations}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-cyan-500/25 text-white hover:text-cyan-200 border border-white/20 hover:border-cyan-400/50 text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer group backdrop-blur-md"
              >
                <span>Destinations</span>
                <span className="text-cyan-300 transition-transform group-hover:translate-x-0.5">→</span>
              </button>
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/15 text-xs font-medium transition-all shadow-sm cursor-pointer backdrop-blur-md"
              >
                <span>Home</span>
              </button>
            </div>
          </div>

          {/* Centered Editorial Section Intro Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#f5d15c] font-bold mb-1.5 drop-shadow">
              E X C L U S I V E   P R O M O T I O N S
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight font-normal drop-shadow-lg">
              Handcrafted Ceylon Tour Packages
            </h1>
            <p className="text-xs text-slate-200/90 font-light mt-1.5 drop-shadow max-w-lg mx-auto">
              All-inclusive private chauffeured tours with boutique stays, safari jeeps, and scenic train voyages.
            </p>
          </div>

          {/* =====================================================================
              THE 4 CASCADING STADIUM CAPSULE CARDS (Exact match to image.png)
              Staggered waterfall diagonal alignment + crisp white pill cards
              ===================================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start pt-4 sm:pt-8 mb-10">
            {STADIUM_TOURS.slice(0, 4).map((pkg, idx) => {
              // Diagonal waterfall offset matching image.png (Card 1 highest, Card 4 lowest)
              const staggerClass =
                idx === 0
                  ? 'lg:translate-y-0'
                  : idx === 1
                  ? 'lg:translate-y-8'
                  : idx === 2
                  ? 'lg:translate-y-16'
                  : 'lg:translate-y-24';

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedTour(pkg)}
                  className={`relative group bg-white text-slate-800 rounded-[55px] sm:rounded-[68px] p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.38)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.55)] border-2 border-white/90 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden ${staggerClass}`}
                >
                  <div>
                    {/* Top Stadium Arch Photo Window */}
                    <div className="relative w-full aspect-[3/4] rounded-t-[48px] sm:rounded-t-[60px] rounded-b-[22px] overflow-hidden bg-slate-100 shadow-inner">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = pkg.fallbackImage;
                        }}
                      />
                      {/* Gentle hover shine */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* View Details Quick Action Badge */}
                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4 text-[#156d8f]" />
                      </div>
                    </div>

                    {/* Bottom Information Card Matching image.png */}
                    <div className="pt-4 pb-3 px-2 flex flex-col items-center text-center">
                      {/* Tour Title in Teal Slab Serif */}
                      <h3 className="font-serif font-bold text-[#146b8c] text-lg sm:text-xl tracking-tight leading-snug group-hover:text-[#0b4d66] transition-colors">
                        {pkg.title}
                      </h3>

                      {/* Duration */}
                      <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-1.5">
                        {pkg.duration}
                      </p>

                      {/* Pax */}
                      <p className="text-xs text-slate-500 font-medium">
                        {pkg.pax}
                      </p>

                      {/* Private Tour Tag */}
                      <div className="mt-3 flex items-center justify-center">
                        <span className="px-3.5 py-1 rounded-full bg-[#146b8c]/10 text-[#146b8c] text-[11px] font-bold uppercase tracking-wider">
                          Private Chauffeur Tour
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Quick Action Button */}
                  <div className="px-2 pb-1 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(`Inquiry for ${pkg.title} (${pkg.duration} · Private Tour)`);
                      }}
                      className="w-full py-2 rounded-full bg-[#146b8c] hover:bg-[#0e4e66] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================================================
              BOTTOM LABELS:
              "Attractive Offers!!" (Left) + "Explore All Tour Packages" (Right)
              ===================================================================== */}
          <div className="relative pt-6 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Big Headline: "Attractive Offers!!" */}
            <div className="text-center md:text-left select-none">
              <span className="block font-archivo font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform -rotate-1 md:-rotate-2">
                Attractive<br />
                <span className="text-cyan-300">Offers!!</span>
              </span>
            </div>

            {/* Right Action Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  smoothScrollTo('#all-tours-showcase', { offset: -70, duration: 1.25 });
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm sm:text-base tracking-wide uppercase shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-950" />
                <span>Explore All Tour Packages</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: COMPLETE TOURS SHOWCASE (ALL 8 PACKAGES IN STADIUM STYLE)
          ========================================================================= */}
      <section id="all-tours-showcase" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#072c40] text-cyan-300 text-xs font-bold tracking-widest uppercase border border-cyan-500/30 mb-3">
            <Compass className="w-4 h-4 text-cyan-400" />
            Signature Ceylon Itineraries
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
            Explore All Handcrafted Tour Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 max-w-xl mx-auto leading-relaxed">
            Every itinerary is fully organized with your private vehicle, certified chauffeur-guide, flexible pacing, and preferred hotel tier.
          </p>
        </div>

        {/* 4-Column Stadium Capsule Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-20">
          {STADIUM_TOURS.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedTour(pkg)}
              className="group bg-white text-slate-800 rounded-[55px] sm:rounded-[65px] p-2.5 sm:p-3 shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-2 border-white/90 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Stadium Arch Photo Window */}
                <div className="relative w-full aspect-[3/4] rounded-t-[48px] sm:rounded-t-[58px] rounded-b-[20px] overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = pkg.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Information Card */}
                <div className="pt-4 pb-3 px-2 flex flex-col items-center text-center">
                  <h3 className="font-serif font-bold text-[#146b8c] text-lg sm:text-xl tracking-tight leading-snug group-hover:text-[#0b4d66] transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-1">
                    {pkg.duration}
                  </p>

                  <p className="text-xs text-slate-500 font-medium">
                    {pkg.pax}
                  </p>

                  <div className="mt-2.5 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-[#146b8c]/10 text-[#146b8c] text-[11px] font-bold uppercase tracking-wider">
                      Private Chauffeur Tour
                    </span>
                  </div>
                </div>
              </div>

              {/* View Itinerary CTA */}
              <div className="px-2 pb-1 pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTour(pkg);
                  }}
                  className="flex-1 py-2 rounded-full border border-slate-300 hover:border-[#146b8c] text-[#146b8c] text-xs font-semibold tracking-wider transition-colors"
                >
                  Itinerary
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking(`Inquiry for ${pkg.title} (${pkg.duration} · Private Tour)`);
                  }}
                  className="flex-1 py-2 rounded-full bg-[#146b8c] hover:bg-[#0e4e66] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>


      </section>

      {/* =========================================================================
          OPTIMISTIC EXPEDITION MODAL (When clicking any stadium card)
          ========================================================================= */}
      <AnimatePresence>
        {selectedTour && (
          <TourDetailModal
            tour={selectedTour}
            allTours={STADIUM_TOURS}
            onClose={() => setSelectedTour(null)}
            onSelectTour={(newTour) => setSelectedTour(newTour)}
            onBookTour={(customNote) => {
              setSelectedTour(null);
              onOpenBooking(customNote);
            }}
          />
        )}
      </AnimatePresence>

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
