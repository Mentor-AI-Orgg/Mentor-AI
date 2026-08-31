import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import FocusTimer from '../components/FocusTimer.jsx';
import FlashCards from '../components/FlashCards.jsx';
import ChapterQuiz from '../components/ChapterQuiz.jsx';
import { dailySlogan } from '../slogans.js';
import { GRADES, SUBJECTS, gradeLabel, normalizeGrade, normalizeSubject, subjectLabel } from '../curriculum.js';

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const SESSION_STEPS = [
  { key: 'objective', label: 'Obiectiv' },
  { key: 'warmup', label: 'Încălzire' },
  { key: 'exercise', label: 'Exercițiu' },
  { key: 'check', label: 'Verificare' },
  { key: 'bonus', label: 'Bonus' }
];

const chatRequest = async ({ message, conversationId, subject, classLevel, language, planId, mockReply }) => {
  const result = await MentorAPI.chat({ message, conversation_id: conversationId, subject, class_level: classLevel, language, plan_id: planId });
  if (result.success && result.data) {
    return { ...result.data, mocked: !!result.data.engine_mocked };
  }
  return { response: mockReply, mocked: true, engine_used: 'offline' };
};

const parseSessionPlan = text => {
  const lines = (text || '').split(/\n+/).map(line => line.trim()).filter(Boolean);
  const fallback = {
    objective: lines[0] || 'Făc un pas mic, clar și memorabil.',
    warmup: 'Notează 2 lucruri pe care le știi deja despre subiect.',
    exercise: 'Rezolvă primul exemplu într-un mod simplu, pas cu pas.',
    check: 'Verifică dacă ai răspuns la întrebarea principală.',
    bonus: 'Repetă ideea într-o propoziție scurtă, cu cuvintele tale.'
  };
  const plan = { ...fallback };
  let current = null;
  lines.forEach(line => {
    const normalized = line.toLowerCase();
    const assign = (key, cleaned) => {
      plan[key] = cleaned;
      current = key;
    };
    if (normalized.startsWith('obiectiv')) return assign('objective', line.replace(/^obiectiv\s*[:-]?\s*/i, ''));
    if (normalized.startsWith('încălzire') || normalized.startsWith('incalzire')) {
      return assign('warmup', line.replace(/^încălzire\s*[:-]?\s*/i, '').replace(/^incalzire\s*[:-]?\s*/i, ''));
    }
    if (normalized.startsWith('exercițiu') || normalized.startsWith('exercitiu')) {
      return assign('exercise', line.replace(/^exercițiu\s*[:-]?\s*/i, '').replace(/^exercitiu\s*[:-]?\s*/i, ''));
    }
    if (normalized.startsWith('verificare')) return assign('check', line.replace(/^verificare\s*[:-]?\s*/i, ''));
    if (normalized.startsWith('bonus')) return assign('bonus', line.replace(/^bonus\s*[:-]?\s*/i, ''));
    if (current && !plan[current]) plan[current] = line;
  });
  return plan;
};

