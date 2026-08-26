// Istoricul conversațiilor cu mentorul. Cheile sunt namespace-uite pe cont în
// routes/chat.js, iar datele sunt salvate pe disc prin persistence.js, deci
// conversația nu se mai pierde la restartul procesului.

const persistence = require("../data/persistence");

const MAX_MESSAGES = 15;
const store = {};

function get(conversationId) {
  return store[conversationId] || [];
}

function add(conversationId, role, content, metadata = {}) {
  if (!store[conversationId]) store[conversationId] = [];
  store[conversationId].push({ role, content, timestamp: Date.now(), metadata });
  if (store[conversationId].length > MAX_MESSAGES) {
    store[conversationId] = store[conversationId].slice(-MAX_MESSAGES);
  }
}

function clear(conversationId) {
  delete store[conversationId];
}

function all() {
  return store;
}

function prefixForEmail(email) {
  return `${String(email || "").trim().toLowerCase()}::`;
}

function exportForEmail(email) {
  const prefix = prefixForEmail(email);
  const conversations = {};
  for (const [key, value] of Object.entries(store)) {
    if (key.startsWith(prefix)) conversations[key.slice(prefix.length)] = value;
  }
  return conversations;
}

function deleteForEmail(email) {
  const prefix = prefixForEmail(email);
  for (const key of Object.keys(store)) {
    if (key.startsWith(prefix)) delete store[key];
  }
}

persistence.register("memory", {
  snapshot: () => store,
  restore: data => persistence.restoreObject(store, data)
});

module.exports = { get, add, clear, all, exportForEmail, deleteForEmail, MAX_MESSAGES };
