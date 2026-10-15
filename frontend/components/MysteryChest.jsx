import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Mascota from './mascot/Mascota.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

const MysteryChest = ({ reward, onClose }) => {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(reduced);

  useEffect(() => {
    if (reduced) return undefined;
    const timer = setTimeout(() => setOpen(true), 420);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (!reward) return null;

  const dialog = (
    <div className="chest-pop" role="dialog" aria-modal="true" aria-labelledby="chest-title">
      <div className="chest-card">
        <Mascota mood="bucuros" size="md" />
        <div className={`chest-box ${open ? 'is-open' : ''}`} aria-hidden="true">
          <span className="chest-lid">📦</span>
        </div>
        <h2 id="chest-title" className="display-font chest-title">Cufărul lecției</h2>
        {open && <p className="chest-label">{reward.label}</p>}
        <button type="button" className="accent-button" onClick={onClose}>Gata</button>
      </div>
    </div>
  );
  if (typeof document === 'undefined') return dialog;
  return createPortal(dialog, document.body);
};

export default MysteryChest;
