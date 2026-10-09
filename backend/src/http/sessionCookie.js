// Browserul din Facebook și Instagram tratează pagina ca pe un context
// separat. Un cookie SameSite=Lax pus pe răspunsul de la fetch nu rămâne
// acolo, așa că la reîmprospătare sau la redeschidere elevul pare delogat.
// SameSite=None; Secure este acceptat în webview-ul lor și se trimite și
// la cererile din aceeași vizită. În Chrome, Safari și Firefox rămâne Lax:
// borcanele de cookie nu se amestecă între aplicații.
//
// Nu punem Domain (rămâne doar pe gazda site-ului) și nu punem Partitioned:
// partiția ar lega cookie-ul de un site terț și l-ar ascunde la deschiderea
// normală. Path=/ și Max-Age de 7 zile erau deja corecte. Service worker-ul
// nu interceptează /api, iar fetch-ul din aplicație trimite credentials.

function inAppSocialBrowser(userAgent) {
  return /FBAN|FBAV|FB_IAB|FB4A|Instagram/i.test(String(userAgent || ""));
}

function sessionCookieOptions(maxAge, userAgent = "") {
  const inApp = inAppSocialBrowser(userAgent);
  const options = {
    httpOnly: true,
    sameSite: inApp ? "none" : "lax",
    secure: process.env.NODE_ENV === "production" || inApp,
    path: "/"
  };
  if (maxAge) options.maxAge = maxAge;
  return options;
}

module.exports = {
  inAppSocialBrowser,
  sessionCookieOptions
};
