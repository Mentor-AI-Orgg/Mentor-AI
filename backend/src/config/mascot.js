const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "..", "..", "shared", "mascot.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const MASCOT_NAME = String(data.MASCOT_NAME || "").trim();

function possessiveName(name = MASCOT_NAME) {
  if (String(name).endsWith("a")) return `${String(name).slice(0, -1)}ei`;
  return String(name);
}

module.exports = { MASCOT_NAME, possessiveName };
