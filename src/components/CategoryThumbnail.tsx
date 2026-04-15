import React from "react";

export type EventCategory =
  | "vårstäd"
  | "grillkväll"
  | "våffla"
  | "tomte"
  | "historia"
  | "städ";

const C = {
  paper: "#f5efea",
  red: "#7d1818",
  redDark: "#5a1010",
  gold: "#a07a30",
  goldLight: "#c9a866",
  indigo: "#091733",
  olive: "#587818",
  oliveDark: "#3d5010",
  stone: "#bdb0a0",
  stoneDark: "#9a8a78",
  ink: "#1a1208",
};

const Frame: React.FC<{ color?: string }> = ({ color = C.gold }) => {
  const d4 = (cx: number, cy: number) => (
    <polygon
      key={`d-${cx}-${cy}`}
      points={`${cx},${cy - 4.5} ${cx + 4.5},${cy} ${cx},${cy + 4.5} ${cx - 4.5},${cy}`}
      fill={color}
    />
  );
  const pts: [number, number][] = [
    [10, 10], [100, 10], [200, 10], [300, 10], [390, 10],
    [10, 80], [390, 80],
    [10, 150], [100, 150], [200, 150], [300, 150], [390, 150],
  ];
  return (
    <>
      <rect x={10} y={10} width={380} height={140} fill="none" stroke={color} strokeWidth={1.5} />
      {pts.map(([cx, cy]) => d4(cx, cy))}
    </>
  );
};

