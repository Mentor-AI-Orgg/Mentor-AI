import {
  askAndStoreSiteAuth,
  humanizeFetchError,
  isAbortError,
  isSiteGateBody,
  siteAuthHeaders
} from './siteAuth.js';

const DEFAULT_API_BASE_URL = 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = 20000;
const getSiteStorage = () => (typeof window === 'undefined' ? null : window.sessionStorage);

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.__MENTOR_API_BASE_URL__) {
    return window.__MENTOR_API_BASE_URL__;
  }

  const location = typeof window === 'undefined' ? null : window.location;
  // Pagina deschisă direct de pe disc: presupunem un backend local.
  if (!location || location.protocol === 'file:') return DEFAULT_API_BASE_URL;

  // Vite (alt port) proxiează `/api` către backend. În producție Express
  // servește și frontend-ul, deci API-ul este pe aceeași origine.
  return location.origin;
};

const buildApiUrl = url => {
  if (/^https?:\/\//i.test(url)) return url;
  return new URL(url, `${getApiBaseUrl()}/`).toString();
};

const DEFAULT_SUBSCRIPTIONS = [
  {
    id: 'free',
    name: 'Gratuit',
    priceMonthly: 0,
    priceQuarterly: 0,
    priceHalfYear: 0,
    priceYearly: 0,
    currency: 'RON',
    tagline: 'Mentorul de gimnaziu, fără abonament',
    features: [
      { label: 'Mentor AI la română și matematică, clasele 5–8', included: true },
      { label: 'Întrebări nelimitate către mentor', included: true },
      { label: 'Capitole, flashcarduri și sesiuni de focus', included: true },
      { label: 'Magazin cosmetic cu monede câștigate din învățare', included: true },
      { label: 'Email către părinte la activitatea copilului', included: true }
    ]
  }
];

const normalizePlan = plan => ({
  ...plan,
  price: typeof plan.price === 'string' ? plan.price : `${Number(plan.priceMonthly || 0)} lei/lună`,
  description: plan.description || plan.tagline || '',
  features: (plan.features || []).map(feature => (typeof feature === 'string' ? { label: feature, included: true } : feature))
});

const mergeFetchOptions = options => {
  const { headers: extraHeaders, ...rest } = options || {};
  return {
    credentials: 'include',
    ...rest,
    headers: {
      ...siteAuthHeaders(getSiteStorage()),
      ...(extraHeaders || {})
    }
  };
};

const fetchWithTimeout = async (url, options = {}, timeout = DEFAULT_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  // `credentials: 'include'` trimite cookie-ul de sesiune. Fara el, fiecare
  // cerere ar parea neautentificata si ar primi 401.
  try {
    return await fetch(buildApiUrl(url), {
      ...mergeFetchOptions(options),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timer);
  }
};

const parseErrorPayload = async response => {
  const text = await response.text();
  if (isSiteGateBody(text)) {
    const failure = new Error(text.trim() || 'Acces restricționat.');
    failure.status = response.status;
    failure.siteGate = true;
    return failure;
  }
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = null; }
  const failure = new Error(payload?.error || `HTTP ${response.status}`);
  failure.status = response.status;
  failure.payload = payload;
  return failure;
};

const requestJson = async (url, options, timeout) => {
  try {
    return await fetchWithTimeout(url, options, timeout);
  } catch (error) {
    if (isAbortError(error) && askAndStoreSiteAuth(getSiteStorage())) {
      return fetchWithTimeout(url, options, timeout);
    }
    if (isAbortError(error)) {
      const failure = new Error(humanizeFetchError(error));
      failure.name = 'AbortError';
      throw failure;
    }
    throw error;
  }
};

const safeFetchJson = async (url, options, timeout) => {
  let response = await requestJson(url, options, timeout);
  if (response.status === 401) {
    const preview = await response.clone().text();
    if (isSiteGateBody(preview) && askAndStoreSiteAuth(getSiteStorage())) {
      response = await fetchWithTimeout(url, options, timeout);
    }
  }
  if (!response.ok) {
    throw await parseErrorPayload(response);
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
      return { success: false, data: null, error: humanizeFetchError(error), status: error.status, field: error.payload?.field };
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
      return { success: false, data: null, error: humanizeFetchError(error), status: error.status };
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

  async updateProfile(payload) {
    try {
      const data = await safeFetchJson('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getMySubscription() {
    try {
      const data = await safeFetchJson('/api/subscriptions/me');
      return { success: true, data };
    } catch (error) {
      return { success: false, data: null };
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
      }, 45000);
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

  async recordProgress(payload) {
    try {
      const data = await safeFetchJson('/api/economy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
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

  async getCurriculum(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const data = await safeFetchJson(`/api/curriculum${qs ? `?${qs}` : ''}`);
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

  async checkExercise(payload) {
    try {
      const data = await safeFetchJson('/api/flashcards/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async finishPractice(payload) {
    try {
      const data = await safeFetchJson('/api/flashcards/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true };
    }
  },

  async getSkillHistory() {
    try {
      const data = await safeFetchJson('/api/flashcards/history');
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: { log: [], strengths: [], weaknesses: [] }, fallback: true };
    }
  },

  async markPracticeSeen(payload) {
    try {
      const data = await safeFetchJson('/api/flashcards/seen', {
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
      const data = await safeFetchJson('/api/diagnostics/full', { method: 'POST' }, 40000);
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

export { MentorAPI, getApiBaseUrl };
export default MentorAPI;
