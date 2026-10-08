// Datele operatorului vin doar din mediu. Nu sunt inventate în repo.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(env, key) {
  const value = String(env[key] || "").trim();
  if (!value || value.includes("[DE COMPLETAT")) return "";
  return value;
}

function operatorFromEnv(env = process.env) {
  const name = read(env, "LEGAL_OPERATOR_NAME");
  // Adresa poștală este opțională: o persoană fizică poate să nu o publice.
  const address = read(env, "LEGAL_OPERATOR_ADDRESS");
  const contact = read(env, "LEGAL_CONTACT");
  const email = EMAIL.test(contact) ? contact : "";
  const dpo = read(env, "LEGAL_DPO");
  const cui = read(env, "LEGAL_CUI");
  const missing = [];
  if (!name) missing.push("LEGAL_OPERATOR_NAME");
  if (!email) missing.push("LEGAL_CONTACT");
  return {
    name,
    address,
    email,
    dpo,
    cui,
    missing,
    complete: missing.length === 0
  };
}

module.exports = { operatorFromEnv };
