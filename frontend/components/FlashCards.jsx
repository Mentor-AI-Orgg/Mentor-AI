import { useRef, useState } from 'react';
import { emitMascot } from '../mascot/mascotEvents.js';
import { MentorAPI } from '../apiClient.js';
import { formatScore, verdictClass, verdictLabel } from '../verdictCopy.js';
import QuoteCard from './QuoteCard.jsx';
import GradeGoalPicker from './GradeGoalPicker.jsx';
import MathText from './MathText.jsx';
import { effortLine } from '../i18n/quizFeedback.js';
import MascotPresence from './mascot/MascotPresence.jsx';

const letters = ['A', 'B', 'C', 'D'];

const FlashCards = ({ chapters = [], onRewardClaim, subject, classLevel, onAskMentor, track = '', mode = '', lesson = null }) => {
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
  const [pendingUnit, setPendingUnit] = useState(null);
  const [targetNote, setTargetNote] = useState(null);

  const generate = async (unit, more = false, note = targetNote) => {
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
      mode,
      target_note: note,
      lesson_id: lesson?.id || ''
    });
    const next = result.success && result.data?.cards?.length ? result.data.cards : [];
    setCards(next);
    setCoverage(result.data?.coverage || null);
    setExclude(prev => [...new Set([...prev, ...next.map(card => card.id)])]);
    setLoading(false);
  };

  const wrongStreak = useRef(0);
  const rightStreak = useRef(0);

  const choose = optionIndex => {
    if (picked != null || !cards[index]) return;
    const card = cards[index];
    setPicked(optionIndex);
    setChoices(prev => ({ ...prev, [card.id]: optionIndex }));
    const correct = optionIndex === card.correct;
    if (correct && wrongStreak.current > 0) {
      emitMascot('corect_dupa_greseala');
      wrongStreak.current = 0;
      rightStreak.current = 1;
    } else if (correct) {
      wrongStreak.current = 0;
      rightStreak.current += 1;
      emitMascot(rightStreak.current >= 3 ? 'serie_corecte' : 'raspuns_corect', { n: rightStreak.current });
    } else {
      rightStreak.current = 0;
      wrongStreak.current += 1;
      emitMascot('raspuns_gresit', { attempt: wrongStreak.current, hint: card.explain || '' });
    }
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
      emitMascot('lectie_terminata', { capitol: source.title || '' });
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
        {(card || report) ? (
          <MascotPresence
            compact
            celebrate={report ? (Number(report.grade) >= 5 ? 'succes' : 'gresit') : ''}
            message={report ? (Number(report.grade) >= 5 ? 'Gata setul. Bravo că l-ai dus până la capăt.' : 'Hai să vedem ce mai repetăm.') : ''}
          />
        ) : null}
        <div>
          <div className="eyebrow">Grile rapide</div>
          <h3 className="display-font">4 variante. Pe nota pe care o vrei.</h3>
        </div>
        {reviewed > 0 && !report && <span className="learn-chip"><i className="fas fa-check" /> {hits}/{reviewed}</span>}
      </div>
      <p className="flashcards-empty">{subject ? 'Alege capitolul, apoi nota pe care ți-ai dori-o. Grilele se potrivesc și nu se repetă.' : 'Alege mai întâi materia (română sau matematică), apoi un capitol. Nu cad implicit pe mate.'}</p>

      {chapters.length > 0 && (
        <div className="flashcards-presets">
          {chapters.map(unit => (
            <button
              key={unit.id}
              type="button"
              className={`focus-preset-btn ${source?.id === unit.id || pendingUnit?.id === unit.id ? 'selected' : ''}`}
              onClick={() => { setPendingUnit(unit); setReport(null); setCards([]); }}
              disabled={loading}
            >
              {unit.title}
            </button>
          ))}
        </div>
      )}

      {pendingUnit && !cards.length && !loading && !report && (
        <GradeGoalPicker
          kind="flashcards"
          onPick={note => {
            setTargetNote(note);
            generate(pendingUnit, false, note);
          }}
          onCancel={() => setPendingUnit(null)}
        />
      )}
      {targetNote && cards.length > 0 && (
        <p className="quiz-coverage">Vrei nota {targetNote}. Cardurile stau pe treptele care duc acolo.</p>
      )}
      {coverage && (
        <p className="quiz-coverage">Idei atinse: {coverage.seen}/{coverage.total}{coverage.complete ? ' · capitol acoperit; urmează variante noi, fără repetare' : ''}</p>
      )}

      {loading && <div className="flashcard-skeleton skeleton" aria-hidden="true" />}

      {!loading && card && !report && (
        <>
          <div className="flashcards-progress-track"><div style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div>
          <p className="quiz-progress">Cardul {index + 1} din {cards.length}{card.level ? ` · treapta ${card.level}` : ''}</p>
          <p className="quiz-question"><MathText text={card.question} /></p>
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
                  <span>
                    <MathText text={option} />
                    {state === 'is-correct' && <span className="quiz-state-label"><i className="fas fa-check" aria-hidden="true" /> Corect</span>}
                    {state === 'is-wrong' && <span className="quiz-state-label"><i className="fas fa-xmark" aria-hidden="true" /> Greșit</span>}
                  </span>
                </button>
              );
            })}
          </div>
          {Number.isInteger(choices[card.id]) && (
            <p className={`quiz-feedback ${choices[card.id] === card.correct ? 'ok' : 'bad'}`}>
              {choices[card.id] === card.correct
                ? <><i className="fas fa-check" aria-hidden="true" /> {effortLine('exact', card.id, true)}</>
                : <><i className="fas fa-xmark" aria-hidden="true" /> {effortLine('wrong', card.id, false)}</>}
              {' '}
              <MathText text={card.explain} />
            </p>
          )}
          {Number.isInteger(choices[card.id]) && (
            <ol className="quiz-steps">
              <li>Citești enunțul cu voce tare.</li>
              <li>Tai variantele care nu se potrivesc.</li>
              <li><MathText text={card.explain || 'Rămâne varianta care ține de idee, nu de o vorbă frumoasă.'} /></li>
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
                <p><MathText text={item.prompt} /></p>
                <p>Tu: <MathText text={item.given || '—'} /></p>
                <p>În barem: <MathText text={item.sample} /></p>
                {item.explain && <p className="quiz-explain"><MathText text={item.explain} /></p>}
              </li>
            ))}
          </ol>
          <div className="learning-actions">
            {typeof onAskMentor === 'function' && source && (
              <button type="button" className="ghost-button" onClick={() => onAskMentor(source)}>
                Întreabă tutorele
              </button>
            )}
            <button type="button" className="ghost-button" onClick={() => { setCards([]); setReport(null); setPendingUnit(source); }}>Altă notă</button>
            <button type="button" className="accent-button" onClick={() => generate(source, true)}>Alt set</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashCards;
