const { MASCOT_NAME } = require("./config/mascot");

function comingSoonPage({ creatorPage = false, previewError = "" } = {}) {
  const error = previewError
    ? `<p class="err">${escapeHtml(previewError)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Sunt de 10 · În curând</title>
  <link rel="stylesheet" href="/fonts/faces.css" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; height: 100%; }
    body {
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 28px 18px 24px;
      font-family: Nunito, "Segoe UI", sans-serif;
      color: #fff;
      background:
        radial-gradient(circle at 18% 16%, rgba(68, 214, 215, .18), transparent 34%),
        radial-gradient(circle at 82% 72%, rgba(147, 252, 9, .12), transparent 38%),
        linear-gradient(180deg, #08142A, #091C3C 72%);
    }
    main { width: min(440px, 100%); text-align: center; }
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
      margin: 14px 0 0;
      font: 700 clamp(40px, 11vw, 64px)/.9 "Space Grotesk", sans-serif;
    }
    .gate {
      margin: 22px 0 0;
      padding: 16px;
      text-align: left;
      border: 1px solid rgba(200, 245, 66, .35);
      border-radius: 16px;
      background: rgba(15, 17, 42, .75);
    }
    .gate h2 {
      margin: 0 0 10px;
      color: #c8f542;
      font: 700 16px/1.3 "Space Grotesk", sans-serif;
    }
    .gate form { display: grid; gap: 10px; }
    .gate label { color: #cbcee4; font-size: 14px; font-weight: 700; }
    .gate input, .gate button {
      font: inherit;
      width: 100%;
      min-height: 52px;
      padding: 0 14px;
      border-radius: 12px;
      border: 1px solid rgba(231, 234, 255, .22);
      font-size: 16px;
    }
    .gate input { background: #151633; color: #fff; }
    .gate button { background: #c8f542; color: #171633; font-weight: 700; cursor: pointer; }
    .err { margin: 8px 0 0; color: #ff8fa3; font-size: 14px; }
    .lead { margin: 18px 0 0; color: #c8f542; font-size: 16px; font-weight: 700; }
    p { margin: 10px 0 0; color: #cbcee4; line-height: 1.45; font-size: 15px; }
    .handle { margin-top: 16px; color: #fff; font-weight: 700; font-size: 16px; }
    .nets { margin-top: 4px; color: #9aa0c6; font-size: 13px; }
  </style>
</head>
<body>
  <main>
    <p class="pill">În curând</p>
    <img class="mascot" data-mood="salut" src="/mascot/salut.png" width="120" height="120" alt="${escapeHtml(MASCOT_NAME)}, furnicuța care te ajută" />
    <h1>Sunt de 10</h1>
    <section class="gate" aria-label="Intrare creator">
      <h2>Intrare creator</h2>
      <form method="post" action="/creator">
        <label for="parola-creator">Parolă</label>
        <input id="parola-creator" type="password" name="password" autocomplete="current-password" placeholder="Scrie parola aici" autofocus />
        <button type="submit">Deschide aplicația</button>
      </form>
      ${error}
    </section>
    <p class="lead">${creatorPage ? "Doar tu vezi aplicația. Lumea rămâne pe pagina de mentenanță." : "Nota 10, fără meditații de sute de lei."}</p>
    <p>${creatorPage ? "După parolă se deschide aplicația pe telefonul sau calculatorul tău." : "Română + matematică, clasele 5–8. Complet gratuit. Aplicația se pregătește — nu e deschisă încă."}</p>
    <p class="handle">@suntde10</p>
    <p class="nets">TikTok · Instagram · YouTube · Facebook</p>
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
