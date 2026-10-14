// Același raport pentru limita de erori și pentru window.onerror.
// O pereche în ~40ms, sau același nume+mesaj în 2s, pleacă o singură dată.
// Eșecul de chunk rămâne tăcut aici: limita îl raportează doar la a doua încercare.

import { isChunkLoadError } from './chunkReload.js';

export const CLIENT_BURST_MS = 40;
export const CLIENT_DEDUPE_MS = 2000;
const STACK_FRAMES = 5;

let lastReport = null;
let opaqueLogged = false;

export function isOpaqueClientPayload(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};
  const message = String(source.message || '').trim();
  const blank = message === '' || message === 'Script error.';
  const file = String(source.file || '').trim();
  const line = Number(source.line) || 0;
  const stack = String(source.stack || '').trim();
  return blank && !file && line === 0 && !stack;
}

function finite(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
}

function replaceUrls(value) {
  return String(value || '').replace(/https?:\/\/[^\s)'"]+/gi, (url) => {
    const pathOnly = url.split(/[?#]/)[0];
    const base = pathOnly.split('/').pop() || '[url]';
    const safe = base.replace(/[^A-Za-z0-9._:-]/g, '');
    return safe || '[url]';
  });
}

function sanitizeText(value, max) {
  return replaceUrls(value)
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, '[email]')
    .replace(/\b(?:\+40|0)\d{9}\b/g, '[telefon]')
    .replace(
      /(token|password|secret|authorization|cookie)(["']?\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^\s"',&]+)/gi,
      '$1$2[redactat]'
    )
    .replace(/\bBearer\s+\S+/gi, 'Bearer [redactat]')
    .replace(/\b[a-f0-9]{24,}\b/gi, '[hex]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function sanitizeName(value) {
  const name = String(value || '')
    .replace(/[^A-Za-z0-9_$]/g, '')
    .slice(0, 40);
  return name || 'Error';
}

function sanitizeFile(value) {
  const raw = String(value || '').split(/[?#]/)[0];
  const base = raw.split(/[/\\]/).pop() || '';
  return base.replace(/[^A-Za-z0-9._-]/g, '').slice(0, 80);
}

export function sanitizeClientHash(value) {
  let hash = String(value || '')
    .replace(/\s+/g, '')
    .slice(0, 160);
  if (!hash) return '';
  if (!hash.startsWith('#')) hash = `#${hash}`;
  hash = hash.replace(/#\/(parola|acord|parinte)\/[^/?#\s]+/gi, '#/$1/[redactat]');
  return sanitizeText(hash, 80);
}

export function coarseUserAgent(value) {
  const raw = String(value || '').trim();
  const already = /^(chrome|firefox|safari|edge|other)(\+inapp)?$/i.exec(raw);
  if (already) return `${already[1].toLowerCase()}${already[2] ? '+inapp' : ''}`;
  const inApp = /FBAN|FBAV|FB_IAB|FB4A|Instagram/i.test(raw);
  let browser = 'other';
  if (/Edg\/|EdgiOS\//.test(raw)) browser = 'edge';
  else if (/Firefox\/|FxiOS\//.test(raw)) browser = 'firefox';
  else if (/Chrome\/|CriOS\/|Chromium\//.test(raw)) browser = 'chrome';
  else if (/Safari\//.test(raw)) browser = 'safari';
  return inApp ? `${browser}+inapp` : browser;
}

function frameLines(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && (/\bat\b/.test(line) || /:\d+/.test(line)));
}

function shortStack(errorStack, componentStack) {
  const errorFrames = frameLines(errorStack);
  const componentFrames = frameLines(componentStack);
  const chosen = componentFrames.length
    ? [...errorFrames.slice(0, 1), ...componentFrames.slice(0, 4)]
    : errorFrames;
  return chosen
    .slice(0, STACK_FRAMES)
    .map((line) => sanitizeText(line, 180))
    .filter(Boolean)
    .join('\n');
}

function readHash() {
  try {
    return typeof location !== 'undefined' && location ? location.hash : '';
  } catch {
    return '';
  }
}

function readUserAgent() {
  try {
    return typeof navigator !== 'undefined' && navigator ? navigator.userAgent : '';
  } catch {
    return '';
  }
}

export function clientBuildStamp(value) {
  const raw =
    value === undefined || value === null
      ? import.meta.env && import.meta.env.VITE_BUILD_ID
      : value;
  const id = String(raw || '').trim();
  return /^[A-Za-z0-9._-]{1,40}$/.test(id) ? id : '';
}

export function clientErrorPayload(error, extra = {}) {
  const stack = shortStack(
    extra.stack != null ? extra.stack : error && error.stack,
    extra.componentStack
  );
  const frame = frameLines(extra.stack != null ? extra.stack : error && error.stack)[0] || '';
  const located = String(frame).match(/([^/\\():\s]+\.(?:jsx?|tsx?|mjs|cjs)):(\d+)(?::(\d+))?/);
  const file = sanitizeFile(extra.file) || (located ? located[1] : '');
  const line = finite(extra.line) || (located ? finite(located[2]) : 0);
  const column = finite(extra.column) || (located ? finite(located[3]) : 0);
  const payload = {
    message: sanitizeText(extra.message || (error && error.message) || 'eroare', 300),
    name: sanitizeName(extra.name || (error && error.name) || 'Error'),
    file,
    line,
    column,
    stack,
    hash: sanitizeClientHash(extra.hash != null ? extra.hash : readHash()),
    ua: coarseUserAgent(extra.ua != null ? extra.ua : readUserAgent())
  };
  const build = clientBuildStamp(extra.build);
  if (build) payload.build = build;
  return payload;
}

function isDuplicate(payload, now) {
  if (!lastReport) return false;
  const age = now - lastReport.at;
  if (age >= 0 && age < CLIENT_BURST_MS) return true;
  return (
    age >= 0 &&
    age < CLIENT_DEDUPE_MS &&
    lastReport.name === payload.name &&
    lastReport.message === payload.message
  );
}

export function resetClientErrorReporting() {
  lastReport = null;
  opaqueLogged = false;
}

export function reportClientError(error, extra = {}, deps = {}) {
  const payload = clientErrorPayload(error, extra);
  const now = Number.isFinite(deps.now) ? deps.now : Date.now();
  if (isDuplicate(payload, now)) return false;
  if (isOpaqueClientPayload(payload)) {
    if (opaqueLogged) return false;
    opaqueLogged = true;
  }
  lastReport = { name: payload.name, message: payload.message, at: now };
  const send = deps.fetch || (typeof fetch === 'function' ? fetch : null);
  if (typeof send !== 'function') return true;
  try {
    const pending = send('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (pending && typeof pending.catch === 'function') pending.catch(() => {});
  } catch {
    /* rețeaua nu oprește ecranul */
  }
  return true;
}

export function handleWindowError(event, deps) {
  if (!event || event.target !== event.currentTarget) return false;
  if (isChunkLoadError(event.error) || isChunkLoadError({ message: event.message })) return false;
  const error = event.error || { message: event.message || 'eroare', name: 'Error' };
  return reportClientError(
    error,
    {
      message: event.message,
      file: event.filename,
      line: event.lineno,
      column: event.colno
    },
    deps
  );
}

export function installClientErrorReporting(target) {
  const host = target || (typeof window !== 'undefined' ? window : undefined);
  if (!host || typeof host.addEventListener !== 'function' || host.__s10ClientErrors) return;
  host.__s10ClientErrors = true;
  host.addEventListener('error', handleWindowError);
}
