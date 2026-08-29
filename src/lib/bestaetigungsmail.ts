// Bestätigungsmail an den Absender eines Formulars auf smart-signals.de.
//
// Bis zum 29.08.2026 gab es die nicht: Wer sich angemeldet hatte, sah die
// Danke-Meldung auf der Seite und hörte danach nichts mehr, bis jemand von
// Hand geantwortet hat. Die Anmeldung zum Partnerprogramm ist der Moment, in
// dem jemand entscheidet, uns weiterzuempfehlen. Der darf sich nicht anfühlen
// wie ein Formular, das ins Leere läuft, deshalb steht der ganze Ablauf drin.
//
// Reines TS ohne Next-Imports, damit `scripts/mailvorschau.ts` dieselben
// Templates rendern kann wie die Route.

/** Farben aus globals.css, damit die Mail wie die Seite aussieht. */
const BLAU = "#186088";
const GRUEN = "#36813D";
const TEXT = "#0F172A";
const GRAU = "#475569";
const HELLGRAU = "#94A3B8";
const FLAECHE = "#F8FAFC";
const GRUEN_SOFT = "#ECF5ED";

const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/** Zeile im Angaben-Block. */
const angabe = (label: string, value: string) =>
  value
    ? `<tr>
         <td style="padding:9px 14px;color:${HELLGRAU};font-size:13px;width:110px;vertical-align:top;">${label}</td>
         <td style="padding:9px 14px;color:${TEXT};font-size:14px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(
           value
         )}</td>
       </tr>`
    : "";

/** Nummerierter Schritt im "So geht es weiter"-Block. */
const schritt = (nr: number, titel: string, text: string) => `
  <tr>
    <td style="padding:0 14px 20px 0;vertical-align:top;width:28px;">
      <div style="width:26px;height:26px;line-height:26px;border-radius:13px;background:${BLAU};color:#ffffff;font-size:13px;font-weight:700;text-align:center;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;">${nr}</div>
    </td>
    <td style="padding:0 0 20px;vertical-align:top;">
      <div style="font-size:15px;font-weight:600;color:${TEXT};line-height:1.35;">${titel}</div>
      <div style="font-size:14px;color:${GRAU};line-height:1.6;margin-top:4px;">${text}</div>
    </td>
  </tr>`;

export type BestaetigungsDaten = {
  /** Radio "Herr"/"Frau" auf /kontaktanfrage, dort ohne Namensfeld. */
  anrede: string;
  vorname: string;
  nachname: string;
  firmenname: string;
  email: string;
  telefon: string;
  produkt: string;
  beschreibung: string;
};

export type Bestaetigung = { subject: string; html: string; text: string };

/**
 * Die Partneranmeldung duzt (wie das Formular auf der Startseite), die
 * Kontaktanfrage siezt (wie die Seite /kontaktanfrage).
 */
