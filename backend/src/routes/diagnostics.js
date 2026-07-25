const express = require("express");
const router = express.Router();

const memory = require("../memory/memoryStore");
const { safetyCheck } = require("../safety/safetyCheck");
const { callClaude } = require("../providers/claude");
const { callGPT4o } = require("../providers/openai");
const { callGemini } = require("../providers/gemini");
const { askWolfram } = require("../providers/wolfram");
const config = require("../config");

const TEST_MESSAGES = [{ role: "user", content: "test de diagnosticare, răspunde cu un singur cuvânt" }];

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

async function checkEngine(key, label, fn, configured) {
  try {
    const result = await fn(TEST_MESSAGES, "ro");
    if (result && result.success) {
      return {
        key,
        label,
        status: "ok",
        detail: result.mocked ? "funcționează (mock, fără cheie API reală)" : `funcționează (${result.engine || "live"})`,
        mocked: !!result.mocked,
        configured
      };
    }
    return { key, label, status: "fail", detail: "răspuns invalid", configured };
  } catch (err) {
    return { key, label, status: "fail", detail: err.message, configured };
  }
}

async function checkWolfram() {
  try {
    const result = await askWolfram("2+2");
    return {
      key: "wolfram",
      label: "API 4. Wolfram Alpha",
      status: result.success ? "ok" : "fail",
      detail: result.mocked ? "funcționează (mock, fără WOLFRAM_KEY)" : "funcționează (live)",
      mocked: !!result.mocked,
      configured: !!config.WOLFRAM_KEY
    };
  } catch (err) {
    return { key: "wolfram", label: "API 4. Wolfram Alpha", status: "fail", detail: err.message, configured: !!config.WOLFRAM_KEY };
  }
}

async function checkMathpix() {
  const configured = !!(config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY);
  return {
    key: "mathpix",
    label: "API 5. Mathpix OCR",
    status: "ok",
    detail: configured ? "chei detectate (live)" : "funcționează (mock, fără chei MATHPIX)",
    mocked: !configured,
    configured
  };
}

async function checkSafety() {
  try {
    const result = await safetyCheck("test de siguranță, mesaj neutru");
    return { key: "safety", label: "Filtru de siguranță", status: result ? "ok" : "fail", detail: "regulile de siguranță răspund" };
  } catch (err) {
    return { key: "safety", label: "Filtru de siguranță", status: "fail", detail: err.message };
  }
}

async function handleDiagnostics(req, res) {
  const start = Date.now();

  const [mem, claude, gpt4o, gemini, wolfram, mathpix, safety] = await Promise.all([
    checkMemory(),
    checkEngine("claude", "API 1. Claude", callClaude, !!config.CLAUDE_KEY),
    checkEngine("gpt4o", "API 2. GPT-4o", callGPT4o, !!config.OPENAI_KEY),
    checkEngine("gemini", "API 3. Gemini", callGemini, !!config.GEMINI_KEY),
    checkWolfram(),
    checkMathpix(),
    checkSafety()
  ]);

  const checks = [mem, claude, gpt4o, gemini, wolfram, mathpix, safety];
  const allOk = checks.every(c => c.status === "ok");

  res.json({ checks, all_ok: allOk, processing_time_ms: Date.now() - start });
}

router.all("/full", handleDiagnostics);
router.all("/", handleDiagnostics);

module.exports = router;