// Transformă snapshot-ul din memorie în rânduri și înapoi.
// Payload-ul JSON este sursa de adevăr la citire. Coloanele alăturate
// (monede, clasă, acord) sunt ca să poți căuta în MySQL fără să desfaci tot.

const crypto = require("crypto");

const LOCK_NAME = "s10_store";
const FORMAT_VERSION = 1;

const KNOWN = Object.freeze([
  "auth",
  "friends",
  "calendar",
  "memory",
  "consent",
  "economy",
  "moderare",
  "crisis",
  "deletions"
]);

const COLLECTION_TABLES = {
  auth: ["accounts", "sessions", "reset_tokens"],
  friends: ["friend_settings", "friend_lists", "friend_requests", "friend_sends", "friend_blocks", "friend_privatize"],
  calendar: ["calendar_events", "calendar_connections"],
  memory: ["memory_threads"],
  consent: ["consent_tokens", "consent_sends"],
  economy: ["economy_users", "economy_notifications", "economy_purchases"],
  moderare: ["moderation_reports", "moderation_log"],
  crisis: ["crisis_counts"],
  deletions: ["deletion_records"]
};

const SCHEMA = {
  accounts: {
    columns: ["id", "email", "username", "password_hash", "salt", "class_name", "parent_email", "consent_status", "suspended_until", "must_rename", "role", "payload"],
    pk: ["id"],
    numbers: ["must_rename"],
    nullable: ["suspended_until"]
  },
  sessions: {
    columns: ["token_hash", "account_id", "expires_at", "payload"],
    pk: ["token_hash"],
    numbers: ["expires_at"],
    nullable: ["account_id"]
  },
  reset_tokens: {
    columns: ["token_hash", "account_id", "expires_at", "payload"],
    pk: ["token_hash"],
    numbers: ["expires_at"],
    nullable: ["account_id"]
  },
  economy_users: {
    columns: ["account_id", "email", "coins", "xp", "inventory", "chapters", "activity_log", "payload"],
    pk: ["account_id"],
    numbers: ["coins", "xp"],
    nullable: []
  },
  economy_notifications: {
    columns: ["id", "account_id", "position", "payload"],
    pk: ["id"],
    numbers: ["position"],
    nullable: ["account_id"]
  },
  economy_purchases: {
    columns: ["purchase_key", "account_id", "payload"],
    pk: ["purchase_key"],
    numbers: [],
    nullable: ["account_id"]
  },
  friend_settings: {
    columns: ["account_id", "email", "payload"],
    pk: ["account_id"],
    numbers: [],
    nullable: []
  },
  friend_lists: {
    columns: ["account_id", "email", "payload"],
    pk: ["account_id"],
    numbers: [],
    nullable: []
  },
  friend_requests: {
    columns: ["id", "from_email", "to_email", "status", "position", "payload"],
    pk: ["id"],
    numbers: ["position"],
    nullable: []
  },
  friend_sends: {
    columns: ["email", "account_id", "payload"],
    pk: ["email"],
    numbers: [],
    nullable: ["account_id"]
  },
  friend_blocks: {
    columns: ["pair_hash", "pair", "position"],
    pk: ["pair_hash"],
    numbers: ["position"],
    nullable: []
  },
  friend_privatize: {
    columns: ["token_hash", "email", "expires_at", "payload"],
    pk: ["token_hash"],
    numbers: ["expires_at"],
    nullable: []
  },
  calendar_events: {
    columns: ["id", "account_id", "email", "event_date", "title", "event_type", "event_time", "position", "payload"],
    pk: ["id"],
    numbers: ["position"],
    nullable: ["account_id"]
  },
  calendar_connections: {
    columns: ["account_id", "email", "payload"],
    pk: ["account_id"],
    numbers: [],
    nullable: []
  },
  moderation_reports: {
    columns: ["id", "position", "payload"],
    pk: ["id"],
    numbers: ["position"],
    nullable: []
  },
  moderation_log: {
    columns: ["id", "position", "payload"],
    pk: ["id"],
    numbers: ["position"],
    nullable: []
  },
  memory_threads: {
    columns: ["id", "conversation_id", "account_id", "payload"],
    pk: ["id"],
    numbers: [],
    nullable: ["account_id"]
  },
  consent_tokens: {
    columns: ["kind", "token_hash", "account_id", "expires_at", "payload"],
    pk: ["kind", "token_hash"],
    numbers: ["expires_at"],
    nullable: ["account_id"]
  },
  consent_sends: {
    columns: ["scope", "send_key", "payload"],
    pk: ["scope", "send_key"],
    numbers: [],
    nullable: []
  },
  crisis_counts: {
    columns: ["day", "day_count"],
    pk: ["day"],
    numbers: ["day_count"],
    nullable: []
  },
  deletion_records: {
    columns: ["user_id_hash", "deleted_at", "position"],
    pk: ["user_id_hash", "position"],
    numbers: ["position"],
    nullable: []
  },
  collection_rows: {
    columns: ["collection", "row_key", "account_id", "payload"],
    pk: ["collection", "row_key"],
    numbers: [],
    nullable: ["account_id"]
  }
};

