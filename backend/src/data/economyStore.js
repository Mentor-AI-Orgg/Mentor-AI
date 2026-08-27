const persistence = require('./persistence');
const crypto = require('crypto');

const USERS = new Map();
const NOTIFICATIONS = [];
const PURCHASES = new Map();

const SHOP_CATALOG = [
  {
    id: 'avatar-neon-fox',
    category: 'avatar',
    name: 'Neon Fox',
    price: 50,
    rarity: 'Common',
    icon: 'fa-fox',
    description: 'Avatar rapid și prietenos, bun pentru început.'
  },
  {
    id: 'avatar-starlight-owl',
    category: 'avatar',
    name: 'Starlight Owl',
    price: 50,
    rarity: 'Common',
    icon: 'fa-owl',
    description: 'Un avatar calm, cu vibe de mentor.'
  },
  {
    id: 'avatar-pixel-tiger',
    category: 'avatar',
    name: 'Pixel Tiger',
    price: 75,
    rarity: 'Rare',
    icon: 'fa-cat',
    description: 'Mai expresiv și mai îndrăzneț.'
  },
  {
    id: 'avatar-cosmic-bear',
    category: 'avatar',
    name: 'Cosmic Bear',
    price: 75,
    rarity: 'Rare',
    icon: 'fa-paw',
    description: 'Un avatar de colecție, cu prezență puternică.'
  },
  {
    id: 'avatar-hero-robot',
    category: 'avatar',
    name: 'Hero Robot',
    price: 100,
    rarity: 'Epic',
    icon: 'fa-robot',
    description: 'Pentru cine vrea un look futurist.'
  },
  {
    id: 'avatar-galaxy-kid',
    category: 'avatar',
    name: 'Galaxy Kid',
    price: 100,
    rarity: 'Epic',
    icon: 'fa-user-astronaut',
    description: 'Avatar special, ușor de recunoscut.'
  },
  {
    id: 'avatar-mentor-legend',
    category: 'avatar',
    name: 'Mentor Legend',
    price: 100,
    rarity: 'Legendary',
    icon: 'fa-crown',
    description: 'Cel mai rar avatar, pentru cei consecvenți.'
  },
  {
    id: 'theme-pink-pulse',
    category: 'background',
    name: 'Pink Pulse',
    price: 75,
    rarity: 'Common',
    accent: '#ff8fa3',
    description: 'Fundal roz cu energie caldă.'
  },
  {
    id: 'theme-orange-ember',
    category: 'background',
    name: 'Orange Ember',
    price: 75,
    rarity: 'Common',
    accent: '#ffb347',
    description: 'Tonalitate portocalie, luminoasă.'
  },
  {
    id: 'theme-red-rush',
    category: 'background',
    name: 'Red Rush',
    price: 75,
    rarity: 'Rare',
    accent: '#ff6b6b',
    description: 'Roșu intens, pentru un look puternic.'
  },
  {
    id: 'theme-mint-aurora',
    category: 'background',
    name: 'Mint Aurora',
    price: 75,
    rarity: 'Rare',
    accent: '#63f2c7',
    description: 'Verde mentă cu aer proaspăt.'
  },
  {
    id: 'theme-golden-sun',
    category: 'background',
    name: 'Golden Sun',
    price: 75,
    rarity: 'Rare',
    accent: '#ffd166',
    description: 'Auriu cald, mai blând pentru ochi.'
  },
  {
    id: 'theme-night-aurora',
    category: 'background',
    name: 'Night Aurora',
    price: 75,
    rarity: 'Epic',
    accent: '#6fd7ff',
    description: 'Fundal rece, modern, cu contrast puternic.'
  },
  {
    id: 'theme-violet-comet',
    category: 'background',
    name: 'Violet Comet',
    price: 75,
    rarity: 'Epic',
    accent: '#b9a7ff',
    description: 'Violet cinematic, mai dramatic.'
  },
  {
    id: 'voice-calm-guide',
    category: 'voice',
    name: 'Calm Guide',
    price: 100,
    rarity: 'Common',
    voice: 'calm-guide',
    description: 'O voce blândă, potrivită pentru explicații lente.'
  },
  {
    id: 'voice-bright-mentor',
    category: 'voice',
    name: 'Bright Mentor',
    price: 100,
    rarity: 'Common',
    voice: 'bright-mentor',
    description: 'Mai clară și energică în timpul sesiunilor.'
  },
  {
    id: 'voice-warm-support',
    category: 'voice',
    name: 'Warm Support',
    price: 100,
    rarity: 'Rare',
    voice: 'warm-support',
    description: 'Sună empatic și prietenos.'
  },
  {
    id: 'voice-focus-spark',
    category: 'voice',
    name: 'Focus Spark',
    price: 100,
    rarity: 'Rare',
    voice: 'focus-spark',
    description: 'Voce scurtă, fermă, bună pentru concentrare.'
  },
  {
    id: 'voice-crystal-ai',
    category: 'voice',
    name: 'Crystal AI',
    price: 100,
    rarity: 'Epic',
    voice: 'crystal-ai',
    description: 'Mai futuristă, pentru o experiență diferită.'
  },
  {
    id: 'voice-night-coach',
    category: 'voice',
    name: 'Night Coach',
    price: 100,
    rarity: 'Epic',
    voice: 'night-coach',
    description: 'Mai gravă, bună pentru sesiuni lungi.'
  },
  {
    id: 'voice-legend-host',
    category: 'voice',
    name: 'Legend Host',
    price: 100,
    rarity: 'Legendary',
    voice: 'legend-host',
    description: 'Voce specială, premium, pentru statut unic.'
  },
  {
    id: 'boost-family-7d',
    category: 'boost',
    name: 'Elite Family Pack · 7 zile',
    price: 5000,
    rarity: 'Legendary',
    description: 'Acces gratuit timp de 7 zile la pachetul de familie.'
  },
  {
    id: 'boost-xp-doubler',
    category: 'boost',
    name: 'XP Doubler · 3 zile',
    price: 350,
    rarity: 'Epic',
    description: 'Dublează XP-ul obținut în această perioadă.'
  },
  {
    id: 'boost-extra-streak',
    category: 'boost',
    name: 'Streak Shield',
    price: 250,
    rarity: 'Rare',
    description: 'Protecție pentru o zi, dacă ratezi ritmul.'
  },
  {
    id: 'boost-study-crate',
    category: 'boost',
    name: 'Study Crate',
    price: 150,
    rarity: 'Common',
    description: 'Pachet surpriză cu efect cosmetic sau bonus mic.'
  }
];

