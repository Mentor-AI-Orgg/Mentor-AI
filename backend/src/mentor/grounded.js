// A doua căutare, peste lecții, glosar, fișe, atlas și ajutor.
// Răspunsul citează textul salvat. Dacă potrivirea e slabă, spune că nu e sigură
// și arată lecția sau ecranul cel mai apropiat. Nu completează o regulă lipsă.

const { getGuide, normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");
const { ATLAS } = require("../data/geometryAtlas");
const { BY_KEY: CARDS } = require("../data/cardBank");
const { BY_KEY: QUIZ } = require("../data/quiz/matematica");
const romanaQuiz = require("../data/quiz/romana");
const { PHRASES, TOKEN_MAP } = require("./synonyms");
const { ARTICLES, COINS, STUDY } = require("./appFacts");

const STOP = new Set([
  "ce", "este", "sunt", "un", "una", "unei", "unui", "la", "de", "si", "in", "pe", "cu", "din",
  "care", "cum", "pentru", "sau", "dar", "nu", "mai", "doar", "acest", "aceasta", "acesta",
  "te", "ma", "imi", "ai", "am", "sa", "fie", "lui", "ei", "el", "ea", "tu", "eu", "noi", "voi",
  "despre", "cand", "unde", "prin", "spre", "fara", "tot", "toate", "ale", "al", "ca", "daca",
  "the", "what", "is", "an", "how", "why", "and", "ori", "azi", "acum", "vreau", "was", "who",
  "poti", "pot", "putem", "spune", "spui", "explica", "explici", "explain", "define", "please",
  "ajuta", "ajuti", "prezinta", "prezinti", "arata", "inteleg", "stiu", "inseamna",
  "does", "mean", "tell", "about", "from", "with", "this", "that", "your", "you", "can",
  "rezolv", "rezolva", "rezolvi", "calculez", "calculeaza", "calculati", "aflu", "afla",
  "invat", "inveti", "invata", "castig", "gasec", "gasesc", "gaseste", "deschid",
  "pricep", "bine", "foarte", "unui", "unei", "doar", "result", "answer", "cat",
  "rezultat", "rezultatul", "rezultate", "exemplu", "exemple", "exemplul", "example", "examples"
]);

const LONG_ENDINGS = ["urilor", "ului", "elor", "ilor", "ile", "uri", "lor", "ul", "ii", "le", "ei", "ea"];

let cache = null;

function fold(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

function wordsOf(text, min = 3) {
  return fold(text).split(" ").filter(word => word.length >= min && !STOP.has(word));
}

function stem(word) {
  if (!word || word.length < 6) return word;
  for (let index = 0; index < LONG_ENDINGS.length; index += 1) {
    const ending = LONG_ENDINGS[index];
    if (!word.endsWith(ending)) continue;
    const root = word.slice(0, word.length - ending.length);
    if (root.length >= 4) return root;
  }
  return word;
}

function endingLink(left, right, shortOk) {
  if (!left || !right || left === right) return false;
  if (left.length < 4 || right.length < 4) return false;
  const short = left.length <= right.length ? left : right;
  const long = left.length <= right.length ? right : left;
  if (!long.startsWith(short)) {
    if (left.length === right.length && left.slice(0, -1) === right.slice(0, -1)) {
      return "aeiou".includes(left[left.length - 1]) && "aeiou".includes(right[right.length - 1]);
    }
    return false;
  }
  const extra = long.slice(short.length);
  if (!extra || extra.length > 4) return false;
  if (extra.length === 1) return Boolean(shortOk) && short.length >= 4 && "aeiou".includes(extra);
  return LONG_ENDINGS.includes(extra);
}

function distance(left, right, limit) {
  if (left === right) return 0;
  if (Math.abs(left.length - right.length) > limit) return limit + 1;
  let prev = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const next = [i];
    let rowMin = i;
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      const value = Math.min(prev[j] + 1, next[j - 1] + 1, prev[j - 1] + cost);
      next[j] = value;
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > limit) return limit + 1;
    prev = next;
  }
  return prev[right.length];
}

function sentences(text) {
  return String(text || "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .split(/(?<=[.!?])\s+/)
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(part => part.length > 20);
}

function clip(text, max) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const stop = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("!"), cut.lastIndexOf("?"));
  if (stop >= 60) return cut.slice(0, stop + 1);
  return `${cut.trim()}…`;
}

