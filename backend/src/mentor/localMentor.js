// Răspunsul mentorului vine numai din lecțiile deja scrise în aplicație.
// Nu se apelează niciun serviciu extern și nu se inventează o regulă care nu e în lecție.
//
// Copilul întreabă în propoziție („prezintă-mi ce este un diftong”), nu doar cu
// cuvântul din titlu. Potrivirea se face pe cuvântul de temă: vorbele de cerere
// nu ridică pragul și nu mută lecția. O formă cu articol, fără diacritice sau cu
// o greșeală mică rămâne același termen.
//
// O urmare scurtă („dă-mi un exemplu”, „mai pe scurt”, „cum se folosește”) nu
// repetă tema. Dacă în același chat tocmai s-a potrivit o lecție, răspunsul
// rămâne la lecția aceea. Fără temă anterioară, nu se inventează una din
// cuvântul „exemplu” sau „scurt”.

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

const REQUEST_WORDS = new Set([
  "exemplu", "exemple", "exemplul", "exemplele",
  "scurt", "scurta", "scurte", "simplu", "simpla",
  "foloseste", "folosim", "folosesti", "folositi", "folosit",
  "aplica", "aplici", "aplicam", "aplicati",
  "inca", "inteles", "intelesul", "asta", "deloc"
]);

function looseWord(word, canonical) {
  if (!word || !canonical) return false;
  if (word === canonical) return true;
  if (word.length < 5 || canonical.length < 5) return false;
  return smallTypo(word, canonical) || inflected(word, canonical);
}

function mentionsWord(folded, canonical) {
  return folded.split(" ").some(word => looseWord(word, canonical));
}

function isRequestWord(word) {
  if (REQUEST_WORDS.has(word)) return true;
  if (word.length < 5) return false;
  return ["exemplu", "foloseste", "folosim", "aplica", "inteles", "simplu"].some(item => looseWord(word, item));
}

function followKind(folded) {
  if (!folded || folded.split(" ").length > 12) return null;
  if (/^(mai\s+explica(\s+mi)?|explica(\s+mi)?(\s+te\s+rog)?|explica(\s+mi)?\s+(din\s+nou|iar)|nu\s+(am\s+)?inteles(\s+(asta|deloc))?|nu\s+inteleg(\s+(asta|deloc))?|inca\s+o\s+data|repeta(\s+te\s+rog)?)$/.test(folded)) {
    return "again";
  }
  const example = mentionsWord(folded, "exemplu");
  if (example && (/\bmai\s+(da|dai)\b/.test(folded) || /\b(alt|alta|altul|alte)\s+exempl/.test(folded) || /\binca\s+(un\s+)?exempl/.test(folded) || /\bun\s+alt\s+exempl/.test(folded))) {
    return "another";
  }
  if (example && (
    /\b(da|dai|dam)\s+mi\b/.test(folded)
    || /\bdami\b/.test(folded)
    || /\b(imi|mi)\s+dai\b/.test(folded)
    || /\bvrea[ui]?\b/.test(folded)
    || /\barata(\s+mi)?\b/.test(folded)
    || /^(te\s+rog\s+)?(un\s+)?exemplu$/.test(folded)
  )) {
    return "example";
  }
  if (folded.split(" ").length <= 8 && (/\bpe\s+scurt\b/.test(folded) || /\bmai\s+scurt\b/.test(folded) || /\bmai\s+simplu\b/.test(folded) || (/\bpe\s+intelesul\b/.test(folded) && /\b(explica|spune|zi)\b/.test(folded)))) {
    return "short";
  }
  if (folded.split(" ").length <= 8 && (/^cum\b/.test(folded) || /^la\s+ce\b/.test(folded)) && ["foloseste", "folosim", "folosesti", "aplica"].some(word => mentionsWord(folded, word))) {
    return "use";
  }
  return null;
}

function classifyFollowUp(message) {
  const folded = fold(message);
  const kind = followKind(folded);
  if (!kind) return null;
  if (kind === "again") return { kind, pure: true };
  const leftover = tokens(message).filter(word => !isRequestWord(word));
  return { kind, pure: leftover.length === 0 };
}

function selectBest(rows, message) {
  const query = tokens(message);
  if (!query.length) return null;
  const { scored, coverage } = scoreRows(rows, query);
  let best = null;
  scored.forEach(item => {
    if (!best || better(item, best)) best = item;
  });
  if (blocked(query, scored, coverage, best)) return null;
  return { best, query };
}

