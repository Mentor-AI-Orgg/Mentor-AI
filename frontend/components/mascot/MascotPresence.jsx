import { useCallback, useEffect, useRef, useState } from 'react';
import Mascota from './Mascota.jsx';
import { holdMascotStage, subscribeMascot } from '../../mascot/mascotEvents.js';

const HAPPY = new Set(['bucuros', 'sarbatoare', 'mandru']);
const MISS = new Set(['incurajeaza', 'trist-bland']);

export default function MascotPresence({ message = '', celebrate = '', compact = false }) {
  const [line, setLine] = useState(message);
  const [pulse, setPulse] = useState('');
  const timer = useRef(null);

  const kick = useCallback(next => {
    if (next !== 'succes' && next !== 'gresit') return;
    setPulse(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPulse(''), 650);
  }, []);

  useEffect(() => holdMascotStage(), []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    setLine(message);
  }, [message]);

  useEffect(() => {
    kick(celebrate);
  }, [celebrate, kick]);

  useEffect(() => subscribeMascot(reaction => {
    if (!reaction || reaction.big) return;
    if (reaction.message) setLine(reaction.message);
    if (HAPPY.has(reaction.mood)) kick('succes');
    else if (MISS.has(reaction.mood)) kick('gresit');
  }), [kick]);

  return (
    <div className={`mascot-stage${compact ? ' is-compact' : ''}`}>
      <Mascota mood="explica" size="bust" art="semnatura" message={line} pulse={pulse} />
    </div>
  );
}
