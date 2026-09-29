import { useEffect, useState } from 'react';
import { MASCOT_NAME } from '../../config/mascot.js';
import { useI18n } from '../../i18n/index.jsx';

const MOODS = [
  'salut',
  'bucuros',
  'sarbatoare',
  'gandeste',
  'incurajeaza',
  'explica',
  'somnoros',
  'mandru',
  'trist-bland'
];

const SIZES = {
  sm: 32,
  md: 120,
  lg: 240
};

function mascotLabel(translate, name) {
  const text = typeof translate === 'function' ? translate('mascot.aria', { mascota: name }) : '';
  if (!text || text === 'mascot.aria' || !String(text).includes(name)) {
    return `${name}, furnicuța care te ajută`;
  }
  return text;
}

function Leg({ part, d }) {
  return (
    <path
      data-part={part}
      d={d}
      fill="none"
      stroke="#091C3C"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

const Mascota = ({ mood = 'salut', size = 'md', message = '' }) => {
  const { t } = useI18n();
  const safeMood = MOODS.includes(mood) ? mood : 'salut';
  const box = SIZES[size] || SIZES.md;
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    setOpen(Boolean(message));
    if (!message) return undefined;
    const timer = setTimeout(() => setOpen(false), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const label = mascotLabel(t, MASCOT_NAME);
  const simplified = size === 'sm';

  return (
    <div className={`mascota-wrap mascota-${size} is-${safeMood}`}>
      <svg
        className="mascota"
        data-mood={safeMood}
        data-size={size}
        viewBox={simplified ? '70 8 100 100' : '0 0 240 260'}
        width={box}
        height={box}
        role="img"
        aria-label={label}
      >
        {!simplified && (
          <g className="mascota-body">
            <Leg part="picior-1" d="M104 112 C78 96 62 70 48 52" />
            <Leg part="picior-2" d="M98 122 C70 128 48 146 34 168" />
            <Leg part="picior-3" d="M102 132 C74 156 58 182 52 208" />
            <Leg part="picior-4" d="M136 112 C162 96 178 70 192 52" />
            <Leg part="picior-5" d="M142 122 C170 128 192 146 206 168" />
            <Leg part="picior-6" d="M138 132 C166 156 182 182 188 208" />
            <ellipse data-part="abdomen" cx="120" cy="176" rx="54" ry="62" fill="#091C3C" />
            <ellipse cx="104" cy="150" rx="18" ry="26" fill="#44D6D7" opacity="0.55" />
            <text x="120" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="800" fontFamily="Nunito, sans-serif">10</text>
            <ellipse data-part="torace" cx="120" cy="116" rx="24" ry="30" fill="#091C3C" />
            <ellipse cx="112" cy="104" rx="8" ry="12" fill="#44D6D7" opacity="0.7" />
            <g data-part="creion" transform="translate(150 128) rotate(28)">
              <rect x="0" y="0" width="46" height="8" rx="3" fill="#93FC09" />
              <polygon points="46,0 54,4 46,8" fill="#4B5563" />
              <rect x="-6" y="0" width="8" height="8" rx="1" fill="#FF8FA3" />
            </g>
            <g data-part="zece" className="mascota-zece">
              <text x="120" y="36" textAnchor="middle" fill="#93FC09" fontSize="48" fontWeight="800" fontFamily="Nunito, sans-serif">10</text>
            </g>
            <g className="mascota-confetti" aria-hidden="true">
              <circle cx="46" cy="40" r="4" fill="#44D6D7" />
              <circle cx="196" cy="48" r="3" fill="#93FC09" />
              <circle cx="70" cy="24" r="3" fill="#93FC09" />
              <circle cx="180" cy="28" r="4" fill="#44D6D7" />
            </g>
            <g className="mascota-cheie" aria-hidden="true">
              <path d="M78 214 h22 v6 h-8 v8 h-6 v-8 h-8 z" fill="#44D6D7" />
              <circle cx="74" cy="210" r="7" fill="none" stroke="#44D6D7" strokeWidth="3" />
            </g>
            <text className="mascota-z" x="168" y="48" fill="#44D6D7" fontSize="18" fontWeight="800">z</text>
          </g>
        )}
        <g data-part="cap">
          <circle cx="120" cy="70" r="30" fill="#091C3C" />
          <ellipse cx="110" cy="58" rx="12" ry="8" fill="#44D6D7" opacity="0.8" />
          <circle cx="110" cy="72" r="7" fill="#FFFFFF" />
          <circle cx="130" cy="72" r="7" fill="#FFFFFF" />
          <circle className="mascota-pupil-stanga" cx="111" cy="73" r="3.2" fill="#091C3C" />
          <circle className="mascota-pupil-dreapta" cx="131" cy="73" r="3.2" fill="#091C3C" />
          <circle cx="112.4" cy="71.6" r="1.1" fill="#FFFFFF" />
          <circle cx="132.4" cy="71.6" r="1.1" fill="#FFFFFF" />
          <path className="mascota-ochi-inchis" d="M103 72 Q110 66 117 72" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path className="mascota-ochi-inchis dreapta" d="M123 72 Q130 66 137 72" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path data-part="zambet" d="M110 84 Q120 92 130 84" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <path data-part="antena-stanga" d="M108 44 L92 24 L74 16" fill="none" stroke="#091C3C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path data-part="antena-dreapta" d="M132 44 L148 24 L166 16" fill="none" stroke="#091C3C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="74" cy="16" r="4" fill="#44D6D7" />
        <circle cx="166" cy="16" r="4" fill="#44D6D7" />
        <g data-part="ochelari">
          <circle cx="110" cy="72" r="14" fill="none" stroke="#44D6D7" strokeWidth="4" />
          <circle cx="130" cy="72" r="14" fill="none" stroke="#44D6D7" strokeWidth="4" />
          <path d="M124 72 H116" stroke="#44D6D7" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
      {open && message ? (
        <button type="button" className="mascota-bubble" aria-live="polite" onClick={() => setOpen(false)}>
          {message}
        </button>
      ) : null}
    </div>
  );
};

export { MOODS, mascotLabel };
export default Mascota;
