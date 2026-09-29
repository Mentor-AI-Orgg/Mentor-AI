import { useState } from 'react';
import { MentorAPI } from '../apiClient.js';

export default function RenameScreen({ onDone, onToast }) {
  const [username, setUsername] = useState('');

  async function submit(event) {
    event.preventDefault();
    const result = await MentorAPI.renameUsername(username);
    if (!result.success) {
      onToast?.(result.error || 'Alege un alt nume de utilizator.', 'warning');
      return;
    }
    onDone?.(result.data?.user || { username, mustRename: false });
  }

  return (
    <main className="screen-page animate-fadeIn">
      <header className="screen-header">
        <div className="eyebrow">Nume de utilizator</div>
        <h1 className="display-font screen-title">Alege un alt nume.</h1>
        <p>Alege alt nume. Nu folosi numele tău real, cuvinte urâte sau date de contact.</p>
      </header>
      <form className="mx-5 grid gap-3" onSubmit={submit}>
        <input className="field form-input" value={username} onChange={event => setUsername(event.target.value)} placeholder="Nume nou" />
        <button type="submit" className="accent-button">Salvează</button>
      </form>
    </main>
  );
}
