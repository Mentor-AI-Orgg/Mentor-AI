import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted, uniqueEmail } from './registerStudent.js';

describe('nume de utilizator', () => {
  it('respinge insultele și numele care se dau drept aplicația', async () => {
    const { app } = createApp({ autosave: false });
    const blocked = ['pr0stule', 'admin', 'tampit', 'sex'];
    for (const username of blocked) {
      const res = await request(app).post('/api/auth/register').send({
        username,
        password: PASSWORD,
        confirmPassword: PASSWORD,
        class: '6',
        parentEmail: uniqueEmail('parinte')
      });
      expect(res.status).toBe(400);
      expect(res.body.field).toBe('username');
      expect(res.body.error).toMatch(/alt nume|3–20/);
    }
  });

  it('acceptă un nume obișnuit și îl verifică din nou la schimbare', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { username: 'vulpe-albastra' });
    expect(created.res.status).toBe(201);

    const bad = await created.agent.patch('/api/account/profile').send({ username: 'cacat' });
    expect(bad.status).toBe(400);
    expect(bad.body.field).toBe('username');

    const good = await created.agent.patch('/api/account/profile').send({ username: 'vulpe.alba' });
    expect(good.status).toBe(200);
    expect(good.body.user.username).toBe('vulpe.alba');
  });
});
