import GeoSolid from './GeoSolid.jsx';
import MathText from './MathText.jsx';

function SvgFraction({ x, y, num, den, fill = '#fff', label }) {
  const cx = Number(x);
  const cy = Number(y);
  const half = Math.max(String(num).length, String(den).length) * 4.5 + 1.5;
  return (
    <g>
      <text x={cx} y={cy - 5} textAnchor="middle" fill={fill} fontSize="13">{num}</text>
      <line x1={cx - half} y1={cy} x2={cx + half} y2={cy} stroke={fill} strokeWidth="1.15" />
      <text x={cx} y={cy + 12} textAnchor="middle" fill={fill} fontSize="13">{den}</text>
      {label ? (
        <text x={cx + half + 10} y={cy} dominantBaseline="middle" fill={fill} fontSize="13">{label}</text>
      ) : null}
    </g>
  );
}

const C = {
  aqua: '#6fd7ff',
  violet: '#b9a7ff',
  pink: '#ff8fa3',
  fillA: 'rgba(111,215,255,.12)',
  fillV: 'rgba(185,167,255,.14)',
  fillP: 'rgba(255,143,163,.1)'
};

const FIGURES = {
  'points-line': {
    label: 'Punct, dreaptă, segment, semidreaptă',
    svg: (
      <svg viewBox="0 0 280 120" role="img" aria-label="Puncte A și B, segmentul AB, dreaptă și semidreaptă">
        <line x1="16" y1="48" x2="264" y2="48" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="48" x2="190" y2="48" stroke={C.aqua} strokeWidth="6" strokeLinecap="round" />
        <circle cx="70" cy="48" r="6" fill={C.violet} />
        <circle cx="190" cy="48" r="6" fill={C.violet} />
        <polygon points="258,48 246,42 246,54" fill="currentColor" />
        <text x="62" y="32" fill="#fff" fontSize="14">A</text>
        <text x="182" y="32" fill="#fff" fontSize="14">B</text>
        <text x="104" y="78" fill={C.aqua} fontSize="12">segmentul AB</text>
        <line x1="40" y1="100" x2="160" y2="100" stroke={C.pink} strokeWidth="3" />
        <circle cx="40" cy="100" r="5" fill={C.pink} />
        <polygon points="168,100 156,94 156,106" fill={C.pink} />
        <text x="176" y="104" fill={C.pink} fontSize="11">semidreaptă</text>
      </svg>
    )
  },
  angle: {
    label: 'Unghi drept, ascuțit, obtuz',
    svg: (
      <svg viewBox="0 0 280 130" role="img" aria-label="Trei unghiuri: ascuțit, drept, obtuz">
        <polyline points="20,100 70,100 110,40" fill="none" stroke={C.aqua} strokeWidth="3" />
        <text x="78" y="88" fill={C.aqua} fontSize="11">ascuțit</text>
        <polyline points="130,100 180,100 180,40" fill="none" stroke={C.violet} strokeWidth="3" />
        <rect x="180" y="88" width="12" height="12" fill="none" stroke={C.violet} />
        <text x="186" y="78" fill={C.violet} fontSize="11">90°</text>
        <polyline points="210,80 250,100 210,40" fill="none" stroke={C.pink} strokeWidth="3" />
        <text x="228" y="78" fill={C.pink} fontSize="11">obtuz</text>
      </svg>
    )
  },
  complementary: {
    label: 'Complementare 90° · suplementare 180°',
    svg: (
      <svg viewBox="0 0 280 130" role="img" aria-label="Unghiuri complementare și suplementare">
        <polyline points="20,110 70,110 70,40" fill="none" stroke={C.aqua} strokeWidth="3" />
        <line x1="70" y1="110" x2="130" y2="55" stroke={C.violet} strokeWidth="3" />
        <rect x="70" y="98" width="12" height="12" fill="none" stroke="#fff" />
        <text x="28" y="96" fill={C.aqua} fontSize="11">α</text>
        <text x="88" y="88" fill={C.violet} fontSize="11">β</text>
        <text x="40" y="28" fill="#fff" fontSize="11">α+β=90°</text>
        <line x1="160" y1="80" x2="260" y2="80" stroke="#fff" strokeWidth="2" />
        <line x1="210" y1="80" x2="248" y2="28" stroke={C.pink} strokeWidth="3" />
        <text x="176" y="70" fill={C.aqua} fontSize="11">γ</text>
        <text x="222" y="70" fill={C.pink} fontSize="11">δ</text>
        <text x="168" y="118" fill="#fff" fontSize="11">γ+δ=180°</text>
      </svg>
    )
  },
  perpendicular: {
    label: 'Drepte perpendiculare',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Două drepte perpendiculare">
        <line x1="20" y1="100" x2="220" y2="100" stroke={C.aqua} strokeWidth="3" />
        <line x1="120" y1="20" x2="120" y2="130" stroke={C.violet} strokeWidth="3" />
        <rect x="120" y="88" width="14" height="14" fill="none" stroke={C.pink} />
        <text x="128" y="78" fill={C.pink} fontSize="12">90°</text>
        <text x="200" y="92" fill={C.aqua} fontSize="12">d</text>
        <text x="128" y="36" fill={C.violet} fontSize="12">d′</text>
      </svg>
    )
  },
  parallels: {
    label: 'Paralele tăiate de o secantă',
    svg: (
      <svg viewBox="0 0 260 140" role="img" aria-label="Două drepte paralele tăiate de o secantă">
        <line x1="20" y1="40" x2="240" y2="40" stroke={C.aqua} strokeWidth="3" />
        <line x1="20" y1="100" x2="240" y2="100" stroke={C.aqua} strokeWidth="3" />
        <line x1="70" y1="10" x2="170" y2="130" stroke={C.violet} strokeWidth="3" />
        <text x="200" y="36" fill={C.aqua} fontSize="12">d₁</text>
        <text x="200" y="96" fill={C.aqua} fontSize="12">d₂</text>
        <text x="168" y="70" fill={C.violet} fontSize="12">secantă</text>
      </svg>
    )
  },
  square: {
    label: 'Pătrat: P = 4a, A = a²',
    svg: (
      <svg viewBox="0 0 220 180" role="img" aria-label="Pătrat cu latura a">
        <rect x="50" y="30" width="120" height="120" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <line x1="50" y1="30" x2="170" y2="150" stroke={C.violet} strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="170" y1="30" x2="50" y2="150" stroke={C.pink} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="100" y="22" fill="#fff" fontSize="13">a</text>
        <text x="178" y="96" fill="#fff" fontSize="13">a</text>
        <text x="78" y="172" fill={C.aqua} fontSize="12">A = a × a</text>
      </svg>
    )
  },
  rectangle: {
    label: 'Dreptunghi: perimetru și arie',
    svg: (
      <svg viewBox="0 0 260 140" role="img" aria-label="Dreptunghi cu lungime și lățime">
        <rect x="40" y="30" width="180" height="80" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <text x="110" y="22" fill={C.aqua} fontSize="12">L</text>
        <text x="228" y="78" fill={C.violet} fontSize="12">l</text>
        <text x="95" y="78" fill="#fff" fontSize="13">A = L × l</text>
      </svg>
    )
  },
  rhombus: {
    label: 'Romb: laturi egale, diagonale ⊥',
    svg: (
      <svg viewBox="0 0 240 170" role="img" aria-label="Romb cu diagonale perpendiculare">
        <polygon points="120,18 210,85 120,152 30,85" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <line x1="30" y1="85" x2="210" y2="85" stroke={C.aqua} strokeWidth="2" strokeDasharray="4 3" />
        <line x1="120" y1="18" x2="120" y2="152" stroke={C.pink} strokeWidth="2" strokeDasharray="4 3" />
        <text x="156" y="78" fill={C.aqua} fontSize="12">d₁</text>
        <text x="128" y="90" fill={C.pink} fontSize="12">d₂</text>
        <text x="62" y="168" fill="#fff" fontSize="12">A = (d₁ × d₂) / 2</text>
      </svg>
    )
  },
  parallelogram: {
    label: 'Paralelogram: A = bază × înălțime',
    svg: (
      <svg viewBox="0 0 260 150" role="img" aria-label="Paralelogram cu bază și înălțime">
        <polygon points="50,120 190,120 230,40 90,40" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <line x1="90" y1="40" x2="90" y2="120" stroke={C.pink} strokeWidth="2" strokeDasharray="3 3" />
        <text x="128" y="136" fill="#fff" fontSize="12">bază</text>
        <text x="58" y="84" fill={C.pink} fontSize="12">h</text>
      </svg>
    )
  },
  trapezoid: {
    label: 'Trapez: baze și înălțime',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Trapez cu bazele B și b">
        <polygon points="50,110 200,110 170,40 80,40" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <line x1="80" y1="40" x2="80" y2="110" stroke={C.pink} strokeWidth="2" strokeDasharray="3 3" />
        <text x="108" y="34" fill="#fff" fontSize="12">b</text>
        <text x="112" y="128" fill="#fff" fontSize="12">B</text>
        <text x="56" y="80" fill={C.pink} fontSize="12">h</text>
      </svg>
    )
  },
  'trapezoid-iso': {
    label: 'Trapez isoscel',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Trapez isoscel simetric">
        <polygon points="40,115 200,115 160,40 80,40" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <line x1="80" y1="40" x2="80" y2="115" stroke={C.pink} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="160" y1="40" x2="160" y2="115" stroke={C.pink} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="108" y="34" fill="#fff" fontSize="12">b</text>
        <text x="110" y="132" fill="#fff" fontSize="12">B</text>
      </svg>
    )
  },
  'trapezoid-right': {
    label: 'Trapez dreptunghic',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Trapez cu un unghi drept">
        <polygon points="50,115 200,115 160,40 50,40" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <rect x="50" y="103" width="12" height="12" fill="none" stroke={C.pink} />
        <text x="20" y="82" fill={C.pink} fontSize="12">h</text>
        <text x="92" y="34" fill="#fff" fontSize="12">b</text>
        <text x="110" y="132" fill="#fff" fontSize="12">B</text>
      </svg>
    )
  },
  triangle: {
    label: 'Triunghi: 180°',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Triunghi cu unghiurile A B C">
        <polygon points="40,130 200,130 120,28" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <text x="28" y="148" fill="#fff" fontSize="13">A</text>
        <text x="200" y="148" fill="#fff" fontSize="13">B</text>
        <text x="114" y="20" fill="#fff" fontSize="13">C</text>
        <text x="78" y="88" fill={C.aqua} fontSize="12">A+B+C=180°</text>
      </svg>
    )
  },
  'triangle-iso': {
    label: 'Triunghi isoscel',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Triunghi isoscel cu baza AB">
        <polygon points="40,130 200,130 120,24" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <line x1="120" y1="24" x2="120" y2="130" stroke={C.pink} strokeWidth="2" strokeDasharray="3 3" />
        <text x="68" y="80" fill="#fff" fontSize="12">a</text>
        <text x="156" y="80" fill="#fff" fontSize="12">a</text>
        <text x="110" y="146" fill="#fff" fontSize="12">bază</text>
      </svg>
    )
  },
  'triangle-equilateral': {
    label: 'Triunghi echilateral: 60°',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Triunghi echilateral">
        <polygon points="40,130 200,130 120,22" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <text x="68" y="84" fill="#fff" fontSize="12">a</text>
        <text x="156" y="84" fill="#fff" fontSize="12">a</text>
        <text x="112" y="144" fill="#fff" fontSize="12">a</text>
        <text x="108" y="88" fill={C.aqua} fontSize="12">60°</text>
      </svg>
    )
  },
  'triangle-right': {
    label: 'Pitagora: a² + b² = c²',
    svg: (
      <svg viewBox="0 0 240 160" role="img" aria-label="Triunghi dreptunghic 3-4-5">
        <polygon points="40,140 160,140 40,40" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <rect x="40" y="128" width="12" height="12" fill="none" stroke={C.pink} />
        <text x="88" y="156" fill="#fff" fontSize="12">a = 3</text>
        <text x="8" y="96" fill="#fff" fontSize="12">b = 4</text>
        <text x="108" y="80" fill={C.violet} fontSize="12">c = 5</text>
      </svg>
    )
  },
  'triangle-obtuse': {
    label: 'Triunghi obtuzunghic',
    svg: (
      <svg viewBox="0 0 260 150" role="img" aria-label="Triunghi cu un unghi obtuz">
        <polygon points="40,50 230,120 70,120" fill={C.fillP} stroke={C.pink} strokeWidth="3" />
        <text x="48" y="42" fill="#fff" fontSize="12">obtuz</text>
        <text x="130" y="142" fill="#fff" fontSize="12">A+B+C=180°</text>
      </svg>
    )
  },
  'triangle-lines': {
    label: 'Înălțime, mediană, bisectoare',
    svg: (
      <svg viewBox="0 0 260 160" role="img" aria-label="Linii importante în triunghi">
        <polygon points="30,140 230,140 130,22" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <line x1="130" y1="22" x2="130" y2="140" stroke={C.pink} strokeWidth="2" />
        <line x1="130" y1="22" x2="130" y2="140" stroke="none" />
        <line x1="130" y1="22" x2="80" y2="140" stroke={C.aqua} strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="80" cy="140" r="3" fill={C.aqua} />
        <text x="136" y="90" fill={C.pink} fontSize="11">h</text>
        <text x="86" y="88" fill={C.aqua} fontSize="11">mediană</text>
        <text x="70" y="156" fill="#fff" fontSize="11">M = mijlocul laturii</text>
      </svg>
    )
  },
  circle: {
    label: 'Cerc: rază și diametru',
    svg: (
      <svg viewBox="0 0 200 160" role="img" aria-label="Cerc cu centru, rază și diametru">
        <circle cx="100" cy="80" r="54" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <circle cx="100" cy="80" r="4" fill={C.aqua} />
        <line x1="100" y1="80" x2="154" y2="80" stroke={C.aqua} strokeWidth="3" />
        <line x1="46" y1="80" x2="154" y2="80" stroke={C.pink} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="118" y="74" fill={C.aqua} fontSize="12">r</text>
        <text x="86" y="148" fill="#fff" fontSize="12">d = 2r</text>
      </svg>
    )
  },
  'circle-chord': {
    label: 'Coardă și arc',
    svg: (
      <svg viewBox="0 0 200 170" role="img" aria-label="Cerc cu o coardă">
        <circle cx="100" cy="80" r="54" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <circle cx="100" cy="80" r="3" fill="#fff" />
        <line x1="58" y1="48" x2="150" y2="58" stroke={C.pink} strokeWidth="3" />
        <text x="88" y="44" fill={C.pink} fontSize="12">coardă</text>
        <text x="72" y="160" fill="#fff" fontSize="11">diametrul e cea mai lungă</text>
      </svg>
    )
  },
  'circle-tangent': {
    label: 'Tangentă ⊥ pe rază',
    svg: (
      <svg viewBox="0 0 220 170" role="img" aria-label="Tangentă la cerc">
        <circle cx="90" cy="80" r="48" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <circle cx="90" cy="80" r="3" fill="#fff" />
        <line x1="90" y1="80" x2="138" y2="80" stroke={C.aqua} strokeWidth="3" />
        <line x1="40" y1="28" x2="200" y2="132" stroke={C.pink} strokeWidth="3" />
        <circle cx="138" cy="80" r="4" fill={C.pink} />
        <rect x="126" y="68" width="12" height="12" fill="none" stroke="#fff" />
        <text x="100" y="72" fill={C.aqua} fontSize="12">r</text>
        <text x="150" y="50" fill={C.pink} fontSize="12">tangentă</text>
      </svg>
    )
  },
  'circle-angles': {
    label: 'Unghi la centru și unghi înscris',
    svg: (
      <svg viewBox="0 0 200 170" role="img" aria-label="Unghi la centru și unghi înscris pe același arc">
        <circle cx="100" cy="80" r="54" fill="none" stroke={C.violet} strokeWidth="3" />
        <circle cx="100" cy="80" r="3" fill="#fff" />
        <line x1="100" y1="80" x2="148" y2="52" stroke={C.aqua} strokeWidth="2" />
        <line x1="100" y1="80" x2="148" y2="108" stroke={C.aqua} strokeWidth="2" />
        <line x1="52" y1="100" x2="148" y2="52" stroke={C.pink} strokeWidth="2" />
        <line x1="52" y1="100" x2="148" y2="108" stroke={C.pink} strokeWidth="2" />
        <text x="108" y="76" fill={C.aqua} fontSize="11">centru</text>
        <text x="28" y="118" fill={C.pink} fontSize="11">înscris</text>
        <text x="40" y="160" fill="#fff" fontSize="11">înscris = jumătate din arc</text>
      </svg>
    )
  },
  'circle-sector': {
    label: 'Sector de cerc',
    svg: (
      <svg viewBox="0 0 200 170" role="img" aria-label="Sector de disc">
        <circle cx="100" cy="85" r="54" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <path d="M100,85 L154,85 A54,54 0 0 0 70,38 Z" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <text x="112" y="70" fill="#fff" fontSize="12">α</text>
        <text x="48" y="160" fill="#fff" fontSize="11">felie: (α/360°)·πr²</text>
      </svg>
    )
  },
  pentagon: {
    label: 'Pentagon regulat',
    svg: (
      <svg viewBox="0 0 200 170" role="img" aria-label="Pentagon regulat">
        <polygon points="100,18 178,74 148,156 52,156 22,74" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <text x="92" y="96" fill="#fff" fontSize="12">108°</text>
      </svg>
    )
  },
  hexagon: {
    label: 'Hexagon regulat',
    svg: (
      <svg viewBox="0 0 200 170" role="img" aria-label="Hexagon regulat">
        <polygon points="100,18 170,52 170,118 100,152 30,118 30,52" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <line x1="100" y1="18" x2="100" y2="152" stroke={C.violet} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="30" y1="52" x2="170" y2="118" stroke={C.violet} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="88" y="90" fill="#fff" fontSize="12">R = a</text>
      </svg>
    )
  },
  thales: {
    label: 'Thales: segmente proporționale',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Unghi tăiat de o paralelă">
        <polyline points="30,140 120,20 210,140" fill="none" stroke={C.violet} strokeWidth="3" />
        <line x1="70" y1="90" x2="170" y2="90" stroke={C.aqua} strokeWidth="3" />
        <text x="88" y="82" fill={C.aqua} fontSize="11">paralelă</text>
        <text x="48" y="120" fill="#fff" fontSize="11">a</text>
        <text x="78" y="68" fill="#fff" fontSize="11">a′</text>
      </svg>
    )
  },
  similar: {
    label: 'Triunghiuri asemenea',
    svg: (
      <svg viewBox="0 0 260 150" role="img" aria-label="Două triunghiuri asemenea">
        <polygon points="20,130 110,130 65,48" fill={C.fillA} stroke={C.aqua} strokeWidth="3" />
        <polygon points="140,130 250,130 195,28" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <text x="52" y="146" fill={C.aqua} fontSize="11">k = 1</text>
        <text x="178" y="146" fill={C.violet} fontSize="11">scară k</text>
      </svg>
    )
  },
  planes: {
    label: 'Un plan și o dreaptă în spațiu',
    svg: (
      <svg viewBox="0 0 260 150" role="img" aria-label="Planul mesei și un creion paralel">
        <polygon points="30,110 170,110 230,50 90,50" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="50" y1="40" x2="200" y2="20" stroke={C.aqua} strokeWidth="4" strokeLinecap="round" />
        <text x="70" y="138" fill="#fff" fontSize="12">plan (masa)</text>
        <text x="150" y="16" fill={C.aqua} fontSize="12">dreaptă paralelă</text>
      </svg>
    )
  },
  cube: {
    label: 'Cub: V = a³',
    svg: (
      <svg viewBox="0 0 220 170" role="img" aria-label="Cub în perspectivă">
        <polygon points="50,50 140,50 170,22 80,22" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <polygon points="50,50 50,140 140,140 140,50" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="140,50 170,22 170,112 140,140" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <line x1="50" y1="140" x2="80" y2="112" stroke={C.violet} strokeDasharray="4 3" />
        <line x1="80" y1="112" x2="80" y2="22" stroke={C.violet} strokeDasharray="4 3" />
        <line x1="80" y1="112" x2="170" y2="112" stroke={C.violet} strokeDasharray="4 3" />
        <text x="86" y="162" fill="#fff" fontSize="12">a × a × a</text>
      </svg>
    )
  },
  box3d: {
    label: 'Paralelipiped: L × l × h',
    svg: (
      <svg viewBox="0 0 240 170" role="img" aria-label="Paralelipiped văzut în perspectivă">
        <polygon points="40,60 160,60 196,28 76,28" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <polygon points="40,60 40,140 160,140 160,60" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="160,60 196,28 196,108 160,140" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <line x1="40" y1="140" x2="76" y2="108" stroke={C.violet} strokeDasharray="4 3" />
        <line x1="76" y1="108" x2="76" y2="28" stroke={C.violet} strokeDasharray="4 3" />
        <line x1="76" y1="108" x2="196" y2="108" stroke={C.violet} strokeDasharray="4 3" />
        <text x="88" y="162" fill="#fff" fontSize="12">L × l × h</text>
      </svg>
    )
  },
  prism: {
    label: 'Prismă dreaptă',
    svg: (
      <svg viewBox="0 0 240 170" role="img" aria-label="Prismă cu baze dreptunghiulare">
        <polygon points="40,60 160,60 196,28 76,28" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <polygon points="40,60 40,140 160,140 160,60" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="160,60 196,28 196,108 160,140" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <text x="70" y="162" fill="#fff" fontSize="12">V = A_bază × h</text>
      </svg>
    )
  },
  'prism-tri': {
    label: 'Prismă triunghiulară',
    svg: (
      <svg viewBox="0 0 220 170" role="img" aria-label="Prismă cu baze triunghiulare">
        <polygon points="50,130 160,140 120,90" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="70,40 180,50 140,8" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="50" y1="130" x2="70" y2="40" stroke={C.pink} strokeWidth="2" />
        <line x1="160" y1="140" x2="180" y2="50" stroke={C.pink} strokeWidth="2" />
        <line x1="120" y1="90" x2="140" y2="8" stroke={C.pink} strokeWidth="2" />
        <text x="48" y="162" fill="#fff" fontSize="12">bază = triunghi</text>
      </svg>
    )
  },
  'prism-hex': {
    label: 'Prismă hexagonală',
    svg: (
      <svg viewBox="0 0 220 170" role="img" aria-label="Prismă cu baze hexagonale">
        <polygon points="70,120 110,132 150,120 150,92 110,80 70,92" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="80,48 120,60 160,48 160,20 120,8 80,20" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="70" y1="120" x2="80" y2="48" stroke={C.pink} strokeWidth="2" />
        <line x1="150" y1="120" x2="160" y2="48" stroke={C.pink} strokeWidth="2" />
        <line x1="110" y1="132" x2="120" y2="60" stroke={C.pink} strokeWidth="2" />
        <text x="52" y="162" fill="#fff" fontSize="12">bază = hexagon</text>
      </svg>
    )
  },
  pyramid: {
    label: 'Piramidă cu bază pătrată',
    svg: (
      <svg viewBox="0 0 220 160" role="img" aria-label="Piramidă văzută în perspectivă">
        <polygon points="40,130 160,130 180,100 70,100" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="110,20 40,130 160,130" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="110" y1="20" x2="70" y2="100" stroke={C.violet} strokeDasharray="4 3" />
        <line x1="110" y1="20" x2="180" y2="100" stroke={C.violet} />
        <text x="78" y="154" fill="#fff" fontSize="12">V = (A_bază × h) / 3</text>
      </svg>
    )
  },
  'pyramid-tri': {
    label: 'Piramidă triunghiulară',
    svg: (
      <svg viewBox="0 0 220 160" role="img" aria-label="Piramidă cu bază triunghiulară">
        <polygon points="40,130 180,130 130,100" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="110,18 40,130 180,130" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="110" y1="18" x2="130" y2="100" stroke={C.violet} strokeDasharray="4 3" />
        <text x="70" y="154" fill="#fff" fontSize="12">V = Ab × h / 3</text>
      </svg>
    )
  },
  tetrahedron: {
    label: 'Tetraedru regulat',
    svg: (
      <svg viewBox="0 0 220 160" role="img" aria-label="Tetraedru">
        <polygon points="40,130 190,120 110,18" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="40" y1="130" x2="150" y2="145" stroke={C.aqua} strokeWidth="2" />
        <line x1="190" y1="120" x2="150" y2="145" stroke={C.aqua} strokeWidth="2" />
        <line x1="110" y1="18" x2="150" y2="145" stroke={C.pink} strokeDasharray="4 3" />
        <text x="48" y="158" fill="#fff" fontSize="11">4 fețe echilaterale</text>
      </svg>
    )
  },
  cylinder: {
    label: 'Cilindru',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Cilindru circular drept">
        <ellipse cx="90" cy="36" rx="50" ry="16" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="40" y1="36" x2="40" y2="130" stroke={C.aqua} strokeWidth="2" />
        <line x1="140" y1="36" x2="140" y2="130" stroke={C.aqua} strokeWidth="2" />
        <ellipse cx="90" cy="130" rx="50" ry="16" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <text x="48" y="160" fill="#fff" fontSize="12">V = πr²h</text>
      </svg>
    )
  },
  cone: {
    label: 'Con',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Con circular drept">
        <line x1="90" y1="20" x2="40" y2="130" stroke={C.violet} strokeWidth="2" />
        <line x1="90" y1="20" x2="140" y2="130" stroke={C.violet} strokeWidth="2" />
        <ellipse cx="90" cy="130" rx="50" ry="16" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <text x="40" y="160" fill="#fff" fontSize="12">V = πr²h / 3</text>
      </svg>
    )
  },
  frustum: {
    label: 'Trunchi de con',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Trunchi de con">
        <ellipse cx="90" cy="40" rx="28" ry="10" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <line x1="62" y1="40" x2="40" y2="130" stroke={C.aqua} strokeWidth="2" />
        <line x1="118" y1="40" x2="140" y2="130" stroke={C.aqua} strokeWidth="2" />
        <ellipse cx="90" cy="130" rx="50" ry="16" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <text x="28" y="160" fill="#fff" fontSize="11">două baze, o centură</text>
      </svg>
    )
  },
  'frustum-pyramid': {
    label: 'Trunchi de piramidă',
    svg: (
      <svg viewBox="0 0 220 170" role="img" aria-label="Trunchi de piramidă">
        <polygon points="80,40 140,40 152,28 92,28" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <polygon points="40,130 180,130 200,100 70,100" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <line x1="80" y1="40" x2="40" y2="130" stroke={C.pink} strokeWidth="2" />
        <line x1="140" y1="40" x2="180" y2="130" stroke={C.pink} strokeWidth="2" />
        <line x1="152" y1="28" x2="200" y2="100" stroke={C.pink} strokeWidth="2" />
        <text x="48" y="160" fill="#fff" fontSize="11">baze asemenea</text>
      </svg>
    )
  },
  'number-line': {
    label: 'Axa numerelor naturale',
    svg: (
      <svg viewBox="0 0 320 110" role="img" aria-label="Axă cu originea O, unitatea u și punctele 0, 1, 2, 3, 4">
        <line x1="24" y1="58" x2="300" y2="58" stroke="currentColor" strokeWidth="2" />
        <polygon points="300,58 288,52 288,64" fill="currentColor" />
        <text x="292" y="44" fill={C.pink} fontSize="12">sens</text>
        {[0, 1, 2, 3, 4].map(n => (
          <g key={n}>
            <line x1={48 + n * 48} y1="50" x2={48 + n * 48} y2="66" stroke={C.aqua} strokeWidth="2" />
            <circle cx={48 + n * 48} cy="58" r="4" fill={n === 0 ? C.pink : C.violet} />
            <text x={42 + n * 48} y="86" fill="#fff" fontSize="13">{n}</text>
          </g>
        ))}
        <text x="36" y="36" fill={C.pink} fontSize="13">O</text>
        <line x1="48" y1="58" x2="96" y2="58" stroke={C.aqua} strokeWidth="6" strokeLinecap="round" />
        <text x="60" y="28" fill={C.aqua} fontSize="12">u</text>
      </svg>
    )
  },
  'compare-line': {
    label: 'Pe axă, numărul mai mare stă mai la dreapta',
    svg: (
      <svg viewBox="0 0 320 100" role="img" aria-label="Trei puncte pe axă, în ordine crescătoare">
        <line x1="20" y1="48" x2="300" y2="48" stroke="currentColor" strokeWidth="2" />
        <polygon points="300,48 288,42 288,54" fill="currentColor" />
        <circle cx="70" cy="48" r="6" fill={C.aqua} />
        <circle cx="150" cy="48" r="6" fill={C.violet} />
        <circle cx="230" cy="48" r="6" fill={C.pink} />
        <text x="58" y="78" fill={C.aqua} fontSize="13">84</text>
        <text x="132" y="78" fill={C.violet} fontSize="13">408</text>
        <text x="212" y="78" fill={C.pink} fontSize="13">480</text>
        <text x="250" y="28" fill="#fff" fontSize="12">mai mare →</text>
      </svg>
    )
  },
  'place-value': {
    label: 'Clase și ordine, de la dreapta la stânga',
    svg: (
      <svg viewBox="0 0 320 120" role="img" aria-label="Numărul 530957 împărțit în clasa miilor și clasa unităților">
        <rect x="16" y="28" width="140" height="56" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="164" y="28" width="140" height="56" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <text x="28" y="20" fill={C.violet} fontSize="11">clasa miilor</text>
        <text x="176" y="20" fill={C.aqua} fontSize="11">clasa unităților</text>
        {['5', '3', '0', '9', '5', '7'].map((digit, index) => (
          <text key={digit + index} x={32 + index * 46} y="62" fill="#fff" fontSize="22">{digit}</text>
        ))}
        <text x="24" y="104" fill={C.violet} fontSize="10">sute mii · zeci mii · mii</text>
        <text x="176" y="104" fill={C.aqua} fontSize="10">sute · zeci · unități</text>
      </svg>
    )
  },
  'dot-numbers': {
    label: 'Număr triunghiular și pătrat perfect',
    svg: (
      <svg viewBox="0 0 280 130" role="img" aria-label="Trei puncte în triunghi și nouă puncte în pătrat">
        {[
          [40, 28],
          [28, 52], [52, 52],
          [16, 76], [40, 76], [64, 76]
        ].map(([x, y], index) => (
          <circle key={`t${index}`} cx={x} cy={y} r="6" fill={C.aqua} />
        ))}
        <text x="16" y="108" fill={C.aqua} fontSize="12">1+2+3 = 6</text>
        {[0, 1, 2].map(row => [0, 1, 2].map(col => (
          <circle key={`s${row}${col}`} cx={150 + col * 22} cy={28 + row * 22} r="6" fill={C.violet} />
        )))}
        <text x="150" y="108" fill={C.violet} fontSize="12">3×3 = 9</text>
      </svg>
    )
  },
  remainder: {
    label: 'Împărțire cu rest: 17 = 5×3 + 2',
    svg: (
      <svg viewBox="0 0 300 120" role="img" aria-label="Trei grupe de câte cinci puncte și un rest de două">
        {[0, 1, 2].map(group => (
          <g key={group}>
            <rect x={16 + group * 78} y="24" width="66" height="36" rx="8" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
            {[0, 1, 2, 3, 4].map(dot => (
              <circle key={dot} cx={28 + group * 78 + dot * 11} cy="42" r="4" fill={C.aqua} />
            ))}
          </g>
        ))}
        <circle cx="250" cy="42" r="5" fill={C.pink} />
        <circle cx="266" cy="42" r="5" fill={C.pink} />
        <text x="16" y="90" fill="#fff" fontSize="13">3 grupe de 5, rest 2</text>
      </svg>
    )
  },
  'power-grid': {
    label: '3² înseamnă 3×3, nu 3×2',
    svg: (
      <svg viewBox="0 0 220 140" role="img" aria-label="Grilă 3 pe 3 pentru pătratul lui 3">
        {[0, 1, 2].map(row => [0, 1, 2].map(col => (
          <rect key={`${row}-${col}`} x={30 + col * 36} y={20 + row * 36} width="30" height="30" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        )))}
        <text x="150" y="70" fill="#fff" fontSize="16">3² = 9</text>
      </svg>
    )
  },
  segments: {
    label: 'Sumă și diferență pe segmente',
    svg: (
      <svg viewBox="0 0 300 120" role="img" aria-label="Două segmente: numărul mic și numărul mare, cu diferența marcată">
        <line x1="30" y1="36" x2="170" y2="36" stroke={C.aqua} strokeWidth="8" strokeLinecap="round" />
        <text x="180" y="40" fill={C.aqua} fontSize="13">mic</text>
        <line x1="30" y1="72" x2="230" y2="72" stroke={C.violet} strokeWidth="8" strokeLinecap="round" />
        <line x1="170" y1="64" x2="170" y2="80" stroke={C.pink} strokeWidth="2" />
        <text x="176" y="96" fill={C.pink} fontSize="12">diferență</text>
        <text x="30" y="112" fill="#fff" fontSize="12">suma − diferența = de două ori numărul mic</text>
      </svg>
    )
  },
  'bar-sum': {
    label: 'Suma pune grupele la un loc',
    svg: (
      <svg viewBox="0 0 280 130" role="img" aria-label="Trei bare, 4, 6 și 2, a căror sumă este 12">
        <line x1="36" y1="20" x2="36" y2="100" stroke="currentColor" strokeWidth="2" />
        <line x1="36" y1="100" x2="250" y2="100" stroke="currentColor" strokeWidth="2" />
        <rect x="56" y="60" width="36" height="40" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="108" y="40" width="36" height="60" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="160" y="80" width="36" height="20" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <text x="66" y="54" fill={C.aqua} fontSize="12">4</text>
        <text x="118" y="34" fill={C.violet} fontSize="12">6</text>
        <text x="170" y="74" fill={C.pink} fontSize="12">2</text>
        <text x="56" y="120" fill="#fff" fontSize="13">4 + 6 + 2 = 12</text>
      </svg>
    )
  },
  'fraction-bar': {
    label: '3 din 4 părți egale',
    svg: (
      <svg viewBox="0 0 280 132" role="img" aria-label="Dreptunghi tăiat în patru, cu trei părți colorate, etichetat 3 pe 4 din întreg">
        <rect x="24" y="16" width="232" height="48" fill="none" stroke="#fff" strokeWidth="2" />
        <rect x="24" y="16" width="58" height="48" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="82" y="16" width="58" height="48" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="140" y="16" width="58" height="48" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <rect x="198" y="16" width="58" height="48" fill="none" stroke="#fff" strokeWidth="2" />
        <SvgFraction x="98" y="96" num="3" den="4" label="din întreg" />
      </svg>
    )
  },
  'equivalent-bars': {
    label: '1/2 și 2/4 sunt aceeași parte',
    svg: (
      <svg viewBox="0 0 280 120" role="img" aria-label="Două bare egale: jumătate și două sferturi">
        <rect x="24" y="16" width="100" height="36" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="124" y="16" width="100" height="36" fill="none" stroke="#fff" strokeWidth="2" />
        <SvgFraction x="250" y="36" num="1" den="2" fill={C.aqua} />
        <rect x="24" y="68" width="50" height="36" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="74" y="68" width="50" height="36" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="124" y="68" width="50" height="36" fill="none" stroke="#fff" strokeWidth="2" />
        <rect x="174" y="68" width="50" height="36" fill="none" stroke="#fff" strokeWidth="2" />
        <SvgFraction x="250" y="88" num="2" den="4" fill={C.violet} />
      </svg>
    )
  },
  'fraction-line': {
    label: 'Fracții pe axă, de la 0 la 2',
    svg: (
      <svg viewBox="0 0 320 112" role="img" aria-label="Axă cu 0, 1/2, 1 și 3/2">
        <line x1="20" y1="42" x2="300" y2="42" stroke="currentColor" strokeWidth="2" />
        <polygon points="300,42 288,36 288,48" fill="currentColor" />
        {[40, 110, 180, 250].map((x, index) => (
          <g key={x}>
            <line x1={x} y1="34" x2={x} y2="50" stroke="#fff" strokeWidth="2" />
            <circle cx={x} cy="42" r="5" fill={index === 1 ? C.pink : C.aqua} />
          </g>
        ))}
        <text x="32" y="78" fill="#fff" fontSize="13">0</text>
        <SvgFraction x="110" y="78" num="1" den="2" fill={C.pink} />
        <text x="174" y="78" fill="#fff" fontSize="13">1</text>
        <SvgFraction x="250" y="78" num="3" den="2" />
      </svg>
    )
  },
  'mixed-number': {
    label: '2 întregi și 1/4',
    svg: (
      <svg viewBox="0 0 300 128" role="img" aria-label="Două pătrate întregi și un sfert din al treilea">
        <rect x="16" y="16" width="64" height="52" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="92" y="16" width="64" height="52" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="168" y="16" width="16" height="52" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <rect x="184" y="16" width="48" height="52" fill="none" stroke="#fff" strokeWidth="2" />
        <text x="16" y="100" fill="#fff" fontSize="13">2 întregi +</text>
        <SvgFraction x="156" y="96" num="1" den="4" fill={C.pink} />
      </svg>
    )
  },
  sierpinski: {
    label: 'Triunghi: colorezi tot, în afară de mijloc',
    svg: (
      <svg viewBox="0 0 220 150" role="img" aria-label="Triunghi împărțit în patru, cu mijlocul gol">
        <polygon points="110,12 20,132 200,132" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <polygon points="110,72 65,132 155,132" fill="#12141c" stroke={C.pink} strokeWidth="2" />
        <circle cx="110" cy="72" r="3" fill={C.pink} />
        <circle cx="65" cy="132" r="3" fill={C.violet} />
        <circle cx="155" cy="132" r="3" fill={C.violet} />
        <text x="48" y="148" fill="#fff" fontSize="11">mijlocul rămâne gol</text>
      </svg>
    )
  },
  'decimal-place': {
    label: 'Virgula desparte întregii de zecimale',
    svg: (
      <svg viewBox="0 0 320 110" role="img" aria-label="Numărul 3,25 cu unități, zecimi și sutimi">
        <rect x="16" y="24" width="70" height="48" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <text x="40" y="54" fill="#fff" fontSize="22">3</text>
        <text x="96" y="54" fill={C.pink} fontSize="28">,</text>
        <rect x="118" y="24" width="70" height="48" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <text x="142" y="54" fill="#fff" fontSize="22">2</text>
        <rect x="196" y="24" width="70" height="48" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <text x="220" y="54" fill="#fff" fontSize="22">5</text>
        <text x="22" y="92" fill={C.violet} fontSize="11">unități</text>
        <text x="128" y="92" fill={C.aqua} fontSize="11">zecimi</text>
        <text x="206" y="92" fill={C.pink} fontSize="11">sutimi</text>
      </svg>
    )
  },
  'decimal-line': {
    label: '1,4 stă între 1 și 2, mai aproape de 1',
    svg: (
      <svg viewBox="0 0 320 100" role="img" aria-label="Axă cu 0, 1, 1,4 și 2">
        <line x1="20" y1="42" x2="300" y2="42" stroke="currentColor" strokeWidth="2" />
        <polygon points="300,42 288,36 288,48" fill="currentColor" />
        <line x1="50" y1="34" x2="50" y2="50" stroke="#fff" />
        <line x1="150" y1="34" x2="150" y2="50" stroke="#fff" />
        <line x1="250" y1="34" x2="250" y2="50" stroke="#fff" />
        <circle cx="190" cy="42" r="6" fill={C.pink} />
        <text x="44" y="74" fill="#fff" fontSize="13">0</text>
        <text x="144" y="74" fill="#fff" fontSize="13">1</text>
        <text x="176" y="24" fill={C.pink} fontSize="13">1,4</text>
        <text x="244" y="74" fill="#fff" fontSize="13">2</text>
      </svg>
    )
  },
  collinear: {
    label: 'Trei puncte pe aceeași dreaptă, unul în afară',
    svg: (
      <svg viewBox="0 0 280 110" role="img" aria-label="Punctele A, B și C sunt coliniare, iar D nu">
        <line x1="20" y1="70" x2="250" y2="70" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="70" r="5" fill={C.aqua} />
        <circle cx="130" cy="70" r="5" fill={C.aqua} />
        <circle cx="200" cy="70" r="5" fill={C.aqua} />
        <circle cx="130" cy="28" r="5" fill={C.pink} />
        <text x="52" y="92" fill="#fff" fontSize="13">A</text>
        <text x="122" y="92" fill="#fff" fontSize="13">B</text>
        <text x="192" y="92" fill="#fff" fontSize="13">C</text>
        <text x="138" y="24" fill={C.pink} fontSize="13">D</text>
      </svg>
    )
  },
  midpoint: {
    label: 'M este mijlocul segmentului AB',
    svg: (
      <svg viewBox="0 0 280 100" role="img" aria-label="Segmentul AB cu mijlocul M">
        <line x1="40" y1="48" x2="240" y2="48" stroke={C.aqua} strokeWidth="4" strokeLinecap="round" />
        <circle cx="40" cy="48" r="6" fill={C.violet} />
        <circle cx="140" cy="48" r="6" fill={C.pink} />
        <circle cx="240" cy="48" r="6" fill={C.violet} />
        <text x="32" y="78" fill="#fff" fontSize="14">A</text>
        <text x="132" y="78" fill={C.pink} fontSize="14">M</text>
        <text x="232" y="78" fill="#fff" fontSize="14">B</text>
      </svg>
    )
  },
  'symmetry-axis': {
    label: 'Dreapta d este axă de simetrie',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Două puncte simetrice față de o dreaptă verticală">
        <line x1="120" y1="16" x2="120" y2="124" stroke={C.aqua} strokeWidth="2" strokeDasharray="5 4" />
        <line x1="48" y1="70" x2="192" y2="70" stroke={C.pink} strokeWidth="2" />
        <circle cx="48" cy="70" r="6" fill={C.violet} />
        <circle cx="192" cy="70" r="6" fill={C.violet} />
        <circle cx="120" cy="70" r="5" fill={C.pink} />
        <rect x="120" y="58" width="12" height="12" fill="none" stroke="#fff" />
        <text x="36" y="96" fill="#fff" fontSize="13">M</text>
        <text x="112" y="96" fill={C.pink} fontSize="13">P</text>
        <text x="184" y="96" fill="#fff" fontSize="13">N</text>
        <text x="128" y="28" fill={C.aqua} fontSize="13">d</text>
      </svg>
    )
  },
  venn: {
    label: 'Două mulțimi și partea lor comună',
    svg: (
      <svg viewBox="0 0 280 140" role="img" aria-label="Diagramă cu două cercuri care se taie, A și B">
        <circle cx="110" cy="72" r="48" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <circle cx="168" cy="72" r="48" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <text x="78" y="68" fill="#fff" fontSize="16">A</text>
        <text x="186" y="68" fill="#fff" fontSize="16">B</text>
        <text x="128" y="76" fill={C.pink} fontSize="13">∩</text>
      </svg>
    )
  },
  'integer-line': {
    label: 'Axa numerelor întregi',
    svg: (
      <svg viewBox="0 0 320 100" role="img" aria-label="Axă cu numerele de la −3 la 3">
        <line x1="16" y1="48" x2="304" y2="48" stroke="currentColor" strokeWidth="2" />
        <polygon points="304,48 292,42 292,54" fill="currentColor" />
        {[-3, -2, -1, 0, 1, 2, 3].map(n => (
          <g key={n}>
            <line x1={48 + (n + 3) * 36} y1="40" x2={48 + (n + 3) * 36} y2="56" stroke={C.aqua} strokeWidth="2" />
            <circle cx={48 + (n + 3) * 36} cy="48" r="4" fill={n === 0 ? C.pink : C.violet} />
            <text x={n < 0 ? 34 + (n + 3) * 36 : 40 + (n + 3) * 36} y="78" fill="#fff" fontSize="13">{n}</text>
          </g>
        ))}
      </svg>
    )
  },
  'frequency-bars': {
    label: 'Bare: de câte ori apare fiecare notă',
    svg: (
      <svg viewBox="0 0 280 140" role="img" aria-label="Diagramă cu bare pentru notele 5, 7, 8, 9 și 10">
        <line x1="36" y1="20" x2="36" y2="108" stroke="currentColor" strokeWidth="2" />
        <line x1="36" y1="108" x2="250" y2="108" stroke="currentColor" strokeWidth="2" />
        <rect x="52" y="84" width="28" height="24" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="92" y="84" width="28" height="24" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <rect x="132" y="36" width="28" height="72" fill={C.fillP} stroke={C.pink} strokeWidth="2" />
        <rect x="172" y="60" width="28" height="48" fill={C.fillA} stroke={C.aqua} strokeWidth="2" />
        <rect x="212" y="84" width="28" height="24" fill={C.fillV} stroke={C.violet} strokeWidth="2" />
        <text x="60" y="124" fill="#fff" fontSize="12">5</text>
        <text x="100" y="124" fill="#fff" fontSize="12">7</text>
        <text x="140" y="124" fill="#fff" fontSize="12">8</text>
        <text x="180" y="124" fill="#fff" fontSize="12">9</text>
        <text x="216" y="124" fill="#fff" fontSize="12">10</text>
      </svg>
    )
  },
  sphere: {
    label: 'Sferă',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Sferă cu ecuator">
        <circle cx="90" cy="80" r="54" fill={C.fillV} stroke={C.violet} strokeWidth="3" />
        <ellipse cx="90" cy="80" rx="54" ry="18" fill="none" stroke={C.aqua} strokeWidth="2" />
        <line x1="90" y1="80" x2="144" y2="80" stroke={C.pink} strokeWidth="2" />
        <text x="110" y="74" fill={C.pink} fontSize="12">R</text>
        <text x="28" y="158" fill="#fff" fontSize="11">A=4πR² · V=(4/3)πR³</text>
      </svg>
    )
  }
};

