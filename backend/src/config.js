// singura fila de atinge .env, care contine cheile pentru fiecare engine de chat si tool specializat.
// de protejat
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,

  // Protecție temporară la nivel de site, activă doar dacă ambele valori
  // sunt setate. Vezi backend/src/middleware/basicAuth.js.
  STAGING_AUTH_USER: process.env.STAGING_AUTH_USER || "",
  STAGING_AUTH_PASSWORD: process.env.STAGING_AUTH_PASSWORD || "",

  // Cookie-ul de sesiune se trimite doar pe HTTPS în producție.
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  // Fără acest cod, înregistrarea unui cont de profesor este blocată. Rolul
  // de profesor vede analitica mai multor elevi, deci nu poate fi ales liber
  // de către client.
  TEACHER_INVITE_CODE: process.env.TEACHER_INVITE_CODE || "",

  // --- AI chat engines (fallback order: Claude -> OpenAI -> Gemini) ---
  CLAUDE_KEY: process.env.CLAUDE_KEY || "",
  CLAUDE_MODEL: process.env.CLAUDE_MODEL || "claude-haiku-4-5-20251001",

  OPENAI_KEY: process.env.OPENAI_KEY || "",
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o",

  GEMINI_KEY: process.env.GEMINI_KEY || "",
  GEMINI_MODEL: process.env.GEMINI_MODEL || "gemini-1.5-pro",

  // --- specialized tools ---
  WOLFRAM_KEY: process.env.WOLFRAM_KEY || "",
  MATHPIX_APP_ID: process.env.MATHPIX_APP_ID || "",
  MATHPIX_APP_KEY: process.env.MATHPIX_APP_KEY || "",

  APP_NAME: "Mentor AI v3.0",
  APP_VERSION: "3.0.0"
};
