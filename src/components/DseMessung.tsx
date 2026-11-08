// Abschnitte der Datenschutzerklaerung zur Web-Messung.
//
// Wortlaut: web-messung/DSE-BAUSTEIN.md (Bausteine A bis F), nur an Stil und
// Gliederung dieser Erklaerung angepasst. Die Reichweitenmessung (A) steht
// immer da, weil sie ohne Einwilligung laeuft. Einwilligungsverwaltung (B) und
// die Dienste (C bis F) erscheinen nur, wenn die jeweilige ID zur Build-Zeit
// gesetzt ist (NEXT_PUBLIC_*): so stimmt die Erklaerung in beiden Zustaenden.

import type { ReactNode } from "react";

import { brauchtEinwilligung, type WerbeIds } from "@/lib/consent/ids";

const V = "die Comms Connect GmbH";
const V_GROSS = "Die Comms Connect GmbH";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const RECHTSGRUNDLAGE_EINWILLIGUNG = (
  <p>
    Rechtsgrundlagen sind Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO sowie für das Speichern und Auslesen
    von Informationen auf Ihrem Endgerät § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit über
    „Cookie-Einstellungen“ im Fußbereich der Website mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit
    der Verarbeitung bis zum Widerruf bleibt unberührt.
  </p>
);

const GOOGLE_DPF = (
  <p>
    Eine Übermittlung von Daten an Google LLC in den USA ist möglich. Google LLC ist nach dem EU-US Data Privacy
    Framework zertifiziert. Übermittlungen an diesen zertifizierten Empfänger können auf den
    Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO gestützt werden. Weitere Angaben
    enthält Googles Information zu den{" "}
    <Ext href="https://policies.google.com/privacy/frameworks?hl=de">Datenübermittlungsrahmen</Ext>.
  </p>
);

/**
 * Satz in "Wofür nutzen wir Ihre Daten?". Ersetzt die fruehere Aussage, die
 * Website setze keine Analyse-, Tracking- oder Marketing-Dienste ein: die
 * stimmt ohne IDs weiterhin fuer Drittanbieter, mit IDs nicht mehr.
 */
export function DseZweckSatz({ ids }: { ids: WerbeIds }) {
  return (
    <p>
      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Ein anderer
      Teil dient der Reichweitenmessung ohne Cookies und ohne Wiedererkennung von Besuchern (siehe Abschnitt 5).{" "}
      {brauchtEinwilligung(ids)
        ? "Analyse- und Marketing-Dienste von Drittanbietern setzen wir nur mit Ihrer Einwilligung ein (siehe Abschnitt 5)."
        : "Analyse-, Tracking- oder Marketing-Dienste von Drittanbietern und Tracking-Cookies setzt diese Website nicht ein."}
    </p>
  );
}

