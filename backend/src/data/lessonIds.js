function resolveLessonId(id) {
  const raw = String(id || "").trim();
  if (!raw) return "";
  return raw.replace(/^#?lectie-/, "");
}

module.exports = { resolveLessonId };
