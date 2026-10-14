// Lista de fișiere din frontend/dist/assets, scrisă la build lângă build-id.json.
// Dacă id-ul din fișier nu e build-ul pe care îl servește procesul, lista nu e „curentă”.

const fs = require("fs");
const path = require("path");
const { currentBuildId } = require("./buildId");

const DEFAULT_FILE = path.join(__dirname, "..", "..", "..", "frontend", "dist", "asset-manifest.json");

let testManifest;

function cleanBuild(value) {
  const id = String(value || "").trim().slice(0, 40);
  if (!/^[A-Za-z0-9._-]+$/.test(id)) return "";
  return id;
}

function cleanFile(value) {
  const raw = String(value || "");
  if (raw.includes("/") || raw.includes("\\")) return "";
  if (!/^[A-Za-z0-9._-]{1,80}$/.test(raw)) return "";
  if (!/\.(?:js|mjs|css)$/.test(raw)) return "";
  return raw;
}

function normalizeManifest(source) {
  const body = source && typeof source === "object" ? source : {};
  const files = Array.isArray(body.files) ? body.files.map(cleanFile).filter(Boolean) : [];
  return { build: cleanBuild(body.build), files };
}

function loadAssetManifest(filePath) {
  try {
    return normalizeManifest(JSON.parse(fs.readFileSync(filePath, "utf8")));
  } catch {
    return { build: "", files: [] };
  }
}

function manifestSource() {
  if (testManifest !== undefined) return normalizeManifest(testManifest);
  const filePath = process.env.ASSET_MANIFEST_PATH || DEFAULT_FILE;
  return loadAssetManifest(filePath);
}

function currentAssetNames() {
  const manifest = manifestSource();
  if (manifest.build && manifest.build !== currentBuildId()) return new Set();
  return new Set(manifest.files);
}

function setAssetManifestForTests(manifest) {
  testManifest = manifest;
}

module.exports = {
  cleanBuild,
  cleanFile,
  loadAssetManifest,
  currentAssetNames,
  setAssetManifestForTests
};
