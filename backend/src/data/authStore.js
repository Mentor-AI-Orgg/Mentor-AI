// Conturi și sesiuni.
//
// Parolele nu sunt stocate niciodată în clar: păstrăm doar un hash scrypt cu
// salt unic per cont. scrypt vine din `node:crypto`, deci nu adaugă nicio
// dependință nativă (bcrypt ar cere compilare pe server).
//
// Datele sunt salvate pe disc prin persistence.js, deci conturile și sesiunile
// supraviețuiesc restartului procesului.

const crypto = require("crypto");
const { promisify } = require("util");
const persistence = require("./persistence");

const scrypt = promisify(crypto.scrypt);

const ACCOUNTS = new Map(); // email normalizat -> cont
// Indexat pe hash-ul token-ului, nu pe token. Fișierul de date ajunge pe disc
// și în backup-uri; dacă ar conține token-urile în clar, oricine l-ar citi
// putea prelua sesiunile active. Hash-ul nu este reversibil, iar verificarea
// costă la fel de puțin.
const SESSIONS = new Map(); // sha256(token) -> { email, expiresAt }

const hashToken = token => crypto.createHash("sha256").update(String(token)).digest("hex");

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 zile
const KEY_LENGTH = 64;

const ROLES = ["student", "parent", "teacher"];

const normalizeEmail = email => String(email || "").trim().toLowerCase();

// --- parole ---

async function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const derived = await scrypt(String(password), salt, KEY_LENGTH);
  return { salt, hash: derived.toString("hex") };
}

