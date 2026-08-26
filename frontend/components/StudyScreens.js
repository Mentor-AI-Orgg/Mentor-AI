const { useEffect, useRef, useState } = React;

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const chatRequest = async ({ message, conversationId, subject, classLevel, language, planId, mockReply }) => {
  if (!window.MentorAPI) return { response: mockReply, mocked: true };
  const result = await MentorAPI.chat({ message, conversation_id: conversationId, subject, class_level: classLevel, language, plan_id: planId });
  return { ...result.data, response: result.fallback ? mockReply : result.data?.response, mocked: result.fallback || result.data?.engine_mocked };
};

const MessageBubble = ({ role, children }) => <div className={`mentor-message ${role === 'user' ? 'mentor-message-user' : 'mentor-message-ai'}`}><span className="mentor-message-role">{role === 'user' ? 'Tu' : 'Mentor AI'}</span><div>{children}</div></div>;
const LoadingMessage = () => <div className="mentor-message mentor-message-ai"><span className="mentor-message-role">Mentor AI</span><div className="loading-dots"><i /><i /><i /></div></div>;

const ProfessorScreen = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagMode, setDiagMode] = useState(false);
  const conversationId = useRef(makeConversationId('mentor'));
  const classLevel = userData.class || 'liceu';

  const formatDiagnostics = checks => {
    const icon = status => (status === 'ok' ? '✅' : '❌');
    const lines = checks.map(c => `${icon(c.status)} ${c.label} - ${c.status === 'ok' ? 'funcționează' : 'eroare'}${c.detail ? ` (${c.detail})` : ''}`);
    return lines.join('\n');
  };

  const runDiagnostics = async messageText => {
    setMessages(previous => [...previous, { role: 'user', content: messageText }]);
    setLoading(true);
    const result = await window.MentorAPI.runDiagnostics();
    if (result.success && result.data?.checks) {
      setMessages(previous => [...previous, {
        role: 'assistant',
        content: formatDiagnostics(result.data.checks),
        diagnostic: true,
        allOk: result.data.all_ok
      }]);
    } else {
      setMessages(previous => [...previous, { role: 'assistant', content: '❌ Nu am putut contacta backend-ul pentru diagnosticare. Serverul e probabil offline.', diagnostic: true, allOk: false }]);
    }
    setLoading(false);
  };

  const send = async text => {
    const message = text.trim();
    if (!message || loading) return;
    setDraft('');
    if (diagMode) { await runDiagnostics(message); return; }
    setMessages(previous => [...previous, { role: 'user', content: message }]); setLoading(true);
    if (window.MentorAPI?.logActivity) {
      window.MentorAPI.logActivity({ user_id: userData.email || 'demo_user', type: 'mentor_message', note: message, meta: { diagMode } });
    }
    try {
      const reply = await chatRequest({ message, conversationId: conversationId.current, subject: userData.profile || 'matematica', classLevel, language: userData.language || 'ro', planId: userData.planId || 'free', mockReply: 'Îți explic pas cu pas. Începem cu ideea principală și verificăm împreună fiecare pas.' });
      setMessages(previous => [...previous, { role: 'assistant', content: reply.response || 'Am primit întrebarea. Hai să o desfacem în pași simpli.', mocked: reply.mocked, engine: reply.engine_used }]);
    } catch (error) { setMessages(previous => [...previous, { role: 'assistant', content: 'Nu pot răspunde acum. Încearcă din nou în câteva secunde.' }]); }
    finally { setLoading(false); }
  };

  return <main className="screen-page mentor-page animate-fadeIn">
    <header className="screen-header"><div><div className="eyebrow">PROFESORUL TĂU</div><h1 className="display-font screen-title">Întreabă fără să te prefaci că ai înțeles.</h1></div>
      <div className="mentor-header-actions">
        <button
          type="button"
          onClick={() => setDiagMode(d => !d)}
          className={`memory-pill diag-toggle ${diagMode ? 'active' : ''}`}
          aria-pressed={diagMode}
          title="Verifică status-ul memoriei și al fiecărui API"
        >
          <i className="fas fa-stethoscope" /> {diagMode ? 'Diagnosticare: ON' : 'Diagnosticare'}
        </button>
        <span className="memory-pill"><i className="fas fa-brain" /> Memorie activă</span>
        {messages.some(m => m.mocked) && <span className="memory-pill mock-mode-pill"><i className="fas fa-flask" /> Mod demo</span>}
      </div>
    </header>
    {diagMode && <div className="diag-banner"><i className="fas fa-circle-info" /> Mod diagnosticare activ: orice mesaj trimis va verifica memoria și fiecare API (Claude, GPT-4o, Gemini, Wolfram, Mathpix) în loc de un răspuns normal.</div>}
    {messages.some(m => m.mocked) && <div className="mock-banner"><i className="fas fa-flask" /> Răspunsurile marcate „demo” nu vin de la un model real: cheia API lipsește sau apelul a eșuat.</div>}
    <section className="mentor-thread surface">{messages.length === 0 && <div className="mentor-empty"><div className="professor-icon"><i className="fas fa-sparkles" /></div><h2 className="display-font">Cu ce începem?</h2><p>Scrie o întrebare. Memoria conversației rămâne în backend pentru următorul tău mesaj.</p><div className="suggestion-row"><button onClick={() => send('Explică-mi un concept pe înțelesul meu')} type="button">Explică-mi un concept</button><button onClick={() => send('Ajută-mă să-mi organizez învățarea')} type="button">Fă-mi un plan</button></div></div>}{messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} role={message.role}>{message.diagnostic ? <pre className={`diag-report ${message.allOk ? 'all-ok' : 'has-issues'}`}>{message.content}</pre> : message.content}{message.mocked && <small className="mock-label">Răspuns demo{message.engine ? ` · ${message.engine}` : ''} — nu este generat de un model real</small>}</MessageBubble>)}{loading && <LoadingMessage />}</section>
    <form className="mentor-composer" onSubmit={event => { event.preventDefault(); send(draft); }}><input value={draft} onChange={event => setDraft(event.target.value)} placeholder={diagMode ? 'Scrie orice, va rula diagnosticarea...' : 'Scrie întrebarea ta...'} aria-label="Întrebarea pentru Mentor AI" /><button className="accent-button" type="submit" disabled={loading || !draft.trim()} aria-label="Trimite întrebarea"><i className={`fas ${diagMode ? 'fa-stethoscope' : 'fa-arrow-up'}`} /></button></form>
  </main>;
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
    if (normalized.startsWith('obiectiv')) {
      plan.objective = line.replace(/^obiectiv\s*[:\-]?\s*/i, '');
      current = 'objective';
      return;
    }
    if (normalized.startsWith('încălzire') || normalized.startsWith('incalzire')) {
      plan.warmup = line.replace(/^încălzire\s*[:\-]?\s*/i, '').replace(/^incalzire\s*[:\-]?\s*/i, '');
      current = 'warmup';
      return;
    }
    if (normalized.startsWith('exercițiu') || normalized.startsWith('exercitiu')) {
      plan.exercise = line.replace(/^exercițiu\s*[:\-]?\s*/i, '').replace(/^exercitiu\s*[:\-]?\s*/i, '');
      current = 'exercise';
      return;
    }
    if (normalized.startsWith('verificare')) {
      plan.check = line.replace(/^verificare\s*[:\-]?\s*/i, '');
      current = 'check';
      return;
    }
    if (normalized.startsWith('bonus')) {
      plan.bonus = line.replace(/^bonus\s*[:\-]?\s*/i, '');
      current = 'bonus';
      return;
    }
    if (current === 'objective' && !plan.objective) {
      plan.objective = line;
    }
    if (current === 'warmup' && !plan.warmup) {
      plan.warmup = line;
    }
    if (current === 'exercise' && !plan.exercise) {
      plan.exercise = line;
    }
    if (current === 'check' && !plan.check) {
      plan.check = line;
    }
    if (current === 'bonus' && !plan.bonus) {
      plan.bonus = line;
    }
  });

  return plan;
};