function asList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(item => (typeof item === "string" ? item : "")).filter(Boolean);
  return [String(value)];
}

function makeDoc(fields) {
  const title = fields.title || "";
  const strong = fields.strong || "";
  const body = fields.body || "";
  const titleTokens = wordsOf(title, 3);
  const strongTokens = wordsOf(strong, 3);
  const bodyTokens = wordsOf(`${strong} ${body}`, 4);
  return {
    ...fields,
    title,
    titleFold: fold(title),
    strongFold: fold(strong),
    bodyFold: fold(`${title} ${strong} ${body}`),
    leadFold: fold(String(fields.lead || strong).slice(0, 180)),
    titleTokens,
    strongTokens,
    bodyTokens,
    titleSet: new Set(titleTokens),
    strongSet: new Set(strongTokens),
    stemSet: new Set([...titleTokens, ...strongTokens, ...bodyTokens].map(stem))
  };
}

function routeFor(subject, grade, unitId) {
  const parts = ["#/lectii", subject, String(grade)];
  if (unitId) parts.push(String(unitId));
  return parts.join("/");
}

function pushLesson(docs, subject, grade, unit, lesson) {
  const formulas = asList(lesson.formulas);
  const points = asList(lesson.keyPoints);
  const boxes = (lesson.boxes || []).map(box => (box && (box.text || box.title)) || "").filter(Boolean);
  const theory = String(lesson.theory || "");
  const example = String(lesson.example || "");
  const recap = String(lesson.recap || "");
  const glossary = (lesson.glossary || []).map(entry => {
    if (!entry) return "";
    return `${entry.term || ""}: ${entry.meaning || entry.definition || ""}`;
  }).filter(Boolean);
  const strong = [theory.slice(0, 420), ...formulas, ...points, ...boxes, recap, ...glossary].join("\n");
  docs.push(makeDoc({
    kind: "lesson",
    subject,
    grade,
    fromGrade: grade,
    lessonId: lesson.id || "",
    lessonTitle: lesson.title || "",
    unitId: unit.id || "",
    unitTitle: unit.title || "",
    title: lesson.title || "",
    route: routeFor(subject, grade, unit.id),
    strong,
    body: `${theory.slice(420)} ${example}`,
    lead: theory,
    quoteTheory: [theory, recap, String(lesson.mistakes || "")].filter(Boolean).join("\n"),
    quoteExample: example,
    quoteFormulas: formulas,
    support: []
  }));
}

function indexGuides() {
  const docs = [];
  ["matematica", "romana"].forEach(subject => {
    [5, 6, 7, 8].forEach(grade => {
      const guide = getGuide(subject, grade);
      (guide.units || []).forEach(unit => {
        (unit.glossary || []).forEach(entry => {
          if (!entry || !entry.term || !entry.meaning) return;
          docs.push(makeDoc({
            kind: "glossary",
            subject,
            grade,
            fromGrade: grade,
            lessonId: "",
            lessonTitle: entry.term,
            unitId: unit.id || "",
            unitTitle: unit.title || "",
            title: entry.term,
            route: routeFor(subject, grade, unit.id),
            strong: `${entry.term} ${entry.meaning}`,
            body: entry.meaning,
            lead: entry.meaning,
            quoteTheory: `${entry.term}: ${entry.meaning}`,
            quoteExample: "",
            quoteFormulas: [],
            support: []
          }));
        });
        (unit.lessons || []).forEach(lesson => pushLesson(docs, subject, grade, unit, lesson));
      });
    });
  });
  return docs;
}

function attachCards(docs) {
  const byLesson = new Map();
  docs.forEach(doc => {
    if (doc.kind !== "lesson") return;
    byLesson.set(`${doc.subject}:${doc.grade}:${doc.lessonId}`, doc);
  });
  const packs = { ...CARDS, ...QUIZ, ...romanaQuiz.BY_KEY };
  Object.entries(packs).forEach(([key, pack]) => {
    const [subject, gradeText] = key.split(":");
    const grade = Number(gradeText);
    const bits = [];
    (pack.cards || []).forEach(card => {
      if (card && card.back) bits.push({ lesson: card.lesson, text: `${card.front || ""} ${card.back}` });
    });
    (pack.flashcards || []).forEach(card => {
      if (card && card.explain) bits.push({ lesson: card.lesson, text: card.explain });
    });
    bits.forEach(bit => {
      const doc = byLesson.get(`${subject}:${grade}:${bit.lesson}`);
      if (!doc) return;
      doc.support.push(clip(bit.text, 240));
      wordsOf(bit.text, 4).forEach(word => {
        doc.bodyTokens.push(word);
        doc.stemSet.add(stem(word));
        doc.bodyFold += ` ${word}`;
      });
    });
  });
}

