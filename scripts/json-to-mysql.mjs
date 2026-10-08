// Copiază data/mentor-ai.json în MySQL, o singură dată, fără să șteargă JSON-ul.
// Rulează din rădăcina repo-ului, cu STORE nefolosit: scriptul vorbește direct cu MySQL.
//
//   node scripts/json-to-mysql.mjs --dry-run
//   node scripts/json-to-mysql.mjs --file data/mentor-ai.json
//
// A doua rulare nu dublează rândurile. La final compară numărul și sumele.

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
require("dotenv").config({ path: path.join(root, "backend", ".env") });

const persistence = require("../backend/src/data/persistence");
const store = require("../backend/src/data/mysql/store");
const { mysqlConfig, mysqlConfigError } = require("../backend/src/data/storeMode");
const { summarize, compareCollections, FORMAT_VERSION } = require("../backend/src/data/mysql/rows");

function flag(name) {
  return process.argv.includes(name);
}

function option(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return "";
  return process.argv[index + 1] || "";
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function readJson() {
  const file = option("--file") || path.join(root, "data", "mentor-ai.json");
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Nu am putut citi ${file}: ${error.message}`);
  }
  if (!parsed || parsed.version !== FORMAT_VERSION || !parsed.collections) {
    fail("Fișierul nu este un mentor-ai.json de versiunea 1.");
  }
  const stripped = persistence.stripRemovedCollections(parsed);
  return { file, parsed, stripped };
}

const dryRun = flag("--dry-run");
const { file, parsed, stripped } = readJson();
const counts = summarize(parsed.collections);
const sums = compareCollections(parsed.collections, parsed.collections).left;

process.stdout.write(`Fișier: ${file}\n`);
if (stripped) process.stdout.write("Am scos din memorie colecțiile vechi (abonamente, invitații, conexiuni de calendar).\n");
process.stdout.write(`Conturi: ${counts.accounts}. Sesiuni: ${counts.sessions}. Economie: ${counts.economyUsers}. Evenimente: ${counts.events}. Memorie: ${counts.memory}.\n`);
Object.keys(sums).sort().forEach(name => {
  process.stdout.write(`Suma ${name}: ${sums[name]}\n`);
});

if (counts.accounts === 0 && !flag("--allow-empty") && !dryRun) {
  fail("Fișierul nu are conturi. Nu scriu. Dacă chiar vrei o bază goală, adaugă --allow-empty.");
}

if (dryRun) {
  process.stdout.write("dry-run: nu scriu în MySQL și nu șterg JSON-ul.\n");
  process.exit(0);
}

if (!mysqlConfig()) fail(mysqlConfigError());

let failed = "";
try {
  const written = store.writeDocument(parsed, { replaceAll: true });
  const read = store.readDocument();
  if (!read) throw new Error("După scriere, baza pare goală.");
  const check = compareCollections(parsed.collections, read.document.collections);
  const again = summarize(read.document.collections);
  process.stdout.write(written.saved
    ? `Am scris ${written.rows} rânduri.\n`
    : "Nimic de schimbat: rândurile erau deja la fel.\n");
  process.stdout.write(`Verificare: conturi ${again.accounts}, sesiuni ${again.sessions}, economie ${again.economyUsers}, evenimente ${again.events}, memorie ${again.memory}.\n`);
  if (!check.ok) {
    throw new Error(`Sumele nu se potrivesc: ${check.mismatches.join(", ")}. JSON-ul a rămas pe disc.`);
  }
  process.stdout.write("Verificat: sumele coincid. JSON-ul nu a fost șters.\n");
} catch (error) {
  failed = `Migrarea a eșuat: ${error.message}. JSON-ul nu a fost șters.`;
} finally {
  store.close();
}
if (failed) fail(failed);