const chapterStatus = (chapters, subject, grade, chapterId) => {
  const key = `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
  return chapters?.[key]?.status || '';
};

const LearnScreen = ({ userData, studyFocus = {}, onNavigate, onRewardClaim, onProgress }) => {
  const defaultGrade = normalizeGrade(studyFocus.grade || userData.class);
  const [subject, setSubject] = useState(studyFocus.subject ? normalizeSubject(studyFocus.subject) : null);
  const [grade, setGrade] = useState(defaultGrade);
  const [guide, setGuide] = useState(null);
  const [openChapter, setOpenChapter] = useState(studyFocus.chapter || null);
  const [session, setSession] = useState(null);
  const [doneSteps, setDoneSteps] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [quizUnit, setQuizUnit] = useState(null);
  const [guideError, setGuideError] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);

  useEffect(() => {
    if (studyFocus.subject) setSubject(normalizeSubject(studyFocus.subject));
    if (studyFocus.grade) setGrade(normalizeGrade(studyFocus.grade));
    if (studyFocus.chapter) setOpenChapter(studyFocus.chapter);
  }, [studyFocus.subject, studyFocus.grade, studyFocus.chapter]);

  useEffect(() => {
    if (!subject) {
      setGuide(null);
      setGuideError(false);
      setGuideLoading(false);
      return undefined;
    }
    let cancelled = false;
    setGuideLoading(true);
    setGuideError(false);
    MentorAPI.getCurriculum({ subject, class_level: grade }).then(result => {
      if (cancelled) return;
      setGuideLoading(false);
      if (result.success) {
        setGuide(result.data);
        setGuideError(false);
      } else {
        setGuide(null);
        setGuideError(true);
      }
    });
    return () => { cancelled = true; };
  }, [subject, grade]);

  const units = guide?.units || [];
  const savedSessions = userData.savedSessions || [];

  const applyResult = result => {
    const summary = result?.data?.summary;
    if (summary && typeof onRewardClaim === 'function') {
      onRewardClaim({
        balance: summary.balance,
        equipped: summary.equipped || {},
        role: summary.role,
        summary
      });
      return;
    }
    onProgress?.();
  };

  const openUnit = async unit => {
    const nextOpen = openChapter === unit.id ? null : unit.id;
    setOpenChapter(nextOpen);
    if (!nextOpen) return;
    const result = await MentorAPI.recordProgress({
      type: 'chapter_open',
      note: unit.title,
      meta: { subject, grade, chapterId: unit.id, title: unit.title }
    });
    applyResult(result);
  };

  const askMentor = unit => {
    onNavigate?.('professor', {
      subject,
      grade,
      chapter: unit ? { id: unit.id, title: unit.title, inOwnWords: unit.inOwnWords } : null
    });
  };

  const startSession = async unit => {
    setOpenChapter(unit.id);
    setLoading(true);
    setSaved(false);
    setSessionDone(false);
    setDoneSteps({});
    setSession(null);
    const reply = await chatRequest({
      message: `Creează o sesiune de 5 minute despre: ${unit.title}. Cum o înțeleg eu: ${unit.inOwnWords}. Include obiectiv, încălzire, exercițiu, verificare și bonus. Nu da rezolvarea gata.`,
      conversationId: makeConversationId('learn'),
      subject,
      classLevel: grade,
      language: userData.language || 'ro',
      planId: userData.planId || 'free',
      mockReply: `Obiectiv: înțelegi ${unit.title.toLowerCase()} în pași simpli. Încălzire: notează 2 lucruri pe care le știi deja. Exercițiu: rezolvă un exemplu scurt și încadrează răspunsul în 3 etape. Verificare: spune cu voce tare ce ai făcut. Bonus: repetă ideea principală într-o propoziție.`
    });
    const plan = parseSessionPlan(reply.response || '');
    setSession({
      title: unit.title,
      chapterId: unit.id,
      meta: `${gradeLabel(grade)} · ${subjectLabel(subject)}`,
      ...plan,
      mocked: !!reply.mocked,
      engine: reply.engine_used || ''
    });
    setLoading(false);
    const result = await MentorAPI.recordProgress({
      type: 'chapter_open',
      note: unit.title,
      meta: { subject, grade, chapterId: unit.id, title: unit.title }
    });
    applyResult(result);
  };

  const toggleStep = async key => {
    const next = { ...doneSteps, [key]: !doneSteps[key] };
    setDoneSteps(next);
    const complete = SESSION_STEPS.every(step => next[step.key]);
    if (complete && session && !sessionDone) {
      setSessionDone(true);
      const result = await MentorAPI.recordProgress({
        type: 'session_complete',
        note: session.title,
        meta: { subject, grade, chapterId: session.chapterId || openChapter, title: session.title }
      });
      applyResult(result);
    }
  };

  const saveForLater = async () => {
    if (!session || saved) return;
    const result = await MentorAPI.recordProgress({
      type: 'save_session',
      note: session.title,
      meta: { title: session.title, subject, grade, chapterId: session.chapterId || openChapter }
    });
    setSaved(true);
    applyResult(result);
  };

  return (
    <main className="screen-page learn-page animate-fadeIn">
      <header className="screen-header">
        <div className="learn-hero">
          <div className="eyebrow">LECȚII DE GIMNAZIU</div>
          <h1 className="display-font screen-title">Română și matematică, clasele 5–8.</h1>
          <p className="screen-subtitle">Alege materia, apoi clasa. În test scrii doar răspunsul final; nota și pașii vin după finalizare. Flashcardurile și testele nu se termină: după banca de capitol apar variante noi, generate pe programă.</p>
          <p className="learn-slogan">{dailySlogan()}</p>
        </div>
      </header>

      {userData.exam === 'evaluare' && (
        <p className="mock-banner"><i className="fas fa-clipboard-check" /> Te pregătești pentru Evaluarea Națională. Exercițiile urmează programa de gimnaziu; la test scrii răspunsul final, pe foaie.</p>
      )}

      <section className="subject-pick-grid" aria-label="Alege materia">
        {SUBJECTS.map(item => (
          <button
            key={item.id}
            type="button"
            className={`subject-pick-card ${item.id === 'romana' ? 'subject-pick-romana' : 'subject-pick-mate'} ${subject === item.id ? 'selected' : ''}`}
            onClick={() => {
              setSubject(item.id);
              setOpenChapter(null);
              setSession(null);
              setQuizUnit(null);
            }}
          >
            <i className={`fas ${item.icon}`} />
            <strong>{item.labelRo}</strong>
            <small>Capitole pe clasele 5–8</small>
          </button>
        ))}
      </section>

      {subject && (
        <>
          <section className="grade-chip-row" aria-label="Alege clasa">
            {GRADES.map(item => (
              <button
                key={item}
                type="button"
                className={`grade-chip ${grade === item ? 'selected' : ''}`}
                onClick={() => {
                  setGrade(item);
                  setOpenChapter(null);
                  setSession(null);
                  setQuizUnit(null);
                }}
              >
                {gradeLabel(item)}
              </button>
            ))}
          </section>

          <section className="surface chapter-intro">
            <div className="eyebrow">{guide?.title || `${subjectLabel(subject)} · ${gradeLabel(grade)}`}</div>
            <h2 className="display-font">{guide?.title || 'Capitolele clasei'}</h2>
            <p>{guideLoading ? 'Încărcăm ghidul clasei…' : (guide?.howISeeIt || 'Încărcăm ghidul clasei…')}</p>
            {guideError && <p className="guide-error">Nu am putut încărca programa. Verifică conexiunea și alege din nou materia.</p>}
            {guide?.source?.disclaimer && <small className="chapter-disclaimer">{guide.source.disclaimer}</small>}
          </section>

          <section className="chapter-list" aria-label="Capitole">
            {units.map((unit, index) => {
              const open = openChapter === unit.id;
              const status = chapterStatus(userData.chapters, subject, grade, unit.id);
              return (
                <article key={unit.id} className={`chapter-card ${['module-violet', 'module-cyan', 'module-pink'][index % 3]} ${open ? 'open' : ''} ${status}`}>
                  <button type="button" className="chapter-card-head" onClick={() => openUnit(unit)}>
                    <span className="module-icon"><i className={`fas ${subject === 'romana' ? 'fa-book-open' : 'fa-square-root-variable'}`} /></span>
                    <span>
                      <strong>{unit.title}</strong>
                      <small>Capitol {index + 1} · {gradeLabel(grade)}</small>
                    </span>
                    {status ? <em className={`chapter-status ${status}`}>{status === 'done' ? 'Terminat' : 'Început'}</em> : null}
                    <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                  </button>
                  {open && (
                    <div className="chapter-card-body">
                      <p>{unit.inOwnWords}</p>
                      <div className="learning-actions">
                        <button type="button" className="ghost-button result-action" onClick={() => askMentor(unit)}>
                          Întreabă mentorul <i className="fas fa-comments" />
                        </button>
                        <button type="button" className="ghost-button result-action" onClick={() => setQuizUnit(unit)}>
                          Generează test <i className="fas fa-clipboard-check" />
                        </button>
                        <button type="button" className="accent-button result-action" onClick={() => startSession(unit)} disabled={loading}>
                          {loading && openChapter === unit.id ? 'Pregătesc sesiunea…' : 'Sesiune de 5 minute'}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        </>
      )}

      {session && (
        <section className="learning-result surface">
          <div className="eyebrow">SESIUNEA TA</div>
          <h3 className="display-font learning-result-title">{session.title}</h3>
          {session.mocked && <p className="mock-banner session-mock-note">Sesiune demo{session.engine ? ` · ${session.engine}` : ''} — nu este generată de un model real.</p>}
          <p className="session-check-hint">Bifează fiecare pas. Când le termini pe toate, primești monede și XP.</p>
          <div className="learning-steps">
            {SESSION_STEPS.map(step => (
              <label key={step.key} className={`learn-step learn-step-check ${doneSteps[step.key] ? 'is-done' : ''}`}>
                <input type="checkbox" checked={Boolean(doneSteps[step.key])} onChange={() => toggleStep(step.key)} />
                <span>
                  <strong>{step.label}</strong>
                  <p>{session[step.key]}</p>
                </span>
              </label>
            ))}
          </div>
          {sessionDone && <p className="session-complete-note">Sesiune marcată. Recompensa de azi pentru acest capitol e pe server.</p>}
          <div className="learning-actions">
            <button type="button" className="ghost-button result-action" onClick={saveForLater}>
              {saved ? 'Salvat în lista ta' : 'Salvează pentru mai târziu'} <i className="fas fa-bookmark" />
            </button>
            <button type="button" className="ghost-button result-action" onClick={() => setQuizUnit({ id: session.chapterId || openChapter, title: session.title, inOwnWords: session.objective })}>
              Generează test <i className="fas fa-clipboard-check" />
            </button>
            <button type="button" className="accent-button result-action" onClick={() => askMentor({ id: openChapter, title: session.title, inOwnWords: session.objective })}>Continuă cu mentorul</button>
          </div>
        </section>
      )}

      {quizUnit && (
        <ChapterQuiz
          unit={quizUnit}
          subject={subject}
          grade={grade}
          onClose={() => setQuizUnit(null)}
          onRewardClaim={onRewardClaim}
          onAskMentor={unit => {
            setQuizUnit(null);
            askMentor(unit);
          }}
        />
      )}

      {savedSessions.length > 0 && (
        <section className="surface saved-sessions-card">
          <div className="eyebrow">Păstrate pentru mai târziu</div>
          <ul className="saved-sessions-list">
            {savedSessions.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  className="saved-session-btn"
                  onClick={() => {
                    if (item.subject) setSubject(normalizeSubject(item.subject));
                    if (item.grade) setGrade(normalizeGrade(item.grade));
                    if (item.chapterId) setOpenChapter(item.chapterId);
                  }}
                >
                  <strong>{item.title}</strong>
                  <small>{item.subject ? subjectLabel(item.subject) : ''} {item.grade ? `· ${gradeLabel(item.grade)}` : ''}</small>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="learn-tools-grid">
        <FocusTimer userData={userData} onRewardClaim={onRewardClaim} />
        <FlashCards
          userData={userData}
          subject={subject}
          classLevel={grade}
          chapters={units}
          onRewardClaim={onRewardClaim}
          onAskMentor={askMentor}
        />
      </div>
    </main>
  );
};

export default LearnScreen;
