import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('ecranul de așteptare', () => {
  it('arată furnicuța și păstrează retrimiterea', () => {
    const screen = fs.readFileSync(path.join(path.resolve(__dirname, '..'), 'frontend/components/ConsentScreens.jsx'), 'utf8');
    expect(screen).toContain('mood="explica"');
    expect(screen).toContain('Am trimis un email părintelui tău');
    expect(screen).toContain('Retrimite emailul');
    const mail = fs.readFileSync(path.join(path.resolve(__dirname, '..'), 'backend/src/routes/auth.js'), 'utf8');
    expect(mail).toContain('cid:mascot');
    expect(mail).toContain('MASCOT_NAME');
    expect(fs.existsSync(path.join(path.resolve(__dirname, '..'), 'backend/src/notify/mascot-salut.png'))).toBe(true);
  });
});
