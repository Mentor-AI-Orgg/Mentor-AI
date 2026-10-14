const express = require("express");
const router = express.Router();

const { findAccount, listAccounts, normalizeEmail } = require("../data/authStore");
const { publicId, setSettings, getSettings, consumePrivatizeToken } = require("../data/friendStore");
const { getUser, praiseChild } = require("../data/economyStore");
const { validateBody } = require("../middleware/validate");
const { praiseSchema } = require("../validation/schemas");
const { deliverMessage, warnIfSmtpMissing } = require("../notify/deliver");
const { publicBaseUrl } = require("../publicUrl");
const {
  issueMagicToken,
  consumeMagicToken,
  createParentSession,
  destroyParentSession
} = require("../data/consentStore");
const { PARENT_COOKIE, parentRequired } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimits");

const SAME = {
  success: true,
  message: "Dacă există un cont de părinte pentru adresa asta, primești un link. Verifică și în Spam."
};

const { sessionCookieOptions } = require("../http/sessionCookie");

function cookieOptions(maxAge, req) {
  return sessionCookieOptions(maxAge, req && req.get ? req.get("user-agent") : "");
}

function lessonsLast7Days(email) {
  const user = getUser(email);
  if (!user || !user.chapters) return 0;
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return Object.values(user.chapters).filter(chapter => Date.parse(chapter.at || "") >= cutoff).length;
}

function childCard(email) {
  const account = findAccount(email);
  if (!account || account.role !== "student") return null;
  return {
    id: publicId(account.email),
    username: account.profile.username || "",
    class: account.profile.class || "",
    createdAt: account.createdAt,
    lessonsLast7Days: lessonsLast7Days(account.email),
    emails: ["weekly", "daily", "off"].includes(account.profile.parentEmails) ? account.profile.parentEmails : "weekly",
    dailyLimit: Number(account.profile.dailyLimit) || 0,
    profilePrivate: getSettings(account.email).profilePrivate !== false
  };
}

router.get("/make-private/:token", (req, res) => {
  const email = consumePrivatizeToken(req.params.token);
  const text = email
    ? "Profilul copilului este din nou privat."
    : "Linkul nu mai este valabil.";
  res.type("html").send(`<!DOCTYPE html><html lang="ro"><meta charset="utf-8"><title>Sunt de 10</title><body><p>${text}</p></body></html>`);
});

router.post("/unsubscribe", (req, res) => {
  const { consumeUnsubscribeToken } = require("../data/consentStore");
  const account = consumeUnsubscribeToken(String(req.body?.token || ""));
  if (!account) return res.status(400).json({ error: "Linkul nu mai este valabil." });
  account.profile.parentEmails = "off";
  res.json({ success: true, emails: false });
});

router.post("/magic", authLimiter, async (req, res) => {
  const email = normalizeEmail(req.body?.email || "");
  const account = findAccount(email);
  const smtpMissing = warnIfSmtpMissing("parent_magic");
  if (account && account.role === "parent") {
    const token = issueMagicToken(account.email);
    const link = `${publicBaseUrl(req)}/#/parinte/${token}`;
    if (process.env.NODE_ENV !== "production") console.log(`[DEV] ${link}`);
    if (!smtpMissing) {
      await deliverMessage({
        to: account.email,
        subject: "Intră în zona de părinte pe Sunt de 10",
        body: `Linkul este valabil 15 minute și se folosește o singură dată:\n${link}`,
        channel: "email",
        action: "parent_magic"
      });
    }
  }
  res.json(SAME);
});

router.post("/magic/consume", authLimiter, (req, res) => {
  const account = consumeMagicToken(req.body?.token || "");
  if (!account) return res.status(400).json({ error: "Linkul nu mai este valabil." });
  const { token, maxAge } = createParentSession(account.email);
  res.cookie(PARENT_COOKIE, token, cookieOptions(maxAge, req));
  res.json({ success: true });
});

router.post("/logout", parentRequired, (req, res) => {
  destroyParentSession(req.parentAuth.token);
  res.clearCookie(PARENT_COOKIE, cookieOptions(0, req));
  res.json({ success: true });
});

router.get("/me", parentRequired, (req, res) => {
  const children = (req.parentAuth.account.children || []).map(childCard).filter(Boolean);
  res.json({ children });
});

