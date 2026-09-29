const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "..", "..", "shared", "mascot.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const MASCOT_NAME = String(data.MASCOT_NAME || "").trim();

module.exports = { MASCOT_NAME };
