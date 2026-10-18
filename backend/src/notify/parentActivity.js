// Activitatea copilului se adună și pleacă într-un rezumat, după ora 19.
// Duminica pornesc săptămânalele. Ce nu încape în plafonul zilei pleacă în
// zilele următoare. Nu copiem mesaje, răspunsuri sau câmpul note.

const { findAccount, accountIsOpen, listAccounts } = require("../data/authStore");
const { getGuide } = require("../data/gimnaziuGuide");
const { publicPaperById } = require("../data/enPaperFactory");
const { capDurationMs } = require("../data/chapterTestSession");

const LABELS = {
  learn_module: "lecție",
  chapter_open: "lecție",
  flashcards_generate: "lecție",
  flashcards_result: "lecție",
  flashcard_known: "lecție",
  focus_session: "lecție",
  session_complete: "lecție",
  save_session: "lecție",
  chapter_test: "test",
  en_exam: "test",
  test_result: "test"
};

const ALLOWED_TYPES = new Set([
  "account_created",
  "login",
  "mentor_message",
  "learn_module",
  "flashcards_generate",
  "flashcards_result",
  "flashcard_known",
  "focus_session",
  "chapter_open",
  "session_complete",
  "save_session",
  "friend_request",
  "chapter_test",
  "en_exam",
  "test_result",
  "calendar_event",
  "claim",
  "buy",
  "crisis_help"
]);