export function bestaetigungsmail(d: BestaetigungsDaten): Bestaetigung {
  const istPartner = d.produkt === "Partnerprogramm";

  // Nur echte Namensteile, nie die Anrede allein: /kontaktanfrage schickt
  // "Herr" ohne Namen, daraus darf kein "Guten Tag Herr," werden.
  const personName = [d.vorname, d.nachname].filter(Boolean).join(" ").trim();
  const gruss = istPartner
    ? `Hallo${d.vorname ? " " + escapeHtml(d.vorname) : ""},`
    : d.nachname
      ? `Guten Tag ${escapeHtml([d.anrede, d.nachname].filter(Boolean).join(" "))},`
      : "Guten Tag,";

  const angabenBlock = `
    <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:separate;background:${FLAECHE};border-radius:14px;margin-top:28px;">
      ${angabe("Name", personName)}
      ${angabe("Firma", d.firmenname)}
      ${angabe("E-Mail", d.email)}
      ${angabe("Telefon", d.telefon)}
      ${istPartner ? "" : angabe("Produkt", d.produkt)}
      ${angabe(istPartner ? "Kundenkreis" : "Nachricht", d.beschreibung)}
    </table>`;

  const rahmen = (inhalt: string) => `
  <div style="background:#ffffff;padding:8px;">
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:${TEXT};">
      ${inhalt}
    </div>
  </div>`;

  const fuss = (duText: boolean) => `
    <p style="font-size:14px;color:${GRAU};margin:30px 0 0;line-height:1.6;">
      ${
        duText
          ? "Etwas vergessen oder eine Frage vorab? Antworte einfach auf diese Mail, sie landet direkt bei uns."
          : "Wenn sich etwas geändert hat oder Sie etwas ergänzen möchten, antworten Sie einfach auf diese Mail."
      }
      Alle Produkte im Überblick:
      <a href="https://smart-signals.de/produkte" style="color:${BLAU};">smart-signals.de/produkte</a>.
    </p>
    <div style="height:1px;background:#E2E8F0;margin:28px 0 0;"></div>
    <p style="font-size:12px;color:${HELLGRAU};margin:18px 0 0;line-height:1.7;">
      Comms Connect GmbH, handelnd unter der Marke Smart Signals ·
      <a href="https://smart-signals.de" style="color:${HELLGRAU};">smart-signals.de</a><br>
      ${
        duText
          ? "Diese Mail bestätigt den Eingang deiner Anmeldung. Die Aufnahme ins Partnerprogramm bestätigen wir dir gesondert."
          : "Diese Mail bestätigt den Eingang Ihrer Anfrage."
      }
    </p>`;

  if (istPartner) {
    const html = rahmen(`
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${BLAU};font-weight:700;margin:0;">
        Smart Signals Partnerprogramm
      </p>
      <h1 style="font-size:27px;line-height:1.2;margin:12px 0 0;font-weight:700;">Deine Anmeldung ist da.</h1>
      <p style="font-size:15px;line-height:1.65;color:${GRAU};margin:16px 0 0;">
        ${gruss}<br><br>
        danke, dass du unsere Software empfehlen willst. Wir bauen acht Apps und
        schreiben jede Zeile davon selbst. Damit du weißt, worauf du dich
        einlässt, steht hier der ganze Ablauf, bevor du irgendetwas
        unterschreibst.
      </p>

      ${angabenBlock}

      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${BLAU};font-weight:700;margin:36px 0 22px;">
        So geht es weiter
      </p>
      <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:collapse;">
        ${schritt(
          1,
          "Wir schauen uns deine Anmeldung an",
          "Innerhalb von zwei Werktagen bekommst du eine persönliche Antwort von uns. Kein Automatismus, sondern jemand, der sich deinen Kundenkreis wirklich angesehen hat."
        )}
        ${schritt(
          2,
          "Du bekommst den Rahmenvertrag",
          "Einmal unterschreiben, er gilt für das ganze Portfolio. Dazu kommt je Produkt eine Anlage mit den Konditionen. Du entscheidest, welche Produkte du empfehlen willst, und nur die werden Vertragsbestandteil."
        )}
        ${schritt(
          3,
          "Du bekommst deine Empfehlungslinks",
          "Je Produkt einen eigenen Link. Wer darüber zum Produkt kommt und sich registriert, ist dir zugeordnet. Im Partnerbereich siehst du jederzeit, was auf dich läuft."
        )}
        ${schritt(
          4,
          "Provision, sobald dein Kunde zahlt",
          "Der Anspruch entsteht, wenn ein empfohlener Kunde einen kostenpflichtigen Vertrag abgeschlossen und bezahlt hat. Testphasen und Freimonate zählen nicht. Abgerechnet wird monatlich."
        )}
      </table>

      <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:separate;background:${GRUEN_SOFT};border-radius:14px;margin-top:10px;">
        <tr><td style="padding:20px 22px;">
          <div style="font-size:12px;font-weight:700;color:${GRUEN};letter-spacing:0.12em;text-transform:uppercase;">Gut zu wissen</div>
          <div style="font-size:14px;color:${GRAU};line-height:1.75;margin-top:10px;">
            Die Teilnahme ist kostenlos. Es gibt keine Mindestumsätze, keine
            Abnahmeverpflichtung und keine Pflicht, ein Produkt selbst zu kaufen.
            Du empfiehlst als Tippgeber, nicht als Handelsvertreter, und ein
            Wettbewerbsverbot gibt es nicht. Teilnehmen kann, wer unternehmerisch
            tätig ist.
          </div>
        </td></tr>
      </table>

      ${fuss(true)}
    `);

    const text = [
      `Hallo${d.vorname ? " " + d.vorname : ""},`,
      "",
      "danke, dass du unsere Software empfehlen willst. Wir bauen acht Apps und schreiben jede Zeile davon selbst.",
      "Damit du weisst, worauf du dich einlaesst, steht hier der ganze Ablauf, bevor du irgendetwas unterschreibst.",
      "",
      "DEINE ANGABEN",
      personName ? `Name: ${personName}` : null,
      `Firma: ${d.firmenname}`,
      `E-Mail: ${d.email}`,
      d.telefon ? `Telefon: ${d.telefon}` : null,
      d.beschreibung ? `Kundenkreis: ${d.beschreibung}` : null,
      "",
      "SO GEHT ES WEITER",
      "1. Wir schauen uns deine Anmeldung an. Innerhalb von zwei Werktagen bekommst du eine persoenliche Antwort, kein Automatismus.",
      "2. Du bekommst den Rahmenvertrag. Einmal unterschreiben, er gilt fuer das ganze Portfolio. Dazu je Produkt eine Anlage mit den Konditionen. Du entscheidest, welche Produkte du empfehlen willst.",
      "3. Du bekommst deine Empfehlungslinks. Je Produkt einen eigenen Link, die Zuordnung siehst du jederzeit im Partnerbereich.",
      "4. Provision, sobald dein Kunde zahlt. Der Anspruch entsteht, wenn ein empfohlener Kunde einen kostenpflichtigen Vertrag abgeschlossen und bezahlt hat. Testphasen und Freimonate zaehlen nicht. Abgerechnet wird monatlich.",
      "",
      "GUT ZU WISSEN",
      "Die Teilnahme ist kostenlos. Keine Mindestumsaetze, keine Abnahmeverpflichtung, keine Pflicht ein Produkt selbst zu kaufen.",
      "Du empfiehlst als Tippgeber, nicht als Handelsvertreter, ein Wettbewerbsverbot gibt es nicht. Teilnehmen kann, wer unternehmerisch taetig ist.",
      "",
      "Fragen? Antworte einfach auf diese Mail.",
      "Alle Produkte: https://smart-signals.de/produkte",
      "",
      "Comms Connect GmbH, handelnd unter der Marke Smart Signals",
      "Diese Mail bestaetigt den Eingang deiner Anmeldung. Die Aufnahme ins Partnerprogramm bestaetigen wir dir gesondert.",
    ]
      .filter((z) => z !== null)
      .join("\n");

    return {
      subject: "Deine Anmeldung zum Smart Signals Partnerprogramm",
      html,
      text,
    };
  }

  const html = rahmen(`
    <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${BLAU};font-weight:700;margin:0;">
      Smart Signals
    </p>
    <h1 style="font-size:27px;line-height:1.2;margin:12px 0 0;font-weight:700;">Ihre Anfrage ist angekommen.</h1>
    <p style="font-size:15px;line-height:1.65;color:${GRAU};margin:16px 0 0;">
      ${gruss}<br><br>
      danke für Ihre Nachricht${d.produkt ? ` zu ${escapeHtml(d.produkt)}` : ""}.
      Wir melden uns innerhalb von zwei Werktagen persönlich bei Ihnen. Damit
      Sie es schwarz auf weiß haben, steht hier noch einmal, was bei uns
      angekommen ist.
    </p>

    ${angabenBlock}
    ${fuss(false)}
  `);

  const text = [
    d.nachname ? `Guten Tag ${[d.anrede, d.nachname].filter(Boolean).join(" ")},` : "Guten Tag,",
    "",
    `danke fuer Ihre Nachricht${d.produkt ? ` zu ${d.produkt}` : ""}.`,
    "Wir melden uns innerhalb von zwei Werktagen persoenlich bei Ihnen.",
    "",
    "IHRE ANGABEN",
    personName ? `Name: ${personName}` : null,
    `Firma: ${d.firmenname}`,
    `E-Mail: ${d.email}`,
    d.telefon ? `Telefon: ${d.telefon}` : null,
    d.produkt ? `Produkt: ${d.produkt}` : null,
    d.beschreibung ? `Nachricht: ${d.beschreibung}` : null,
    "",
    "Wenn Sie etwas ergaenzen moechten, antworten Sie einfach auf diese Mail.",
    "Alle Produkte: https://smart-signals.de/produkte",
    "",
    "Comms Connect GmbH, handelnd unter der Marke Smart Signals",
  ]
    .filter((z) => z !== null)
    .join("\n");

  return {
    subject: "Ihre Anfrage bei Smart Signals ist angekommen",
    html,
    text,
  };
}
