// Termenele de păstrare. Pagina de confidențialitate citește aceleași numere,
// ca textul legal să nu se despartă de ce face programul.

const DAY_MS = 24 * 60 * 60 * 1000;

module.exports = {
  DAY_MS,
  PENDING_MS: 14 * DAY_MS,
  INACTIVE_MS: 730 * DAY_MS,
  WARNING_BEFORE_MS: 30 * DAY_MS,
  PARENT_ACTIVITY_MS: 90 * DAY_MS,
  TUTOR_MEMORY_MS: 365 * DAY_MS,
  DELETION_KEEP_MS: 40 * DAY_MS
};
