'use strict';

// Umple băncile statice de grile și carduri din enunțurile lecțiilor.
// Nu se apelează la runtime. Răspunsul corect este cuvântul scos din enunț.

const fs = require('fs');
const path = require('path');
const { getGuide } = require('../backend/src/data/gimnaziuGuide');
const { BANK } = require('../backend/src/data/practiceBank');
const { listCards } = require('../backend/src/data/cardBank');
const { judgeAnswer } = require('../backend/src/grading/answerJudge');

const ROOT = path.join(__dirname, '..');
const QUIZ_MATH = path.join(ROOT, 'backend/src/data/quiz/matematica');
const QUIZ_RO = path.join(ROOT, 'backend/src/data/quiz/romana');
const CARD_MATH = path.join(ROOT, 'backend/src/data/cards/matematica');
const CARD_RO = path.join(ROOT, 'backend/src/data/cards/romana');

const STOP = new Set(`
a ai al ale acel acea acest aceasta aceste acestia asta astia au
ca care cea cel cele cei ceva ci cu cum
da dar de din doar dupa
e ea ei el era este eu
fi fie fost
ia iar ii il in
la le li lor lui
ma mai mi
ne ni nu
o ori
pe pentru prin
sa se si sau sunt
te tu
un una unor unei
va
cat cea cel
`.split(/\s+/).filter(Boolean));

const POOL = {
  matematica: ['cercuri', 'volume', 'procente', 'unghiuri', 'fractii', 'ecuatii', 'mediane', 'grafice', 'piramide', 'raze', 'diagonale', 'perimetre', 'catete', 'intervale', 'puteri', 'multipli', 'divizori', 'coordonate', 'baze', 'inaltimi'],
  romana: ['sinonime', 'predicat', 'narator', 'strofa', 'personaj', 'argument', 'metafora', 'dialog', 'virgula', 'subiect', 'rimă', 'epitete', 'compunere', 'naratiune', 'personaje', 'alineat', 'enunt', 'vocabular', 'autor', 'temă']
};

const STEMS = [
  (blank) => `Completează enunțul din lecție: «${blank}»`,
  (blank) => `Care cuvânt lipsește din enunț: «${blank}»`,
  (blank) => `Alege cuvântul care închide corect enunțul: «${blank}»`,
  (blank) => `În lecție, locul gol se umple așa: «${blank}»`,
  (blank) => `Ce cuvânt revine în enunțul: «${blank}»`
];

function fold(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/ş/g, 'ș')
    .replace(/ţ/g, 'ț')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function clean(text) {
  return String(text || '')
    .replace(/ş/g, 'ș')
    .replace(/ţ/g, 'ț')
    .replace(/\s+/g, ' ')
    .replace(/[«»]/g, '')
    .trim();
}

function badText(text) {
  return /[şţŞŢ]/.test(text) || /\\frac|\$|<\/?[a-z]+/i.test(text) || /(?:^|[^A-Za-zĂÂÎȘȚăâîșț])[A-Za-zĂÂÎȘȚăâîșț]\/[sl](?![A-Za-z])/u.test(text);
}

function clip(text, max) {
  const raw = clean(text);
  if (raw.length <= max) return raw;
  const cut = raw.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${(space > 40 ? cut.slice(0, space) : cut).trim()}…`;
}

function sentencesOf(lesson) {
  const chunks = [];
  (lesson.formulas || []).forEach(row => chunks.push(row));
  (lesson.keyPoints || []).forEach(row => chunks.push(row));
  String(lesson.recap || '').split(/(?<=[.!?])\s+/).forEach(row => chunks.push(row));
  String(lesson.theory || '').split(/(?<=[.!?])\s+/).slice(0, 8).forEach(row => chunks.push(row));
  const seen = new Set();
  const out = [];
  chunks.forEach(row => {
    const text = clean(row).replace(/^["']|["']$/g, '');
    if (text.length < 28 || text.length > 170) return;
    if (badText(text)) return;
    if (/_{2,}|…{2,}/.test(text)) return;
    const key = fold(text);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(text);
  });
  return out;
}

function wordsOf(sentence) {
  return sentence.match(/[A-Za-zĂÂÎȘȚăâîșț]+/g) || [];
}

function salient(sentence) {
  const words = wordsOf(sentence);
  const counts = new Map();
  words.forEach(word => {
    const key = fold(word);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return words.filter(word => {
    const key = fold(word);
    if (word.length < 5 || word.length > 18) return false;
    if (STOP.has(key)) return false;
    if (counts.get(key) !== 1) return false;
    if (/\d/.test(word)) return false;
    return true;
  });
}

function blankWord(sentence, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?<![A-Za-zĂÂÎȘȚăâîșț])${escaped}(?![A-Za-zĂÂÎȘȚăâîșț])`, 'u');
  if (!re.test(sentence)) return null;
  return sentence.replace(re, '______');
}

