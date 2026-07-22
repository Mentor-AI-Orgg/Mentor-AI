const express = require("express");
const router = express.Router();

const { safetyCheck } = require("../safety/safetyCheck");
const { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, ALL_ENGINES_DOWN_TEXT } = require("../data/responseTemplates");
const { getSystemPrompt } = require("../data/systemPrompts");
const memory = require("../memory/memoryStore");
const { callClaude } = require("../providers/claude");
const { callGPT4o } = require("../providers/openai");
const { callGemini } = require("../providers/gemini");

function buildMessages(userMsg, history, subject, classLevel, lang) {
  const context = `\n[Context: Subject=${subject}, Grade=${classLevel}, Language=${lang}]`;
  const messages = [{ role: "system", content: getSystemPrompt(lang) + context }];
  for (const h of history) messages.push({ role: h.role, content: h.content });
  messages.push({ role: "user", content: userMsg });
  return messages;
}

// moemtan e in fallback order: Claude -> OpenAI -> Gemini
const ENGINE_CHAIN = [
  ["claude", callClaude],
  ["gpt4o", callGPT4o],
  ["gemini", callGemini]
];

router.post("/", async (req, res) => {
  const startTotal = Date.now();
  const { message, subject = "matematica", class_level = 8, language = "ro" } = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Câmpul 'message' este obligatoriu." });
  }

  const lang = language || "ro";
  const conversationId = req.body.conversation_id || `conv_${Buffer.from(message).toString("base64").slice(0, 8)}`;

  const safety = await safetyCheck(message);

  if (!safety.safe) {
    return res.json({
      response: SAFETY_REFUSAL_TEXT[lang] || SAFETY_REFUSAL_TEXT.ro,
      engine_used: "safety_filter",
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: safety.flags,
      processing_time_ms: Date.now() - startTotal,
      conversation_id: conversationId
    });
  }

  if (safety.isDirectRequest) {
    return res.json({
      response: DIRECT_ANSWER_GUARD_TEXT[lang] || DIRECT_ANSWER_GUARD_TEXT.ro,
      engine_used: "scaffolding_guard",
      subject, class_level,
      scaffolding_level: 1,
      safety_flags: safety.flags,
      processing_time_ms: Date.now() - startTotal,
      conversation_id: conversationId
    });
  }

  const history = memory.get(conversationId);
  const messages = buildMessages(message, history, subject, class_level, lang);

  let result = null;
  let usedEngine = "";
  for (const [engineName, engineFn] of ENGINE_CHAIN) {
    result = await engineFn(messages, lang);
    if (result && result.success) { usedEngine = engineName; break; }
  }

  if (!result || !result.success) {
    return res.json({
      response: ALL_ENGINES_DOWN_TEXT,
      engine_used: "all_failed",
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: ["engine_failure"],
      processing_time_ms: Date.now() - startTotal,
      conversation_id: conversationId
    });
  }

  memory.add(conversationId, "user", message);
  memory.add(conversationId, "assistant", result.content, { engine: usedEngine });
  const scaffoldingLevel = Math.min(3, 1 + Math.floor(history.length / 3));

  res.json({
    response: result.content,
    engine_used: result.engine || usedEngine,
    engine_mocked: !!result.mocked,
    subject, class_level,
    scaffolding_level: scaffoldingLevel,
    safety_flags: safety.flags,
    processing_time_ms: Date.now() - startTotal,
    conversation_id: conversationId
  });
});

router.delete("/:conversationId", (req, res) => {
  memory.clear(req.params.conversationId);
  res.json({ cleared: true });
});

module.exports = router;
