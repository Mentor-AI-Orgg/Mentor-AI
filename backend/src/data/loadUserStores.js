// Orice câmp nou despre un copil se adaugă într-un store de aici
// și se înregistrează în userDataRegistry, cu exportFor și eraseFor.
// Ștergerea și exportul nu caută în altă parte.

require("./authStore");
require("./friendStore");
require("./calendarStore");
require("./consentStore");
require("./economyStore");
require("./moderationStore");
require("./enSessionStore");
require("./enPhotoQuota");
require("../memory/memoryStore");
require("../notify/parentActivity");

const { missingExpected } = require("./userDataRegistry");

function assertRegistered() {
  const missing = missingExpected();
  if (missing.length) {
    throw new Error(`Registrul GDPR nu are: ${missing.join(", ")}`);
  }
}

module.exports = { assertRegistered };
