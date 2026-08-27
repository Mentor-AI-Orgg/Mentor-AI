const express = require("express");
const router = express.Router();
const { authRequired } = require("../middleware/auth");
const oauth = require("../calendar/oauth");
const store = require("../data/calendarStore");
const { publicBaseUrl } = require("../publicUrl");

router.get("/:provider/start", authRequired, (req, res) => {
  const { provider } = req.params;
  if (!["google", "notion"].includes(provider)) {
    return res.status(400).json({ error: "Provider necunoscut. Folosește 'google' sau 'notion'." });
  }
  if (!oauth.isConfigured(provider)) {
    return res.status(400).json({
      error: "OAuth nu este configurat pentru acest provider. Adaugă client id și secret în .env.",
      mocked: true
    });
  }
  const url = oauth.buildAuthorizeUrl({
    provider,
    email: req.auth.email,
    baseUrl: publicBaseUrl(req)
  });
  res.redirect(url);
});

router.get("/:provider/callback", async (req, res) => {
  const base = publicBaseUrl(req);
  const { provider } = req.params;
  if (!["google", "notion"].includes(provider)) {
    return res.redirect(`${base}/?calendar_error=provider`);
  }

  try {
    const result = await oauth.handleCallback({
      provider,
      code: req.query.code,
      state: req.query.state,
      error: req.query.error,
      baseUrl: base
    });
    if (!result.ok) {
      return res.redirect(`${base}/?calendar_error=${encodeURIComponent(result.reason || "oauth")}`);
    }
    store.connectProvider(result.email, provider, {
      mocked: false,
      tokens: result.tokens
    });
    store.replaceSyncedEvents(result.email, provider, result.events || []);
    res.redirect(`${base}/?calendar_connected=${encodeURIComponent(provider)}`);
  } catch {
    res.redirect(`${base}/?calendar_error=callback`);
  }
});

module.exports = router;
