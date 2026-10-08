import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const economy = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');

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
  await agent.post('/api/parent/magic/consume').send({ token });
  return agent;
}

describe('panoul părintelui', () => {
  it('arată progresul, nu conversațiile, și schimbă emailurile și limita', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const phrase = `zmeucaprioara-${Date.now()}`;
    await child.agent.post('/api/chat').send({ message: phrase });
    const parent = await parentOf(app, child.parentEmail);
    const mine = await parent.get('/api/parent/me');
    expect(mine.body.children[0].emails).toBe('weekly');
    const id = mine.body.children[0].id;
    const panel = await parent.get(`/api/parent/children/${id}/panel`);
    expect(panel.status).toBe(200);
    expect(panel.body.days).toHaveLength(7);
    expect(JSON.stringify(panel.body)).not.toContain(phrase);
    expect(JSON.stringify(panel.body)).not.toMatch(/mesaj|chat|tutor/i);
    const cadence = await parent.post(`/api/parent/children/${id}/emails`).send({ cadence: 'off' });
    expect(cadence.body.emails).toBe('off');
    const limit = await parent.post(`/api/parent/children/${id}/limit`).send({ minutes: 30 });
    expect(limit.body.dailyLimit).toBe(30);

    const account = authStore.findByUsername(child.username);
    const user = economy.ensureUser(account.email, { role: 'student', username: child.username });
    user.digestEvents = [{ at: new Date().toISOString(), type: 'learn_module', minutes: 40, title: 'Fracții' }];
    const me = await child.agent.get('/api/auth/me');
    expect(me.body.user.timeBlocked).toBe(true);
    const home = fs.readFileSync('frontend/screens/HomeScreen.jsx', 'utf8');
    const ro = JSON.parse(fs.readFileSync('frontend/i18n/locales/ro.json', 'utf8'));
    expect(ro.home.timeBlocked).toBe('Ai lucrat mult azi, ne vedem mâine!');
    expect(home).toContain("t('home.timeBlocked')");
    const screen = fs.readFileSync('frontend/components/ConsentScreens.jsx', 'utf8');
    expect(screen).toContain('Duminică, de la ora 19');
    expect(screen).toContain('În fiecare zi, de la ora 19');
    expect(screen).toContain('Nu mai primești rezumatul de activitate');
    expect(screen).toContain('cel mult trei rezumate');
    expect(screen).toContain('Nu apare mesajul că a lucrat destul');
    expect(screen).toContain('La 30 de minute de cronometru și teste');
    expect(screen).toContain('La 60 de minute de cronometru și teste');
    expect(screen).toContain('La 90 de minute de cronometru și teste');
    expect(screen).toContain('Săptămânal');
    expect(screen).toContain('Fără emailuri');
    expect(screen).toContain('Fără limită');
  });
});
