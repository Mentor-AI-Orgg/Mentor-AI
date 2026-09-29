// Tokenuri de acord și de link magic. În date stă doar hash-ul SHA-256.

const crypto = require("crypto");
const persistence = require("./persistence");
const { findAccount, normalizeEmail } = require("./authStore");

const { policyVersion: POLICY_VERSION } = require("../../../shared/legal.json");
const CONSENT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAGIC_TTL_MS = 15 * 60 * 1000;
const PARENT_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const CONSENT_TOKENS = new Map();
const MAGIC_TOKENS = new Map();
const EMAIL_CHANGE_TOKENS = new Map();
const UNSUB_TOKENS = new Map();
const PARENT_SESSIONS = new Map();
const SENDS = {
  child: {},
  parent: {}
};

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token)).digest("hex");
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bump(bucket, key) {
  const today = todayKey();
  const row = bucket[key];
  if (!row || row.date !== today) bucket[key] = { date: today, count: 0 };
  return bucket[key];
}

const LIMITED = "Am trimis deja emailul. Roagă-ți părintele să verifice și în Spam.";

function confirmationAllowed(childEmail, parentEmail, { resend = false } = {}) {
  const child = bump(SENDS.child, normalizeEmail(childEmail));
  const parent = bump(SENDS.parent, hashToken(normalizeEmail(parentEmail)));
  if ((resend && child.count >= 3) || parent.count >= 5) {
    return { ok: false, message: LIMITED };
  }
  return { ok: true, child, parent };
}

function markConfirmationSent(childEmail, parentEmail, { resend = false } = {}) {
  const room = confirmationAllowed(childEmail, parentEmail, { resend });
  if (!room.ok) return room;
  if (resend) room.child.count += 1;
  room.parent.count += 1;
  return { ok: true };
}

function issueConsentToken(childEmail) {
  const account = findAccount(childEmail);
  if (!account) return null;
  const token = crypto.randomBytes(32).toString("hex");
  CONSENT_TOKENS.set(hashToken(token), {
    childEmail: account.email,
    expiresAt: Date.now() + CONSENT_TTL_MS
  });
  return token;
}

function readConsent(token) {
  const row = CONSENT_TOKENS.get(hashToken(token));
  if (!row || Date.now() > row.expiresAt) {
    if (row) CONSENT_TOKENS.delete(hashToken(token));
    return null;
  }
  const account = findAccount(row.childEmail);
  if (!account) return null;
  return { account, row };
}

function peekConsent(token) {
  const found = readConsent(token);
  if (!found) return null;
  return {
    username: found.account.profile.username || "",
    className: found.account.profile.class || "",
    status: found.account.consent?.status || "pending"
  };
}

function consumeConsent(token) {
  const found = readConsent(token);
  if (!found) return null;
  CONSENT_TOKENS.delete(hashToken(token));
  return found.account;
}

function issueMagicToken(parentEmail) {
  const token = crypto.randomBytes(32).toString("hex");
  MAGIC_TOKENS.set(hashToken(token), {
    parentEmail: normalizeEmail(parentEmail),
    expiresAt: Date.now() + MAGIC_TTL_MS
  });
  return token;
}

function consumeMagicToken(token) {
  const key = hashToken(token);
  const row = MAGIC_TOKENS.get(key);
  if (!row || Date.now() > row.expiresAt) {
    if (row) MAGIC_TOKENS.delete(key);
    return null;
  }
  MAGIC_TOKENS.delete(key);
  const account = findAccount(row.parentEmail);
  if (!account || account.role !== "parent") return null;
  return account;
}

function issueEmailChangeToken(childEmail, nextEmail) {
  const account = findAccount(childEmail);
  if (!account) return null;
  const token = crypto.randomBytes(32).toString("hex");
  EMAIL_CHANGE_TOKENS.set(hashToken(token), {
    childEmail: account.email,
    nextEmail: normalizeEmail(nextEmail),
    expiresAt: Date.now() + CONSENT_TTL_MS
  });
  return token;
}

function consumeEmailChangeToken(token) {
  const key = hashToken(token);
  const row = EMAIL_CHANGE_TOKENS.get(key);
  if (!row || Date.now() > row.expiresAt) {
    if (row) EMAIL_CHANGE_TOKENS.delete(key);
    return null;
  }
  EMAIL_CHANGE_TOKENS.delete(key);
  const account = findAccount(row.childEmail);
  if (!account) return null;
  return { account, nextEmail: row.nextEmail };
}

