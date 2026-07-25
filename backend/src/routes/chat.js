const express = require("express");
const router = express.Router();

const { safetyCheck } = require("../safety/safetyCheck");
const { SAFETY_REFUSAL_TEXT, DIRECT_ANSWER_GUARD_TEXT, ALL_ENGINES_DOWN_TEXT } = require("../data/responseTemplates");
const { getSystemPrompt } = require("../data/systemPrompts");
const memory = require("../memory/memoryStore");
const { callClaude } = require("../providers/claude");
const { callGPT4o } = require("../providers/openai");
const { callGemini } = require("../providers/gemini");
const { askWolfram } = require("../providers/wolfram");
const { recognizeImage } = require("../providers/mathpix");

function buildMessages(userMsg, history, subject, classLevel, lang) {
  const context = `\n[Context: Subject=${subject}, Grade=${classLevel}, Language=${lang}]`;
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

async function runFreeChain({ messages, userMsg, imageBase64, lang }) {
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

async function runProChain({ messages, userMsg, lang }) {
  const gemini = await callGemini(messages, lang);
  if (gemini?.success) {
    return { response: gemini.content, engine_used: gemini.engine || "gemini", engine_mocked: !!gemini.mocked, fallback_path: ["gemini"] };
  }

  const claude = await callClaude(messages, lang);
  if (claude?.success) {
    return { response: claude.content, engine_used: claude.engine || "claude", engine_mocked: !!claude.mocked, fallback_path: ["gemini", "claude"] };
  }

  const wolfram = await askWolfram(userMsg);
  if (wolfram?.success) {
    return {
      response: wolfram.pods?.length ? `${wolfram.result}\n\n${joinPods(wolfram.pods)}` : wolfram.result,
      engine_used: "wolfram",
      engine_mocked: !!wolfram.mocked,
      fallback_path: ["gemini", "claude", "wolfram"]
    };
  }

  return null;
}

async function runPremiumCouncil({ messages, userMsg, imageBase64, lang }) {
  const councilPromises = [
    callGPT4o(messages, lang),
    askWolfram(userMsg),
    callGemini(messages, lang),
    imageBase64 ? recognizeImage(imageBase64) : Promise.resolve({ success: false, mocked: true, text: "Mathpix OCR nu a fost disponibilă fără imagine." })
  ];

  const [gpt4o, wolfram, gemini, mathpix] = await Promise.all(councilPromises);

  const advisorNotes = [
    { name: "GPT-4o", result: gpt4o },
    { name: "Wolfram", result: wolfram },
    { name: "Gemini", result: gemini },
    { name: "Mathpix", result: mathpix }
  ].map(({ name, result }) => {
    if (!result) return `${name}: nu a răspuns.`;
    if (name === "Wolfram") return `${name}: ${result.result || "fără rezultat"}${result.pods?.length ? `\n${joinPods(result.pods)}` : ""}`;
    if (name === "Mathpix") return `${name}: ${result.text || result.latex || result.error || "fără text"}`;
    return `${name}: ${result.content || result.error || "fără rezultat"}`;
  }).join("\n\n");

  const judgeMessages = [
    { role: "system", content: getSystemPrompt(lang) + "\nEști Claude și acționezi ca judecător. Compari cele 4 răspunsuri, păstrezi ideile cele mai bune și scrii o versiune nouă, clară și coerentă." },
    { role: "user", content: `Întrebarea elevului: ${userMsg}\n\nRăspunsurile consiliului:\n${advisorNotes}\n\nScrie un răspuns final nou, folosind cele mai bune puncte și corectând contradicțiile.` }
  ];

  const judge = await callClaude(judgeMessages, lang);
  if (judge?.success) {
    return {
      response: judge.content,
      engine_used: judge.engine || "claude",
      engine_mocked: !!judge.mocked,
      fallback_path: ["gpt4o", "wolfram", "gemini", "mathpix", "claude_judge"]
    };
  }

  const backups = [gpt4o, gemini, wolfram, mathpix].find(result => result?.success);
  if (!backups) return null;

  const backupResponse = backups.content || backups.result || backups.text || backups.latex || "Am obținut răspunsuri parțiale, dar nu pot sintetiza acum.";
  return {
    response: backupResponse,
    engine_used: backups.engine || (backups.result ? "wolfram" : "mathpix"),
    engine_mocked: !!backups.mocked,
    fallback_path: ["gpt4o", "wolfram", "gemini", "mathpix"]
  };
}

router.post("/", async (req, res) => {
  const startTotal = Date.now();
  const { message, subject = "matematica", class_level = 8, language = "ro", plan_id = "free", image_base64 = "" } = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Câmpul 'message' este obligatoriu." });
  }

  const lang = language || "ro";
  const conversationId = req.body.conversation_id || `conv_${Buffer.from(message).toString("base64").slice(0, 8)}`;
  const normalizedPlanId = String(plan_id || "free").toLowerCase();

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
  if (normalizedPlanId === "premium") {
    result = await runPremiumCouncil({ messages, userMsg: message, imageBase64: image_base64, lang });
  } else if (normalizedPlanId === "pro") {
    result = await runProChain({ messages, userMsg: message, lang });
  } else {
    result = await runFreeChain({ messages, userMsg: message, imageBase64: image_base64, lang });
  }

  if (!result) {
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
    conversation_id: conversationId,
    plan_id: normalizedPlanId
  });
});

router.delete("/:conversationId", (req, res) => {
  memory.clear(req.params.conversationId);
  res.json({ cleared: true });
});

module.exports = router;
