export const NAVY = "#091C3C";
export const AQUA = "#44D6D7";
export const LIME = "#93FC09";
const WHITE = "#FFFFFF";

export const MOODS = [
  "salut",
  "bucuros",
  "sarbatoare",
  "gandeste",
  "incurajeaza",
  "explica",
  "somnoros",
  "mandru",
  "trist-bland"
];

function pose(mood) {
  const base = {
    antennaL: "72,58 58,28 40,16",
    antennaR: "96,56 118,24 142,14",
    eyes: "open",
    smile: "M66,84 Q82,94 98,84",
    pencil: true,
    bigTen: false,
    wrench: false,
    zzz: false,
    legs: [
      "108,124 78,108 58,92",
      "112,132 74,148 46,158",
      "118,140 86,172 58,196",
      "132,122 168,108 188,90",
      "134,134 176,152 208,162",
      "128,142 168,176 198,198"
    ]
  };
  if (mood === "salut") {
    base.legs[0] = "108,118 86,86 70,58";
    base.antennaL = "72,56 52,22 34,8";
    base.antennaR = "98,54 126,16 154,6";
  }
  if (mood === "bucuros") {
    base.eyes = "happy";
    base.antennaL = "72,56 50,18 32,6";
    base.antennaR = "98,54 128,14 158,4";
  }
  if (mood === "sarbatoare") {
    base.bigTen = true;
    base.pencil = false;
    base.legs[0] = "108,116 88,72 78,40";
    base.legs[3] = "132,116 150,70 162,38";
    base.antennaL = "72,56 48,16 28,4";
    base.antennaR = "98,54 130,12 162,2";
  }
  if (mood === "gandeste") {
    base.eyes = "up";
    base.pencil = false;
    base.legs[0] = "108,120 92,96 84,78";
    base.antennaR = "98,58 112,36 108,18";
  }
  if (mood === "incurajeaza") {
    base.pencil = false;
    base.legs[0] = "108,118 90,78 96,52";
    base.antennaL = "74,58 62,34 70,16";
    base.antennaR = "96,58 112,32 122,18";
  }
  if (mood === "explica") {
    base.pencil = true;
    base.legs[3] = "132,120 170,108 198,96";
    base.antennaL = "74,58 92,28 110,18";
    base.antennaR = "98,56 122,30 146,24";
  }
  if (mood === "somnoros") {
    base.eyes = "sleepy";
    base.antennaL = "72,62 58,52 42,58";
    base.antennaR = "96,62 116,54 136,62";
    base.zzz = true;
    base.smile = "M70,86 Q82,90 94,86";
  }
  if (mood === "mandru") {
    base.bigTen = "back";
    base.antennaL = "72,56 54,20 38,10";
    base.antennaR = "98,54 124,18 150,10";
  }
  if (mood === "trist-bland") {
    base.pencil = false;
    base.wrench = true;
    base.antennaL = "72,60 60,42 48,40";
    base.antennaR = "96,60 112,44 128,46";
    base.smile = "M70,88 Q82,84 94,88";
  }
  return base;
}

function eyes(kind) {
  if (kind === "happy") {
    return `<path data-part="ochi" d="M62,72 Q70,64 78,72 M86,72 Q94,64 102,72" fill="none" stroke="${NAVY}" stroke-width="3" stroke-linecap="round"/>`;
  }
  if (kind === "sleepy") {
    return `<path data-part="ochi" d="M62,74 Q70,70 78,74 M86,74 Q94,70 102,74" fill="none" stroke="${NAVY}" stroke-width="3" stroke-linecap="round"/>`;
  }
  const dy = kind === "up" ? -3 : 0;
  return `<g data-part="ochi">
    <circle cx="70" cy="${72 + dy}" r="5" fill="${WHITE}"/>
    <circle cx="70" cy="${71 + dy}" r="2.4" fill="${NAVY}"/>
    <circle cx="68.8" cy="${70 + dy}" r="0.8" fill="${WHITE}"/>
    <circle cx="94" cy="${72 + dy}" r="5" fill="${WHITE}"/>
    <circle cx="94" cy="${71 + dy}" r="2.4" fill="${NAVY}"/>
    <circle cx="92.8" cy="${70 + dy}" r="0.8" fill="${WHITE}"/>
  </g>`;
}

function pencil() {
  return `<g data-part="creion">
    <rect x="168" y="96" width="46" height="8" rx="2" fill="${LIME}" transform="rotate(-28 168 100)"/>
    <polygon points="206,78 214,86 204,90" fill="#4B5563"/>
  </g>`;
}

function bigTen(where) {
  const y = where === "back" ? 78 : 36;
  const x = where === "back" ? 132 : 108;
  return `<text data-part="zece-mare" x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-size="42" font-weight="700" fill="${LIME}">10</text>`;
}

function wrench() {
  return `<g data-part="cheie" fill="${AQUA}">
    <rect x="150" y="150" width="28" height="6" rx="2" transform="rotate(20 150 150)"/>
    <circle cx="176" cy="142" r="6" fill="none" stroke="${AQUA}" stroke-width="3"/>
  </g>`;
}

