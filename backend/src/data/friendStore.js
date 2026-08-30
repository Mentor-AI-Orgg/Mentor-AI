// Prietenii între elevi: căutare după nume/username, cereri, limită zilnică.
// Emailul nu iese niciodată pe API. Profilul privat nu apare la căutare.

const crypto = require("crypto");
const persistence = require("./persistence");
const { findAccount, listAccounts, normalizeEmail } = require("./authStore");
const { ensureUser, getUser } = require("./economyStore");
const { levelFromXp } = require("./progressEngine");

const SETTINGS = new Map();
const FRIENDS = new Map();
const REQUESTS = [];
const SENDS = new Map();

const DAILY_REQUEST_LIMIT = 10;

const publicId = email =>
  crypto.createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 12);

const todayKey = () => new Date().toISOString().slice(0, 10);

function getSettings(email) {
  const key = normalizeEmail(email);
  if (!SETTINGS.has(key)) {
    SETTINGS.set(key, { profilePrivate: false, acceptFriendRequests: true });
  }
  return SETTINGS.get(key);
}

function setSettings(email, patch = {}) {
  const current = getSettings(email);
  if (patch.profilePrivate !== undefined) current.profilePrivate = Boolean(patch.profilePrivate);
  if (patch.acceptFriendRequests !== undefined) current.acceptFriendRequests = Boolean(patch.acceptFriendRequests);
  return { ...current };
}

function friendList(email) {
  const key = normalizeEmail(email);
  if (!FRIENDS.has(key)) FRIENDS.set(key, []);
  return FRIENDS.get(key);
}

function areFriends(a, b) {
  return friendList(a).includes(normalizeEmail(b));
}

function addFriendship(a, b) {
  const left = normalizeEmail(a);
  const right = normalizeEmail(b);
  const first = friendList(left);
  const second = friendList(right);
  if (!first.includes(right)) first.push(right);
  if (!second.includes(left)) second.push(left);
}

function findByPublicId(id) {
  const needle = String(id || "").trim();
  return listAccounts().find(account => publicId(account.email) === needle) || null;
}

function sendsToday(email) {
  const key = normalizeEmail(email);
  const row = SENDS.get(key);
  const today = todayKey();
  if (!row || row.date !== today) {
    SENDS.set(key, { date: today, count: 0 });
  }
  return SENDS.get(key);
}

function publicCard(account, viewerEmail = "") {
  if (!account || account.role !== "student") return null;
  const settings = getSettings(account.email);
  const viewer = normalizeEmail(viewerEmail);
  const self = viewer && viewer === account.email;
  const friend = Boolean(viewer && areFriends(viewer, account.email));
  if (settings.profilePrivate && !self && !friend) {
    return {
      id: publicId(account.email),
      private: true,
      name: "Profil privat",
      username: "",
      class: "",
      school: "",
      level: 1,
      xp: 0,
      avatarId: "",
      friends: false,
      outgoing: false,
      incoming: false,
      acceptFriendRequests: false
    };
  }
  const user = getUser(account.email) || ensureUser(account.email, {
    role: "student",
    className: account.profile.class,
    profileName: account.profile.name,
    username: account.profile.username
  });
  const xp = Number(user.xp || 0);
  const pendingOut = REQUESTS.find(item => item.status === "pending" && item.from === viewer && item.to === account.email);
  const pendingIn = REQUESTS.find(item => item.status === "pending" && item.from === account.email && item.to === viewer);
  return {
    id: publicId(account.email),
    private: false,
    name: account.profile.name || account.profile.username || "Elev",
    username: account.profile.username || "",
    class: account.profile.class || "",
    school: account.profile.school || "",
    level: levelFromXp(xp).level,
    xp,
    avatarId: user.equipped?.avatar || "",
    friends: friend,
    outgoing: Boolean(pendingOut),
    incoming: Boolean(pendingIn),
    incomingRequestId: pendingIn?.id || "",
    acceptFriendRequests: settings.acceptFriendRequests !== false
  };
}

function searchStudents(query, viewerEmail) {
  const q = String(query || "").trim().toLowerCase();
  if (q.length < 2) return [];
  const viewer = normalizeEmail(viewerEmail);
  return listAccounts()
    .filter(account => account.role === "student" && account.email !== viewer)
    .filter(account => {
      const settings = getSettings(account.email);
      if (settings.profilePrivate && !areFriends(viewer, account.email)) return false;
      const name = String(account.profile?.name || "").toLowerCase();
      const username = String(account.profile?.username || "").toLowerCase();
      return name.includes(q) || username.includes(q);
    })
    .slice(0, 12)
    .map(account => publicCard(account, viewer));
}

