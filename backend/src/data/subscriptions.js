// planuri mock
const PLANS = [
  {
    id: "free",
    name: "Free",
    tagline: "Pentru a începe rapid cu fallback-ul AI",
    priceMonthly: 0,
    priceYearly: 0,
    currency: "RON",
    badge: null,
    features: [
      { label: "Fallback AI: GPT-4o → Wolfram → Mathpix → Gemini → Claude", included: true },
      { label: "10 întrebări / zi către Profesorul AI", included: true },
      { label: "1 limbă activă (Română)", included: true },
      { label: "Memorie conversație doar pentru sesiunea curentă", included: true },
      { label: "Planuri de studiu esențiale", included: true },
      { label: "Fotografiază lecția (Mathpix OCR)", included: false },
      { label: "Calculator științific (Wolfram Alpha)", included: false }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pentru ritm constant și răspunsuri mai bune",
    priceMonthly: 29,
    priceYearly: 249,
    currency: "RON",
    badge: "Popular",
    features: [
      { label: "Rutină AI: Gemini → Claude → Wolfram", included: true },
      { label: "Întrebări nelimitate către Profesorul AI", included: true },
      { label: "Memorie conversație persistentă", included: true },
      { label: "Fotografiază lecția (Mathpix OCR)", included: true },
      { label: "Calculator științific (Wolfram Alpha)", included: true },
      { label: "Planuri de studiu personalizate", included: true },
      { label: "Suport prioritar", included: true }
    ]
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Consiliu AI complet, cu Claude ca judecător",
    priceMonthly: 49,
    priceYearly: 419,
    currency: "RON",
    badge: "Council",
    features: [
      { label: "Consiliu AI: GPT-4o + Wolfram/Mathpix + Gemini + Claude", included: true },
      { label: "Claude sintetizează și alege răspunsul final", included: true },
      { label: "Toate răspunsurile sunt comparate și punctate", included: true },
      { label: "Memorie conversație avansată", included: true },
      { label: "Planuri de studiu premium", included: true },
      { label: "Analize de progres detaliate", included: true }
    ]
  }
];

const DEFAULT_USER_SUBSCRIPTION = {
  planId: "free",
  status: "active",
  renewsAt: null,
  billingCycle: "monthly"
};

module.exports = { PLANS, DEFAULT_USER_SUBSCRIPTION };
