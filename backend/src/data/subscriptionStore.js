// Abonamentul activ al fiecărui cont.
//
// Stătea până acum ca obiect la nivel de modul în routes/subscriptions.js,
// deci se pierdea la fiecare restart: un elev care „plătea" planul Pro se
// trezea pe Free după primul deploy. Mutat aici ca să fie salvat pe disc prin
// persistence.js.
//
// Aplicația e gratuită: planurile plătite sunt respinse. Rămâne stocarea ca
// vechile conturi Pro/Premium/Elite să se citească în continuare ca „free”.

const persistence = require("./persistence");
const { DEFAULT_USER_SUBSCRIPTION } = require("./subscriptions");

const SUBSCRIPTIONS = new Map(); // userId -> abonament

function getSubscription(userId) {
  const stored = SUBSCRIPTIONS.get(userId) || { ...DEFAULT_USER_SUBSCRIPTION };
  return {
    ...stored,
    planId: "free",
    status: stored.status === "pending_payment" ? "active" : stored.status || "active",
    billingCycle: "monthly",
    renewsAt: null,
    paymentMethod: stored.paymentMethod === "stripe" ? "none" : stored.paymentMethod || "none",
    reviewRequired: false
  };
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
