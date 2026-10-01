import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { migrateQuizLessons } from '../scripts/migrate-quiz-lessons.js';
import { lessonsFor } from '../backend/src/data/gimnaziuLessons.js';
import { LESSON_ID_MAP } from '../backend/src/data/lessonIdMap.js';
import {
  allProblems,
  publicProblem,
  checkStep,
  findProblem
} from '../backend/src/data/problemBank.js';

const nodeRequire = createRequire(import.meta.url);
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const DIR = path.join(process.cwd(), 'backend/src/data/problems/matematica');
const SEDILA = /[şţŞŢ]/;

describe('probleme pas cu pas', () => {
  it('verifică fiecare problemă din bancă și ascunde secretele', () => {
    const problems = allProblems();
    expect(problems.length).toBeGreaterThan(0);
    const ids = problems.map(problem => problem.id);
    expect(new Set(ids).size).toBe(ids.length);
    problems.forEach(problem => {
      expect(problem.steps.length).toBeGreaterThanOrEqual(3);
      expect(problem.steps.length).toBeLessThanOrEqual(6);
      const [subject, grade, chapterId] = problem.key.split(':');
      const lessons = new Set((lessonsFor(subject, Number(grade), chapterId) || []).map(lesson => lesson.id));
      expect(lessons.has(problem.lesson), problem.id).toBe(true);
      expect(LESSON_ID_MAP[`${problem.key}:${problem.lesson}`], problem.id).toBeUndefined();
      expect(String(problem.id).includes(':')).toBe(false);
      expect(String(problem.id).startsWith('g:')).toBe(false);
      const byPart = {};
      problem.steps.forEach(step => {
        expect(step.ask, step.id).toBeTruthy();
        expect(step.hint, step.id).toBeTruthy();
        expect(step.solution, step.id).toBeTruthy();
        expect(step.barem, step.id).toBeTruthy();
        expect(Number.isInteger(step.points) && step.points >= 0, step.id).toBe(true);
        if (step.choices) {
          expect(step.choices).toHaveLength(4);
          expect(new Set(step.choices.map(choice => choice.trim())).size).toBe(4);
          expect(step.choices).toContain(step.answers[0]);
        } else {
          expect(step.answers.length, step.id).toBeGreaterThan(0);
        }
        byPart[step.part] = (byPart[step.part] || 0) + step.points;
        expect(checkStep(problem.id, step.id, step.answers[0], 1).ok, step.id).toBe(true);
        expect(checkStep(problem.id, step.id, 'a', 1).ok, step.id).toBe(false);
        expect(checkStep(problem.id, step.id, '', 1).ok, step.id).toBe(false);
        if (step.numeric) {
          expect(checkStep(problem.id, step.id, String(step.numeric.value + 7), 1).ok, step.id).toBe(false);
        }
      });
      problem.parts.forEach(part => {
        expect(byPart[part.id], `${problem.id} ${part.id}`).toBe(part.points);
      });
      if (problem.enSlot >= 1 && problem.enSlot <= 6) {
        expect(problem.parts.map(part => `${part.id}:${part.points}`)).toEqual(['a:2', 'b:3']);
      }
      expect(problem.model).toMatch(/a\)/);
      expect(problem.model).toMatch(/b\)/);
      expect(`${problem.statement} ${problem.model}`).not.toMatch(SEDILA);
      const pub = JSON.stringify(publicProblem(problem));
      expect(pub).not.toMatch(/"(answers|hint|solution|barem|model)"/);
    });
    fs.readdirSync(DIR).filter(name => name.endsWith('.js')).forEach(name => {
      expect(fs.statSync(path.join(DIR, name)).size, name).toBeLessThan(60 * 1024);
    });
  });

  it('dă indiciul la prima greșeală și soluția la a doua, fără id de lecție în jurnal', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const list = await child.agent.get('/api/problems').query({
      subject: 'matematica',
      class_level: 5,
      chapter_id: 'naturale',
      lesson_id: 'comparare'
    });
    expect(list.status).toBe(200);
    expect(list.body.problems).toHaveLength(1);
    expect(JSON.stringify(list.body)).not.toMatch(/"(answers|hint|solution|barem|model)"/);
    const problem = list.body.problems[0];
    const step = problem.steps[0];
    const first = await child.agent.post('/api/problems/check-step').send({
      problem_id: problem.id,
      step_id: step.id,
      answer: 'a'
    });
    expect(first.status).toBe(200);
    expect(first.body.ok).toBe(false);
    expect(first.body.hint).toBeTruthy();
    expect(first.body.solution).toBeUndefined();
    const second = await child.agent.post('/api/problems/check-step').send({
      problem_id: problem.id,
      step_id: step.id,
      answer: 'a'
    });
    expect(second.body.ok).toBe(false);
    expect(second.body.solution).toBeTruthy();
    expect(second.body.barem).toBeTruthy();

    const missing = await child.agent.post('/api/problems/check-step').send({
      problem_id: 'nu-exista',
      step_id: 'a1',
      answer: '1'
    });
    expect(missing.status).toBe(404);

    const scored = await child.agent.post('/api/problems/self-score').send({
      problem_id: problem.id,
      mode: 'examen',
      ticked: [problem.steps[0].id, 'nu-exista', problem.steps[0].id]
    });
    expect(scored.status).toBe(200);
    expect(scored.body.points).toBe(findProblem(problem.id).steps[0].points);
    const email = authStore.findByUsername(child.username).email;
    const saved = economy.exportUser(email);
    expect(saved.problemLog).toHaveLength(1);
    expect(saved.problemLog[0].id).toBe(problem.id);
    const lessonIds = new Set((lessonsFor('matematica', 5, 'naturale') || []).map(lesson => lesson.id));
    expect(lessonIds.has(saved.problemLog[0].id)).toBe(false);
    economy.deleteUser(email);
    expect(economy.exportUser(email)).toBeNull();
  });

  it('rescrie lesson din folderul de probleme după o hartă de probă', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 's10-problems-'));
    writeFileSync(path.join(dir, 'proba.js'), "module.exports = { problems: [{ lesson: 'romb', point: 'romb' }] };\n");
    const map = { 'matematica:7:geo7:romb': 'matematica:7:geo7:paralelograme-particulare' };
    migrateQuizLessons(dir, map, 'Problemele');
    const next = fs.readFileSync(path.join(dir, 'proba.js'), 'utf8');
    expect(next).toContain("lesson: 'paralelograme-particulare'");
    expect(next).toContain("point: 'paralelograme-particulare'");
    rmSync(dir, { recursive: true, force: true });
  });
});
