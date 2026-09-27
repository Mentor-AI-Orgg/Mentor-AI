// Filtru local. Nu pleacă mesajul copilului către un serviciu plătit.

const CRISIS_KEYWORDS = [
  "sinucidere", "suicid", "sinucid", "vreau sa mor", "sa ma omor", "ma omor",
  "sunt abuzat", "ma abuzeaza", "abuz sexual", "kill myself", "want to die", "end my life"
];

const INAPPROPRIATE_KEYWORDS = [
  "bomba", "arma", "droguri", "sex explicit", "pornografie", "fura banca", "terorism",
  "make a bomb", "explod"
];

function foldSafety(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const CHEATING_PATTERNS = [
  "rezolvă-mi", "fă-mi tema", "scrie-mi compunerea", "dă-mi răspunsul", "copiază", "plagiază", "fă tot exercițiul", "fă-mi tot", "răspunde la tot",
  "solve for me", "do my homework", "write my essay", "give me answer", "do everything",
  "résous pour moi", "fais mes devoirs", "löse für mich", "mach meine hausaufgaben",
  "resuelve para mí", "haz mi tarea", "risolvi per me", "fai i miei compiti",
  "реши за меня", "сделай мою домашку", "old meg helyettem", "írd meg helyettem",
  "benim için çöz", "ödevimi yap", "帮我做", "给我答案", "私のために解いて", "宿題をやって"
];

// Doar cereri de tip „dă-mi răspunsul”, nu întrebări de învățare
// („ce este o fracție?”, „explică subiectul”). Altfel mentorul refuză
// exact întrebările cu care începe un copil de gimnaziu.
const DIRECT_ANSWER_PATTERNS = [
  /^(dă-mi|da-mi|spune-mi|give me)\s+(răspuns|raspuns|soluț|solut|rezultat|tema|tema rezolv)/i,
  /^(care este|care e)\s+(răspuns|raspuns|rezultat|soluț|solut)/i,
  /^(what is|give me)\s+(the\s+)?(answer|solution|result)\b/i
];

function hasNeedle(folded, needle) {
  if (!needle) return false;
  if (needle.length >= 6) {
    if (folded.includes(needle)) return true;
    if (folded.replace(/\s+/g, "").includes(needle.replace(/\s+/g, ""))) return true;
  }
  if (new RegExp(`(?:^|\\s)${escapeReg(needle)}(?:\\s|$)`).test(folded)) return true;
  const spaced = needle.split("").map(escapeReg).join("\\s+");
  return new RegExp(`(?:^|\\s)${spaced}(?:\\s|$)`).test(folded);
}

function escapeReg(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordFlags(message) {
  const folded = foldSafety(message);
  const flags = [];
  for (const kw of CRISIS_KEYWORDS) {
    if (hasNeedle(folded, foldSafety(kw))) flags.push("crisis");
  }
  for (const kw of INAPPROPRIATE_KEYWORDS) {
    if (hasNeedle(folded, foldSafety(kw))) flags.push("inappropriate_content");
  }
  for (const pattern of CHEATING_PATTERNS) {
    if (hasNeedle(folded, foldSafety(pattern))) flags.push("cheating_attempt");
  }
  return [...new Set(flags)];
}

function isDirectRequest(message) {
  const trimmed = String(message || "").trim();
  for (const pattern of DIRECT_ANSWER_PATTERNS) {
    if (pattern.test(trimmed)) return true;
  }
  return false;
}

async function safetyCheck(message) {
  const flags = keywordFlags(message);
  const direct = isDirectRequest(message);

  // Pre-filtrul refuză imediat: nu are rost să mai chemăm API-ul (și să
  // plătim) pentru un mesaj deja marcat.
  if (flags.includes("crisis")) {
    return { safe: false, kind: "crisis", flags, isDirectRequest: direct, moderation: "keyword" };
  }

  if (flags.includes("inappropriate_content")) {
    return { safe: false, kind: "blocked", flags, isDirectRequest: direct, moderation: "keyword" };
  }

  return {
    safe: flags.length === 0,
    kind: flags.length ? "caution" : "ok",
    flags: flags.length ? flags : ["none"],
    isDirectRequest: direct,
    moderation: "keyword"
  };
}

module.exports = {
  safetyCheck,
  isDirectRequest,
  CRISIS_KEYWORDS,
  INAPPROPRIATE_KEYWORDS,
  CHEATING_PATTERNS,
  DIRECT_ANSWER_PATTERNS
};
