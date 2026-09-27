const express = require("express");
const router = express.Router();

const { safetyCheck } = require("../safety/safetyCheck");
const { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, CRISIS_HELP_TEXT } = require("../data/responseTemplates");
const { normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");
const { answerFromLessons } = require("../mentor/localMentor");
const memory = require("../memory/memoryStore");
const { validateBody } = require("../middleware/validate");
const { chatSchema } = require("../validation/schemas");

router.post("/", validateBody(chatSchema), async (req, res) => {
  const startTotal = Date.now();
  const { message, language = "ro", image_base64 = "" } = req.body || {};
  const subject = normalizeSubject(req.body.subject);
  const class_level = normalizeGrade(req.body.class_level);

  const lang = language || "ro";
  const requestedConversationId = req.body.conversation_id || `conv_${Buffer.from(message).toString("base64").slice(0, 8)}`;
  // Cheia de memorie era derivată doar din textul mesajului, deci doi elevi
  // care scriau exact același prim mesaj ajungeau să împartă istoricul
  // conversației. O prefixăm cu contul, ca memoria să rămână strict a lui.
  const conversationId = `${req.auth.email}::${requestedConversationId}`;
  const normalizedPlanId = "free";

  const safety = await safetyCheck(message);

  if (safety.kind === "crisis") {
    try {
      const { notifyParentSoon } = require("../notify/parentActivity");
      notifyParentSoon({
        studentEmail: req.auth.email,
        type: "crisis_help",
        note: "A primit numerele de ajutor 116 111 și 112. Textul mesajului nu este inclus.",
        meta: { subject, grade: class_level }
      });
    } catch {
      // ajutorul către copil nu depinde de email
    }
    return res.json({
      response: CRISIS_HELP_TEXT[lang] || CRISIS_HELP_TEXT.ro,
      engine_used: "crisis_help",
      engine_mocked: false,
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: safety.flags,
      processing_time_ms: Date.now() - startTotal,
      conversation_id: requestedConversationId
    });
  }

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
  const local = answerFromLessons({ message, subject, grade: class_level });
  const result = {
    response: image_base64
      ? `${local.text}\n\nPozele nu se încarcă: citirea unei fotografii costa bani. Scrie întrebarea cu cuvinte.`
      : local.text,
    engine_used: "lectii",
    engine_mocked: false,
    fallback_path: ["lectii"]
  };

  memory.add(conversationId, "user", message);
  memory.add(conversationId, "assistant", result.response, { engine: result.engine_used, plan_id: normalizedPlanId });
  const scaffoldingLevel = Math.min(3, 1 + Math.floor(history.length / 3));

  let progress = null;
  try {
    const { recordProgress } = require("../data/economyStore");
    progress = recordProgress({
      userId: req.auth.email,
      type: "mentor_message",
      note: message.slice(0, 80),
      meta: { subject, grade: class_level }
    });
    const { notifyParentSoon } = require("../notify/parentActivity");
    notifyParentSoon({
      studentEmail: req.auth.email,
      type: "mentor_message",
      note: message.slice(0, 80),
      meta: { subject, grade: class_level }
    });
  } catch {
    progress = null;
  }

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
    plan_id: normalizedPlanId,
    progress: progress ? { awarded: progress.awarded, summary: progress.summary } : null
  });
});

router.delete("/:conversationId", (req, res) => {
  // Aceeași namespace-uire ca la scriere, ca un utilizator să nu poată șterge
  // istoricul conversației altcuiva.
  memory.clear(`${req.auth.email}::${req.params.conversationId}`);
  res.json({ cleared: true });
});

module.exports = router;
