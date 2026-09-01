// Filtru de siguranță pe două straturi:
//   1. listă de cuvinte-cheie (pre-filtru ieftin, mereu activ);
//   2. API-ul de moderare OpenAI, dacă OPENAI_KEY este setat.
//
// Lista de cuvinte singură e trivial de ocolit (sinonime, diacritice, engleză).
// Moderarea reală prinde mai mult, dar nu trebuie să lase chat-ul jos: dacă
// API-ul pică, rămânem pe pre-filtru și lăsăm mesajul să treacă mai departe.

const config = require("../config");

const INAPPROPRIATE_KEYWORDS = [
  "bomba", "arma", "ucide", "sinucidere", "suicid", "sinucid", "droguri",
  "sex explicit", "pornografie", "hack", "fura banca", "virus", "terorism",
  "criminal", "viol", "abuz", "omor", "explod", "kill myself", "make a bomb",
  "want to die", "end my life"
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

const MODERATION_TIMEOUT_MS = 4000;

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

async function checkOpenAIModeration(text) {
  if (!config.OPENAI_KEY) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MODERATION_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: String(text || "").slice(0, 8000) }),
      signal: controller.signal
    });
    if (!response.ok) return null;
    const data = await response.json();
    const result = data.results && data.results[0];
    if (!result) return null;
    if (result.flagged) {
      const categories = Object.entries(result.categories || {})
        .filter(([, value]) => value)
        .map(([name]) => name);
      return { flagged: true, categories, source: "openai" };
    }
    return { flagged: false, source: "openai" };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function safetyCheck(message) {
  const flags = keywordFlags(message);
  const direct = isDirectRequest(message);

  // Pre-filtrul refuză imediat: nu are rost să mai chemăm API-ul (și să
  // plătim) pentru un mesaj deja marcat.
  if (flags.includes("inappropriate_content")) {
    return { safe: false, flags, isDirectRequest: direct, moderation: "keyword" };
  }

  const moderation = await checkOpenAIModeration(message);
  if (moderation && moderation.flagged) {
    flags.push("inappropriate_content", "openai_moderation", ...(moderation.categories || []));
    return {
      safe: false,
      flags: [...new Set(flags)],
      isDirectRequest: direct,
      moderation: "openai"
    };
  }

  return {
    safe: flags.length === 0,
    flags: flags.length ? flags : ["none"],
    isDirectRequest: direct,
    moderation: moderation ? moderation.source : "keyword"
  };
}

module.exports = {
  safetyCheck,
  isDirectRequest,
  INAPPROPRIATE_KEYWORDS,
  CHEATING_PATTERNS,
  DIRECT_ANSWER_PATTERNS
};