function indexAtlas(docs) {
  ATLAS.forEach(fig => {
    const formulas = asList(fig.formulas);
    const info = String(fig.info || "");
    const labels = [];
    formulas.forEach(line => {
      const raw = String(line || "").trim();
      if (/^P\s*=/.test(raw)) labels.push("perimetru", "perimetrul");
      if (/^A\s*=/.test(raw) || /^A_/.test(raw)) labels.push("arie", "aria");
      if (/^V\s*=/.test(raw) || /volum/i.test(raw)) labels.push("volum");
    });
    [5, 6, 7, 8].forEach(grade => {
      if (fig.fromGrade > grade) return;
      docs.push(makeDoc({
        kind: "atlas",
        subject: "matematica",
        grade,
        fromGrade: fig.fromGrade,
        lessonId: fig.id || "",
        lessonTitle: fig.name || "",
        unitId: "",
        unitTitle: "Atlas de figuri geometrice",
        title: fig.name || "",
        route: routeFor("matematica", grade, ""),
        strong: `${fig.name} ${unique(labels).join(" ")} ${formulas.join(" ")} ${info}`,
        body: info,
        lead: info,
        quoteTheory: info,
        quoteExample: "",
        quoteFormulas: formulas,
        support: []
      }));
    });
  });
}

function buildIndex() {
  if (cache) return cache;
  const docs = indexGuides();
  attachCards(docs);
  indexAtlas(docs);
  const vocab = [];
  const seen = new Set();
  docs.forEach(doc => {
    doc.titleTokens.forEach(word => {
      if (word.length < 5 || seen.has(word)) return;
      seen.add(word);
      vocab.push(word);
    });
  });
  cache = { docs, vocab };
  return cache;
}

function subjectName(subject) {
  return subject === "romana" ? "limba română" : "matematică";
}

function containsKey(folded, key) {
  const needle = fold(key);
  if (!needle) return false;
  if (needle.includes(" ")) return folded.includes(needle);
  if (folded.split(" ").includes(needle)) return true;
  return folded.replace(/\s+/g, "").includes(needle.replace(/\s+/g, ""));
}

function expandQuery(message, vocab) {
  const folded = fold(message);
  const phrases = [];
  const extra = [];
  const mappedFrom = new Set();
  if (/[²³⁰¹⁴⁵⁶⁷⁸⁹]|\^/.test(String(message || ""))) extra.push("putere");
  if (/\bcatet/.test(folded) && /\bipotenu/.test(folded)) extra.push("pitagora");
  PHRASES.forEach(row => {
    if (!row.keys.some(key => containsKey(folded, key))) return;
    phrases.push(fold(row.phrase));
    extra.push(...wordsOf(row.phrase, 3));
    row.keys.forEach(key => {
      if (!containsKey(folded, key)) return;
      fold(key).split(" ").forEach(word => mappedFrom.add(word));
    });
  });
  Object.entries(TOKEN_MAP).forEach(([key, values]) => {
    if (!containsKey(folded, key)) return;
    fold(key).split(" ").forEach(word => mappedFrom.add(word));
    values.forEach(value => extra.push(fold(value)));
  });
  const raw = folded.split(" ").filter(word => word.length >= 3 && !STOP.has(word) && !mappedFrom.has(word));
  const corrected = raw.map(word => correctWord(word, vocab));
  return {
    folded,
    phrases,
    terms: unique([...corrected, ...extra.map(fold)].filter(word => word && word.length >= 3 && !STOP.has(word)))
  };
}

function correctWord(word, vocab) {
  if (!word || word.length < 5 || vocab.includes(word)) return word;
  const limit = word.length >= 8 ? 2 : 1;
  let best = "";
  let bestDistance = limit + 1;
  let ties = 0;
  for (let index = 0; index < vocab.length; index += 1) {
    const candidate = vocab[index];
    if (candidate[0] !== word[0]) continue;
    if (Math.abs(candidate.length - word.length) > limit) continue;
    const gap = distance(word, candidate, limit);
    if (gap < bestDistance) {
      bestDistance = gap;
      best = candidate;
      ties = 1;
    } else if (gap === bestDistance) {
      ties += 1;
    }
  }
  if (best && bestDistance <= limit && ties === 1) return best;
  return word;
}

