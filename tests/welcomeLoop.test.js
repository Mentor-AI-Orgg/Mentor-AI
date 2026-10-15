import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { lessonsUntilNext as lessonsOnClient } from '../frontend/levelLessons.js';
import { lessonsLabel } from '../frontend/levelLessons.js';

const nodeRequire = createRequire(import.meta.url);
const economy = nodeRequire('../backend/src/data/economyStore.js');
const auth = nodeRequire('../backend/src/data/authStore.js');
const progress = nodeRequire('../backend/src/data/progressEngine.js');
const quick = nodeRequire('../backend/src/data/quickStart.js');
const chest = nodeRequire('../backend/src/data/lessonChest.js');
const shop = nodeRequire('../backend/src/data/shopCatalog.js');

describe('bonusul de cont, startul scurt și cufărul', () => {
  it('acordă bonusul de 20 XP o singură dată', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const first = await created.agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(first.status).toBe(200);
    expect(first.body.summary.xp).toBe(20);
    expect(first.body.summary.balance).toBe(30);
    const again = await created.agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    expect(again.status).toBe(400);
    expect(again.body.reason).toBe('already_claimed');
    expect(again.body.summary.xp).toBe(20);
    expect(again.body.summary.balance).toBe(30);
  });

  it('dă 20 XP la cele trei întrebări și nu le mai dă a doua oară', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { class: '5' });
    const open = await created.agent.get('/api/economy/quick-start');
    expect(open.status).toBe(200);
    expect(open.body.questions).toHaveLength(3);
    expect(open.body.chapterId).toBe('naturale');
    expect(JSON.stringify(open.body.questions)).not.toContain('correctAt');

    const email = auth.findByUsername(created.username).email;
    const keyed = quick.quizFor(email, 5);
    const answers = keyed.questions.map(item => ({ id: item.id, choice: item.correctAt }));
    const done = await created.agent.post('/api/economy/quick-start/finish').send({ answers });
    expect(done.status).toBe(200);
    expect(done.body.earnedXp).toBe(20);
    expect(done.body.correct).toBe(3);
    expect(done.body.summary.xp).toBe(20);

    const repeat = await created.agent.post('/api/economy/quick-start/finish').send({ answers });
    expect(repeat.body.already).toBe(true);
    expect(repeat.body.earnedXp).toBe(0);
    expect(repeat.body.summary.xp).toBe(20);
  });

  it('sărirea peste nu dă XP', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app, { class: '6' });
    const skipped = await created.agent.post('/api/economy/quick-start/skip');
    expect(skipped.status).toBe(200);
    expect(skipped.body.summary.xp).toBe(0);
    expect(skipped.body.summary.quickStart.skipped).toBe(true);
    const late = await created.agent.post('/api/economy/quick-start/finish').send({
      answers: [{ id: 'qs6-in', choice: 0 }]
    });
    expect(late.body.earnedXp).toBe(0);
    expect(late.body.summary.xp).toBe(0);
  });

  it('deschide cufărul o singură dată pe lecție, pe server', async () => {
    const { app } = createApp({ autosave: false });
    const created = await registerGranted(app);
    const email = auth.findByUsername(created.username).email;
    const meta = { subject: 'matematica', grade: '5', chapterId: 'naturale', title: 'Numere naturale' };
    const first = await created.agent.post('/api/economy/progress').send({ type: 'session_complete', meta });
    expect(first.status).toBe(200);
    expect(first.body.awarded).toBeNull();
    expect(['coins', 'sticker', 'fact']).toContain(first.body.chest.kind);
    expect(first.body.chest.label.length).toBeGreaterThan(3);
    expect(first.body.story).toBeUndefined();

    const again = await created.agent.post('/api/economy/progress').send({ type: 'session_complete', meta });
    expect(again.body.chest).toBeNull();

    const other = economy.recordProgress({
      userId: email,
      type: 'session_complete',
      meta: { subject: 'matematica', grade: '5', chapterId: 'fractii', title: 'Fracții' }
    });
    expect(other.chest).toBeTruthy();
    expect(other.story).toBeUndefined();

    const shopItems = shop.SHOP_CATALOG.map(item => item.id);
    expect(shopItems).not.toContain('zecita-stea');
    if (first.body.chest.kind === 'coins') {
      expect(first.body.chest.coins).toBeLessThanOrEqual(chest.COIN_AMOUNT);
      expect(first.body.summary.balance).toBeLessThanOrEqual(chest.COIN_AMOUNT);
    }
  });

  it('alege același cufăr pentru același elev și aceeași lecție', () => {
    const left = chest.decideChest({ userId: 'elev-a', key: 'matematica:5:naturale', owned: [], coinRoom: 4 });
    const right = chest.decideChest({ userId: 'elev-a', key: 'matematica:5:naturale', owned: [], coinRoom: 4 });
    expect(right).toEqual(left);
    expect(chest.decideChest({ userId: 'elev-a', key: 'matematica:5:naturale', owned: [], coinRoom: 0 }).kind).not.toBe('coins');
    const sticker = chest.STICKERS[0];
    const label = chest.chestLabel({ kind: 'sticker', sticker });
    expect(label).toBe(`${sticker.emoji} ${sticker.name}.`);
    expect(label).not.toMatch(/Povestea/);
  });

  it('spune câte lecții mai sunt până la nivelul următor', () => {
    expect(progress.lessonsUntilNext(progress.levelFromXp(0).xpToNext)).toBe(3);
    expect(progress.lessonsUntilNext(progress.levelFromXp(20).xpToNext)).toBe(2);
    expect(lessonsOnClient(progress.levelFromXp(20).xpToNext)).toBe(2);
    expect(lessonsLabel(40, 2)).toBe('Mai ai 2 lecții până la nivelul 2');
    expect(lessonsLabel(25, 3)).toBe('Mai ai 1 lecție până la nivelul 3');
  });

  it('ține textele calme în ecrane', () => {
    const app = fs.readFileSync('frontend/App.jsx', 'utf8');
    const register = app.slice(app.indexOf('const handleRegister'), app.indexOf('const onboardingSteps'));
    expect(register).toContain("claimReward({ type: 'login_bonus' })");
    expect(register).toContain('syncEconomy');
    const home = fs.readFileSync('frontend/screens/HomeScreen.jsx', 'utf8');
    const profile = fs.readFileSync('frontend/screens/ProfileScreen.jsx', 'utf8');
    const start = fs.readFileSync('frontend/components/QuickStartScreen.jsx', 'utf8');
    expect(home).toContain('lessonsLabel');
    expect(home).toContain('level-nudge');
    expect(home).not.toContain("onNavigate('progres')");
    expect(profile).not.toContain('profil-poveste');
    expect(profile).not.toContain('STORY_TITLE');
    expect(profile).toContain('Stickere');
    const chestSrc = fs.readFileSync('backend/src/data/lessonChest.js', 'utf8');
    expect(chestSrc).not.toMatch(/Povestea/);
    expect(start).toContain('+20 XP, ai început!');
    expect(start).toContain('quick-start-end');
    expect(start).toContain('Sari peste');
    expect(start).toContain('Spre prima lecție');
    expect(start).not.toMatch(/sigur că|pierzi|doar azi|ofertă/i);
    const chestUi = fs.readFileSync('frontend/components/MysteryChest.jsx', 'utf8');
    const css = fs.readFileSync('frontend/styles.css', 'utf8');
    const store = fs.readFileSync('backend/src/data/economyStore.js', 'utf8');
    expect(chestUi).toContain('<Mascota');
    expect(chestUi).not.toContain('size="sm"');
    expect(css).toContain('.quick-start-end .mascota');
    expect(css).toContain('.chest-card .mascota');
    expect(css).not.toContain('.story-scene');
    expect(css).toContain('.home-page .mascot-stage .mascota');
    expect(store).not.toContain('zecitaStory');
    expect(store).not.toContain('seeStory');
  });
});
