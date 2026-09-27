// Jurnale fără parole, tokenuri sau adrese de email.

function redact(value) {
  return String(value ?? "")
    .replace(/(password|token|secret|authorization|cookie)(["']?\s*[:=]\s*)(["']?)[^\s"',&]+/gi, "$1$2$3[redactat]")
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[email]");
}

function logError(entry) {
  const line = redact(typeof entry === "string" ? entry : JSON.stringify(entry));
  console.error(line);
  return line;
}

function requestLog(req, res, next) {
  if (process.env.NODE_ENV === "test") return next();
  res.on("finish", () => {
    const pathOnly = String(req.originalUrl || req.url || "/").split("?")[0];
    console.log(`${req.method} ${redact(pathOnly)} ${res.statusCode}`);
  });
  return next();
}

module.exports = { redact, requestLog, logError };
