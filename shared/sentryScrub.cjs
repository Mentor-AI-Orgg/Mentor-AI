// Curăță un eveniment înainte de Sentry. Fără nume, email, text de chat sau IP.

function scrubText(value, max = 300) {
  return String(value ?? "")
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, "[email]")
    .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "[ip]")
    .replace(/\b(?:\+40|0)\d{9}\b/g, "[telefon]")
    .slice(0, max);
}

function scrubSentryEvent(event) {
  if (!event || typeof event !== "object") return null;
  const next = { ...event };
  delete next.user;
  delete next.request;
  delete next.breadcrumbs;
  delete next.extra;
  delete next.contexts;
  delete next.server_name;
  if (typeof next.message === "string") next.message = scrubText(next.message);
  if (next.exception && Array.isArray(next.exception.values)) {
    next.exception = {
      ...next.exception,
      values: next.exception.values.map(value => {
        if (!value || typeof value !== "object") return value;
        const copy = { ...value };
        if (typeof copy.value === "string") copy.value = scrubText(copy.value);
        if (copy.stacktrace && Array.isArray(copy.stacktrace.frames)) {
          copy.stacktrace = {
            ...copy.stacktrace,
            frames: copy.stacktrace.frames.map(frame => {
              if (!frame || typeof frame !== "object") return frame;
              const frameCopy = { ...frame };
              delete frameCopy.vars;
              return frameCopy;
            })
          };
        }
        return copy;
      })
    };
  }
  return next;
}

module.exports = { scrubText, scrubSentryEvent };
