import { describe, it, expect, beforeAll } from 'vitest';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import {
  LESSON_ID_MAP,
  LESSON_ID_MAP_VERSION,
  resolveLessonKey,
  resolveLessonId,
  aliasesFor,
  cycleInMap,
  uniqueTargetId
} from '../backend/src/data/lessonIdMap.js';
import { migrateUserLessonIds, migrateNotificationList } from '../backend/src/data/lessonMigration.js';
import { DATA_FILE, lessonMapBackup } from '../backend/src/data/persistence.js';
import { collectLessonKeys } from '../scripts/snapshot-lesson-ids.js';
import { getGuide } from '../backend/src/data/gimnaziuGuide.js';
import { getEnGuide } from '../backend/src/data/en8Guide.js';

const BASELINE_PATH = new URL('./fixtures/lessonIds-baseline.json', import.meta.url);
const FIXTURE_MAP = {
  'matematica:7:geo7:romb': 'matematica:7:geo7:paralelograme-particulare',
  'matematica:7:geo7:patrat': 'matematica:7:geo7:paralelograme-particulare',
  'matematica:8:algebric:ecuatie-grad2': [
    'matematica:8:algebric:ecuatie-grad2-cazuri',
    'matematica:8:algebric:ecuatie-grad2-patrat'
  ],
  'matematica:8:algebric:vechi-lant': 'matematica:8:algebric:mijloc',
  'matematica:8:algebric:mijloc': 'matematica:8:algebric:final',
  'matematica:6:triunghi:pitagora': 'matematica:6:triunghi:pitagora-plan',
  'matematica:8:spatiu:pitagora': 'matematica:8:spatiu:pitagora-spatiu'
};

function chapterIds(keys) {
  const seen = new Map();
  keys.forEach(full => {
    const parts = full.split(':');
    const id = parts.pop();
    const chapter = parts.join(':');
    if (!seen.has(chapter)) seen.set(chapter, new Set());
    const bucket = seen.get(chapter);
    if (bucket.has(id)) throw new Error(`id duplicat: ${full}`);
    bucket.add(id);
  });
}

