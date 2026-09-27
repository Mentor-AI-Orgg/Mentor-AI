import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppErrorBoundary from './components/AppErrorBoundary.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import './BorderGlow.css';
import './tailwind.css';

createRoot(document.getElementById('root')).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
