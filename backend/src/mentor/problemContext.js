// Contextul unui exercițiu pentru tutore. Răspunsul corect vine din bancă
// sau din sesiunea deja notată pe server, niciodată din ce trimite browserul.
// Cât testul e deschis, baremul nu pleacă.

const { ensureUser } = require("../data/economyStore");
const { lessonsFor } = require("../data/gimnaziuLessons");
const { isMarkedOpen, releasedRow } = require("../data/practiceGate");
const { findProblem, lessonTitle: problemLessonTitle } = require("../data/problemBank");
const { publicPaperById } = require("../data/enPaperFactory");

const SOURCES = new Set(["quiz", "flashcard", "en", "step", "mistake"]);

function lessonTitleFor(subject, grade, chapterId, lessonId) {
  if (!lessonId) return "";
  const lessons = lessonsFor(subject, grade, chapterId) || [];
  const hit = lessons.find(row => row && row.id === lessonId);
  return hit?.title || "";
}

function locateExercise(id) {
  const { BANK, listChapterExercises, findExercise } = require("../data/exerciseBank");
  const exercise = findExercise(id);
  if (!exercise) return null;
  for (const key of Object.keys(BANK)) {
    const [subject, grade, chapterId] = key.split(":");
    if (!listChapterExercises(subject, grade, chapterId).some(item => item.id === id)) continue;
    return {
      exercise,
      subject,
      grade,
      chapterId,
      lessonId: exercise.lesson || "",
      lessonTitle: lessonTitleFor(subject, grade, chapterId, exercise.lesson || "")
    };
  }
  return {
    exercise,
    subject: "",
    grade: "",
    chapterId: "",
    lessonId: exercise.lesson || "",
    lessonTitle: ""
  };
}

function sessionsOf(user) {
  const bag = user?.chapterTestSessions;
  if (!bag || typeof bag !== "object") return [];
  return Object.values(bag).filter(Boolean);
}

function openSessionHas(user, id) {
  return sessionsOf(user).some(session => (
    !session.finishedAt
    && Array.isArray(session.cardIds)
    && session.cardIds.includes(id)
  ));
}

function finishedGiven(user, id) {
  const rows = sessionsOf(user)
    .filter(session => session.finishedAt && Array.isArray(session.answers))
    .sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0));
  for (const session of rows) {
    const hit = session.answers.find(row => row && row.id === id);
    if (hit) return hit;
  }
  return null;
}

function sealedBank(user, id) {
  return isMarkedOpen(user, id) || openSessionHas(user, id);
}

function cardOf(placed, extra = {}) {
  return {
    prompt: String(placed?.exercise?.prompt || extra.prompt || "").slice(0, 500),
    lesson_id: placed?.lessonId || extra.lessonId || "",
    lesson_title: placed?.lessonTitle || extra.lessonTitle || "",
    subject: placed?.subject || extra.subject || "",
    grade: String(placed?.grade || extra.grade || ""),
    source: extra.source || ""
  };
}

function dossierFromExercise(placed, given, ok, source) {
  const exercise = placed.exercise;
  const answers = Array.isArray(exercise.answers) ? exercise.answers.map(item => String(item || "")).filter(Boolean) : [];
  return {
    source,
    id: exercise.id,
    prompt: exercise.prompt || "",
    choices: Array.isArray(exercise.choices) ? exercise.choices.map(item => String(item || "")).filter(Boolean) : [],
    given: String(given || ""),
    ok: Boolean(ok),
    correct: answers[0] || "",
    answers,
    explain: exercise.explain || "",
    hint: exercise.hint || "",
    steps: Array.isArray(exercise.steps) ? exercise.steps.map(step => String(step || "")).filter(Boolean) : [],
    subject: placed.subject,
    grade: String(placed.grade || ""),
    chapterId: placed.chapterId,
    lessonId: placed.lessonId,
    lessonTitle: placed.lessonTitle
  };
}

function resolveBank(user, source, id) {
  const placed = locateExercise(id);
  if (!placed) return { status: "hidden" };
  const released = releasedRow(user, id);
  const fromSession = finishedGiven(user, id);
  const mistake = user.mistakeBoxes?.[id];
  const known = Boolean(released || fromSession || mistake || sealedBank(user, id) || sessionsOf(user).some(session => (
    Array.isArray(session.cardIds) && session.cardIds.includes(id)
  )));
  if (source === "mistake" && !mistake && !released) return { status: "hidden" };
  if (!known) return { status: "hidden" };
  const card = cardOf(placed, { source });
  if (sealedBank(user, id)) return { status: "locked", card };
  const given = released?.given || fromSession?.given || mistake?.given || "";
  const ok = released ? Boolean(released.ok) : Boolean(fromSession?.ok);
  return {
    status: "ready",
    card,
    dossier: dossierFromExercise(placed, given, ok, source === "mistake" ? (released?.source || "quiz") : source)
  };
}

function parseEnId(id, paperId) {
  const raw = String(id || "");
  const parts = raw.split(":");
  if (parts.length >= 3) {
    const n = Number(parts[parts.length - 1]);
    const block = parts[parts.length - 2];
    const paper = parts.slice(0, -2).join(":");
    if (paper && block && Number.isFinite(n)) return { paperId: paper, block, n };
  }
  const n = Number(parts[1]);
  if (paperId && parts[0] && Number.isFinite(n)) return { paperId, block: parts[0], n };
  return null;
}

function publicPrompt(paperId, block, n) {
  const paper = publicPaperById(paperId);
  if (!paper) return "";
  const found = (paper.blocks || []).find(row => row.label === block);
  const item = (found?.items || []).find(row => Number(row.n) === Number(n));
  return item?.prompt || "";
}

