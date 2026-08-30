import { useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const letters = ['A', 'B', 'C', 'D'];

const FlashCards = ({ userData, chapters = [], onRewardClaim, subject, classLevel, onAskMentor }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [known, setKnown] = useState({});
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [exclude, setExclude] = useState([]);

  const generate = async (unit, more = false) => {
    if (!unit || loading) return;
    setLoading(true);
    setPicked(null);
    setIndex(0);
    if (!more) {
      setKnown({});
      setExclude([]);
    }
    setSource(unit);
    const skip = more ? exclude : [];
    const result = await MentorAPI.generateFlashcards({
      chapter_id: unit.id,
      topic: unit.title,
      subject: subject || userData?.subject || 'matematica',
      class_level: classLevel || userData?.class || 5,
      kind: 'flashcards',
      exclude_ids: skip,
      count: 6
    });
    const next = result.success && result.data?.cards?.length ? result.data.cards : [];
    setCards(next);
    setCoverage(result.data?.coverage || null);
    setExclude(prev => [...new Set([...prev, ...next.map(card => card.id)])]);
    setLoading(false);
  };

  const choose = optionIndex => {
    if (picked != null || !cards[index]) return;
    const card = cards[index];
    const ok = optionIndex === card.correct;
    setPicked(optionIndex);
    setKnown(prev => ({ ...prev, [card.id]: ok }));
    MentorAPI.markPracticeSeen({
      chapter_id: source?.id,
      subject,
      class_level: classLevel,
      point: card.point,
      card_id: card.id
    }).then(res => {
      if (res.success) setCoverage(res.data.coverage || coverage);
    });
    if (ok) {
      MentorAPI.recordProgress({
        type: 'flashcard_known',
        note: source?.title || 'flashcards',
        meta: { topic: source?.title || 'flashcards', chapterId: source?.id, subject, grade: classLevel }
      }).then(result => {
        if (result.success && result.data?.awarded && typeof onRewardClaim === 'function') {
          onRewardClaim({
            balance: result.data.summary?.balance,
            equipped: result.data.summary?.equipped || {},
            role: result.data.summary?.role,
            summary: result.data.summary
          });
        }
      });
    }
  };

  const goNext = () => {
    if (index < cards.length - 1) {
      setIndex(i => i + 1);
      setPicked(null);
    }
  };

  const card = cards[index];
  const hits = Object.values(known).filter(Boolean).length;
  const reviewed = Object.keys(known).length;

  return (
    <section className="flashcards-card surface">
      <div className="focus-timer-head">
        <div>
          <div className="eyebrow">Flashcarduri de teorie</div>
          <h3 className="display-font">4 variante. Alegi. Vezi imediat.</h3>
        </div>
        {reviewed > 0 && <span className="learn-chip"><i className="fas fa-check" /> {hits}/{reviewed}</span>}
      </div>
      <p className="flashcards-empty">Alege capitolul. Poți cere alt set până prinzi toate ideile.</p>

      {chapters.length > 0 && (
        <div className="flashcards-presets">
          {chapters.map(unit => (
            <button
              key={unit.id}
              type="button"
              className={`focus-preset-btn ${source?.id === unit.id ? 'selected' : ''}`}
              onClick={() => generate(unit, false)}
              disabled={loading}
            >
              {unit.title}
            </button>
          ))}
        </div>
      )}

      {coverage && (
        <p className="quiz-coverage">Idei atinse: {coverage.seen}/{coverage.total}{coverage.complete ? ' · capitol acoperit, poți recapitula' : ''}</p>
      )}

      {loading && <div className="flashcard-skeleton skeleton" aria-hidden="true" />}

      {!loading && card && (
        <>
          <div className="flashcards-progress-track"><div style={{ width: `${((index + (picked != null ? 1 : 0)) / cards.length) * 100}%` }} /></div>
          <p className="quiz-question">{card.question}</p>
          <div className="quiz-options">
            {card.options.map((option, optionIndex) => {
              const state = picked == null ? '' : optionIndex === card.correct ? 'is-correct' : optionIndex === picked ? 'is-wrong' : '';
              return (
                <button
                  key={`${card.id}-${optionIndex}`}
                  type="button"
                  className={`quiz-option ${state}`}
                  disabled={picked != null}
                  onClick={() => choose(optionIndex)}
                >
                  <em>{letters[optionIndex]}</em>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          {picked != null && (
            <p className={`quiz-feedback ${picked === card.correct ? 'ok' : 'bad'}`}>
              {picked === card.correct ? 'Corect.' : 'Ai greșit.'} {card.explain}
            </p>
          )}
          <div className="flashcards-nav">
            <button type="button" className="ghost-button" disabled={index === 0} onClick={() => { setIndex(i => i - 1); setPicked(null); }}>
              <i className="fas fa-arrow-left" />
            </button>
            <button type="button" className="accent-button" disabled={picked == null} onClick={index < cards.length - 1 ? goNext : () => generate(source, true)}>
              {index < cards.length - 1 ? 'Următorul' : 'Alt set'}
            </button>
            <button type="button" className="ghost-button" disabled={index === cards.length - 1} onClick={goNext}>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
          <div className="flashcards-meta">Cardul {index + 1} din {cards.length} · {source?.title}</div>
          {typeof onAskMentor === 'function' && source && (
            <button type="button" className="ghost-button" onClick={() => onAskMentor(source)}>
              Întreabă mentorul <i className="fas fa-comments" />
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default FlashCards;
