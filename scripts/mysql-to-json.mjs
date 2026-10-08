// Scrie înapoi un mentor-ai.json din MySQL. Nu schimbă baza.
// Implicit nu se atinge de data/mentor-ai.json: ieșirea e un fișier nou.
//
//   node scripts/mysql-to-json.mjs
//   node scripts/mysql-to-json.mjs --out data/mentor-ai.from-mysql.json
//   node scripts/mysql-to-json.mjs --out data/mentor-ai.json --force

import { createRequire } from "node:module";
import { renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
require("dotenv").config({ path: path.join(root, "backend", ".env") });

const store = require("../backend/src/data/mysql/store");
const { mysqlConfig, mysqlConfigError } = require("../backend/src/data/storeMode");
const { summarize } = require("../backend/src/data/mysql/rows");

function option(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return "";
  return process.argv[index + 1] || "";
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

if (!mysqlConfig()) fail(mysqlConfigError());

const dest = path.resolve(root, option("--out") || path.join("data", "mentor-ai.from-mysql.json"));
const live = path.join(root, "data", "mentor-ai.json");
if (dest === live && !process.argv.includes("--force")) {
  fail("Nu suprascriu data/mentor-ai.json fără --force. Alege --out sau oprește aplicația și revino conștient.");
}

let failed = "";
try {
  const read = store.readDocument();
  if (!read) throw new Error("Baza nu are date.");
  const counts = summarize(read.document.collections);
  const temp = `${dest}.tmp`;
  writeFileSync(temp, JSON.stringify(read.document));
  renameSync(temp, dest);
  process.stdout.write(`Am scris ${dest}.\n`);
  process.stdout.write(`Conturi: ${counts.accounts}. Sesiuni: ${counts.sessions}. Economie: ${counts.economyUsers}. Evenimente: ${counts.events}. Memorie: ${counts.memory}.\n`);
  process.stdout.write("Baza MySQL nu a fost ștearsă.\n");
} catch (error) {
  failed = `Exportul a eșuat: ${error.message}`;
} finally {
  store.close();
}
if (failed) fail(failed);