const LearnScreen = ({ userData, onRewardClaim }) => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [saved, setSaved] = useState(false);
  const [detectText, setDetectText] = useState('');
  const [detectLoading, setDetectLoading] = useState(false);
  const [detectResult, setDetectResult] = useState(null);

  const modules = [
    { id: 'algebra', icon: 'fa-square-root-variable', title: 'Algebră fără panică', meta: '5 min · nivel adaptiv', color: 'module-violet', prompt: 'Creează o sesiune de 5 minute pentru algebră. Include obiectiv, încălzire, exercițiu, verificare și bonus. Fii foarte clar și practică cu un exemplu simplu.' },
    { id: 'focus', icon: 'fa-bullseye', title: 'Sesiune de focus', meta: '7 min · ritm ghidat', color: 'module-cyan', prompt: 'Creează o sesiune scurtă pentru concentrarea și memorarea. Include obiectiv, încălzire, exercițiu, verificare și bonus. Fii calm și eficient.' },
    { id: 'exam', icon: 'fa-clipboard-check', title: 'Pregătire pentru examen', meta: '8 min · recapitulare', color: 'module-pink', prompt: 'Creează o sesiune scurtă de pregătire pentru examen. Include un obiectiv clar, un exercițiu, o verificare și un bonus pentru recapitulare.' }
  ];

  const start = async module => {
    setSelected(module.id);
    setLoading(true);
    setSaved(false);
    setSession(null);

    const reply = await chatRequest({
      message: module.prompt,
      conversationId: makeConversationId('learn'),
      subject: userData.profile || 'matematica',
      classLevel: userData.class || 'liceu',
      language: userData.language || 'ro',
      planId: userData.planId || 'free',
      mockReply: `Obiectiv: înțelegi ${module.title.toLowerCase()} în pași simpli. Încălzire: notează 2 lucruri pe care le știi deja. Exercițiu: rezolvă un exemplu scurt și încadrează răspunsul în 3 etape. Verificare: spune cu voce tare ce ai făcut. Bonus: repetă ideea principală într-o propoziție.`
    });

    const plan = parseSessionPlan(reply.response || '');
    setSession({ title: module.title, meta: module.meta, ...plan, raw: reply.response || '', mocked: !!reply.mocked, engine: reply.engine_used || '' });
    setLoading(false);
    if (window.MentorAPI?.logActivity) {
      window.MentorAPI.logActivity({ user_id: userData.email || 'demo_user', type: 'learn_module', note: module.title, meta: { moduleId: module.id, title: module.title } });
    }
  };

  const runDetector = async () => {
    if (!detectText.trim() || detectLoading) return;
    setDetectLoading(true);
    const result = await window.MentorAPI.detect({ text: detectText.trim() });
    if (result.success) {
      setDetectResult(result.data);
      if (window.MentorAPI?.logActivity) {
        window.MentorAPI.logActivity({ user_id: userData.email || 'demo_user', type: 'ai_detect', note: detectText.trim().slice(0, 120), meta: { ai_probability: result.data.ai_probability || 0, verdict: result.data.verdict || '' } });
      }
    } else {
      setDetectResult({ verdict: 'Detector indisponibil', ai_probability: 0 });
    }
    setDetectLoading(false);
  };

  const focusMinutes = userData.dailyHours ? `${Math.max(30, Number(userData.dailyHours) * 30)} min` : '30 min';

  return <main className="screen-page learn-page animate-fadeIn">
    <header className="screen-header">
      <div className="learn-hero">
        <div className="eyebrow">LABORATORUL TĂU</div>
        <h1 className="display-font screen-title">Învață ceva care rămâne.</h1>
        <p className="screen-subtitle">Alege o sesiune scurtă, clară și adaptată profilului tău. Fiecare modul te ghidează pas cu pas.</p>
      </div>
      <div className="learn-hero-stats">
        <span className="learn-chip"><i className="fas fa-fire" /> streak {userData.streak || 0}</span>
        <span className="learn-chip"><i className="fas fa-clock" /> focus {focusMinutes}</span>
      </div>
    </header>

    <section className="learn-dashboard surface">
      <div className="learn-dashboard-copy">
        <div className="eyebrow">Astăzi</div>
        <h2 className="display-font">Un pas mic, dar cu sens.</h2>
        <p>Începe cu un modul, urmărește obiectivul și încheie cu o verificare rapidă pentru a păstra ritmul.</p>
      </div>
      <div className="learn-metrics">
        <div className="learn-metric"><span>Ritmul</span><strong>+{userData.score || 0}%</strong></div>
        <div className="learn-metric"><span>Memorie</span><strong>{Math.max(3, userData.streak || 3)} zile</strong></div>
        <div className="learn-metric"><span>Durată</span><strong>5–8 min</strong></div>
      </div>
    </section>

    <section className="module-grid">
      {modules.map(module => <button key={module.id} type="button" className={`module-card ${module.color} ${selected === module.id ? 'selected' : ''}`} onClick={() => start(module)}>
        <span className="module-icon"><i className={`fas ${module.icon}`} /></span>
        <span className="module-copy">
          <strong>{module.title}</strong>
          <small>{module.meta}</small>
        </span>
        <i className="fas fa-arrow-up-right-from-square module-arrow" />
      </button>)}
    </section>

    {selected && <section className="learning-result surface" aria-busy={loading}>
      {loading ? <>
        <div className="skeleton skeleton-line medium" />
        <div className="skeleton skeleton-line long" />
        <div className="skeleton skeleton-line long" />
      </> : session ? <>
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
          <button type="button" className="accent-button result-action" onClick={() => start(modules.find(item => item.id === selected))}>Generează din nou</button>
        </div>
      </> : <><div className="eyebrow">SESIUNEA TA</div><p>Pregătim acum un plan de lucru clar și eficient.</p></>}
    </section>}

    <section className="surface learn-detector-card">
      <div className="section-heading">
        <div>
          <div className="eyebrow">Detector demo</div>
          <h2 className="display-font">Un scor euristic, nu un verdict.</h2>
        </div>
      </div>
      <p className="detector-demo-note">Folosește lungimea cuvintelor și termeni academici, plus un jitter aleator. Nu este un detector real de conținut AI.</p>
      <textarea
        className="learn-detector-input"
        rows="5"
        value={detectText}
        onChange={e => setDetectText(e.target.value)}
        placeholder="Lipește un text aici pentru scorul demonstrativ..."
      />
      <div className="learning-actions">
        <button type="button" className="accent-button result-action" onClick={runDetector} disabled={detectLoading || !detectText.trim()}>{detectLoading ? 'Analizez...' : 'Rulează demonstrația'}</button>
      </div>
      {detectResult && (
        <div className="learn-detector-result">
          <strong>{detectResult.verdict || 'Rezultat demonstrativ'}</strong>
          <span>Scor demonstrativ: {Number(detectResult.ai_probability || 0).toFixed(0)}% · nu este o probă</span>
          {detectResult.disclaimer && <small>{detectResult.disclaimer}</small>}
        </div>
      )}
    </section>

    <div className="learn-tools-grid">
      <window.FocusTimer userData={userData} onRewardClaim={onRewardClaim} />
      <window.FlashCards userData={userData} presetTopics={modules.map(m => m.title)} onRewardClaim={onRewardClaim} />
    </div>
  </main>;
};

window.ProfessorScreen = ProfessorScreen;
window.LearnScreen = LearnScreen;
