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
  bust: 176,
  lg: 240
};

const ART = {
  salut: '/mascot/salut.png',
  incurajeaza: '/mascot/salut.png',
  mandru: '/mascot/mandru.png',
  gandeste: '/mascot/gandeste.png',
  explica: '/mascot/explica.png',
  bucuros: '/mascot/bucuros.png',
  sarbatoare: '/mascot/bucuros.png',
  somnoros: '/mascot/salut.png',
  'trist-bland': '/mascot/explica.png'
};

const POSE = {
  salut: 'salut',
  incurajeaza: 'salut',
  somnoros: 'salut',
  mandru: 'mandru',
  gandeste: 'gandeste',
  explica: 'explica',
  'trist-bland': 'explica',
  bucuros: 'bucuros',
  sarbatoare: 'bucuros'
};

function mascotLabel(translate, name) {
  const text = typeof translate === 'function' ? translate('mascot.aria', { mascota: name }) : '';
  if (!text || text === 'mascot.aria' || !String(text).includes(name)) {
    return `${name}, furnicuța care te ajută`;
  }
  return text;
}

const Mascota = ({ mood = 'salut', size = 'md', message = '', art = '', pulse = '' }) => {
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
  const src = size === 'sm'
    ? '/mascot/cap.png'
    : (art === 'semnatura' ? '/mascot/explica.png' : ART[safeMood]);
  const pose = size === 'sm' ? 'cap' : (art === 'semnatura' ? 'explica' : (POSE[safeMood] || 'salut'));
  const pulseClass = pulse === 'succes' ? ' is-succes' : pulse === 'gresit' ? ' is-gresit' : '';

  return (
    <div className={`mascota-wrap mascota-${size} is-${safeMood}`}>
      <div className={`mascota-pop${pulseClass}`}>
        <div className="mascota-figure" data-pose={pose}>
          <img
            className="mascota"
            data-mood={safeMood}
            data-size={size}
            src={src}
            width={box}
            height={box}
            alt={label}
            aria-label={label}
          />
          <span className="mascota-shine" aria-hidden="true" />
          <span className="mascota-blink" aria-hidden="true">
            <i />
            <i />
          </span>
        </div>
      </div>
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
