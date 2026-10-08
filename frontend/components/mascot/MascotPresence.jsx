import { useCallback, useEffect, useRef, useState } from 'react';
import Mascota, { resolveMood } from './Mascota.jsx';
import { holdMascotStage, subscribeMascot } from '../../mascot/mascotEvents.js';

const HAPPY = new Set(['bucuros', 'sarbatoare', 'mandru']);
const MISS = new Set(['incurajeaza', 'trist-bland']);
const REST = new Set(['explica', 'salut', 'somnoros']);
const IDLE_MS = 45000;

function moodFrom(mood, celebrate) {
  const named = resolveMood(mood);
  if (celebrate === 'succes' && (!named || named === 'explica' || named === 'salut')) return 'sarbatoare';
  if (celebrate === 'gresit' && (!named || named === 'explica' || named === 'salut')) return 'incurajeaza';
  return named || 'explica';
}

export default function MascotPresence({ message = '', celebrate = '', compact = false, mood = '' }) {
  const [line, setLine] = useState(message);
  const [pulse, setPulse] = useState(celebrate === 'succes' || celebrate === 'gresit' ? celebrate : '');
  const [liveMood, setLiveMood] = useState(() => moodFrom(mood, celebrate));
  const [idle, setIdle] = useState(false);
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
    setLiveMood(moodFrom(mood, celebrate));
    kick(celebrate);
  }, [mood, celebrate, kick]);

  useEffect(() => {
    setIdle(false);
    const idleTimer = setTimeout(() => setIdle(true), IDLE_MS);
    return () => clearTimeout(idleTimer);
  }, [line, pulse, liveMood]);

  useEffect(() => subscribeMascot(reaction => {
    if (!reaction || reaction.big) return;
    if (reaction.message) setLine(reaction.message);
    if (reaction.mood) setLiveMood(resolveMood(reaction.mood) || 'explica');
    if (HAPPY.has(reaction.mood)) kick('succes');
    else if (MISS.has(reaction.mood)) kick('gresit');
  }), [kick]);

  const shown = idle && REST.has(liveMood) && !pulse ? 'somnoros' : liveMood;
  const signature = shown === 'explica';

  return (
    <div className={`mascot-stage${compact ? ' is-compact' : ''}`}>
      <Mascota mood={shown} size="bust" art={signature ? 'semnatura' : ''} message={line} pulse={pulse} />
    </div>
  );
}
