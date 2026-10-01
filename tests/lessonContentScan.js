import { createRequire } from 'node:module';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANSWER_KEY_PATTERNS } from './fixtures/answerKeyPatterns.js';
import { PROTECTED_SOURCES, PUBLIC_DOMAIN_AUTHORS } from './fixtures/protectedSources.js';
import { CONTENT_GUARD_ALLOWLIST } from './fixtures/contentGuardAllowlist.js';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export const TEXT_FIELDS = [
  'theory',
  'example',
  'tryThis',
  'recap',
  'boxes',
  'extraExamples',
  'practice',
  'answers',
  'mistakes',
  'keyPoints',
  'more'
];

const QUOTE_RES = [
  /„([^”]{8,}?)”/g,
  /«([^»]{8,}?)»/g,
  /“([^”]{8,}?)”/g,
  /"([^"\n]{8,}?)"/g
];

export function wordCount(normalizeRo, text) {
  const norm = normalizeRo(text);
  if (!norm) return 0;
  return norm.split(' ').filter(Boolean).length;
}

export function matchPatterns(normalized) {
  const hits = [];
  ANSWER_KEY_PATTERNS.forEach(pattern => {
    const found = String(normalized || '').match(pattern.re);
    if (found) hits.push({ patternId: pattern.id, reason: pattern.reason, phrase: found[0] });
  });
  return hits;
}

function mentions(normalized, sources) {
  return sources.filter(source => source.needles.some(needle => normalized.includes(needle)));
}

export function detectAuthors(normalizeRo, text) {
  const normalized = normalizeRo(text);
  return {
    protected: mentions(normalized, PROTECTED_SOURCES),
    publicDomain: mentions(normalized, PUBLIC_DOMAIN_AUTHORS)
  };
}

function extractQuotes(raw) {
  const quotes = [];
  QUOTE_RES.forEach(re => {
    const copy = new RegExp(re.source, 'g');
    let match = copy.exec(raw);
    while (match) {
      quotes.push(match[1]);
      match = copy.exec(raw);
    }
  });
  return quotes;
}

function verseBlocks(normalizeRo, raw) {
  const lines = String(raw || '').split(/\n/);
  const blocks = [];
  let buf = [];
  const flush = () => {
    if (buf.length >= 4 && wordCount(normalizeRo, buf.join(' ')) > 25) blocks.push(buf.join(' '));
    buf = [];
  };
  lines.forEach(line => {
    const count = wordCount(normalizeRo, line);
    if (count >= 2 && count <= 14 && line.trim().length < 90) buf.push(line.trim());
    else flush();
  });
  flush();
  return blocks;
}

function clip(text) {
  const flat = String(text || '').replace(/\s+/g, ' ').trim();
  return flat.length > 140 ? `${flat.slice(0, 137)}...` : flat;
}

export function scanField(normalizeRo, raw, lessonBlob) {
  const findings = [];
  matchPatterns(normalizeRo(raw)).forEach(hit => {
    findings.push({ ...hit, phrase: clip(hit.phrase) });
  });
  const authors = detectAuthors(normalizeRo, lessonBlob);
  const skipQuotes = authors.publicDomain.length > 0 && authors.protected.length === 0;
  if (skipQuotes) return findings;
  extractQuotes(raw).forEach(quote => {
    const count = wordCount(normalizeRo, quote);
    if (count > 25) {
      findings.push({
        patternId: 'citat-lung',
        reason: 'citat mai lung de 25 de cuvinte',
        phrase: clip(quote)
      });
    }
    if (count > 12 && authors.protected.length) {
      const names = authors.protected.map(source => source.name).join(', ');
      findings.push({
        patternId: 'citat-protejat',
        reason: `citat de peste 12 cuvinte lângă ${names}`,
        phrase: clip(quote)
      });
    }
  });
  verseBlocks(normalizeRo, raw).forEach(block => {
    findings.push({
      patternId: 'versuri',
      reason: 'bloc de versuri mai lung de 25 de cuvinte',
      phrase: clip(block)
    });
  });
  return findings;
}

function walk(value, path, visit) {
  if (typeof value === 'string') {
    if (value.trim()) visit(path, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => walk(child, `${path}.${key}`, visit));
  }
}

export function eachText(lesson, visit) {
  TEXT_FIELDS.forEach(field => {
    if (lesson && lesson[field] != null) walk(lesson[field], field, visit);
  });
}

function lessonBlob(lesson) {
  const parts = [];
  eachText(lesson, (_path, text) => parts.push(text));
  return parts.join('\n');
}

function pushLesson(out, seen, entry) {
  const key = `${entry.subject}:${entry.grade}:${entry.unitId}:${entry.lessonId}`;
  if (seen.has(key)) return;
  seen.add(key);
  out.push(entry);
}

