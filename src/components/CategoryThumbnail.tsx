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
  // Dark indigo night sky — flames + grill kept in central y band (no top/bottom crop)
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#091733"/>
    <rect width="400" height="80" fill="#0f2248" fillOpacity="0.5"/>

    {/* Stars — all within y 20-140 safe zone */}
    {[[30,30],[75,25],[120,38],[180,22],[240,32],[290,24],[350,35],[20,65],[390,70],[155,52],[310,48],[60,110],[340,115],[180,130],[220,118]].map(([cx,cy],i) => (
      <polygon key={i} points={`${cx},${cy-4} ${cx+2},${cy} ${cx},${cy+4} ${cx-2},${cy}`} fill="#c9a866" fillOpacity={0.55+i%3*0.15}/>
    ))}

    {/* Grill — pulled up so it sits entirely in view, center at y=90 r=48 */}
    <g transform="translate(200,90)">
      {/* Legs — short, stay within frame */}
      <line x1="-34" y1="46" x2="-46" y2="62" stroke="#7d1818" strokeWidth="6" strokeLinecap="round"/>
      <line x1="34" y1="46" x2="46" y2="62" stroke="#7d1818" strokeWidth="6" strokeLinecap="round"/>
      <line x1="-44" y1="57" x2="44" y2="57" stroke="#7d1818" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Bowl */}
      <circle r="48" fill="#7d1818"/>
      <circle r="48" fill="none" stroke="#5a1010" strokeWidth="3"/>
      {/* Lid */}
      <path d="M-48,0 A48,48 0 0,1 48,0" fill="#5a1010"/>
      {/* Grate */}
      {[-30,-15,0,15,30].map(x => (
        <line key={x} x1={x} y1={-Math.round(Math.sqrt(Math.max(0,48*48-x*x)))} x2={x} y2={Math.round(Math.sqrt(Math.max(0,48*48-x*x)))} stroke="#a07a30" strokeWidth="1.5" strokeOpacity="0.5"/>
      ))}
      {[-30,-15,0,15,30].map(y => (
        <line key={y} x1={-Math.round(Math.sqrt(Math.max(0,48*48-y*y)))} y1={y} x2={Math.round(Math.sqrt(Math.max(0,48*48-y*y)))} y2={y} stroke="#a07a30" strokeWidth="1.5" strokeOpacity="0.5"/>
      ))}
      <circle r="48" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.4"/>
      <rect x="-5" y="-52" width="10" height="9" rx="2.5" fill="#a07a30"/>
    </g>

    {/* Flames — sit above the grill bowl, within y 30-42 */}
    <g transform="translate(200,42)">
      <path d="M-22,0 C-26,-8 -22,-18 -22,-28 C-14,-18 -12,-8 -22,0 Z" fill="#a07a30"/>
      <path d="M22,0 C26,-8 22,-18 22,-28 C14,-18 12,-8 22,0 Z" fill="#a07a30"/>
      <path d="M-10,0 C-14,-12 -8,-22 -10,-32 C-2,-22 2,-12 -10,0 Z" fill="#c9a866"/>
      <path d="M10,0 C14,-12 8,-22 10,-32 C2,-22 -2,-12 10,0 Z" fill="#c9a866"/>
      <path d="M0,0 C-6,-14 -2,-26 0,-36 C2,-26 6,-14 0,0 Z" fill="#f5efea" fillOpacity="0.88"/>
    </g>

    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2" strokeOpacity="0.5"/>
  </svg>
);

