// Generează perechea RSA-4096 pentru copiile zilnice.
// Rulează doar pe laptop: node scripts/backup-keygen.mjs [folder]

import { generateKeyPairSync } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2] || "backup-keys";
mkdirSync(out, { recursive: true });

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" }
});

const publicFile = join(out, "backup-public.pem");
const privateFile = join(out, "backup-private.pem");
writeFileSync(publicFile, publicKey);
writeFileSync(privateFile, privateKey, { mode: 0o600 });

process.stdout.write(`Cheia publică: ${publicFile}
Pune conținutul în DirectAdmin, la variabila BACKUP_PUBLIC_KEY,
sau urcă doar acest fișier ca backend/backup-public.pem.

Cheia privată: ${privateFile}
Stă doar la tine: pe laptop și încă o copie offline, de exemplu pe un stick.
Nu o urca pe server, nu o pune în git și nu o trimite pe email.
`);
