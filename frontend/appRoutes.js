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

  if (head === 'acasa' || head === 'home') return { kind: 'app', screen: 'home', navScreen: 'home' };
  if (head === 'mentor' || head === 'professor') return { kind: 'app', screen: 'professor', navScreen: 'professor' };
  if (head === 'magazin' || head === 'shop') return { kind: 'app', screen: 'shop', navScreen: 'shop' };
  if (head === 'profil' || head === 'profile') return { kind: 'app', screen: 'profile', navScreen: 'profile' };
  if (head === 'calendar') return { kind: 'app', screen: 'calendar', navScreen: 'calendar' };
  if (head === 'acces' || head === 'subscriptions') return { kind: 'app', screen: 'subscriptions', navScreen: 'home' };

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
    case 'subscriptions':
      return '#/acces';
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