const FolkFlower: React.FC<{
  cx: number; cy: number;
  petalColor: string; centerColor: string;
  scale?: number;
}> = ({ cx, cy, petalColor, centerColor, scale = 1 }) => {
  const pd = 8 * scale;
  const pr = 4 * scale;
  const pl = 9 * scale;
  return (
    <g>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx={cx}
          cy={cy - pd}
          rx={pr}
          ry={pl}
          fill={petalColor}
          transform={`rotate(${angle} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={5 * scale} fill={centerColor} />
    </g>
  );
};

const Leaf: React.FC<{
  cx: number; cy: number; angle: number; color: string; size?: number;
}> = ({ cx, cy, angle, color, size = 1 }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={4 * size}
    ry={9 * size}
    fill={color}
    transform={`rotate(${angle} ${cx} ${cy})`}
  />
);

// ── ILLUSTRATIONS ──────────────────────────────────────────────────────────

const VarstadSvg: React.FC = () => (
  <>
    <rect x={196} y={15} width={8} height={103} rx={3} fill={C.olive} />
    <rect x={185} y={103} width={30} height={8} rx={2} fill={C.gold} />
    <rect x={187} y={113} width={26} height={5} rx={2} fill={C.gold} fillOpacity={0.6} />
    {[160, 170, 180, 190, 200, 210, 220, 230, 240].map((x2, i) => (
      <line key={i} x1={200} y1={118} x2={x2} y2={148}
        stroke={C.olive} strokeWidth={2.5} strokeLinecap="round" />
    ))}
    <FolkFlower cx={98} cy={55} petalColor={C.red} centerColor={C.gold} scale={0.95} />
    <FolkFlower cx={128} cy={105} petalColor={C.red} centerColor={C.gold} scale={0.75} />
    <FolkFlower cx={285} cy={48} petalColor={C.red} centerColor={C.gold} scale={0.9} />
    <FolkFlower cx={308} cy={102} petalColor={C.red} centerColor={C.gold} scale={0.72} />
    <Leaf cx={78} cy={75} angle={-35} color={C.olive} size={0.85} />
    <Leaf cx={94} cy={70} angle={25} color={C.olive} size={0.85} />
    <Leaf cx={266} cy={68} angle={-25} color={C.olive} size={0.75} />
    <Leaf cx={280} cy={65} angle={20} color={C.olive} size={0.75} />
  </>
);

const GrillkvallSvg: React.FC = () => (
  <>
    {[[72, 28], [118, 20], [163, 33], [237, 22], [288, 30], [330, 20], [362, 37]].map(([cx, cy], i) => (
      <polygon key={i}
        points={`${cx},${cy - 5} ${cx + 2.5},${cy} ${cx},${cy + 5} ${cx - 2.5},${cy}`}
        fill={C.gold} fillOpacity={0.75}
      />
    ))}
    <line x1={178} y1={130} x2={162} y2={150} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
    <line x1={222} y1={130} x2={238} y2={150} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
    <line x1={168} y1={143} x2={232} y2={143} stroke={C.red} strokeWidth={2.5} strokeLinecap="round" />
    <circle cx={200} cy={88} r={42} fill={C.red} fillOpacity={0.1} stroke={C.red} strokeWidth={3} />
    <path d="M158,88 A42,42 0 0,1 242,88" fill={C.red} fillOpacity={0.18} stroke={C.red} strokeWidth={2.5} />
    {[78, 88, 98].map((y) => (
      <line key={y} x1={160} y1={y} x2={240} y2={y} stroke={C.red} strokeWidth={2} strokeOpacity={0.45} />
    ))}
    <path d="M185,46 C177,38 177,28 185,20 C193,28 193,38 185,46 Z" fill={C.gold} />
    <path d="M200,43 C192,35 192,25 200,17 C208,25 208,35 200,43 Z" fill={C.gold} />
    <path d="M215,46 C207,38 207,28 215,20 C223,28 223,38 215,46 Z" fill={C.gold} />
    <path d="M200,43 C196,37 196,29 200,22 C204,29 204,37 200,43 Z" fill={C.red} fillOpacity={0.55} />
  </>
);

const VafflaSvg: React.FC = () => (
  <>
    <rect x={150} y={74} width={100} height={66} rx={5} fill={C.goldLight} stroke={C.gold} strokeWidth={2} />
    {[87, 100, 113, 126].map((y) => (
      <line key={y} x1={150} y1={y} x2={250} y2={y} stroke={C.gold} strokeWidth={1.2} />
    ))}
    {[167, 184, 200, 217, 234].map((x) => (
      <line key={x} x1={x} y1={74} x2={x} y2={140} stroke={C.gold} strokeWidth={1.2} />
    ))}
    <rect x={150} y={138} width={100} height={4} rx={2} fill={C.gold} fillOpacity={0.4} />
    <path d="M173,71 C171,62 175,56 173,47" fill="none" stroke={C.stone} strokeWidth={2} strokeLinecap="round" />
    <path d="M200,69 C198,60 202,54 200,45" fill="none" stroke={C.stone} strokeWidth={2} strokeLinecap="round" />
    <path d="M227,71 C225,62 229,56 227,47" fill="none" stroke={C.stone} strokeWidth={2} strokeLinecap="round" />
    {([[92, 52, 1], [308, 52, 1], [82, 108, 0.85], [318, 108, 0.85]] as [number, number, number][]).map(([cx, cy, op], i) => (
      <polygon key={i}
        points={`${cx},${cy - 9} ${cx + 7},${cy} ${cx},${cy + 9} ${cx - 7},${cy}`}
        fill={C.red} fillOpacity={op}
      />
    ))}
    {[[340, 80], [60, 80]].map(([cx, cy], i) => (
      <g key={i}>
        <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke={C.gold} strokeWidth={2} />
        <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke={C.gold} strokeWidth={2} />
      </g>
    ))}
  </>
);

const TomteSvg: React.FC = () => (
  <>
    <polygon points="200,18 158,70 242,70" fill={C.red} />
    <rect x={152} y={67} width={96} height={11} rx={5} fill={C.red} />
    <circle cx={200} cy={18} r={8} fill={C.paper} />
    <circle cx={200} cy={18} r={5} fill={C.stone} />
    <ellipse cx={200} cy={112} rx={43} ry={38} fill={C.paper} />
    <circle cx={190} cy={97} r={3.5} fill={C.ink} />
    <circle cx={210} cy={97} r={3.5} fill={C.ink} />
    <circle cx={191.5} cy={95.5} r={1} fill="white" />
    <circle cx={211.5} cy={95.5} r={1} fill="white" />
    <circle cx={200} cy={105} r={4} fill={C.red} fillOpacity={0.55} />
    <circle cx={183} cy={108} r={6} fill={C.red} fillOpacity={0.18} />
    <circle cx={217} cy={108} r={6} fill={C.red} fillOpacity={0.18} />
    <rect x={193} y={67} width={14} height={11} fill={C.gold} />
    <rect x={196} y={69} width={8} height={7} rx={1} fill={C.red} />
    {[[85, 30], [315, 30], [62, 80], [338, 80], [72, 130], [328, 130], [140, 18], [260, 18]].map(([cx, cy], i) => (
      <g key={i} opacity={0.5 + (i % 3) * 0.1}>
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={C.indigo} strokeWidth={1.5} />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={C.indigo} strokeWidth={1.5} />
        <line x1={cx - 4.2} y1={cy - 4.2} x2={cx + 4.2} y2={cy + 4.2} stroke={C.indigo} strokeWidth={1.5} />
        <line x1={cx + 4.2} y1={cy - 4.2} x2={cx - 4.2} y2={cy + 4.2} stroke={C.indigo} strokeWidth={1.5} />
      </g>
    ))}
  </>
);

const HistoriaSvg: React.FC = () => (
  <>
    <polygon points="95,142 113,88 131,142" fill={C.olive} />
    <rect x={111} y={139} width={6} height={10} rx={1} fill={C.oliveDark} />
    <polygon points="269,142 287,88 305,142" fill={C.olive} />
    <rect x={283} y={139} width={6} height={10} rx={1} fill={C.oliveDark} />
    <rect x={155} y={72} width={90} height={72} fill={C.red} />
    <polygon points="140,72 200,38 260,72" fill={C.redDark} />
    <rect x={167} y={88} width={20} height={22} rx={10} fill={C.goldLight} stroke={C.gold} strokeWidth={1.5} />
    <rect x={213} y={88} width={20} height={22} rx={10} fill={C.goldLight} stroke={C.gold} strokeWidth={1.5} />
    <rect x={191} y={116} width={18} height={28} rx={3} fill={C.indigo} />
    <rect x={193} y={118} width={6} height={11} rx={1} stroke={C.gold} strokeWidth={0.8} fill={C.indigo} fillOpacity={0.5} />
    <rect x={201} y={118} width={6} height={11} rx={1} stroke={C.gold} strokeWidth={0.8} fill={C.indigo} fillOpacity={0.5} />
    <rect x={197} y={30} width={6} height={18} fill={C.gold} />
    <rect x={191} y={37} width={18} height={6} fill={C.gold} />
    <rect x={145} y={142} width={110} height={3} rx={1.5} fill={C.red} fillOpacity={0.5} />
    {[[65, 38], [160, 25], [240, 25], [335, 38]].map(([cx, cy], i) => (
      <g key={i}>
        <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke={C.gold} strokeWidth={2} />
        <line x1={cx} y1={cy - 7} x2={cx} y2={cy + 7} stroke={C.gold} strokeWidth={2} />
        <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke={C.gold} strokeWidth={2} />
        <line x1={cx + 5} y1={cy - 5} x2={cx - 5} y2={cy + 5} stroke={C.gold} strokeWidth={2} />
      </g>
    ))}
  </>
);

const StadSvg: React.FC = () => (
  <>
    <rect x={265} y={14} width={8} height={128} rx={3} fill={C.olive} />
    {[258, 263, 269, 275, 280].map((x, i) => (
      <line key={i} x1={x} y1={142} x2={x + (i - 2) * 4} y2={153}
        stroke={C.stone} strokeWidth={2.5} strokeLinecap="round" />
    ))}
    <path d="M127,55 L173,55 L184,133 L116,133 Z"
      fill={C.stone} stroke={C.stoneDark} strokeWidth={2} strokeLinejoin="round" />
    <path d="M127,55 C108,27 192,27 173,55"
      fill="none" stroke={C.stoneDark} strokeWidth={3.5} strokeLinecap="round" />
    <ellipse cx={150} cy={55} rx={23} ry={7} fill="white" fillOpacity={0.75} />
    {[[140, 45], [153, 40], [163, 46], [146, 35], [159, 33]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r={3.5 - i * 0.4}
        fill="white" fillOpacity={0.6 - i * 0.08} />
    ))}
    {[[320, 28], [348, 52], [335, 96], [85, 38], [62, 88], [88, 122]].map(([cx, cy], i) => (
      <g key={i}>
        <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke={C.gold} strokeWidth={1.5} />
        <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke={C.gold} strokeWidth={1.5} />
        <line x1={cx - 5.5} y1={cy - 5.5} x2={cx + 5.5} y2={cy + 5.5} stroke={C.gold} strokeWidth={1} />
        <line x1={cx + 5.5} y1={cy - 5.5} x2={cx - 5.5} y2={cy + 5.5} stroke={C.gold} strokeWidth={1} />
      </g>
    ))}
    {[[200, 62], [216, 76], [194, 90]].map(([cx, cy], i) => (
      <ellipse key={i} cx={cx} cy={cy + 5} rx={4} ry={6}
        fill={C.indigo} fillOpacity={0.25} />
    ))}
  </>
);

// ── EXPORT ─────────────────────────────────────────────────────────────────

const illustrations: Record<EventCategory, React.FC> = {
  "vårstäd": VarstadSvg,
  "grillkväll": GrillkvallSvg,
  "våffla": VafflaSvg,
  "tomte": TomteSvg,
  "historia": HistoriaSvg,
  "städ": StadSvg,
};

const CategoryThumbnail: React.FC<{ category: EventCategory }> = ({ category }) => {
  const Illustration = illustrations[category];
  return (
    <svg
      viewBox="0 0 400 160"
      className="w-full h-40 md:h-48 block"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width={400} height={160} fill={C.paper} />
      {Illustration && <Illustration />}
      <Frame />
    </svg>
  );
};

export default CategoryThumbnail;
