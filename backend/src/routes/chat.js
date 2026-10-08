const express = require("express");
const router = express.Router();

const { safetyCheck } = require("../safety/safetyCheck");
const { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, CRISIS_HELP_TEXT } = require("../data/responseTemplates");
const { normalizeGrade, normalizeSubject } = require("../data/gimnaziuGuide");
const { answerFromLessons } = require("../mentor/localMentor");
const { maybeTutorLlm } = require("../mentor/tutorLlm");
const { resolveProblem, refFromHistory, refFromBody } = require("../mentor/problemContext");
const { walkProblem, lockedProblemText, hiddenProblemText } = require("../mentor/problemWalk");
const { accountIsOpen } = require("../data/authStore");
const memory = require("../memory/memoryStore");
const { validateBody } = require("../middleware/validate");
const { chatSchema } = require("../validation/schemas");
const { obviouslyInappropriate } = require("../safety/usernamePolicy");
const { guardTutorAsk } = require("../safety/tutorQuota");

router.post("/", validateBody(chatSchema), async (req, res) => {
  const startTotal = Date.now();
  const { message, language = "ro" } = req.body || {};
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
      const { bumpCrisis } = require("../safety/crisisCounter");
      bumpCrisis();
    } catch {
      // ajutorul către copil nu depinde de contor
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

  if (!accountIsOpen(req.auth.account)) {
    return res.status(403).json({ error: "consent_pending" });
  }

  // După ajutorul de criză, ca 116 111 să nu fie oprit de limită.
  // Aceeași rută primește întrebarea din chat și din lecție.
  if (guardTutorAsk(req, res)) return;

  if (obviouslyInappropriate(message)) {
    return res.json({
      response: SAFETY_REFUSAL_TEXT[lang] || SAFETY_REFUSAL_TEXT.ro,
      engine_used: "safety_filter",
      subject, class_level,
      scaffolding_level: 0,
      safety_flags: ["inappropriate_content"],
      processing_time_ms: Date.now() - startTotal,
      conversation_id: requestedConversationId
    });
  }

  const history = memory.get(conversationId);
  const storedRef = refFromHistory(history);
  const incomingRef = refFromBody(req.body);
  const problemRef = storedRef || incomingRef;
  const resolved = problemRef ? resolveProblem(req.auth.email, problemRef) : null;
  const ready = resolved?.status === "ready";
  const softCheat = !safety.safe
    && safety.kind === "caution"
    && Array.isArray(safety.flags)
    && safety.flags.every(flag => flag === "cheating_attempt");

  if (!safety.safe && !(ready && softCheat)) {
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

  if (safety.isDirectRequest && !ready) {
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

  let local;
  let problemCard = null;
  if (resolved?.status === "ready") {
    local = walkProblem({ message, problem: resolved.dossier, history });
    problemCard = resolved.card || null;
  } else if (resolved?.status === "locked") {
    local = lockedProblemText();
    problemCard = resolved.card || null;
  } else if (resolved) {
    local = hiddenProblemText();
  } else {
    local = answerFromLessons({ message, subject, grade: class_level, history, language: lang });
    if (local && local.confident === false) {
      const llm = await maybeTutorLlm({
        message,
        subject,
        grade: class_level,
        language: lang,
        local
      });
      if (llm && llm.text) local = llm;
    }
  }
  const result = {
    response: local.text,
    engine_used: local.engine || "lectii",
    engine_mocked: false,
    fallback_path: [local.engine || "lectii"]
  };

  const problemMeta = problemRef
    ? {
      problemRef: {
        source: problemRef.source,
        id: problemRef.id,
        sessionId: problemRef.sessionId || "",
        paperId: problemRef.paperId || ""
      }
    }
    : {};
  memory.add(conversationId, "user", message, problemMeta);
  memory.add(conversationId, "assistant", result.response, {
    engine: result.engine_used,
    plan_id: normalizedPlanId,
    lessonId: local.lessonId || "",
    ...problemMeta
  });
  const scaffoldingLevel = Math.min(3, 1 + Math.floor(history.length / 3));

  let progress = null;
  try {
    const { recordProgress } = require("../data/economyStore");
    progress = recordProgress({
      userId: req.auth.email,
      type: "mentor_message",
      trusted: true,
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
    progress: progress ? { awarded: progress.awarded, summary: progress.summary } : null,
    ...(problemCard ? { problem_card: problemCard } : {})
  });
});

router.delete("/:conversationId", (req, res) => {
  // Mesajele stau în store-ul „memory”, înregistrat la registrul GDPR.
  // Ștergerea scoate cheia din store, nu o ascunde. Namespace-ul e e-mailul
  // sesiunii, ca un elev să nu poată șterge conversația altcuiva.
  const requested = String(req.params.conversationId || "").trim();
  const broken = !requested || requested.length > 80 || requested.includes("::") || [...requested].some(char => {
    const code = char.charCodeAt(0);
    return code < 32 || char === "/" || char === "\\";
  });
  if (broken) {
    return res.status(400).json({ error: "Conversația nu e validă." });
  }
  memory.clear(`${req.auth.email}::${requested}`);
  res.json({ cleared: true, conversation_id: requested });
});

module.exports = router;
