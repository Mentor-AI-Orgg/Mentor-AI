const DEFAULT_API_BASE_URL = 'http://localhost:3001';

const getApiBaseUrl = () => {
  if (window.__MENTOR_API_BASE_URL__) return window.__MENTOR_API_BASE_URL__;

  const location = window.location;
  // Pagina deschisă direct de pe disc: presupunem un backend local.
  if (!location || location.protocol === 'file:') return DEFAULT_API_BASE_URL;

  // În development frontend-ul poate fi servit de pe alt port (Live Server,
  // http-server), în timp ce backend-ul rămâne pe 3001.
  const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocalhost && location.port !== '3001') return DEFAULT_API_BASE_URL;

  // În producție backend-ul servește și frontend-ul (vezi backend/server.js),
  // deci API-ul este pe aceeași origine. Fără asta, un site pe domeniu real ar
  // trimite toate cererile către localhost-ul vizitatorului.
  return location.origin;
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
    priceQuarterly: 0,
    priceHalfYear: 0,
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
    priceMonthly: 75,
    priceQuarterly: 214,
    priceHalfYear: 405,
    priceYearly: 765,
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
    priceMonthly: 50,
    priceQuarterly: 143,
    priceHalfYear: 270,
    priceYearly: 510,
    currency: 'RON',
    tagline: 'Consiliu AI complet, cu Claude ca judecător',
    features: [
      { label: 'Consiliu AI: GPT-4o + Wolfram/Mathpix + Gemini + Claude', included: true },
      { label: 'Claude sintetizează și alege răspunsul final', included: true },
      { label: 'Toate răspunsurile sunt comparate și punctate', included: true }
    ]
  },
  {
    id: 'elite',
    name: 'Elite Family Pack',
    priceMonthly: 100,
    priceQuarterly: 285,
    priceHalfYear: 540,
    priceYearly: 1020,
    currency: 'RON',
    tagline: 'Pentru familie, mai multe conturi și control comun',
    features: [
      { label: 'Toate avantajele Premium', included: true },
      { label: 'Cont profesor și cont părinte dedicate', included: true },
      { label: 'Rapoarte trimise pe email către părinte', included: true },
      { label: 'Bonus 5000 monede: 7 zile gratuite Elite Family Pack', included: true }
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
  // `credentials: 'include'` trimite cookie-ul de sesiune. Fara el, fiecare
  // cerere ar parea neautentificata si ar primi 401.
  const response = await fetch(buildApiUrl(url), {
    signal: controller.signal,
    credentials: 'include',
    ...options
  });
  clearTimeout(timer);
  return response;
};

const safeFetchJson = async (url, options) => {
  const response = await fetchWithTimeout(url, options);
  if (!response.ok) {
    let payload = null;
    try { payload = await response.json(); } catch (error) { payload = null; }
    const failure = new Error(payload?.error || `HTTP ${response.status}`);
    failure.status = response.status;
    failure.payload = payload;
    throw failure;
  }
  return response.json();
};

const MentorAPI = {
  async register(payload) {
    try {
      const data = await safeFetchJson('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, error: error.message, status: error.status, field: error.payload?.field };
    }
  },

  async login(payload) {
    try {
      const data = await safeFetchJson('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, error: error.message, status: error.status };
    }
  },

  async logout() {
    try {
      await safeFetchJson('/api/auth/logout', { method: 'POST' });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sursa de adevar pentru "sunt logat?". Inainte, aplicatia se baza pe un
  // flag din localStorage, pe care oricine il putea seta din consola.
  async me() {
    try {
      const data = await safeFetchJson('/api/auth/me');
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, user: null, status: error.status };
    }
  },

  async forgotPassword(payload) {
    try {
      const data = await safeFetchJson('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async exportAccount() {
    try {
      const data = await safeFetchJson('/api/account/export');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteAccount() {
    try {
      const data = await safeFetchJson('/api/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: 'DELETE' })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // --- legaturi intre conturi (parinte-copil, profesor-elev) ---
  // Legatura nu exista pana cand celalalt cont accepta invitatia.
  async getLinks() {
    try {
      const data = await safeFetchJson('/api/links');
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: { incoming: [], outgoing: [], links: [] }, fallback: true };
    }
  },

  async inviteLink(payload) {
    try {
      const data = await safeFetchJson('/api/links/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async respondToInvitation(invitationId, action) {
    try {
      const data = await safeFetchJson(`/api/links/${invitationId}/${action}`, { method: 'POST' });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async unlinkAccount(otherEmail) {
    try {
      const data = await safeFetchJson('/api/links/unlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ other_email: otherEmail })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

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

  async getEconomySummary(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/economy/summary${qs ? `?${qs}` : ''}`);
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getShopCatalog() {
    try {
      const data = await safeFetchJson('/api/economy/catalog');
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async claimReward(payload) {
    try {
      const data = await safeFetchJson('/api/economy/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async buyShopItem(payload) {
    try {
      const data = await safeFetchJson('/api/economy/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async sendParentReview(payload) {
    try {
      const data = await safeFetchJson('/api/economy/parent-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getNotifications(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/economy/notifications${qs ? `?${qs}` : ''}`);
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async logActivity(payload) {
    try {
      const data = await safeFetchJson('/api/economy/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async updateParentPreferences(payload) {
    try {
      const data = await safeFetchJson('/api/economy/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getParentAnalytics(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/economy/parent-analytics${qs ? `?${qs}` : ''}`);
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getTeacherAnalytics(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/economy/teacher-analytics${qs ? `?${qs}` : ''}`);
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async requestTest(payload) {
    try {
      const data = await safeFetchJson('/api/economy/request-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async requestAccessCode(payload) {
    try {
      const data = await safeFetchJson('/api/economy/access-code/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async verifyAccessCode(payload) {
    try {
      const data = await safeFetchJson('/api/economy/access-code/verify', {
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
