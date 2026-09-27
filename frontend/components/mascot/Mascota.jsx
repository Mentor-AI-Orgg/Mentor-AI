import { useEffect, useState } from 'react';
import { mascotAria, mascotSvg } from '../../../shared/mascotArt.js';
import { MASCOT_NAME } from '../../config/mascot.js';
import { useI18n } from '../../i18n/index.jsx';

const PX = { sm: 32, md: 120, lg: 240 };

export default function Mascota({ mood = 'salut', size = 'md', message = '' }) {
  const { t } = useI18n();
  const translated = t('mascot.aria', { mascota: MASCOT_NAME });
  const label = translated && translated !== 'mascot.aria' ? translated : mascotAria(MASCOT_NAME);
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    if (!message) {
      setOpen(false);
      return undefined;
    }
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), 6000);
    return () => clearTimeout(timer);
  }, [message, mood]);

  return (
    <div className={`mascot mascot-${size}`}>
      <div
        className="mascot-art"
        role="img"
        aria-label={label}
        style={{ width: PX[size] || PX.md, height: size === 'sm' ? 32 : PX[size] || PX.md }}
        dangerouslySetInnerHTML={{ __html: mascotSvg({ mood, size }) }}
      />
      {open && message ? (
        <button type="button" className="mascot-bubble" aria-live="polite" onClick={() => setOpen(false)}>
          {message}
        </button>
      ) : null}
    </div>
  );
}
