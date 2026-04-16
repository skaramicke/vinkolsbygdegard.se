import React from "react";

export type EventCategory =
  | "vårstäd"
  | "grillkväll"
  | "våffla"
  | "tomte"
  | "historia"
  | "städ";

// 400×160 viewBox — designs fill the full space, no small centered icons

const VarstadSvg: React.FC = () => (
  // Olive field with large central broom, folk flowers flanking
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {/* Background */}
    <rect width="400" height="160" fill="#3d5010"/>
    {/* Subtle stripe texture */}
    {Array.from({length: 20}).map((_, i) => (
      <line key={i} x1={i*22} y1="0" x2={i*22-40} y2="160" stroke="#587818" strokeWidth="18" strokeOpacity="0.4"/>
    ))}

    {/* Large broom — handle spans full height, bristles fill right side */}
    <g transform="translate(200,80)">
      {/* Handle */}
      <rect x="-5" y="-72" width="10" height="144" rx="4" fill="#c9a866"/>
      {/* Binding */}
      <rect x="-18" y="28" width="36" height="12" rx="3" fill="#a07a30"/>
      <rect x="-16" y="42" width="32" height="7" rx="2" fill="#a07a30" fillOpacity="0.7"/>
      {/* Bristles — wide fan from binding base */}
      {[-80,-64,-48,-32,-16,0,16,32,48,64,80].map((dx, i) => (
        <line key={i} x1="0" y1="49" x2={dx} y2="78" stroke="#c9a866" strokeWidth="3" strokeLinecap="round"/>
      ))}
    </g>

    {/* Folk flowers LEFT — large, filling left third */}
    {/* Flower 1 */}
    <g transform="translate(72,60)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-28" rx="9" ry="20" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.9"/>
      ))}
      <circle r="13" fill="#a07a30"/>
      <circle r="7" fill="#f5efea" fillOpacity="0.6"/>
    </g>
    {/* Flower 2 */}
    <g transform="translate(48,118)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-20" rx="7" ry="14" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.85"/>
      ))}
      <circle r="10" fill="#a07a30"/>
    </g>
    {/* Flower 3 */}
    <g transform="translate(110,100)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-16" rx="6" ry="12" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.8"/>
      ))}
      <circle r="8" fill="#a07a30"/>
    </g>

    {/* Folk flowers RIGHT */}
    <g transform="translate(328,60)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-28" rx="9" ry="20" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.9"/>
      ))}
      <circle r="13" fill="#a07a30"/>
      <circle r="7" fill="#f5efea" fillOpacity="0.6"/>
    </g>
    <g transform="translate(352,118)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-20" rx="7" ry="14" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.85"/>
      ))}
      <circle r="10" fill="#a07a30"/>
    </g>
    <g transform="translate(290,100)">
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy="-16" rx="6" ry="12" fill="#f5efea" transform={`rotate(${a})`} fillOpacity="0.8"/>
      ))}
      <circle r="8" fill="#a07a30"/>
    </g>

    {/* Leaf pairs on stems */}
    {[[155,40,-30],[165,65,20],[235,40,30],[245,65,-20]].map(([cx,cy,a],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx="6" ry="13" fill="#587818" transform={`rotate(${a} ${cx} ${cy})`}/>
    ))}

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2"/>
  </svg>
);

