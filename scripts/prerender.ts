/**
 * Build-time prerender: generates per-route index.html files in build/
 * with correct title, description, canonical, OG, Twitter, and JSON-LD
 * pre-populated in <head>. Serves crawlers and social-sharing scrapers
 * correct meta without JavaScript execution.
 *
 * The files still include the React bundle so normal SPA hydration works.
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://vinkolsbygdegard.se";
const SITE_NAME = "Vinköls Bygdegårdsförening";
const DEFAULT_IMAGE = `${BASE_URL}/images/header.png`;
const DEFAULT_DESCRIPTION =
  "Vinköls Bygdegårdsförening — bygdens samlingsplats sedan 1923. Evenemang, uthyrning och historia från Vinköl.";

const dataFile = path.resolve(__dirname, "../src/data.json");
const buildDir = path.resolve(__dirname, "../build");
const templateFile = path.join(buildDir, "index.html");

const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
const template = fs.readFileSync(templateFile, "utf-8");

const settings = (data.settings ?? [])[0] ?? {};
const siteDescription: string = settings.description || DEFAULT_DESCRIPTION;
const eventPageTitle: string = settings.eventsPage ?? "";
const newsPageTitle: string = settings.newsPage ?? "";

// ── helpers ─────────────────────────────────────────────────────────────────

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractDescription(body: any[]): string {
  if (!body) return siteDescription;
  const firstText = body.find((b: any) => b.type === "text");
  if (!firstText?.body) return siteDescription;
  return (
    firstText.body
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_#`~>]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200) || siteDescription
  );
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo192.png`,
    foundingDate: "1923",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vinköl",
      addressRegion: "Västra Götaland",
      addressCountry: "SE",
    },
  };
}

function eventListSchema(events: any[]) {
  if (!events.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.title,
        startDate: e.date,
        ...(e.endDate ? { endDate: e.endDate } : {}),
        location: {
          "@type": "Place",
          name: SITE_NAME,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vinköl",
            addressCountry: "SE",
          },
        },
        organizer: {
          "@type": "Organization",
          name: e.organizerName ?? SITE_NAME,
          ...(e.organizerName ? {} : { url: BASE_URL }),
        },
        url: `${BASE_URL}/evenemang`,
      },
    })),
  };
}

function newsArticleSchema(news: any, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    datePublished: news.date,
    description,
    publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
    url: `${BASE_URL}/nyheter/${news.slug}`,
    ...(news.thumbnail
      ? {
          image: news.thumbnail.startsWith("http")
            ? news.thumbnail
            : `${BASE_URL}${news.thumbnail}`,
        }
      : {}),
  };
}

// ── HTML injection ────────────────────────────────────────────────────────────

function injectMeta(
  html: string,
  route: string,
  title: string,
  description: string,
  image: string | null,
  schema: object | null
): string {
  const pageTitle = `${title} — ${SITE_NAME}`;
  const canonical = `${BASE_URL}${route === "/" ? "" : route}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${BASE_URL}${image}`
    : DEFAULT_IMAGE;

  // Replace existing <title>
  let result = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escHtml(pageTitle)}</title>`
  );

  // Replace existing description meta (handles multi-line in template)
  result = result.replace(
    /<meta\s[\s\S]*?name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escHtml(description)}" />`
  );

  const inject = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escHtml(pageTitle)}" />`,
    `<meta property="og:description" content="${escHtml(description)}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escHtml(SITE_NAME)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escHtml(pageTitle)}" />`,
    `<meta name="twitter:description" content="${escHtml(description)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    ...(schema
      ? [
          `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
        ]
      : []),
  ]
    .map((line) => `    ${line}`)
    .join("\n");

  return result.replace("</head>", `${inject}\n  </head>`);
}

function writeRoute(route: string, html: string) {
  // '/' → build/index.html, '/foo' → build/foo/index.html
  const dir =
    route === "/" ? buildDir : path.join(buildDir, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
}

// ── routes ────────────────────────────────────────────────────────────────────

let count = 0;

// Home / start page
const startPage = (data.pages ?? []).find(
  (p: any) => p.title === settings.startPage
);
if (startPage) {
  const desc = extractDescription(startPage.body);
  const html = injectMeta(template, "/", startPage.title, desc, null, organizationSchema());
  writeRoute("/", html);
  count++;
}

// Static pages
const now = Date.now();
for (const page of data.pages ?? []) {
  const isEventsPage = page.title === eventPageTitle;
  const isNewsPage = page.title === newsPageTitle;

  let schema: object | null = null;
  if (isEventsPage) {
    const upcoming = (data.events ?? []).filter(
      (e: any) => new Date(e.date).getTime() > now
    );
    schema = eventListSchema(upcoming);
  }

  const desc = extractDescription(page.body);
  const html = injectMeta(template, `/${page.slug}`, page.title, desc, null, schema);
  writeRoute(`/${page.slug}`, html);
  count++;
}

// News articles
for (const news of data.news ?? []) {
  const desc = extractDescription(news.body);
  const schema = newsArticleSchema(news, desc);
  const html = injectMeta(
    template,
    `/nyheter/${news.slug}`,
    news.title,
    desc,
    news.thumbnail ?? null,
    schema
  );
  writeRoute(`/nyheter/${news.slug}`, html);
  count++;
}

console.log(`Prerender: ${count} routes written to ${buildDir}`);
