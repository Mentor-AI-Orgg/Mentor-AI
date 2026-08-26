// Store pt evenimente de calendar + status de conectare provider extern.
// Conectarea la Google/Notion este inca mock: de inlocuit cu OAuth real
// (Google Calendar API / Notion API) cand exista credentiale server-side.
// Datele sunt salvate pe disc prin persistence.js.

const persistence = require("./persistence");

const eventsByUser = {};      // { userId: [ {id, date:'YYYY-MM-DD', title, type, source}, ... ] }
const connectionsByUser = {}; // { userId: { google: {connected, connectedAt}, notion: {...} } }

function getEvents(userId) {
  return eventsByUser[userId] || [];
}

function addEvent(userId, event) {
  if (!eventsByUser[userId]) eventsByUser[userId] = [];
  const record = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    date: event.date,
    title: event.title,
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
  return connectionsByUser[userId] || { google: { connected: false }, notion: { connected: false } };
}

// Simuleaza un "connect" catre Google Calendar / Notion Calendar.
// Fara chei OAuth reale in .env, generam cateva evenimente demo ca sa aratam
// fluxul de auto-sincronizare. Cand exista GOOGLE_CLIENT_ID/SECRET sau
// NOTION_TOKEN in .env, acest mock trebuie inlocuit cu fluxul OAuth real.
function connectProvider(userId, provider) {
  if (!connectionsByUser[userId]) connectionsByUser[userId] = { google: { connected: false }, notion: { connected: false } };
  connectionsByUser[userId][provider] = { connected: true, connectedAt: new Date().toISOString(), mocked: true };

  const today = new Date();
  const demoEvents = [
    { offset: 1, title: provider === "google" ? "Curs Matematică (sincronizat)" : "Recapitulare Notion – Fizică", type: "sync" },
    { offset: 3, title: provider === "google" ? "Test Chimie (Google Calendar)" : "Deadline temă – Notion", type: "sync" },
    { offset: 6, title: provider === "google" ? "Simulare BAC (Google Calendar)" : "Sesiune focus – Notion", type: "sync" }
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

  return { connection: connectionsByUser[userId][provider], syncedEvents: added };
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

module.exports = { getEvents, addEvent, deleteEvent, getConnections, connectProvider, disconnectProvider, deleteUser };