function rankedDistractors(subject, sentence, answer, bank) {
  const folded = fold(sentence);
  const answerKey = fold(answer);
  const pool = [...bank, ...(POOL[subject] || [])];
  const candidates = [];
  const seen = new Set();
  pool.forEach(word => {
    const key = fold(word);
    if (!key || key === answerKey || seen.has(key)) return;
    if (word.length < 5 || word.length > 18) return;
    if (folded.includes(key)) return;
    if (answerKey.includes(key) || key.includes(answerKey)) return;
    if (/\d/.test(word)) return;
    seen.add(key);
    candidates.push(word);
  });
  const seed = fold(answer);
  const ending = fold(answer).slice(-2);
  candidates.sort((a, b) => {
    const ea = fold(a).endsWith(ending) ? 0 : 1;
    const eb = fold(b).endsWith(ending) ? 0 : 1;
    if (ea !== eb) return ea - eb;
    const da = Math.abs(a.length - answer.length) - Math.abs(b.length - answer.length);
    if (da) return da;
    return fold(seed + a) < fold(seed + b) ? -1 : 1;
  });
  return candidates.length >= 3 ? candidates.slice(0, 3) : null;
}

function optionIsSafe(correct, wrong) {
  if (fold(correct) === fold(wrong)) return false;
  const hit = judgeAnswer({ given: wrong, answers: [correct] });
  return !hit.ok;
}

function quizItem(subject, lesson, sentence, word, index, bank) {
  const blank = blankWord(sentence, word);
  if (!blank || blank.split('______').length !== 2) return null;
  const extra = rankedDistractors(subject, sentence, word, bank);
  if (!extra) return null;
  if (!extra.every(option => optionIsSafe(word, option))) return null;
  if (!optionIsSafe(word, 'a') || (word !== '1' && !optionIsSafe(word, '1'))) return null;
  const options = [word, ...extra];
  if (new Set(options.map(option => fold(option))).size !== 4) return null;
  const question = STEMS[index % STEMS.length](blank);
  const explain = `Enunțul din lecție este: ${sentence}`;
  if (question.length <= 12 || explain.length <= 20) return null;
  if ([question, explain, ...options].some(badText)) return null;
  return {
    id: `lq-${subject === 'romana' ? 'r' : 'm'}${lesson.grade}-${lesson.chapter}-${lesson.id}-${index + 1}`,
    lesson: lesson.id,
    level: (index % 5) + 1,
    question,
    options,
    correct: 0,
    explain,
    point: lesson.id,
    secondary: true
  };
}

function buildQuiz(subject, lesson, have, bank) {
  if (have >= 5) return { items: [], status: 'deja' };
  const need = Math.min(6, 8 - have);
  const minimum = 5 - have;
  const items = [];
  const used = new Set();
  const sentences = sentencesOf(lesson);
  sentences.forEach(sentence => {
    if (items.length >= need) return;
    const words = salient(sentence).slice().sort((a, b) => {
      const pa = sentence.indexOf(a);
      const pb = sentence.indexOf(b);
      const mid = sentence.length / 2;
      return Math.abs(pa - mid) - Math.abs(pb - mid);
    });
    words.forEach(word => {
      if (items.length >= need) return;
      const key = `${fold(sentence)}|${fold(word)}`;
      if (used.has(key)) return;
      const item = quizItem(subject, lesson, sentence, word, items.length, bank);
      if (!item) return;
      if (item.id.includes(':') || item.id.startsWith('g:')) return;
      used.add(key);
      items.push(item);
    });
  });
  if (items.length < minimum) {
    return { items: [], status: 'sarita', reason: `doar ${have + items.length} grile posibile` };
  }
  return { items, status: 'nou' };
}