const CATEGORY_ORDER = ['daily', 'avatar', 'background', 'voice', 'boost'];

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
    equipped: {
      avatar: null,
      background: null,
      voice: null
    },
    preferences: {
      parentEmail: '',
      childEmail: '',
      teacherEmail: '',
      guardianName: '',
      className: '',
      profileName: '',
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
      monthKey
    },
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
  if (patch && typeof patch === 'object') {
    if (patch.role) current.role = patch.role;
    if (patch.parentEmail !== undefined) current.preferences.parentEmail = patch.parentEmail || '';
    if (patch.teacherEmail !== undefined) current.preferences.teacherEmail = patch.teacherEmail || '';
    if (patch.guardianName !== undefined) current.preferences.guardianName = patch.guardianName || '';
    if (patch.className !== undefined) current.preferences.className = patch.className || '';
    if (patch.profileName !== undefined) current.preferences.profileName = patch.profileName || '';
    if (typeof patch.streak === 'number') current.metrics.streak = patch.streak;
    if (typeof patch.hoursToday === 'number') current.metrics.hoursToday = patch.hoursToday;
    if (patch.coins !== undefined && Number.isFinite(Number(patch.coins))) current.balance = Number(patch.coins);
  }
  current.metrics.lastTouch = new Date().toISOString();
  return current;
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

// Emailurile elevilor legați de un profesor. Folosit de linkStore ca să
// listeze legăturile active, fără să expună obiectele interne de user.
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

