const express = require("express");
const router = express.Router();
const { STUDENTS_ONLY } = require("../middleware/auth");

// Invitațiile părinte/profesor nu mai există: aplicația este doar pentru elevi.
// Părinții primesc email cu activitatea copilului, fără cont.
router.use((_req, res) => {
  res.status(410).json(STUDENTS_ONLY);
});

module.exports = router;
