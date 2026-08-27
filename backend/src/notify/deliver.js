// Livrare reală de email (SMTP) și SMS (Twilio REST).
// Fără credențiale, mesajul rămâne doar în inbox-ul din aplicație și
// răspunsul e etichetat `mocked: true` — același contract ca motoarele AI.

const config = require("../config");

function smtpConfigured() {
  return Boolean(config.SMTP_HOST && config.SMTP_FROM);
}

function twilioConfigured() {
  return Boolean(config.TWILIO_ACCOUNT_SID && config.TWILIO_AUTH_TOKEN && config.TWILIO_FROM);
}

async function sendEmail({ to, subject, body }) {
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
      text: body
    });
    return { mocked: false, delivered: true, channel: "email" };
  } catch (error) {
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

async function sendSms({ to, body }) {
  const phone = String(to || "").trim();
  if (!twilioConfigured() || !phone) {
    return { mocked: true, delivered: false, channel: "sms" };
  }

  const sid = config.TWILIO_ACCOUNT_SID;
  const token = config.TWILIO_AUTH_TOKEN;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = new URLSearchParams({
    From: config.TWILIO_FROM,
    To: phone,
    Body: body
  });

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString(),
        signal: AbortSignal.timeout(8000)
      }
    );
    if (!response.ok) {
      return { mocked: false, delivered: false, channel: "sms", error: `twilio_${response.status}` };
    }
    return { mocked: false, delivered: true, channel: "sms" };
  } catch (error) {
    return {
      mocked: false,
      delivered: false,
      channel: "sms",
      error: error.name === "TimeoutError" ? "twilio_timeout" : (error.message || "twilio_failed")
    };
  }
}

// SMS dacă canalul e sms și avem număr; altfel email. Fără chei, mock.
async function deliverMessage({ to, phone = "", subject, body, channel = "email" }) {
  if (channel === "sms") {
    const sms = await sendSms({ to: phone || to, body: subject ? `${subject}\n${body}` : body });
    if (sms.delivered || !to || to === phone) return sms;
    // Fără număr / Twilio: încercăm emailul ca rezervă, tot etichetat.
    const email = await sendEmail({ to, subject, body });
    return { ...email, fallbackFrom: "sms" };
  }
  return sendEmail({ to, subject, body });
}

module.exports = {
  smtpConfigured,
  twilioConfigured,
  sendEmail,
  sendSms,
  deliverMessage
};
