// Răspunsul mentorului vine numai din lecțiile deja scrise în aplicație.
// Nu se apelează niciun serviciu extern și nu se inventează o regulă care nu e în lecție.
//
// Copilul întreabă în propoziție („prezintă-mi ce este un diftong”), nu doar cu
// cuvântul din titlu. Potrivirea se face pe cuvântul de temă: vorbele de cerere
// nu ridică pragul și nu mută lecția. O formă cu articol, fără diacritice sau cu
// o greșeală mică rămâne același termen.

const { getGuide, normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");

const STOP = new Set([
  "ce", "este", "sunt", "un", "una", "unei", "unui", "la", "de", "si", "in", "pe", "cu", "din",
  "care", "cum", "pentru", "sau", "dar", "nu", "mai", "doar", "acest", "aceasta", "acesta",
  "te", "ma", "imi", "ai", "am", "sa", "fie", "lui", "ei", "el", "ea", "tu", "eu", "noi", "voi",
  "despre", "cand", "unde", "prin", "spre", "fara", "tot", "toate", "ale", "al", "ca", "daca",
  "the", "what", "is", "an", "how", "why", "and", "ori", "azi", "acum", "vreau",
  "poti", "pot", "putem", "puteti", "spune", "spui", "spunem", "spuneti",
  "explica", "explici", "explicam", "explicati", "ajuta", "ajuti", "ajutam", "ajutati",
  "tema", "problema",
  "prezinta", "prezinti", "prezint", "prezentam", "prezentati",
  "arata", "arati", "aratam", "aratati",
  "inteleg", "intelegi", "intelegem", "intelegeti", "inteleaga",
  "stiu", "stiti", "stim", "inseamna", "insemna",
  "lamureste", "lamuresti", "lamuriti", "defineste", "definesti", "multumesc",
  "intrebat", "intrebati", "ceva", "asta", "adica", "frumos"
]);

const preparedCache = new Map();

function fold(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text) {
  return fold(text).split(" ").filter(word => word.length >= 4 && !STOP.has(word));
}

function stripMarkers(text) {
  return String(text || "").replace(/\*\*([^*]+)\*\*/g, "$1");
}

function lessonRecap(lesson) {
  if (Array.isArray(lesson.keyPoints) && lesson.keyPoints.length) return lesson.keyPoints.join(" ");
  return lesson.recap || "";
}

function unique(list) {
  const seen = new Set();
  const out = [];
  list.forEach(word => {
    if (!word || seen.has(word)) return;
    seen.add(word);
    out.push(word);
  });
  return out;
}

function boxText(lesson) {
  return (lesson.boxes || []).map(box => box && box.text).filter(Boolean).join(" ");
}

function sentencesOf(lesson) {
  return [boxText(lesson), lesson.theory, lesson.example, lessonRecap(lesson)]
    .map(stripMarkers)
    .filter(Boolean)
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .map(part => part.trim())
    .filter(part => part.length > 40);
}

function indexLesson(lesson) {
  const glossary = (lesson.glossary || []).map(entry => (entry && entry.term) || "").join(" ");
  const titleWords = unique(tokens(`${lesson.title || ""} ${glossary}`));
  const bodyWords = unique(tokens(stripMarkers([
    lesson.theory,
    lesson.example,
    lessonRecap(lesson),
    boxText(lesson)
  ].filter(Boolean).join(" "))));
  return {
    titleWords,
    titleSet: new Set(titleWords),
    bodyWords,
    bodySet: new Set(bodyWords)
  };
}

function prepare(sid, level) {
  const key = `${sid}:${level}`;
  const cached = preparedCache.get(key);
  if (cached) return cached;
  const guide = getGuide(sid, level);
  const rows = [];
  (guide.units || []).forEach(unit => {
    (unit.lessons || []).forEach(lesson => {
      rows.push({ lesson, unit, ...indexLesson(lesson) });
    });
  });
  const hints = rows.slice(0, 3).map(row => row.lesson.title).filter(Boolean);
  const prepared = { rows, hints };
  preparedCache.set(key, prepared);
  return prepared;
}

// „diftong” / „diftongi” / „diftongul”, „procent” / „procente”: același radical,
// cu terminații scurte. Radicalul comun are cel puțin 6 litere.
function inflected(left, right) {
  if (!left || !right || left === right) return false;
  let index = 0;
  const limit = Math.min(left.length, right.length);
  while (index < limit && left[index] === right[index]) index += 1;
  if (index < 6) return false;
  if (left.length - index > 4 || right.length - index > 4) return false;
  return true;
}

const ENDINGS = ["urilor", "ului", "elor", "ilor", "ile", "uri", "lor", "ul", "ii", "le", "ei", "ea", "a", "e", "i", "u"];

function stemOf(word) {
  if (!word || word.length < 7) return word;
  for (let index = 0; index < ENDINGS.length; index += 1) {
    const ending = ENDINGS[index];
    if (!word.endsWith(ending)) continue;
    const stem = word.slice(0, word.length - ending.length);
    if (stem.length >= 6) return stem;
  }
  return word;
}

function sameFamily(word, lessonWord) {
  if (smallTypo(word, lessonWord)) return true;
  const stem = stemOf(lessonWord);
  if (!stem || stem === lessonWord) return false;
  if (word !== stem && !smallTypo(word, stem)) return false;
  const prefix = Math.min(4, stem.length);
  return word.slice(0, prefix) === stem.slice(0, prefix);
}

function editAtMost1(left, right) {
  if (left === right) return 0;
  if (Math.abs(left.length - right.length) > 1) return 2;
  if (left.length > right.length) return editAtMost1(right, left);
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return 2;
    if (left.length === right.length) {
      i += 1;
      j += 1;
    } else {
      j += 1;
    }
  }
  if (i < left.length || j < right.length) edits += 1;
  return edits > 1 ? 2 : edits;
}

