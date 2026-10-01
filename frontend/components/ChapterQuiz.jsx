import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { formatScore, verdictClass, verdictLabel } from '../verdictCopy.js';
import QuoteCard from './QuoteCard.jsx';
import GradeGoalPicker from './GradeGoalPicker.jsx';
import MathText from './MathText.jsx';
import { effortLine } from '../i18n/quizFeedback.js';

const LETTERS = ['A', 'B', 'C', 'D'];

const ChapterQuiz = ({ unit, subject, grade, track = '', mode = '', lesson = null, onOpenLesson, onClose, onRewardClaim, onAskMentor }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [review, setReview] = useState(false);
  const [exclude, setExclude] = useState([]);
  const [report, setReport] = useState(null);
  const [targetNote, setTargetNote] = useState(lesson ? 0 : null);
  const [hintFor, setHintFor] = useState('');
  const startedAt = useRef(Date.now());
  const onLesson = Boolean(lesson?.id);

  const load = async (more = false, note = targetNote) => {
    setLoading(true);
    setReport(null);
    setDrafts({});
    setHintFor('');
    setIndex(0);
    startedAt.current = Date.now();
    const skip = more ? exclude : [];
    const pack = await MentorAPI.generateFlashcards({
      chapter_id: unit.id,
      topic: lesson?.title || unit.title,
      subject,
      class_level: grade,
      kind: 'test',
      exclude_ids: skip,
      count: onLesson ? 5 : 10,
      track,
      mode,
      target_note: onLesson ? undefined : note,
      lesson_id: lesson?.id || ''
    });
    const next = pack.success ? (pack.data.cards || []) : [];
    setCards(next);
    setCoverage(pack.data?.coverage || null);
    setReview(Boolean(pack.data?.review));
    setExclude(prev => [...new Set([...prev, ...next.map(card => card.id)])]);
    setLoading(false);
  };

  useEffect(() => {
    if (onLesson) {
      setTargetNote(0);
      load(false, null);
      return;
    }
    setTargetNote(null);
    setCards([]);
    setReport(null);
    // load depinde de exclude; pus în dependențe, testul pe lecție s-ar reîncărca mereu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.id, lesson?.id]);

  const card = cards[index];
  const draft = card ? (drafts[card.id] || '') : '';
  const last = cards.length > 0 && index === cards.length - 1;

  const goPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const goNext = () => {
    if (index + 1 < cards.length) setIndex(index + 1);
  };

  const finish = async () => {
    if (finishing || !cards.length) return;
    setFinishing(true);
    const answers = cards.map(item => ({ card_id: item.id, answer: drafts[item.id] || '' }));
    const result = await MentorAPI.finishPractice({
      kind: 'test',
      chapter_id: unit.id,
      subject,
      class_level: grade,
      title: lesson?.title || unit.title,
      lesson_id: lesson?.id || '',
      answers,
      duration_ms: Date.now() - startedAt.current
    });
    if (result.success) {
      setReport(result.data);
      if (onRewardClaim && result.data?.summary) {
        onRewardClaim({
          balance: result.data.summary.balance,
          equipped: result.data.summary.equipped || {},
          role: result.data.summary.role,
          summary: result.data.summary
        });
      }
    }
    setFinishing(false);
  };

  return (
    <section className="chapter-quiz surface animate-fadeIn" aria-label={`Test: ${unit.title}`}>
      <div className="chapter-quiz-head">
        <div>
          <div className="eyebrow">{onLesson ? `Test pe lecție · ${lesson.title}` : (track === 'en' ? 'Antrenament EN' : 'Test de capitol')} · {onLesson ? 'până la 5 exerciții' : '10 exerciții, fără repetare'}</div>
          <h3 className="display-font">{onLesson ? lesson.title : unit.title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide testul"><i className="fas fa-xmark" /></button>
      </div>
      {!onLesson && !targetNote && (
        <GradeGoalPicker
          kind="test"
          onPick={note => {
            setTargetNote(note);
            load(false, note);
          }}
          onCancel={onClose}
        />
      )}
      {!onLesson && targetNote && (
      <p className="quiz-coverage">
        Vrei nota {targetNote}. Itemii se opresc la treapta potrivită. Scrie doar răspunsul final. Pașii îi vezi după finalizare.
      </p>
      )}
      {coverage && onLesson && coverage.lessons && (
        <p className="quiz-coverage">Lecții atinse: {coverage.lessons.seen} din {coverage.lessons.total}.</p>
      )}
      {coverage && !onLesson && (
        <p className="quiz-coverage">
          Idei din capitol: {coverage.seen}/{coverage.total}
          {coverage.complete ? ' · Ai trecut prin banca de capitol. Următoarele teste sunt variante noi, generate, fără repetare.' : ' · Mai generează până prinzi tot, apoi vin variante infinite.'}
          {coverage.lessons ? ` Lecții atinse: ${coverage.lessons.seen} din ${coverage.lessons.total}.` : ''}
        </p>
      )}
      {review && <p className="quiz-review-note">Tur de recapitulare — ideile astea le-ai mai întâlnit.</p>}

      {onLesson && cards.length === 0 && !loading && (
        <p className="quiz-coverage">Lecția asta nu are încă exerciții proprii.</p>
      )}
      {!onLesson && targetNote && cards.length === 0 && !loading && (
        <button type="button" className="accent-button" onClick={() => load(false)}>
          Generează testul <i className="fas fa-bolt" />
        </button>
      )}
      {loading && <p className="quiz-loading">Pregătesc exercițiile…</p>}

      {card && !report && (
        <>
          <p className="quiz-progress">Exercițiul {index + 1} din {cards.length}{card.level ? ` · treapta ${card.level}` : ''}</p>
          <p className="quiz-question"><MathText text={card.prompt} /></p>
          {Array.isArray(card.choices) && card.choices.length === 4 ? (
            <div className="quiz-options">
              {card.choices.map((choice, choiceIndex) => (
                <button
                  key={`${card.id}-${choiceIndex}`}
                  type="button"
                  className={`quiz-option ${draft === choice ? 'is-correct' : ''}`}
                  onClick={() => setDrafts(prev => ({ ...prev, [card.id]: choice }))}
                >
                  <em>{LETTERS[choiceIndex]}</em>
                  <span><MathText text={choice} /></span>
                </button>
              ))}
            </div>
          ) : card.long ? (
            <textarea
              className="field form-input quiz-work quiz-write"
              value={draft}
              onChange={event => setDrafts(prev => ({ ...prev, [card.id]: event.target.value }))}
              placeholder="Scrie ca la clasă. Baremul e de profesor: cerință, idei, fir, nu o listă de cuvinte."
              aria-label="Redactare"
              rows={5}
            />
          ) : (
            <input
              className="field form-input quiz-work"
              value={draft}
              onChange={event => setDrafts(prev => ({ ...prev, [card.id]: event.target.value }))}
              placeholder="Doar răspunsul final…"
              aria-label="Răspunsul final"
            />
          )}
          {card.hint ? (
            hintFor === card.id
              ? <p className="quiz-explain">Indiciu: <MathText text={card.hint} /></p>
              : <button type="button" className="ghost-button" onClick={() => setHintFor(card.id)}>Vreau un indiciu</button>
          ) : null}
          <div className="quiz-nav">
            <button type="button" className="ghost-button" disabled={index === 0} onClick={goPrev}>
              Exercițiul precedent
            </button>
            {last ? (
              <button type="button" className="accent-button" disabled={finishing} onClick={finish}>
                {finishing ? 'Verific…' : 'Finalizare test'}
              </button>
            ) : (
              <button type="button" className="accent-button" onClick={goNext}>
                Următorul exercițiu
              </button>
            )}
          </div>
        </>
      )}

      {report && (
        <div className="quiz-done">
          <p className="display-font">Nota {report.grade} · {formatScore(report.credit ?? report.correct)} din {report.total}</p>
          <QuoteCard grade={report.grade} seed={report.grade} />
          {report.durationMs ? <p className="quiz-explain">Timp: {Math.max(1, Math.round(report.durationMs / 60000))} min.{report.parentNotified ? ' Părintele primește nota, durata și răspunsurile.' : ''}</p> : null}
          <p>{report.message}</p>
          {report.strengths?.length > 0 && <p className="quiz-explain">Puncte forte: {report.strengths.join(', ')}</p>}
          {(report.lessonsToReview || []).map(row => (
            <p key={row.id} className="quiz-sample">
              Recitește lecția: {row.title}.{' '}
              {onOpenLesson ? (
                <button type="button" className="ghost-button" onClick={() => onOpenLesson(row.id)}>Deschide lecția</button>
              ) : null}
            </p>
          ))}
          {!report.lessonsToReview?.length && report.weaknesses?.length > 0 && <p className="quiz-sample">De lucrat: {report.weaknesses.join(', ')}</p>}
          {report.homework?.length > 0 && (
            <div className="quiz-homework">
              <strong>Temă scurtă pe punctele slabe</strong>
              <ul>
                {report.homework.map(row => <li key={row.point}>{row.task}</li>)}
              </ul>
            </div>
          )}
          <ol className="quiz-review-list">
            {(report.items || []).map((item, itemIndex) => (
              <li key={item.id || itemIndex} className={verdictClass(item)}>
                <strong>Exercițiul {itemIndex + 1} · {verdictLabel(item)}</strong>
                <p>{effortLine(item.verdict, item.id, item.ok)}</p>
                <p><MathText text={item.prompt} /></p>
                <p>Tu: <MathText text={item.given || '—'} /></p>
                <p>În barem: <MathText text={item.sample} /></p>
                {item.explain && <p className="quiz-explain"><MathText text={item.explain} /></p>}
                {item.rubric && (
                  <div className="writing-barem">
                    <strong>Am citit foaia · {item.rubric.total}/{item.rubric.max} · nota {item.rubric.note10}</strong>
                    {(item.rubric.reading || []).length > 0 && (
                      <ol className="writing-reading">
                        {item.rubric.reading.map((row, readIndex) => (
                          <li key={`${item.id}-read-${readIndex}`}>
                            {row.quote ? <q>{row.quote}</q> : null}
                            <span>{row.comment}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    <ul>
                      {item.rubric.criteria.map(row => (
                        <li key={row.id}><span>{row.label}</span> <em>{row.points}/{row.max}</em> — {row.note}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.steps?.length > 0 && (
                  <ol className="quiz-steps">
                    {item.steps.map((step, stepIndex) => (
                      <li key={`${item.id}-step-${stepIndex}`}><MathText text={step} /></li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
          <div className="learning-actions">
            <button type="button" className="ghost-button" onClick={() => onAskMentor?.(unit)}>Întreabă tutorele</button>
            {!onLesson && (
              <button type="button" className="ghost-button" onClick={() => { setTargetNote(null); setReport(null); setCards([]); }}>Altă notă</button>
            )}
            <button type="button" className="accent-button" onClick={() => load(true)}>Alt test</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChapterQuiz;
