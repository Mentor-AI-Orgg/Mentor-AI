import { normalizeGrade, normalizeSubject } from './curriculum.js';

// Chat-urile stau pe aparat, legate de lecție sau, dacă nu e lecție, de materie.
// Mesajele vechi rămân într-un singur chat: nu se șterg și nu se amestecă.

const TITLE_MAX = 42;
const CONTENT_MAX = 8000;
const MAX_MESSAGES = 200;
const PLACEHOLDER_TITLE = 'Chat nou';

function isPlaceholderTitle(title) {
  return title === PLACEHOLDER_TITLE || /^Chat nou \d+$/.test(String(title || ''));
}

function tutorChatStorageKey(owner) {
  const id = String(owner || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._+-]/g, '')
    .slice(0, 80);
  return id ? `mentor_tutor_chats_v1:${id}` : 'mentor_tutor_chats_v1:local';
}

function emptyState() {
  return { version: 1, chats: [], activeByScope: {} };
}

function withoutControls(text, asSpace) {
  let out = '';
  const raw = String(text || '');
  for (let index = 0; index < raw.length; index += 1) {
    const code = raw.charCodeAt(index);
    if (code === 10 || code === 13) {
      if (asSpace) out += ' ';
      else if (code === 10) out += '\n';
      continue;
    }
    if (code < 32 || code === 127) {
      if (asSpace) out += ' ';
      continue;
    }
    out += raw[index];
  }
  return out;
}

function clipTitle(text) {
  const clean = withoutControls(text, true).replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= TITLE_MAX) return clean;
  const cut = clean.slice(0, TITLE_MAX - 1);
  const space = cut.lastIndexOf(' ');
  const base = space >= 12 ? cut.slice(0, space) : cut;
  return `${base.trim()}…`;
}

function defaultTitle({ lessonTitle, firstQuestion } = {}) {
  return clipTitle(lessonTitle) || clipTitle(firstQuestion) || PLACEHOLDER_TITLE;
}

function uniqueTitle(title, taken) {
  const base = title || PLACEHOLDER_TITLE;
  const used = new Set(taken.filter(Boolean));
  if (!used.has(base)) return base;
  let n = 2;
  while (used.has(`${base} ${n}`)) n += 1;
  const candidate = `${base} ${n}`;
  return candidate.length <= TITLE_MAX ? candidate : clipTitle(candidate);
}

function scopeKey(scope = {}) {
  const subject = normalizeSubject(scope.subject);
  const lessonId = String(scope.lessonId || '').trim();
  return lessonId ? `lectie:${subject}:${lessonId}` : `materie:${subject}`;
}

function lessonFromChapter(chapter) {
  if (chapter == null || chapter === '') return null;
  if (typeof chapter === 'string' || typeof chapter === 'number') {
    const id = String(chapter).trim();
    return id ? { id, title: '' } : null;
  }
  if (typeof chapter === 'object') {
    const id = String(chapter.id ?? '').trim();
    if (!id) return null;
    return { id, title: String(chapter.title || '').trim() };
  }
  return null;
}

function scopeFromSelection({ subject, grade, lesson } = {}) {
  const sid = normalizeSubject(subject);
  const pinned = lesson && normalizeSubject(lesson.subject || sid) === sid ? lesson : null;
  return {
    subject: sid,
    grade: normalizeGrade(grade),
    lessonId: pinned ? String(pinned.id || '').trim() : '',
    lessonTitle: pinned ? String(pinned.title || '').trim() : ''
  };
}

