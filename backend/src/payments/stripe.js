// Stripe Checkout + webhook. Fără STRIPE_SECRET_KEY, checkout-ul rămâne mock
// (etichetat), ca restul providerilor. Nu adăugăm SDK-ul oficial: fetch +
// form-urlencoded e suficient și evită o dependință în plus pe CloudLinux.

const crypto = require("crypto");
const config = require("../config");
const { setSubscription } = require("../data/subscriptionStore");
const { PLANS, priceForCycle, stripeRecurring } = require("../data/subscriptions");

function stripeConfigured() {
  return Boolean(config.STRIPE_SECRET_KEY);
}

function flatten(obj, prefix, out = new URLSearchParams()) {
  for (const [key, value] of Object.entries(obj)) {
    const name = prefix ? `${prefix}[${key}]` : key;
    if (value === undefined || value === null || value === false) continue;
    if (value === true) {
      out.append(name, "true");
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item && typeof item === "object") flatten(item, `${name}[${index}]`, out);
        else out.append(`${name}[${index}]`, String(item));
      });
    } else if (typeof value === "object") {
      flatten(value, name, out);
    } else {
      out.append(name, String(value));
    }
  }
  return out;
}

async function createCheckoutSession({ email, plan, billingCycle, successUrl, cancelUrl }) {
  const amount = Math.round(Number(priceForCycle(plan, billingCycle) || 0) * 100);
  if (amount <= 0) {
    return { ok: false, reason: "free_plan" };
  }

  const body = flatten({
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: email,
    customer_email: email,
    metadata: {
      planId: plan.id,
      billingCycle,
      userEmail: email
    },
    subscription_data: {
      metadata: {
        planId: plan.id,
        billingCycle,
        userEmail: email
      }
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "ron",
          unit_amount: amount,
          recurring: stripeRecurring(billingCycle),
          product_data: { name: `Mentor AI ${plan.name}` }
        }
      }
    ]
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString(),
    signal: AbortSignal.timeout(10000)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) {
    return {
      ok: false,
      reason: "stripe_error",
      status: response.status,
      error: data.error?.message || "Stripe a refuzat sesiunea de plată."
    };
  }

  return { ok: true, url: data.url, id: data.id };
}

function verifyStripeSignature(rawBody, header, secret, toleranceSec = 300) {
  if (!header || !secret) return false;
  const items = String(header).split(",").map(part => part.trim());
  const timestampPart = items.find(part => part.startsWith("t="));
  const signatures = items.filter(part => part.startsWith("v1=")).map(part => part.slice(3));
  if (!timestampPart || signatures.length === 0) return false;

  const timestamp = timestampPart.slice(2);
  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(payload, "utf8").digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const match = signatures.some(signature => {
    const given = Buffer.from(signature, "utf8");
    return given.length === expectedBuf.length && crypto.timingSafeEqual(given, expectedBuf);
  });
  if (!match) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  return Number.isFinite(age) && age <= toleranceSec;
}

function activateFromSession(session) {
  const email = String(session.client_reference_id || session.metadata?.userEmail || "").trim().toLowerCase();
  const planId = session.metadata?.planId || "";
  const billingCycle = session.metadata?.billingCycle || "monthly";
  if (!email) return null;

  const plan = PLANS.find(entry => entry.id === planId);
  const renewsAt = new Date();
  renewsAt.setMonth(renewsAt.getMonth() + (billingCycle === "yearly" ? 12 : billingCycle === "quarterly" ? 3 : billingCycle === "halfYear" || billingCycle === "half_year" ? 6 : 1));

  return setSubscription(email, {
    planId: plan ? plan.id : planId || "pro",
    status: "active",
    billingCycle,
    renewsAt: renewsAt.toISOString(),
    paymentMethod: "stripe",
    stripeSessionId: session.id || "",
    reviewRequired: false,
    parentEmail: ""
  });
}

function handleStripeWebhook(req, res) {
  if (!config.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({
      error: "Webhook-ul Stripe nu este configurat. Setează STRIPE_WEBHOOK_SECRET.",
      mocked: true
    });
  }

  const raw = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body || "");
  if (!verifyStripeSignature(raw, req.headers["stripe-signature"], config.STRIPE_WEBHOOK_SECRET)) {
    return res.status(400).json({ error: "Semnătură Stripe invalidă." });
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: "Payload JSON invalid." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data?.object || {};
    if (session.mode === "subscription" || session.metadata?.planId) {
      activateFromSession(session);
    }
  }

  return res.json({ received: true });
}

module.exports = {
  stripeConfigured,
  createCheckoutSession,
  verifyStripeSignature,
  activateFromSession,
  handleStripeWebhook
};
