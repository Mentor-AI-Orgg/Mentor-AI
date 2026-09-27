import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  blockingFindings,
  collectLessons,
  loadRestructured,
  matchPatterns,
  renderReport,
  scanField,
  scanLessons
} from './lessonContentScan.js';

const require = createRequire(import.meta.url);
const { normalizeRo } = require('../backend/src/grading/answerJudge.js');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = join(root, 'reports', 'lesson-content-guard.md');

function words(count, token) {
  return Array.from({ length: count }, () => token).join(' ');
}

describe('lesson content guard', () => {
  it('prinde cheile de răspunsuri și lasă explicația despre variabilă', () => {
    const ids = text => matchPatterns(normalizeRo(text)).map(hit => hit.patternId);
    expect(ids('Litera este c.')).toContain('litera-este');
    expect(ids('Litera este o variabilă.')).not.toContain('litera-este');
    expect(ids('Varianta corectă este b.')).toContain('varianta-corecta');
    expect(ids('Nu cerem citatele de pe pagină.')).toEqual(
      expect.arrayContaining(['nu-cerem-citat', 'pe-pagina'])
    );
    expect(ids('Nu cerem versul din poezie.')).toContain('nu-cerem-versul');
    expect(ids('Răspunsul corect la exercițiul 4 este altul.')).toContain('raspunsul-corect-exercitiu');
    expect(ids('Vezi exercițiul 3 de la capitol, pe pagina 12.')).toEqual(
      expect.arrayContaining(['exercitiul-de-la', 'pe-pagina-numar'])
    );
    expect(ids('Scrie din manual dacă pagina cere anul.')).toEqual(
      expect.arrayContaining(['din-manual', 'pagina-cere'])
    );
    expect(ids('În manual stă textul.')).toContain('in-manual');
    expect(ids('Manualul cere o parafrază.')).toContain('manualul-cere');
  });

  it('semnalează citatul lung și citatul protejat, nu citatul din Eminescu', () => {
    const long = `„${words(26, 'cuvant')}”`;
    expect(scanField(normalizeRo, long, long).some(hit => hit.patternId === 'citat-lung')).toBe(true);

    const eminescu = `Eminescu a scris „${words(26, 'vers')}”`;
    const pd = scanField(normalizeRo, eminescu, eminescu);
    expect(pd.some(hit => hit.patternId === 'citat-lung')).toBe(false);
    expect(pd.some(hit => hit.patternId === 'citat-protejat')).toBe(false);

    const sadoveanu = `Sadoveanu a scris „${words(13, 'cuvant')}”`;
    expect(scanField(normalizeRo, sadoveanu, sadoveanu).some(hit => hit.patternId === 'citat-protejat')).toBe(true);

    const keyBesideEminescu = 'Eminescu. Litera este c.';
    expect(scanField(normalizeRo, keyBesideEminescu, keyBesideEminescu).map(hit => hit.patternId)).toContain('litera-este');
  });

  it('pică doar când o unitate rescrisă încă are o semnalare', () => {
    const open = { lessonId: 'baltagul', unitId: 'familia', subject: 'romana', grade: 8, allowed: false };
    expect(blockingFindings([open], null)).toEqual([]);
    expect(blockingFindings([open], [])).toEqual([]);
    expect(blockingFindings([open], ['familia'])).toHaveLength(1);
    expect(blockingFindings([open], ['alta'])).toEqual([]);
    expect(blockingFindings([{ ...open, allowed: true }], ['familia'])).toEqual([]);
    expect(blockingFindings([open], [{ subject: 'romana', grade: 8, unitId: 'familia' }])).toHaveLength(1);
  });

  it('scrie raportul și nu pică cât timp lista RESTRUCTURED lipsește', () => {
    const lessons = collectLessons();
    const findings = scanLessons(normalizeRo, lessons);
    const restructured = loadRestructured();
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, renderReport({
      findings,
      restructured,
      lessonCount: lessons.length
    }));
    const report = readFileSync(reportPath, 'utf8');
    expect(lessons.length).toBeGreaterThan(20);
    expect(report).toContain('Semnalări:');
    expect(report).toContain('Lecții citite:');
    const blocking = blockingFindings(findings, restructured);
    if (Array.isArray(restructured)) {
      expect(blocking).toEqual([]);
    } else {
      expect(restructured).toBeNull();
    }
  });

  it('scriptul de comparare cu manualele stă în scripts și nu intră în npm test', () => {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    expect(pkg.scripts.test).not.toContain('check-lesson-copy');
    const src = readFileSync(join(root, 'scripts/check-lesson-copy.mjs'), 'utf8');
    expect(src).toContain('--surse');
    expect(src).toContain('normalizeRo');
    const ignore = readFileSync(join(root, '.gitignore'), 'utf8');
    expect(ignore).toContain('reports/');
  });
});