function accountId(email) {
  return crypto.createHash("sha256").update(String(email || "")).digest("hex").slice(0, 32);
}

function sha256(text) {
  return crypto.createHash("sha256").update(String(text)).digest("hex");
}

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(item => stable(item)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value === undefined ? null : value);
}

function checksum(value) {
  return sha256(stable(value));
}

function jsonText(value) {
  return JSON.stringify(value === undefined ? null : value);
}

function emptyBuckets() {
  const buckets = {};
  Object.keys(SCHEMA).forEach(table => {
    buckets[table] = [];
  });
  return buckets;
}

function tokenEmail(row) {
  if (!row || typeof row !== "object") return "";
  return row.childEmail || row.parentEmail || row.email || "";
}

function memoryAccountId(conversationId) {
  const id = String(conversationId || "");
  const splitAt = id.indexOf("::");
  if (splitAt <= 0) return null;
  const email = id.slice(0, splitAt);
  if (!email.includes("@")) return null;
  return accountId(email);
}

function purchaseAccountId(key) {
  const text = String(key || "");
  const email = text.split(":")[0];
  if (!email || !email.includes("@")) return null;
  return accountId(email);
}

function splitAuth(data, buckets) {
  const source = data || {};
  Object.entries(source.accounts || {}).forEach(([email, account]) => {
    const body = account || {};
    buckets.accounts.push({
      id: accountId(email),
      email,
      username: String(body.profile?.username || "").slice(0, 80),
      password_hash: String(body.passwordHash || ""),
      salt: String(body.salt || ""),
      class_name: String(body.profile?.class || "").slice(0, 32),
      parent_email: String(body.profile?.parentEmail || "").slice(0, 255),
      consent_status: String(body.consent?.status || "").slice(0, 32),
      suspended_until: body.suspendedUntil || null,
      must_rename: body.mustRename ? 1 : 0,
      role: String(body.role || "").slice(0, 16),
      payload: jsonText(body)
    });
  });
  Object.entries(source.sessions || {}).forEach(([tokenHash, session]) => {
    buckets.sessions.push({
      token_hash: tokenHash,
      account_id: session && session.email ? accountId(session.email) : null,
      expires_at: Number(session && session.expiresAt) || 0,
      payload: jsonText(session)
    });
  });
  Object.entries(source.resets || {}).forEach(([tokenHash, reset]) => {
    buckets.reset_tokens.push({
      token_hash: tokenHash,
      account_id: reset && reset.email ? accountId(reset.email) : null,
      expires_at: Number(reset && reset.expiresAt) || 0,
      payload: jsonText(reset)
    });
  });
}

function splitFriends(data, buckets) {
  const source = data || {};
  Object.entries(source.settings || {}).forEach(([email, settings]) => {
    buckets.friend_settings.push({
      account_id: accountId(email),
      email,
      payload: jsonText(settings)
    });
  });
  Object.entries(source.friends || {}).forEach(([email, list]) => {
    buckets.friend_lists.push({
      account_id: accountId(email),
      email,
      payload: jsonText(list)
    });
  });
  (Array.isArray(source.requests) ? source.requests : []).forEach((request, position) => {
    const body = request || {};
    buckets.friend_requests.push({
      id: String(body.id || `pos_${position}`).slice(0, 80),
      from_email: String(body.from || "").slice(0, 255),
      to_email: String(body.to || "").slice(0, 255),
      status: String(body.status || "").slice(0, 32),
      position,
      payload: jsonText(body)
    });
  });
  Object.entries(source.sends || {}).forEach(([email, row]) => {
    buckets.friend_sends.push({
      email: String(email).slice(0, 255),
      account_id: accountId(email),
      payload: jsonText(row)
    });
  });
  (Array.isArray(source.blocks) ? source.blocks : []).forEach((pair, position) => {
    const text = String(pair);
    buckets.friend_blocks.push({
      pair_hash: sha256(text),
      pair: text,
      position
    });
  });
  Object.entries(source.privatize || {}).forEach(([token, row]) => {
    buckets.friend_privatize.push({
      token_hash: String(token).slice(0, 128),
      email: String(row && row.email || "").slice(0, 255),
      expires_at: Number(row && row.expiresAt) || 0,
      payload: jsonText(row)
    });
  });
}