function rowByLessonId(rows, id) {
  if (!id) return null;
  return rows.find(item => item.lesson && item.lesson.id === id) || null;
}

function pickedFromRow(row) {
  const query = tokens(row.lesson.title || "");
  const byWord = new Map();
  query.forEach(word => {
    const found = hit(word, row);
    if (found.rank) byWord.set(word, found);
  });
  return { best: { row, byWord }, query };
}

function remembered(rows, history) {
  const turns = Array.isArray(history) ? history.slice(-12) : [];
  for (let index = turns.length - 1; index >= 0; index -= 1) {
    const turn = turns[index];
    if (!turn || typeof turn !== "object") continue;
    if (turn.role === "assistant") {
      const meta = turn.metadata || {};
      const row = rowByLessonId(rows, meta.lessonId || meta.lesson_id);
      if (row) return pickedFromRow(row);
      continue;
    }
    if (turn.role !== "user") continue;
    const content = String(turn.content || "");
    const intent = classifyFollowUp(content);
    if (intent && intent.pure) continue;
    const picked = selectBest(rows, content);
    if (picked) return picked;
  }
  return null;
}

function focusWords(best) {
  const words = [];
  best.byWord.forEach(found => {
    if (found.rank >= 2 && found.term) words.push(found.term);
  });
  return unique(words);
}

function onTopic(text, words) {
  if (!words.length) return true;
  const folded = fold(text);
  return words.some(word => {
    if (!word) return false;
    if (folded.includes(word)) return true;
    const stem = stemOf(word);
    return stem && stem !== word && stem.length >= 5 && folded.includes(stem);
  });
}

function splitSentences(text) {
  return stripMarkers(text)
    .split(/(?<=[.!?])\s+/)
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(part => part.length > 12);
}

function concrete(text) {
  const folded = fold(text);
  if (/\d/.test(text)) return true;
  return /\b(la|in)\s+[a-z]{3,}/.test(folded);
}

function titleOwns(lesson, words) {
  const title = fold(lesson.title || "");
  return words.some(word => {
    if (!word || word.length < 4) return false;
    if (title.includes(word)) return true;
    const stem = stemOf(word);
    return Boolean(stem && stem.length >= 5 && title.includes(stem));
  });
}

function dedupeTexts(list) {
  const accepted = [];
  list.forEach(raw => {
    const text = stripMarkers(raw || "").replace(/\s+/g, " ").trim();
    if (text.length < 12) return;
    const key = fold(text);
    const overlap = accepted.some(kept => {
      const other = fold(kept);
      return other === key || (key.length > 24 && other.includes(key)) || (other.length > 24 && key.includes(other));
    });
    if (!overlap) accepted.push(text);
  });
  return accepted;
}

function exampleSentences(lesson) {
  const bits = [];
  String(lesson.example || "").split(/\n\n+/).forEach(paragraph => {
    const sentences = splitSentences(paragraph);
    (sentences.length ? sentences : [String(paragraph).trim()]).forEach(text => bits.push(text));
  });
  return bits;
}

function rankedExamples(lesson, words) {
  const fromExample = exampleSentences(lesson);
  const extras = (lesson.extraExamples || []).map(item => item && item.text);
  const notes = [...(lesson.keyPoints || []), ...sentencesOf(lesson)];
  const namedExamples = fromExample.filter(text => onTopic(text, words));
  const namedExtras = extras.filter(text => onTopic(text, words));
  const namedNotes = notes.filter(text => onTopic(text, words));
  const concreteNotes = namedNotes.filter(concrete);
  const otherNotes = namedNotes.filter(text => !concrete(text));
  let ordered;
  if (namedExamples.length) ordered = [...namedExamples, ...namedExtras, ...concreteNotes, ...otherNotes];
  else if (titleOwns(lesson, words) && fromExample.length) ordered = [...fromExample, ...namedExtras, ...concreteNotes, ...otherNotes];
  else ordered = [...namedExtras, ...concreteNotes, ...otherNotes];
  const pool = dedupeTexts(ordered);
  return pool.length ? pool : dedupeTexts(fromExample.length ? fromExample : notes);
}

