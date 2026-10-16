import React from 'react';

interface ExperienceHighlightsProps {
  onExploreClick: () => void;
}

export const ExperienceHighlights: React.FC<ExperienceHighlightsProps> = ({ onExploreClick }) => {
  const pillars = [
    {
      title: 'Ceylon Terroir & Highlands',
      tagline: 'Misty Mountains & Heritage Tea',
      description: 'Handcrafted single-estate Ceylon tea gardens terraced along high-altitude mountain ridges, where morning mist gives way to crystal waterfalls and cool highland breezes.',
    },
    {
      title: '2,500 Years of Heritage',
      tagline: 'Ancient Citadels & Sacred Relics',
      description: 'Ancient hydraulic wonders, royal rock palaces in the sky, and sacred UNESCO monastic sanctums that have preserved continuous living spiritual culture for millennia.',
    },
    {
      title: 'Untamed Wildlife Sanctuaries',
      tagline: 'Realm of the Leopard & Great Whales',
      description: 'One of Earth’s premier biodiversity sanctuaries, where wild leopards roam arid coastal plains, elephant herds gather in hundred-strong herds, and blue whales breach sapphire waters.',
    },
    {
      title: 'The Soul of Serendipity',
      tagline: 'Ayurvedic Wellness & Coastal Warmth',
      description: 'Ancient healing traditions passed through generations, organic spice gastronomy, and the gentle, genuine warmth that inspired the Persian word for fortunate discovery—Serendip.',
    },
  ];

  return (
    <section id="experiences" className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 border-t border-cyan-500/15">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-amber-400/80" />
          <span className="text-amber-300 text-[11px] font-semibold tracking-[0.3em] uppercase">
            The Essence of the Island
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-white tracking-wide leading-tight">
          A Land Like No Other
        </h2>
        <p className="text-sm sm:text-base text-slate-300/80 font-light mt-4 leading-relaxed max-w-2xl">
          Compact yet immensely diverse, Sri Lanka offers an extraordinary confluence of equatorial landscapes, royal history, and soulful tranquility within hours of each other.
        </p>
      </div>

      {/* 4 Clean Editorial Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="p-8 rounded-2xl backdrop-blur-xl border border-white/15 bg-slate-800/45 shadow-xl flex flex-col justify-between hover:border-white/30 hover:bg-slate-800/70 transition-all duration-300"
          >
            <div>
              <span className="font-mono text-xs text-amber-300 font-bold tracking-widest block mb-4">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif-display text-xl font-medium text-white tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-[11px] tracking-wider uppercase text-amber-200/90 mt-1 mb-4 font-light">
                {pillar.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Call to Action */}
      <div className="mt-16 text-center">
        <button
          onClick={onExploreClick}
          className="px-8 py-3 rounded-full bg-white text-slate-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-amber-300 transition-all shadow-xl cursor-pointer"
        >
          Begin Your Journey
        </button>
      </div>
    </section>
  );
};
