// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";

import { ConsentBanner, ohneTags } from "@/components/ConsentBanner";
import { pruefeIds, type WerbeIds } from "@/lib/consent/ids";
import { CONSENT_KEY, CONSENT_VERSION, istWiderruf, leseConsent, schreibeConsent } from "@/lib/consent/store";
import { ladeTags, track, trackFormular, trackZiel } from "@/lib/consent/tags";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const ALLE: WerbeIds = { ga4: "G-TEST000000", gads: "AW-1234567890", metaPixel: "1234567890123", linkedin: "1234567" };

function fremdScripte(): string[] {
  return Array.from(document.querySelectorAll("script[src]")).map((s) => (s as HTMLScriptElement).src);
}

function reset() {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  localStorage.clear();
  const w = window as unknown as Record<string, unknown>;
  for (const k of ["__ccTags", "dataLayer", "gtag", "fbq", "_fbq", "lintrk", "_linkedin_partner_id", "_linkedin_data_partner_ids"]) {
    delete w[k];
  }
}

let root: Root | null = null;
let host: HTMLDivElement;

async function mount(ids: WerbeIds) {
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => root!.render(<ConsentBanner ids={ids} />));
}

function knopf(text: string): HTMLButtonElement {
  const b = Array.from(host.querySelectorAll("button")).find((x) => x.textContent === text);
  if (!b) throw new Error(`Knopf ${text} fehlt`);
  return b as HTMLButtonElement;
}

beforeEach(reset);
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = null;
});

describe("IDs", () => {
  it("nur gueltige Formen werden uebernommen", () => {
    expect(pruefeIds({ ga4: "G-TEST000000", gads: "AW-123", metaPixel: "12ab", linkedin: "" })).toEqual({ ga4: "G-TEST000000" });
    expect(pruefeIds({ ga4: 'G-1"><script>' })).toEqual({});
  });
});

describe("Banner", () => {
  it("ohne IDs: nichts gerendert, kein Speicherzugriff, keine Scripte", async () => {
    expect(renderToString(<ConsentBanner ids={{}} />)).toBe("");
    const get = vi.spyOn(Storage.prototype, "getItem");
    await mount({});
    expect(host.innerHTML).toBe("");
    expect(get).not.toHaveBeenCalled();
    expect(fremdScripte()).toEqual([]);
    get.mockRestore();
  });

  it("mit IDs: Banner sichtbar, drei gleichwertige Knoepfe, vor Einwilligung keine Fremd-Scripte", async () => {
    await mount(ALLE);
    expect(host.querySelector("[data-consent-banner]")).not.toBeNull();
    const klassen = ["Alle akzeptieren", "Nur notwendige", "Einstellungen"].map((t) => knopf(t).className);
    expect(new Set(klassen).size).toBe(1);
    expect(fremdScripte()).toEqual([]);
    expect((window as unknown as { dataLayer?: unknown }).dataLayer).toBeUndefined();
  });

  it("Einstellungen: keine Vorab-Haken, Notwendig fest an", async () => {
    await mount(ALLE);
    await act(async () => knopf("Einstellungen").click());
    const boxen = Array.from(host.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    expect(boxen.map((b) => [b.checked, b.disabled])).toEqual([
      [true, true],
      [false, false],
      [false, false],
    ]);
  });

  it("Alle akzeptieren: Entscheidung gespeichert, Google, Meta, LinkedIn geladen", async () => {
    await mount(ALLE);
    await act(async () => knopf("Alle akzeptieren").click());
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY)!);
    expect(c).toMatchObject({ v: CONSENT_VERSION, statistik: true, marketing: true });
    expect(typeof c.ts).toBe("string");
    const src = fremdScripte();
    expect(src.some((s) => s.startsWith("https://www.googletagmanager.com/gtag/js?id=G-TEST000000"))).toBe(true);
    expect(src).toContain("https://connect.facebook.net/en_US/fbevents.js");
    expect(src).toContain("https://snap.licdn.com/li.lms-analytics/insight.min.js");
    expect(host.querySelector("[data-consent-banner]")).toBeNull();
  });

  it("Nur notwendige: gespeichert, nichts geladen", async () => {
    await mount(ALLE);
    await act(async () => knopf("Nur notwendige").click());
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY)!)).toMatchObject({ statistik: false, marketing: false });
    expect(fremdScripte()).toEqual([]);
  });

  it("gespeicherte Einwilligung: kein Banner, Tags werden geladen", async () => {
    schreibeConsent(localStorage, { statistik: true, marketing: false });
    await mount(ALLE);
    expect(host.querySelector("[data-consent-banner]")).toBeNull();
    expect(fremdScripte()).toEqual(["https://www.googletagmanager.com/gtag/js?id=G-TEST000000"]);
  });

  it("alte Version: Banner erscheint erneut", async () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION - 1, statistik: true, marketing: true, ts: "x" }));
    await mount(ALLE);
    expect(host.querySelector("[data-consent-banner]")).not.toBeNull();
    expect(fremdScripte()).toEqual([]);
  });

  it("Cookie-Einstellungen oeffnet den Dialog, Widerruf laedt neu", async () => {
    schreibeConsent(localStorage, { statistik: true, marketing: true });
    const reload = vi.fn();
    const orig = window.location;
    Object.defineProperty(window, "location", { configurable: true, value: { ...orig, reload } });
    await mount(ALLE);
    await act(async () => window.dispatchEvent(new Event("cc-consent-oeffnen")));
    expect(host.querySelector("[data-consent-banner]")).not.toBeNull();
    await act(async () => knopf("Nur notwendige").click());
    expect(reload).toHaveBeenCalledTimes(1);
    Object.defineProperty(window, "location", { configurable: true, value: orig });
  });
});

