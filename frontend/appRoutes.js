/** Rute hash: Back și Refresh păstrează ecranul, nu doar un `pushState` mort. */

const PROFILE_SECTIONS = new Set(['setari', 'tema', 'clasament', 'prieteni', 'cont', 'parola', 'parinte']);

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
  if (head === 'creator' && a === 'statistici') return { kind: 'guest', screen: 'statistici' };
  if (head === 'creator' && a === 'mascota') return { kind: 'guest', screen: 'mascota' };
  if (head === 'ajutor') return { kind: 'app', screen: 'ajutor', navScreen: 'home' };
  if (head === 'nume-nou') return { kind: 'app', screen: 'rename', navScreen: 'home' };

  if (head === 'acasa' || head === 'home') return { kind: 'app', screen: 'home', navScreen: 'home' };
  if (head === 'mentor' || head === 'professor') return { kind: 'app', screen: 'professor', navScreen: 'professor' };
  if (head === 'magazin' || head === 'shop') return { kind: 'app', screen: 'shop', navScreen: 'shop' };
  if (head === 'profil' || head === 'profile') {
    const section = PROFILE_SECTIONS.has(a) ? a : '';
    const route = { kind: 'app', screen: 'profile', navScreen: 'profile' };
    if (section) route.extras = { section };
    return route;
  }
  if (head === 'calendar') return { kind: 'app', screen: 'calendar', navScreen: 'calendar' };
  if (head === 'caiet') return { kind: 'app', screen: 'caiet', navScreen: 'home' };

  if (head === 'en') {
    return {
      kind: 'app',
      screen: 'learn',
      navScreen: 'learn',
      extras: { track: 'en', subject: a || 'matematica', grade: '8', chapter: null }
    };
  }

  if (head === 'lectii' || head === 'learn') {
    const lessonPart = parts.find(part => part.startsWith('lectie-'));
    return {
      kind: 'app',
      screen: 'learn',
      navScreen: 'learn',
      extras: {
        track: null,
        subject: a || null,
        grade: b || null,
        chapter: c && !String(c).startsWith('lectie-') ? c : null,
        lessonId: lessonPart ? lessonPart.slice('lectie-'.length) : null
      }
    };
  }
  if (head === 'incepe') return { kind: 'app', screen: 'start-lesson', navScreen: 'home' };
  if (head === 'inceput') return { kind: 'app', screen: 'quick-start', navScreen: 'home' };
  if (head === 'provocare') return { kind: 'app', screen: 'provocare', navScreen: 'home' };
  if (head === 'progres') return { kind: 'app', screen: 'progres', navScreen: 'home' };

  if (/^lectie-/.test(head) && parts.length === 1) {
    return { kind: 'anchor', screen: null, lessonId: head.slice('lectie-'.length) };
  }

  return { kind: 'unknown', screen: 'home', navScreen: 'home' };
}

/** După splash, vizitatorul nelogat rămâne pe login sau pe crearea contului. */
export function screenForLoggedOut(route) {
  if (route?.kind === 'guest' && (route.screen === 'login' || route.screen === 'register')) {
    return route.screen;
  }
  return 'welcome';
}

export { PROFILE_SECTIONS };

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
    case 'statistici':
      return '#/creator/statistici';
    case 'mascota':
      return '#/creator/mascota';
    case 'ajutor':
      return '#/ajutor';
    case 'rename':
      return '#/nume-nou';
    case 'home':
      return '#/acasa';
    case 'professor':
      return '#/mentor';
    case 'shop':
      return '#/magazin';
    case 'profile':
      return PROFILE_SECTIONS.has(extras.section) ? `#/profil/${extras.section}` : '#/profil';
    case 'calendar':
      return '#/calendar';
    case 'caiet':
      return '#/caiet';
    case 'start-lesson':
      return '#/incepe';
    case 'quick-start':
      return '#/inceput';
    case 'provocare':
      return '#/provocare';
    case 'progres':
      return '#/progres';
    case 'learn':
      if (extras.track === 'en') {
        const base = `#/en/${extras.subject || 'matematica'}`;
        return extras.lessonId ? `${base}/lectie-${extras.lessonId}` : base;
      }
      if (extras.subject) {
        const parts = ['#/lectii', extras.subject];
        if (extras.grade) parts.push(String(extras.grade));
        if (extras.chapter) parts.push(String(extras.chapter));
        const base = parts.join('/');
        return extras.lessonId ? `${base}/lectie-${extras.lessonId}` : base;
      }
      return '#/lectii';
    default:
      return '';
  }
}