function termMatch(term, doc) {
  if (doc.titleSet.has(term)) return "title";
  if (doc.titleTokens.some(token => endingLink(term, token, true) || stem(token) === stem(term))) return "title";
  if (doc.strongSet.has(term) || doc.strongTokens.some(token => endingLink(term, token, true) || stem(token) === stem(term))) {
    return "strong";
  }
  if (doc.bodyTokens.includes(term) || doc.stemSet.has(stem(term))) return "body";
  return "";
}

function idfOf(df, total) {
  return Math.log((total + 1) / (df + 1)) + 1;
}

function earliestTerm(folded, terms) {
  const words = String(folded || "").split(" ");
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (word.length < 4) continue;
    const hit = terms.find(term => term === word || endingLink(word, term, true));
    if (hit) return hit;
  }
  return terms.find(term => term.length >= 5) || "";
}

function searchDocs(docs, query) {
  const df = new Map();
  docs.forEach(doc => {
    const seen = new Set([...doc.titleTokens, ...doc.strongTokens]);
    seen.forEach(token => df.set(token, (df.get(token) || 0) + 1));
  });
  const weightOf = term => {
    const direct = df.get(term) || df.get(stem(term)) || 0;
    return idfOf(direct, docs.length);
  };
  const focus = earliestTerm(query.folded, query.terms);
  const ranked = [];
  docs.forEach(doc => {
    let score = 0;
    const titleHits = [];
    const strongHits = [];
    query.terms.forEach(term => {
      const where = termMatch(term, doc);
      if (!where) return;
      const weight = weightOf(term);
      if (where === "title") {
        score += 6 * weight;
        if (doc.titleTokens.length <= 3) score += 2.5;
        titleHits.push(term);
      } else if (where === "strong") {
        score += 3.1 * weight;
        strongHits.push(term);
      } else {
        score += 1.15 * weight;
      }
      if (term === focus && where === "title") score += 7;
      if (term === focus && where === "strong") score += 3.5;
    });
    query.phrases.forEach(phrase => {
      if (!phrase) return;
      if (doc.titleFold.includes(phrase) || doc.strongFold.includes(phrase)) score += 12;
      else if (doc.bodyFold.includes(phrase)) score += 6;
    });
    if (focus && titleHits.length && !titleHits.includes(focus)) score -= 8;
    if (focus && (doc.quoteFormulas || []).some(line => fold(line).includes(focus))) score += 10;
    if (doc.kind === "lesson") score += 1.6;
    if (titleHits.length && doc.leadFold && titleHits.some(term => doc.leadFold.includes(term) || doc.leadFold.includes(stem(term)))) {
      score += 2.2;
    }
    if (score > 0) ranked.push({ doc, score, titleHits, strongHits });
  });
  const hitClass = item => {
    if (!focus) return 0;
    if (item.titleHits.includes(focus)) return 3;
    if (item.strongHits.includes(focus)) return 2;
    return 1;
  };
  ranked.sort((left, right) => {
    const gap = hitClass(right) - hitClass(left);
    if (gap) return gap;
    return right.score - left.score;
  });
  return ranked;
}

function coversTerms(doc, terms) {
  return !terms.some(term => term.length >= 7 && termMatch(term, doc) === "");
}

function isConfident(best, second) {
  if (!best || best.score < 8) return false;
  const specificTitle = best.titleHits.some(term => term.length >= 4);
  const specificStrong = best.strongHits.some(term => term.length >= 5);
  if (!specificTitle && !specificStrong && best.score < 14) return false;
  if (!second) return true;
  const sharedTitle = specificTitle && second.titleHits.some(term => best.titleHits.includes(term));
  const sharedStrong = best.strongHits.some(term => term.length >= 6 && second.strongHits.includes(term));
  if ((sharedTitle || sharedStrong) && best.score <= second.score * 1.08) return true;
  return best.score >= second.score + 2.2 || best.score >= second.score * 1.22;
}

function onTerm(text, terms) {
  const folded = fold(text);
  return terms.some(term => folded.includes(term) || (stem(term).length >= 4 && folded.includes(stem(term))));
}

