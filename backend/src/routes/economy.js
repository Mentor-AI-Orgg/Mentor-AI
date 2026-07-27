const express = require('express');
const router = express.Router();
const {
  ensureUser,
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

router.get('/summary', (req, res) => {
  const userId = req.query.user_id || 'demo_user';
  const patch = {
    role: req.query.role,
    parentEmail: req.query.parent_email,
    teacherEmail: req.query.teacher_email,
    guardianName: req.query.guardian_name,
    className: req.query.class_name,
    profileName: req.query.profile_name,
    streak: req.query.streak !== undefined ? Number(req.query.streak) : undefined,
    hoursToday: req.query.hours_today !== undefined ? Number(req.query.hours_today) : undefined,
    coins: req.query.coins !== undefined ? Number(req.query.coins) : undefined
  };
  res.json({ summary: getSummary(userId, patch) });
});

router.get('/catalog', (req, res) => {
  res.json(getCatalog());
});

router.get('/inventory', (req, res) => {
  const userId = req.query.user_id || 'demo_user';
  res.json(getInventory(userId));
});

router.get('/notifications', (req, res) => {
  const userId = req.query.user_id || 'demo_user';
  res.json(getNotifications(userId));
});

router.post('/notifications/:notificationId/read', (req, res) => {
  const notification = markNotificationRead(req.params.notificationId);
  if (!notification) {
    return res.status(404).json({ error: 'Notificarea nu a fost găsită.' });
  }
  res.json({ success: true, notification });
});

router.post('/claim', (req, res) => {
  const { user_id = 'demo_user', type, ...payload } = req.body || {};
  if (!type) {
    return res.status(400).json({ error: 'Tipul recompensei este obligatoriu.' });
  }
  const result = claimReward({ userId: user_id, type, payload });
  const status = result.ok ? 200 : 400;
  res.status(status).json(result);
});

router.post('/buy', (req, res) => {
  const { user_id = 'demo_user', item_id } = req.body || {};
  if (!item_id) {
    return res.status(400).json({ error: 'item_id este obligatoriu.' });
  }
  const result = purchaseItem({ userId: user_id, itemId: item_id });
  const status = result.ok ? 200 : 400;
  res.status(status).json(result);
});

router.post('/parent-review', (req, res) => {
  const { user_id = 'demo_user', parent_email = '', plan_id = '', billing_cycle = 'monthly', role = 'student', message = '' } = req.body || {};
  const result = sendParentReview({ userId: user_id, parentEmail: parent_email, planId: plan_id, billingCycle: billing_cycle, role, message });
  res.json(result);
});

router.post('/connect-child', (req, res) => {
  const { parent_email = '', child_email = '' } = req.body || {};
  const result = connectParentChild({ parentEmail: parent_email, childEmail: child_email });
  if (!result) {
    return res.status(400).json({ error: 'Email-ul părintelui și al elevului sunt obligatorii.' });
  }
  res.json({ success: true, connection: result });
});

router.post('/preferences', (req, res) => {
  const { parent_email = '', preferences = {} } = req.body || {};
  if (!parent_email) {
    return res.status(400).json({ error: 'parent_email este obligatoriu.' });
  }
  const updated = updateNotificationPreferences({ parentEmail: parent_email, preferences });
  res.json({ success: true, preferences: updated });
});

router.post('/activity', (req, res) => {
  const { user_id = 'demo_user', type, note = '', meta = {}, amount = 0 } = req.body || {};
  if (!type) {
    return res.status(400).json({ error: 'type este obligatoriu.' });
  }
  const result = logActivity({ userId: user_id, type, note, meta, amount });
  res.json({ success: true, ...result });
});

router.get('/parent-analytics', (req, res) => {
  const parentEmail = req.query.parent_email || 'demo_user';
  const result = getParentAnalytics(parentEmail);
  res.json(result);
});

router.get('/teacher-analytics', (req, res) => {
  const teacherEmail = req.query.teacher_email || 'demo_user';
  const result = getTeacherAnalytics(teacherEmail);
  res.json(result);
});

router.post('/request-test', (req, res) => {
  const { requester_email = '', requester_role = 'teacher', student_email = '', subject = '', note = '', due_date = '' } = req.body || {};
  if (!student_email) {
    return res.status(400).json({ error: 'student_email este obligatoriu.' });
  }
  const result = requestTest({ requesterEmail: requester_email, requesterRole: requester_role, studentEmail: student_email, subject, note, dueDate: due_date });
  res.json({ success: true, ...result });
});

// Cod de acces temporar prin SMS (nu parola reala -- vezi economyStore.js).
router.post('/access-code/request', (req, res) => {
  const { parent_email = '', child_email = '', phone = '' } = req.body || {};
  if (!parent_email || !child_email) {
    return res.status(400).json({ error: 'parent_email și child_email sunt obligatorii.' });
  }
  const result = generateAccessCode({ parentEmail: parent_email, childEmail: child_email, phone });
  res.json(result || { ok: false, reason: 'invalid_request' });
});

router.post('/access-code/verify', (req, res) => {
  const { parent_email = '', child_email = '', code = '' } = req.body || {};
  const result = verifyAccessCode({ parentEmail: parent_email, childEmail: child_email, code });
  res.json(result);
});

router.post('/bootstrap', (req, res) => {
  const { user_id = 'demo_user', role, parent_email, teacher_email, guardian_name, class_name, profile_name, streak, hours_today, coins } = req.body || {};
  const summary = getSummary(user_id, {
    role,
    parentEmail: parent_email,
    teacherEmail: teacher_email,
    guardianName: guardian_name,
    className: class_name,
    profileName: profile_name,
    streak: streak !== undefined ? Number(streak) : undefined,
    hoursToday: hours_today !== undefined ? Number(hours_today) : undefined,
    coins: coins !== undefined ? Number(coins) : undefined
  });
  res.json({ success: true, summary });
});

module.exports = router;
