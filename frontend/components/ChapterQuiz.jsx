import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const letters = ['A', 'B', 'C', 'D'];

const ChapterQuiz = ({ unit, subject, grade, onClose, onRewardClaim, onAskMentor }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [review, setReview] = useState(false);
  const [exclude, setExclude] = useState([]);
  const [finished, setFinished] = useState(false);

  const load = async (more = false) => {
    setLoading(true);
    setFinished(false);
    setPicked(null);
    setIndex(0);
    setAnswers({});
    const skip = more ? exclude : [];
    const result = await MentorAPI.generateFlashcards({
      chapter_id: unit.id,
      topic: unit.title,
      subject,
      class_level: grade,
      kind: 'test',
      exclude_ids: skip,
      count: 5
    });
    const next = result.success ? (result.data.cards || []) : [];
    setCards(next);
    setCoverage(result.data?.coverage || null);
    setReview(Boolean(result.data?.review));
    setExclude(prev => [...new Set([...prev, ...next.map(card => card.id)])]);
    setLoading(false);
  };

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- first draw when the chapter test opens
  }, [unit.id]);

  const choose = async optionIndex => {
    if (picked != null || !cards[index]) return;
    setPicked(optionIndex);
    const card = cards[index];
    const ok = optionIndex === card.correct;
    setAnswers(prev => ({ ...prev, [card.id]: ok }));
    MentorAPI.markPracticeSeen({
      chapter_id: unit.id,
      subject,
      class_level: grade,
      point: card.point,
      card_id: card.id
    }).then(res => {
      if (res.success) setCoverage(res.data.coverage || coverage);
    });
    if (ok) {
      MentorAPI.recordProgress({
        type: 'flashcard_known',
        note: unit.title,
        meta: { topic: unit.title, chapterId: unit.id, subject, grade }
      }).then(result => {
        if (result.success && result.data?.awarded && onRewardClaim) {
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

  const next = async () => {
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setPicked(null);
      return;
    }
    setFinished(true);
    const score = Object.values(answers).filter(Boolean).length;
    const result = await MentorAPI.recordProgress({
      type: 'chapter_test',
      note: unit.title,
      meta: { subject, grade, chapterId: unit.id, title: unit.title, score }
    });
    if (result.success && onRewardClaim && result.data?.summary) {
      onRewardClaim({
        balance: result.data.summary.balance,
        equipped: result.data.summary.equipped || {},
        role: result.data.summary.role,
        summary: result.data.summary
      });
    }
  };

  const card = cards[index];
  const correctCount = Object.values(answers).filter(Boolean).length;

  return (
    <section className="chapter-quiz surface animate-fadeIn" aria-label={`Test: ${unit.title}`}>
      <div className="chapter-quiz-head">
        <div>
          <div className="eyebrow">Test de capitol</div>
          <h3 className="display-font">{unit.title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide testul"><i className="fas fa-xmark" /></button>
      </div>
      {coverage && (
        <p className="quiz-coverage">
          Idei din capitol: {coverage.seen}/{coverage.total}
          {coverage.complete ? ' · Ai trecut prin toată materia. Poți tot genera, ca recapitulare.' : ' · Mai generează până prinzi tot.'}
        </p>
      )}
      {review && <p className="quiz-review-note">Tur de recapitulare — ideile astea le-ai mai întâlnit.</p>}

      {cards.length === 0 && !loading && (
        <button type="button" className="accent-button" onClick={() => load(false)}>
          Generează testul <i className="fas fa-bolt" />
        </button>
      )}
      {loading && <p className="quiz-loading">Pregătesc întrebările…</p>}

      {card && !finished && (
        <>
          <p className="quiz-progress">Întrebarea {index + 1} din {cards.length}</p>
          <p className="quiz-question">{card.question}</p>
          <div className="quiz-options" role="group" aria-label="Variante">
            {card.options.map((option, optionIndex) => {
              const state = picked == null
                ? ''
                : optionIndex === card.correct
                  ? 'is-correct'
                  : optionIndex === picked
                    ? 'is-wrong'
                    : '';
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
              {picked === card.correct ? 'Da. Ține minte ideea.' : 'Nu chiar.'} {card.explain}
            </p>
          )}
          <button type="button" className="accent-button" disabled={picked == null} onClick={next}>
            {index + 1 < cards.length ? 'Următoarea' : 'Vezi scorul'}
          </button>
        </>
      )}

      {finished && (
        <div className="quiz-done">
          <p className="display-font">Ai nimerit {correctCount} din {cards.length}.</p>
          <p>{correctCount === cards.length ? 'Curat. Mai generează dacă vrei alt unghi.' : 'Nicio dramă. Întreabă mentorul sau mai dă un test.'}</p>
          <div className="learning-actions">
            <button type="button" className="ghost-button" onClick={() => onAskMentor?.(unit)}>Întreabă mentorul</button>
            <button type="button" className="accent-button" onClick={() => load(true)}>Alt test</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChapterQuiz;
