// Prietenii între elevi: căutare după nume/username, cereri, limită zilnică.
// Emailul nu iese niciodată pe API. Profilul privat nu apare la căutare.

const crypto = require("crypto");
const persistence = require("./persistence");
const { findAccount, listAccounts, normalizeEmail } = require("./authStore");
const { ensureUser, getUser } = require("./economyStore");
const { levelFromXp } = require("./progressEngine");
const { titleById } = require("./titles");
const { shopItemById } = require("./shopCatalog");

const SETTINGS = new Map();
const FRIENDS = new Map();
const REQUESTS = [];
const SENDS = new Map();
const BLOCKS = new Set();

const DAILY_REQUEST_LIMIT = 10;

const publicId = email =>
  crypto.createHash("sha256").update(normalizeEmail(email)).digest("hex").slice(0, 12);

const todayKey = () => new Date().toISOString().slice(0, 10);

function getSettings(email) {
  const key = normalizeEmail(email);
  if (!SETTINGS.has(key)) {
    SETTINGS.set(key, { profilePrivate: true, acceptFriendRequests: true });
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

function blockKey(a, b) {
  return [normalizeEmail(a), normalizeEmail(b)].sort().join("|");
}

function isBlocked(a, b) {
  if (!a || !b) return false;
  return BLOCKS.has(blockKey(a, b));
}

function blockPair(a, b) {
  const from = normalizeEmail(a);
  const to = normalizeEmail(b);
  if (!from || !to || from === to) return { ok: false, error: "Nu te poți bloca pe tine.", status: 400 };
  BLOCKS.add(blockKey(from, to));
  FRIENDS.set(from, friendList(from).filter(item => item !== to));
  FRIENDS.set(to, friendList(to).filter(item => item !== from));
  for (let i = REQUESTS.length - 1; i >= 0; i -= 1) {
    const item = REQUESTS[i];
    if ((item.from === from && item.to === to) || (item.from === to && item.to === from)) {
      REQUESTS.splice(i, 1);
    }
  }
  return { ok: true };
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
  if (viewer && !self && isBlocked(viewer, account.email)) return null;
  const friend = Boolean(viewer && areFriends(viewer, account.email));
  if (settings.profilePrivate && !self && !friend) {
    const handle = account.profile.username || "Elev";
    return {
      id: publicId(account.email),
      private: true,
      name: handle,
      username: account.profile.username || "",
      class: "",
      school: "",
      level: 1,
      xp: 0,
      avatarId: "",
      friends: false,
      outgoing: false,
      incoming: false,
      acceptFriendRequests: settings.acceptFriendRequests !== false
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
  const visibleName = self
    ? (account.profile.name || account.profile.username || "Elev")
    : (account.profile.username || "Elev");
  return {
    id: publicId(account.email),
    private: false,
    name: visibleName,
    username: account.profile.username || "",
    class: self ? (account.profile.class || "") : "",
    school: self ? (account.profile.school || "") : "",
    level: levelFromXp(xp).level,
    xp,
    avatarId: user.equipped?.avatar || "",
    avatarEmoji: shopItemById(user.equipped?.avatar)?.emoji || "",
    title: titleById(user.equipped?.title)?.name || "",
    titleEmoji: titleById(user.equipped?.title)?.emoji || "",
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
    .filter(account => account.role === "student" && account.email !== viewer && !isBlocked(viewer, account.email))
    .filter(account => String(account.profile?.username || "").toLowerCase() === q)
    .slice(0, 8)
    .map(account => publicCard(account, viewer));
}

function sendRequest(fromEmail, toPublicId) {
  const from = findAccount(fromEmail);
  const to = findByPublicId(toPublicId);
  if (!from || from.role !== "student") return { ok: false, error: "Doar elevii pot trimite cereri.", status: 403 };
  if (!to || to.role !== "student") return { ok: false, error: "Nu am găsit acest elev.", status: 404 };
  if (to.email === from.email) return { ok: false, error: "Nu te poți adăuga pe tine.", status: 400 };
  if (isBlocked(from.email, to.email)) return { ok: false, error: "Nu puteți comunica.", status: 403 };
  if (areFriends(from.email, to.email)) return { ok: false, error: "Sunteți deja prieteni.", status: 400 };

  const settings = getSettings(to.email);
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
    .map(item => ({ id: item.id, at: item.at, from: publicCard(findAccount(item.from), key) }))
    .filter(item => item.from);
  const outgoing = REQUESTS
    .filter(item => item.status === "pending" && item.from === key)
    .map(item => ({ id: item.id, at: item.at, to: publicCard(findAccount(item.to), key) }));
  const friends = friendList(key)
    .filter(other => !isBlocked(key, other))
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

function exportFriendsFor(email) {
  const key = normalizeEmail(email);
  const utilizatori = friendList(key).map(other => findAccount(other)?.profile?.username || "").filter(Boolean);
  const cereri = REQUESTS
    .filter(item => item.from === key || item.to === key)
    .map(item => ({
      stare: item.status,
      la: item.at,
      sens: item.from === key ? "trimisa" : "primita",
      utilizator: findAccount(item.from === key ? item.to : item.from)?.profile?.username || ""
    }));
  return {
    utilizatori,
    cereri,
    profilPrivat: Boolean(SETTINGS.get(key)?.profilePrivate)
  };
}

function eraseFriendsFor(email) {
  const key = normalizeEmail(email);
  SETTINGS.delete(key);
  FRIENDS.delete(key);
  for (const [other, list] of FRIENDS.entries()) {
    FRIENDS.set(other, (list || []).filter(item => item !== key));
  }
  for (let i = REQUESTS.length - 1; i >= 0; i -= 1) {
    if (REQUESTS[i].from === key || REQUESTS[i].to === key) REQUESTS.splice(i, 1);
  }
  SENDS.delete(key);
  for (const pair of [...BLOCKS]) {
    if (pair.split("|").includes(key)) BLOCKS.delete(pair);
  }
}

require("./userDataRegistry").register("friends", {
  exportFor: exportFriendsFor,
  eraseFor: eraseFriendsFor
});

persistence.register("friends", {
  snapshot: () => ({
    settings: persistence.mapToObject(SETTINGS),
    friends: persistence.mapToObject(FRIENDS),
    requests: REQUESTS.slice(),
    sends: persistence.mapToObject(SENDS),
    blocks: [...BLOCKS]
  }),
  restore: data => {
    persistence.restoreMap(SETTINGS, data?.settings);
    persistence.restoreMap(FRIENDS, data?.friends);
    REQUESTS.splice(0, REQUESTS.length, ...(Array.isArray(data?.requests) ? data.requests : []));
    persistence.restoreMap(SENDS, data?.sends);
    BLOCKS.clear();
    (Array.isArray(data?.blocks) ? data.blocks : []).forEach(pair => BLOCKS.add(String(pair)));
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
  areFriends,
  isBlocked,
  blockPair
};
