import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
  const kind = type === 'success' ? 'toast-success' : type === 'warning' ? 'toast-warning' : 'toast-info';

  return (
    <div className="toast-slot animate-slideUp">
      <div className="toast-banner" role="status" aria-live="polite">
        <i className={`fas ${icon} ${kind}`} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
