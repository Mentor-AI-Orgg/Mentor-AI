import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import FocusTimer from '../components/FocusTimer.jsx';
import FlashCards from '../components/FlashCards.jsx';
import ChapterQuiz from '../components/ChapterQuiz.jsx';
import EnPaperView from '../components/EnPaperView.jsx';
import QuoteCard from '../components/QuoteCard.jsx';
import GeoFigure from '../components/GeoFigure.jsx';
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
  const [track, setTrack] = useState(studyFocus.track === 'en' ? 'en' : null);
  const [subject, setSubject] = useState(
    studyFocus.subject
      ? normalizeSubject(studyFocus.subject)
      : (studyFocus.track === 'en' ? 'matematica' : null)
  );
  const [grade, setGrade] = useState(studyFocus.track === 'en' ? 8 : defaultGrade);
  const [guide, setGuide] = useState(null);
  const [openChapter, setOpenChapter] = useState(studyFocus.chapter || null);
  const [session, setSession] = useState(null);
  const [doneSteps, setDoneSteps] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [quizUnit, setQuizUnit] = useState(null);
  const [openPaper, setOpenPaper] = useState(null);
  const [paperSession, setPaperSession] = useState(null);
  const [seenPapers, setSeenPapers] = useState([]);
  const [enTrainUnit, setEnTrainUnit] = useState(null);
  const [workSprint, setWorkSprint] = useState(false);
  const [guideError, setGuideError] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);
  const [paperError, setPaperError] = useState('');
  const isEn = track === 'en';
  const activeGrade = isEn ? 8 : grade;

  useEffect(() => {
    if (studyFocus.track === 'en') {
      setTrack('en');
      setGrade(8);
      if (!studyFocus.subject) setSubject(prev => prev || 'matematica');
    } else if (studyFocus.track === null) {
      setTrack(null);
    }
    if (studyFocus.subject) setSubject(normalizeSubject(studyFocus.subject));
    else if (studyFocus.subject === null && studyFocus.track !== 'en') {
      setSubject(null);
      setOpenChapter(null);
    }
    if (studyFocus.grade && studyFocus.track !== 'en') setGrade(normalizeGrade(studyFocus.grade));
    if (studyFocus.chapter) setOpenChapter(studyFocus.chapter);
    else if (studyFocus.chapter === null) setOpenChapter(null);
  }, [studyFocus.subject, studyFocus.grade, studyFocus.chapter, studyFocus.track]);

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
    const params = isEn ? { subject, track: 'en' } : { subject, class_level: grade };
    MentorAPI.getCurriculum(params).then(result => {
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
  }, [subject, grade, isEn]);

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
      meta: { subject, grade: activeGrade, chapterId: unit.id, title: unit.title, track: isEn ? 'en' : '' }
    });
    applyResult(result);
  };

  const askMentor = unit => {
    onNavigate?.('professor', {
      subject,
      grade: isEn ? 8 : grade,
      track: isEn ? 'en' : null,
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
      classLevel: activeGrade,
      language: userData.language || 'ro',
      planId: userData.planId || 'free',
      mockReply: `Obiectiv: înțelegi ${unit.title.toLowerCase()} în pași simpli. Încălzire: notează 2 lucruri pe care le știi deja. Exercițiu: rezolvă un exemplu scurt și încadrează răspunsul în 3 etape. Verificare: spune cu voce tare ce ai făcut. Bonus: repetă ideea principală într-o propoziție.`
    });
    const plan = parseSessionPlan(reply.response || '');
    setSession({
      title: unit.title,
      chapterId: unit.id,
      meta: `${isEn ? 'Evaluare Națională' : gradeLabel(grade)} · ${subjectLabel(subject)}`,
      ...plan,
      mocked: !!reply.mocked,
      engine: reply.engine_used || ''
    });
    setLoading(false);
    const result = await MentorAPI.recordProgress({
      type: 'chapter_open',
      note: unit.title,
      meta: { subject, grade: activeGrade, chapterId: unit.id, title: unit.title, track: isEn ? 'en' : '' }
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
        meta: { subject, grade: activeGrade, chapterId: session.chapterId || openChapter, title: session.title, track: isEn ? 'en' : '' }
      });
      applyResult(result);
    }
  };

  const saveForLater = async () => {
    if (!session || saved) return;
    const result = await MentorAPI.recordProgress({
      type: 'save_session',
      note: session.title,
      meta: {
        title: session.title,
        subject,
        grade: activeGrade,
        chapterId: session.chapterId || openChapter,
        track: isEn ? 'en' : '',
        plan: {
          objective: session.objective,
          warmup: session.warmup,
          exercise: session.exercise,
          check: session.check,
          bonus: session.bonus
        }
      }
    });
    setSaved(true);
    applyResult(result);
  };

  return (
    <main className="screen-page learn-page animate-fadeIn">
      <header className="screen-header">
        <div className="learn-hero">
          <div className="eyebrow">{isEn ? 'EVALUARE NAȚIONALĂ · CLASA A VIII-A' : 'LECȚII DE GIMNAZIU'}</div>
          <h1 className="display-font screen-title">{isEn ? 'Pregătire pentru Evaluarea Națională.' : 'Română și matematică, clasele 5–8.'}</h1>
          <p className="screen-subtitle">
            {isEn
              ? 'Secțiune separată față de capitolele pe clase. Lecțiile sunt rezumate originale, cu exemple lucrate, după programa de examen (OM 4.730/2022). Modelele de teste se lucrează ca la examen: începi, stai minim o oră (predare anticipată), apoi finalizezi. Baremul și nota apar după predare; părintele le primește împreună cu durata.'
              : 'Alege materia, apoi clasa. În fiecare capitol ai lecțiile pe tavă — cu exemple lucrate, nu copiate din manual. Testele și flashcardurile urcă de la foarte ușor la greu. La test scrii doar răspunsul final; nota și pașii vin după finalizare. După banca de capitol apar variante noi, generate pe programă.'}
          </p>
          <p className="learn-slogan">{dailySlogan()}</p>
          <QuoteCard />
        </div>
      </header>

      {userData.exam === 'evaluare' && !isEn && (
        <p className="mock-banner"><i className="fas fa-clipboard-check" /> Te pregătești pentru Evaluarea Națională. Deschide secțiunea de mai jos — e separată de lecțiile pe clase.</p>
      )}

      <section className="subject-pick-grid subject-pick-grid-three" aria-label="Alege materia sau Evaluarea Națională">
        {SUBJECTS.map(item => (
          <button
            key={item.id}
            type="button"
            className={`subject-pick-card ${item.id === 'romana' ? 'subject-pick-romana' : 'subject-pick-mate'} ${!isEn && subject === item.id ? 'selected' : ''}`}
            onClick={() => {
              setTrack(null);
              setSubject(item.id);
              setOpenChapter(null);
              setSession(null);
              setQuizUnit(null);
              setOpenPaper(null);
              onNavigate?.('learn', { subject: item.id, grade, track: null, chapter: null });
            }}
          >
            <i className={`fas ${item.icon}`} />
            <strong>{item.labelRo}</strong>
            <small>Capitole pe clasele 5–8</small>
          </button>
        ))}
        <button
          type="button"
          className={`subject-pick-card subject-pick-en ${isEn ? 'selected' : ''}`}
          onClick={() => {
            setTrack('en');
            setGrade(8);
            setOpenChapter(null);
            setSession(null);
            setQuizUnit(null);
            setOpenPaper(null);
            if (!subject) setSubject('matematica');
            onNavigate?.('learn', { track: 'en', grade: 8, subject: subject || 'matematica', chapter: null });
          }}
        >
          <i className="fas fa-clipboard-check" />
          <strong>Evaluare Națională</strong>
          <small>Clasa a 8-a · română și matematică</small>
        </button>
      </section>

      {isEn && (
        <section className="grade-chip-row" aria-label="Alege materia la Evaluarea Națională">
          {SUBJECTS.map(item => (
            <button
              key={`en-${item.id}`}
              type="button"
              className={`grade-chip ${subject === item.id ? 'selected' : ''}`}
              onClick={() => {
                setSubject(item.id);
                setOpenChapter(null);
                setSession(null);
                setOpenPaper(null);
                onNavigate?.('learn', { track: 'en', grade: 8, subject: item.id, chapter: null });
              }}
            >
              {item.labelRo}
            </button>
          ))}
        </section>
      )}

      {subject && (
        <>
          {!isEn && (
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
                    onNavigate?.('learn', { subject, grade: item, track: null, chapter: null });
                  }}
                >
                  {gradeLabel(item)}
                </button>
              ))}
            </section>
          )}

          <section className="surface chapter-intro">
            <div className="eyebrow">{guide?.title || `${subjectLabel(subject)} · ${isEn ? 'Evaluare Națională' : gradeLabel(grade)}`}</div>
            <h2 className="display-font">{guide?.title || 'Capitolele clasei'}</h2>
            <p>{guideLoading ? 'Încărcăm ghidul…' : (guide?.howISeeIt || 'Încărcăm ghidul…')}</p>
            {guideError && (
              <p className="guide-error">
                Nu am putut încărca programa.{' '}
                <button type="button" className="ghost-button" onClick={() => { setGuide(null); setGuideError(false); setGuideLoading(true); MentorAPI.getCurriculum(isEn ? { subject, track: 'en' } : { subject, class_level: grade }).then(result => { setGuideLoading(false); if (result.success) { setGuide(result.data); setGuideError(false); } else setGuideError(true); }); }}>
                  Reîncearcă
                </button>
              </p>
            )}
            {!guideLoading && !guideError && units.length === 0 && subject && (
              <p className="empty-state">Niciun capitol aici. Alege cealaltă materie sau Evaluarea Națională.</p>
            )}
            {guide?.source?.disclaimer && <small className="chapter-disclaimer">{guide.source.disclaimer}</small>}
          </section>

          {isEn && (guide?.papers || []).length > 0 && (
            <section className="en-papers-section" aria-label="Modele recomandate de teste">
              <div className="surface chapter-intro">
                <div className="eyebrow">Modele recomandate</div>
                <h2 className="display-font">Teste de tip examen, ca la Evaluarea Națională</h2>
                <p>{guide.papersNote || 'Începi testul, stai minim o oră, apoi finalizezi. Baremul apare după predare.'}</p>
              </div>
              <div className="en-paper-card-list">
                {guide.papers.map(paper => (
                  <button
                    key={paper.id}
                    type="button"
                    className={`en-paper-pick ${openPaper?.id === paper.id ? 'selected' : ''}`}
                    onClick={() => {
                      setPaperSession(null);
                      setOpenPaper(openPaper?.id === paper.id ? null : paper);
                    }}
                  >
                    <i className="fas fa-file-alt" />
                    <span>
                      <strong>{paper.title}</strong>
                      <small>{paper.duration} · {paper.oficiu} puncte din oficiu · start, apoi predare după o oră</small>
                    </span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="accent-button result-action"
                onClick={async () => {
                  setPaperError('');
                  const result = await MentorAPI.generateEnPaper({ subject, exclude_ids: seenPapers });
                  if (result.success && result.data?.paper) {
                    setSeenPapers(prev => [...prev, result.data.paper.id]);
                    setOpenPaper(result.data.paper);
                    setPaperSession(result.data.session);
                    return;
                  }
                  setPaperError(result.error || 'Nu am putut genera un alt model acum. Încearcă din nou.');
                }}
              >
                Alt model, fără repetare <i className="fas fa-random" />
              </button>
              {paperError && <p className="guide-error" role="alert">{paperError}</p>}
              {openPaper && <EnPaperView paper={openPaper} session={paperSession} onClose={() => { setOpenPaper(null); setPaperSession(null); }} />}
            </section>
          )}

          <section className="chapter-list" aria-label="Capitole">
            {units.map((unit, index) => {
              const open = openChapter === unit.id;
              const status = chapterStatus(userData.chapters, subject, activeGrade, unit.id);
              return (
                <article key={unit.id} className={`chapter-card ${['module-violet', 'module-cyan', 'module-pink'][index % 3]} ${open ? 'open' : ''} ${status}`}>
                  <button type="button" className="chapter-card-head" onClick={() => openUnit(unit)}>
                    <span className="module-icon"><i className={`fas ${subject === 'romana' ? 'fa-book-open' : 'fa-square-root-variable'}`} /></span>
                    <span>
                      <strong>{unit.title}</strong>
                      <small>Capitol {index + 1} · {(unit.lessons || []).length} lecții · {isEn ? 'EN clasa a 8-a' : gradeLabel(grade)}</small>
                    </span>
                    {status ? <em className={`chapter-status ${status}`}>{status === 'done' ? 'Terminat' : 'Început'}</em> : null}
                    <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                  </button>
                  {open && (
                    <div className="chapter-card-body">
                      <p>{unit.inOwnWords}</p>
                      {(unit.glossary || []).length > 0 && (
                        <dl className="chapter-glossary">
                          {unit.glossary.map(row => (
                            <div key={row.term}>
                              <dt>{row.term}</dt>
                              <dd>{row.meaning}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {userData.chapterMaps?.[`${subject}:${activeGrade}:${unit.id}`] && (
                        <p className="chapter-map-line">
                          Hartă: {userData.chapterMaps[`${subject}:${activeGrade}:${unit.id}`].read ? 'citit' : 'necitit'}
                          {' · '}
                          {userData.chapterMaps[`${subject}:${activeGrade}:${unit.id}`].tested ? 'testat' : 'netestat'}
                          {' · '}
                          {userData.chapterMaps[`${subject}:${activeGrade}:${unit.id}`].flash || 0} flashcarduri
                        </p>
                      )}
                      {(unit.lessons || []).length > 0 && (
                        <ol className="lesson-platter-list">
                          {unit.lessons.map((entry, lessonIndex) => (
                            <li key={entry.id} className="lesson-platter">
                              <h4>Lecția {lessonIndex + 1}. {entry.title}</h4>
                              {entry.figure && <GeoFigure kind={entry.figure} />}
                              {entry.theory && <p><strong>Teorie. </strong>{entry.theory}</p>}
                              {entry.example && <p><strong>Exemplu. </strong>{entry.example}</p>}
                              {entry.tryThis && <p className="lesson-try"><strong>Încearcă tu. </strong>{entry.tryThis}</p>}
                              {entry.recap && <p><strong>Recap. </strong>{entry.recap}</p>}
                              {!entry.theory && (entry.platter || '').split(/\n\n+/).map((para, paraIndex) => (
                                <p key={`${entry.id}-${paraIndex}`}>{para}</p>
                              ))}
                            </li>
                          ))}
                        </ol>
                      )}
                      <p className="lesson-practice-hint">
                        {isEn
                          ? 'Lecția e aici. Modelele EN (cu 4 variante) sunt deasupra: începi, stai timpul de sală, apoi vezi baremul. Antrenamentul EN e exercițiu scurt, separat de proba cronometrată.'
                          : 'Înainte de test sau flashcarduri spui ce notă ți-ai dori. Itemii se potrivesc. Scrii răspunsul la test; la flashcarduri alegi A–D. Nu se repetă.'}
                      </p>
                      <small className="chapter-disclaimer">Ghid intern Mentor AI, nu manual. „Cum o văd eu”, după programă.</small>
                      <div className="learning-actions">
                        <button type="button" className="ghost-button result-action" onClick={() => askMentor(unit)}>
                          Întreabă mentorul <i className="fas fa-comments" />
                        </button>
                        {!isEn && (
                          <button type="button" className="ghost-button result-action" onClick={() => setQuizUnit(unit)}>
                            Generează test <i className="fas fa-clipboard-check" />
                          </button>
                        )}
                        {isEn && (
                          <button type="button" className="ghost-button result-action" onClick={() => setEnTrainUnit(unit)}>
                            Antrenament EN <i className="fas fa-dumbbell" />
                          </button>
                        )}
                        <button type="button" className="accent-button result-action" onClick={() => startSession(unit)} disabled={loading}>
                          {loading && openChapter === unit.id ? 'Pregătesc sesiunea…' : 'Sesiune de 5 minute'}
                        </button>
                        <button
                          type="button"
                          className="ghost-button result-action"
                          onClick={() => {
                            setWorkSprint(true);
                            startSession(unit);
                            if (isEn) setEnTrainUnit(unit);
                            else setQuizUnit(unit);
                          }}
                        >
                          Lucrează 15 minute
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
            {!isEn && (
              <button type="button" className="ghost-button result-action" onClick={() => setQuizUnit({ id: session.chapterId || openChapter, title: session.title, inOwnWords: session.objective })}>
                Generează test <i className="fas fa-clipboard-check" />
              </button>
            )}
            <button type="button" className="accent-button result-action" onClick={() => askMentor({ id: openChapter, title: session.title, inOwnWords: session.objective })}>Continuă cu mentorul</button>
          </div>
        </section>
      )}

      {quizUnit && !isEn && (
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

      {enTrainUnit && isEn && (
        <ChapterQuiz
          unit={enTrainUnit}
          subject={subject}
          grade={8}
          track="en"
          mode="training"
          onClose={() => setEnTrainUnit(null)}
          onRewardClaim={onRewardClaim}
          onAskMentor={unit => {
            setEnTrainUnit(null);
            askMentor(unit);
          }}
        />
      )}

      {workSprint && (
        <p className="mock-banner">Mod 15 minute: un capitol + 3 itemi de antrenament. Timerul e jos, la Focus — alege 15 min.</p>
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
                    if (item.track === 'en') {
                      setTrack('en');
                      setGrade(8);
                    } else {
                      setTrack(null);
                      if (item.grade) setGrade(normalizeGrade(item.grade));
                    }
                    if (item.subject) setSubject(normalizeSubject(item.subject));
                    if (item.chapterId) setOpenChapter(item.chapterId);
                    if (item.plan) {
                      setSession({
                        title: item.title,
                        chapterId: item.chapterId,
                        meta: item.track === 'en' ? 'Evaluare Națională' : '',
                        ...item.plan
                      });
                      setSaved(true);
                      setDoneSteps({});
                      setSessionDone(false);
                    }
                  }}
                >
                  <strong>{item.title}</strong>
                  <small>{item.track === 'en' ? 'EN · ' : ''}{item.subject ? subjectLabel(item.subject) : ''} {item.grade ? `· ${gradeLabel(item.grade)}` : ''}</small>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {subject && (
        <div className="learn-tools-grid">
          <FocusTimer userData={userData} onRewardClaim={onRewardClaim} />
          <FlashCards
            subject={subject}
            classLevel={activeGrade}
            chapters={units}
            track={isEn ? 'en' : ''}
            mode={isEn ? 'training' : ''}
            onRewardClaim={onRewardClaim}
            onAskMentor={askMentor}
          />
        </div>
      )}
    </main>
  );
};

export default LearnScreen;
