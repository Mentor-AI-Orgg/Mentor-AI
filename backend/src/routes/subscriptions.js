const express = require("express");
const router = express.Router();
const { PLANS, priceForCycle, renewsAtForCycle, normalizeBillingCycle } = require("../data/subscriptions");
const { getSubscription, setSubscription } = require("../data/subscriptionStore");
const { sendParentReview, ensureUser } = require("../data/economyStore");
const { notifyParent } = require("../notify/parentActivity");
const { authRequired, studentRequired } = require("../middleware/auth");
const { stripeConfigured, createCheckoutSession } = require("../payments/stripe");
const { publicBaseUrl } = require("../publicUrl");

router.get("/", (req, res) => {
  res.json({ subscriptions: PLANS });
});

router.get("/plans", (req, res) => {
  res.json({ plans: PLANS });
});

// Lista de planuri de mai sus este publică. De aici încolo, rutele ating un
// cont, deci cer autentificare și folosesc identitatea din sesiune.
router.get("/me", authRequired, studentRequired, (req, res) => {
  res.json({ subscription: getSubscription(req.auth.email) });
});

router.post("/checkout", authRequired, studentRequired, async (req, res) => {
  const {
    plan_id,
    billing_cycle = "monthly",
    payment_method = "card",
    card_last4 = "0000",
    parent_email = "",
    parent_message = ""
  } = req.body || {};

  const userId = req.auth.email;
  const role = req.auth.role;
  const plan = PLANS.find(p => p.id === plan_id);
  if (!plan) return res.status(404).json({ error: "Plan inexistent." });

  const billingCycle = normalizeBillingCycle(billing_cycle);
  const user = ensureUser(userId, { role, parentEmail: parent_email });
  const requiresParentReview = role === "student" && Boolean(parent_email);

  const activate = (status, extra = {}) => setSubscription(userId, {
    planId: plan.id,
    status,
    billingCycle,
    renewsAt: renewsAtForCycle(billingCycle),
    paymentMethod: payment_method,
    cardLast4: extra.cardLast4 || card_last4,
    reviewRequired: status === "pending_parent_review",
    parentEmail: parent_email || user.preferences.parentEmail || "",
    ...extra
  });

  if (requiresParentReview) {
    const subscription = activate("pending_parent_review");
    const parentReview = await sendParentReview({
      userId,
      parentEmail: parent_email,
      planId: plan.id,
      billingCycle,
      role,
      message: parent_message || `Cerere de aprobare pentru planul ${plan.name}.`
    });
    return res.json({
      success: true,
      mocked: !stripeConfigured(),
      message: `Planul „${plan.name}” așteaptă aprobarea părintelui. Nu s-a inițiat plata.`,
      subscription,
      parentReview
    });
  }

  const tellParent = () => notifyParent({
    studentEmail: userId,
    type: "checkout",
    note: `Plan ales: ${plan.name} (${billingCycle}).`,
    meta: { planId: plan.id, billingCycle }
  });

  if (plan.id === "free" || Number(priceForCycle(plan, billingCycle) || 0) === 0) {
    const subscription = activate("active", { paymentMethod: "none", cardLast4: "" });
    await tellParent();
    return res.json({
      success: true,
      mocked: false,
      message: `Planul „${plan.name}” este activ.`,
      subscription
    });
  }

  if (stripeConfigured()) {
    const base = publicBaseUrl(req);
    const created = await createCheckoutSession({
      email: userId,
      plan,
      billingCycle,
      successUrl: `${base}/?checkout=success&plan=${encodeURIComponent(plan.id)}`,
      cancelUrl: `${base}/?checkout=cancel`
    });
    if (!created.ok) {
      return res.status(502).json({
        error: created.error || "Nu am putut deschide plata Stripe.",
        reason: created.reason
      });
    }
    const subscription = activate("pending_payment", {
      paymentMethod: "stripe",
      stripeSessionId: created.id,
      cardLast4: ""
    });
    await tellParent();
    return res.json({
      success: true,
      mocked: false,
      url: created.url,
      message: `Redirecționare către Stripe pentru planul „${plan.name}”.`,
      subscription
    });
  }

  const subscription = activate("active");
  await tellParent();
  res.json({
    success: true,
    mocked: true,
    message: `Checkout mock pentru planul „${plan.name}”. Setează STRIPE_SECRET_KEY pentru plăți live. Netopia poate înlocui Stripe mai târziu.`,
    subscription
  });
});

module.exports = router;