function splitCalendar(data, buckets) {
  const source = data || {};
  Object.entries(source.events || {}).forEach(([email, events]) => {
    (Array.isArray(events) ? events : []).forEach((event, position) => {
      const body = event || {};
      buckets.calendar_events.push({
        id: sha256(`${email}\0${body.id || ""}\0${position}`).slice(0, 40),
        account_id: accountId(email),
        email: String(email).slice(0, 255),
        event_date: String(body.date || "").slice(0, 32),
        title: String(body.title || "").slice(0, 200),
        event_type: String(body.type || "").slice(0, 40),
        event_time: String(body.time || "").slice(0, 64),
        position,
        payload: jsonText(body)
      });
    });
  });
  Object.entries(source.connections || {}).forEach(([email, connection]) => {
    buckets.calendar_connections.push({
      account_id: accountId(email),
      email: String(email).slice(0, 255),
      payload: jsonText(connection)
    });
  });
}

function splitMemory(data, buckets) {
  Object.entries(data || {}).forEach(([conversationId, messages]) => {
    buckets.memory_threads.push({
      id: sha256(conversationId),
      conversation_id: String(conversationId),
      account_id: memoryAccountId(conversationId),
      payload: jsonText(messages)
    });
  });
}

function splitConsentMap(kind, map, buckets) {
  Object.entries(map || {}).forEach(([tokenHash, row]) => {
    const email = tokenEmail(row);
    buckets.consent_tokens.push({
      kind,
      token_hash: String(tokenHash).slice(0, 64),
      account_id: email ? accountId(email) : null,
      expires_at: Number(row && row.expiresAt) || 0,
      payload: jsonText(row)
    });
  });
}

function splitConsent(data, buckets) {
  const source = data || {};
  splitConsentMap("consent", source.tokens, buckets);
  splitConsentMap("magic", source.magic, buckets);
  splitConsentMap("email_change", source.emailChanges, buckets);
  splitConsentMap("unsub", source.unsubs, buckets);
  splitConsentMap("parent_session", source.parentSessions, buckets);
  ["child", "parent"].forEach(scope => {
    Object.entries(source.sends && source.sends[scope] || {}).forEach(([key, row]) => {
      buckets.consent_sends.push({
        scope,
        send_key: String(key).slice(0, 255),
        payload: jsonText(row)
      });
    });
  });
}

function splitEconomy(data, buckets) {
  const source = data || {};
  Object.entries(source.users || {}).forEach(([email, user]) => {
    const body = user || {};
    buckets.economy_users.push({
      account_id: accountId(email),
      email: String(email).slice(0, 255),
      coins: Number(body.balance) || 0,
      xp: Number(body.xp) || 0,
      inventory: jsonText(body.inventory || []),
      chapters: jsonText(body.chapters || {}),
      activity_log: jsonText(body.activityLog || []),
      payload: jsonText(body)
    });
  });
  (Array.isArray(source.notifications) ? source.notifications : []).forEach((notification, position) => {
    const body = notification || {};
    const userId = body.userId || "";
    buckets.economy_notifications.push({
      id: String(body.id || `pos_${position}`).slice(0, 80),
      account_id: userId && String(userId).includes("@") ? accountId(userId) : null,
      position,
      payload: jsonText(body)
    });
  });
  Object.entries(source.purchases || {}).forEach(([key, purchase]) => {
    buckets.economy_purchases.push({
      purchase_key: String(key).slice(0, 255),
      account_id: purchaseAccountId(key),
      payload: jsonText(purchase)
    });
  });
}

