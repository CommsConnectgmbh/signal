// IDs der einwilligungspflichtigen Dienste. Ohne ID gibt es den Dienst nicht:
// kein Banner, kein Script, kein Abschnitt in der Datenschutzerklaerung.
//
// process.env.NEXT_PUBLIC_* muss woertlich dastehen, damit Next.js die Werte
// beim Build in den Browser-Code einsetzt.

export type WerbeIds = {
  ga4?: string;
  gads?: string;
  metaPixel?: string;
  linkedin?: string;
};

// Nur die erwartete Form wird uebernommen. Die IDs landen in Script-Adressen;
// alles andere waere ein Einfallstor und wird wie "nicht gesetzt" behandelt.
const FORM: Record<keyof WerbeIds, RegExp> = {
  ga4: /^G-[A-Z0-9]{4,20}$/,
  gads: /^AW-[0-9]{4,20}$/,
  metaPixel: /^[0-9]{6,20}$/,
  linkedin: /^[0-9]{3,20}$/,
};

export function pruefeIds(roh: Partial<Record<keyof WerbeIds, string | undefined>>): WerbeIds {
  const out: WerbeIds = {};
  for (const k of Object.keys(FORM) as (keyof WerbeIds)[]) {
    const v = roh[k]?.trim();
    if (v && FORM[k].test(v)) out[k] = v;
  }
  return out;
}

export function werbeIdsAusEnv(): WerbeIds {
  return pruefeIds({
    ga4: process.env.NEXT_PUBLIC_GA4_ID,
    gads: process.env.NEXT_PUBLIC_GADS_ID,
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  });
}

export function hatStatistik(ids: WerbeIds): boolean {
  return Boolean(ids.ga4);
}

export function hatMarketing(ids: WerbeIds): boolean {
  return Boolean(ids.gads || ids.metaPixel || ids.linkedin);
}

/** Banner und "Cookie-Einstellungen" gibt es nur, wenn mindestens eine ID gesetzt ist. */
export function brauchtEinwilligung(ids: WerbeIds): boolean {
  return hatStatistik(ids) || hatMarketing(ids);
}
