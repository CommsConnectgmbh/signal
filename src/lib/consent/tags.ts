// Laden der einwilligungspflichtigen Tags und Conversion-Ereignisse.
//
// Grundsatz: vor einer Einwilligung wird KEIN Fremd-Script geladen und kein
// Fremd-Request ausgeloest. Google Consent Mode v2 im Basis-Modus: gtag.js
// kommt erst nach der Einwilligung, dann zuerst "default: alles denied", dann
// "update" passend zur Auswahl, dann "config".

import type { Consent } from "./store";
import type { WerbeIds } from "./ids";
import { conversionArt, type Ziel } from "../tuer";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Fenster = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: any;
  _fbq?: any;
  lintrk?: any;
  _linkedin_partner_id?: string;
  _linkedin_data_partner_ids?: string[];
  __ccTags?: { google?: boolean; meta?: boolean; linkedin?: boolean };
};

export const GTAG_SRC = "https://www.googletagmanager.com/gtag/js";
export const META_SRC = "https://connect.facebook.net/en_US/fbevents.js";
export const LINKEDIN_SRC = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

function script(doc: Document, src: string): void {
  const s = doc.createElement("script");
  s.async = true;
  s.src = src;
  doc.head.appendChild(s);
}

/**
 * Laedt genau die Dienste, fuer die eine ID gesetzt UND eingewilligt ist.
 * Mehrfacher Aufruf laedt nichts doppelt.
 */
export function ladeTags(consent: Consent, ids: WerbeIds, w: Window = window): void {
  const win = w as Fenster;
  const doc = win.document;
  const geladen = (win.__ccTags ??= {});

  const ga4 = consent.statistik ? ids.ga4 : undefined;
  const gads = consent.marketing ? ids.gads : undefined;

  if ((ga4 || gads) && !geladen.google) {
    geladen.google = true;
    win.dataLayer = win.dataLayer || [];
    // gtag erwartet das arguments-Objekt, kein Array.
    win.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer!.push(arguments);
    };
    win.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    win.gtag("consent", "update", {
      analytics_storage: consent.statistik ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
    win.gtag("js", new Date());
    if (ga4) win.gtag("config", ga4);
    if (gads) win.gtag("config", gads);
    script(doc, `${GTAG_SRC}?id=${encodeURIComponent((ga4 ?? gads)!)}`);
  }

  if (consent.marketing && ids.metaPixel && !geladen.meta) {
    geladen.meta = true;
    // Offizielles Basis-Snippet von Meta, ausgeschrieben.
    if (!win.fbq) {
      const n: any = function (...args: unknown[]) {
        // Wie im Original-Snippet: callMethod erwartet fbq als this.
        // eslint-disable-next-line prefer-spread
        if (n.callMethod) n.callMethod.apply(n, args);
        else n.queue.push(args);
      };
      win.fbq = n;
      if (!win._fbq) win._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
    }
    script(doc, META_SRC);
    win.fbq("init", ids.metaPixel);
    win.fbq("track", "PageView");
  }

  if (consent.marketing && ids.linkedin && !geladen.linkedin) {
    geladen.linkedin = true;
    win._linkedin_partner_id = ids.linkedin;
    win._linkedin_data_partner_ids = win._linkedin_data_partner_ids || [];
    win._linkedin_data_partner_ids.push(ids.linkedin);
    if (!win.lintrk) {
      const l: any = function (a: unknown, b: unknown) {
        l.q.push([a, b]);
      };
      l.q = [];
      win.lintrk = l;
    }
    script(doc, LINKEDIN_SRC);
  }
}

/** GA4-Ereignis -> Meta-Standardereignis. */
const META_EREIGNIS: Record<string, string> = {
  sign_up: "Lead",
  begin_checkout: "InitiateCheckout",
  generate_lead: "Lead",
};

/**
 * Conversion-Ereignis an die geladenen Dienste. Ohne Einwilligung sind die
 * Dienste nicht geladen, dann ist das ein No-op.
 *
 * LinkedIn braucht fuer ein Conversion-Ereignis eine Conversion-ID aus dem
 * Campaign Manager; ohne `linkedin_conversion_id` wird dort nichts gesendet.
 */
export function track(name: string, params: Record<string, unknown> = {}, w?: Window): void {
  const win = (w ?? (typeof window !== "undefined" ? window : undefined)) as Fenster | undefined;
  if (!win?.__ccTags) return;
  const { linkedin_conversion_id, ...rest } = params;
  try {
    if (win.__ccTags.google && win.gtag) win.gtag("event", name, rest);
    const meta = META_EREIGNIS[name];
    if (win.__ccTags.meta && win.fbq && meta) win.fbq("track", meta, rest);
    if (win.__ccTags.linkedin && win.lintrk && linkedin_conversion_id) {
      win.lintrk("track", { conversion_id: linkedin_conversion_id });
    }
  } catch {
    // Messung darf den Klick nie stoeren.
  }
}

/** Klick auf eine Tuer-CTA. */
export function trackZiel(ziel: Ziel, w?: Window): void {
  const art = conversionArt(ziel);
  if (art === "lead") track("generate_lead", { ziel }, w);
  else if (art === "signup") track("sign_up", { method: ziel }, w);
}

/** Erfolgreich abgeschicktes Formular (Kontakt, Partneranmeldung). Ohne Formularinhalte. */
export function trackFormular(form: "kontakt" | "partner", w?: Window): void {
  track("generate_lead", { form }, w);
}
