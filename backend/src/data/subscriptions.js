// planuri mock
const PLANS = [
  {
    id: "free",
    name: "Gratuit",
    tagline: "Pentru a testa Mentor AI",
    priceMonthly: 0,
    priceYearly: 0,
    currency: "RON",
    badge: null,
    features: [
      { label: "10 întrebări / zi către Profesorul AI", included: true },
      { label: "1 limbă activă (Română)", included: true },
      { label: "Memorie conversație: doar sesiunea curentă", included: true },
      { label: "Fotografiază lecția (Mathpix OCR)", included: false },
      { label: "Calculator științific (Wolfram Alpha)", included: false },
      { label: "Detector AI (anti-cheating)", included: false },
      { label: "Fără reclame", included: false }
    ]
  },
  {
    id: "plus",
    name: "Mentor Plus",
    tagline: "Cel mai popular la elevi",
    priceMonthly: 29,
    priceYearly: 249,
    currency: "RON",
    badge: "Popular",
    features: [
      { label: "Întrebări nelimitate către Profesorul AI", included: true },
      { label: "Toate cele 11 limbi", included: true },
      { label: "Memorie conversație persistentă (15 mesaje)", included: true },
      { label: "Fotografiază lecția (Mathpix OCR)", included: true },
      { label: "Calculator științific (Wolfram Alpha)", included: true },
      { label: "Detector AI (anti-cheating)", included: false },
      { label: "Fără reclame", included: true }
    ]
  },
  {
    id: "pro",
    name: "Mentor Pro",
    tagline: "Pentru pregătire de examen (BAC / Evaluare Națională)",
    priceMonthly: 49,
    priceYearly: 419,
    currency: "RON",
    badge: "Recomandat pentru BAC",
    features: [
      { label: "Tot ce include Mentor Plus", included: true },
      { label: "Detector AI (anti-cheating) nelimitat", included: true },
      { label: "Planuri de studiu personalizate", included: true },
      { label: "Rapoarte de progres săptămânale", included: true },
      { label: "Prioritate motoare AI (Claude → GPT-4o → Gemini)", included: true },
      { label: "Suport prioritar", included: true }
    ]
  },
  {
    id: "family",
    name: "Familie",
    tagline: "Până la 4 conturi de elevi",
    priceMonthly: 99,
    priceYearly: 849,
    currency: "RON",
    badge: null,
    features: [
      { label: "Tot ce include Mentor Pro", included: true },
      { label: "Până la 4 profiluri de elevi", included: true },
      { label: "Dashboard părinte", included: true },
      { label: "Facturare unică pentru toată familia", included: true }
    ]
  }
];

// Mock "current subscription" for a user until real auth/billing is connected.
const DEFAULT_USER_SUBSCRIPTION = {
  planId: "free",
  status: "active",
  renewsAt: null,
  billingCycle: "monthly"
};

module.exports = { PLANS, DEFAULT_USER_SUBSCRIPTION };