function splitModeration(data, buckets) {
  const source = data || {};
  (Array.isArray(source.reports) ? source.reports : []).forEach((report, position) => {
    const body = report || {};
    buckets.moderation_reports.push({
      id: String(body.id || `pos_${position}`).slice(0, 80),
      position,
      payload: jsonText(body)
    });
  });
  (Array.isArray(source.log) ? source.log : []).forEach((entry, position) => {
    buckets.moderation_log.push({
      id: String(position),
      position,
      payload: jsonText(entry)
    });
  });
}

function splitCrisis(data, buckets) {
  Object.entries(data && data.counts || {}).forEach(([day, count]) => {
    buckets.crisis_counts.push({
      day: String(day).slice(0, 10),
      day_count: Number(count) || 0
    });
  });
}

function splitDeletions(data, buckets) {
  (Array.isArray(data && data.records) ? data.records : []).forEach((record, position) => {
    const body = record || {};
    buckets.deletion_records.push({
      user_id_hash: String(body.userIdHash || "").slice(0, 64),
      deleted_at: String(body.at || "").slice(0, 40),
      position
    });
  });
}

function splitGeneric(name, value, buckets) {
  const source = Array.isArray(value) ? { __array__: value } : (value && typeof value === "object" ? value : { __value__: value });
  Object.entries(source).forEach(([key, item]) => {
    const storedKey = String(key);
    let rowKey = storedKey;
    let payload = item;
    if (storedKey.length > 191) {
      rowKey = `h_${sha256(storedKey).slice(0, 40)}`;
      payload = { __wrapped: true, key: storedKey, value: item };
    }
    buckets.collection_rows.push({
      collection: String(name).slice(0, 64),
      row_key: rowKey,
      account_id: storedKey.includes("@") ? accountId(storedKey) : null,
      payload: jsonText(payload)
    });
  });
}

const SPLIT = {
  auth: splitAuth,
  friends: splitFriends,
  calendar: splitCalendar,
  memory: splitMemory,
  consent: splitConsent,
  economy: splitEconomy,
  moderare: splitModeration,
  crisis: splitCrisis,
  deletions: splitDeletions
};

function collectionsOf(document) {
  if (document && document.collections && typeof document.collections === "object") return document.collections;
  return document || {};
}

function splitDocument(document) {
  const buckets = emptyBuckets();
  const collections = collectionsOf(document);
  Object.entries(collections).forEach(([name, value]) => {
    if (SPLIT[name]) SPLIT[name](value, buckets);
    else splitGeneric(name, value, buckets);
  });
  return buckets;
}

const CHAR_COLUMNS = new Set([
  "accounts.id",
  "sessions.token_hash",
  "sessions.account_id",
  "reset_tokens.token_hash",
  "reset_tokens.account_id",
  "economy_users.account_id",
  "economy_notifications.account_id",
  "economy_purchases.account_id",
  "friend_settings.account_id",
  "friend_lists.account_id",
  "friend_sends.account_id",
  "friend_blocks.pair_hash",
  "calendar_events.id",
  "calendar_events.account_id",
  "calendar_connections.account_id",
  "memory_threads.id",
  "memory_threads.account_id",
  "consent_tokens.token_hash",
  "consent_tokens.account_id",
  "crisis_counts.day",
  "deletion_records.user_id_hash",
  "collection_rows.account_id"
]);

function normalizeRow(table, row) {
  const spec = SCHEMA[table];
  const numbers = new Set(spec.numbers || []);
  const nullable = new Set(spec.nullable || []);
  const out = {};
  spec.columns.forEach(column => {
    let value = row ? row[column] : null;
    if (Buffer.isBuffer(value)) value = value.toString("utf8");
    if (value === undefined) value = null;
    if (numbers.has(column)) {
      if (value == null || value === "") out[column] = 0;
      else out[column] = Number(value);
      return;
    }
    if (value == null) {
      out[column] = nullable.has(column) ? null : "";
      return;
    }
    const text = typeof value === "string" ? value : String(value);
    // CHAR pe MariaDB vine cu spații la dreapta. Hash-urile sunt lungime fixă.
    out[column] = CHAR_COLUMNS.has(`${table}.${column}`) ? text.replace(/\s+$/, "") : text;
  });
  return out;
}

