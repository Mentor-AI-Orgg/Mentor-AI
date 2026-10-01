import { EXERCISE_EVENTS, MASCOT_MESSAGES, fillMessage } from '../i18n/mascotMessages.js';

const listeners = new Set();
const stageListeners = new Set();
const state = { text: '', at: 0, cursor: {}, stages: 0 };

function resetMascotFeed() {
  state.text = '';
  state.at = 0;
  state.cursor = {};
  state.stages = 0;
}

function subscribeMascot(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyStages() {
  stageListeners.forEach(listener => listener(state.stages));
}

function holdMascotStage() {
  state.stages += 1;
  notifyStages();
  return () => {
    state.stages = Math.max(0, state.stages - 1);
    notifyStages();
  };
}

function mascotStageOpen() {
  return state.stages > 0;
}

function subscribeMascotStage(listener) {
  stageListeners.add(listener);
  return () => stageListeners.delete(listener);
}

function pickLine(event, vars) {
  const pack = MASCOT_MESSAGES[event];
  if (!pack) return null;
  const source = event === 'raspuns_gresit_din_nou' && vars.hint
    ? pack.lines.filter(line => line.includes('{hint}'))
    : pack.lines;
  const lines = source.map(line => fillMessage(line, vars)).filter(Boolean);
  if (!lines.length) return null;
  const start = state.cursor[event] || 0;
  let chosen = lines[start % lines.length];
  if (chosen === state.text && lines.length > 1) chosen = lines[(start + 1) % lines.length];
  state.cursor[event] = start + 1;
  return { mood: pack.mood, big: Boolean(pack.big), message: chosen };
}

function reactTo(event, vars = {}, now = Date.now()) {
  const name = event === 'raspuns_gresit' && Number(vars.attempt) >= 2
    ? 'raspuns_gresit_din_nou'
    : event;
  if (EXERCISE_EVENTS.has(name) && state.at && now - state.at < 10000) return null;
  const reaction = pickLine(name, vars);
  if (!reaction) return null;
  state.text = reaction.message;
  state.at = now;
  return reaction;
}

function emitMascot(event, vars) {
  const reaction = reactTo(event, vars);
  if (!reaction) return null;
  listeners.forEach(listener => listener(reaction));
  return reaction;
}

export {
  emitMascot,
  holdMascotStage,
  mascotStageOpen,
  reactTo,
  resetMascotFeed,
  subscribeMascot,
  subscribeMascotStage
};
