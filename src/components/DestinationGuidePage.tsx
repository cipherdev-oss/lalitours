import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock, Star, Camera } from 'lucide-react';
import { LaliLogo } from './LaliLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FloatingScrollToTop } from './FloatingScrollToTop';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { DESTINATION_GUIDES } from '../data/destinationGuides';
import { initSmoothScroll, smoothScrollToTop } from '../utils/smoothScroll';

interface DestinationGuidePageProps {
  slug: string;
}

export const DestinationGuidePage: React.FC<DestinationGuidePageProps> = ({ slug }) => {
  const guide = DESTINATION_GUIDES.find((item) => item.slug === slug);

  useEffect(() => {
    initSmoothScroll();
    smoothScrollToTop(0.1);
  }, [slug]);

  useEffect(() => {
    if (!guide) return;
    document.title = guide.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', guide.metaDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', guide.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', guide.metaDescription);
  }, [guide]);

  if (!guide) {
    return (
      <main className="min-h-screen bg-[#040d16] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">Destination not found</h1>
        <p className="mt-3 text-slate-300">This destination guide is unavailable.</p>
        <a href="/#destinations" className="mt-6 text-cyan-300 hover:text-cyan-200">Back to Destinations</a>
      </main>
    );
  }

  const related = DESTINATION_GUIDES.filter((item) => guide.relatedSlugs.includes(item.slug));
  const whatsAppMessage = encodeURIComponent(`Hi Lali Ceylon Tours, I would like to plan a trip around ${guide.name}.`);

  return (
    <div className="min-h-screen bg-[#040d16] text-white">
      <header className="sticky top-0 z-40 border-b border-cyan-900/50 bg-[#071824]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
          <a href="/" aria-label="Lali Ceylon Tours home" className="shrink-0">
            <LaliLogo variant="horizontal" theme="dark" showTagline={false} />
          </a>
          <nav aria-label="Guide navigation" className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm">
            <a href="/#destinations" className="text-slate-300 hover:text-white transition-colors">Destinations</a>
            <a href="/#book" className="px-3 sm:px-4 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-colors">Plan a trip</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-slate-400 mb-7">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-cyan-300">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/#destinations" className="hover:text-cyan-300">Destinations</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-200">{guide.name}</li>
          </ol>
        </nav>

        <article>
          <header className="max-w-3xl mb-7 sm:mb-9">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-cyan-300 mb-4">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{guide.kicker}</span>
              <span className="inline-flex items-center gap-1.5 text-amber-200"><Star className="w-3.5 h-3.5" />Field notes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-semibold text-white leading-tight">{guide.name}</h1>
            <p className="mt-4 text-lg sm:text-xl font-serif italic text-cyan-100/90 leading-relaxed">{guide.lede}</p>
          </header>

          <figure className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-900/60 bg-[#081b2b]">
            <img src={guide.heroImage} alt={`${guide.name}, ${guide.region}, Sri Lanka`} className="w-full h-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06111a]/60 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-4 text-xs text-white/85">{guide.name} · {guide.region}, Sri Lanka</figcaption>
          </figure>

          {/* CREATIVE POSTCARD COLLAGE — asymmetric masonry */}
          <section aria-label={`${guide.name} photo journal`} className="mt-8 sm:mt-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200 mb-4">
              <Camera className="w-3.5 h-3.5" /> Postcards from {guide.name}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 auto-rows-[110px] sm:auto-rows-[150px]">
              {guide.collage.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-amber-300/50 transition-all duration-500 hover:z-10 ${image.className || ''}`}
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  <figcaption className="absolute bottom-2 left-2.5 right-2.5 text-[10px] sm:text-xs text-white/90 font-mono uppercase tracking-wider leading-tight">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          {/* ARTICLE BODY + STICKY FACTS SIDEBAR */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-12 mt-8 sm:mt-10">
            <div className="space-y-9">
              {guide.sections.map((section, index) => (
                <section key={section.heading}>
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="w-7 h-7 rounded-full bg-amber-300/15 border border-amber-300/40 text-amber-200 text-xs font-mono font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                    <h2 className="text-xl sm:text-2xl font-archivo font-bold text-white">{section.heading}</h2>
                  </div>
                  <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">{section.body}</p>
                  {index === 1 && (
                    <blockquote className="mt-6 relative rounded-2xl border-l-4 border-amber-300/70 bg-gradient-to-r from-amber-950/40 to-transparent px-5 sm:px-7 py-5">
                      <p className="font-serif italic text-lg sm:text-xl text-amber-100 leading-relaxed">“{guide.quote}”</p>
                    </blockquote>
                  )}
                </section>
              ))}

              {/* FULL-WIDTH WIDE SHOT TO CLOSE THE STORY */}
              <figure className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-cyan-900/60 bg-[#081b2b]">
                <img src={guide.wide.src} alt={guide.wide.caption} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06111a]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-xs text-white/85 font-mono uppercase tracking-wider">{guide.wide.caption}</figcaption>
              </figure>

              {related.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-archivo font-bold text-white">Continue exploring</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {related.map((item) => (
                      <a key={item.slug} href={`/destinations/${item.slug}/`} className="px-4 py-2 rounded-full border border-cyan-700/60 text-sm text-cyan-100 hover:border-cyan-400 hover:bg-cyan-950/50 transition-colors">
                        {item.name}
                      </a>
                    ))}
                    <a href="/#beyond-postcard" className="px-4 py-2 rounded-full border border-amber-700/60 text-sm text-amber-100 hover:border-amber-400 hover:bg-amber-950/40 transition-colors">
                      Hidden gems →
                    </a>
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 self-start border-t lg:border-t-0 lg:border-l border-cyan-900/60 pt-6 lg:pt-0 lg:pl-7">
              <p className="text-xs uppercase tracking-widest text-amber-200 font-bold">Field facts</p>
              <ul className="mt-4 space-y-3.5">
                {guide.facts.map((fact) => (
                  <li key={fact.label} className="flex items-start gap-2.5">
                    {fact.label.includes('Best') || fact.label.includes('season') ? (
                      <Calendar className="w-4 h-4 mt-0.5 text-amber-300 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 mt-0.5 text-cyan-300 shrink-0" />
                    )}
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{fact.label}</div>
                      <div className="text-sm text-slate-200">{fact.value}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-bold">Make it part of your journey</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">We build private routes around places like {guide.name} — tell us your dates and we shape the rest.</p>
                <a href={`/?interest=${encodeURIComponent(guide.name)}#book`} className="mt-5 w-full px-5 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  Plan this journey <ArrowRight className="w-4 h-4" />
                </a>
                <a href={`https://wa.me/971582177381?text=${whatsAppMessage}`} target="_blank" rel="noreferrer" className="mt-3 w-full px-5 py-3 rounded-full border border-emerald-400/50 text-emerald-200 hover:bg-emerald-950/40 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                  <WhatsAppIcon className="w-4 h-4" /> Ask about {guide.name}
                </a>
                <a href="/#destinations" className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Destinations
                </a>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <footer className="border-t border-cyan-900/40 bg-[#071824]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} Lali Ceylon Tours · Bespoke Sri Lanka Expeditions</span>
          <div className="flex items-center gap-4">
            <a href="/#tours" className="hover:text-cyan-300 transition-colors">Tours</a>
            <a href="/#beyond-postcard" className="hover:text-cyan-300 transition-colors">Hidden Serendipity</a>
            <a href="/#book" className="text-cyan-300 hover:text-cyan-200 transition-colors">Plan a trip</a>
          </div>
        </div>
      </footer>
      <FloatingScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
};
