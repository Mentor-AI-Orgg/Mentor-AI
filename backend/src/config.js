// singura fila de atinge .env, care contine cheile pentru fiecare engine de chat si tool specializat.
// de protejat
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,

  // În producție site-ul e închis (pagina „În curând”), până pui SITE_PUBLIC=1.
  // Local și în teste rămâne deschis, dacă nu pui SITE_CLOSED=1.
  SITE_PUBLIC: process.env.SITE_PUBLIC || "",
  SITE_CLOSED: process.env.SITE_CLOSED || "",
  // Dacă PREVIEW_PASSWORD lipsește, pagina „În curând” nu acceptă nicio parolă.
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

  // Recenzia foto de la EN, dacă există chei. Tutorele răspunde din lecții.
  OPENAI_KEY: process.env.OPENAI_KEY || "",
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4o",

  // Timeout per provider (ms). Un motor agățat trebuie să cedeze locul
  // următorului din lanț, nu să țină toată cererea de chat deschisă.
  PROVIDER_TIMEOUT_MS: Number(process.env.PROVIDER_TIMEOUT_MS) || 8000,

  // 500 tăia răspunsurile de scaffolding pe mai mulți pași.
  MAX_TOKENS: Number(process.env.MAX_TOKENS) || 2048,

  MATHPIX_APP_ID: process.env.MATHPIX_APP_ID || "",
  MATHPIX_APP_KEY: process.env.MATHPIX_APP_KEY || "",

  APP_NAME: "Sunt de 10",
  APP_VERSION: "3.0.0",

  // URL public (fără slash final) pentru linkurile din email.
  // În producție trebuie să fie un https valid; altfel procesul nu pornește.
  // În development, dacă lipsește, linkurile cad pe localhost.
  APP_BASE_URL: String(process.env.APP_BASE_URL || "").replace(/\/$/, ""),

  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: process.env.SMTP_PORT || "",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SMTP_FROM: process.env.SMTP_FROM || ""
};
