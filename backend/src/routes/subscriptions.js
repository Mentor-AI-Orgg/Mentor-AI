const express = require("express");
const router = express.Router();
const { PLANS, findPlan, LEGACY_PAID_PLAN_IDS } = require("../data/subscriptions");
const { getSubscription, setSubscription } = require("../data/subscriptionStore");
const { notifyParent } = require("../notify/parentActivity");
const { authRequired, studentRequired } = require("../middleware/auth");

const APP_IS_FREE = {
  error: "Aplicația este gratuită. Nu există planuri plătite.",
  reason: "app_is_free"
};

function publicSubscription(userId) {
  const current = getSubscription(userId);
  return {
    ...current,
    planId: "free",
    status: "active",
    billingCycle: "monthly",
    renewsAt: null,
    paymentMethod: "none",
    reviewRequired: false
  };
}

router.get("/", (req, res) => {
  res.json({ subscriptions: PLANS });
});

router.get("/plans", (req, res) => {
  res.json({ plans: PLANS });
});

router.get("/me", authRequired, studentRequired, (req, res) => {
  res.json({ subscription: publicSubscription(req.auth.email) });
});

router.post("/checkout", authRequired, studentRequired, async (req, res) => {
  const { plan_id } = req.body || {};
  const requested = String(plan_id || "free").trim().toLowerCase();

  if (LEGACY_PAID_PLAN_IDS.has(requested) || (requested && requested !== "free" && !findPlan(requested))) {
    if (LEGACY_PAID_PLAN_IDS.has(requested)) {
      return res.status(410).json(APP_IS_FREE);
    }
    return res.status(404).json({ error: "Plan inexistent." });
  }

  const plan = findPlan(requested) || findPlan("free");
  const userId = req.auth.email;
  const subscription = setSubscription(userId, {
    planId: "free",
    status: "active",
    billingCycle: "monthly",
    renewsAt: null,
    paymentMethod: "none",
    cardLast4: "",
    reviewRequired: false,
    parentEmail: ""
  });

  await notifyParent({
    studentEmail: userId,
    type: "checkout",
    note: "Contul rămâne gratuit. Nu există abonament de plătit.",
    meta: { planId: "free" }
  });

  return res.json({
    success: true,
    mocked: false,
    message: `Planul „${plan.name}” este activ. Tot mentorul este gratuit.`,
    subscription
  });
});

module.exports = router;