function issueUnsubscribeToken(childEmail) {
  const account = findAccount(childEmail);
  if (!account) return null;
  const token = crypto.randomBytes(32).toString("hex");
  UNSUB_TOKENS.set(hashToken(token), {
    childEmail: account.email,
    expiresAt: Date.now() + 90 * 24 * 60 * 60 * 1000
  });
  return token;
}

function consumeUnsubscribeToken(token) {
  const key = hashToken(token);
  const row = UNSUB_TOKENS.get(key);
  if (!row || Date.now() > row.expiresAt) {
    if (row) UNSUB_TOKENS.delete(key);
    return null;
  }
  UNSUB_TOKENS.delete(key);
  return findAccount(row.childEmail);
}

function createParentSession(parentEmail) {
  const token = crypto.randomBytes(32).toString("hex");
  PARENT_SESSIONS.set(hashToken(token), {
    email: normalizeEmail(parentEmail),
    expiresAt: Date.now() + PARENT_SESSION_TTL_MS
  });
  return { token, maxAge: PARENT_SESSION_TTL_MS };
}

function getParentSession(token) {
  if (!token) return null;
  const key = hashToken(token);
  const row = PARENT_SESSIONS.get(key);
  if (!row || Date.now() > row.expiresAt) {
    if (row) PARENT_SESSIONS.delete(key);
    return null;
  }
  return row;
}

function destroyParentSession(token) {
  if (token) PARENT_SESSIONS.delete(hashToken(token));
}

function purgeExpiredTokens(now = Date.now()) {
  for (const [key, row] of CONSENT_TOKENS) {
    if (now > row.expiresAt) CONSENT_TOKENS.delete(key);
  }
  for (const [key, row] of MAGIC_TOKENS) {
    if (now > row.expiresAt) MAGIC_TOKENS.delete(key);
  }
  for (const [key, row] of PARENT_SESSIONS) {
    if (now > row.expiresAt) PARENT_SESSIONS.delete(key);
  }
  for (const [key, row] of EMAIL_CHANGE_TOKENS) {
    if (now > row.expiresAt) EMAIL_CHANGE_TOKENS.delete(key);
  }
  for (const [key, row] of UNSUB_TOKENS) {
    if (now > row.expiresAt) UNSUB_TOKENS.delete(key);
  }
}

function exportConsentFor(email) {
  const account = findAccount(email);
  if (!account) return null;
  return {
    stare: account.consent?.status || "",
    versiune: account.consent?.policyVersion || ""
  };
}

function eraseConsentFor(email) {
  const key = normalizeEmail(email);
  const parentHash = hashToken(key);
  const maps = [CONSENT_TOKENS, MAGIC_TOKENS, EMAIL_CHANGE_TOKENS, UNSUB_TOKENS, PARENT_SESSIONS];
  for (const map of maps) {
    for (const [id, row] of map.entries()) {
      if (!row) continue;
      if (row.childEmail === key || row.parentEmail === key || row.email === key || row.nextEmail === key) {
        map.delete(id);
      }
    }
  }
  delete SENDS.child[key];
  delete SENDS.parent[parentHash];
}

require("./userDataRegistry").register("consent", {
  exportFor: exportConsentFor,
  eraseFor: eraseConsentFor
});

persistence.register("consent", {
  snapshot: () => ({
    tokens: persistence.mapToObject(CONSENT_TOKENS),
    magic: persistence.mapToObject(MAGIC_TOKENS),
    emailChanges: persistence.mapToObject(EMAIL_CHANGE_TOKENS),
    unsubs: persistence.mapToObject(UNSUB_TOKENS),
    parentSessions: persistence.mapToObject(PARENT_SESSIONS),
    sends: SENDS
  }),
  restore: data => {
    persistence.restoreMap(CONSENT_TOKENS, data?.tokens);
    persistence.restoreMap(MAGIC_TOKENS, data?.magic);
    persistence.restoreMap(EMAIL_CHANGE_TOKENS, data?.emailChanges);
    persistence.restoreMap(UNSUB_TOKENS, data?.unsubs);
    persistence.restoreMap(PARENT_SESSIONS, data?.parentSessions);
    SENDS.child = data?.sends?.child || {};
    SENDS.parent = data?.sends?.parent || {};
    purgeExpiredTokens();
  }
});

module.exports = {
  POLICY_VERSION,
  DAY_MS,
  confirmationAllowed,
  markConfirmationSent,
  issueConsentToken,
  peekConsent,
  consumeConsent,
  issueMagicToken,
  consumeMagicToken,
  issueEmailChangeToken,
  consumeEmailChangeToken,
  issueUnsubscribeToken,
  consumeUnsubscribeToken,
  createParentSession,
  getParentSession,
  destroyParentSession,
  purgeExpiredTokens
};
