const express = require("express");
const { redact } = require("../logger");
const { reportClientError } = require("../ops/errorMonitor");
const { clientErrorLimiter } = require("../middleware/rateLimits");

const router = express.Router();
const MAX_BODY = 2048;

function cleanText(value, max) {
  return redact(String(value ?? ""))
    .replace(/https?:\/\/\S+/gi, "[url]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanFile(value) {
  const base = cleanText(value, 120).split(/[/\\?]/).pop() || "";
  return base.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 80);
}

router.post("/", clientErrorLimiter, (req, res) => {
  const size = Buffer.byteLength(JSON.stringify(req.body ?? {}), "utf8");
  if (size > MAX_BODY) return res.status(413).json({ error: "too_large" });
  const line = Number.parseInt(req.body?.line, 10);
  reportClientError({
    message: cleanText(req.body?.message, 300),
    file: cleanFile(req.body?.file),
    line: Number.isFinite(line) ? line : 0
  });
  return res.json({ ok: true });
});

module.exports = router;
