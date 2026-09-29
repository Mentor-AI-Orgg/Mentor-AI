// Decriptează o copie zilnică pe laptop, cu cheia privată.
// node scripts/backup-restore.mjs --copie fisier.enc --cheie backup-private.pem --iesire mentor-ai.json [--curent mentor-ai.json] [--registru stergeri.json]

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { decryptPayload, applyDeletionRegistry } = require("../backend/src/ops/backup.js");

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    out[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return out;
}

function recordsFrom(file) {
  if (!file) return [];
  const parsed = JSON.parse(readFileSync(file, "utf8"));
  if (Array.isArray(parsed)) return parsed;
  return parsed?.collections?.deletions?.records || [];
}

const flags = args(process.argv.slice(2));
if (!flags.copie || !flags.cheie || !flags.iesire) {
  process.stderr.write("Folosire: node scripts/backup-restore.mjs --copie copie.enc --cheie backup-private.pem --iesire mentor-ai.json [--curent mentor-ai.json] [--registru stergeri.json]\n");
  process.exit(1);
}

const packed = readFileSync(flags.copie);
const privateKey = readFileSync(flags.cheie, "utf8");
const opened = decryptPayload(packed, privateKey);
const data = JSON.parse(opened.plain.toString("utf8"));
const registry = [
  ...(data?.collections?.deletions?.records || []),
  ...recordsFrom(flags.curent),
  ...recordsFrom(flags.registru)
];
const restored = applyDeletionRegistry(data, registry, opened.header.createdAt);
writeFileSync(flags.iesire, `${JSON.stringify(restored.data, null, 2)}\n`);
process.stdout.write(`Gata. Suma verificată. Conturi scoase pentru că au fost șterse după copie: ${restored.removed.length}\n`);
