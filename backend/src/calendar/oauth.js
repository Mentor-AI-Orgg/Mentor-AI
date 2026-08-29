// Google Calendar + Notion OAuth. Fără client id/secret, ruta /connect
// rămâne pe mock etichetat. Tokenii stau doar în calendarStore (pe disc).

const crypto = require("crypto");
const config = require("../config");

const STATE_TTL_MS = 10 * 60 * 1000;
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

function googleConfigured() {
  return Boolean(config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET);
}

function notionConfigured() {
  return Boolean(config.NOTION_CLIENT_ID && config.NOTION_CLIENT_SECRET);
}

function isConfigured(provider) {
  if (provider === "google") return googleConfigured();
  if (provider === "notion") return notionConfigured();
  return false;
}

function callbackUrl(baseUrl, provider) {
  return `${String(baseUrl).replace(/\/$/, "")}/api/calendar/oauth/${provider}/callback`;
}

function signState(payload) {
  const json = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", config.OAUTH_STATE_SECRET).update(json).digest("base64url");
  return `${json}.${mac}`;
}

function verifyState(state) {
  const [json, mac] = String(state || "").split(".");
  if (!json || !mac) return null;
  const expected = crypto.createHmac("sha256", config.OAUTH_STATE_SECRET).update(json).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(json, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!payload || payload.exp < Date.now()) return null;
  return payload;
}

function buildAuthorizeUrl({ provider, email, baseUrl }) {
  const state = signState({ email, provider, exp: Date.now() + STATE_TTL_MS });
  const redirectUri = callbackUrl(baseUrl, provider);

  if (provider === "google") {
    const params = new URLSearchParams({
      client_id: config.GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: GOOGLE_SCOPE,
      access_type: "offline",
      prompt: "consent",
      state
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  const params = new URLSearchParams({
    client_id: config.NOTION_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    owner: "user",
    state
  });
  return `https://api.notion.com/v1/oauth/authorize?${params}`;
}

async function exchangeGoogleCode({ code, redirectUri }) {
  const body = new URLSearchParams({
    code,
    client_id: config.GOOGLE_CLIENT_ID,
    client_secret: config.GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(10000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    return { ok: false, reason: "google_token" };
  }
  return {
    ok: true,
    tokens: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || "",
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : null
    }
  };
}

async function exchangeNotionCode({ code, redirectUri }) {
  const auth = Buffer.from(`${config.NOTION_CLIENT_ID}:${config.NOTION_CLIENT_SECRET}`).toString("base64");
  const response = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    }),
    signal: AbortSignal.timeout(10000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    return { ok: false, reason: "notion_token" };
  }
  return {
    ok: true,
    tokens: {
      accessToken: data.access_token,
      refreshToken: "",
      expiresAt: null
    }
  };
}

async function fetchGoogleEvents(accessToken) {
  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setDate(timeMax.getDate() + 21);
  const params = new URLSearchParams({
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "25"
  });
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10000)
    }
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok) return [];
  return (data.items || [])
    .map(item => {
      const start = item.start?.date || String(item.start?.dateTime || "").slice(0, 10);
      if (!start) return null;
      return {
        date: start,
        title: item.summary || "Eveniment Google Calendar",
        type: "sync",
        source: "google"
      };
    })
    .filter(Boolean);
}

function notionTitle(page) {
  const properties = page.properties || {};
  for (const value of Object.values(properties)) {
    if (value && value.type === "title") {
      const text = (value.title || []).map(part => part.plain_text || "").join("").trim();
      if (text) return text;
    }
  }
  return page.url || "Pagină Notion";
}

function notionDate(page) {
  const properties = page.properties || {};
  for (const value of Object.values(properties)) {
    if (value && value.type === "date" && value.date?.start) {
      return String(value.date.start).slice(0, 10);
    }
  }
  if (page.created_time) return String(page.created_time).slice(0, 10);
  return null;
}

async function fetchNotionEvents(accessToken) {
  const response = await fetch("https://api.notion.com/v1/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      page_size: 20,
      filter: { property: "object", value: "page" }
    }),
    signal: AbortSignal.timeout(10000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) return [];
  return (data.results || [])
    .map(page => {
      const date = notionDate(page);
      if (!date) return null;
      return {
        date,
        title: notionTitle(page),
        type: "sync",
        source: "notion"
      };
    })
    .filter(Boolean);
}

async function handleCallback({ provider, code, state, error, baseUrl }) {
  if (error) return { ok: false, reason: String(error) };
  if (!code) return { ok: false, reason: "missing_code" };
  const payload = verifyState(state);
  if (!payload || payload.provider !== provider) return { ok: false, reason: "invalid_state" };
  if (!isConfigured(provider)) return { ok: false, reason: "not_configured" };

  const redirectUri = callbackUrl(baseUrl, provider);
  const exchanged = provider === "google"
    ? await exchangeGoogleCode({ code, redirectUri })
    : await exchangeNotionCode({ code, redirectUri });
  if (!exchanged.ok) return exchanged;

  const events = provider === "google"
    ? await fetchGoogleEvents(exchanged.tokens.accessToken)
    : await fetchNotionEvents(exchanged.tokens.accessToken);

  return {
    ok: true,
    email: payload.email,
    provider,
    tokens: exchanged.tokens,
    events
  };
}

module.exports = {
  googleConfigured,
  notionConfigured,
  isConfigured,
  buildAuthorizeUrl,
  handleCallback,
  verifyState
};
