// mock

const config = require("../config");
const { fetchWithTimeout } = require("./fetchWithTimeout");

function mockResult() {
  return {
    success: true,
    mocked: true,
    text: "[Mock Mathpix] Nu sunt configurate MATHPIX_APP_ID / MATHPIX_APP_KEY. Conectează-le în .env pentru a recunoaște automat text și formule matematice din poze.",
    latex: "",
    confidence: 0
  };
}

async function recognizeImage(base64Image) {
  if (!config.MATHPIX_APP_ID || !config.MATHPIX_APP_KEY) return mockResult();

  try {
    const res = await fetchWithTimeout("https://api.mathpix.com/v3/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "app_id": config.MATHPIX_APP_ID,
        "app_key": config.MATHPIX_APP_KEY
      },
      body: JSON.stringify({
        src: base64Image.startsWith("data:") ? base64Image : `data:image/jpeg;base64,${base64Image}`,
        formats: ["text", "latex_styled"]
      })
    }, config.PROVIDER_TIMEOUT_MS);

    if (!res.ok) throw new Error(`Mathpix API responded ${res.status}`);
    const data = await res.json();

    return {
      success: true,
      mocked: false,
      text: data.text || "",
      latex: data.latex_styled || "",
      confidence: data.confidence ?? null
    };
  } catch (err) {
    console.error("[mathpix provider] falling back to mock:", err.message);
    return { ...mockResult(), error: err.message };
  }
}

module.exports = { recognizeImage };
