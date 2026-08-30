// Email către părintele declarat la înregistrare. Părintele nu are cont;
// primește doar un mesaj scurt despre ce a făcut elevul.
//
// Fără SMTP, livrarea rămâne mock (ca restul integrărilor). Eșecul de
// email nu trebuie să strice cererea elevului.

const { findAccount } = require("../data/authStore");
const { deliverMessage, smtpConfigured } = require("./deliver");

const LABELS = {
  account_created: "și-a creat contul",
  login: "s-a conectat",
  mentor_message: "a întrebat mentorul",
  learn_module: "a lucrat un modul de învățare",
  flashcards_generate: "a generat flashcarduri",
  flashcards_result: "a rezolvat flashcarduri",
  ai_detect: "a folosit detectorul demo",
  focus_session: "a terminat o sesiune de focus",
  claim: "a revendicat o recompensă",
  buy: "a cumpărat din magazin",
  calendar_event: "a adăugat un eveniment în calendar",
  checkout: "folosește mentorul gratuit"
};

const ALWAYS_SEND = new Set(["account_created"]);
const STUDY_TYPES = new Set([
  "mentor_message",
  "learn_module",
  "flashcards_generate",
  "flashcards_result",
  "flashcard_known",
  "focus_session",
  "chapter_open",
  "session_complete"
]);
const SKIP_TYPES = new Set(["claim", "buy", "ai_detect", "checkout", "calendar_event"]);

async function notifyParent({ studentEmail, type, note = "", meta = {} }) {
  const account = findAccount(studentEmail);
  if (!account || account.role !== "student") {
    return { skipped: true, reason: "not_student" };
  }

  const parentEmail = account.profile && account.profile.parentEmail;
  if (!parentEmail) {
    return { skipped: true, reason: "no_parent" };
  }

  const { getUser, ensureUser, getTodayKey } = require("../data/economyStore");
  const economy = getUser(studentEmail) || ensureUser(studentEmail);
  const today = getTodayKey();
  if (!economy.parentNotify) economy.parentNotify = { studyDate: null, loginDate: null };

  if (SKIP_TYPES.has(type)) {
    return { skipped: true, reason: "throttled_noise" };
  }
  if (type === "login") {
    if (economy.parentNotify.loginDate === today) {
      return { skipped: true, reason: "login_already_today" };
    }
    economy.parentNotify.loginDate = today;
  }
  if (STUDY_TYPES.has(type) && !ALWAYS_SEND.has(type)) {
    if (economy.parentNotify.studyDate === today) {
      return { skipped: true, reason: "study_digest_today" };
    }
    economy.parentNotify.studyDate = today;
  }

  const name = (account.profile && (account.profile.name || account.profile.username)) || studentEmail;
  const action = STUDY_TYPES.has(type)
    ? "a învățat astăzi (un singur mesaj pe zi)"
    : (LABELS[type] || `a făcut o activitate (${type})`);
  const detail = String(note || "").replace(/\s+/g, " ").trim().slice(0, 280);
  const subject = `Mentor AI: ${name} ${action}`;
  const body = [
    "Salut,",
    "",
    `${name} (${studentEmail}) ${action} în Mentor AI.`,
    detail ? `Detaliu: ${detail}` : "",
    meta && meta.subject ? `Materie: ${meta.subject}` : "",
    "",
    "Nu ai nevoie de un cont în aplicație. Primești aceste mesaje pe emailul dat la înregistrarea copilului.",
    smtpConfigured() ? "" : "Notă: serverul nu are SMTP configurat, deci mesajul rămâne în jurnalul de livrare (mock)."
  ].filter(line => line !== "").join("\n");

  const delivery = await deliverMessage({ to: parentEmail, subject, body, channel: "email" });
  return { skipped: false, parentEmail, subject, delivery };
}

function notifyParentSoon(payload) {
  setImmediate(() => {
    notifyParent(payload).catch(() => {});
  });
}

module.exports = { notifyParent, notifyParentSoon, LABELS };
