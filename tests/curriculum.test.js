import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import {
  normalizeGrade,
  normalizeSubject,
  getGuide,
  buildMentorContext
} from '../backend/src/data/gimnaziuGuide.js';

describe('gimnaziu curriculum', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('normalizes messy class and subject labels', () => {
    expect(normalizeGrade('a VIII-a A')).toBe(8);
    expect(normalizeGrade('liceu')).toBe(5);
    expect(normalizeSubject('Limba Română')).toBe('romana');
    expect(normalizeSubject('fizica')).toBe('matematica');
  });

  it('returns an original summary, not a textbook chapter', () => {
    const guide = getGuide('romana', 5);
    expect(guide.title).toMatch(/română/i);
    expect(guide.howISeeIt.length).toBeGreaterThan(40);
    expect(guide.units.length).toBeGreaterThan(2);
    expect(guide.source.ordinance).toMatch(/3393/);
    expect(guide.source.disclaimer).toMatch(/manual/i);
  });

  it('builds mentor context for the requested grade', () => {
    const context = buildMentorContext('matematica', 7);
    expect(context).toMatch(/a 7-a/);
    expect(context).toMatch(/Pitagora|asemănare|radical/i);
    expect(context).not.toMatch(/manuale\.edu\.ro/i);
  });

  it('exposes the catalog at /api/curriculum', async () => {
    const catalog = await request(app).get('/api/curriculum');
    expect(catalog.status).toBe(200);
    expect(catalog.body.subjects.map(item => item.id)).toEqual(['matematica', 'romana']);
    expect(catalog.body.grades).toEqual([5, 6, 7, 8]);

    const one = await request(app).get('/api/curriculum').query({ subject: 'romana', class_level: 6 });
    expect(one.status).toBe(200);
    expect(one.body.grade).toBe(6);
    expect(one.body.subject).toBe('romana');
    expect(one.body.units[0].inOwnWords).toBeTruthy();
  });
});
