const crypto = require("crypto");
const { comingSoonPage, robotsTxt } = require("../comingSoonPage");

const PREVIEW_COOKIE = "mentor_preview";
const DEFAULT_CREATOR_PASSWORD = "suntde10-creator";

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

function configuredPreviewPassword() {
  return String(process.env.PREVIEW_PASSWORD || "").trim();
}

function previewSecret() {
  return configuredPreviewPassword() || DEFAULT_CREATOR_PASSWORD;
}

function acceptedPasswords() {
  const passwords = [DEFAULT_CREATOR_PASSWORD];
  const configured = configuredPreviewPassword();
  if (configured) passwords.push(configured);
  const staging = String(process.env.STAGING_AUTH_PASSWORD || "").trim();
  if (staging) passwords.push(staging);
  return [...new Set(passwords)];
}

function passwordMatches(submitted) {
  if (!submitted) return false;
  return acceptedPasswords().some((candidate) => safeEqual(submitted, candidate));
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
  return String(req.query?.acces || req.query?.preview || req.body?.password || "").trim();
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
    if (SKIP_PATHS.has(path)) return next();

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

module.exports = {
  comingSoon,
  isSiteClosed,
  PREVIEW_COOKIE,
  DEFAULT_CREATOR_PASSWORD,
  previewToken,
  hasPreviewAccess
};
