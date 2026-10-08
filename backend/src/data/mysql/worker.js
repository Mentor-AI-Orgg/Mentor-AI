// Fir separat: mysql2 e asincron, iar saveNow trebuie să se întoarcă
// înainte ca procesul să iasă. Firul ține conexiunea și lacătul.

const { parentPort, workerData } = require("worker_threads");
const mysql = require("mysql2/promise");

const LOCK_NAME = "s10_store";
let conn = null;
let locked = false;

async function connect() {
  if (conn) {
    try { await conn.end(); } catch { /* conexiunea era deja închisă */ }
    conn = null;
  }
  const config = workerData.config || {};
  const common = {
    charset: "utf8mb4",
    supportBigNumbers: true,
    bigNumberStrings: false,
    dateStrings: true,
    multipleStatements: false
  };
  conn = config.uri
    ? await mysql.createConnection({ ...common, uri: config.uri })
    : await mysql.createConnection({ ...common, ...config });
  const wait = Number(workerData.lockWaitSeconds);
  const seconds = Number.isFinite(wait) && wait >= 0 ? wait : 15;
  const [rows] = await conn.query("SELECT GET_LOCK(?, ?) AS ok", [LOCK_NAME, seconds]);
  locked = Number(rows && rows[0] && rows[0].ok) !== 1;
}

function lost(error) {
  const code = String(error && error.code || "");
  return code === "PROTOCOL_CONNECTION_LOST" || code === "ECONNRESET" || code === "EPIPE";
}

async function query(sql, params) {
  const [rows] = await conn.query(sql, params || []);
  return rows;
}

async function transaction(statements) {
  if (locked) {
    const error = new Error("locked");
    error.code = "STORE_LOCKED";
    throw error;
  }
  await conn.beginTransaction();
  try {
    for (const statement of statements || []) {
      await conn.query(statement.sql, statement.params || []);
    }
    await conn.commit();
    return { committed: true };
  } catch (error) {
    try { await conn.rollback(); } catch { /* rollback eșuat */ }
    throw error;
  }
}

async function dispatch(op, payload) {
  if (op === "close") {
    if (conn) await conn.end();
    conn = null;
    return { closed: true };
  }
  if (!conn) await connect();
  if (op === "status") return { locked };
  if (op === "query") return query(payload.sql, payload.params);
  if (op === "queryAll") {
    const out = {};
    for (const item of payload.queries || []) {
      out[item.name] = await query(item.sql, item.params);
    }
    return out;
  }
  if (op === "transaction") return transaction(payload.statements);
  throw new Error(`Operație MySQL necunoscută: ${op}`);
}

parentPort.on("message", async message => {
  const flag = new Int32Array(message.sab);
  try {
    let result;
    try {
      result = await dispatch(message.op, message.payload || {});
    } catch (error) {
      if (!lost(error)) throw error;
      await connect();
      result = await dispatch(message.op, message.payload || {});
    }
    message.port.postMessage({ result });
  } catch (error) {
    message.port.postMessage({
      error: String(error && error.message || error).slice(0, 500),
      code: error && error.code ? String(error.code) : ""
    });
  }
  Atomics.store(flag, 0, 1);
  Atomics.notify(flag, 0);
});
