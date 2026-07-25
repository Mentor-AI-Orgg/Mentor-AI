const express = require("express");
const router = express.Router();
const { MOCK_LEADERBOARD } = require("../data/leaderboard");

// GET /api/leaderboard?limit=10&name=...&xp=...&streak=...
// Momentan e mock (nu exista inca o baza de date de utilizatori reali).
// Cand se conecteaza o baza de date, se inlocuieste MOCK_LEADERBOARD cu un
// query real (ex: SELECT * FROM users ORDER BY xp DESC LIMIT ?).
router.get("/", (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));

  let board = [...MOCK_LEADERBOARD];

  // daca frontend-ul trimite datele userului curent, il inseram in clasament
  // ca sa-si vada pozitia reala fata de ceilalti (tot mock, dar coerent).
  const { name, xp, streak, level } = req.query;
  if (name && Number.isFinite(Number(xp))) {
    board.push({
      id: "current_user",
      name,
      initials: name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() || "EU",
      xp: Number(xp) || 0,
      streak: Number(streak) || 0,
      level: Number(level) || 1,
      class: "",
      isCurrentUser: true
    });
  }

  board.sort((a, b) => b.xp - a.xp);
  board = board.slice(0, limit).map((entry, index) => ({ ...entry, rank: index + 1 }));

  res.json({ leaderboard: board, mocked: true, generated_at: new Date().toISOString() });
});

module.exports = router;