function resolveEn(user, ref) {
  const parsed = parseEnId(ref.id, ref.paperId);
  if (!parsed) return { status: "hidden" };
  const state = user.enPapers?.[parsed.paperId];
  if (!state) return { status: "hidden" };
  const prompt = publicPrompt(parsed.paperId, parsed.block, parsed.n);
  const paper = publicPaperById(parsed.paperId);
  const card = {
    prompt: prompt || "Subiect din evaluarea națională",
    lesson_id: paper?.subject === "romana" ? "strategie" : "proba",
    lesson_title: paper?.title || "",
    subject: paper?.subject || "",
    grade: "8",
    source: "en"
  };
  if (!state.finishedAt || !state.score) return { status: "locked", card };
  const item = (state.score.items || []).find(row => row.block === parsed.block && Number(row.n) === parsed.n);
  if (!item) return { status: "hidden" };
  const answers = [item.sample, item.expected]
    .map(value => String(value || "").trim())
    .filter((value, index, list) => value && list.indexOf(value) === index);
  const explain = [item.barem, item.solution, item.explain, item.teacher]
    .map(value => String(value || "").trim())
    .filter((value, index, list) => value && list.indexOf(value) === index)
    .join("\n\n");
  return {
    status: "ready",
    card: { ...card, prompt: item.prompt || card.prompt },
    dossier: {
      source: "en",
      id: `${parsed.paperId}:${parsed.block}:${parsed.n}`,
      prompt: item.prompt || card.prompt,
      choices: [],
      given: String(item.given || item.letter || item.text || ""),
      ok: Boolean(item.ok),
      correct: answers[0] || "",
      answers,
      explain,
      hint: "",
      steps: Array.isArray(item.steps) ? item.steps.map(step => String(step || "")).filter(Boolean) : [],
      subject: card.subject,
      grade: "8",
      chapterId: "",
      lessonId: card.lesson_id,
      lessonTitle: card.lesson_title
    }
  };
}

function resolveStep(user, id) {
  const problem = findProblem(id);
  if (!problem) return { status: "hidden" };
  const released = releasedRow(user, problem.id);
  const notes = user.stepNotes && typeof user.stepNotes === "object" ? user.stepNotes : {};
  const started = Object.keys(notes).some(key => key.startsWith(`${problem.id}:`));
  const [subject, grade, chapterId] = String(problem.key || "").split(":");
  const card = {
    prompt: problem.statement || "",
    lesson_id: problem.lesson || "",
    lesson_title: problemLessonTitle(problem) || "",
    subject: subject || "matematica",
    grade: grade || "",
    source: "step"
  };
  if (!released) {
    if (!started) return { status: "hidden" };
    return { status: "locked", card };
  }
  const steps = (problem.steps || []).map(step => ({
    ask: step.ask || "",
    given: notes[`${problem.id}:${step.id}`] || "",
    answer: (step.answers || [])[0] || "",
    hint: step.hint || "",
    solution: step.solution || ""
  }));
  const answers = steps.map(step => step.answer).filter(Boolean);
  const given = steps.map(step => step.given).filter(Boolean).join(" · ");
  return {
    status: "ready",
    card,
    dossier: {
      source: "step",
      id: problem.id,
      prompt: problem.statement || "",
      choices: [],
      given,
      ok: false,
      correct: answers[0] || "",
      answers,
      explain: problem.model || steps.map(step => step.solution).filter(Boolean).join(" "),
      hint: steps.map(step => step.hint).find(Boolean) || "",
      steps: steps.map(step => step.solution).filter(Boolean),
      subject: card.subject,
      grade: card.grade,
      chapterId: chapterId || "",
      lessonId: card.lesson_id,
      lessonTitle: card.lesson_title
    }
  };
}

function resolveProblem(userId, ref = {}) {
  const source = String(ref.source || "");
  const id = String(ref.id || "").trim();
  if (!SOURCES.has(source) || !id) return { status: "hidden" };
  const user = ensureUser(userId);
  if (source === "en") return resolveEn(user, { ...ref, id, paperId: ref.paperId || ref.paper_id || "" });
  if (source === "step") return resolveStep(user, id);
  if (source === "mistake") {
    const box = user.mistakeBoxes?.[id];
    if (!box && !releasedRow(user, id)) return { status: "hidden" };
    if (id.includes(":") && !locateExercise(id)) {
      const asEn = resolveEn(user, { id, paperId: "" });
      if (asEn.status !== "hidden") return asEn;
    }
    const problem = findProblem(id);
    if (problem && !locateExercise(id)) return resolveStep(user, id);
    return resolveBank(user, "mistake", id);
  }
  return resolveBank(user, source, id);
}

function refFromHistory(history) {
  const list = Array.isArray(history) ? history : [];
  for (let index = list.length - 1; index >= 0; index -= 1) {
    const ref = list[index]?.metadata?.problemRef;
    if (!ref?.id || !ref?.source) continue;
    return {
      source: String(ref.source),
      id: String(ref.id),
      sessionId: String(ref.sessionId || ""),
      paperId: String(ref.paperId || "")
    };
  }
  return null;
}

function refFromBody(body) {
  const problem = body?.problem;
  if (!problem || typeof problem !== "object") return null;
  const source = String(problem.source || "");
  const id = String(problem.id || "").trim();
  if (!SOURCES.has(source) || !id) return null;
  return {
    source,
    id,
    sessionId: String(problem.session_id || problem.sessionId || ""),
    paperId: String(problem.paper_id || problem.paperId || "")
  };
}

module.exports = {
  resolveProblem,
  refFromHistory,
  refFromBody,
  locateExercise
};
