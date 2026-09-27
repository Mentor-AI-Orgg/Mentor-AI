import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';

const nodeRequire = createRequire(import.meta.url);
const retention = nodeRequire('../backend/src/config/retention.js');
const legal = nodeRequire('../backend/src/data/legal.json');
const { POLICY_VERSION } = nodeRequire('../backend/src/data/consentStore.js');

function days(ms) {
  return Math.round(ms / retention.DAY_MS);
}

function months(ms) {
  return Math.round(ms / (30 * retention.DAY_MS));
}

describe('pagini legale', () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    SITE_PUBLIC: process.env.SITE_PUBLIC,
    LEGAL_CONTACT: process.env.LEGAL_CONTACT
  };

  afterEach(() => {
    process.env.NODE_ENV = previous.NODE_ENV;
    if (previous.SITE_PUBLIC === undefined) delete process.env.SITE_PUBLIC;
    else process.env.SITE_PUBLIC = previous.SITE_PUBLIC;
    if (previous.LEGAL_CONTACT === undefined) delete process.env.LEGAL_CONTACT;
    else process.env.LEGAL_CONTACT = previous.LEGAL_CONTACT;
  });

  it('scrie termenele din retention.js și versiunea din legal.json', async () => {
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/privacy.html');
    expect(privacy.status).toBe(200);
    expect(privacy.headers['content-type']).toMatch(/html/);
    expect(privacy.text).toContain(legal.product);
    expect(privacy.text).toContain(legal.version);
    expect(privacy.text).toContain(`${days(retention.PENDING_MS)} zile`);
    expect(privacy.text).toContain(`${months(retention.INACTIVE_MS)} luni`);
    expect(privacy.text).toContain(`${days(retention.WARNING_BEFORE_MS)} zile`);
    expect(privacy.text).toContain(`${months(retention.TUTOR_MEMORY_MS)} luni`);
    expect(privacy.text).toContain(`${days(retention.PARENT_ACTIVITY_MS)} zile`);
    expect(privacy.text).toContain(`${days(retention.DELETION_KEEP_MS)} zile`);
    expect(privacy.text).not.toContain('fonts.googleapis.com');
    expect(privacy.text).toContain('/fonts/faces.css');
    expect(POLICY_VERSION).toBe(legal.version);

    const terms = await request(app).get('/terms.html');
    expect(terms.status).toBe(200);
    expect(terms.text).toContain(`${days(retention.PENDING_MS)} zile`);
    expect(terms.text).toContain('ȘTERGE');
  });

  it('rămâne citibilă și când site-ul este închis', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.SITE_PUBLIC;
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/privacy.html');
    expect(privacy.status).toBe(200);
    expect(privacy.text).toContain('Politica de confidențialitate');
    expect(privacy.text).not.toContain('În curând');
  });

  it('arată adresa doar când LEGAL_CONTACT este setată', async () => {
    process.env.LEGAL_CONTACT = 'parinte@example.com';
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/privacy.html');
    expect(privacy.text).toContain('parinte@example.com');
    expect(privacy.text).not.toContain('<script');
  });
});
