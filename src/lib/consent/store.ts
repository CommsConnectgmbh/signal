// Speicherung der Einwilligungsentscheidung in localStorage "cc_consent".
// Technisch notwendig (§ 25 Abs. 2 Nr. 2 TDDDG), kein Cookie.

export const CONSENT_KEY = "cc_consent";

/** Hochzaehlen, wenn sich die Dienste aendern: dann wird erneut gefragt. */
export const CONSENT_VERSION = 1;

export type Consent = {
  v: number;
  statistik: boolean;
  marketing: boolean;
  ts: string;
};

type Speicher = Pick<Storage, "getItem" | "setItem">;

export function leseConsent(speicher: Speicher | null | undefined): Consent | null {
  if (!speicher) return null;
  try {
    const roh = speicher.getItem(CONSENT_KEY);
    if (!roh) return null;
    const c = JSON.parse(roh) as Partial<Consent>;
    if (c?.v !== CONSENT_VERSION) return null;
    if (typeof c.statistik !== "boolean" || typeof c.marketing !== "boolean") return null;
    return { v: c.v, statistik: c.statistik, marketing: c.marketing, ts: String(c.ts ?? "") };
  } catch {
    return null;
  }
}

export function schreibeConsent(
  speicher: Speicher | null | undefined,
  wahl: { statistik: boolean; marketing: boolean },
  jetzt: Date = new Date(),
): Consent {
  const c: Consent = {
    v: CONSENT_VERSION,
    statistik: wahl.statistik,
    marketing: wahl.marketing,
    ts: jetzt.toISOString(),
  };
  try {
    speicher?.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    // Speicher gesperrt (privater Modus o. a.): die Wahl gilt dann nur fuer
    // diesen Seitenaufruf. Kein Grund, die Seite zu stoeren.
  }
  return c;
}

/** Wurde eine zuvor erteilte Einwilligung zurueckgenommen? Dann muss neu geladen werden. */
export function istWiderruf(vorher: Consent | null, nachher: Consent): boolean {
  if (!vorher) return false;
  return (vorher.statistik && !nachher.statistik) || (vorher.marketing && !nachher.marketing);
}
