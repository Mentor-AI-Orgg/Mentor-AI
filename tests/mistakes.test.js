import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted } from './registerStudent.js';
import { rate, buildDeck, DAY, INTERVALS } from '../backend/src/data/spacedRepetition.js';
import { resolveLessonId } from '../backend/src/data/lessonIds.js';

const nodeRequire = createRequire(import.meta.url);
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

describe('caietul de greșeli', () => {
  it('revine după 1, 3, 7 și 21 de zile, apoi iese; o greșeală o ia de la capăt', () => {
    const now = 1_700_000_000_000;
    let card = rate({}, false, now);
    expect(card.box).toBe(0);
    expect(card.due - now).toBe(INTERVALS[0] * DAY);
    const steps = [3, 7, 21];
    steps.forEach((days, index) => {
      const at = card.due;
      card = rate(card, true, at);
      expect(card.retired).toBe(false);
      expect(card.box).toBe(index + 1);
      expect(card.due - at).toBe(days * DAY);
    });
    const mastered = rate(card, true, card.due);
    expect(mastered.retired).toBe(true);
    const again = rate(card, false, card.due);
    expect(again.box).toBe(0);
    expect(again.streak).toBe(0);
    expect(again.due - card.due).toBe(DAY);
    expect(resolveLessonId('#lectie-fractii')).toBe('fractii');

    const boxes = {};
    for (let i = 0; i < 12; i += 1) boxes[`e${i}`] = { box: 0, due: now - i, lesson: 'Fracții', retired: false };
    expect(buildDeck(boxes, now, 10)).toHaveLength(10);
  });

  it('intră în caiet la exercițiul greșit, se exportă fără textul răspunsului și dispare la ștergere', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const finish = await child.agent.post('/api/flashcards/finish').send({
      kind: 'flashcards',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      title: 'Numere naturale',
      picks: [{ card_id: 'm5n1', chosen: 'Să le înmulțești mereu' }]
    });
    expect(finish.status).toBe(200);

    const book = await child.agent.get('/api/mistakes');
    expect(book.status).toBe(200);
    expect(book.body.count).toBe(0);
    expect(book.body.groups[0].lesson).toBe('Numere naturale');
    expect(book.body.groups[0].lessonId).toBe('naturale');

    const exported = await child.agent.get('/api/account/export');
    const row = exported.body.economie.greseli.find(item => item.id === 'm5n1');
    expect(row.lectie).toBe('Numere naturale');
    expect(row.rezultate[0].corect).toBe(false);
    expect(JSON.stringify(row)).not.toContain('înmulțești');

    const email = authStore.findByUsername(child.username).email;
    const user = economy.getUser(email);
    user.mistakeBoxes.m5n1.due = Date.now() - 1000;
    const review = await child.agent.post('/api/mistakes/review').send({
      itemId: 'm5n1',
      answer: 'Să vezi care e mai mare, fără să le aduni'
    });
    expect(review.status).toBe(200);
    expect(review.body.correct).toBe(true);
    expect(review.body.retired).toBe(false);
    expect(review.body.count).toBe(0);

    const removed = await child.agent.delete('/api/account').send({ confirm: 'ȘTERGE', password: PASSWORD });
    expect(removed.status).toBe(200);
    const after = await child.agent.get('/api/account/export');
    expect(after.status).toBe(401);
    expect(economy.getUser(email)).toBeNull();
  });
});
