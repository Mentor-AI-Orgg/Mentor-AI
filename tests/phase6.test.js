import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted, uniqueEmail } from './registerStudent.js';
import { verifyStripeSignature } from '../backend/src/payments/stripe.js';
import crypto from 'node:crypto';

let app;

async function registerStudent(agent, extra = {}) {
  const email = uniqueEmail('elev');
  const created = await registerGranted(app, {
    agent,
    username: extra.username || undefined,
    name: extra.name
  });
  expect(created.res.status).toBe(201);
  expect(created.confirm.status).toBe(200);
  return { email, username: created.username, res: created.res };
}

describe('phase 6 product polish', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('keeps health to a yes or no, without integrations', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('lists only the free plan and rejects paid checkout', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);

    const listed = await agent.get('/api/subscriptions');
    expect(listed.status).toBe(200);
    expect(listed.body.subscriptions.map(plan => plan.id)).toEqual(['free']);
    expect(listed.body.subscriptions.every(plan => Number(plan.priceMonthly) === 0)).toBe(true);

    const paid = await agent.post('/api/subscriptions/checkout').send({
      plan_id: 'pro',
      billing_cycle: 'monthly'
    });
    expect(paid.status).toBe(410);
    expect(paid.body.reason).toBe('app_is_free');
    expect(paid.body.url).toBeUndefined();
  });

  it('activates the free plan without Stripe', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/subscriptions/checkout').send({
      plan_id: 'free',
      billing_cycle: 'monthly'
    });
    expect(res.status).toBe(200);
    expect(res.body.mocked).toBe(false);
    expect(res.body.subscription.planId).toBe('free');
  });

  it('rejects Stripe webhooks when the webhook secret is missing', async () => {
    const res = await request(app)
      .post('/api/subscriptions/webhook')
      .set('Content-Type', 'application/json')
      .send({ type: 'checkout.session.completed' });
    expect(res.status).toBe(503);
    expect(res.body.mocked).toBe(true);
  });

  it('verifies a Stripe webhook HMAC', () => {
    const secret = 'whsec_test';
    const payload = '{"id":"evt_1"}';
    const timestamp = Math.floor(Date.now() / 1000);
    const mac = crypto.createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
    expect(verifyStripeSignature(payload, `t=${timestamp},v1=${mac}`, secret)).toBe(true);
    expect(verifyStripeSignature(payload, `t=${timestamp},v1=deadbeef`, secret)).toBe(false);
  });

  it('refuses an external calendar connection', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/calendar/connect').send({ provider: 'google' });
    expect(res.status).toBe(410);
    expect(res.body.error).toMatch(/aplicație/i);
  });

  it('builds the leaderboard from activity using pseudonyms, ignoring spoofed query params', async () => {
    const agent = request.agent(app);
    const { email } = await registerStudent(agent, { name: 'Ana Popescu', username: 'vulpe-albastra' });
    const bonus = await agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(bonus.status).toBe(200);

    const spoofed = await agent.get('/api/leaderboard').query({
      limit: 10,
      name: 'Hacker Real',
      xp: 999999,
      streak: 99
    });
    expect(spoofed.status).toBe(200);
    expect(spoofed.body.mocked).toBe(false);

    const names = (spoofed.body.leaderboard || []).map(entry => entry.name);
    expect(names).toContain('vulpe-albastra');
    expect(names.join(' ')).not.toMatch(/Ana Popescu/i);
    expect(names.join(' ')).not.toMatch(/Hacker Real/i);
    expect(JSON.stringify(spoofed.body)).not.toContain(email);

    const current = spoofed.body.leaderboard.find(entry => entry.isCurrentUser);
    expect(current).toBeTruthy();
    expect(current.name).toBe('vulpe-albastra');
    expect(current.xp).toBeGreaterThan(0);
    expect(current.xp).toBeLessThan(999999);
  });

  it('shows the username on the leaderboard, not the real name', async () => {
    const agent = request.agent(app);
    const { username } = await registerStudent(agent, { name: 'Maria Radu' });
    const res = await agent.get('/api/leaderboard');
    const current = (res.body.leaderboard || []).find(entry => entry.isCurrentUser);
    expect(current.name).toBe(username);
    expect(current.name).not.toMatch(/Maria/);
  });

  it('stores parent review in the inbox and labels it mocked without SMTP', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/economy/parent-review').send({
      parent_email: uniqueEmail('review'),
      plan_id: 'free',
      message: 'Mentorul e gratuit'
    });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.mocked).toBe(true);
    expect(res.body.delivered).toBe(false);
    expect(res.body.email.body).toMatch(/gratuit/i);
  });

  it('persists onboarding on the account profile', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const patch = await agent.patch('/api/account/profile').send({
      name: 'Mara',
      username: 'mara-focus',
      class: '7',
      subject: 'matematica',
      profile: 'matematica',
      exam: 'evaluare',
      dailyHours: '1',
      hasCompletedOnboarding: true
    });
    expect(patch.status).toBe(200);
    expect(patch.body.user.hasCompletedOnboarding).toBe(true);
    expect(patch.body.user.username).toBe('mara-focus');
    expect(patch.body.user.class).toBe('7');

    const me = await agent.get('/api/auth/me');
    expect(me.body.user.hasCompletedOnboarding).toBe(true);
    expect(me.body.user.username).toBe('mara-focus');
    expect(me.body.user.exam).toBe('evaluare');
  });
});
