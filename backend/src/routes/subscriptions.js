const express = require("express");
const router = express.Router();
const { PLANS, DEFAULT_USER_SUBSCRIPTION } = require("../data/subscriptions");

const mockSubscriptions = { demo_user: { ...DEFAULT_USER_SUBSCRIPTION } };

router.get("/", (req, res) => {
  res.json({ subscriptions: PLANS });
});

router.get("/plans", (req, res) => {
  res.json({ plans: PLANS });
});

router.get("/me", (req, res) => {
  const userId = req.query.user_id || "demo_user";
  res.json({ subscription: mockSubscriptions[userId] || { ...DEFAULT_USER_SUBSCRIPTION } });
});

router.post("/checkout", (req, res) => {
  const { plan_id, billing_cycle = "monthly", user_id = "demo_user" } = req.body || {};
  const plan = PLANS.find(p => p.id === plan_id);
  if (!plan) return res.status(404).json({ error: "Plan inexistent." });

  const renewsAt = new Date();
  renewsAt.setMonth(renewsAt.getMonth() + (billing_cycle === "yearly" ? 12 : 1));

  mockSubscriptions[user_id] = { planId: plan.id, status: "active", billingCycle: billing_cycle, renewsAt: renewsAt.toISOString() };

  res.json({
    success: true,
    message: `Mock checkout reușit pentru planul „${plan.name}”. Conectează un procesator de plăți real (Stripe/Netopia) pentru tranzacții live.`,
    subscription: mockSubscriptions[user_id]
  });
});

module.exports = router;
