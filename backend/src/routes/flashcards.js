const express = require("express");
const router = express.Router();

const { callClaude } = require("../providers/claude");
const { callGPT4o } = require("../providers/openai");
const { callGemini } = require("../providers/gemini");

const ENGINE_CHAIN = [
  ["claude", callClaude],
  ["gpt4o", callGPT4o],
  ["gemini", callGemini]
];

function buildFlashcardPrompt({ topic, sourceText, subject, classLevel, language, count }) {
  const base = sourceText
    ? `Text/lecție sursă:\n"""${sourceText.slice(0, 3000)}"""`
    : `Subiect: ${topic}`;

  return `${base}\n\nGenerează exact ${count} flashcarduri de studiu pentru un elev de clasa ${classLevel}, materia ${subject}, în limba ${language}.\nRăspunde STRICT cu JSON valid, fără text în plus, fără markdown, în formatul:\n[{"question":"...","answer":"..."}, ...]`;
}

// Extrage un array JSON din raspunsul modelului, chiar daca modelul mai adauga
// text/backtick-uri in jur (des intalnit la modele mock/reale).
function extractJsonArray(text) {
  if (!text) return null;
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    if (Array.isArray(parsed)) return parsed;
  } catch (err) {
    return null;
  }
  return null;
}

function fallbackFlashcards(topicLabel, count) {
  const generic = [
    { question: `Ce este ${topicLabel}? Definește pe scurt.`, answer: "Notează definiția cu cuvintele tale, apoi verifică în manual." },
    { question: `Care este cea mai importantă idee despre ${topicLabel}?`, answer: "Identifică ideea principală și un exemplu concret." },
    { question: `Dă un exemplu practic pentru ${topicLabel}.`, answer: "Gândește-te la o situație din viața reală unde se aplică." },
    { question: `Ce greșeală comună apare la ${topicLabel}?`, answer: "Recitește secțiunea și notează unde ai putea greși." },
    { question: `Cum verifici dacă ai înțeles ${topicLabel}?`, answer: "Explică subiectul cuiva sau ție însuți, fără să te uiți în notițe." }
  ];
  return generic.slice(0, count);
}

router.post("/generate", async (req, res) => {
  const {
    topic = "",
    source_text: sourceText = "",
    subject = "matematica",
    class_level: classLevel = 7,
    language = "ro",
    count = 6
  } = req.body || {};

  const topicLabel = topic || subject;
  if (!topic && !sourceText) {
    return res.status(400).json({ error: "Trimite fie 'topic', fie 'source_text'." });
  }

  const safeCount = Math.min(12, Math.max(3, parseInt(count, 10) || 6));
  const prompt = buildFlashcardPrompt({ topic: topicLabel, sourceText, subject, classLevel, language, count: safeCount });
  const messages = [
    { role: "system", content: "Ești un generator de flashcarduri educaționale. Răspunzi STRICT cu JSON valid." },
    { role: "user", content: prompt }
  ];

  let cards = null;
  let usedEngine = "fallback";
  let mocked = true;

  for (const [engineName, engineFn] of ENGINE_CHAIN) {
    const result = await engineFn(messages, language);
    if (result && result.success) {
      const parsed = extractJsonArray(result.content);
      if (parsed && parsed.length) {
        cards = parsed
          .filter(c => c && c.question && c.answer)
          .slice(0, safeCount)
          .map((c, i) => ({ id: `fc_${i}`, question: String(c.question), answer: String(c.answer) }));
        usedEngine = result.engine || engineName;
        mocked = !!result.mocked;
        if (cards.length) break;
      }
    }
  }

  if (!cards || !cards.length) {
    cards = fallbackFlashcards(topicLabel, safeCount).map((c, i) => ({ id: `fc_${i}`, ...c }));
    usedEngine = "fallback";
    mocked = true;
  }

  res.json({ cards, engine_used: usedEngine, mocked, topic: topicLabel });
});

module.exports = router;
