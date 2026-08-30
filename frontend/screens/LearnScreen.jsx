import { useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import FocusTimer from '../components/FocusTimer.jsx';
import FlashCards from '../components/FlashCards.jsx';
import { GRADES, SUBJECTS, gradeLabel, normalizeGrade, normalizeSubject, subjectLabel } from '../curriculum.js';

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

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

const LearnScreen = ({ userData, studyFocus = {}, onNavigate, onRewardClaim }) => {
  const defaultGrade = normalizeGrade(studyFocus.grade || userData.class);
  const [subject, setSubject] = useState(studyFocus.subject ? normalizeSubject(studyFocus.subject) : null);
  const [grade, setGrade] = useState(defaultGrade);
  const [guide, setGuide] = useState(null);
  const [openChapter, setOpenChapter] = useState(studyFocus.chapter || null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [detectText, setDetectText] = useState('');
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectResult, setDetectResult] = useState(null);

  useEffect(() => {
    if (studyFocus.subject) setSubject(normalizeSubject(studyFocus.subject));
    if (studyFocus.grade) setGrade(normalizeGrade(studyFocus.grade));
    if (studyFocus.chapter) setOpenChapter(studyFocus.chapter);
  }, [studyFocus.subject, studyFocus.grade, studyFocus.chapter]);

  useEffect(() => {
    if (!subject) {
      setGuide(null);
      return undefined;
    }
    let cancelled = false;
    MentorAPI.getCurriculum({ subject, class_level: grade }).then(result => {
      if (!cancelled && result.success) setGuide(result.data);
    });
    return () => { cancelled = true; };
  }, [subject, grade]);

  const units = guide?.units || [];

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
    setSession({ title: unit.title, meta: `${gradeLabel(grade)} · ${subjectLabel(subject)}`, ...plan, mocked: !!reply.mocked, engine: reply.engine_used || '' });
    setLoading(false);
    MentorAPI.logActivity?.({ type: 'learn_module', note: unit.title, meta: { moduleId: unit.id, title: unit.title, subject, grade } });
  };

  const runDetector = async () => {
    if (!detectText.trim() || detectLoading) return;
    setDetectLoading(true);
    const result = await MentorAPI.detect({ text: detectText.trim() });
    if (result.success) {
      setDetectResult(result.data);
      MentorAPI.logActivity?.({ type: 'ai_detect', note: detectText.trim().slice(0, 120), meta: { ai_probability: result.data.ai_probability || 0 } });
    } else {
      setDetectResult({ verdict: 'Detector indisponibil', ai_probability: 0 });
    }
    setDetectLoading(false);
  };

  return (
    <main className="screen-page learn-page animate-fadeIn">
      <header className="screen-header">
        <div className="learn-hero">
          <div className="eyebrow">LECȚII DE GIMNAZIU</div>
          <h1 className="display-font screen-title">Română și matematică, clasele 5–8.</h1>
          <p className="screen-subtitle">Alege materia, apoi clasa. Capitolele sunt explicate cu cuvintele mele, după programa oficială — nu copiez manualul digital.</p>
        </div>
      </header>

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
                }}
              >
                {gradeLabel(item)}
              </button>
            ))}
          </section>

          <section className="surface chapter-intro">
            <div className="eyebrow">{guide?.title || `${subjectLabel(subject)} · ${gradeLabel(grade)}`}</div>
            <h2 className="display-font">{guide?.title || 'Capitolele clasei'}</h2>
            <p>{guide?.howISeeIt || 'Încărcăm ghidul clasei…'}</p>
            {guide?.source?.disclaimer && <small className="chapter-disclaimer">{guide.source.disclaimer}</small>}
          </section>

          <section className="chapter-list" aria-label="Capitole">
            {units.map((unit, index) => {
              const open = openChapter === unit.id;
              return (
                <article key={unit.id} className={`chapter-card ${['module-violet', 'module-cyan', 'module-pink'][index % 3]} ${open ? 'open' : ''}`}>
                  <button type="button" className="chapter-card-head" onClick={() => setOpenChapter(open ? null : unit.id)}>
                    <span className="module-icon"><i className={`fas ${subject === 'romana' ? 'fa-book-open' : 'fa-square-root-variable'}`} /></span>
                    <span>
                      <strong>{unit.title}</strong>
                      <small>Capitol {index + 1} · {gradeLabel(grade)}</small>
                    </span>
                    <i className={`fas ${open ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
                  </button>
                  {open && (
                    <div className="chapter-card-body">
                      <p>{unit.inOwnWords}</p>
                      <div className="learning-actions">
                        <button type="button" className="ghost-button result-action" onClick={() => askMentor(unit)}>
                          Întreabă mentorul <i className="fas fa-comments" />
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
          <div className="learning-steps">
            <article className="learn-step"><span>Obiectiv</span><p>{session.objective}</p></article>
            <article className="learn-step"><span>Încălzire</span><p>{session.warmup}</p></article>
            <article className="learn-step"><span>Exercițiu</span><p>{session.exercise}</p></article>
            <article className="learn-step"><span>Verificare</span><p>{session.check}</p></article>
            <article className="learn-step"><span>Bonus</span><p>{session.bonus}</p></article>
          </div>
          <div className="learning-actions">
            <button type="button" className="ghost-button result-action" onClick={() => setSaved(true)}>{saved ? 'Salvat în lista ta' : 'Salvează pentru mai târziu'} <i className="fas fa-bookmark" /></button>
            <button type="button" className="accent-button result-action" onClick={() => askMentor({ id: openChapter, title: session.title, inOwnWords: session.objective })}>Continuă cu mentorul</button>
          </div>
        </section>
      )}

      <section className="surface learn-detector-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Detector demo</div>
            <h2 className="display-font">Un scor euristic, nu un verdict.</h2>
          </div>
        </div>
        <p className="detector-demo-note">Folosește lungimea cuvintelor și termeni academici, plus un jitter aleator. Nu este un detector real de conținut AI.</p>
        <textarea className="learn-detector-input" rows="5" value={detectText} onChange={e => setDetectText(e.target.value)} placeholder="Lipește un text aici pentru scorul demonstrativ..." />
        <div className="learning-actions">
          <button type="button" className="accent-button result-action" onClick={runDetector} disabled={detectLoading || !detectText.trim()}>{detectLoading ? 'Analizez...' : 'Rulează demonstrația'}</button>
        </div>
        {detectResult && (
          <div className="learn-detector-result">
            <strong>{detectResult.verdict || 'Rezultat demonstrativ'}</strong>
            <span>Scor demonstrativ: {Number(detectResult.ai_probability || 0).toFixed(0)}% · nu este o probă</span>
          </div>
        )}
      </section>

      <div className="learn-tools-grid">
        <FocusTimer userData={userData} onRewardClaim={onRewardClaim} />
        <FlashCards
          userData={userData}
          subject={subject || 'matematica'}
          classLevel={grade}
          presetTopics={units.map(unit => unit.title)}
          onRewardClaim={onRewardClaim}
        />
      </div>
    </main>
  );
};

export default LearnScreen;