const SOLIDS = new Set([
  'box3d', 'cube', 'prism', 'prism-tri', 'prism-hex',
  'pyramid', 'pyramid-tri', 'tetrahedron',
  'cylinder', 'cone', 'frustum', 'frustum-pyramid',
  'sphere', 'planes'
]);

const GeoFigure = ({ kind, caption, formulas, info, flat }) => {
  const id = typeof kind === 'string' ? kind : kind && kind.kind;
  const figure = FIGURES[id];
  if (!figure) return null;
  const title = caption || figure.label;
  const body = !flat && SOLIDS.has(id)
    ? <GeoSolid kind={kind} caption={title} fallback={figure.svg} />
    : (
      <figure className="geo-figure">
        <div className="geo-figure-canvas">{figure.svg}</div>
        <figcaption><MathText text={title} /></figcaption>
      </figure>
    );
  if ((!formulas || !formulas.length) && !info) return body;
  return (
    <div className="geo-figure-block">
      {body}
      {formulas?.length > 0 && (
        <ul className="geo-formulas">
          {formulas.map(row => <li key={row}><MathText text={row} /></li>)}
        </ul>
      )}
      {info ? <p className="geo-figure-info">{info}</p> : null}
    </div>
  );
};

export default GeoFigure;
export { FIGURES, SOLIDS };