function adjacentSwap(left, right) {
  if (left.length !== right.length || left.length < 6) return false;
  let index = 0;
  while (index < left.length && left[index] === right[index]) index += 1;
  if (index >= left.length - 1) return false;
  if (left[index] !== right[index + 1] || left[index + 1] !== right[index]) return false;
  for (let cursor = index + 2; cursor < left.length; cursor += 1) {
    if (left[cursor] !== right[cursor]) return false;
  }
  return true;
}

function smallTypo(left, right) {
  if (!left || !right || left === right) return false;
  const minLen = Math.min(left.length, right.length);
  if (minLen < 5) return false;
  if (Math.abs(left.length - right.length) > 1) return false;
  if (minLen >= 6 && adjacentSwap(left, right)) return true;
  return editAtMost1(left, right) === 1;
}

function hit(word, row) {
  if (row.titleSet.has(word)) return { rank: 7, term: word };
  const titleStem = row.titleWords.find(item => inflected(word, item));
  if (titleStem) return { rank: 6, term: titleStem, via: word.length >= 6 ? word : "" };
  const titleTypo = row.titleWords.find(item => item.length >= 5 && sameFamily(word, item));
  if (titleTypo) return { rank: 5, term: titleTypo, via: stemOf(titleTypo) };
  if (row.bodySet.has(word)) return { rank: 4, term: word };
  const bodyStem = row.bodyWords.find(item => inflected(word, item));
  if (bodyStem) return { rank: 3, term: bodyStem, via: word.length >= 6 ? word : "" };
  let direct = "";
  let stemmed = "";
  for (let index = 0; index < row.bodyWords.length; index += 1) {
    const item = row.bodyWords[index];
    if (item.length < 6 || !sameFamily(word, item)) continue;
    const stem = stemOf(item);
    const lifted = row.titleWords.find(title => title === item || title === stem || inflected(item, title) || inflected(stem, title));
    if (lifted) return { rank: 5, term: lifted, via: stem || item, tight: 1 };
    if (smallTypo(word, item)) {
      if (!direct) direct = item;
    } else if (!stemmed) {
      stemmed = stem || item;
    }
  }
  if (direct) return { rank: 2, term: direct, tight: 1 };
  if (stemmed) return { rank: 2, term: stemmed, tight: 0 };
  return { rank: 0, term: "" };
}

function scoreRows(rows, query) {
  const scored = rows.map(row => {
    const byWord = new Map();
    let best = 0;
    let sum = 0;
    let tight = 0;
    query.forEach(word => {
      const found = hit(word, row);
      if (!found.rank) return;
      byWord.set(word, found);
      sum += found.rank;
      if (found.rank > best) {
        best = found.rank;
        tight = found.tight || 0;
      } else if (found.rank === best) {
        tight = Math.max(tight, found.tight || 0);
      }
    });
    return { row, byWord, best, sum, tight, spec: Infinity };
  });

  const coverage = new Map(query.map(word => [word, 0]));
  scored.forEach(item => {
    item.byWord.forEach((found, word) => {
      if (found.rank >= 3) coverage.set(word, coverage.get(word) + 1);
    });
  });
  scored.forEach(item => {
    item.byWord.forEach((found, word) => {
      if (found.rank !== item.best) return;
      const count = coverage.get(word) || 0;
      if (count < item.spec) item.spec = count;
    });
  });
  return { scored, coverage };
}

