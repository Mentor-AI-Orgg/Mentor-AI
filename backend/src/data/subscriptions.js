const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    tagline: "Mentorul de gimnaziu, fără abonament",
    priceMonthly: 0,
    priceQuarterly: 0,
    priceHalfYear: 0,
    priceYearly: 0,
    currency: "RON",
    badge: null,
    features: [
      { label: "Mentor AI la română și matematică, clasele 5–8", included: true },
      { label: "Întrebări nelimitate către mentor", included: true },
      { label: "Capitole, flashcarduri și sesiuni de focus", included: true },
      { label: "Magazin cosmetic cu monede câștigate din învățare", included: true },
      { label: "Email către părinte la activitatea copilului", included: true }
    ]
  }
];

const LEGACY_PAID_PLAN_IDS = new Set(["pro", "premium", "elite", "mentor"]);

const DEFAULT_USER_SUBSCRIPTION = {
  planId: "free",
  status: "active",
  renewsAt: null,
  billingCycle: "monthly"
};

function resolvePlanId(planId) {
  const value = String(planId || "free").trim().toLowerCase();
  return value === "free" || LEGACY_PAID_PLAN_IDS.has(value) ? "free" : value;
}

function findPlan(planId) {
  const resolved = resolvePlanId(planId);
  return PLANS.find(plan => plan.id === resolved) || null;
}

function normalizeBillingCycle(cycle) {
  const value = String(cycle || "monthly");
  if (value === "half_year") return "halfYear";
  return value;
}

function priceForCycle(plan, billingCycle) {
  const cycle = normalizeBillingCycle(billingCycle);
  if (cycle === "yearly") return plan.priceYearly;
  if (cycle === "quarterly") return plan.priceQuarterly;
  if (cycle === "halfYear") return plan.priceHalfYear;
  return plan.priceMonthly;
}

function stripeRecurring(billingCycle) {
  const cycle = normalizeBillingCycle(billingCycle);
  if (cycle === "yearly") return { interval: "year", interval_count: 1 };
  if (cycle === "quarterly") return { interval: "month", interval_count: 3 };
  if (cycle === "halfYear") return { interval: "month", interval_count: 6 };
  return { interval: "month", interval_count: 1 };
}

function renewsAtForCycle(billingCycle, from = new Date()) {
  const cycle = normalizeBillingCycle(billingCycle);
  const renewsAt = new Date(from);
  if (cycle === "yearly") renewsAt.setFullYear(renewsAt.getFullYear() + 1);
  else if (cycle === "quarterly") renewsAt.setMonth(renewsAt.getMonth() + 3);
  else if (cycle === "halfYear") renewsAt.setMonth(renewsAt.getMonth() + 6);
  else renewsAt.setMonth(renewsAt.getMonth() + 1);
  return renewsAt.toISOString();
}

module.exports = {
  PLANS,
  LEGACY_PAID_PLAN_IDS,
  DEFAULT_USER_SUBSCRIPTION,
  resolvePlanId,
  findPlan,
  priceForCycle,
  stripeRecurring,
  renewsAtForCycle,
  normalizeBillingCycle
};
