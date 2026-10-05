import { useEffect, useRef, useState } from 'react';
import Mascota from './Mascota.jsx';
import { mascotStageOpen, subscribeMascot, subscribeMascotStage } from '../../mascot/mascotEvents.js';

export default function MascotLayer() {
  const [reaction, setReaction] = useState(null);
  const [stageOn, setStageOn] = useState(() => mascotStageOpen());
  const continueRef = useRef(null);

  useEffect(() => subscribeMascot(setReaction), []);
  useEffect(() => {
    setStageOn(mascotStageOpen());
    return subscribeMascotStage(() => setStageOn(mascotStageOpen()));
  }, []);

  useEffect(() => {
    if (!reaction || reaction.big) return undefined;
    const timer = setTimeout(() => setReaction(null), 5600);
    return () => clearTimeout(timer);
  }, [reaction]);

  useEffect(() => {
    if (reaction?.big) continueRef.current?.focus({ preventScroll: true });
  }, [reaction]);

  if (!reaction) return null;
  if (reaction.big) {
    return (
      <div className="mascot-celebrate" role="dialog" aria-modal="true" aria-label="Felicitare">
        <div className="mascot-confetti" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
        </div>
        <p className="mascot-celebrate-kicker">Felicitări!</p>
        <Mascota mood={reaction.mood} size="lg" pulse="succes" message={reaction.message} />
        <button ref={continueRef} type="button" className="accent-button" onClick={() => setReaction(null)}>Continuă</button>
      </div>
    );
  }
  if (stageOn) return null;
  return (
    <div className="mascot-corner">
      <Mascota mood={reaction.mood} size="md" message={reaction.message} />
    </div>
  );
}
