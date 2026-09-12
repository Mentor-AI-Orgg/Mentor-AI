function comingSoonPage({ creatorPage = false, previewError = "" } = {}) {
  const error = previewError
    ? `<p class="err">${escapeHtml(previewError)}</p>`
    : "";
  const heading = creatorPage
    ? "Intrare creator"
    : "Sunt de 10";
  const lead = creatorPage
    ? "Doar tu vezi aplicația. Lumea rămâne pe pagina de mentenanță."
    : "Nota 10, fără meditații de sute de lei.";
  const blurb = creatorPage
    ? "Scrie parola de creator și se deschide aplicația pe telefonul sau calculatorul tău."
    : "Română + matematică, clasele 5–8. Exerciții, teste, antrenament pentru Evaluare. Complet gratuit. Aplicația se pregătește — nu e deschisă încă.";

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Sunt de 10 · În curând</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 32px 20px;
      font-family: "DM Sans", sans-serif;
      color: #fff;
      background:
        radial-gradient(circle at 18% 16%, rgba(185, 167, 255, .18), transparent 34%),
        radial-gradient(circle at 82% 72%, rgba(111, 215, 255, .16), transparent 38%),
        linear-gradient(180deg, #0c0e22, #070910 72%);
    }
    main { width: min(520px, 100%); text-align: center; }
    .pill {
      display: inline-block;
      margin: 0;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(111, 215, 255, .12);
      color: #6fd7ff;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    h1 {
      margin: 18px 0 0;
      font: 700 clamp(40px, 11vw, 72px)/.9 "Space Grotesk", sans-serif;
    }
    .lead { margin: 16px 0 0; color: #c8f542; font-size: 18px; font-weight: 700; }
    p { margin: 12px 0 0; color: #cbcee4; line-height: 1.55; }
    .handle { margin-top: 22px; color: #fff; font-weight: 700; font-size: 18px; }
    .nets { margin-top: 6px; color: #9aa0c6; font-size: 13px; }
    .creator {
      margin-top: 36px;
      padding: 16px;
      text-align: left;
      color: #9aa0c6;
      font-size: 13px;
      border: 1px solid rgba(231, 234, 255, .12);
      border-radius: 16px;
      background: rgba(15, 17, 42, .55);
    }
    .creator h2 {
      margin: 0 0 8px;
      color: #fff;
      font: 700 15px/1.3 "Space Grotesk", sans-serif;
    }
    .creator form { display: grid; gap: 8px; }
    .creator input, .creator button {
      font: inherit;
      min-height: 42px;
      padding: 0 12px;
      border-radius: 12px;
      border: 1px solid rgba(231, 234, 255, .22);
    }
    .creator input { background: #151633; color: #fff; }
    .creator button { background: #c8f542; color: #171633; font-weight: 700; cursor: pointer; }
    .err { color: #ff8fa3; }
  </style>
</head>
<body>
  <main>
    <p class="pill">În curând</p>
    <h1>${escapeHtml(heading)}</h1>
    <p class="lead">${escapeHtml(lead)}</p>
    <p>${escapeHtml(blurb)}</p>
    ${creatorPage ? "" : `
    <p class="handle">@suntde10</p>
    <p class="nets">TikTok · Instagram · YouTube · Facebook</p>
    `}
    <section class="creator">
      <h2>Intrare creator</h2>
      <p>Dacă ești tu, scrie parola și se deschide aplicația. Restul lumii rămâne aici.</p>
      <form method="get" action="${creatorPage ? "/creator" : "/"}">
        <label for="acces">Parolă</label>
        <input id="acces" type="password" name="acces" autocomplete="current-password" />
        <button type="submit">Deschide aplicația</button>
      </form>
      ${error}
    </section>
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function robotsTxt() {
  return "User-agent: *\nDisallow: /\n";
}

module.exports = { comingSoonPage, robotsTxt };
