// Spec OpenAPI 3 pentru rutele publice ale Mentor AI.
// Servit la GET /api/openapi.json și GET /api/v1/openapi.json.
// Nu este un SDK: e contractul pe care îl poate citi un client sau un
// generator, fără să depindă de Swagger UI.

const config = require("./config");

const spec = {
  openapi: "3.0.3",
  info: {
    title: config.APP_NAME,
    version: config.APP_VERSION,
    description:
      "API-ul Mentor AI pentru gimnaziu (clasele 5–8, română și matematică). " +
      "Autentificarea este pe cookie httpOnly (`s10_session`). " +
      "Prefixul `/api` rămâne valid; `/api/v1` este aliasul versiunii."
  },
  servers: [{ url: "/api/v1" }, { url: "/api" }],
  tags: [
    { name: "health" },
    { name: "auth" },
    { name: "chat" },
    { name: "account" }
  ],
  components: {
    securitySchemes: {
      cookieAuth: { type: "apiKey", in: "cookie", name: "s10_session" }
    }
  },
  paths: {
    "/curriculum": {
      get: {
        tags: ["health"],
        summary: "Rezumate proprii ale programei de gimnaziu (română și matematică)",
        responses: { 200: { description: "Catalog sau ghid pe materie/clasă" } }
      }
    },
    "/health": {
      get: {
        tags: ["health"],
        summary: "Starea procesului",
        responses: { 200: { description: "OK" } }
      }
    },
    "/auth/register": {
      post: {
        tags: ["auth"],
        summary: "Creează un cont și setează cookie-ul de sesiune",
        responses: { 201: { description: "Cont creat" }, 400: { description: "Date invalide" } }
      }
    },
    "/auth/login": {
      post: {
        tags: ["auth"],
        summary: "Autentificare",
        responses: { 200: { description: "OK" }, 401: { description: "Credențiale greșite" } }
      }
    },
    "/auth/logout": {
      post: { tags: ["auth"], summary: "Închide sesiunea", responses: { 200: { description: "OK" } } }
    },
    "/auth/me": {
      get: {
        tags: ["auth"],
        security: [{ cookieAuth: [] }],
        summary: "Contul sesiunii curente",
        responses: { 200: { description: "OK" }, 401: { description: "Neautentificat" } }
      }
    },
    "/chat": {
      post: {
        tags: ["chat"],
        security: [{ cookieAuth: [] }],
        summary: "Mesaj către mentorul AI",
        description:
          "Răspunsul vine din lecțiile din aplicație (`engine_used: lectii`).",
        responses: { 200: { description: "OK" }, 401: { description: "Neautentificat" } }
      }
    },
    "/account/profile": {
      patch: {
        tags: ["account"],
        security: [{ cookieAuth: [] }],
        summary: "Actualizează profilul (onboarding, username, clasă)",
        responses: { 200: { description: "OK" }, 401: { description: "Neautentificat" } }
      }
    },
    "/account/export": {
      get: {
        tags: ["account"],
        security: [{ cookieAuth: [] }],
        summary: "Export JSON al datelor contului",
        responses: { 200: { description: "OK" } }
      }
    },
    "/account": {
      delete: {
        tags: ["account"],
        security: [{ cookieAuth: [] }],
        summary: "Șterge contul. Body: { confirm: \"DELETE\" }",
        responses: { 200: { description: "Șters" } }
      }
    },
    "/leaderboard": {
      get: {
        tags: ["health"],
        summary: "Clasament din activitate, cu pseudonime (fără nume reale)",
        responses: { 200: { description: "OK" } }
      }
    },
  }
};

module.exports = { spec };
