// Răspunsul mentorului vine numai din lecțiile deja scrise în aplicație.
// Nu se apelează niciun serviciu extern și nu se inventează o regulă care nu e în lecție.

const { getGuide, normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");

const STOP = new Set([
  "ce", "este", "sunt", "un", "una", "unei", "unui", "la", "de", "si", "in", "pe", "cu", "din",
  "care", "cum", "pentru", "sau", "dar", "nu", "mai", "doar", "acest", "aceasta", "acesta",
  "te", "ma", "imi", "ai", "am", "sa", "fie", "lui", "ei", "el", "ea", "tu", "eu", "noi", "voi",
  "despre", "cand", "unde", "prin", "spre", "fara", "tot", "toate", "ale", "al", "ca", "daca",
  "the", "what", "is", "an", "how", "why", "and", "sau", "ori", "azi", "acum", "vreau", "poti",
  "pot", "spune", "explica", "explică", "ajuta", "ajută", "tema", "problema", "problemă"
]);

function fold(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
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

function sentencesOf(lesson) {
  return [lesson.theory, lesson.example, lessonRecap(lesson)]
    .map(stripMarkers)
    .filter(Boolean)
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .map(part => part.trim())
    .filter(part => part.length > 40);
}

function scoreLesson(lesson, query) {
  const titleWords = new Set(tokens(lesson.title));
  const bodyWords = tokens(stripMarkers(`${lesson.title} ${lesson.theory || ""} ${lesson.example || ""} ${lessonRecap(lesson)}`));
  const bodySet = new Set(bodyWords);
  let score = 0;
  query.forEach(word => {
    if (titleWords.has(word)) score += 4;
    else if (bodySet.has(word)) score += 2;
    else if (bodyWords.some(item => item.startsWith(word) || word.startsWith(item))) score += 1;
  });
  return score;
}

function answerFromLessons({ message, subject, grade }) {
  const sid = normalizeSubject(subject);
  const level = normalizeGrade(grade);
  const guide = getGuide(sid, level);
  const query = tokens(message);
  const subjectName = sid === "romana" ? "română" : "matematică";

  if (!query.length) {
    return {
      matched: false,
      engine: "lectii",
      text: `Spune cu un cuvânt din lecția de ${subjectName}, clasa a ${level}-a. Răspund doar cu ce este scris acolo.`
    };
  }

  let best = null;
  (guide.units || []).forEach(unit => {
    (unit.lessons || []).forEach(lesson => {
      const score = scoreLesson(lesson, query);
      if (!best || score > best.score) best = { score, lesson, unit };
    });
  });

  const needed = query.length === 1 ? 2 : 3;
  if (!best || best.score < needed) {
    const hints = (guide.units || [])
      .flatMap(unit => unit.lessons || [])
      .slice(0, 3)
      .map(lesson => lesson.title)
      .filter(Boolean);
    const hint = hints.length ? ` Poți întreba despre: ${hints.join("; ")}.` : "";
    return {
      matched: false,
      engine: "lectii",
      text: `În lecțiile de ${subjectName} pentru clasa a ${level}-a nu am găsit asta. Nu completez din afara manualului salvat aici.${hint}`
    };
  }

  const picked = sentencesOf(best.lesson)
    .filter(sentence => query.some(word => fold(sentence).includes(word)))
    .slice(0, 3);
  const body = stripMarkers(picked.length
    ? picked.join(" ")
    : String(best.lesson.theory || best.lesson.example || "").slice(0, 700));

  return {
    matched: true,
    engine: "lectii",
    lesson: best.lesson.title,
    unit: best.unit.title,
    text: `Din lecția „${best.lesson.title}”, ${best.unit.title}:\n\n${body}\n\nAsta stă scris în lecție. Dacă un pas nu e limpede, spune cuvântul care te încurcă.`
  };
}

module.exports = { answerFromLessons, tokens, fold, stripMarkers, lessonRecap };
