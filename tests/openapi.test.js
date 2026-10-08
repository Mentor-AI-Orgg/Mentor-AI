import { readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const nodeRequire = createRequire(import.meta.url);
const { listRoutes } = nodeRequire("../backend/src/routes/mounts.js");
const { spec, RETIRED, openapiPath } = nodeRequire("../backend/src/openapi.js");

describe("OpenAPI", () => {
  it("acoperă fiecare rută montată", () => {
    const routes = listRoutes();
    expect(routes.length).toBeGreaterThan(20);
    routes.forEach(route => {
      const specPath = openapiPath(route.path);
      const operation = spec.paths[specPath] && spec.paths[specPath][route.method.toLowerCase()];
      expect(operation, `${route.method} ${route.path}`).toBeTruthy();
      if (RETIRED.has(`${route.method} ${route.path}`)) {
        expect(operation.responses["410"]).toBeTruthy();
      }
    });
  });

  it("nu mai cheamă din client rutele scoase", () => {
    const client = readFileSync(path.join(process.cwd(), "frontend", "apiClient.js"), "utf8");
    RETIRED.forEach(item => {
      const routePath = item.slice(item.indexOf(" ") + 1);
      expect(client).not.toContain(routePath);
    });
  });
});
