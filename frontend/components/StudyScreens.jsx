import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import {
  GRADES,
  SUBJECTS,
  gradeLabel,
  normalizeGrade,
  normalizeSubject,
  subjectLabel
} from '../curriculum.js';
import { readSpeechMicContext, speechFailureKind, speechMicNote } from '../speechMic.js';
import {
  activeChat,
  appendMessage,
  chatsForScope,
  ensureActiveChat,
  lessonFromChapter,
  loadTutorChats,
  nameChatsFromLesson,
  renameChat,
  saveTutorChats,
  scopeFromSelection,
  scopeKey,
  selectChat,
  startNewChat
} from '../tutorChats.js';
import MathText from './MathText.jsx';

const chatRequest = async ({
  message,
  conversationId,
  subject,
  classLevel,
  language,
  planId,
  mockReply
}) => {
  const result = await MentorAPI.chat({
    message,
    conversation_id: conversationId,
    subject,
    class_level: classLevel,
    language,
    plan_id: planId
  });
  if (result.rateLimited) {
    return {
      response: result.data?.response || result.error || 'Încearcă din nou peste un minut.',
      mocked: false,
      engine_used: 'rate_limit',
      rateLimited: true
    };
  }
  if (result.success && result.data) {
    return { ...result.data, mocked: !!result.data.engine_mocked };
  }
  return { response: mockReply, mocked: true, engine_used: 'offline' };
};

const MessageBubble = ({ role, children }) => (
  <div
    className={`mentor-message ${role === 'user' ? 'mentor-message-user' : 'mentor-message-ai'}`}
  >
    <span className="mentor-message-role">{role === 'user' ? 'Tu' : 'Tutore'}</span>
    <div>{children}</div>
  </div>
);

const LoadingMessage = () => (
  <div className="mentor-message mentor-message-ai">
    <span className="mentor-message-role">Tutore</span>
    <div className="loading-dots">
      <i />
      <i />
      <i />
    </div>
  </div>
);

function samePin(left, right) {
  if (!left && !right) return true;
  if (!left || !right) return false;
  return left.id === right.id && left.title === right.title && left.subject === right.subject;
}

function pinFromFocus(chapter, subject) {
  const lesson = lessonFromChapter(chapter);
  if (!lesson) return null;
  return { ...lesson, subject: normalizeSubject(subject) };
}

function TutorChatsBar({
  chats,
  activeId,
  renaming,
  draft,
  loading,
  onDraft,
  onNew,
  onOpen,
  onBeginRename,
  onSaveRename,
  onCancelRename
}) {
  const selectedRef = useRef(null);
  const skipSave = useRef(false);
  const current = chats.find((chat) => chat.id === activeId) || null;

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }, [activeId]);

  const save = (event) => {
    event?.preventDefault();
    onSaveRename(draft);
  };

  return (
    <div className="mentor-chats-wrap">
      <div className="mentor-chats">
        <button
          type="button"
          className="accent-button mentor-chat-new"
          onClick={onNew}
          disabled={loading}
        >
          <i className="fas fa-plus" aria-hidden="true" /> Chat nou
        </button>
        <div className="mentor-chat-list" role="list" aria-label="Chat-urile tale">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              role="listitem"
              ref={chat.id === activeId ? selectedRef : null}
              className={`mentor-chat-open ${chat.id === activeId ? 'selected' : ''}`}
              aria-current={chat.id === activeId ? 'true' : undefined}
              onClick={() => onOpen(chat.id)}
              disabled={loading && chat.id !== activeId}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>
      {current &&
        (renaming ? (
          <form className="mentor-rename-row" onSubmit={save}>
            <label className="mentor-rename-label" htmlFor="mentor-chat-title">
              Numele chatului
            </label>
            <input
              id="mentor-chat-title"
              value={draft}
              maxLength={42}
              autoFocus
              onChange={(event) => onDraft(event.target.value)}
              onBlur={() => {
                if (skipSave.current) {
                  skipSave.current = false;
                  return;
                }
                onSaveRename(draft);
              }}
              aria-label="Numele chatului"
            />
            <button className="accent-button mentor-rename-save" type="submit">
              Gata
            </button>
            <button
              type="button"
              className="ghost-button mentor-rename-cancel"
              onPointerDown={() => {
                skipSave.current = true;
              }}
              onClick={onCancelRename}
            >
              Renunță
            </button>
          </form>
        ) : (
          <div className="mentor-chat-title-row">
            <strong className="mentor-chat-heading">{current.title}</strong>
            <button
              type="button"
              className="ghost-button mentor-chat-rename"
              onClick={onBeginRename}
            >
              Schimbă numele
            </button>
          </div>
        ))}
    </div>
  );
}

