const express = require("express");
const router = express.Router();
const { askWolfram } = require("../providers/wolfram");

router.post("/", async (req, res) => {
  const { query } = req.body || {};
  if (!query || !query.trim()) return res.status(400).json({ error: "Câmpul 'query' este obligatoriu." });
  const result = await askWolfram(query);
  res.json(result);
});

module.exports = router;
