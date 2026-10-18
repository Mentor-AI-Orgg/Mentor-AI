import { readFileSync } from 'node:fs';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { createRequire } from 'node:module';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { shopItemVisible, themeWash, THEME_ACCENTS, halloweenShelf, regularShelf } from '../frontend/shopLook.js';
import { applyShopBackground } from '../frontend/themePrefs.js';

const nodeRequire = createRequire(import.meta.url);
const economyStore = nodeRequire('../backend/src/data/economyStore.js');
const authStore = nodeRequire('../backend/src/data/authStore.js');
const shopCatalog = nodeRequire('../backend/src/data/shopCatalog.js');
const { dayKey } = nodeRequire('../backend/src/ops/bucharestDay.js');

const HALLOWEEN = [
  'avatar-halloween-pumpkin',
  'avatar-halloween-ghost',
  'avatar-halloween-vampire',
  'theme-halloween-night',
  'theme-halloween-house'
];
const OPEN = new Date('2026-10-31T21:30:00.000Z');
const CLOSED = new Date('2026-10-31T22:30:00.000Z');

let app;

async function student() {
  const created = await registerGranted(app, { class: '5' });
  expect(created.res.status).toBe(201);
  const email = authStore.findByUsername(created.username).email;
  return { agent: created.agent, email };
}

function fund(email, amount) {
  const user = economyStore.getUser(email);
  user.balance = amount;
  return user;
}

