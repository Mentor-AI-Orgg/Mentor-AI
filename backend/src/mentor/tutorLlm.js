// Mod opțional. Rămâne oprit fără TUTOR_LLM=1 și fără OPENAI_KEY.
// Nu folosește răspunsul mock din recenzia foto: dacă modelul nu răspunde,
// rămâne textul local. Nu se inventează o regulă care nu e în pasaje.

const config = require("../config");
const { fetchWithTimeout } = require("../providers/fetchWithTimeout");
const { passagesFor } = require("./grounded");
const { MASCOT_NAME } = require("../../../shared/mascot.json");

function tutorLlmEnabled() {
  return process.env.TUTOR_LLM === "1" && Boolean(config.OPENAI_KEY);
}

function tutorModel() {
  return process.env.TUTOR_LLM_MODEL || "gpt-4o-mini";
}

function tutorMaxTokens() {
  const parsed = Number(process.env.TUTOR_LLM_MAX_TOKENS);
  if (!Number.isFinite(parsed) || parsed < 64) return 400;
  return Math.min(800, Math.floor(parsed));
}

function numbersIn(text) {
  return String(text || "").match(/\d+(?:[.,]\d+)?/g) || [];
}

function allowsNumbers(reply, allowedText) {
  const allowed = new Set(numbersIn(allowedText));
  return numbersIn(reply).every(value => allowed.has(value));
}

function systemPrompt() {
  return [
    `Ești ${MASCOT_NAME}, tutore pentru copii din clasele 5–8, la limba română și matematică.`,
    "Răspunzi doar cu idei care apar în MATERIAL. Nu adaugi reguli, numere, autori, ani sau definiții care nu sunt scrise acolo.",
    "Dacă materialul nu acoperă întrebarea, spui că nu ești sigură și indici lecția sau ecranul din material, dacă există unul.",
    "Nu rezolvi tema: nu dai rezultatul exercițiului copilului. Poți repeta regula din material.",
    "Limbaj simplu, politicos, pentru un copil. Fără violență și fără conținut de adulți.",
    "Dacă întrebarea e în engleză, poți începe cu o propoziție scurtă în engleză, apoi păstrezi formularea din material, fără să o traduci liber."
  ].join(" ");
}

function userPrompt({ message, subject, grade, language, passages }) {
  const blocks = passages.length
    ? passages.map((item, index) => (
      `${index + 1}. ${item.subject || ""} clasa ${item.grade || ""}, ${item.title || "material"} (${item.route || ""})\n${item.text}`
    )).join("\n\n")
    : "(niciun fragment potrivit)";
  return [
    `Limba preferată: ${language || "ro"}`,
    `Materia deschisă: ${subject}`,
    `Clasa: ${grade}`,
    `Întrebare: ${message}`,
    "",
    "MATERIAL:",
    blocks
  ].join("\n");
}

async function callTutorModel(messages) {
  const res = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: tutorModel(),
      temperature: 0,
      max_tokens: tutorMaxTokens(),
      messages
    })
  }, config.PROVIDER_TIMEOUT_MS);
  if (!res.ok) return "";
  const data = await res.json();
  return String(data.choices?.[0]?.message?.content || "").trim();
}

async function maybeTutorLlm({ message, subject, grade, language, local }) {
  if (!tutorLlmEnabled()) return null;
  if (local && local.confident !== false) return null;
  const passages = passagesFor(message, subject, grade);
  const allowed = `${message}\n${grade}\n${passages.map(item => `${item.title}\n${item.text}\n${item.route}`).join("\n")}`;
  let content = "";
  try {
    content = await callTutorModel([
      { role: "system", content: systemPrompt() },
      { role: "user", content: userPrompt({ message, subject, grade, language, passages }) }
    ]);
  } catch {
    return null;
  }
  if (!content || content.length > 1600) return null;
  if (!allowsNumbers(content, allowed)) return null;
  if (!passages.length && !/nu sunt sigur|nu știu|not sure|nu am găsit|nu am gasit/i.test(content)) return null;
  return {
    matched: false,
    confident: true,
    engine: "tutor_llm",
    lessonId: "",
    text: content
  };
}

module.exports = { maybeTutorLlm, tutorLlmEnabled, tutorModel };