const GrillkvallSvg: React.FC = () => (
  // Dark indigo night sky, large red grill with gold flames
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#091733"/>
    {/* Sky gradient effect — subtle horizontal bands */}
    <rect width="400" height="60" fill="#0f2248" fillOpacity="0.6"/>

    {/* Stars scattered */}
    {[[30,18],[75,12],[120,25],[180,8],[240,20],[290,10],[350,22],[370,40],[20,50],[390,55],[155,38],[310,35]].map(([cx,cy],i) => (
      <polygon key={i} points={`${cx},${cy-4} ${cx+2},${cy} ${cx},${cy+4} ${cx-2},${cy}`} fill="#c9a866" fillOpacity={0.6+i%3*0.15}/>
    ))}

    {/* Large grill centered */}
    <g transform="translate(200,88)">
      {/* Legs */}
      <line x1="-38" y1="44" x2="-55" y2="70" stroke="#7d1818" strokeWidth="6" strokeLinecap="round"/>
      <line x1="38" y1="44" x2="55" y2="70" stroke="#7d1818" strokeWidth="6" strokeLinecap="round"/>
      <line x1="-48" y1="62" x2="48" y2="62" stroke="#7d1818" strokeWidth="4" strokeLinecap="round"/>
      {/* Grill bowl */}
      <circle r="55" fill="#7d1818"/>
      <circle r="55" fill="none" stroke="#5a1010" strokeWidth="3"/>
      {/* Grill lid (top half darker) */}
      <path d="M-55,0 A55,55 0 0,1 55,0" fill="#5a1010"/>
      {/* Grill grate lines */}
      {[-36,-18,0,18,36].map(x => (
        <line key={x} x1={x} y1={-Math.sqrt(55*55-x*x)} x2={x} y2={Math.sqrt(55*55-x*x)} stroke="#a07a30" strokeWidth="1.5" strokeOpacity="0.5"/>
      ))}
      {[-36,-18,0,18,36].map(y => (
        <line key={y} x1={-Math.sqrt(Math.max(0,55*55-y*y))} y1={y} x2={Math.sqrt(Math.max(0,55*55-y*y))} y2={y} stroke="#a07a30" strokeWidth="1.5" strokeOpacity="0.5"/>
      ))}
      {/* Rim highlight */}
      <circle r="55" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.4"/>
      {/* Handle on lid */}
      <rect x="-6" y="-60" width="12" height="10" rx="3" fill="#a07a30"/>
    </g>

    {/* Flames above grill */}
    <g transform="translate(200,33)">
      {/* Outer flames */}
      <path d="M-30,0 C-36,-12 -28,-28 -30,-40 C-20,-28 -18,-12 -30,0 Z" fill="#a07a30"/>
      <path d="M30,0 C36,-12 28,-28 30,-40 C20,-28 18,-12 30,0 Z" fill="#a07a30"/>
      <path d="M-15,0 C-22,-18 -12,-36 -15,-52 C-5,-36 0,-18 -15,0 Z" fill="#c9a866"/>
      <path d="M15,0 C22,-18 12,-36 15,-52 C5,-36 0,-18 15,0 Z" fill="#c9a866"/>
      {/* Central flame */}
      <path d="M0,0 C-10,-22 -5,-44 0,-60 C5,-44 10,-22 0,0 Z" fill="#f5efea" fillOpacity="0.9"/>
    </g>

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.5"/>
  </svg>
);

const VafflaSvg: React.FC = () => (
  // Warm amber background, huge waffle filling the frame
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#7a5520"/>
    {/* Warm background texture */}
    {Array.from({length: 8}).map((_, i) => (
      <rect key={i} x={i*52} y="0" width="26" height="160" fill="#8a6028" fillOpacity="0.3"/>
    ))}

    {/* Giant waffle — takes up most of the card */}
    <g transform="translate(200,80)">
      {/* Shadow */}
      <rect x="-140" y="-55" width="280" height="120" rx="8" fill="#3d2a10" fillOpacity="0.4" transform="translate(4,4)"/>
      {/* Waffle base */}
      <rect x="-140" y="-55" width="280" height="120" rx="8" fill="#c9a866"/>
      {/* Waffle squares — 8×5 grid */}
      {Array.from({length:7}).map((_,col) => (
        Array.from({length:4}).map((_,row) => (
          <rect key={`${col}-${row}`}
            x={-128 + col*40} y={-43 + row*30}
            width="36" height="26" rx="4"
            fill="#a07a30" fillOpacity="0.5"
          />
        ))
      ))}
      {/* Waffle edge/plate */}
      <rect x="-140" y="-55" width="280" height="120" rx="8" fill="none" stroke="#a07a30" strokeWidth="3"/>
    </g>

    {/* Steam wisps */}
    {[[-40,-72],[-10,-78],[20,-72],[50,-75]].map(([dx,dy],i) => (
      <path key={i}
        d={`M${200+dx},${80+dy} C${200+dx-8},${80+dy-14} ${200+dx+8},${80+dy-26} ${200+dx},${80+dy-38}`}
        fill="none" stroke="#f5efea" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6"/>
    ))}

    {/* Folk hearts left and right */}
    {[[-165,35],[-165,-35],[165,35],[165,-35]].map(([dx,dy],i) => (
      <polygon key={i}
        points={`${200+dx},${80+dy-14} ${200+dx+10},${80+dy} ${200+dx},${80+dy+14} ${200+dx-10},${80+dy}`}
        fill="#f5efea" fillOpacity="0.7"
      />
    ))}

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#c9a866" strokeWidth="2"/>
  </svg>
);

