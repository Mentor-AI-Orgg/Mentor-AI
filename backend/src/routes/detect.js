const express = require("express");
const router = express.Router();
const { detect } = require("../services/detectService");
const { validateBody } = require("../middleware/validate");
const { detectSchema } = require("../validation/schemas");

router.post("/", validateBody(detectSchema), async (req, res) => {
  const { text } = req.body || {};
  const result = await detect({ text });
  res.json(result);
});

module.exports = router;
