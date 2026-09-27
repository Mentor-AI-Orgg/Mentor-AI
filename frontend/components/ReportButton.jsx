import { useState } from 'react';
import { MentorAPI } from '../apiClient.js';

const REASONS = [
  { id: 'nume_nepotrivit', label: 'Nume nepotrivit' },
  { id: 'ma_deranjeaza', label: 'Mă deranjează' },
  { id: 'altceva', label: 'Altceva' }
];

export default function ReportButton({ userId, onToast }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [done, setDone] = useState('');

  if (!userId) return null;

  async function send(reason) {
    const result = await MentorAPI.reportStudent({ userId, reason, note });
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut trimite raportul.', 'warning');
      return;
    }
    setDone(result.data?.message || 'Mulțumim! Un adult va verifica.');
    setOpen(false);
  }

  async function block() {
    const result = await MentorAPI.blockStudent(userId);
    if (!result.success) {
      onToast?.(result.error || 'Nu am putut bloca.', 'warning');
      return;
    }
    onToast?.('Persoana a fost blocată.', 'success');
  }

  if (done) {
    return (
      <div className="report-box">
        <p>{done}</p>
        <button type="button" className="ghost-button" onClick={block}>Blochează</button>
      </div>
    );
  }

  if (!open) {
    return <button type="button" className="ghost-button" onClick={() => setOpen(true)}>Raportează</button>;
  }

  return (
    <div className="report-box">
      {REASONS.map(reason => (
        <button type="button" key={reason.id} className="ghost-button" onClick={() => send(reason.id)}>{reason.label}</button>
      ))}
      <input
        className="field form-input"
        maxLength={200}
        value={note}
        placeholder="Detaliu scurt, opțional"
        onChange={event => setNote(event.target.value)}
      />
    </div>
  );
}