function sendRequest(fromEmail, toPublicId) {
  const from = findAccount(fromEmail);
  const to = findByPublicId(toPublicId);
  if (!from || from.role !== "student") return { ok: false, error: "Doar elevii pot trimite cereri.", status: 403 };
  if (!to || to.role !== "student") return { ok: false, error: "Nu am găsit acest elev.", status: 404 };
  if (to.email === from.email) return { ok: false, error: "Nu te poți adăuga pe tine.", status: 400 };
  if (areFriends(from.email, to.email)) return { ok: false, error: "Sunteți deja prieteni.", status: 400 };

  const settings = getSettings(to.email);
  if (settings.profilePrivate && !areFriends(from.email, to.email)) {
    return { ok: false, error: "Acest profil este privat.", status: 403 };
  }
  if (settings.acceptFriendRequests === false) {
    return { ok: false, error: "Elevul nu acceptă cereri de prietenie.", status: 403 };
  }

  const existing = REQUESTS.find(item => (
    item.status === "pending"
    && ((item.from === from.email && item.to === to.email) || (item.from === to.email && item.to === from.email))
  ));
  if (existing) return { ok: false, error: "Există deja o cerere în așteptare.", status: 400 };

  const quota = sendsToday(from.email);
  if (quota.count >= DAILY_REQUEST_LIMIT) {
    return { ok: false, error: `Poți trimite cel mult ${DAILY_REQUEST_LIMIT} cereri pe zi.`, status: 429 };
  }

  const request = {
    id: `fr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    from: from.email,
    to: to.email,
    at: new Date().toISOString(),
    status: "pending"
  };
  REQUESTS.push(request);
  quota.count += 1;
  return { ok: true, request: { id: request.id, status: request.status }, remaining: DAILY_REQUEST_LIMIT - quota.count };
}

function respondRequest(actorEmail, requestId, action) {
  const request = REQUESTS.find(item => item.id === requestId);
  if (!request || request.status !== "pending") {
    return { ok: false, error: "Cererea nu mai este activă.", status: 404 };
  }
  const actor = normalizeEmail(actorEmail);
  if (request.to !== actor) {
    return { ok: false, error: "Doar destinatarul poate răspunde.", status: 403 };
  }
  if (action === "accept") {
    request.status = "accepted";
    addFriendship(request.from, request.to);
  } else {
    request.status = "declined";
  }
  return { ok: true, status: request.status };
}

function inboxFor(email) {
  const key = normalizeEmail(email);
  const incoming = REQUESTS
    .filter(item => item.status === "pending" && item.to === key)
    .map(item => ({ id: item.id, at: item.at, from: publicCard(findAccount(item.from), key) }));
  const outgoing = REQUESTS
    .filter(item => item.status === "pending" && item.from === key)
    .map(item => ({ id: item.id, at: item.at, to: publicCard(findAccount(item.to), key) }));
  const friends = friendList(key)
    .map(other => publicCard(findAccount(other), key))
    .filter(Boolean)
    .sort((a, b) => (Number(b.xp) || 0) - (Number(a.xp) || 0) || String(a.name || '').localeCompare(String(b.name || ''), 'ro'));
  const quota = sendsToday(key);
  return {
    settings: { ...getSettings(key) },
    friends,
    incoming,
    outgoing,
    remainingToday: Math.max(0, DAILY_REQUEST_LIMIT - quota.count),
    dailyLimit: DAILY_REQUEST_LIMIT
  };
}

function isPrivateEmail(email) {
  return getSettings(email).profilePrivate === true;
}

function isPrivatePublicId(id) {
  const account = findByPublicId(id);
  return Boolean(account && isPrivateEmail(account.email));
}

persistence.register("friends", {
  snapshot: () => ({
    settings: persistence.mapToObject(SETTINGS),
    friends: persistence.mapToObject(FRIENDS),
    requests: REQUESTS.slice(),
    sends: persistence.mapToObject(SENDS)
  }),
  restore: data => {
    persistence.restoreMap(SETTINGS, data?.settings);
    persistence.restoreMap(FRIENDS, data?.friends);
    REQUESTS.splice(0, REQUESTS.length, ...(Array.isArray(data?.requests) ? data.requests : []));
    persistence.restoreMap(SENDS, data?.sends);
  }
});

module.exports = {
  DAILY_REQUEST_LIMIT,
  publicId,
  getSettings,
  setSettings,
  publicCard,
  searchStudents,
  sendRequest,
  respondRequest,
  inboxFor,
  findByPublicId,
  isPrivatePublicId,
  areFriends
};
