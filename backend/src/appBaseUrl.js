// Originea publică pentru linkurile din email. În producție nu se
// reconstruiește din Host / X-Forwarded-Host: acele antete le pune clientul.

function hasForbiddenChar(raw) {
  if (/[\s\\@?#]/.test(raw)) return true;
  for (let i = 0; i < raw.length; i += 1) {
    const code = raw.charCodeAt(i);
    if (code < 32 || code === 127) return true;
  }
  return false;
}

function canonicalAppBaseUrl(value) {
  const raw = String(value || "").trim().replace(/\/+$/, "");
  if (!raw) return "";
  if (hasForbiddenChar(raw)) return "";
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return "";
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
  if (parsed.username || parsed.password) return "";
  if (parsed.search || parsed.hash) return "";
  if (!parsed.hostname) return "";
  const path = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
  return `${parsed.protocol}//${parsed.host}${path}`;
}

// Gol dacă URL-ul poate fi folosit în producție. Altfel un motiv scurt.
function productionBaseUrlError(value) {
  const raw = String(value || "").trim();
  if (!raw) return "lipsește";
  const canonical = canonicalAppBaseUrl(raw);
  if (!canonical || !canonical.startsWith("https://")) return "nu este un URL https valid";
  return "";
}

module.exports = { canonicalAppBaseUrl, productionBaseUrlError };
