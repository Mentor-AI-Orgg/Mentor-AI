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
import { getEnGuide, enCounts } from '../backend/src/data/en8Guide.js';

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

    const geo5 = getGuide('matematica', 5).units.find(unit => unit.id === 'geometrie');
    const geo8 = getGuide('matematica', 8).units.find(unit => unit.id === 'spatiu');
    expect(geo5.lessons.filter(entry => entry.figure).length).toBeGreaterThanOrEqual(3);
    expect(geo8.lessons.filter(entry => entry.figure).length).toBeGreaterThanOrEqual(4);
    [...geo5.lessons, ...geo8.lessons].filter(entry => entry.figure).forEach(entry => {
      expect(entry.platter).toMatch(/Exemplu lucrat|Exemplu:/);
      expect(entry.figure).toMatch(/points-line|angle|rectangle|box3d|triangle|planes|pyramid|cylinder|cone|sphere/);
    });
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

  it('serves a separate Evaluare Națională track with original platter lessons', async () => {
    const counts = enCounts();
    expect(counts.matematica.chapters).toBe(7);
    expect(counts.matematica.lessons).toBe(31);
    expect(counts.matematica.papers).toBe(3);
    expect(counts.romana.chapters).toBe(7);
    expect(counts.romana.lessons).toBe(30);
    expect(counts.romana.papers).toBe(3);

    const math = getEnGuide('matematica');
    expect(math.track).toBe('en');
    expect(math.completablePractice).toBe(false);
    expect(math.source.ordinance).toMatch(/4\.730/);
    math.units.forEach(unit => {
      expect(unit.lessons.length, unit.id).toBeGreaterThanOrEqual(4);
      unit.lessons.forEach(entry => {
        expect(entry.platter.length).toBeGreaterThan(80);
        expect(entry.platter).toMatch(/Exemplu lucrat|Exemplu:/);
        expect(entry.platter.toLowerCase()).not.toMatch(/manuale\.edu\.ro|subiecte\.edu/);
      });
    });
    const enGeo = math.units.filter(unit => unit.id === 'geo-plana' || unit.id === 'geo-spatiu');
    const figured = enGeo.flatMap(unit => unit.lessons).filter(entry => entry.figure);
    expect(figured.length).toBeGreaterThanOrEqual(4);
    figured.forEach(entry => {
      expect(entry.figure).toMatch(/parallels|triangle|planes|pyramid|cone|sphere|thales|circle/);
    });
    math.papers.forEach(paper => {
      expect(paper.completable).toBe(false);
      expect(paper.workOnPaper).toBe(true);
      expect(paper.blocks.length).toBe(3);
      expect(JSON.stringify(paper)).not.toMatch(/<input|<textarea/i);
      const mcq = paper.blocks.flatMap(block => block.items).filter(item => item.choices);
      expect(mcq.length).toBeGreaterThan(10);
      mcq.forEach(item => expect(item.choices).toHaveLength(4));
      expect(JSON.stringify(paper)).not.toMatch(/"letter":\s*"A"/);
    });

    const catalog = await request(app).get('/api/curriculum').query({ track: 'en' });
    expect(catalog.status).toBe(200);
    expect(catalog.body.track).toBe('en');
    expect(catalog.body.guides).toHaveLength(2);

    const one = await request(app).get('/api/curriculum').query({ track: 'en', subject: 'romana' });
    expect(one.status).toBe(200);
    expect(one.body.subject).toBe('romana');
    expect(one.body.papers[0].hint).toMatch(/foaie|caiet/i);
    expect(one.body.papers[0].completable).toBe(false);
    expect(JSON.stringify(one.body.papers)).not.toMatch(/<input|<textarea/);

    const countsApi = await request(app).get('/api/curriculum/en/counts');
    expect(countsApi.status).toBe(200);
    expect(countsApi.body.counts.matematica.lessons).toBe(31);
    expect(countsApi.body.counts.romana.lessons).toBe(30);
  });
});
