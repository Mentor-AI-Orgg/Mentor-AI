// Parolă pentru copii: minim 8 caractere, fără reguli de simboluri.
// Se refuză parola egală cu numele de utilizator și cele mai folosite parole.

const { isCommonPassword, commonPasswordCount } = require("../../../shared/commonPasswords");

function sameName(password, username) {
  const left = String(password || "").trim().toLowerCase();
  const right = String(username || "").trim().toLowerCase();
  return Boolean(left && right && left === right);
}

function passwordError(password, username = "") {
  const value = String(password || "");
  if (value.length < 8) return "Parola trebuie să aibă minim 8 caractere.";
  if (sameName(value, username)) return "Alege o parolă care nu e la fel cu numele de utilizator.";
  if (isCommonPassword(value)) return "Parola asta e prea cunoscută. Alege alta.";
  return null;
}

function passwordStrength(password) {
  const value = String(password || "");
  if (!value) return { level: "empty", label: "" };
  if (value.length < 8) return { level: "short", label: "Prea scurtă. Mai scrie." };
  if (isCommonPassword(value)) return { level: "weak", label: "Prea cunoscută. Alege alta." };
  if (value.includes(" ") || value.length >= 12) return { level: "good", label: "Bună. O frază e greu de ghicit." };
  return { level: "ok", label: "E ok." };
}

module.exports = {
  passwordError,
  passwordStrength,
  commonPasswordCount
};