describe('ediția de Halloween și avatarele noi', () => {
  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  afterEach(() => {
    delete global.document;
  });

  it('păstrează prețurile vechi și adaugă Yeti, Fotbalist și Gamer', async () => {
    const { agent } = await student();
    const catalog = await agent.get('/api/economy/catalog');
    const items = catalog.body.items;
    expect(items.find(item => item.id === 'avatar-neon-fox').price).toBe(40);
    expect(items.find(item => item.id === 'avatar-unicorn').price).toBe(280);
    expect(items.find(item => item.id === 'avatar-unicorn').minLevel).toBe(5);
    expect(items.find(item => item.id === 'theme-universe').price).toBe(300);
    expect(items.find(item => item.id === 'avatar-mentor-legend').price).toBe(220);

    const yeti = items.find(item => item.id === 'avatar-yeti');
    expect(yeti).toMatchObject({ name: 'Yeti', price: 300, rarity: 'Mythic', emoji: '❄️', icon: 'fa-snowman', minLevel: 5 });
    expect(yeti.availableUntil).toBeUndefined();
    expect(items.find(item => item.id === 'avatar-football')).toMatchObject({
      name: 'Fotbalist', price: 150, rarity: 'Epic', emoji: '⚽', icon: 'fa-soccer-ball'
    });
    expect(items.find(item => item.id === 'avatar-gamer')).toMatchObject({
      name: 'Gamer', price: 150, rarity: 'Epic', emoji: '🎮', icon: 'fa-gamepad'
    });

    const icons = readFileSync(new URL('../node_modules/@fortawesome/fontawesome-free/css/all.css', import.meta.url), 'utf8');
    for (const icon of ['fa-cookie', 'fa-ghost', 'fa-mask', 'fa-snowman', 'fa-soccer-ball', 'fa-gamepad']) {
      expect(icons).toContain(`.${icon} {`);
    }
  });

  it('arată ediția limitată până la sfârșitul zilei de 31 octombrie, ora București', async () => {
    expect(dayKey(OPEN)).toBe('2026-10-31');
    expect(dayKey(CLOSED)).toBe('2026-11-01');

    const open = economyStore.getCatalog(OPEN);
    const closed = economyStore.getCatalog(CLOSED);
    for (const id of HALLOWEEN) {
      const item = open.items.find(entry => entry.id === id);
      expect(item.price).toBe(150);
      expect(item.rarity).toBe('Epic');
      expect(item.badge).toBe('Ediție limitată · Exclusiv Halloween');
      expect(item.untilLabel).toBe('Disponibil până pe 31 octombrie');
      expect(item.saleOpen).toBe(true);
      expect(shopCatalog.isSaleOpen(item, OPEN)).toBe(true);
      expect(shopCatalog.isSaleOpen(item, CLOSED)).toBe(false);
      expect(closed.items.find(entry => entry.id === id).saleOpen).toBe(false);
      expect(shopItemVisible(item, false)).toBe(true);
      expect(shopItemVisible({ ...item, saleOpen: false }, false)).toBe(false);
      expect(shopItemVisible({ ...item, saleOpen: false }, true)).toBe(true);
    }
    expect(themeWash('theme-halloween-night')).toEqual(['#ff8a1e', '#7c4dff']);
    expect(themeWash('theme-halloween-house')).toEqual(['#e8b86d', '#8e7cc3']);
    expect(themeWash('theme-ocean')).toEqual(['#1f6f8b', '#1f6f8b']);

    const { agent } = await student();
    const live = await agent.get('/api/economy/catalog');
    const pumpkin = live.body.items.find(item => item.id === 'avatar-halloween-pumpkin');
    expect(pumpkin.saleOpen).toBe(shopCatalog.isSaleOpen(pumpkin));
  });

  it('încasează cumpărarea doar cât e deschisă ediția și lasă obiectul de purtat', async () => {
    const buyer = await student();
    fund(buyer.email, 150);
    const before = economyStore.getSummary(buyer.email).balance;
    expect(before).toBe(150);

    const bought = economyStore.purchaseItem({
      userId: buyer.email,
      itemId: 'avatar-halloween-pumpkin',
      now: OPEN
    });
    expect(bought.ok).toBe(true);
    expect(bought.balance).toBe(before - 150);
    expect(bought.inventory).toContain('avatar-halloween-pumpkin');

    const worn = economyStore.equipCosmetic({ userId: buyer.email, itemId: 'avatar-halloween-pumpkin' });
    expect(worn.ok).toBe(true);
    expect(worn.equipped.avatar).toBe('avatar-halloween-pumpkin');

    fund(buyer.email, 150);
    const night = economyStore.purchaseItem({
      userId: buyer.email,
      itemId: 'theme-halloween-night',
      now: OPEN
    });
    expect(night.ok).toBe(true);
    expect(night.equipped.background).toBe('theme-halloween-night');
    const stillWorn = economyStore.equipCosmetic({ userId: buyer.email, itemId: 'theme-halloween-night' });
    expect(stillWorn.ok).toBe(true);
    expect(economyStore.getCatalog(CLOSED).items.find(item => item.id === 'theme-halloween-night').saleOpen).toBe(false);

    const late = await student();
    fund(late.email, 150);
    const balance = economyStore.getSummary(late.email).balance;
    const denied = economyStore.purchaseItem({
      userId: late.email,
      itemId: 'theme-halloween-night',
      now: CLOSED
    });
    expect(denied.ok).toBe(false);
    expect(denied.reason).toBe('sale_ended');
    expect(denied.balance).toBe(balance);
    expect(economyStore.getInventory(late.email).inventory).not.toContain('theme-halloween-night');

    const route = readFileSync(new URL('../backend/src/routes/economy.js', import.meta.url), 'utf8');
    expect(route).toContain('purchaseItem({ userId: req.auth.email, itemId: item_id })');
    const shop = readFileSync(new URL('../frontend/components/ShopScreen.jsx', import.meta.url), 'utf8');
    expect(shop).toContain('sale_ended');
    expect(shop).not.toMatch(/countdown|rămase|setInterval/i);
  });

  it('ține Yeti la nivelul 5 și pictează fundalul fără să schimbe textul', async () => {
    const { email, agent } = await student();
    fund(email, 400);
    const blocked = await agent.post('/api/economy/buy').send({ item_id: 'avatar-yeti' });
    expect(blocked.status).toBe(400);
    expect(blocked.body.reason).toBe('level_required');
    expect(blocked.body.minLevel).toBe(5);
    expect(blocked.body.balance).toBe(400);

    const root = {
      style: {
        props: {},
        setProperty(key, value) { this.props[key] = value; },
        removeProperty(key) { delete this.props[key]; }
      },
      dataset: {},
      classList: {
        classes: new Set(),
        add(name) { this.classes.add(name); },
        remove(name) { this.classes.delete(name); }
      }
    };
    global.document = { documentElement: root };
    applyShopBackground('theme-halloween-night', {
      accent: THEME_ACCENTS['theme-halloween-night'],
      wash: themeWash('theme-halloween-night')
    });
    expect(root.style.props['--user-accent']).toBe('#ff8a1e');
    expect(root.style.props['--theme-spot-a']).toBe('#ff8a1e');
    expect(root.style.props['--theme-spot-b']).toBe('#7c4dff');
    expect(root.classList.classes.has('has-user-theme')).toBe(true);
    expect(root.style.props['--text']).toBeUndefined();
    expect(root.style.props['--bg']).toBeUndefined();

    const css = readFileSync(new URL('../frontend/styles.css', import.meta.url), 'utf8');
    expect(css).toContain('html.has-user-theme .app-background');
    expect(css).toContain('linear-gradient(180deg, #08142A 0%, #08142A 72%)');
    expect(css).toContain('linear-gradient(180deg, #F7F9FC 0%, #E7EEF6 100%)');
    expect(css).toContain('.shop-theme-wash');
    expect(css).not.toMatch(/\.shop-limited-badge:hover/);
    const shop = readFileSync(new URL('../frontend/components/ShopScreen.jsx', import.meta.url), 'utf8');
    expect(shop).toContain('#08142A');
    const cosmetics = readFileSync(new URL('../shared/cosmetics.json', import.meta.url), 'utf8');
    expect(cosmetics).toContain('Ediție limitată · Exclusiv Halloween');
    expect(cosmetics).toContain('Disponibil până pe 31 octombrie');
  });

  it('ține Halloween separat și așază Fotbalist și Gamer lângă prețul 150', () => {
    const open = economyStore.getCatalog(OPEN);
    const closed = economyStore.getCatalog(CLOSED);
    expect(halloweenShelf(open.items, []).map(item => item.id)).toEqual(HALLOWEEN);
    expect(halloweenShelf(closed.items, [])).toEqual([]);
    expect(halloweenShelf(closed.items, ['avatar-halloween-ghost']).map(item => item.id)).toEqual(['avatar-halloween-ghost']);

    const avatars = regularShelf(open.items, 'avatar', []);
    const avatarIds = avatars.map(item => item.id);
    expect(avatarIds.some(id => id.includes('halloween'))).toBe(false);
    const alien = avatarIds.indexOf('avatar-alien');
    expect(avatarIds[alien - 1]).toBe('avatar-wizard');
    expect(avatarIds[alien + 1]).toBe('avatar-football');
    expect(avatarIds[alien + 2]).toBe('avatar-gamer');
    expect(avatars.find(item => item.id === 'avatar-football').price).toBe(150);
    expect(avatars.find(item => item.id === 'avatar-gamer').price).toBe(150);
    const yetiAt = avatarIds.indexOf('avatar-yeti');
    expect(yetiAt).toBeGreaterThan(avatarIds.indexOf('avatar-cosmic-dragon'));
    expect(avatars[yetiAt].rarity).toBe('Mythic');
    expect(avatars[yetiAt].price).toBe(300);
    expect(regularShelf(closed.items, 'avatar', ['avatar-halloween-pumpkin']).some(item => item.exclusive === 'halloween')).toBe(false);
    expect(regularShelf(open.items, 'background', []).some(item => item.exclusive === 'halloween')).toBe(false);

    const shop = readFileSync(new URL('../frontend/components/ShopScreen.jsx', import.meta.url), 'utf8');
    expect(shop).toContain('🎃 Halloween · Ediție limitată');
    expect(shop.indexOf('shop-halloween-title')).toBeLessThan(shop.indexOf('>Catalog<'));
  });
});
