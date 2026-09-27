import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

describe('calendar dates and timetable', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('stores an important date and a weekday orar slot', async () => {
    const created = await registerGranted(app);
    expect(created.res.status).toBe(201);
    const agent = created.agent;

    const day = await agent.post('/api/calendar/events').send({
      date: '2026-09-14',
      title: 'Test la română',
      type: 'important',
      important: true,
      time: '09:00'
    });
    expect(day.status).toBe(200);
    expect(day.body.event.important).toBe(true);
    expect(day.body.event.date).toBe('2026-09-14');

    const slot = await agent.post('/api/calendar/events').send({
      type: 'orar',
      weekday: 0,
      time: '08:00',
      endTime: '08:50',
      title: 'Matematică',
      subject: 'matematica',
      date: ''
    });
    expect(slot.status).toBe(200);
    expect(slot.body.event.type).toBe('orar');
    expect(slot.body.event.weekday).toBe(0);
    expect(slot.body.event.time).toBe('08:00');

    const listed = await agent.get('/api/calendar/events').query({ month: 9, year: 2026 });
    expect(listed.status).toBe(200);
    expect(listed.body.events.some(ev => ev.title === 'Test la română' && ev.important)).toBe(true);
    expect(listed.body.orar).toHaveLength(1);
    expect(listed.body.orar[0].title).toBe('Matematică');

    const patched = await agent.patch(`/api/calendar/events/${day.body.event.id}`).send({ important: false });
    expect(patched.status).toBe(200);
    expect(patched.body.event.important).toBe(false);
  });

  it('rejects an orar slot without a weekday', async () => {
    const created = await registerGranted(app);
    const agent = created.agent;
    expect(created.res.status).toBe(201);
    const res = await agent.post('/api/calendar/events').send({
      type: 'orar',
      title: 'Fără zi',
      time: '08:00',
      date: ''
    });
    expect(res.status).toBe(400);
  });
});
