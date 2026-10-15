import { useEffect, useLayoutEffect, useState } from 'react';
import Mascota from './mascot/Mascota.jsx';
import { MentorAPI } from '../apiClient.js';

const QuickStartScreen = ({ onLesson, onSkip }) => {
  const [pack, setPack] = useState(null);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    let live = true;
    MentorAPI.quickStart().then(result => {
      if (!live) return;
      if (!result.success) {
        setError('Nu am putut deschide întrebările. Poți sări peste.');
        return;
      }
      const data = result.data || null;
      if (!data?.questions?.length) {
        setEmpty(true);
        return;
      }
      setPack(data);
    });
    return () => {
      live = false;
    };
  }, []);

  const questions = Array.isArray(pack?.questions) ? pack.questions : [];
  const question = questions[index];

  useLayoutEffect(() => {
    if (!done && !empty) return;
    window.scrollTo(0, 0);
  }, [done, empty]);

  const skip = async () => {
    if (busy) return;
    setBusy(true);
    await MentorAPI.skipQuickStart();
    setBusy(false);
    onSkip?.();
  };

  const choose = async choice => {
    if (busy || !question) return;
    const next = { ...picks, [question.id]: choice };
    setPicks(next);
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    setBusy(true);
    setError('');
    const answers = questions.map(item => ({ id: item.id, choice: next[item.id] ?? 0 }));
    const result = await MentorAPI.finishQuickStart(answers);
    setBusy(false);
    if (!result.success) {
      setError('Nu am putut salva. Poți încerca din nou sau sări peste.');
      return;
    }
    setDone(result.data);
  };

  if (empty) {
    return (
      <main className="onboarding-page animate-fadeIn quick-start quick-start-end">
        <div className="onboarding-copy">
          <Mascota mood="salut" size="lg" />
          <p className="form-subtitle">Poți continua când vrei.</p>
        </div>
        <div className="onboarding-actions">
          <button type="button" className="accent-button onboarding-next" onClick={() => onSkip?.()}>Spre acasă</button>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="onboarding-page animate-fadeIn quick-start quick-start-end">
        <div className="onboarding-copy">
          <Mascota mood="sarbatoare" size="lg" />
          <p className="quick-start-xp">+20 XP, ai început!</p>
          <p className="form-subtitle">Trei întrebări scurte, din {done.title || 'prima lecție'}. Atât a fost de ajuns.</p>
        </div>
        <div className="onboarding-actions">
          <button type="button" className="accent-button onboarding-next" onClick={() => onLesson?.(done)}>
            Spre prima lecție
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="onboarding-page animate-fadeIn quick-start">
      <div className="onboarding-copy">
        <Mascota mood="salut" size="lg" />
        <h1 className="display-font onboarding-title">Trei întrebări scurte.</h1>
        <p className="form-subtitle">
          {pack?.title ? `Din ${pack.title}, clasa ta. ` : ''}
          Poți sări peste, fără nicio problemă.
        </p>
      </div>
      {question && (
        <section className="quick-start-card" aria-labelledby="quick-start-question">
          <p className="eyebrow">{index + 1} din {questions.length}</p>
          <h2 id="quick-start-question" className="display-font quick-start-question">{question.question}</h2>
          <div className="quick-start-options">
            {question.options.map((option, choice) => (
              <button
                key={option}
                type="button"
                className="quick-start-option"
                disabled={busy}
                onClick={() => choose(choice)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      )}
      {!question && !error && <p className="form-subtitle">Se deschid întrebările…</p>}
      {error && <p className="guide-error" role="alert">{error}</p>}
      <div className="onboarding-actions">
        <button type="button" className="ghost-button onboarding-back" disabled={busy} onClick={skip}>
          Sari peste
        </button>
      </div>
    </main>
  );
};

export default QuickStartScreen;
