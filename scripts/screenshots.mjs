import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT = process.env.OUT_DIR || './screenshots';

const pages = [
  { name: 'home', path: '/' },
  { name: 'evenemang', path: '/evenemang' },
  { name: 'historik', path: '/historik' },
  { name: 'styrelsen', path: '/styrelsen' },
  { name: 'medlem', path: '/medlem' },
  { name: 'hyra', path: '/hyra' },
  { name: 'kontakt', path: '/kontakt' },
  { name: 'karta', path: '/karta' },
  { name: 'kyrka', path: '/vinkols-kyrka' },
  { name: 'typografi', path: '/typografi' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const dir = resolve(OUT, vp.name);
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  for (const p of pages) {
    const url = `${BASE}${p.path}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(400);
      const file = resolve(dir, `${p.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('OK', file);
    } catch (e) {
      console.log('FAIL', url, e.message);
    }
  }
  await ctx.close();
}
await browser.close();
