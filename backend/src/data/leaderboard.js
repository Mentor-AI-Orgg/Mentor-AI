// Clasamentul public se calculează din activitatea elevilor (monede câștigate
// + streak). Numele reale și emailurile nu ies pe acest endpoint: doar
// pseudonimul (username ales sau „Elev ABCD”).

const { listLeaderboardEntries, lessonsThisWeek } = require("./economyStore");

module.exports = { listLeaderboardEntries, lessonsThisWeek };
