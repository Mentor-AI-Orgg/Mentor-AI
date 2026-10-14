import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { curriculumParams, firstLessonExtras } from '../firstLesson.js';

const DailyChallengeScreen = ({ userData, onNavigate, onProgress }) => {
  const [pack, setPack] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState('load');
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    MentorAPI.getDailyChallenge().then(result => {
      if (!alive) return;
      if (!result.success || !result.data) {
        setError(result.error || 'Nu am putut deschide provocarea.');
        setStep('error');
        return;
      }
      setPack(result.data);
      setStep(result.data.done ? 'result' : (result.data.ready ? 'start' : 'empty'));
    });
    return () => {
      alive = false;
    };
  }, []);

  const openFirstLesson = async () => {
    if (busy) return;
    setBusy(true);
    const guide = await MentorAPI.getCurriculum(curriculumParams(userData));
    setBusy(false);
    onNavigate('learn', firstLessonExtras(userData, guide.success ? guide.data : null));
  };

  const questions = pack?.questions || [];
  const current = questions[index];
  const picked = current ? picks[current.id] : undefined;

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError('');
    const answers = questions.map(item => ({ id: item.id, choice: picks[item.id] }));
    const result = await MentorAPI.finishDailyChallenge(answers);
    setBusy(false);
    if (!result.success || !result.data) {
      setError(result.error || 'Nu am putut trimite răspunsurile.');
      return;
    }
    setPack(result.data);
    setStep(result.data.done ? 'result' : 'empty');
    if (onProgress) onProgress();
  };

  const next = () => {
    if (picked === undefined) return;
    if (index + 1 >= questions.length) {
      submit();
      return;
    }
    setIndex(index + 1);
  };

  return (
    <main className="home-page daily-page">
      <button type="button" className="ghost-button" onClick={() => onNavigate('home')}>Înapoi acasă</button>
      {step === 'load' && <p className="daily-lead">Se deschide provocarea…</p>}
      {step === 'error' && <p className="guide-error" role="alert">{error}</p>}
      {step === 'empty' && (
        <section className="streak-hero">
          <p className="eyebrow">Provocarea zilei</p>
          <h1 className="display-font daily-title">Întâi o lecție.</h1>
          <p className="daily-lead">{pack?.message}</p>
          <button type="button" className="accent-button" disabled={busy} onClick={openFirstLesson}>
            {busy ? 'Se deschide…' : 'Deschide prima lecție'}
          </button>
        </section>
      )}
      {step === 'start' && (
        <section className="streak-hero">
          <p className="eyebrow">Provocarea zilei</p>
          <h1 className="display-font daily-title">
            {questions.length === 1 ? '1 întrebare din ce știi deja' : `${questions.length} întrebări din ce știi deja`}
          </h1>
          <p className="daily-lead">
            Le-am ales din lecțiile pe care le-ai terminat. O dată pe zi, iar XP-ul e dublu.
          </p>
          {questions.length < 5 && (
            <p className="daily-lead">Ai {questions.length} {questions.length === 1 ? 'întrebare' : 'întrebări'} de reluat. Atât e gata acum.</p>
          )}
          <button type="button" className="accent-button" onClick={() => setStep('ask')}>Începe</button>
        </section>
      )}
      {step === 'ask' && current && (
        <section className="streak-hero" aria-labelledby="challenge-progress">
          <p id="challenge-progress" className="eyebrow">Întrebarea {index + 1} din {questions.length}</p>
          <h1 className="display-font daily-title">{current.question}</h1>
          <div className="challenge-options">
            {current.options.map((option, optionIndex) => (
              <button
                key={`${current.id}-${optionIndex}`}
                type="button"
                className={`ghost-button challenge-choice${picked === optionIndex ? ' is-on' : ''}`}
                onClick={() => setPicks(prev => ({ ...prev, [current.id]: optionIndex }))}
              >
                {option}
              </button>
            ))}
          </div>
          {error && <p className="guide-error" role="alert">{error}</p>}
          <button type="button" className="accent-button" disabled={picked === undefined || busy} onClick={next}>
            {busy ? 'Se trimite…' : (index + 1 >= questions.length ? 'Vezi rezultatul' : 'Continuă')}
          </button>
        </section>
      )}
      {step === 'result' && pack && (
        <section className="streak-hero" aria-live="polite">
          <p className="eyebrow">Provocarea zilei</p>
          <h1 className="display-font daily-title">Ai nimerit {pack.correct} din {pack.total}.</h1>
          <p className="daily-lead">XP dublu: {pack.xp}.</p>
          <h2 className="daily-rank-title">Clasamentul de azi</h2>
          <ol className="rank-list">
            {(pack.ranking || []).map(row => (
              <li key={`${row.place}-${row.nickname}`} className="rank-row">
                <span>{row.place}. {row.nickname}</span>
                <span>{row.correct}/{row.total} · {row.xp} XP</span>
              </li>
            ))}
          </ol>
          {(pack.ranking || []).length === 0 && <p className="daily-lead">Încă nu e nimeni pe lista de azi.</p>}
          <button type="button" className="accent-button" onClick={() => onNavigate('home')}>Înapoi acasă</button>
        </section>
      )}
    </main>
  );
};

export default DailyChallengeScreen;
