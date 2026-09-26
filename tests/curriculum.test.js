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

  it('serves original platter lessons for every loaded chapter', () => {
    const counts = { matematica: {}, romana: {} };
    SUBJECT_IDS.forEach(subject => {
      GRADES.forEach(grade => {
        const guide = getGuide(subject, grade);
        const lessonCount = guide.units.reduce((sum, unit) => sum + (unit.lessons || []).length, 0);
        counts[subject][grade] = { chapters: guide.units.length, lessons: lessonCount };
        if (subject === 'romana' && grade > 7) {
          expect(guide.restored).toBe(false);
          expect(guide.units).toHaveLength(0);
          return;
        }
        if (subject === 'romana' && grade === 7) {
          expect(guide.restored).toBe(true);
          expect(guide.units).toHaveLength(3);
          expect(guide.manual.code).toBe('A1732');
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
          return;
        }
        if (subject === 'romana' && grade === 6) {
          expect(guide.restored).toBe(true);
          expect(guide.units).toHaveLength(8);
          expect(guide.manual.code).toBe('A1470');
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
          return;
        }
        expect(guide.units.length).toBeGreaterThanOrEqual(subject === 'matematica' ? 3 : 8);
        guide.units.forEach(unit => {
          const minLessons = subject === 'romana' && unit.id === 'evaluare-initiala' ? 2 : 4;
          expect(unit.lessons.length, `${subject}:${grade}:${unit.id}`).toBeGreaterThanOrEqual(minLessons);
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
    expect(counts.romana[5].chapters).toBe(8);
    expect(counts.romana[6].chapters).toBe(8);
    expect(counts.romana[7].chapters).toBe(3);
    expect(counts.romana[8].chapters).toBe(0);
    expect(counts.matematica[5].lessons).toBeGreaterThanOrEqual(18);
    expect(counts.romana[5].lessons).toBeGreaterThanOrEqual(40);

    const romana5 = getGuide('romana', 5);
    expect(romana5.manual.code).toBe('A1249');
    expect(romana5.manual.approval).toMatch(/4065/);
    expect(romana5.competencies.map(item => item.code)).toEqual(expect.arrayContaining(['1.1', '4.1', '5.2']));
    expect(romana5.units.map(unit => unit.title)).toEqual([
      'Evaluare inițială',
      'Cuvinte potrivite',
      'Cartea, sursă de cunoaștere și legătură între generații',
      'Fascinația povestirii',
      'Puterea prieteniei',
      'Omul, parte din natură',
      'Trepte în viață',
      'Eroi din cărți, din filme și din viață'
    ]);
    romana5.units.forEach(unit => {
      expect(unit.toc.length).toBeGreaterThan(0);
    });

    const geo5 = getGuide('matematica', 5).units.find(unit => unit.id === 'geometrie');
    const geo8 = getGuide('matematica', 8).units.find(unit => unit.id === 'spatiu');
    expect(geo5.lessons.filter(entry => entry.figure).length).toBeGreaterThanOrEqual(3);
    expect(geo8.lessons.filter(entry => entry.figure).length).toBeGreaterThanOrEqual(4);
    [...geo5.lessons, ...geo8.lessons].filter(entry => entry.figure).forEach(entry => {
      expect(entry.platter).toMatch(/Exemplu lucrat|Exemplu:/);
      expect(entry.figure.length).toBeGreaterThan(2);
    });
    const atlas = getGuide('matematica', 8).atlas;
    expect(atlas.all.length).toBeGreaterThanOrEqual(30);
    expect(atlas.plane.length).toBeGreaterThanOrEqual(18);
    expect(atlas.space.length).toBeGreaterThanOrEqual(10);
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

    const one = await request(app).get('/api/curriculum').query({ subject: 'romana', class_level: 5 });
    expect(one.status).toBe(200);
    expect(one.body.grade).toBe(5);
    expect(one.body.subject).toBe('romana');
    expect(one.body.manual.code).toBe('A1249');
    expect(one.body.units[0].toc.length).toBeGreaterThan(0);
    expect(one.body.units[0].lessons.length).toBeGreaterThanOrEqual(2);
    expect(one.body.units[0].lessons[0].platter).toMatch(/Exemplu/i);
    const six = await request(app).get('/api/curriculum').query({ subject: 'romana', class_level: 6 });
    expect(six.body.restored).toBe(true);
    expect(six.body.manual.code).toBe('A1470');
    expect(six.body.units).toHaveLength(8);
    const seven = await request(app).get('/api/curriculum').query({ subject: 'romana', class_level: 7 });
    expect(seven.body.restored).toBe(true);
    expect(seven.body.manual.code).toBe('A1732');
    expect(seven.body.units).toHaveLength(3);
    const pending = await request(app).get('/api/curriculum').query({ subject: 'romana', class_level: 8 });
    expect(pending.body.restored).toBe(false);
    expect(pending.body.units).toHaveLength(0);
    expect(catalog.body.guides).toHaveLength(8);
    for (const guide of catalog.body.guides) {
      expect(guide.howISeeIt.length).toBeGreaterThan(30);
      if (guide.subject === 'romana' && guide.grade > 7) expect(guide.units).toHaveLength(0);
      else if (guide.subject === 'romana' && guide.grade === 7) expect(guide.units).toHaveLength(3);
      else if (guide.subject === 'romana' && guide.grade === 6) expect(guide.units).toHaveLength(8);
      else expect(guide.units.length).toBeGreaterThan(2);
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
      expect(entry.figure.length).toBeGreaterThan(2);
    });
    expect(math.atlas.all.length).toBeGreaterThanOrEqual(30);
    math.papers.forEach(paper => {
      expect(paper.completable).toBe(true);
      expect(paper.workOnPaper).toBe(false);
      expect(paper.blocks.length).toBe(3);
      expect(paper.hint).toMatch(/Începe test|oră|finaliz/i);
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
    expect(one.body.papers[0].hint).toMatch(/Începe test|oră|finaliz|barem/i);
    expect(one.body.papers[0].completable).toBe(true);
    expect(JSON.stringify(one.body.papers)).not.toMatch(/<input|<textarea/);

    const countsApi = await request(app).get('/api/curriculum/en/counts');
    expect(countsApi.status).toBe(200);
    expect(countsApi.body.counts.matematica.lessons).toBe(31);
    expect(countsApi.body.counts.romana.lessons).toBe(30);
  });
});
