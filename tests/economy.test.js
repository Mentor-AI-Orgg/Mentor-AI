import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

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
    expect(bonus.body.balance).toBeGreaterThanOrEqual(100);

    const catalog = await agent.get('/api/economy/catalog');
    expect(catalog.status).toBe(200);
    const items = catalog.body.items || [];
    const item = items.find(entry => entry.id === 'avatar-neon-fox');
    expect(item).toBeTruthy();
    expect(item.price).toBe(50);
    expect(items.some(entry => entry.id === 'boost-family-7d')).toBe(false);
    expect(items.some(entry => entry.id === 'boost-xp-doubler')).toBe(false);

    const buy = await agent.post('/api/economy/buy').send({ item_id: 'avatar-neon-fox' });
    expect(buy.status).toBe(200);
    expect(buy.body.ok).toBe(true);
    expect(buy.body.balance).toBe(bonus.body.balance - 50);
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
});
