// Raportul din browser păstrează mesajul, dar fără email, token sau UA brut.
// Cheia „message” nu trece prin redact(): aceea șterge orice câmp cu acest nume.

const CLIENT_DEDUPE_MS = 1000;
const STACK_FRAMES = 5;

function finite(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, 10000000);
}

function replaceUrls(value) {
  return String(value ?? "").replace(/https?:\/\/[^\s)'"]+/gi, (url) => {
    const pathOnly = url.split(/[?#]/)[0];
    const base = pathOnly.split("/").pop() || "[url]";
    const safe = base.replace(/[^A-Za-z0-9._:-]/g, "");
    return safe || "[url]";
  });
}

function sanitizeText(value, max) {
  return replaceUrls(value)
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, "[email]")
    .replace(/\b(?:\+40|0)\d{9}\b/g, "[telefon]")
    .replace(/(token|password|secret|authorization|cookie)(["']?\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^\s"',&]+)/gi, "$1$2[redactat]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [redactat]")
    .replace(/\b[a-f0-9]{24,}\b/gi, "[hex]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function sanitizeName(value) {
  const name = String(value ?? "").replace(/[^A-Za-z0-9_$]/g, "").slice(0, 40);
  return name || "Error";
}

function sanitizeFile(value) {
  const raw = String(value ?? "").split(/[?#]/)[0];
  const base = raw.split(/[/\\]/).pop() || "";
  return base.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 80);
}

function sanitizeHash(value) {
  let hash = String(value ?? "").replace(/\s+/g, "").slice(0, 160);
  if (!hash) return "";
  if (!hash.startsWith("#")) hash = `#${hash}`;
  hash = hash.replace(/#\/(parola|acord|parinte)\/[^/?#\s]+/gi, "#/$1/[redactat]");
  return sanitizeText(hash, 80);
}

function coarseUserAgent(value) {
  const raw = String(value ?? "").trim();
  const already = /^(chrome|firefox|safari|edge|other)(\+inapp)?$/i.exec(raw);
  if (already) return `${already[1].toLowerCase()}${already[2] ? "+inapp" : ""}`;
  const inApp = /FBAN|FBAV|FB_IAB|FB4A|Instagram/i.test(raw);
  let browser = "other";
  if (/Edg\/|EdgiOS\//.test(raw)) browser = "edge";
  else if (/Firefox\/|FxiOS\//.test(raw)) browser = "firefox";
  else if (/Chrome\/|CriOS\/|Chromium\//.test(raw)) browser = "chrome";
  else if (/Safari\//.test(raw)) browser = "safari";
  return inApp ? `${browser}+inapp` : browser;
}

function frameLines(value) {
  return String(value ?? "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line && (/\bat\b/.test(line) || /:\d+/.test(line)));
}

function sanitizeStack(value) {
  return frameLines(value)
    .slice(0, STACK_FRAMES)
    .map(line => sanitizeText(line, 180))
    .filter(Boolean)
    .join("\n");
}

function isOpaqueClientError(detail) {
  const source = detail && typeof detail === "object" ? detail : {};
  const message = String(source.message || "").trim();
  const blank = message === "" || message === "Script error.";
  const file = String(source.file || "").trim();
  const line = Number(source.line) || 0;
  const stack = String(source.stack || "").trim();
  return blank && !file && line === 0 && !stack;
}

function sanitizeClientReport(body) {
  const source = body && typeof body === "object" ? body : {};
  return {
    name: sanitizeName(source.name),
    message: sanitizeText(source.message, 300),
    file: sanitizeFile(source.file),
    line: finite(source.line),
    column: finite(source.column),
    hash: sanitizeHash(source.hash),
    ua: coarseUserAgent(source.ua),
    stack: sanitizeStack(source.stack)
  };
}

module.exports = {
  CLIENT_DEDUPE_MS,
  STACK_FRAMES,
  sanitizeText,
  sanitizeHash,
  coarseUserAgent,
  sanitizeStack,
  sanitizeClientReport,
  isOpaqueClientError
};