function cardFromClaim(lesson, type, front, back, why, index) {
  const row = {
    id: `lc-${lesson.subject === 'romana' ? 'r' : 'm'}${lesson.grade}-${lesson.chapter}-${lesson.id}-${index + 1}`,
    lesson: lesson.id,
    type,
    front: clip(front, 110),
    back: clip(back, 140),
    why: clip(why, 140).replace(/\n/g, ' ')
  };
  if (!row.front || !row.back || !row.why) return null;
  if (row.why.includes('\n')) return null;
  if ([row.front, row.back, row.why].some(badText)) return null;
  if (row.id.includes(':')) return null;
  return row;
}

function buildCards(lesson, existing) {
  if (existing.length >= 3 && existing.length <= 5) return { cards: [], status: 'deja' };
  if (existing.length > 5) return { cards: [], status: 'deja' };
  const claims = sentencesOf(lesson);
  if (claims.length < 2 && !lesson.mistakes) return { cards: [], status: 'sarita', reason: 'prea puțin text pentru carduri' };
  const want = Math.min(4, 5 - existing.length);
  const rows = [];
  const title = clean(lesson.title || lesson.id);
  if (claims[0]) {
    rows.push(cardFromClaim(lesson, 'termen', title, claims[0], 'Asta este ideea pe care o reții din lecție.', rows.length));
  }
  if (claims[1]) {
    rows.push(cardFromClaim(lesson, 'regula', `Ce regulă reții la ${clip(title, 70)}?`, claims[1], 'Regula stă în enunțul lecției, nu într-o formulă inventată.', rows.length));
  }
  if (claims[2] || claims[0]) {
    const claim = claims[2] || claims[0];
    const word = salient(claim)[0];
    if (word) {
      rows.push(cardFromClaim(
        lesson,
        'intrebare',
        clip(`Ce cuvânt lipsește: «${blankWord(claim, word) || claim}»`, 110),
        word,
        clip(claim, 140),
        rows.length
      ));
    }
  }
  const mistake = clean(String(lesson.mistakes || '').split(/(?<=[.!?])\s+/)[0] || '');
  if (mistake.length >= 12) {
    rows.push(cardFromClaim(lesson, 'capcana', 'Care greșeală trebuie evitată?', mistake, 'Capcana este scrisă în lecție, la greșeli frecvente.', rows.length));
  } else if (claims[0]) {
    const formula = (lesson.formulas || [])[0];
    rows.push(cardFromClaim(lesson, 'formula', 'Ce formulă sau enunț păstrezi?', clean(formula || claims[0]), clip(title, 140), rows.length));
  }
  const cards = rows.filter(Boolean).slice(0, want);
  const types = new Set([...existing.map(card => card.type), ...cards.map(card => card.type)]);
  if (existing.length + cards.length < 3 || types.size < 2) {
    return { cards: [], status: 'sarita', reason: 'cardurile nu ies scurte și diferite' };
  }
  return { cards, status: existing.length ? 'completata' : 'nou' };
}

function chapterLessons(subject, grade) {
  if (subject === 'matematica') {
    const { LESSONS } = require('../backend/src/data/gimnaziuLessons');
    return Object.entries(LESSONS)
      .filter(([key]) => key.startsWith(`matematica:${grade}:`))
      .map(([key, lessons]) => ({ chapter: key.split(':')[2], lessons }));
  }
  return getGuide('romana', grade).units.map(unit => ({ chapter: unit.id, lessons: unit.lessons || [] }));
}

function legacyQuizCount(subject, grade, chapter, lessonId) {
  const list = BANK[`${subject}:${grade}:${chapter}`] || [];
  return list.filter(item => item.lesson === lessonId && !String(item.id).startsWith('lq-')).length;
}

function wordBank(lessons) {
  const words = [];
  lessons.forEach(lesson => {
    sentencesOf(lesson).forEach(sentence => {
      salient(sentence).forEach(word => words.push(word));
    });
  });
  return words;
}