describe('harta id-urilor de lecție', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('păstrează cele 720 de chei din baseline, fără duplicate în capitol', () => {
    const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
    const current = new Set(collectLessonKeys());
    expect(baseline).toHaveLength(720);
    expect(new Set(baseline).size).toBe(720);
    expect(current.size).toBe(720);
    chapterIds([...current]);
    baseline.forEach(key => {
      if (current.has(key)) return;
      const resolved = resolveLessonKey(key);
      expect(resolved, key).toBeTruthy();
      resolved.keys.forEach(target => expect(current.has(target), target).toBe(true));
    });
    expect(cycleInMap()).toBe(false);
    expect(LESSON_ID_MAP_VERSION).toBe(1);
    Object.keys(LESSON_ID_MAP).forEach(key => {
      expect(current.has(key), key).toBe(false);
    });
  });

  it('urmează lanțul, împărțirea și aliasul, iar ciclul nu se rezolvă', () => {
    expect(resolveLessonKey('matematica:8:algebric:vechi-lant', FIXTURE_MAP)).toEqual({
      key: 'matematica:8:algebric:final',
      keys: ['matematica:8:algebric:final'],
      moved: true
    });
    expect(resolveLessonKey('matematica:8:algebric:ecuatie-grad2', FIXTURE_MAP)).toEqual({
      key: 'matematica:8:algebric:ecuatie-grad2-cazuri',
      keys: [
        'matematica:8:algebric:ecuatie-grad2-cazuri',
        'matematica:8:algebric:ecuatie-grad2-patrat'
      ],
      moved: true
    });
    expect(resolveLessonId('matematica', 7, 'geo7', 'romb', FIXTURE_MAP)).toBe('paralelograme-particulare');
    expect(resolveLessonId('matematica', 7, 'geo7', 'nou', FIXTURE_MAP)).toBeNull();
    expect(aliasesFor('matematica', 7, 'geo7', FIXTURE_MAP)).toEqual({
      romb: 'paralelograme-particulare',
      patrat: 'paralelograme-particulare'
    });
    expect(uniqueTargetId('matematica', 'pitagora', FIXTURE_MAP)).toBeNull();
    expect(uniqueTargetId('matematica', 'romb', FIXTURE_MAP)).toBe('paralelograme-particulare');
    expect(resolveLessonKey('matematica:5:naturale:a', {
      'matematica:5:naturale:a': 'matematica:5:naturale:b',
      'matematica:5:naturale:b': 'matematica:5:naturale:a'
    })).toBeNull();
    expect(cycleInMap(FIXTURE_MAP)).toBe(false);
  });

  it('pune lessonAliases pe capitole, inclusiv când harta e goală', async () => {
    const guide = getGuide('matematica', 8);
    guide.units.forEach(unit => expect(unit.lessonAliases).toEqual({}));
    expect(getEnGuide('romana').units[0].lessonAliases).toEqual({});
    const response = await request(app).get('/api/curriculum').query({ subject: 'matematica', class_level: 8 });
    expect(response.status).toBe(200);
    expect(response.body.units[0].lessonAliases).toEqual({});
  });

  it('mută progresul o singură dată și lasă capitolul și seria neatinse', () => {
    const user = {
      chapters: { 'matematica:7:geo7': { status: 'started', chapterId: 'geo7' } },
      metrics: { streak: 4 },
      streakDays: ['2026-09-01', '2026-09-02'],
      activityLog: [{ type: 'chapter_open', meta: { lesson: 'romb' } }],
      practiceSeen: {
        'matematica:7:geo7': { points: ['romb', 'patrat', 'altceva'], questionIds: ['q1'], day: '2026-09-01' }
      },
      practiceTests: {
        'matematica:8:algebric:2026-09-01': {
          score: 8,
          items: [{ lesson: 'ecuatie-grad2', lessonId: 'ecuatie-grad2', point: 'ecuatie-grad2', prompt: 'x^2' }]
        }
      },
      savedSessions: [{
        subject: 'matematica',
        grade: '7',
        chapterId: 'geo7',
        title: 'Geo',
        items: [{ lesson: 'romb', point: 'romb' }]
      }],
      skillPoints: {
        'matematica:romb': { ok: 2, fail: 1, label: 'romb', subject: 'matematica' },
        'matematica:paralelograme-particulare': { ok: 1, fail: 2, label: 'paralelograme-particulare', subject: 'matematica' },
        'matematica:pitagora': { ok: 3, fail: 0, label: 'pitagora', subject: 'matematica' }
      },
      skillLog: [{ subject: 'matematica', strengths: ['romb'], weaknesses: ['pitagora', 'pitagora'] }],
      mistakeBoxes: {
        card: { subject: 'matematica', grade: '7', chapterId: 'geo7', lessonId: 'romb', skill: 'romb', lesson: 'Rombul' }
      }
    };
    const chapters = JSON.stringify(user.chapters);
    const streak = user.metrics.streak;
    const days = user.streakDays.slice();
    const activity = JSON.stringify(user.activityLog);

    expect(migrateUserLessonIds(user, { map: FIXTURE_MAP, version: 2 })).toBe(true);
    expect(user.lessonMapVersion).toBe(2);
    expect(user.practiceSeen['matematica:7:geo7'].points).toEqual(['paralelograme-particulare', 'altceva']);
    expect(user.practiceTests['matematica:8:algebric:2026-09-01'].items[0]).toMatchObject({
      lesson: 'ecuatie-grad2-cazuri',
      lessonId: 'ecuatie-grad2-cazuri',
      point: 'ecuatie-grad2-cazuri'
    });
    expect(user.savedSessions[0].items[0].lesson).toBe('paralelograme-particulare');
    expect(user.skillPoints['matematica:paralelograme-particulare']).toMatchObject({ ok: 3, fail: 3 });
    expect(user.skillPoints['matematica:romb']).toBeUndefined();
    expect(user.skillPoints['matematica:pitagora'].ok).toBe(3);
    expect(user.skillLog[0].strengths).toEqual(['paralelograme-particulare']);
    expect(user.skillLog[0].weaknesses).toEqual(['pitagora']);
    expect(user.mistakeBoxes.card.lessonId).toBe('paralelograme-particulare');
    expect(user.mistakeBoxes.card.lesson).toBe('Rombul');
    expect(JSON.stringify(user.chapters)).toBe(chapters);
    expect(user.metrics.streak).toBe(streak);
    expect(user.streakDays).toEqual(days);
    expect(JSON.stringify(user.activityLog)).toBe(activity);

    const frozen = JSON.stringify(user);
    expect(migrateUserLessonIds(user, { map: FIXTURE_MAP, version: 2 })).toBe(false);
    expect(JSON.stringify(user)).toBe(frozen);

    const notes = [{ body: 'Vezi #lectie-romb și #lectie-pitagora.', meta: { subject: 'matematica', grade: '7', chapterId: 'geo7', lessonId: 'romb' } }];
    migrateNotificationList(notes, FIXTURE_MAP);
    expect(notes[0].body).toBe('Vezi #lectie-paralelograme-particulare și #lectie-pitagora.');
    expect(notes[0].meta.lessonId).toBe('paralelograme-particulare');
  });

  it('face copia de siguranță o singură dată și lasă scriptul de quiz să iasă curat', () => {
    const hadFile = existsSync(DATA_FILE);
    if (!hadFile) writeFileSync(DATA_FILE, '{"version":1,"collections":{}}\n');
    const dest = `${DATA_FILE}.pre-lectii-v9`;
    const first = lessonMapBackup(9);
    expect(first.saved).toBe(true);
    expect(readFileSync(dest, 'utf8')).toBe(readFileSync(DATA_FILE, 'utf8'));
    expect(lessonMapBackup(9).reason).toBe('exists');
    rmSync(dest);
    if (!hadFile) rmSync(DATA_FILE);

    const result = spawnSync(process.execPath, ['scripts/migrate-quiz-lessons.js'], {
      cwd: new URL('..', import.meta.url).pathname,
      encoding: 'utf8'
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/Quiz-ul era deja aliniat cu harta/);
  });
});
