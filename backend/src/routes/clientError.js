const express = require("express");
const { reportClientError } = require("../ops/errorMonitor");
const { clientErrorLimiter } = require("../middleware/rateLimits");

const router = express.Router();
const MAX_BODY = 2048;

router.post("/", clientErrorLimiter, (req, res) => {
  const size = Buffer.byteLength(JSON.stringify(req.body ?? {}), "utf8");
  if (size > MAX_BODY) return res.status(413).json({ error: "too_large" });
  const body = req.body && typeof req.body === "object" ? req.body : {};
  reportClientError(body);
  return res.json({ ok: true });
});

module.exports = router;
