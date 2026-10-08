# De la fișierul JSON la MySQL

Modul este scris. Producția rămâne pe `data/mentor-ai.json` până setezi `STORE=mysql` în DirectAdmin. Pașii de acolo sunt în [DEPLOY.md](../DEPLOY.md).

`STORE=json` este implicit. Doar prezența `MYSQL_URL` nu schimbă nimic. Codul de lecții, conturi și economie tot prin `persistence.register` vorbește cu hărțile din memorie. La salvare, modul MySQL scrie rândurile care s-au schimbat, nu tot fișierul.

## Când merită trecut

- peste aproximativ 5.000 de conturi active (un copil care a intrat în ultimele 90 de zile);
- fișierul trece de aproximativ 20 MB;
- salvarea durează vizibil, pentru că pe JSON tot documentul se rescrie.

Până atunci JSON-ul rămâne potrivit. Backup-ul criptat rămâne valabil în ambele moduri.

## Ce s-a schimbat față de planul inițial

- Driverul este `mysql2`, JavaScript pur, fără addon nativ.
- Nu există chei străine dure. `account_id` este un id intern (sha256 scurt al cheii din memorie). Economie, memorie, calendar sau acord pot avea rânduri înainte să existe contul. Emailul rămâne coloană acolo unde el este cheia hărții, ca citirea să refacă aceleași chei.
- Payload-ul JSON al rândului este sursa la citire. Coloanele de lângă el (monede, clasă, acord, dată) sunt ca să cauți în bază fără să desfaci tot.
- Colecțiile din fișierul de azi, nu doar cele din planul vechi: conturi, sesiuni, reset, prieteni, calendar, memorie, acord, economie, moderare, contorul de criză, ștergerile. O colecție necunoscută cade în `collection_rows`.
- Migrările de schemă (`schema_migrations`) nu stau într-o tranzacție: `CREATE TABLE` face commit implicit. Diff-ul de date (ștergeri, upsert, `store_meta`) stă într-o tranzacție.
- Un singur proces scrie. Firul MySQL ia `GET_LOCK('s10_store')`. Al doilea proces nu scrie peste primul.
- `saveNow()` rămâne sincron. `mysql2` rulează pe un fir separat, iar firul principal așteaptă răspunsul fără să depindă de bucla de evenimente.
- Backup-ul zilnic și bak1–bak3 rămân instantanee JSON criptate, același format ca `mentor-ai.json`, nu `mysqldump`. Verificarea de 26 de ore se uită la data fișierului de backup, ca înainte.
- JSON-ul nu se șterge la migrare. Ține-l cel puțin 40 de zile.

## Migrare și înapoi

Din rădăcina repo-ului, cu variabilele MySQL în mediu și fără `STORE=mysql` pe procesul care încă servește site-ul:

```bash
node scripts/json-to-mysql.mjs --dry-run
node scripts/json-to-mysql.mjs --file data/mentor-ai.json
```

Dry-run nu deschide baza și nu schimbă schema. Rularea reală e idempotentă: a doua oară nu dublează rândurile. La final compară numărul de conturi și sumele pe colecții. Dacă nu se potrivesc, iese cu eroare și lasă JSON-ul pe disc. Un fișier fără conturi este refuzat fără `--allow-empty`. Scriptul scoate colecțiile vechi (abonamente, invitații, conexiuni de calendar), la fel ca migrarea de pe JSON.

Înapoi, fără să atingă baza:

```bash
node scripts/mysql-to-json.mjs --out data/mentor-ai.from-mysql.json
```

Nu scrie peste `data/mentor-ai.json` fără `--force`. Ca să revii: oprești aplicația, pui fișierul exportat la locul lui, `STORE=json`, pornești.

Copia rapidă bak1, în modul MySQL, se reia cu `node backend/src/ops/restoreBackup.js`. Copia zilnică se decriptează cu `scripts/backup-restore.mjs`, apoi se încarcă cu `json-to-mysql.mjs`.

Exportul și ștergerea GDPR rămân în memorie, prin `userDataRegistry`, apoi `saveNow` scrie diferența. Funcționează la fel pe JSON și pe MySQL.
