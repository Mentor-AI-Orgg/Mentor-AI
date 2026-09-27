import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const economyStore = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

let app;

async function registerStudent() {
  const created = await registerGranted(app, { class: '5' });
  expect(created.res.status).toBe(201);
  expect(created.confirm.status).toBe(200);
  return created.agent;
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
    expect(items.find(item => item.id === 'avatar-unicorn').minLevel).toBe(5);
    expect(items.filter(item => item.rarity === 'Mythic').every(item => item.minLevel === 5)).toBe(true);
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
    const created = await registerGranted(app, { class: '5' });
    expect(created.res.status).toBe(201);
    const agent = created.agent;
    await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    const email = authStore.findByUsername(created.username).email;
    economyStore.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
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

  it('blocks Mythic purchases before level 5', async () => {
    const agent = await registerStudent();
    await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    const blocked = await agent.post('/api/economy/buy').send({ item_id: 'avatar-unicorn' });
    expect(blocked.status).toBe(400);
    expect(blocked.body.reason).toBe('level_required');
    expect(blocked.body.minLevel).toBe(5);

    for (let i = 0; i < 26; i += 1) {
      await agent.post('/api/economy/progress').send({
        type: 'session_complete',
        meta: { subject: 'matematica', grade: '5', chapterId: `lvl-${i}`, title: `Cap ${i}` }
      });
    }
    const summary = await agent.get('/api/economy/summary');
    expect(summary.body.summary.level).toBeLessThan(5);
    expect(summary.body.summary.xp).toBe(20);

    const buy = await agent.post('/api/economy/buy').send({ item_id: 'avatar-unicorn' });
    expect(buy.status).toBe(400);
    expect(buy.body.reason).toBe('level_required');
  });
});
