import GeoSolid from './GeoSolid.jsx';

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
  const figure = FIGURES[kind];
  if (!figure) return null;
  const title = caption || figure.label;
  const body = !flat && SOLIDS.has(kind)
    ? <GeoSolid kind={kind} caption={title} fallback={figure.svg} />
    : (
      <figure className="geo-figure">
        <div className="geo-figure-canvas">{figure.svg}</div>
        <figcaption>{title}</figcaption>
      </figure>
    );
  if ((!formulas || !formulas.length) && !info) return body;
  return (
    <div className="geo-figure-block">
      {body}
      {formulas?.length > 0 && (
        <ul className="geo-formulas">
          {formulas.map(row => <li key={row}>{row}</li>)}
        </ul>
      )}
      {info ? <p className="geo-figure-info">{info}</p> : null}
    </div>
  );
};

export default GeoFigure;
export { FIGURES, SOLIDS };
