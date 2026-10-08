import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { sampleCollections, EMAIL } from "./mysqlFixture.js";

const nodeRequire = createRequire(import.meta.url);
const rows = nodeRequire("../backend/src/data/mysql/rows.js");
const { statements } = nodeRequire("../backend/src/data/mysql/ddl.js");

function roundTrip(collections) {
  const buckets = rows.splitDocument({ collections });
  const sqlRows = {};
  Object.keys(buckets).forEach(table => {
    sqlRows[table] = buckets[table].map(row => rows.normalizeRow(table, row));
  });
  return rows.joinDocument(sqlRows, Object.keys(collections));
}

describe("rânduri MySQL", () => {
  it("are în DDL fiecare coloană din schemă", () => {
    const sqls = statements();
    Object.entries(rows.SCHEMA).forEach(([table, spec]) => {
      const sql = sqls.find(item => item.startsWith(`CREATE TABLE IF NOT EXISTS \`${table}\``));
      expect(sql, table).toBeTruthy();
      spec.columns.forEach(column => {
        expect(sql).toContain(`${column} `);
      });
    });
  });

  it("duce un document complet până la snapshot și înapoi", () => {
    const collections = sampleCollections();
    expect(roundTrip(collections)).toEqual(collections);
  });

  it("ține sesiunea și resetul cu același hash în tabele diferite", () => {
    const buckets = rows.splitDocument({ collections: sampleCollections() });
    expect(buckets.sessions).toHaveLength(1);
    expect(buckets.reset_tokens).toHaveLength(1);
    expect(buckets.sessions[0].token_hash).toBe(buckets.reset_tokens[0].token_hash);
    expect(buckets.sessions[0].payload).not.toBe(buckets.reset_tokens[0].payload);
    const joined = roundTrip(sampleCollections());
    expect(joined.auth.sessions[buckets.sessions[0].token_hash].expiresAt).toBe(1700000000000);
    expect(joined.auth.resets[buckets.reset_tokens[0].token_hash].expiresAt).toBe(1700000001000);
  });

  it("scrie un singur rând când se schimbă clasa, apoi nimic", () => {
    const collections = sampleCollections();
    const previous = rows.indexBuckets(rows.splitDocument({ collections }));
    collections.auth.accounts[EMAIL].profile.class = "6";
    const plan = rows.planChange(previous, collections);
    expect(plan.rows).toBe(1);
    expect(plan.upserts).toEqual([expect.objectContaining({ table: "accounts" })]);
    const again = rows.planChange(plan.nextCache, collections);
    expect(again.rows).toBe(0);
  });

  it("șterge rândul contului când dispare cheia", () => {
    const collections = sampleCollections();
    const previous = rows.indexBuckets(rows.splitDocument({ collections }));
    delete collections.auth.accounts[EMAIL];
    const plan = rows.planChange(previous, collections);
    expect(plan.rows).toBe(1);
    expect(plan.deletes.some(key => key.startsWith("accounts\u001f"))).toBe(true);
    expect(plan.upserts).toHaveLength(0);
  });

  it("taie spațiile cu care MariaDB umple CHAR", () => {
    const row = rows.normalizeRow("sessions", {
      token_hash: `${"ab".repeat(32)}  `,
      account_id: `${"cd".repeat(16)} `,
      expires_at: "10",
      payload: "{\"email\":\"elev@example.com\"} "
    });
    expect(row.token_hash).toHaveLength(64);
    expect(row.account_id).toHaveLength(32);
    expect(row.expires_at).toBe(10);
    expect(row.payload.endsWith(" ")).toBe(true);
  });
});