function fullBody(mood) {
  const p = pose(mood);
  const legs = p.legs.map((points, index) => (
    `<polyline data-part="picior-${index + 1}" points="${points}" fill="none" stroke="${NAVY}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
  )).join("");
  return `<g class="mascot-body">
    ${legs}
    <ellipse data-part="abdomen" cx="148" cy="176" rx="56" ry="44" fill="${NAVY}"/>
    <path d="M118,158 Q148,142 176,160" fill="none" stroke="${AQUA}" stroke-width="4" stroke-linecap="round"/>
    <text data-part="zece" x="148" y="188" text-anchor="middle" font-family="Nunito, sans-serif" font-size="36" font-weight="700" fill="${WHITE}">10</text>
    <ellipse data-part="torace" cx="118" cy="124" rx="22" ry="16" fill="${NAVY}"/>
    <path d="M104,118 Q118,110 132,118" fill="none" stroke="${AQUA}" stroke-width="3" stroke-linecap="round"/>
    <ellipse data-part="cap" cx="84" cy="74" rx="26" ry="22" fill="${NAVY}"/>
    <path d="M68,66 Q84,56 100,66" fill="none" stroke="${AQUA}" stroke-width="3" stroke-linecap="round"/>
    ${eyes(p.eyes)}
    <path d="${p.smile}" fill="none" stroke="${WHITE}" stroke-width="2" stroke-linecap="round"/>
    <g data-part="ochelari" fill="none" stroke="${AQUA}" stroke-width="3">
      <circle cx="70" cy="72" r="13"/>
      <circle cx="94" cy="72" r="13"/>
      <path d="M83,72 H81" stroke-width="2"/>
    </g>
    <polyline data-part="antena-stanga" points="${p.antennaL}" fill="none" stroke="${NAVY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline data-part="antena-dreapta" points="${p.antennaR}" fill="none" stroke="${NAVY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="40" cy="16" r="3" fill="${AQUA}"/>
    <circle cx="142" cy="14" r="3" fill="${AQUA}"/>
    ${p.pencil ? pencil() : ""}
    ${p.bigTen ? bigTen(p.bigTen === "back" ? "back" : "up") : ""}
    ${p.wrench ? wrench() : ""}
    ${p.zzz ? `<text class="mascot-z" x="112" y="48" font-size="16" fill="${AQUA}">z</text>` : ""}
    ${mood === "sarbatoare" ? `<g class="mascot-confetti">
      <circle cx="36" cy="48" r="3" fill="${AQUA}"/>
      <circle cx="200" cy="40" r="3" fill="${LIME}"/>
      <circle cx="24" cy="90" r="2.5" fill="${LIME}"/>
      <circle cx="214" cy="86" r="2.5" fill="${AQUA}"/>
    </g>` : ""}
  </g>`;
}

function headOnly(mood) {
  const p = pose(mood);
  return `<g class="mascot-head-icon">
    <ellipse data-part="cap" cx="32" cy="22" rx="12" ry="10" fill="${NAVY}"/>
    <path d="M24,18 Q32,13 40,18" fill="none" stroke="${AQUA}" stroke-width="1.6" stroke-linecap="round"/>
    ${p.eyes === "happy" || p.eyes === "sleepy"
      ? `<path data-part="ochi" d="M26,22 Q32,18 38,22" fill="none" stroke="${WHITE}" stroke-width="1.4" stroke-linecap="round"/>`
      : `<g data-part="ochi"><circle cx="27" cy="21" r="2" fill="${WHITE}"/><circle cx="37" cy="21" r="2" fill="${WHITE}"/><circle cx="27" cy="21" r="1" fill="${NAVY}"/><circle cx="37" cy="21" r="1" fill="${NAVY}"/></g>`}
    <g data-part="ochelari" fill="none" stroke="${AQUA}" stroke-width="1.6">
      <circle cx="27" cy="21" r="5"/>
      <circle cx="37" cy="21" r="5"/>
    </g>
    <polyline data-part="antena-stanga" points="26,14 20,6 14,3" fill="none" stroke="${NAVY}" stroke-width="1.6" stroke-linecap="round"/>
    <polyline data-part="antena-dreapta" points="38,14 46,6 52,3" fill="none" stroke="${NAVY}" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}

export function mascotSvg({ mood = "salut", size = "lg" } = {}) {
  const safe = MOODS.includes(mood) ? mood : "salut";
  const icon = size === "sm";
  const box = icon ? "0 0 64 40" : "0 0 240 240";
  const body = icon ? headOnly(safe) : fullBody(safe);
  return `<svg xmlns="http://www.w3.org/2000/svg" class="mascot-svg mascot-mood-${safe}" viewBox="${box}" width="100%" height="100%" aria-hidden="true">${body}</svg>`;
}

export function mascotAria(name) {
  return `${name}, furnicuța care te ajută`;
}