function hasLooseNumber(line) {
  const stripped = String(line || "").replace(/\^\d+/g, "").replace(/[²³⁰¹⁴⁵⁶⁷⁸⁹]/g, "");
  return /\d/.test(stripped);
}

function quoteDoc(doc, terms, homework, focus) {
  const pool = sentences(doc.quoteTheory).filter(line => !homework || !hasLooseNumber(line));
  const focused = focus ? pool.filter(line => onTerm(line, [focus])) : [];
  const picked = focused.length ? focused : pool.filter(line => onTerm(line, terms));
  const core = clip((picked.length ? picked : pool).slice(0, 2).join(" "), 460);
  const formulas = (doc.quoteFormulas || [])
    .filter(line => !homework || !hasLooseNumber(line))
    .slice(0, 3)
    .join("; ");
  const support = (doc.support || []).find(line => onTerm(line, focus ? [focus] : terms) && (!homework || !hasLooseNumber(line)));
  let body = core || clip(doc.quoteTheory, 460);
  if (homework && hasLooseNumber(body)) body = "";
  if (!body && support) body = support;
  if (formulas) body += `\n\nDe reținut: ${formulas}`;
  if (!homework && doc.quoteExample) {
    const sample = sentences(doc.quoteExample).find(line => onTerm(line, terms)) || sentences(doc.quoteExample)[0] || doc.quoteExample;
    if (sample) body += `\n\nExemplu din lecție: ${clip(sample, 320)}`;
  }
  return body.trim();
}

function lessonLine(doc) {
  if (doc.kind === "glossary") {
    return `Din glosarul capitolului „${doc.unitTitle}”, clasa a ${doc.grade}-a`;
  }
  if (doc.kind === "atlas") {
    return `Din atlasul de figuri, „${doc.lessonTitle}”, de la clasa a ${doc.fromGrade}-a`;
  }
  return `Din lecția „${doc.lessonTitle}”, ${doc.unitTitle}`;
}

function closeLine() {
  return "Asta stă scris în materialul salvat. Dacă un pas nu e limpede, spune cuvântul care te încurcă.";
}

function answerFromDoc(doc, terms, homework, focus) {
  const quote = quoteDoc(doc, terms, homework, focus);
  const homeworkLine = homework
    ? "Nu îți calculez exercițiul. Aplică tu regula pe numerele tale.\n\n"
    : "";
  return {
    matched: true,
    confident: true,
    engine: "lectii",
    lesson: doc.lessonTitle,
    lessonId: doc.kind === "lesson" ? doc.lessonId : "",
    unit: doc.unitTitle,
    route: doc.route,
    text: `${lessonLine(doc)}:\n\n${homeworkLine}${quote}\n\nO deschizi aici: ${doc.route}\n\n${closeLine()}`
  };
}

function guideFromDoc(doc, subject, grade, note) {
  const name = subjectName(subject);
  const where = doc.kind === "atlas"
    ? `figura „${doc.lessonTitle}” din atlas, de la clasa a ${doc.fromGrade}-a`
    : `lecția „${doc.lessonTitle}” (${doc.unitTitle}), clasa a ${doc.grade}-a`;
  return {
    matched: false,
    confident: false,
    engine: "lectii",
    lesson: doc.lessonTitle,
    lessonId: "",
    unit: doc.unitTitle,
    route: doc.route,
    text: `Nu sunt sigură, așa că nu ghicesc.\n\nÎn lecțiile de ${name} pentru clasa a ${grade}-a nu am găsit asta ca regulă a clasei tale. ${note || "Cel mai aproape în material este"} ${where}. O deschizi aici: ${doc.route}`
  };
}

function packAnswer(entry) {
  return {
    matched: true,
    confident: true,
    engine: "lectii",
    lesson: entry.title,
    lessonId: "",
    unit: "",
    route: entry.route,
    text: `${entry.title}:\n\n${entry.body}\n\nÎl deschizi aici: ${entry.route}`
  };
}

function navigation(folded) {
  const coins = /\b(moned|coins|castig|earn)\b/.test(folded);
  if (coins && /\b(cum|how|unde|where|castig|earn|primesc|iau|cheltui)\b/.test(folded)) return packAnswer(COINS);
  let best = null;
  let bestScore = 0;
  ARTICLES.forEach(article => {
    article.keys.forEach(key => {
      const phrase = fold(key);
      if (!phrase) return;
      if (folded.includes(phrase)) {
        const score = phrase.length;
        if (score > bestScore) {
          bestScore = score;
          best = article;
        }
      }
    });
  });
  if (best && bestScore >= 4) return packAnswer(best);
  return null;
}

