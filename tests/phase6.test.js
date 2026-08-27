import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { verifyStripeSignature } from '../backend/src/payments/stripe.js';
import crypto from 'node:crypto';

const PASSWORD = 'Testpass1!';
let app;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

async function registerStudent(agent, extra = {}) {
  const email = uniqueEmail('elev');
  const res = await agent.post('/api/auth/register').send({
    email,
    password: PASSWORD,
    role: 'student',
    name: extra.name || 'Nume Real Copil',
    username: extra.username || '',
    parentEmail: uniqueEmail('parinte'),
    parental_consent: true,
    privacy_accepted: true
  });
  expect(res.status).toBe(201);
  return { email, res };
}

describe('phase 6 product polish', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('exposes mock vs real status for payments, notify and calendar', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.integrations.stripe.status).toBe('online (mock)');
    expect(res.body.integrations.smtp.status).toBe('online (mock)');
    expect(res.body.integrations.twilio.status).toBe('online (mock)');
    expect(res.body.integrations.google_calendar.status).toBe('online (mock)');
    expect(res.body.integrations.notion.status).toBe('online (mock)');
  });

  it('activates a paid plan with mocked checkout when Stripe is not configured', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/subscriptions/checkout').send({
      plan_id: 'pro',
      billing_cycle: 'monthly'
    });
    expect(res.status).toBe(200);
    expect(res.body.mocked).toBe(true);
    expect(res.body.subscription.planId).toBe('pro');
    expect(res.body.subscription.status).toBe('active');
    expect(res.body.url).toBeUndefined();
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

  it('connects a calendar provider as mock when OAuth keys are missing', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/calendar/connect').send({ provider: 'google' });
    expect(res.status).toBe(200);
    expect(res.body.mocked).toBe(true);
    expect(res.body.connection.connected).toBe(true);
    expect(res.body.connection.mocked).toBe(true);
    expect(res.body.oauth_url).toBeUndefined();
    expect(res.body.syncedEvents.length).toBeGreaterThan(0);
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

  it('assigns Elev <hash> when the student has no username', async () => {
    const agent = request.agent(app);
    await registerStudent(agent, { name: 'Maria Radu', username: '' });
    const res = await agent.get('/api/leaderboard');
    const current = (res.body.leaderboard || []).find(entry => entry.isCurrentUser);
    expect(current.name).toMatch(/^Elev [A-F0-9]{4}$/);
    expect(current.name).not.toMatch(/Maria/);
  });

  it('stores parent review in the inbox and labels it mocked without SMTP', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const res = await agent.post('/api/economy/parent-review').send({
      parent_email: uniqueEmail('review'),
      plan_id: 'pro',
      message: 'Vreau Pro'
    });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.mocked).toBe(true);
    expect(res.body.delivered).toBe(false);
    expect(res.body.email.body).toContain('Pro');
  });

  it('persists onboarding on the account profile', async () => {
    const agent = request.agent(app);
    await registerStudent(agent);
    const patch = await agent.patch('/api/account/profile').send({
      name: 'Mara',
      username: 'mara-focus',
      class: 'liceu',
      profile: 'real',
      exam: 'bac',
      dailyHours: '1',
      hasCompletedOnboarding: true
    });
    expect(patch.status).toBe(200);
    expect(patch.body.user.hasCompletedOnboarding).toBe(true);
    expect(patch.body.user.username).toBe('mara-focus');
    expect(patch.body.user.class).toBe('liceu');

    const me = await agent.get('/api/auth/me');
    expect(me.body.user.hasCompletedOnboarding).toBe(true);
    expect(me.body.user.username).toBe('mara-focus');
    expect(me.body.user.exam).toBe('bac');
  });
});