describe("Store", () => {
  it("lesen, Version, Widerruf", () => {
    expect(leseConsent(localStorage)).toBeNull();
    localStorage.setItem(CONSENT_KEY, "kaputt");
    expect(leseConsent(localStorage)).toBeNull();
    const a = schreibeConsent(localStorage, { statistik: true, marketing: true }, new Date("2026-11-04T10:00:00Z"));
    expect(leseConsent(localStorage)).toEqual({ v: 1, statistik: true, marketing: true, ts: "2026-11-04T10:00:00.000Z" });
    const b = schreibeConsent(localStorage, { statistik: true, marketing: false });
    expect(istWiderruf(a, b)).toBe(true);
    expect(istWiderruf(b, a)).toBe(false);
    expect(istWiderruf(null, b)).toBe(false);
  });
});

describe("Tags und Conversions", () => {
  const consent = (statistik: boolean, marketing: boolean) => ({ v: 1, statistik, marketing, ts: "" });

  it("Consent Mode v2: default denied, dann update, dann config", () => {
    ladeTags(consent(true, true), ALLE, window);
    const dl = ((window as unknown as { dataLayer: IArguments[] }).dataLayer).map((a) => Array.from(a));
    expect(dl[0]).toEqual(["consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" }]);
    expect(dl[1]).toEqual(["consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }]);
    expect(dl[2][0]).toBe("js");
    expect(dl.slice(3)).toEqual([["config", "G-TEST000000"], ["config", "AW-1234567890"]]);
    expect(JSON.stringify(dl)).not.toContain("anonymize_ip");
  });

  it("nur Statistik: kein AW-config, kein Meta, kein LinkedIn", () => {
    ladeTags(consent(true, false), ALLE, window);
    const dl = ((window as unknown as { dataLayer: IArguments[] }).dataLayer).map((a) => Array.from(a));
    expect(dl.filter((a) => a[0] === "config")).toEqual([["config", "G-TEST000000"]]);
    expect(fremdScripte()).toEqual(["https://www.googletagmanager.com/gtag/js?id=G-TEST000000"]);
  });

  it("nur Marketing ohne Ads-ID: gtag wird nicht geladen", () => {
    ladeTags(consent(false, true), { ga4: "G-TEST000000", metaPixel: "1234567890123" }, window);
    expect(fremdScripte()).toEqual(["https://connect.facebook.net/en_US/fbevents.js"]);
  });

  it("track ohne Einwilligung ist No-op", () => {
    expect(() => track("sign_up", {})).not.toThrow();
    expect((window as unknown as { dataLayer?: unknown }).dataLayer).toBeUndefined();
  });

  it("Tuer-Klick: partner -> sign_up/Lead, kontakt -> generate_lead/Lead, login nichts", () => {
    ladeTags(consent(true, true), ALLE, window);
    const fbq = vi.fn();
    (window as unknown as { fbq: unknown }).fbq = fbq;
    trackZiel("partner");
    trackZiel("kontakt");
    trackZiel("login");
    trackZiel("belegify");
    const dl = ((window as unknown as { dataLayer: IArguments[] }).dataLayer).map((a) => Array.from(a));
    expect(dl.filter((a) => a[0] === "event").map((a) => a[1])).toEqual(["sign_up", "generate_lead"]);
    expect(fbq.mock.calls.map((c) => c[1])).toEqual(["Lead", "Lead"]);
  });

  it("Formular gesendet -> generate_lead, ohne Formularinhalte; ohne Einwilligung No-op", () => {
    trackFormular("kontakt");
    expect((window as unknown as { dataLayer?: unknown }).dataLayer).toBeUndefined();
    ladeTags(consent(true, false), ALLE, window);
    trackFormular("partner");
    const dl = ((window as unknown as { dataLayer: IArguments[] }).dataLayer).map((a) => Array.from(a));
    expect(dl.filter((a) => a[0] === "event")).toEqual([["event", "generate_lead", { form: "partner" }]]);
  });
});

describe("Bereiche ohne Tags", () => {
  it("Partner-Login und -Portal: kein Banner", () => {
    expect(ohneTags("/login")).toBe(true);
    expect(ohneTags("/portal")).toBe(true);
    expect(ohneTags("/portal/pipeline")).toBe(true);
    expect(ohneTags("/")).toBe(false);
    expect(ohneTags("/loginhilfe")).toBe(false);
  });
});

describe("Gegencheck-Faelle", () => {
  const consent = (statistik: boolean, marketing: boolean) => ({ v: 1, statistik, marketing, ts: "" });

  it("erst Statistik, dann zusaetzlich Marketing: Consent-Update und AW-config werden nachgezogen", () => {
    reset();
    ladeTags(consent(true, false), ALLE, window);
    ladeTags(consent(true, true), ALLE, window);
    const dl = ((window as unknown as { dataLayer: IArguments[] }).dataLayer).map((a) => Array.from(a));
    expect(dl.filter((a) => a[0] === "config").map((a) => a[1])).toEqual(["G-TEST000000", "AW-1234567890"]);
    expect(dl.filter((a) => a[0] === "consent").map((a) => a[1])).toEqual(["default", "update", "update"]);
    expect(dl.at(-2)).toEqual(["consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" }]);
    // gtag.js nur einmal
    expect(fremdScripte().filter((s) => s.includes("gtag/js"))).toHaveLength(1);
    // erneuter gleicher Aufruf: nichts Neues
    ladeTags(consent(true, true), ALLE, window);
    expect(((window as unknown as { dataLayer: unknown[] }).dataLayer)).toHaveLength(dl.length);
  });

  it("gesperrter Speicher: Widerruf laedt trotzdem neu", async () => {
    const set = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("gesperrt");
    });
    const reload = vi.fn();
    const orig = window.location;
    Object.defineProperty(window, "location", { configurable: true, value: { ...orig, reload } });
    await mount(ALLE);
    await act(async () => knopf("Alle akzeptieren").click());
    expect(fremdScripte().length).toBeGreaterThan(0);
    await act(async () => window.dispatchEvent(new Event("cc-consent-oeffnen")));
    await act(async () => knopf("Nur notwendige").click());
    expect(reload).toHaveBeenCalledTimes(1);
    Object.defineProperty(window, "location", { configurable: true, value: orig });
    set.mockRestore();
  });
});
