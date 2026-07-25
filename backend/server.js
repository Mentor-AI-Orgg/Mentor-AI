const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./src/config");

const chatRoute = require("./src/routes/chat");
const detectRoute = require("./src/routes/detect");
const wolframRoute = require("./src/routes/wolfram");
const mathpixRoute = require("./src/routes/mathpix");
const subscriptionsRoute = require("./src/routes/subscriptions");
const healthRoute = require("./src/routes/health");
const leaderboardRoute = require("./src/routes/leaderboard");
const calendarRoute = require("./src/routes/calendar");
const flashcardsRoute = require("./src/routes/flashcards");
const diagnosticsRoute = require("./src/routes/diagnostics");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const frontendDir = path.join(__dirname, "..", "frontend");

app.use("/api/chat", chatRoute);
app.use("/api/detect", detectRoute);
app.use("/api/wolfram", wolframRoute);
app.use("/api/mathpix", mathpixRoute);
app.use("/api/subscriptions", subscriptionsRoute);
app.use("/api/health", healthRoute);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/calendar", calendarRoute);
app.use("/api/flashcards", flashcardsRoute);
app.use("/api/diagnostics", diagnosticsRoute);

app.use(express.static(frontendDir));

app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

app.get("/api", (req, res) => res.json({ name: config.APP_NAME, version: config.APP_VERSION, ok: true }));

app.listen(config.PORT, () => {
  console.log(`${config.APP_NAME} backend listening on http://localhost:${config.PORT}`);
  console.log(`Claude:  ${config.CLAUDE_KEY ? "real key detected" : "no CLAUDE_KEY set -> using mock replies"}`);
  console.log(`OpenAI:  ${config.OPENAI_KEY ? "real key detected" : "no OPENAI_KEY set -> using mock replies"}`);
  console.log(`Gemini:  ${config.GEMINI_KEY ? "real key detected" : "no GEMINI_KEY set -> using mock replies"}`);
  console.log(`Wolfram: ${config.WOLFRAM_KEY ? "real key detected" : "no WOLFRAM_KEY set -> using mock replies"}`);
  console.log(`Mathpix: ${(config.MATHPIX_APP_ID && config.MATHPIX_APP_KEY) ? "real keys detected" : "no MATHPIX keys set -> using mock replies"}`);
});