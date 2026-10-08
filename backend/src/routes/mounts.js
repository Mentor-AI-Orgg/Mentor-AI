// Lista rutelor montate de app.js. OpenAPI o citește de aici, ca să nu
// rămână un contract scris de mână în urma rutelor.

const { authRequired, studentRequired, consentRequired } = require("../middleware/auth");
const { creatorRequired } = require("../middleware/comingSoon");

const METHODS = new Set(["get", "post", "put", "patch", "delete"]);

function definitions() {
  const student = [authRequired, studentRequired];
  return [
    { mount: "/auth", tag: "auth", router: require("./auth"), guards: [] },
    { mount: "/parent", tag: "parent", router: require("./parent"), guards: [] },
    { mount: "/placement", tag: "placement", router: require("./placement"), guards: student },
    { mount: "/mistakes", tag: "mistakes", router: require("./mistakes"), guards: student },
    { mount: "/health", tag: "health", router: require("./health"), guards: [] },
    { mount: "/leaderboard", tag: "leaderboard", router: require("./leaderboard"), guards: [] },
    { mount: "/moderation", tag: "moderation", router: require("./moderation"), guards: [] },
    { mount: "/creator", tag: "creator", router: require("./creator"), guards: [] },
    { mount: "/curriculum", tag: "curriculum", router: require("./curriculum"), guards: [] },
    { mount: "/chat", tag: "chat", router: require("./chat"), guards: student },
    { mount: "/flashcards", tag: "flashcards", router: require("./flashcards"), guards: student },
    { mount: "/cards", tag: "cards", router: require("./cards"), guards: student },
    { mount: "/problems", tag: "problems", router: require("./problems"), guards: student },
    { mount: "/diagnostics", tag: "diagnostics", router: require("./diagnostics"), guards: [creatorRequired] },
    { mount: "/calendar", tag: "calendar", router: require("./calendar"), guards: student },
    { mount: "/economy", tag: "economy", router: require("./economy"), guards: student },
    { mount: "/account", tag: "account", router: require("./account"), guards: student },
    { mount: "/friends", tag: "friends", router: require("./friends"), guards: [...student, consentRequired] }
  ];
}

function mountApi(app, prefix) {
  definitions().forEach(route => {
    app.use(`${prefix}${route.mount}`, ...route.guards, route.router);
  });
}

function joinRoute(mount, routePath) {
  const suffix = routePath === "/" ? "" : routePath;
  const full = `${mount}${suffix}`.replace(/\/{2,}/g, "/");
  return full || "/";
}

function walk(router, mount, tag, guards, out) {
  (router.stack || []).forEach(layer => {
    if (!layer.route) return;
    const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
    const methods = Object.keys(layer.route.methods || {})
      .filter(name => layer.route.methods[name] && METHODS.has(name));
    paths.forEach(routePath => {
      methods.forEach(method => {
        out.push({
          method: method.toUpperCase(),
          path: joinRoute(mount, String(routePath)),
          tag,
          guarded: guards.length > 0
        });
      });
    });
  });
}

function listRoutes() {
  const out = [];
  definitions().forEach(route => walk(route.router, route.mount, route.tag, route.guards, out));
  walk(require("./clientError"), "/client-error", "ops", [], out);
  out.push(
    { method: "POST", path: "/csp-report", tag: "ops", guarded: false },
    { method: "GET", path: "/openapi.json", tag: "meta", guarded: false },
    { method: "GET", path: "/", tag: "meta", guarded: false },
    { method: "GET", path: "/confidentialitate", tag: "legal", guarded: false },
    { method: "GET", path: "/termeni", tag: "legal", guarded: false }
  );
  return out;
}

module.exports = { mountApi, listRoutes, definitions };
