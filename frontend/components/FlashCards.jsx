import { useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { formatScore, verdictClass, verdictLabel } from '../verdictCopy.js';
import QuoteCard from './QuoteCard.jsx';

const letters = ['A', 'B', 'C', 'D'];

const FlashCards = ({ chapters = [], onRewardClaim, subject, classLevel, onAskMentor, track = '', mode = '' }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [choices, setChoices] = useState({});
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [exclude, setExclude] = useState([]);
  const [report, setReport] = useState(null);

  const generate = async (unit, more = false) => {
    if (!unit || loading || !subject) return;
    setLoading(true);
    setPicked(null);
    setIndex(0);
    setReport(null);
    if (!more) {
      setChoices({});
      setExclude([]);
    }
    setSource(unit);
    const skip = more ? exclude : [];
    const result = await MentorAPI.generateFlashcards({
      chapter_id: unit.id,
      topic: unit.title,
      subject,
      class_level: classLevel,
      kind: 'flashcards',
      exclude_ids: skip,
      count: 8,
      track,
      mode
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
    setPicked(optionIndex);
    setChoices(prev => ({ ...prev, [card.id]: optionIndex }));
    MentorAPI.markPracticeSeen({
      chapter_id: source?.id,
      subject,
      class_level: classLevel,
      point: card.point,
      card_id: card.id
    }).then(res => {
      if (res.success) setCoverage(res.data.coverage || coverage);
    });
  };

  const goPrev = () => {
    if (index === 0) return;
    const nextIndex = index - 1;
    setIndex(nextIndex);
    const prevCard = cards[nextIndex];
    setPicked(prevCard ? choices[prevCard.id] ?? null : null);
  };

  const goNext = () => {
    if (index >= cards.length - 1) return;
    const nextIndex = index + 1;
    setIndex(nextIndex);
    const nextCard = cards[nextIndex];
    setPicked(nextCard ? choices[nextCard.id] ?? null : null);
  };

  const finish = async () => {
    if (!source || finishing) return;
    setFinishing(true);
    const picks = cards.map(card => ({
      card_id: card.id,
      chosen: Number.isInteger(choices[card.id]) ? card.options[choices[card.id]] : ''
    }));
    const result = await MentorAPI.finishPractice({
      kind: 'flashcards',
      chapter_id: source.id,
      subject,
      class_level: classLevel,
      title: source.title,
      picks
    });
    if (result.success) {
      setReport(result.data);
      const hits = picks.filter((pick, pickIndex) => pick.chosen && pick.chosen === cards[pickIndex].options[cards[pickIndex].correct]).length;
      if (hits >= 5) {
        MentorAPI.recordProgress({
          type: 'flashcard_known',
          note: source.title,
          meta: { topic: source.title, chapterId: source.id, subject, grade: classLevel, correct: hits }
        }).then(award => {
          if (award.success && award.data?.awarded && typeof onRewardClaim === 'function') {
            onRewardClaim({
              balance: award.data.summary?.balance,
              equipped: award.data.summary?.equipped || {},
              role: award.data.summary?.role,
              summary: award.data.summary
            });
          }
        });
      }
    }
    setFinishing(false);
  };

  const card = cards[index];
  const last = cards.length > 0 && index === cards.length - 1;
  const reviewed = Object.keys(choices).length;
  const hits = cards.filter(item => Number.isInteger(choices[item.id]) && choices[item.id] === item.correct).length;

  return (
    <section className="flashcards-card surface">
      <div className="focus-timer-head">
        <div>
          <div className="eyebrow">Flashcarduri de teorie</div>
          <h3 className="display-font">4 variante. De la ușor la greu.</h3>
        </div>
        {reviewed > 0 && !report && <span className="learn-chip"><i className="fas fa-check" /> {hits}/{reviewed}</span>}
      </div>
      <p className="flashcards-empty">{subject ? 'Alege capitolul. Cardurile urcă de la ușor la greu și nu se repetă. Revino în 3 zile, apoi în 7, la ideile greșite.' : 'Alege mai întâi materia (română sau matematică), apoi un capitol. Nu cad implicit pe mate.'}</p>

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
        <p className="quiz-coverage">Idei atinse: {coverage.seen}/{coverage.total}{coverage.complete ? ' · capitol acoperit; urmează variante noi, fără repetare' : ''}</p>
      )}

      {loading && <div className="flashcard-skeleton skeleton" aria-hidden="true" />}

      {!loading && card && !report && (
        <>
          <div className="flashcards-progress-track"><div style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
          <p className="quiz-progress">Cardul {index + 1} din {cards.length}{card.level ? ` · treapta ${card.level}` : ''}</p>
          <p className="quiz-question">{card.question}</p>
          <div className="quiz-options">
            {card.options.map((option, optionIndex) => {
              const locked = Number.isInteger(choices[card.id]);
              const state = !locked ? '' : optionIndex === card.correct ? 'is-correct' : optionIndex === choices[card.id] ? 'is-wrong' : '';
              return (
                <button
                  key={`${card.id}-${optionIndex}`}
                  type="button"
                  className={`quiz-option ${state}`}
                  disabled={locked}
                  onClick={() => choose(optionIndex)}
                >
                  <em>{letters[optionIndex]}</em>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          {Number.isInteger(choices[card.id]) && (
            <p className={`quiz-feedback ${choices[card.id] === card.correct ? 'ok' : 'bad'}`}>
              {choices[card.id] === card.correct ? 'Corect.' : 'Ai greșit.'} {card.explain}
            </p>
          )}
          {Number.isInteger(choices[card.id]) && (
            <ol className="quiz-steps">
              <li>Citești enunțul cu voce tare.</li>
              <li>Tai variantele care nu se potrivesc.</li>
              <li>{card.explain || 'Rămâne varianta care ține de idee, nu de o vorbă frumoasă.'}</li>
            </ol>
          )}
          <div className="quiz-nav">
            <button type="button" className="ghost-button" disabled={index === 0} onClick={goPrev}>
              Exercițiul precedent
            </button>
            {last ? (
              <button type="button" className="accent-button" disabled={finishing} onClick={finish}>
                {finishing ? 'Verific…' : 'Finalizare set'}
              </button>
            ) : (
              <button type="button" className="accent-button" onClick={goNext}>
                Următorul exercițiu
              </button>
            )}
          </div>
          <div className="flashcards-meta">Cardul {index + 1} din {cards.length} · {source?.title}</div>
        </>
      )}

      {report && (
        <div className="quiz-done">
          <p className="display-font">Nota {report.grade} · {formatScore(report.credit ?? report.correct)} din {report.total}</p>
          <QuoteCard grade={report.grade} seed={report.grade} />
          <p>{report.message}</p>
          {report.strengths?.length > 0 && <p className="quiz-explain">Puncte forte: {report.strengths.join(', ')}</p>}
          {report.weaknesses?.length > 0 && <p className="quiz-sample">De lucrat: {report.weaknesses.join(', ')}</p>}
          {report.homework?.length > 0 && (
            <ul className="quiz-homework">{report.homework.map(row => <li key={row.point}>{row.task}</li>)}</ul>
          )}
          <ol className="quiz-review-list">
            {(report.items || []).map((item, itemIndex) => (
              <li key={item.id || itemIndex} className={verdictClass(item)}>
                <strong>{verdictLabel(item)}</strong>
                <p>{item.prompt}</p>
                <p>Tu: {item.given || '—'}</p>
                <p>În barem: {item.sample}</p>
                {item.explain && <p className="quiz-explain">{item.explain}</p>}
              </li>
            ))}
          </ol>
          <div className="learning-actions">
            {typeof onAskMentor === 'function' && source && (
              <button type="button" className="ghost-button" onClick={() => onAskMentor(source)}>
                Întreabă mentorul
              </button>
            )}
            <button type="button" className="accent-button" onClick={() => generate(source, true)}>Alt set</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashCards;
