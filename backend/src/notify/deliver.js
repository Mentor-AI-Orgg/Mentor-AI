// Livrare de email (SMTP). Fără credențiale, mesajul rămâne doar în
// inbox-ul din aplicație și răspunsul e etichetat `mocked: true`.

const config = require("../config");

function smtpConfigured() {
  return Boolean(config.SMTP_HOST && config.SMTP_FROM);
}

async function sendEmail({ to, subject, body, html, attachments }) {
  if (!smtpConfigured() || !to) {
    return { mocked: true, delivered: false, channel: "email" };
  }

  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch {
    return {
      mocked: true,
      delivered: false,
      channel: "email",
      error: "nodemailer_missing"
    };
  }

  const port = Number(config.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port,
    secure: port === 465,
    auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000
  });

  try {
    await transporter.sendMail({
      from: config.SMTP_FROM,
      to,
      subject,
      text: body,
      html: html || undefined,
      attachments: attachments || undefined
    });
    require("../ops/errorMonitor").noteSmtpSuccess();
    return { mocked: false, delivered: true, channel: "email" };
  } catch (error) {
    require("../ops/errorMonitor").noteSmtpFailure();
    return {
      mocked: false,
      delivered: false,
      channel: "email",
      error: error.code || error.message || "smtp_failed"
    };
  } finally {
    transporter.close();
  }
}

function refusedAddress(to) {
  return String(to || "").trim().toLowerCase().endsWith("@elev.invalid");
}

async function deliverMessage({ to, phone = "", subject, body, channel = "email", html, attachments }) {
  if (refusedAddress(to) || refusedAddress(phone) || channel === "none") {
    return { mocked: true, delivered: false, channel, refused: true, reason: "elev_invalid" };
  }
  return sendEmail({ to, subject, body, html, attachments });
}

module.exports = {
  smtpConfigured,
  sendEmail,
  deliverMessage
};
