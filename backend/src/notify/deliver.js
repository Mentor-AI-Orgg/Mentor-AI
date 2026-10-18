// Livrare de email (SMTP). Fără SMTP_HOST și SMTP_FROM, mesajul rămâne
// doar în inbox-ul din aplicație și răspunsul e etichetat `mocked: true`.
// Eșecul se scrie ca un cod, fără parolă, destinatar sau corp.

const config = require("../config");
const { isQuotaError, noteQuota } = require("./mailBudget");

function unwrap(value) {
  const text = String(value ?? "").replace(/\r/g, "").trim();
  if (text.length >= 2) {
    const first = text[0];
    const last = text[text.length - 1];
    if ((first === "\"" && last === "\"") || (first === "'" && last === "'")) {
      return text.slice(1, -1).trim();
    }
  }
  return text;
}

function readSetting(name) {
  const fromProcess = process.env[name];
  const raw = fromProcess != null && String(fromProcess) !== ""
    ? String(fromProcess)
    : String(config[name] || "");
  return unwrap(raw);
}

function smtpSettings() {
  const host = readSetting("SMTP_HOST");
  const loopback = host === "localhost" || host === "127.0.0.1" || host === "::1";
  const port = Number(readSetting("SMTP_PORT")) || 587;
  return {
    host,
    connectHost: loopback ? "127.0.0.1" : host,
    port,
    user: readSetting("SMTP_USER"),
    pass: readSetting("SMTP_PASS"),
    from: readSetting("SMTP_FROM"),
    loopback
  };
}

function smtpConfigured() {
  const settings = smtpSettings();
  return Boolean(settings.host && settings.from);
}

function failureCode(error) {
  const code = String(error && error.code || "").trim();
  if (/^[A-Za-z][A-Za-z0-9_]{0,31}$/.test(code)) return `smtp_${code}`;
  const response = String(error && error.responseCode || "").trim();
  if (/^\d{3}$/.test(response)) return `smtp_${response}`;
  return "smtp_failed";
}

function recordMail(code, extra) {
  try {
    require("../ops/errorMonitor").recordMailCode(code, extra);
  } catch {
    /* jurnalul nu oprește răspunsul către client */
  }
}

function warnIfSmtpMissing(action) {
  if (smtpConfigured()) return false;
  recordMail("smtp_unconfigured", { action: action || "email" });
  return true;
}

function transportOptions(settings, { auth = false, ignoreTLS = false, secure = false } = {}) {
  const options = {
    host: settings.connectHost,
    port: settings.port,
    secure,
    ignoreTLS,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000
  };
  if (auth && settings.user && settings.pass) {
    options.auth = { user: settings.user, pass: settings.pass };
  }
  // Certificatul local e emis pe domeniu, nu pe 127.0.0.1. Fără asta,
  // STARTTLS cade și mesajul nu ajunge la MTA.
  if (settings.loopback) options.tls = { rejectUnauthorized: false };
  return options;
}

function deliveryAttempts(settings) {
  // Pe portul 25, Exim de pe același server acceptă relay din 127.0.0.1
  // fără AUTH. AUTH înainte de TLS nu e anunțat, iar STARTTLS către
  // localhost pică pe numele din certificat. Dacă relay-ul e închis,
  // a doua încercare se autentifică.
  if (settings.loopback && settings.port === 25) {
    const attempts = [transportOptions(settings, { auth: false, ignoreTLS: true, secure: false })];
    if (settings.user && settings.pass) {
      attempts.push(transportOptions(settings, { auth: true, ignoreTLS: false, secure: false }));
    }
    return attempts;
  }
  return [transportOptions(settings, {
    auth: true,
    ignoreTLS: false,
    secure: settings.port === 465
  })];
}

async function trySend(nodemailer, options, message) {
  const transporter = nodemailer.createTransport(options);
  try {
    await transporter.sendMail(message);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  } finally {
    try {
      transporter.close();
    } catch {
      /* conexiunea e deja închisă */
    }
  }
}

async function sendEmail({ to, subject, body, html, attachments, action }) {
  if (!to) {
    return { mocked: true, delivered: false, channel: "email" };
  }
  const settings = smtpSettings();
  if (!settings.host || !settings.from) {
    recordMail("smtp_unconfigured", { action: action || "email" });
    return { mocked: true, delivered: false, channel: "email", error: "smtp_unconfigured" };
  }

  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch {
    recordMail("nodemailer_missing");
    return {
      mocked: true,
      delivered: false,
      channel: "email",
      error: "nodemailer_missing"
    };
  }

  const message = {
    from: settings.from,
    to,
    subject,
    text: body,
    html: html || undefined,
    attachments: attachments || undefined
  };
  let failure = null;
  for (const options of deliveryAttempts(settings)) {
    const result = await trySend(nodemailer, options, message);
    if (result.ok) {
      recordMail("smtp_accepted");
      require("../ops/errorMonitor").noteSmtpSuccess();
      return { mocked: false, delivered: true, channel: "email" };
    }
    failure = result.error;
    if (isQuotaError(failure)) break;
  }
  if (isQuotaError(failure)) {
    noteQuota();
    recordMail("smtp_quota");
    return {
      mocked: false,
      delivered: false,
      channel: "email",
      error: "smtp_quota",
      quota: true
    };
  }
  const code = failureCode(failure);
  recordMail(code);
  require("../ops/errorMonitor").noteSmtpFailure();
  return {
    mocked: false,
    delivered: false,
    channel: "email",
    error: code
  };
}

function refusedAddress(to) {
  return String(to || "").trim().toLowerCase().endsWith("@elev.invalid");
}

async function deliverMessage({ to, phone = "", subject, body, channel = "email", html, attachments, action }) {
  if (refusedAddress(to) || refusedAddress(phone) || channel === "none") {
    return { mocked: true, delivered: false, channel, refused: true, reason: "elev_invalid" };
  }
  return sendEmail({ to, subject, body, html, attachments, action });
}

module.exports = {
  smtpConfigured,
  warnIfSmtpMissing,
  sendEmail,
  deliverMessage
};
