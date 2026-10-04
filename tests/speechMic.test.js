import { describe, expect, it } from 'vitest';
import { readSpeechMicContext, speechFailureKind, speechMicNote } from '../frontend/speechMic.js';

const allowed = { policyAllows: true, secure: true, permissionState: 'prompt' };

describe('microfonul de la tutore', () => {
  it('spune pe românește când lipsește, e blocat, e refuzat sau nu aude', () => {
    expect(speechMicNote('missing')).toBe(
      'Microfonul nu e suportat în acest browser. Scrie întrebarea.'
    );
    expect(speechFailureKind('not-allowed', { ...allowed, policyAllows: false })).toBe('blocked');
    expect(speechFailureKind('service-not-allowed', { ...allowed, secure: false })).toBe('blocked');
    expect(speechMicNote('blocked')).toBe('Browserul a blocat microfonul. Scrie întrebarea.');
    expect(speechFailureKind('not-allowed', { ...allowed, permissionState: 'denied' })).toBe(
      'denied'
    );
    expect(speechFailureKind('not-allowed', allowed)).toBe('denied');
    expect(speechMicNote('denied')).toBe('Nu ai dat voie la microfon. Scrie întrebarea.');
    expect(speechFailureKind('no-speech', allowed)).toBe('no-speech');
    expect(speechMicNote('no-speech')).toBe('Nu te-am auzit. Încearcă din nou sau scrie.');
    expect(speechFailureKind('not-allowed', { ...allowed, permissionState: 'granted' })).toBe(
      'blocked'
    );
    expect(speechFailureKind('aborted', allowed)).toBeNull();
    expect(speechFailureKind('audio-capture', allowed)).toBe('failed');
    expect(speechFailureKind('network', allowed)).toBe('failed');
    expect(speechMicNote('failed')).toBe('Microfonul nu a mers. Scrie întrebarea.');
    expect(speechMicNote('altceva')).toBe(speechMicNote('failed'));
  });

  it('citește politica și permisiunea înainte să aleagă mesajul', async () => {
    const blocked = await readSpeechMicContext({
      isSecureContext: true,
      document: { permissionsPolicy: { allowsFeature: (name) => name !== 'microphone' } },
      navigator: { permissions: { query: async () => ({ state: 'prompt' }) } }
    });
    expect(speechFailureKind('not-allowed', blocked)).toBe('blocked');

    const legacyPolicy = await readSpeechMicContext({
      isSecureContext: true,
      document: { featurePolicy: { allowsFeature: (name) => name !== 'microphone' } },
      navigator: { permissions: { query: async () => ({ state: 'prompt' }) } }
    });
    expect(speechFailureKind('not-allowed', legacyPolicy)).toBe('blocked');

    const denied = await readSpeechMicContext({
      isSecureContext: true,
      document: { permissionsPolicy: { allowsFeature: () => true } },
      navigator: { permissions: { query: async () => ({ state: 'denied' }) } }
    });
    expect(speechFailureKind('not-allowed', denied)).toBe('denied');

    const queryThrows = await readSpeechMicContext({
      isSecureContext: true,
      document: { permissionsPolicy: { allowsFeature: () => true } },
      navigator: {
        permissions: {
          query: async () => {
            throw new Error('unsupported');
          }
        }
      }
    });
    expect(queryThrows.permissionState).toBe('unknown');
    expect(speechFailureKind('not-allowed', queryThrows)).toBe('denied');

    const policyThrows = await readSpeechMicContext({
      isSecureContext: true,
      document: {
        permissionsPolicy: {
          allowsFeature: () => {
            throw new Error('blocked');
          }
        }
      },
      navigator: {}
    });
    expect(speechFailureKind('not-allowed', policyThrows)).toBe('blocked');
  });
});
