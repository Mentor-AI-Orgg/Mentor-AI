import { Component } from 'react';
import Mascota from './mascot/Mascota.jsx';
import { captureSentryException } from '../sentry.js';

function frameOf(error) {
  const stack = String(error && error.stack || '');
  const match = stack.match(/([^/\\():\s]+\.(?:jsx?|tsx?)):(\d+)/);
  if (!match) return { file: '', line: 0 };
  return { file: match[1], line: Number(match[2]) || 0 };
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    captureSentryException(error);
    const frame = frameOf(error);
    const message = String(error && error.message || 'eroare').slice(0, 300);
    fetch('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, file: frame.file, line: frame.line })
    }).catch(() => {});
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="error-fallback">
        <div>
          <Mascota mood="trist-bland" size="md" />
          <p>Ceva n-a mers de partea mea. Reîncarcă pagina.</p>
          <button type="button" onClick={() => window.location.reload()}>Reîncarcă</button>
        </div>
      </div>
    );
  }
}

export default AppErrorBoundary;
