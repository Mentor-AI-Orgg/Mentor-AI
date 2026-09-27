import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

describe('pagina de prezentare', () => {
  it('spune ce e aplicația înainte de cont', () => {
    const html = fs.readFileSync(path.join(path.resolve(__dirname, '..'), 'frontend/components/WelcomeScreen.jsx'), 'utf8');
    expect(html).toContain('Mate și română pentru clasele V–VIII');
    expect(html).toContain('Intră în cont');
    expect(html).toContain('Creează cont');
    expect(html).toContain('Sunt părinte');
    expect(html).toContain('Începe gratuit');
    expect(html).toContain('Pentru părinți');
    expect(html).toContain('E gratuit?');
    expect(html).toContain('/privacy.html');
    expect(html).toContain('/terms.html');
    expect(html).not.toMatch(/\d+\s+de utilizatori|recenzii|notă medie/i);
  });

  it('dă adresa de contact din mediu, fără să o scrie în pagină', async () => {
    const previous = process.env.LEGAL_CONTACT;
    process.env.LEGAL_CONTACT = 'parinti@example.com';
    const { app } = createApp({ autosave: false });
    const res = await request(app).get('/api/legal-contact');
    process.env.LEGAL_CONTACT = previous;
    expect(res.status).toBe(200);
    expect(res.body.contact).toBe('parinti@example.com');
  });
});
