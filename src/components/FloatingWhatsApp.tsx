import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

const message = encodeURIComponent('Hello Lali Ceylon Tours! I have a question about traveling in Sri Lanka.');

export const FloatingWhatsApp: React.FC = () => (
  <a
    href={`https://wa.me/94771234567?text=${message}`}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat directly with Lali Ceylon Tours on WhatsApp"
    title="Chat directly on WhatsApp"
    className="group fixed bottom-6 right-5 sm:right-8 z-40 flex w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-transform hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#06171d]"
  >
    <WhatsAppIcon className="w-7 h-7" />
    <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-[#071824] border border-emerald-400/30 text-xs font-semibold text-white whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all pointer-events-none shadow-xl">
      Chat with us on WhatsApp
    </span>
  </a>
);