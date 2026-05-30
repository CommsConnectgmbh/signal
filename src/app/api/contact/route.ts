// App-Router Route-Handler für das Kontaktformular.
// Schickt Anfragen per Resend (DPF-zertifiziert, AVV verfügbar) an das
// Smart-Signals-Postfach. Honeypot + Server-Validierung + HTML-Escaping.
// Vorbild: Comms-Connect-Homepage api/contact.ts.

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "info@smart-signals.de";
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "Smart Signals Website <no-reply@smart-signals.de>";

const sanitize = (v: unknown) => String(v ?? "").trim().slice(0, 5000);
const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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

  // Honeypot — Spambots füllen oft alle Felder. Stilles Erfolg-Signal zurück.
  if (sanitize(body._honey)) {
    return new NextResponse(null, { status: 204 });
  }

  const anrede = sanitize(body.anrede);
  const vorname = sanitize(body.vorname);
  const nachname = sanitize(body.nachname);
  const firmenname = sanitize(body.firmenname);
  const email = sanitize(body.email);
  const telefon = sanitize(body.telefon);
  const produkt = sanitize(body.produkt);
  const mitarbeiteranzahl = sanitize(body.mitarbeiteranzahl);
  const beschreibung = sanitize(body.beschreibung);

  const errors: string[] = [];
  if (!firmenname) errors.push("firmenname");
  if (!email || !/.+@.+\..+/.test(email)) errors.push("email");
  if (errors.length) {
    return NextResponse.json(
      { error: "invalid", fields: errors },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    // Fehlende Konfiguration darf keine Lead-Daten verschlucken.
    return NextResponse.json(
      { error: "not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const name = [anrede, vorname, nachname].filter(Boolean).join(" ").trim();
  const ip = (req.headers.get("x-forwarded-for") || "").toString();
  const ua = (req.headers.get("user-agent") || "").toString();

  const html = `
    <table cellpadding="6" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      ${row("Name", name)}
      ${row("Firma", firmenname)}
      <tr><td style="border-bottom:1px solid #eee;color:#666;">E-Mail</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(
        email
      )}">${escapeHtml(email)}</a></td></tr>
      ${row("Telefon", telefon)}
      ${row("Produkt", produkt)}
      ${row("Mitarbeiteranzahl", mitarbeiteranzahl)}
      ${
        beschreibung
          ? `<tr><td style="border-bottom:1px solid #eee;color:#666;vertical-align:top;">Beschreibung</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(
              beschreibung
            )}</td></tr>`
          : ""
      }
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
      subject: `Anfrage über smart-signals.de: ${name || email}, ${firmenname}`,
      html,
      text: [
        name && `Name: ${name}`,
        `Firma: ${firmenname}`,
        `E-Mail: ${email}`,
        telefon && `Telefon: ${telefon}`,
        produkt && `Produkt: ${produkt}`,
        mitarbeiteranzahl && `Mitarbeiteranzahl: ${mitarbeiteranzahl}`,
        beschreibung && `Beschreibung:\n${beschreibung}`,
        `IP: ${ip}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
