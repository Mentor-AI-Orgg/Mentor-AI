const { lessonsFor } = require('./gimnaziuLessons');
const math = require('./problems/matematica');
const { judgeAnswer } = require('../grading/answerJudge');

function chapterPack(subject, grade, chapterId) {
  if (String(subject) === 'romana') return null;
  return math.BY_KEY[`matematica:${grade}:${chapterId}`] || null;
}

function withKey(chapter) {
  return (chapter.problems || []).map(problem => ({ ...problem, key: chapter.key }));
}

function allProblems() {
  return math.CHAPTERS.flatMap(withKey);
}

function lessonTitle(problem) {
  if (!problem?.key) return '';
  const [subject, grade, chapterId] = problem.key.split(':');
  const lesson = (lessonsFor(subject, Number(grade), chapterId) || []).find(row => row.id === problem.lesson);
  return lesson?.title || '';
}

function listProblems(subject, grade, chapterId, lessonId) {
  if (String(subject) === 'romana') return [];
  const pack = chapterPack(subject, grade, chapterId);
  if (!pack) return [];
  const rows = withKey({ ...pack, key: `matematica:${grade}:${chapterId}` });
  return lessonId ? rows.filter(problem => problem.lesson === lessonId) : rows;
}

function findProblem(id) {
  return allProblems().find(problem => problem.id === id) || null;
}

function examShape(problem) {
  const parts = problem?.parts || [];
  const a = parts.find(part => part.id === 'a');
  const b = parts.find(part => part.id === 'b');
  return parts.length === 2 && a && b && Number(a.points) === 2 && Number(b.points) === 3;
}

function problemsForEnSlot(slot, source) {
  const list = Array.isArray(source) ? source : allProblems();
  const want = Number(slot);
  return list.filter(problem => Number(problem.enSlot) === want && examShape(problem));
}

function stableShuffle(list, seed) {
  const copy = list.slice();
  let n = 2166136261;
  String(seed || '').split('').forEach(ch => {
    n ^= ch.charCodeAt(0);
    n = Math.imul(n, 16777619);
  });
  for (let i = copy.length - 1; i > 0; i -= 1) {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    const j = n % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function publicProblem(problem) {
  if (!problem) return null;
  return {
    id: problem.id,
    lesson: problem.lesson,
    lessonTitle: lessonTitle(problem),
    level: problem.level,
    enSlot: problem.enSlot == null ? null : problem.enSlot,
    statement: problem.statement,
    figure: problem.figure || null,
    parts: (problem.parts || []).map(part => ({
      id: part.id,
      points: part.points,
      prompt: part.prompt
    })),
    steps: (problem.steps || []).map(step => ({
      id: step.id,
      part: step.part,
      points: step.points,
      ask: step.ask,
      choices: Array.isArray(step.choices) && step.choices.length
        ? stableShuffle(step.choices, step.id)
        : undefined
    }))
  };
}

function checkStep(problemId, stepId, answer, attempt) {
  const problem = findProblem(problemId);
  if (!problem) return null;
  const step = (problem.steps || []).find(row => row.id === stepId);
  if (!step) return null;
  const judge = judgeAnswer({
    given: answer == null ? '' : String(answer),
    answers: step.answers || [],
    numeric: step.numeric,
    match: step.match,
    choices: step.choices
  });
  if (judge.ok) {
    return { ok: true, solution: step.solution, barem: step.barem };
  }
  const tries = Number(attempt) || 1;
  if (tries <= 1) return { ok: false, hint: step.hint };
  return { ok: false, solution: step.solution, answer: (step.answers || [])[0] || '', barem: step.barem };
}

function iiiFromProblem(problem) {
  const parts = {};
  (problem.parts || []).forEach(part => {
    const partSteps = (problem.steps || []).filter(step => step.part === part.id);
    const last = partSteps[partSteps.length - 1] || { answers: [''], barem: '' };
    const marker = `${part.id})`;
    const chunk = String(problem.model || '').split(/\n\n+/).find(bit => bit.trim().startsWith(marker)) || '';
    parts[part.id] = {
      prompt: part.prompt,
      answer: last.answers[0],
      answers: (last.answers || []).slice(),
      explain: last.barem || '',
      steps: partSteps.map(step => step.barem),
      solution: chunk
    };
  });
  return {
    prompt: problem.statement,
    figure: problem.figure || null,
    problemId: problem.id,
    stepBarem: (problem.steps || []).map(step => ({
      id: step.id,
      part: step.part,
      points: step.points,
      barem: step.barem,
      solution: step.solution
    })),
    parts
  };
}

module.exports = {
  listProblems,
  findProblem,
  problemsForEnSlot,
  publicProblem,
  checkStep,
  examShape,
  iiiFromProblem,
  allProblems,
  lessonTitle
};