const ProfessorScreen = ({ userData, studyFocus = {}, onProgress }) => {
  const owner = String(userData?.email || userData?.username || '')
    .trim()
    .toLowerCase();
  const [bundle, setBundle] = useState(() => ({
    owner,
    state: loadTutorChats({ owner })
  }));
  const stateRef = useRef(bundle.state);
  const sendingRef = useRef(false);
  const ownerRef = useRef(owner);
  ownerRef.current = owner;
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const micSessionRef = useRef(0);
  const micStopRef = useRef(false);
  const [diagMode, setDiagMode] = useState(false);
  const [micNote, setMicNote] = useState('');
  const [subject, setSubject] = useState(
    normalizeSubject(studyFocus.subject || userData.subject || userData.profile || 'matematica')
  );
  const [grade, setGrade] = useState(normalizeGrade(studyFocus.grade || userData.class));
  const [pinnedLesson, setPinnedLesson] = useState(() =>
    pinFromFocus(studyFocus.chapter, studyFocus.subject || userData.subject || userData.profile)
  );
  const [rename, setRename] = useState(null);
  const commit = useCallback((updater) => {
    const current = stateRef.current;
    const next = typeof updater === 'function' ? updater(current) : updater;
    if (!next || next === current) return current;
    stateRef.current = next;
    saveTutorChats(next, { owner: ownerRef.current });
    setBundle({ owner: ownerRef.current, state: next });
    return next;
  }, []);

  useEffect(() => {
    if (bundle.owner === owner) return;
    const state = loadTutorChats({ owner });
    stateRef.current = state;
    setBundle({ owner, state });
  }, [owner, bundle.owner]);

  useEffect(() => {
    if (studyFocus.subject) setSubject(normalizeSubject(studyFocus.subject));
    if (studyFocus.grade) setGrade(normalizeGrade(studyFocus.grade));
    const next = pinFromFocus(
      studyFocus.chapter,
      studyFocus.subject || userData.subject || userData.profile
    );
    setPinnedLesson((prev) => (samePin(prev, next) ? prev : next));
  }, [
    studyFocus.subject,
    studyFocus.grade,
    studyFocus.chapter,
    userData.subject,
    userData.profile
  ]);

  const scope = useMemo(
    () => scopeFromSelection({ subject, grade, lesson: pinnedLesson }),
    [subject, grade, pinnedLesson]
  );
  const scopeRef = useRef(scope);
  scopeRef.current = scope;
  const scopeId = scopeKey(scope);

  useEffect(() => {
    commit((state) => nameChatsFromLesson(state, scope));
  }, [commit, scope]);

  useEffect(() => {
    setRename(null);
  }, [scopeId]);

  const visibleChats = chatsForScope(bundle.state, scope);
  const current = activeChat(bundle.state, scope);
  const messages = current?.messages || [];
  const lessonTitle = scope.lessonTitle;

  const formatDiagnostics = (checks) => {
    const icon = (status) => (status === 'ok' ? '✅' : '❌');
    const lines = checks.map(
      (c) =>
        `${icon(c.status)} ${c.label} - ${c.status === 'ok' ? 'funcționează' : 'eroare'}${c.detail ? ` (${c.detail})` : ''}`
    );
    return lines.join('\n');
  };

  const remember = (chatId, message) => {
    commit((state) => appendMessage(state, chatId, message));
  };

  const openForSend = () => {
    let chatId = '';
    let conversationId = '';
    commit((state) => {
      const ensured = ensureActiveChat(state, scopeRef.current);
      chatId = ensured.chat?.id || '';
      conversationId = ensured.chat?.conversationId || '';
      return ensured.state;
    });
    return { chatId, conversationId };
  };

  const runDiagnostics = async (messageText) => {
    const { chatId } = openForSend();
    if (chatId) remember(chatId, { role: 'user', content: messageText });
    setLoading(true);
    const result = await MentorAPI.runDiagnostics();
    if (chatId) {
      if (result.success && result.data?.checks) {
        remember(chatId, {
          role: 'assistant',
          content: formatDiagnostics(result.data.checks),
          diagnostic: true,
          allOk: result.data.all_ok
        });
      } else {
        remember(chatId, {
          role: 'assistant',
          content:
            '❌ Nu am putut contacta backend-ul pentru diagnosticare. Serverul e probabil offline.',
          diagnostic: true,
          allOk: false
        });
      }
    }
    setLoading(false);
  };

  const showMicFailure = (session, kind) => {
    if (micSessionRef.current !== session || !kind) return;
    setListening(false);
    setMicNote(speechMicNote(kind));
  };

  const toggleMic = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      setMicNote(speechMicNote('missing'));
      return;
    }
    if (listening && recognitionRef.current) {
      micStopRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {
        /* recunoașterea se oprise deja */
      }
      setListening(false);
      return;
    }
    const session = micSessionRef.current + 1;
    micSessionRef.current = session;
    micStopRef.current = false;
    setMicNote('');
    let heard = false;
    let failed = false;
    const recognition = new Speech();
    recognition.lang = 'ro-RO';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      if (micSessionRef.current !== session) return;
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();
      if (!text) return;
      heard = true;
      setMicNote('');
      setDraft(text);
    };
    recognition.onerror = (event) => {
      if (micSessionRef.current !== session) return;
      const code = event?.error || '';
      if (code === 'aborted') {
        if (!micStopRef.current) {
          failed = true;
          showMicFailure(session, 'failed');
        }
        return;
      }
      failed = true;
      setListening(false);
      if (code === 'no-speech') {
        if (!micStopRef.current) showMicFailure(session, 'no-speech');
        return;
      }
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        readSpeechMicContext()
          .then((context) => showMicFailure(session, speechFailureKind(code, context)))
          .catch(() => showMicFailure(session, 'blocked'));
        return;
      }
      showMicFailure(session, speechFailureKind(code));
    };
    recognition.onend = () => {
      if (micSessionRef.current !== session) return;
      setListening(false);
      if (micStopRef.current || heard || failed) return;
      showMicFailure(session, 'no-speech');
    };
    recognitionRef.current = recognition;
    setListening(true);
    try {
      recognition.start();
    } catch {
      failed = true;
      showMicFailure(session, 'blocked');
    }
  };

  const send = async (text, options = {}) => {
    const message = String(text || '').trim();
    if (!message || loading || sendingRef.current) return;
    const outgoing = message;
    if (!options.keepDraft) setDraft('');
    if (diagMode && !options.forceChat) {
      await runDiagnostics(outgoing);
      return;
    }
    sendingRef.current = true;
    const scopeNow = scopeRef.current;
    let chatId = '';
    let conversationId = '';
    commit((state) => {
      const ensured = ensureActiveChat(state, scopeNow);
      chatId = ensured.chat?.id || '';
      conversationId = ensured.chat?.conversationId || '';
      if (!chatId) return state;
      return appendMessage(ensured.state, chatId, { role: 'user', content: outgoing });
    });
    setLoading(true);
    try {
      const reply = await chatRequest({
        message: outgoing,
        conversationId,
        subject: scopeNow.subject,
        classLevel: scopeNow.grade,
        language: userData.language || 'ro',
        planId: userData.planId || 'free',
        mockReply:
          'Hai să o luăm pe înțelesul tău. Spune-mi mai întâi ce ai încercat și ce ți se pare neclar.'
      });
      if (chatId) {
        remember(chatId, {
          role: 'assistant',
          content: reply.response || 'Am primit întrebarea. Hai să o desfacem în pași simpli.',
          mocked: reply.mocked,
          engine: reply.engine_used
        });
      }
      if (reply.progress && onProgress) onProgress(reply.progress);
    } catch {
      if (chatId)
        remember(chatId, {
          role: 'assistant',
          content: 'Nu pot răspunde acum. Încearcă din nou în câteva secunde.'
        });
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  };

  const askSimpler = () => send('Nu am înțeles', { keepDraft: true, forceChat: true });

  const beginRename = () => {
    if (!current) return;
    setRename({ id: current.id, draft: current.title });
  };

  const saveRename = (value) => {
    if (!rename) return;
    commit((state) => renameChat(state, rename.id, value));
    setRename(null);
  };

  const startChat = () => {
    commit((state) => startNewChat(state, scopeRef.current));
    setRename(null);
  };

  const openChat = (id) => {
    commit((state) => selectChat(state, scopeRef.current, id));
    setRename(null);
  };

  const explainPrompt = lessonTitle
    ? `Explică lecția „${lessonTitle}”.`
    : subject === 'romana'
      ? 'Ce este ideea principală?'
      : 'Ce este o fracție?';
  const examplePrompt = lessonTitle
    ? `Dă-mi exemplul din lecția „${lessonTitle}”.`
    : 'Dă-mi un exemplu din lecție.';

  return (
    <main className="screen-page mentor-page animate-fadeIn">
      <header className="screen-header">
        <div>
          <div className="eyebrow">TUTORE</div>
          <h1 className="display-font screen-title">Alege materia, apoi întreabă.</h1>
          <p className="screen-subtitle">
            Răspund doar din lecțiile salvate în aplicație, pentru materia și clasa pe care le
            alegi. Nu încarc poze și nu apelez un serviciu plătit.
          </p>
          <p className="mentor-limit">
            Întrebări cu XP azi: mai ai {userData.mentorLeft ?? 5} din 5 (apoi poți întreba în
            continuare, fără monede extra).
          </p>
          <div className="mentor-subject-picks" role="group" aria-label="Materia">
            {SUBJECTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mentor-subject-chip ${subject === item.id ? 'selected' : ''}`}
                onClick={() => {
                  setSubject(item.id);
                  const fromFocus = pinFromFocus(studyFocus.chapter, studyFocus.subject || item.id);
                  if (fromFocus && fromFocus.subject === item.id) {
                    setPinnedLesson(fromFocus);
                    return;
                  }
                  setPinnedLesson((prev) => (prev && prev.subject === item.id ? prev : null));
                }}
              >
                <i className={`fas ${item.icon}`} /> {item.labelRo}
              </button>
            ))}
          </div>
          <div className="grade-chip-row mentor-grade-row" aria-label="Clasa">
            {GRADES.map((item) => (
              <button
                key={item}
                type="button"
                className={`grade-chip ${grade === item ? 'selected' : ''}`}
                onClick={() => setGrade(item)}
              >
                {gradeLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <div className="mentor-header-actions">
          <button
            type="button"
            onClick={() => setDiagMode((d) => !d)}
            className={`memory-pill diag-toggle ${diagMode ? 'active' : ''}`}
            aria-pressed={diagMode}
            title="Verifică status-ul memoriei și al fiecărui API"
          >
            <i className="fas fa-stethoscope" /> {diagMode ? 'Diagnosticare: ON' : 'Diagnosticare'}
          </button>
          <span className="memory-pill">
            <i className="fas fa-brain" /> Memorie activă
          </span>
          {messages.some((m) => m.mocked) && (
            <span className="memory-pill mock-mode-pill">
              <i className="fas fa-flask" /> Mod demo
            </span>
          )}
        </div>
      </header>
      {diagMode && (
        <div className="diag-banner">
          <i className="fas fa-circle-info" /> Diagnosticarea verifică memoria locală. Nu se
          apelează servicii plătite.
        </div>
      )}
      <TutorChatsBar
        chats={visibleChats}
        activeId={current?.id || ''}
        renaming={Boolean(rename && rename.id === current?.id)}
        draft={rename?.draft || ''}
        loading={loading}
        onDraft={(value) => setRename((prev) => (prev ? { ...prev, draft: value } : prev))}
        onNew={startChat}
        onOpen={openChat}
        onBeginRename={beginRename}
        onSaveRename={saveRename}
        onCancelRename={() => setRename(null)}
      />
      <section className="mentor-thread surface" aria-busy={loading}>
        {messages.length === 0 && (
          <div className="mentor-empty">
            <div className="professor-icon">
              <i className="fas fa-sparkles" />
            </div>
            <h2 className="display-font">
              {lessonTitle ? `Hai la „${lessonTitle}”.` : 'Cu ce începem?'}
            </h2>
            <p>
              {lessonTitle
                ? 'Întreabă cu un cuvânt din lecție. Răspunsul vine din textul salvat aici.'
                : `Întrebări din ${subjectLabel(subject)} pentru ${gradeLabel(grade)}. Răspund din lecții, nu dintr-un model plătit.`}
            </p>
            <div className="suggestion-row">
              <button onClick={() => send(explainPrompt)} type="button">
                Explică lecția
              </button>
              <button onClick={() => send('Arată-mi doar primul pas din lecție.')} type="button">
                Primul pas
              </button>
              <button onClick={() => send(examplePrompt)} type="button">
                Exemplul din lecție
              </button>
            </div>
          </div>
        )}
        {messages.map((message, index) => {
          const latestTutor =
            message.role === 'assistant' &&
            !message.diagnostic &&
            !messages
              .slice(index + 1)
              .some((item) => item.role === 'assistant' && !item.diagnostic);
          const bubble = (
            <MessageBubble role={message.role}>
              {message.diagnostic ? (
                <pre className={`diag-report ${message.allOk ? 'all-ok' : 'has-issues'}`}>
                  {message.content}
                </pre>
              ) : (
                <MathText text={message.content} />
              )}
            </MessageBubble>
          );
          if (!latestTutor) {
            return <div key={`${current?.id || 'chat'}-${index}`}>{bubble}</div>;
          }
          return (
            <div key={`${current?.id || 'chat'}-${index}`} className="mentor-reply-with-help">
              {bubble}
              <button
                type="button"
                className="ghost-button mentor-unclear"
                onClick={askSimpler}
                disabled={loading}
              >
                Nu am înțeles
              </button>
            </div>
          );
        })}
        {loading && <LoadingMessage />}
      </section>
      <form
        className="mentor-composer"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <button
          type="button"
          className={`ghost-button composer-tool ${listening ? 'is-live' : ''}`}
          onClick={toggleMic}
          aria-label={listening ? 'Oprește microfonul' : 'Vorbește, apoi apasă Enter'}
        >
          <i className={`fas ${listening ? 'fa-stop' : 'fa-microphone'}`} />
        </button>
        <div className="composer-field">
          {micNote && (
            <span className="composer-chip" role="status">
              {micNote}
            </span>
          )}
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              listening
                ? 'Te-am auzit. Apasă Enter ca să trimiți.'
                : diagMode
                  ? 'Scrie orice, va rula diagnosticarea...'
                  : 'Scrie sau vorbește, apoi Enter…'
            }
            aria-label="Întrebarea pentru tutore"
          />
        </div>
        <button
          className="accent-button"
          type="submit"
          disabled={loading || !draft.trim()}
          aria-label="Trimite întrebarea"
        >
          <i className={`fas ${diagMode ? 'fa-stethoscope' : 'fa-arrow-up'}`} />
        </button>
      </form>
    </main>
  );
};

export { ProfessorScreen };
