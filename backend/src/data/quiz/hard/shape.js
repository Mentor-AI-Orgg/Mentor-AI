const { judgeAnswer } = require('../../../grading/answerJudge');

const SEDILA = /[şţŞŢ]/;
const BAD_MARKUP = /\\frac|\$|<\/?[a-z]+/i;
const BAD_UNIT = /(?:^|[^A-Za-zĂÂÎȘȚăâîșț])[A-Za-zĂÂÎȘȚăâîșț]\/[sl](?![A-Za-z])/u;

function scrub(id, text) {
  const raw = String(text || '');
  if (SEDILA.test(raw)) throw new Error(`${id}: sedilă în «${raw.slice(0, 80)}»`);
  if (BAD_MARKUP.test(raw)) throw new Error(`${id}: marcaj interzis`);
  if (BAD_UNIT.test(raw)) throw new Error(`${id}: unitate scrisă greșit`);
  return raw;
}

function grid(row) {
  const id = row.id;
  const options = [row.correct, ...row.wrong];
  if (options.length !== 4) throw new Error(`${id}: trebuie 4 variante`);
  if (new Set(options.map(option => option.trim())).size !== 4) throw new Error(`${id}: variante duble`);
  const question = scrub(id, row.question);
  const explain = scrub(id, row.explain);
  if (question.length <= 12) throw new Error(`${id}: enunț prea scurt`);
  if (explain.length <= 20) throw new Error(`${id}: explicație prea scurtă`);
  options.forEach(option => scrub(id, option));
  const sample = options[0];
  options.forEach((option, index) => {
    const judged = judgeAnswer({
      given: option,
      answers: [sample],
      choices: options,
      letter: 'A'
    });
    if (index === 0 && !judged.ok) throw new Error(`${id}: baremul nu acceptă varianta corectă`);
    if (index > 0 && judged.ok) throw new Error(`${id}: varianta «${option}» e punctată ca bună`);
  });
  const level = Number(row.level);
  if (!Number.isInteger(level) || level < 1 || level > 8) throw new Error(`${id}: nivel`);
  return {
    id,
    lesson: row.lesson,
    level,
    point: row.point || row.lesson,
    question,
    options,
    correct: 0,
    explain,
    challenge: true,
    skill: row.skill || 'apply'
  };
}

function exam(row) {
  const id = row.id;
  const prompt = scrub(id, row.prompt);
  const explain = scrub(id, row.explain);
  const answers = (row.answers || []).map(answer => scrub(id, answer));
  const steps = (row.steps || []).map(step => scrub(id, step));
  if (prompt.length <= 12) throw new Error(`${id}: enunț prea scurt`);
  if (explain.length <= 20) throw new Error(`${id}: explicație prea scurtă`);
  if (!answers.length) throw new Error(`${id}: fără răspuns`);
  if (!steps.length) throw new Error(`${id}: fără pași`);
  const level = Number(row.level);
  if (!Number.isInteger(level) || level < 1 || level > 8) throw new Error(`${id}: nivel`);
  if (row.numeric && Number(row.numeric.value) !== Number(row.proof)) {
    throw new Error(`${id}: numărul din barem nu iese din calcul`);
  }
  const item = {
    id,
    lesson: row.lesson,
    level,
    point: row.point || row.lesson,
    prompt,
    answers,
    explain,
    hint: row.hint ? scrub(id, row.hint) : '',
    numeric: row.numeric || null,
    tokens: [],
    steps,
    long: false,
    minWords: 0,
    challenge: true,
    skill: row.skill || 'apply',
    match: row.match || ''
  };
  if (Array.isArray(row.choices)) {
    item.choices = row.choices.map(choice => scrub(id, choice));
    if (item.choices.length !== 4) throw new Error(`${id}: grila de test nu are 4 variante`);
    if (!item.choices.includes(answers[0])) throw new Error(`${id}: răspunsul nu e între variante`);
    if (new Set(item.choices.map(choice => choice.trim())).size !== 4) throw new Error(`${id}: variante duble`);
  }
  const good = judgeAnswer({
    given: answers[0],
    answers,
    numeric: item.numeric,
    choices: item.choices,
    match: item.match,
    explain
  });
  if (!good.ok) throw new Error(`${id}: răspunsul corect nu se punctează (${good.kind})`);
  const decoys = item.choices ? item.choices.filter(choice => choice !== answers[0]) : ['a', 'nu-asta'];
  decoys.forEach(decoy => {
    const bad = judgeAnswer({
      given: decoy,
      answers,
      numeric: item.numeric,
      choices: item.choices,
      match: item.match,
      explain
    });
    if (bad.ok) throw new Error(`${id}: «${decoy}» e punctat din greșeală`);
  });
  if (!(answers.some(answer => String(answer).trim() === '1') || (item.numeric && Number(item.numeric.value) === 1))) {
    const one = judgeAnswer({
      given: '1',
      answers,
      numeric: item.numeric,
      match: item.match,
      explain
    });
    if (one.ok) throw new Error(`${id}: «1» e punctat din greșeală`);
  }
  return item;
}

function numExam(row) {
  const value = row.proof();
  if (!Number.isFinite(value)) throw new Error(`${row.id}: calcul neîntreg`);
  if (!Number.isInteger(value)) throw new Error(`${row.id}: rezultatul nu e întreg (${value})`);
  return exam({
    ...row,
    answers: [String(value)],
    numeric: { value, tolerance: 0 },
    proof: value
  });
}

module.exports = { grid, exam, numExam, scrub };
