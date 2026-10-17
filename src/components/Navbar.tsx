import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Compass,
  MapPin,
  Users,
  ChevronRight,
  X,
  Menu,
} from 'lucide-react';
import { smoothScrollTo, smoothScrollToTop } from '../utils/smoothScroll';
import { LaliLogo } from './LaliLogo';
import { AccentSwitcher } from './AccentSwitcher';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Destination } from '../types';

interface NavbarProps {
  destinations?: Destination[];
  activeDestination?: Destination;
  onSelectDestination?: (dest: Destination) => void;
  onOpenBooking: () => void;
  onOpenConcierge?: () => void;
  currentView?: 'home' | 'tours' | 'destinations' | 'about' | 'book';
  onNavigate?: (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currentView = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view, sectionId);
    } else {
      if (sectionId) {
        smoothScrollTo('#' + sectionId, { offset: -80, duration: 1.25 });
      } else {
        smoothScrollToTop(1.2);
      }
    }
  };

  return (
    <>
      {/* Top Floating Glass Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between text-white select-none transition-all">
        {/* Subtle glass background backdrop with cyan border */}
        <div className="absolute inset-x-2.5 sm:inset-x-6 inset-y-1 sm:inset-y-1.5 rounded-full glass-panel border border-cyan-500/25 shadow-2xl backdrop-blur-xl pointer-events-none bg-[#071924]/85" />

        {/* Brand: Official Lali Ceylon Tours Logo */}
        <div
          onClick={() => handleNavClick('home', 'hero-viewer')}
          className="relative z-10 cursor-pointer group flex-shrink-0 transition-transform hover:scale-[1.02]"
        >
          <LaliLogo variant="horizontal" theme="dark" showTagline={true} />
        </div>

        {/* Center Desktop Navigation Links: Home, Tours, Destinations, About Us */}
        <nav className="relative z-10 hidden md:flex items-center gap-6 lg:gap-10 text-xs font-semibold tracking-[0.16em] uppercase ml-auto nav-links">
          <button
            onClick={() => handleNavClick('home', 'hero-viewer')}
            className={`nav-link nav-link-accent transition-all py-1 cursor-pointer relative ${
              currentView === 'home'
                ? 'active font-bold'
                : 'text-white/75'
            }`}
          >
            <span>Home</span>
            {currentView === 'home' && (
              <span className="nav-underline absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('tours')}
            className={`nav-link nav-link-accent transition-all py-1 cursor-pointer relative ${
              currentView === 'tours'
                ? 'active font-bold'
                : 'text-white/75'
            }`}
          >
            <span>Tours</span>
            {currentView === 'tours' && (
              <span className="nav-underline absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('destinations')}
            className={`nav-link nav-link-accent transition-all py-1 cursor-pointer relative ${
              currentView === 'destinations'
                ? 'active font-bold'
                : 'text-white/75'
            }`}
          >
            <span>Destinations</span>
            {currentView === 'destinations' && (
              <span className="nav-underline absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`nav-link nav-link-accent transition-all py-1 cursor-pointer relative ${
              currentView === 'about'
                ? 'active font-bold'
                : 'text-white/75'
            }`}
          >
            <span>About Us</span>
            {currentView === 'about' && (
              <span className="nav-underline absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Action Zone: Accent dots + Desktop "Book Your Tour" CTA + Mobile Controls */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3 ml-2 sm:ml-6 md:ml-8 lg:ml-10 flex-shrink-0">
          {/* Desktop Accent Theme Switcher */}
          <AccentSwitcher id="accent-desktop" layout="pill" />

          {/* Desktop & Tablet Full CTA */}
          <button
            onClick={() => handleNavClick('book')}
            className={`hidden sm:flex book-tour-btn px-5 sm:px-6 py-2.5 rounded-full font-bold text-[11px] sm:text-xs tracking-[1.5px] uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer items-center gap-2 whitespace-nowrap ${
              currentView === 'book'
                ? 'bg-cyan-400 text-slate-950 ring-2 ring-white'
                : 'bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950'
            } book-tour-btn-accent`}
          >
            <span className="text-sm font-bold leading-none">✣</span>
            <span>BOOK YOUR TOUR</span>
          </button>

          {/* Mobile Quick Action "Book" (Compact pill on small mobile screens) */}
          <button
            onClick={() => handleNavClick('book')}
            className="sm:hidden px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Book
          </button>

          {/* Clean Mobile Menu Toggle with 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-cyan-500/30 bg-slate-900/80 hover:bg-slate-800 text-white active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-cyan-300" />
            ) : (
              <Menu className="w-4 h-4 text-cyan-300" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Smooth Backdrop + Floating Card) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay (Tap to Dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Floating Mobile Drawer Card */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[66px] sm:top-20 inset-x-3 sm:inset-x-6 max-w-md mx-auto bg-[#071924]/98 backdrop-blur-2xl rounded-3xl border border-cyan-500/35 p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-50 md:hidden flex flex-col gap-3 text-slate-100 overflow-hidden"
            >
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 px-1">
                <LaliLogo variant="horizontal" theme="dark" showTagline={true} />
              </div>

              {/* Primary Nav Links */}
              <div className="flex flex-col gap-1.5">
                {[
                  { view: 'home' as const, label: 'Home', icon: Sparkles, sectionId: 'hero-viewer' },
                  { view: 'tours' as const, label: 'Tour Packages', icon: Compass },
                  { view: 'destinations' as const, label: 'Destinations', icon: MapPin },
                  { view: 'about' as const, label: 'About Us', icon: Users },
                ].map(({ view, label, icon: Icon, sectionId }) => {
                  const isActive = currentView === view;
                  return (
                    <button
                      key={view}
                      onClick={() => handleNavClick(view, sectionId)}
                      className={`min-h-[46px] w-full px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                        isActive
                          ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-200 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>{label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 my-0.5" />

              {/* Mobile Accent Theme Row */}
              <AccentSwitcher id="accent-mobile" layout="row" />

              {/* Divider */}
              <div className="h-px bg-white/10 my-0.5" />

              {/* Action Buttons in Drawer */}
              <div className="space-y-2">
                {/* Book Your Tour Primary CTA */}
                <button
                  onClick={() => handleNavClick('book')}
                  className="min-h-[46px] w-full py-3 px-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.45)] cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Book Your Tour</span>
                </button>

                {/* WhatsApp Direct Concierge Link */}
                <a
                  href="https://wa.me/971582177381?text=Hello%20Lali%20Ceylon%20Tours!%20I'd%20like%20to%20inquire%20about%20a%20tour."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[42px] w-full py-2.5 px-4 rounded-full border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Concierge (+971 58 217 7381)</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
