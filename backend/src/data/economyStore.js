const persistence = require('./persistence');
const crypto = require('crypto');
const { LESSON_ID_MAP_VERSION, LESSON_ID_MAP } = require('./lessonIdMap');
const { needsMigration, migrateUserLessonIds, migrateNotificationList } = require('./lessonMigration');
const { getGuide } = require('./gimnaziuGuide');
const { levelFromXp, touchStudy, AWARDS } = require('./progressEngine');
const { TITLE_CATALOG, unlockedTitleIds, titleById, noteEarlyBird } = require('./titles');
const { SHOP_CATALOG } = require('./shopCatalog');

const USERS = new Map();
const NOTIFICATIONS = [];
const PURCHASES = new Map();

const CATEGORY_ORDER = ['daily', 'avatar', 'background'];

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getDeterministicJackpotDay(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  const seed = (year * 31) + (month * 17);
  return (seed % 27) + 2;
}

function createDefaultUser(userId) {
  const now = new Date().toISOString();
  const monthKey = getMonthKey();
  return {
    userId,
    role: 'student',
    balance: 0,
    firstLoginClaimed: false,
    firstLoginDate: null,
    streakBonusDate: null,
    testRewardDates: {},
    flashcardRewardDates: {},
    studyRewardDates: {},
    referralRewardMonths: {},
    jackpotRewardMonths: {},
    lastDailyClaimDate: null,
    inventory: [],
    earlyBirdDays: [],
    equipped: {
      avatar: null,
      background: null,
      title: null
    },
    preferences: {
      parentEmail: '',
      childEmail: '',
      teacherEmail: '',
      guardianName: '',
      className: '',
      profileName: '',
      username: '',
      notificationPreferences: {
        dailyDigest: true,
        instantMessages: false,
        weeklyReport: true,
        focusAlerts: true
      }
    },
    metrics: {
      streak: 0,
      hoursToday: 0,
      lastTouch: now,
      lastStudyDate: null,
      monthKey
    },
    xp: 0,
    chapters: {},
    savedSessions: [],
    flashKnown: {},
    cardBoxes: {},
    problemLog: [],
    mentorAwards: {},
    focusAwards: {},
    sessionAwards: {},
    practiceSeen: {},
    practiceTests: {},
    enPapers: {},
    enPhotoDay: { date: "", used: 0 },
    streakDays: [],
    lastAnalogy: {},
    skillLog: [],
    skillPoints: {},
    lessonMapVersion: LESSON_ID_MAP_VERSION,
    parentNotify: { studyDate: null, loginDate: null },
    coinsEarned: 0,
    coinsSpent: 0,
    activityLog: []
  };
}

function ensureUser(userId, patch = {}) {
  const key = userId || 'demo_user';
  if (!USERS.has(key)) {
    USERS.set(key, createDefaultUser(key));
  }
  const current = USERS.get(key);
  if (current.xp == null) current.xp = 0;
  if (!current.chapters || typeof current.chapters !== 'object') current.chapters = {};
  if (!Array.isArray(current.savedSessions)) current.savedSessions = [];
  if (!current.flashKnown) current.flashKnown = {};
  if (!current.mentorAwards) current.mentorAwards = {};
  if (!current.focusAwards) current.focusAwards = {};
  if (!current.sessionAwards) current.sessionAwards = {};
  if (!current.practiceSeen) current.practiceSeen = {};
  if (!current.practiceTests) current.practiceTests = {};
  if (!current.enPapers) current.enPapers = {};
  if (!current.enPhotoDay || typeof current.enPhotoDay !== 'object') current.enPhotoDay = { date: '', used: 0 };
  if (!current.mistakeBoxes || typeof current.mistakeBoxes !== 'object') current.mistakeBoxes = {};
  if (!current.cardBoxes || typeof current.cardBoxes !== 'object') current.cardBoxes = {};
  if (!Array.isArray(current.problemLog)) current.problemLog = [];
  if (!Array.isArray(current.streakDays)) current.streakDays = [];
  if (!current.lastAnalogy) current.lastAnalogy = {};
  if (!Array.isArray(current.skillLog)) current.skillLog = [];
  if (!current.skillPoints || typeof current.skillPoints !== 'object') current.skillPoints = {};
  if (!current.parentNotify) current.parentNotify = { studyDate: null, loginDate: null };
  if (!current.equipped || typeof current.equipped !== 'object') {
    current.equipped = { avatar: null, background: null, title: null };
  }
  if (current.equipped.title === undefined) current.equipped.title = null;
  if (!Array.isArray(current.earlyBirdDays)) current.earlyBirdDays = [];
  if (current.metrics && current.metrics.lastStudyDate === undefined) current.metrics.lastStudyDate = null;
  if (patch && typeof patch === 'object') {
    if (patch.role) current.role = patch.role;
    if (patch.parentEmail !== undefined) current.preferences.parentEmail = patch.parentEmail || '';
    if (patch.teacherEmail !== undefined) current.preferences.teacherEmail = patch.teacherEmail || '';
    if (patch.guardianName !== undefined) current.preferences.guardianName = patch.guardianName || '';
    if (patch.className !== undefined) current.preferences.className = patch.className || '';
    if (patch.profileName !== undefined) current.preferences.profileName = patch.profileName || '';
    if (patch.username !== undefined) current.preferences.username = String(patch.username || '').trim().slice(0, 40);
    if (typeof patch.hoursToday === 'number') current.metrics.hoursToday = patch.hoursToday;
  }
  current.metrics.lastTouch = new Date().toISOString();
  migrateStoredUser(current);
  return current;
}

function migrateStoredUser(user) {
  if (!needsMigration(user, LESSON_ID_MAP_VERSION)) return false;
  persistence.lessonMapBackup(LESSON_ID_MAP_VERSION);
  return migrateUserLessonIds(user, { map: LESSON_ID_MAP, version: LESSON_ID_MAP_VERSION });
}

function migrateStoredUsers() {
  const pending = [];
  USERS.forEach(user => {
    if (needsMigration(user, LESSON_ID_MAP_VERSION)) pending.push(user);
  });
  if (pending.length) persistence.lessonMapBackup(LESSON_ID_MAP_VERSION);
  pending.forEach(user => migrateUserLessonIds(user, { map: LESSON_ID_MAP, version: LESSON_ID_MAP_VERSION }));
  migrateNotificationList(NOTIFICATIONS, LESSON_ID_MAP);
}

function getUser(userId) {
  return USERS.get(userId) || null;
}

function recordActivity(user, type, amount, note, meta = {}) {
  const entry = {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type,
    amount,
    note,
    meta,
    createdAt: new Date().toISOString()
  };
  user.activityLog.unshift(entry);
  user.activityLog = user.activityLog.slice(0, 100);
  return entry;
}

