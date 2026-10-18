// Numele de utilizator se verifică pe server. Lista din browser nu e o barieră.

const fs = require("fs");
const path = require("path");

const FRIENDLY = "Alege alt nume. Nu folosi numele tău real, cuvinte urâte sau date de contact.";
const SHAPE = /^[A-Za-zĂÂÎȘȚăâîșț0-9][A-Za-zĂÂÎȘȚăâîșț0-9_.]{1,18}[A-Za-zĂÂÎȘȚăâîșț0-9]$/;

const RESERVED = [
  "admin",
  "administrator",
  "moderator",
  "suntde10",
  "sunt_de_10",
  "creator",
  "profesor",
  "parinte",
  "support",
  "suport",
  "ajutor"
];

function loadLists() {
  const file = path.join(__dirname, "blockedWords.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    words: Array.isArray(data.words) ? data.words : [],
    exceptions: Array.isArray(data.exceptions) ? data.exceptions : []
  };
}

const LISTS = loadLists();

function mascotName() {
  try {
    const file = path.join(__dirname, "..", "..", "..", "shared", "mascot.json");
    if (!fs.existsSync(file)) return "";
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return String(data.MASCOT_NAME || data.name || "").trim();
  } catch {
    return "";
  }
}

function stripDecor(value) {
  return String(value || "")
    .replace(/[șş]/gi, "s")
    .replace(/[țţ]/gi, "t")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[._\-\s]/g, "");
}

function leet(value) {
  return String(value || "")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/\$/g, "s");
}

function collapse(value) {
  return String(value || "").replace(/(.)\1+/g, "$1");
}

function fold(value) {
  return collapse(leet(stripDecor(value)));
}

function plain(value) {
  return collapse(stripDecor(value));
}

function looksLikeContact(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return false;
  if (raw.includes("@")) return true;
  if (raw.startsWith("www") || raw.includes("www.")) return true;
  if (raw.includes("http")) return true;
  if (raw.includes(".ro") || raw.includes(".com")) return true;
  if (raw.replace(/\D/g, "").length >= 9) return true;
  const folded = fold(raw);
  return ["insta", "tiktok", "snap"].some(word => folded.includes(word));
}

function isReserved(value) {
  const folded = fold(value);
  const plainName = plain(value);
  const names = RESERVED.slice();
  const mascot = mascotName();
  if (mascot) names.push(mascot);
  return names.some(name => folded === fold(name) || plainName === plain(name));
}

function tokenFolds(value) {
  return String(value || "")
    .split(/[^A-Za-zĂÂÎȘȚăâîșț0-9]+/)
    .map(part => fold(part))
    .filter(Boolean);
}

function isBlocked(value) {
  const folded = fold(value);
  if (!folded) return false;
  if (LISTS.exceptions.some(item => fold(item) === folded)) return false;
  const tokens = tokenFolds(value);
  return LISTS.words.some(word => {
    const needle = fold(word);
    if (needle.length < 3) return false;
    // Cuvintele scurte (sex, anal, cock) se potrivesc doar întregi.
    // Altfel „analiza”, „essex” sau un nume obișnuit pică din greșeală.
    if (needle.length <= 4) return folded === needle || tokens.some(token => token === needle);
    return folded.includes(needle);
  });
}

function usernameIssue(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return { code: "username_empty", error: "Scrie un nume de utilizator. Câmpul e gol." };
  if (trimmed.length < 3) return { code: "username_too_short", error: "Numele trebuie să aibă cel puțin 3 caractere." };
  if (looksLikeContact(trimmed)) {
    return { code: "username_contact_info", error: "Nu pune telefon, email sau rețele sociale în nume." };
  }
  if (/^\d{3,}/.test(trimmed)) {
    return { code: "username_invalid_chars", error: "Nu începe numele cu mai multe cifre." };
  }
  if (!SHAPE.test(trimmed)) {
    return { code: "username_invalid_chars", error: "Folosește litere, cifre, punct sau liniuță jos, fără spații." };
  }
  if (isReserved(trimmed)) return { code: "username_reserved", error: "Acest nume e rezervat. Alege altul." };
  if (isBlocked(trimmed)) return { code: "username_blocked", error: "Alege alt nume. Cuvintele nepotrivite nu sunt permise." };
  return null;
}

function suggestUsernames(name) {
  const stem = String(name || "")
    .trim()
    .replace(/[^A-Za-zĂÂÎȘȚăâîșț0-9._]/g, "")
    .replace(/^[._]+|[._]+$/g, "")
    .slice(0, 14) || "elev";
  const ideas = [`${stem}123`, `${stem}_10`, `${stem}7`];
  const unique = [];
  for (const idea of ideas) {
    if (unique.includes(idea) || usernameIssue(idea)) continue;
    unique.push(idea);
  }
  return unique;
}

function takenError(name, suggestions = []) {
  const shown = String(name || "").trim();
  const first = suggestions[0];
  if (first) return `Numele ${shown} e deja folosit, încearcă ${first}.`;
  return `Numele ${shown} e deja folosit. Alege altul.`;
}

function usernameError(value) {
  const issue = usernameIssue(value);
  return issue ? issue.error : "";
}

function textRejected(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.length > 200) return "Textul are cel mult 200 de caractere.";
  if (looksLikeContact(raw) || isBlocked(raw)) return FRIENDLY;
  return "";
}

// Insulte ușoare rămân blocate la username, nu în fraze de lecție
// („sunt prost la fracții”, „analiză”). Aici prinzi doar cuvintele vădit nepotrivite.
const MILD = new Set([
  "prost", "tampit", "idiot", "cretin", "cacat", "dracu", "nenorocit", "jegos"
]);

function obviouslyInappropriate(value) {
  const tokens = String(value || "").split(/[^A-Za-zĂÂÎȘȚăâîșț0-9]+/);
  for (const token of tokens) {
    const folded = fold(token);
    if (!folded || folded.length < 3) continue;
    if (MILD.has(folded)) continue;
    if (LISTS.exceptions.some(item => fold(item) === folded)) continue;
    if (LISTS.words.some(word => fold(word) === folded)) return FRIENDLY;
  }
  return "";
}

module.exports = {
  FRIENDLY,
  usernameIssue,
  usernameError,
  suggestUsernames,
  takenError,
  textRejected,
  obviouslyInappropriate,
  fold
};
