import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const ChapterQuiz = ({ unit, subject, grade, onClose, onRewardClaim, onAskMentor }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [review, setReview] = useState(false);
  const [exclude, setExclude] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const load = async (more = false) => {
    setLoading(true);
    setFinished(false);
    setResult(null);
    setDraft('');
    setShowHint(false);
    setIndex(0);
    setAnswers({});
    const skip = more ? exclude : [];
    const pack = await MentorAPI.generateFlashcards({
      chapter_id: unit.id,
      topic: unit.title,
      subject,
      class_level: grade,
      kind: 'test',
      exclude_ids: skip,
      count: 4
    });
    const next = pack.success ? (pack.data.cards || []) : [];
    setCards(next);
    setCoverage(pack.data?.coverage || null);
    setReview(Boolean(pack.data?.review));
    setExclude(prev => [...new Set([...prev, ...next.map(card => card.id)])]);
    setLoading(false);
  };

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- first draw when the chapter test opens
  }, [unit.id]);

  const submit = async () => {
    const card = cards[index];
    if (!card || checking || result || !draft.trim()) return;
    setChecking(true);
    const checked = await MentorAPI.checkExercise({ card_id: card.id, answer: draft });
    const ok = Boolean(checked.success && checked.data?.ok);
    setResult({
      ok,
      explain: checked.data?.explain || '',
      sample: checked.data?.sample || ''
    });
    setAnswers(prev => ({ ...prev, [card.id]: ok }));
    MentorAPI.markPracticeSeen({
      chapter_id: unit.id,
      subject,
      class_level: grade,
      point: card.point,
      card_id: card.id,
      kind: 'test'
    }).then(res => {
      if (res.success) setCoverage(res.data.coverage || coverage);
    });
    setChecking(false);
  };

  const next = async () => {
    if (index + 1 < cards.length) {
      setIndex(index + 1);
      setDraft('');
      setResult(null);
      setShowHint(false);
      return;
    }
    setFinished(true);
    const score = Object.values(answers).filter(Boolean).length;
    const award = await MentorAPI.recordProgress({
      type: 'chapter_test',
      note: unit.title,
      meta: { subject, grade, chapterId: unit.id, title: unit.title, score }
    });
    if (award.success && onRewardClaim && award.data?.summary) {
      onRewardClaim({
        balance: award.data.summary.balance,
        equipped: award.data.summary.equipped || {},
        role: award.data.summary.role,
        summary: award.data.summary
      });
    }
  };

  const card = cards[index];
  const correctCount = Object.values(answers).filter(Boolean).length;

  return (
    <section className="chapter-quiz surface animate-fadeIn" aria-label={`Test: ${unit.title}`}>
      <div className="chapter-quiz-head">
        <div>
          <div className="eyebrow">Test de capitol · exerciții</div>
          <h3 className="display-font">{unit.title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide testul"><i className="fas fa-xmark" /></button>
      </div>
      <p className="quiz-coverage">Nu e grilă. Rezolvi tu, scrii răspunsul, apoi verifici.</p>
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
      {loading && <p className="quiz-loading">Pregătesc exercițiile…</p>}

      {card && !finished && (
        <>
          <p className="quiz-progress">Exercițiul {index + 1} din {cards.length}</p>
          <p className="quiz-question">{card.prompt}</p>
          {card.hint && !showHint && result == null && (
            <button type="button" className="ghost-button" onClick={() => setShowHint(true)}>Un indiciu</button>
          )}
          {showHint && card.hint && <p className="quiz-hint">{card.hint}</p>}
          {card.long ? (
            <textarea
              className="field form-input quiz-work"
              rows={4}
              value={draft}
              disabled={result != null}
              onChange={event => setDraft(event.target.value)}
              placeholder="Scrie aici rezolvarea…"
              aria-label="Răspunsul tău"
            />
          ) : (
            <input
              className="field form-input quiz-work"
              value={draft}
              disabled={result != null}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder="Scrie rezultatul sau răspunsul scurt…"
              aria-label="Răspunsul tău"
            />
          )}
          {result == null ? (
            <button type="button" className="accent-button" disabled={!draft.trim() || checking} onClick={submit}>
              {checking ? 'Verific…' : 'Verifică'}
            </button>
          ) : (
            <>
              <p className={`quiz-feedback ${result.ok ? 'ok' : 'bad'}`}>
                {result.ok ? 'Da, ține minte calea.' : 'Nu e fix. Uită-te la pași și mai încearcă la următorul.'} {result.explain}
              </p>
              {!result.ok && result.sample && <p className="quiz-sample">Un răspuns bun: {result.sample}</p>}
              <button type="button" className="accent-button" onClick={next}>
                {index + 1 < cards.length ? 'Următorul exercițiu' : 'Vezi scorul'}
              </button>
            </>
          )}
        </>
      )}

      {finished && (
        <div className="quiz-done">
          <p className="display-font">Ai rezolvat corect {correctCount} din {cards.length}.</p>
          <p>{correctCount === cards.length ? 'Curat. Alt test, alt unghi.' : 'Nicio dramă. Mentorul te ajută la pași, apoi mai dai un test.'}</p>
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