function cacheKey(table, row) {
  const spec = SCHEMA[table];
  return [table, ...spec.pk.map(column => String(row[column] ?? ""))].join("\u001f");
}

function indexBuckets(buckets) {
  const map = new Map();
  Object.keys(SCHEMA).forEach(table => {
    (buckets[table] || []).forEach(row => {
      const normalized = normalizeRow(table, row);
      map.set(cacheKey(table, normalized), {
        hash: checksum(normalized),
        row: normalized,
        table
      });
    });
  });
  return map;
}

function bucketsFromSql(sqlRows) {
  const buckets = emptyBuckets();
  Object.keys(SCHEMA).forEach(table => {
    buckets[table] = (sqlRows[table] || []).map(row => normalizeRow(table, row));
  });
  return buckets;
}

function parsePayload(row) {
  if (!row || row.payload == null || row.payload === "") return null;
  return JSON.parse(row.payload);
}

function byPosition(rows) {
  return [...(rows || [])].sort((a, b) => Number(a.position) - Number(b.position));
}

function objectFrom(rows, keyColumn) {
  const out = {};
  (rows || []).forEach(row => {
    out[row[keyColumn]] = parsePayload(row);
  });
  return out;
}

function joinAuth(sqlRows) {
  const accounts = {};
  (sqlRows.accounts || []).forEach(row => {
    accounts[row.email] = parsePayload(row) || {};
  });
  return {
    accounts,
    sessions: objectFrom(sqlRows.sessions, "token_hash"),
    resets: objectFrom(sqlRows.reset_tokens, "token_hash")
  };
}

function joinFriends(sqlRows) {
  const settings = {};
  (sqlRows.friend_settings || []).forEach(row => {
    settings[row.email] = parsePayload(row);
  });
  const friends = {};
  (sqlRows.friend_lists || []).forEach(row => {
    friends[row.email] = parsePayload(row);
  });
  const sends = {};
  (sqlRows.friend_sends || []).forEach(row => {
    sends[row.email] = parsePayload(row);
  });
  const privatize = {};
  (sqlRows.friend_privatize || []).forEach(row => {
    privatize[row.token_hash] = parsePayload(row);
  });
  return {
    settings,
    friends,
    requests: byPosition(sqlRows.friend_requests).map(parsePayload),
    sends,
    blocks: byPosition(sqlRows.friend_blocks).map(row => row.pair),
    privatize
  };
}

function joinCalendar(sqlRows) {
  const events = {};
  byPosition(sqlRows.calendar_events).forEach(row => {
    if (!events[row.email]) events[row.email] = [];
    events[row.email].push(parsePayload(row));
  });
  const connections = {};
  (sqlRows.calendar_connections || []).forEach(row => {
    connections[row.email] = parsePayload(row);
  });
  return { events, connections };
}

function joinMemory(sqlRows) {
  const store = {};
  (sqlRows.memory_threads || []).forEach(row => {
    store[row.conversation_id] = parsePayload(row);
  });
  return store;
}

function consentMap(sqlRows, kind) {
  const out = {};
  (sqlRows.consent_tokens || []).filter(row => row.kind === kind).forEach(row => {
    out[row.token_hash] = parsePayload(row);
  });
  return out;
}

function joinConsent(sqlRows) {
  const sends = { child: {}, parent: {} };
  (sqlRows.consent_sends || []).forEach(row => {
    if (!sends[row.scope]) sends[row.scope] = {};
    sends[row.scope][row.send_key] = parsePayload(row);
  });
  return {
    tokens: consentMap(sqlRows, "consent"),
    magic: consentMap(sqlRows, "magic"),
    emailChanges: consentMap(sqlRows, "email_change"),
    unsubs: consentMap(sqlRows, "unsub"),
    parentSessions: consentMap(sqlRows, "parent_session"),
    sends
  };
}

function joinEconomy(sqlRows) {
  const users = {};
  (sqlRows.economy_users || []).forEach(row => {
    users[row.email] = parsePayload(row) || {};
  });
  const purchases = {};
  (sqlRows.economy_purchases || []).forEach(row => {
    purchases[row.purchase_key] = parsePayload(row);
  });
  return {
    users,
    notifications: byPosition(sqlRows.economy_notifications).map(parsePayload),
    purchases
  };
}

