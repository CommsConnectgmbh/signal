// Einstufung des Aufrufers und Herkunft, ohne Personenbezug.
//
// Uebernommen aus der Belegify-Website (src/lib/analytics/classify.ts), damit
// alle eigenen Sites dieselbe Bot-, Vorlade- und Eigenpruefungs-Erkennung
// verwenden. Eine Messung, in der dieselbe Anfrage je Site anders eingestuft
// wird, laesst sich nicht vergleichen. Aenderungen an den Listen deshalb in
// allen Sites gleich nachziehen.
//
// Bewusst OHNE "server-only": das Modul laeuft im Proxy (src/proxy.ts)
// und im Route Handler /start. Es greift auf nichts zu ausser den uebergebenen
// Strings: kein Netz, kein Dateisystem, keine Umgebungsvariablen.

export type ClientKind = "mensch" | "bot" | "prefetch" | "intern" | "unbekannt";

/**
 * Kennung, mit der sich eigene Pruefungen (Messlaeufe, Playwright, curl)
 * selbst zu erkennen geben. Wer sie traegt, wird als 'intern' verbucht und
 * zaehlt nirgends als Zulauf.
 *
 * Gegen einen frei waehlbaren User-Agent gibt es keine Heuristik, die einen
 * echten von einem behaupteten Besucher trennt. Deshalb sagt die eine Seite,
 * die die Wahrheit kennt (wir selbst), sie an: als User-Agent-Bestandteil
 * (laesst sich mit jedem Werkzeug setzen) oder als Header.
 */
export const LAUF_MARKE = "CCMessLauf";
const LAUF_MARKE_LC = LAUF_MARKE.toLowerCase();

/** Header-Variante der Kennung. Wert egal, Anwesenheit genuegt. */
export const LAUF_HEADER = "x-cc-lauf";

/** Die eigenen Hosts dieser Site. */
const EIGENE_HOSTS = new Set(["smart-signals.de", "www.smart-signals.de"]);

