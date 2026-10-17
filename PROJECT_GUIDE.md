# LALI CEYLON TOURS — Complete Project Guide for Future AI Models

> Purpose: Give any future LLM / coding agent everything to operate, edit, extend, deploy without re-exploring. **Read this first.**

## 1. What This Is
- Name: `lali-ceylon-tours` (brand: Lali Ceylon Tours — Bespoke Sri Lanka Expeditions)
- Type: Cinematic luxury travel marketing + booking-inquiry site. No backend / DB / auth.
- All inquiries funnel to WhatsApp + Email (lead-gen only, no payment).
- Contacts: WhatsApp `https://wa.me/971582177381` (+971 58 217 7381)
  Email `liyanageronali@gmail.com`
  HQ `Colombo 03 & Galle Fort, Sri Lanka`, claim `24/7 Concierge`

## 2. Tech Stack (exact)
- React 19.0.1 + ReactDOM 19, `jsx:react-jsx`, StrictMode in `src/main.tsx`
- Vite 8.3.0, alias `@` -> project root (vite.config.ts)
- Tailwind 4.3.3 via @tailwindcss/vite + autoprefixer, plus custom `src/index.css`
- Animation: `motion` 12.23.24, import from `motion/react` (NOT framer-motion)
- Icons: lucide-react 0.546.0 + custom LaliLogo, WhatsAppIcon
- Smooth scroll: lenis 1.3.27 wrapped in `src/utils/smoothScroll.ts` — NEVER raw window.scrollTo
- Fonts (index.html Google): Cormorant Garamond, DM Sans, Manrope, Montserrat
- TS ES2022, moduleResolution bundler, allowImportingTsExtensions
- Prerender: tsx 4.21.0 + react-dom/server renderToStaticMarkup
- Manager: bun.lock exists but npm works. Prefer npm.

Scripts:
dev=`vite --port=3000 --host=0.0.0.0`, build=`vite build && tsx prerender-hidden-guides.tsx`, preview=`vite preview`, lint=`tsc --noEmit`

Env (.env.example): GEMINI_API_KEY (reserved, unused), APP_URL (set at build for canonicals + sitemap.xml; if empty, relative URLs, no sitemap).

