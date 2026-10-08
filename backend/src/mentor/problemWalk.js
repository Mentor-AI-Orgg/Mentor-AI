// După ce testul e notat, tutorele poate merge până la soluție,
// dar întâi spune de ce răspunsul nu ține și cere un pas.

const { MASCOT_NAME } = require("../config/mascot");
const { judgeAnswer } = require("../grading/answerJudge");
const { isDirectRequest } = require("../safety/safetyCheck");

function fold(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/\s+/g, " ")
    .trim();
}

function intentOf(message) {
  const text = fold(message);
  if (/tot nu/.test(text)) return "deep";
  if (/^(nu am inteles|nu inteleg|inca nu|nu pricep)[.! ]*$/.test(text)) return "unclear";
  return "attempt";
}

function wantsAnswerNow(message) {
  if (isDirectRequest(message)) return true;
  const text = fold(message);
  return /da-mi raspunsul|spune-mi rezultatul|rezolva-mi/.test(text);
}

function containsAnswer(text, answers) {
  const folded = fold(text);
  return (answers || []).some(answer => {
    const needle = fold(answer);
    return needle.length >= 2 && folded.includes(needle);
  });
}

const SMALL = new Set([
  "acest", "acesta", "aceasta", "aceste", "acestia", "fiind", "fiindca", "pentru", "despre",
  "intre", "dintre", "numai", "decat", "asupra", "prin", "fara", "care", "unde", "cand"
]);

function words(text) {
  return fold(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length >= 5 && !SMALL.has(word));
}

function sentencesOf(text) {
  return String(text || "")
    .split(/\n+|(?<=[.!?])\s+/)
    .map(row => row.replace(/\s+/g, " ").trim())
    .filter(row => row.length >= 20 && row.length <= 280);
}

function hideAnswers(text, answers) {
  let out = String(text || "");
  const list = (answers || [])
    .map(answer => String(answer || "").trim())
    .filter(answer => answer.length >= 2)
    .sort((a, b) => b.length - a.length);
  list.forEach(needle => {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const plain = /^[\p{L}\p{N}]+$/u.test(needle);
    const pattern = plain
      ? new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "giu")
      : new RegExp(escaped, "gi");
    out = out.replace(pattern, "___");
  });
  return out.replace(/[ \t]{2,}/g, " ").replace(/\s+([,.])/g, "$1").trim();
}

function usableHidden(text, answers) {
  const hidden = hideAnswers(text, answers);
  if (!hidden || containsAnswer(hidden, answers)) return "";
  const meat = hidden.replace(/_+/g, "").replace(/\s/g, "");
  if (meat.length < 18) return "";
  return hidden;
}

function lessonChunks(problem) {
  if (!problem?.subject || !problem?.chapterId) return [];
  const chunks = [];
  try {
    const { lessonsFor } = require("../data/gimnaziuLessons");
    const lessons = lessonsFor(problem.subject, problem.grade, problem.chapterId) || [];
    const lesson = lessons.find(row => row && row.id === problem.lessonId);
    if (lesson) {
      chunks.push(lesson.theory, lesson.recap, lesson.mistakes, lesson.example);
      (lesson.boxes || []).forEach(box => chunks.push(box?.text));
      (lesson.keyPoints || []).forEach(point => chunks.push(point));
    }
  } catch {
    /* lecția rămâne opțională */
  }
  try {
    const { glossaryFor } = require("../data/chapterGlossary");
    glossaryFor(problem.subject, problem.grade, problem.chapterId).forEach(entry => {
      if (entry?.term && entry?.meaning) chunks.push(`${entry.term}: ${entry.meaning}`);
    });
  } catch {
    /* glosarul rămâne opțional */
  }
  return chunks.filter(Boolean);
}

function focusWords(prompt) {
  const raw = String(prompt || "");
  const hole = raw.search(/_{3,}/);
  const slice = hole >= 0 ? raw.slice(Math.max(0, hole - 48), hole + 48) : raw;
  return new Set(words(slice));
}

function hasWord(text, token) {
  const needle = fold(token);
  return fold(text).split(" ").includes(needle);
}