function jsString(value) {
  return JSON.stringify(value);
}

function quizSource(key, items, makerPath) {
  const body = items.map(item => `  flash({
    id: ${jsString(item.id)},
    lesson: ${jsString(item.lesson)},
    level: ${item.level},
    question: ${jsString(item.question)},
    options: ${jsString(item.options)},
    correct: ${item.correct},
    explain: ${jsString(item.explain)},
    point: ${jsString(item.point)},
    secondary: true
  })`).join(',\n');
  return `const { flash } = require(${jsString(makerPath)});\n\nmodule.exports = {\n  key: ${jsString(key)},\n  flashcards: [\n${body}\n  ],\n  tests: []\n};\n`;
}

function writeQuiz(subject, grade, chapter, items) {
  const dir = subject === 'matematica' ? QUIZ_MATH : QUIZ_RO;
  const prefix = `${subject === 'matematica' ? 'm' : 'r'}${grade}-${chapter}`;
  const key = `${subject}:${grade}:${chapter}`;
  const whole = quizSource(key, items, '../makers');
  const file = path.join(dir, `${prefix}.js`);
  if (Buffer.byteLength(whole) < 58 * 1024) {
    fs.writeFileSync(file, whole);
    return { file, bytes: Buffer.byteLength(whole) };
  }
  const parts = [];
  let bucket = [];
  items.forEach(item => {
    bucket.push(item);
    if (Buffer.byteLength(quizSource(key, bucket, '../makers')) > 50 * 1024) {
      const last = bucket.pop();
      parts.push(bucket);
      bucket = [last];
    }
  });
  if (bucket.length) parts.push(bucket);
  parts.forEach((part, index) => {
    fs.writeFileSync(path.join(dir, `${prefix}-p${index + 1}.js`), quizSource(key, part, '../makers'));
  });
  const requires = parts.map((_, index) => `require('./${prefix}-p${index + 1}')`).join(', ');
  const source = `const parts = [${requires}];\nmodule.exports = {\n  key: ${jsString(key)},\n  flashcards: parts.flatMap(part => part.flashcards),\n  tests: []\n};\n`;
  fs.writeFileSync(file, source);
  return { file, bytes: Buffer.byteLength(whole), parts: parts.length };
}

function writeCards(subject, grade, chapter, cards, keep) {
  const dir = subject === 'matematica' ? CARD_MATH : CARD_RO;
  const file = path.join(dir, `${subject === 'matematica' ? 'm' : 'r'}${grade}-${chapter}.js`);
  const all = [...keep, ...cards];
  const body = all.map(card => `    {
      id: ${jsString(card.id)},
      lesson: ${jsString(card.lesson)},
      type: ${jsString(card.type)},
      front: ${jsString(card.front)},
      back: ${jsString(card.back)},
      why: ${jsString(card.why)}${card.figure ? `,\n      figure: ${jsString(card.figure)}` : ''}
    }`).join(',\n');
  const source = `module.exports = {\n  key: ${jsString(`${subject}:${grade}:${chapter}`)},\n  cards: [\n${body}\n  ]\n};\n`;
  fs.writeFileSync(file, source);
  return file;
}

