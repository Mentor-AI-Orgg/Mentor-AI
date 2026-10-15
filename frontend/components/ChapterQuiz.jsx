import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { formatScore } from '../verdictCopy.js';
import QuoteCard from './QuoteCard.jsx';
import GradeGoalPicker from './GradeGoalPicker.jsx';
import MathText from './MathText.jsx';
import MascotPresence from './mascot/MascotPresence.jsx';
import { emitMascot } from '../mascot/mascotEvents.js';
import { MASCOT_NAME } from '../config/mascot.js';
import { readQuizPack, takeTicket, ticketIsCurrent } from '../testOpen.js';
import TestReview from './TestReview.jsx';
import MysteryChest from './MysteryChest.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

const ChapterQuiz = ({ unit, subject, grade, track = '', mode = '', lesson = null, onOpenLesson, onOpenNotebook, onClose, onRewardClaim, onAskMentor, onAskProblem, onFinished }) => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(() => Boolean(lesson?.id));
  const [finishing, setFinishing] = useState(false);
  const [coverage, setCoverage] = useState(null);
  const [review, setReview] = useState(false);
  const [exclude, setExclude] = useState([]);
  const [report, setReport] = useState(null);
  const [targetNote, setTargetNote] = useState(lesson ? 0 : null);
  const [hintFor, setHintFor] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');
  const [chest, setChest] = useState(null);
  const startedAt = useRef(Date.now());
  const ticketRef = useRef(0);
  const onLesson = Boolean(lesson?.id);

  const load = async (more = false, note = targetNote) => {
    const ticket = takeTicket(ticketRef);
    setLoading(true);
    setError('');
    setReport(null);
    setChest(null);
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
    if (!ticketIsCurrent(ticketRef, ticket)) return;
    const outcome = readQuizPack(pack, { lesson: onLesson });
    if (!outcome.ok) {
      setCards([]);
      setSessionId('');
      setError(outcome.error);
      setLoading(false);
      return;
    }
    setSessionId(outcome.sessionId);
    setCards(outcome.cards);
    setCoverage(outcome.coverage);
    setReview(outcome.review);
    setExclude(prev => [...new Set([...prev, ...outcome.cards.map(card => card.id)])]);
    setLoading(false);
  };

  useEffect(() => {
    if (onLesson) {
      setTargetNote(0);
      load(false, null);
    } else {
      setTargetNote(null);
      setCards([]);
      setReport(null);
      setError('');
      setLoading(false);
    }
    return () => {
      ticketRef.current += 1;
    };
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
      session_id: sessionId,
      answers,
      duration_ms: Date.now() - startedAt.current
    });
    if (result.success) {
      setReport(result.data);
      if (result.data?.chest) setChest(result.data.chest);
      emitMascot(onLesson ? 'lectie_terminata' : 'test_terminat', { capitol: lesson?.title || unit.title || '' });
      onFinished?.();
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
      {chest && <MysteryChest reward={chest} onClose={() => setChest(null)} />}
      <div className="chapter-quiz-head">
        <MascotPresence
          compact
          mood={loading || finishing ? 'thinking' : (report ? (Number(report.grade) >= 5 ? 'celebrating' : 'encouraging') : 'explaining')}
          celebrate={report ? (Number(report.grade) >= 5 ? 'succes' : 'gresit') : ''}
          message={report ? (Number(report.grade) >= 5 ? 'Ai dus testul până la capăt.' : 'Hai să vedem ce mai repetăm.') : ''}
        />
        <div>
          <div className="eyebrow">{onLesson ? `Test pe lecție · ${lesson.title}` : (track === 'en' ? 'Antrenament EN' : 'Test de capitol')} · {onLesson ? 'până la 5 exerciții' : '10 exerciții, fără repetare'}</div>
          <h3 className="display-font">{onLesson ? lesson.title : unit.title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide testul"><i className="fas fa-xmark" /></button>
      </div>
      {!onLesson && !report && cards.length === 0 && (
        <GradeGoalPicker
          kind="test"
          busy={loading}
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

      {error && !loading && (
        <p className="guide-error" role="alert">{error}</p>
      )}
      {onLesson && error && !loading && (
        <button type="button" className="accent-button" onClick={() => load(false, null)}>
          Încearcă din nou
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
          <TestReview
            items={(report.items || []).map(item => {
              const card = cards.find(row => row.id === item.id);
              const lessonHit = (report.lessonsToReview || []).find(row => row.id === item.lesson);
              return {
                ...item,
                correct: item.sample,
                choices: card?.choices,
                lessonId: item.lesson || '',
                lessonTitle: lessonHit?.title || lesson?.title || ''
              };
            })}
            onOpenLesson={onOpenLesson}
            onOpenNotebook={onOpenNotebook}
            onAsk={item => onAskProblem?.({
              source: 'quiz',
              id: item.id,
              sessionId,
              prompt: item.prompt,
              lessonId: item.lessonId,
              lessonTitle: item.lessonTitle,
              subject,
              grade
            })}
          />
          <div className="learning-actions">
            <button type="button" className="ghost-button" onClick={() => onAskMentor?.(unit)}>Întreab-o pe {MASCOT_NAME}</button>
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
