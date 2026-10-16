import React, { useState, useEffect, lazy, Suspense } from 'react';
import { DESTINATIONS } from './data/destinations';
import { Destination } from './types';
import { Navbar } from './components/Navbar';
import { HeroViewer } from './components/HeroViewer';
import { AboutUsSection } from './components/AboutUsSection';
import { SevenExperiences } from './components/SevenExperiences';
import { BeyondThePostcard } from './components/BeyondThePostcard';
import { Footer } from './components/Footer';
import { FloatingScrollToTop } from './components/FloatingScrollToTop';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import {
  initSmoothScroll,
  destroySmoothScroll,
  smoothScrollTo,
  smoothScrollToTop,
  pauseSmoothScroll,
  resumeSmoothScroll,
} from './utils/smoothScroll';

// Code-split heavy full-page views
const DestinationsPage = lazy(() => import('./components/DestinationsPage').then(m => ({ default: m.DestinationsPage })));
const ToursPage = lazy(() => import('./components/ToursPage').then(m => ({ default: m.ToursPage })));
const AboutUsPage = lazy(() => import('./components/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const BookTourPage = lazy(() => import('./components/BookTourPage').then(m => ({ default: m.BookTourPage })));
const IslandInteractiveMap = lazy(() => import('./components/IslandInteractiveMap').then(m => ({ default: m.IslandInteractiveMap })));
const HiddenSpotGuidePage = lazy(() => import('./components/HiddenSpotGuidePage').then(m => ({ default: m.HiddenSpotGuidePage })));

// Code-split on-demand modals
const PracticalTravelConcierge = lazy(() => import('./components/PracticalTravelConcierge').then(m => ({ default: m.PracticalTravelConcierge })));
const SmoothLightbox = lazy(() => import('./components/SmoothLightbox').then(m => ({ default: m.SmoothLightbox })));

import { ModernPageLoader } from './components/ModernPageLoader';

const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <ModernPageLoader isLoading={true} minDuration={700} />
  </div>
);

export default function App() {
  const destinations = DESTINATIONS;
  const hiddenSpotSlug = typeof window !== 'undefined'
    ? window.location.pathname.match(/^\/hidden-serendipity\/([^/]+)\/?$/)?.[1]
    : undefined;
  const [activeDestination, setActiveDestination] = useState<Destination>(DESTINATIONS[0]);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Page View Routing State ('home' | 'tours' | 'destinations' | 'about' | 'book')
  const [currentView, setCurrentView] = useState<'home' | 'tours' | 'destinations' | 'about' | 'book'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#destinations') return 'destinations';
      if (window.location.hash === '#tours') return 'tours';
      if (window.location.hash === '#about' || window.location.hash === '#about-us') return 'about';
      if (window.location.hash === '#book' || window.location.hash === '#booking') return 'book';
    }
    return 'home';
  });

  // Initialize Lenis smooth scroll engine on window mount
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  // Listen to browser hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#destinations') {
        setCurrentView('destinations');
        smoothScrollToTop(1.2);
      } else if (window.location.hash === '#tours') {
        setCurrentView('tours');
        smoothScrollToTop(1.2);
      } else if (window.location.hash === '#about' || window.location.hash === '#about-us') {
        setCurrentView('about');
        smoothScrollToTop(1.2);
      } else if (window.location.hash === '#book' || window.location.hash === '#booking') {
        setCurrentView('book');
        smoothScrollToTop(1.2);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handler for all internal site navigation with cushioned easing
  const handleNavigate = (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => {
    if (view === 'destinations') {
      setCurrentView('destinations');
      window.location.hash = 'destinations';
      smoothScrollToTop(1.2);
    } else if (view === 'tours') {
      setCurrentView('tours');
      window.location.hash = 'tours';
      smoothScrollToTop(1.2);
    } else if (view === 'about') {
      setCurrentView('about');
      window.location.hash = 'about';
      smoothScrollToTop(1.2);
    } else if (view === 'book') {
      setCurrentView('book');
      window.location.hash = 'book';
      smoothScrollToTop(1.2);
    } else {
      setCurrentView('home');
      if (
        window.location.hash === '#destinations' ||
        window.location.hash === '#tours' ||
        window.location.hash === '#about' ||
        window.location.hash === '#about-us' ||
        window.location.hash === '#book' ||
        window.location.hash === '#booking'
      ) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      if (sectionId) {
        setTimeout(() => {
          smoothScrollTo('#' + sectionId, { offset: -80, duration: 1.25 });
        }, 50);
      } else {
        smoothScrollToTop(1.2);
      }
    }
  };

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    destination: Destination | null;
    initialIndex: number;
  }>({
    isOpen: false,
    destination: null,
    initialIndex: 0,
  });

  // Practical Travel Concierge Modal State
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);

  // Pause smooth scroll when modal overlay is open to avoid background conflict
  useEffect(() => {
    if (isConciergeOpen || lightboxState.isOpen) {
      pauseSmoothScroll();
    } else {
      resumeSmoothScroll();
    }
  }, [isConciergeOpen, lightboxState.isOpen]);

  // Open Lightbox handler
  const handleOpenLightbox = (imageUrl: string, index: number, targetDest?: Destination) => {
    setLightboxState({
      isOpen: true,
      destination: targetDest || activeDestination,
      initialIndex: index,
    });
  };

  // Close Lightbox handler
  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // Dedicated Booking Page Prefill State
  const [bookingPrefill, setBookingPrefill] = useState<{
    tourName?: string;
    notes?: string;
  }>(() => {
    if (typeof window === 'undefined') return {};
    const interest = new URLSearchParams(window.location.search).get('interest');
    return interest ? { notes: `I am interested in adding ${interest} to my trip.` } : {};
  });

  // Open Booking handler - navigates to the dedicated Book Your Tour page
  const handleOpenBooking = (destOrNotes?: Destination | string) => {
    let tourName = '';
    let notes = '';
    if (typeof destOrNotes === 'string') {
      notes = destOrNotes;
      if (destOrNotes.includes('Classic')) tourName = '7days';
      else if (destOrNotes.includes('Leopard') || destOrNotes.includes('Coast')) tourName = '10days';
      else if (destOrNotes.includes('Odyssey')) tourName = '14days';
      else if (destOrNotes.includes('Wild') || destOrNotes.includes('Safari')) tourName = 'wildlife-safari';
      else if (destOrNotes.includes('Ayurveda') || destOrNotes.includes('Wellness')) tourName = 'wellness';
    } else if (destOrNotes && 'name' in destOrNotes) {
      notes = `Inquiry focusing on ${destOrNotes.name} and surrounding region`;
    }
    setBookingPrefill({ tourName, notes });
    handleNavigate('book');
  };

  if (hiddenSpotSlug) {
    return (
      <Suspense fallback={<PageLoader />}>
        <HiddenSpotGuidePage slug={decodeURIComponent(hiddenSpotSlug)} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#131d35] to-[#0a1420] text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950 relative">
      {/* Modern Island Logo Brand Loading Screen */}
      <ModernPageLoader
        isLoading={isInitialLoading}
        onFinish={() => setIsInitialLoading(false)}
        minDuration={1400}
      />

      {/* Subtle ambient soft illumination - hardware accelerated on desktop, optimized on mobile */}
      <div className="hidden md:block fixed inset-0 ambient-slate-glow pointer-events-none z-0 opacity-80 gpu-layer" />

      {/* Floating Glass Navigation with Adventure Links & 🇱🇰 Logo */}
      <Navbar
        destinations={destinations}
        activeDestination={activeDestination}
        onSelectDestination={setActiveDestination}
        onOpenBooking={() => handleOpenBooking()}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 relative z-10">
        <Suspense fallback={<PageLoader />}>
          {currentView === 'destinations' ? (
            /* Separate Dedicated Destinations Page: Natural Wonders of Sri Lanka */
            <DestinationsPage
              destinations={destinations}
              activeDestination={activeDestination}
              onSelectDestination={setActiveDestination}
              onOpenBookingFor={(destOrNote) => handleOpenBooking(destOrNote)}
              onNavigateHome={() => handleNavigate('home')}
            />
          ) : currentView === 'tours' ? (
            /* Separate Dedicated Tours Page: Handcrafted Sri Lanka Tours & Journeys */
            <ToursPage
              onOpenBooking={(notes) => handleOpenBooking(notes)}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateDestinations={() => handleNavigate('destinations')}
            />
          ) : currentView === 'about' ? (
            /* Separate Dedicated About Us Page: Our Story, Values & Traveler Testimonials */
            <AboutUsPage
              onOpenLightbox={handleOpenLightbox}
              onOpenBooking={(notes) => handleOpenBooking(notes)}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateTours={() => handleNavigate('tours')}
              onNavigateDestinations={() => handleNavigate('destinations')}
            />
          ) : currentView === 'book' ? (
            /* Separate Dedicated Book Your Tour Page: Reservation Form & Direct Concierge */
            <BookTourPage
              initialTour={bookingPrefill.tourName}
              initialNotes={bookingPrefill.notes}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateTours={() => handleNavigate('tours')}
              onNavigateDestinations={() => handleNavigate('destinations')}
            />
          ) : (
            /* Home Page Sections */
            <>
              {/* 1. Main Interactive Hero Stage */}
              <HeroViewer
                destinations={destinations}
                activeDestination={activeDestination}
                onSelectDestination={setActiveDestination}
                onOpenLightbox={handleOpenLightbox}
                onOpenBooking={handleOpenBooking}
              />

              {/* 2. About Us Section (Right below Hero, preserving exact collage structure & styling) */}
              <AboutUsSection
                onOpenLightbox={handleOpenLightbox}
                onOpenBooking={handleOpenBooking}
              />

              {/* 3. Sri Lanka in 7 Experiences (Huge cinematic photography) */}
              <SevenExperiences onOpenBooking={() => handleOpenBooking()} />

              {/* 4. Interactive Island Map (Make Sri Lanka look huge with 13 glowing pins & drawer) */}
              <IslandInteractiveMap onOpenBooking={(loc) => handleOpenBooking(loc ? `Inquiry for ${loc}` : undefined)} />

              {/* 5. Beyond the Postcard (Hidden Sri Lanka: Jaffna, Knuckles, Kalpitiya, Nilaveli, Hiriketiya, Riverston, Gal Oya, Delft Island) */}
              <BeyondThePostcard onOpenBooking={(spot) => handleOpenBooking(spot ? `Hidden Spot Inquiry: ${spot}` : undefined)} />
            </>
          )}
        </Suspense>
      </main>

      {/* Global Interactive Footer (The Serendipity Paradox + Full Contact & Links) */}
      <Footer onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />

      {/* Lazy Modals: Loaded only on demand when triggered by user */}
      <Suspense fallback={null}>
        {isConciergeOpen && (
          <PracticalTravelConcierge
            isOpen={isConciergeOpen}
            onClose={() => setIsConciergeOpen(false)}
            onOpenBooking={() => {
              setIsConciergeOpen(false);
              handleOpenBooking('Practical Concierge Travel Planning');
            }}
          />
        )}

        {lightboxState.isOpen && (
          <SmoothLightbox
            isOpen={lightboxState.isOpen}
            destination={lightboxState.destination}
            initialIndex={lightboxState.initialIndex}
            onClose={handleCloseLightbox}
            destinations={destinations}
            onSelectDestination={setActiveDestination}
          />
        )}

      </Suspense>

      {/* Floating Smooth Glide to Top Button with Circular Progress */}
      <FloatingScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
}
