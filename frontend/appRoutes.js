/** Rute hash: Back și Refresh păstrează ecranul, nu doar un `pushState` mort. */

function decodePart(value) {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return String(value);
  }
}

export function parseAppHash(hash) {
  const raw = String(hash || '').replace(/^#/, '').replace(/^\/+/, '').trim();
  const parts = raw.split('/').map(decodePart).filter(Boolean);
  const [head, a, b, c] = parts;

  if (!head || head === 'start') return { kind: 'guest', screen: 'welcome' };
  if (head === 'conectare' || head === 'login') return { kind: 'guest', screen: 'login' };
  if (head === 'cont' || head === 'register') return { kind: 'guest', screen: 'register' };
  if (head === 'onboarding') return { kind: 'guest', screen: 'onboarding' };
  if (head === 'parola') return { kind: 'guest', screen: 'reset', extras: { token: a || '' } };
  if (head === 'acord') return { kind: 'guest', screen: 'consent', extras: { token: a || '' } };
  if (head === 'parinte') return { kind: 'guest', screen: 'parent', extras: { token: a || '' } };
  if (head === 'asteptare') return { kind: 'app', screen: 'consent-wait', navScreen: 'home' };
  if (head === 'creator' && a === 'moderare') return { kind: 'guest', screen: 'moderare' };
  if (head === 'nume-nou') return { kind: 'app', screen: 'rename', navScreen: 'home' };

  if (head === 'acasa' || head === 'home') return { kind: 'app', screen: 'home', navScreen: 'home' };
  if (head === 'mentor' || head === 'professor') return { kind: 'app', screen: 'professor', navScreen: 'professor' };
  if (head === 'magazin' || head === 'shop') return { kind: 'app', screen: 'shop', navScreen: 'shop' };
  if (head === 'profil' || head === 'profile') return { kind: 'app', screen: 'profile', navScreen: 'profile' };
  if (head === 'calendar') return { kind: 'app', screen: 'calendar', navScreen: 'calendar' };

  if (head === 'en') {
    return {
      kind: 'app',
      screen: 'learn',
      navScreen: 'learn',
      extras: { track: 'en', subject: a || 'matematica', grade: '8', chapter: null }
    };
  }

  if (head === 'lectii' || head === 'learn') {
    return {
      kind: 'app',
      screen: 'learn',
      navScreen: 'learn',
      extras: { track: null, subject: a || null, grade: b || null, chapter: c || null }
    };
  }

  return { kind: 'unknown', screen: 'home', navScreen: 'home' };
}

export function hashForRoute(screen, extras = {}) {
  switch (screen) {
    case 'welcome':
    case 'splash':
      return '#/start';
    case 'login':
      return '#/conectare';
    case 'register':
      return '#/cont';
    case 'onboarding':
      return '#/onboarding';
    case 'reset':
      return `#/parola/${extras.token || ''}`;
    case 'consent':
      return `#/acord/${extras.token || ''}`;
    case 'parent':
      return extras.token ? `#/parinte/${extras.token}` : '#/parinte';
    case 'consent-wait':
      return '#/asteptare';
    case 'moderare':
      return '#/creator/moderare';
    case 'rename':
      return '#/nume-nou';
    case 'home':
      return '#/acasa';
    case 'professor':
      return '#/mentor';
    case 'shop':
      return '#/magazin';
    case 'profile':
      return '#/profil';
    case 'calendar':
      return '#/calendar';
    case 'learn':
      if (extras.track === 'en') {
        return `#/en/${extras.subject || 'matematica'}`;
      }
      if (extras.subject) {
        const parts = ['#/lectii', extras.subject];
        if (extras.grade) parts.push(String(extras.grade));
        if (extras.chapter) parts.push(String(extras.chapter));
        return parts.join('/');
      }
      return '#/lectii';
    default:
      return '';
  }
}
