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

/* Die App-Links in der Bestaetigungsmail tragen Marker, sonst ist der Weg
   Anmeldung -> Mail -> App nicht von anderen Quellen zu unterscheiden. Genau
   diese Frage entscheidet, ob die Wiesn-Aktion den Apps etwas gebracht hat.
   Gleiche Marker-Systematik wie auf /wiesn2026 und /danke. */
function mitMarker(url: string, name: string) {
  if (!url) return url;
  const slot = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const marker =
    "utm_source=smart-signals&utm_medium=mail&utm_campaign=wiesn2026&utm_content=" +
    (slot || "app");
  return url + (url.includes("?") ? "&" : "?") + marker;
}

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
  // Die Partnerfrage ist am 30.08.2026 aus dem Fragebogen geflogen. Das Feld
  // bleibt im CRM erhalten, wird aber nicht mehr aus dem Formular befuellt:
  // Partner-Interesse entsteht jetzt ueber den Hinweis in der Mail.
  const partner = false;
  // Produktkarten sind Werbung und gehen nur mit eigener Zustimmung raus.
  const produktinfos = Boolean(body.produktinfos);

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
    // Erst die Allowlist auf der unveraenderten URL, dann erst die Marker.
    // Andersherum liefe der Sicherheitscheck auf einem Wert, den wir selbst
    // schon angefasst haben.
    .filter((i) => i.name && istErlaubt(i.url))
    .map((i) => ({ ...i, url: mitMarker(i.url, i.name) }));

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
      ${row("Produktinfos erlaubt", produktinfos ? "ja" : "nein")}
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
        `Produktinfos erlaubt: ${produktinfos ? "ja" : "nein"}`,
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
  const appBlock = produktinfos && interessen.length
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
        Falls du dir die Apps ansehen willst:
        <a href="https://smart-signals.de/produkte" style="color:#186088;">unsere Produkte im Überblick</a>.
      </p>`;

  /* Der Partnerhinweis stand frueher als eigener Schritt mitten im Fragebogen,
     zwischen den App-Karten und der Namenseingabe. Dort hat er den Ablauf
     gebrochen: nach Weiterempfehlung fragen, bevor jemand selbst etwas
     bekommen hat. Jetzt steht er hier, direkt unter den gemerkten Apps, wo
     die Person schon weiss, was sie interessiert.

     Er haengt bewusst an derselben Einwilligung wie die Produktkarten: ohne
     Zustimmung ist auch dieser Hinweis Werbung und geht nicht raus. */
  const partnerBlock =
    produktinfos && interessen.length
      ? `<p style="margin:24px 0 0;color:#475569;">
           Falls eine der Apps überzeugt: Im Partnerprogramm kannst du sie
           weiterempfehlen und daran mitverdienen. Abschluss, Abrechnung und
           Support übernimmt die Comms Connect GmbH. Du musst weder verkaufen
           noch betreuen.
           <a href="https://smart-signals.de/#anmeldung" style="color:#186088;">Mehr dazu</a>.
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
        produktinfos && interessen.length ? "Das hat dich interessiert:" : "",
        ...(produktinfos ? interessen.map((i) => `- ${i.name}: ${i.url}`) : []),
        "",
        `Alle Angaben zur Aktion: ${SEITE}`,
        "Diese Mail bestätigt deine Anfrage, sie ist noch keine Zusage.",
      ].join("\n"),
    });
  } catch {
    // bewusst still: die Anmeldung selbst ist durch.
  }

  // --- 3. CC-CRM ------------------------------------------------------
  // Gleicher Weg wie bei api/contact, nur mit eigener Quelle: so lassen sich
  // die Wiesn-Anmeldungen von den Partner-Anfragen trennen und liegen
  // trotzdem dort, wo Rainer ohnehin hinschaut. Schlaegt es fehl, ist die
  // Anmeldung trotzdem gueltig, sie liegt bereits im Postfach.
  if (process.env.SUPABASE_URL_CRM && process.env.SUPABASE_SERVICE_ROLE_KEY_CRM) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const crm = createClient(
        process.env.SUPABASE_URL_CRM,
        process.env.SUPABASE_SERVICE_ROLE_KEY_CRM,
        { auth: { persistSession: false } }
      );

      // Privatleute haben keine Firma. Ohne Platzhalter stehen sie sonst
      // als namenloser Account in der Liste.
      const anzeigename = firmenname || `Privat · ${name}`;

      const angaben = [
        `Name: ${name}`,
        firmenname && `Firma: ${firmenname}`,
        `E-Mail: ${email}`,
        `Profil: ${profil}`,
        gruppe && `Gruppe: ${gruppe}`,
        `Interessen: ${interessenText}`,
        `Partnerprogramm: ${partner ? "ja" : "eher nicht"}`,
        `Produktinfos erlaubt: ${produktinfos ? "ja" : "nein"}`,
      ]
        .filter(Boolean)
        .join("\n");

      const { data: account, error: accountFehler } = await crm
        .from("accounts")
        .insert({
          firma_input: anzeigename,
          ist_partner: partner,
          // partner_source bleibt leer. Die Spalte hat einen Check-Constraint
          // auf 'channel' oder 'smart_signals'; der frueher hier gesetzte Wert
          // 'wiesn_2026' hat jeden Insert abgewiesen, still, weil der Fehler
          // unten nur geloggt wird. Ergebnis: Bis 30.08.2026 landete KEINE
          // einzige Wiesn-Anmeldung im CRM, auch keine echte.
          // Die Herkunft steckt ohnehin in trigger_event und notes, und
          // ist_partner ist seit dem Wegfall der Partnerfrage immer false.
          status: "neu",
          trigger_event: "Wiesn 2026 Anmeldung",
          notes: `Anmeldung über smart-signals.de/wiesn2026\n\n${angaben}`,
        })
        .select("id")
        .single();

      if (!accountFehler && account) {
        await crm.from("account_contacts").insert({
          account_id: account.id,
          account_name_cache: anzeigename,
          full_name: name,
          email,
          source: "smart-signals.de/wiesn2026",
          is_primary: true,
        });

        await crm.from("account_activities").insert({
          account_id: account.id,
          kind: "note",
          title: `Wiesn 2026: Anmeldung${gruppe ? ` (${gruppe})` : ""}`,
          body: angaben,
        });
      } else {
        console.error("CRM: Account fuer Wiesn-Anmeldung fehlgeschlagen", accountFehler);
      }
    } catch (e) {
      console.error("CRM: Wiesn-Anmeldung nicht uebernommen", e);
    }
  }

  return NextResponse.json({ ok: true });
}
