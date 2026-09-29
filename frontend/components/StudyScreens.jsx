import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { GRADES, SUBJECTS, gradeLabel, normalizeGrade, normalizeSubject, subjectLabel } from '../curriculum.js';
import MathText from './MathText.jsx';

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const chatRequest = async ({ message, conversationId, subject, classLevel, language, planId, mockReply }) => {
  const result = await MentorAPI.chat({
    message,
    conversation_id: conversationId,
    subject,
    class_level: classLevel,
    language,
    plan_id: planId
  });
  if (result.success && result.data) {
    return { ...result.data, mocked: !!result.data.engine_mocked };
  }
  return { response: mockReply, mocked: true, engine_used: 'offline' };
};

const MessageBubble = ({ role, children }) => <div className={`mentor-message ${role === 'user' ? 'mentor-message-user' : 'mentor-message-ai'}`}><span className="mentor-message-role">{role === 'user' ? 'Tu' : 'Tutore'}</span><div>{children}</div></div>;
const LoadingMessage = () => <div className="mentor-message mentor-message-ai"><span className="mentor-message-role">Tutore</span><div className="loading-dots"><i /><i /><i /></div></div>;

const ProfessorScreen = ({ userData, studyFocus = {}, onProgress }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const [diagMode, setDiagMode] = useState(false);
  const [micNote, setMicNote] = useState('');
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
      setDraft('');
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

  const toggleMic = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      setMicNote('Microfonul nu e suportat în acest browser. Scrie întrebarea.');
      return;
    }
    setMicNote('');
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    const recognition = new Speech();
    recognition.lang = 'ro-RO';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = event => {
      const text = Array.from(event.results).map(result => result[0].transcript).join(' ').trim();
      if (text) setDraft(text);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const send = async text => {
    const message = text.trim();
    if (!message || loading) return;
    const outgoing = message;
    setDraft('');
    if (diagMode) { await runDiagnostics(outgoing); return; }
    setMessages(previous => [...previous, { role: 'user', content: outgoing }]);
    setLoading(true);
    try {
      const reply = await chatRequest({
        message: outgoing,
        conversationId: conversationId.current,
        subject,
        classLevel,
        language: userData.language || 'ro',
        planId: userData.planId || 'free',
        mockReply: 'Hai să o luăm pe înțelesul tău. Spune-mi mai întâi ce ai încercat și ce ți se pare neclar.'
      });
      setMessages(previous => [...previous, { role: 'assistant', content: reply.response || 'Am primit întrebarea. Hai să o desfacem în pași simpli.', mocked: reply.mocked, engine: reply.engine_used }]);
      if (reply.progress && onProgress) onProgress(reply.progress);
    } catch (error) { setMessages(previous => [...previous, { role: 'assistant', content: 'Nu pot răspunde acum. Încearcă din nou în câteva secunde.' }]); }
    finally { setLoading(false); }
  };

  return <main className="screen-page mentor-page animate-fadeIn">
    <header className="screen-header"><div><div className="eyebrow">TUTORE</div><h1 className="display-font screen-title">Alege materia, apoi întreabă.</h1>
      <p className="screen-subtitle">Răspund doar din lecțiile salvate în aplicație, pentru materia și clasa pe care le alegi. Nu încarc poze și nu apelez un serviciu plătit.</p>
      <p className="mentor-limit">Întrebări cu XP azi: mai ai {userData.mentorLeft ?? 5} din 5 (apoi poți întreba în continuare, fără monede extra).</p>
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
    {diagMode && <div className="diag-banner"><i className="fas fa-circle-info" /> Diagnosticarea verifică memoria locală. Nu se apelează servicii plătite.</div>}
    <section className="mentor-thread surface">{messages.length === 0 && <div className="mentor-empty"><div className="professor-icon"><i className="fas fa-sparkles" /></div><h2 className="display-font">{studyFocus.chapter?.title ? `Hai la „${studyFocus.chapter.title}”.` : 'Cu ce începem?'}</h2><p>{studyFocus.chapter?.title ? 'Întreabă cu un cuvânt din lecție. Răspunsul vine din textul salvat aici.' : `Întrebări din ${subjectLabel(subject)} pentru ${gradeLabel(grade)}. Răspund din lecții, nu dintr-un model plătit.`}</p><div className="suggestion-row"><button onClick={() => send(studyFocus.chapter?.title ? `Explică lecția „${studyFocus.chapter.title}”.` : (subject === 'romana' ? 'Ce este ideea principală?' : 'Ce este o fracție?'))} type="button">Explică lecția</button><button onClick={() => send('Arată-mi doar primul pas din lecție.')} type="button">Primul pas</button><button onClick={() => send(studyFocus.chapter?.title ? `Dă-mi exemplul din lecția „${studyFocus.chapter.title}”.` : 'Dă-mi un exemplu din lecție.')} type="button">Exemplul din lecție</button></div></div>}{messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} role={message.role}>{message.diagnostic ? <pre className={`diag-report ${message.allOk ? 'all-ok' : 'has-issues'}`}>{message.content}</pre> : <MathText text={message.content} />}</MessageBubble>)}{loading && <LoadingMessage />}</section>
    <form className="mentor-composer" onSubmit={event => { event.preventDefault(); send(draft); }}>
      <button type="button" className={`ghost-button composer-tool ${listening ? 'is-live' : ''}`} onClick={toggleMic} aria-label={listening ? 'Oprește microfonul' : 'Vorbește, apoi apasă Enter'}><i className={`fas ${listening ? 'fa-stop' : 'fa-microphone'}`} /></button>
      <div className="composer-field">
        {micNote && <span className="composer-chip">{micNote}</span>}
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder={listening ? 'Te-am auzit. Apasă Enter ca să trimiți.' : (diagMode ? 'Scrie orice, va rula diagnosticarea...' : 'Scrie sau vorbește, apoi Enter…')} aria-label="Întrebarea pentru tutore" />
      </div>
      <button className="accent-button" type="submit" disabled={loading || !draft.trim()} aria-label="Trimite întrebarea"><i className={`fas ${diagMode ? 'fa-stethoscope' : 'fa-arrow-up'}`} /></button>
    </form>
  </main>;
};


export { ProfessorScreen };