function updateNotificationPreferences({ parentEmail = '', preferences = {} }) {
  const parent = ensureUser(parentEmail, { role: 'parent' });
  parent.preferences.notificationPreferences = {
    ...parent.preferences.notificationPreferences,
    ...preferences
  };
  return parent.preferences.notificationPreferences;
}

function connectParentChild({ parentEmail = '', childEmail = '' }) {
  if (!parentEmail || !childEmail) {
    return null;
  }
  const parent = ensureUser(parentEmail, { role: 'parent' });
  const child = ensureUser(childEmail, { role: 'student' });
  parent.preferences.childEmail = childEmail;
  child.preferences.parentEmail = parentEmail;
  recordActivity(parent, 'parent_link', 0, `Cont conectat la ${childEmail}`, { childEmail });
  recordActivity(child, 'parent_link', 0, `Cont părinte conectat: ${parentEmail}`, { parentEmail });
  return { parentEmail, childEmail };
}

function awardCoins(user, amount, type, note, meta = {}) {
  const value = Math.max(0, Number(amount) || 0);
  user.balance += value;
  user.coinsEarned += value;
  const entry = recordActivity(user, type, value, note, meta);
  return { entry, balance: user.balance, amount: value };
}

function spendCoins(user, amount, type, note, meta = {}) {
  const value = Math.max(0, Number(amount) || 0);
  if (user.balance < value) {
    return null;
  }
  user.balance -= value;
  user.coinsSpent += value;
  const entry = recordActivity(user, type, -value, note, meta);
  return { entry, balance: user.balance, amount: value };
}

function getActivityInsights(user) {
  const now = Date.now();
  const activities = Array.isArray(user.activityLog) ? user.activityLog : [];
  const todayKey = getTodayKey();
  const todayActivities = activities.filter(item => (item.createdAt || '').slice(0, 10) === todayKey);
  const focusEntries = activities.filter(item => item.type === 'focus_session');
  const studyEntries = activities.filter(item => item.type === 'study_1h' || item.type === 'learn_module');
  const mentorEntries = activities.filter(item => item.type === 'mentor_message');
  const detectEntries = activities.filter(item => item.type === 'ai_detect');

  const totalFocusMinutes = focusEntries.reduce((sum, entry) => sum + Math.max(0, Number(entry.meta?.minutes || entry.meta?.durationMinutes || 0)), 0);
  const totalStudyMinutes = studyEntries.reduce((sum, entry) => sum + Math.max(0, Number(entry.meta?.minutes || entry.meta?.durationMinutes || 0)), 0);
  const lastTouchMs = user.metrics.lastTouch ? new Date(user.metrics.lastTouch).getTime() : 0;
  const afkMinutes = lastTouchMs ? Math.max(0, Math.round((now - lastTouchMs) / 60000)) : 0;
  const copiedRisk = detectEntries.reduce((max, entry) => Math.max(max, Number(entry.meta?.ai_probability || entry.meta?.probability || 0)), 0);

  return {
    totalFocusMinutes,
    totalStudyMinutes,
    afkMinutes,
    afkRisk: afkMinutes >= 180 ? 'high' : afkMinutes >= 60 ? 'medium' : 'low',
    copiedRisk: copiedRisk >= 80 ? 'high' : copiedRisk >= 50 ? 'medium' : 'low',
    mentorMessages: mentorEntries.map(entry => ({
      id: entry.id,
      note: entry.note,
      createdAt: entry.createdAt,
      meta: entry.meta || {}
    })).slice(0, 12),
    detectHistory: detectEntries.map(entry => ({
      id: entry.id,
      probability: Number(entry.meta?.ai_probability || entry.meta?.probability || 0),
      note: entry.note,
      createdAt: entry.createdAt
    })).slice(0, 12),
    activityTodayCount: todayActivities.length,
    focusSessions: focusEntries.length,
    studySessions: studyEntries.length
  };
}

// Găsește toți elevii care au legat acest cont ca profesor
// (preferences.teacherEmail === teacherEmail). E un scan simplu peste
// USERS pentru că totul e încă în memorie (mock); când vine o bază de
// date reală, asta devine un query indexat pe teacherEmail.
function findStudentsForTeacher(teacherEmail) {
  const students = [];
  for (const user of USERS.values()) {
    if (user.role === 'student' && user.preferences.teacherEmail === teacherEmail) {
      students.push(user);
    }
  }
  return students;
}

// Emailurile elevilor care au salvat acest profesor în preferințe.
function listStudentEmailsForTeacher(teacherEmail) {
  return findStudentsForTeacher(teacherEmail).map(student => student.userId);
}

function getTeacherAnalytics(teacherEmail = '') {
  const teacher = ensureUser(teacherEmail, { role: 'teacher' });
  const students = findStudentsForTeacher(teacherEmail);

  const roster = students.map(student => {
    const insights = getActivityInsights(student);
    return {
      email: student.userId,
      name: student.preferences.profileName || student.userId,
      className: student.preferences.className || '',
      streak: student.metrics.streak,
      ...insights
    };
  });

  const classAverageFocus = roster.length
    ? Math.round(roster.reduce((sum, s) => sum + s.totalFocusMinutes, 0) / roster.length)
    : 0;
  const atRiskCount = roster.filter(s => s.afkRisk === 'high' || s.copiedRisk === 'high').length;

  return {
    teacher: buildSummary(teacher),
    roster,
    classSummary: {
      studentCount: roster.length,
      classAverageFocusMinutes: classAverageFocus,
      atRiskCount
    }
  };
}

// Cere un test unui elev (de la profesor) sau unui elev/clasa (de la parinte).
// Nu produce continut real de test -- doar o notificare/solicitare, pt ca
// generarea propriu-zisa de teste ramane treaba fluxului de flashcards/chat.
function requestTest({ requesterEmail = '', requesterRole = 'teacher', studentEmail = '', subject = '', note = '', dueDate = '' }) {
  if (!studentEmail) return null;
  const student = ensureUser(studentEmail, { role: 'student' });
  const requesterLabel = requesterRole === 'teacher' ? 'Profesorul tău' : 'Părintele tău';
  const subjectLabel = subject ? ` la ${subject}` : '';
  const dueLabel = dueDate ? ` până pe ${dueDate}` : '';
  const body = [
    `${requesterLabel} ți-a cerut un test${subjectLabel}${dueLabel}.`,
    note ? `Mesaj: ${note}` : null,
    'Deschide secțiunea Învață pentru a genera flashcarduri/test pe acest subiect.'
  ].filter(Boolean).join('\n');

  const notification = pushNotification(studentEmail, studentEmail, 'Test solicitat', body, 'test_request');
  recordActivity(student, 'test_requested', 0, `Test cerut de ${requesterLabel.toLowerCase()}`, { requesterEmail, requesterRole, subject, dueDate });

  return { ok: true, notification };
}

