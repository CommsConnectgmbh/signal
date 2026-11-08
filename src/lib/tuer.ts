// Die Klick-Tuer /start: geschlossene Liste der Ziele.
//
// Das Ziel kommt nie aus der Anfrage, sondern immer aus diesem Objekt. Ein
// Weiterleiter, der ein beliebiges Ziel aus der Query nimmt, waere eine offene
// Weiterleitung, mit der fremde Seiten smart-signals.de als Sprungbrett fuer
// Phishing-Links benutzen koennten. Die Anfrage waehlt nur einen Schluessel.
//
// Die Schluessel stammen aus der festen Ziel-Liste des Messpunkts
// (supabase/functions/web-hit/logic.ts im CRM-Repo). Ein Schluessel, den der
// Messpunkt nicht kennt, zaehlt dort nur als "andere"; deshalb steht hier kein
// Produkt, fuer das es dort keinen Schluessel gibt (Swing & Savor).
//
// Bewusst ohne "use client" und ohne Server-Abhaengigkeiten: die Route und die
// Links in den Komponenten lesen dieselbe Liste.

import { produkte } from "./produkte";

export const TUER_PFAD = "/start";

export const JOBHANDY_URL = "https://www.jobhandy.io/?utm_source=smart-signals.de&utm_medium=referral";

/** Produkt-Slug (src/lib/produkte.ts) -> Ziel-Schluessel des Messpunkts. */
const PRODUKT_ZIEL = {
  belegify: "belegify",
  obacht: "obacht",
  "obacht-talents": "talents",
  conduit: "conduit",
  simvi: "simvi",
  tagesteller: "tagesteller",
  dealbuddy: "dealbuddy",
} as const;

type ProduktZiel = (typeof PRODUKT_ZIEL)[keyof typeof PRODUKT_ZIEL];

function produktUrl(slug: keyof typeof PRODUKT_ZIEL): string {
  const p = produkte.find((x) => x.slug === slug);
  if (!p) throw new Error(`Produkt ${slug} fehlt in produkte.ts`);
  return p.url;
}

/**
 * Ziel -> Adresse. Eigene Seiten relativ (sie bleiben auf dem Host, auf dem
 * geklickt wurde, also auch in Vorschau und lokal), fremde absolut mit https.
 */
export const ZIELE = {
  /** Partneranmeldung auf der Startseite ("Partner werden"). */
  partner: "/#anmeldung",
  /** Kontaktformular. */
  kontakt: "/kontaktanfrage",
  /** Partner-Login. */
  login: "/login",
  /** Geraete-Benefit des Partners JobHandy (/mitarbeitervorteile). */
  jobhandy: JOBHANDY_URL,
  // Produktseiten. Die Links bleiben direkt (SEO), der Klick wird per
  // <a ping> an die Tuer gemeldet (siehe produktPing).
  belegify: produktUrl("belegify"),
  obacht: produktUrl("obacht"),
  talents: produktUrl("obacht-talents"),
  conduit: produktUrl("conduit"),
  simvi: produktUrl("simvi"),
  tagesteller: produktUrl("tagesteller"),
  dealbuddy: produktUrl("dealbuddy"),
} as const satisfies Record<string, string>;

export type Ziel = keyof typeof ZIELE;

export function istZiel(v: string | null | undefined): v is Ziel {
  return typeof v === "string" && Object.prototype.hasOwnProperty.call(ZIELE, v);
}

/** Link auf die Tuer fuer ein Ziel. */
export function tuerHref(ziel: Ziel): string {
  return `${TUER_PFAD}?ziel=${ziel}`;
}

/**
 * `ping`-Adresse fuer einen Produktlink. Der Link selbst bleibt direkt auf die
 * Produktdomain: so sehen Suchmaschinen den Verweis, und der Besucher landet
 * ohne Umweg. Der Browser meldet den Klick per POST an die Tuer, ohne Cookie
 * und ohne Script. Fuer Produkte ohne Ziel-Schluessel: undefined (kein ping).
 */
export function produktPing(slug: string): string | undefined {
  if (!Object.prototype.hasOwnProperty.call(PRODUKT_ZIEL, slug)) return undefined;
  const ziel: ProduktZiel = PRODUKT_ZIEL[slug as keyof typeof PRODUKT_ZIEL];
  return tuerHref(ziel);
}

/**
 * Welche Conversion ein Tuer-Klick ist (fuer die einwilligungspflichtigen
 * Tags). "Partner werden" ist der Start der Anmeldung, "Kontakt" eine Anfrage.
 * Login und Produktlinks sind keine Conversion.
 */
export function conversionArt(ziel: Ziel): "signup" | "lead" | null {
  if (ziel === "partner") return "signup";
  if (ziel === "kontakt") return "lead";
  return null;
}
