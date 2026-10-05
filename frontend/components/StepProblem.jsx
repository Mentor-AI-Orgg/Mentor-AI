import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import MathText from './MathText.jsx';
import GeoFigure from './GeoFigure.jsx';
import { effortLine } from '../i18n/quizFeedback.js';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function StepProblem({ problems = [], lesson, onClose }) {
  const list = problems.filter(Boolean);
  const [pick, setPick] = useState(lesson ? 0 : -1);
  const problem = list[pick] || null;
  const [mode, setMode] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState('');
  const [marks, setMarks] = useState({});
  const [revealed, setRevealed] = useState(null);
  const [score, setScore] = useState(null);
  const [ticks, setTicks] = useState({});
  const [minutes, setMinutes] = useState(0);
  const [left, setLeft] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!minutes || mode !== 'examen' || revealed) return undefined;
    setLeft(minutes * 60);
    setEnded(false);
    const timer = setInterval(() => {
      setLeft(value => {
        if (value <= 1) {
          setEnded(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, mode, problem?.id, revealed]);

  const steps = problem?.steps || [];
  const step = steps[stepIndex];

  const openReveal = async () => {
    const response = await MentorAPI.revealProblem({ problem_id: problem.id });
    if (response.success) setRevealed(response.data);
  };

  const finishSteps = async () => {
    await openReveal();
    const response = await MentorAPI.selfScoreProblem({ problem_id: problem.id, mode: 'pasi', ticked: [] });
    if (response.success) setScore(response.data);
  };

  const check = async () => {
    if (!step) return;
    const answer = step.choices ? draft : draft.trim();
    const response = await MentorAPI.checkProblemStep({
      problem_id: problem.id,
      step_id: step.id,
      answer
    });
    if (!response.success) {
      setNote(response.error || 'Nu am putut verifica pasul.');
      return;
    }
    const data = response.data;
    if (data.ok) {
      setMarks(prev => ({ ...prev, [step.id]: prev[step.id] === 'hint' ? 'half' : 'full' }));
      setNote(data.barem || 'Pas bun.');
      setDraft('');
      if (stepIndex + 1 >= steps.length) finishSteps();
      else setStepIndex(stepIndex + 1);
      return;
    }
    if (data.hint && !data.solution) {
      setMarks(prev => ({ ...prev, [step.id]: 'hint' }));
      setNote(`Indiciu: ${data.hint}`);
      return;
    }
    setMarks(prev => ({ ...prev, [step.id]: 'shown' }));
    setNote(`${data.solution || ''} Răspuns: ${data.answer || ''}. ${data.barem || ''}`.trim());
  };

  const saveExam = async () => {
    const ticked = (revealed?.steps || []).filter(row => ticks[row.id]).map(row => row.id);
    const response = await MentorAPI.selfScoreProblem({
      problem_id: problem.id,
      mode: 'examen',
      ticked
    });
    if (response.success) setScore(response.data);
  };

  const title = lesson?.title || problem?.lessonTitle || 'Subiectul III';
  const effort = effortLine(score && score.points >= score.max / 2 ? 'exact' : 'wrong', problem?.id || title, score && score.points > 0);

  return (
    <section className="study-deck surface" aria-label={`Problemă pas cu pas: ${title}`}>
      <div className="chapter-quiz-head">
        <div>
          <div className="eyebrow">{lesson ? `Problemă · ${lesson.title}` : 'Probleme de Subiectul III'}</div>
          <h3 className="display-font">{title}</h3>
        </div>
        <button type="button" className="ghost-button" onClick={onClose} aria-label="Închide problema"><i className="fas fa-xmark" /></button>
      </div>
      {!problem && (
        <div className="study-rates">
          {list.map((row, index) => (
            <button key={row.id} type="button" className="ghost-button study-rate" onClick={() => { setPick(index); setMode(''); }}>
              {row.lessonTitle ? `${row.lessonTitle}: ` : ''}{row.statement}
            </button>
          ))}
        </div>
      )}
      {problem && !mode && (
        <div className="study-rates">
          <p><MathText text={problem.statement} /></p>
          <div className="choice-pair">
            <button type="button" className="ghost-button study-rate" onClick={() => setMode('pasi')}>Pas cu pas</button>
            <button type="button" className="ghost-button study-rate" onClick={() => setMode('examen')}>Mod examen</button>
          </div>
        </div>
      )}
      {problem && mode && (
        <>
          <p className="study-card-text"><MathText text={problem.statement} /></p>
          {problem.figure ? <GeoFigure kind={problem.figure} flat /> : null}
          <ol>
            {(problem.parts || []).map(part => (
              <li key={part.id}><MathText text={`${part.id}) ${part.prompt}`} /> · {part.points} p</li>
            ))}
          </ol>
          {mode === 'examen' && !revealed && (
            <div className="study-rates">
              <p>Cronometru (oprit implicit). Când expiră, doar te anunță.</p>
              <div className="study-rates">
                {[0, 10, 15].map(value => (
                  <button key={value} type="button" className="ghost-button study-rate" onClick={() => setMinutes(value)}>
                    {value ? `${value} minute` : 'Fără cronometru'}{minutes === value ? ' · ales' : ''}
                  </button>
                ))}
              </div>
              {minutes > 0 && <p>{ended ? 'Timpul s-a terminat. Poți continua.' : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</p>}
              <button type="button" className="accent-button study-rate" onClick={openReveal}>Am terminat pe foaie</button>
            </div>
          )}
          {mode === 'pasi' && !revealed && step && (
            <div className="study-rates">
              <p>Pas {stepIndex + 1} din {steps.length}</p>
              <p><MathText text={step.ask} /></p>
              {step.choices ? step.choices.map((choice, index) => (
                <button
                  key={choice}
                  type="button"
                  className={`ghost-button study-rate ${draft === choice ? 'is-selected' : ''}`}
                  onClick={() => setDraft(choice)}
                >
                  {LETTERS[index]}. <MathText text={choice} />
                </button>
              )) : (
                <input className="field form-input" value={draft} onChange={event => setDraft(event.target.value)} aria-label="Răspunsul pasului" />
              )}
              {note ? <p className="quiz-explain">{note}</p> : null}
              {marks[step.id] === 'shown' ? (
                <button type="button" className="accent-button study-rate" onClick={() => {
                  setDraft('');
                  setNote('');
                  if (stepIndex + 1 >= steps.length) finishSteps();
                  else setStepIndex(stepIndex + 1);
                }}>Mergem mai departe</button>
              ) : (
                <button type="button" className="accent-button study-rate" onClick={check}>Verifică</button>
              )}
            </div>
          )}
          {revealed && (
            <div className="study-rates">
              <p className="display-font">Rezolvarea-model (așa o scrii pe foaie)</p>
              {String(revealed.model || '').split(/\n\n+/).map(para => (
                <p key={para}><MathText text={para} /></p>
              ))}
              {mode === 'examen' && (
                <>
                  <p>Orice metodă corectă primește punctele pasului, ca la examen. Bifează doar ce ai scris tu.</p>
                  {(revealed.steps || []).map(row => (
                    <label key={row.id} className="en-self-row">
                      <input type="checkbox" checked={Boolean(ticks[row.id])} onChange={() => setTicks(prev => ({ ...prev, [row.id]: !prev[row.id] }))} />
                      <span>{row.barem} · {row.points} p</span>
                    </label>
                  ))}
                  <button type="button" className="accent-button study-rate" onClick={saveExam}>Salvează</button>
                </>
              )}
              {mode === 'pasi' && (
                <ul>
                  {(revealed.steps || []).map(row => (
                    <li key={row.id}>{row.barem} · {row.points} p · {marks[row.id] === 'full' ? 'din prima' : marks[row.id] === 'half' ? 'cu indiciu' : 'cu soluția'}</li>
                  ))}
                </ul>
              )}
              {score && (
                <>
                  <p className="display-font">{score.points} din {score.max} puncte</p>
                  <p>{effort}</p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
