import React from 'react';

export interface LaliLogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showTagline?: boolean;
  animated?: boolean;
}

export const LaliLogo: React.FC<LaliLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  showTagline = true,
  animated = false,
}) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#103c46' : '#ffffff';
  const accentColor = isLight ? '#0891b2' : '#38bdf8';
  const taglineColor = isLight ? '#0f766e' : '#a5f3fc';

  // Standalone Accurate Island Mark with Sigiriya Rock, Hiker & Palms
  const IslandMark = ({ sizeClass = 'w-10 h-10' }: { sizeClass?: string }) => (
    <div className={`relative ${sizeClass} shrink-0 select-none flex items-center justify-center overflow-hidden rounded-full bg-white`}>
      <svg
        viewBox="0 0 600 620"
        className={`hidden w-full h-full drop-shadow-[0_4px_16px_rgba(6,182,212,0.35)] ${
          animated ? 'animate-pulse duration-1000' : ''
        }`}
      >
        <defs>
          <clipPath id="logo-sri-lanka-clip">
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

          <linearGradient id="logo-sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d6570" />
            <stop offset="30%" stopColor="#14838f" />
            <stop offset="55%" stopColor="#22a8b5" />
            <stop offset="72%" stopColor="#f5a438" />
            <stop offset="88%" stopColor="#f38025" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <radialGradient id="logo-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fffbeb" />
            <stop offset="65%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="logo-sigiriya-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#134e4a" />
            <stop offset="45%" stopColor="#115e59" />
            <stop offset="75%" stopColor="#785324" />
            <stop offset="100%" stopColor="#b4782b" />
          </linearGradient>

          <linearGradient id="logo-ocean-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="40%" stopColor="#06b6d4" />
            <stop offset="75%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>

        <g clipPath="url(#logo-sri-lanka-clip)">
          {/* Sunset Sky */}
          <rect x="200" y="30" width="230" height="340" fill="url(#logo-sky-grad)" />

          {/* Sun */}
          <circle cx="355" cy="195" r="45" fill="url(#logo-sun-glow)" />
          <circle cx="355" cy="195" r="22" fill="#fffbeb" />

          {/* Mountain Ridge */}
          <path d="M 240 220 L 270 195 L 305 210 L 335 188 L 380 215 L 415 195 L 415 240 L 240 240 Z" fill="#0f766e" fillOpacity="0.75" />

          {/* SIGIRIYA ROCK FORTRESS (LION ROCK) */}
          <path d="M 264 212 L 267 185 Q 269 175, 276 172 L 310 171 Q 318 174, 321 184 L 326 210 Q 328 220, 332 225 L 258 225 Z" fill="url(#logo-sigiriya-grad)" />
          <path d="M 272 173 L 314 172 Q 312 170, 305 169 L 280 169 Z" fill="#064e3b" />
          <path d="M 308 174 L 309 212" stroke="#eab308" strokeWidth="2.5" opacity="0.75" />
          <path d="M 316 176 L 319 210" stroke="#f59e0b" strokeWidth="3" opacity="0.85" />

          {/* Jungle Canopy */}
          <path d="M 220 230 Q 255 210, 290 226 Q 325 214, 360 228 Q 395 212, 420 230 L 420 350 L 220 350 Z" fill="#064e3b" />
          <path d="M 230 248 Q 260 230, 295 244 Q 330 232, 365 246 Q 395 235, 420 250 L 420 350 L 230 350 Z" fill="#047857" />

          {/* Crescent Beach & Ocean */}
          <path d="M 265 340 Q 300 250, 345 240 Q 380 238, 415 252 L 415 350 Z" fill="url(#logo-ocean-grad)" />
          <path d="M 255 340 Q 290 262, 335 250 Q 360 245, 375 255 Q 330 262, 280 340 Z" fill="#fed7aa" />

          {/* Sun Reflections */}
          <ellipse cx="360" cy="275" rx="28" ry="4" fill="#fde047" fillOpacity="0.65" />
          <ellipse cx="355" cy="290" rx="36" ry="4.5" fill="#fde047" fillOpacity="0.75" />
          <ellipse cx="350" cy="308" rx="26" ry="3.5" fill="#fde047" fillOpacity="0.55" />

          {/* HIKER SILHOUETTE WITH BACKPACK & STICK */}
          <path d="M 235 345 Q 260 270, 305 272 Q 325 278, 318 345 Z" fill="#022c22" />
          <line x1="316" y1="262" x2="316" y2="295" stroke="#042f2e" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="304" cy="254" r="3.8" fill="#042f2e" />
          <path d="M 299 262 Q 297 268, 298 274 L 305 274 L 307 262 Z" fill="#042f2e" />
          <path d="M 302 258 L 308 259 L 307 275 L 301 275 Z" fill="#042f2e" />
          <line x1="303" y1="275" x2="303" y2="292" stroke="#042f2e" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="306" y1="275" x2="308" y2="292" stroke="#042f2e" strokeWidth="2.4" strokeLinecap="round" />

          {/* Coconut Palm Trees */}
          <path d="M 236 295 Q 248 230, 276 175 Q 284 158, 288 142" stroke="#022c22" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M 288 142 Q 306 130, 324 148" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 288 142 Q 312 150, 320 175" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 288 142 Q 302 165, 305 192" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 288 142 Q 276 122, 258 126" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M 288 142 Q 266 140, 250 156" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round" fill="none" />

          {/* Birds */}
          <path d="M 324 122 Q 330 117, 336 122 Q 342 117, 348 122 Q 342 120, 336 124 Q 330 120, 324 122 Z" fill="#042f2e" />
          <path d="M 338 140 Q 343 135, 349 140 Q 355 135, 360 140 Q 355 138, 349 142 Q 343 138, 338 140 Z" fill="#042f2e" />
        </g>

        {/* Outer Contour */}
        <path
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
          stroke={accentColor}
          strokeWidth="2.5"
          strokeOpacity="0.85"
        />
      </svg>
      <img
        src="/img/lali-logo-transparent.png"
        alt=""
        aria-hidden="true"
        className={`absolute top-0 left-1/2 w-[180%] max-w-none -translate-x-1/2 ${
          animated ? 'animate-pulse duration-1000' : ''
        }`}
      />
    </div>
  );

  // 1. Mark only
  if (variant === 'mark') {
    return <IslandMark sizeClass={className || 'w-10 h-10'} />;
  }

  // 2. Horizontal Variant (Header, Navbar, Compact badges)
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
        {/* Island Icon Mark */}
        <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-white/80 shadow-[0_0_15px_rgba(6,182,212,0.35)] flex items-center justify-center shrink-0 overflow-hidden">
          <IslandMark sizeClass="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {/* Brand Wordmark & Tagline */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-base sm:text-lg font-black tracking-wide font-montserrat uppercase leading-none drop-shadow-sm"
              style={{ color: textColor }}
            >
              Lali
            </span>
            <span
              className="text-xs sm:text-sm font-extrabold tracking-[0.2em] font-montserrat uppercase leading-none"
              style={{ color: accentColor }}
            >
              Ceylon Tours
            </span>
          </div>

          {showTagline && (
            <span
              className="text-[9px] sm:text-[10px] font-serif italic tracking-wider mt-1 opacity-90 truncate hidden xs:block"
              style={{ color: taglineColor }}
            >
              More Than Just a Trip
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Full Vertical Variant (Footer, About Us, Splash Screen)
  return (
    <img
      src="/img/lali-logo.png"
      alt="Lali Ceylon Tours — More Than Just a Trip"
      className={`w-56 max-w-full h-auto object-contain ${className}`}
    />
  );
};
