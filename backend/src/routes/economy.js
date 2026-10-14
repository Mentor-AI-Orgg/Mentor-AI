const express = require('express');
const router = express.Router();
const { STUDENTS_ONLY } = require('../middleware/auth');
const { accountIsOpen } = require('../data/authStore');
const { validateBody } = require('../middleware/validate');
const { claimSchema, buySchema, equipSchema, progressSchema } = require('../validation/schemas');
const {
  getSummary,
  getCatalog,
  purchaseItem,
  equipCosmetic,
  getInventory,
  claimReward,
  recordProgress,
  logActivity,
  getNotifications,
  markNotificationRead,
  sendParentReview,
  seePraise
} = require('../data/economyStore');
const { notifyParent, ALLOWED_TYPES } = require('../notify/parentActivity');

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
  const summary = getSummary(req.auth.email, patch);
  try {
    const { issueStudentNudge } = require('../notify/studentReminders');
    const issued = issueStudentNudge(req.auth.email, { summary });
    if (issued?.nudge) summary.nudge = issued.nudge;
  } catch {
    /* reminder-ul nu trebuie să dărâme Acasă */
  }
  res.json({ summary });
});

router.get('/catalog', (req, res) => {
  res.json(getCatalog());
});

router.get('/inventory', (req, res) => {
  res.json(getInventory(req.auth.email));
});

router.post('/praise-seen', (req, res) => {
  res.json(seePraise(req.auth.email));
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

router.post('/claim', validateBody(claimSchema), async (req, res) => {
  const { type, ...payload } = req.body || {};
  if (!type) {
    return res.status(400).json({ error: 'Tipul recompensei este obligatoriu.' });
  }
  const result = claimReward({ userId: req.auth.email, type, payload });
  if (result.ok) {
    await notifyParent({
      studentEmail: req.auth.email,
      type: 'claim',
      note: `Recompensă: ${type}`,
      meta: { type }
    });
  }
  res.status(result.ok ? 200 : 400).json(result);
});

function blockPending(req, res) {
  if (!accountIsOpen(req.auth.account)) {
    res.status(403).json({ error: 'consent_pending' });
    return true;
  }
  return false;
}

router.post('/buy', validateBody(buySchema), async (req, res) => {
  if (blockPending(req, res)) return;
  const { item_id } = req.body || {};
  if (!item_id) {
    return res.status(400).json({ error: 'item_id este obligatoriu.' });
  }
  const result = purchaseItem({ userId: req.auth.email, itemId: item_id });
  if (result.ok) {
    await notifyParent({
      studentEmail: req.auth.email,
      type: 'buy',
      note: `Cumpărare: ${item_id}`,
      meta: { itemId: item_id }
    });
  }
  res.status(result.ok ? 200 : 400).json(result);
});

router.post('/equip', validateBody(equipSchema), (req, res) => {
  if (blockPending(req, res)) return;
  const { item_id, title_id, slot } = req.body || {};
  if (item_id === undefined && title_id === undefined && !slot) {
    return res.status(400).json({ error: 'Spune ce vrei să porți: item_id, title_id sau slot.' });
  }
  const result = equipCosmetic({
    userId: req.auth.email,
    itemId: item_id,
    titleId: title_id,
    slot
  });
  res.status(result.ok ? 200 : 400).json(result);
});

router.post('/parent-review', async (req, res) => {
  if (blockPending(req, res)) return;
  const { parent_email = '', plan_id = '', billing_cycle = 'monthly', message = '' } = req.body || {};
  const result = await sendParentReview({
    userId: req.auth.email,
    parentEmail: parent_email,
    planId: plan_id,
    billingCycle: billing_cycle,
    role: req.auth.role,
    message
  });
  res.json(result);
});

// Legarea directă din client nu mai există. Ruta răspunde explicit.
router.post('/connect-child', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

router.post('/preferences', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

function rejectClientChapterTest(type, res) {
  if (type !== 'chapter_test') return false;
  res.status(400).json({ error: 'Nota la testul de capitol se calculează la finalizare, pe server.' });
  return true;
}

router.post('/progress', validateBody(progressSchema), async (req, res) => {
  const { type, note = '', meta = {} } = req.body || {};
  if (type === 'mentor_message') {
    return res.status(400).json({ error: 'Recompensa pentru mentor se acordă doar din conversație.' });
  }
  if (rejectClientChapterTest(type, res)) return;
  const result = recordProgress({ userId: req.auth.email, type, note, meta });
  const parentNotify = await notifyParent({
    studentEmail: req.auth.email,
    type,
    note,
    meta
  });
  res.json({
    success: true,
    ...result,
    parentNotified: !parentNotify.skipped,
    parentNotify: {
      skipped: parentNotify.skipped,
      reason: parentNotify.reason || null
    }
  });
});

router.post('/activity', async (req, res) => {
  const { type, meta = {} } = req.body || {};
  if (!type || !ALLOWED_TYPES.has(type)) {
    return res.status(400).json({ error: 'Tip de activitate necunoscut.' });
  }
  if (rejectClientChapterTest(type, res)) return;
  const result = logActivity({ userId: req.auth.email, type, note: '', meta, amount: 0 });
  const parentNotify = await notifyParent({
    studentEmail: req.auth.email,
    type,
    meta
  });
  res.json({
    success: true,
    ...result,
    parentNotified: !parentNotify.skipped,
    parentNotify: {
      skipped: parentNotify.skipped,
      reason: parentNotify.reason || null,
      delivery: parentNotify.delivery || null
    }
  });
});

router.get('/parent-analytics', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

router.get('/teacher-analytics', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

router.post('/request-test', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

router.post('/access-code/request', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

router.post('/access-code/verify', (_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
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
