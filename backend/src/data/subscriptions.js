// Un singur produs plătit: 50 lei / lună, nelimitat, tot ce e în aplicație.
// Contul pornește gratuit ca să poți încerca; upgrade-ul e planul Mentor.

const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    tagline: "Ca să încerci lecțiile și mentorul înainte să plătești.",
    priceMonthly: 0,
    priceQuarterly: 0,
    priceHalfYear: 0,
    priceYearly: 0,
    currency: "RON",
    badge: null,
    features: [
      { label: "Lecții de română și matematică, clasele 5–8", included: true },
      { label: "Mentor AI cu scaffolding (fără tema gata)", included: true },
      { label: "Email către părinte cu activitatea copilului", included: true },
      { label: "Întrebări și sesiuni limitate, ca să vezi dacă ți se potrivește", included: true }
    ]
  },
  {
    id: "mentor",
    name: "Mentor",
    tagline: "50 lei / lună. Nelimitat. Include tot.",
    priceMonthly: 50,
    priceQuarterly: 150,
    priceHalfYear: 300,
    priceYearly: 600,
    currency: "RON",
    badge: "Nelimitat",
    features: [
      { label: "Întrebări nelimitate către mentor", included: true },
      { label: "Română și matematică, clasele 5–8, toate capitolele", included: true },
      { label: "Sesiuni, flashcarduri și focus fără plafon", included: true },
      { label: "Fotografiază tema (OCR) și calculator științific", included: true },
      { label: "Memorie de conversație și digest către părinte", included: true }
    ]
  }
];

const PAID_PLAN_IDS = ["mentor", "pro", "premium", "elite", "unlimited"];

function resolvePlanId(id) {
  const value = String(id || "free").trim().toLowerCase();
  if (PAID_PLAN_IDS.includes(value)) return "mentor";
  return "free";
}

function isPaidPlan(id) {
  return resolvePlanId(id) === "mentor";
}

function findPlan(id) {
  const raw = String(id || "").trim().toLowerCase();
  if (!raw) return null;
  if (raw === "free") return PLANS.find(plan => plan.id === "free");
  if (PAID_PLAN_IDS.includes(raw)) return PLANS.find(plan => plan.id === "mentor");
  return null;
}

const DEFAULT_USER_SUBSCRIPTION = {
  planId: "free",
  status: "active",
  renewsAt: null,
  billingCycle: "monthly"
};

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
  DEFAULT_USER_SUBSCRIPTION,
  PAID_PLAN_IDS,
  resolvePlanId,
  isPaidPlan,
  findPlan,
  priceForCycle,
  stripeRecurring,
  renewsAtForCycle,
  normalizeBillingCycle
};
