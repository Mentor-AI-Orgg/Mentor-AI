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

function isBlocked(value) {
  const folded = fold(value);
  if (!folded) return false;
  if (LISTS.exceptions.some(item => fold(item) === folded)) return false;
  return LISTS.words.some(word => {
    const needle = fold(word);
    return needle.length >= 3 && folded.includes(needle);
  });
}

function usernameIssue(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return { code: "username_invalid_chars", error: FRIENDLY };
  if (looksLikeContact(trimmed)) return { code: "username_contact_info", error: FRIENDLY };
  if (!SHAPE.test(trimmed) || /^\d{3,}/.test(trimmed)) {
    return { code: "username_invalid_chars", error: FRIENDLY };
  }
  if (isReserved(trimmed)) return { code: "username_reserved", error: FRIENDLY };
  if (isBlocked(trimmed)) return { code: "username_blocked", error: FRIENDLY };
  return null;
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
  textRejected,
  obviouslyInappropriate,
  fold
};
