const express = require('express');
const {
  listProblems,
  findProblem,
  publicProblem,
  checkStep
} = require('../data/problemBank');
const { ensureUser, getTodayKey } = require('../data/economyStore');

const router = express.Router();
const HOUR = 60 * 60 * 1000;
const attempts = new Map();

function attemptOf(email, problemId, stepId) {
  const key = `${email}:${problemId}:${stepId}`;
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || now - row.at > HOUR) {
    const fresh = { n: 0, at: now, revealed: false, credit: 0 };
    attempts.set(key, fresh);
    return { key, row: fresh };
  }
  return { key, row };
}

function pushLog(user, entry) {
  if (!Array.isArray(user.problemLog)) user.problemLog = [];
  user.problemLog.push(entry);
  if (user.problemLog.length > 200) {
    user.problemLog.splice(0, user.problemLog.length - 200);
  }
}

function maxPoints(problem) {
  return (problem.parts || []).reduce((sum, part) => sum + (Number(part.points) || 0), 0);
}

router.get('/', (req, res) => {
  const subject = String(req.query.subject || 'matematica');
  const grade = String(req.query.class_level || '');
  const chapterId = String(req.query.chapter_id || '');
  const lessonId = String(req.query.lesson_id || '');
  const problems = listProblems(subject, grade, chapterId, lessonId || undefined)
    .map(publicProblem)
    .filter(Boolean);
  res.json({ problems });
});

router.post('/check-step', (req, res) => {
  const problemId = String(req.body?.problem_id || '');
  const stepId = String(req.body?.step_id || '');
  const answer = req.body?.answer == null ? '' : String(req.body.answer);
  const problem = findProblem(problemId);
  if (!problem || !(problem.steps || []).some(step => step.id === stepId)) {
    return res.status(404).json({ error: 'Nu există pasul ăsta.' });
  }
  const { row } = attemptOf(req.auth.email, problemId, stepId);
  if (row.solved) {
    const step = problem.steps.find(item => item.id === stepId);
    return res.json({ ok: true, solution: step.solution, barem: step.barem });
  }
  row.n += 1;
  row.at = Date.now();
  const result = checkStep(problemId, stepId, answer, row.n);
  if (result.ok) {
    row.solved = true;
    const step = problem.steps.find(item => item.id === stepId);
    if (row.revealed) row.credit = 0;
    else if (row.n === 1) row.credit = Number(step.points) || 0;
    else row.credit = (Number(step.points) || 0) / 2;
  } else if (row.n >= 2) {
    row.revealed = true;
    row.credit = 0;
  }
  return res.json(result);
});

router.post('/reveal', (req, res) => {
  const problem = findProblem(String(req.body?.problem_id || ''));
  if (!problem) return res.status(404).json({ error: 'Nu există problema asta.' });
  res.json({
    model: problem.model,
    steps: (problem.steps || []).map(step => ({
      id: step.id,
      part: step.part,
      points: step.points,
      barem: step.barem,
      solution: step.solution
    }))
  });
});

router.post('/self-score', (req, res) => {
  const problem = findProblem(String(req.body?.problem_id || ''));
  if (!problem) return res.status(404).json({ error: 'Nu există problema asta.' });
  const mode = String(req.body?.mode || '');
  if (mode !== 'pasi' && mode !== 'examen') {
    return res.status(400).json({ error: 'Mod necunoscut.' });
  }
  const max = maxPoints(problem);
  let points = 0;
  if (mode === 'examen') {
    const ticked = Array.isArray(req.body?.ticked) ? req.body.ticked.map(String) : [];
    const seen = new Set();
    ticked.forEach(id => {
      if (seen.has(id)) return;
      const step = (problem.steps || []).find(row => row.id === id);
      if (!step) return;
      seen.add(id);
      points += Number(step.points) || 0;
    });
  } else {
    (problem.steps || []).forEach(step => {
      const { row } = attemptOf(req.auth.email, problem.id, step.id);
      points += Number(row.credit) || 0;
    });
  }
  points = Math.max(0, Math.min(max, points));
  const perPart = (problem.parts || []).map(part => {
    const ids = new Set((problem.steps || []).filter(step => step.part === part.id).map(step => step.id));
    let partPoints = 0;
    if (mode === 'examen') {
      const ticked = new Set(Array.isArray(req.body?.ticked) ? req.body.ticked.map(String) : []);
      (problem.steps || []).forEach(step => {
        if (step.part === part.id && ticked.has(step.id)) partPoints += Number(step.points) || 0;
      });
    } else {
      (problem.steps || []).forEach(step => {
        if (!ids.has(step.id)) return;
        const { row } = attemptOf(req.auth.email, problem.id, step.id);
        partPoints += Number(row.credit) || 0;
      });
    }
    return { id: part.id, points: Math.min(Number(part.points) || 0, partPoints), max: Number(part.points) || 0 };
  });
  const user = ensureUser(req.auth.email);
  pushLog(user, {
    id: problem.id,
    mode,
    points,
    max,
    day: getTodayKey(),
    selfScored: mode === 'examen'
  });
  res.json({ points, max, perPart });
});

module.exports = router;
