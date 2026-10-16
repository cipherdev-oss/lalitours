import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar as CalendarIcon,
  User,
  Users,
  Heart,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  ArrowLeft,
  X,
  ShieldCheck,
  Award,
  Clock,
  Car
} from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { WaveDivider } from './WaveDivider';
import { LaliLogo } from './LaliLogo';
import { BookingReviewModal } from './BookingReviewModal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookTourPageProps {
  initialTour?: string;
  initialNotes?: string;
  onNavigateHome: () => void;
  onNavigateTours: () => void;
  onNavigateDestinations: () => void;
}

export interface TourPackageOption {
  id: string;
  name: string;
  location: string;
  duration: string;
  image: string;
  badge?: string;
}

export const TOUR_PACKAGES: TourPackageOption[] = [
  {
    id: 'cultural-triangle-tour',
    name: 'Cultural Triangle Tour',
    location: 'Sigiriya, Dambulla, Polonnaruwa, Anuradhapura & Kandy',
    duration: '6 Days / 5 Nights',
    image: '/img/sigiriya.webp',
    badge: 'UNESCO Heritage'
  },
  {
    id: 'hill-country-tour',
    name: 'Hill Country & Highland Rail Tour',
    location: 'Kandy, Nuwara Eliya, Scenic Train & Ella',
    duration: '7 Days / 6 Nights',
    image: '/img/9.webp',
    badge: 'Scenic Mountain'
  },
  {
    id: 'southern-beach-tour',
    name: 'Southern Beach Tour',
    location: 'Bentota, Galle Fort, Unawatuna, Mirissa & Tangalle',
    duration: '7 Days / 6 Nights',
    image: '/img/mirissa.webp',
    badge: 'Golden Coast'
  },
  {
    id: 'wildlife-tour',
    name: 'Wildlife Safari Tour',
    location: 'Yala, Udawalawe, Wilpattu & Minneriya',
    duration: '5 Days / 4 Nights',
    image: '/img/e.webp',
    badge: 'Wildlife Focus'
  },
  {
    id: 'honeymoon-tour',
    name: 'Honeymoon & Romantic Couple Tour',
    location: 'Boutique Tea Hills, Luxury Safari & Private Sunset Beaches',
    duration: '7 Days / 6 Nights',
    image: '/img/fort.webp',
    badge: 'Romantic Escapes'
  },
  {
    id: 'family-tour',
    name: 'Family Discovery Tour',
    location: 'Baby Elephants, Trains, Tea Plucking & Safe Calm Beaches',
    duration: '8 Days / 7 Nights',
    image: '/img/e.webp',
    badge: 'Family Favorite'
  },
  {
    id: 'adventure-tour',
    name: 'Adventure & Active Tour',
    location: 'White Water Rafting, Peak Treks, Leopard Jeeps & Surfing',
    duration: '8 Days / 7 Nights',
    image: '/img/9.webp',
    badge: 'Active Adventure'
  },
  {
    id: 'custom-private-tour',
    name: 'Custom Private Tour (100% Tailored)',
    location: 'Your Choice of All Sri Lankan Destinations & Pacing',
    duration: '8 Days / 7 Nights (Flexible)',
    image: '/img/n.webp',
    badge: '100% Bespoke'
  }
];

type TourType = 'Private' | 'Couple' | 'Family' | 'Group';

