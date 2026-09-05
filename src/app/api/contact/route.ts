// App-Router Route-Handler für das Kontaktformular.
// Schickt Anfragen per Resend (DPF-zertifiziert, AVV verfügbar) an das
// Smart-Signals-Postfach. Honeypot + Server-Validierung + HTML-Escaping.
// Vorbild: Comms-Connect-Homepage api/contact.ts.
//
// Zwei Mails pro Anfrage:
// 1. an das Smart-Signals-Postfach mit allen Angaben,
// 2. eine Bestätigung an den Absender, die sagt, was als Nächstes passiert
//    (Templates in src/lib/bestaetigungsmail.ts).

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bestaetigungsmail } from "@/lib/bestaetigungsmail";

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

type CrmErgebnis = { ok: boolean; text: string };

/**
 * Anmeldung im CC-CRM erfassen.
 *
 * Laeuft bewusst VOR dem Mailversand: das Ergebnis steht als Zeile in der
 * internen Benachrichtigungsmail. Damit hat der Ingest ein Dead-Letter-Fach.
 * Vorher wurde ein fehlgeschlagener Insert nur in die Server-Logs geschrieben,
 * und eine Anmeldung konnte still verschwinden — genau das ist dem
 * Wiesn-Formular am 30.08.2026 passiert, als ein CHECK-Constraint jeden Insert
 * abwies und das erst Tage spaeter auffiel.
 *
 * Ein Fehler hier darf die Anmeldung nie scheitern lassen; die Mail ist die
 * zweite, unabhaengige Kopie.
 */
async function imCrmErfassen(daten: {
  name: string;
  firmenname: string;
  email: string;
  telefon: string;
  produkt: string;
  beschreibung: string;
}): Promise<CrmErgebnis> {
  const url = process.env.SUPABASE_URL_CRM;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY_CRM;
  if (!url || !key) {
    return { ok: false, text: "nicht konfiguriert (SUPABASE_URL_CRM / SERVICE_ROLE_KEY_CRM fehlt)" };
  }

  // Bewusst ohne IP und User-Agent: die gehoeren in die Mail zur
  // Spam-Beurteilung, aber nicht dauerhaft in den CRM-Datensatz.
  const angaben = [
    `Name: ${daten.name}`,
    `Firma: ${daten.firmenname}`,
    `E-Mail: ${daten.email}`,
    daten.telefon && `Telefon: ${daten.telefon}`,
    daten.produkt && `Produkt: ${daten.produkt}`,
    daten.beschreibung && `Beschreibung:\n${daten.beschreibung}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const crm = createClient(url, key, { auth: { persistSession: false } });

    // Meldet sich jemand ein zweites Mal, gehoert das an den bestehenden
    // Account. Sonst steht dieselbe Person mehrfach in der Liste und die
    // Historie verteilt sich auf zwei Datensaetze.
    const { data: bekannt } = await crm
      .from("account_contacts")
      .select("account_id, account_name_cache")
      .ilike("email", daten.email)
      .limit(1)
      .maybeSingle();

    let accountId: string;
    let hinweis: string;

    if (bekannt?.account_id) {
      accountId = bekannt.account_id;
      hinweis = `an bestehenden Account angehängt (${bekannt.account_name_cache || "ohne Namen"})`;
    } else {
      const { data: account, error: accountFehler } = await crm
        .from("accounts")
        .insert({
          firma_input: daten.firmenname,
          telefon: daten.telefon || null,
          ist_partner: true,
          // Trennt die Programm-Anmeldungen von den Channel-Partnern
          // (Carrier, Distributoren). Der Wertebereich ist per CHECK auf
          // 'channel' und 'smart_signals' begrenzt.
          partner_source: "smart_signals",
          status: "neu",
          trigger_event: "Smart Signals Partneranmeldung",
          notes: `Anmeldung über smart-signals.de\n\n${angaben}`,
        })
        .select("id")
        .single();

      if (accountFehler || !account) {
        return { ok: false, text: `FEHLGESCHLAGEN: ${accountFehler?.message || "kein Account zurückgegeben"}` };
      }

      accountId = account.id;
      hinweis = "neu angelegt";

      const { error: kontaktFehler } = await crm.from("account_contacts").insert({
        account_id: accountId,
        account_name_cache: daten.firmenname,
        full_name: daten.name || daten.email,
        email: daten.email,
        phone: daten.telefon || null,
        source: "smart-signals.de",
        is_primary: true,
      });
      if (kontaktFehler) {
        return { ok: false, text: `Account angelegt, Kontakt FEHLGESCHLAGEN: ${kontaktFehler.message}` };
      }
    }

    const { error: notizFehler } = await crm.from("account_activities").insert({
      account_id: accountId,
      kind: "note",
      title: "Smart Signals: Partneranmeldung",
      body: angaben,
    });
    if (notizFehler) {
      return { ok: false, text: `Account ${hinweis}, Notiz FEHLGESCHLAGEN: ${notizFehler.message}` };
    }

    return { ok: true, text: hinweis };
  } catch (e) {
    return { ok: false, text: `FEHLGESCHLAGEN: ${e instanceof Error ? e.message : String(e)}` };
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

  // Erst ins CRM, dann die Mails: so traegt die interne Mail das Ergebnis und
  // ein fehlgeschlagener Ingest faellt sofort auf, statt nur im Log zu landen.
  const crm = await imCrmErfassen({
    name,
    firmenname,
    email,
    telefon,
    produkt,
    beschreibung,
  });

  const crmZeile = crm.ok
    ? `<tr><td style="border-bottom:1px solid #eee;color:#666;">CRM</td><td style="border-bottom:1px solid #eee;color:#166534;">${escapeHtml(
        crm.text
      )}</td></tr>`
    : `<tr><td style="border-bottom:1px solid #eee;color:#666;">CRM</td><td style="border-bottom:1px solid #eee;color:#b91c1c;font-weight:600;">nicht übernommen — ${escapeHtml(
        crm.text
      )}<br><span style="font-weight:400;">Diese Anmeldung steht nur in dieser Mail. Bitte von Hand nachtragen.</span></td></tr>`;

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
      ${crmZeile}
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
        `CRM: ${crm.ok ? crm.text : `NICHT ÜBERNOMMEN — ${crm.text} · bitte von Hand nachtragen`}`,
        `IP: ${ip}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    console.error("Resend send failed");
    // Wir werfen keinen Fehler, wenn nur die E-Mail fehlschlägt, aber wir loggen es
  }

  // Bestätigung an den Absender. Der Lead ist oben schon gesichert, deshalb
  // darf ein Fehler hier den Rest der Verarbeitung nicht abbrechen.
  try {
    const mail = bestaetigungsmail({
      anrede,
      vorname,
      nachname,
      firmenname,
      email,
      telefon,
      produkt,
      beschreibung,
    });
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  } catch {
    console.error("Bestaetigung an den Absender fehlgeschlagen");
  }

  return NextResponse.json({ ok: true });
}
