// Citire și scriere MySQL. Cache-ul de hash-uri e ce e deja în bază,
// ca o salvare să scrie doar rândurile care s-au schimbat.

const { MIGRATIONS } = require("./ddl");
const bridge = require("./bridge");
const {
  SCHEMA,
  selectSql,
  bucketsFromSql,
  indexBuckets,
  planChange,
  upsertStatement,
  deleteStatement,
  joinDocument,
  summarize,
  compareCollections,
  FORMAT_VERSION
} = require("./rows");

const META_COLLECTIONS = "collections";
const META_SAVED_AT = "saved_at";
const META_VERSION = "version";

let cache = new Map();
let manifest = [];
let ready = false;
let hydrated = false;
let locked = false;
let drift = false;
let lastDocument = null;

function metaStatement(name, value) {
  return {
    sql: "INSERT INTO store_meta (name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)",
    params: [name, value]
  };
}

function ensureReady() {
  if (ready) return;
  const status = bridge.call("status");
  locked = Boolean(status && status.locked);
  if (locked) {
    ready = true;
    return;
  }
  const applied = new Set();
  try {
    const rows = bridge.call("query", { sql: "SELECT version FROM schema_migrations" });
    (rows || []).forEach(row => applied.add(Number(row.version)));
  } catch (error) {
    const text = String(error.message || "");
    const missing = /schema_migrations/i.test(text) || error.code === "ER_NO_SUCH_TABLE" || error.code === "1146";
    if (!missing) throw error;
  }
  // CREATE TABLE face commit implicit în MySQL, deci migrarea nu stă într-o tranzacție.
  MIGRATIONS.forEach(migration => {
    if (applied.has(migration.version)) return;
    migration.statements.forEach(sql => {
      bridge.call("query", { sql }, 120000);
    });
    bridge.call("query", {
      sql: "INSERT INTO schema_migrations (version, name) VALUES (?, ?)",
      params: [migration.version, migration.name]
    });
  });
  ready = true;
}

function loadSqlRows() {
  const queries = Object.keys(SCHEMA).map(name => ({ name, sql: selectSql(name) }));
  queries.push({ name: "store_meta", sql: "SELECT name, value FROM store_meta" });
  return bridge.call("queryAll", { queries }, 120000);
}

function metaMap(rows) {
  const out = {};
  (rows || []).forEach(row => {
    out[row.name] = row.value;
  });
  return out;
}

function remember(sqlRows) {
  const meta = metaMap(sqlRows.store_meta);
  let names = [];
  try {
    names = JSON.parse(meta[META_COLLECTIONS] || "[]");
  } catch {
    names = [];
  }
  manifest = Array.isArray(names) ? names : [];
  cache = indexBuckets(bucketsFromSql(sqlRows));
  drift = false;
  hydrated = true;
}

function ensureHydrated() {
  if (hydrated || locked) return;
  remember(loadSqlRows());
}

function readDocument() {
  ensureReady();
  const sqlRows = loadSqlRows();
  remember(sqlRows);
  const meta = metaMap(sqlRows.store_meta);
  const hasMeta = Boolean(meta[META_SAVED_AT] || meta[META_COLLECTIONS]);
  const hasRows = [...cache.keys()].length > 0;
  if (!hasMeta && !hasRows) {
    lastDocument = null;
    return null;
  }
  const document = {
    version: FORMAT_VERSION,
    savedAt: meta[META_SAVED_AT] || null,
    collections: joinDocument(sqlRows, manifest)
  };
  lastDocument = document;
  return { document, locked };
}

function lastReadDocument() {
  return lastDocument;
}

function hasDrift() {
  return drift;
}

function isLocked() {
  return locked;
}

function markDrift(memoryDocument) {
  const names = Object.keys(memoryDocument && memoryDocument.collections || {});
  const planned = planChange(cache, memoryDocument.collections || {}, { manifest, replaceAll: false });
  drift = planned.rows > 0 || names.some(name => !manifest.includes(name));
}

function rememberEmpty() {
  cache = new Map();
  manifest = [];
  drift = false;
  lastDocument = null;
  hydrated = true;
}

function writePlan(plan, savedAt) {
  if (locked) return { saved: false, reason: "locked", rows: 0 };
  if (!plan.upserts.length && !plan.deletes.length) {
    drift = false;
    return { saved: false, reason: "unchanged", rows: 0 };
  }
  const statements = [
    ...plan.deletes.map(deleteStatement),
    ...plan.upserts.map(item => upsertStatement(item.table, item.row)),
    metaStatement(META_VERSION, String(FORMAT_VERSION)),
    metaStatement(META_SAVED_AT, savedAt),
    metaStatement(META_COLLECTIONS, JSON.stringify(plan.manifest))
  ];
  bridge.call("transaction", { statements }, 120000);
  cache = plan.nextCache;
  manifest = plan.manifest;
  drift = false;
  return { saved: true, rows: plan.rows };
}

function writeCollections(collections, options = {}) {
  ensureReady();
  if (locked) return { saved: false, reason: "locked", rows: 0 };
  ensureHydrated();
  const savedAt = options.savedAt || new Date().toISOString();
  const plan = planChange(cache, collections || {}, {
    manifest,
    replaceAll: Boolean(options.replaceAll)
  });
  if (!plan.rows && !options.force) return { saved: false, reason: "unchanged", rows: 0 };
  if (!plan.rows && options.force) {
    bridge.call("transaction", {
      statements: [
        metaStatement(META_SAVED_AT, savedAt),
        metaStatement(META_COLLECTIONS, JSON.stringify(plan.manifest))
      ]
    });
    manifest = plan.manifest;
    drift = false;
    return { saved: true, rows: 0 };
  }
  return writePlan(plan, savedAt);
}

function writeDocument(document, options = {}) {
  const collections = document && document.collections ? document.collections : {};
  return writeCollections(collections, {
    ...options,
    replaceAll: options.replaceAll !== false,
    savedAt: document && document.savedAt ? document.savedAt : undefined
  });
}

function close() {
  ready = false;
  hydrated = false;
  locked = false;
  bridge.close();
}

module.exports = {
  ensureReady,
  readDocument,
  lastReadDocument,
  hasDrift,
  isLocked,
  markDrift,
  rememberEmpty,
  writeCollections,
  writeDocument,
  close,
  summarize,
  compareCollections
};
