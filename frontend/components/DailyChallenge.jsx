import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import Mascota from './mascot/Mascota.jsx';

const SUBJECTS = { matematica: 'Matematică', romana: 'Română' };

const DailyChallenge = ({ onReward }) => {
  const [card, setCard] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    MentorAPI.dailyChallenge().then(pack => {
      if (!cancelled && pack.success) setCard(pack.data);
    });
    return () => { cancelled = true; };
  }, []);

  if (!card) return null;

  const choose = async index => {
    if (busy || card.answered) return;
    setBusy(true);
    const pack = await MentorAPI.answerDaily(index);
    setBusy(false);
    if (!pack.success) return;
    setCard(pack.data);
    if (pack.data?.summary) onReward?.(pack.data.summary);
  };

  return (
    <section className="daily-card" aria-labelledby="daily-challenge-title">
      <div className="daily-card-head">
        <Mascota mood={card.answered && card.correct ? 'bucuros' : 'gandeste'} size="sm" />
        <div>
          <div className="eyebrow">Provocarea zilei</div>
          <h2 id="daily-challenge-title" className="display-font">{SUBJECTS[card.subject] || 'Întrebarea de azi'}</h2>
          <p className="daily-streak">{card.streak || 0} {card.streak === 1 ? 'zi la rând' : 'zile la rând'}</p>
        </div>
      </div>
      <p className="daily-question">{card.question}</p>
      <div className="daily-options">
        {(card.options || []).map((option, index) => {
          const chosen = card.answered && index === card.answer;
          return (
            <button
              key={`${card.id}-${index}`}
              type="button"
              className={`ghost-button daily-option${chosen ? ' is-answer' : ''}`}
              disabled={busy || card.answered}
              onClick={() => choose(index)}
            >
              {option}
            </button>
          );
        })}
      </div>
      {card.answered && (
        <p className="daily-feedback" role="status">
          {card.correct ? 'Corect.' : 'Nu e asta.'} {card.explain}
        </p>
      )}
    </section>
  );
};

export default DailyChallenge;