export function collectLessons() {
  const { getGuide, SUBJECT_IDS, GRADES } = require('../backend/src/data/gimnaziuGuide.js');
  const { LESSONS } = require('../backend/src/data/gimnaziuLessons.js');
  const out = [];
  const seen = new Set();
  const covered = new Set();
  SUBJECT_IDS.forEach(subject => {
    GRADES.forEach(grade => {
      const guide = getGuide(subject, grade);
      (guide.units || []).forEach(unit => {
        covered.add(`${subject}:${grade}:${unit.id}`);
        (unit.lessons || []).forEach(lesson => {
          pushLesson(out, seen, {
            subject,
            grade,
            unitId: unit.id,
            unitTitle: unit.title || unit.id,
            lessonId: lesson.id || unit.id,
            lessonTitle: lesson.title || lesson.id || unit.id,
            lesson
          });
        });
      });
    });
  });
  Object.entries(LESSONS).forEach(([chapterKey, lessons]) => {
    if (covered.has(chapterKey)) return;
    const [subject, grade, unitId] = chapterKey.split(':');
    (lessons || []).forEach(lesson => {
      pushLesson(out, seen, {
        subject,
        grade: Number(grade),
        unitId,
        unitTitle: unitId,
        lessonId: lesson.id || unitId,
        lessonTitle: lesson.title || lesson.id || unitId,
        lesson
      });
    });
  });
  const extraDir = join(ROOT, 'backend/src/data/romana-lectii');
  if (existsSync(extraDir)) {
    readdirSync(extraDir).filter(name => name.endsWith('.js')).forEach(name => {
      const mod = require(join(extraDir, name));
      const units = Array.isArray(mod && mod.units) ? mod.units : [];
      units.forEach(unit => {
        (unit.lessons || []).forEach(lesson => {
          pushLesson(out, seen, {
            subject: 'romana',
            grade: mod.grade || 0,
            unitId: unit.id || name,
            unitTitle: unit.title || unit.id || name,
            lessonId: lesson.id || unit.id || name,
            lessonTitle: lesson.title || lesson.id || name,
            lesson
          });
        });
      });
    });
  }
  return out;
}

export function scanLessons(normalizeRo, lessons) {
  const findings = [];
  lessons.forEach(entry => {
    const blob = lessonBlob(entry.lesson);
    eachText(entry.lesson, (field, text) => {
      scanField(normalizeRo, text, blob).forEach(hit => {
        findings.push({
          ...entry,
          lesson: undefined,
          field,
          patternId: hit.patternId,
          reason: hit.reason,
          phrase: hit.phrase
        });
      });
    });
  });
  return findings.map(finding => ({ ...finding, allowed: isAllowed(finding) }));
}

export function isAllowed(finding) {
  return CONTENT_GUARD_ALLOWLIST.some(entry => {
    if (!entry || !entry.reason) return false;
    if (entry.lessonId && entry.lessonId !== finding.lessonId) return false;
    const field = String(finding.field || '');
    const nested = field.startsWith(`${entry.field}.`) || field.startsWith(`${entry.field}[`);
    if (entry.field && field !== entry.field && !nested) return false;
    if (entry.patternId && entry.patternId !== finding.patternId) return false;
    return true;
  });
}

export function loadRestructured() {
  const candidates = [
    '../backend/src/data/lessons/restructured.js',
    '../backend/src/data/restructuredLessons.js'
  ];
  for (const candidate of candidates) {
    try {
      const mod = require(candidate);
      const list = mod && (mod.RESTRUCTURED || mod.restructured);
      if (Array.isArray(list)) return list;
    } catch (err) {
      if (err && err.code === 'MODULE_NOT_FOUND') continue;
      throw err;
    }
  }
  return null;
}

function sameUnit(finding, entry) {
  if (typeof entry === 'string') {
    return entry === finding.unitId || entry === finding.lessonId || entry === `${finding.subject}:${finding.grade}:${finding.unitId}`;
  }
  if (!entry || typeof entry !== 'object') return false;
  if (entry.unitId && entry.unitId !== finding.unitId) return false;
  if (entry.lessonId && entry.lessonId !== finding.lessonId) return false;
  if (entry.subject && entry.subject !== finding.subject) return false;
  if (entry.grade != null && Number(entry.grade) !== Number(finding.grade)) return false;
  return Boolean(entry.unitId || entry.lessonId);
}

export function blockingFindings(findings, restructured) {
  if (!Array.isArray(restructured)) return [];
  return findings.filter(finding => !finding.allowed && restructured.some(entry => sameUnit(finding, entry)));
}

function cell(value) {
  return String(value || '').replace(/\|/g, '/').replace(/\n/g, ' ');
}

export function renderReport({ findings, restructured, lessonCount }) {
  const open = findings.filter(finding => !finding.allowed);
  const allowed = findings.filter(finding => finding.allowed);
  const lines = [
    '# Raport: conținutul lecțiilor',
    '',
    'Generat de `tests/lessonContentGuard.test.js`. Doar raport.',
    'Testul pică numai pentru unitățile din lista `RESTRUCTURED` (`backend/src/data/restructuredLessons.js`), când promptul de lecții a rescris deja unitatea și semnalarea a rămas.',
    'Rescrierea se face cu `prompt-cursor-lectii.md`, unitate cu unitate. Aici nu se modifică lecțiile.',
    '',
    restructured
      ? `Lista RESTRUCTURED: ${restructured.length} intrări.`
      : 'Lista RESTRUCTURED: nu există încă, deci testul nu pică.',
    '',
    `Lecții citite: ${lessonCount}. Semnalări: ${open.length}. Excepții: ${allowed.length}.`,
    ''
  ];
  if (!open.length) {
    lines.push('Nicio semnalare deschisă.', '');
  } else {
    lines.push('## Semnalări', '');
    lines.push('| Lecție | Câmp | Motiv | Frază |');
    lines.push('| --- | --- | --- | --- |');
    open.forEach(finding => {
      const lesson = `${finding.subject} ${finding.grade} / ${finding.unitId} / ${finding.lessonId}`;
      lines.push(`| ${cell(lesson)} | ${cell(finding.field)} | ${cell(finding.reason)} | ${cell(finding.phrase)} |`);
    });
    lines.push('');
  }
  if (allowed.length) {
    lines.push('## Excepții acceptate', '');
    allowed.forEach(finding => {
      lines.push(`- ${finding.subject} ${finding.grade} / ${finding.lessonId} / ${finding.field}: ${finding.reason} — ${finding.phrase}`);
    });
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}
