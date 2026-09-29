const live = [];

function deviceLimit() {
  if (typeof navigator === 'undefined') return 2;
  const memory = Number(navigator.deviceMemory) || 0;
  const cores = Number(navigator.hardwareConcurrency) || 0;
  if ((memory && memory <= 2) || (cores && cores <= 4)) return 1;
  return 2;
}

function limit() {
  return deviceLimit();
}

function acquire(id, onEvict) {
  const existing = live.findIndex(item => item.id === id);
  if (existing >= 0) live.splice(existing, 1);
  live.push({ id, onEvict });
  const max = limit();
  while (live.length > max) {
    const oldest = live.shift();
    if (oldest && oldest.onEvict) oldest.onEvict();
  }
}

function release(id) {
  const index = live.findIndex(item => item.id === id);
  if (index >= 0) live.splice(index, 1);
}

function resetBudget() {
  live.length = 0;
}

function shouldRender3D({ flat = false, spinning = false, visible = true } = {}) {
  if (flat) return false;
  if (!spinning) return false;
  if (!visible) return false;
  return true;
}

export { acquire, release, limit, resetBudget, shouldRender3D };
