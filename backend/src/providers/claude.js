// mock

const config = require("../config");
const { pickClaudeMockReply } = require("../data/mockClaude");
const { fetchWithTimeout } = require("./fetchWithTimeout");

async function callClaude(messages, lang) {
  const start = Date.now();
  const lastMsg = (messages[messages.length - 1]?.content || "").toLowerCase();

  if (!config.CLAUDE_KEY) {
    await new Promise(r => setTimeout(r, 400 + Math.random() * 300)); // feel of a real call
    return {
      success: true,
      content: pickClaudeMockReply(lastMsg, lang),
      engine: "claude-haiku-mock",
      mocked: true,
      latencyMs: Date.now() - start
    };
  }

  try {
    const system = messages.find(m => m.role === "system")?.content || "";
    const conversational = messages.filter(m => m.role !== "system");

    const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.CLAUDE_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: config.CLAUDE_MODEL,
        max_tokens: config.MAX_TOKENS,
        system,
        messages: conversational
      })
    }, config.PROVIDER_TIMEOUT_MS);

    if (!res.ok) throw new Error(`Claude API responded ${res.status}`);
    const data = await res.json();
    const content = (data.content || []).map(b => b.text || "").join("\n").trim();
    if (!content) throw new Error("Empty Claude response");

    return { success: true, content, engine: config.CLAUDE_MODEL, mocked: false, latencyMs: Date.now() - start };
  } catch (err) {
    console.error("[claude provider] falling back to mock:", err.message);
    return {
      success: true,
      content: pickClaudeMockReply(lastMsg, lang),
      engine: "claude-haiku-mock",
      mocked: true,
      error: err.message,
      latencyMs: Date.now() - start
    };
  }
}

module.exports = { callClaude };