function joinModeration(sqlRows) {
  return {
    reports: byPosition(sqlRows.moderation_reports).map(parsePayload),
    log: byPosition(sqlRows.moderation_log).map(parsePayload)
  };
}

function joinCrisis(sqlRows) {
  const counts = {};
  (sqlRows.crisis_counts || []).forEach(row => {
    counts[row.day] = Number(row.day_count) || 0;
  });
  return { counts };
}

function joinDeletions(sqlRows) {
  return {
    records: byPosition(sqlRows.deletion_records).map(row => ({
      userIdHash: row.user_id_hash,
      at: row.deleted_at
    }))
  };
}

const JOIN = {
  auth: joinAuth,
  friends: joinFriends,
  calendar: joinCalendar,
  memory: joinMemory,
  consent: joinConsent,
  economy: joinEconomy,
  moderare: joinModeration,
  crisis: joinCrisis,
  deletions: joinDeletions
};

function emptyShape(name) {
  if (name === "auth") return { accounts: {}, sessions: {}, resets: {} };
  if (name === "friends") {
    return { settings: {}, friends: {}, requests: [], sends: {}, blocks: [], privatize: {} };
  }
  if (name === "calendar") return { events: {}, connections: {} };
  if (name === "memory") return {};
  if (name === "consent") {
    return {
      tokens: {},
      magic: {},
      emailChanges: {},
      unsubs: {},
      parentSessions: {},
      sends: { child: {}, parent: {} }
    };
  }
  if (name === "economy") return { users: {}, notifications: [], purchases: {} };
  if (name === "moderare") return { reports: [], log: [] };
  if (name === "crisis") return { counts: {} };
  if (name === "deletions") return { records: [] };
  return {};
}

function tableHasRows(name, sqlRows) {
  const tables = COLLECTION_TABLES[name] || [];
  return tables.some(table => (sqlRows[table] || []).length > 0);
}

function joinGeneric(sqlRows) {
  const grouped = {};
  (sqlRows.collection_rows || []).forEach(row => {
    if (!grouped[row.collection]) grouped[row.collection] = {};
    const parsed = parsePayload(row);
    if (parsed && typeof parsed === "object" && parsed.__wrapped && parsed.key) {
      grouped[row.collection][parsed.key] = parsed.value;
      return;
    }
    grouped[row.collection][row.row_key] = parsed;
  });
  Object.keys(grouped).forEach(name => {
    if (Object.keys(grouped[name]).length === 1 && Object.prototype.hasOwnProperty.call(grouped[name], "__array__")) {
      grouped[name] = grouped[name].__array__;
    }
  });
  return grouped;
}

function joinDocument(sqlRows, manifest) {
  const rows = sqlRows || {};
  const names = new Set(Array.isArray(manifest) ? manifest : []);
  const collections = {};
  KNOWN.forEach(name => {
    if (names.has(name) || tableHasRows(name, rows)) collections[name] = JOIN[name](rows);
  });
  const generic = joinGeneric(rows);
  Object.entries(generic).forEach(([name, value]) => {
    if (!SPLIT[name]) collections[name] = value;
  });
  names.forEach(name => {
    if (collections[name] === undefined) collections[name] = emptyShape(name);
  });
  return collections;
}

function tablesFor(names) {
  const tables = new Set();
  const generic = new Set();
  names.forEach(name => {
    if (COLLECTION_TABLES[name]) COLLECTION_TABLES[name].forEach(table => tables.add(table));
    else generic.add(name);
  });
  if (generic.size) tables.add("collection_rows");
  return { tables, generic };
}

function keyTouches(key, tables, generic) {
  const parts = String(key).split("\u001f");
  const table = parts[0];
  if (!tables.has(table)) return false;
  if (table !== "collection_rows") return true;
  return generic.has(parts[1]);
}

