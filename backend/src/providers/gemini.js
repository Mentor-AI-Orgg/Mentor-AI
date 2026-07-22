// mock

const config = require("../config");
const { pickGeminiMockReply } = require("../data/mockGemini");

async function callGemini(messages, lang) {
  const start = Date.now();

  if (!config.GEMINI_KEY) {
    await new Promise(r => setTimeout(r, 200 + Math.random() * 200));
    return {
      success: true,
      content: pickGeminiMockReply(lang),
      engine: "gemini-mock",
      mocked: true,
      latencyMs: Date.now() - start
    };
  }

  try {
    const system = messages.find(m => m.role === "system")?.content || "";
    const contents = messages
      .filter(m => m.role !== "system")
      .map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.GEMINI_MODEL}:generateContent?key=${config.GEMINI_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents
      })
    });

    if (!res.ok) throw new Error(`Gemini API responded ${res.status}`);
    const data = await res.json();
    const content = data.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n").trim();
    if (!content) throw new Error("Empty Gemini response");

    return { success: true, content, engine: config.GEMINI_MODEL, mocked: false, latencyMs: Date.now() - start };
  } catch (err) {
    console.error("[gemini provider] falling back to mock:", err.message);
    return {
      success: true,
      content: pickGeminiMockReply(lang),
      engine: "gemini-mock",
      mocked: true,
      error: err.message,
      latencyMs: Date.now() - start
    };
  }
}

module.exports = { callGemini };
