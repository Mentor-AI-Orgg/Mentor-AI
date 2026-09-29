import { useEffect, useState } from 'react';
import Mascota from './Mascota.jsx';
import { subscribeMascot } from '../../mascot/mascotEvents.js';

export default function MascotLayer() {
  const [reaction, setReaction] = useState(null);

  useEffect(() => subscribeMascot(setReaction), []);

  if (!reaction) return null;
  if (reaction.big) {
    return (
      <div className="mascot-celebrate" role="dialog" aria-label="Felicitare">
        <Mascota mood={reaction.mood} size="lg" message={reaction.message} />
        <button type="button" className="accent-button" onClick={() => setReaction(null)}>Continuă</button>
      </div>
    );
  }
  return (
    <div className="mascot-corner">
      <Mascota mood={reaction.mood} size="sm" message={reaction.message} />
    </div>
  );
}
