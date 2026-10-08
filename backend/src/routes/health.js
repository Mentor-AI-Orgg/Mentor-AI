const express = require("express");
const crypto = require("crypto");
const config = require("../config");
const { smtpConfigured } = require("../notify/deliver");

const router = express.Router();

function sameSecret(given, expected) {
  const a = Buffer.from(String(given || ""));
  const b = Buffer.from(String(expected || ""));
  if (!b.length || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function backupDetails() {
  const { latestBackup } = require("../ops/backup");
  const latest = latestBackup();
  if (!latest) return { backupAgeHours: null, backupAt: null, backupBytes: null };
  return {
    backupAgeHours: Math.round(latest.ageHours),
    backupAt: latest.date,
    backupBytes: latest.bytes
  };
}

router.get("/", (req, res) => {
  const body = { ok: true, version: config.APP_VERSION };
  const token = String(process.env.HEALTH_TOKEN || "");
  if (!sameSecret(req.get("x-health-token"), token)) return res.json(body);
  res.json({
    ...body,
    mail: smtpConfigured(),
    store: require("../data/storeMode").storeMode(),
    ...backupDetails()
  });
});

module.exports = router;
