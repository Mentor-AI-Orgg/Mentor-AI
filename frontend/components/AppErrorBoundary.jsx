import { Component } from 'react';

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
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
        <div>
          <p>Ceva n-a mers. Reîncarcă pagina.</p>
          <button type="button" onClick={() => window.location.reload()}>Reîncarcă</button>
        </div>
      </div>
    );
  }
}

export default AppErrorBoundary;
