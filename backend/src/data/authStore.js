// Conturi și sesiuni.
//
// Parolele nu sunt stocate niciodată în clar: păstrăm doar un hash scrypt cu
// salt unic per cont. scrypt vine din `node:crypto`, deci nu adaugă nicio
// dependință nativă (bcrypt ar cere compilare pe server).
//
// Ca tot restul aplicației, datele stau în memorie și se pierd la restartul
// procesului - vezi Faza 2 din plan-imbunatatiri.md. Pe shared hosting
// procesul e oprit des, deci conturile create acum sunt de fapt temporare.
// Interfața de aici este gândită să rămână neschimbată când în spate ajunge
// o bază de date reală.

const crypto = require("crypto");
const { promisify } = require("util");

const scrypt = promisify(crypto.scrypt);

const ACCOUNTS = new Map(); // email normalizat -> cont
const SESSIONS = new Map(); // token -> { email, expiresAt }

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
      teacherEmail: profile.teacherEmail || ""
    },
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
  return {
    email: account.email,
    role: account.role,
    ...account.profile,
    createdAt: account.createdAt
  };
}

// --- sesiuni ---

function createSession(email) {
  const token = crypto.randomBytes(32).toString("hex");
  SESSIONS.set(token, { email: normalizeEmail(email), expiresAt: Date.now() + SESSION_TTL_MS });
  return { token, maxAge: SESSION_TTL_MS };
}

function getSession(token) {
  if (!token) return null;
  const session = SESSIONS.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    SESSIONS.delete(token);
    return null;
  }
  return session;
}

function destroySession(token) {
  if (token) SESSIONS.delete(token);
}

// Invalidează toate sesiunile unui cont (schimbare de parolă, logout global).
function destroySessionsForEmail(email) {
  const key = normalizeEmail(email);
  for (const [token, session] of SESSIONS.entries()) {
    if (session.email === key) SESSIONS.delete(token);
  }
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

module.exports = {
  ROLES,
  normalizeEmail,
  createAccount,
  findAccount,
  authenticate,
  publicAccount,
  createSession,
  getSession,
  destroySession,
  destroySessionsForEmail,
  purgeExpiredSessions,
  // expuse pentru teste
  hashPassword,
  verifyPassword
};
