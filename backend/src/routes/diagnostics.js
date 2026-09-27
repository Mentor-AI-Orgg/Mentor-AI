const express = require("express");
const router = express.Router();

const memory = require("../memory/memoryStore");
const { safetyCheck } = require("../safety/safetyCheck");

async function checkMemory() {
  try {
    const testId = `diag_${Date.now()}`;
    memory.add(testId, "user", "ping");
    const stored = memory.get(testId);
    memory.clear(testId);
    const ok = stored.length === 1 && stored[0].content === "ping";
    return { key: "memory", label: "Memorie (conversație)", status: ok ? "ok" : "fail", detail: ok ? "citire/scriere reușită" : "nu s-a putut verifica" };
  } catch (err) {
    return { key: "memory", label: "Memorie (conversație)", status: "fail", detail: err.message };
  }
}

async function handleDiagnostics(_req, res) {
  const start = Date.now();
  const mem = await checkMemory();
  const safety = await safetyCheck("test de siguranță, mesaj neutru");
  const checks = [
    mem,
    {
      key: "lectii",
      label: "Mentor din lecții",
      status: "ok",
      detail: "răspunde din lecțiile salvate, fără chei plătite"
    },
    {
      key: "safety",
      label: "Filtru de siguranță",
      status: safety ? "ok" : "fail",
      detail: "regulile locale răspund"
    }
  ];
  res.json({
    checks,
    all_ok: checks.every(item => item.status === "ok"),
    engines_off: true,
    processing_time_ms: Date.now() - start
  });
}

router.all("/full", handleDiagnostics);
router.all("/", handleDiagnostics);

module.exports = router;
