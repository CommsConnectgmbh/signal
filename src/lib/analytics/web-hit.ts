// Serverseitige Reichweitenmessung: ein Aufruf = eine Zeile, ohne Cookie,
// ohne IP, ohne User-Agent, ohne Wiedererkennung.
//
// Laeuft im Proxy (src/proxy.ts), im Route Handler /start und in /api/contact. Bewusst
// ohne "server-only" und ohne Node-APIs.
//
// Ziel ist die gemeinsame Edge-Function web-hit. Welche Site schreibt, ergibt
// sich dort aus dem Token, nie aus dem Body. Ohne WEB_HIT_TOKEN passiert hier
// nichts, auch kein Netzaufruf.

import { classifyClient, cut, ganz, isPrefetch, LAUF_HEADER, type ClientKind } from "./classify";

export const WEB_HIT_URL_DEFAULT = "https://cbdlcaspqssxfectpvil.supabase.co/functions/v1/web-hit";

/** Wie lange ein Messaufruf hoechstens dauern darf. */
export const WEB_HIT_TIMEOUT_MS = 1500;

/** Die Werbeklick-Parameter, deren VORHANDENSEIN gezaehlt wird. Der Wert nie. */
const KLICK_PARAMETER = ["gclid", "fbclid", "li_fat_id", "msclkid"] as const;
export type KlickTyp = (typeof KLICK_PARAMETER)[number];

// Nur Quelle, Medium, Kampagne: utm_content/utm_term (Suchbegriffe) werden laut
// Datenschutzerklaerung nicht gespeichert und deshalb gar nicht erst gesendet.
const UTM = ["utm_source", "utm_medium", "utm_campaign"] as const;
type UtmName = (typeof UTM)[number];

export type WebHit = {
  kind: "view" | "cta";
  path: string;
  client_kind?: Exclude<ClientKind, "unbekannt">;
  referrer_host?: string | null;
  from_path?: string | null;
  ziel?: string | null;
} & Partial<Record<UtmName, string | null>> & {
    klick_typ?: KlickTyp | null;
  };

/** Welcher Werbeklick-Parameter in der Adresse stand. Nur der Name, nie der Wert. */
export function klickTyp(params: URLSearchParams): KlickTyp | null {
  for (const name of KLICK_PARAMETER) {
    if (params.has(name)) return name;
  }
  return null;
}

/**
 * Freitext aus der Adresse: hart begrenzen und auf harmlose Zeichen
 * reduzieren, statt beliebige Laenge zu uebernehmen.
 */
function clean(v: string | null): string | null {
  if (!v) return null;
  // Eine E-Mail-Adresse als Kampagnenwert (etwa aus einem weitergeleiteten
  // Newsletter-Link) wird gar nicht erst gesendet.
  if (v.includes("@")) return null;
  return cut(v.replace(/[^\w.:/ +-]/g, ""), 80);
}

/** Die UTM-Parameter der Adresse, sonst nichts aus der Query. */
export function utmAus(params: URLSearchParams): Partial<Record<UtmName, string>> {
  const out: Partial<Record<UtmName, string>> = {};
  for (const name of UTM) {
    const v = clean(params.get(name));
    if (v) out[name] = v;
  }
  return out;
}

/**
 * Nur Dokument-Navigationen zaehlen: GET, und der Browser sagt selbst, dass er
 * ein Dokument laedt (sec-fetch-dest: document) oder er fragt HTML an.
 * Keine Assets, keine API, keine Next-Interna.
 */
export function istDokumentAufruf(input: {
  method: string;
  pathname: string;
  secFetchDest: string | null;
  accept: string | null;
}): boolean {
  if (input.method !== "GET") return false;
  const p = input.pathname;
  if (p.startsWith("/_next") || p === "/api" || p.startsWith("/api/")) return false;
  // Dateien (/icon.svg, /robots.txt, /launch/x.png) sind keine Seiten.
  if (/\.[a-z0-9]{1,8}$/i.test(p)) return false;
  const dest = (input.secFetchDest ?? "").toLowerCase();
  if (dest) return dest === "document";
  return (input.accept ?? "").toLowerCase().includes("text/html");
}

/**
 * Einstufung aus den Anfrage-Headern. Bot schlaegt Vorladung: ein Crawler, der
 * vorladend auftritt, bleibt ein Crawler.
 */
export function clientKindAus(h: Headers): Exclude<ClientKind, "unbekannt"> {
  const kind = classifyClient(h.get("user-agent"), {
    secChUa: h.get("sec-ch-ua"),
    secFetchMode: h.get("sec-fetch-mode"),
    laufMarke: h.get(LAUF_HEADER),
  });
  if (
    kind === "mensch" &&
    isPrefetch({
      nextRouterPrefetch: h.get("next-router-prefetch"),
      secPurpose: h.get("sec-purpose"),
      purpose: h.get("purpose"),
      xPurpose: h.get("x-purpose"),
      xMoz: h.get("x-moz"),
    })
  ) {
    return "prefetch";
  }
  return kind === "unbekannt" ? "bot" : kind;
}

/**
 * Bereiche, die keine oeffentlichen Seiten sind und nie gezaehlt werden: der
 * Partner-Login und das Partner-Portal (angemeldete Partner), dazu die Tuer
 * selbst, die ihren Klick als "cta" meldet.
 */
export function istGezaehlterPfad(path: string): boolean {
  return !/^\/(portal|login|start)(\/|$)/.test(path);
}

/** "/preise/" und "/preise" sind dieselbe Seite. Die Wurzel behaelt ihren Slash. */
export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

/**
 * Schickt eine Messzeile. Schlaegt nach aussen nie fehl: eine fehlende
 * Messzeile darf niemals einen Seitenaufruf verhindern oder verzoegern.
 * Fehler landen im Log, damit die Luecke sichtbar bleibt.
 */
export async function sendWebHit(
  hit: WebHit,
  env: { token?: string; url?: string } = {
    token: process.env.WEB_HIT_TOKEN,
    url: process.env.WEB_HIT_URL,
  },
): Promise<void> {
  const token = env.token?.trim();
  if (!token) return;
  const url = env.url?.trim() || WEB_HIT_URL_DEFAULT;

  const body: WebHit = {
    ...hit,
    path: ganz(hit.path, 200) ?? "/:andere",
    referrer_host: ganz(hit.referrer_host, 253),
    from_path: ganz(hit.from_path, 200),
    ziel: cut(hit.ziel, 40),
  };
  // Leere Felder gar nicht erst schicken.
  for (const k of Object.keys(body) as (keyof WebHit)[]) {
    if (body[k] === null || body[k] === undefined) delete body[k];
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), WEB_HIT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-web-hit-token": token,
        // Supabase Regional Invocation: die Function laeuft in Frankfurt.
        "x-region": "eu-central-1",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) console.error("web-hit failed", res.status);
  } catch (err) {
    console.error("web-hit threw", err instanceof Error ? err.name : "unknown");
  } finally {
    clearTimeout(timer);
  }
}
