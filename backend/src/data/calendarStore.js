// Store pt evenimente de calendar + status de conectare provider extern.
// Google/Notion: OAuth real când există credențiale; altfel connect rămâne
// mock etichetat (demo events). Tokenii nu sunt expuși în API-ul public.
// Datele sunt salvate pe disc prin persistence.js.

const persistence = require("./persistence");

const eventsByUser = {};      // { userId: [ {id, date:'YYYY-MM-DD', title, type, source}, ... ] }
const connectionsByUser = {}; // { userId: { google: {connected, ...tokens}, notion: {...} } }

function publicConnection(conn) {
  if (!conn || !conn.connected) return { connected: false };
  return {
    connected: true,
    connectedAt: conn.connectedAt || null,
    mocked: Boolean(conn.mocked)
  };
}

function getEvents(userId) {
  return eventsByUser[userId] || [];
}

function addEvent(userId, event) {
  if (!eventsByUser[userId]) eventsByUser[userId] = [];
  const record = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    date: event.date,
    title: event.title,
    time: event.time || "",
    type: event.type || "custom",
    source: event.source || "manual"
  };
  eventsByUser[userId].push(record);
  return record;
}

function deleteEvent(userId, eventId) {
  if (!eventsByUser[userId]) return false;
  const before = eventsByUser[userId].length;
  eventsByUser[userId] = eventsByUser[userId].filter(e => e.id !== eventId);
  return eventsByUser[userId].length !== before;
}

function getConnections(userId) {
  const raw = connectionsByUser[userId] || { google: { connected: false }, notion: { connected: false } };
  return {
    google: publicConnection(raw.google),
    notion: publicConnection(raw.notion)
  };
}

function replaceSyncedEvents(userId, provider, events) {
  if (!eventsByUser[userId]) eventsByUser[userId] = [];
  eventsByUser[userId] = eventsByUser[userId].filter(e => e.source !== provider);
  return (events || []).map(event => addEvent(userId, { ...event, source: provider, type: event.type || "sync" }));
}

// Conectare mock: câteva evenimente demo ca să arătăm fluxul. Când extra.mocked
// e false (după OAuth real), nu adăugăm evenimente fabricate.
function connectProvider(userId, provider, extra = {}) {
  if (!connectionsByUser[userId]) connectionsByUser[userId] = { google: { connected: false }, notion: { connected: false } };
  const mocked = extra.mocked !== false;
  connectionsByUser[userId][provider] = {
    connected: true,
    connectedAt: new Date().toISOString(),
    mocked,
    accessToken: extra.tokens?.accessToken || extra.accessToken || "",
    refreshToken: extra.tokens?.refreshToken || extra.refreshToken || "",
    expiresAt: extra.tokens?.expiresAt || extra.expiresAt || null
  };

  if (!mocked) {
    return { connection: publicConnection(connectionsByUser[userId][provider]), syncedEvents: [] };
  }

  const today = new Date();
  const demoEvents = [
    { offset: 1, title: provider === "google" ? "Curs Matematică (sincronizat)" : "Recapitulare Notion – Română", type: "sync" },
    { offset: 3, title: provider === "google" ? "Exerciții de mate (Google Calendar)" : "Deadline temă – Notion", type: "sync" },
    { offset: 6, title: provider === "google" ? "Pregătire Evaluare (Google Calendar)" : "Sesiune focus – Notion", type: "sync" }
  ];

  const added = demoEvents.map(({ offset, title, type }) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return addEvent(userId, {
      date: d.toISOString().slice(0, 10),
      title,
      type,
      source: provider
    });
  });

  return { connection: publicConnection(connectionsByUser[userId][provider]), syncedEvents: added };
}

function disconnectProvider(userId, provider) {
  if (!connectionsByUser[userId]) return;
  connectionsByUser[userId][provider] = { connected: false };
  if (eventsByUser[userId]) {
    eventsByUser[userId] = eventsByUser[userId].filter(e => e.source !== provider);
  }
}

function deleteUser(userId) {
  delete eventsByUser[userId];
  delete connectionsByUser[userId];
}

persistence.register("calendar", {
  snapshot: () => ({ events: eventsByUser, connections: connectionsByUser }),
  restore: data => {
    persistence.restoreObject(eventsByUser, data?.events);
    persistence.restoreObject(connectionsByUser, data?.connections);
  }
});

module.exports = {
  getEvents,
  addEvent,
  deleteEvent,
  getConnections,
  connectProvider,
  disconnectProvider,
  replaceSyncedEvents,
  deleteUser
};
