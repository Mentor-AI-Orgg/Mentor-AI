// Fiecare store care ține date despre un copil se înregistrează singur.
// Registrul nu importă store-urile: altfel apare un ciclu la pornire.
// Exportul și ștergerea contului trec doar pe aici.

const crypto = require("crypto");
const persistence = require("./persistence");
const { DELETION_KEEP_MS } = require("../config/retention");

const handlers = new Map();
const DELETIONS = [];

// Store-urile din loadUserStores.js trebuie să acopere lista asta.
const EXPECTED = Object.freeze([
  "auth",
  "friends",
  "calendar",
  "memory",
  "consent",
  "economy",
  "evaluare",
  "fotografii",
  "moderare",
  "emailuri"
]);

function normalize(email) {
  return String(email || "").trim().toLowerCase();
}

function missingExpected() {
  return EXPECTED.filter(name => !handlers.has(name));
}

function userIdHash(email) {
  return crypto.createHash("sha256").update(normalize(email)).digest("hex");
}

function register(name, entry) {
  if (!name || typeof entry?.exportFor !== "function" || typeof entry?.eraseFor !== "function") {
    throw new Error(`Registrul GDPR cere exportFor și eraseFor pentru „${name}”.`);
  }
  handlers.set(name, entry);
}

function exportAll(email) {
  const slices = {};
  for (const [name, entry] of handlers.entries()) {
    slices[name] = entry.exportFor(email);
  }
  return slices;
}

function eraseAll(email) {
  for (const entry of handlers.values()) {
    entry.eraseFor(email);
  }
}

function recordDeletion(email, at = new Date().toISOString()) {
  const hash = userIdHash(email);
  DELETIONS.push({ userIdHash: hash, at });
  return hash;
}

function listDeletions() {
  return DELETIONS.map(row => ({ ...row }));
}

function purgeDeletions(now = Date.now(), keepMs = DELETION_KEEP_MS) {
  const cutoff = now - keepMs;
  let removed = 0;
  for (let i = DELETIONS.length - 1; i >= 0; i -= 1) {
    const at = Date.parse(DELETIONS[i].at || "");
    if (!Number.isFinite(at) || at < cutoff) {
      DELETIONS.splice(i, 1);
      removed += 1;
    }
  }
  return removed;
}

persistence.register("deletions", {
  snapshot: () => ({ records: DELETIONS.slice() }),
  restore: data => {
    DELETIONS.splice(0, DELETIONS.length, ...(Array.isArray(data?.records) ? data.records : []));
  }
});

module.exports = {
  register,
  exportAll,
  eraseAll,
  recordDeletion,
  listDeletions,
  purgeDeletions,
  userIdHash,
  missingExpected,
  EXPECTED
};