function run() {
  const report = [];
  const quizIndex = { matematica: [], romana: [] };
  const cardIndex = { matematica: [], romana: [] };
  for (const subject of ['matematica', 'romana']) {
    const grades = subject === 'matematica' ? [8, 7, 6, 5] : [8, 7, 6, 5];
    grades.forEach(grade => {
      chapterLessons(subject, grade).forEach(({ chapter, lessons }) => {
        const quizItems = [];
        const newCards = [];
        const kept = subject === 'matematica'
          ? listCards(subject, grade, chapter).filter(card => !String(card.id).startsWith('lc-'))
          : [];
        const bank = wordBank(lessons);
        lessons.forEach(lesson => {
          const text = `${lesson.theory || ''} ${lesson.recap || ''} ${(lesson.formulas || []).join(' ')} ${(lesson.keyPoints || []).join(' ')}`.trim();
          const rowLesson = { ...lesson, grade, chapter, subject };
          if (!lesson.id || !lesson.title || text.length < 80) {
            report.push({ subject, grade, chapter, lesson: lesson.id || '?', title: lesson.title || '', quiz: 0, cards: 0, status: 'sarita', reason: 'lecție goală sau prea scurtă' });
            return;
          }
          const haveQuiz = legacyQuizCount(subject, grade, chapter, lesson.id);
          const built = buildQuiz(subject, rowLesson, haveQuiz, bank);
          const haveCards = kept.filter(card => card.lesson === lesson.id);
          const builtCards = buildCards(rowLesson, haveCards);
          if (built.status === 'sarita' || builtCards.status === 'sarita') {
            report.push({
              subject, grade, chapter, lesson: lesson.id, title: lesson.title,
              quiz: haveQuiz, cards: haveCards.length,
              status: 'sarita',
              reason: [built.reason, builtCards.reason].filter(Boolean).join('; ') || 'nu s-au putut face 5 grile și 3 carduri'
            });
            return;
          }
          quizItems.push(...built.items);
          newCards.push(...builtCards.cards);
          const quizCount = haveQuiz + built.items.length;
          const cardCount = haveCards.length + builtCards.cards.length;
          const status = built.status === 'deja' && (builtCards.status === 'deja' || builtCards.cards.length === 0) && cardCount >= 3
            ? 'deja'
            : 'acoperita';
          report.push({ subject, grade, chapter, lesson: lesson.id, title: lesson.title, quiz: quizCount, cards: cardCount, status });
        });
        const written = writeQuiz(subject, grade, chapter, quizItems);
        quizIndex[subject].push({ grade, chapter, file: path.basename(written.file), bytes: written.bytes, parts: written.parts || 1 });
        writeCards(subject, grade, chapter, newCards, kept);
        cardIndex[subject].push({ grade, chapter });
      });
    });
  }
  function writeIndex(dir, rows, kind) {
    const lines = rows.map(row => {
      const name = row.file.replace(/\.js$/, '');
      return `const ${name.replace(/-/g, '_')} = require('./${name}');`;
    });
    const idents = rows.map(row => row.file.replace(/\.js$/, '').replace(/-/g, '_'));
    const body = kind === 'cards'
      ? `const CHAPTERS = [\n  ${idents.join(',\n  ')}\n];\n\nconst BY_KEY = Object.fromEntries(CHAPTERS.map(chapter => [chapter.key, {\n  cards: chapter.cards || []\n}]));\n\nmodule.exports = { BY_KEY, CHAPTERS };\n`
      : `const CHAPTERS = [\n  ${idents.join(',\n  ')}\n];\n\nconst BY_KEY = Object.fromEntries(CHAPTERS.map(chapter => [chapter.key, {\n  flashcards: chapter.flashcards || [],\n  tests: chapter.tests || []\n}]));\n\nfunction flashcardsFor(key) {\n  return (BY_KEY[key] && BY_KEY[key].flashcards) || [];\n}\n\nmodule.exports = { BY_KEY, CHAPTERS, flashcardsFor };\n`;
    fs.writeFileSync(path.join(dir, 'index.js'), `${lines.join('\n')}\n\n${body}`);
  }
  writeIndex(QUIZ_RO, quizIndex.romana.map(row => ({ file: `r${row.grade}-${row.chapter}.js` })), 'quiz');
  writeIndex(CARD_RO, cardIndex.romana.map(row => ({ file: `r${row.grade}-${row.chapter}.js` })), 'cards');
  const out = path.join(ROOT, 'backend/src/data/quiz/acoperire.json');
  fs.writeFileSync(out, JSON.stringify({ report, quizIndex, cardIndex }, null, 2));
  const covered = report.filter(row => row.status === 'acoperita' || row.status === 'deja').length;
  const skipped = report.filter(row => row.status === 'sarita');
  console.log(JSON.stringify({ covered, skipped: skipped.length, total: report.length, big: quizIndex.matematica.filter(row => row.bytes > 60000).concat(quizIndex.romana.filter(row => row.bytes > 60000)) }, null, 2));
  skipped.slice(0, 30).forEach(row => console.log('SKIP', row.subject, row.grade, row.chapter, row.lesson, row.reason));
}

run();
