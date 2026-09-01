import { useEffect, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { GRADES, SUBJECTS, gradeLabel, normalizeGrade, normalizeSubject, subjectLabel } from '../curriculum.js';

const makeConversationId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const chatRequest = async ({ message, conversationId, subject, classLevel, language, planId, mockReply, imageBase64 }) => {
  const result = await MentorAPI.chat({
    message,
    conversation_id: conversationId,
    subject,
    class_level: classLevel,
    language,
    plan_id: planId,
    image_base64: imageBase64 || ''
  });
  if (result.success && result.data) {
    return { ...result.data, mocked: !!result.data.engine_mocked };
  }
  return { response: mockReply, mocked: true, engine_used: 'offline' };
};

const MessageBubble = ({ role, children }) => <div className={`mentor-message ${role === 'user' ? 'mentor-message-user' : 'mentor-message-ai'}`}><span className="mentor-message-role">{role === 'user' ? 'Tu' : 'Mentor AI'}</span><div>{children}</div></div>;
const LoadingMessage = () => <div className="mentor-message mentor-message-ai"><span className="mentor-message-role">Mentor AI</span><div className="loading-dots"><i /><i /><i /></div></div>;

const ProfessorScreen = ({ userData, studyFocus = {}, onProgress }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const cameraInput = useRef(null);
  const fileInput = useRef(null);
  const recognitionRef = useRef(null);
  const [diagMode, setDiagMode] = useState(false);
  const [micNote, setMicNote] = useState('');
  const [scanMode, setScanMode] = useState(false);
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

  const readFile = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nu am putut citi fișierul.'));
    reader.readAsDataURL(file);
  });

  const takeAttachment = async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 4_500_000) return;
    if (file.type.startsWith('image/')) {
      const dataUrl = await readFile(file);
      setAttachment({ kind: 'image', name: file.name, dataUrl, base64: dataUrl.split(',')[1] || '' });
      return;
    }
    setAttachment({ kind: 'file', name: file.name, dataUrl: '', base64: '' });
  };

  const toggleMic = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      setMicNote('Microfonul nu e suportat în acest browser. Scrie întrebarea sau fă o poză.');
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
    if ((!message && !attachment) || loading) return;
    const outgoing = scanMode
      ? `Scan temă (doar indicii, primul pas, fără rezolvare gata): ${message || 'Am pus o poză. Arată-mi primul pas, nu rezultatul.'}`
      : (attachment?.kind === 'file'
        ? `${message || 'Am atașat un fișier.'} [${attachment.name}]`
        : (message || 'Am pus o poză la exercițiu. Arată-mi primul pas.'));
    const imageBase64 = attachment?.kind === 'image' ? attachment.base64 : '';
    const preview = attachment?.kind === 'image' ? attachment.dataUrl : '';
    setDraft('');
    setAttachment(null);
    if (diagMode) { await runDiagnostics(outgoing); return; }
    setMessages(previous => [...previous, { role: 'user', content: outgoing, image: preview }]);
    setLoading(true);
    try {
      const reply = await chatRequest({
        message: outgoing,
        conversationId: conversationId.current,
        subject,
        classLevel,
        language: userData.language || 'ro',
        planId: userData.planId || 'free',
        imageBase64,
        mockReply: 'Hai să o luăm pe înțelesul tău. Spune-mi mai întâi ce ai încercat și ce ți se pare neclar.'
      });
      setMessages(previous => [...previous, { role: 'assistant', content: reply.response || 'Am primit întrebarea. Hai să o desfacem în pași simpli.', mocked: reply.mocked, engine: reply.engine_used }]);
      if (reply.progress && onProgress) onProgress(reply.progress);
    } catch (error) { setMessages(previous => [...previous, { role: 'assistant', content: 'Nu pot răspunde acum. Încearcă din nou în câteva secunde.' }]); }
    finally { setLoading(false); }
  };

  return <main className="screen-page mentor-page animate-fadeIn">
    <header className="screen-header"><div><div className="eyebrow">MENTOR DE GIMNAZIU</div><h1 className="display-font screen-title">Alege materia, apoi întreabă.</h1>
      <p className="screen-subtitle">Sunt aici pentru întrebări în plus, o explicație mai pe îndelete sau aceeași idee spusă altfel decât la lecție. Nu lipi tema întreagă: cere primul pas.</p>
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
    {diagMode && <div className="diag-banner"><i className="fas fa-circle-info" /> Mod diagnosticare activ: orice mesaj trimis va verifica memoria și fiecare API (Claude, GPT-4o, Gemini, Wolfram, Mathpix) în loc de un răspuns normal.</div>}
    <section className="mentor-thread surface">{messages.some(m => m.mocked) && <div className="mock-banner"><i className="fas fa-flask" /> Răspunsurile marcate „demo” nu vin de la un model real: cheia API lipsește sau apelul a eșuat.</div>}{messages.length === 0 && <div className="mentor-empty"><div className="professor-icon"><i className="fas fa-sparkles" /></div><h2 className="display-font">{studyFocus.chapter?.title ? `Hai la „${studyFocus.chapter.title}”.` : 'Cu ce începem?'}</h2><p>{studyFocus.chapter?.title ? 'Lecția ți-a dat scheletul. Cere-mi altfel, mai detaliat sau un exemplu nou.' : `Întrebări din ${subjectLabel(subject)} pentru ${gradeLabel(grade)}. Ghidez, nu dau tema gata.`}</p><div className="suggestion-row"><button onClick={() => send(studyFocus.chapter?.title ? `Explică-mi altfel capitolul „${studyFocus.chapter.title}”. Nu relua analogia de data trecută dacă ți-am mai cerut. ${studyFocus.chapter.inOwnWords || ''}` : (subject === 'romana' ? 'Nu înțeleg ideea principală dintr-un text. Cum o caut?' : 'Nu știu de unde să încep o problemă de matematică.'))} type="button">Explică altfel</button><button onClick={() => send('Arată-mi doar primul pas. Nu da rezolvarea.')} type="button">Arată-mi primul pas</button><button onClick={() => send(studyFocus.chapter?.title ? `Un exemplu din viața de zi cu zi pentru „${studyFocus.chapter.title}”, apoi o întrebare scurtă.` : 'Dă-mi un exemplu cotidian, apoi o întrebare scurtă.')} type="button">Un exemplu</button></div></div>}{messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} role={message.role}>{message.image && <img className="mentor-attach-preview" src={message.image} alt="Poză atașată la întrebare" />}{message.diagnostic ? <pre className={`diag-report ${message.allOk ? 'all-ok' : 'has-issues'}`}>{message.content}</pre> : message.content}{message.mocked && <small className="mock-label">Răspuns demo{message.engine ? ` · ${message.engine}` : ''} — nu este generat de un model real</small>}</MessageBubble>)}{loading && <LoadingMessage />}</section>
    <form className="mentor-composer" onSubmit={event => { event.preventDefault(); send(draft); }}>
      <input ref={cameraInput} type="file" accept="image/*" capture="environment" hidden onChange={takeAttachment} />
      <input ref={fileInput} type="file" accept="image/*,application/pdf,.pdf" hidden onChange={takeAttachment} />
      <button type="button" className="ghost-button composer-tool" onClick={() => fileInput.current?.click()} aria-label="Adaugă fișier sau poză din galerie"><i className="fas fa-plus" /></button>
      <button type="button" className={`ghost-button composer-tool ${scanMode ? 'is-live' : ''}`} onClick={() => { setScanMode(v => !v); cameraInput.current?.click(); }} aria-label="Scan temă: poză, doar indicii">{scanMode ? 'Scan temă ON' : ''}<i className="fas fa-camera" /></button>
      <button type="button" className={`ghost-button composer-tool ${listening ? 'is-live' : ''}`} onClick={toggleMic} aria-label={listening ? 'Oprește microfonul' : 'Vorbește, apoi apasă Enter'}><i className={`fas ${listening ? 'fa-stop' : 'fa-microphone'}`} /></button>
      <div className="composer-field">
        {micNote && <span className="composer-chip">{micNote}</span>}
        {attachment && (
          <span className="composer-chip">
            {attachment.kind === 'image' ? <img src={attachment.dataUrl} alt={attachment.name || 'Poză atașată'} className="composer-thumb" /> : attachment.name}
            <button type="button" onClick={() => setAttachment(null)} aria-label="Scoate atașamentul"><i className="fas fa-xmark" /></button>
          </span>
        )}
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder={listening ? 'Te-am auzit. Apasă Enter ca să trimiți.' : (diagMode ? 'Scrie orice, va rula diagnosticarea...' : 'Scrie sau vorbește, apoi Enter…')} aria-label="Întrebarea pentru Mentor AI" />
      </div>
      <button className="accent-button" type="submit" disabled={loading || (!draft.trim() && !attachment)} aria-label="Trimite întrebarea"><i className={`fas ${diagMode ? 'fa-stethoscope' : 'fa-arrow-up'}`} /></button>
    </form>
  </main>;
};


export { ProfessorScreen };
