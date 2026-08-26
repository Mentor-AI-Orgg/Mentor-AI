const express = require("express");
const router = express.Router();
const { PLANS, DEFAULT_USER_SUBSCRIPTION } = require("../data/subscriptions");
const { sendParentReview, ensureUser } = require("../data/economyStore");
const { authRequired } = require("../middleware/auth");

const mockSubscriptions = { demo_user: { ...DEFAULT_USER_SUBSCRIPTION } };

router.get("/", (req, res) => {
  res.json({ subscriptions: PLANS });
});

router.get("/plans", (req, res) => {
  res.json({ plans: PLANS });
});

// Lista de planuri de mai sus este publică. De aici încolo, rutele ating un
// cont, deci cer autentificare și folosesc identitatea din sesiune.
router.get("/me", authRequired, (req, res) => {
  const userId = req.auth.email;
  res.json({ subscription: mockSubscriptions[userId] || { ...DEFAULT_USER_SUBSCRIPTION } });
});

router.post("/checkout", authRequired, (req, res) => {
  const {
    plan_id,
    billing_cycle = "monthly",
    payment_method = "card",
    card_last4 = "0000",
    parent_email = "",
    parent_message = ""
  } = req.body || {};

  // Abonamentul se activează pentru contul autentificat, nu pentru un user_id
  // trimis de client, care permitea schimbarea planului oricui.
  const userId = req.auth.email;
  const role = req.auth.role;
  const plan = PLANS.find(p => p.id === plan_id);
  if (!plan) return res.status(404).json({ error: "Plan inexistent." });

  const renewsAt = new Date();
  renewsAt.setMonth(renewsAt.getMonth() + (billing_cycle === "yearly" ? 12 : 1));

  const user = ensureUser(userId, { role, parentEmail: parent_email });
  const requiresParentReview = role === "student" && Boolean(parent_email);
  mockSubscriptions[userId] = {
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
        userId,
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
    subscription: mockSubscriptions[userId],
    parentReview
  });
});

module.exports = router;
