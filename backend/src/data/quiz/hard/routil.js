const { grid, exam, numExam } = require('./shape');

function grids(rows) {
  return rows.map(row => grid({
    id: row.id,
    lesson: row.lesson,
    level: row.level,
    skill: row.skill,
    point: row.point,
    question: row.question,
    correct: row.correct,
    wrong: row.wrong,
    explain: row.explain
  }));
}

function counts(rows) {
  return rows.map(row => numExam({
    id: row.id,
    lesson: row.lesson,
    level: row.level,
    skill: row.skill,
    point: row.point,
    prompt: row.prompt,
    explain: row.explain,
    steps: row.steps,
    proof: row.proof
  }));
}

function words(rows) {
  return rows.map(row => exam({
    id: row.id,
    lesson: row.lesson,
    level: row.level,
    skill: row.skill,
    point: row.point,
    prompt: row.prompt,
    answers: [row.answer],
    explain: row.explain,
    steps: row.steps,
    match: 'exact'
  }));
}

function pack(key, flashcards, tests) {
  return { key, flashcards, tests };
}

module.exports = { grids, counts, words, pack };
