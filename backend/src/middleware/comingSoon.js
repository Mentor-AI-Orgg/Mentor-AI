const crypto = require("crypto");
const { comingSoonPage, robotsTxt } = require("../comingSoonPage");

const PREVIEW_COOKIE = "mentor_preview";
const processPreviewSecret = crypto.randomBytes(32).toString("hex");

const SKIP_PATHS = new Set([
  "/privacy.html",
  "/terms.html",
  "/fonts/faces.css",
  "/api/health",
  "/api/v1/health",
  "/api/client-error",
  "/api/v1/client-error"
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

function configuredPreviewPassword() {
  return String(process.env.PREVIEW_PASSWORD || "").trim();
}

function previewSecret() {
  return String(process.env.PREVIEW_COOKIE_SECRET || "").trim() || processPreviewSecret;
}

function passwordMatches(submitted) {
  const configured = configuredPreviewPassword();
  if (!configured || !submitted) return false;
  return safeEqual(submitted, configured);
}

function previewToken() {
  return crypto.createHmac("sha256", previewSecret()).update("suntde10-preview").digest("hex");
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  };
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
  const cookie = readCookie(req, PREVIEW_COOKIE);
  return Boolean(cookie) && safeEqual(cookie, expected);
}

function submittedPassword(req) {
  if (req.method !== "POST") return "";
  return String(req.body?.password || "").trim();
}

function grantPreview(res, nextPath = "/") {
  res.cookie(PREVIEW_COOKIE, previewToken(), {
    ...cookieOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  res.redirect(303, nextPath);
}

function clearPreview(res) {
  res.clearCookie(PREVIEW_COOKIE, cookieOptions());
  res.redirect(303, "/");
}

function normalizePath(req) {
  const raw = String(req.path || "/");
  if (raw.length > 1 && raw.endsWith("/")) return raw.slice(0, -1);
  return raw;
}

function comingSoon() {
  return (req, res, next) => {
    if (!isSiteClosed()) return next();

    const path = normalizePath(req);
    if (SKIP_PATHS.has(path) || path.startsWith("/fonts/")) return next();

    if (path === "/robots.txt") {
      res.set("X-Robots-Tag", "noindex, nofollow");
      return res.type("text/plain").send(robotsTxt());
    }

    if (path === "/creator/iesire") {
      return clearPreview(res);
    }

    const submitted = submittedPassword(req);
    if (submitted) {
      if (passwordMatches(submitted)) {
        return grantPreview(res, "/");
      }
      res.set("X-Robots-Tag", "noindex, nofollow");
      return res.status(401).type("html").send(comingSoonPage({
        creatorPage: path === "/creator",
        previewError: "Parola de creator nu e corectă."
      }));
    }

    if (hasPreviewAccess(req)) {
      req.previewAccess = true;
      if (path === "/creator") {
        return res.redirect(303, "/");
      }
      return next();
    }

    if (path.startsWith("/api")) {
      return res.status(503).json({
        error: "Site-ul e în lucru.",
        comingSoon: true
      });
    }

    res.set("X-Robots-Tag", "noindex, nofollow");
    return res.status(200).type("html").send(comingSoonPage({
      creatorPage: path === "/creator"
    }));
  };
}

function creatorRequired(req, res, next) {
  if (!hasPreviewAccess(req)) {
    return res.status(403).json({ error: "Acces de creator necesar.", code: "creator_required" });
  }
  next();
}

module.exports = {
  comingSoon,
  creatorRequired,
  isSiteClosed,
  PREVIEW_COOKIE,
  previewToken,
  hasPreviewAccess
};
