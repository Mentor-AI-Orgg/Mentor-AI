const express = require("express");
const router = express.Router();

const { safetyCheck } = require("../safety/safetyCheck");
const { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, ALL_ENGINES_DOWN_TEXT } = require("../data/responseTemplates");
const { getSystemPrompt } = require("../data/systemPrompts");
const { buildMentorContext, normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");
const memory = require("../memory/memoryStore");
const { callClaude } = require("../providers/claude");
const { callGPT4o } = require("../providers/openai");
const { callGemini } = require("../providers/gemini");
const { askWolfram } = require("../providers/wolfram");
const { recognizeImage } = require("../providers/mathpix");
const { validateBody } = require("../middleware/validate");
const { chatSchema } = require("../validation/schemas");
const { resolvePlanId } = require("../data/subscriptions");

function buildMessages(userMsg, history, subject, classLevel, lang) {
  const sid = normalizeSubject(subject);
  const grade = normalizeGrade(classLevel);
  const context = `\n[Context: Subject=${sid}, Grade=${grade}, Language=${lang}]\n\n${buildMentorContext(sid, grade)}`;
  const messages = [{ role: "system", content: getSystemPrompt(lang) + context }];
  for (const h of history) messages.push({ role: h.role, content: h.content });
  messages.push({ role: "user", content: userMsg });
  return messages;
}

function joinPods(pods = []) {
  return pods
    .filter(Boolean)
    .map(pod => pod.text ? `${pod.title || "Pod"}: ${pod.text}` : pod.title)
    .filter(Boolean)
    .join("\n");
}

async function runMentorChain({ messages, userMsg, imageBase64, lang }) {
  const gpt4o = await callGPT4o(messages, lang);
  if (gpt4o?.success) {
    return { response: gpt4o.content, engine_used: gpt4o.engine || "gpt4o", engine_mocked: !!gpt4o.mocked, fallback_path: ["gpt4o"] };
  }

  const wolfram = await askWolfram(userMsg);
  if (wolfram?.success) {
    return {
      response: wolfram.pods?.length ? `${wolfram.result}\n\n${joinPods(wolfram.pods)}` : wolfram.result,
      engine_used: "wolfram",
      engine_mocked: !!wolfram.mocked,
      fallback_path: ["gpt4o", "wolfram"]
    };
  }

  if (imageBase64) {
    const mathpix = await recognizeImage(imageBase64);
    if (mathpix?.success) {
      return {
        response: mathpix.text || mathpix.latex || "Am extras conținutul din imagine, dar nu am primit text lizibil.",
        engine_used: "mathpix",
        engine_mocked: !!mathpix.mocked,
        fallback_path: ["gpt4o", "wolfram", "mathpix"]
      };
    }
  }

  const gemini = await callGemini(messages, lang);
  if (gemini?.success) {
    return { response: gemini.content, engine_used: gemini.engine || "gemini", engine_mocked: !!gemini.mocked, fallback_path: ["gpt4o", "wolfram", "mathpix", "gemini"] };
  }

  const claude = await callClaude(messages, lang);
  if (claude?.success) {
    return { response: claude.content, engine_used: claude.engine || "claude", engine_mocked: !!claude.mocked, fallback_path: ["gpt4o", "wolfram", "mathpix", "gemini", "claude"] };
  }

  return null;
}

router.post("/", validateBody(chatSchema), async (req, res) => {
  const startTotal = Date.now();
  const { message, language = "ro", plan_id = "free", image_base64 = "" } = req.body || {};
  const subject = normalizeSubject(req.body.subject);
  const class_level = normalizeGrade(req.body.class_level);

  const lang = language || "ro";
  const requestedConversationId = req.body.conversation_id || `conv_${Buffer.from(message).toString("base64").slice(0, 8)}`;
  // Cheia de memorie era derivată doar din textul mesajului, deci doi elevi
  // care scriau exact același prim mesaj ajungeau să împartă istoricul
  // conversației. O prefixăm cu contul, ca memoria să rămână strict a lui.
  const conversationId = `${req.auth.email}::${requestedConversationId}`;
  const normalizedPlanId = resolvePlanId(plan_id);

  const safety = await safetyCheck(message);

  if (!safety.safe) {
    return res.json({
      response: SAFETY_REFUSAL_TEXT[lang] || SAFETY_REFUSAL_TEXT.ro,
      engine_used: "safety_filter",
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: safety.flags,
      processing_time_ms: Date.now() - startTotal,
      conversation_id: requestedConversationId
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
      conversation_id: requestedConversationId
    });
  }

  const history = memory.get(conversationId);
  const messages = buildMessages(message, history, subject, class_level, lang);

  // Un singur lanț de motoare. Planul Mentor e nelimitat comercial;
  // calitatea răspunsului nu mai depinde de consilii AI diferite.
  const result = await runMentorChain({ messages, userMsg: message, imageBase64: image_base64, lang });

  if (!result) {
    return res.json({
      response: ALL_ENGINES_DOWN_TEXT,
      engine_used: "all_failed",
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: ["engine_failure"],
      processing_time_ms: Date.now() - startTotal,
      conversation_id: requestedConversationId
    });
  }

  memory.add(conversationId, "user", message);
  memory.add(conversationId, "assistant", result.response, { engine: result.engine_used, plan_id: normalizedPlanId });
  const scaffoldingLevel = Math.min(3, 1 + Math.floor(history.length / 3));

  res.json({
    response: result.response,
    engine_used: result.engine_used,
    engine_mocked: !!result.engine_mocked,
    fallback_path: result.fallback_path || [],
    subject, class_level,
    scaffolding_level: scaffoldingLevel,
    safety_flags: safety.flags,
    processing_time_ms: Date.now() - startTotal,
    conversation_id: requestedConversationId,
    plan_id: normalizedPlanId
  });
});

router.delete("/:conversationId", (req, res) => {
  // Aceeași namespace-uire ca la scriere, ca un utilizator să nu poată șterge
  // istoricul conversației altcuiva.
  memory.clear(`${req.auth.email}::${req.params.conversationId}`);
  res.json({ cleared: true });
});

module.exports = router;