function makeId(prefix, now = Date.now()) {
  return `${prefix}_${now}_${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeMessage(message) {
  if (!message || typeof message !== 'object') return null;
  const role = message.role === 'user' || message.role === 'assistant' ? message.role : '';
  if (!role) return null;
  const content = withoutControls(message.content, false).replace(/\n{3,}/g, '\n\n').trim();
  if (!content) return null;
  const next = { role, content: content.slice(0, CONTENT_MAX) };
  if (message.diagnostic) next.diagnostic = true;
  if (message.allOk === true || message.allOk === false) next.allOk = message.allOk;
  if (message.mocked) next.mocked = true;
  if (message.engine) next.engine = String(message.engine).slice(0, 40);
  return next;
}

function normalizeProblem(problem) {
  if (!problem || typeof problem !== 'object') return null;
  const source = String(problem.source || '').trim();
  const id = String(problem.id || '').trim();
  const allowed = new Set(['quiz', 'flashcard', 'en', 'step', 'mistake']);
  if (!allowed.has(source) || !id) return null;
  const prompt = withoutControls(problem.prompt, true).replace(/\s+/g, ' ').trim().slice(0, 500);
  return {
    source,
    id: id.slice(0, 160),
    sessionId: String(problem.sessionId || '').trim().slice(0, 80),
    paperId: String(problem.paperId || '').trim().slice(0, 120),
    prompt,
    lessonId: String(problem.lessonId || '').trim().slice(0, 80),
    lessonTitle: clipTitle(problem.lessonTitle || '')
  };
}

function problemKey(problem) {
  if (!problem?.id) return '';
  return `${problem.source}:${problem.id}:${problem.sessionId || ''}:${problem.paperId || ''}`;
}

function normalizeChat(chat) {
  if (!chat || typeof chat !== 'object') return null;
  const id = String(chat.id || '').trim();
  if (!id) return null;
  const subject = normalizeSubject(chat.subject);
  const lessonId = String(chat.lessonId || '')
    .trim()
    .slice(0, 80);
  const lessonTitle = clipTitle(chat.lessonTitle || '');
  const messages = (Array.isArray(chat.messages) ? chat.messages : [])
    .map(normalizeMessage)
    .filter(Boolean);
  const firstQuestion = messages.find((item) => item.role === 'user')?.content || '';
  let title = clipTitle(chat.title || '');
  if (!title) title = defaultTitle({ lessonTitle, firstQuestion });
  const problem = normalizeProblem(chat.problem);
  const next = {
    id: id.slice(0, 80),
    conversationId: String(chat.conversationId || id).slice(0, 80),
    title,
    titleCustom: Boolean(chat.titleCustom),
    subject,
    grade: normalizeGrade(chat.grade),
    lessonId,
    lessonTitle,
    messages,
    createdAt: Number(chat.createdAt) || 0,
    updatedAt: Number(chat.updatedAt) || 0
  };
  if (problem) next.problem = problem;
  return next;
}

function normalizeState(state) {
  const source = state && typeof state === 'object' ? state : emptyState();
  const chats = (Array.isArray(source.chats) ? source.chats : [])
    .map(normalizeChat)
    .filter(Boolean);
  const known = new Set(chats.map((chat) => chat.id));
  const activeByScope = {};
  const rawActive =
    source.activeByScope && typeof source.activeByScope === 'object' ? source.activeByScope : {};
  Object.entries(rawActive).forEach(([key, chatId]) => {
    const id = String(chatId || '');
    if (known.has(id)) activeByScope[String(key)] = id;
  });
  return { version: 1, chats, activeByScope };
}

function chatsForScope(state, scope) {
  const key = scopeKey(scope);
  const chats = Array.isArray(state?.chats) ? state.chats : [];
  return chats
    .filter((chat) => chat && scopeKey(chat) === key)
    .slice()
    .sort((a, b) => a.createdAt - b.createdAt || String(a.id).localeCompare(String(b.id)));
}

function activeChat(state, scope) {
  const list = chatsForScope(state, scope);
  if (!list.length) return null;
  const chosen = state?.activeByScope?.[scopeKey(scope)];
  return list.find((chat) => chat.id === chosen) || list[list.length - 1];
}

function selectChat(state, scope, chatId) {
  const list = chatsForScope(state, scope);
  if (!list.some((chat) => chat.id === chatId)) return state;
  const key = scopeKey(scope);
  if (state?.activeByScope?.[key] === chatId) return state;
  return {
    version: 1,
    chats: state.chats,
    activeByScope: { ...state.activeByScope, [key]: chatId }
  };
}

function startNewChat(state, scope = {}, options = {}) {
  const base = normalizeState(state);
  const list = chatsForScope(base, scope);
  const active = activeChat(base, scope);
  if (active && active.messages.length === 0 && !active.titleCustom)
    return state?.chats ? state : base;
  const blank = list.find((chat) => chat.messages.length === 0 && !chat.titleCustom);
  if (blank) return selectChat(base, scope, blank.id);

  const now = options.now || Date.now();
  const lessonTitle = clipTitle(scope.lessonTitle || '');
  const title = uniqueTitle(
    lessonTitle || PLACEHOLDER_TITLE,
    list.map((chat) => chat.title)
  );
  const chat = {
    id: String(options.id || makeId('chat', now)).slice(0, 80),
    conversationId: String(options.conversationId || makeId('mentor', now)).slice(0, 80),
    title,
    titleCustom: false,
    subject: normalizeSubject(scope.subject),
    grade: normalizeGrade(scope.grade),
    lessonId: String(scope.lessonId || '')
      .trim()
      .slice(0, 80),
    lessonTitle,
    messages: [],
    createdAt: now,
    updatedAt: now
  };
  return {
    version: 1,
    chats: [...base.chats, chat],
    activeByScope: { ...base.activeByScope, [scopeKey(scope)]: chat.id }
  };
}

function openProblemChat(state, scope = {}, problem, options = {}) {
  const base = normalizeState(state);
  const linked = normalizeProblem(problem);
  if (!linked) return state?.chats ? state : base;
  const key = problemKey(linked);
  const existing = chatsForScope(base, scope).find((chat) => problemKey(chat.problem) === key);
  if (existing) return selectChat(base, scope, existing.id);

  const now = options.now || Date.now();
  const lessonTitle = clipTitle(scope.lessonTitle || linked.lessonTitle || '');
  const title = uniqueTitle(
    clipTitle(linked.prompt) || lessonTitle || 'Exercițiul din test',
    chatsForScope(base, scope).map((chat) => chat.title)
  );
  const chat = {
    id: String(options.id || makeId('chat', now)).slice(0, 80),
    conversationId: String(options.conversationId || makeId('mentor', now)).slice(0, 80),
    title,
    titleCustom: true,
    subject: normalizeSubject(scope.subject),
    grade: normalizeGrade(scope.grade),
    lessonId: String(scope.lessonId || '').trim().slice(0, 80),
    lessonTitle,
    problem: linked,
    messages: [],
    createdAt: now,
    updatedAt: now
  };
  return {
    version: 1,
    chats: [...base.chats, chat],
    activeByScope: { ...base.activeByScope, [scopeKey(scope)]: chat.id }
  };
}

function ensureActiveChat(state, scope) {
  const current = activeChat(state, scope);
  if (current) return { state, chat: current };
  const next = startNewChat(state, scope);
  return { state: next, chat: activeChat(next, scope) };
}

function siblingTitles(chats, chat) {
  return chats
    .filter((item) => item.id !== chat.id && scopeKey(item) === scopeKey(chat))
    .map((item) => item.title);
}

function appendMessage(state, chatId, message, options = {}) {
  const incoming = normalizeMessage(message);
  if (!incoming || !state?.chats) return state;
  const now = options.now || Date.now();
  let found = false;
  const chats = state.chats.map((chat) => {
    if (chat.id !== chatId) return chat;
    found = true;
    const priorUser = chat.messages.some((item) => item.role === 'user');
    let title = chat.title;
    if (incoming.role === 'user' && !chat.titleCustom && !chat.lessonId && !priorUser) {
      const fromQuestion = clipTitle(incoming.content);
      if (fromQuestion) title = uniqueTitle(fromQuestion, siblingTitles(state.chats, chat));
    }
    const messages = [...chat.messages, incoming];
    return {
      ...chat,
      title,
      messages: messages.length > MAX_MESSAGES ? messages.slice(-MAX_MESSAGES) : messages,
      updatedAt: now
    };
  });
  if (!found) return state;
  return { version: 1, chats, activeByScope: state.activeByScope };
}

function renameChat(state, chatId, rawTitle, options = {}) {
  const title = clipTitle(rawTitle);
  if (!title || !state?.chats) return state;
  const now = options.now || Date.now();
  let changed = false;
  const chats = state.chats.map((chat) => {
    if (chat.id !== chatId) return chat;
    if (chat.title === title) return chat;
    changed = true;
    return { ...chat, title, titleCustom: true, updatedAt: now };
  });
  if (!changed) return state;
  return { version: 1, chats, activeByScope: state.activeByScope };
}

function nameChatsFromLesson(state, scope = {}) {
  const lessonTitle = clipTitle(scope.lessonTitle || '');
  const lessonId = String(scope.lessonId || '').trim();
  if (!lessonTitle || !lessonId || !state?.chats) return state;
  const key = scopeKey({ ...scope, lessonId });
  let changed = false;
  const used = [];
  const chats = state.chats.map((chat) => {
    if (scopeKey(chat) !== key) return chat;
    if (chat.titleCustom || !isPlaceholderTitle(chat.title)) {
      used.push(chat.title);
      if (chat.lessonTitle !== lessonTitle) {
        changed = true;
        return { ...chat, lessonTitle };
      }
      return chat;
    }
    const title = uniqueTitle(lessonTitle, used);
    used.push(title);
    if (chat.title === title && chat.lessonTitle === lessonTitle) return chat;
    changed = true;
    return { ...chat, title, lessonTitle };
  });
  if (!changed) return state;
  return { version: 1, chats, activeByScope: state.activeByScope };
}

function messageSignature(messages) {
  return messages.map((item) => `${item.role}\u0000${item.content}`).join('\n');
}

function adoptExistingMessages(state, messages, scope = {}, options = {}) {
  const base = normalizeState(state);
  const clean = (Array.isArray(messages) ? messages : []).map(normalizeMessage).filter(Boolean);
  if (!clean.length) return state?.chats ? state : base;
  const signature = messageSignature(clean);
  if (base.chats.some((chat) => messageSignature(chat.messages) === signature))
    return state?.chats ? state : base;

  const now = options.now || Date.now();
  const lessonTitle = clipTitle(scope.lessonTitle || '');
  const firstQuestion = clean.find((item) => item.role === 'user')?.content || '';
  const active = activeChat(base, scope);
  if (active && active.messages.length === 0) {
    const title = active.titleCustom
      ? active.title
      : uniqueTitle(
          defaultTitle({ lessonTitle, firstQuestion }),
          siblingTitles(base.chats, active)
        );
    return {
      version: 1,
      activeByScope: base.activeByScope,
      chats: base.chats.map((chat) =>
        chat.id === active.id
          ? {
              ...chat,
              title,
              lessonTitle: lessonTitle || chat.lessonTitle,
              messages: clean,
              updatedAt: now
            }
          : chat
      )
    };
  }

  const scoped = chatsForScope(base, scope);
  const title = uniqueTitle(
    defaultTitle({ lessonTitle, firstQuestion }) || 'Chatul vechi',
    scoped.map((chat) => chat.title)
  );
  const chat = {
    id: String(options.id || makeId('chat', now)).slice(0, 80),
    conversationId: String(
      scope.conversationId || options.conversationId || makeId('mentor', now)
    ).slice(0, 80),
    title,
    titleCustom: false,
    subject: normalizeSubject(scope.subject),
    grade: normalizeGrade(scope.grade),
    lessonId: String(scope.lessonId || '')
      .trim()
      .slice(0, 80),
    lessonTitle,
    messages: clean,
    createdAt: now,
    updatedAt: now
  };
  const key = scopeKey(scope);
  const activeByScope = { ...base.activeByScope };
  if (!activeByScope[key]) activeByScope[key] = chat.id;
  return { version: 1, chats: [...base.chats, chat], activeByScope };
}

function parseStored(raw) {
  if (Array.isArray(raw))
    return adoptExistingMessages(emptyState(), raw, { subject: 'matematica' });
  if (!raw || typeof raw !== 'object') return emptyState();
  if (Array.isArray(raw.chats)) {
    const state = normalizeState(raw);
    if (!state.chats.length && Array.isArray(raw.messages) && raw.messages.length) {
      return adoptExistingMessages(state, raw.messages, raw);
    }
    return state;
  }
  if (Array.isArray(raw.messages)) return adoptExistingMessages(emptyState(), raw.messages, raw);
  return emptyState();
}

function browserStorage() {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* storage indisponibil */
  }
  return null;
}

function loadTutorChats({ storage, owner } = {}) {
  const store = storage || browserStorage();
  if (!store) return emptyState();
  const key = tutorChatStorageKey(owner);
  try {
    const raw = store.getItem(key);
    if (raw) return parseStored(JSON.parse(raw));
    const localKey = tutorChatStorageKey('');
    if (key === localKey) return emptyState();
    const legacy = store.getItem(localKey);
    if (!legacy) return emptyState();
    const parsed = parseStored(JSON.parse(legacy));
    if (!parsed.chats.length) return emptyState();
    saveTutorChats(parsed, { storage: store, owner });
    try {
      store.removeItem(localKey);
    } catch {
      /* copia de pe cont e deja scrisă */
    }
    return parsed;
  } catch {
    return emptyState();
  }
}

function saveTutorChats(state, { storage, owner } = {}) {
  const store = storage || browserStorage();
  if (!store) return;
  const clean = normalizeState(state);
  try {
    store.setItem(
      tutorChatStorageKey(owner),
      JSON.stringify({
        version: 1,
        chats: clean.chats,
        activeByScope: clean.activeByScope
      })
    );
  } catch {
    /* rămâne în memorie dacă discul e plin */
  }
}

export {
  PLACEHOLDER_TITLE,
  tutorChatStorageKey,
  emptyState,
  clipTitle,
  defaultTitle,
  scopeKey,
  lessonFromChapter,
  scopeFromSelection,
  chatsForScope,
  activeChat,
  selectChat,
  startNewChat,
  openProblemChat,
  problemKey,
  ensureActiveChat,
  appendMessage,
  renameChat,
  nameChatsFromLesson,
  adoptExistingMessages,
  loadTutorChats,
  saveTutorChats
};
