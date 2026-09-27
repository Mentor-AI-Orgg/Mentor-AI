// Numele de utilizator se verifică pe server. Lista din browser nu e o barieră.

const SHAPE = /^[A-Za-zĂÂÎȘȚăâîșț0-9][A-Za-zĂÂÎȘȚăâîșț0-9_.-]{1,18}[A-Za-zĂÂÎȘȚăâîșț0-9]$/;
const SHAPE_MESSAGE = "Numele de utilizator are 3–20 caractere: litere, cifre, punct, liniuță sau liniuță jos.";
const BLOCKED_MESSAGE = "Alege un alt nume de utilizator.";

const CONTAINS = [
  "prost", "tampit", "idiot", "curva", "pizda", "muie", "futut", "cacat",
  "dracu", "nenorocit", "jegos", "handicapat", "bulangiu", "muist", "labagiu",
  "mortii", "hitler", "nazist", "porno", "porn"
];

const EXACT = [
  "sex", "admin", "administrator", "moderator", "suport", "support",
  "suntde10", "mentor"
];

function fold(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/gi, "s")
    .replace(/ț/gi, "t")
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/[@]/g, "a")
    .replace(/[._\-\s]/g, "");
}

function blocked(value) {
  const folded = fold(value);
  if (!folded) return true;
  if (EXACT.includes(folded)) return true;
  return CONTAINS.some(word => folded.includes(word));
}

function usernameError(value) {
  const raw = String(value || "").trim();
  if (!SHAPE.test(raw)) return SHAPE_MESSAGE;
  if (blocked(raw)) return BLOCKED_MESSAGE;
  return "";
}

function textRejected(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.length > 200) return "Textul are cel mult 200 de caractere.";
  if (blocked(raw)) return BLOCKED_MESSAGE;
  return "";
}

module.exports = { usernameError, textRejected, SHAPE_MESSAGE, BLOCKED_MESSAGE };
