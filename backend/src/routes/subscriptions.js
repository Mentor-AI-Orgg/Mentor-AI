const express = require("express");
const router = express.Router();
const { PLANS, DEFAULT_USER_SUBSCRIPTION } = require("../data/subscriptions");
const { sendParentReview, ensureUser } = require("../data/economyStore");

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
  const {
    plan_id,
    billing_cycle = "monthly",
    user_id = "demo_user",
    payment_method = "card",
    card_last4 = "0000",
    parent_email = "",
    role = "student",
    parent_message = ""
  } = req.body || {};
  const plan = PLANS.find(p => p.id === plan_id);
  if (!plan) return res.status(404).json({ error: "Plan inexistent." });

  const renewsAt = new Date();
  renewsAt.setMonth(renewsAt.getMonth() + (billing_cycle === "yearly" ? 12 : 1));

  const user = ensureUser(user_id, { role, parentEmail: parent_email });
  const requiresParentReview = role === "student" && Boolean(parent_email);
  mockSubscriptions[user_id] = {
    planId: plan.id,
    status: requiresParentReview ? "pending_parent_review" : "active",
    billingCycle: billing_cycle,
    renewsAt: renewsAt.toISOString(),
    paymentMethod: payment_method,
    cardLast4: card_last4,
    reviewRequired: requiresParentReview,
    parentEmail: parent_email || user.preferences.parentEmail || ""
  };

  const parentReview = requiresParentReview
    ? sendParentReview({
        userId: user_id,
        parentEmail: parent_email,
        planId: plan.id,
        billingCycle: billing_cycle,
        role,
        message: parent_message || `Cerere de aprobare pentru planul ${plan.name}.
Plata este mock, prin card, iar această notificare poate fi înlocuită cu flux real SMTP/Stripe.`
      })
    : null;

  res.json({
    success: true,
    message: `Mock checkout reușit pentru planul „${plan.name}”. Conectează un procesator de plăți real (Stripe/Netopia) pentru tranzacții live.`,
    subscription: mockSubscriptions[user_id],
    parentReview
  });
});

module.exports = router;