## 3. Folder Structure
Root: `/home/silvver/Documents/lali/lalitours/`
- index.html (title/meta/fonts/#root -> /src/main.tsx)
- vite.config.ts (react+tailwind, manualChunks vendor-react/motion/icons, HMR toggle, @ alias)
- package.json, tsconfig.json, metadata.json, .gitignore (node_modules,dist,.env*), .env.example
- prerender-hidden-guides.tsx (SEO prerender, see sec 11)
- public/img/ = CANONICAL images served as /img/... (sigiriya.webp,9.webp,mirissa.webp,n.webp,fort.webp,e.webp,yala.jpg, experiences/*.webp, map/*.webp, owner/*.jpeg, whatsapp-mark.svg)
- public/assets/bg1..bg4, pin_hero, places_bg
- img/ = DUPLICATE legacy, prefer public/img
- src/main.tsx (StrictMode->App), src/App.tsx (router+state, MOST IMPORTANT), src/types.ts, src/index.css, src/utils/smoothScroll.ts
- src/data/: destinations.ts (DESTINATIONS[6]), hiddenSpotCards.ts (8), hiddenSpotGuides.ts (8), sriLankaRealMapData.ts (9 provinces SVG + 3 routes)
- src/components/ (32 files, see sec 7). Home flow uses only: HeroViewer, AboutUsSection, SevenExperiences, IslandInteractiveMap, BeyondThePostcard + Navbar/Footer/Floating*. Others unused on home (ChooseYourJourney etc.) — do not re-add without asking.

## 4. Routing — NO react-router (custom in App.tsx)
Views: 'home'|'tours'|'destinations'|'about'|'book'
- Init from location.hash: #destinations,#tours,#about/#about-us,#book/#booking else home.
- handleNavigate(view,sectionId?): set view + set hash (or clear hash for home via replaceState), then smoothScrollToTop(1.2) or smoothScrollTo('#'+sectionId,{offset:-80}).
- hashchange listener syncs back/forward.
- ?interest=X -> booking notes `I am interested in adding X to my trip.` Used by hidden guides: `/?interest=Name#book`.
- Path route /hidden-serendipity/:slug/ -> render ONLY HiddenSpotGuidePage (no shell). Supports prerendered dist/hidden-serendipity/:slug/index.html. Component also sets document.title/meta on mount.
- Path route /destinations/:slug/ -> render ONLY DestinationGuidePage (blog-style guide, 6 slugs: sigiriya, ella, mirissa, nuwara-eliya, galle-fort, yala). Data: src/data/destinationGuides.ts (sections/quote/collage/facts). DestinationsPage cards + Explore Details navigate here; modal has "Read full field guide". NOT yet prerendered (see pending tasks).
- To add view: extend union in App+Navbar+Footer, add lazy import, add branch in <main>, add hash handling in initializer + handleHashChange + handleNavigate.

## 5. Global State & Layout (App.tsx)
- destinations=DESTINATIONS static. activeDestination shared (HeroViewer/DestinationsPage/Lightbox).
- lightboxState {isOpen,destination,initialIndex}, isConciergeOpen bool. Pause Lenis when either open.
- bookingPrefill {tourName?,notes?} via handleOpenBooking(str|Destination)->handleNavigate('book'). Keyword map: Classic->7days, Leopard/Coast->10days, Odyssey->14days, Wild/Safari->wildlife-safari, Ayurveda/Wellness->wellness; Destination obj -> `Inquiry focusing on {name}...`.
- isInitialLoading -> ModernPageLoader minDuration 1400. Lenis init on mount, destroy on unmount.
- Layout: Navbar + main(Suspense->view) + Footer + lazy modals + FloatingScrollToTop + FloatingWhatsApp + desktop ambient-slate-glow.
- Lazy: DestinationsPage,ToursPage,AboutUsPage,BookTourPage,IslandInteractiveMap,HiddenSpotGuidePage,PracticalTravelConcierge,SmoothLightbox.
- Floaters: SocialDock (desktop lg+ only, WhatsApp+Instagram+TikTok unified glass pill bottom-right w-12/w-7), FloatingWhatsApp (mobile lg:hidden only same link), FloatingScrollToTop (left).

## 6. Data Contracts (do not break)
- types.ts: Destination{id,name,displayTitle,subtitle,slogan,region,heroImage,cardImage,overview,highlights[3]}
- destinations.ts 6: sigiriya, ella(Ella & Nine Arch), mirissa, nuwara-eliya, galle-fort, yala. Images /img/*.webp must exist.
- hiddenSpotCards.ts 8 slugs (URL+prerender key): jaffna-and-islands, knuckles-mountain-range, kalpitiya-peninsula, nilaveli-and-pigeon-island, hiriketiya-horseshoe-bay, riverston-and-the-gap, gal-oya-national-park, delft-island. Shape {slug,name,region,secret,tagline,image,badge}. First local, rest Unsplash (keep referrerPolicy=no-referrer).
- hiddenSpotGuides.ts 8 1:1 {slug,title(| Hidden Serendipity),metaDescription,overview,highlights[3],planningNotes,routeNotes,relatedSlugs[2]}. Every card must have guide or build throws.
- sriLankaRealMapData.ts: REAL_SRI_LANKA_PROVINCES[9]{id,name,theme,color,fillColor,districts[{name,path}]} — do not hand-edit SVG. SIGNATURE_TRAVEL_ROUTES[3]: classic_circuit 10-12d, surf_safari 7-9d, ancient_north 8-10d {id,name,days,description,color,stops[],pathD 600x880}.
- ToursPage STADIUM_TOURS[8]: cultural-triangle-tour, hill-country-tour, southern-beach-tour, wildlife-tour, honeymoon-tour, family-tour, adventure-tour, custom-private-tour {id,title,duration,pax,image,fallbackImage,route,tagline,highlight,bestTimeToVisit,inclusions[4],notIncluded[3],stops[{days,place,focus}]}.
- BookTourPage TOUR_PACKAGES[8] simplified {id,name,location,duration,image,badge} — ids must match STADIUM_TOURS where overlapping.
- DestinationsPage ARCH_DESTINATIONS_DATA {id,number,title,province,description,duration,category beach|wildlife|culture|hills|adventure,categoryLabel,heroImage,fallbackImage,highlights[3],bestSeason}.

## 7. Components
Shell: Navbar(fixed glass pill, desktop+mobile drawer locks scroll, Esc closes; props onOpenBooking,onOpenConcierge,currentView,onNavigate), Footer(JourneyCloser cinematic finale + links + contact cards + Back to Top), ModernPageLoader, LaliLogo(variant horizontal theme dark), WaveDivider(position bottom fill MUST match next section bg variant 1|2; footer #02070d, hidden #040d16, map #0b2438), FloatingWhatsApp (always), FloatingScrollToTop.
Home order: HeroViewer(fullscreen auto 4.2s pauses off-screen, preload next, swipe, bubbles, play/pause) -> AboutUsSection(collage preserve) -> SevenExperiences(7 chapters surf/highlands/heritage/wild/sacred + thumbs) -> IslandInteractiveMap(real SVG 9 provinces +13 pins LOCATIONS + drawer +3 routes) -> BeyondThePostcard(8 cards grid id=beyond-postcard, preview modal Read guide->/hidden-serendipity/:slug/ Include->booking).
Pages(lazy): DestinationsPage(search+filter+preview->booking), ToursPage(STADIUM_TOURS cards Itinerary->TourDetailModal Book->booking), AboutUsPage(story+TESTIMONIALS+trust 99.4%/12+/100%/24-7), BookTourPage(CONVERSION: select 8, date, adults/children, type Private|Couple|Family|Group, name/phone/code/email/notes, summary sidebar, BookingReviewModal->wa.me encoded), HiddenSpotGuidePage(standalone SEO article breadcrumb/hero/highlights/planning/related/sticky CTA /?interest=X#book + WhatsApp; no shell).
Modals: TourDetailModal(ESSENTIAL_HIGHLIGHTS per id + WhatsApp + Book), BookingReviewModal(review table Edit/Continue to WhatsApp), PracticalTravelConcierge, SmoothLightbox.

## 8. Booking Flow (preserve)
Any onOpenBooking -> App.handleOpenBooking -> bookingPrefill -> view book(#book) -> BookTourPage validate -> BookingReviewModal -> window.open wa.me/971582177381?text=Encoded{package,date,party,type,name,phone,email,notes} + mailto fallback. No server. Test by inspecting whatsAppUrl. Keep ids stable, keyword map in sync, encodeURIComponent, 44px targets.

## 9. Styling
Tailwind v4 @import tailwindcss, no config. index.css: logo-title/tagline, nav-links, hero-title(.lali/.ceylon/.tours), hero-location/description, destination-name, glass-panel/light/card/active, glows, ambient-slate-glow, curved-bubble-item, section-lazy(content-visibility:auto), scrollbar, gpu-layer. Theme navy #02070d/#0f172a/#0a1420, cyan #00d9ff/#38bdf8, amber #f5d15c. Body Manrope, logo Montserrat, hero DM Sans 900, serif Cormorant. Rules: motion/react only, smoothScroll utils offset -80, section-lazy on new sections, lazy+async imgs, no-referrer Unsplash, min-h-44px buttons.

## 10. Images
public/ -> /img/...,/assets/... verbatim. Prefer webp + fallbackImage onError. Hero preloads next only. Unsplash keep ?auto=format&fit=crop&w=..&q=80. Attribution public/img/experiences/ATTRIBUTION.md. New files kebab-case (owner jpegs have spaces — avoid).

## 11. SEO Prerender
index.html title `Lali Ceylon Tours - Bespoke Sri Lanka Expeditions` + desc/og + favicon /img/lali-logo.png. Build vite build->dist/index.html->tsx prerender-hidden-guides.tsx loops cards, renderToStaticMarkup(HiddenSpotGuidePage), inject title/meta/canonical(APP_URL/.../slug/)/JSON-LD Article, strip module scripts, write dist/hidden-serendipity/slug/index.html. If APP_URL set write sitemap.xml (root+8). Host needs SPA fallback + static subpaths. Add gem: edit BOTH cards+guides same slug kebab, keep relatedSlugs valid, rebuild.

## 12. Cookbook
cd /home/silvver/Documents/lali/lalitours; npm install; npm run dev (3000); npm run lint (before commit); npm run build (APP_URL env for sitemap); npm run preview.
- Add destination: data/destinations.ts + /img webp in public/img + optional ARCH_DATA + LOCATIONS.
- Add tour: STADIUM_TOURS + TOUR_PACKAGES same id + ESSENTIAL_HIGHLIGHTS + App keyword match.
- Add hidden gem: cards+guides same slug -> build auto-prerenders (BeyondThePostcard auto).
- Change WA/email: replace 971582177381 + liyanageronali@gmail.com in SocialDock,FloatingWhatsApp,Navbar,Footer,BookTourPage,TourDetailModal,HiddenSpotGuidePage.
- New home section: src/components/X.tsx({onOpenBooking?}), import lazy if heavy, insert order, end WaveDivider fill=next bg, section-lazy.
- DO NOT: add router/redux/backend, change vite alias/HMR, rename Destination fields or tour ids solo, delete hidden path/prerender, import framer-motion.

## 13. Checklist Before Done
lint passes, build logs `Prerendered 8 Hidden Serendipity guides.`, hash nav + back btn, booking->review->WA URL has package/date/party/name, hidden slug renders + related valid, no img 404, Unsplash no-referrer, mobile drawer/44px/no h-scroll.

## 14. File -> When
App.tsx routing/state/home order/prefill; data/destinations hero; hiddenSpot* gems+SEO; sriLankaRealMapData shapes (rare); BookTourPage packages/form/WA msg; ToursPage itineraries; Navbar/Footer nav+contacts; smoothScroll all scroll; index.css fonts/glass/hero; prerender SEO; index.html title/meta/fonts.
## 15. PENDING TASKS
- [ ] **Set `APP_URL` + rebuild sitemap:** Create `.env` with `APP_URL=https://<production-domain>` then rerun `npm run build` — generates absolute canonicals + `dist/sitemap.xml` (root + 8 hidden guides). Skipped 2026-10-17 because production domain unknown. Do this as soon as the domain is decided, BEFORE deploying.
- [ ] **Prerender destination guides:** extend `prerender-hidden-guides.tsx` to also render the 6 `/destinations/:slug/` pages (import DestinationGuidePage + DESTINATION_GUIDES) and include them in sitemap — needed for SEO + static hosting without SPA fallback.
- [ ] Decide fate of unused `src/components/JourneyCloser.tsx` (removed from Footer, nothing imports it — delete or reuse).
- [ ] Real Instagram/TikTok URLs: placeholders in `src/components/SocialDock.tsx` (`SOCIALS` const at top) still point to guessed handles `laliceylontours`.
- [ ] Accent switcher (`AccentSwitcher.tsx` + `data-accent` CSS in `index.css`) was mid-implementation — verify all accent classes work; Tailwind v4 token-remap caveat applies (see chat history: prefer semantic classes over `--color-*` overrides).

Generated 2026-10-17. Update when structure changes.




