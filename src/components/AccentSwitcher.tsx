import React, { useState, useEffect } from 'react';

export type SiteAccent = 'ocean' | 'amber' | 'emerald';

const ACCENTS: { id: SiteAccent; label: string; dot: string; ring: string }[] = [
  { id: 'ocean', label: 'Ocean cyan (default)', dot: 'bg-cyan-400', ring: 'focus:ring-cyan-300/60' },
  { id: 'amber', label: 'Sunset amber', dot: 'bg-amber-400', ring: 'focus:ring-amber-300/70' },
  { id: 'emerald', label: 'Lagoon emerald', dot: 'bg-emerald-400', ring: 'focus:ring-emerald-300/60' },
];

const STORAGE_KEY = 'lali-accent';

export const getStoredAccent = (): SiteAccent => {
  if (typeof window === 'undefined') return 'ocean';
  const fromAttr = document.documentElement.dataset.accent;
  if (fromAttr === 'amber' || fromAttr === 'emerald' || fromAttr === 'ocean') return fromAttr;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'amber' || stored === 'emerald' || stored === 'ocean') return stored;
  } catch {
    /* private mode — fall through to default */
  }
  return 'ocean';
};

export const applyAccent = (accent: SiteAccent) => {
  document.documentElement.dataset.accent = accent;
  try {
    window.localStorage.setItem(STORAGE_KEY, accent);
  } catch {
    /* ignore */
  }
};

interface AccentSwitcherProps {
  id?: string;
  layout?: 'pill' | 'row';
}

export const AccentSwitcher: React.FC<AccentSwitcherProps> = ({ id = 'accent', layout = 'pill' }) => {
  const [accent, setAccent] = useState<SiteAccent>('ocean');

  useEffect(() => {
    setAccent(getStoredAccent());
  }, []);

  const handleSelect = (next: SiteAccent) => {
    setAccent(next);
    applyAccent(next);
  };

  if (layout === 'row') {
    return (
      <div className="flex items-center justify-between gap-3 px-1 py-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Accent theme
        </span>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Choose accent theme">
          {ACCENTS.map((option) => {
            const isActive = accent === option.id;
            return (
              <button
                key={`${id}-${option.id}`}
                type="button"
                role="radio"
                aria-checked={isActive}
                title={option.label}
                aria-label={option.label}
                onClick={() => handleSelect(option.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer focus:outline-none focus:ring-2 ${option.ring} ${
                  isActive
                    ? 'border-white/80 scale-105 shadow-[0_0_14px_rgba(255,255,255,0.25)]'
                    : 'border-white/15 hover:border-white/40 hover:scale-105'
                }`}
              >
                <span className={`w-4 h-4 rounded-full ${option.dot} ${isActive ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-slate-950' : ''}`} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md px-2 py-1.5"
      role="radiogroup"
      aria-label="Choose accent theme"
      title="Accent theme"
    >
      {ACCENTS.map((option) => {
        const isActive = accent === option.id;
        return (
          <button
            key={`${id}-${option.id}`}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={option.label}
            aria-label={option.label}
            onClick={() => handleSelect(option.id)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 ${option.ring} ${
              isActive ? 'scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            <span
              className={`${option.dot} rounded-full transition-all ${
                isActive ? 'w-3.5 h-3.5 ring-2 ring-white/80 ring-offset-1 ring-offset-slate-950' : 'w-3 h-3'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