const QUIET = new Set(["login", "mentor_message", "crisis_help", "account_created"]);
const TEST_TYPES = new Set(["chapter_test", "en_exam", "test_result"]);
const LESSON_TYPES = new Set([
  "learn_module",
  "chapter_open",
  "flashcards_generate",
  "flashcards_result",
  "flashcard_known",
  "focus_session",
  "session_complete",
  "save_session"
]);
const DAILY_CAP = 3;
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const SENT = {};
const mailBudget = require("./mailBudget");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bucharestParts(now = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23"
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map(part => [part.type, part.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: parts.weekday
  };
}

function numberOrNull(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function catalogTitle(meta = {}) {
  const chapterId = meta.chapterId || meta.chapter_id;
  if (chapterId) {
    try {
      const guide = getGuide(meta.subject || "matematica", meta.grade || meta.class_level || meta.class || 5);
      const unit = (guide.units || []).find(item => item.id === chapterId);
      if (unit?.title) return unit.title;
    } catch {
      /* titlul rămâne gol dacă materia nu e în catalog */
    }
  }
  if (meta.paperId) {
    const paper = publicPaperById(meta.paperId);
    if (paper?.title) return paper.title;
  }
  return "";
}

function reserveOutbound(parentEmail, date) {
  const key = String(parentEmail || "").trim().toLowerCase();
  if (!key) return false;
  const row = SENT[key];
  if (!row || row.date !== date) SENT[key] = { date, count: 0 };
  if (SENT[key].count >= DAILY_CAP) return false;
  SENT[key].count += 1;
  return true;
}

function outboundCount(parentEmail, date) {
  const row = SENT[String(parentEmail || "").trim().toLowerCase()];
  if (!row || row.date !== date) return 0;
  return row.count;
}

async function notifyParent({ studentEmail, type, meta = {} }) {
  if (type === "chapter_test" && !meta.serverScored) {
    return { skipped: true, reason: "untrusted_score" };
  }
  const account = findAccount(studentEmail);
  if (!account || account.role !== "student") return { skipped: true, reason: "not_student" };
  if (type === "crisis_help") return { skipped: true, reason: "crisis_no_email" };
  if (!accountIsOpen(account)) return { skipped: true, reason: "consent_pending" };
  if (!account.profile?.parentEmail) return { skipped: true, reason: "no_parent" };
  if (!ALLOWED_TYPES.has(type)) return { skipped: true, reason: "unknown_type" };
  if (QUIET.has(type)) return { skipped: true, reason: "not_emailed" };
  if (account.profile.parentEmails === "off") return { skipped: true, reason: "emails_off" };

  const { getUser, ensureUser } = require("../data/economyStore");
  const economy = getUser(studentEmail) || ensureUser(studentEmail);
  if (!Array.isArray(economy.digestEvents)) economy.digestEvents = [];
  let minutes = numberOrNull(meta.minutes) ?? (
    numberOrNull(meta.durationMs) != null ? Math.max(0, Math.round(numberOrNull(meta.durationMs) / 60000)) : 0
  );
  let correct = numberOrNull(meta.correct ?? meta.score);
  let total = numberOrNull(meta.total);
  if (type === "chapter_test") {
    const durationMs = capDurationMs(meta.durationMs);
    minutes = Math.max(0, Math.round(durationMs / 60000));
    correct = numberOrNull(meta.correct ?? meta.score);
    total = numberOrNull(meta.total);
  }
  economy.digestEvents.push({
    at: new Date().toISOString(),
    type,
    title: catalogTitle(meta),
    correct,
    total,
    minutes
  });
  if (economy.digestEvents.length > 400) economy.digestEvents.splice(0, economy.digestEvents.length - 400);
  return {
    skipped: false,
    reason: "digest",
    delivery: { mocked: true, deferred: true, delivered: false }
  };
}

function notifyParentSoon() {
  return { skipped: true, reason: "not_emailed" };
}

function addCalendarDays(date, days) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function weekKey(clock) {
  const index = WEEKDAY_INDEX[clock.weekday];
  if (index == null) return clock.date;
  return addCalendarDays(clock.date, -index);
}

function sentThisWeek(economy, week) {
  if (economy.digestWeek === week) return true;
  const on = String(economy.digestSentOn || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(on)) return false;
  return on >= week && on <= addCalendarDays(week, 6);
}

function digestLine(events, username, label = "Azi") {
  const lessons = events.filter(event => LESSON_TYPES.has(event.type)).length;
  const tests = events.filter(event => TEST_TYPES.has(event.type));
  const minutes = events.reduce((sum, event) => sum + (Number(event.minutes) || 0), 0);
  const testBits = tests.map(event => {
    const title = event.title || "Test";
    if (event.correct != null && event.total != null) return `${title}: ${event.correct} din ${event.total}`;
    return title;
  });
  const bits = [`${lessons} ${lessons === 1 ? "lecție" : "lecții"}`];
  if (tests.length) bits.push(`${tests.length} ${tests.length === 1 ? "test" : "teste"}${testBits.length ? ` (${testBits.join(", ")})` : ""}`);
  return `${label}, ${username} a lucrat ${minutes} ${minutes === 1 ? "minut" : "minute"}: ${bits.join(", ")}.`;
}

async function sendDueDigests(now = new Date(), { force = false, budget = mailBudget.DIGEST_DAILY_BUDGET } = {}) {
  const clock = bucharestParts(now);
  if (!force && clock.hour < 19) return [];
  if (!force && !require("../data/persistence").thisProcessWrites()) return [];
  if (mailBudget.quotaBlocked(now)) return [];
  let room = mailBudget.digestRoom(clock.date, budget);
  if (room <= 0) return [];
  const week = weekKey(clock);
  const { issueUnsubscribeToken } = require("../data/consentStore");
  const { publicBaseUrl } = require("../publicUrl");
  const { getUser } = require("../data/economyStore");
  const due = [];
  for (const account of listAccounts()) {
    if (account.role !== "student" || !accountIsOpen(account)) continue;
    const freq = account.profile.parentEmails || "weekly";
    if (freq === "off") continue;
    const economy = getUser(account.email);
    if (!economy || !economy.digestEvents?.length) continue;
    if (economy.digestHeldOn === clock.date) continue;
    if (freq === "daily") {
      if (economy.digestSentOn === clock.date) continue;
    } else if (sentThisWeek(economy, week)) continue;
    due.push({ account, freq, economy });
  }
  due.sort((a, b) => {
    const rank = item => (item.freq === "daily" ? 1 : 0);
    const byKind = rank(a) - rank(b);
    if (byKind) return byKind;
    return String(a.account.email).localeCompare(String(b.account.email));
  });
  const sent = [];
  let changed = false;
  for (const item of due) {
    if (room <= 0 || mailBudget.quotaBlocked(now)) break;
    const { account, freq, economy } = item;
    const parentEmail = account.profile.parentEmail;
    if (!reserveOutbound(parentEmail, clock.date)) continue;
    const username = escapeHtml(account.profile.username || "copilul");
    const events = economy.digestEvents.map(event => ({
      ...event,
      title: escapeHtml(event.title || "")
    }));
    const token = issueUnsubscribeToken(account.email);
    const base = publicBaseUrl({ headers: {}, protocol: "https" });
    const body = [
      digestLine(events, username, freq === "daily" ? "Azi" : "Săptămâna asta"),
      `Zona de părinte: ${base}/#/parinte`,
      `Fără emailuri: ${base}/#/emailuri/${token}`
    ].join("\n");
    const subject = freq === "daily" ? "Rezumatul zilei pe Sunt de 10" : "Rezumatul săptămânii pe Sunt de 10";
    const delivery = await require("./deliver").deliverMessage({
      to: parentEmail,
      subject,
      body,
      channel: "email",
      action: "digest"
    });
    if (delivery.quota) {
      mailBudget.noteQuota(now);
      break;
    }
    const accepted = Boolean(delivery.delivered || delivery.mocked);
    if (!accepted) {
      economy.digestHeldOn = clock.date;
      changed = true;
      continue;
    }
    economy.digestSentOn = clock.date;
    economy.digestWeek = week;
    if (freq === "daily") economy.digestEvents = [];
    mailBudget.recordDigest(clock.date);
    room -= 1;
    changed = true;
    sent.push({ to: parentEmail, subject, body, delivery, username: account.profile.username });
  }
  if (changed) {
    try {
      require("../data/persistence").saveNow();
    } catch {
      /* marcajul rămâne în memorie până la salvarea următoare */
    }
  }
  return sent;
}

let digestTimer = null;
function startDigestSchedule() {
  if (digestTimer) return;
  digestTimer = setInterval(() => {
    sendDueDigests().catch(() => {});
  }, 15 * 60 * 1000);
  digestTimer.unref();
}

require("../data/userDataRegistry").register("emailuri", {
  exportFor: () => null,
  eraseFor(email) {
    delete SENT[String(email || "").trim().toLowerCase()];
  }
});

require("../data/persistence").register("mailBudget", {
  snapshot: () => mailBudget.snapshot(),
  restore: data => mailBudget.restore(data)
});

module.exports = {
  notifyParent,
  notifyParentSoon,
  sendDueDigests,
  startDigestSchedule,
  reserveOutbound,
  outboundCount,
  escapeHtml,
  bucharestParts,
  digestLine,
  weekKey,
  LABELS,
  ALLOWED_TYPES,
  DAILY_CAP
};
