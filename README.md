# 🇱🇰 Lali Ceylon Tours

> Bespoke private expeditions, certified naturalist safaris, tea country retreats, and luxury chauffeured journeys across Sri Lanka.

![Lali Ceylon Tours](public/img/lali-logo.png)

---

## 🧭 Overview

**Lali Ceylon Tours** is a cinematic, modern luxury travel web application tailored for discerning travelers planning bespoke journeys across Sri Lanka. Built with cutting-edge frontend architecture, it blends immersive photography, an interactive island map, curated expedition itineraries, and instant WhatsApp concierge connectivity.

### Key Highlights

- **Interactive Island Exploration**: Dynamic vector map of Sri Lanka featuring 13 glowing discovery pins, regional guides, and an interactive itinerary drawer.
- **Sri Lanka in 7 Experiences**: High-impact visual storytelling showcasing cultural landmarks, tea country train routes, wildlife safaris, and coastal escapes.
- **Hidden Serendipity Destination Guides**: Pre-rendered, SEO-optimized individual guides for off-the-beaten-path locations (Jaffna, Knuckles, Kalpitiya, Nilaveli, Hiriketiya, Riverston, Gal Oya, Delft Island) with Open Graph meta tags, Schema.org `Article` JSON-LD, and automatic `sitemap.xml` generation.
- **Handcrafted Expedition Packages**: Comprehensive multi-day journey breakdowns (7-day, 10-day, 14-day, Wildlife Safari, Wellness retreats) with interactive booking drawers.
- **Seamless Booking & WhatsApp Concierge**: Instant custom itinerary request form prefilled with travelers' desired spots, paired with direct 24/7 WhatsApp hotline integration.
- **Modern Performance & Smooth Scroll**: Powered by Lenis smooth scrolling, hardware-accelerated animations via Motion, and responsive Tailwind CSS v4.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite (Rolldown engine)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation & Motion**: Motion (`motion/react`)
- **Icons**: Lucide React
- **Smooth Scrolling**: Lenis
- **Pre-rendering & SEO**: Static pre-renderer (`prerender-hidden-guides.tsx` using `react-dom/server`)
- **Hosting Target**: Netlify (with SPA redirect fallback, edge caching, and security headers)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20 or higher recommended
- **Package Manager**: `npm` (v10+) or `bun`

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/cipherdev-oss/lalitours.git
cd lalitours
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Type Checking

```bash
npm run lint
```

### Production Build

Build the optimized client bundle and generate pre-rendered guide pages with sitemap:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to Netlify

The project includes a ready-to-deploy [`netlify.toml`](./netlify.toml) configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Runtime: Node.js 20
- SPA route rewrite fallback (`/* -> /index.html 200`)
- Pre-rendered static route resolution (`/hidden-serendipity/*`)
- HTTP cache control for immutable hashed assets (`/assets/*`)
- Web security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)

### Deployment Steps

1. **Push your code to GitHub**:
   Ensure your latest code is committed and pushed to the `main` branch.

2. **Connect to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com/).
   - Click **Add new site** > **Import an existing project**.
   - Select **GitHub** and choose the `cipherdev-oss/lalitours` repository.

3. **Verify Build Settings** (Auto-detected from `netlify.toml`):
   - **Base directory**: *(leave empty)*
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Deploy**:
   - Click **Deploy site**.
   - Netlify will build the application, pre-render the guides, generate the sitemap, and publish the site to your Netlify CDN subdomain.

5. **Custom Domain (Optional)**:
   - In Netlify Site Settings > **Domain Management**, add your custom domain (e.g., `laliceylontours.com`).
   - If using a custom domain, optionally set the environment variable `APP_URL=https://laliceylontours.com` in Netlify Site Settings > **Environment variables** to ensure canonical links and `sitemap.xml` use your custom domain.

---

## 📁 Project Structure

```text
├── dist/                      # Production build output
├── public/                    # Static public assets (logos, images, robots.txt)
│   ├── assets/                # Background art and decorative graphics
│   ├── img/                   # Destination photos, team photos, and brand SVGs
│   └── robots.txt             # Web crawler configuration
├── src/
│   ├── components/            # React UI components
│   │   ├── AboutUsPage.tsx
│   │   ├── AboutUsSection.tsx
│   │   ├── BeyondThePostcard.tsx
│   │   ├── BookTourPage.tsx
│   │   ├── DestinationsPage.tsx
│   │   ├── IslandInteractiveMap.tsx
│   │   ├── Navbar.tsx
│   │   ├── SevenExperiences.tsx
│   │   ├── ToursPage.tsx
│   │   └── ...
│   ├── data/                  # Tour itineraries, destinations, and hidden spot guides
│   ├── utils/                 # Smooth scroll and helper utilities
│   ├── App.tsx                # Main application layout and hash/path router
│   ├── index.css              # Global styling & Tailwind directives
│   └── main.tsx               # Client entry point
├── netlify.toml               # Netlify deployment and header configuration
├── package.json               # NPM scripts and dependencies
├── package-lock.json          # Deterministic dependency lockfile
├── prerender-hidden-guides.tsx# Server-side prerenderer for SEO guides
├── tsconfig.json              # TypeScript compiler configuration
└── vite.config.ts             # Vite build configuration and code-splitting
```

---

## 📄 License

Private & Confidential © Lali Ceylon Tours. All rights reserved.
