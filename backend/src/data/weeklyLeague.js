// Liga săptămânală: luni–duminică, primele 5 urcă, ultimele 5 coboară.
// Zonele nu se suprapun. Sub Bronz nu se coboară, peste Diamant nu se urcă.

const TIERS = ['bronz', 'argint', 'aur', 'diamant'];
const TIER_LABEL = { bronz: 'Bronz', argint: 'Argint', aur: 'Aur', diamant: 'Diamant' };
const LEAGUE_SIZE = 20;
const ZONE = 5;

function tierIndex(tier) {
  const index = TIERS.indexOf(tier);
  return index < 0 ? 0 : index;
}

function shiftTier(tier, direction) {
  const next = tierIndex(tier) + direction;
  if (next < 0 || next >= TIERS.length) return TIERS[tierIndex(tier)];
  return TIERS[next];
}

function daysLeft(day) {
  const [year, month, date] = String(day).split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, date)).getUTCDay() || 7;
  return 8 - weekday;
}

function daysLabel(left) {
  if (left <= 1) return 'Ultima zi din săptămână';
  return `Mai sunt ${left} zile`;
}

function zoneBounds(count, tier) {
  const top = Math.min(ZONE, count);
  const demoteFrom = Math.max(top + 1, count - ZONE + 1);
  return {
    promoteThrough: tier === 'diamant' ? 0 : top,
    demoteFrom: tier === 'bronz' ? count + 1 : demoteFrom
  };
}

function zoneFor(place, bounds) {
  if (place <= bounds.promoteThrough) return 'up';
  if (place >= bounds.demoteFrom) return 'down';
  return 'stay';
}

function publicBoard(members, tier) {
  const sorted = members.slice().sort((a, b) =>
    b.xp - a.xp || String(a.nickname).localeCompare(String(b.nickname), 'ro'));
  const bounds = zoneBounds(sorted.length, tier);
  return sorted.map((row, index) => ({
    place: index + 1,
    nickname: row.nickname,
    xp: row.xp,
    zone: zoneFor(index + 1, bounds),
    self: Boolean(row.self)
  }));
}

function nextTierForPlace(place, count, tier) {
  const bounds = zoneBounds(count, tier);
  if (place <= bounds.promoteThrough) return shiftTier(tier, 1);
  if (place >= bounds.demoteFrom) return shiftTier(tier, -1);
  return TIERS[tierIndex(tier)];
}

module.exports = {
  TIERS,
  TIER_LABEL,
  LEAGUE_SIZE,
  ZONE,
  tierIndex,
  shiftTier,
  daysLeft,
  daysLabel,
  zoneBounds,
  publicBoard,
  nextTierForPlace
};
