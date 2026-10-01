import { useEffect, useState } from 'react';
import Mascota from './Mascota.jsx';
import { mascotStageOpen, subscribeMascot, subscribeMascotStage } from '../../mascot/mascotEvents.js';

export default function MascotLayer() {
  const [reaction, setReaction] = useState(null);
  const [stageOn, setStageOn] = useState(() => mascotStageOpen());

  useEffect(() => subscribeMascot(setReaction), []);
  useEffect(() => {
    setStageOn(mascotStageOpen());
    return subscribeMascotStage(() => setStageOn(mascotStageOpen()));
  }, []);

  if (!reaction) return null;
  if (reaction.big) {
    return (
      <div className="mascot-celebrate" role="dialog" aria-label="Felicitare">
        <Mascota mood={reaction.mood} size="lg" art="semnatura" pulse="succes" message={reaction.message} />
        <button type="button" className="accent-button" onClick={() => setReaction(null)}>Continuă</button>
      </div>
    );
  }
  if (stageOn) return null;
  return (
    <div className="mascot-corner">
      <Mascota mood={reaction.mood} size="sm" message={reaction.message} />
    </div>
  );
}
