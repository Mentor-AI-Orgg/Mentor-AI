import { useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { MASCOT_NAME } from '../config/mascot.js';

const DockItem = ({ item, active, onNavigate, pointerX, baseSize, maxScale }) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const rect = ref.current?.getBoundingClientRect();
  const center = rect ? rect.left + rect.width / 2 : 0;
  const distance = pointerX === null ? Infinity : Math.abs(pointerX - center);
  const influence = Math.max(0, 1 - distance / 150);
  const scale = 1 + influence * (maxScale - 1);

  const activate = () => onNavigate(item.id);
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={activate}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
      className={`dock-item ${active === item.id ? 'active' : ''} ${focused ? 'focused' : ''}`}
      style={{ '--dock-size': `${baseSize}px`, '--dock-scale': scale }}
      aria-label={item.label}
      aria-current={active === item.id ? 'page' : undefined}
    >
      <span className="dock-item-surface">
        <i className={`fas ${item.icon}`} aria-hidden="true" />
      </span>
      <span className="dock-label" role="tooltip">{item.label}</span>
    </button>
  );
};

const BottomNav = ({ active, onNavigate }) => {
  const { t } = useI18n();
  const items = [
    { id: 'home', icon: 'fa-home', label: t('nav.home') },
    { id: 'professor', icon: 'fa-graduation-cap', label: MASCOT_NAME || t('nav.professor') },
    { id: 'learn', icon: 'fa-book-open', label: t('nav.learn') },
    { id: 'shop', icon: 'fa-store', label: t('nav.shop') },
    { id: 'calendar', icon: 'fa-calendar-check', label: t('nav.calendar') },
    { id: 'profile', icon: 'fa-user', label: t('nav.profile') }
  ];

  const [pointerX, setPointerX] = useState(null);

  return (
    <nav
      className="bottom-nav"
      aria-label={t('nav.aria')}
      onPointerMove={event => setPointerX(event.clientX)}
      onPointerLeave={() => setPointerX(null)}
    >
      <div className="dock-panel">
        {items.map(item => (
          <DockItem key={item.id} item={item} active={active} onNavigate={onNavigate} pointerX={pointerX} baseSize={44} maxScale={1.42} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
