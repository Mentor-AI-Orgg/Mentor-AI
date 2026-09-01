import { describe, it, expect } from 'vitest';
import { isDirectRequest, safetyCheck } from '../backend/src/safety/safetyCheck.js';

describe('mentor safety — questions a child actually asks', () => {
  it('lets through normal learning questions', async () => {
    for (const message of [
      'Ce este o fracție?',
      'Explică-mi subiectul, te rog.',
      'Cum se calculează aria unui pătrat?',
      'Care este diferenta dintre metaforă și comparație?'
    ]) {
      expect(isDirectRequest(message)).toBe(false);
      const result = await safetyCheck(message);
      expect(result.safe).toBe(true);
      expect(result.isDirectRequest).toBe(false);
    }
  });

  it('blocks “give me the answer” without blocking “what is”', async () => {
    expect(isDirectRequest('Dă-mi răspunsul la exercițiul 3')).toBe(true);
    expect(isDirectRequest('Care este rezultatul?')).toBe(true);
    const cheat = await safetyCheck('dă-mi răspunsul la temă');
    expect(cheat.safe).toBe(false);
  });
});
