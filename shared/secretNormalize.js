// Spațiul de la final și caracterele invizibile de la tastatura Android
// nu trebuie să despartă parola de confirmare.

function normalizeSecret(value) {
  return String(value || "")
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function confirmPasswordIssue(password, confirm) {
  const left = normalizeSecret(password);
  const right = normalizeSecret(confirm);
  if (!left && !right) return "Confirmă parola.";
  if (!right) {
    return "Confirmarea e goală. Scrie aceeași parolă și în al doilea câmp. Browserul din Facebook umple uneori doar primul.";
  }
  if (left !== right) {
    return "Parolele nu sunt la fel. Verifică spațiile și scrie aceeași frază în ambele câmpuri.";
  }
  return "";
}

module.exports = { normalizeSecret, confirmPasswordIssue };