function wantsNavigation(folded) {
  const where = /\b(unde|where|gasest|gasesc|gaseste|deschid|ajung|find|earn|castig|primesc)\b/.test(folded);
  const app = /(test|flashcard|moned|coins|magazin|shop|caiet|calendar|profil|setar|prieten|parol|ajutor|clasament|acasa|simulare|evaluare|tutor|mentor|lecti|capitol)/.test(folded);
  const define = /^(ce este|ce e|what is|care e|care este)\b/.test(folded);
  if (define && !where) return false;
  if (where && app) return true;
  return /\b(how do i earn|cum castig moned|unde e testul|where is the test|where are the flashcards)\b/.test(folded);
}

function wantsStudy(folded) {
  return /\b(cum (sa )?invat|how (do i|should i|can i) study|nu stiu cum sa (incep|invat)|cum repet|cum ma pregatesc|study advice|cum sa invat)\b/.test(folded);
}

function isGreeting(folded) {
  return /^(salut|buna|hello|hi|hey|ce mai faci( tu)?|cum esti|cum mai esti|multumesc|mersi|merci|thanks|thank you)$/.test(folded);
}

function isHomework(folded) {
  const asks = /\b(calcul\w*|rezolv\w*|afl\w*|cat face|cat da|doar rezultatul|rezultatul|fa mi tema|solve\w*|calculate\w*)\b/.test(folded);
  return asks && /\d/.test(folded);
}

function isBiography(folded) {
  return /\b(cine (a fost|este|e)|who was|who is)\b/.test(folded);
}

function otherSchool(folded) {
  const hit = folded.match(/\b(fizica|istorie|geografie|biologie|chimie|engleza|franceza|germana)\b/);
  return hit ? hit[1] : "";
}

function englishLead(folded, text) {
  if (!/\b(what|how|where|why|explain|define|please|who)\b/.test(folded)) return text;
  return `Here is only what is saved in the app. I do not add facts.\n\n${text}`;
}

const SUBJECT_WORDS = new Set([
  "romana", "matematica", "mate", "gramatica", "lectie", "lectii", "clasa",
  "study", "learn", "learning", "advice", "sfat", "sfaturi"
]);

function legacyMissesFocus(legacy, best) {
  if (!legacy || !legacy.lesson || !best) return true;
  if (legacy.lessonId && best.doc && best.doc.kind === "lesson" && best.doc.lessonId === legacy.lessonId) return false;
  const title = fold(legacy.lesson);
  const focus = [...best.titleHits, ...best.strongHits].filter(term => term.length >= 4);
  if (!focus.length) return false;
  return focus.some(term => !title.includes(term) && !title.includes(stem(term)));
}

function searchScope(docs, subject, grade) {
  return docs.filter(doc => doc.subject === subject && doc.grade === grade);
}