export const BookTourPage: React.FC<BookTourPageProps> = ({
  initialTour,
  initialNotes,
  onNavigateHome,
  onNavigateTours: _onNavigateTours,
  onNavigateDestinations: _onNavigateDestinations
}) => {
  // Find matching initial tour or default to first package
  const defaultPackage =
    TOUR_PACKAGES.find((p) => p.id === initialTour || (initialTour && p.id.includes(initialTour)) || (initialTour && initialTour.includes(p.id))) ||
    TOUR_PACKAGES[0];
  const [selectedPackage, setSelectedPackage] = useState<TourPackageOption>(defaultPackage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Form State
  const [travelDate, setTravelDate] = useState('2026-12-15');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [tourType, setTourType] = useState<TourType>('Private');

  // Contact Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+94');

  // Review & Confirmation State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isWhatsAppReady, setIsWhatsAppReady] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Sync if initialTour changes
  useEffect(() => {
    if (initialTour) {
      const match = TOUR_PACKAGES.find((p) => p.id === initialTour);
      if (match) setSelectedPackage(match);
    }
  }, [initialTour]);

  // Format date for display: e.g. "15 December 2026"
  const formattedDate = React.useMemo(() => {
    if (!travelDate) return '15 December 2026';
    try {
      const parts = travelDate.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${day} ${monthNames[monthIndex]} ${year}`;
      }
    } catch {
      // Fallback
    }
    return travelDate;
  }, [travelDate]);

  const whatsAppMessage = `Hello Lali Ceylon Tours! I would like to reserve "${selectedPackage.name}" (${selectedPackage.duration}).
Travel Date: ${formattedDate}
Travelers: ${adultsCount} Adults${childrenCount > 0 ? `, ${childrenCount} Children` : ''}
Tour Type: ${tourType}
My Name: ${fullName}
Email: ${email}
Phone: ${countryCode} ${phone}
Additional notes: ${initialNotes?.trim() || 'None'}`;
  const whatsAppUrl = `https://wa.me/94771234567?text=${encodeURIComponent(whatsAppMessage)}`;

  // Validation
  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!fullName.trim()) errors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!phone.trim()) errors.phone = 'Phone / WhatsApp is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsReviewOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsReviewOpen(false);
    setIsWhatsAppReady(true);
    smoothScrollTo(180, { duration: 1.2 });
  };

  return (
    <div className="relative min-h-screen bg-[#040e18] text-white overflow-hidden font-sans touch-pan-y">
      {/* =========================================================================
          HERO PANORAMIC BACKGROUND
          ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[680px] pointer-events-none select-none overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1400&q=75"
          alt="Sri Lanka Coastline Tropical Horizon"
          decoding="async"
          className="w-full h-full object-cover object-top filter brightness-[0.78] contrast-[1.06]"
        />
        {/* Soft atmospheric radial & linear gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#031320]/75 via-[#040e18]/85 to-[#040e18]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040e18]/90 via-[#040e18]/30 to-transparent" />
        <div className="hidden md:block absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] gpu-layer" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-32 pb-24">
        {/* Back navigation button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* =========================================================================
            TOP HEADER (Matches image: "BOOK YOUR TOUR", "Plan Your Ceylon Journey")
            ========================================================================= */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#f5d15c] font-bold mb-2">
              B O O K &nbsp; Y O U R &nbsp; T O U R
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight font-normal leading-[1.08]">
              Plan Your<br />
              <span className="font-serif italic font-light text-slate-100">Ceylon Journey</span>
            </h1>
            <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-300/85 font-light">
              DISCOVER &nbsp;·&nbsp; EXPLORE &nbsp;·&nbsp; EXPERIENCE
            </div>
          </div>

          {/* Official Brand Seal */}
          <div className="hidden sm:block">
            <LaliLogo variant="horizontal" theme="dark" showTagline={true} />
          </div>
        </div>

        {/* =========================================================================
            CONFIRMATION STATE (When Submitted)
            ========================================================================= */}
        {isWhatsAppReady ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto rounded-3xl bg-[#081827]/90 border border-cyan-500/30 p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6"
          >
            {/* Official Stamped Logo in Receipt */}
            <div className="flex justify-center mb-2">
              <LaliLogo variant="mark" className="w-16 h-16" />
            </div>

            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <WhatsAppIcon className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">
                WHATSAPP MESSAGE PREPARED
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mt-2">
                Finish Sending Your Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white font-semibold">{fullName}</strong>. Your inquiry details are ready. Use the button below to open WhatsApp and send them to our team.
              </p>
            </div>

            {/* Quick Summary Pill Card */}
            <div className="bg-[#05131f]/80 rounded-2xl p-4 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-400">
                <span>Selected Route:</span>
                <span className="text-white font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Duration:</span>
                <span className="text-white font-medium">{selectedPackage.duration}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Travelers:</span>
                <span className="text-white font-medium">{adultsCount} Adults{childrenCount > 0 ? `, ${childrenCount} Children` : ''}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tour Style:</span>
                <span className="text-cyan-300 font-medium">{tourType} Tour</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Open WhatsApp Message</span>
              </a>
              <button
                type="button"
                onClick={() => setIsWhatsAppReady(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-300 text-xs tracking-wider transition-colors cursor-pointer"
              >
                Edit Booking Details
              </button>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
              MAIN 2-COLUMN BOOKING CONTAINER (Exact match to Screenshot)
              ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ---------------------------------------------------------------------
                LEFT COLUMN: 1. Trip Details + 2. Your Details Form
                --------------------------------------------------------------------- */}
            <div className="lg:col-span-8 rounded-3xl bg-[#081827]/85 border border-cyan-500/25 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleContinueToReview} className="space-y-8">
                {/* ----------------- SECTION 1: TRIP DETAILS ----------------- */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        1. Trip Details
                      </h2>
                      <p className="text-xs text-slate-400 font-light">
                        Choose your tour and travel date
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Tour Package Dropdown */}
                    <div className="relative">
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Tour Package
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-[#051422]/90 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-2.5 flex items-center justify-between text-left transition-colors cursor-pointer shadow-inner"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={selectedPackage.image}
                            alt={selectedPackage.name}
                            className="w-12 h-10 rounded-xl object-cover flex-shrink-0 border border-white/20 shadow"
                          />
                          <div className="truncate pr-1">
                            <p className="text-xs font-bold text-white truncate">
                              {selectedPackage.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {selectedPackage.location}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Options List */}
                      {isDropdownOpen && (
                        <div
                          data-lenis-prevent
                          data-lenis-prevent-wheel
                          data-lenis-prevent-touch
                          onWheel={(event) => event.stopPropagation()}
                          onTouchMove={(event) => event.stopPropagation()}
                          className="absolute left-0 right-0 top-full mt-2 bg-[#061726] border border-cyan-500/30 rounded-2xl shadow-2xl p-2 z-30 max-h-72 overflow-y-auto overscroll-contain backdrop-blur-xl"
                        >
                          {TOUR_PACKAGES.map((pkg) => (
                            <div
                              key={pkg.id}
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setIsDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                                selectedPackage.id === pkg.id
                                  ? 'bg-cyan-950/70 border border-cyan-400/40 text-cyan-300'
                                  : 'hover:bg-slate-800/60 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={pkg.image}
                                  alt={pkg.name}
                                  className="w-10 h-9 rounded-lg object-cover flex-shrink-0"
                                />
                                <div>
                                  <p className="text-xs font-semibold text-white">{pkg.name}</p>
                                  <p className="text-[10px] text-slate-400">{pkg.location} · {pkg.duration}</p>
                                </div>
                              </div>
                              <span className="text-[11px] font-semibold text-cyan-400 whitespace-nowrap pl-2 uppercase tracking-wide">
                                Private Tour
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Travel Date Picker */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Travel Date
                      </label>
                      <div className="relative">
                        <div className="w-full bg-[#051422]/90 border border-cyan-500/30 rounded-2xl px-4 py-3 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="w-4 h-4 text-cyan-400 pointer-events-none" />
                            <span className="text-xs text-white font-medium">
                              {formattedDate}
                            </span>
                          </div>
                          <input
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                          />
                          <CalendarIcon className="w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Travelers Counter & Tour Type (2 Columns) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {/* Number of Travelers Stepper */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Number of Travelers
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Adults */}
                        <div className="bg-[#051422]/90 border border-cyan-500/30 rounded-2xl px-3 py-2 flex items-center justify-between">
                          <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-cyan-400" />
                            Adults
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-white w-4 text-center">
                              {adultsCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAdultsCount(adultsCount + 1)}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="bg-[#051422]/90 border border-cyan-500/30 rounded-2xl px-3 py-2 flex items-center justify-between">
                          <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-cyan-400" />
                            Children
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-white w-4 text-center">
                              {childrenCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setChildrenCount(childrenCount + 1)}
                              className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tour Type Selector Pills */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Tour Type
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['Private', 'Couple', 'Family', 'Group'] as TourType[]).map((type) => {
                          const isActive = tourType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setTourType(type)}
                              className={`py-2 px-1 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-cyan-950/70 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                                  : 'bg-[#051422]/90 border border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500'
                              }`}
                            >
                              {type === 'Private' && <User className="w-3 h-3" />}
                              {type === 'Couple' && <Heart className="w-3 h-3" />}
                              {type === 'Family' && <Users className="w-3 h-3" />}
                              {type === 'Group' && <Users className="w-3 h-3" />}
                              <span>{type}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-800/80 my-2" />

                {/* ----------------- SECTION 2: YOUR DETAILS ----------------- */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center flex-shrink-0 shadow-md">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        2. Your Details
                      </h2>
                      <p className="text-xs text-slate-400 font-light">
                        We'll use this to contact you
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className={`w-full bg-[#051422]/90 border rounded-2xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner ${
                            formErrors.name ? 'border-rose-500' : 'border-cyan-500/30'
                          }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-[10px] text-rose-400 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className={`w-full bg-[#051422]/90 border rounded-2xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner ${
                            formErrors.email ? 'border-rose-500' : 'border-cyan-500/30'
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-[10px] text-rose-400 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / WhatsApp <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute left-10 flex items-center gap-1 text-xs text-slate-300 font-mono">
                          <span>🇱🇰</span>
                          <span>{countryCode}</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="77 123 4567"
                          className={`w-full bg-[#051422]/90 border rounded-2xl pl-24 pr-3.5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner ${
                            formErrors.phone ? 'border-rose-500' : 'border-cyan-500/30'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[10px] text-rose-400 mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Continue to Review CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer hover:scale-103"
                  >
                    <span>Continue to Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* ---------------------------------------------------------------------
                RIGHT COLUMN: Selected Tour Summary Card (Matches Screenshot)
                --------------------------------------------------------------------- */}
            <div className="lg:col-span-4 rounded-3xl bg-[#081827]/85 border border-cyan-500/25 p-5 sm:p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                {/* Photo Preview with Floating Badge */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-xl mb-5">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Location Tag Badge on Bottom-Right */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-1 shadow">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    <span>{selectedPackage.name}</span>
                  </div>
                </div>

                {/* Package Title & Location */}
                <h3 className="text-xl sm:text-2xl font-serif text-white font-bold tracking-tight">
                  {selectedPackage.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{selectedPackage.location}, Sri Lanka</span>
                </div>

                {/* Summary Metadata List */}
                <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CalendarIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      {adultsCount} Adults{childrenCount > 0 ? `, ${childrenCount} Children` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{selectedPackage.duration}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{tourType} Tour</span>
                  </div>
                </div>
              </div>

              {/* Tour Info at Bottom */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 block mb-1">
                  Private Ceylon Tour Package
                </span>
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  Private Chauffeur Tour Included
                </div>
                <p className="text-[11px] text-slate-400 font-light mt-2">
                  Tailored to your party size, preferred boutique stays, and seasonal dates.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <BookingReviewModal
        isOpen={isReviewOpen}
        tourPackageName={selectedPackage.name}
        travelDate={formattedDate}
        partySummary={`${adultsCount} Adults${childrenCount > 0 ? `, ${childrenCount} Children` : ''}`}
        tourType={tourType}
        guestName={fullName}
        phoneNumber={`${countryCode} ${phone}`}
        email={email}
        whatsAppUrl={whatsAppUrl}
        onClose={() => setIsReviewOpen(false)}
        onContinue={handleFinalConfirm}
      />

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
