const express = require("express");
const router = express.Router();
const config = require("../config");
const { stripeConfigured } = require("../payments/stripe");
const { smtpConfigured, twilioConfigured } = require("../notify/deliver");
router.get("/", async (req, res) => {
  res.json({
    ok: true,
    mail: smtpConfigured(),
    status: "healthy",
    version: config.APP_VERSION,
    mentor: "lectii",
    engines: {
      claude: { status: "oprit" },
      gpt4o: { status: "oprit" },
      gemini: { status: "oprit" },
      wolfram: { status: "oprit" },
      mathpix: { status: "oprit" }
    },
    integrations: {
      stripe: { status: stripeConfigured() ? "online (real)" : "online (mock)" },
      smtp: { status: smtpConfigured() ? "online (real)" : "online (mock)" },
      twilio: { status: twilioConfigured() ? "online (real)" : "online (mock)" },
      google_calendar: { status: "oprit" },
      notion: { status: "oprit" }
    },
    uptime_seconds: Math.floor(process.uptime())
  });
});

module.exports = router;
