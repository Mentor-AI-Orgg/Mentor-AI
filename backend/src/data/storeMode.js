// STORE=json este modul implicit și cel de producție cât timp nu se schimbă
// mediul. STORE=mysql nu pornește singur: cere MYSQL_URL sau host, user, bază.

let unknownWarned = false;

function storeMode() {
  const raw = String(process.env.STORE || "json").trim().toLowerCase();
  if (raw === "mysql") return "mysql";
  if (raw && raw !== "json" && !unknownWarned) {
    unknownWarned = true;
    console.warn(`[persistence] STORE=${raw} nu e cunoscut. Rămân pe json.`);
  }
  return "json";
}

function mysqlConfig() {
  const uri = String(process.env.MYSQL_URL || "").trim();
  if (uri) return { uri };
  const host = String(process.env.MYSQL_HOST || "").trim();
  const user = String(process.env.MYSQL_USER || "").trim();
  const database = String(process.env.MYSQL_DATABASE || "").trim();
  if (!host || !user || !database) return null;
  const port = Number(process.env.MYSQL_PORT || 3306);
  return {
    host,
    port: Number.isFinite(port) && port > 0 ? port : 3306,
    user,
    password: String(process.env.MYSQL_PASSWORD || ""),
    database
  };
}

function lockWaitSeconds() {
  const raw = process.env.MYSQL_LOCK_WAIT_SECONDS;
  if (raw === undefined || raw === "") return 15;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return 15;
  return parsed;
}

function mysqlConfigError() {
  return "STORE=mysql cere MYSQL_URL sau MYSQL_HOST, MYSQL_USER și MYSQL_DATABASE.";
}

module.exports = {
  storeMode,
  mysqlConfig,
  lockWaitSeconds,
  mysqlConfigError
};
