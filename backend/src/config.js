// singura fila de atinge .env, care contine cheile pentru fiecare engine de chat si tool specializat.
// de protejat
const path = require("path");
const crypto = require("crypto");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config();

// Secret de proces pentru semnare OAuth state, folosit doar dacă nu e setat
// OAUTH_STATE_SECRET. Se regenerează la restart, deci fluxurile OAuth în
// curs expiră — acceptabil; în producție setează o valoare stabilă.
const processOauthSecret = crypto.randomBytes(32).toString("hex");

module.exports = {
  PORT: process.env.PORT || 3001,

  // În producție site-ul e închis (pagina „În curând”), până pui SITE_PUBLIC=1.
  // Local și în teste rămâne deschis, dacă nu pui SITE_CLOSED=1.
  SITE_PUBLIC: process.env.SITE_PUBLIC || "",
  SITE_CLOSED: process.env.SITE_CLOSED || "",
  // Dacă lipsește, pagina „În curând” acceptă parola implicită suntde10-creator.
  PREVIEW_PASSWORD: process.env.PREVIEW_PASSWORD || "",

  // Parolă HTTP Basic pe tot site-ul. Oprimă implicit, chiar dacă pe host
  // au rămas STAGING_AUTH_USER / STAGING_AUTH_PASSWORD din prototip.
  // Se reactivează doar cu ENABLE_STAGING_AUTH=1 plus ambele valori.
  STAGING_AUTH_USER: process.env.ENABLE_STAGING_AUTH === "1" ? (process.env.STAGING_AUTH_USER || "") : "",
  STAGING_AUTH_PASSWORD: process.env.ENABLE_STAGING_AUTH === "1" ? (process.env.STAGING_AUTH_PASSWORD || "") : "",

  // Cookie-ul de sesiune se trimite doar pe HTTPS în producție.
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  // Origini extra permise pentru CORS (separate prin virgulă). Same-origin
  // funcționează oricum; lista e pentru un frontend găzduit pe alt domeniu.
  CORS_ORIGINS: String(process.env.CORS_ORIGINS || "")
    .split(",")
    .map(value => value.trim())
    .filter(Boolean),

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

  // Timeout per provider (ms). Un motor agățat trebuie să cedeze locul
  // următorului din lanț, nu să țină toată cererea de chat deschisă.
  PROVIDER_TIMEOUT_MS: Number(process.env.PROVIDER_TIMEOUT_MS) || 8000,

  // 500 tăia răspunsurile de scaffolding pe mai mulți pași.
  MAX_TOKENS: Number(process.env.MAX_TOKENS) || 2048,

  // --- specialized tools ---
  WOLFRAM_KEY: process.env.WOLFRAM_KEY || "",
  MATHPIX_APP_ID: process.env.MATHPIX_APP_ID || "",
  MATHPIX_APP_KEY: process.env.MATHPIX_APP_KEY || "",

  APP_NAME: "Mentor AI v3.0",
  APP_VERSION: "3.0.0",

  // URL public (fără slash final) pentru redirecturi Stripe / OAuth.
  // Dacă lipsește, rutele reconstruiesc originea din request.
  APP_BASE_URL: String(process.env.APP_BASE_URL || "").replace(/\/$/, ""),

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  NOTION_CLIENT_ID: process.env.NOTION_CLIENT_ID || "",
  NOTION_CLIENT_SECRET: process.env.NOTION_CLIENT_SECRET || "",
  OAUTH_STATE_SECRET: process.env.OAUTH_STATE_SECRET || processOauthSecret,

  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: process.env.SMTP_PORT || "",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_FROM: process.env.SMTP_FROM || "",

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "",
  TWILIO_FROM: process.env.TWILIO_FROM || ""
};
