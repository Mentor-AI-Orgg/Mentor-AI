import { Component } from 'react';
import Mascota from './mascot/Mascota.jsx';
import { captureSentryException } from '../sentry.js';
import { isChunkLoadError, reloadOnceForChunk } from '../chunkReload.js';

function frameOf(error) {
  const stack = String(error && error.stack || '');
  const match = stack.match(/([^/\\():\s]+\.(?:jsx?|tsx?)):(\d+)/);
  if (!match) return { file: '', line: 0 };
  return { file: match[1], line: Number(match[2]) || 0 };
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, chunk: false };
  }

  static getDerivedStateFromError(error) {
    if (isChunkLoadError(error)) return { chunk: true };
    return { failed: true, chunk: false };
  }

  componentDidCatch(error) {
    if (this.state.chunk && reloadOnceForChunk(window.sessionStorage, () => window.location.reload())) return;
    if (this.state.chunk) this.setState({ failed: true });
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
    if (this.state.chunk && !this.state.failed) return null;
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
