import { afterEach, describe, expect, it, vi } from "vitest";

import {
  istDokumentAufruf,
  istGezaehlterPfad,
  klickTyp,
  sendWebHit,
  utmAus,
  WEB_HIT_URL_DEFAULT,
} from "@/lib/analytics/web-hit";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Dokument-Filter", () => {
  const doc = { method: "GET", pathname: "/", secFetchDest: "document", accept: "text/html" };
  it("Seitenaufruf zaehlt", () => {
    expect(istDokumentAufruf(doc)).toBe(true);
    expect(istDokumentAufruf({ ...doc, secFetchDest: null, accept: "text/html,application/xhtml+xml" })).toBe(true);
  });
  it("kein GET zaehlt nicht", () => {
    expect(istDokumentAufruf({ ...doc, method: "POST" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, method: "HEAD" })).toBe(false);
  });
  it("Assets, API und Next-Interna zaehlen nicht", () => {
    expect(istDokumentAufruf({ ...doc, pathname: "/icon.svg" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, pathname: "/robots.txt" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, pathname: "/api/x" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, pathname: "/_next/static/chunks/a.js" })).toBe(false);
  });
  it("fetch/RSC, Bilder und Skripte zaehlen nicht", () => {
    expect(istDokumentAufruf({ ...doc, secFetchDest: "empty", accept: "*/*" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, secFetchDest: "image", accept: "image/avif" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, secFetchDest: null, accept: "*/*" })).toBe(false);
    expect(istDokumentAufruf({ ...doc, secFetchDest: null, accept: null })).toBe(false);
  });
});

describe("Gezaehlte Pfade", () => {
  it("Login, Portal und Tuer zaehlen nicht als Seitenaufruf", () => {
    for (const p of ["/login", "/portal", "/portal/provisionen", "/start"]) expect(istGezaehlterPfad(p)).toBe(false);
    for (const p of ["/", "/produkte", "/kontaktanfrage", "/links", "/startseite"]) expect(istGezaehlterPfad(p)).toBe(true);
  });
});

describe("Klick-Parameter und UTM", () => {
  it("nur der Name des Klick-Parameters, nie der Wert", () => {
    expect(klickTyp(new URLSearchParams("gclid=ABC123SECRET"))).toBe("gclid");
    expect(klickTyp(new URLSearchParams("fbclid=x"))).toBe("fbclid");
    expect(klickTyp(new URLSearchParams("li_fat_id=x"))).toBe("li_fat_id");
    expect(klickTyp(new URLSearchParams("msclkid=x"))).toBe("msclkid");
    expect(klickTyp(new URLSearchParams("q=1"))).toBeNull();
  });
  it("UTM wird uebernommen, alles andere nicht", () => {
    const u = utmAus(new URLSearchParams("utm_source=google&utm_medium=cpc&utm_campaign=<b>start&email=a@b.de&utm_term=suchbegriff&utm_content=x"));
    expect(u).toEqual({ utm_source: "google", utm_medium: "cpc", utm_campaign: "bstart" });
  });
});

describe("sendWebHit", () => {
  it("ohne Token passiert nichts", async () => {
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    await sendWebHit({ kind: "view", path: "/" }, { token: "", url: "http://mock" });
    await sendWebHit({ kind: "view", path: "/" }, {});
    expect(f).not.toHaveBeenCalled();
  });

  it("mit Token: POST an WEB_HIT_URL mit Token-Header und schlankem Body", async () => {
    const f = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", f);
    await sendWebHit(
      { kind: "view", path: "/produkte", client_kind: "mensch", referrer_host: null, klick_typ: "gclid", utm_source: "x" },
      { token: "test-token", url: "http://mock/web-hit" },
    );
    expect(f).toHaveBeenCalledTimes(1);
    const [url, init] = f.mock.calls[0];
    expect(url).toBe("http://mock/web-hit");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "content-type": "application/json",
      "x-web-hit-token": "test-token",
      "x-region": "eu-central-1",
    });
    expect(JSON.parse(init.body)).toEqual({
      kind: "view",
      path: "/produkte",
      client_kind: "mensch",
      klick_typ: "gclid",
      utm_source: "x",
    });
  });

  it("Default-Ziel ist die web-hit-Function", async () => {
    const f = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", f);
    await sendWebHit({ kind: "view", path: "/" }, { token: "t" });
    expect(f.mock.calls[0][0]).toBe(WEB_HIT_URL_DEFAULT);
  });

  it("Fehler und Zeitueberschreitung werfen nie", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(sendWebHit({ kind: "view", path: "/" }, { token: "t", url: "http://mock" })).resolves.toBeUndefined();

    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn((_u: string, init: RequestInit) => new Promise((_r, reject) => {
        init.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
      })),
    );
    const p = sendWebHit({ kind: "view", path: "/" }, { token: "t", url: "http://mock" });
    await vi.advanceTimersByTimeAsync(1500);
    await expect(p).resolves.toBeUndefined();
  });
});