function planChange(previous, collections, options = {}) {
  const names = Object.keys(collections || {});
  const replaceAll = Boolean(options.replaceAll);
  const scopeNames = replaceAll ? [...new Set([...(options.manifest || []), ...names])] : names;
  const { tables, generic } = tablesFor(scopeNames);
  if (replaceAll) {
    (options.manifest || []).forEach(name => {
      if (!SPLIT[name] && !names.includes(name)) generic.add(name);
    });
    if (generic.size) tables.add("collection_rows");
  }
  const nextBuckets = splitDocument({ collections: collections || {} });
  const nextIndex = indexBuckets(nextBuckets);
  const upserts = [];
  const deletes = [];
  nextIndex.forEach((entry, key) => {
    if (!keyTouches(key, tables, generic)) return;
    const old = previous.get(key);
    if (old && old.hash === entry.hash) return;
    upserts.push({ table: entry.table, row: entry.row });
  });
  previous.forEach((_entry, key) => {
    if (!keyTouches(key, tables, generic)) return;
    if (!nextIndex.has(key)) deletes.push(key);
  });
  const nextCache = new Map(previous);
  previous.forEach((_entry, key) => {
    if (keyTouches(key, tables, generic)) nextCache.delete(key);
  });
  nextIndex.forEach((entry, key) => {
    if (keyTouches(key, tables, generic)) nextCache.set(key, entry);
  });
  const manifest = replaceAll
    ? names.slice()
    : [...new Set([...(options.manifest || []), ...names])];
  return { upserts, deletes, nextCache, manifest, rows: upserts.length + deletes.length };
}

function upsertStatement(table, row) {
  const spec = SCHEMA[table];
  const normalized = normalizeRow(table, row);
  const columns = spec.columns;
  const assignments = columns
    .filter(column => !spec.pk.includes(column))
    .map(column => `\`${column}\` = VALUES(\`${column}\`)`);
  const update = assignments.length
    ? assignments.join(", ")
    : `\`${spec.pk[0]}\` = \`${spec.pk[0]}\``;
  return {
    sql: `INSERT INTO \`${table}\` (${columns.map(column => `\`${column}\``).join(", ")}) VALUES (${columns.map(() => "?").join(", ")}) ON DUPLICATE KEY UPDATE ${update}`,
    params: columns.map(column => normalized[column])
  };
}

function deleteStatement(key) {
  const parts = String(key).split("\u001f");
  const table = parts[0];
  const spec = SCHEMA[table];
  const values = parts.slice(1);
  const where = spec.pk.map(column => `\`${column}\` = ?`).join(" AND ");
  const numbers = new Set(spec.numbers || []);
  return {
    sql: `DELETE FROM \`${table}\` WHERE ${where}`,
    params: spec.pk.map((column, index) => (numbers.has(column) ? Number(values[index]) : values[index]))
  };
}

function selectSql(table) {
  const columns = SCHEMA[table].columns.map(column => `\`${column}\``).join(", ");
  return `SELECT ${columns} FROM \`${table}\``;
}

function collectionChecksums(collections) {
  const out = {};
  Object.keys(collections || {}).sort().forEach(name => {
    out[name] = checksum(collections[name]);
  });
  return out;
}

function summarize(collections) {
  const source = collections || {};
  const auth = source.auth || {};
  const economy = source.economy || {};
  const calendar = source.calendar || {};
  const friends = source.friends || {};
  const moderare = source.moderare || {};
  const events = Object.values(calendar.events || {}).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
  return {
    accounts: Object.keys(auth.accounts || {}).length,
    sessions: Object.keys(auth.sessions || {}).length,
    resets: Object.keys(auth.resets || {}).length,
    economyUsers: Object.keys(economy.users || {}).length,
    notifications: Array.isArray(economy.notifications) ? economy.notifications.length : 0,
    events,
    friends: Object.keys(friends.friends || {}).length,
    memory: source.memory && typeof source.memory === "object" ? Object.keys(source.memory).length : 0,
    reports: Array.isArray(moderare.reports) ? moderare.reports.length : 0,
    collections: Object.keys(source).length
  };
}

function compareCollections(left, right) {
  const a = collectionChecksums(left);
  const b = collectionChecksums(right);
  const names = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  const mismatches = names.filter(name => a[name] !== b[name]);
  return { ok: mismatches.length === 0, mismatches, left: a, right: b };
}

module.exports = {
  LOCK_NAME,
  FORMAT_VERSION,
  KNOWN,
  SCHEMA,
  COLLECTION_TABLES,
  accountId,
  checksum,
  stable,
  splitDocument,
  joinDocument,
  normalizeRow,
  indexBuckets,
  bucketsFromSql,
  planChange,
  upsertStatement,
  deleteStatement,
  selectSql,
  collectionChecksums,
  summarize,
  compareCollections,
  emptyShape
};
