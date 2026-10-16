import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ModernPageLoaderProps {
  isLoading?: boolean;
  onFinish?: () => void;
  minDuration?: number;
}

const EXPEDITION_PHRASES = [
  'Gathering Ceylon Sunsets...',
  'Ascending Sigiriya Sky Citadel...',
  'Unfolding Highland Mist Trails...',
  'Crafting Bespoke Sri Lanka Expeditions...',
];

export const ModernPageLoader: React.FC<ModernPageLoaderProps> = ({
  isLoading = true,
  onFinish,
  minDuration = 1600,
}) => {
  const [progress, setProgress] = useState(10);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onFinish) onFinish();
        }, 250);
      }
    }, 35);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % EXPEDITION_PHRASES.length);
    }, 550);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, [minDuration, onFinish]);

  if (isDone && !isLoading) return null;

  return (
    <AnimatePresence>
      {(!isDone || isLoading) && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030b14] text-white select-none overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Ambient luminous glow backdrops */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-cyan-500/20 via-sky-600/10 to-transparent blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-radial from-amber-500/20 via-orange-600/10 to-transparent blur-[90px]"
            />
          </div>

          {/* Central Logo Container with Modern Synchronized Animation */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* The Island Teardrop Shape with Sigiriya Rock, Hiker, and Sunset Landscape */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-3">
              <svg viewBox="0 0 600 620" className="w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.5)]">
                <defs>
                  <clipPath id="loader-island-accurate-clip">
                    <path d="M 285 45
                             C 278 40, 268 45, 262 52
                             C 255 60, 258 70, 252 78
                             C 246 86, 235 90, 232 102
                             C 229 114, 236 126, 232 138
                             C 228 150, 222 162, 222 176
                             C 222 195, 228 212, 232 230
                             C 236 248, 238 266, 245 284
                             C 252 302, 265 318, 278 332
                             C 292 346, 310 354, 328 350
                             C 345 346, 360 332, 372 316
                             C 384 300, 395 280, 402 260
                             C 409 240, 412 218, 410 196
                             C 408 175, 398 154, 388 135
                             C 378 116, 364 98, 350 82
                             C 336 66, 320 54, 304 46
                             C 298 43, 291 42, 285 45 Z" />
                  </clipPath>

                  <linearGradient id="loader-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0d6570" />
                    <stop offset="30%" stopColor="#14838f" />
                    <stop offset="55%" stopColor="#22a8b5" />
                    <stop offset="72%" stopColor="#f5a438" />
                    <stop offset="88%" stopColor="#f38025" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>

                  <radialGradient id="loader-sun-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="30%" stopColor="#fffbeb" />
                    <stop offset="65%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="loader-sigiriya-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#134e4a" />
                    <stop offset="45%" stopColor="#115e59" />
                    <stop offset="75%" stopColor="#785324" />
                    <stop offset="100%" stopColor="#b4782b" />
                  </linearGradient>

                  <linearGradient id="loader-lagoon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="40%" stopColor="#06b6d4" />
                    <stop offset="75%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>

                {/* Animated Inner Landscape Reveal */}
                <g clipPath="url(#loader-island-accurate-clip)">
                  <motion.rect
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    x="200"
                    y="30"
                    width="230"
                    height="340"
                    fill="url(#loader-sky-grad)"
                  />

                  {/* Sun Rising & Radiating Glow */}
                  <motion.circle
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    cx="355"
                    cy="195"
                    r="45"
                    fill="url(#loader-sun-glow)"
                  />
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    cx="355"
                    cy="195"
                    r="22"
                    fill="#fffbeb"
                  />

                  {/* Mountains behind Sigiriya */}
                  <motion.path
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.75 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    d="M 240 220 L 270 195 L 305 210 L 335 188 L 380 215 L 415 195 L 415 240 L 240 240 Z"
                    fill="#0f766e"
                  />

                  {/* SIGIRIYA ROCK FORTRESS Emerging with Sun Reflection */}
                  <motion.path
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
                    d="M 264 212 L 267 185 Q 269 175, 276 172 L 310 171 Q 318 174, 321 184 L 326 210 Q 328 220, 332 225 L 258 225 Z"
                    fill="url(#loader-sigiriya-grad)"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    d="M 308 174 L 309 212"
                    stroke="#eab308"
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    d="M 316 176 L 319 210"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    opacity="0.9"
                  />

                  {/* Dense Jungle Canopy */}
                  <motion.path
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    d="M 220 230 Q 255 210, 290 226 Q 325 214, 360 228 Q 395 212, 420 230 L 420 350 L 220 350 Z"
                    fill="#064e3b"
                  />

                  {/* Coastal Wave Ripples & Beach */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    d="M 265 340 Q 300 250, 345 240 Q 380 238, 415 252 L 415 350 Z"
                    fill="url(#loader-lagoon-grad)"
                  />
                  <path d="M 255 340 Q 290 262, 335 250 Q 360 245, 375 255 Q 330 262, 280 340 Z" fill="#fed7aa" />

                  {/* Animated Golden Sun Reflection Ripples on Water */}
                  <motion.ellipse
                    animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    cx="355"
                    cy="290"
                    rx="36"
                    ry="4.5"
                    fill="#fde047"
                  />

                  {/* Hiker Silhouette Looking at the Horizon */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <path d="M 235 345 Q 260 270, 305 272 Q 325 278, 318 345 Z" fill="#022c22" />
                    <line x1="316" y1="262" x2="316" y2="295" stroke="#042f2e" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="304" cy="254" r="3.8" fill="#042f2e" />
                    <path d="M 299 262 Q 297 268, 298 274 L 305 274 L 307 262 Z" fill="#042f2e" />
                    <path d="M 302 258 L 308 259 L 307 275 L 301 275 Z" fill="#042f2e" />
                    <line x1="303" y1="275" x2="303" y2="292" stroke="#042f2e" strokeWidth="2.4" strokeLinecap="round" />
                    <line x1="306" y1="275" x2="308" y2="292" stroke="#042f2e" strokeWidth="2.4" strokeLinecap="round" />
                  </motion.g>

                  {/* Flying Birds */}
                  <motion.g
                    animate={{ y: [-3, 3, -3], x: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M 324 122 Q 330 117, 336 122 Q 342 117, 348 122 Q 342 120, 336 124 Q 330 120, 324 122 Z" fill="#042f2e" />
                    <path d="M 338 140 Q 343 135, 349 140 Q 355 135, 360 140 Q 355 138, 349 142 Q 343 138, 338 140 Z" fill="#042f2e" />
                  </motion.g>

                  {/* Leaning Tropical Palms */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    d="M 236 295 Q 248 230, 276 175 Q 284 158, 288 142"
                    stroke="#022c22"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                  >
                    <path d="M 288 142 Q 306 130, 324 148" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M 288 142 Q 312 150, 320 175" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M 288 142 Q 302 165, 305 192" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M 288 142 Q 276 122, 258 126" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M 288 142 Q 266 140, 250 156" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  </motion.g>
                </g>

                {/* Laser Glowing Border Drawing Itself Around Sri Lanka */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  d="M 285 45
                     C 278 40, 268 45, 262 52
                     C 255 60, 258 70, 252 78
                     C 246 86, 235 90, 232 102
                     C 229 114, 236 126, 232 138
                     C 228 150, 222 162, 222 176
                     C 222 195, 228 212, 232 230
                     C 236 248, 238 266, 245 284
                     C 252 302, 265 318, 278 332
                     C 292 346, 310 354, 328 350
                     C 345 346, 360 332, 372 316
                     C 384 300, 395 280, 402 260
                     C 409 240, 412 218, 410 196
                     C 408 175, 398 154, 388 135
                     C 378 116, 364 98, 350 82
                     C 336 66, 320 54, 304 46
                     C 298 43, 291 42, 285 45 Z"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* "Lali" Calligraphic Typography Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif italic text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(34,211,238,0.4)]"
            >
              Lali
            </motion.div>

            {/* "CEYLON TOURS" Letter Tracking Expansion */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              className="text-xs sm:text-sm font-extrabold uppercase font-montserrat text-cyan-300 mt-1"
            >
              CEYLON TOURS
            </motion.div>

            {/* "— More Than Just a Trip —" Subtitle Reveal */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-2 overflow-hidden"
            >
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="font-serif italic text-xs text-cyan-200/90 whitespace-nowrap tracking-wider">
                More Than Just a Trip
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>

            {/* Modern Slim Glowing Progress Indicator */}
            <div className="w-48 sm:w-60 mt-8 flex flex-col items-center gap-2">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px] border border-cyan-500/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Dynamic Status Text */}
              <div className="flex items-center justify-between w-full text-[10px] font-mono text-cyan-400/80">
                <span className="tracking-wider truncate">{EXPEDITION_PHRASES[phraseIndex]}</span>
                <span className="font-bold text-white pl-2">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
