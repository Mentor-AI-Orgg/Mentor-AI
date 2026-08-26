const express = require("express");
const router = express.Router();

const { createInvitation, listForUser, respond, revoke, listLinks, unlink } = require("../data/linkStore");

// Montat în spatele `authRequired`, deci `req.auth` există mereu. Toate rutele
// se raportează strict la contul autentificat: nu se poate invita sau accepta
// în numele altcuiva.

// GET /api/links - invitații primite, trimise și legături active
router.get("/", (req, res) => {
  const { incoming, outgoing } = listForUser(req.auth.email);
  res.json({ incoming, outgoing, links: listLinks(req.auth.email) });
});

// POST /api/links/invite { to_email, kind }
router.post("/invite", (req, res) => {
  const { to_email: toEmail = "", kind = "" } = req.body || {};

  const result = createInvitation({
    fromEmail: req.auth.email,
    fromRole: req.auth.role,
    toEmail,
    kind
  });

  if (!result.ok) {
    const messages = {
      missing_target: "Adresa de email este obligatorie.",
      unknown_kind: "Tip de legătură necunoscut.",
      self_invite: "Nu îți poți trimite o invitație către propriul cont.",
      role_not_allowed: "Contul tău nu poate crea acest tip de legătură.",
      already_pending: "Există deja o invitație în așteptare pentru această adresă."
    };
    const status = result.reason === "already_pending" ? 409 : 400;
    return res.status(status).json({ error: messages[result.reason] || "Nu am putut trimite invitația.", reason: result.reason });
  }

  // Răspunsul este identic și dacă adresa nu are încă un cont: altfel am
  // dezvălui cine este înregistrat în aplicație. Invitația rămâne în așteptare
  // și devine vizibilă când contul este creat.
  res.status(201).json({
    success: true,
    invitation: result.invitation,
    message: "Invitația a fost trimisă. Legătura se activează doar după ce celălalt cont o acceptă."
  });
});

router.post("/:id/accept", (req, res) => {
  const result = respond({ id: req.params.id, email: req.auth.email, action: "accept" });
  if (!result.ok) {
    const messages = {
      not_found: "Invitația nu a fost găsită.",
      not_recipient: "Doar destinatarul poate răspunde acestei invitații.",
      already_resolved: "Invitația a primit deja un răspuns.",
      expired: "Invitația a expirat.",
      role_mismatch: "Rolurile celor două conturi nu permit această legătură."
    };
    const status = result.reason === "not_found" ? 404 : result.reason === "not_recipient" ? 403 : 400;
    return res.status(status).json({ error: messages[result.reason] || "Nu am putut accepta invitația.", reason: result.reason });
  }
  res.json({ success: true, ...result });
});

router.post("/:id/decline", (req, res) => {
  const result = respond({ id: req.params.id, email: req.auth.email, action: "decline" });
  if (!result.ok) {
    const status = result.reason === "not_found" ? 404 : result.reason === "not_recipient" ? 403 : 400;
    return res.status(status).json({ error: "Nu am putut refuza invitația.", reason: result.reason });
  }
  res.json({ success: true, ...result });
});

router.post("/:id/revoke", (req, res) => {
  const result = revoke({ id: req.params.id, email: req.auth.email });
  if (!result.ok) {
    const status = result.reason === "not_found" ? 404 : result.reason === "not_sender" ? 403 : 400;
    return res.status(status).json({ error: "Nu am putut retrage invitația.", reason: result.reason });
  }
  res.json({ success: true, ...result });
});

// POST /api/links/unlink { other_email }
// Oricare parte poate desface legătura, fără acordul celeilalte: retragerea
// consimțământului nu trebuie să depindă de nimeni.
router.post("/unlink", (req, res) => {
  const { other_email: otherEmail = "" } = req.body || {};
  const result = unlink({ email: req.auth.email, otherEmail });
  if (!result.ok) {
    const messages = {
      missing_target: "Adresa de email este obligatorie.",
      not_linked: "Nu există o legătură cu acest cont."
    };
    return res.status(400).json({ error: messages[result.reason] || "Nu am putut desface legătura.", reason: result.reason });
  }
  res.json({ success: true });
});

module.exports = router;