// Generează un cod de acces temporar (OTP, 6 cifre, valabil 10 minute) pe
// care părintele îl primește prin SMS pentru a vedea/gestiona contul
// copilului. IMPORTANT: nu trimitem niciodată parola reală a copilului --
// nici prin SMS, nici prin alt canal -- pentru că am stoca/transmite o
// parolă în clar, ceea ce e o practică nesigură chiar și într-un mock.
// Codul e cu totul separat de parola contului și expiră rapid.
// Cod de acces temporar (OTP, 6 cifre, valabil 10 minute). Părintele îl
// primește prin SMS (mock: inbox-ul din aplicație). Nu trimitem niciodată
// parola reală a copilului.
//
// Stocăm doar hash-ul SHA-256 al codului, nu valoarea în clar, și blocăm
// verificarea după 5 încercări greșite. Fără astea, 1.000.000 de combinații
// într-o fereastră de 10 minute erau fezabile.
const ACCESS_CODES = new Map();
const ACCESS_CODE_TTL_MS = 10 * 60 * 1000;
const MAX_ACCESS_CODE_ATTEMPTS = 5;

function hashAccessCode(code) {
  return crypto.createHash('sha256').update(String(code)).digest('hex');
}

async function generateAccessCode({ parentEmail = '', childEmail = '', phone = '' }) {
  if (!parentEmail || !childEmail) return null;
  const code = String(crypto.randomInt(100000, 1000000));
  const expiresAt = Date.now() + ACCESS_CODE_TTL_MS;
  ACCESS_CODES.set(`${parentEmail}:${childEmail}`, {
    codeHash: hashAccessCode(code),
    expiresAt,
    attempts: 0
  });

  const subject = 'Cod de acces Sunt de 10';
  const body = `Codul tău de acces temporar pentru contul copilului: ${code}. Valabil 10 minute. Nu este parola contului -- se folosește doar pentru autorizare rapidă.`;

  const { deliverMessage } = require('../notify/deliver');
  const delivery = await deliverMessage({
    to: parentEmail,
    phone,
    subject,
    body,
    channel: 'email'
  });

  // Inbox-ul păstrează mesajul (inclusiv codul) ca rezervă locală. Răspunsul
  // HTTP NU include codul.
  pushNotification(parentEmail, phone || parentEmail, subject, body, 'sms', delivery);

  return {
    ok: true,
    expiresAt,
    mocked: Boolean(delivery.mocked),
    delivered: Boolean(delivery.delivered)
  };
}

function verifyAccessCode({ parentEmail = '', childEmail = '', code = '' }) {
  const key = `${parentEmail}:${childEmail}`;
  const entry = ACCESS_CODES.get(key);
  if (!entry) return { ok: false, reason: 'no_code_requested' };
  if (Date.now() > entry.expiresAt) {
    ACCESS_CODES.delete(key);
    return { ok: false, reason: 'expired' };
  }
  if (entry.attempts >= MAX_ACCESS_CODE_ATTEMPTS) {
    ACCESS_CODES.delete(key);
    return { ok: false, reason: 'locked' };
  }

  entry.attempts += 1;
  const expected = Buffer.from(entry.codeHash, 'hex');
  const given = Buffer.from(hashAccessCode(code), 'hex');
  const match = expected.length === given.length && crypto.timingSafeEqual(expected, given);
  if (!match) {
    if (entry.attempts >= MAX_ACCESS_CODE_ATTEMPTS) {
      ACCESS_CODES.delete(key);
      return { ok: false, reason: 'locked' };
    }
    return {
      ok: false,
      reason: 'invalid_code',
      attemptsLeft: MAX_ACCESS_CODE_ATTEMPTS - entry.attempts
    };
  }

  ACCESS_CODES.delete(key);
  return { ok: true };
}

function purgeExpiredAccessCodes() {
  const now = Date.now();
  let removed = 0;
  for (const [key, entry] of ACCESS_CODES.entries()) {
    if (!entry || now > entry.expiresAt) {
      ACCESS_CODES.delete(key);
      removed++;
    }
  }
  return removed;
}

const accessCodePurgeTimer = setInterval(purgeExpiredAccessCodes, 60 * 1000);
accessCodePurgeTimer.unref();

function getParentAnalytics(parentEmail = '') {
  const parent = ensureUser(parentEmail, { role: 'parent' });
  const childEmail = parent.preferences.childEmail || '';
  const child = childEmail ? ensureUser(childEmail, { role: 'student' }) : null;

  if (!child) {
    return {
      parent: buildSummary(parent),
      child: null,
      analytics: {
        linked: false,
        message: 'Conectează un cont de elev pentru analitică profundă.',
        totalFocusMinutes: 0,
        totalStudyMinutes: 0,
        afkMinutes: 0,
        afkRisk: 'low',
        copiedRisk: 'low',
        mentorMessages: [],
        detectHistory: []
      }
    };
  }

  const analytics = getActivityInsights(child);
  return {
    parent: buildSummary(parent),
    child: buildSummary(child),
    analytics: {
      linked: true,
      childEmail,
      childName: `${child.preferences.profileName || child.userId}`,
      teacherEmail: child.preferences.teacherEmail || '',
      parentEmail,
      ...analytics
    }
  };
}