const VafflaSvg: React.FC = () => (
  // Warm cream background, heart-shaped Swedish waffle with cream and lingonberries
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <clipPath id="heart-clip">
        <path d="M200,148 C200,148 88,100 88,58 C88,30 112,12 148,12 C168,12 188,24 200,40 C212,24 232,12 252,12 C288,12 312,30 312,58 C312,100 200,148 200,148 Z"/>
      </clipPath>
    </defs>

    {/* Background */}
    <rect width="400" height="160" fill="#f0e2c0"/>
    {/* Soft warm radial glow behind waffle */}
    <ellipse cx="200" cy="85" rx="160" ry="90" fill="#e8c87a" fillOpacity="0.35"/>

    {/* Heart waffle base */}
    <path d="M200,148 C200,148 88,100 88,58 C88,30 112,12 148,12 C168,12 188,24 200,40 C212,24 232,12 252,12 C288,12 312,30 312,58 C312,100 200,148 200,148 Z"
      fill="#c9a866"/>

    {/* Waffle grid squares clipped to heart */}
    <g clipPath="url(#heart-clip)">
      {Array.from({length:7}).map((_,col) =>
        Array.from({length:7}).map((_,row) => (
          <rect key={`${col}-${row}`}
            x={85 + col*34} y={8 + row*22}
            width="30" height="18" rx="5"
            fill="#a07a30" fillOpacity="0.45"
          />
        ))
      )}
    </g>

    {/* Heart outline */}
    <path d="M200,148 C200,148 88,100 88,58 C88,30 112,12 148,12 C168,12 188,24 200,40 C212,24 232,12 252,12 C288,12 312,30 312,58 C312,100 200,148 200,148 Z"
      fill="none" stroke="#a07a30" strokeWidth="2.5"/>

    {/* Whipped cream dollop on top */}
    <ellipse cx="200" cy="38" rx="28" ry="14" fill="white" fillOpacity="0.92"/>
    <ellipse cx="200" cy="32" rx="20" ry="10" fill="white" fillOpacity="0.95"/>
    <ellipse cx="200" cy="26" rx="13" ry="8" fill="white"/>

    {/* Lingonberries */}
    {[[178,42],[188,36],[208,36],[218,42],[198,48],[204,30]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="5" fill="#7d1818"/>
    ))}
    {[[178,42],[188,36],[208,36],[218,42],[198,48],[204,30]].map(([cx,cy],i) => (
      <circle key={i} cx={cx-1} cy={cy-1} r="2" fill="#a03030" fillOpacity="0.5"/>
    ))}

    {/* Steam wisps */}
    <path d="M175,8 C173,0 177,-6 175,-14" fill="none" stroke="#bdb0a0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M200,6 C198,-2 202,-8 200,-16" fill="none" stroke="#bdb0a0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M225,8 C223,0 227,-6 225,-14" fill="none" stroke="#bdb0a0" strokeWidth="2" strokeLinecap="round"/>

    {/* Folk diamond ornaments at sides */}
    {[[38,80],[362,80],[38,40],[362,40],[38,120],[362,120]].map(([cx,cy],i) => (
      <polygon key={i} points={`${cx},${cy-9} ${cx+7},${cy} ${cx},${cy+9} ${cx-7},${cy}`} fill="#a07a30" fillOpacity="0.6"/>
    ))}

    {/* Gold border */}
    <rect x="6" y="6" width="388" height="148" fill="none" stroke="#a07a30" strokeWidth="2"/>
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
  // Stone background, Falun red bucket + mop — all content in y 30-135 safe zone
  <svg viewBox="0 0 400 160" className="w-full h-40 md:h-48 block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="400" height="160" fill="#9a8a78"/>
    {/* Diamond pattern */}
    {Array.from({length:6}).map((_,row) =>
      Array.from({length:10}).map((_,col) => (
        <polygon key={`${row}-${col}`}
          points={`${col*44+row%2*22},${row*30-4} ${col*44+row%2*22+10},${row*30+8} ${col*44+row%2*22},${row*30+20} ${col*44+row%2*22-10},${row*30+8}`}
          fill="#bdb0a0" fillOpacity="0.3"
        />
      ))
    )}

    {/* MOP — right side, handle top y=35, fringe bottom y=130 */}
    <g transform="translate(295,80)">
      <rect x="-5" y="-45" width="10" height="90" rx="4" fill="#c9a866"/>
      {/* Mop block */}
      <rect x="-30" y="42" width="60" height="14" rx="3" fill="#bdb0a0"/>
      {/* Fringe */}
      {[-24,-16,-8,0,8,16,24].map((dx,i) => (
        <line key={i} x1={dx} y1="56" x2={dx+(i-3)*5} y2="73" stroke="#f5efea" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.9"/>
      ))}
    </g>

    {/* BUCKET — Falun red, centered left, top at y=33, bottom at y=128 */}
    <g transform="translate(148,80)">
      {/* Handle arc */}
      <path d="M-60,-44 C-78,-82 78,-82 60,-44" fill="none" stroke="#a07a30" strokeWidth="5" strokeLinecap="round"/>
      {/* Body — wider at top */}
      <path d="M-65,-44 L65,-44 L50,46 L-50,46 Z" fill="#7d1818"/>
      <path d="M-65,-44 L65,-44 L50,46 L-50,46 Z" fill="none" stroke="#5a1010" strokeWidth="3" strokeLinejoin="round"/>
      {/* Shading stripe */}
      <path d="M-58,-10 L57,-10" stroke="#5a1010" strokeWidth="2" strokeOpacity="0.4"/>
      {/* Foam — white puffy top */}
      <ellipse cx="0" cy="-44" rx="65" ry="16" fill="white" fillOpacity="0.9"/>
      {/* Bubbles */}
      {[[-40,-60],[-22,-70],[0,-64],[20,-72],[42,-58]].map(([bx,by],i) => (
        <circle key={i} cx={bx} cy={by} r={5-i*0.4} fill="white" fillOpacity={0.7-i*0.08}/>
      ))}
      {/* Bottom ground shadow */}
      <ellipse cx="0" cy="50" rx="52" ry="6" fill="#3d2a10" fillOpacity="0.25"/>
    </g>

    {/* Sparkle stars — safe y zone */}
    {[[355,40],[375,70],[365,105],[340,128],[40,40],[22,72],[48,125],[200,32],[200,128]].map(([cx,cy],i) => (
      <g key={i}>
        <line x1={cx-9} y1={cy} x2={cx+9} y2={cy} stroke="#a07a30" strokeWidth="2"/>
        <line x1={cx} y1={cy-9} x2={cx} y2={cy+9} stroke="#a07a30" strokeWidth="2"/>
        <line x1={cx-6} y1={cy-6} x2={cx+6} y2={cy+6} stroke="#a07a30" strokeWidth="1.5"/>
        <line x1={cx+6} y1={cy-6} x2={cx-6} y2={cy+6} stroke="#a07a30" strokeWidth="1.5"/>
      </g>
    ))}

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
  return Svg ? (
    <div data-category={category} style={{ lineHeight: 0 }}>
      <Svg />
    </div>
  ) : null;
};

export default CategoryThumbnail;
