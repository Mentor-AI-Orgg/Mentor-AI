// Măsoară tutorele local pe întrebări de elev, fără niciun model plătit.
//
//   node scripts/tutor-eval.mjs
//
// Răspuns util = lecție potrivită, ghid către lecția/ecranul corect, sau
// refuz cinstit (fără regulă inventată). Acuratețea cere și ca textul să
// conțină indiciul din material și să nu scurgă rezultatul temei.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { answerFromLessons } = require("../backend/src/mentor/localMentor.js");

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultSet = path.join(here, "..", "tests", "fixtures", "tutor-eval-set.json");

function fold(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, list) {
  if (!list || !list.length) return true;
  return list.some(part => text.includes(fold(part)));
}

function hasAll(text, list) {
  if (!list || !list.length) return true;
  return list.every(part => text.includes(fold(part)));
}

function hits(text, list) {
  return (list || []).some(part => text.includes(fold(part)));
}

export function judgeItem(item, result) {
  const text = fold(result && result.text);
  if (hits(text, item.forbid) || hits(text, item.leak)) {
    return { ok: false, helpful: false, reason: hits(text, item.leak) ? "leak" : "forbid" };
  }
  const mode = item.mode;
  if (mode === "answer" || mode === "follow") {
    const good = result.matched === true && hasAny(text, item.accept) && hasAll(text, item.acceptAll);
    return { ok: good, helpful: good, reason: good ? "ok" : "answer" };
  }
  if (mode === "guide") {
    const honest = /nu sunt sigur|nu am gasit|nu ghicesc|nu invent/.test(text);
    const good = result.matched === false && honest && hasAny(text, item.accept);
    return { ok: good, helpful: good, reason: good ? "ok" : "guide" };
  }
  if (mode === "nav" || mode === "advice" || mode === "homework") {
    const good = hasAny(text, item.accept) && hasAll(text, item.acceptAll);
    return { ok: good, helpful: good, reason: good ? "ok" : mode };
  }
  if (mode === "honest") {
    const honest = result.matched === false && /nu am gasit|nu sunt sigur|nu invent|nu ghicesc|limba romana si matematica|lecti/.test(text);
    return { ok: honest, helpful: false, reason: honest ? "ok" : "honest" };
  }
  return { ok: false, helpful: false, reason: "mode" };
}

export function scoreSet(items) {
  const rows = items.map(item => {
    const result = answerFromLessons({
      message: item.q,
      subject: item.subject,
      grade: item.grade,
      history: item.history
    });
    const judged = judgeItem(item, result);
    return { item, result, ...judged };
  });
  const graded = rows.filter(row => row.item.mode !== "honest");
  const helpful = graded.filter(row => row.helpful).length;
  const accurate = rows.filter(row => row.ok).length;
  return {
    total: rows.length,
    helpfulRate: graded.length ? helpful / graded.length : 0,
    accuracy: rows.length ? accurate / rows.length : 0,
    helpful,
    graded: graded.length,
    accurate,
    failures: rows.filter(row => !row.ok).map(row => ({
      id: row.item.id,
      mode: row.item.mode,
      reason: row.reason,
      q: row.item.q,
      matched: row.result.matched,
      lesson: row.result.lesson || "",
      text: String(row.result.text || "").slice(0, 180).replace(/\s+/g, " ")
    }))
  };
}

function main() {
  const file = process.argv[2] || defaultSet;
  const items = JSON.parse(fs.readFileSync(file, "utf8"));
  const report = scoreSet(items);
  const pct = value => `${(value * 100).toFixed(1)}%`;
  console.log(`Întrebări: ${report.total}`);
  console.log(`Rată de răspuns util (fără refuzurile cinstite): ${report.helpful}/${report.graded} = ${pct(report.helpfulRate)}`);
  console.log(`Acuratețe pe tot setul: ${report.accurate}/${report.total} = ${pct(report.accuracy)}`);
  if (report.failures.length) {
    console.log(`\nEșecuri (${report.failures.length}):`);
    report.failures.forEach(row => {
      console.log(`- ${row.id} [${row.mode}/${row.reason}] ${row.q}`);
      console.log(`  matched=${row.matched} lesson=${row.lesson}`);
      console.log(`  ${row.text}`);
    });
  }
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invoked) main();
