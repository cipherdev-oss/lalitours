import React from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  fill: string; // Hex or CSS color string (e.g., '#dff0fb', '#0e273c', '#07111a')
  heightClass?: string;
  variant?: 1 | 2 | 3;
  className?: string;
  showAccent?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  position = 'bottom',
  fill,
  heightClass = 'h-14 sm:h-20 lg:h-28',
  variant = 1,
  className = '',
  showAccent = true,
}) => {
  // Deeply curvy oceanic wave paths with multiple natural rhythmic swells and troughs
  const getPath = () => {
    if (position === 'top') {
      if (variant === 1) {
        // Curve downwards from the top edge - dynamic breakers
        return 'M0,0 L1440,0 L1440,65 C1320,115 1200,30 1080,80 C940,125 800,40 680,95 C540,140 400,35 260,85 C140,125 60,45 0,70 Z';
      }
      if (variant === 2) {
        // Sinuous coastal swell
        return 'M0,0 L1440,0 L1440,55 C1340,30 1220,110 1100,75 C960,35 840,125 700,65 C560,15 420,115 280,50 C160,-5 60,85 0,60 Z';
      }
      // Cascading deep-sea crests
      return 'M0,0 L1440,0 L1440,85 C1310,135 1180,45 1050,95 C910,140 780,30 640,90 C500,135 360,25 220,80 C120,125 50,45 0,65 Z';
    } else {
      // Bottom position: curves up from the bottom edge
      if (variant === 1) {
        return 'M0,140 L1440,140 L1440,55 C1320,5 1200,90 1080,40 C940,-5 800,80 680,25 C540,-20 400,85 260,35 C140,-5 60,75 0,50 Z';
      }
      if (variant === 2) {
        return 'M0,140 L1440,140 L1440,65 C1340,90 1220,10 1100,45 C960,85 840,-5 700,55 C560,105 420,5 280,70 C160,125 60,35 0,60 Z';
      }
      return 'M0,140 L1440,140 L1440,35 C1310,-15 1180,75 1050,25 C910,-20 780,90 640,30 C500,-15 360,95 220,40 C120,-5 50,75 0,55 Z';
    }
  };

  // Subtle translucent crest foam layer running slightly above the main wave
  const getAccentPath = () => {
    if (position === 'top') {
      if (variant === 1) {
        return 'M0,0 L1440,0 L1440,78 C1320,128 1200,42 1080,92 C940,138 800,52 680,108 C540,152 400,48 260,98 C140,138 60,58 0,82 Z';
      }
      if (variant === 2) {
        return 'M0,0 L1440,0 L1440,68 C1340,42 1220,122 1100,88 C960,48 840,138 700,78 C560,28 420,128 280,62 C160,8 60,98 0,72 Z';
      }
      return 'M0,0 L1440,0 L1440,98 C1310,148 1180,58 1050,108 C910,152 780,42 640,102 C500,148 360,38 220,92 C120,138 50,58 0,78 Z';
    } else {
      if (variant === 1) {
        return 'M0,140 L1440,140 L1440,42 C1320,-8 1200,78 1080,28 C940,-18 800,68 680,12 C540,-32 400,72 260,22 C140,-18 60,62 0,38 Z';
      }
      if (variant === 2) {
        return 'M0,140 L1440,140 L1440,52 C1340,78 1220,-2 1100,32 C960,72 840,-18 700,42 C560,92 420,-8 280,58 C160,112 60,22 0,48 Z';
      }
      return 'M0,140 L1440,140 L1440,22 C1310,-28 1180,62 1050,12 C910,-32 780,78 640,18 C500,-28 360,82 220,28 C120,-18 50,62 0,42 Z';
    }
  };

  const positionClass =
    position === 'top'
      ? 'top-0 left-0 right-0 -mt-[1px]'
      : 'bottom-0 left-0 right-0 -mb-[1px]';

  return (
    <div
      className={`w-full overflow-hidden leading-none absolute ${positionClass} z-20 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`relative block w-full ${heightClass}`}
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
      >
        {/* Soft atmospheric translucent wave crest accent */}
        {showAccent && (
          <path
            d={getAccentPath()}
            fill={fill}
            fillOpacity={position === 'top' ? 0.25 : 0.3}
          />
        )}
        {/* Main opaque organic wave divider */}
        <path d={getPath()} fill={fill} />
      </svg>
    </div>
  );
};
