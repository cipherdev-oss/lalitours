import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { smoothScrollToTop } from '../utils/smoothScroll';
import { LaliLogo } from './LaliLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate?: (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => void;
  onOpenBooking?: (notes?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const handleNavClick = (view: 'home' | 'tours' | 'destinations' | 'about' | 'book', sectionId?: string) => {
    if (onNavigate) {
      onNavigate(view, sectionId);
    } else {
      if (view === 'destinations') {
        window.location.hash = 'destinations';
      } else if (view === 'tours') {
        window.location.hash = 'tours';
      } else if (view === 'about') {
        window.location.hash = 'about';
      } else if (view === 'book') {
        window.location.hash = 'book';
      }
    }
  };

  const scrollToTop = () => {
    smoothScrollToTop(1.3);
  };

  return (
    <footer className="relative w-full bg-[#02070d] text-white overflow-hidden touch-pan-y">
      {/* =========================================================================
          PART 2: COMPREHENSIVE FOOTER (About, Quick Links, Contacts & Details)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Short About Lali Ceylon Tours (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Official Logo Lockup */}
            <div
              onClick={() => handleNavClick('home', 'hero-viewer')}
              className="cursor-pointer group inline-block transition-transform hover:scale-[1.02]"
            >
              <LaliLogo variant="horizontal" theme="dark" showTagline={true} />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-md">
              Sri Lanka’s boutique private travel atelier. Born from a profound love for the island’s untamed landscapes, ancient royal kingdoms, and warm island hospitality. We craft 100% private, bespoke expeditions tailored to discerning travelers from across the globe.
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>SLTDA Government-Licensed Chauffeur Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>12+ Years of Verified Five-Star Hospitality</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>100% Tailor-Made & Sustainable Private Expeditions</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>24/7 Island-Wide On-Ground Logistical Support</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-300 font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs font-medium text-slate-300">
              <li>
                <button
                  onClick={() => handleNavClick('home', 'hero-viewer')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Home Stage</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('tours')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Handcrafted Tours & Expeditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('destinations')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Natural Wonders & Scenery</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>About Us & Guest Reviews</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => handleNavClick('book')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all font-bold cursor-pointer shadow-sm"
                >
                  <span>Book Your Tour</span>
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & 24/7 Concierge (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-300 font-mono">
              Contact & Concierge
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <a
                href="https://wa.me/971582177381"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors group cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold">
                    WhatsApp & Hotline
                  </div>
                  <div className="text-white font-bold text-xs mt-0.5">+971 58 217 7381</div>
                  <div className="text-[10px] text-slate-400">Instant Chat Available (24/7)</div>
                </div>
              </a>

              <a
                href="mailto:liyanageronali@gmail.com"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors group cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="overflow-hidden">
                  <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold">
                    Official Email
                  </div>
                  <div className="text-white font-medium text-xs mt-0.5 truncate">
                    liyanageronali@gmail.com
                  </div>
                  <div className="text-[10px] text-slate-400">24h Response Guaranteed</div>
                </div>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Headquarters:</span> Colombo 03 & Galle Fort, Sri Lanka.
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>24/7 Dedicated Island Concierge Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top with luxurious end-of-page cushioning */}
        <div className="pt-8 pb-10 sm:pb-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-slate-500 border-t border-white/5 mt-8">
          <div>
            <p>© {new Date().getFullYear()} Lali Ceylon Tours & Bespoke Expeditions. All rights reserved.</p>
            <p className="text-[10px] text-slate-600 mt-0.5 uppercase tracking-wider">
              Ceylon Tea Country • Cultural Triangle • Indian Ocean Sanctuaries
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('about')}
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Guest Reviews
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavClick('tours')}
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Tours & Itineraries
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/20 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer text-xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
