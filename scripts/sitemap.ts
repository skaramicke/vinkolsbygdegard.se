import fs from "fs";
import path from "path";

const BASE_URL = "https://vinkolsbygdegard.se";
const dataFile = path.resolve(__dirname, "../src/data.json");
const outputFile = path.resolve(__dirname, "../build/sitemap.xml");

const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

// Slug of the home/start page — skip it (content lives at /)
const startPageTitle: string = (data.settings?.[0]?.startPage) ?? "";
const startPage = (data.pages ?? []).find((p: any) => p.title === startPageTitle);
const startSlug: string = startPage?.slug ?? "";

function encodePathSegment(seg: string): string {
  return seg.split("/").map((s) => encodeURIComponent(s)).join("/");
}

interface UrlEntry {
  loc: string;
  lastmod?: string;
  priority: number;
}

const urls: UrlEntry[] = [
  { loc: `${BASE_URL}/`, priority: 1.0 },
];

if (data.pages) {
  for (const page of data.pages) {
    // Skip start page — its canonical URL is /
    if (!page.slug || page.slug === startSlug) continue;
    urls.push({
      loc: `${BASE_URL}/${encodePathSegment(page.slug)}`,
      priority: 0.8,
    });
  }
}

if (data.news) {
  for (const news of data.news) {
    if (news.slug) {
      const lastmod = news.date ? news.date.slice(0, 10) : undefined;
      urls.push({
        loc: `${BASE_URL}/nyheter/${encodePathSegment(news.slug)}`,
        lastmod,
        priority: 0.6,
      });
    }
  }
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(({ loc, lastmod, priority }) => {
    const lines = [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <priority>${priority.toFixed(1)}</priority>`,
      "  </url>",
    ].filter(Boolean);
    return lines.join("\n");
  }),
  "</urlset>",
].join("\n");

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, xml, "utf-8");
console.log(`Sitemap: ${outputFile} (${urls.length} URLs)`);
