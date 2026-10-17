import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { LaliLogo } from './LaliLogo';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { FloatingScrollToTop } from './FloatingScrollToTop';
import { WhatsAppIcon } from './WhatsAppIcon';
import { HIDDEN_SPOT_CARDS } from '../data/hiddenSpotCards';
import { HIDDEN_SPOT_GUIDES } from '../data/hiddenSpotGuides';
import { initSmoothScroll, smoothScrollToTop } from '../utils/smoothScroll';

interface HiddenSpotGuidePageProps {
  slug: string;
}

export const HiddenSpotGuidePage: React.FC<HiddenSpotGuidePageProps> = ({ slug }) => {
  const spot = HIDDEN_SPOT_CARDS.find((item) => item.slug === slug);
  const guide = HIDDEN_SPOT_GUIDES.find((item) => item.slug === slug);

  useEffect(() => {
    initSmoothScroll();
    smoothScrollToTop(0.1);
  }, [slug]);

  useEffect(() => {
    if (!spot || !guide) return;

    document.title = guide.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', guide.metaDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', guide.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', guide.metaDescription);
  }, [spot, guide]);

  if (!spot || !guide) {
    return (
      <main className="min-h-screen bg-[#040d16] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">Guide not found</h1>
        <p className="mt-3 text-slate-300">This hidden-place guide is unavailable.</p>
        <a href="/#beyond-postcard" className="mt-6 text-cyan-300 hover:text-cyan-200">Back to Hidden Serendipity</a>
      </main>
    );
  }

  const relatedSpots = HIDDEN_SPOT_CARDS.filter((item) => guide.relatedSlugs.includes(item.slug));
  const whatsAppMessage = encodeURIComponent(`Hi Lali Ceylon Tours, I have a question about visiting ${spot.name}.`);

  return (
    <div className="min-h-screen bg-[#040d16] text-white">
      <header className="sticky top-0 z-40 border-b border-cyan-900/50 bg-[#071824]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
          <a href="/" aria-label="Lali Ceylon Tours home" className="shrink-0">
            <LaliLogo variant="horizontal" theme="dark" showTagline={false} />
          </a>
          <nav aria-label="Guide navigation" className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm">
            <a href="/#beyond-postcard" className="text-slate-300 hover:text-white transition-colors">Hidden Serendipity</a>
            <a href="/#book" className="px-3 sm:px-4 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-colors">Plan a trip</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-400 mb-7">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-cyan-300">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/#beyond-postcard" className="hover:text-cyan-300">Hidden Serendipity</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-200">{spot.name}</li>
          </ol>
        </nav>

        <article>
          <header className="max-w-3xl mb-7 sm:mb-9">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-cyan-300 mb-4">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{spot.region}</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>{spot.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-archivo font-extrabold leading-tight">{spot.name}</h1>
            <p className="mt-4 text-lg sm:text-xl font-serif italic text-cyan-100/90">{spot.tagline}</p>
          </header>

          <figure className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-900/60 bg-[#081b2b]">
            <img src={spot.image} alt={`${spot.name} in ${spot.region}, Sri Lanka`} className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111a]/55 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 text-xs text-white/85">{spot.name} · {spot.region}, Sri Lanka</figcaption>
          </figure>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-12 mt-8 sm:mt-10">
            <div className="space-y-9">
              <section>
                <h2 className="text-xl sm:text-2xl font-archivo font-bold">A quieter side of Sri Lanka</h2>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">{guide.overview}</p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-archivo font-bold">What to experience</h2>
                <ul className="mt-4 space-y-3">
                  {guide.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm sm:text-base leading-6 text-slate-300">
                      <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-archivo font-bold">Planning your visit</h2>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">{guide.planningNotes}</p>
                <h3 className="text-base font-bold mt-5">How it fits into a Sri Lanka trip</h3>
                <p className="mt-2 text-sm sm:text-base leading-7 text-slate-300">{guide.routeNotes}</p>
              </section>

              {relatedSpots.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-archivo font-bold">Continue exploring</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {relatedSpots.map((related) => (
                      <a
                        key={related.slug}
                        href={`/hidden-serendipity/${related.slug}/`}
                        className="px-4 py-2 rounded-full border border-cyan-700/60 text-sm text-cyan-100 hover:border-cyan-400 hover:bg-cyan-950/50 transition-colors"
                      >
                        {related.name}
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 self-start border-t lg:border-t-0 lg:border-l border-cyan-900/60 pt-6 lg:pt-0 lg:pl-7">
              <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">Make it part of your journey</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Tell us what interests you and we’ll help fit {spot.name} into a practical private itinerary.</p>
              <a
                href={`/?interest=${encodeURIComponent(spot.name)}#book`}
                className="mt-5 w-full px-5 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                Plan this journey <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/971582177381?text=${whatsAppMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full px-5 py-3 rounded-full border border-emerald-400/50 text-emerald-200 hover:bg-emerald-950/40 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Ask about this place
              </a>
              <a href="/#beyond-postcard" className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Hidden Serendipity
              </a>
            </aside>
          </div>
        </article>
      </main>

      <footer className="border-t border-cyan-950/70 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Lali Ceylon Tours · Sri Lanka
      </footer>
      <FloatingScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
};