function chapterKey(subject, grade, chapterId) {
  return `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
}

function countDoneChapters(user, grade) {
  const chapters = user.chapters && typeof user.chapters === 'object' ? user.chapters : {};
  return Object.values(chapters).filter(item => item && item.status === 'done' && String(item.grade) === String(grade)).length;
}

function chapterUniverse(grade) {
  const g = Number(grade) || 5;
  const mate = (getGuide('matematica', g).units || []).length;
  const romana = (getGuide('romana', g).units || []).length;
  return Math.max(1, mate + romana);
}

const DAILY_XP_CAP = 120;
const DAILY_COIN_CAP = 80;

function grantAward(user, award, type, note, meta = {}) {
  const today = getTodayKey();
  if (!user.awardDay || user.awardDay.date !== today) user.awardDay = { date: today, xp: 0, coins: 0 };
  let xp = Math.max(0, Number(award.xp) || 0);
  let coins = Math.max(0, Number(award.coins) || 0);
  xp = Math.min(xp, Math.max(0, DAILY_XP_CAP - user.awardDay.xp));
  coins = Math.min(coins, Math.max(0, DAILY_COIN_CAP - user.awardDay.coins));
  if (!xp && !coins) return null;
  user.awardDay.xp += xp;
  user.awardDay.coins += coins;
  const paid = awardCoins(user, coins, type, note, { ...meta, xp });
  user.xp = (user.xp || 0) + xp;
  return { coins: paid.amount, xp, balance: paid.balance };
}

function recordProgress({ userId, type, meta = {}, note = '', trusted = false }) {
  const user = ensureUser(userId);
  if (type === 'chapter_test' && !(trusted && meta && meta.serverScored)) {
    return { entry: null, awarded: null, summary: buildSummary(user) };
  }
  if (meta.grade) user.preferences.className = String(meta.grade);
  const todayKey = getTodayKey();
  noteEarlyBird(user, todayKey);
  const study = touchStudy(user, todayKey);
  if (!Array.isArray(user.streakDays)) user.streakDays = [];
  if (study.firstToday && !user.streakDays.includes(todayKey)) {
    user.streakDays.push(todayKey);
    user.streakDays = user.streakDays.slice(-60);
  }
  if (trusted && study.firstToday && user.streakBonusDate !== todayKey) {
    user.streakBonusDate = todayKey;
    grantAward(user, AWARDS.streak_day, 'reward', `Serie de ${user.metrics.streak} zile`, { streak: user.metrics.streak });
  }

  let awarded = null;

  if (type === 'chapter_open') {
    const key = chapterKey(meta.subject, meta.grade, meta.chapterId);
    if (key && !user.chapters[key]) {
      user.chapters[key] = {
        status: 'started',
        subject: meta.subject,
        grade: String(meta.grade || ''),
        chapterId: meta.chapterId,
        title: meta.title || '',
        track: meta.track || '',
        at: new Date().toISOString()
      };
      if (trusted) awarded = grantAward(user, AWARDS.chapter_open, 'chapter_open', note || meta.title || 'Capitol deschis', meta);
    } else if (key && user.chapters[key] && user.chapters[key].status !== 'done') {
      user.chapters[key].at = new Date().toISOString();
      if (meta.track) user.chapters[key].track = meta.track;
    }
  }

  if (type === 'session_complete') {
    const key = chapterKey(meta.subject, meta.grade, meta.chapterId);
    const stamp = `${key}:${todayKey}`;
    if (key && !user.sessionAwards[stamp]) {
      user.sessionAwards[stamp] = true;
      if (user.chapters[key]) user.chapters[key].status = 'done';
      else {
        user.chapters[key] = {
          status: 'done',
          subject: meta.subject,
          grade: String(meta.grade || ''),
          chapterId: meta.chapterId,
          title: meta.title || '',
          at: new Date().toISOString()
        };
      }
      if (trusted) awarded = grantAward(user, AWARDS.session_complete, 'session_complete', note || 'Sesiune terminată', meta);
    }
  }

  if (type === 'flashcard_known') {
    const topic = String(meta.topic || todayKey).slice(0, 80);
    if (!user.flashKnown[todayKey]) user.flashKnown[todayKey] = {};
    const reported = Math.max(1, Math.min(20, Number(meta.correct || meta.count) || 1));
    user.flashKnown[todayKey][topic] = (user.flashKnown[todayKey][topic] || 0) + reported;
    const count = user.flashKnown[todayKey][topic];
    if (count >= 5 && !user.flashcardRewardDates[todayKey]) {
      user.flashcardRewardDates[todayKey] = true;
      if (trusted) awarded = grantAward(user, AWARDS.flashcards_5, 'flashcards_5', '5 flashcarduri corecte', { topic, count });
    }
  }

  if (type === 'focus_session') {
    const minutes = Math.max(0, Number(meta.minutes || meta.durationMinutes) || 0);
    if (!user.focusAwards[todayKey] && minutes >= 25) {
      user.focusAwards[todayKey] = minutes >= 50 ? 'focus_50' : 'focus_25';
      const award = minutes >= 50 ? AWARDS.focus_50 : AWARDS.focus_25;
      if (trusted) awarded = grantAward(user, award, 'focus_session', `Focus ${minutes} minute`, { minutes });
    }
  }

  if (type === 'chapter_test') {
    const key = chapterKey(meta.subject, meta.grade, meta.chapterId);
    const stamp = `${key}:${todayKey}`;
    const { capDurationMs } = require('./chapterTestSession');
    const durationMs = capDurationMs(meta.durationMs);
    const score = Number(meta.score);
    const total = Number(meta.total);
    if (key && !user.practiceTests[stamp]) {
      user.practiceTests[stamp] = {
        at: new Date().toISOString(),
        score: Number.isFinite(score) ? score : 0,
        total: Number.isFinite(total) ? total : 0,
        durationMs
      };
      awarded = grantAward(user, AWARDS.chapter_test, 'chapter_test', note || 'Test de capitol', {
        subject: meta.subject,
        grade: meta.grade,
        chapterId: meta.chapterId,
        title: meta.title || '',
        score: Number.isFinite(score) ? score : 0,
        total: Number.isFinite(total) ? total : 0,
        durationMs
      });
    }
  }

  if (type === 'mentor_message') {
    const today = user.mentorAwards[todayKey] || 0;
    if (today < 5) {
      user.mentorAwards[todayKey] = today + 1;
      if (trusted) awarded = grantAward(user, AWARDS.mentor_message, 'mentor_message', note || 'Mesaj către mentor', meta);
    }
  }

  if (type === 'save_session' && meta.title) {
    user.savedSessions = Array.isArray(user.savedSessions) ? user.savedSessions : [];
    user.savedSessions.unshift({
      id: `saved_${Date.now()}`,
      title: String(meta.title).slice(0, 120),
      subject: meta.subject || '',
      grade: String(meta.grade || ''),
      chapterId: meta.chapterId || '',
      track: meta.track || '',
      plan: meta.plan && typeof meta.plan === 'object' ? meta.plan : null,
      at: new Date().toISOString()
    });
    user.savedSessions = user.savedSessions.slice(0, 20);
  }

  const entry = recordActivity(user, type, awarded?.coins || 0, note, { ...meta, awarded });
  return { entry, awarded, summary: buildSummary(user) };
}

function recordSkillReview(userId, payload = {}) {
  const user = ensureUser(userId);
  const items = Array.isArray(payload.items) ? payload.items : [];
  const entry = {
    id: `rev_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`,
    at: new Date().toISOString(),
    kind: payload.kind === 'flashcards' ? 'flashcards' : 'test',
    subject: payload.subject || '',
    grade: String(payload.grade || ''),
    chapterId: payload.chapterId || '',
    title: String(payload.title || '').slice(0, 120),
    correct: Number(payload.correct) || 0,
    total: Number(payload.total) || items.length,
    gradeNote: Number(payload.gradeNote) || 1,
    message: payload.message || '',
    strengths: payload.strengths || [],
    weaknesses: payload.weaknesses || []
  };
  user.skillLog.unshift(entry);
  user.skillLog = user.skillLog.slice(0, 50);
  items.forEach(item => {
    const key = `${payload.subject || ''}:${item.point || item.id}`;
    if (!user.skillPoints[key]) {
      user.skillPoints[key] = { ok: 0, fail: 0, label: item.point || item.id, subject: payload.subject || '' };
    }
    if (item.ok) user.skillPoints[key].ok += 1;
    else user.skillPoints[key].fail += 1;
  });
  return { entry, snapshot: skillSnapshot(user) };
}

function skillSnapshot(user) {
  const points = Object.entries(user.skillPoints || {}).map(([id, value]) => ({ id, ...value }));
  const strengths = points
    .filter(item => item.ok >= 2 && item.ok > item.fail)
    .sort((a, b) => b.ok - a.ok)
    .slice(0, 8)
    .map(item => item.label);
  const weaknesses = points
    .filter(item => item.fail > item.ok)
    .sort((a, b) => b.fail - a.ok)
    .slice(0, 8)
    .map(item => item.label);
  return {
    log: (user.skillLog || []).slice(0, 20),
    strengths: [...new Set(strengths)],
    weaknesses: [...new Set(weaknesses)]
  };
}

function getSkillHistory(userId) {
  return skillSnapshot(ensureUser(userId));
}

function logActivity({ userId = 'demo_user', type, note = '', meta = {}, amount = 0 }) {
  const progressTypes = new Set(['chapter_open', 'session_complete', 'flashcard_known', 'focus_session', 'learn_module', 'save_session', 'chapter_test']);
  if (type === 'learn_module') {
    return recordProgress({
      userId,
      type: 'chapter_open',
      note,
      meta: { subject: meta.subject, grade: meta.grade, chapterId: meta.moduleId || meta.chapterId, title: meta.title || note }
    });
  }
  if (progressTypes.has(type)) {
    return recordProgress({ userId, type, note, meta });
  }
  const user = ensureUser(userId);
  const entry = recordActivity(user, type, amount, note, meta);
  return { entry, summary: buildSummary(user) };
}

function buildDailyClaims(user) {
  const todayKey = getTodayKey();
  const monthKey = getMonthKey();
  const jackpotDay = getDeterministicJackpotDay(monthKey);
  const now = new Date();
  const eligibleForJackpot = now.getDate() === jackpotDay && !user.jackpotRewardMonths[monthKey];
  return [
    {
      id: 'first-login',
      title: 'Prima logare',
      subtitle: user.firstLoginClaimed ? `${AWARDS.login_bonus.coins} monede deja primite` : `Primești ${AWARDS.login_bonus.coins} de monede la prima intrare`,
      coins: AWARDS.login_bonus.coins,
      claimed: Boolean(user.firstLoginClaimed),
      action: 'login_bonus'
    },
    {
      id: 'streak-bonus',
      title: 'Bonus de serie',
      subtitle: user.metrics.streak === 1
        ? 'Ai 1 zi la rând. Bonus +5 pe lângă restul recompenselor.'
        : `Ai ${user.metrics.streak || 0} zile la rând. Bonus +5 pe lângă restul recompenselor.`,
      coins: 5,
      claimed: user.streakBonusDate === todayKey,
      action: 'streak_bonus'
    },
    {
      id: 'flashcards-5',
      title: '5 flashcarduri corecte',
      subtitle: 'Se acordă singur după 5 carduri „știu”, numărate de server.',
      coins: AWARDS.flashcards_5.coins,
      claimed: Boolean(user.flashcardRewardDates[todayKey]),
      action: 'flashcards_5'
    },
    {
      id: 'study-1h',
      title: 'Concentrare 25+ minute',
      subtitle: 'Se acordă singur când termini un timer de 25 sau 50 de minute.',
      coins: AWARDS.focus_25.coins,
      claimed: Boolean(user.focusAwards?.[todayKey]),
      action: 'study_1h'
    },
    {
      id: 'jackpot-monthly',
      title: 'Premiul lunii',
      subtitle: `O zi din lună: ${jackpotDay}. Dacă intri atunci, primești 50 de monede de studiu.`,
      coins: 50,
      claimed: Boolean(user.jackpotRewardMonths[monthKey]),
      action: 'jackpot_monthly',
      eligible: eligibleForJackpot
    }
  ];
}

function claimReward({ userId = 'demo_user', type, payload = {} }) {
  const user = ensureUser(userId, payload);
  const todayKey = getTodayKey();
  const monthKey = getMonthKey();

  if (type === 'login_bonus') {
    if (user.firstLoginClaimed) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    user.firstLoginClaimed = true;
    user.firstLoginDate = todayKey;
    noteEarlyBird(user, todayKey);
    const bonus = awardCoins(user, AWARDS.login_bonus.coins, 'reward', 'Bonus de prima logare', { type });
    user.xp = (user.xp || 0) + AWARDS.login_bonus.xp;
    pushNotification(userId, payload.parentEmail || user.preferences.parentEmail, 'Prima logare', `A fost acordat bonusul de ${AWARDS.login_bonus.coins} de monede pentru prima intrare.`, 'reward');
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'login_bonus', summary: buildSummary(user) };
  }

  if (type === 'streak_bonus') {
    if (user.streakBonusDate === todayKey) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    const streak = Math.max(0, Number(user.metrics.streak) || 0);
    if (streak <= 0) {
      return { ok: false, reason: 'no_streak', balance: user.balance, summary: buildSummary(user) };
    }
    user.streakBonusDate = todayKey;
    const bonus = awardCoins(user, 5, 'reward', `Bonus streak pentru ${streak} zile`, { streak });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'streak_bonus', summary: buildSummary(user) };
  }

  if (type === 'test_completed' || type === 'test_perfect' || type === 'referral_3' || type === 'flashcards_5' || type === 'study_1h') {
    return {
      ok: false,
      reason: 'use_study_actions',
      message: 'Recompensa se acordă automat când înveți, nu din magazin.',
      balance: user.balance,
      summary: buildSummary(user)
    };
  }

  if (type === 'jackpot_monthly') {
    if (user.jackpotRewardMonths[monthKey]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    const jackpotDay = getDeterministicJackpotDay(monthKey);
    const now = new Date();
    if (now.getDate() !== jackpotDay) {
      return { ok: false, reason: 'not_jackpot_day', jackpotDay, balance: user.balance, summary: buildSummary(user) };
    }
    user.jackpotRewardMonths[monthKey] = true;
    const bonus = awardCoins(user, 50, 'reward', 'Premiul lunii', { jackpotDay, monthKey });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'jackpot_monthly', jackpotDay, summary: buildSummary(user) };
  }

  return { ok: false, reason: 'unknown_reward', balance: user.balance, summary: buildSummary(user) };
}

function getCatalog() {
  const categories = CATEGORY_ORDER.map(category => ({
    id: category,
    items: SHOP_CATALOG.filter(item => item.category === category)
  }));
  return {
    categories,
    items: SHOP_CATALOG,
    titles: TITLE_CATALOG.map(item => ({ id: item.id, name: item.name, description: item.description })),
    highlights: {
      freeDaily: [
        { id: 'login_bonus', title: `${AWARDS.login_bonus.coins} de monede la prima logare`, description: 'Se acordă o singură dată.' },
        { id: 'chapter_open', title: '8 monede + 20 XP la un capitol nou', description: 'Când deschizi și lucrezi un capitol.' },
        { id: 'jackpot_monthly', title: 'Premiul lunii de 50', description: 'O zi din lună, aleasă de server.' }
      ]
    }
  };
}

function purchaseItem({ userId = 'demo_user', itemId }) {
  const user = ensureUser(userId);
  const item = SHOP_CATALOG.find(entry => entry.id === itemId);
  if (!item) {
    return { ok: false, reason: 'item_not_found', balance: user.balance };
  }
  if (user.inventory.includes(item.id)) {
    return { ok: false, reason: 'already_owned', balance: user.balance };
  }
  const minLevel = Number(item.minLevel || 0);
  const level = levelFromXp(user.xp || 0).level;
  if (minLevel && level < minLevel) {
    return {
      ok: false,
      reason: 'level_required',
      minLevel,
      level,
      balance: user.balance,
      item
    };
  }
  const spend = spendCoins(user, item.price, 'purchase', `Cumpărare: ${item.name}`, { itemId: item.id });
  if (!spend) {
    return { ok: false, reason: 'insufficient_coins', balance: user.balance, item };
  }
  user.inventory.push(item.id);
  if (item.category === 'avatar') {
    user.equipped.avatar = item.id;
  }
  if (item.category === 'background') {
    user.equipped.background = item.id;
  }
  PURCHASES.set(`${userId}:${item.id}`, {
    itemId: item.id,
    purchasedAt: new Date().toISOString(),
    price: item.price
  });
  return {
    ok: true,
    balance: user.balance,
    item,
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped }
  };
}

function titleState(user) {
  const unlocked = unlockedTitleIds(user, {
    countDoneChapters,
    chapterUniverse,
    listLeaderboardEntries
  });
  const equippedId = unlocked.includes(user.equipped?.title) ? user.equipped.title : null;
  if (user.equipped && user.equipped.title && user.equipped.title !== equippedId) {
    user.equipped.title = equippedId;
  }
  return {
    unlocked,
    equipped: equippedId || '',
    catalog: TITLE_CATALOG.map(item => ({
      ...item,
      unlocked: unlocked.includes(item.id)
    }))
  };
}

function equipCosmetic({ userId, itemId, titleId, slot }) {
  const user = ensureUser(userId);
  if (titleId !== undefined || slot === 'title') {
    const next = titleId === undefined ? '' : String(titleId || '');
    if (!next) {
      user.equipped.title = null;
    } else {
      const titles = titleState(user);
      if (!titles.unlocked.includes(next)) {
        return { ok: false, reason: 'title_locked', titles, equipped: { ...user.equipped } };
      }
      user.equipped.title = next;
    }
    return {
      ok: true,
      inventory: user.inventory.slice(),
      equipped: { ...user.equipped },
      titles: titleState(user),
      summary: buildSummary(user)
    };
  }

  const clearSlot = itemId === '' && (slot === 'avatar' || slot === 'background');
  if (clearSlot) {
    user.equipped[slot] = null;
    return {
      ok: true,
      inventory: user.inventory.slice(),
      equipped: { ...user.equipped },
      titles: titleState(user),
      summary: buildSummary(user)
    };
  }

  const item = SHOP_CATALOG.find(entry => entry.id === itemId);
  if (!item || (item.category !== 'avatar' && item.category !== 'background')) {
    return { ok: false, reason: 'item_not_found', equipped: { ...user.equipped } };
  }
  if (!user.inventory.includes(item.id)) {
    return { ok: false, reason: 'not_owned', equipped: { ...user.equipped } };
  }
  user.equipped[item.category] = item.id;
  return {
    ok: true,
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped },
    titles: titleState(user),
    summary: buildSummary(user)
  };
}

function getInventory(userId = 'demo_user') {
  const user = ensureUser(userId);
  return {
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped },
    titles: titleState(user)
  };
}

function missionState(user) {
  const today = getTodayKey();
  const opened = Object.values(user.chapters || {}).some(row => String(row.at || '').slice(0, 10) === today);
  const tested = Object.keys(user.practiceTests || {}).some(key => key.endsWith(`:${today}`));
  const flash = Object.values(user.practiceSeen || {}).some(row => (row.day === today) && (row.questionIds || []).length >= 5);
  return {
    day: today,
    items: [
      { id: 'chapter', label: 'Deschide un capitol', done: opened },
      { id: 'flash', label: '5 flashcarduri', done: flash },
      { id: 'test', label: 'Un test de capitol', done: tested }
    ]
  };
}

function chapterMapsFrom(user) {
  const maps = {};
  const chapters = user.chapters && typeof user.chapters === 'object' ? user.chapters : {};
  Object.entries(chapters).forEach(([key, row]) => {
    const seen = user.practiceSeen[key] || {};
    const tested = Object.keys(user.practiceTests || {}).some(stamp => stamp.startsWith(`${key}:`));
    const read = row.status === 'done' || row.status === 'started';
    const flash = (seen.questionIds || []).length;
    maps[key] = {
      read: Boolean(read),
      tested: Boolean(tested),
      flash,
      status: row.status || '',
      title: row.title || '',
      grades: Array.isArray(user.practiceTests && Object.values(user.practiceTests))
        ? Object.entries(user.practiceTests)
          .filter(([stamp]) => stamp.startsWith(`${key}:`))
          .map(([, val]) => ({ at: val.at, score: val.score }))
          .slice(-8)
        : []
    };
  });
  return maps;
}

function lastStudyFrom(user) {
  const chapters = user.chapters && typeof user.chapters === 'object' ? user.chapters : {};
  const rows = Object.values(chapters).filter(item => item && item.chapterId);
  rows.sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));
  const last = rows[0];
  if (!last) return null;
  return {
    subject: last.subject || '',
    grade: last.grade || '',
    chapterId: last.chapterId || '',
    title: last.title || '',
    status: last.status || '',
    track: last.track || '',
    at: last.at || ''
  };
}

function buildSummary(user) {
  const grade = user.preferences.className || '5';
  const progress = levelFromXp(user.xp || 0);
  const done = countDoneChapters(user, grade);
  const total = chapterUniverse(grade);
  return {
    userId: user.userId,
    role: user.role,
    balance: user.balance,
    coinsEarned: user.coinsEarned,
    coinsSpent: user.coinsSpent,
    streak: user.metrics.streak,
    hoursToday: user.metrics.hoursToday,
    xp: progress.xp,
    level: progress.level,
    xpIntoLevel: progress.xpIntoLevel,
    xpToNext: progress.xpToNext,
    nextLevelAt: progress.nextLevelAt,
    levelSpan: progress.levelSpan,
    score: Math.round((done / total) * 100),
    chaptersDone: done,
    chaptersTotal: total,
    chapters: { ...user.chapters },
    lastStudy: lastStudyFrom(user),
    savedSessions: Array.isArray(user.savedSessions) ? user.savedSessions.slice(0, 8) : [],
    streakDays: Array.isArray(user.streakDays) ? user.streakDays.slice(-30) : [],
    missions: missionState(user),
    chapterMaps: chapterMapsFrom(user),
    mentorLeft: Math.max(0, 5 - Number((user.mentorAwards || {})[getTodayKey()] || 0)),
    collection: {
      avatarsOwned: SHOP_CATALOG.filter(item => item.category === 'avatar' && (user.inventory || []).includes(item.id)).length,
      avatarsTotal: SHOP_CATALOG.filter(item => item.category === 'avatar').length
    },
    preferences: { ...user.preferences },
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped },
    titles: titleState(user),
    titleId: titleState(user).equipped,
    titleName: titleById(titleState(user).equipped)?.name || '',
    claims: {
      firstLoginClaimed: user.firstLoginClaimed,
      streakBonusDate: user.streakBonusDate,
      testRewardDates: { ...user.testRewardDates },
      flashcardRewardDates: { ...user.flashcardRewardDates },
      studyRewardDates: { ...user.studyRewardDates },
      referralRewardMonths: { ...user.referralRewardMonths },
      jackpotRewardMonths: { ...user.jackpotRewardMonths }
    },
    dailyClaims: buildDailyClaims(user)
  };
}

function getSummary(userId = 'demo_user', patch = {}) {
  const user = ensureUser(userId, patch);
  return buildSummary(user);
}

function pushNotification(userId, targetEmail, subject, body, channel = 'email', delivery = {}) {
  const notification = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    userId,
    to: targetEmail || '',
    subject,
    body,
    channel,
    read: false,
    mocked: delivery.mocked !== false,
    delivered: Boolean(delivery.delivered),
    createdAt: new Date().toISOString()
  };
  NOTIFICATIONS.unshift(notification);
  return notification;
}

const NOTIFICATION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_NOTIFICATIONS = 500;

function purgeExpiredNotifications() {
  const cutoff = Date.now() - NOTIFICATION_TTL_MS;
  let removed = 0;
  for (let i = NOTIFICATIONS.length - 1; i >= 0; i--) {
    const created = new Date(NOTIFICATIONS[i].createdAt || 0).getTime();
    if (!Number.isFinite(created) || created < cutoff) {
      NOTIFICATIONS.splice(i, 1);
      removed++;
    }
  }
  if (NOTIFICATIONS.length > MAX_NOTIFICATIONS) {
    removed += NOTIFICATIONS.length - MAX_NOTIFICATIONS;
    NOTIFICATIONS.length = MAX_NOTIFICATIONS;
  }
  return removed;
}

const notificationPurgeTimer = setInterval(purgeExpiredNotifications, 6 * 60 * 60 * 1000);
notificationPurgeTimer.unref();

function getNotifications(userId = 'demo_user') {
  const inbox = NOTIFICATIONS.filter(entry => entry.userId === userId);
  return {
    inbox,
    unread: inbox.filter(entry => !entry.read).length
  };
}

function markNotificationRead(notificationId) {
  const notification = NOTIFICATIONS.find(entry => entry.id === notificationId);
  if (notification) {
    notification.read = true;
  }
  return notification;
}

async function sendParentReview({ userId = 'demo_user', role = 'student' }) {
  const { findAccount } = require('./authStore');
  const account = findAccount(userId);
  const to = account?.profile?.parentEmail || '';
  if (!to) {
    return { ok: false, error: 'Nu există un email de părinte salvat în cont.' };
  }
  const user = ensureUser(userId, { role });
  const today = new Date().toISOString().slice(0, 10);
  user.parentNotify = user.parentNotify || {};
  if (user.parentNotify.reviewDate === today) {
    return { ok: false, error: 'Părintele a primit deja acest mesaj azi.' };
  }
  user.parentNotify.reviewDate = today;
  const { reserveOutbound, bucharestParts } = require("../notify/parentActivity");
  if (!reserveOutbound(to, bucharestParts().date)) {
    return { ok: false, error: "Am trimis deja toate emailurile de azi." };
  }
  const subject = `Sunt de 10 este gratuită pentru ${account.profile.username || "elev"}`;
  const body = [
    'Aplicația Sunt de 10 este gratuită. Nu există abonament de plătit.',
    `Cont: ${role}`,
    `Monede în magazin (cosmetice): ${user.balance}`,
    'Mesajul este un text fix. Adresa și textul nu pot fi alese de copil, ca să nu se trimită scrisori către oricine.'
  ].join('\n');

  const { deliverMessage } = require('../notify/deliver');
  const delivery = await deliverMessage({ to, subject, body, channel: 'email' });
  const email = pushNotification(userId, to, subject, body, 'email', delivery);
  return {
    ok: true,
    mocked: Boolean(delivery.mocked),
    delivered: Boolean(delivery.delivered),
    email,
    preview: { subject, body }
  };
}

function publicPseudonym(user) {
  const username = String(user.preferences?.username || '').trim();
  if (username) return username.slice(0, 40);
  const digest = crypto.createHash('sha256').update(String(user.userId || '')).digest('hex').slice(0, 4).toUpperCase();
  return `Elev ${digest}`;
}

function initialsFromPseudonym(name) {
  const parts = String(name || '').split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return String(name || 'EL').replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'EL';
}

function xpFromUser(user) {
  const stored = Number(user.xp || 0);
  if (stored > 0) return stored;
  return Math.max(0, Number(user.coinsEarned || 0) + Number(user.metrics?.streak || 0) * 10);
}

function listLeaderboardEntries({ limit = 10, currentEmail = '' } = {}) {
  const cap = Math.min(50, Math.max(1, Number(limit) || 10));
  const me = String(currentEmail || '').trim().toLowerCase();
  const ranked = [...USERS.values()]
    .filter(user => user.role === 'student')
    .map(user => {
      const name = publicPseudonym(user);
      const xp = xpFromUser(user);
      return {
        id: crypto.createHash('sha256').update(String(user.userId || '')).digest('hex').slice(0, 12),
        name,
        initials: initialsFromPseudonym(name),
        xp,
        streak: Number(user.metrics?.streak || 0),
        level: levelFromXp(xp).level,
        class: user.preferences.className || '',
        title: titleById(user.equipped?.title)?.name || '',
        titleEmoji: titleById(user.equipped?.title)?.emoji || '',
        isCurrentUser: Boolean(me) && String(user.userId).toLowerCase() === me
      };
    })
    .sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name));

  const board = ranked.slice(0, cap).map((entry, index) => ({ ...entry, rank: index + 1 }));
  const self = ranked.find(entry => entry.isCurrentUser);
  if (self && !board.some(entry => entry.isCurrentUser)) {
    board.push({ ...self, rank: ranked.indexOf(self) + 1 });
  }
  return board;
}

function lessonsThisWeek(now = Date.now()) {
  const cutoff = now - 7 * 24 * 60 * 60 * 1000;
  let count = 0;
  for (const user of USERS.values()) {
    const log = Array.isArray(user.activityLog) ? user.activityLog : [];
    count += log.filter(entry => {
      const at = Date.parse(entry.createdAt || "");
      return Number.isFinite(at) && at >= cutoff && (entry.type === "chapter_open" || entry.type === "session_complete" || entry.type === "chapter_test");
    }).length;
  }
  return count;
}

function exportEconomyFor(email) {
  const key = String(email || '').trim().toLowerCase();
  const user = getUser(key);
  if (!user) return null;
  const cumparaturi = [];
  for (const [code, row] of PURCHASES.entries()) {
    if (code === key || code.startsWith(`${key}:`)) cumparaturi.push(row?.itemId || '');
  }
  return {
    xp: Number(user.xp || 0),
    monede: Number(user.balance || 0),
    lectii: Object.keys(user.chapters || {}),
    activitate: (Array.isArray(user.activityLog) ? user.activityLog : []).map(entry => ({
      tip: entry.type,
      la: entry.createdAt,
      cantitate: entry.amount,
      nota: entry.note || ""
    })),
    cumparaturi: cumparaturi.filter(Boolean),
    greseli: require("./mistakeBook").exportRows(user),
    carduri: Object.entries(user.cardBoxes || {}).map(([id, card]) => ({
      id,
      la: card.due || null
    }))
  };
}

function pruneHistory(maxAgeMs, now = Date.now()) {
  const cutoff = now - maxAgeMs;
  let removed = 0;
  const fresh = (stamp) => {
    const at = Date.parse(stamp || '');
    return Number.isFinite(at) && at >= cutoff;
  };
  for (const user of USERS.values()) {
    if (Array.isArray(user.activityLog)) {
      const before = user.activityLog.length;
      user.activityLog = user.activityLog.filter(entry => fresh(entry.createdAt));
      removed += before - user.activityLog.length;
    }
    if (Array.isArray(user.digestEvents)) {
      const before = user.digestEvents.length;
      user.digestEvents = user.digestEvents.filter(entry => fresh(entry.at));
      removed += before - user.digestEvents.length;
    }
  }
  for (let i = NOTIFICATIONS.length - 1; i >= 0; i -= 1) {
    if (!fresh(NOTIFICATIONS[i].createdAt)) {
      NOTIFICATIONS.splice(i, 1);
      removed += 1;
    }
  }
  return removed;
}

function exportUser(email) {
  const user = getUser(email);
  if (!user) return null;
  return {
    ...buildSummary(user),
    activityLog: Array.isArray(user.activityLog) ? user.activityLog.slice() : [],
    notifications: getNotifications(email).inbox,
    cardBoxes: { ...(user.cardBoxes || {}) },
    problemLog: Array.isArray(user.problemLog) ? user.problemLog.slice() : []
  };
}

function deleteUser(email) {
  const key = String(email || '').trim().toLowerCase();
  const user = USERS.get(key);
  if (user) {
    const childEmail = user.preferences.childEmail;
    const parentEmail = user.preferences.parentEmail;
    if (childEmail) {
      const child = USERS.get(childEmail);
      if (child && child.preferences.parentEmail === key) child.preferences.parentEmail = '';
    }
    if (parentEmail) {
      const parent = USERS.get(parentEmail);
      if (parent && parent.preferences.childEmail === key) parent.preferences.childEmail = '';
    }
    if (user.role === 'teacher') {
      for (const other of USERS.values()) {
        if (other.preferences.teacherEmail === key) other.preferences.teacherEmail = '';
      }
    }
    USERS.delete(key);
  }

  for (let i = NOTIFICATIONS.length - 1; i >= 0; i--) {
    if (NOTIFICATIONS[i].userId === key || NOTIFICATIONS[i].to === key) {
      NOTIFICATIONS.splice(i, 1);
    }
  }
  PURCHASES.delete(key);
  for (const purchaseKey of [...PURCHASES.keys()]) {
    if (purchaseKey === key || purchaseKey.startsWith(`${key}:`)) PURCHASES.delete(purchaseKey);
  }
  for (const codeKey of [...ACCESS_CODES.keys()]) {
    if (codeKey === key || codeKey.startsWith(`${key}:`) || codeKey.endsWith(`:${key}`)) {
      ACCESS_CODES.delete(codeKey);
    }
  }
}

require('./userDataRegistry').register('economy', {
  exportFor: exportEconomyFor,
  eraseFor: deleteUser
});

persistence.register('economy', {
  snapshot: () => ({
    users: persistence.mapToObject(USERS),
    notifications: NOTIFICATIONS,
    purchases: persistence.mapToObject(PURCHASES)
  }),
  restore: data => {
    persistence.restoreMap(USERS, data?.users);
    persistence.restoreArray(NOTIFICATIONS, data?.notifications);
    persistence.restoreMap(PURCHASES, data?.purchases);
    purgeExpiredNotifications();
    purgeExpiredAccessCodes();
    migrateStoredUsers();
  }
});

module.exports = {
  ensureUser,
  getUser,
  getSummary,
  getCatalog,
  purchaseItem,
  equipCosmetic,
  getInventory,
  claimReward,
  recordProgress,
  recordSkillReview,
  getSkillHistory,
  logActivity,
  getNotifications,
  markNotificationRead,
  connectParentChild,
  updateNotificationPreferences,
  getParentAnalytics,
  sendParentReview,
  listLeaderboardEntries,
  lessonsThisWeek,
  migrateStoredUser,
  getDeterministicJackpotDay,
  getMonthKey,
  getTodayKey,
  pushNotification,
  getTeacherAnalytics,
  listStudentEmailsForTeacher,
  requestTest,
  generateAccessCode,
  verifyAccessCode,
  purgeExpiredAccessCodes,
  purgeExpiredNotifications,
  exportUser,
  deleteUser,
  pruneHistory,
  exportEconomyFor
};
