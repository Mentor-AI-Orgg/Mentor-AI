import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const mastery = nodeRequire('../backend/src/data/lessonMastery.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const auth = nodeRequire('../backend/src/data/authStore.js');

function released(id, lessonId, ok, sessionId = '') {
  return {
    id,
    ok,
    subject: 'matematica',
    grade: '5',
    chapterId: 'naturale',
    lessonId,
    sessionId,
    at: 1
  };
}

async function parentOf(app, parentEmail) {
  const logs = [];
  const original = console.log;
  console.log = (...args) => logs.push(args.map(item => String(item)).join(' '));
  try {
    await request(app).post('/api/parent/magic').send({ email: parentEmail });
  } finally {
    console.log = original;
  }
  const token = (logs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
  const agent = request.agent(app);
  const consumed = await agent.post('/api/parent/magic/consume').send({ token });
  expect(consumed.status).toBe(200);
  return agent;
}

describe('procentul pe lecție', () => {
  it('ia procentul răspunsurilor și marchează sub 60% de recapitulat', () => {
    const user = {
      preferences: { className: '5' },
      practiceGates: {
        released: {
          a: released('a', 'curiozitati', true),
          b: released('b', 'curiozitati', true),
          c: released('c', 'curiozitati', true),
          d: released('d', 'curiozitati', false),
          e: released('e', 'curiozitati', false),
          f: released('f', 'scriere', true, 'ses-a'),
          g: released('g', 'scriere', false, 'ses-b'),
          h: released('h', 'scriere', false, 'ses-b'),
          i: released('i', 'scriere', false, 'ses-b')
        }
      }
    };
    const rows = mastery.lessonMasteryFor(user, 5);
    const curios = rows.find(row => row.lessonId === 'curiozitati');
    const writing = rows.find(row => row.lessonId === 'scriere');
    expect(curios).toMatchObject({
      title: 'Curiozități din lumea numerelor naturale',
      percent: 60,
      review: false
    });
    expect(writing).toMatchObject({ percent: 25, review: true });
    expect(rows.filter(row => row.review).map(row => row.lessonId)).toEqual(['scriere']);
    expect(rows.some(row => row.lessonId === 'axa')).toBe(false);
  });

  it('folosește cel mai bun test când lecția nu are răspunsuri pe itemi', () => {
    const user = {
      preferences: { className: '5' },
      skillLog: [
        { kind: 'test', subject: 'matematica', grade: '5', chapterId: 'naturale', lessonId: 'axa', correct: 4, total: 10 },
        { kind: 'test', subject: 'matematica', grade: '5', chapterId: 'naturale', lessonId: 'axa', correct: 9, total: 10 },
        { kind: 'flashcards', subject: 'matematica', grade: '5', chapterId: 'naturale', lessonId: 'axa', correct: 10, total: 10 },
        { kind: 'test', subject: 'matematica', grade: '6', chapterId: 'naturale', lessonId: 'axa', correct: 1, total: 1 }
      ]
    };
    const rows = mastery.lessonMasteryFor(user, 5);
    expect(rows).toEqual([
      expect.objectContaining({ lessonId: 'axa', percent: 90, review: false })
    ]);
  });

  it('răspunsurile pe itemi rămân procentul, chiar dacă un test e mai bun', () => {
    const user = {
      preferences: { className: '5' },
      practiceGates: { released: { a: released('a', 'comparare', false) } },
      skillLog: [
        { kind: 'test', subject: 'matematica', grade: '5', chapterId: 'naturale', lessonId: 'comparare', correct: 10, total: 10 }
      ]
    };
    const row = mastery.lessonMasteryFor(user, 5).find(item => item.lessonId === 'comparare');
    expect(row).toMatchObject({ percent: 0, review: true });
  });

  it('ajunge la elev și la părinte, fără email', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const account = auth.findByUsername(child.username);
    const user = economy.ensureUser(account.email, { username: child.username, className: '5' });
    user.preferences.className = '5';
    user.practiceGates = {
      released: {
        a: released('a', 'curiozitati', false),
        b: released('b', 'curiozitati', false),
        c: released('c', 'curiozitati', true)
      }
    };
    const summary = await child.agent.get('/api/economy/summary');
    const mine = summary.body.summary.lessonMastery.find(row => row.lessonId === 'curiozitati');
    expect(mine).toMatchObject({ percent: 33, review: true });
    expect(JSON.stringify(summary.body.summary.lessonMastery)).not.toContain('@');

    const parent = await parentOf(app, child.parentEmail);
    const listed = await parent.get('/api/parent/me');
    const panel = await parent.get(`/api/parent/children/${listed.body.children[0].id}/panel`);
    expect(panel.status).toBe(200);
    const shown = panel.body.lessonMastery.find(row => row.lessonId === 'curiozitati');
    expect(shown).toMatchObject({ percent: 33, review: true, title: 'Curiozități din lumea numerelor naturale' });
    expect(JSON.stringify(panel.body.lessonMastery)).not.toMatch(/mesaj|chat|tutor|@/i);
  });

  it('stă pe progres, pe lecție și la părinte, nu pe acasă', () => {
    const progress = fs.readFileSync('frontend/screens/ReadinessScreen.jsx', 'utf8');
    const lessons = fs.readFileSync('frontend/components/LessonCard.jsx', 'utf8');
    const parent = fs.readFileSync('frontend/components/ConsentScreens.jsx', 'utf8');
    const home = fs.readFileSync('frontend/screens/HomeScreen.jsx', 'utf8');
    expect(progress).toContain('Pe lecții');
    expect(progress).toContain('de recapitulat');
    expect(progress).toContain('La capitolul următor');
    expect(lessons).toContain('de recapitulat');
    expect(parent).toContain('de recapitulat');
    expect(parent).toContain('lessonMastery');
    expect(home).not.toContain('lessonMastery');
    expect(home).not.toContain('Pe lecții');
  });
});
