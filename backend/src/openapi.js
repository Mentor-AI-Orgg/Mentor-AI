// Spec OpenAPI 3 generat din rutele montate în routes/mounts.js.
// Servit la GET /api/openapi.json și GET /api/v1/openapi.json.

const config = require("./config");
const { listRoutes } = require("./routes/mounts");

const RETIRED = new Set([
  "POST /calendar/connect",
  "POST /calendar/disconnect",
  "POST /curriculum/en/photo-review",
  "POST /economy/connect-child",
  "POST /economy/preferences",
  "GET /economy/parent-analytics",
  "GET /economy/teacher-analytics",
  "POST /economy/request-test",
  "POST /economy/access-code/request",
  "POST /economy/access-code/verify"
]);

const SUMMARIES = {
  "GET /health": "Starea procesului",
  "POST /auth/register": "Creează un cont și setează cookie-ul de sesiune",
  "POST /auth/login": "Autentificare",
  "POST /auth/logout": "Închide sesiunea",
  "GET /auth/me": "Contul sesiunii curente",
  "POST /chat": "Mesaj către tutore, din lecțiile din aplicație",
  "DELETE /chat/{conversationId}": "Șterge conversația cu tutorele",
  "PATCH /account/profile": "Actualizează profilul",
  "GET /account/export": "Export JSON al datelor contului",
  "DELETE /account": "Șterge contul. Body: { confirm: \"DELETE\" }",
  "GET /leaderboard": "Clasament din activitate, cu pseudonime",
  "GET /curriculum": "Rezumatul programei, fără câmpul answers",
  "POST /curriculum/lesson-answers": "Răspunsurile unei lecții, doar la cerere",
  "GET /confidentialitate": "Politica de confidențialitate (rădăcina site-ului)",
  "GET /termeni": "Termenii de utilizare (rădăcina site-ului)",
  "POST /csp-report": "Raport CSP, fără corp păstrat",
  "POST /client-error": "Eroare din browser, fără text de chat"
};

function openapiPath(path) {
  return path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
}

function operation(route) {
  const key = `${route.method} ${openapiPath(route.path)}`;
  const retired = RETIRED.has(`${route.method} ${route.path}`);
  const responses = {};
  if (retired) responses[410] = { description: "Scos" };
  else responses[200] = { description: "OK" };
  if (route.guarded) responses[401] = { description: "Neautentificat" };
  const entry = {
    tags: [route.tag],
    summary: SUMMARIES[key] || SUMMARIES[`${route.method} ${route.path}`] || key,
    responses
  };
  if (route.guarded) entry.security = [{ cookieAuth: [] }];
  if (route.path === "/confidentialitate" || route.path === "/termeni") {
    entry.description = "Nu stă sub /api. Este pagina HTML de la rădăcina site-ului.";
  }
  if (route.path === "/csp-report") {
    entry.description = "Doar POST /api/csp-report, nu și sub /api/v1.";
  }
  return entry;
}

function buildSpec() {
  const tags = [];
  const seenTags = new Set();
  const paths = {};
  listRoutes().forEach(route => {
    if (!seenTags.has(route.tag)) {
      seenTags.add(route.tag);
      tags.push({ name: route.tag });
    }
    const path = openapiPath(route.path);
    if (!paths[path]) paths[path] = {};
    paths[path][route.method.toLowerCase()] = operation(route);
  });
  return {
    openapi: "3.0.3",
    info: {
      title: config.APP_NAME,
      version: config.APP_VERSION,
      description:
        "API-ul Sunt de 10 pentru gimnaziu (clasele 5–8, română și matematică). " +
        "Autentificarea este pe cookie httpOnly (`s10_session`). " +
        "Prefixul `/api` rămâne valid; `/api/v1` este aliasul versiunii. " +
        "Spec-ul este generat din rutele Express."
    },
    servers: [{ url: "/api/v1" }, { url: "/api" }],
    tags,
    components: {
      securitySchemes: {
        cookieAuth: { type: "apiKey", in: "cookie", name: "s10_session" }
      }
    },
    paths
  };
}

const spec = buildSpec();

module.exports = { spec, buildSpec, openapiPath, RETIRED };
