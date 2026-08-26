import { useCallback, useEffect, useState } from 'react';
import { MentorAPI } from '../apiClient.js';

// Panou comun pentru legăturile dintre conturi. Îl folosesc toate rolurile:
// elevul vede invitațiile primite de la părinți/profesori și decide, iar
// părintele sau profesorul trimite invitații și vede ce e în așteptare.
//
// Ideea centrală: o legătură nu există până când destinatarul apasă „Accept".
// Cât timp invitația e în așteptare, expeditorul nu vede nimic din datele
// celuilalt cont.

const KIND_LABELS = {
  parent_child: 'Părinte - copil',
  teacher_student: 'Profesor - elev'
};

const STATUS_LABELS = {
  pending: 'În așteptare',
  accepted: 'Acceptată',
  declined: 'Refuzată',
  revoked: 'Retrasă',
  expired: 'Expirată'
};

const ROLE_LABELS = {
  parent: 'Copilul tău',
  child: 'Părintele tău',
  teacher: 'Elev în clasa ta',
  student: 'Profesorul tău'
};

const InvitationsPanel = ({ role = 'student', onToast, onChange }) => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [sending, setSending] = useState(false);

  // Elevul nu invită pe nimeni din acest panou: adulții îl invită, iar el
  // decide. Așa consimțământul rămâne al copilului.
  const canInvite = role === 'parent' || role === 'teacher';
  const inviteKind = role === 'parent' ? 'parent_child' : 'teacher_student';
  const inviteLabel = role === 'parent' ? 'Email-ul copilului' : 'Email-ul elevului';

  const load = useCallback(async () => {
    setLoading(true);
    const result = await MentorAPI.getLinks();
    setIncoming(result.data.incoming || []);
    setOutgoing(result.data.outgoing || []);
    setLinks(result.data.links || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const respond = async (invitationId, action) => {
    setBusyId(invitationId);
    const result = await MentorAPI.respondToInvitation(invitationId, action);
    setBusyId('');
    if (result.success) {
      const messages = {
        accept: 'Conturile sunt acum conectate.',
        decline: 'Invitația a fost refuzată.',
        revoke: 'Invitația a fost retrasă.'
      };
      onToast?.(messages[action] || 'Gata.', 'success');
      await load();
      onChange?.();
    } else {
      onToast?.(result.error || 'Nu am putut trimite răspunsul.', 'warning');
    }
  };

  const sendInvite = async () => {
    if (!inviteEmail.trim()) return;
    setSending(true);
    const result = await MentorAPI.inviteLink({ to_email: inviteEmail.trim(), kind: inviteKind });
    setSending(false);
    if (result.success) {
      onToast?.('Invitație trimisă. Legătura se activează după ce este acceptată.', 'success');
      setInviteEmail('');
      await load();
    } else {
      onToast?.(result.error || 'Nu am putut trimite invitația.', 'warning');
    }
  };

  const removeLink = async otherEmail => {
    setBusyId(otherEmail);
    const result = await MentorAPI.unlinkAccount(otherEmail);
    setBusyId('');
    if (result.success) {
      onToast?.('Legătura a fost desfăcută.', 'success');
      await load();
      onChange?.();
    } else {
      onToast?.(result.error || 'Nu am putut desface legătura.', 'warning');
    }
  };

  const pendingIncoming = incoming.filter(item => item.status === 'pending');
  const pendingOutgoing = outgoing.filter(item => item.status === 'pending');

  return (
    <section className="surface rounded-3xl p-5 parent-panel" aria-busy={loading}>
      <div className="eyebrow">Conturi conectate</div>
      <h3 className="display-font">Legături pe bază de acceptare.</h3>
      <p className="parent-subtitle">
        O legătură se activează doar după ce celălalt cont o acceptă. Până atunci, nimeni nu vede datele nimănui.
      </p>

      {pendingIncoming.length > 0 && (
        <div className="invitation-group">
          <div className="invitation-group-title">Invitații primite</div>
          {pendingIncoming.map(item => (
            <article key={item.id} className="invitation-card">
              <div className="invitation-card-copy">
                <strong>{item.fromEmail}</strong>
                <span>{KIND_LABELS[item.kind] || item.kind}</span>
              </div>
              <div className="invitation-card-actions">
                <button
                  type="button"
                  className="accent-button"
                  disabled={busyId === item.id}
                  onClick={() => respond(item.id, 'accept')}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="ghost-button"
                  disabled={busyId === item.id}
                  onClick={() => respond(item.id, 'decline')}
                >
                  Refuz
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div className="invitation-group">
          <div className="invitation-group-title">Legături active</div>
          {links.map(item => (
            <article key={`${item.kind}-${item.otherEmail}`} className="invitation-card">
              <div className="invitation-card-copy">
                <strong>{item.otherEmail}</strong>
                <span>{ROLE_LABELS[item.role] || KIND_LABELS[item.kind]}</span>
              </div>
              <div className="invitation-card-actions">
                <button
                  type="button"
                  className="ghost-button"
                  disabled={busyId === item.otherEmail}
                  onClick={() => removeLink(item.otherEmail)}
                >
                  Deconectează
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {canInvite && (
        <div className="invitation-group">
          <div className="invitation-group-title">Trimite o invitație</div>
          <div className="parent-connect-row">
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder={inviteLabel}
              className="parent-connect-input"
            />
            <button type="button" className="accent-button" onClick={sendInvite} disabled={sending || !inviteEmail.trim()}>
              {sending ? 'Trimit...' : 'Trimite invitația'}
            </button>
          </div>
          {pendingOutgoing.length > 0 && (
            <div className="invitation-pending-list">
              {pendingOutgoing.map(item => (
                <div key={item.id} className="invitation-pending-row">
                  <span>{item.toEmail}</span>
                  <small>{STATUS_LABELS[item.status]}</small>
                  <button
                    type="button"
                    className="invitation-revoke"
                    disabled={busyId === item.id}
                    onClick={() => respond(item.id, 'revoke')}
                  >
                    Retrage
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && pendingIncoming.length === 0 && links.length === 0 && !canInvite && (
        <p className="profile-empty-note">Nu ai invitații și niciun cont conectat.</p>
      )}
    </section>
  );
};

export default InvitationsPanel;
