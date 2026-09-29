const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const config = require("../config");
const persistence = require("../data/persistence");
const { smtpConfigured } = require("../notify/deliver");

const router = express.Router();

function sameSecret(given, expected) {
  const a = Buffer.from(String(given || ""));
  const b = Buffer.from(String(expected || ""));
  if (!b.length || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function backupAgeHours() {
  const file = `${persistence.DATA_FILE}.bak1.enc`;
  if (!fs.existsSync(file)) return null;
  return (Date.now() - fs.statSync(file).mtimeMs) / 3600000;
}

router.get("/", (req, res) => {
  const body = { ok: true, version: config.APP_VERSION };
  const token = String(process.env.HEALTH_TOKEN || "");
  if (!sameSecret(req.get("x-health-token"), token)) return res.json(body);
  const age = backupAgeHours();
  res.json({
    ...body,
    mail: smtpConfigured(),
    backupAgeHours: age === null ? null : Math.round(age)
  });
});

module.exports = router;
