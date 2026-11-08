import { describe, expect, it } from "vitest";

import {
  classifyClient,
  eigenerHerkunftsPfad,
  isPrefetch,
  LAUF_HEADER,
  LAUF_MARKE,
  referrerHost,
  ganz,
} from "@/lib/analytics/classify";

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const SAFARI_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const CHROME_SIGNALS = { secChUa: '"Chromium";v="141", "Google Chrome";v="141"', secFetchMode: "navigate" };

describe("classifyClient (aus Belegify uebernommen)", () => {
  it("echter Chrome mit Client Hints ist ein Mensch", () => {
    expect(classifyClient(CHROME, CHROME_SIGNALS)).toBe("mensch");
  });
  it("iPhone-Safari ohne sec-ch-ua ist ein Mensch", () => {
    expect(classifyClient(SAFARI_IOS, { secFetchMode: "navigate" })).toBe("mensch");
  });
  it.each([
    ["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"],
    ["curl/8.4.0"],
    ["python-requests/2.31"],
    ["facebookexternalhit/1.1"],
    ["Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0 Safari/537.36"],
    [""],
  ])("Bot: %s", (ua) => {
    expect(classifyClient(ua, CHROME_SIGNALS)).toBe("bot");
  });
  it("fehlender User-Agent ist ein Bot", () => {
    expect(classifyClient(null)).toBe("bot");
  });
  it("CUBOT-Geraet ist kein Bot", () => {
    expect(
      classifyClient("Mozilla/5.0 (Linux; Android 13; CUBOT NOTE 21) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36"),
    ).toBe("mensch");
  });
  it("behaupteter Chrome ohne sec-ch-ua ist ein Bot", () => {
    expect(classifyClient(CHROME, { secFetchMode: "navigate" })).toBe("bot");
  });
  it("Headless im Client Hint ist ein Bot", () => {
    expect(classifyClient(CHROME, { secChUa: '"HeadlessChrome";v="141"', secFetchMode: "navigate" })).toBe("bot");
  });
  it("moderner Browser ohne sec-fetch-mode ist ein Bot", () => {
    expect(classifyClient(CHROME, { secChUa: CHROME_SIGNALS.secChUa })).toBe("bot");
  });
  it(`Lauf-Kennung ${LAUF_MARKE} im User-Agent ist intern, auch bei curl`, () => {
    expect(LAUF_MARKE).toBe("CCMessLauf");
    expect(classifyClient(`curl/8 ${LAUF_MARKE}`)).toBe("intern");
    expect(classifyClient(`${SAFARI_IOS} ${LAUF_MARKE}`)).toBe("intern");
  });
  it(`Header ${LAUF_HEADER} ist intern`, () => {
    expect(LAUF_HEADER).toBe("x-cc-lauf");
    expect(classifyClient(CHROME, { ...CHROME_SIGNALS, laufMarke: "1" })).toBe("intern");
  });
});

describe("isPrefetch", () => {
  it("Next-Router-Prefetch und Sec-Purpose", () => {
    expect(isPrefetch({ nextRouterPrefetch: "1" })).toBe(true);
    expect(isPrefetch({ secPurpose: "prefetch;prerender" })).toBe(true);
    expect(isPrefetch({ purpose: "prefetch" })).toBe(true);
  });
  it("normale Navigation ist keine Vorladung", () => {
    expect(isPrefetch({})).toBe(false);
  });
});

describe("referrerHost", () => {
  it("fremder Host ohne Pfad und Query", () => {
    expect(referrerHost("https://www.google.com/search?q=smart+signals")).toBe("www.google.com");
  });
  it.each([
    "https://smart-signals.de/produkte",
    "https://www.smart-signals.de/",
    "https://portal.smart-signals.de/login",
    "https://smart-signals.vercel.app/",
    "http://localhost:3040/",
  ])("eigener Host faellt raus: %s", (r) => {
    expect(referrerHost(r)).toBeNull();
  });
  it("Muell ist null", () => {
    expect(referrerHost("kein url")).toBeNull();
    expect(referrerHost(null)).toBeNull();
  });
});

describe("eigenerHerkunftsPfad", () => {
  it("eigene Seite: nur der Pfad, nie die Query", () => {
    expect(eigenerHerkunftsPfad("https://smart-signals.de/produkte?utm_source=x")).toBe("/produkte");
    expect(eigenerHerkunftsPfad("https://www.smart-signals.de/")).toBe("/");
  });
  it("fremde Seite: null", () => {
    expect(eigenerHerkunftsPfad("https://evil.example/business")).toBeNull();
    expect(eigenerHerkunftsPfad("https://portal.smart-signals.de/x")).toBeNull();
  });
  it("Host der Anfrage zaehlt als eigen (lokal, Vorschau)", () => {
    expect(eigenerHerkunftsPfad("http://localhost:3040/unternehmen", "localhost:3040")).toBe("/unternehmen");
  });
});

describe("nie gekuerzt (Grenzfall Astra)", () => {
  const GRENZFALL = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccccccccccccccccccccccccccccccccccc.max.mustermann.example.org";
  const ZU_LANG = "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.example.org";
  it("langer gueltiger Host wird vollstaendig weitergegeben, nicht abgeschnitten", () => {
    expect(GRENZFALL.length).toBeGreaterThan(200);
    expect(referrerHost(`https://${GRENZFALL}/profil`)).toBe(GRENZFALL);
  });
  it("Host laenger als 253 Zeichen wird verworfen", () => {
    expect(ZU_LANG.length).toBeGreaterThan(253);
    expect(referrerHost(`https://${ZU_LANG}/`)).toBeNull();
  });
  it("ganz(): ganz oder gar nicht", () => {
    expect(ganz("abc", 3)).toBe("abc");
    expect(ganz("abcd", 3)).toBeNull();
    expect(ganz("  ", 3)).toBeNull();
    expect(ganz(null, 3)).toBeNull();
  });
});