function ruleScore(problem, text, { clean = true, hint = false } = {}) {
  const focus = focusWords(problem.prompt);
  const promptWords = words(problem.prompt);
  let score = hint ? 4 : 0;
  words(text).forEach(word => {
    if (focus.has(word)) score += 3;
    else if (promptWords.includes(word)) score += 1;
  });
  if (hasWord(problem.prompt, "nu") && hasWord(text, "nu") && words(text).includes("predicat")) score += 3;
  const known = new Set(words(`${problem.prompt} ${(problem.answers || []).join(" ")}`));
  const novel = words(text).filter(word => !known.has(word)).length;
  if (!hint && score <= 0) return 0;
  if (!clean && novel === 0 && score < 3) return 0;
  score += Math.min(novel, 4) + (clean ? 1 : 0);
  if (!hint && novel === 0) score -= 2;
  if (fold(text).includes("enuntul din lectie")) score -= 4;
  return score;
}

function pickRule(problem) {
  const answers = problem.answers || [];
  const pool = [];
  const hint = String(problem.hint || "").trim();
  if (hint.length >= 12 && !containsAnswer(hint, answers)) {
    pool.push({ text: hint, score: ruleScore(problem, hint, { hint: true }) });
  }
  const sources = [problem.explain, ...lessonChunks(problem)];
  sources.flatMap(sentencesOf).forEach(raw => {
    const text = String(raw || "").replace(/^(?:Enunțul|Enunţul) din lec[țţ]ie este:\s*/i, "").trim();
    if (text.length < 20) return;
    if (!containsAnswer(text, answers)) {
      const score = ruleScore(problem, text);
      if (score > 0) pool.push({ text, score });
      return;
    }
    const hidden = usableHidden(text, answers);
    if (!hidden) return;
    const score = ruleScore(problem, hidden, { clean: false });
    if (score > 0) pool.push({ text: hidden, score });
  });
  pool.sort((a, b) => b.score - a.score || b.text.length - a.text.length);
  return pool[0]?.text || "";
}

function ensurePeriod(text) {
  const value = String(text || "").trim();
  if (!value) return "";
  return /[.!?…]$/.test(value) ? value : `${value}.`;
}

function whyConcrete(problem, rule) {
  const given = String(problem.given || "").trim();
  if (!given) return "Nu ai scris un răspuns. Pornim de la regulă, nu de la un rezultat ghicit.";
  if (!rule) return `Ai scris „${given}”. Hai să vedem, pe regula din lecție, de ce nu se potrivește.`;
  const step = rule.split(/[,.]/)[0].trim();
  const short = step.length > 90 ? `${step.slice(0, 87).trim()}…` : step;
  const soft = short.charAt(0).toLowerCase() + short.slice(1);
  return `Ai scris „${given}”. Nu se potrivește, pentru că ${soft}.`;
}

function guidingQuestion(problem, rule) {
  if (!rule) return "Ce ai încercat, cu cuvintele tale?";
  if (rule.includes("___")) {
    return "Întrebarea mea: ce cuvânt pui în golul din regulă? Nu scrie toată propoziția.";
  }
  const hint = String(problem.hint || "").trim();
  if (hint && !containsAnswer(hint, problem.answers)) {
    const step = hint.split(/[,.]/)[0].trim();
    const soft = step.charAt(0).toLowerCase() + step.slice(1);
    return `Întrebarea mea: faci doar „${soft}”. Ce îți iese la pasul ăsta?`;
  }
  const focus = words(problem.prompt).find(word => words(rule).includes(word));
  if (focus) return `Întrebarea mea: din regula asta, ce reții despre „${focus}”, fără rezultatul final?`;
  return "Întrebarea mea: cum ai spune regula, pe scurt, fără rezultat?";
}

function unglue(text) {
  return String(text || "").replace(/([.!?»])(?=[A-ZĂÂÎȘȚŞŢ])/g, "$1\n\n");
}

function paragraphs(lines) {
  return unglue(lines.map(line => String(line || "").trim()).filter(Boolean).join("\n\n"));
}

function judgeTry(message, problem) {
  return judgeAnswer({
    given: message,
    answers: problem.answers || [],
    choices: problem.choices || [],
    explain: ""
  });
}

