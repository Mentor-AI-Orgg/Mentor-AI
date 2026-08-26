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
      "API-ul Mentor AI. Autentificarea este pe cookie httpOnly (`mentor_session`). " +
      "Prefixul `/api` rămâne valid; `/api/v1` este aliasul versiunii."
  },
  servers: [{ url: "/api/v1" }, { url: "/api" }],
  tags: [
    { name: "health" },
    { name: "auth" },
    { name: "chat" },
    { name: "account" },
    { name: "links" }
  ],
  components: {
    securitySchemes: {
      cookieAuth: { type: "apiKey", in: "cookie", name: "mentor_session" }
    }
  },
  paths: {
    "/health": {
      get: {
        tags: ["health"],
        summary: "Starea procesului și a motoarelor AI",
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
          "Răspunsul include `engine_used`, `engine_mocked` și `fallback_path`. " +
          "Dacă `engine_mocked` este true, răspunsul NU vine de la un model real.",
        responses: { 200: { description: "OK" }, 401: { description: "Neautentificat" } }
      }
    },
    "/detect": {
      post: {
        tags: ["chat"],
        security: [{ cookieAuth: [] }],
        summary: "Scor demonstrativ de text (euristic, nu un detector real)",
        responses: { 200: { description: "OK" } }
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
    "/links": {
      get: {
        tags: ["links"],
        security: [{ cookieAuth: [] }],
        summary: "Invitații și legături active",
        responses: { 200: { description: "OK" } }
      }
    }
  }
};

module.exports = { spec };
