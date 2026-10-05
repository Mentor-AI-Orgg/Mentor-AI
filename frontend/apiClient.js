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
  async checkUsername(username) {
    try {
      const data = await safeFetchJson('/api/auth/username-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return { ok: Boolean(data.ok), error: data.error || '', code: data.code || '' };
    } catch (error) {
      return { ok: false, error: humanizeFetchError(error), code: error.payload?.code || '' };
    }
  },

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

  async resetPassword(payload) {
    try {
      const data = await safeFetchJson('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async peekConsent(token) {
    try {
      const data = await safeFetchJson(`/api/auth/consent/${encodeURIComponent(token || '')}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async confirmConsent(payload) {
    try {
      const data = await safeFetchJson('/api/auth/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async resendConsent() {
    try {
      const data = await safeFetchJson('/api/auth/consent/resend', { method: 'POST' });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async setConsentParentEmail(payload) {
    try {
      const data = await safeFetchJson('/api/auth/consent/parent-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentMagic(payload) {
    try {
      const data = await safeFetchJson('/api/parent/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentConsume(payload) {
    try {
      const data = await safeFetchJson('/api/parent/magic/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async mistakes() {
    try {
      const data = await safeFetchJson('/api/mistakes');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async reviewMistake(payload) {
    try {
      const data = await safeFetchJson('/api/mistakes/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async placement() {
    try {
      const data = await safeFetchJson('/api/placement');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async placementQuestions(subject) {
    try {
      const data = await safeFetchJson('/api/placement/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async placementSkip() {
    try {
      const data = await safeFetchJson('/api/placement/skip', { method: 'POST' });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async placementFinish(payload) {
    try {
      const data = await safeFetchJson('/api/placement/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentMe() {
    try {
      const data = await safeFetchJson('/api/parent/me');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentExport(id) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/export`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentPanel(id) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/panel`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentLimit(id, minutes) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/limit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentFriends(id, payload) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentEmails(id, payload) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentPrivacy(id) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/privacy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profilePrivate: true })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async parentDelete(id, payload) {
    try {
      const data = await safeFetchJson(`/api/parent/children/${encodeURIComponent(id)}/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
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
      return { success: false, error: error.message, field: error.payload?.field };
    }
  },

  async changePassword(payload) {
    try {
      const data = await safeFetchJson('/api/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getFriends() {
    try {
      const data = await safeFetchJson('/api/friends/me');
      return { success: true, data };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  async updateFriendSettings(payload) {
    try {
      const data = await safeFetchJson('/api/friends/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async searchStudents(query) {
    try {
      const data = await safeFetchJson(`/api/friends/search?q=${encodeURIComponent(query)}`);
      return { success: true, data: data.results || [] };
    } catch (error) {
      return { success: false, data: [], error: error.message };
    }
  },

  async getStudentProfile(id) {
    try {
      const data = await safeFetchJson(`/api/friends/profile/${encodeURIComponent(id)}`);
      return { success: true, data: data.profile };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  async sendFriendByCode(code) {
    try {
      const data = await safeFetchJson('/api/friends/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async sendFriendRequest(userId) {
    try {
      const data = await safeFetchJson('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message, status: error.status };
    }
  },

  async respondFriendRequest(requestId, action) {
    try {
      const data = await safeFetchJson('/api/friends/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId, action })
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

  async deleteAccount({ password, confirm } = {}) {
    try {
      const data = await safeFetchJson('/api/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirm })
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

  async equipItem(payload) {
    try {
      const data = await safeFetchJson('/api/economy/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (data.ok === false) return { success: false, data, error: data.error || data.reason };
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

  async revealLessonAnswers(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/lesson-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, reveal: true })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async reportStudent({ userId, reason, note }) {
    try {
      const data = await safeFetchJson('/api/friends/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, reason, note })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async blockStudent(userId) {
    try {
      const data = await safeFetchJson('/api/friends/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async renameUsername(username) {
    try {
      const data = await safeFetchJson('/api/account/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async creatorStatus() {
    try {
      const data = await safeFetchJson('/api/creator/status');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async moderationReports() {
    try {
      const data = await safeFetchJson('/api/moderation/reports');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async moderate(id, action) {
    try {
      const data = await safeFetchJson(`/api/moderation/reports/${encodeURIComponent(id)}/${action}`, { method: 'POST' });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
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
      return { success: false, data: { events: [], orar: [], connections: { google: { connected: false }, notion: { connected: false } } }, fallback: true };
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

  async patchCalendarEvent(eventId, payload) {
    try {
      const data = await safeFetchJson(`/api/calendar/events/${eventId}`, {
        method: 'PATCH',
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

  async generateEnPaper(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/papers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message };
    }
  },

  async openEnPaper(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/papers/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message };
    }
  },

  async startEnPaper(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/papers/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message };
    }
  },

  async finishEnPaper(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/papers/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message, waitMs: error.payload?.waitMs };
    }
  },

  async revealEnBarem(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/barem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message, waitMs: error.payload?.waitMs };
    }
  },

  async selfScoreEnPaper(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/papers/self-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message };
    }
  },

  async reviewEnPhoto(payload) {
    try {
      const data = await safeFetchJson('/api/curriculum/en/photo-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data, fallback: false };
    } catch (error) {
      return { success: false, data: null, fallback: true, error: error.message, photoQuota: error.payload?.photoQuota };
    }
  },

  async getCardDeck(payload) {
    try {
      const data = await safeFetchJson('/api/cards/deck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async rateCard(payload) {
    try {
      const data = await safeFetchJson('/api/cards/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getCardSummary({ subject, class_level: classLevel, chapter_id: chapterId }) {
    try {
      const params = new URLSearchParams({
        subject: subject || 'matematica',
        class_level: String(classLevel || ''),
        chapter_id: chapterId || ''
      });
      const data = await safeFetchJson(`/api/cards/summary?${params.toString()}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async listProblems({ subject, class_level: classLevel, chapter_id: chapterId, lesson_id: lessonId }) {
    try {
      const params = new URLSearchParams({
        subject: subject || 'matematica',
        class_level: String(classLevel || ''),
        chapter_id: chapterId || ''
      });
      if (lessonId) params.set('lesson_id', lessonId);
      const data = await safeFetchJson(`/api/problems?${params.toString()}`);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async checkProblemStep(payload) {
    try {
      const data = await safeFetchJson('/api/problems/check-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async revealProblem(payload) {
    try {
      const data = await safeFetchJson('/api/problems/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async selfScoreProblem(payload) {
    try {
      const data = await safeFetchJson('/api/problems/self-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
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