function decideGrounded({ message, subject, grade, legacy } = {}) {
  const sid = normalizeSubject(subject);
  const level = normalizeGrade(grade);
  const { docs, vocab } = buildIndex();
  const query = expandQuery(message, vocab);
  const folded = query.folded;
  if (!folded) return null;

  if (isGreeting(folded)) {
    return {
      matched: false,
      confident: true,
      engine: "lectii",
      text: "Sunt aici pentru lecțiile de limba română și matematică. Spune o temă din clasa ta, de exemplu o lecție pe care ai deschis-o."
    };
  }

  if (wantsNavigation(folded) || (/\bmoned|coins\b/.test(folded) && /\b(cum|how|castig|earn)\b/.test(folded))) {
    const found = navigation(folded);
    if (found) return found;
  }

  const homework = isHomework(folded);
  const conceptTerms = query.terms.filter(term => !SUBJECT_WORDS.has(term));
  const focus = earliestTerm(folded, query.terms);
  const current = searchDocs(searchScope(docs, sid, level), query)
    .filter(item => coversTerms(item.doc, query.terms));
  const best = current[0] || null;
  let confident = Boolean(best && isConfident(best, current[1]));
  if (confident && best.doc.kind === "lesson" && best.titleHits.length === 0) confident = false;

  if (wantsStudy(folded)) {
    const leftover = conceptTerms.filter(term => !/^(repet|gresel|gresal|eror)/.test(term));
    if (!leftover.length) {
      return {
        ...packAnswer(STUDY),
        text: englishLead(folded, packAnswer(STUDY).text)
      };
    }
  }

  if (homework) {
    if (best && (best.titleHits.length || best.strongHits.length)) {
      const answer = answerFromDoc(best.doc, query.terms, true, focus);
      answer.text = englishLead(folded, answer.text);
      return answer;
    }
    return {
      matched: false,
      confident: true,
      engine: "lectii",
      lesson: "",
      lessonId: "",
      text: `Nu îți calculez exercițiul. În lecțiile de ${subjectName(sid)} pentru clasa a ${level}-a nu am găsit regula care se aplică, așa că nu o inventez. Spune capitolul, sau deschide lecția și aplică tu numerele.`
    };
  }

  if (confident && best) {
    if (!legacyMissesFocus(legacy, best)) return null;
    const answer = answerFromDoc(best.doc, query.terms, false, focus);
    if (wantsStudy(folded)) {
      answer.text += `\n\n${STUDY.body} Caietul e la ${STUDY.route}.`;
    }
    answer.text = englishLead(folded, answer.text);
    return answer;
  }

  if (legacy && legacy.matched && !isBiography(folded)) return null;

  const elsewhere = searchDocs(docs.filter(doc => doc.subject === sid && doc.grade !== level), query)
    .filter(item => coversTerms(item.doc, query.terms));
  if (isConfident(elsewhere[0], elsewhere[1])) {
    const note = elsewhere[0].doc.subject === sid ? "Cel mai aproape în material este" : "";
    return guideFromDoc(elsewhere[0].doc, sid, level, note);
  }

  const other = searchDocs(docs.filter(doc => doc.subject !== sid), query)
    .filter(item => coversTerms(item.doc, query.terms));
  if (isConfident(other[0], other[1])) {
    const name = subjectName(other[0].doc.subject);
    return guideFromDoc(other[0].doc, sid, level, `Asta ține de ${name}, nu de ${subjectName(sid)}. Cel mai aproape este`);
  }

  if (isBiography(folded) && best && (best.titleHits.length || best.strongHits.length)) {
    const line = sentences(best.doc.quoteTheory).find(item => onTerm(item, query.terms)) || clip(best.doc.quoteTheory, 220);
    return {
      matched: false,
      confident: true,
      engine: "lectii",
      text: `Nu am o biografie salvată, așa că nu o inventez.\n\nÎn lecțiile de ${subjectName(sid)} pentru clasa a ${level}-a nu am găsit asta ca prezentare a unei persoane. În „${best.doc.lessonTitle}” stă scris doar atât: ${clip(line, 280)}\n\nO deschizi aici: ${best.doc.route}`
    };
  }

  const foreign = otherSchool(folded);

  if (!legacy && best && coversTerms(best.doc, query.terms) && best.score >= 6 && (best.titleHits.length || best.strongHits.length) && !foreign) {
    return guideFromDoc(best.doc, sid, level, "Nu leg întrebarea de o regulă. Cel mai aproape pare");
  }

  if (!legacy && foreign) {
    return {
      matched: false,
      confident: true,
      engine: "lectii",
      text: `În lecțiile de ${subjectName(sid)} pentru clasa a ${level}-a nu am găsit asta. Aici lucrăm limba română și matematică, clasele 5–8. Nu completez ${foreign} din afara materialului.`
    };
  }

  return null;
}

function passagesFor(message, subject, grade) {
  const sid = normalizeSubject(subject);
  const level = normalizeGrade(grade);
  const { docs, vocab } = buildIndex();
  const query = expandQuery(message, vocab);
  const ranked = searchDocs(docs.filter(doc => doc.grade === level || doc.subject === sid), query).slice(0, 4);
  return ranked.map(item => ({
    title: item.doc.lessonTitle || item.doc.title,
    route: item.doc.route,
    grade: item.doc.grade,
    subject: item.doc.subject,
    text: clip(`${item.doc.quoteTheory || ""} ${item.doc.quoteExample || ""} ${(item.doc.quoteFormulas || []).join("; ")}`, 700)
  }));
}

module.exports = { decideGrounded, passagesFor, fold, buildIndex };
