const express = require("express");
const router = express.Router();
const { creatorRequired } = require("../middleware/comingSoon");
const { findByPublicId } = require("../data/friendStore");
const {
  markMustRename,
  hideFromLeaderboard,
  suspendAccount
} = require("../data/authStore");
const moderation = require("../data/moderationStore");

router.use(creatorRequired);

router.get("/reports", (req, res) => {
  res.json({ reports: moderation.listOpen(), log: moderation.listLog() });
});

function targetOf(report) {
  return findByPublicId(report.targetId);
}

router.post("/reports/:id/rename", (req, res) => {
  const report = moderation.findReport(req.params.id);
  if (!report) return res.status(404).json({ error: "Raportul nu există." });
  const account = targetOf(report);
  if (!account) return res.status(404).json({ error: "Contul nu mai există." });
  markMustRename(account.email);
  moderation.logAction("nume", report.id);
  const parentEmail = account.profile?.parentEmail || "";
  moderation.emailParent(parentEmail, "I-am cerut copilului să aleagă un alt nume de utilizator.").catch(() => {});
  res.json({ ok: true, action: "nume" });
});

router.post("/reports/:id/hide", (req, res) => {
  const report = moderation.findReport(req.params.id);
  if (!report) return res.status(404).json({ error: "Raportul nu există." });
  const account = targetOf(report);
  if (!account) return res.status(404).json({ error: "Contul nu mai există." });
  hideFromLeaderboard(account.email);
  moderation.logAction("ascunde", report.id);
  res.json({ ok: true, action: "ascunde" });
});

router.post("/reports/:id/suspend", (req, res) => {
  const report = moderation.findReport(req.params.id);
  if (!report) return res.status(404).json({ error: "Raportul nu există." });
  const account = targetOf(report);
  if (!account) return res.status(404).json({ error: "Contul nu mai există." });
  const hours = Math.min(24 * 30, Math.max(1, Number(req.body?.hours) || 24));
  const until = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
  suspendAccount(account.email, until);
  moderation.logAction("suspenda", report.id);
  moderation.emailParent(
    account.profile?.parentEmail || "",
    "Contul copilului a fost suspendat temporar."
  ).catch(() => {});
  res.json({ ok: true, action: "suspenda" });
});

router.post("/reports/:id/erase", async (req, res) => {
  const report = moderation.findReport(req.params.id);
  if (!report) return res.status(404).json({ error: "Raportul nu există." });
  const account = targetOf(report);
  if (!account) return res.status(404).json({ error: "Contul nu mai există." });
  const { eraseAccount } = require("./account");
  moderation.logAction("sterge", report.id);
  await eraseAccount(account.email);
  res.json({ ok: true, action: "sterge" });
});

router.post("/reports/:id/close", (req, res) => {
  const report = moderation.closeReport(req.params.id);
  if (!report) return res.status(404).json({ error: "Raportul nu există." });
  res.json({ ok: true, action: "inchide", report });
});

module.exports = router;
