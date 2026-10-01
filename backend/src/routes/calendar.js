const express = require("express");
const router = express.Router();
const store = require("../data/calendarStore");
const { validateBody } = require("../middleware/validate");
const { calendarEventSchema, calendarPatchSchema } = require("../validation/schemas");
const { notifyParent } = require("../notify/parentActivity");
const { obviouslyInappropriate } = require("../safety/usernamePolicy");

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
  const rejected = obviouslyInappropriate(title);
  if (rejected) return res.status(400).json({ error: rejected });
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
  const rejected = obviouslyInappropriate(req.body?.title);
  if (rejected) return res.status(400).json({ error: rejected });
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

router.post("/connect", (_req, res) => {
  res.status(410).json({
    error: "Calendarul stă doar în aplicație. Nu se conectează la Google sau la alt serviciu."
  });
});

router.post("/disconnect", (_req, res) => {
  res.status(410).json({
    error: "Calendarul stă doar în aplicație. Nu există o legătură externă de închis."
  });
});

module.exports = router;