function clipSentence(text, max) {
  const clean = stripMarkers(text).replace(/\s+/g, " ").trim();
  if (!clean) return "";
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const stop = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("!"), cut.lastIndexOf("?"));
  if (stop >= 80) return cut.slice(0, stop + 1);
  return `${cut.trim()}…`;
}

function exampleBody(lesson, words, another) {
  const focused = rankedExamples(lesson, words);
  const pool = focused.length ? focused : rankedExamples(lesson, []);
  if (!pool.length) return "";
  const text = another && pool.length > 1 ? pool[1] : pool[0];
  const lead = another ? "Încă un exemplu:" : "Exemplu:";
  return `${lead} ${text}`;
}

function shortBody(lesson, words) {
  const boxes = (lesson.boxes || [])
    .map(box => stripMarkers(box && box.text || "").replace(/\s+/g, " ").trim())
    .filter(text => text.length >= 20 && text.length <= 380);
  const box = boxes.find(text => onTopic(text, words)) || boxes[0];
  if (box) {
    const brief = splitSentences(box).slice(0, 2).join(" ");
    return `Pe scurt: ${brief || box}`;
  }
  const recap = stripMarkers(lessonRecap(lesson)).replace(/\s+/g, " ").trim();
  if (recap && recap.length <= 380 && onTopic(recap, words)) return `Pe scurt: ${recap}`;
  const sentences = splitSentences(lesson.theory || "");
  const picked = sentences.find(text => onTopic(text, words)) || sentences[0] || recap;
  return picked ? `Pe scurt: ${clipSentence(picked, 280)}` : "";
}

function useBody(lesson, words) {
  const tryThis = stripMarkers(lesson.tryThis || "").replace(/\s+/g, " ").trim();
  if (tryThis && !fold(tryThis).includes("inchide ecranul")) return `Cum se folosește: ${clipSentence(tryThis, 420)}`;
  const practice = String(lesson.practice || "").split(/\n+/).map(line => line.trim()).find(line => line.length > 15);
  if (practice) return `Cum se folosește: ${clipSentence(practice, 320)}`;
  const example = exampleBody(lesson, words, false);
  return example ? example.replace(/^Exemplu:/, "Cum se folosește:") : "";
}

function explainBody(picked) {
  const needles = needlesOf(picked.query, picked.best.byWord);
  const lesson = picked.best.row.lesson;
  const pickedSentences = sentencesOf(lesson)
    .filter(sentence => {
      const folded = fold(sentence);
      return needles.some(word => folded.includes(word));
    })
    .slice(0, 3);
  return stripMarkers(pickedSentences.length
    ? pickedSentences.join(" ")
    : String(lesson.theory || lesson.example || boxText(lesson) || "").slice(0, 700));
}

function reply(row, body) {
  return {
    matched: true,
    engine: "lectii",
    lesson: row.lesson.title,
    lessonId: row.lesson.id || "",
    unit: row.unit.title,
    text: `Din lecția „${row.lesson.title}”, ${row.unit.title}:\n\n${body}\n\nAsta stă scris în lecție. Dacă un pas nu e limpede, spune cuvântul care te încurcă.`
  };
}

function bodyFor(picked, kind) {
  const lesson = picked.best.row.lesson;
  const words = focusWords(picked.best);
  if (kind === "example") return exampleBody(lesson, words, false) || explainBody(picked);
  if (kind === "another") return exampleBody(lesson, words, true) || explainBody(picked);
  if (kind === "short") return shortBody(lesson, words) || explainBody(picked);
  if (kind === "use") return useBody(lesson, words) || explainBody(picked);
  return explainBody(picked);
}

function answerFromLessons({ message, subject, grade, history } = {}) {
  const sid = normalizeSubject(subject);
  const level = normalizeGrade(grade);
  const { rows, hints } = prepare(sid, level);
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

  const intent = classifyFollowUp(message);
  if (intent && intent.pure) {
    const prior = remembered(rows, history);
    if (!prior) return missed(true);
    return reply(prior.best.row, bodyFor(prior, intent.kind));
  }

  const picked = selectBest(rows, message);
  if (!picked) return missed(!tokens(message).length);
  if (intent) return reply(picked.best.row, bodyFor(picked, intent.kind));
  return reply(picked.best.row, explainBody(picked));
}

module.exports = { answerFromLessons, tokens, fold, stripMarkers, lessonRecap };
