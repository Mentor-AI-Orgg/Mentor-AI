// mock

const config = require("../config");
const { pickGpt4oMockReply } = require("../data/mockGpt4o");
const { fetchWithTimeout } = require("./fetchWithTimeout");

async function callGPT4o(messages, lang) {
  const start = Date.now();

  if (!config.OPENAI_KEY) {
    await new Promise(r => setTimeout(r, 300 + Math.random() * 300));
    return {
      success: true,
      content: pickGpt4oMockReply(lang),
      engine: "gpt-4o-mock",
      mocked: true,
      latencyMs: Date.now() - start
    };
  }

  try {
    const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: config.OPENAI_MODEL,
        messages,
        max_tokens: config.MAX_TOKENS
      })
    }, config.PROVIDER_TIMEOUT_MS);

    if (!res.ok) throw new Error(`OpenAI API responded ${res.status}`);
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error("Empty OpenAI response");

    return { success: true, content, engine: config.OPENAI_MODEL, mocked: false, latencyMs: Date.now() - start };
  } catch (err) {
    console.error("[openai provider] falling back to mock:", err.message);
    return {
      success: true,
      content: pickGpt4oMockReply(lang),
      engine: "gpt-4o-mock",
      mocked: true,
      error: err.message,
      latencyMs: Date.now() - start
    };
  }
}

module.exports = { callGPT4o };
