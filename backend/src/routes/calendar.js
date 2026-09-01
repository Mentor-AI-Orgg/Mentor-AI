const express = require("express");
const router = express.Router();
const store = require("../data/calendarStore");
const oauth = require("../calendar/oauth");
const { publicBaseUrl } = require("../publicUrl");
const { validateBody } = require("../middleware/validate");
const { calendarEventSchema, calendarPatchSchema } = require("../validation/schemas");
const { notifyParent } = require("../notify/parentActivity");

// Montat în spatele `authRequired`, deci `req.auth` există mereu. Înainte,
// user_id venea din query/body, deci oricine putea citi sau șterge
// evenimentele din calendarul altcuiva.
const resolveUserId = req => req.auth.email;

// GET /api/calendar/events?month=7&year=2026
router.get("/events", (req, res) => {
  const userId = resolveUserId(req);
  const all = store.getEvents(userId);
  const orar = all.filter(e => e.type === "orar");
  let events = all.filter(e => e.type !== "orar");

  const { month, year } = req.query;
  if (month && year) {
    const m = String(Number(month)).padStart(2, "0");
    events = events.filter(e => e.date && e.date.startsWith(`${year}-${m}`));
  }

  res.json({ events, orar, connections: store.getConnections(userId) });
});

// POST /api/calendar/events  { date: 'YYYY-MM-DD', title, type }
router.post("/events", validateBody(calendarEventSchema), async (req, res) => {
  const userId = resolveUserId(req);
  const { date, title, type, time, endTime, weekday, important, subject } = req.body || {};
  const event = store.addEvent(userId, { date, title, type, time, endTime, weekday, important, subject });
  await notifyParent({
    studentEmail: userId,
    type: "calendar_event",
    note: title || "Eveniment nou",
    meta: { date, eventType: type }
  });
  res.json({ success: true, event });
});

router.patch("/events/:eventId", validateBody(calendarPatchSchema), (req, res) => {
  const userId = resolveUserId(req);
  const event = store.updateEvent(userId, req.params.eventId, req.body || {});
  if (!event) return res.status(404).json({ error: "Evenimentul nu există." });
  res.json({ success: true, event });
});

// DELETE /api/calendar/events/:eventId
router.delete("/events/:eventId", (req, res) => {
  const userId = resolveUserId(req);
  const ok = store.deleteEvent(userId, req.params.eventId);
  res.json({ success: ok });
});

// GET /api/calendar/status
router.get("/status", (req, res) => {
  res.json({ connections: store.getConnections(resolveUserId(req)) });
});

// POST /api/calendar/connect  { provider: 'google' | 'notion' }
router.post("/connect", (req, res) => {
  const userId = resolveUserId(req);
  const { provider } = req.body || {};
  if (!["google", "notion"].includes(provider)) {
    return res.status(400).json({ error: "Provider necunoscut. Folosește 'google' sau 'notion'." });
  }

  if (oauth.isConfigured(provider)) {
    const oauthUrl = oauth.buildAuthorizeUrl({
      provider,
      email: userId,
      baseUrl: publicBaseUrl(req)
    });
    return res.json({
      success: true,
      mocked: false,
      oauth_url: oauthUrl,
      message: `Deschide URL-ul OAuth pentru a conecta ${provider === "google" ? "Google Calendar" : "Notion"}.`
    });
  }

  const result = store.connectProvider(userId, provider, { mocked: true });
  res.json({
    success: true,
    mocked: true,
    message: `Cont ${provider === "google" ? "Google Calendar" : "Notion Calendar"} conectat (mock). Adaugă GOOGLE_CLIENT_ID/SECRET sau NOTION_CLIENT_ID/SECRET pentru OAuth real.`,
    ...result
  });
});

// POST /api/calendar/disconnect { provider }
router.post("/disconnect", (req, res) => {
  const userId = resolveUserId(req);
  const { provider } = req.body || {};
  store.disconnectProvider(userId, provider);
  res.json({ success: true });
});

module.exports = router;
