import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import {
  normalizeGrade,
  normalizeSubject,
  getGuide,
  buildMentorContext,
  GRADES,
  SUBJECT_IDS
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

  it('serves original platter lessons for every chapter in grades 5–8', () => {
    const counts = { matematica: {}, romana: {} };
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        const guide = getGuide(subject, grade);
        const lessonCount = guide.units.reduce((sum, unit) => sum + (unit.lessons || []).length, 0);
        counts[subject][grade] = { chapters: guide.units.length, lessons: lessonCount };
        expect(guide.units.length).toBeGreaterThanOrEqual(subject === 'matematica' ? 3 : 5);
        guide.units.forEach(unit => {
          expect(unit.lessons.length, `${subject}:${grade}:${unit.id}`).toBeGreaterThanOrEqual(4);
          unit.lessons.forEach(entry => {
            expect(entry.id).toBeTruthy();
            expect(entry.title.length).toBeGreaterThan(3);
            expect(entry.platter.length).toBeGreaterThan(80);
            expect(entry.platter).toMatch(/Exemplu lucrat|Exemplu:/);
            expect(entry.platter.toLowerCase()).not.toMatch(/manuale\.edu\.ro/);
          });
        });
      });
    });
    expect(counts.matematica[5].chapters).toBe(3);
    expect(counts.matematica[6].chapters).toBe(4);
    expect(counts.matematica[7].chapters).toBe(4);
    expect(counts.matematica[8].chapters).toBe(4);
    expect(counts.romana[5].chapters).toBe(5);
    expect(counts.romana[6].chapters).toBe(5);
    expect(counts.romana[7].chapters).toBe(5);
    expect(counts.romana[8].chapters).toBe(5);
    expect(counts.matematica[5].lessons).toBeGreaterThanOrEqual(18);
    expect(counts.romana[5].lessons).toBeGreaterThanOrEqual(20);
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
    expect(one.body.units[0].lessons.length).toBeGreaterThanOrEqual(4);
    expect(one.body.units[0].lessons[0].platter).toMatch(/Exemplu/i);
    expect(catalog.body.guides).toHaveLength(8);
    for (const guide of catalog.body.guides) {
      expect(guide.units.length).toBeGreaterThan(2);
      expect(guide.howISeeIt.length).toBeGreaterThan(30);
    }
  });
});
