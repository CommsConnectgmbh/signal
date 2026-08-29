// Anmeldungen zur Smart Signals Wiesn. Zwei Mails pro Anfrage:
// 1. an das Smart-Signals-Postfach mit allen Angaben (Vergabe laeuft manuell),
// 2. eine Bestaetigung an den Anmelder mit seinem Interessenprofil und den
//    Links zu den Apps, die er sich angeschaut hat.
// Mechanik wie api/contact: Resend, Honeypot, Server-Validierung, Escaping.

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "info@smart-signals.de";
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "Smart Signals Website <no-reply@smart-signals.de>";

const VERGABE = "20.09.2026";
const SEITE = "https://smart-signals.de/wiesn2026";

const sanitize = (v: unknown) => String(v ?? "").trim().slice(0, 500);
const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/** Nur unsere eigenen Produktlinks in die Mail lassen, nichts aus dem Body. */
const ERLAUBTE_HOSTS = [
  "belegify.app",
  "obacht.app",
  "talents.obacht.app",
  "tryconduit.de",
  "simvi.de",
  "swingandsavor.at",
  "tagesteller.app",
  "deal-buddy.app",
  "smart-signals.de",
];

function istErlaubt(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && ERLAUBTE_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}

const row = (label: string, value: string) =>
  value
    ? `<tr><td style="border-bottom:1px solid #eee;color:#666;width:150px;">${label}</td><td style="border-bottom:1px solid #eee;">${escapeHtml(
        value
      )}</td></tr>`
    : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (sanitize(body._honey)) {
    return new NextResponse(null, { status: 204 });
  }

  const name = sanitize(body.name);
  const firmenname = sanitize(body.firmenname);
  const email = sanitize(body.email);
  const gruppe = sanitize(body.gruppe);
  const profil = sanitize(body.profil);
  const partner = Boolean(body.partner);

  const interessen = (Array.isArray(body.interessen) ? body.interessen : [])
    .slice(0, 8)
    .map((i) => {
      const eintrag = (i ?? {}) as Record<string, unknown>;
      return {
        name: sanitize(eintrag.name),
        claim: sanitize(eintrag.claim),
        url: sanitize(eintrag.url),
      };
    })
    .filter((i) => i.name && istErlaubt(i.url));

  const errors: string[] = [];
  if (!name) errors.push("name");
  if (!email || !/.+@.+\..+/.test(email)) errors.push("email");
  if (!profil) errors.push("profil");
  if (errors.length) {
    return NextResponse.json(
      { error: "invalid", fields: errors },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = (req.headers.get("x-forwarded-for") || "").toString();
  const ua = (req.headers.get("user-agent") || "").toString();

  const interessenText = interessen.length
    ? interessen.map((i) => i.name).join(", ")
    : "keine";

  // --- 1. Mail an uns -------------------------------------------------
  const internHtml = `
    <table cellpadding="6" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      ${row("Name", name)}
      ${row("Firma", firmenname)}
      <tr><td style="border-bottom:1px solid #eee;color:#666;">E-Mail</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(
        email
      )}">${escapeHtml(email)}</a></td></tr>
      ${row("Gruppe", gruppe)}
      ${row("Profil", profil)}
      ${row("Interessen", interessenText)}
      ${row("Partnerprogramm", partner ? "ja" : "eher nicht")}
      <tr><td style="color:#aaa;font-size:11px;">IP / UA</td><td style="color:#aaa;font-size:11px;">${escapeHtml(
        ip
      )} · ${escapeHtml(ua)}</td></tr>
    </table>
  `.trim();

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Wiesn-Anmeldung: ${name}${firmenname ? `, ${firmenname}` : ""}${
        gruppe ? ` (Gruppe: ${gruppe})` : ""
      }`,
      html: internHtml,
      text: [
        `Name: ${name}`,
        firmenname && `Firma: ${firmenname}`,
        `E-Mail: ${email}`,
        gruppe && `Gruppe: ${gruppe}`,
        `Profil: ${profil}`,
        `Interessen: ${interessenText}`,
        `Partnerprogramm: ${partner ? "ja" : "eher nicht"}`,
        `IP: ${ip}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  // --- 2. Bestaetigung an den Anmelder --------------------------------
  // Schlaegt sie fehl, ist die Anmeldung trotzdem gueltig: sie liegt bereits
  // in unserem Postfach. Deshalb kein Fehler zurueck an den Browser.
  const appBlock = interessen.length
    ? `
      <p style="margin:28px 0 12px;font-weight:600;">Das hat dich interessiert:</p>
      ${interessen
        .map(
          (i) => `
        <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #E2E8F0;border-radius:12px;margin-bottom:10px;">
          <tr>
            <td style="padding:14px 16px;">
              <div style="font-weight:700;font-size:15px;color:#0F172A;">${escapeHtml(i.name)}</div>
              ${
                i.claim
                  ? `<div style="font-size:13px;color:#475569;margin-top:2px;">${escapeHtml(i.claim)}</div>`
                  : ""
              }
              <a href="${escapeHtml(i.url)}" style="display:inline-block;margin-top:10px;background:#36813D;color:#fff;text-decoration:none;font-weight:600;font-size:13px;padding:9px 16px;border-radius:999px;">App ansehen und laden</a>
            </td>
          </tr>
        </table>`
        )
        .join("")}
    `
    : `
      <p style="margin:28px 0 0;color:#475569;">
        Du hast dir diesmal nichts gemerkt. Falls du doch neugierig wirst:
        <a href="https://smart-signals.de/produkte" style="color:#186088;">unsere Produkte im Überblick</a>.
      </p>`;

  const partnerBlock = partner
    ? `<p style="margin:24px 0 0;color:#475569;">
         Du hast angegeben, dass dich das Partnerprogramm interessiert. Dazu
         erzählen wir dir am Tisch gern mehr, vorab steht alles auf
         <a href="https://smart-signals.de" style="color:#186088;">smart-signals.de</a>.
       </p>`
    : "";

  const bestaetigungHtml = `
  <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#0F172A;">
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#186088;font-weight:700;margin:0;">
      Smart Signals Wiesn 2026
    </p>
    <h1 style="font-size:26px;line-height:1.2;margin:12px 0 0;">Deine Anfrage ist da.</h1>
    <p style="font-size:15px;line-height:1.6;color:#475569;margin:14px 0 0;">
      Hallo ${escapeHtml(name.split(" ")[0] || name)},<br><br>
      danke für deine Anmeldung zum Tisch in der Käfer Wiesn-Schänke am
      Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr. Wir vergeben die Plätze
      am ${VERGABE} und melden uns dann per Mail. Gruppen werden bevorzugt.
    </p>

    <table cellpadding="6" cellspacing="0" style="width:100%;font-size:14px;border-collapse:collapse;margin-top:24px;background:#F8FAFC;border-radius:12px;">
      ${row("Name", name)}
      ${row("Firma", firmenname)}
      ${row("Gruppe", gruppe || "Komme allein")}
      ${row("Profil", profil)}
    </table>

    ${appBlock}
    ${partnerBlock}

    <p style="font-size:13px;color:#64748B;margin:28px 0 0;line-height:1.6;">
      Du willst etwas ändern oder doch nicht kommen? Antworte einfach auf
      diese Mail. Alle Angaben zur Aktion stehen auf
      <a href="${SEITE}" style="color:#186088;">${SEITE.replace("https://", "")}</a>.
    </p>
    <p style="font-size:12px;color:#94A3B8;margin:20px 0 0;">
      Comms Connect GmbH · Diese Mail bestätigt deine Anfrage, sie ist noch
      keine Zusage.
    </p>
  </div>`.trim();

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: "Deine Anfrage für die Smart Signals Wiesn ist da",
      html: bestaetigungHtml,
      text: [
        `Hallo ${name.split(" ")[0] || name},`,
        "",
        "danke für deine Anmeldung zum Tisch in der Käfer Wiesn-Schänke am Samstag, 26.09.2026, 11:30 bis 15:30 Uhr.",
        `Wir vergeben die Plätze am ${VERGABE} und melden uns per Mail. Gruppen werden bevorzugt.`,
        "",
        `Profil: ${profil}`,
        gruppe ? `Gruppe: ${gruppe}` : "",
        "",
        interessen.length ? "Das hat dich interessiert:" : "",
        ...interessen.map((i) => `- ${i.name}: ${i.url}`),
        "",
        `Alle Angaben zur Aktion: ${SEITE}`,
        "Diese Mail bestätigt deine Anfrage, sie ist noch keine Zusage.",
      ].join("\n"),
    });
  } catch {
    // bewusst still: die Anmeldung selbst ist durch.
  }

  return NextResponse.json({ ok: true });
}
