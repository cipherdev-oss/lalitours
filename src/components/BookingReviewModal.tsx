import React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface BookingReviewModalProps {
  isOpen: boolean;
  tourPackageName: string;
  travelDate: string;
  partySummary: string;
  tourType: string;
  guestName: string;
  phoneNumber: string;
  email: string;
  whatsAppUrl: string;
  onClose: () => void;
  onContinue: () => void;
}

export const BookingReviewModal: React.FC<BookingReviewModalProps> = ({
  isOpen,
  tourPackageName,
  travelDate,
  partySummary,
  tourType,
  guestName,
  phoneNumber,
  email,
  whatsAppUrl,
  onClose,
  onContinue
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#081827] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-serif text-white font-bold">
                Review Your Inquiry
              </h3>
              <p className="text-xs text-slate-400">
                Check your journey details before opening WhatsApp
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Tour Package:</span>
              <span className="text-white font-medium">{tourPackageName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Travel Date:</span>
              <span className="text-white font-medium">{travelDate}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Party:</span>
              <span className="text-white font-medium">{partySummary}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Tour Style:</span>
              <span className="text-cyan-300 font-medium">{tourType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Guest:</span>
              <span className="text-white font-medium">{guestName} ({phoneNumber})</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-400">
              <span>Email:</span>
              <span className="text-white font-medium">{email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-full border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Edit Details
            </button>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onContinue}
              className="flex-1 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              Continue to WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);