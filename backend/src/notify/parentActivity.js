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
  checkout: "folosește mentorul gratuit",
  friend_request: "a trimis o cerere de prietenie",
  chapter_test: "a finalizat un test de capitol",
  en_exam: "a finalizat un test Evaluare Națională",
  test_result: "a finalizat un test"
};

const ALWAYS_SEND = new Set(["account_created"]);
const TEST_TYPES = new Set(["chapter_test", "en_exam", "test_result"]);
const STUDY_TYPES = new Set([
  "mentor_message",
  "learn_module",
  "flashcards_generate",
  "flashcards_result",
  "flashcard_known",
  "focus_session",
  "chapter_open",
  "session_complete",
  "friend_request"
]);
const SKIP_TYPES = new Set(["claim", "buy", "ai_detect", "checkout", "calendar_event"]);

function clip(text, n) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (value.length <= n) return value;
  return `${value.slice(0, Math.max(0, n - 1))}…`;
}

function formatDuration(ms) {
  const totalSec = Math.max(0, Math.round(Number(ms) || 0) / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = Math.floor(totalSec % 60);
  if (hours > 0) {
    return `${hours} ${hours === 1 ? "oră" : "ore"}${minutes ? ` ${minutes} min` : ""}`;
  }
  if (minutes > 0) {
    return `${minutes} min${seconds ? ` ${seconds} s` : ""}`;
  }
  return `${seconds} s`;
}

function testEmailLines({ name, studentEmail, type, note, meta }) {
  const title = meta.title || note || (type === "en_exam" ? "Test Evaluare Națională" : "Test");
  const grade = meta.gradeNote != null ? meta.gradeNote : meta.grade;
  const answers = Array.isArray(meta.answers) ? meta.answers : [];
  const answerLines = answers.slice(0, 40).map((row, index) => {
    const given = row.letter || row.text || row.given || "—";
    const mark = row.ok === true ? " (corect)" : row.ok === false ? " (greșit)" : "";
    return `${index + 1}. ${clip(row.prompt, 90)}\n   Răspunsul copilului: ${clip(given, 220)}${mark}`;
  });
  return [
    "Salut,",
    "",
    `${name} (${studentEmail}) a finalizat un test în Mentor AI.`,
    `Test: ${title}`,
    meta.subject ? `Materie: ${meta.subject}` : "",
    grade != null && grade !== "" ? `Nota: ${grade}` : "",
    `Durată: ${formatDuration(meta.durationMs || meta.duration_ms || 0)}`,
    "",
    "Ce a răspuns copilul:",
    answerLines.length ? answerLines.join("\n") : "(fără răspunsuri salvate)",
    "",
    "Nu ai nevoie de un cont în aplicație. Primești aceste mesaje pe emailul dat la înregistrarea copilului.",
    smtpConfigured() ? "" : "Notă: serverul nu are SMTP configurat, deci mesajul rămâne în jurnalul de livrare (mock)."
  ].filter(line => line !== "");
}

async function notifyParent({ studentEmail, type, note = "", meta = {} }) {
  const account = findAccount(studentEmail);
  if (!account || account.role !== "student") {
    return { skipped: true, reason: "not_student" };
  }

  const parentEmail = account.profile && account.profile.parentEmail;
  if (!parentEmail) {
    return { skipped: true, reason: "no_parent" };
  }

  const { getUser, ensureUser, getTodayKey, pushNotification } = require("../data/economyStore");
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

  const isTest = TEST_TYPES.has(type);
  if (STUDY_TYPES.has(type) && !ALWAYS_SEND.has(type) && !isTest) {
    if (economy.parentNotify.studyDate === today) {
      return { skipped: true, reason: "study_digest_today" };
    }
    economy.parentNotify.studyDate = today;
  }
  if (isTest) {
    economy.parentNotify.studyDate = today;
  }

  const name = (account.profile && (account.profile.name || account.profile.username)) || studentEmail;
  const action = isTest
    ? (LABELS[type] || "a finalizat un test")
    : (STUDY_TYPES.has(type)
      ? "a învățat astăzi (un singur mesaj pe zi)"
      : (LABELS[type] || `a făcut o activitate (${type})`));
  const detail = String(note || "").replace(/\s+/g, " ").trim().slice(0, 280);
  const subject = isTest
    ? `Mentor AI: ${name} — nota ${meta.gradeNote != null ? meta.gradeNote : meta.grade || "—"} la ${meta.title || note || "test"}`
    : `Mentor AI: ${name} ${action}`;
  const body = isTest
    ? testEmailLines({ name, studentEmail, type, note, meta }).join("\n")
    : [
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
  if (isTest) {
    pushNotification(studentEmail, parentEmail, subject, body, "email", delivery);
  }
  return { skipped: false, parentEmail, subject, body, delivery };
}

function notifyParentSoon(payload) {
  setImmediate(() => {
    notifyParent(payload).catch(() => {});
  });
}

module.exports = { notifyParent, notifyParentSoon, LABELS, formatDuration };
