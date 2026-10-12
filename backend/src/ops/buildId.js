const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "..", "..", "frontend", "dist", "build-id.json");

function clean(value) {
  const id = String(value || "").trim().slice(0, 40);
  if (!/^[A-Za-z0-9._-]+$/.test(id)) return "";
  return id;
}

function readBuildFile() {
  try {
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return clean(parsed && parsed.build);
  } catch {
    return "";
  }
}

function currentBuildId() {
  const fromEnv = clean(process.env.BUILD_ID);
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "test" || process.env.VITEST === "true") return "dev";
  return readBuildFile() || "dev";
}

module.exports = { currentBuildId, readBuildFile };
