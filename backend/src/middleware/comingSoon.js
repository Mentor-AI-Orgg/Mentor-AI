const crypto = require("crypto");
const { comingSoonPage, robotsTxt } = require("../comingSoonPage");

const PREVIEW_COOKIE = "mentor_preview";

const SKIP_PATHS = new Set([
  "/api/health",
  "/api/v1/health",
  "/api/subscriptions/webhook",
  "/api/v1/subscriptions/webhook",
  "/api/calendar/oauth/google/callback",
  "/api/calendar/oauth/notion/callback",
  "/api/v1/calendar/oauth/google/callback",
  "/api/v1/calendar/oauth/notion/callback"
]);

function truthy(value) {
  return ["1", "true", "yes"].includes(String(value || "").trim().toLowerCase());
}

function safeEqual(a, b) {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

function isSiteClosed() {
  if (truthy(process.env.SITE_PUBLIC)) return false;
  if (truthy(process.env.SITE_CLOSED)) return true;
  return process.env.NODE_ENV === "production";
}

function previewPassword() {
  return String(process.env.PREVIEW_PASSWORD || "").trim();
}

function previewToken() {
  const secret = previewPassword();
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update("suntde10-preview").digest("hex");
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return "";
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) {
      try {
        return decodeURIComponent(part.slice(separator + 1).trim());
      } catch {
        return "";
      }
    }
  }
  return "";
}

function hasPreviewAccess(req) {
  const expected = previewToken();
  if (!expected) return false;
  const cookie = readCookie(req, PREVIEW_COOKIE);
  return Boolean(cookie) && safeEqual(cookie, expected);
}

function submittedPassword(req) {
  return String(req.query?.acces || req.query?.preview || req.body?.password || "").trim();
}

function grantPreview(res) {
  const token = previewToken();
  if (!token) return false;
  res.cookie(PREVIEW_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/"
  });
  res.redirect(303, "/");
  return true;
}

function comingSoon() {
  return (req, res, next) => {
    if (!isSiteClosed()) return next();
    if (SKIP_PATHS.has(req.path)) return next();

    if (req.path === "/robots.txt") {
      res.set("X-Robots-Tag", "noindex, nofollow");
      return res.type("text/plain").send(robotsTxt());
    }

    const password = previewPassword();
    const submitted = submittedPassword(req);
    if (password && submitted) {
      if (safeEqual(submitted, password)) {
        return grantPreview(res);
      }
      res.set("X-Robots-Tag", "noindex, nofollow");
      return res.status(401).type("html").send(comingSoonPage({
        previewEnabled: true,
        previewError: "Parola de lucru nu e corectă."
      }));
    }

    if (hasPreviewAccess(req)) return next();

    if (req.path.startsWith("/api")) {
      return res.status(503).json({
        error: "Site-ul e în lucru.",
        comingSoon: true
      });
    }

    res.set("X-Robots-Tag", "noindex, nofollow");
    return res.status(200).type("html").send(comingSoonPage({
      previewEnabled: Boolean(password)
    }));
  };
}

module.exports = {
  comingSoon,
  isSiteClosed,
  PREVIEW_COOKIE,
  previewToken
};
