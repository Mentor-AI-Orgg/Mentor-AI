// Conturile rămase fără acordul părintelui se șterg după 14 zile.
// eraseAccount trece prin registrul GDPR, deci dispar și datele din celelalte store-uri.

const { listAccounts } = require("./authStore");
const { eraseAccount } = require("../routes/account");
const { PENDING_MS } = require("../config/retention");
let timer = null;

function pendingSince(account) {
  const raw = account.consent?.requestedAt || account.createdAt;
  const at = Date.parse(raw || "");
  return Number.isFinite(at) ? at : Date.now();
}

function runPendingCleanup(now = Date.now()) {
  const removed = [];
  for (const account of listAccounts()) {
    if (account.role !== "student") continue;
    if (account.consent && account.consent.status === "granted") continue;
    if (now - pendingSince(account) <= PENDING_MS) continue;
    removed.push(account.email);
    eraseAccount(account.email);
  }
  return removed;
}

function startPendingCleanup() {
  if (timer) return;
  timer = setInterval(() => {
    try { runPendingCleanup(); } catch { /* curățenia nu oprește aplicația */ }
  }, 24 * 60 * 60 * 1000);
  timer.unref();
}

module.exports = { runPendingCleanup, startPendingCleanup, PENDING_MS };
