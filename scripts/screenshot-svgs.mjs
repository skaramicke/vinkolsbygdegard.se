/**
 * Renders each CategoryThumbnail from the live built app.
 * Navigates to /evenemang, finds each [data-category] wrapper,
 * and screenshots the contained SVG at its natural size.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = './screenshots/svg';
mkdirSync(OUT, { recursive: true });

const slugify = (s) => s.replace(/å/g,'a').replace(/ä/g,'a').replace(/ö/g,'o');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(`${BASE}/evenemang`, { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(500);

const thumbs = page.locator('[data-category]');
const count = await thumbs.count();
console.log(`Found ${count} category SVG thumbnails`);

const seen = new Set();
for (let i = 0; i < count; i++) {
  const el = thumbs.nth(i);
  const cat = await el.getAttribute('data-category');
  if (!cat || seen.has(cat)) continue;
  seen.add(cat);
  const slug = slugify(cat);
  const file = resolve(OUT, `${slug}.png`);
  await el.locator('svg').screenshot({ path: file });
  console.log(`OK  ${cat}  →  ${file}`);
}

await ctx.close();
await browser.close();