function generateAccessCode({ parentEmail = '', childEmail = '', phone = '' }) {
  if (!parentEmail || !childEmail) return null;
  const code = String(crypto.randomInt(100000, 1000000));
  const expiresAt = Date.now() + ACCESS_CODE_TTL_MS;
  ACCESS_CODES.set(`${parentEmail}:${childEmail}`, {
    codeHash: hashAccessCode(code),
    expiresAt,
    attempts: 0
  });

  // Inbox-ul este canalul mock de SMS: aici rămâne codul în clar, ca părintele
  // să-l poată citi în aplicație. Răspunsul HTTP NU include codul.
  pushNotification(
    parentEmail,
    phone || parentEmail,
    'Cod de acces Mentor AI',
    `Codul tău de acces temporar pentru contul copilului: ${code}. Valabil 10 minute. Nu este parola contului -- se folosește doar pentru autorizare rapidă.`,
    'sms'
  );

  return { ok: true, expiresAt };
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

function logActivity({ userId = 'demo_user', type, note = '', meta = {}, amount = 0 }) {
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
      subtitle: user.firstLoginClaimed ? '100 monede deja claim-uite' : 'Primești 100 de monede la prima intrare',
      coins: 100,
      claimed: Boolean(user.firstLoginClaimed),
      action: 'login_bonus'
    },
    {
      id: 'streak-bonus',
      title: 'Bonus streak',
      subtitle: `Ai ${user.metrics.streak || 0} zile consecutive. Bonus +5 pe lângă restul recompenselor.`,
      coins: 5,
      claimed: user.streakBonusDate === todayKey,
      action: 'streak_bonus'
    },
    {
      id: 'test-complete',
      title: 'Test terminat',
      subtitle: 'Răsplata pentru un test din lecția învățată.',
      coins: 15,
      claimed: Boolean(user.testRewardDates[todayKey]),
      action: 'test_completed'
    },
    {
      id: 'test-perfect',
      title: 'Notă 10',
      subtitle: 'Bonus suplimentar pentru test perfect.',
      coins: 10,
      claimed: Boolean(user.testRewardDates[`${todayKey}:perfect`]),
      action: 'test_perfect'
    },
    {
      id: 'flashcards-5',
      title: '5 flashcarduri corecte',
      subtitle: 'Primești 5 monede după minim 5 carduri rezolvate corect.',
      coins: 5,
      claimed: Boolean(user.flashcardRewardDates[todayKey]),
      action: 'flashcards_5'
    },
    {
      id: 'study-1h',
      title: '1 oră pe zi în aplicație',
      subtitle: 'Bonus zilnic pentru timp petrecut la studiu.',
      coins: 5,
      claimed: Boolean(user.studyRewardDates[todayKey]),
      action: 'study_1h'
    },
    {
      id: 'referral-3',
      title: 'Recomandă la 3 prieteni',
      subtitle: 'O dată pe lună, dacă trimiți aplicația la 3 prieteni.',
      coins: 50,
      claimed: Boolean(user.referralRewardMonths[monthKey]),
      action: 'referral_3'
    },
    {
      id: 'jackpot-monthly',
      title: 'Jackpot lunar',
      subtitle: `Zi random a lunii: ${jackpotDay}. Dacă intri atunci, primești 50 de monede.`,
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
    const bonus = awardCoins(user, 100, 'reward', 'Bonus de prima logare', { type });
    pushNotification(userId, payload.parentEmail || user.preferences.parentEmail, 'Prima logare', `A fost acordat bonusul de 100 de monede pentru prima intrare.`, 'reward');
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'login_bonus' };
  }

  if (type === 'streak_bonus') {
    if (user.streakBonusDate === todayKey) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    user.streakBonusDate = todayKey;
    const streak = Math.max(0, Number(payload.streak ?? user.metrics.streak) || 0);
    if (streak <= 0) {
      return { ok: false, reason: 'no_streak', balance: user.balance, summary: buildSummary(user) };
    }
    const bonus = awardCoins(user, 5, 'reward', `Bonus streak pentru ${streak} zile`, { streak });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'streak_bonus' };
  }

  if (type === 'test_completed') {
    if (user.testRewardDates[todayKey]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    user.testRewardDates[todayKey] = true;
    const bonus = awardCoins(user, 15, 'reward', 'Test din lecție finalizat', {});
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'test_completed' };
  }

  if (type === 'test_perfect') {
    const key = `${todayKey}:perfect`;
    if (user.testRewardDates[key]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    user.testRewardDates[key] = true;
    const bonus = awardCoins(user, 10, 'reward', 'Notă 10 la test', {});
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'test_perfect' };
  }

  if (type === 'flashcards_5') {
    const topicKey = payload.topic || todayKey;
    if (user.flashcardRewardDates[topicKey]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    const correctCount = Math.max(0, Number(payload.correct_count) || 0);
    if (correctCount < 5) {
      return { ok: false, reason: 'not_enough_correct', balance: user.balance, summary: buildSummary(user) };
    }
    user.flashcardRewardDates[topicKey] = true;
    const bonus = awardCoins(user, 5, 'reward', '5 flashcarduri corecte', { correctCount });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'flashcards_5' };
  }

  if (type === 'study_1h') {
    if (user.studyRewardDates[todayKey]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    const hours = Math.max(0, Number(payload.hours) || 0);
    if (hours < 1) {
      return { ok: false, reason: 'not_enough_time', balance: user.balance, summary: buildSummary(user) };
    }
    user.studyRewardDates[todayKey] = true;
    const bonus = awardCoins(user, 5, 'reward', 'Cel puțin 1 oră petrecută în aplicație', { hours });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'study_1h' };
  }

  if (type === 'referral_3') {
    if (user.referralRewardMonths[monthKey]) {
      return { ok: false, reason: 'already_claimed', balance: user.balance, summary: buildSummary(user) };
    }
    const referrals = Math.max(0, Number(payload.referrals) || 0);
    if (referrals < 3) {
      return { ok: false, reason: 'not_enough_referrals', balance: user.balance, summary: buildSummary(user) };
    }
    user.referralRewardMonths[monthKey] = true;
    const bonus = awardCoins(user, 50, 'reward', 'Recomandare la 3 prieteni', { referrals });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'referral_3' };
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
    const bonus = awardCoins(user, 50, 'reward', 'Jackpot lunar', { jackpotDay, monthKey });
    return { ok: true, earned: bonus.amount, balance: bonus.balance, claim: 'jackpot_monthly', jackpotDay };
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
    highlights: {
      freeDaily: [
        { id: 'login_bonus', title: '100 de monede la prima logare', description: 'Se acordă o singură dată.' },
        { id: 'referral_3', title: '50 de monede pentru 3 prieteni', description: 'O dată pe lună.' },
        { id: 'jackpot_monthly', title: 'Jackpot lunar de 50', description: 'Într-o zi random din lună.' }
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
  if (item.category === 'voice') {
    user.equipped.voice = item.id;
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

function getInventory(userId = 'demo_user') {
  const user = ensureUser(userId);
  return {
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped }
  };
}

function buildSummary(user) {
  return {
    userId: user.userId,
    role: user.role,
    balance: user.balance,
    coinsEarned: user.coinsEarned,
    coinsSpent: user.coinsSpent,
    streak: user.metrics.streak,
    hoursToday: user.metrics.hoursToday,
    preferences: { ...user.preferences },
    inventory: user.inventory.slice(),
    equipped: { ...user.equipped },
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

function pushNotification(userId, targetEmail, subject, body, channel = 'email') {
  const notification = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    userId,
    to: targetEmail || '',
    subject,
    body,
    channel,
    read: false,
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

function sendParentReview({ userId = 'demo_user', parentEmail = '', planId = '', billingCycle = 'monthly', role = 'student', message = '' }) {
  const user = ensureUser(userId, { parentEmail, role });
  const planLabel = planId ? planId.replace(/_/g, ' ') : 'abonament';
  const subject = `Propunere abonament Mentor AI pentru ${user.preferences.profileName || userId}`;
  const body = [
    `Plan propus: ${planLabel}`,
    `Ciclu de plată: ${billingCycle}`,
    `Role cont: ${role}`,
    `Monede disponibile: ${user.balance}`,
    `Mesaj suplimentar: ${message || 'Nu există mesaj suplimentar.'}`,
    'Aceasta este o notificare mock. Pentru email real, conectează un serviciu SMTP/transactional.'
  ].join('\n');
  const email = pushNotification(userId, parentEmail || user.preferences.parentEmail, subject, body, 'email');
  return {
    ok: true,
    email,
    preview: { subject, body }
  };
}

function exportUser(email) {
  const user = getUser(email);
  if (!user) return null;
  return {
    ...buildSummary(user),
    activityLog: Array.isArray(user.activityLog) ? user.activityLog.slice() : [],
    notifications: getNotifications(email).inbox
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
  for (const codeKey of [...ACCESS_CODES.keys()]) {
    if (codeKey === key || codeKey.startsWith(`${key}:`) || codeKey.endsWith(`:${key}`)) {
      ACCESS_CODES.delete(codeKey);
    }
  }
}

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
  }
});

module.exports = {
  ensureUser,
  getUser,
  getSummary,
  getCatalog,
  purchaseItem,
  getInventory,
  claimReward,
  logActivity,
  getNotifications,
  markNotificationRead,
  connectParentChild,
  updateNotificationPreferences,
  getParentAnalytics,
  sendParentReview,
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
  deleteUser
};
