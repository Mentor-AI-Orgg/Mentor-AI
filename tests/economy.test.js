import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { findExercise } from '../backend/src/data/exerciseBank.js';
import { findQuestion } from '../backend/src/data/practiceBank.js';

const PASSWORD = 'Testpass1!';
let app;
let agent;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

describe('economy purchases', () => {
  beforeAll(async () => {
    ({ app } = createApp({ autosave: false }));
    agent = request.agent(app);
    const register = await agent.post('/api/auth/register').send({
      email: uniqueEmail('shop'),
      password: PASSWORD,
      role: 'student',
      parentEmail: uniqueEmail('parinte'),
      parental_consent: true,
      privacy_accepted: true
    });
    expect(register.status).toBe(201);
  });

  it('grants the first-login bonus and spends coins on an item', async () => {
    const bonus = await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(bonus.status).toBe(200);
    expect(bonus.body.ok).toBe(true);
    expect(bonus.body.balance).toBe(30);

    const study = await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'start', title: 'Start' }
    });
    expect(study.status).toBe(200);
    expect(study.body.summary.balance).toBeGreaterThanOrEqual(50);

    const catalog = await agent.get('/api/economy/catalog');
    expect(catalog.status).toBe(200);
    const items = catalog.body.items || [];
    const item = items.find(entry => entry.id === 'avatar-neon-fox');
    expect(item).toBeTruthy();
    expect(item.price).toBe(40);
    expect(item.name).toBe('Vulpe');
    expect(items.every(entry => entry.category !== 'voice' && entry.category !== 'boost')).toBe(true);
    expect(items.some(entry => entry.id === 'boost-family-7d')).toBe(false);
    expect(items.some(entry => entry.id === 'boost-xp-doubler')).toBe(false);
    expect(catalog.body.titles.some(entry => entry.id === 'prima-lectie')).toBe(true);

    const buy = await agent.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(buy.status).toBe(200);
    expect(buy.body.ok).toBe(true);
    expect(buy.body.balance).toBe(study.body.summary.balance - 40);
    expect(buy.body.inventory).toContain('avatar-neon-fox');

    const again = await agent.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(again.status).toBe(400);
    expect(again.body.reason).toBe('already_owned');
  });

  it('rejects a purchase when the item does not exist', async () => {
    const res = await agent.post('/api/economy/buy').send({ item_id: 'nu-exista' });
    expect(res.status).toBe(400);
    expect(res.body.reason).toBe('item_not_found');
  });

  it('grades a maths and a Romanian pack, then XP and coins still buy from the shop', async () => {
    const other = request.agent(app);
    const register = await other.post('/api/auth/register').send({
      email: uniqueEmail('xpshop'),
      password: PASSWORD,
      role: 'student',
      parentEmail: uniqueEmail('parinte'),
      parental_consent: true,
      privacy_accepted: true
    });
    expect(register.status).toBe(201);

    await other.post('/api/economy/claim').send({ type: 'login_bonus' });

    const mathPack = await other.post('/api/flashcards/generate').send({
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      kind: 'test',
      count: 7
    });
    expect(mathPack.status).toBe(200);
    expect(mathPack.body.cards.map(card => card.level)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    const mathAnswers = mathPack.body.cards.map(card => ({
      card_id: card.id,
      answer: findExercise(card.id).answers[0]
    }));
    const mathDone = await other.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      title: 'Numere naturale',
      answers: mathAnswers
    });
    expect(mathDone.status).toBe(200);
    expect(mathDone.body.correct).toBe(7);
    expect(mathDone.body.grade).toBe(10);
    expect(mathDone.body.summary.xp).toBeGreaterThanOrEqual(35);

    const roPack = await other.post('/api/flashcards/generate').send({
      chapter_id: 'limba5',
      subject: 'romana',
      class_level: 5,
      kind: 'flashcards',
      count: 8
    });
    expect(roPack.status).toBe(200);
    expect(roPack.body.cards[0].level).toBe(1);
    expect(roPack.body.cards[7].level).toBe(8);
    const picks = roPack.body.cards.map(card => {
      const question = findQuestion(card.id);
      return { card_id: card.id, chosen: question.options[question.correct] };
    });
    const roDone = await other.post('/api/flashcards/finish').send({
      kind: 'flashcards',
      chapter_id: 'limba5',
      subject: 'romana',
      class_level: 5,
      title: 'Cum e construită limba',
      picks
    });
    expect(roDone.status).toBe(200);
    expect(roDone.body.correct).toBe(8);
    expect(roDone.body.summary.xp).toBeGreaterThanOrEqual(mathDone.body.summary.xp);

    const buy = await other.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(buy.status).toBe(200);
    expect(buy.body.ok).toBe(true);
    expect(buy.body.inventory).toContain('avatar-neon-fox');

    const summary = await other.get('/api/economy/summary');
    expect(summary.status).toBe(200);
    expect(summary.body.summary.xp).toBeGreaterThanOrEqual(roDone.body.summary.xp);
    expect(summary.body.summary.balance).toBe(buy.body.balance);
    expect(summary.body.summary.level).toBeGreaterThanOrEqual(1);
  });
});
