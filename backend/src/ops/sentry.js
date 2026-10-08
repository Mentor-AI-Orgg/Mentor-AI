// Sentry pornește doar cu SENTRY_DSN. Fără DSN nu se încarcă pachetul.
// Alertele pe email rămân. Nu trimitem sesiuni, IP, email sau text de chat.

const { scrubSentryEvent, scrubText } = require("../../../shared/sentryScrub");

let enabled = false;
let started = false;

function sampleRate(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) return fallback;
  return parsed;
}

function dsn() {
  return String(process.env.SENTRY_DSN || "").trim();
}

function tests() {
  return process.env.NODE_ENV === "test" || process.env.VITEST === "true";
}

function initSentry() {
  if (started) return { enabled };
  started = true;
  if (!dsn() || tests()) return { enabled: false };
  let Sentry;
  try {
    Sentry = require("@sentry/node");
  } catch (error) {
    console.error(`[sentry] nu pot încărca @sentry/node: ${error.message}`);
    return { enabled: false };
  }
  Sentry.init({
    dsn: dsn(),
    sendDefaultPii: false,
    tracesSampleRate: sampleRate("SENTRY_TRACES_SAMPLE_RATE", 0),
    sampleRate: sampleRate("SENTRY_SAMPLE_RATE", 0.25),
    maxBreadcrumbs: 0,
    beforeBreadcrumb() { return null; },
    beforeSend(event) { return scrubSentryEvent(event); }
  });
  enabled = true;
  return { enabled: true };
}

function captureBackendError(entry) {
  if (!dsn() || tests()) return;
  initSentry();
  if (!enabled) return;
  const Sentry = require("@sentry/node");
  const error = new Error(scrubText(entry && (entry.code || entry.message) || "Error"));
  if (entry && entry.stack) error.stack = scrubText(entry.stack, 1500);
  Sentry.captureException(error);
}

function flush(ms = 1500) {
  if (!enabled) return Promise.resolve(false);
  try {
    return require("@sentry/node").flush(ms);
  } catch {
    return Promise.resolve(false);
  }
}

module.exports = { initSentry, captureBackendError, flush, scrubText };
