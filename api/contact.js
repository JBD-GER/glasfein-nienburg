import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const LOGO_CONTENT_ID = "glasfein-logo";
const LOGO_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../public/assets/images/logo.png");

const REQUIRED_FIELDS = ["firstName", "lastName", "phone", "email", "message"];
let cachedLogoAttachments;

function clean(value, maxLength = 1800) {
  return String(value ?? "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return clean(value, 8000).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

function nl2br(value) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getEmailAttachments() {
  if (cachedLogoAttachments) {
    return cachedLogoAttachments;
  }

  try {
    cachedLogoAttachments = [
      {
        filename: "glasfein-logo.png",
        content: readFileSync(LOGO_PATH).toString("base64"),
        contentId: LOGO_CONTENT_ID,
        content_type: "image/png"
      }
    ];
  } catch (error) {
    console.warn("Glasfein email logo could not be attached.", error);
    cachedLogoAttachments = [];
  }

  return cachedLogoAttachments;
}

async function readRequestBody(req) {
  if (Buffer.isBuffer(req.body)) {
    return JSON.parse(req.body.toString("utf8") || "{}");
  }

  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

async function sendEmail(apiKey, payload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Resend error ${response.status}: ${responseText.slice(0, 400)}`);
  }

  return responseText ? JSON.parse(responseText) : {};
}

function emailShell({ eyebrow, title, preview, body, footer }) {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#edf5f7;color:#081b29;font-family:Manrope,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#edf5f7;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:680px;overflow:hidden;border-radius:28px;background:#ffffff;box-shadow:0 24px 70px rgba(8,27,41,0.14);">
            <tr>
              <td style="padding:28px 30px 18px;background:linear-gradient(135deg,#063b59,#0a7eb4);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="cid:${LOGO_CONTENT_ID}" width="54" height="54" alt="Glasfein" style="display:block;width:54px;height:54px;border-radius:14px;background:#ffffff;">
                    </td>
                    <td align="right" style="vertical-align:middle;color:#d7ff5f;font-size:12px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;">
                      ${escapeHtml(eyebrow)}
                    </td>
                  </tr>
                </table>
                <h1 style="margin:26px 0 0;color:#ffffff;font-size:34px;line-height:1.05;letter-spacing:0;font-weight:800;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 30px;background:#f7fbfc;border-top:1px solid rgba(9,32,49,0.08);color:#567184;font-size:13px;line-height:1.6;">
                ${footer}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function infoRow(label, value) {
  return `<tr>
    <td style="padding:13px 0;border-bottom:1px solid rgba(9,32,49,0.08);color:#567184;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;width:34%;">${escapeHtml(label)}</td>
    <td style="padding:13px 0;border-bottom:1px solid rgba(9,32,49,0.08);color:#081b29;font-size:15px;line-height:1.55;font-weight:700;">${nl2br(value)}</td>
  </tr>`;
}

function summaryCard(label, value, href) {
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#081b29;text-decoration:none;font-weight:800;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `<td width="33.333%" style="padding:0 8px 16px 0;vertical-align:top;">
    <div style="min-height:86px;padding:16px;border-radius:18px;background:linear-gradient(145deg,#ffffff,#edf9fd);border:1px solid rgba(9,32,49,0.08);box-shadow:0 10px 28px rgba(8,27,41,0.06);">
      <p style="margin:0 0 8px;color:#0a7eb4;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(label)}</p>
      <p style="margin:0;color:#081b29;font-size:16px;line-height:1.4;font-weight:800;">${content}</p>
    </div>
  </td>`;
}

function actionButton(label, href, variant = "primary") {
  const isPrimary = variant === "primary";
  const background = isPrimary ? "linear-gradient(135deg,#063b59,#0a7eb4)" : "#ffffff";
  const color = isPrimary ? "#ffffff" : "#081b29";
  const border = isPrimary ? "1px solid #0a7eb4" : "1px solid rgba(9,32,49,0.1)";

  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 10px 10px 0;padding:13px 18px;border-radius:999px;background:${background};border:${border};color:${color};font-size:15px;line-height:1.2;font-weight:800;text-decoration:none;box-shadow:0 12px 28px rgba(8,27,41,0.12);">${escapeHtml(label)}</a>`;
}

function buildCustomerEmail({ firstName, subject, phone, email, message, isApplication }) {
  const title = isApplication ? "Deine Bewerbung ist angekommen" : "Ihre Anfrage ist angekommen";
  const greeting = isApplication ? `Hallo ${firstName},` : `Hallo ${firstName},`;
  const intro = isApplication
    ? "vielen Dank für deine Bewerbung bei Glasfein. Wir haben deine Nachricht erhalten und melden uns persönlich bei dir."
    : "vielen Dank für Ihre Anfrage bei Glasfein. Wir haben Ihre Nachricht erhalten und melden uns persönlich bei Ihnen.";
  const nextSteps = isApplication
    ? ["Wir lesen deine Angaben in Ruhe.", "Wir melden uns persönlich zur Rückfrage oder zum Kennenlernen.", "Wenn es passt, klären wir den nächsten Schritt direkt."]
    : ["Wir prüfen Ihre Anfrage und die genannten Glasflächen.", "Wir melden uns persönlich zur Abstimmung bei Ihnen.", "Danach besprechen wir Termin, Ablauf und passende Lösung."];

  const body = `
    <p style="margin:0 0 18px;color:#081b29;font-size:18px;line-height:1.65;font-weight:800;">${escapeHtml(greeting)}</p>
    <p style="margin:0 0 24px;color:#567184;font-size:16px;line-height:1.75;">${escapeHtml(intro)}</p>
    <div style="padding:20px;border-radius:20px;background:#f7fbfc;border:1px solid rgba(9,32,49,0.08);">
      <p style="margin:0 0 12px;color:#0a7eb4;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">Ihre Angaben</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Thema", subject)}
        ${infoRow("Telefon", phone)}
        ${infoRow("E-Mail", email)}
        ${infoRow(isApplication ? "Nachricht" : "Wunsch", message)}
      </table>
    </div>
    <div style="margin-top:24px;padding:20px;border-radius:20px;background:#081b29;color:#edf5f7;">
      <p style="margin:0 0 14px;color:#d7ff5f;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">So geht es weiter</p>
      <ol style="margin:0;padding-left:20px;color:#edf5f7;font-size:15px;line-height:1.8;">
        ${nextSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
    </div>
    <p style="margin:24px 0 0;color:#567184;font-size:15px;line-height:1.7;">Direkt erreichbar bleibt Glasfein unter <a href="tel:+491636304419" style="color:#0a7eb4;font-weight:800;text-decoration:none;">0163 6304419</a>.</p>
  `;

  return emailShell({
    eyebrow: "Glasfein",
    title,
    preview: "Danke, Ihre Nachricht an Glasfein wurde empfangen.",
    body,
    footer:
      "Glasfein GbR, Von-Münchhausen-Str. 25, 31595 Steyerberg<br>Diese automatische Bestätigung wurde von no-reply@glasfein-nienburg.de gesendet."
  });
}

function buildOwnerEmail({ firstName, lastName, phone, email, message, subject, pageTitle, pageUrl, isApplication }) {
  const customerName = `${firstName} ${lastName}`.trim();
  const requestType = isApplication ? "Bewerbung" : "Anfrage";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const emailHref = `mailto:${email}?subject=${encodeURIComponent(`Antwort von Glasfein: ${subject}`)}`;
  const body = `
    <p style="margin:0 0 8px;color:#0a7eb4;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">Neue ${escapeHtml(requestType)} über die Website</p>
    <p style="margin:0 0 22px;color:#081b29;font-size:22px;line-height:1.28;font-weight:800;">${escapeHtml(customerName)} hat Glasfein kontaktiert.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 10px;">
      <tr>
        ${summaryCard("Name", customerName)}
        ${summaryCard("Telefon", phone, phoneHref)}
        ${summaryCard("E-Mail", email, emailHref)}
      </tr>
    </table>

    <div style="margin-top:8px;padding:20px;border-radius:22px;background:#f7fbfc;border:1px solid rgba(9,32,49,0.08);">
      <p style="margin:0 0 12px;color:#0a7eb4;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">Details</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${infoRow("Typ", requestType)}
        ${infoRow("Betreff", subject)}
        ${infoRow("Seite", pageTitle || "Nicht angegeben")}
      </table>
    </div>

    <div style="margin-top:18px;padding:22px;border-radius:22px;background:linear-gradient(145deg,#081b29,#0b334b);color:#edf5f7;box-shadow:0 20px 44px rgba(8,27,41,0.22);">
      <p style="margin:0 0 12px;color:#d7ff5f;font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">Nachricht</p>
      <p style="margin:0;color:#edf5f7;font-size:16px;line-height:1.75;">${nl2br(message)}</p>
    </div>

    <div style="margin-top:20px;">
      ${actionButton(isApplication ? "Bewerber anrufen" : "Kunden anrufen", phoneHref)}
      ${actionButton("Direkt antworten", emailHref, "secondary")}
    </div>

    <p style="margin:22px 0 0;color:#567184;font-size:14px;line-height:1.7;">
      URL: <a href="${escapeHtml(pageUrl)}" style="color:#0a7eb4;text-decoration:none;font-weight:800;">${escapeHtml(pageUrl)}</a>
    </p>
  `;

  return emailShell({
    eyebrow: isApplication ? "Bewerbung" : "Neue Anfrage",
    title: isApplication ? "Neue Bewerbung" : "Neue Website-Anfrage",
    preview: `${customerName} hat Glasfein kontaktiert.`,
    body,
    footer:
      "Tipp: Die Antwortfunktion nutzt die angegebene Kundenadresse als Reply-To. Alternativ einfach über die Buttons in dieser E-Mail reagieren."
  });
}

function buildTextEmail({ firstName, lastName, phone, email, message, subject, pageTitle, pageUrl, isApplication }) {
  const type = isApplication ? "Bewerbung" : "Anfrage";

  return [
    `Neue ${type} über glasfein-nienburg.de`,
    "",
    `Name: ${firstName} ${lastName}`,
    `Telefon: ${phone}`,
    `E-Mail: ${email}`,
    `Betreff: ${subject}`,
    "",
    "Nachricht:",
    message,
    "",
    `Seite: ${pageTitle}`,
    `URL: ${pageUrl}`
  ].join("\n");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ message: "Diese Route akzeptiert nur POST-Anfragen." });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "glasfein@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "no-reply@glasfein-nienburg.de";
    const fromName = process.env.CONTACT_FROM_NAME || "Glasfein";

    if (!apiKey) {
      return res.status(500).json({ message: "Der E-Mail-Versand ist noch nicht konfiguriert." });
    }

    const body = await readRequestBody(req);

    if (clean(body.website, 200)) {
      return res.status(200).json({ ok: true });
    }

    const data = {
      subject: clean(body.subject, 180) || "Anfrage über die Glasfein Website",
      pageTitle: clean(body.pageTitle, 240),
      pageUrl: clean(body.pageUrl, 500),
      firstName: clean(body.firstName, 80),
      lastName: clean(body.lastName, 80),
      phone: clean(body.phone, 80),
      email: clean(body.email, 180),
      message: clean(body.message, 5000)
    };

    const missingField = REQUIRED_FIELDS.find((field) => !data[field]);

    if (missingField || !isEmail(data.email)) {
      return res.status(400).json({ message: "Bitte prüfen Sie die Pflichtfelder und die E-Mail-Adresse." });
    }

    const isApplication = data.subject.toLowerCase().includes("bewerbung");
    const customerName = `${data.firstName} ${data.lastName}`.trim();
    const from = `${fromName} <${fromEmail}>`;
    const ownerSubject = `${isApplication ? "Neue Bewerbung" : "Neue Anfrage"}: ${customerName}`;
    const customerSubject = isApplication
      ? "Deine Bewerbung bei Glasfein ist angekommen"
      : "Ihre Anfrage bei Glasfein ist angekommen";

    await Promise.all([
      sendEmail(apiKey, {
        from,
        to: [toEmail],
        reply_to: data.email,
        subject: ownerSubject,
        html: buildOwnerEmail({ ...data, isApplication }),
        text: buildTextEmail({ ...data, isApplication }),
        attachments: getEmailAttachments()
      }),
      sendEmail(apiKey, {
        from,
        to: [data.email],
        reply_to: toEmail,
        subject: customerSubject,
        html: buildCustomerEmail({ ...data, isApplication }),
        text: isApplication
          ? `Hallo ${data.firstName},\n\nvielen Dank für deine Bewerbung bei Glasfein. Wir haben deine Nachricht erhalten und melden uns persönlich bei dir.\n\nGlasfein GbR`
          : `Hallo ${data.firstName},\n\nvielen Dank für Ihre Anfrage bei Glasfein. Wir haben Ihre Nachricht erhalten und melden uns persönlich bei Ihnen.\n\nGlasfein GbR`,
        attachments: getEmailAttachments()
      })
    ]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut." });
  }
}
