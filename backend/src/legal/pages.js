// Paginile legale citesc aceleași termene ca jobul de păstrare
// și datele operatorului din shared/legal.json.

const retention = require("../config/retention");
const legal = require("../../../shared/legal.json");
const { operatorFromEnv } = require("./operator");
const { PREVIEW_COOKIE } = require("../middleware/comingSoon");

const DAY = retention.DAY_MS;

function days(ms) {
  return Math.round(ms / DAY);
}

function months(ms) {
  return Math.round(ms / (30 * DAY));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(title)} · ${escapeHtml(legal.product)}</title>
  <link rel="stylesheet" href="/fonts/faces.css" />
  <style>
    :root { --bg: #08142A; --ink: #FFFFFF; --muted: #A9B8D0; --lime: #44D6D7; --line: rgba(169,184,208,.28); }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.65 Nunito, "Segoe UI", sans-serif; overflow-wrap: anywhere; }
    main { max-width: 720px; margin: 0 auto; padding: max(24px, env(safe-area-inset-top)) 16px calc(48px + env(safe-area-inset-bottom)); }
    a { color: var(--lime); }
    h1, h2, h3 { font-family: "Space Grotesk", Nunito, sans-serif; letter-spacing: -.02em; }
    h1 { font-size: clamp(32px, 6vw, 44px); line-height: 1.1; margin: 12px 0 8px; }
    h2 { font-size: 22px; margin: 36px 0 10px; }
    h3 { font-size: 18px; margin: 22px 0 8px; }
    p, li { color: var(--ink); }
    .eyebrow { color: var(--muted); font-size: 0.75rem; letter-spacing: .18em; text-transform: uppercase; }
    .back { display: inline-flex; align-items: center; min-height: 44px; color: var(--muted); text-decoration: none; font-size: 1rem; }
    .note { padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: rgba(255,255,255,.03); color: var(--muted); font-size: 1rem; }
    code { color: var(--ink); overflow-wrap: anywhere; }
    @media (prefers-color-scheme: light) {
      :root { --bg: #F7F9FC; --ink: #1F2937; --muted: #4B5563; --lime: #0C7C86; --line: rgba(31,41,55,.14); }
      .note { background: #FFFFFF; }
    }
  </style>
  <script defer src="https://cloud.umami.is/script.js" data-website-id="dc441396-9915-4ee0-8f77-7f98eb595bc8"></script>
</head>
<body>
  <main>
    <a class="back" href="/">← Înapoi la ${escapeHtml(legal.product)}</a>
    <p class="eyebrow">Document legal · versiunea ${escapeHtml(legal.policyVersion)}</p>
    <h1>${escapeHtml(title)}</h1>
    ${body}
  </main>
</body>
</html>`;
}

function contactLine(operator) {
  return operator.email || "TODO: LEGAL_CONTACT";
}

function operatorBlock() {
  const operator = operatorFromEnv();
  const todo = operator.missing.length
    ? `<p class="note">TODO: datele operatorului nu sunt publicate. În DirectAdmin setează ${operator.missing.map(escapeHtml).join(", ")}. Până atunci <code>npm run prelansare</code> rămâne oprit. Nu completăm aici un CIF sau o adresă inventată.</p>`
    : "";
  const cui = operator.cui
    ? escapeHtml(operator.cui)
    : "TODO: LEGAL_CUI, doar dacă operatorul este firmă sau PFA. Nu este publicat.";
  const dpo = operator.dpo
    ? escapeHtml(operator.dpo)
    : "Nu este desemnat. Dacă există, setează LEGAL_DPO.";
  return `
    ${todo}
    <ul>
      <li>Operator: ${escapeHtml(operator.name || "TODO: LEGAL_OPERATOR_NAME")}</li>
      <li>Adresă: ${escapeHtml(operator.address || "TODO: LEGAL_OPERATOR_ADDRESS")}</li>
      <li>CUI: ${cui}</li>
      <li>Email: ${escapeHtml(contactLine(operator))}</li>
      <li>Responsabil cu protecția datelor: ${dpo}</li>
    </ul>`;
}

function privacyHtml() {
  const operator = operatorFromEnv();
  const contact = contactLine(operator);
  const pending = days(retention.PENDING_MS);
  const inactiveMonths = months(retention.INACTIVE_MS);
  const warning = days(retention.WARNING_BEFORE_MS);
  const memoryMonths = months(retention.TUTOR_MEMORY_MS);
  const parentDays = days(retention.PARENT_ACTIVITY_MS);
  const deletionDays = days(retention.DELETION_KEEP_MS);
  const backupDays = days(retention.BACKUP_KEEP_MS);
  const moderationMonths = months(retention.MODERATION_LOG_MS);
  return layout("Politica de confidențialitate", `
    <h2>Pentru copii</h2>
    <p>Știm numele tău de utilizator, clasa și ce lecții faci. Nu vrem numele tău real, școala sau telefonul.</p>
    <p>Părintele vede progresul, nu mesajele tale către mentor. Profilul tău este privat de la început.</p>
    <p>Îți poți șterge contul din Profil: scrii parola și cuvântul ȘTERGE. Dacă ceva nu e în regulă, spune-i unui adult sau scrie la ${escapeHtml(contact)}.</p>

    <h2>Pentru părinți</h2>
    <h3>Cine este operatorul</h3>
    ${operatorBlock()}
    <p>${escapeHtml(legal.product)} este gratuită, fără reclame și fără un serviciu de inteligență artificială plătit. Versiunea politicii: ${escapeHtml(legal.policyVersion)}.</p>
    <h3>Ce date păstrăm și de ce</h3>
    <p>Păstrăm numele de utilizator, clasa, progresul la lecții și teste, conversația cu tutorele, calendarul, prietenii după nume de utilizator, obiectele din magazin și emailul părintelui. Emailul este ca părintele să vadă rezumatul. Nu cerem emailul copilului, numele real, telefonul sau școala.</p>
    <p>Emailul părintelui se salvează la înscriere. Contul se deschide imediat, fără un buton de da sau nu. Părintele vede un rezumat în zona lui și primește același fel de rezumat pe email: lecții, minute, teste. Nu primește mesajele către tutore. Un cont vechi rămas fără acest email se șterge după ${pending} zile.</p>
    <h3>Cât timp</h3>
    <ul>
      <li>fără acord: ${pending} zile;</li>
      <li>cont nefolosit: ${inactiveMonths} luni, cu un avertisment cu ${warning} zile înainte;</li>
      <li>conversația cu tutorele: ${memoryMonths} luni;</li>
      <li>jurnalul de activitate trimis părintelui: ${parentDays} zile;</li>
      <li>jurnalul de moderare: ${moderationMonths} luni;</li>
      <li>după ștergere: doar un cod care nu poate fi transformat înapoi în email, timp de ${deletionDays} zile;</li>
      <li>copiile de siguranță: ${backupDays} zile, criptate.</li>
    </ul>
    <h3>Cine le mai primește</h3>
    <p>Firma de găzduire gazduire.net ține serverul. Serviciul de email SMTP trimite mesajele către părinte. Nimeni altcineva. Nu vindem date și nu le folosim pentru publicitate.</p>
    <h3>Ce stă în browser</h3>
    <ul>
      <li><strong>s10_session</strong>: cookie httpOnly, 7 zile, recunoaște contul copilului.</li>
      <li><strong>s10_parent</strong>: cookie httpOnly, 7 zile, recunoaște zona de părinte. Nu deschide contul copilului.</li>
      <li><strong>${escapeHtml(PREVIEW_COOKIE)}</strong>: cookie httpOnly, doar cât site-ul este închis, pentru previzualizarea creatorului.</li>
      <li><strong>mentor_ai_v3_data</strong> în localStorage: temă, clasă, starea lecțiilor și un flag că ești logat. Nu păstrăm acolo email, telefon, emailul părintelui, școala sau numele real.</li>
    </ul>
    <h3>Drepturile dumneavoastră</h3>
    <p>Aveți dreptul de acces, rectificare, ștergere, portabilitate și de a retrage acordul. Puteți descărca sau șterge datele din zona de părinte, ori scrie la ${escapeHtml(contact)}. Puteți depune o plângere la ANSPDCP, www.dataprotection.ro.</p>
    <p>Contorul de mesaje de criză nu spune cine a scris și nu se șterge odată cu un cont.</p>
    <p><a href="/termeni">Citește și termenii de utilizare</a>.</p>
  `);
}

function termsHtml() {
  const pending = days(retention.PENDING_MS);
  return layout("Termeni de utilizare", `
    <h2>Pentru copii</h2>
    <p>Fii respectuos. Nu pune date personale în numele de utilizator. Nu folosi contul altcuiva. Aplicația este gratuită.</p>
    <p>Dacă nu respecți regulile, un adult poate schimba numele, te poate ascunde din clasament, poate suspenda contul sau îl poate șterge, la cererea părintelui.</p>
    <p>Îți poți șterge contul din Profil, cu parola și cuvântul ȘTERGE. Fără acord, după ${pending} zile, contul și datele se șterg.</p>

    <h2>Pentru părinți</h2>
    ${operatorBlock()}
    <p>${escapeHtml(legal.product)} este un mentor gratuit pentru clasele 5–8, la limba română și matematică. Nu rezolvă tema în locul elevului și nu înlocuiește profesorul. Versiunea termenilor: ${escapeHtml(legal.policyVersion)}. Legea aplicabilă este legea României.</p>
    <p>Înscrierea cere un nume de utilizator, o parolă, clasa și emailul părintelui. Contul se deschide imediat. Părintele primește rezumatul activității pe email și îl vede în zona de părinte. Poate opri emailurile sau poate șterge contul de acolo.</p>
    <p>Nu există abonament. Magazinul folosește monede câștigate din învățare. Răspunderea pentru temele școlare rămâne a elevului și a adulților care îl îndrumă. Putem închide un cont care încalcă acești termeni.</p>
    <p>Copilul își poate șterge contul din Profil, cu parola și cuvântul ȘTERGE. Părintele poate șterge contul din zona lui, fără parola copilului.</p>
    <p><a href="/confidentialitate">Citește și politica de confidențialitate</a>.</p>
  `);
}

module.exports = { privacyHtml, termsHtml, days, months };
