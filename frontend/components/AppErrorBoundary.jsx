import { Component } from 'react';
import Mascota from './mascot/Mascota.jsx';
import { captureSentryException } from '../sentry.js';
import { isChunkLoadError, reloadOnceForChunk } from '../chunkReload.js';
import { reportClientError } from '../clientErrorReport.js';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, chunk: false };
  }

  static getDerivedStateFromError(error) {
    if (isChunkLoadError(error)) return { chunk: true };
    return { failed: true, chunk: false };
  }

  componentDidCatch(error, info) {
    if (this.state.chunk && reloadOnceForChunk(window.sessionStorage, () => window.location.reload())) return;
    if (this.state.chunk) this.setState({ failed: true });
    captureSentryException(error);
    reportClientError(error, { componentStack: info && info.componentStack });
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
