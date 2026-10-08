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

function stripAnswers(text, answers) {
  let out = String(text || "");
  (answers || []).forEach(answer => {
    const needle = String(answer || "").trim();
    if (needle.length < 2) return;
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(escaped, "gi"), "…");
  });
  return out.replace(/\s+/g, " ").trim();
}

function safeHint(problem) {
  const hint = stripAnswers(problem.hint, problem.answers);
  if (!hint || hint.length < 8 || containsAnswer(hint, problem.answers)) return "";
  return hint;
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
  const lines = [
    `Sunt ${MASCOT_NAME}. Testul e deja notat. Luăm acest exercițiu pe pași. Rezultatul final îl lăsăm la urmă.`
  ];
  if (problem.lessonTitle) lines.push(`E din lecția „${problem.lessonTitle}”.`);
  lines.push(`Întrebarea: ${problem.prompt}`);
  if (problem.given) {
    lines.push(problem.ok
      ? `Tu ai scris „${problem.given}”, și ține. Îți arăt de ce, ca să rămână.`
      : `Tu ai scris „${problem.given}”. Nu se potrivește cu baremul.`);
  } else {
    lines.push("La acest exercițiu nu ai scris un răspuns.");
  }
  if (problem.ok) return revealText(problem, "Ai nimerit. Uite de ce ține.");
  const hint = safeHint(problem);
  if (hint) lines.push(`Regula, fără rezultat: ${hint}`);
  else lines.push("Regula: uită-te la ce cere enunțul și la ce ai scris tu. Nu sări direct la rezultat.");
  lines.push("Întrebarea mea: care e primul pas, înainte de rezultat?");
  lines.push("Scrie pasul tău. Eu îl verific.");
  return lines.join("\n\n");
}

function hintText(problem, message) {
  const lines = [
    `Sunt ${MASCOT_NAME}. Rămânem la același exercițiu.`,
    `Întrebarea: ${problem.prompt}`
  ];
  if (message && intentOf(message) === "attempt") {
    lines.push(`„${String(message).trim().slice(0, 180)}” încă nu e pasul din barem.`);
  } else {
    lines.push("Mai încet, același exercițiu.");
  }
  const hint = safeHint(problem);
  if (hint) lines.push(`Ține minte: ${hint}`);
  lines.push("Spune doar pasul următor, nu tot rezultatul. Dacă tot nu se leagă, scrie „tot nu înțeleg”.");
  return lines.join("\n\n");
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
  return lines.join("\n\n");
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
    text = guideText({ ...problem, hint: "", explain: "", steps: [], correct: "" });
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
