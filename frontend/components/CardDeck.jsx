import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import MathText from './MathText.jsx';
import GeoFigure from './GeoFigure.jsx';
import { effortLine } from '../i18n/quizFeedback.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { readDeckPack, takeTicket, ticketIsCurrent } from '../testOpen.js';

const MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

function sayDay(iso) {
  const [year, month, day] = String(iso || '').split('-').map(Number);
  if (!year || !month || !day) return '';
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export default function CardDeck({ unit, lesson, mode = 'chapter', subject, grade, onClose }) {
  const reduced = usePrefersReducedMotion();
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ stiam: 0, aproape: 0, nu: 0 });
  const [nextDue, setNextDue] = useState('');
  const [empty, setEmpty] = useState('');
  const [error, setError] = useState('');
  const ticketRef = useRef(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ticket = takeTicket(ticketRef);
    setLoading(true);
    setError('');
    MentorAPI.getCardDeck({
      subject,
      class_level: grade,
      chapter_id: unit.id,
      lesson_id: lesson?.id || '',
      mode
    }).then(result => {
      if (!ticketIsCurrent(ticketRef, ticket)) return;
      const outcome = readDeckPack(result);
      if (!outcome.ok) {
        setCards([]);
        setEmpty('');
        setError(outcome.error);
        setLoading(false);
        return;
      }
      setCards(outcome.cards);
      setNextDue(outcome.nextDue || '');
      setEmpty(outcome.empty || '');
      setLoading(false);
    });
    return () => {
      ticketRef.current += 1;
    };
  }, [unit.id, lesson?.id, mode, subject, grade, attempt]);

  const card = cards[index];
  const done = !loading && cards.length > 0 && index >= cards.length;

  useEffect(() => {
    if (!card || flipped || done) return undefined;
    const onKey = event => {
      if (event.key !== ' ' && event.key !== 'Enter') return;
      if (event.target && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName)) return;
      event.preventDefault();
      setFlipped(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [card, flipped, done]);

  const gradeSelf = async result => {
    if (!card || card.replayed) {
      setFlipped(false);
      setIndex(index + 1);
      return;
    }
    const response = await MentorAPI.rateCard({ card_id: card.id, result, mode });
    if (response.success && response.data?.due && (!nextDue || response.data.due < nextDue)) {
      setNextDue(response.data.due);
    }
    setStats(prev => ({ ...prev, [result]: prev[result] + 1 }));
    if (result === 'nu') {
      const again = cards.slice(index + 1).some(item => item.id === card.id && item.replayed);
      if (!again) {
        setCards(prev => [...prev, { ...card, replayed: true }]);
      }
    }
    setFlipped(false);
    setIndex(index + 1);
  };

  const title = lesson?.title || unit.title;
  const effort = effortLine(stats.stiam >= stats.nu ? 'exact' : 'wrong', cards[0]?.id || title, stats.stiam >= stats.nu);

  return (
    <section className="study-deck surface" aria-label={`Flashcard-uri: ${title}`}>
      <div className="chapter-quiz-head">
        <div>
          <div className="eyebrow">{lesson ? `Flashcard-uri · ${lesson.title}` : 'Flashcard-uri din capitol'}</div>
          <h3 className="display-font">{title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide flashcard-urile"><i className="fas fa-xmark" /></button>
      </div>
      {loading && <p className="quiz-loading">Pregătesc cardurile…</p>}
      {error && !loading && (
        <>
          <p className="guide-error" role="alert">{error}</p>
          <button type="button" className="accent-button" onClick={() => setAttempt(value => value + 1)}>Încearcă din nou</button>
        </>
      )}
      {empty && !loading && !error && <p className="quiz-coverage">{empty}</p>}
      {card && !done && (
        <>
          <p className="quiz-progress">{index + 1} din {cards.length}</p>
          <div className={`study-card ${reduced ? 'is-still' : ''} ${flipped ? 'is-flipped' : ''}`}>
            <div className="study-card-face">
              <p className="study-card-text"><MathText text={card.front} /></p>
              {card.figure ? <GeoFigure kind={card.figure} flat /> : null}
              {!flipped && (
                <button type="button" className="accent-button study-rate" onClick={() => setFlipped(true)}>
                  Întoarce cardul
                </button>
              )}
            </div>
            {flipped && (
              <div className="study-card-back" aria-live="polite">
                <p className="study-card-text"><MathText text={card.back} /></p>
                {card.why ? <p className="quiz-explain"><MathText text={card.why} /></p> : null}
                <div className="study-rates choice-equal">
                  <button type="button" className="ghost-button study-rate" onClick={() => gradeSelf('nu')}>Nu știam încă</button>
                  <button type="button" className="ghost-button study-rate" onClick={() => gradeSelf('aproape')}>Aproape</button>
                  <button type="button" className="ghost-button study-rate" onClick={() => gradeSelf('stiam')}>Știam</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {done && (
        <div className="quiz-done">
          <p className="display-font">Ai știut {stats.stiam} din {stats.stiam + stats.aproape + stats.nu}.</p>
          <p>{effort}</p>
          <p className="quiz-explain">Revin mâine: {stats.nu + stats.aproape}.{nextDue ? ` Următoarea repetare: ${sayDay(nextDue)}.` : ''}</p>
          <button type="button" className="ghost-button study-rate" onClick={onClose}>Gata</button>
        </div>
      )}
    </section>
  );
}
