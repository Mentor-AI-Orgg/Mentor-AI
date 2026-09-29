// Verifică numele de utilizator deja salvate. Lista iese doar în consolă,
// pe server, nu în jurnalul de erori și fără emailuri.

const persistence = require("../data/persistence");
const { listAccounts } = require("../data/authStore");
const { usernameIssue } = require("../safety/usernamePolicy");

function rejectedNames(accounts) {
  const rows = [];
  for (const account of accounts || []) {
    if (!account || account.role !== "student") continue;
    const username = String(account.profile?.username || "").trim();
    if (!username) continue;
    const issue = usernameIssue(username);
    if (issue) rows.push({ username, code: issue.code });
  }
  return rows;
}

function main() {
  persistence.load();
  const rows = rejectedNames(listAccounts());
  if (!rows.length) {
    process.stdout.write("Toate numele de utilizator trec de verificare.\n");
    return;
  }
  process.stdout.write("Nume respinse:\n");
  for (const row of rows) {
    process.stdout.write(`${row.username} ${row.code}\n`);
  }
}

if (require.main === module) main();

module.exports = { rejectedNames };
