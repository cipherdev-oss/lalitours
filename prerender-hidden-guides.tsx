import React from 'react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { HIDDEN_SPOT_CARDS } from './src/data/hiddenSpotCards';
import { HIDDEN_SPOT_GUIDES } from './src/data/hiddenSpotGuides';
import { DESTINATION_GUIDES } from './src/data/destinationGuides';
import { HiddenSpotGuidePage } from './src/components/HiddenSpotGuidePage';
import { DestinationGuidePage } from './src/components/DestinationGuidePage';

const rootDirectory = process.cwd();
const distDirectory = path.join(rootDirectory, 'dist');
const indexTemplate = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const configuredAppUrl = (process.env.APP_URL || process.env.URL || process.env.DEPLOY_PRIME_URL)?.trim();
const siteUrl = configuredAppUrl && /^https?:\/\//i.test(configuredAppUrl)
  ? configuredAppUrl.replace(/\/+$/, '')
  : undefined;

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// 1. Prerender Hidden Serendipity Guides
for (const spot of HIDDEN_SPOT_CARDS) {
  const guide = HIDDEN_SPOT_GUIDES.find((item) => item.slug === spot.slug);
  if (!guide) throw new Error(`Missing guide content for ${spot.slug}`);

  const route = `/hidden-serendipity/${spot.slug}/`;
  const canonicalUrl = siteUrl ? `${siteUrl}${route}` : route;
  const structuredData = siteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        image: new URL(spot.image, siteUrl).toString(),
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'Lali Ceylon Tours' },
        publisher: { '@type': 'Organization', name: 'Lali Ceylon Tours' },
      }
    : undefined;

  const seoTags = [
    canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />` : '',
    siteUrl ? `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />` : '',
    `<meta property="og:type" content="article" />`,
    siteUrl ? `<meta property="og:image" content="${escapeHtml(new URL(spot.image, siteUrl).toString())}" />` : '',
    structuredData
      ? `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean).join('\n    ');

  const pageMarkup = renderToStaticMarkup(<HiddenSpotGuidePage slug={spot.slug} />);
  const pageHtml = indexTemplate
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(guide.title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${escapeHtml(guide.metaDescription)}" />`)
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${escapeHtml(guide.title)}" />`)
    .replace(/<meta property="og:description"[^>]*\/>/, `<meta property="og:description" content="${escapeHtml(guide.metaDescription)}" />`)
    .replace('</head>', `    ${seoTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${pageMarkup}</div>`)
    .replace(/<link rel="modulepreload"[^>]*\/?\s*>/g, '')
    .replace(/<script type="module"[^>]*><\/script>/g, '');

  const routeDirectory = path.join(distDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, 'index.html'), pageHtml, 'utf8');
}

// 2. Prerender Destination Field Guides
for (const guide of DESTINATION_GUIDES) {
  const route = `/destinations/${guide.slug}/`;
  const canonicalUrl = siteUrl ? `${siteUrl}${route}` : route;
  const structuredData = siteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        image: new URL(guide.heroImage, siteUrl).toString(),
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'Lali Ceylon Tours' },
        publisher: { '@type': 'Organization', name: 'Lali Ceylon Tours' },
      }
    : undefined;

  const seoTags = [
    canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />` : '',
    siteUrl ? `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />` : '',
    `<meta property="og:type" content="article" />`,
    siteUrl ? `<meta property="og:image" content="${escapeHtml(new URL(guide.heroImage, siteUrl).toString())}" />` : '',
    structuredData
      ? `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean).join('\n    ');

  const pageMarkup = renderToStaticMarkup(<DestinationGuidePage slug={guide.slug} />);
  const pageHtml = indexTemplate
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(guide.title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${escapeHtml(guide.metaDescription)}" />`)
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${escapeHtml(guide.title)}" />`)
    .replace(/<meta property="og:description"[^>]*\/>/, `<meta property="og:description" content="${escapeHtml(guide.metaDescription)}" />`)
    .replace('</head>', `    ${seoTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${pageMarkup}</div>`)
    .replace(/<link rel="modulepreload"[^>]*\/?\s*>/g, '')
    .replace(/<script type="module"[^>]*><\/script>/g, '');

  const routeDirectory = path.join(distDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, 'index.html'), pageHtml, 'utf8');
}

// 3. Generate Complete Sitemap
if (siteUrl) {
  const urls = [
    siteUrl,
    ...HIDDEN_SPOT_CARDS.map((spot) => `${siteUrl}/hidden-serendipity/${spot.slug}/`),
    ...DESTINATION_GUIDES.map((dest) => `${siteUrl}/destinations/${dest.slug}/`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8');
}

console.log(`Prerendered ${HIDDEN_SPOT_CARDS.length} Hidden Serendipity guides and ${DESTINATION_GUIDES.length} Destination guides.`);