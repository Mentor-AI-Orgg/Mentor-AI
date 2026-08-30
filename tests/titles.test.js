import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const PASSWORD = 'Testpass1!';
let app;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

async function registerStudent(name = 'Elev Titlu') {
  const agent = request.agent(app);
  const res = await agent.post('/api/auth/register').send({
    email: uniqueEmail('titlu'),
    password: PASSWORD,
    role: 'student',
    name,
    username: `t${Math.random().toString(16).slice(2, 8)}`,
    school: 'Școala Test',
    class: '5',
    parentEmail: uniqueEmail('parinte'),
    parental_consent: true,
    privacy_accepted: true
  });
  expect(res.status).toBe(201);
  return agent;
}

describe('shop titles and equip', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('drops voice, music and surprise crates from the catalog', async () => {
    const agent = await registerStudent();
    const catalog = await agent.get('/api/economy/catalog');
    const items = catalog.body.items || [];
    expect(items.some(item => item.category === 'voice')).toBe(false);
    expect(items.some(item => item.category === 'boost')).toBe(false);
    expect(items.some(item => String(item.id).startsWith('music-') || String(item.id).startsWith('sfx-'))).toBe(false);
    const avatars = items.filter(item => item.category === 'avatar');
    const backgrounds = items.filter(item => item.category === 'background');
    expect(avatars.length).toBeGreaterThanOrEqual(20);
    expect(backgrounds.length).toBeGreaterThanOrEqual(20);
    expect(items.every(item => item.emoji)).toBe(true);
    expect(items.find(item => item.id === 'avatar-detective').emoji).toBe('🕵️');
    expect(items.find(item => item.id === 'theme-library').emoji).toBe('📚');
    expect(items.find(item => item.id === 'avatar-mentor-legend').price).toBe(220);
  });

  it('unlocks Prima lecție after a finished chapter and lets the student wear it', async () => {
    const agent = await registerStudent();
    await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'start', title: 'Start' }
    });
    const summary = await agent.get('/api/economy/summary');
    expect(summary.body.summary.titles.unlocked).toContain('prima-lectie');

    const locked = await agent.post('/api/economy/equip').send({ title_id: 'foc-30' });
    expect(locked.status).toBe(400);

    const wear = await agent.post('/api/economy/equip').send({ title_id: 'prima-lectie' });
    expect(wear.status).toBe(200);
    expect(wear.body.equipped.title).toBe('prima-lectie');
    expect(wear.body.summary.titleName).toBe('Prima lecție');
  });

  it('unlocks Prima cumpărătură after a shop buy and can switch avatar', async () => {
    const agent = await registerStudent();
    await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    await agent.post('/api/economy/progress').send({
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'coins', title: 'Coins' }
    });
    const buy = await agent.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(buy.status).toBe(200);
    const summary = await agent.get('/api/economy/summary');
    expect(summary.body.summary.titles.unlocked).toContain('prima-cumparare');
    expect(summary.body.summary.equipped.avatar).toBe('avatar-neon-fox');

    const clear = await agent.post('/api/economy/equip').send({ slot: 'avatar', item_id: '' });
    expect(clear.status).toBe(200);
    expect(clear.body.equipped.avatar).toBeFalsy();
  });
});
