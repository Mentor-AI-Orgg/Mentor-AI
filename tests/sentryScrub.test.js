import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const nodeRequire = createRequire(import.meta.url);
const { scrubSentryEvent, scrubText } = nodeRequire("../shared/sentryScrub.js");

describe("curățare Sentry", () => {
  it("scoate emailul, IP-ul, utilizatorul și firimiturile", () => {
    const text = scrubText("a căzut elev@example.com de la 10.1.2.3");
    expect(text).not.toContain("elev@example.com");
    expect(text).not.toContain("10.1.2.3");
    expect(text).toContain("[email]");
    expect(text).toContain("[ip]");

    const event = scrubSentryEvent({
      message: "mail elev@example.com",
      user: { email: "elev@example.com", ip_address: "10.1.2.3" },
      request: { url: "https://suntde10.ro/acord?token=secret" },
      breadcrumbs: [{ message: "chat: cât fac 2+2" }],
      extra: { username: "elev" },
      contexts: { device: { name: "telefon" } },
      server_name: "host",
      exception: {
        values: [{
          value: "eroare pentru elev@example.com",
          stacktrace: { frames: [{ filename: "app.js", vars: { email: "elev@example.com" } }] }
        }]
      }
    });
    expect(event.user).toBeUndefined();
    expect(event.request).toBeUndefined();
    expect(event.breadcrumbs).toBeUndefined();
    expect(event.extra).toBeUndefined();
    expect(event.message).not.toContain("elev@example.com");
    expect(event.exception.values[0].value).not.toContain("elev@example.com");
    expect(event.exception.values[0].stacktrace.frames[0].vars).toBeUndefined();
  });
});
