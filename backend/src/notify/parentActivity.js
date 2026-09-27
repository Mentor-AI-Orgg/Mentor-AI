// Email către părintele declarat la înregistrare. Părintele nu are cont;
// primește doar un mesaj scurt despre ce a făcut elevul.
//
// Fără SMTP, livrarea rămâne mock (ca restul integrărilor). Eșecul de
// email nu trebuie să strice cererea elevului.

const { findAccount, isConsentGranted } = require("../data/authStore");
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
  crisis_help: "a primit numerele de ajutor 116 111 și 112",
  checkout: "folosește mentorul gratuit",
  friend_request: "a trimis o cerere de prietenie",
  chapter_test: "a finalizat un test de capitol",
  en_exam: "a finalizat un test Evaluare Națională",
  test_result: "a finalizat un test"
};

const TEST_TYPES = new Set(["chapter_test", "en_exam", "test_result"]);
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
const INDIVIDUAL_CAP = 20;
const BATCH_SIZE = 8;

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
    const verdict = String(row.verdict || "");
    let mark = "";
    if (verdict === "equivalent") mark = " (corect, altfel spus)";
    else if (verdict === "partial") mark = " (jumătate)";
    else if (verdict === "near") mark = " (aproape, nepunctat)";
    else if (verdict === "empty") mark = " (fără răspuns)";
    else if (row.ok === true) mark = " (corect)";
    else if (row.ok === false) mark = " (nepunctat)";
    const why = row.teacher || row.explain ? `\n   De ce: ${clip(row.teacher || row.explain, 180)}` : "";
    return `${index + 1}. ${clip(row.prompt, 90)}\n   Răspunsul copilului: ${clip(given, 220)}${mark}${why}`;
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

function activityLine(type, note) {
  const action = LABELS[type] || "a făcut ceva în aplicație";
  const detail = clip(note, 180);
  return detail ? `${action}: ${detail}` : action;
}

async function sendParentMail({ studentEmail, parentEmail, subject, body, isTest }) {
  const { pushNotification } = require("../data/economyStore");
  const delivery = await deliverMessage({ to: parentEmail, subject, body, channel: "email" });
  if (isTest || subject.includes("rezumat")) {
    pushNotification(studentEmail, parentEmail, subject, body, "email", delivery);
  }
  return delivery;
}

async function notifyParent({ studentEmail, type, note = "", meta = {} }) {
  const account = findAccount(studentEmail);
  if (!account || account.role !== "student") {
    return { skipped: true, reason: "not_student" };
  }
  if (!isConsentGranted(account)) {
    return { skipped: true, reason: "consent_pending" };
  }

  const parentEmail = account.profile && account.profile.parentEmail;
  if (!parentEmail) {
    return { skipped: true, reason: "no_parent" };
  }

  if (!ALLOWED_TYPES.has(type)) {
    return { skipped: true, reason: "unknown_type" };
  }

  const { getUser, ensureUser, getTodayKey } = require("../data/economyStore");
  const economy = getUser(studentEmail) || ensureUser(studentEmail);
  const today = getTodayKey();
  if (!economy.parentNotify || economy.parentNotify.date !== today) {
    const leftover = economy.parentNotify?.pending || [];
    economy.parentNotify = {
      date: today,
      sent: 0,
      pending: [],
      loginDate: null,
      reviewDate: economy.parentNotify?.reviewDate || null,
      carry: leftover
    };
  }
  if (!Array.isArray(economy.parentLog)) economy.parentLog = [];
  economy.parentLog.push({
    at: new Date().toISOString(),
    type,
    note: clip(note, 180)
  });
  if (economy.parentLog.length > 300) economy.parentLog.splice(0, economy.parentLog.length - 300);

  if (type === "login" && economy.parentNotify.loginDate === today) {
    return { skipped: true, reason: "login_already_today", logged: true };
  }
  if (type === "login") economy.parentNotify.loginDate = today;

  const name = (account.profile && (account.profile.name || account.profile.username)) || studentEmail;
  const isTest = TEST_TYPES.has(type);
  const carry = economy.parentNotify.carry || [];
  economy.parentNotify.carry = [];
  const line = activityLine(type, type === "crisis_help" ? note : note);
  const subjectBase = isTest
    ? `Mentor AI: ${name} — nota ${meta.gradeNote != null ? meta.gradeNote : meta.grade || "—"} la ${meta.title || note || "test"}`
    : `Mentor AI: ${name} ${LABELS[type] || "a făcut o activitate"}`;

  if (economy.parentNotify.sent >= INDIVIDUAL_CAP) {
    economy.parentNotify.pending.push(line);
    if (economy.parentNotify.pending.length < BATCH_SIZE && !carry.length) {
      return { skipped: false, reason: "batched", logged: true, parentEmail };
    }
    const batch = economy.parentNotify.pending.splice(0, economy.parentNotify.pending.length);
    const body = [
      "Salut,",
      "",
      `${name} a mai făcut aceste lucruri în Mentor AI:`,
      ...carry.map(item => `- ${item}`),
      ...batch.map(item => `- ${item}`),
      "",
      "Primești fiecare activitate. După 20 de mesaje într-o zi, restul pleacă grupat, ca să nu umple căsuța."
    ].join("\n");
    const delivery = await sendParentMail({
      studentEmail,
      parentEmail,
      name,
      subject: `Mentor AI: ${name} — rezumat de activitate`,
      body,
      isTest: false
    });
    return { skipped: false, parentEmail, subject: `Mentor AI: ${name} — rezumat de activitate`, body, delivery, logged: true };
  }

  economy.parentNotify.sent += 1;
  const detail = type === "crisis_help"
    ? "A primit numerele de ajutor. Textul scris de copil nu este copiat în acest mesaj."
    : clip(note, 280);
  const body = isTest
    ? testEmailLines({ name, studentEmail, type, note, meta }).join("\n")
    : [
      "Salut,",
      "",
      `${name} (${studentEmail}) ${LABELS[type] || "a făcut o activitate"} în Mentor AI.`,
      detail ? `Detaliu: ${detail}` : "",
      carry.length ? "De ieri au mai rămas:" : "",
      ...carry.map(item => `- ${item}`),
      meta && meta.subject ? `Materie: ${meta.subject}` : "",
      "",
      "Nu ai nevoie de un cont. Primești un mesaj pentru fiecare lucru pe care îl face copilul în aplicație, la adresa salvată în contul lui."
    ].filter(item => item !== "").join("\n");

  const delivery = await sendParentMail({
    studentEmail,
    parentEmail,
    name,
    subject: subjectBase,
    body,
    isTest
  });
  return { skipped: false, parentEmail, subject: subjectBase, body, delivery, logged: true };
}

function notifyParentSoon(payload) {
  setImmediate(() => {
    notifyParent(payload).catch(() => {});
  });
}

module.exports = { notifyParent, notifyParentSoon, LABELS, ALLOWED_TYPES, formatDuration };
