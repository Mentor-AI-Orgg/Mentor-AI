const DEFAULT_API_BASE_URL = 'http://localhost:3001';

const getApiBaseUrl = () => {
  if (window.__MENTOR_API_BASE_URL__) return window.__MENTOR_API_BASE_URL__;
  if (window.location && window.location.port === '3001') {
    return window.location.origin;
  }
  if (window.location && window.location.protocol === 'file:') {
    return DEFAULT_API_BASE_URL;
  }
  return DEFAULT_API_BASE_URL;
};

const buildApiUrl = url => {
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, getApiBaseUrl()).toString();
};

const DEFAULT_SUBSCRIPTIONS = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'RON',
    tagline: 'Pentru a începe rapid cu fallback-ul AI',
    features: [
      { label: 'Fallback AI: GPT-4o → Wolfram → Mathpix → Gemini → Claude', included: true },
      { label: '10 întrebări / zi către Profesorul AI', included: true },
      { label: '1 limbă activă (Română)', included: true },
      { label: 'Memorie conversație doar pentru sesiunea curentă', included: true }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 29,
    priceYearly: 249,
    currency: 'RON',
    tagline: 'Pentru ritm constant și răspunsuri mai bune',
    features: [
      { label: 'Rutină AI: Gemini → Claude → Wolfram', included: true },
      { label: 'Întrebări nelimitate către Profesorul AI', included: true },
      { label: 'Memorie conversație persistentă', included: true },
      { label: 'Fotografiază lecția (Mathpix OCR)', included: true }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    priceMonthly: 49,
    priceYearly: 419,
    currency: 'RON',
    tagline: 'Consiliu AI complet, cu Claude ca judecător',
    features: [
      { label: 'Consiliu AI: GPT-4o + Wolfram/Mathpix + Gemini + Claude', included: true },
      { label: 'Claude sintetizează și alege răspunsul final', included: true },
      { label: 'Toate răspunsurile sunt comparate și punctate', included: true }
    ]
  }
];

const normalizePlan = plan => ({
  ...plan,
  price: typeof plan.price === 'string' ? plan.price : `${Number(plan.priceMonthly || 0)} lei/lună`,
  description: plan.description || plan.tagline || '',
  features: (plan.features || []).map(feature => (typeof feature === 'string' ? { label: feature, included: true } : feature))
});

const fetchWithTimeout = async (url, options = {}, timeout = 6000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(buildApiUrl(url), { signal: controller.signal, ...options });
  clearTimeout(timer);
  return response;
};

const safeFetchJson = async (url, options) => {
  const response = await fetchWithTimeout(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const MentorAPI = {
  async chat(payload) {
    try {
      const data = await safeFetchJson('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return {
        success: false,
        fallback: true,
        data: {
          response: 'Momentan nu pot contacta backend-ul. Încearcă din nou în câteva secunde.'
        }
      };
    }
  },

  async detect(payload) {
    try {
      const data = await safeFetchJson('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return {
        success: false,
        fallback: true,
        data: { verdict: 'Service indisponibil', ai_probability: 0 }
      };
    }
  },

  async getSubscriptions() {
    try {
      const data = await safeFetchJson('/api/subscriptions');
      const subscriptions = (data.subscriptions || data.plans || data || []).map(normalizePlan);
      return { success: true, data: subscriptions, fallback: false };
    } catch (error) {
      return { success: false, data: DEFAULT_SUBSCRIPTIONS.map(normalizePlan), fallback: true };
    }
  },

  async checkoutSubscription(payload) {
    try {
      const data = await safeFetchJson('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getLeaderboard(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/leaderboard${qs ? `?${qs}` : ''}`);
      return { success: true, data: data.leaderboard || [], fallback: false };
    } catch (error) {
      return { success: false, data: [], fallback: true };
    }
  },

  async getCalendarEvents(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/calendar/events${qs ? `?${qs}` : ''}`);
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: { events: [], connections: { google: { connected: false }, notion: { connected: false } } }, fallback: true };
    }
  },

  async addCalendarEvent(payload) {
    try {
      const data = await safeFetchJson('/api/calendar/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async deleteCalendarEvent(eventId, userId = 'demo_user') {
    try {
      const data = await safeFetchJson(`/api/calendar/events/${eventId}?user_id=${encodeURIComponent(userId)}`, { method: 'DELETE' });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async connectCalendarProvider(provider) {
    try {
      const data = await safeFetchJson('/api/calendar/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message };
    }
  },

  async disconnectCalendarProvider(provider) {
    try {
      const data = await safeFetchJson('/api/calendar/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async generateFlashcards(payload) {
    try {
      const data = await safeFetchJson('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async runDiagnostics() {
    try {
      const data = await safeFetchJson('/api/diagnostics/full', { method: 'POST' });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async health() {
    try {
      const data = await safeFetchJson('/api/health');
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  }
};

window.MentorAPI = MentorAPI;
