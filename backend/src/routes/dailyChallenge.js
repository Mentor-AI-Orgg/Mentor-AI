const express = require('express');
const { validateBody } = require('../middleware/validate');
const { dailyChallengeSchema } = require('../validation/schemas');
const { getDailyChallenge, finishDailyChallenge } = require('../data/economyStore');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getDailyChallenge(req.auth.email));
});

router.post('/finish', validateBody(dailyChallengeSchema), (req, res) => {
  res.json(finishDailyChallenge(req.auth.email, req.body.answers));
});

module.exports = router;