async function verifyPassword(password, salt, expectedHash) {
  const { hash } = await hashPassword(password, salt);
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(expectedHash, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// --- conturi ---

function findAccount(email) {
  return ACCOUNTS.get(normalizeEmail(email)) || null;
}

function listAccounts() {
  return [...ACCOUNTS.values()];
}

function usernameTaken(username, exceptEmail = "") {
  const needle = String(username || "").trim().toLowerCase();
  if (!needle) return false;
  const skip = normalizeEmail(exceptEmail);
  return listAccounts().some(account => (
    account.email !== skip && String(account.profile?.username || "").trim().toLowerCase() === needle
  ));
}

async function changePassword(email, currentPassword, nextPassword) {
  const account = findAccount(email);
  if (!account) return { ok: false, reason: "missing" };
  const valid = await verifyPassword(currentPassword, account.salt, account.passwordHash);
  if (!valid) return { ok: false, reason: "wrong" };
  const { salt, hash } = await hashPassword(nextPassword);
  account.salt = salt;
  account.passwordHash = hash;
  return { ok: true };
}

async function createAccount({ email, password, role = "student", profile = {} }) {
  const key = normalizeEmail(email);
  if (ACCOUNTS.has(key)) return { ok: false, reason: "email_taken" };

  const { salt, hash } = await hashPassword(password);
  const account = {
    email: key,
    salt,
    passwordHash: hash,
    role: ROLES.includes(role) ? role : "student",
    profile: {
      name: profile.name || "",
      username: profile.username || "",
      phone: profile.phone || "",
      school: profile.school || "",
      class: profile.class || "",
      subject: profile.subject || "",
      parentEmail: profile.parentEmail || "",
      teacherEmail: profile.teacherEmail || "",
      profile: profile.profile || "",
      exam: profile.exam || "",
      dailyHours: profile.dailyHours || "",
      uiLanguage: profile.uiLanguage || "",
      language: profile.language || "",
      hasCompletedOnboarding: profile.hasCompletedOnboarding !== undefined
        ? Boolean(profile.hasCompletedOnboarding)
        : role !== "student"
    },
    parentalConsentAt: profile.parentalConsentAt || null,
    privacyAcceptedAt: profile.privacyAcceptedAt || null,
    createdAt: new Date().toISOString()
  };
  ACCOUNTS.set(key, account);
  return { ok: true, account };
}

async function authenticate({ email, password }) {
  const account = findAccount(email);
  if (!account) {
    // Consumăm oricum timpul unui hash, ca durata răspunsului să nu spună
    // atacatorului dacă adresa există sau nu.
    await hashPassword(String(password || ""), "dummy_salt_for_timing");
    return { ok: false, reason: "invalid_credentials" };
  }
  const valid = await verifyPassword(password, account.salt, account.passwordHash);
  if (!valid) return { ok: false, reason: "invalid_credentials" };
  return { ok: true, account };
}

// Datele publice ale contului. Nu include niciodată salt sau hash.
function publicAccount(account) {
  if (!account) return null;
  const { parentViewToken: _parentViewToken, ...safeProfile } = account.profile || {};
  return {
    email: account.email,
    role: account.role,
    ...safeProfile,
    parentalConsentAt: account.parentalConsentAt || null,
    privacyAcceptedAt: account.privacyAcceptedAt || null,
    createdAt: account.createdAt
  };
}

// --- sesiuni ---

function createSession(email) {
  const token = crypto.randomBytes(32).toString("hex");
  SESSIONS.set(hashToken(token), { email: normalizeEmail(email), expiresAt: Date.now() + SESSION_TTL_MS });
  return { token, maxAge: SESSION_TTL_MS };
}

function getSession(token) {
  if (!token) return null;
  const key = hashToken(token);
  const session = SESSIONS.get(key);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    SESSIONS.delete(key);
    return null;
  }
  return session;
}

function destroySession(token) {
  if (token) SESSIONS.delete(hashToken(token));
}

// Invalidează toate sesiunile unui cont (schimbare de parolă, logout global).
const RESETS = new Map();
const RESET_TTL_MS = 45 * 60 * 1000;

function issueResetToken(email) {
  const account = findAccount(email);
  if (!account) return null;
  const token = crypto.randomBytes(32).toString("hex");
  RESETS.set(hashToken(token), { email: account.email, expiresAt: Date.now() + RESET_TTL_MS });
  return token;
}

async function consumeResetToken(token, nextPassword) {
  const key = hashToken(String(token || ""));
  const row = RESETS.get(key);
  if (!row || Date.now() > row.expiresAt) {
    if (row) RESETS.delete(key);
    return { ok: false, reason: "invalid" };
  }
  const account = findAccount(row.email);
  RESETS.delete(key);
  if (!account) return { ok: false, reason: "invalid" };
  const { salt, hash } = await hashPassword(nextPassword);
  account.salt = salt;
  account.passwordHash = hash;
  destroySessionsForEmail(account.email);
  return { ok: true, email: account.email };
}

function destroySessionsForEmail(email) {
  const key = normalizeEmail(email);
  for (const [token, session] of SESSIONS.entries()) {
    if (session.email === key) SESSIONS.delete(token);
  }
}

function deleteAccount(email) {
  const key = normalizeEmail(email);
  destroySessionsForEmail(key);
  return ACCOUNTS.delete(key);
}

const PROFILE_STRING_FIELDS = [
  "name",
  "username",
  "phone",
  "school",
  "class",
  "subject",
  "parentEmail",
  "teacherEmail",
  "profile",
  "exam",
  "dailyHours",
  "uiLanguage",
  "language"
];

function updateProfile(email, patch = {}) {
  const account = findAccount(email);
  if (!account) return null;
  for (const field of PROFILE_STRING_FIELDS) {
    if (patch[field] === undefined) continue;
    const max = field === "username" ? 40 : field === "phone" ? 20 : 120;
    account.profile[field] = String(patch[field] ?? "").trim().slice(0, max);
  }
  if (patch.hasCompletedOnboarding !== undefined) {
    account.profile.hasCompletedOnboarding = Boolean(patch.hasCompletedOnboarding);
  }
  return account;
}

// Sesiunile expirate s-ar acumula la infinit dacă nimeni nu le mai atinge.
function purgeExpiredSessions() {
  const now = Date.now();
  let removed = 0;
  for (const [token, session] of SESSIONS.entries()) {
    if (now > session.expiresAt) {
      SESSIONS.delete(token);
      removed++;
    }
  }
  return removed;
}

const purgeTimer = setInterval(purgeExpiredSessions, 60 * 60 * 1000);
purgeTimer.unref();

persistence.register("auth", {
  snapshot: () => ({
    accounts: persistence.mapToObject(ACCOUNTS),
    sessions: persistence.mapToObject(SESSIONS),
    resets: persistence.mapToObject(RESETS)
  }),
  restore: data => {
    persistence.restoreMap(ACCOUNTS, data?.accounts);
    persistence.restoreMap(SESSIONS, data?.sessions);
    persistence.restoreMap(RESETS, data?.resets);
    // Sesiunile expirate în timpul cât procesul a fost oprit nu au de ce să
    // ajungă înapoi în memorie.
    purgeExpiredSessions();
  }
});

module.exports = {
  ROLES,
  normalizeEmail,
  createAccount,
  findAccount,
  authenticate,
  publicAccount,
  updateProfile,
  listAccounts,
  usernameTaken,
  changePassword,
  issueResetToken,
  consumeResetToken,
  createSession,
  getSession,
  destroySession,
  destroySessionsForEmail,
  deleteAccount,
  purgeExpiredSessions,
  // expuse pentru teste
  hashPassword,
  verifyPassword
};
