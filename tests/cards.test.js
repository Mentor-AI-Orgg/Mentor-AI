import { describe, expect, it } from 'vitest';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { migrateQuizLessons } from '../scripts/migrate-quiz-lessons.js';

const nodeRequire = createRequire(import.meta.url);
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const { lessonsFor } = nodeRequire('../backend/src/data/gimnaziuLessons.js');

describe('cardurile față-verso', () => {
  it('dă pachetul, pune nu în cutia 1 pe mâine și nu dă monede', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const deck = await child.agent.post('/api/cards/deck').send({
      subject: 'matematica',
      class_level: 5,
      chapter_id: 'naturale',
      lesson_id: 'comparare',
      mode: 'lesson'
    });
    expect(deck.status).toBe(200);
    expect(deck.body.cards.length).toBeGreaterThanOrEqual(5);
    expect(deck.body.cards.every(card => card.lesson === 'comparare')).toBe(true);
    expect(deck.body.cards[0].lessonTitle).toBe('Compararea și ordonarea');
    expect(deck.body.counts.new).toBe(deck.body.cards.length);

    const before = await child.agent.get('/api/economy/summary');
    const rated = await child.agent.post('/api/cards/rate').send({
      card_id: deck.body.cards[0].id,
      result: 'nu',
      mode: 'lesson'
    });
    expect(rated.status).toBe(200);
    expect(rated.body.box).toBe(1);
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    expect(rated.body.due).toBe(tomorrow);

    const after = await child.agent.get('/api/economy/summary');
    expect(after.body.balance).toBe(before.body.balance);

    const missing = await child.agent.post('/api/cards/rate').send({ card_id: 'nu-exista', result: 'stiam' });
    expect(missing.status).toBe(404);
    const bad = await child.agent.post('/api/cards/rate').send({ card_id: deck.body.cards[0].id, result: 'poate' });
    expect(bad.status).toBe(400);

    const email = authStore.findByUsername(child.username).email;
    const exported = economy.exportUser(email);
    expect(exported.cardBoxes[deck.body.cards[0].id].b).toBe(1);
    const lessonIds = new Set((lessonsFor('matematica', 5, 'naturale') || []).map(lesson => lesson.id));
    Object.keys(exported.cardBoxes).forEach(id => {
      expect(lessonIds.has(id)).toBe(false);
    });

    economy.deleteUser(email);
    expect(economy.exportUser(email)).toBeNull();
  });

  it('rescrie lesson din folderul de carduri după o hartă de probă', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'carduri-'));
    const file = path.join(dir, 'proba.js');
    writeFileSync(file, "module.exports = { cards: [{ lesson: 'romb', point: 'romb' }] };\n");
    const map = { 'matematica:7:geo7:romb': 'matematica:7:geo7:paralelograme-particulare' };
    const result = migrateQuizLessons(dir, map, 'Cardurile');
    expect(result.changed).toBe(1);
    const next = readFileSync(file, 'utf8');
    expect(next).toContain("lesson: 'paralelograme-particulare'");
    expect(next).toContain("point: 'paralelograme-particulare'");
    expect(next).not.toContain("lesson: 'romb'");
    rmSync(dir, { recursive: true, force: true });
  });
});
