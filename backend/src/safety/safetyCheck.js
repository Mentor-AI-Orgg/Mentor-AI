// securiate cuvinte & fraze interzise, pentru a evita ca un copil sa ceara direct raspunsul la tema sau sa ceara continut inadecvat.
// de asemenea, detecteaza daca copilul cere direct raspunsul la tema, compunere, rezolvare etc.

const INAPPROPRIATE_KEYWORDS = ["bomba","arma","ucide","sinucidere","droguri","sex explicit","pornografie","hack","fura banca","virus","terorism","criminal","viol","abuz"];
//de adaugat

const CHEATING_PATTERNS = [
  "rezolvă-mi","fă-mi tema","scrie-mi compunerea","dă-mi răspunsul","copiază","plagiază","fă tot exercițiul","fă-mi tot","răspunde la tot",
  "solve for me","do my homework","write my essay","give me answer","do everything",
  "résous pour moi","fais mes devoirs","löse für mich","mach meine hausaufgaben",
  "resuelve para mí","haz mi tarea","risolvi per me","fai i miei compiti",
  "реши за меня","сделай мою домашку","old meg helyettem","írd meg helyettem",
  "benim için çöz","ödevimi yap","帮我做","给我答案","私のために解いて","宿題をやって"
];
//de asemena de adaugat

const DIRECT_ANSWER_PATTERNS = [/^(care este|ce este|cum se|defin|explic|spune-mi|tell me|what is|how to|define|explain|dă-mi|give me|donne-moi|gib mir|dame|dammi|дай мне|add meg|ver bana|给我|教えて)/i];

async function safetyCheck(message) {
  const msgLower = message.toLowerCase();
  const flags = [];
  for (const kw of INAPPROPRIATE_KEYWORDS) if (msgLower.includes(kw)) flags.push("inappropriate_content");
  for (const pattern of CHEATING_PATTERNS) if (msgLower.includes(pattern.toLowerCase())) flags.push("cheating_attempt");
  let isDirect = false;
  for (const p of DIRECT_ANSWER_PATTERNS) if (p.test(message.trim())) { isDirect = true; break; }
  return { safe: flags.length === 0, flags: flags.length ? flags : ["none"], isDirectRequest: isDirect };
}

module.exports = { safetyCheck, INAPPROPRIATE_KEYWORDS, CHEATING_PATTERNS, DIRECT_ANSWER_PATTERNS };
