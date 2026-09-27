// O singură treabă zilnică: acorduri expirate, conturi inactive, tokenuri,
// jurnalul părintelui, memoria mentorului și registrul de ștergeri.

const { listAccounts } = require("./authStore");
const { purgeExpiredResets } = require("./authStore");
const { purgeExpiredTokens } = require("./consentStore");
const { runPendingCleanup } = require("./pendingCleanup");
const { purgeStale } = require("../memory/memoryStore");
const { pruneHistory } = require("./economyStore");
const registry = require("./userDataRegistry");
const {
  INACTIVE_MS,
  WARNING_BEFORE_MS,
  PARENT_ACTIVITY_MS,
  TUTOR_MEMORY_MS
} = require("../config/retention");

let timer = null;

function idleSince(account) {
  const raw = account.lastLoginAt || account.createdAt;
  const at = Date.parse(raw || "");
  return Number.isFinite(at) ? at : Date.now();
}

async function warnOnce(account) {
  const parentEmail = account.profile?.parentEmail || "";
  if (!parentEmail) {
    account.inactivityWarningSent = true;
    return;
  }
  try {
    const { deliverMessage } = require("../notify/deliver");
    await deliverMessage({
      to: parentEmail,
      subject: "Contul de pe Sunt de 10 va fi șters",
      body: "Nimeni nu a intrat în cont de aproape doi ani. Dacă nu intrați în 30 de zile, ștergem contul și datele.",
      channel: "email"
    });
    account.inactivityWarningSent = true;
  } catch {
    // Rămâne de retrimis la următoarea rulare.
  }
}

async function runRetention(now = Date.now()) {
  const pending = runPendingCleanup(now);
  const granted = listAccounts().filter(account => (
    account.role === "student" && account.consent?.status === "granted"
  ));
  const removedInactive = [];
  for (const account of granted) {
    if (!listAccounts().some(row => row.email === account.email)) continue;
    const idle = now - idleSince(account);
    if (idle >= INACTIVE_MS) {
      const { eraseAccount } = require("../routes/account");
      await eraseAccount(account.email);
      removedInactive.push(account.email);
    } else if (idle >= INACTIVE_MS - WARNING_BEFORE_MS && !account.inactivityWarningSent) {
      await warnOnce(account);
    }
  }
  purgeExpiredTokens(now);
  purgeExpiredResets(now);
  pruneHistory(PARENT_ACTIVITY_MS, now);
  purgeStale(TUTOR_MEMORY_MS, now);
  const deletions = registry.purgeDeletions(now);
  return { pending, removedInactive, deletions };
}

function startRetention() {
  if (timer) return;
  timer = setInterval(() => {
    runRetention().catch(() => { /* curățenia nu oprește aplicația */ });
  }, 24 * 60 * 60 * 1000);
  timer.unref();
}

module.exports = { runRetention, startRetention };
