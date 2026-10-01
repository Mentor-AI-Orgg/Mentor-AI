import { describe, it, expect } from 'vitest';
import { RESTRUCTURED, LENGTH_ALLOWLIST } from '../backend/src/data/lessons/restructured.js';
import {
  listLessonChapters,
  visibleWordCount,
  hiddenWordCount,
  lessonStructureIssues,
  lengthBandIssue,
  outsideTarget,
  wordLimits
} from '../backend/src/data/lessonWords.js';

function median(values) {
  if (!values.length) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[mid];
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

describe('lungimea lecțiilor', () => {
  const chapters = listLessonChapters();
  const byKey = new Map(chapters.map(chapter => [chapter.key, chapter]));
  const lessonsByFullKey = new Map();
  chapters.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      lessonsByFullKey.set(`${chapter.key}:${lesson.id}`, { chapter, lesson });
    });
  });

  it('ține lista RESTRUCTURED și allowlist-ul cu motiv', () => {
    expect(Array.isArray(RESTRUCTURED)).toBe(true);
    RESTRUCTURED.forEach(key => {
      expect(byKey.has(key), key).toBe(true);
    });
    Object.entries(LENGTH_ALLOWLIST).forEach(([key, reason]) => {
      expect(String(reason || '').trim(), key).not.toBe('');
      const found = lessonsByFullKey.get(key);
      expect(found, key).toBeTruthy();
      const band = lengthBandIssue(found.lesson, found.chapter.subject);
      expect(band, `${key} nu mai are nevoie de excepție`).not.toBe('');
    });
  });

  it('verifică strict doar capitolele din RESTRUCTURED și raportează restul', () => {
    const report = [];
    const targetWarnings = [];
    const failures = [];
    chapters.forEach(chapter => {
      const visible = chapter.lessons.map(visibleWordCount);
      const hidden = chapter.lessons.map(hiddenWordCount);
      report.push({
        capitol: chapter.key,
        lectii: chapter.lessons.length,
        vizMin: visible.length ? Math.min(...visible) : 0,
        vizMed: median(visible),
        vizMax: visible.length ? Math.max(...visible) : 0,
        ascunse: hidden.reduce((sum, value) => sum + value, 0)
      });
      if (!RESTRUCTURED.includes(chapter.key)) return;
      chapter.lessons.forEach(lesson => {
        const fullKey = `${chapter.key}:${lesson.id}`;
        let issues = lessonStructureIssues(lesson, chapter.subject);
        if (LENGTH_ALLOWLIST[fullKey]) {
          const band = lengthBandIssue(lesson, chapter.subject);
          issues = issues.filter(issue => issue !== band);
        }
        if (issues.length) failures.push(`${fullKey}: ${issues.join('; ')}`);
        if (outsideTarget(lesson, chapter.subject) && !lengthBandIssue(lesson, chapter.subject)) {
          const limits = wordLimits(chapter.subject);
          targetWarnings.push({
            lectie: fullKey,
            vizibile: visibleWordCount(lesson),
            tinta: `${limits.targetMin}–${limits.targetMax}`
          });
        }
      });
    });
    const pending = report.filter(row => !RESTRUCTURED.includes(row.capitol));
    if (pending.length) console.table(pending);
    if (targetWarnings.length) console.table(targetWarnings);
    expect(failures).toEqual([]);
  });
});
