import { createRequire } from 'node:module';
import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { buildNudge, issueStudentNudge } from '../backend/src/notify/studentReminders.js';

const { findByUsername } = createRequire(import.meta.url)('../backend/src/data/authStore.js');

describe('student reminders', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('puts an important date ahead of leftover lessons', () => {
    const now = new Date('2026-03-10T08:00:00');
    const nudge = buildNudge({
      user: { chapters: { 'matematica:5:geometrie': { status: 'open', title: 'Geometrie', chapterId: 'geometrie' } } },
      summary: { weaknesses: ['fracții'], missions: { items: [{ id: 'test', label: 'Un test', done: false }] } },
      events: [
        { id: 'e1', date: '2026-03-10', title: 'Test la mate', important: true, time: '09:00', type: 'important' }
      ],
      now
    });
    expect(nudge.key).toMatch(/^imp:/);
    expect(nudge.body).toMatch(/Test la mate/);
    expect(nudge.body.length).toBeLessThan(160);
  });

  it('can mention a nearby orar slot when nothing important is due', () => {
    const now = new Date('2026-03-10T08:00:00');
    expect(now.getDay()).toBe(2);
    const weekday = (now.getDay() + 6) % 7;
    const nudge = buildNudge({
      user: { chapters: {} },
      summary: {},
      events: [{ id: 'o1', type: 'orar', weekday, time: '08:50', title: 'Română' }],
      now
    });
    expect(nudge.key).toMatch(/^orar:/);
    expect(nudge.body).toMatch(/Română/);
  });

  it('issues at most one nudge a day and keeps it on the next home load', async () => {
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    const agent = created.agent;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = tomorrow.toISOString().slice(0, 10);
    const added = await agent.post('/api/calendar/events').send({
      date,
      title: 'Serbare',
      type: 'important',
      important: true,
      time: '10:00'
    });
    expect(added.status).toBe(200);

    const first = await agent.get('/api/economy/summary');
    expect(first.status).toBe(200);
    expect(first.body.summary.nudge.body).toMatch(/Serbare/);

    const second = await agent.get('/api/economy/summary');
    expect(second.body.summary.nudge.body).toMatch(/Serbare/);

    const again = issueStudentNudge(findByUsername(created.username).email, { summary: first.body.summary });
    expect(again.already).toBe(true);
    expect(again.nudge.body).toMatch(/Serbare/);

    const inbox = await agent.get('/api/economy/notifications');
    const nudges = (inbox.body.inbox || []).filter(note => note.channel === 'nudge');
    expect(nudges).toHaveLength(1);
  });
});