/** Abschnitt 5 der Datenschutzerklaerung. */
export function DseMessung({ ids }: { ids: WerbeIds }) {
  return (
    <>
      <h2 id="reichweitenmessung">5. Reichweitenmessung, Analyse und Werbung</h2>

      <h3>Serverseitige Reichweitenmessung</h3>
      <p>
        {V_GROSS} misst die Reichweite dieser Website und die Wirksamkeit der eingesetzten Kanäle und Kampagnen.
        Diese Messung ist unabhängig von einer Einwilligung aktiv. Dazu werden die beim Seitenaufruf ohnehin
        übermittelten Anfragedaten im Netzwerk unseres Hosting-Anbieters Vercel Inc. ausgewertet (siehe Abschnitt
        2); das Ergebnis wird direkt an unsere Datenbank in Frankfurt übergeben.
      </p>
      <p>
        Für diese Messung werden ausschließlich folgende Angaben in einer eigenen Datenbank bei Supabase in der
        Region Frankfurt gespeichert:
      </p>
      <ul>
        <li>
          Zeitpunkt und aufgerufene Seite, sofern sie in unserem öffentlichen Seitenverzeichnis (Sitemap) steht;
          jede andere Adresse wird nur als Sammelwert „andere“ gezählt;
        </li>
        <li>Einstufung des Abrufs als menschlicher oder automatisierter Zugriff;</li>
        <li>
          Domain der verweisenden Website ohne Subdomain und ohne deren vollständige Adresse (zum Beispiel
          „google.com“); IP-Adressen werden nicht gespeichert;
        </li>
        <li>
          Quelle, Medium und Kampagnenbezeichnung aus den UTM-Kampagnenparametern der aufgerufenen Adresse, sofern
          sie unserem festen Format entsprechen; andere Werte werden nur als „andere“ gezählt, Suchbegriffe und
          weitere UTM-Angaben werden nicht gespeichert;
        </li>
        <li>Vorhandensein und Typ eines Werbeklick-Parameters, beispielsweise „gclid“, ohne dessen Wert;</li>
        <li>
          bei Klicks auf Schaltflächen wie „Registrieren“ oder „Demo anfragen“ die Ausgangsseite und das Ziel aus
          einer festen Liste unserer Ziele.
        </li>
      </ul>
      <p>
        IP-Adressen und User-Agent-Angaben werden im Rahmen dieser Messung nicht gespeichert. Es werden keine
        Cookies eingesetzt und keine Informationen auf Ihrem Endgerät gespeichert oder daraus ausgelesen. Eine
        Wiedererkennung von Besuchern oder Profilbildung findet nicht statt. Supabase verarbeitet die gespeicherten
        Angaben im Auftrag der Comms Connect GmbH. Die Daten werden nach 25 Monaten gelöscht.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse besteht darin, die Reichweite der
        Website und die Wirksamkeit der Kanäle und Kampagnen zu messen. Da diese Messung weder Informationen auf
        Ihrem Endgerät speichert noch auf dort gespeicherte Informationen zugreift, fällt sie nicht unter{" "}
        <Ext href="https://www.gesetze-im-internet.de/ttdsg/__25.html">§ 25 TDDDG</Ext>.
      </p>
      <p>
        <strong>
          Sie haben nach Art. 21 Abs. 1 DSGVO das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
          ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten auf dieser Grundlage Widerspruch
          einzulegen.
        </strong>{" "}
        Den Widerspruch können Sie an {V} richten. Danach werden die betroffenen personenbezogenen Daten nicht mehr
        verarbeitet, sofern keine zwingenden schutzwürdigen Gründe nachgewiesen werden, die Ihre Interessen, Rechte
        und Freiheiten überwiegen, oder die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von
        Rechtsansprüchen dient.{" "}
        <Ext href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679">Art. 21 DSGVO</Ext>
      </p>

      {brauchtEinwilligung(ids) && (
        <>
          <h3>Einwilligungsverwaltung</h3>
          <p>
            {V_GROSS} speichert Ihre Entscheidung über die Nutzung einwilligungspflichtiger Dienste im lokalen
            Speicher Ihres Browsers (localStorage) unter dem Schlüssel „cc_consent“. Dadurch kann Ihre Auswahl bei
            der Nutzung der Website berücksichtigt werden.
          </p>
          <p>
            Das Speichern und Auslesen dieser Entscheidung ist für die Bereitstellung der von Ihnen gewählten
            Datenschutzeinstellungen technisch erforderlich. Hierfür ist nach{" "}
            <Ext href="https://www.gesetze-im-internet.de/ttdsg/__25.html">§ 25 Abs. 2 Nr. 2 TDDDG</Ext> keine
            Einwilligung erforderlich.
          </p>
          <p>
            Über den Link „Cookie-Einstellungen“ im Fußbereich der Website können Sie Ihre Auswahl jederzeit ändern
            und erteilte Einwilligungen widerrufen. Ein Widerruf wirkt für die Zukunft. Die Rechtmäßigkeit der
            Verarbeitung bis zum Widerruf bleibt unberührt.
          </p>
        </>
      )}

      {ids.ga4 && (
        <>
          <h3>Google Analytics 4</h3>
          <p>
            {V_GROSS} verwendet Google Analytics 4 zur statistischen Auswertung der Websitenutzung ausschließlich,
            wenn Sie in der Kategorie „Statistik“ eingewilligt haben. Anbieter ist Google Ireland Limited, Gordon
            House, Barrow Street, Dublin 4, Irland.
          </p>
          <p>
            Google Analytics verarbeitet Nutzungsdaten und setzt Cookies ein, insbesondere „_ga“ und Cookies mit dem
            Namensanfang „_ga_“. Ihre IP-Adresse wird durch Google innerhalb der EU gekürzt. Nach den{" "}
            <Ext href="https://support.google.com/analytics/answer/11397207?hl=de">Angaben von Google</Ext> beträgt
            die Standardlaufzeit dieser Cookies jeweils zwei Jahre. Die Aufbewahrungsdauer der nutzerbezogenen
            Analytics-Daten beträgt 14 Monate.
          </p>
          {GOOGLE_DPF}
          {RECHTSGRUNDLAGE_EINWILLIGUNG}
          <p>
            Weitere Informationen finden Sie in der{" "}
            <Ext href="https://policies.google.com/privacy?hl=de">Datenschutzerklärung von Google</Ext>.
          </p>
        </>
      )}

      {ids.gads && (
        <>
          <h3>Google Ads Conversion-Tracking und Remarketing</h3>
          <p>
            {V_GROSS} verwendet Google Ads Conversion-Tracking und Remarketing ausschließlich, wenn Sie in der
            Kategorie „Marketing“ eingewilligt haben. Anbieter ist Google Ireland Limited, Gordon House, Barrow
            Street, Dublin 4, Irland.
          </p>
          <p>
            Conversion-Tracking dient dazu, den Erfolg von Anzeigen zu messen. Remarketing ermöglicht die
            Ausspielung von Werbung an Personen, die diese Website bereits besucht haben. Dabei werden Cookies
            eingesetzt. Das Cookie „_gcl_au“ hat eine Laufzeit von 90 Tagen. Weitere Angaben enthält Googles{" "}
            <Ext href="https://business.safety.google/adscookies/">Übersicht der Werbe-Cookies</Ext>.
          </p>
          <p>
            Beim eingesetzten Consent Mode werden die Google-Skripte für diese Funktionen erst nach Ihrer
            Einwilligung geladen.
          </p>
          {GOOGLE_DPF}
          {RECHTSGRUNDLAGE_EINWILLIGUNG}
          <p>
            Weitere Informationen finden Sie in der{" "}
            <Ext href="https://policies.google.com/privacy?hl=de">Datenschutzerklärung von Google</Ext>.
          </p>
        </>
      )}

      {ids.metaPixel && (
        <>
          <h3>Meta Pixel</h3>
          <p>
            {V_GROSS} verwendet das Meta Pixel ausschließlich, wenn Sie in der Kategorie „Marketing“ eingewilligt
            haben. Anbieter ist Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland.
          </p>
          <p>
            Das Meta Pixel dient der Messung des Anzeigenerfolgs und der Bildung von Zielgruppen für Werbung. Dabei
            werden Cookies eingesetzt. Das Cookie „_fbp“ hat eine Laufzeit von 90 Tagen.
          </p>
          <p>
            Für die Erhebung personenbezogener Daten durch das Meta Pixel und deren Übermittlung an Meta sind {V}{" "}
            und Meta Platforms Ireland Limited gemeinsam verantwortlich nach Art. 26 DSGVO. Die Aufgabenverteilung
            ist im <Ext href="https://www.facebook.com/legal/controller_addendum">Zusatz für Verantwortliche von Meta</Ext>{" "}
            geregelt. Ihre Betroffenenrechte können Sie gegenüber beiden gemeinsam Verantwortlichen geltend machen.
          </p>
          <p>
            Daten können an Meta Platforms Inc. in den USA übermittelt werden. Meta Platforms Inc. ist nach dem
            EU-US Data Privacy Framework zertifiziert. Übermittlungen an diesen zertifizierten Empfänger können auf
            den Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO gestützt werden. Weitere
            Angaben enthält Metas Information zum{" "}
            <Ext href="https://www.facebook.com/privacy/policies/data_privacy_framework/">Data Privacy Framework</Ext>.
          </p>
          {RECHTSGRUNDLAGE_EINWILLIGUNG}
          <p>
            Weitere Informationen finden Sie in der{" "}
            <Ext href="https://www.facebook.com/privacy/policy/">Datenschutzerklärung von Meta</Ext>.
          </p>
        </>
      )}

      {ids.linkedin && (
        <>
          <h3>LinkedIn Insight Tag</h3>
          <p>
            {V_GROSS} verwendet das LinkedIn Insight Tag ausschließlich, wenn Sie in der Kategorie „Marketing“
            eingewilligt haben. Anbieter ist LinkedIn Ireland Unlimited Company, Wilton Place, Dublin 2, Irland.
          </p>
          <p>
            Das LinkedIn Insight Tag dient der Messung des Kampagnenerfolgs, der erneuten werblichen Ansprache
            früherer Websitebesucher (Retargeting) und der demografischen Auswertung der Websitebesucher. Dabei
            werden Cookies eingesetzt. Das Cookie „li_sugr“ hat eine Laufzeit von 90 Tagen, „bcookie“ eine Laufzeit
            von einem Jahr. Weitere Angaben enthält die{" "}
            <Ext href="https://www.linkedin.com/legal/l/cookie-table">Cookie-Übersicht von LinkedIn</Ext>.
          </p>
          <p>
            Daten können an LinkedIn Corporation in den USA übermittelt werden. LinkedIn Corporation ist nach dem
            EU-US Data Privacy Framework zertifiziert. Übermittlungen an diesen zertifizierten Empfänger können auf
            den Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO gestützt werden. Weitere
            Angaben enthält LinkedIns Information zu{" "}
            <Ext href="https://www.linkedin.com/help/linkedin/answer/a1343190/eu-eea-and-swiss-data-transfers">
              internationalen Datenübermittlungen
            </Ext>
            .
          </p>
          {RECHTSGRUNDLAGE_EINWILLIGUNG}
          <p>
            Weitere Informationen finden Sie in der{" "}
            <Ext href="https://www.linkedin.com/legal/privacy-policy">Datenschutzerklärung von LinkedIn</Ext>.
          </p>
        </>
      )}
    </>
  );
}
