import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { GRADES, SUBJECTS, gradeLabel, normalizeGrade, normalizeSubject, subjectLabel } from '../curriculum.js';

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const chatRequest = async ({ message, conversationId, subject, classLevel, language, planId, mockReply }) => {
  const result = await MentorAPI.chat({ message, conversation_id: conversationId, subject, class_level: classLevel, language, plan_id: planId });
  if (result.success && result.data) {
    return { ...result.data, mocked: !!result.data.engine_mocked };
  }
  return { response: mockReply, mocked: true, engine_used: 'offline' };
};

const MessageBubble = ({ role, children }) => <div className={`mentor-message ${role === 'user' ? 'mentor-message-user' : 'mentor-message-ai'}`}><span className="mentor-message-role">{role === 'user' ? 'Tu' : 'Mentor AI'}</span><div>{children}</div></div>;
const LoadingMessage = () => <div className="mentor-message mentor-message-ai"><span className="mentor-message-role">Mentor AI</span><div className="loading-dots"><i /><i /><i /></div></div>;

const ProfessorScreen = ({ userData, studyFocus = {} }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagMode, setDiagMode] = useState(false);
  const [subject, setSubject] = useState(normalizeSubject(studyFocus.subject || userData.subject || userData.profile || 'matematica'));
  const [grade, setGrade] = useState(normalizeGrade(studyFocus.grade || userData.class));
  const conversationId = useRef(makeConversationId('mentor'));
  const classLevel = grade;

  useEffect(() => {
    if (studyFocus.subject) setSubject(normalizeSubject(studyFocus.subject));
    if (studyFocus.grade) setGrade(normalizeGrade(studyFocus.grade));
  }, [studyFocus.subject, studyFocus.grade]);

  useEffect(() => {
    conversationId.current = makeConversationId('mentor');
    setMessages([]);
    if (studyFocus.chapter?.title) {
      setDraft(`Ajută-mă la capitolul „${studyFocus.chapter.title}”. ${studyFocus.chapter.inOwnWords || ''}`.trim());
    }
  }, [subject, grade, studyFocus.chapter]);

  const formatDiagnostics = checks => {
    const icon = status => (status === 'ok' ? '✅' : '❌');
    const lines = checks.map(c => `${icon(c.status)} ${c.label} - ${c.status === 'ok' ? 'funcționează' : 'eroare'}${c.detail ? ` (${c.detail})` : ''}`);
    return lines.join('\n');
  };

  const runDiagnostics = async messageText => {
    setMessages(previous => [...previous, { role: 'user', content: messageText }]);
    setLoading(true);
    const result = await MentorAPI.runDiagnostics();
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
    if (MentorAPI.logActivity) {
      MentorAPI.logActivity({ user_id: userData.email || 'demo_user', type: 'mentor_message', note: message, meta: { diagMode } });
    }
    try {
      const reply = await chatRequest({ message, conversationId: conversationId.current, subject, classLevel, language: userData.language || 'ro', planId: userData.planId || 'free', mockReply: 'Hai să o luăm pe înțelesul tău. Spune-mi mai întâi ce ai încercat și ce ți se pare neclar.' });
      setMessages(previous => [...previous, { role: 'assistant', content: reply.response || 'Am primit întrebarea. Hai să o desfacem în pași simpli.', mocked: reply.mocked, engine: reply.engine_used }]);
    } catch (error) { setMessages(previous => [...previous, { role: 'assistant', content: 'Nu pot răspunde acum. Încearcă din nou în câteva secunde.' }]); }
    finally { setLoading(false); }
  };

  return <main className="screen-page mentor-page animate-fadeIn">
    <header className="screen-header"><div><div className="eyebrow">MENTOR DE GIMNAZIU</div><h1 className="display-font screen-title">Alege materia, apoi întreabă.</h1>
      <p className="screen-subtitle">Nu există materie principală. La fiecare conversație alegi română sau matematică și clasa.</p>
      <div className="mentor-subject-picks" role="group" aria-label="Materia">
        {SUBJECTS.map(item => (
          <button
            key={item.id}
            type="button"
            className={`mentor-subject-chip ${subject === item.id ? 'selected' : ''}`}
            onClick={() => setSubject(item.id)}
          >
            <i className={`fas ${item.icon}`} /> {item.labelRo}
          </button>
        ))}
      </div>
      <div className="grade-chip-row mentor-grade-row" aria-label="Clasa">
        {GRADES.map(item => (
          <button key={item} type="button" className={`grade-chip ${grade === item ? 'selected' : ''}`} onClick={() => setGrade(item)}>
            {gradeLabel(item)}
          </button>
        ))}
      </div>
    </div>
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
    <section className="mentor-thread surface">{messages.some(m => m.mocked) && <div className="mock-banner"><i className="fas fa-flask" /> Răspunsurile marcate „demo” nu vin de la un model real: cheia API lipsește sau apelul a eșuat.</div>}{messages.length === 0 && <div className="mentor-empty"><div className="professor-icon"><i className="fas fa-sparkles" /></div><h2 className="display-font">Cu ce începem?</h2><p>Întrebări din {subjectLabel(subject)} pentru {gradeLabel(grade)}. Mentorul ghidează, nu dă tema gata.</p><div className="suggestion-row"><button onClick={() => send(subject === 'romana' ? 'Nu înțeleg ideea principală dintr-un text. Cum o caut?' : 'Nu știu de unde să încep o problemă de matematică.')} type="button">Nu știu de unde să încep</button><button onClick={() => send(subject === 'romana' ? 'Ajută-mă să-mi fac un plan pentru un text scurt.' : 'Explică-mi un concept de clasa mea, fără formulă gata.')} type="button">Fă-mi un plan</button></div></div>}{messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} role={message.role}>{message.diagnostic ? <pre className={`diag-report ${message.allOk ? 'all-ok' : 'has-issues'}`}>{message.content}</pre> : message.content}{message.mocked && <small className="mock-label">Răspuns demo{message.engine ? ` · ${message.engine}` : ''} — nu este generat de un model real</small>}</MessageBubble>)}{loading && <LoadingMessage />}</section>
    <form className="mentor-composer" onSubmit={event => { event.preventDefault(); send(draft); }}><input value={draft} onChange={event => setDraft(event.target.value)} placeholder={diagMode ? 'Scrie orice, va rula diagnosticarea...' : 'Scrie întrebarea ta...'} aria-label="Întrebarea pentru Mentor AI" /><button className="accent-button" type="submit" disabled={loading || !draft.trim()} aria-label="Trimite întrebarea"><i className={`fas ${diagMode ? 'fa-stethoscope' : 'fa-arrow-up'}`} /></button></form>
  </main>;
};


export { ProfessorScreen };
