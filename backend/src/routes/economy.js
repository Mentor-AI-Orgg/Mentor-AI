const express = require('express');
const router = express.Router();
const { roleGuard } = require('../middleware/auth');
const {
  getSummary,
  getCatalog,
  purchaseItem,
  getInventory,
  claimReward,
  logActivity,
  getNotifications,
  markNotificationRead,
  connectParentChild,
  updateNotificationPreferences,
  getParentAnalytics,
  sendParentReview,
  getTeacherAnalytics,
  requestTest,
  generateAccessCode,
  verifyAccessCode
} = require('../data/economyStore');

// Toate rutele de aici sunt montate în spatele `authRequired` (vezi
// backend/server.js), deci `req.auth` există mereu. Identitatea vine exclusiv
// din sesiune: niciun handler nu mai citește `user_id` din query sau body.

router.get('/summary', (req, res) => {
  // Rolul vine din contul salvat, iar monedele și metricile nu mai pot fi
  // trimise de client. Înainte, un simplu `?coins=999999` îi lăsa oricui
  // balanța la ce voia, iar `?role=teacher` îi schimba rolul în magazin.
  const patch = {
    role: req.auth.role,
    guardianName: req.query.guardian_name,
    className: req.query.class_name,
    profileName: req.query.profile_name
  };
  res.json({ summary: getSummary(req.auth.email, patch) });
});

router.get('/catalog', (req, res) => {
  res.json(getCatalog());
});

router.get('/inventory', (req, res) => {
  res.json(getInventory(req.auth.email));
});

router.get('/notifications', (req, res) => {
  res.json(getNotifications(req.auth.email));
});

router.post('/notifications/:notificationId/read', (req, res) => {
  // Verificăm întâi că notificarea îi aparține. Fără asta, oricine cu un id
  // de notificare putea marca drept citit mesajul altcuiva.
  const owned = getNotifications(req.auth.email).inbox
    .some(entry => entry.id === req.params.notificationId);
  if (!owned) {
    return res.status(404).json({ error: 'Notificarea nu a fost găsită.' });
  }
  const notification = markNotificationRead(req.params.notificationId);
  res.json({ success: true, notification });
});

router.post('/claim', (req, res) => {
  const { type, ...payload } = req.body || {};
  if (!type) {
    return res.status(400).json({ error: 'Tipul recompensei este obligatoriu.' });
  }
  const result = claimReward({ userId: req.auth.email, type, payload });
  res.status(result.ok ? 200 : 400).json(result);
});

router.post('/buy', (req, res) => {
  const { item_id } = req.body || {};
  if (!item_id) {
    return res.status(400).json({ error: 'item_id este obligatoriu.' });
  }
  const result = purchaseItem({ userId: req.auth.email, itemId: item_id });
  res.status(result.ok ? 200 : 400).json(result);
});

router.post('/parent-review', (req, res) => {
  const { parent_email = '', plan_id = '', billing_cycle = 'monthly', message = '' } = req.body || {};
  const result = sendParentReview({
    userId: req.auth.email,
    parentEmail: parent_email,
    planId: plan_id,
    billingCycle: billing_cycle,
    role: req.auth.role,
    message
  });
  res.json(result);
});

// TODO(Faza 1, PR următor): legătura este încă unilaterală - părintele indică
// un email și conturile se leagă fără acceptul elevului. Rămâne de înlocuit cu
// invitație + confirmare din partea celuilalt cont.
router.post('/connect-child', roleGuard('parent'), (req, res) => {
  const { child_email = '' } = req.body || {};
  if (!child_email) {
    return res.status(400).json({ error: 'child_email este obligatoriu.' });
  }
  const result = connectParentChild({ parentEmail: req.auth.email, childEmail: child_email });
  if (!result) {
    return res.status(400).json({ error: 'Email-ul elevului este obligatoriu.' });
  }
  res.json({ success: true, connection: result });
});

router.post('/preferences', roleGuard('parent'), (req, res) => {
  const { preferences = {} } = req.body || {};
  const updated = updateNotificationPreferences({ parentEmail: req.auth.email, preferences });
  res.json({ success: true, preferences: updated });
});

router.post('/activity', (req, res) => {
  const { type, note = '', meta = {}, amount = 0 } = req.body || {};
  if (!type) {
    return res.status(400).json({ error: 'type este obligatoriu.' });
  }
  const result = logActivity({ userId: req.auth.email, type, note, meta, amount });
  res.json({ success: true, ...result });
});

// Analitica despre un copil este cea mai sensibilă parte a aplicației, deci
// cere rolul potrivit și se raportează strict la contul autentificat.
router.get('/parent-analytics', roleGuard('parent'), (req, res) => {
  res.json(getParentAnalytics(req.auth.email));
});

router.get('/teacher-analytics', roleGuard('teacher'), (req, res) => {
  res.json(getTeacherAnalytics(req.auth.email));
});

router.post('/request-test', roleGuard('parent', 'teacher'), (req, res) => {
  const { student_email = '', subject = '', note = '', due_date = '' } = req.body || {};
  if (!student_email) {
    return res.status(400).json({ error: 'student_email este obligatoriu.' });
  }
  const result = requestTest({
    requesterEmail: req.auth.email,
    requesterRole: req.auth.role,
    studentEmail: student_email,
    subject,
    note,
    dueDate: due_date
  });
  res.json({ success: true, ...result });
});

// Cod de acces temporar prin SMS (nu parola reala -- vezi economyStore.js).
router.post('/access-code/request', roleGuard('parent'), (req, res) => {
  const { child_email = '', phone = '' } = req.body || {};
  if (!child_email) {
    return res.status(400).json({ error: 'child_email este obligatoriu.' });
  }
  const result = generateAccessCode({ parentEmail: req.auth.email, childEmail: child_email, phone });
  res.json(result || { ok: false, reason: 'invalid_request' });
});

router.post('/access-code/verify', roleGuard('parent'), (req, res) => {
  const { child_email = '', code = '' } = req.body || {};
  const result = verifyAccessCode({ parentEmail: req.auth.email, childEmail: child_email, code });
  res.json(result);
});

router.post('/bootstrap', (req, res) => {
  const { guardian_name, class_name, profile_name } = req.body || {};
  const summary = getSummary(req.auth.email, {
    role: req.auth.role,
    guardianName: guardian_name,
    className: class_name,
    profileName: profile_name
  });
  res.json({ success: true, summary });
});

module.exports = router;
