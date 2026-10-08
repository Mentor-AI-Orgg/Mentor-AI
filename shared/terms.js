// Versiunea termenilor acceptați la cont nou. Conturile vechi nu o cer.
const { policyVersion } = require("./legal.json");

const TERMS_VERSION = policyVersion;

module.exports = { TERMS_VERSION };