function guideText(problem) {
  if (problem.ok) return revealText(problem, "Ai nimerit. Îți arăt de ce ține, ca să rămână.");
  const rule = pickRule(problem);
  const lines = [
    `Sunt ${MASCOT_NAME}. Testul e deja notat. Stăm pe exercițiul ăsta, iar rezultatul îl lăsăm la urmă.`
  ];
  if (problem.lessonTitle) lines.push(`E din lecția „${problem.lessonTitle}”.`);
  lines.push(`Întrebarea: ${problem.prompt}`);
  lines.push(whyConcrete(problem, rule));
  if (rule) lines.push(`Regula este: ${ensurePeriod(rule)}`);
  else lines.push("Pentru exercițiul ăsta nu am o regulă salvată în lecție. Spune-mi ce ai încercat, cu cuvintele tale.");
  lines.push(guidingQuestion(problem, rule));
  lines.push("Scrie doar pasul ăsta. Eu îl verific.");
  return paragraphs(lines);
}

function hintText(problem, message) {
  const rule = pickRule(problem);
  const lines = [
    `Sunt ${MASCOT_NAME}. Rămânem la același exercițiu.`,
    `Întrebarea: ${problem.prompt}`
  ];
  if (message && intentOf(message) === "attempt") {
    lines.push(`„${String(message).trim().slice(0, 180)}” încă nu e pasul din regulă.`);
  } else {
    lines.push("Mai încet. Îți repet regula, tot fără rezultat.");
  }
  if (rule) lines.push(`Regula este: ${ensurePeriod(rule)}`);
  else lines.push("Spune-mi ce anume nu se leagă, cu cuvintele tale.");
  lines.push(guidingQuestion(problem, rule));
  lines.push("Dacă tot nu se leagă, scrie „tot nu înțeleg”.");
  return paragraphs(lines);
}

function revealText(problem, lead) {
  const lines = [
    `Sunt ${MASCOT_NAME}. ${lead}`,
    `Întrebarea: ${problem.prompt}`
  ];
  if (problem.given) lines.push(`Tu ai scris: ${problem.given}.`);
  if (problem.correct) lines.push(`Răspunsul din barem: ${problem.correct}.`);
  if (problem.explain) lines.push(problem.explain);
  if (problem.steps?.length) {
    lines.push(["Pașii:", ...problem.steps.map((step, index) => `${index + 1}) ${step}`)].join("\n"));
  }
  lines.push("Dacă un pas tot nu e clar, spune care.");
  return paragraphs(lines);
}

function walkProblem({ message, problem, history } = {}) {
  const turns = (history || []).filter(row => row && row.role === "assistant").length;
  const intent = intentOf(message);
  const attempt = intent === "attempt" ? judgeTry(message, problem) : null;
  let text;
  if (attempt?.ok) text = revealText(problem, "Da. Asta se potrivește cu baremul. Uite de ce.");
  else if (turns === 0) text = guideText(problem);
  else if (intent === "deep" || wantsAnswerNow(message) || turns >= 3) {
    text = revealText(problem, "Hai să îl închidem. Îți arăt rezultatul și de ce stă așa.");
  } else if (intent === "unclear" && turns >= 2) {
    text = revealText(problem, "L-am mai desfăcut. Acum îți arăt rezultatul, tot pe pași.");
  } else text = hintText(problem, message);

  if (text && containsAnswer(text, problem.answers) && turns === 0 && !attempt?.ok && !problem.ok) {
    const hint = containsAnswer(problem.hint, problem.answers) ? "" : problem.hint;
    text = guideText({ ...problem, hint, explain: "", steps: [], correct: "" });
  }

  return {
    matched: true,
    confident: true,
    engine: "problema",
    lesson: problem.lessonTitle || "",
    lessonId: problem.lessonId || "",
    text
  };
}

function lockedProblemText() {
  return {
    matched: true,
    confident: true,
    engine: "problema_blocata",
    lesson: "",
    lessonId: "",
    text: `Sunt ${MASCOT_NAME}. Testul încă e deschis, așa că nu îți arăt baremul și nici rezultatul. Predă-l, apoi apasă „Nu înțeleg” la exercițiul care te încurcă.`
  };
}

function hiddenProblemText() {
  return {
    matched: true,
    confident: true,
    engine: "problema_blocata",
    lesson: "",
    lessonId: "",
    text: `Sunt ${MASCOT_NAME}. Nu am acest exercițiu între testele tale predate. Deschide revizuirea după predare, apoi întreabă-mă de acolo.`
  };
}

module.exports = {
  walkProblem,
  lockedProblemText,
  hiddenProblemText,
  containsAnswer,
  intentOf
};
