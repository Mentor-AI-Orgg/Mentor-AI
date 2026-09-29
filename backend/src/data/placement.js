const { judgeAnswer } = require("../grading/answerJudge");

const BANK = {
  5: {
    mate: [
      { id: "m1", prompt: "Cât fac 7 + 8?", answers: ["15"], lesson: "Adunarea" },
      { id: "m2", prompt: "Jumătate din 20 este…", answers: ["10"], lesson: "Fracții" },
      { id: "m3", prompt: "Cât fac 3 × 4?", answers: ["12"], lesson: "Înmulțirea" },
      { id: "m4", prompt: "Cât fac 100 − 37?", answers: ["63"], lesson: "Scăderea" },
      { id: "m5", prompt: "Care număr este par: 7 sau 8?", answers: ["8"], lesson: "Numere pare" }
    ],
    romana: [
      { id: "r1", prompt: "În propoziția „Ana citește.” cine face acțiunea?", answers: ["Ana"], lesson: "Subiectul" },
      { id: "r2", prompt: "Pluralul lui floare este…", answers: ["flori"], lesson: "Pluralul" },
      { id: "r3", prompt: "Un sinonim pentru frumos este…", answers: ["arătos", "drăguț"], lesson: "Sinonime" },
      { id: "r4", prompt: "Numele unui oraș se scrie cu literă…", answers: ["mare", "majusculă"], lesson: "Majuscula" },
      { id: "r5", prompt: "În „copiii aleargă”, cuvântul care arată acțiunea este…", answers: ["aleargă"], lesson: "Verbul" }
    ]
  }
};

function bankFor() {
  return BANK[5];
}

function questionsFor(grade, subject) {
  const bank = bankFor(grade);
  if (subject === "mate") return bank.mate;
  if (subject === "romana") return bank.romana;
  return [...bank.mate, ...bank.romana];
}

function publicQuestion(item) {
  return { id: item.id, prompt: item.prompt, subject: item.id.startsWith("m") ? "mate" : "romana" };
}

function scorePlacement(grade, subject, answers = []) {
  const items = questionsFor(grade, subject);
  const given = new Map(answers.map(row => [row.id, String(row.given || "")]));
  const rows = items.map(item => {
    const verdict = judgeAnswer({ given: given.get(item.id) || "", answers: item.answers, match: "exact" });
    return { id: item.id, lesson: item.lesson, ok: Boolean(verdict.ok), subject: item.id.startsWith("m") ? "mate" : "romana" };
  });
  const good = rows.filter(row => row.ok).map(row => row.lesson);
  const weak = rows.filter(row => !row.ok).map(row => row.lesson);
  return {
    finished: true,
    subject,
    good: [...new Set(good)].slice(0, 3),
    startWith: [...new Set(weak)].slice(0, 3),
    correct: rows.filter(row => row.ok).length,
    total: rows.length
  };
}

module.exports = { questionsFor, publicQuestion, scorePlacement };
