// Legături între conturi (părinte-copil, profesor-elev), pe bază de invitație
// acceptată.
//
// Varianta anterioară lega două conturi instant, pe baza unui singur email
// introdus de o singură parte. Practic, oricine îi știa adresa unui copil
// putea deveni „părintele" sau „profesorul" lui și îi vedea `afkRisk`,
// `copiedRisk`, `mentorMessages` și `detectHistory`. Acum legătura există doar
// dacă celălalt cont apasă explicit „Accept".
//
// Ca tot restul aplicației, datele stau în memorie (vezi Faza 2 din
// plan-imbunatatiri.md).

const crypto = require("crypto");
const {
  ensureUser,
  pushNotification,
  logActivity,
  listStudentEmailsForTeacher
} = require("./economyStore");

const INVITATIONS = new Map(); // id -> invitație

const KINDS = ["parent_child", "teacher_student"];
const INVITATION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 de zile

const normalize = email => String(email || "").trim().toLowerCase();

// Perechile de roluri acceptate pentru fiecare tip de legătură. Verificarea se
// face la ACCEPT, nu la invitație: la momentul invitației contul destinatar
// poate să nu existe încă, iar un răspuns diferit pentru „adresă inexistentă"
// ar dezvălui cine are cont.
const ROLE_PAIRS = {
  parent_child: { parent: "parent", child: "student" },
  teacher_student: { teacher: "teacher", student: "student" }
};

function isExpired(invitation) {
  return Date.now() > new Date(invitation.createdAt).getTime() + INVITATION_TTL_MS;
}

function publicInvitation(invitation) {
  return {
    id: invitation.id,
    kind: invitation.kind,
    fromEmail: invitation.fromEmail,
    fromRole: invitation.fromRole,
    toEmail: invitation.toEmail,
    status: invitation.status,
    createdAt: invitation.createdAt,
    respondedAt: invitation.respondedAt || null
  };
}

function findPending({ fromEmail, toEmail, kind }) {
  for (const invitation of INVITATIONS.values()) {
    if (
      invitation.status === "pending" &&
      invitation.kind === kind &&
      !isExpired(invitation) &&
      ((invitation.fromEmail === fromEmail && invitation.toEmail === toEmail) ||
        (invitation.fromEmail === toEmail && invitation.toEmail === fromEmail))
    ) {
      return invitation;
    }
  }
  return null;
}

function createInvitation({ fromEmail, fromRole, toEmail, kind }) {
  const from = normalize(fromEmail);
  const to = normalize(toEmail);

  if (!to) return { ok: false, reason: "missing_target" };
  if (!KINDS.includes(kind)) return { ok: false, reason: "unknown_kind" };
  if (from === to) return { ok: false, reason: "self_invite" };

  // Rolul expeditorului trebuie să fie una dintre cele două părți ale
  // legăturii cerute.
  const allowedRoles = Object.values(ROLE_PAIRS[kind]);
  if (!allowedRoles.includes(fromRole)) return { ok: false, reason: "role_not_allowed" };

  const existing = findPending({ fromEmail: from, toEmail: to, kind });
  if (existing) return { ok: false, reason: "already_pending", invitation: publicInvitation(existing) };

  const invitation = {
    id: `inv_${crypto.randomBytes(8).toString("hex")}`,
    kind,
    fromEmail: from,
    fromRole,
    toEmail: to,
    status: "pending",
    createdAt: new Date().toISOString(),
    respondedAt: null
  };
  INVITATIONS.set(invitation.id, invitation);

  const label = kind === "parent_child" ? "părinte" : "profesor";
  pushNotification(
    to,
    to,
    "Invitație de conectare",
    `${from} vrea să îți conecteze contul ca ${label}. Deschide secțiunea de invitații pentru a accepta sau refuza. Până accepți, nu are acces la datele tale.`,
    "invitation"
  );

  return { ok: true, invitation: publicInvitation(invitation) };
}

function listForUser(email) {
  const key = normalize(email);
  const incoming = [];
  const outgoing = [];
  for (const invitation of INVITATIONS.values()) {
    if (invitation.status === "pending" && isExpired(invitation)) continue;
    if (invitation.toEmail === key) incoming.push(publicInvitation(invitation));
    else if (invitation.fromEmail === key) outgoing.push(publicInvitation(invitation));
  }
  const byDateDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  return { incoming: incoming.sort(byDateDesc), outgoing: outgoing.sort(byDateDesc) };
}

// Scrie legătura efectivă în preferințele celor două conturi. Analitica de
// părinte se uită la `childEmail`, iar rosterul de profesor la `teacherEmail`.
function establishLink(invitation) {
  const from = ensureUser(invitation.fromEmail);
  const to = ensureUser(invitation.toEmail);

  if (invitation.kind === "parent_child") {
    const parent = from.role === "parent" ? from : to;
    const child = from.role === "parent" ? to : from;
    if (parent.role !== "parent" || child.role !== "student") return { ok: false, reason: "role_mismatch" };
    parent.preferences.childEmail = child.userId;
    child.preferences.parentEmail = parent.userId;
    return { ok: true, parentEmail: parent.userId, childEmail: child.userId };
  }

  const teacher = from.role === "teacher" ? from : to;
  const student = from.role === "teacher" ? to : from;
  if (teacher.role !== "teacher" || student.role !== "student") return { ok: false, reason: "role_mismatch" };
  student.preferences.teacherEmail = teacher.userId;
  return { ok: true, teacherEmail: teacher.userId, studentEmail: student.userId };
}

