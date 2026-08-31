import GeoSolid from './GeoSolid.jsx';

const FIGURES = {
  'points-line': {
    label: 'Punct, dreaptă, segment',
    svg: (
      <svg viewBox="0 0 280 110" role="img" aria-label="Puncte A și B, segmentul AB și o dreaptă">
        <line x1="20" y1="55" x2="260" y2="55" stroke="currentColor" strokeWidth="2" />
        <line x1="70" y1="55" x2="190" y2="55" stroke="#6fd7ff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="70" cy="55" r="6" fill="#b9a7ff" />
        <circle cx="190" cy="55" r="6" fill="#b9a7ff" />
        <text x="62" y="38" fill="#fff" fontSize="14">A</text>
        <text x="182" y="38" fill="#fff" fontSize="14">B</text>
        <text x="112" y="88" fill="#6fd7ff" fontSize="12">segmentul AB</text>
      </svg>
    )
  },
  angle: {
    label: 'Unghi drept, ascuțit, obtuz',
    svg: (
      <svg viewBox="0 0 280 130" role="img" aria-label="Trei unghiuri: ascuțit, drept, obtuz">
        <polyline points="20,100 70,100 110,40" fill="none" stroke="#6fd7ff" strokeWidth="3" />
        <text x="78" y="88" fill="#6fd7ff" fontSize="11">ascuțit</text>
        <polyline points="130,100 180,100 180,40" fill="none" stroke="#b9a7ff" strokeWidth="3" />
        <rect x="180" y="88" width="12" height="12" fill="none" stroke="#b9a7ff" />
        <text x="186" y="78" fill="#b9a7ff" fontSize="11">90°</text>
        <polyline points="210,80 250,100 210,40" fill="none" stroke="#ff8fa3" strokeWidth="3" />
        <text x="228" y="78" fill="#ff8fa3" fontSize="11">obtuz</text>
      </svg>
    )
  },
  rectangle: {
    label: 'Dreptunghi: perimetru și arie',
    svg: (
      <svg viewBox="0 0 260 140" role="img" aria-label="Dreptunghi cu lungime și lățime">
        <rect x="40" y="30" width="180" height="80" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="3" />
        <text x="110" y="22" fill="#6fd7ff" fontSize="12">L</text>
        <text x="228" y="78" fill="#b9a7ff" fontSize="12">l</text>
        <text x="95" y="78" fill="#fff" fontSize="13">aria = L × l</text>
      </svg>
    )
  },
  box3d: {
    label: 'Cub / cutie în spațiu',
    svg: (
      <svg viewBox="0 0 240 170" role="img" aria-label="Paralelipiped văzut în perspectivă">
        <polygon points="50,60 150,60 180,30 80,30" fill="rgba(185,167,255,.18)" stroke="#b9a7ff" strokeWidth="2" />
        <polygon points="50,60 50,140 150,140 150,60" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="2" />
        <polygon points="150,60 180,30 180,110 150,140" fill="rgba(255,143,163,.1)" stroke="#ff8fa3" strokeWidth="2" />
        <line x1="50" y1="140" x2="80" y2="110" stroke="#b9a7ff" strokeDasharray="4 3" />
        <line x1="80" y1="110" x2="80" y2="30" stroke="#b9a7ff" strokeDasharray="4 3" />
        <line x1="80" y1="110" x2="180" y2="110" stroke="#b9a7ff" strokeDasharray="4 3" />
        <text x="88" y="162" fill="#fff" fontSize="12">L × l × h</text>
      </svg>
    )
  },
  triangle: {
    label: 'Triunghi: 180°',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Triunghi cu unghiurile A B C">
        <polygon points="40,130 200,130 120,28" fill="rgba(185,167,255,.14)" stroke="#b9a7ff" strokeWidth="3" />
        <text x="28" y="148" fill="#fff" fontSize="13">A</text>
        <text x="200" y="148" fill="#fff" fontSize="13">B</text>
        <text x="114" y="20" fill="#fff" fontSize="13">C</text>
        <text x="78" y="88" fill="#6fd7ff" fontSize="12">A+B+C=180°</text>
      </svg>
    )
  },
  'triangle-right': {
    label: 'Pitagora: a² + b² = c²',
    svg: (
      <svg viewBox="0 0 240 160" role="img" aria-label="Triunghi dreptunghic 3-4-5">
        <polygon points="40,140 160,140 40,40" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="3" />
        <rect x="40" y="128" width="12" height="12" fill="none" stroke="#ff8fa3" />
        <text x="88" y="156" fill="#fff" fontSize="12">a = 3</text>
        <text x="8" y="96" fill="#fff" fontSize="12">b = 4</text>
        <text x="108" y="80" fill="#b9a7ff" fontSize="12">c = 5</text>
      </svg>
    )
  },
  parallels: {
    label: 'Paralele tăiate de o secantă',
    svg: (
      <svg viewBox="0 0 260 140" role="img" aria-label="Două drepte paralele tăiate de o secantă">
        <line x1="20" y1="40" x2="240" y2="40" stroke="#6fd7ff" strokeWidth="3" />
        <line x1="20" y1="100" x2="240" y2="100" stroke="#6fd7ff" strokeWidth="3" />
        <line x1="70" y1="10" x2="170" y2="130" stroke="#b9a7ff" strokeWidth="3" />
        <text x="200" y="36" fill="#6fd7ff" fontSize="12">d₁</text>
        <text x="200" y="96" fill="#6fd7ff" fontSize="12">d₂</text>
        <text x="168" y="70" fill="#b9a7ff" fontSize="12">secantă</text>
      </svg>
    )
  },
  circle: {
    label: 'Cerc: rază și diametru',
    svg: (
      <svg viewBox="0 0 200 160" role="img" aria-label="Cerc cu centru, rază și diametru">
        <circle cx="100" cy="80" r="54" fill="rgba(185,167,255,.12)" stroke="#b9a7ff" strokeWidth="3" />
        <circle cx="100" cy="80" r="4" fill="#6fd7ff" />
        <line x1="100" y1="80" x2="154" y2="80" stroke="#6fd7ff" strokeWidth="3" />
        <line x1="46" y1="80" x2="154" y2="80" stroke="#ff8fa3" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="118" y="74" fill="#6fd7ff" fontSize="12">r</text>
        <text x="86" y="148" fill="#fff" fontSize="12">d = 2r</text>
      </svg>
    )
  },
  trapezoid: {
    label: 'Trapez: baze și înălțime',
    svg: (
      <svg viewBox="0 0 240 140" role="img" aria-label="Trapez cu bazele B și b">
        <polygon points="50,110 200,110 170,40 80,40" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="3" />
        <line x1="80" y1="40" x2="80" y2="110" stroke="#ff8fa3" strokeWidth="2" strokeDasharray="3 3" />
        <text x="108" y="34" fill="#fff" fontSize="12">b</text>
        <text x="112" y="128" fill="#fff" fontSize="12">B</text>
        <text x="56" y="80" fill="#ff8fa3" fontSize="12">h</text>
      </svg>
    )
  },
  thales: {
    label: 'Thales: segmente proporționale',
    svg: (
      <svg viewBox="0 0 240 150" role="img" aria-label="Unghi tăiat de o paralelă">
        <polyline points="30,140 120,20 210,140" fill="none" stroke="#b9a7ff" strokeWidth="3" />
        <line x1="70" y1="90" x2="170" y2="90" stroke="#6fd7ff" strokeWidth="3" />
        <text x="88" y="82" fill="#6fd7ff" fontSize="11">paralelă</text>
        <text x="48" y="120" fill="#fff" fontSize="11">a</text>
        <text x="78" y="68" fill="#fff" fontSize="11">a′</text>
      </svg>
    )
  },
  planes: {
    label: 'Un plan și o dreaptă în spațiu',
    svg: (
      <svg viewBox="0 0 260 150" role="img" aria-label="Planul mesei și un creion paralel">
        <polygon points="30,110 170,110 230,50 90,50" fill="rgba(185,167,255,.16)" stroke="#b9a7ff" strokeWidth="2" />
        <line x1="50" y1="40" x2="200" y2="20" stroke="#6fd7ff" strokeWidth="4" strokeLinecap="round" />
        <text x="70" y="138" fill="#fff" fontSize="12">plan (masa)</text>
        <text x="150" y="16" fill="#6fd7ff" fontSize="12">dreaptă paralelă</text>
      </svg>
    )
  },
  pyramid: {
    label: 'Piramidă cu bază pătrată',
    svg: (
      <svg viewBox="0 0 220 160" role="img" aria-label="Piramidă văzută în perspectivă">
        <polygon points="40,130 160,130 180,100 70,100" fill="rgba(111,215,255,.1)" stroke="#6fd7ff" strokeWidth="2" />
        <polygon points="110,20 40,130 160,130" fill="rgba(185,167,255,.16)" stroke="#b9a7ff" strokeWidth="2" />
        <line x1="110" y1="20" x2="70" y2="100" stroke="#b9a7ff" strokeDasharray="4 3" />
        <line x1="110" y1="20" x2="180" y2="100" stroke="#b9a7ff" />
        <text x="78" y="154" fill="#fff" fontSize="12">V = (A_bază × h) / 3</text>
      </svg>
    )
  },
  cylinder: {
    label: 'Cilindru',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Cilindru circular drept">
        <ellipse cx="90" cy="36" rx="50" ry="16" fill="rgba(185,167,255,.2)" stroke="#b9a7ff" strokeWidth="2" />
        <line x1="40" y1="36" x2="40" y2="130" stroke="#6fd7ff" strokeWidth="2" />
        <line x1="140" y1="36" x2="140" y2="130" stroke="#6fd7ff" strokeWidth="2" />
        <ellipse cx="90" cy="130" rx="50" ry="16" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="2" />
        <text x="48" y="160" fill="#fff" fontSize="12">V = πr²h</text>
      </svg>
    )
  },
  cone: {
    label: 'Con',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Con circular drept">
        <line x1="90" y1="20" x2="40" y2="130" stroke="#b9a7ff" strokeWidth="2" />
        <line x1="90" y1="20" x2="140" y2="130" stroke="#b9a7ff" strokeWidth="2" />
        <ellipse cx="90" cy="130" rx="50" ry="16" fill="rgba(111,215,255,.12)" stroke="#6fd7ff" strokeWidth="2" />
        <text x="40" y="160" fill="#fff" fontSize="12">V = πr²h / 3</text>
      </svg>
    )
  },
  sphere: {
    label: 'Sferă',
    svg: (
      <svg viewBox="0 0 180 170" role="img" aria-label="Sferă cu ecuator">
        <circle cx="90" cy="80" r="54" fill="rgba(185,167,255,.14)" stroke="#b9a7ff" strokeWidth="3" />
        <ellipse cx="90" cy="80" rx="54" ry="18" fill="none" stroke="#6fd7ff" strokeWidth="2" />
        <line x1="90" y1="80" x2="144" y2="80" stroke="#ff8fa3" strokeWidth="2" />
        <text x="110" y="74" fill="#ff8fa3" fontSize="12">R</text>
        <text x="28" y="158" fill="#fff" fontSize="11">A=4πR² · V=(4/3)πR³</text>
      </svg>
    )
  }
};

const SOLIDS = new Set(['box3d', 'pyramid', 'cylinder', 'cone', 'sphere', 'planes']);

const GeoFigure = ({ kind, caption }) => {
  const figure = FIGURES[kind];
  if (!figure) return null;
  if (SOLIDS.has(kind)) {
    return <GeoSolid kind={kind} caption={caption || figure.label} fallback={figure.svg} />;
  }
  return (
    <figure className="geo-figure">
      <div className="geo-figure-canvas">{figure.svg}</div>
      <figcaption>{caption || figure.label}</figcaption>
    </figure>
  );
};

export default GeoFigure;
export { FIGURES };