const TomteSvg: React.FC = () => (
  // Indigo night, large tomte figure
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#091733"/>
    <rect width="400" height="160" fill="#0f2248" fillOpacity="0.5"/>

    {/* Many snowflakes across background */}
    {[[30,20],[80,40],[140,15],[50,80],[100,120],[160,90],[240,25],[300,45],[360,20],[330,90],[370,130],[260,110],[180,140],[70,145],[340,145],[400-20,60]].map(([cx,cy],i) => (
      <g key={i} opacity={0.3+i%4*0.12} transform={`translate(${cx},${cy})`}>
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#f5efea" strokeWidth="1.5"/>
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#f5efea" strokeWidth="1.5"/>
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#f5efea" strokeWidth="1.5"/>
        <line x1="5" y1="-5" x2="-5" y2="5" stroke="#f5efea" strokeWidth="1.5"/>
      </g>
    ))}

    {/* Large tomte centered */}
    <g transform="translate(200,80)">
      {/* Hat (large cone) */}
      <polygon points="0,-72 -52,10 52,10" fill="#7d1818"/>
      <polygon points="0,-72 -52,10 0,-10 52,10" fill="#5a1010"/>
      {/* Hat brim */}
      <rect x="-58" y="7" width="116" height="14" rx="6" fill="#7d1818"/>
      {/* Pompom */}
      <circle cx="0" cy="-72" r="11" fill="#f5efea"/>
      <circle cx="0" cy="-72" r="7" fill="#bdb0a0"/>
      {/* Belt buckle on brim */}
      <rect x="-10" y="8" width="20" height="12" rx="1" fill="#a07a30"/>
      <rect x="-6" y="10" width="12" height="8" rx="1" fill="#7d1818"/>
      {/* Beard — large oval */}
      <ellipse cx="0" cy="48" rx="55" ry="46" fill="#f5efea"/>
      {/* Eyes */}
      <circle cx="-14" cy="18" r="5" fill="#091733"/>
      <circle cx="14" cy="18" r="5" fill="#091733"/>
      <circle cx="-12" cy="16" r="2" fill="white"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
      {/* Nose */}
      <circle cx="0" cy="28" r="6" fill="#7d1818" fillOpacity="0.5"/>
      {/* Cheeks */}
      <circle cx="-22" cy="34" r="9" fill="#7d1818" fillOpacity="0.2"/>
      <circle cx="22" cy="34" r="9" fill="#7d1818" fillOpacity="0.2"/>
    </g>

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.6"/>
  </svg>
);

const HistoriaSvg: React.FC = () => (
  // Warm cream sky, large red building spanning the width
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#e8ddd4"/>
    {/* Cloud-like soft shapes in sky */}
    <ellipse cx="80" cy="35" rx="55" ry="22" fill="#f5efea" fillOpacity="0.7"/>
    <ellipse cx="320" cy="28" rx="65" ry="18" fill="#f5efea" fillOpacity="0.6"/>
    <ellipse cx="200" cy="40" rx="50" ry="15" fill="#f5efea" fillOpacity="0.5"/>

    {/* Ground */}
    <rect x="0" y="130" width="400" height="30" fill="#587818" fillOpacity="0.3"/>
    <rect x="0" y="135" width="400" height="25" fill="#3d5010" fillOpacity="0.2"/>

    {/* Trees flanking */}
    {/* Left trees */}
    <polygon points="45,130 65,68 85,130" fill="#587818"/>
    <rect x="61" y="127" width="8" height="12" fill="#3d5010"/>
    <polygon points="22,130 38,80 54,130" fill="#3d5010" fillOpacity="0.8"/>
    <rect x="35" y="127" width="7" height="12" fill="#3d5010"/>
    {/* Right trees */}
    <polygon points="315,130 335,68 355,130" fill="#587818"/>
    <rect x="331" y="127" width="8" height="12" fill="#3d5010"/>
    <polygon points="346,130 362,80 378,130" fill="#3d5010" fillOpacity="0.8"/>
    <rect x="359" y="127" width="7" height="12" fill="#3d5010"/>

    {/* Main building — wide, spans center */}
    {/* Body */}
    <rect x="105" y="70" width="190" height="65" fill="#7d1818"/>
    {/* Roof */}
    <polygon points="88,70 200,28 312,70" fill="#5a1010"/>
    {/* Windows — arched */}
    <rect x="122" y="86" width="28" height="32" rx="14" fill="#c9a866" stroke="#a07a30" strokeWidth="1.5"/>
    <rect x="186" y="86" width="28" height="32" rx="14" fill="#c9a866" stroke="#a07a30" strokeWidth="1.5"/>
    <rect x="250" y="86" width="28" height="32" rx="14" fill="#c9a866" stroke="#a07a30" strokeWidth="1.5"/>
    {/* Door */}
    <rect x="186" y="108" width="28" height="27" rx="4" fill="#091733"/>
    <rect x="190" y="112" width="10" height="16" rx="1" fill="#091733" stroke="#a07a30" strokeWidth="0.8" fillOpacity="0.6"/>
    <rect x="202" y="112" width="10" height="16" rx="1" fill="#091733" stroke="#a07a30" strokeWidth="0.8" fillOpacity="0.6"/>
    {/* Steeple + cross */}
    <rect x="196" y="20" width="8" height="22" fill="#a07a30"/>
    <rect x="188" y="28" width="24" height="7" fill="#a07a30"/>
    {/* Foundation */}
    <rect x="98" y="133" width="204" height="5" rx="2" fill="#5a1010" fillOpacity="0.5"/>

    {/* Ornament stars in sky */}
    {[[158,22],[242,22]].map(([cx,cy],i) => (
      <g key={i}>
        {[0,45,90,135].map(a => (
          <line key={a} x1={cx} y1={cy-9} x2={cx} y2={cy+9} stroke="#a07a30" strokeWidth="2" transform={`rotate(${a} ${cx} ${cy})`}/>
        ))}
      </g>
    ))}

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2"/>
  </svg>
);