function ownedChild(req, id) {
  const parent = req.parentAuth.account;
  return (parent.children || [])
    .map(email => findAccount(email))
    .find(account => account && publicId(account.email) === id) || null;
}

function foreignChild(id) {
  return listAccounts().find(account => account.role === "student" && publicId(account.email) === id) || null;
}

router.post("/children/:id/emails", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  const cadence = ["weekly", "daily", "off"].includes(req.body?.cadence)
    ? req.body.cadence
    : (req.body?.emails === false ? "off" : "weekly");
  child.profile.parentEmails = cadence;
  res.json({ success: true, emails: cadence });
});

router.post("/children/:id/privacy", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  if (req.body?.profilePrivate === false) {
    return res.status(400).json({ error: "Doar copilul poate face profilul public." });
  }
  setSettings(child.email, { profilePrivate: true });
  res.json({ success: true, profilePrivate: true });
});

// Lauda rămâne în aplicație. Nu trimitem email: limita e 500 pe zi.
router.post("/children/:id/praise", parentRequired, validateBody(praiseSchema), (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  const result = praiseChild(child.email, req.body.milestoneId, req.body.emoji);
  if (!result.ok) return res.status(404).json({ error: "Nu am găsit momentul." });
  res.json({ success: true });
});

router.get("/children/:id/panel", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  const { buildPanel } = require("../parent/panel");
  res.json(buildPanel(child.email));
});

router.post("/children/:id/limit", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  const minutes = [0, 30, 60, 90].includes(Number(req.body?.minutes)) ? Number(req.body.minutes) : 0;
  child.profile.dailyLimit = minutes;
  res.json({ success: true, dailyLimit: minutes });
});

router.post("/children/:id/friends", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) return res.status(404).json({ error: "Nu am găsit copilul." });
  const { setFriendAccess } = require("../parent/panel");
  const { respondRequest, removeFriendship } = require("../data/friendStore");
  const { findByUsername } = require("../data/authStore");
  if (req.body?.remove) {
    const other = findByUsername(req.body.remove);
    if (other) removeFriendship(child.email, other.email);
  }
  if (req.body?.requestId && req.body?.action) {
    respondRequest(child.email, req.body.requestId, req.body.action);
  }
  if (req.body?.enabled !== undefined) setFriendAccess(child.email, req.body.enabled);
  res.json({ success: true });
});

// Părintele primește progresul, nu conversația cu tutorele și nici bucățile
// din mesaje păstrate ca notă la mentor_message.
function withoutTutorContent(payload) {
  if (!payload || typeof payload !== "object") return payload;
  const next = { ...payload };
  delete next.conversatii;
  const activity = next.economie?.activitate;
  if (!Array.isArray(activity)) return next;
  next.economie = {
    ...next.economie,
    activitate: activity.map(entry => {
      if (!entry || entry.tip !== "mentor_message" || !("nota" in entry)) return entry;
      const cleaned = { ...entry };
      delete cleaned.nota;
      return cleaned;
    })
  };
  return next;
}

router.get("/children/:id/export", parentRequired, (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) {
    if (foreignChild(req.params.id)) return res.status(403).json({ error: "Nu poți vedea contul altui copil." });
    return res.status(404).json({ error: "Nu am găsit copilul." });
  }
  const { collectExport } = require("./account");
  res.setHeader("Content-Disposition", "attachment; filename=\"suntde10-date.json\"");
  res.json(withoutTutorContent(collectExport(child.email)));
});

router.post("/children/:id/delete", parentRequired, async (req, res) => {
  const child = ownedChild(req, req.params.id);
  if (!child) {
    if (foreignChild(req.params.id)) return res.status(403).json({ error: "Nu poți vedea contul altui copil." });
    return res.status(404).json({ error: "Nu am găsit copilul." });
  }
  if (String(req.body?.confirm || "") !== "ȘTERGE") {
    return res.status(400).json({ error: "Scrie ȘTERGE ca să confirmi." });
  }
  const { eraseAccount } = require("./account");
  const parentEmail = req.parentAuth.account.email;
  await eraseAccount(child.email);
  if (!findAccount(parentEmail)) {
    destroyParentSession(req.parentAuth.token);
    res.clearCookie(PARENT_COOKIE, cookieOptions(0, req));
  }
  res.json({ success: true, deleted: true });
});

module.exports = router;
