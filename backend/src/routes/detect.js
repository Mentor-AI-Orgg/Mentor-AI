const express = require("express");
const router = express.Router();
const { detect } = require("../services/detectService");

router.post("/", async (req, res) => {
  const { text } = req.body || {};
  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: "Textul trebuie să aibă minim 20 de caractere." });
  }
  const result = await detect({ text });
  res.json(result);
});

module.exports = router;
