// Raport read-only pentru părintele declarat. Fără cont, fără chat, fără parolă.

const { getUser, getSkillHistory, getSummary } = require("./economyStore");

function clip(text, max = 90) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function formatLastStudy(lastStudy) {
  if (!lastStudy) return "";
  if (typeof lastStudy === "string") return lastStudy;
  const title = String(lastStudy.title || lastStudy.chapterId || "").trim();
  const at = lastStudy.at || lastStudy.startedAt || "";
  let when = "";
  if (at) {
    const date = new Date(at);
    if (!Number.isNaN(date.getTime())) {
      when = date.toLocaleString("ro-RO", { dateStyle: "medium", timeStyle: "short" });
    }
  }
  if (title && when) return `${title} · ${when}`;
  return title || when;
}

function firstName(account) {
  const raw = String(account.profile?.name || account.profile?.username || "").trim();
  return raw.split(/\s+/)[0] || "elevul";
}

function buildParentReport(account) {
  const user = getUser(account.email);
  const summary = getSummary(account.email);
  const skills = getSkillHistory(account.email);
  const tests = (skills.log || [])
    .filter(row => row.kind === "test" || row.kind === "flashcards")
    .slice(0, 12)
    .map(row => ({
      at: row.at,
      kind: row.kind === "flashcards" ? "flashcarduri" : "test",
      title: row.title || row.chapterId || "Test",
      subject: row.subject || "",
      grade: row.gradeNote,
      correct: row.correct,
      total: row.total,
      strengths: row.strengths || [],
      weaknesses: row.weaknesses || []
    }));

  const enPapers = Object.entries(user?.enPapers || {})
    .filter(([, paper]) => paper && paper.finishedAt)
    .map(([id, paper]) => ({
      id,
      at: paper.finishedAt,
      title: paper.score?.grade ? `Evaluare Națională · nota ${paper.score.grade}` : "Evaluare Națională",
      grade: paper.score?.grade || "",
      durationMs: paper.durationMs || 0
    }))
    .sort((a, b) => String(b.at).localeCompare(String(a.at)))
    .slice(0, 6);

  const chapters = Object.values(user?.chapters || {})
    .filter(row => row && row.title)
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")))
    .slice(0, 12)
    .map(row => ({
      title: row.title,
      subject: row.subject || "",
      status: row.status === "done" ? "terminat" : "în lucru"
    }));

  return {
    student: {
      name: firstName(account),
      className: account.profile?.class || user?.preferences?.className || ""
    },
    streak: Number(summary.streak) || 0,
    lastStudy: formatLastStudy(summary.lastStudy),
    level: Number(summary.level) || 1,
    tests,
    enPapers,
    chapters,
    strengths: (skills.strengths || []).slice(0, 8),
    weaknesses: (skills.weaknesses || []).slice(0, 8),
    note: "Pagina e doar pentru tine, din linkul din email. Nu poți schimba parola copilului de aici."
  };
}

function parentReportUrl(token, baseUrl) {
  const base = String(baseUrl || "https://suntde10.ro").replace(/\/$/, "");
  return `${base}/#/parinte/${encodeURIComponent(token)}`;
}

module.exports = { buildParentReport, parentReportUrl, clip };