const StadSvg: React.FC = () => (
  // Stone background, large bucket + mop composition
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#9a8a78"/>
    {/* Subtle diamond pattern background */}
    {Array.from({length:6}).map((_,row) => (
      Array.from({length:10}).map((_,col) => (
        <polygon key={`${row}-${col}`}
          points={`${col*44+row%2*22},${row*30-4} ${col*44+row%2*22+10},${row*30+8} ${col*44+row%2*22},${row*30+20} ${col*44+row%2*22-10},${row*30+8}`}
          fill="#bdb0a0" fillOpacity="0.3"
        />
      ))
    ))}

    {/* MOP — right side, tall */}
    <g transform="translate(290,80)">
      {/* Handle */}
      <rect x="-5" y="-72" width="10" height="144" rx="4" fill="#587818"/>
      {/* Mop head */}
      <rect x="-28" y="58" width="56" height="12" rx="3" fill="#bdb0a0"/>
      {/* Fringe */}
      {[-24,-16,-8,0,8,16,24].map((dx,i) => (
        <line key={i} x1={dx} y1="70" x2={dx+(i-3)*3} y2="85" stroke="#f5efea" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8"/>
      ))}
    </g>

    {/* BUCKET — left-center, large */}
    <g transform="translate(145,88)">
      {/* Shadow */}
      <path d="M-62,44 L-52,44 L40,44 L50,44" stroke="#3d2a10" strokeWidth="3" strokeOpacity="0.3"/>
      {/* Bucket body */}
      <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="#f5efea"/>
      <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="#bdb0a0" fillOpacity="0.5"/>
      <path d="M-58,-48 L58,-48 L72,44 L-72,44 Z" fill="none" stroke="#9a8a78" strokeWidth="3" strokeLinejoin="round"/>
      {/* Bucket stripe */}
      <path d="M-68,16 L68,16" stroke="#9a8a78" strokeWidth="2.5" strokeOpacity="0.4"/>
      {/* Handle */}
      <path d="M-58,-48 C-80,-88 80,-88 58,-48" fill="none" stroke="#5a4a3a" strokeWidth="5" strokeLinecap="round"/>
      {/* Foam/suds on top */}
      <ellipse cx="0" cy="-48" rx="58" ry="14" fill="white" fillOpacity="0.85"/>
      {/* Bubbles rising */}
      {[[-30,-68],[-12,-78],[8,-72],[28,-80],[45,-65]].map(([bx,by],i) => (
        <circle key={i} cx={bx} cy={by} r={5-i*0.5} fill="white" fillOpacity={0.7-i*0.1}/>
      ))}
    </g>

    {/* Gold sparkle stars scattered */}
    {[[355,20],[375,55],[365,100],[340,135],[40,20],[25,65],[50,130],[220,18],[220,145]].map(([cx,cy],i) => (
      <g key={i}>
        <line x1={cx-10} y1={cy} x2={cx+10} y2={cy} stroke="#a07a30" strokeWidth="2"/>
        <line x1={cx} y1={cy-10} x2={cx} y2={cy+10} stroke="#a07a30" strokeWidth="2"/>
        <line x1={cx-7} y1={cy-7} x2={cx+7} y2={cy+7} stroke="#a07a30" strokeWidth="1.5"/>
        <line x1={cx+7} y1={cy-7} x2={cx-7} y2={cy+7} stroke="#a07a30" strokeWidth="1.5"/>
      </g>
    ))}

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.7"/>
  </svg>
);

const components: Record<EventCategory, React.FC> = {
  "vårstäd": VarstadSvg,
  "grillkväll": GrillkvallSvg,
  "våffla": VafflaSvg,
  "tomte": TomteSvg,
  "historia": HistoriaSvg,
  "städ": StadSvg,
};

const CategoryThumbnail: React.FC<{ category: EventCategory }> = ({ category }) => {
  const Svg = components[category];
  return Svg ? <Svg /> : null;
};

export default CategoryThumbnail;
