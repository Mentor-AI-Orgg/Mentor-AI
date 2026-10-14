const express = require('express');
const { leagueView } = require('../data/economyStore');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(leagueView(req.auth.email));
});

module.exports = router;
