const NOTES = {
  missing: 'Microfonul nu e suportat în acest browser. Scrie întrebarea.',
  blocked: 'Browserul a blocat microfonul. Scrie întrebarea.',
  denied: 'Nu ai dat voie la microfon. Scrie întrebarea.',
  'no-speech': 'Nu te-am auzit. Încearcă din nou sau scrie.',
  failed: 'Microfonul nu a mers. Scrie întrebarea.'
};

export function speechMicNote(kind) {
  return NOTES[kind] || NOTES.failed;
}

export function speechFailureKind(error, context = {}) {
  if (error === 'aborted') return null;
  if (error === 'no-speech') return 'no-speech';
  if (error === 'not-allowed' || error === 'service-not-allowed') {
    const secure = context.secure !== false;
    const policyAllows = context.policyAllows !== false;
    if (!secure || !policyAllows) return 'blocked';
    if (context.permissionState === 'granted') return 'blocked';
    return 'denied';
  }
  return 'failed';
}

export async function readSpeechMicContext(target = globalThis) {
  const secure = target.isSecureContext !== false;
  let policyAllows = true;
  try {
    const policy = target.document?.permissionsPolicy || target.document?.featurePolicy;
    if (policy?.allowsFeature) policyAllows = policy.allowsFeature('microphone') !== false;
  } catch {
    policyAllows = false;
  }
  let permissionState = 'prompt';
  try {
    const permissions = target.navigator?.permissions;
    if (permissions?.query) {
      const status = await permissions.query({ name: 'microphone' });
      permissionState = status?.state || 'prompt';
    }
  } catch {
    permissionState = 'unknown';
  }
  return { secure, policyAllows, permissionState };
}
