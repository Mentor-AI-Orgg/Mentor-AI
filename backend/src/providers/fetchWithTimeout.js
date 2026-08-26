// fetch cu timeout, comun tuturor providerilor.
//
// Fără AbortController, un provider agățat (rețea, cheie expirată care nu
// răspunde) blochează tot lanțul de fallback din routes/chat.js. Frontend-ul
// are și el un timeout, dar ăla taie toată cererea; timeout-ul de aici lasă
// următorul motor să încerce.

const DEFAULT_MS = Number(process.env.PROVIDER_TIMEOUT_MS) || 8000;

async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error && (error.name === "AbortError" || error.code === "ABORT_ERR")) {
      const timedOut = new Error(`timeout după ${timeoutMs}ms`);
      timedOut.code = "PROVIDER_TIMEOUT";
      throw timedOut;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { fetchWithTimeout, DEFAULT_MS };
