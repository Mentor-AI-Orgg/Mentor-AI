// Paginile legale citesc aceleași termene ca jobul de păstrare.
// Dacă se schimbă un număr în retention.js, se schimbă și textul.

const retention = require("../config/retention");
const legal = require("../data/legal.json");

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

function contactLine() {
  const contact = String(process.env.LEGAL_CONTACT || "").trim();
  if (!contact) {
    return "Pentru întrebări despre date, operatorul publică adresa în variabila LEGAL_CONTACT.";
  }
  return `Pentru întrebări despre date, scrie la ${escapeHtml(contact)}.`;
}

function layout(title, body) {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} · ${escapeHtml(legal.product)}</title>
  <link rel="stylesheet" href="/fonts/faces.css" />
  <style>
    :root { --bg: #0f1228; --ink: #f4f1ea; --muted: #9aa3b5; --lime: #c8f06c; --line: rgba(255,255,255,.08); }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.65 Nunito, "Segoe UI", sans-serif; }
    main { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
    a { color: var(--lime); }
    h1, h2 { font-family: "Space Grotesk", Nunito, sans-serif; letter-spacing: -.02em; }
    h1 { font-size: clamp(32px, 6vw, 44px); line-height: 1.1; margin: 12px 0 8px; }
    h2 { font-size: 20px; margin: 32px 0 10px; }
    p, li { color: #d5d8e4; }
    .eyebrow { color: var(--muted); font-size: 12px; letter-spacing: .18em; text-transform: uppercase; }
    .back { color: var(--muted); text-decoration: none; font-size: 14px; }
    .note { padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: rgba(255,255,255,.03); color: var(--muted); font-size: 14px; }
    code { color: var(--ink); }
  </style>
</head>
<body>
  <main>
    <a class="back" href="/">← Înapoi la ${escapeHtml(legal.product)}</a>
    <p class="eyebrow">Document legal · versiunea ${escapeHtml(legal.version)}</p>
    <h1>${escapeHtml(title)}</h1>
    ${body}
  </main>
</body>
</html>`;
}

function privacyHtml() {
  const pending = days(retention.PENDING_MS);
  const inactiveMonths = months(retention.INACTIVE_MS);
  const warning = days(retention.WARNING_BEFORE_MS);
  const memoryMonths = months(retention.TUTOR_MEMORY_MS);
  const parentDays = days(retention.PARENT_ACTIVITY_MS);
  const deletionDays = days(retention.DELETION_KEEP_MS);
  return layout("Politica de confidențialitate", `
    <p class="note">${escapeHtml(legal.product)} este o aplicație gratuită pentru elevi de gimnaziu, clasele 5–8, la română și matematică. Textul de mai jos urmărește ce face aplicația. Versiunea politicii: ${escapeHtml(legal.version)}.</p>
    <h2>1. Cine suntem</h2>
    <p>Aplicația îl ajută pe elev să învețe din lecțiile salvate. Nu vindem date și nu le folosim pentru publicitate. ${contactLine()}</p>
    <h2>2. Ce date colectăm</h2>
    <ul>
      <li><strong>Cont de elev:</strong> nume de utilizator, clasa (5–8) și hash-ul parolei. Nu cerem emailul copilului, numele real, telefonul sau școala.</li>
      <li><strong>Părinte:</strong> adresa de email, ca să confirme contul și să primească un rezumat. Părintele intră cu un link trimis pe email, fără parolă.</li>
      <li><strong>Sesiune:</strong> cookie-ul httpOnly <code>mentor_session</code>, 7 zile, și cookie-ul <code>s10_parent</code> pentru zona de părinte.</li>
      <li><strong>Învățare:</strong> progresul la lecții, testele, conversația cu mentorul, calendarul, prietenii (după nume de utilizator) și obiectele din magazinul cu monede de studiu.</li>
      <li><strong>Tehnic:</strong> adresa IP, doar ca să limităm încercările repetate.</li>
    </ul>
    <p>Nu colectăm date de plată. Pozele nu se încarcă. Mentorul nu trimite întrebarea către un serviciu de inteligență artificială plătit: răspunde din lecțiile din aplicație.</p>
    <h2>3. De ce le folosim</h2>
    <ul>
      <li>ca să recunoaștem contul;</li>
      <li>ca lecțiile să fie pe clasa elevului;</li>
      <li>ca părintele să confirme contul și să primească un rezumat, nu textul scris de copil;</li>
      <li>ca să oprim abuzul și să răspundem la un mesaj de criză cu numerele 116 111 și 112.</li>
    </ul>
    <p>Temeiul este acordul părintelui, versiunea ${escapeHtml(legal.version)}. Fără acord, elevul poate învăța, dar nu poate folosi prietenii, clasamentul sau magazinul. Contul fără acord se șterge după ${pending} zile.</p>
    <h2>4. Emailurile către părinte</h2>
    <p>Rezumatul pleacă cel mult o dată pe zi, după ora 19, ora României, și spune titlul lecției și scorul, nu ce a scris copilul. Se pot opri din zona de părinte. Schimbarea adresei se aplică doar după confirmarea pe link.</p>
    <h2>5. Prieteni</h2>
    <p>Căutarea găsește un elev doar după numele de utilizator scris exact. Profilul este privat până când copilul îl face public.</p>
    <h2>6. Drepturile tale</h2>
    <ul>
      <li><strong>Acces:</strong> copilul descarcă datele din Profil. Părintele le poate descărca din zona lui.</li>
      <li><strong>Ștergere:</strong> copilul scrie parola și ȘTERGE. Părintele poate șterge fără parola copilului. Ștergerea scoate datele din toate registrele.</li>
    </ul>
    <h2>7. Cât păstrăm</h2>
    <ul>
      <li>fără acord: ${pending} zile;</li>
      <li>cont nefolosit: ${inactiveMonths} luni, cu un avertisment cu ${warning} zile înainte;</li>
      <li>conversația cu mentorul: ${memoryMonths} luni;</li>
      <li>jurnalul de activitate trimis părintelui: ${parentDays} zile;</li>
      <li>după ștergere: doar un cod care nu poate fi transformat înapoi în email, timp de ${deletionDays} zile.</li>
    </ul>
    <p>Contorul de mesaje de criză nu spune cine a scris și nu se șterge odată cu un cont.</p>
    <h2>8. Cookie-uri</h2>
    <p>Cookie-urile sunt httpOnly, SameSite=Lax și Secure în producție. Nu folosim cookie-uri de urmărire sau de publicitate.</p>
    <p><a href="/terms.html">Citește și termenii de utilizare</a>.</p>
  `);
}

function termsHtml() {
  const pending = days(retention.PENDING_MS);
  return layout("Termeni de utilizare", `
    <p class="note">${escapeHtml(legal.product)} este gratuit pentru elevii din clasele 5–8. Versiunea termenilor: ${escapeHtml(legal.version)}.</p>
    <h2>1. Ce este aplicația</h2>
    <p>Un mentor care explică româna și matematica din lecțiile salvate în aplicație. Nu rezolvă tema în locul elevului și nu înlocuiește profesorul sau părintele.</p>
    <h2>2. Contul</h2>
    <ul>
      <li>Înscrierea cere un nume de utilizator, o parolă și emailul părintelui. Nu cerem emailul copilului.</li>
      <li>Părintele confirmă sau refuză din link. Refuzul șterge contul.</li>
      <li>Fără acord, după ${pending} zile, contul și datele se șterg.</li>
      <li>Prietenii, clasamentul și magazinul se deschid doar după acord.</li>
    </ul>
    <h2>3. Folosire corectă</h2>
    <p>Nu folosi aplicația ca să hărțuiești pe cineva, să publici datele altui copil sau să ocolești limitele de securitate. Numele de utilizator nu poate fi o insultă.</p>
    <h2>4. Gratuit</h2>
    <p>Nu există abonament de cumpărat. Magazinul folosește monede câștigate din învățare. Pozele nu se trimit, ca să nu apară un cost.</p>
    <h2>5. Închidere</h2>
    <p>Copilul își poate șterge contul din Profil, cu parola și cuvântul ȘTERGE. Părintele poate șterge contul din zona lui. Putem închide un cont care încalcă acești termeni.</p>
    <p><a href="/privacy.html">Citește și politica de confidențialitate</a>.</p>
  `);
}

module.exports = { privacyHtml, termsHtml, days, months };
