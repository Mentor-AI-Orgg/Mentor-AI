const express = require("express");
const router = express.Router();
const config = require("../config");
const { stripeConfigured } = require("../payments/stripe");
const { smtpConfigured, twilioConfigured } = require("../notify/deliver");
const { googleConfigured, notionConfigured } = require("../calendar/oauth");

router.get("/", async (req, res) => {
  res.json({
    status: "healthy",
    version: config.APP_VERSION,
    engines: {
      claude: { status: config.CLAUDE_KEY ? "online (real)" : "online (mock)" },
      gpt4o: { status: config.OPENAI_KEY ? "online (real)" : "online (mock)" },
      gemini: { status: config.GEMINI_KEY ? "online (real)" : "online (mock)" },
      wolfram: { status: config.WOLFRAM_KEY ? "online (real)" : "online (mock)" },
      mathpix: { status: (config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY) ? "online (real)" : "online (mock)" }
    },
    integrations: {
      stripe: { status: stripeConfigured() ? "online (real)" : "online (mock)" },
      smtp: { status: smtpConfigured() ? "online (real)" : "online (mock)" },
      twilio: { status: twilioConfigured() ? "online (real)" : "online (mock)" },
      google_calendar: { status: googleConfigured() ? "online (real)" : "online (mock)" },
      notion: { status: notionConfigured() ? "online (real)" : "online (mock)" }
    },
    uptime_seconds: Math.floor(process.uptime())
  });
});

module.exports = router;
