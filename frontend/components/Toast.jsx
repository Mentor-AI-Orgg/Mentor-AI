import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
  const color = type === 'success' ? 'text-cyan-300' : type === 'warning' ? 'text-orange-300' : 'text-violet-300';

  return (
    <div className="fixed top-5 left-1/2 z-[10001] w-[min(92vw,420px)] -translate-x-1/2 animate-slideUp">
      <div className="rounded-3xl border border-white/10 bg-[#1a1a3e] px-5 py-3.5 shadow-2xl backdrop-blur-xl flex items-center gap-3" role="status" aria-live="polite">
        <i className={`fas ${icon} ${color} text-lg`} />
        <span className="text-sm font-semibold text-white">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
