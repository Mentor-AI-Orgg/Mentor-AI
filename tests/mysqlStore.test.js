import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { sampleCollections } from "./mysqlFixture.js";

const nodeRequire = createRequire(import.meta.url);
const store = nodeRequire("../backend/src/data/mysql/store.js");
const ORIGINAL_URL = process.env.MYSQL_URL || "";
const CONTRACT = "suntde10_contract";

function contractUrl(raw) {
  const url = new URL(raw);
  url.pathname = `/${CONTRACT}`;
  return url.toString();
}

function runNode(args, env, timeout = 60000) {
  return spawnSync(process.execPath, args, {
    cwd: path.resolve("."),
    env,
    encoding: "utf8",
    timeout
  });
}

describe.skipIf(!ORIGINAL_URL)("contract MySQL", () => {
  let url = "";
  let dir = "";

  beforeAll(async () => {
    url = contractUrl(ORIGINAL_URL);
    const mysql = nodeRequire("mysql2/promise");
    const admin = await mysql.createConnection(ORIGINAL_URL);
    await admin.query(
      `CREATE DATABASE IF NOT EXISTS \`${CONTRACT}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await admin.end();
    process.env.MYSQL_URL = url;
    delete process.env.STORE;
    dir = mkdtempSync(path.join(tmpdir(), "s10-mysql-"));
  }, 30000);

  afterAll(async () => {
    store.close();
    process.env.MYSQL_URL = ORIGINAL_URL;
    delete process.env.MYSQL_LOCK_WAIT_SECONDS;
    delete process.env.STORE;
    if (dir) rmSync(dir, { recursive: true, force: true });
    if (!ORIGINAL_URL) return;
    const mysql = nodeRequire("mysql2/promise");
    const admin = await mysql.createConnection(ORIGINAL_URL);
    await admin.query(`DROP DATABASE IF EXISTS \`${CONTRACT}\``);
    await admin.end();
  }, 30000);

  it("scrie și citește aceleași sume", () => {
    const collections = sampleCollections();
    const written = store.writeDocument({
      version: 1,
      savedAt: "2026-10-08T00:00:00.000Z",
      collections
    });
    expect(written.saved).toBe(true);
    const read = store.readDocument();
    expect(read.document.collections).toEqual(collections);
    expect(store.compareCollections(collections, read.document.collections).ok).toBe(true);
  }, 60000);

  it("actualizează un rând și șterge un cont fără să rescrie tot", () => {
    const collections = sampleCollections();
    collections.auth.accounts["elev@example.com"].profile.class = "6";
    const updated = store.writeDocument({ version: 1, collections });
    expect(updated.rows).toBe(1);
    delete collections.auth.accounts["elev@example.com"];
    const removed = store.writeDocument({ version: 1, collections });
    expect(removed.rows).toBe(1);
    const read = store.readDocument();
    expect(read.document.collections.auth.accounts["elev@example.com"]).toBeUndefined();
    const same = store.writeDocument({ version: 1, collections });
    expect(same.reason).toBe("unchanged");
  }, 60000);

  it("nu șterge celelalte colecții când se salvează doar una", () => {
    const partial = store.writeCollections({ smoke: { alice: { xp: 3 } } }, { replaceAll: false });
    expect(partial.saved).toBe(true);
    const read = store.readDocument();
    expect(read.document.collections.smoke.alice.xp).toBe(3);
    expect(read.document.collections.economy.users["elev@example.com"].xp).toBe(5);
  }, 60000);

  it("migrează JSON-ul idempotent și îl exportă înapoi", () => {
    store.close();
    const file = path.join(dir, "mentor-ai.json");
    const collections = sampleCollections();
    writeFileSync(file, JSON.stringify({
      version: 1,
      savedAt: "2026-10-08T00:00:00.000Z",
      collections
    }));
    const env = { ...process.env, MYSQL_URL: url, STORE: "" };
    const dry = runNode(["scripts/json-to-mysql.mjs", "--dry-run", "--file", file], {
      ...env,
      MYSQL_URL: ""
    });
    expect(dry.status, dry.stderr).toBe(0);
    expect(dry.stdout).toContain("nu scriu");

    const real = runNode(["scripts/json-to-mysql.mjs", "--file", file], env);
    expect(real.status, real.stderr).toBe(0);
    expect(real.stdout).toContain("Verificat");

    const second = runNode(["scripts/json-to-mysql.mjs", "--file", file], env);
    expect(second.status, second.stderr).toBe(0);
    expect(second.stdout).toContain("Nimic de schimbat");

    const out = path.join(dir, "back.json");
    const exported = runNode(["scripts/mysql-to-json.mjs", "--out", out], env);
    expect(exported.status, exported.stderr).toBe(0);
    const parsed = JSON.parse(readFileSync(out, "utf8"));
    expect(store.compareCollections(collections, parsed.collections).ok).toBe(true);
  }, 120000);

  it("ține fumul într-un proces separat", () => {
    store.close();
    const env = { ...process.env, STORE: "mysql", MYSQL_URL: url };
    const write = runNode(["tests/mysql-smoke.cjs", "write"], env);
    expect(write.status, write.stderr).toBe(0);
    const patch = runNode(["tests/mysql-smoke.cjs", "patch"], env);
    expect(patch.status, patch.stderr).toBe(0);
    const patched = JSON.parse(patch.stdout);
    expect(patched.saved).toBe(true);
    expect(patched.rows).toBeLessThanOrEqual(3);
    const read = runNode(["tests/mysql-smoke.cjs", "read"], env);
    expect(read.status, read.stderr).toBe(0);
    const loaded = JSON.parse(read.stdout);
    expect(loaded.bucket.alice.xp).toBe(5);
    expect(loaded.bucket.bob.xp).toBe(2);
  }, 120000);

  it("refuză scrierea când alt proces ține lacătul", async () => {
    store.close();
    const mysql = nodeRequire("mysql2/promise");
    const external = await mysql.createConnection(url);
    const [held] = await external.query("SELECT GET_LOCK('s10_store', 0) AS ok");
    expect(Number(held[0].ok)).toBe(1);
    process.env.MYSQL_LOCK_WAIT_SECONDS = "0";
    const refused = store.writeCollections({ smoke: { blocked: true } }, { replaceAll: false });
    expect(refused.reason).toBe("locked");
    await external.query("SELECT RELEASE_LOCK('s10_store')");
    await external.end();
    store.close();
    delete process.env.MYSQL_LOCK_WAIT_SECONDS;
  }, 60000);
});