// Doar destinatarul poate accepta sau refuza.
function respond({ id, email, action }) {
  const key = normalize(email);
  const invitation = INVITATIONS.get(id);
  if (!invitation) return { ok: false, reason: "not_found" };
  if (invitation.toEmail !== key) return { ok: false, reason: "not_recipient" };
  if (invitation.status !== "pending") return { ok: false, reason: "already_resolved" };
  if (isExpired(invitation)) {
    invitation.status = "expired";
    return { ok: false, reason: "expired" };
  }

  if (action === "decline") {
    invitation.status = "declined";
    invitation.respondedAt = new Date().toISOString();
    pushNotification(
      invitation.fromEmail,
      invitation.fromEmail,
      "Invitație refuzată",
      `${key} a refuzat invitația de conectare.`,
      "invitation"
    );
    return { ok: true, invitation: publicInvitation(invitation) };
  }

  if (action !== "accept") return { ok: false, reason: "unknown_action" };

  const linked = establishLink(invitation);
  if (!linked.ok) return { ok: false, reason: linked.reason };

  invitation.status = "accepted";
  invitation.respondedAt = new Date().toISOString();

  logActivity({
    userId: invitation.toEmail,
    type: "link_accepted",
    note: `Ai acceptat conectarea cu ${invitation.fromEmail}`,
    meta: { kind: invitation.kind, otherEmail: invitation.fromEmail }
  });
  pushNotification(
    invitation.fromEmail,
    invitation.fromEmail,
    "Invitație acceptată",
    `${key} a acceptat invitația. Conturile sunt acum conectate.`,
    "invitation"
  );

  return { ok: true, invitation: publicInvitation(invitation), link: linked };
}

// Expeditorul poate retrage o invitație încă nerezolvată.
function revoke({ id, email }) {
  const key = normalize(email);
  const invitation = INVITATIONS.get(id);
  if (!invitation) return { ok: false, reason: "not_found" };
  if (invitation.fromEmail !== key) return { ok: false, reason: "not_sender" };
  if (invitation.status !== "pending") return { ok: false, reason: "already_resolved" };
  invitation.status = "revoked";
  invitation.respondedAt = new Date().toISOString();
  return { ok: true, invitation: publicInvitation(invitation) };
}

// Legăturile active ale contului, așa cum sunt scrise în preferințe.
function listLinks(email) {
  const user = ensureUser(normalize(email));
  const links = [];

  if (user.preferences.childEmail) {
    links.push({ kind: "parent_child", role: "parent", otherEmail: user.preferences.childEmail });
  }
  if (user.preferences.parentEmail) {
    links.push({ kind: "parent_child", role: "child", otherEmail: user.preferences.parentEmail });
  }
  if (user.role === "student" && user.preferences.teacherEmail) {
    links.push({ kind: "teacher_student", role: "student", otherEmail: user.preferences.teacherEmail });
  }
  if (user.role === "teacher") {
    for (const studentEmail of listStudentEmailsForTeacher(user.userId)) {
      links.push({ kind: "teacher_student", role: "teacher", otherEmail: studentEmail });
    }
  }

  return links;
}

// Oricare dintre cele două părți poate desface legătura, fără acordul
// celeilalte: retragerea consimțământului nu trebuie să depindă de nimeni.
function unlink({ email, otherEmail }) {
  const key = normalize(email);
  const other = normalize(otherEmail);
  if (!other) return { ok: false, reason: "missing_target" };

  const user = ensureUser(key);
  const target = ensureUser(other);
  let removed = false;

  if (user.preferences.childEmail === other) { user.preferences.childEmail = ""; removed = true; }
  if (user.preferences.parentEmail === other) { user.preferences.parentEmail = ""; removed = true; }
  if (target.preferences.childEmail === key) { target.preferences.childEmail = ""; removed = true; }
  if (target.preferences.parentEmail === key) { target.preferences.parentEmail = ""; removed = true; }
  if (user.preferences.teacherEmail === other) { user.preferences.teacherEmail = ""; removed = true; }
  if (target.preferences.teacherEmail === key) { target.preferences.teacherEmail = ""; removed = true; }

  if (!removed) return { ok: false, reason: "not_linked" };

  pushNotification(
    other,
    other,
    "Conturi deconectate",
    `${key} a desfăcut legătura dintre conturi.`,
    "invitation"
  );
  return { ok: true };
}

function purgeExpired() {
  let removed = 0;
  for (const [id, invitation] of INVITATIONS.entries()) {
    if (invitation.status === "pending" && isExpired(invitation)) {
      invitation.status = "expired";
    }
    // Invitațiile rezolvate mai vechi de un TTL nu mai sunt utile nimănui.
    if (invitation.status !== "pending" && isExpired(invitation)) {
      INVITATIONS.delete(id);
      removed++;
    }
  }
  return removed;
}

const purgeTimer = setInterval(purgeExpired, 6 * 60 * 60 * 1000);
purgeTimer.unref();

module.exports = {
  KINDS,
  createInvitation,
  listForUser,
  respond,
  revoke,
  listLinks,
  unlink,
  purgeExpired
};
