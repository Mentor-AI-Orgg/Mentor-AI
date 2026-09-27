import { describe, expect, it } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { scorePlacement } from '../backend/src/data/placement.js';

describe('testul de pornire', () => {
  it('nu dă notă pe parcurs și dă insigna la final, fără monede în minus', async () => {
    const scored = scorePlacement('5', 'mate', [
      { id: 'm1', given: '15' },
      { id: 'm2', given: '1' }
    ]);
    expect(scored.good).toContain('Adunarea');
    expect(scored.startWith).toContain('Fracții');
    expect(scored.correct).toBe(1);

    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const before = await child.agent.get('/api/economy/summary');
    const skip = await child.agent.post('/api/placement/skip');
    expect(skip.status).toBe(200);
    const questions = await child.agent.post('/api/placement/questions').send({ subject: 'mate' });
    expect(questions.body.questions).toHaveLength(5);
    expect(JSON.stringify(questions.body)).not.toMatch(/corect|greșit/i);
    const done = await child.agent.post('/api/placement/finish').send({
      subject: 'mate',
      answers: [{ id: 'm1', given: '15' }]
    });
    expect(done.body.badge).toBe('Primul pas');
    expect(done.body.correct).toBeUndefined();
    const after = await child.agent.get('/api/economy/summary');
    expect(after.body.summary?.balance || after.body.balance || 0).toBe(before.body.summary?.balance || before.body.balance || 0);
  });
});
