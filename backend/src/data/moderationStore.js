// Rapoarte și jurnal de moderare. Fără emailuri în jurnal: cine (creator),
// ce acțiune, când. La ștergerea contului, rapoartele făcute de el rămân,
// dar fără identitatea lui.

const crypto = require("crypto");
const persistence = require("./persistence");
const { publicId } = require("./friendStore");
const { MODERATION_LOG_MS } = require("../config/retention");

const REPORTS = [];
const LOG = [];
const REASONS = new Set(["nume_nepotrivit", "ma_deranjeaza", "altceva"]);
const HOUR_MS = 60 * 60 * 1000;

const alert = { windowStart: 0, pending: 0 };

function purgeLog(now = Date.now()) {
  const cutoff = now - MODERATION_LOG_MS;
  for (let i = LOG.length - 1; i >= 0; i -= 1) {
    const at = Date.parse(LOG[i].at || "");
    if (!Number.isFinite(at) || at < cutoff) LOG.splice(i, 1);
  }
}

function writeLog(action, reportId) {
  purgeLog();
  LOG.push({
    at: new Date().toISOString(),
    actor: "creator",
    action: String(action || "").slice(0, 40),
    reportId: String(reportId || "")
  });
}

function publicReport(report) {
  return {
    id: report.id,
    reason: report.reason,
    note: report.note || "",
    status: report.status,
    at: report.at,
    reporter: report.reporterId || "anonim",
    target: report.targetId || ""
  };
}

async function notifyAdmin(now = Date.now()) {
  const to = String(process.env.ADMIN_EMAIL || "").trim();
  if (alert.windowStart && now - alert.windowStart < HOUR_MS) {
    alert.pending += 1;
    return { sent: false, reason: "hour" };
  }
  const count = alert.pending || 1;
  alert.windowStart = now;
  alert.pending = 1;
  if (!to) return { sent: false, reason: "no_admin", count };
  const { deliverMessage } = require("../notify/deliver");
  await deliverMessage({
    to,
    subject: "Sunt de 10: raport nou",
    body: `Rapoarte noi: ${count}\nVerifică panoul de moderare.`
  });
  return { sent: true, count };
}

async function createReport({ reporterEmail, targetId, reason, note = "" }) {
  const reporterId = publicId(reporterEmail);
  if (!REASONS.has(reason)) return { ok: false, status: 400, error: "Alege un motiv din listă." };
  if (reporterId === targetId) return { ok: false, status: 400, error: "Nu te poți raporta pe tine." };
  const report = {
    id: `rp_${crypto.randomBytes(4).toString("hex")}`,
    reporterId,
    targetId: String(targetId || ""),
    reason,
    note: String(note || "").slice(0, 200),
    status: "open",
    at: new Date().toISOString()
  };
  REPORTS.push(report);
  await notifyAdmin();
  return { ok: true, report: publicReport(report), message: "Mulțumim! Un adult va verifica." };
}

function listOpen() {
  purgeLog();
  return REPORTS.filter(item => item.status === "open").map(publicReport);
}

function findReport(id) {
  return REPORTS.find(item => item.id === id) || null;
}

function closeReport(id) {
  const report = findReport(id);
  if (!report) return null;
  report.status = "closed";
  writeLog("inchide", report.id);
  return publicReport(report);
}

function logAction(action, reportId) {
  writeLog(action, reportId);
  return LOG.filter(item => item.reportId === reportId).map(item => ({ ...item }));
}

function listLog() {
  purgeLog();
  return LOG.map(item => ({ ...item }));
}

async function emailParent(parentEmail, explanation) {
  const to = String(parentEmail || "").trim();
  if (!to) return;
  const { deliverMessage } = require("../notify/deliver");
  await deliverMessage({
    to,
    subject: "Sunt de 10: o măsură pe contul copilului",
    body: explanation
  });
}

function exportFor(email) {
  const id = publicId(email);
  const mine = REPORTS.filter(item => item.reporterId === id || item.targetId === id);
  const ids = new Set(mine.map(item => item.id));
  return {
    rapoarte: mine.map(publicReport),
    jurnal: LOG.filter(item => ids.has(item.reportId)).map(item => ({
      la: item.at,
      actiune: item.action
    }))
  };
}

function eraseFor(email) {
  const id = publicId(email);
  REPORTS.forEach(item => {
    if (item.reporterId === id) item.reporterId = "anonim";
  });
}

function resetAlerts() {
  alert.windowStart = 0;
  alert.pending = 0;
}

require("./userDataRegistry").register("moderare", { exportFor, eraseFor });

persistence.register("moderare", {
  snapshot: () => ({ reports: REPORTS.slice(), log: LOG.slice() }),
  restore: data => {
    REPORTS.splice(0, REPORTS.length, ...(Array.isArray(data?.reports) ? data.reports : []));
    LOG.splice(0, LOG.length, ...(Array.isArray(data?.log) ? data.log : []));
  }
});

module.exports = {
  REASONS,
  createReport,
  listOpen,
  findReport,
  closeReport,
  logAction,
  listLog,
  emailParent,
  resetAlerts,
  HOUR_MS
};
