// mock memorie

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

module.exports = { get, add, clear, all, MAX_MESSAGES };
