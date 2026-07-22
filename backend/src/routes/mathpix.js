const express = require("express");
const router = express.Router();
const { recognizeImage } = require("../providers/mathpix");

router.post("/", async (req, res) => {
  const { image_base64 } = req.body || {};
  if (!image_base64) return res.status(400).json({ error: "Câmpul 'image_base64' este obligatoriu." });
  const result = await recognizeImage(image_base64);
  res.json(result);
});

module.exports = router;