function coveredRank(scored, word) {
  let best = 0;
  scored.forEach(item => {
    const found = item.byWord.get(word);
    if (found && found.rank > best) best = found.rank;
  });
  return best;
}

// Un cuvânt lung pe care materia nu îl are („Pitagora” la clasa a V-a) nu se
// înlocuiește cu o lecție găsită doar printr-un alt cuvânt, menționat în treacăt.
// La fel, o vorbă foarte comună („afară”) nu transformă o propoziție oarecare
// într-o lecție, dacă restul întrebării nu e în manual.
function blocked(query, scored, coverage, best) {
  if (!best || best.best < 2) return true;
  const uncovered = query.filter(word => coveredRank(scored, word) < 2);
  const longestMiss = uncovered.reduce((max, word) => Math.max(max, word.length), 0);
  if (longestMiss >= 7 && best.best < 6) return true;
  if (!uncovered.length) return false;
  let specific = false;
  best.byWord.forEach((found, word) => {
    const count = coverage.get(word) || 0;
    if (found.rank >= 5 || count <= 3) specific = true;
  });
  return !specific;
}

function better(left, right) {
  if (left.best !== right.best) return left.best > right.best;
  if (left.spec !== right.spec) return left.spec < right.spec;
  if (left.sum !== right.sum) return left.sum > right.sum;
  if (left.tight !== right.tight) return left.tight > right.tight;
  return false;
}

function needlesOf(query, foundMap) {
  const needles = new Set(query.filter(word => word.length >= 4));
  foundMap.forEach(found => {
    if (found.term && found.term.length >= 4) needles.add(found.term);
    if (found.via && found.via.length >= 4) needles.add(found.via);
  });
  return [...needles];
}

function answerFromLessons({ message, subject, grade }) {
  const sid = normalizeSubject(subject);
  const level = normalizeGrade(grade);
  const { rows, hints } = prepare(sid, level);
  const query = tokens(message);
  const subjectName = sid === "romana" ? "limba română" : "matematică";

  const missed = (empty) => {
    if (empty) {
      return {
        matched: false,
        engine: "lectii",
        text: `Spune cu un cuvânt din lecția de ${subjectName}, clasa a ${level}-a. Răspund doar cu ce este scris acolo.`
      };
    }
    const hint = hints.length ? ` Poți întreba despre: ${hints.join("; ")}.` : "";
    return {
      matched: false,
      engine: "lectii",
      text: `În lecțiile de ${subjectName} pentru clasa a ${level}-a nu am găsit asta. Nu completez din afara manualului salvat aici.${hint}`
    };
  };

  if (!query.length) return missed(true);

  const { scored, coverage } = scoreRows(rows, query);
  let best = null;
  scored.forEach(item => {
    if (!best || better(item, best)) best = item;
  });

  // Un termen găsit în titlu sau în lecție ajunge. Cuvintele din jur, care nu
  // sunt în lecție, nu mai cer puncte în plus.
  if (blocked(query, scored, coverage, best)) return missed(false);

  const needles = needlesOf(query, best.byWord);
  const picked = sentencesOf(best.row.lesson)
    .filter(sentence => {
      const folded = fold(sentence);
      return needles.some(word => folded.includes(word));
    })
    .slice(0, 3);
  const body = stripMarkers(picked.length
    ? picked.join(" ")
    : String(best.row.lesson.theory || best.row.lesson.example || boxText(best.row.lesson) || "").slice(0, 700));

  return {
    matched: true,
    engine: "lectii",
    lesson: best.row.lesson.title,
    unit: best.row.unit.title,
    text: `Din lecția „${best.row.lesson.title}”, ${best.row.unit.title}:\n\n${body}\n\nAsta stă scris în lecție. Dacă un pas nu e limpede, spune cuvântul care te încurcă.`
  };
}

module.exports = { answerFromLessons, tokens, fold, stripMarkers, lessonRecap };
