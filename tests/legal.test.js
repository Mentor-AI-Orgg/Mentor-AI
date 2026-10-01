import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { PASSWORD, registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const retention = nodeRequire('../backend/src/config/retention.js');
const legal = nodeRequire('../shared/legal.json');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const { POLICY_VERSION } = nodeRequire('../backend/src/data/consentStore.js');

function days(ms) {
  return Math.round(ms / retention.DAY_MS);
}

function months(ms) {
  return Math.round(ms / (30 * retention.DAY_MS));
}

const CDN = ['fonts.googleapis', 'fonts.gstatic', 'use.fontawesome', 'cdnjs', 'kit.fontawesome'];

function filesWithCdn(dir) {
  const hits = [];
  if (!fs.existsSync(dir)) return hits;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      hits.push(...filesWithCdn(full));
      continue;
    }
    if (!/\.(html|js|jsx|css|json|svg)$/.test(name)) continue;
    const text = fs.readFileSync(full, 'utf8');
    CDN.forEach(needle => {
      if (text.includes(needle)) hits.push(`${full} conține ${needle}`);
    });
  }
  return hits;
}

describe('pagini legale', () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    SITE_PUBLIC: process.env.SITE_PUBLIC,
    LEGAL_CONTACT: process.env.LEGAL_CONTACT,
    LEGAL_OPERATOR_NAME: process.env.LEGAL_OPERATOR_NAME,
    LEGAL_OPERATOR_ADDRESS: process.env.LEGAL_OPERATOR_ADDRESS,
    LEGAL_CUI: process.env.LEGAL_CUI,
    LEGAL_DPO: process.env.LEGAL_DPO,
    requiresReconsent: legal.requiresReconsent
  };

  afterEach(() => {
    process.env.NODE_ENV = previous.NODE_ENV;
    if (previous.SITE_PUBLIC === undefined) delete process.env.SITE_PUBLIC;
    else process.env.SITE_PUBLIC = previous.SITE_PUBLIC;
    for (const key of ['LEGAL_CONTACT', 'LEGAL_OPERATOR_NAME', 'LEGAL_OPERATOR_ADDRESS', 'LEGAL_CUI', 'LEGAL_DPO']) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
    legal.requiresReconsent = previous.requiresReconsent;
  });

  it('scrie termenele din retention.js și versiunea din legal.json', async () => {
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/confidentialitate');
    expect(privacy.status).toBe(200);
    expect(privacy.headers['content-type']).toMatch(/html/);
    expect(privacy.text).toContain('Pentru copii');
    expect(privacy.text).toContain('Pentru părinți');
    expect(privacy.text).toContain('ANSPDCP');
    expect(privacy.text).toContain(legal.product);
    expect(privacy.text).toContain(legal.policyVersion);
    delete process.env.LEGAL_OPERATOR_NAME;
    delete process.env.LEGAL_OPERATOR_ADDRESS;
    delete process.env.LEGAL_CONTACT;
    delete process.env.LEGAL_CUI;
    delete process.env.LEGAL_DPO;
    const open = await request(app).get('/confidentialitate');
    expect(open.text).toContain('TODO');
    expect(open.text).toContain('LEGAL_OPERATOR_NAME');
    expect(open.text).toContain('LEGAL_OPERATOR_ADDRESS');
    expect(open.text).toContain('LEGAL_CONTACT');
    expect(open.text).not.toContain('[DE COMPLETAT');
    expect(privacy.text).toContain(`${days(retention.PENDING_MS)} zile`);
    expect(privacy.text).toContain(`${months(retention.INACTIVE_MS)} luni`);
    expect(privacy.text).toContain(`${days(retention.WARNING_BEFORE_MS)} zile`);
    expect(privacy.text).toContain(`${months(retention.TUTOR_MEMORY_MS)} luni`);
    expect(privacy.text).toContain(`${days(retention.PARENT_ACTIVITY_MS)} zile`);
    expect(privacy.text).toContain(`${days(retention.DELETION_KEEP_MS)} zile`);
    expect(privacy.text).toContain(`${days(retention.BACKUP_KEEP_MS)} zile`);
    expect(privacy.text).not.toContain('fonts.googleapis.com');
    expect(privacy.text).toContain('/fonts/faces.css');
    expect(POLICY_VERSION).toBe(legal.policyVersion);

    const terms = await request(app).get('/termeni');
    expect(terms.status).toBe(200);
    expect(terms.text).toContain('Pentru copii');
    expect(terms.text).toContain('Pentru părinți');
    expect(terms.text).toContain(`${days(retention.PENDING_MS)} zile`);
    expect(terms.text).toContain('ȘTERGE');
  });

  it('redirecționează linkurile vechi', async () => {
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/privacy.html');
    const terms = await request(app).get('/terms.html');
    expect(privacy.status).toBe(302);
    expect(privacy.headers.location).toBe('/confidentialitate');
    expect(terms.status).toBe(302);
    expect(terms.headers.location).toBe('/termeni');
  });

  it('rămâne citibilă și când site-ul este închis', async () => {
    process.env.NODE_ENV = 'production';
    delete process.env.SITE_PUBLIC;
    const { app } = createApp({ autosave: false });
    const privacy = await request(app).get('/confidentialitate');
    expect(privacy.status).toBe(200);
    expect(privacy.text).toContain('Politica de confidențialitate');
    expect(privacy.text).not.toContain('În curând');
  });

  it('nu încarcă fonturi de pe alte domenii și nu mai scrie Mentor AI în index', () => {
    expect(filesWithCdn(path.join(process.cwd(), 'frontend'))).toEqual([]);
    const dist = path.join(process.cwd(), 'frontend', 'dist');
    expect(filesWithCdn(dist)).toEqual([]);
    const index = fs.readFileSync(path.join(process.cwd(), 'frontend', 'index.html'), 'utf8');
    expect(index).not.toContain('Mentor AI');
    expect(index).toContain('Sunt de 10');
  });

  it('cere din nou acordul când versiunea politicii o cere', async () => {
    legal.requiresReconsent = true;
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const account = authStore.findByUsername(created.username);
    account.consent.policyVersion = '2020-01-01';

    const logs = [];
    const original = console.log;
    console.log = (...args) => {
      logs.push(args.map(item => String(item)).join(' '));
    };
    let login;
    try {
      login = await request(app).post('/api/auth/login').send({
        email: created.username,
        password: PASSWORD
      });
    } finally {
      console.log = original;
    }
    expect(login.status).toBe(200);
    expect(logs.join('\n')).toMatch(/\[DEV\] .+\/#\/acord\/[a-f0-9]+/);
    expect(account.reconsentFor).toBe(legal.policyVersion);

    console.log = (...args) => {
      logs.push(`again ${args.map(item => String(item)).join(' ')}`);
    };
    try {
      await request(app).post('/api/auth/login').send({
        email: created.username,
        password: PASSWORD
      });
    } finally {
      console.log = original;
    }
    expect(logs.some(line => line.startsWith('again '))).toBe(false);
  });
});
