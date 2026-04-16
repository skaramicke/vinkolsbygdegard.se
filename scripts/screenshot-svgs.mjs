/**
 * Renders each CategoryThumbnail SVG in isolation (400×160) and saves to
 * screenshots/svg/<category>.png for artifact upload.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const OUT = './screenshots/svg';
mkdirSync(OUT, { recursive: true });

const categories = ['vårstäd', 'grillkväll', 'våffla', 'tomte', 'historia', 'städ'];

// Each SVG is self-contained — build minimal HTML pages per category
// by inlining the built JS bundle and navigating to a hash-based route
// that renders a single SVG full-screen.
//
// Simpler: extract the SVG markup from the built bundle by rendering a
// small standalone HTML page that imports the SVG inline.

const C = {
  paper: '#f5efea', red: '#7d1818', redDark: '#5a1010',
  gold: '#a07a30', goldLight: '#c9a866', indigo: '#091733',
  olive: '#587818', oliveDark: '#3d5010',
  stone: '#bdb0a0', stoneDark: '#9a8a78',
};

const svgs = {
  'vårstäd': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="${C.olive}"/>
  ${Array.from({length:20}).map((_,i)=>`<line x1="${i*22}" y1="0" x2="${i*22-40}" y2="160" stroke="${C.oliveDark}" stroke-width="18" stroke-opacity="0.4"/>`).join('')}
  <g transform="translate(200,80)">
    <rect x="-5" y="-72" width="10" height="144" rx="4" fill="${C.goldLight}"/>
    <rect x="-18" y="28" width="36" height="12" rx="3" fill="${C.gold}"/>
    <rect x="-16" y="42" width="32" height="7" rx="2" fill="${C.gold}" fill-opacity="0.7"/>
    ${[-80,-64,-48,-32,-16,0,16,32,48,64,80].map(dx=>`<line x1="0" y1="49" x2="${dx}" y2="78" stroke="${C.goldLight}" stroke-width="3" stroke-linecap="round"/>`).join('')}
  </g>
  ${[[72,60,28,9,20],[48,118,20,7,14],[110,100,16,6,12]].map(([cx,cy,pd,rx,ry])=>
    `<g transform="translate(${cx},${cy})">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-${pd}" rx="${rx}" ry="${ry}" fill="#f5efea" transform="rotate(${a})" fill-opacity="0.9"/>`).join('')}<circle r="${Math.round(pd*0.48)}" fill="${C.gold}"/></g>`
  ).join('')}
  ${[[328,60,28,9,20],[352,118,20,7,14],[290,100,16,6,12]].map(([cx,cy,pd,rx,ry])=>
    `<g transform="translate(${cx},${cy})">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-${pd}" rx="${rx}" ry="${ry}" fill="#f5efea" transform="rotate(${a})" fill-opacity="0.9"/>`).join('')}<circle r="${Math.round(pd*0.48)}" fill="${C.gold}"/></g>`
  ).join('')}
  ${[[155,40,-30],[165,65,20],[235,40,30],[245,65,-20]].map(([cx,cy,a])=>
    `<ellipse cx="${cx}" cy="${cy}" rx="6" ry="13" fill="${C.olive}" transform="rotate(${a} ${cx} ${cy})"/>`
  ).join('')}
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.gold}" stroke-width="2"/>
</svg>`,

  'grillkväll': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="${C.indigo}"/>
  <rect width="400" height="60" fill="#0f2248" fill-opacity="0.6"/>
  ${[[30,18],[75,12],[120,25],[180,8],[240,20],[290,10],[350,22],[370,40],[20,50],[390,55],[155,38],[310,35]].map(([cx,cy],i)=>
    `<polygon points="${cx},${cy-4} ${cx+2},${cy} ${cx},${cy+4} ${cx-2},${cy}" fill="${C.goldLight}" fill-opacity="${0.6+i%3*0.15}"/>`
  ).join('')}
  <g transform="translate(200,88)">
    <line x1="-38" y1="44" x2="-55" y2="70" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>
    <line x1="38" y1="44" x2="55" y2="70" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>
    <line x1="-48" y1="62" x2="48" y2="62" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>
    <circle r="55" fill="${C.red}"/>
    <circle r="55" fill="none" stroke="${C.redDark}" stroke-width="3"/>
    <path d="M-55,0 A55,55 0 0,1 55,0" fill="${C.redDark}"/>
    ${[-36,-18,0,18,36].map(x=>`<line x1="${x}" y1="${-Math.round(Math.sqrt(55*55-x*x))}" x2="${x}" y2="${Math.round(Math.sqrt(55*55-x*x))}" stroke="${C.gold}" stroke-width="1.5" stroke-opacity="0.5"/>`).join('')}
    ${[-36,-18,0,18,36].map(y=>`<line x1="${-Math.round(Math.sqrt(Math.max(0,55*55-y*y)))}" y1="${y}" x2="${Math.round(Math.sqrt(Math.max(0,55*55-y*y)))}" y2="${y}" stroke="${C.gold}" stroke-width="1.5" stroke-opacity="0.5"/>`).join('')}
    <circle r="55" fill="none" stroke="${C.gold}" stroke-width="2" stroke-opacity="0.4"/>
    <rect x="-6" y="-60" width="12" height="10" rx="3" fill="${C.gold}"/>
  </g>
  <g transform="translate(200,33)">
    <path d="M-30,0 C-36,-12 -28,-28 -30,-40 C-20,-28 -18,-12 -30,0 Z" fill="${C.gold}"/>
    <path d="M30,0 C36,-12 28,-28 30,-40 C20,-28 18,-12 30,0 Z" fill="${C.gold}"/>
    <path d="M-15,0 C-22,-18 -12,-36 -15,-52 C-5,-36 0,-18 -15,0 Z" fill="${C.goldLight}"/>
    <path d="M15,0 C22,-18 12,-36 15,-52 C5,-36 0,-18 15,0 Z" fill="${C.goldLight}"/>
    <path d="M0,0 C-10,-22 -5,-44 0,-60 C5,-44 10,-22 0,0 Z" fill="#f5efea" fill-opacity="0.9"/>
  </g>
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.gold}" stroke-width="2" stroke-opacity="0.5"/>
</svg>`,

  'våffla': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="#7a5520"/>
  ${Array.from({length:8}).map((_,i)=>`<rect x="${i*52}" y="0" width="26" height="160" fill="#8a6028" fill-opacity="0.3"/>`).join('')}
  <g transform="translate(200,80)">
    <rect x="-140" y="-55" width="280" height="120" rx="8" fill="#3d2a10" fill-opacity="0.4" transform="translate(4,4)"/>
    <rect x="-140" y="-55" width="280" height="120" rx="8" fill="${C.goldLight}"/>
    ${Array.from({length:7}).map((_,col)=>Array.from({length:4}).map((_,row)=>`<rect x="${-128+col*40}" y="${-43+row*30}" width="36" height="26" rx="4" fill="${C.gold}" fill-opacity="0.5"/>`).join('')).join('')}
    <rect x="-140" y="-55" width="280" height="120" rx="8" fill="none" stroke="${C.gold}" stroke-width="3"/>
  </g>
  ${[[-40,-72],[-10,-78],[20,-72],[50,-75]].map(([dx,dy])=>`<path d="M${200+dx},${80+dy} C${200+dx-8},${80+dy-14} ${200+dx+8},${80+dy-26} ${200+dx},${80+dy-38}" fill="none" stroke="#f5efea" stroke-width="3" stroke-linecap="round" stroke-opacity="0.6"/>`).join('')}
  ${[[-165,35],[-165,-35],[165,35],[165,-35]].map(([dx,dy])=>`<polygon points="${200+dx},${80+dy-14} ${200+dx+10},${80+dy} ${200+dx},${80+dy+14} ${200+dx-10},${80+dy}" fill="#f5efea" fill-opacity="0.7"/>`).join('')}
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.goldLight}" stroke-width="2"/>
</svg>`,

  'tomte': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="${C.indigo}"/>
  <rect width="400" height="160" fill="#0f2248" fill-opacity="0.5"/>
  ${[[30,20],[80,40],[140,15],[50,80],[100,120],[160,90],[240,25],[300,45],[360,20],[330,90],[370,130],[260,110],[180,140],[70,145],[340,145],[380,60]].map(([cx,cy],i)=>
    `<g opacity="${0.3+i%4*0.12}" transform="translate(${cx},${cy})"><line x1="-7" y1="0" x2="7" y2="0" stroke="#f5efea" stroke-width="1.5"/><line x1="0" y1="-7" x2="0" y2="7" stroke="#f5efea" stroke-width="1.5"/><line x1="-5" y1="-5" x2="5" y2="5" stroke="#f5efea" stroke-width="1.5"/><line x1="5" y1="-5" x2="-5" y2="5" stroke="#f5efea" stroke-width="1.5"/></g>`
  ).join('')}
  <g transform="translate(200,80)">
    <polygon points="0,-72 -52,10 52,10" fill="${C.red}"/>
    <polygon points="0,-72 -52,10 0,-10 52,10" fill="${C.redDark}"/>
    <rect x="-58" y="7" width="116" height="14" rx="6" fill="${C.red}"/>
    <circle cx="0" cy="-72" r="11" fill="#f5efea"/>
    <circle cx="0" cy="-72" r="7" fill="${C.stone}"/>
    <rect x="-10" y="8" width="20" height="12" rx="1" fill="${C.gold}"/>
    <rect x="-6" y="10" width="12" height="8" rx="1" fill="${C.red}"/>
    <ellipse cx="0" cy="48" rx="55" ry="46" fill="#f5efea"/>
    <circle cx="-14" cy="18" r="5" fill="${C.indigo}"/>
    <circle cx="14" cy="18" r="5" fill="${C.indigo}"/>
    <circle cx="-12" cy="16" r="2" fill="white"/>
    <circle cx="16" cy="16" r="2" fill="white"/>
    <circle cx="0" cy="28" r="6" fill="${C.red}" fill-opacity="0.5"/>
    <circle cx="-22" cy="34" r="9" fill="${C.red}" fill-opacity="0.2"/>
    <circle cx="22" cy="34" r="9" fill="${C.red}" fill-opacity="0.2"/>
  </g>
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.gold}" stroke-width="2" stroke-opacity="0.6"/>
</svg>`,

  'historia': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="#e8ddd4"/>
  <ellipse cx="80" cy="35" rx="55" ry="22" fill="#f5efea" fill-opacity="0.7"/>
  <ellipse cx="320" cy="28" rx="65" ry="18" fill="#f5efea" fill-opacity="0.6"/>
  <ellipse cx="200" cy="40" rx="50" ry="15" fill="#f5efea" fill-opacity="0.5"/>
  <rect x="0" y="130" width="400" height="30" fill="${C.olive}" fill-opacity="0.3"/>
  <polygon points="45,130 65,68 85,130" fill="${C.olive}"/>
  <rect x="61" y="127" width="8" height="12" fill="${C.oliveDark}"/>
  <polygon points="22,130 38,80 54,130" fill="${C.oliveDark}" fill-opacity="0.8"/>
  <rect x="35" y="127" width="7" height="12" fill="${C.oliveDark}"/>
  <polygon points="315,130 335,68 355,130" fill="${C.olive}"/>
  <rect x="331" y="127" width="8" height="12" fill="${C.oliveDark}"/>
  <polygon points="346,130 362,80 378,130" fill="${C.oliveDark}" fill-opacity="0.8"/>
  <rect x="359" y="127" width="7" height="12" fill="${C.oliveDark}"/>
  <rect x="105" y="70" width="190" height="65" fill="${C.red}"/>
  <polygon points="88,70 200,28 312,70" fill="${C.redDark}"/>
  <rect x="122" y="86" width="28" height="32" rx="14" fill="${C.goldLight}" stroke="${C.gold}" stroke-width="1.5"/>
  <rect x="186" y="86" width="28" height="32" rx="14" fill="${C.goldLight}" stroke="${C.gold}" stroke-width="1.5"/>
  <rect x="250" y="86" width="28" height="32" rx="14" fill="${C.goldLight}" stroke="${C.gold}" stroke-width="1.5"/>
  <rect x="186" y="108" width="28" height="27" rx="4" fill="${C.indigo}"/>
  <rect x="190" y="112" width="10" height="16" rx="1" stroke="${C.gold}" stroke-width="0.8" fill="${C.indigo}" fill-opacity="0.6"/>
  <rect x="202" y="112" width="10" height="16" rx="1" stroke="${C.gold}" stroke-width="0.8" fill="${C.indigo}" fill-opacity="0.6"/>
  <rect x="196" y="20" width="8" height="22" fill="${C.gold}"/>
  <rect x="188" y="27" width="24" height="7" fill="${C.gold}"/>
  <rect x="98" y="133" width="204" height="5" rx="2" fill="${C.redDark}" fill-opacity="0.5"/>
  ${[[158,22],[242,22]].map(([cx,cy])=>`<g>${[0,45,90,135].map(a=>`<line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" stroke="${C.gold}" stroke-width="2" transform="rotate(${a} ${cx} ${cy})"/>`).join('')}</g>`).join('')}
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.gold}" stroke-width="2"/>
</svg>`,

  'städ': `
<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="160" fill="${C.stoneDark}"/>
  ${Array.from({length:6}).map((_,row)=>Array.from({length:10}).map((_,col)=>`<polygon points="${col*44+row%2*22},${row*30-4} ${col*44+row%2*22+10},${row*30+8} ${col*44+row%2*22},${row*30+20} ${col*44+row%2*22-10},${row*30+8}" fill="${C.stone}" fill-opacity="0.3"/>`).join('')).join('')}
  <g transform="translate(290,80)">
    <rect x="-5" y="-72" width="10" height="144" rx="4" fill="${C.olive}"/>
    <rect x="-28" y="58" width="56" height="12" rx="3" fill="${C.stone}"/>
    ${[-24,-16,-8,0,8,16,24].map((dx,i)=>`<line x1="${dx}" y1="70" x2="${dx+(i-3)*3}" y2="85" stroke="#f5efea" stroke-width="3" stroke-linecap="round" stroke-opacity="0.8"/>`).join('')}
  </g>
  <g transform="translate(145,88)">
    <path d="M-62,44 L62,44" stroke="#3d2a10" stroke-width="3" stroke-opacity="0.3"/>
    <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="#f5efea"/>
    <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="${C.stone}" fill-opacity="0.5"/>
    <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="none" stroke="${C.stoneDark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-68,16 L68,16" stroke="${C.stoneDark}" stroke-width="2.5" stroke-opacity="0.4"/>
    <path d="M-58,-48 C-80,-88 80,-88 58,-48" fill="none" stroke="#5a4a3a" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="0" cy="-48" rx="58" ry="14" fill="white" fill-opacity="0.85"/>
    ${[[-30,-68],[-12,-78],[8,-72],[28,-80],[45,-65]].map(([bx,by],i)=>`<circle cx="${bx}" cy="${by}" r="${5-i*0.5}" fill="white" fill-opacity="${0.7-i*0.1}"/>`).join('')}
  </g>
  ${[[355,20],[375,55],[365,100],[340,135],[40,20],[25,65],[50,130],[220,18],[220,145]].map(([cx,cy])=>`<g><line x1="${cx-10}" y1="${cy}" x2="${cx+10}" y2="${cy}" stroke="${C.gold}" stroke-width="2"/><line x1="${cx}" y1="${cy-10}" x2="${cx}" y2="${cy+10}" stroke="${C.gold}" stroke-width="2"/><line x1="${cx-7}" y1="${cy-7}" x2="${cx+7}" y2="${cy+7}" stroke="${C.gold}" stroke-width="1.5"/><line x1="${cx+7}" y1="${cy-7}" x2="${cx-7}" y2="${cy+7}" stroke="${C.gold}" stroke-width="1.5"/></g>`).join('')}
  <rect x="6" y="6" width="388" height="148" fill="none" stroke="${C.gold}" stroke-width="2" stroke-opacity="0.7"/>
</svg>`,
};

const browser = await chromium.launch();
for (const [name, svgSource] of Object.entries(svgs)) {
  const html = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#f5efea;width:400px;height:160px;overflow:hidden}</style></head><body>${svgSource}</body></html>`;
  const ctx = await browser.newContext({ viewport: { width: 400, height: 160 } });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  const slug = name.replace(/å/g,'a').replace(/ä/g,'a').replace(/ö/g,'o');
  const file = resolve(OUT, `${slug}.png`);
  await page.screenshot({ path: file });
  console.log('OK', name, '->', file);
  await ctx.close();
}
await browser.close();
