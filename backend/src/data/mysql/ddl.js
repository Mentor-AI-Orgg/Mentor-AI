// Schema MySQL / MariaDB. Fără chei străine dure: unele rânduri (economie,
// memorie, calendar) pot exista înainte să existe contul, iar tokenurile
// sunt chei hash, nu emailuri. Id-ul intern este account_id.

function table(name, body) {
  return `CREATE TABLE IF NOT EXISTS \`${name}\` (${body}) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;
}

function statements() {
  return [
    table("schema_migrations", `
      version INT NOT NULL,
      name VARCHAR(128) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (version)
    `),
    table("store_meta", `
      name VARCHAR(64) NOT NULL,
      value LONGTEXT NOT NULL,
      PRIMARY KEY (name)
    `),
    table("accounts", `
      id CHAR(32) NOT NULL,
      email VARCHAR(255) NOT NULL,
      username VARCHAR(80) NOT NULL DEFAULT '',
      password_hash VARCHAR(255) NOT NULL DEFAULT '',
      salt VARCHAR(64) NOT NULL DEFAULT '',
      class_name VARCHAR(32) NOT NULL DEFAULT '',
      parent_email VARCHAR(255) NOT NULL DEFAULT '',
      consent_status VARCHAR(32) NOT NULL DEFAULT '',
      suspended_until VARCHAR(40) NULL,
      must_rename TINYINT NOT NULL DEFAULT 0,
      role VARCHAR(16) NOT NULL DEFAULT '',
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY accounts_email (email)
    `),
    table("sessions", `
      token_hash CHAR(64) NOT NULL,
      account_id CHAR(32) NULL,
      expires_at BIGINT NOT NULL DEFAULT 0,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (token_hash),
      KEY sessions_account (account_id)
    `),
    table("reset_tokens", `
      token_hash CHAR(64) NOT NULL,
      account_id CHAR(32) NULL,
      expires_at BIGINT NOT NULL DEFAULT 0,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (token_hash),
      KEY reset_account (account_id)
    `),
    table("economy_users", `
      account_id CHAR(32) NOT NULL,
      email VARCHAR(255) NOT NULL,
      coins INT NOT NULL DEFAULT 0,
      xp INT NOT NULL DEFAULT 0,
      inventory LONGTEXT NOT NULL,
      chapters LONGTEXT NOT NULL,
      activity_log LONGTEXT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (account_id),
      UNIQUE KEY economy_email (email)
    `),
    table("economy_notifications", `
      id VARCHAR(80) NOT NULL,
      account_id CHAR(32) NULL,
      position INT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id)
    `),
    table("economy_purchases", `
      purchase_key VARCHAR(255) NOT NULL,
      account_id CHAR(32) NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (purchase_key)
    `),
    table("friend_settings", `
      account_id CHAR(32) NOT NULL,
      email VARCHAR(255) NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (account_id)
    `),
    table("friend_lists", `
      account_id CHAR(32) NOT NULL,
      email VARCHAR(255) NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (account_id)
    `),
    table("friend_requests", `
      id VARCHAR(80) NOT NULL,
      from_email VARCHAR(255) NOT NULL DEFAULT '',
      to_email VARCHAR(255) NOT NULL DEFAULT '',
      status VARCHAR(32) NOT NULL DEFAULT '',
      position INT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id)
    `),
    table("friend_sends", `
      email VARCHAR(255) NOT NULL,
      account_id CHAR(32) NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (email)
    `),
    table("friend_blocks", `
      pair_hash CHAR(64) NOT NULL,
      pair TEXT NOT NULL,
      position INT NOT NULL,
      PRIMARY KEY (pair_hash)
    `),
    table("friend_privatize", `
      token_hash VARCHAR(128) NOT NULL,
      email VARCHAR(255) NOT NULL DEFAULT '',
      expires_at BIGINT NOT NULL DEFAULT 0,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (token_hash)
    `),
    table("calendar_events", `
      id CHAR(40) NOT NULL,
      account_id CHAR(32) NULL,
      email VARCHAR(255) NOT NULL,
      event_date VARCHAR(32) NOT NULL DEFAULT '',
      title VARCHAR(200) NOT NULL DEFAULT '',
      event_type VARCHAR(40) NOT NULL DEFAULT '',
      event_time VARCHAR(64) NOT NULL DEFAULT '',
      position INT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id),
      KEY calendar_email (email)
    `),
    table("calendar_connections", `
      account_id CHAR(32) NOT NULL,
      email VARCHAR(255) NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (account_id)
    `),
    table("moderation_reports", `
      id VARCHAR(80) NOT NULL,
      position INT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id)
    `),
    table("moderation_log", `
      id VARCHAR(80) NOT NULL,
      position INT NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id)
    `),
    table("memory_threads", `
      id CHAR(64) NOT NULL,
      conversation_id TEXT NOT NULL,
      account_id CHAR(32) NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (id)
    `),
    table("consent_tokens", `
      kind VARCHAR(32) NOT NULL,
      token_hash CHAR(64) NOT NULL,
      account_id CHAR(32) NULL,
      expires_at BIGINT NOT NULL DEFAULT 0,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (kind, token_hash)
    `),
    table("consent_sends", `
      scope VARCHAR(16) NOT NULL,
      send_key VARCHAR(255) NOT NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (scope, send_key)
    `),
    table("crisis_counts", `
      day CHAR(10) NOT NULL,
      day_count INT NOT NULL,
      PRIMARY KEY (day)
    `),
    table("deletion_records", `
      user_id_hash CHAR(64) NOT NULL,
      deleted_at VARCHAR(40) NOT NULL,
      position INT NOT NULL,
      PRIMARY KEY (user_id_hash, position)
    `),
    table("collection_rows", `
      collection VARCHAR(64) NOT NULL,
      row_key VARCHAR(191) NOT NULL,
      account_id CHAR(32) NULL,
      payload LONGTEXT NOT NULL,
      PRIMARY KEY (collection, row_key)
    `)
  ];
}

const MIGRATIONS = [
  { version: 1, name: "initial", statements: statements() }
];

module.exports = { statements, MIGRATIONS };
