// Numărătoarea din Etapa 0C. `**` se scot, apoi rămân tokenii care au o literă sau o cifră.
// Vizibile: boxes, formulas (când există), theory, example, practice, mistakes, tryThis,
// keyPoints sau recap. Ascunse: extraExamples, answers, more.

const KINDS = ['limba', 'lectura', 'comunicare', 'redactare', 'recapitulare'];

function countWords(text) {
  const plain = String(text || '').replace(/\*\*/g, '');
  return (plain.match(/\S+/g) || []).filter(word => /[\p{L}\p{N}]/u.test(word)).length;
}

function textsOf(items) {
  return (items || []).flatMap(item => {
    if (typeof item === 'string') return [item];
    if (!item || typeof item !== 'object') return [];
    return [item.title, item.text];
  });
}

function visibleParts(entry) {
  const parts = [];
  parts.push(...textsOf(entry.boxes));
  if (Array.isArray(entry.formulas) && entry.formulas.length) parts.push(entry.formulas.join('\n'));
  parts.push(entry.theory, entry.example, entry.practice, entry.mistakes, entry.tryThis);
  if (Array.isArray(entry.keyPoints) && entry.keyPoints.length) parts.push(entry.keyPoints.join(' '));
  else parts.push(entry.recap);
  return parts.filter(part => part);
}

function hiddenParts(entry) {
  return [
    ...textsOf(entry.extraExamples),
    ...(Array.isArray(entry.answers) ? entry.answers : []),
    ...textsOf(entry.more)
  ].filter(part => part);
}

function visibleWordCount(entry) {
  return countWords(visibleParts(entry).join('\n'));
}

function hiddenWordCount(entry) {
  return countWords(hiddenParts(entry).join('\n'));
}

function wordLimits(subject) {
  if (subject === 'matematica') return { min: 250, max: 600, targetMin: 300, targetMax: 450 };
  return { min: 280, max: 600, targetMin: 350, targetMax: 550 };
}

function numberedItems(practice) {
  const text = String(practice || '');
  const lines = text.split('\n').map(line => line.trim()).filter(line => /^\d+[).]/.test(line));
  if (lines.length) return lines;
  return text.split(/(?=\d+[).])/).map(part => part.trim()).filter(part => /^\d+[).]/.test(part));
}

function normalizeSentence(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function theorySentences(theory) {
  return String(theory || '')
    .split(/[.!?]+/)
    .map(normalizeSentence)
    .filter(Boolean);
}

function visibleParagraphs(entry) {
  const chunks = [];
  const pushBlock = text => {
    String(text || '').split(/\n\n+/).forEach(part => {
      const trimmed = part.trim();
      if (trimmed) chunks.push(trimmed);
    });
  };
  (entry.boxes || []).forEach(box => {
    if (box && typeof box === 'object') {
      pushBlock(box.title);
      pushBlock(box.text);
    }
  });
  if (Array.isArray(entry.formulas)) entry.formulas.forEach(pushBlock);
  pushBlock(entry.theory);
  pushBlock(entry.example);
  pushBlock(entry.practice);
  pushBlock(entry.mistakes);
  pushBlock(entry.tryThis);
  if (Array.isArray(entry.keyPoints) && entry.keyPoints.length) entry.keyPoints.forEach(pushBlock);
  else pushBlock(entry.recap);
  return chunks;
}

function boldMarkers(entry) {
  const texts = [];
  const walk = value => {
    if (typeof value === 'string') texts.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') Object.values(value).forEach(walk);
  };
  walk(entry);
  return (texts.join('\n').match(/\*\*/g) || []).length;
}

function lengthBandIssue(entry, subject) {
  const limits = wordLimits(subject);
  const visible = visibleWordCount(entry);
  if (visible < limits.min || visible > limits.max) {
    return `cuvinte vizibile ${visible}, în afara intervalului ${limits.min}–${limits.max}`;
  }
  return '';
}

function lessonStructureIssues(entry, subject) {
  const issues = [];
  const hidden = hiddenWordCount(entry);
  const total = visibleWordCount(entry) + hidden;
  if (hidden > 400) issues.push(`cuvinte ascunse ${hidden}, peste 400`);
  if (total > 1000) issues.push(`total ${total}, peste 1000`);
  const band = lengthBandIssue(entry, subject);
  if (band) issues.push(band);

  if (subject === 'matematica') {
    if (!String(entry.example || '').trim()) issues.push('lipsește example');
    if (!Array.isArray(entry.extraExamples) || entry.extraExamples.length < 1) {
      issues.push('lipsește extraExamples');
    }
    const items = numberedItems(entry.practice);
    if (items.length !== 3) issues.push(`practice are ${items.length} itemi, nu 3`);
    if (!Array.isArray(entry.answers) || entry.answers.length !== items.length) {
      issues.push('answers nu are aceeași lungime cu practice');
    }
    if (!String(entry.mistakes || '').trim()) issues.push('lipsește mistakes');
  }

  if (subject === 'romana') {
    if (!KINDS.includes(entry.kind)) issues.push('kind lipsește sau nu e din listă');
    if (entry.kind === 'limba') {
      if (!String(entry.mistakes || '').trim()) issues.push('limba fără mistakes');
      const items = numberedItems(entry.practice);
      if (items.length < 3 || items.length > 5) issues.push(`limba are ${items.length} itemi, nu 3–5`);
      if (!Array.isArray(entry.answers) || entry.answers.length !== items.length) {
        issues.push('answers nu are aceeași lungime cu practice');
      }
    }
  }

  const points = Array.isArray(entry.keyPoints) ? entry.keyPoints : [];
  if (points.length < 2 || points.length > 3) issues.push(`keyPoints are ${points.length}, nu 2–3`);
  const sentences = new Set(theorySentences(entry.theory));
  points.forEach(point => {
    const normalized = normalizeSentence(point);
    if (normalized && sentences.has(normalized)) issues.push('keyPoint copiat din theory');
  });

  visibleParagraphs(entry).forEach(paragraph => {
    if (paragraph.length > 380) issues.push(`paragraf de ${paragraph.length} caractere`);
  });

  const markers = boldMarkers(entry);
  if (markers % 2 !== 0) issues.push('** fără pereche');
  else if (markers / 2 > 6) issues.push(`${markers / 2} perechi de **, peste 6`);

  return issues;
}

function outsideTarget(entry, subject) {
  const limits = wordLimits(subject);
  const visible = visibleWordCount(entry);
  return visible < limits.targetMin || visible > limits.targetMax;
}

function listLessonChapters() {
  const { LESSONS } = require('./gimnaziuLessons');
  const chapters = Object.entries(LESSONS).map(([key, lessons]) => ({
    key,
    subject: 'matematica',
    lessons
  }));
  for (const grade of [5, 6, 7, 8]) {
    const mod = require(`./romana${grade}Litera`);
    mod.UNITS.forEach(unit => {
      chapters.push({
        key: `romana:${grade}:${unit.id}`,
        subject: 'romana',
        grade,
        toc: unit.toc,
        lessons: unit.lessons
      });
    });
  }
  return chapters;
}

module.exports = {
  countWords,
  visibleWordCount,
  hiddenWordCount,
  wordLimits,
  numberedItems,
  lessonStructureIssues,
  lengthBandIssue,
  outsideTarget,
  listLessonChapters
};
