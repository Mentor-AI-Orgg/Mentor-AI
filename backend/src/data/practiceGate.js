// Ce exerciții are elevul deschise acum și care sunt deja predate.
// Baremul pentru tutore se deschide doar din înregistrarea de pe server.

const MAX_RELEASED = 400;

function gatesOf(user) {
  if (!user.practiceGates || typeof user.practiceGates !== "object") {
    user.practiceGates = { open: {}, released: {} };
  }
  if (!user.practiceGates.open || typeof user.practiceGates.open !== "object") user.practiceGates.open = {};
  if (!user.practiceGates.released || typeof user.practiceGates.released !== "object") user.practiceGates.released = {};
  return user.practiceGates;
}

function trimReleased(released) {
  const ids = Object.keys(released);
  if (ids.length <= MAX_RELEASED) return;
  ids.sort((a, b) => (released[a]?.at || 0) - (released[b]?.at || 0));
  while (Object.keys(released).length > MAX_RELEASED && ids.length) {
    delete released[ids.shift()];
  }
}

function markOpen(user, ids, meta = {}) {
  const gates = gatesOf(user);
  const now = Date.now();
  (ids || []).forEach(id => {
    const key = String(id || "");
    if (!key) return;
    gates.open[key] = {
      source: String(meta.source || "quiz"),
      sessionId: String(meta.sessionId || ""),
      paperId: String(meta.paperId || ""),
      at: now
    };
  });
}

function releaseItems(user, items, meta = {}) {
  const gates = gatesOf(user);
  const now = Date.now();
  (items || []).forEach(item => {
    const key = String(item?.id || "");
    if (!key) return;
    delete gates.open[key];
    gates.released[key] = {
      source: String(meta.source || item.source || "quiz"),
      id: key,
      sessionId: String(meta.sessionId || ""),
      paperId: String(meta.paperId || ""),
      given: String(item.given == null ? "" : item.given).slice(0, 2000),
      ok: Boolean(item.ok),
      subject: String(meta.subject || ""),
      grade: String(meta.grade || ""),
      chapterId: String(meta.chapterId || ""),
      lessonId: String(item.lesson || meta.lessonId || ""),
      lessonTitle: String(meta.lessonTitle || ""),
      at: now
    };
  });
  trimReleased(gates.released);
}

function isMarkedOpen(user, id) {
  return Boolean(gatesOf(user).open[String(id || "")]);
}

function releasedRow(user, id) {
  return gatesOf(user).released[String(id || "")] || null;
}

function noteStepAnswer(user, problemId, stepId, answer) {
  if (!user.stepNotes || typeof user.stepNotes !== "object") user.stepNotes = {};
  const key = `${String(problemId || "")}:${String(stepId || "")}`;
  if (!problemId || !stepId) return;
  user.stepNotes[key] = String(answer == null ? "" : answer).slice(0, 500);
}

module.exports = {
  markOpen,
  releaseItems,
  isMarkedOpen,
  releasedRow,
  noteStepAnswer,
  gatesOf
};
