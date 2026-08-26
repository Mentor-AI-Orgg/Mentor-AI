// mock

const config = require("../config");
const { fetchWithTimeout } = require("./fetchWithTimeout");

function mockResult(query) {
  return {
    success: true,
    mocked: true,
    query,
    result: `[Mock Wolfram|Alpha] Nu este configurată o cheie WOLFRAM_KEY. Pentru „${query}”, conectează un WOLFRAM_KEY valid în .env ca să primești rezultatul calculat real.`,
    pods: []
  };
}

async function askWolfram(query) {
  if (!config.WOLFRAM_KEY) return mockResult(query);

  try {
    const url = `https://api.wolframalpha.com/v2/query?appid=${config.WOLFRAM_KEY}&input=${encodeURIComponent(query)}&output=json`;
    const res = await fetchWithTimeout(url, {}, config.PROVIDER_TIMEOUT_MS);
    if (!res.ok) throw new Error(`Wolfram API responded ${res.status}`);
    const data = await res.json();

    if (!data.queryresult?.success) {
      return { success: false, mocked: false, query, result: "Wolfram Alpha nu a putut interpreta întrebarea. Încearcă să o reformulezi.", pods: [] };
    }

    const pods = (data.queryresult.pods || []).map(p => ({
      title: p.title,
      text: (p.subpods || []).map(sp => sp.plaintext).filter(Boolean).join(" | ")
    }));

    return {
      success: true,
      mocked: false,
      query,
      result: pods[0]?.text || "Rezultat găsit, vezi pod-urile de mai jos.",
      pods
    };
  } catch (err) {
    console.error("[wolfram provider] falling back to mock:", err.message);
    return { ...mockResult(query), error: err.message };
  }
}

module.exports = { askWolfram };
