import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

// ------------------------------------------------------------------
// EDIT YOUR LINKS HERE — replace with real profiles when ready
// ------------------------------------------------------------------
const SOCIALS = {
  instagram: 'https://instagram.com/laliceylontours',
  tiktok: 'https://tiktok.com/@laliceylontours',
};

const WHATSAPP_LINK = `https://wa.me/971582177381?text=${encodeURIComponent(
  'Hello Lali Ceylon Tours! I have a question about traveling in Sri Lanka.'
)}`;

const InstagramColorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="35%" stopColor="#fa7e1e" />
        <stop offset="55%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      stroke="url(#instagramGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      stroke="url(#instagramGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="17.5"
      y1="6.5"
      x2="17.51"
      y2="6.5"
      stroke="url(#instagramGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TIKTOK_PATH =
  'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z';

const TikTokColorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    {/* Original TikTok glitch layers: cyan + red offset behind white note */}
    <path d={TIKTOK_PATH} fill="#25F4EE" transform="translate(-0.9 -0.9)" />
    <path d={TIKTOK_PATH} fill="#FE2C55" transform="translate(0.9 0.9)" />
    <path d={TIKTOK_PATH} fill="#ffffff" />
  </svg>
);

export const SocialDock: React.FC = () => (
  <div
    aria-label="Chat and follow Lali Ceylon Tours"
    className="hidden lg:flex fixed bottom-6 right-8 z-40 items-center gap-1.5 rounded-full border border-cyan-400/20 bg-[#071924]/80 backdrop-blur-md px-2.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.15)]"
  >
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat directly with Lali Ceylon Tours on WhatsApp"
      title="WhatsApp"
      className="group relative flex w-12 h-12 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/80"
    >
      <WhatsAppIcon className="w-7 h-7" />
      <span className="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-slate-900/95 border border-emerald-400/30 text-[10px] font-mono tracking-wider text-emerald-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        WhatsApp
      </span>
    </a>
    <span aria-hidden="true" className="w-px h-6 bg-white/10 mx-0.5" />
    <a
      href={SOCIALS.instagram}
      target="_blank"
      rel="noreferrer"
      aria-label="Follow Lali Ceylon Tours on Instagram"
      title="Instagram"
      className="group relative flex w-12 h-12 items-center justify-center rounded-full hover:bg-white/10 border border-transparent hover:border-cyan-400/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
    >
      <InstagramColorIcon className="w-7 h-7" />
      <span className="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-slate-900/95 border border-cyan-500/30 text-[10px] font-mono tracking-wider text-cyan-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Instagram
      </span>
    </a>
    <span aria-hidden="true" className="w-px h-6 bg-white/10 mx-0.5" />
    <a
      href={SOCIALS.tiktok}
      target="_blank"
      rel="noreferrer"
      aria-label="Follow Lali Ceylon Tours on TikTok"
      title="TikTok"
      className="group relative flex w-12 h-12 items-center justify-center rounded-full hover:bg-white/10 border border-transparent hover:border-cyan-400/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
    >
      <TikTokColorIcon className="w-7 h-7" />
      <span className="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-slate-900/95 border border-cyan-500/30 text-[10px] font-mono tracking-wider text-cyan-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        TikTok
      </span>
    </a>
  </div>
);
