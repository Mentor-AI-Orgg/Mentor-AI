// Abonamentul activ al fiecărui cont.
//
// Stătea până acum ca obiect la nivel de modul în routes/subscriptions.js,
// deci se pierdea la fiecare restart: un elev care „plătea" planul Pro se
// trezea pe Free după primul deploy. Mutat aici ca să fie salvat pe disc prin
// persistence.js.
//
// Plata este în continuare mock - integrarea reală (Stripe/Netopia) rămâne în
// Faza 6 din plan-imbunatatiri.md.

const persistence = require("./persistence");
const { DEFAULT_USER_SUBSCRIPTION } = require("./subscriptions");

const SUBSCRIPTIONS = new Map(); // userId -> abonament

function getSubscription(userId) {
  return SUBSCRIPTIONS.get(userId) || { ...DEFAULT_USER_SUBSCRIPTION };
}

function setSubscription(userId, subscription) {
  SUBSCRIPTIONS.set(userId, subscription);
  return subscription;
}

function deleteSubscription(userId) {
  return SUBSCRIPTIONS.delete(userId);
}

persistence.register("subscriptions", {
  snapshot: () => persistence.mapToObject(SUBSCRIPTIONS),
  restore: data => persistence.restoreMap(SUBSCRIPTIONS, data)
});

module.exports = { getSubscription, setSubscription, deleteSubscription };
