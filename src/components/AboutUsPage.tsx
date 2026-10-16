import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Star,
  Quote,
  CheckCircle2,
  Heart,
  Award,
  ShieldCheck,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
} from 'lucide-react';
import { Destination } from '../types';
import { AboutUsSection } from './AboutUsSection';
import { LaliLogo } from './LaliLogo';

interface AboutUsPageProps {
  onOpenLightbox: (imageUrl: string, index: number, dest?: Destination) => void;
  onOpenBooking: (notes?: string) => void;
  onNavigateHome: () => void;
  onNavigateTours: () => void;
  onNavigateDestinations: () => void;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  countryFlag: string;
  category: 'couples' | 'wildlife' | 'family' | 'culture';
  tourName: string;
  duration: string;
  travelDate: string;
  avatar: string;
  rating: number;
  guideMentioned: string;
  headline: string;
  review: string;
  highlights: string[];
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Charlotte & Oliver Hughes',
    location: 'London, United Kingdom',
    countryFlag: '🇬🇧',
    category: 'couples',
    tourName: '14-Day Complete Island Odyssey',
    duration: '14 Days',
    travelDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Kamal (Senior Chauffeur-Guide)',
    headline: '“The trip of a lifetime. Seamless from touchdown to takeoff!”',
    review:
      'We booked our honeymoon with Lali Ceylon Tours and it exceeded every expectation. From private 1st-class seats on the misty Ella train to champagne at sunrise overlooking Sigiriya, every single detail was flawlessly executed. Our chauffeur Kamal felt like family by day two—he knew every scenic backroad, the best fresh hopper stalls, and shielded us from any hassle.',
    highlights: ['Sigiriya Sunrise Climb', 'Nine Arch Bridge Train', 'Luxury Yala Safari Tent'],
  },
  {
    id: 't2',
    name: 'Julian & Elena Weber',
    location: 'Munich, Germany',
    countryFlag: '🇩🇪',
    category: 'wildlife',
    tourName: 'Wild Ceylon & Marine Giants Safari',
    duration: '8 Days',
    travelDate: 'March 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Dilantha (Wildlife Naturalist)',
    headline: '“Three leopard sightings in Yala and blue whales off Mirissa!”',
    review:
      'As wildlife photographers, we wanted an authentic safari experience with real tracking expertise. Lali Ceylon Tours provided a dedicated 4x4 with an exceptional naturalist who respected the wildlife. We observed a mother leopard and cub lounging on a rock for over 45 minutes, plus a herd of 80+ wild elephants. Highly recommend their private wildlife circuit!',
    highlights: ['Leopards of Yala Block 1', 'Blue Whale Encounter in Mirissa', 'Eco-Canvas Glamping'],
  },
  {
    id: 't3',
    name: 'The Harrison Family (Mark, Sarah & 2 kids)',
    location: 'Sydney, Australia',
    countryFlag: '🇦🇺',
    category: 'family',
    tourName: '10-Day Culture, Mountains & Southern Coast',
    duration: '10 Days',
    travelDate: 'December 2023',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Rohan (Family Specialist Driver)',
    headline: '“Remarkably kid-friendly, relaxing, and endlessly educational.”',
    review:
      'Traveling with a 7 and 10-year-old can be daunting, but Rohan and the Lali Ceylon team made it stress-free. The vehicle was spotless with baby wipes, cold bottled water, and child-friendly pacing. The kids still talk about feeding baby sea turtles at Kosgoda and plucking Ceylon tea leaves in Nuwara Eliya. 10 out of 10 service.',
    highlights: ['Kosgoda Turtle Sanctuary', 'Tea Plucking Masterclass', 'Galle Fort Ramparts Bike Ride'],
  },
  {
    id: 't4',
    name: 'Marc & Isabelle Dupont',
    location: 'Zurich, Switzerland',
    countryFlag: '🇨🇭',
    category: 'culture',
    tourName: 'The Golden Classic Circuit',
    duration: '7 Days',
    travelDate: 'February 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Nimal (Cultural Triangle Historian)',
    headline: '“Deep cultural reverence and magnificent colonial stays.”',
    review:
      'We appreciate slow travel and rich history. Our guide Nimal was an archaeologist at heart—his explanations of the ancient hydraulic water gardens of Sigiriya and the sacred Buddhist relics of Kandy brought the ancient kingdom to life. The boutique heritage hotels chosen by Lali Ceylon Tours were pure perfection.',
    highlights: ['Temple of the Tooth Relic', 'Dambulla Cave Frescoes', 'Heritage Tea Estate Bungalow'],
  },
  {
    id: 't5',
    name: 'David K. Reynolds',
    location: 'San Francisco, USA',
    countryFlag: '🇺🇸',
    category: 'wildlife',
    tourName: 'Northern Secrets & Untouched East Expedition',
    duration: '11 Days',
    travelDate: 'November 2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Pradeep & Local Tamil Guides',
    headline: '“Unbelievable Jaffna crab feasts and pristine coral reefs!”',
    review:
      'I wanted to see parts of Sri Lanka that most tourists skip. Jaffna and Delft Island were mesmerizing—coral-walled homesteads and wild horses. Then we snorkeled with blacktip reef sharks in turquoise waters at Pigeon Island with zero crowds. Lali Ceylon Tours has legitimate on-the-ground connections across the entire island.',
    highlights: ['Delft Island Wild Ponies', 'Pigeon Island Shark Snorkeling', 'Jaffna Crab Curry Feast'],
  },
  {
    id: 't6',
    name: 'Priya & Sanjay Patel',
    location: 'Singapore',
    countryFlag: '🇸🇬',
    category: 'couples',
    tourName: 'Ceylon Tea Country & Coastal Wellness',
    duration: '10 Days',
    travelDate: 'October 2023',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    guideMentioned: 'Anura (Senior Chauffeur)',
    headline: '“Rejuvenating Ayurveda, misty reservoirs, and pure serenity.”',
    review:
      'After a stressful year in Singapore, this wellness itinerary was exactly what we needed. Waking up to mist rolling over Castlereagh reservoir in Hatton, sipping artisan white tea, and concluding with 4 days of authentic Panchakarma treatments in Tangalle. The private transfers were whisper-quiet and luxurious.',
    highlights: ['Castlereagh Reservoir Kayaking', 'Tangalle Ocean Ayurveda', 'Single-Estate Tea Tasting'],
  },
];

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenLightbox,
  onOpenBooking,
  onNavigateHome,
  onNavigateTours,
  onNavigateDestinations,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTestimonials = TESTIMONIALS.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#021420] text-white pt-24 sm:pt-28 pb-20 relative overflow-hidden touch-pan-y">
      {/* Canyon & Bathymetric Ambient Background - desktop hardware accelerated */}
      <div
        className="hidden md:block fixed inset-0 pointer-events-none opacity-40 mix-blend-screen gpu-layer"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 20%, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.1) 45%, rgba(2, 20, 32, 0.95) 85%, #021420 100%)',
        }}
      />
      <div
        className="hidden md:block fixed inset-0 pointer-events-none opacity-20 gpu-layer"
        style={{
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto pt-6 pb-12 sm:pb-16 flex flex-col items-center">
          {/* Official Island Logo */}
          <div className="mb-6 scale-90 sm:scale-100">
            <LaliLogo variant="full" theme="dark" showTagline={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#072c40] text-[#38bdf8] text-xs font-bold tracking-widest uppercase border border-[#0ea5e9]/40 shadow-[0_0_20px_rgba(14,165,233,0.3)] mb-4">
            <Compass className="w-4 h-4 text-[#38bdf8] animate-spin-slow" />
            Lali Ceylon Tours · Native Island Storytellers
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-archivo font-extrabold text-white tracking-tight leading-[1.1]">
            Born From Serendipity,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200 bg-clip-text text-transparent">
              Dedicated To Your Journey
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            We are native Sri Lankan travel architects, certified wildlife naturalists, and seasoned chauffeur-guides committed to delivering authentic, private, and ethically crafted island expeditions.
          </p>

          {/* Core Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs text-cyan-200/90 font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/25 backdrop-blur-md flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Government-Licensed Chauffeur Guides
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/25 backdrop-blur-md flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-cyan-400" /> 100% Bespoke Private Travel
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/25 backdrop-blur-md flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" /> 12+ Years Island Hospitality
            </span>
          </div>

          {/* Quick Breadcrumbs / Jump Links */}
          <div className="flex items-center justify-center gap-4 mt-8 text-xs text-slate-400">
            <button
              onClick={onNavigateHome}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={onNavigateTours}
              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Browse Tours
            </button>
            <span>/</span>
            <button
              onClick={onNavigateDestinations}
              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Explore Destinations
            </button>
          </div>
        </div>

        {/* 1. THE COMPLETE ABOUT US SECTION (Exact structure, tabs, photo collage & story) */}
        <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30">
          <AboutUsSection
            onOpenLightbox={onOpenLightbox}
            onOpenBooking={onOpenBooking}
          />
        </div>

        {/* 2. REAL TRAVELER TESTIMONIALS SECTION */}
        <div id="testimonials" className="mt-20 scroll-mt-28">
          {/* Testimonials Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#072c40] text-[#38bdf8] text-xs font-bold tracking-widest uppercase border border-[#0ea5e9]/40 mb-3 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-[#38bdf8]" />
              Verified Guest Stories & Reviews
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-archivo font-extrabold text-white tracking-tight">
              Loved by Travelers From Around the World
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Read firsthand accounts from couples, families, and solo adventurers who explored Sri Lanka with Lali Ceylon Tours.
            </p>

            {/* Overall Rating Badge */}
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/80 border border-amber-400/40 shadow-lg shadow-amber-400/10 backdrop-blur-md">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">
                4.98 / 5.0 Rating
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">
                · Based on 420+ Verified Client Reviews
              </span>
            </div>

            {/* Testimonials Filter Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'couples', label: 'Couples & Honeymoons' },
                { id: 'wildlife', label: 'Wildlife & Safaris' },
                { id: 'family', label: 'Family Journeys' },
                { id: 'culture', label: 'Culture & Heritage' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_16px_rgba(6,182,212,0.6)] font-bold'
                      : 'bg-slate-900/70 text-slate-300 border border-cyan-500/20 hover:border-cyan-400/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTestimonials.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#031d2e]/80 border border-cyan-500/25 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-cyan-400/50 transition-colors"
              >
                <div>
                  {/* Top Bar: Stars + Country Flag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xl" title={item.location}>
                      {item.countryFlag}
                    </span>
                  </div>

                  {/* Headline Quote */}
                  <h3 className="text-base sm:text-lg font-archivo font-bold text-white tracking-tight mb-3">
                    {item.headline}
                  </h3>

                  {/* Review Text */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-5">
                    {item.review}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/25 text-[10px] font-medium"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Traveler Info & Guide Mention */}
                <div className="pt-4 border-t border-cyan-500/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-cyan-400/50"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{item.location}</p>
                    </div>
                  </div>

                  {/* Tour and Guide Tag */}
                  <div className="text-[11px] text-cyan-200/90 font-mono bg-slate-900/60 p-2 rounded-xl border border-cyan-500/15 space-y-0.5">
                    <div className="text-cyan-400 font-bold truncate">
                      {item.tourName} ({item.duration})
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      Guided by: <span className="text-slate-200">{item.guideMentioned}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-16 p-8 rounded-3xl bg-slate-900/70 border border-cyan-500/25 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-archivo">
                99.4%
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Five-Star Reviews
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-archivo">
                12+
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Years of Excellence
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-archivo">
                100%
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Private & Bespoke
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-archivo">
                24/7
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                On-Island Concierge
              </div>
            </div>
          </div>

          {/* Bottom Action Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#07243a] via-[#093554] to-[#07243a] border border-cyan-400/40 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold tracking-widest uppercase">
                Start Your Story
              </span>
              <h3 className="text-2xl sm:text-4xl font-archivo font-extrabold text-white">
                Ready to Experience Sri Lanka with Us?
              </h3>
              <p className="text-sm text-slate-300">
                Contact our local travel architects today for a complimentary itinerary consultation tailored to your dreams and schedule.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onOpenBooking('About Us & Testimonials Inquiry')}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black text-xs uppercase tracking-widest shadow-[0_0_24px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                >
                  Book Your Journey
                </button>
                <button
                  onClick={onNavigateTours}
                  className="px-6 py-3 rounded-full border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-300 text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  View Curated Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
