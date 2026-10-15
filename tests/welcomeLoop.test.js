import fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { lessonsUntilNext as lessonsOnClient, lessonsLabel } from '../frontend/levelLessons.js';

const nodeRequire = createRequire(import.meta.url);
const progress = nodeRequire('../backend/src/data/progressEngine.js');

describe('bara de nivel', () => {
  it('spune câte lecții mai sunt până la nivelul următor', () => {
    expect(progress.lessonsUntilNext(progress.levelFromXp(0).xpToNext)).toBe(3);
    expect(progress.lessonsUntilNext(progress.levelFromXp(20).xpToNext)).toBe(2);
    expect(lessonsOnClient(progress.levelFromXp(20).xpToNext)).toBe(2);
    expect(lessonsLabel(40, 2)).toBe('Mai ai 2 lecții până la nivelul 2');
    expect(lessonsLabel(25, 3)).toBe('Mai ai 1 lecție până la nivelul 3');
  });

  it('lasă bara pe prima pagină și scoate cufărul, startul scurt și bonusul de la înscriere', () => {
    const app = fs.readFileSync('frontend/App.jsx', 'utf8');
    const register = app.slice(app.indexOf('const handleRegister'), app.indexOf('const onboardingSteps'));
    const onboard = app.slice(app.indexOf('const handleOnboardingNext'), app.indexOf('const handleOnboardingBack'));
    expect(register).not.toContain("claimReward({ type: 'login_bonus' })");
    expect(onboard).toContain("claimReward({ type: 'login_bonus' })");
    expect(app).not.toContain('QuickStartScreen');
    expect(app).not.toContain('quick-start');
    const home = fs.readFileSync('frontend/screens/HomeScreen.jsx', 'utf8');
    const profile = fs.readFileSync('frontend/screens/ProfileScreen.jsx', 'utf8');
    const learn = fs.readFileSync('frontend/screens/LearnScreen.jsx', 'utf8');
    const css = fs.readFileSync('frontend/styles.css', 'utf8');
    const store = fs.readFileSync('backend/src/data/economyStore.js', 'utf8');
    expect(home).toContain('lessonsLabel');
    expect(home).toContain('level-nudge');
    expect(home).not.toContain("onNavigate('progres')");
    expect(profile).not.toContain('Stickere');
    expect(profile).not.toContain('profil-poveste');
    expect(profile).not.toContain('STORY_TITLE');
    expect(learn).not.toContain('MysteryChest');
    expect(css).toContain('.level-nudge');
    expect(css).not.toContain('.chest-pop');
    expect(css).not.toContain('.story-scene');
    expect(css).not.toContain('.quick-start-end');
    expect(store).not.toContain('openLessonChest');
    expect(store).not.toContain('zecitaStory');
    expect(store).not.toContain('seeStory');
    expect(fs.existsSync('backend/src/data/lessonChest.js')).toBe(false);
    expect(fs.existsSync('backend/src/data/quickStart.js')).toBe(false);
    expect(fs.existsSync('frontend/components/MysteryChest.jsx')).toBe(false);
    expect(fs.existsSync('frontend/components/QuickStartScreen.jsx')).toBe(false);
    expect(fs.existsSync('frontend/components/StoryScene.jsx')).toBe(false);
    expect(fs.existsSync('backend/src/data/zecitaStory.js')).toBe(false);
  });
});
