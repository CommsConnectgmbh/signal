// Anmeldungen zur Firmen Connect Wiesn. Gleiche Mechanik wie api/contact:
// Resend-Mail an das Smart-Signals-Postfach, Honeypot, Server-Validierung.
// Die Verlosung selbst laeuft manuell aus dem Postfach; das Gruppen-Feld
// verknuepft Einzelanmeldungen, die zusammen kommen wollen.

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL || "info@smart-signals.de";
const FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "Smart Signals Website <no-reply@smart-signals.de>";

const sanitize = (v: unknown) => String(v ?? "").trim().slice(0, 500);
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

  if (sanitize(body._honey)) {
    return new NextResponse(null, { status: 204 });
  }

  const name = sanitize(body.name);
  const firmenname = sanitize(body.firmenname);
  const email = sanitize(body.email);
  const gruppe = sanitize(body.gruppe);
  const thema = sanitize(body.thema);

  const errors: string[] = [];
  if (!name) errors.push("name");
  if (!email || !/.+@.+\..+/.test(email)) errors.push("email");
  if (!thema) errors.push("thema");
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

  const html = `
    <table cellpadding="6" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse;">
      ${row("Name", name)}
      ${row("Firma", firmenname)}
      <tr><td style="border-bottom:1px solid #eee;color:#666;">E-Mail</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(
        email
      )}">${escapeHtml(email)}</a></td></tr>
      ${row("Gruppe", gruppe)}
      ${row("Thema", thema)}
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
      html,
      text: [
        `Name: ${name}`,
        firmenname && `Firma: ${firmenname}`,
        `E-Mail: ${email}`,
        gruppe && `Gruppe: ${gruppe}`,
        `Thema: ${thema}`,
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