/** Spiegelt die Laengengrenzen der Datenbank, damit nichts dort abprallt. */
export function cut(value: string | null | undefined, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Nur der Host des Verweises. Der volle Verweis kann bei fremden Seiten
 * Suchbegriffe und Pfade enthalten, die wir weder brauchen noch speichern
 * wollen. Eigene Hosts (auch Subdomains von smart-signals.de) sind als Quelle
 * wertlos und fallen raus, sonst ueberschreibt die interne Navigation die
 * echte Herkunft.
 */
export function referrerHost(referer: string | null | undefined): string | null {
  if (!referer) return null;
  try {
    const host = new URL(referer).host.toLowerCase();
    if (
      host === "smart-signals.de" ||
      host.endsWith(".smart-signals.de") ||
      host.endsWith(".vercel.app") ||
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1")
    ) {
      return null;
    }
    return cut(host, 200);
  } catch {
    return null;
  }
}

/**
 * Von welcher EIGENEN Seite der Klick kam. Gegenstueck zu referrerHost: dort
 * interessiert der fremde Host, hier der eigene Pfad.
 *
 * Aus dem Referer, nicht aus einem Query-Parameter: der Parameter muesste in
 * jeder Komponente einzeln gesetzt werden und waere beim ersten Copy-Paste
 * falsch. Bei gleicher Origin liefert der Browser den vollen Pfad mit.
 *
 * Nur der Pfad, nie die Query: die kann UTM-Parameter enthalten, die an
 * anderer Stelle sauber erfasst werden.
 *
 * `selbst` ist der Host der aktuellen Anfrage. Er zaehlt zusaetzlich als eigen,
 * damit die Tuer auch auf Vorschau-Adressen und lokal (Pruefung gegen den
 * Prod-Build) ihre Ausgangsseite kennt.
 */
export function eigenerHerkunftsPfad(
  referer: string | null | undefined,
  selbst?: string | null,
): string | null {
  if (!referer) return null;
  try {
    const url = new URL(referer);
    const host = url.host.toLowerCase();
    if (!EIGENE_HOSTS.has(host) && host !== (selbst ?? "").toLowerCase()) return null;
    return cut(url.pathname, 200);
  } catch {
    return null;
  }
}

// Kennungen, die eine Maschine verraten. Bewusst grob und bewusst grosszuegig:
// ein Bot, der faelschlich als Mensch zaehlt, laesst uns glauben, es sei
// jemand gekommen — ein Mensch, der faelschlich als Bot zaehlt, kostet uns nur
// eine Zeile in der falschen Spalte. Die Fehlerrichtung ist also nicht egal,
// und im Zweifel wird auf Maschine erkannt.
const BOT_TOKENS = [
  // Suchmaschinen und SEO-Crawler
  // ("bot" steht bewusst NICHT hier — siehe BOT_WORT_RE weiter unten)
  "crawl", "spider", "slurp", "search", "yandex", "baidu", "sogou",
  "ahrefs", "semrush", "mj12", "dotbot", "dataprovider", "seokicks", "screaming frog",
  // Vorschau-Erzeuger beim Teilen von Links
  "facebookexternalhit", "whatsapp", "telegram", "discord", "slack", "skype",
  "embedly", "quora link preview", "preview",
  // Verfuegbarkeits- und Messdienste
  "uptime", "pingdom", "statuscake", "site24x7", "newrelic", "datadog",
  "checkly", "monitor", "lighthouse", "gtmetrix", "pagespeed",
  // Automatisierung und Bibliotheken
  "headless", "puppeteer", "playwright", "selenium", "phantomjs", "scrapy",
  "curl", "wget", "python-requests", "python-urllib", "go-http-client",
  "node-fetch", "axios", "okhttp", "apache-httpclient", "libwww", "httpx",
  "postman", "insomnia", "vercel",
];

/**
 * Stuft den Aufrufer ein, ohne ihn zu speichern.
 *
 * Der User-Agent wird hier gelesen, bewertet und faellt danach weg — in die
 * Datenbank geht ausschliesslich das Ergebnis, also eines von drei Woertern.
 * Deshalb bleiben die Messtabellen personenbezugsfrei, obwohl sie mehr wissen
 * als vorher.
 *
 * Ein fehlender User-Agent ist kein Grenzfall, sondern selbst die Antwort:
 * jeder echte Browser schickt einen. Fehlt er oder ist er leer, ist es ein
 * Skript — deshalb 'bot' und nicht 'unbekannt'. 'unbekannt' bleibt strikt den
 * Zeilen vorbehalten, die vor Einfuehrung der Unterscheidung entstanden sind;
 * wuechse der Eimer mit heutigen Faellen weiter, waere er nie wieder
 * abschliessbar.
 */
// Geraetenamen, die "bot" enthalten, ohne einer zu sein. CUBOT ist ein realer
// Android-Hersteller; dessen Geraete senden "Mozilla/5.0 (Linux; Android 13;
// CUBOT NOTE 21)". Deren Nutzer sind Menschen und wurden bis zum 30.08. als Bot
// verbucht — die Fehlerrichtung, die Zulauf versteckt statt ihn zu erfinden.
//
// Bewusst als Ausnahmeliste und NICHT als Wortgrenze geloest: /(^|[^a-z])bot/
// haette zwar CUBOT verschont, aber gleichzeitig "compatible; Googlebot/2.1"
// durchgelassen, weil dort ein "e" vor dem "bot" steht. Ein verlorener Crawler
// waegt schwerer als ein gewonnenes Geraet — die Ausnahme bleibt deshalb eng
// und benannt.
const KEINE_BOTS = ["cubot"];

/**
 * Header, die ein echter Browser bei einer Seitennavigation immer mitschickt.
 * Nur zum Lesen — nichts davon wird gespeichert.
 */
export type RequestSignals = {
  secChUa?: string | null;
  secFetchMode?: string | null;
  /** Header LAUF_HEADER. Gesetzt = eigene Pruefung, kein Besucher. */
  laufMarke?: string | null;
};

export function classifyClient(
  userAgent: string | null | undefined,
  signals?: RequestSignals,
): ClientKind {
  const ua = (typeof userAgent === "string" ? userAgent : "").trim().toLowerCase();

  // Zuerst, vor jeder anderen Regel: haben wir uns selbst gerufen?
  //
  // Bewusst ganz oben und nicht als Sonderfall weiter unten — die Kennung soll
  // auch dann greifen, wenn der User-Agent sonst nach Bot aussieht (Playwright,
  // curl) oder ganz fehlt. 'intern' ist praeziser als 'bot': als Bot verbucht
  // wuerde der eigene Pruefverkehr in der Crawler-Zahl verschwinden und dort
  // dieselbe Zahl verfaelschen, an der abgelesen wird, wie viel Crawler-Rauschen
  // die Messung enthaelt.
  if (signals?.laufMarke) return "intern";
  if (ua.includes(LAUF_MARKE_LC)) return "intern";

  if (ua.length === 0) return "bot";
  const uaOhneGeraetenamen = KEINE_BOTS.reduce((rest, name) => rest.split(name).join(""), ua);
  if (uaOhneGeraetenamen.includes("bot")) return "bot";
  if (BOT_TOKENS.some((token) => ua.includes(token))) return "bot";
  // Ein Browser nennt immer eine Engine. Fehlt jede davon, ist es keiner.
  if (!/mozilla|applewebkit|gecko|chrome|safari|firefox|edge|opera|trident/.test(ua)) {
    return "bot";
  }

  // Ab hier: der User-Agent BEHAUPTET einen Browser. Das ist eine frei
  // waehlbare Zeichenkette — curl -A "Mozilla/5.0 ... Chrome/128" kommt bis
  // hierher, und am 29./30.08. ist genau das passiert: Buendel von zehn
  // Anfragen in 1,3 Sekunden ueber mehrere Pfade, mit erfundenen Verweisen
  // (smart-signals.de) und erfundenen Kampagnen (wiesn2026), alle als "mensch"
  // gezaehlt. Der User-Agent allein kann das nicht auffangen.
  //
  // Was ein Skript dagegen kaum faelscht, weil es die Header gar nicht erst
  // kennt: die Begleitangaben, die ein echter Browser von sich aus mitschickt.
  // Geprueft werden nur zwei, beide streng an das gekoppelt, was der
  // User-Agent behauptet — sonst wuerden aeltere Browser reihenweise zu Bots.
  if (signals) {
    const chUa = (signals.secChUa ?? "").toLowerCase();

    // Chromium ab Version 89 schickt sec-ch-ua bei jeder HTTPS-Anfrage. Wer
    // sich als Chrome oder Edge ausgibt und den Header nicht kennt, ist keiner.
    // Safari und Firefox senden ihn nicht — deshalb die Kopplung an den UA.
    const behauptetChromium = /chrome\/|edg\//.test(ua) && !/firefox|opr\//.test(ua);
    if (behauptetChromium && chUa.length === 0) return "bot";

    // Der umgekehrte Fall: automatisierte Browser ueberschreiben oft den
    // User-Agent, vergessen aber die Client Hints — dann steht "Headless"
    // ausgerechnet in dem Header, den niemand faelscht.
    if (chUa.includes("headless")) return "bot";

    // sec-fetch-mode kennt jeder Chromium ab 76 und jeder Firefox ab 90.
    // Fehlt er bei einem solchen Browser, spricht kein Browser.
    const behauptetModern = behauptetChromium || /firefox\//.test(ua);
    if (behauptetModern && !signals.secFetchMode) return "bot";
  }

  return "mensch";
}

// Vom Browser vorgeladen, nicht vom Menschen aufgerufen.
//
// Next.js laedt Ziele von <Link>-Elementen vor, sobald sie ins Sichtfeld
// geraten. Diese Anfragen tragen denselben User-Agent wie ein echter Aufruf und
// liefen deshalb bis zum 30.08. als "mensch" durch die Messung. Sichtbar wurde
// es an Buendeln wie zehn Zeilen ueber /qonto, /en/qonto und / innerhalb von
// 1,3 Sekunden — kein Lesen, sondern ein Browser, der vorsorgt. Rund die
// Haelfte der ersten Tageszahl bestand daraus.
//
// Bewusst NICHT anhand von "RSC" allein entschieden: den Header traegt auch die
// weiche Navigation, wenn jemand tatsaechlich klickt und Next.js die naechste
// Seite ohne vollen Neuaufbau holt. Das IST ein Seitenaufruf und muss einer
// bleiben. Entscheidend ist allein die ausdrueckliche Vorlade-Absicht, und die
// steht in einem eigenen Header — bei Next.js in "Next-Router-Prefetch", bei
// den Browsern selbst in "Sec-Purpose", "Purpose", "X-Purpose" oder "X-Moz".
//
// Die Fehlerrichtung ist hier umgekehrt zur Bot-Erkennung: einen echten Aufruf
// faelschlich als Vorladung zu verwerfen, versteckt Zulauf, den es gibt.
// Deshalb wird nur auf diese ausdruecklichen Kennzeichen erkannt und nicht
// geraten.
export function isPrefetch(headers: {
  nextRouterPrefetch?: string | null;
  secPurpose?: string | null;
  purpose?: string | null;
  xPurpose?: string | null;
  xMoz?: string | null;
}): boolean {
  if (headers.nextRouterPrefetch === "1") return true;

  const marks = [headers.secPurpose, headers.purpose, headers.xPurpose, headers.xMoz];
  return marks.some((m) => {
    const v = (typeof m === "string" ? m : "").toLowerCase();
    return v.includes("prefetch") || v.includes("prerender") || v.includes("preview");
  });
}
