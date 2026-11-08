import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const afterCalls: (() => unknown)[] = [];
vi.mock("next/server", async (orig) => {
  const mod = await orig<typeof import("next/server")>();
  return { ...mod, after: (fn: () => unknown) => afterCalls.push(fn) };
});
const sent: unknown[] = [];
vi.mock("@/lib/analytics/web-hit", async (orig) => {
  const mod = await orig<typeof import("@/lib/analytics/web-hit")>();
  return { ...mod, sendWebHit: async (hit: unknown) => void sent.push(hit) };
});

const { GET, POST } = await import("@/app/start/route");
const { produktPing, tuerHref, ZIELE, conversionArt } = await import("@/lib/tuer");
const { produkte } = await import("@/lib/produkte");

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";
const BROWSER = {
  "user-agent": CHROME,
  "sec-ch-ua": '"Chromium";v="141"',
  "sec-fetch-mode": "navigate",
};

function req(query: string, headers: Record<string, string> = {}, method = "GET") {
  return new NextRequest(`https://smart-signals.de/start${query}`, {
    method,
    headers: { ...BROWSER, host: "smart-signals.de", ...headers },
  });
}

async function run(query: string, headers?: Record<string, string>) {
  const res = GET(req(query, headers));
  for (const fn of afterCalls.splice(0)) await fn();
  return res;
}

async function ping(query: string, headers: Record<string, string> = {}) {
  const res = POST(req(query, { "content-type": "text/ping", ...headers }, "POST"));
  for (const fn of afterCalls.splice(0)) await fn();
  return res;
}

beforeEach(() => {
  sent.length = 0;
  afterCalls.length = 0;
});

describe("Klick-Tuer /start (GET)", () => {
  it.each([
    ["partner", "https://smart-signals.de/#anmeldung"],
    ["kontakt", "https://smart-signals.de/kontaktanfrage"],
    ["login", "https://smart-signals.de/login"],
    ["jobhandy", "https://www.jobhandy.io/?utm_source=smart-signals.de&utm_medium=referral"],
    ["belegify", "https://belegify.app/"],
    ["talents", "https://talents.obacht.app/"],
  ])("ziel=%s leitet 302 auf das hinterlegte Ziel", async (ziel, ziel_url) => {
    const res = await run(`?ziel=${ziel}`);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(ziel_url);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(res.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("eigene Ziele bleiben auf dem Host der Anfrage (Vorschau, lokal)", async () => {
    const res = GET(new NextRequest("http://localhost:3440/start?ziel=kontakt", { headers: BROWSER }));
    expect(res.headers.get("location")).toBe("http://localhost:3440/kontaktanfrage");
  });

  it("zeichnet einen cta-Klick mit Ausgangsseite und Ziel auf", async () => {
    await run("?ziel=kontakt&gclid=GEHEIM&utm_source=newsletter", {
      referer: "https://smart-signals.de/produkte?utm_source=x",
    });
    expect(sent).toEqual([
      {
        kind: "cta",
        path: "/start",
        ziel: "kontakt",
        client_kind: "mensch",
        referrer_host: null,
        from_path: "/produkte",
        klick_typ: "gclid",
        utm_source: "newsletter",
      },
    ]);
    expect(JSON.stringify(sent)).not.toContain("GEHEIM");
  });

  it("UTM der Tuer-Adresse reist ins Ziel, nichts anderes", async () => {
    const res = await run("?ziel=partner&utm_source=li&utm_campaign=herbst&gclid=X&foo=bar");
    const loc = new URL(res.headers.get("location")!);
    expect(loc.origin + loc.pathname + loc.hash).toBe("https://smart-signals.de/#anmeldung");
    expect(Object.fromEntries(loc.searchParams)).toEqual({ utm_source: "li", utm_campaign: "herbst" });
  });

  it("Ziel mit eigenen Kampagnenmarkern behaelt sie", async () => {
    const res = await run("?ziel=jobhandy&utm_source=li");
    expect(res.headers.get("location")).toBe(ZIELE.jobhandy);
  });

  it.each([
    "?ziel=unbekannt",
    "?ziel=",
    "",
    "?ziel=https://evil.example",
    "?ziel=//evil.example",
    "?ziel=__proto__",
    "?ziel=toString",
    "?ziel=swing-and-savor",
    "?url=https://evil.example&ziel=https%3A%2F%2Fevil.example",
  ])("unbekanntes oder fremdes Ziel %s: Startseite, keine Messung", async (q) => {
    const res = await run(q);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://smart-signals.de/");
    expect(sent).toHaveLength(0);
  });

  it("eigene Pruefung wird als intern verbucht", async () => {
    await run("?ziel=login", { "x-cc-lauf": "1" });
    expect(sent).toMatchObject([{ client_kind: "intern", ziel: "login" }]);
  });

  it("alle Ziele zeigen auf eigene Pfade oder https", () => {
    for (const url of Object.values(ZIELE)) {
      expect(url.startsWith("/") ? !url.startsWith("//") : url.startsWith("https://")).toBe(true);
    }
  });
});

describe("Produktlink-Klick per <a ping> (POST)", () => {
  it("zaehlt den Klick, 204, keine Weiterleitung", async () => {
    const res = await ping("?ziel=belegify", {
      "ping-from": "https://smart-signals.de/produkte",
      "ping-to": "https://belegify.app/",
    });
    expect(res.status).toBe(204);
    expect(res.headers.get("location")).toBeNull();
    expect(sent).toEqual([
      { kind: "cta", path: "/start", ziel: "belegify", client_kind: "mensch", from_path: "/produkte" },
    ]);
  });

  it("ohne Ping-To oder mit unbekanntem Ziel: nichts zaehlen", async () => {
    expect((await ping("?ziel=belegify")).status).toBe(204);
    expect((await ping("?ziel=evil", { "ping-to": "https://evil.example" })).status).toBe(204);
    expect(sent).toHaveLength(0);
  });
});

describe("Ziel-Liste des Messpunkts", () => {
  // Abschrift von ZIELE in supabase/functions/web-hit/logic.ts (CRM-Repo).
  // Ein Schluessel ausserhalb dieser Liste zaehlt dort nur als "andere".
  const MESSPUNKT = new Set([
    "signup", "login", "demo", "demo_portal", "kontakt", "kontakt_gesendet", "termin", "kauf", "checkout",
    "partner", "ios", "android", "app", "download", "shop", "portal",
    "belegify", "obacht", "talents", "conduit", "commsos", "case_connect", "simvi", "smartsignals",
    "dealbuddy", "tagesteller", "jobhandy",
  ]);
  it("jedes Tuer-Ziel und kontakt_gesendet ist dem Messpunkt bekannt", () => {
    for (const z of [...Object.keys(ZIELE), "kontakt_gesendet"]) expect(MESSPUNKT.has(z), z).toBe(true);
  });
});

describe("Links auf die Tuer", () => {
  it("tuerHref und produktPing", () => {
    expect(tuerHref("kontakt")).toBe("/start?ziel=kontakt");
    expect(produktPing("obacht-talents")).toBe("/start?ziel=talents");
    expect(produktPing("swing-and-savor")).toBeUndefined();
    expect(produktPing("__proto__")).toBeUndefined();
  });

  it("jedes Produkt mit Ziel-Schluessel hat dieselbe Adresse wie in produkte.ts", () => {
    for (const p of produkte) {
      const ping = produktPing(p.slug);
      if (!ping) continue;
      const ziel = new URLSearchParams(ping.split("?")[1]).get("ziel") as keyof typeof ZIELE;
      expect(ZIELE[ziel]).toBe(p.url);
    }
  });

  it("Conversion-Art: partner = Anmeldung, kontakt = Anfrage, sonst keine", () => {
    expect(conversionArt("partner")).toBe("signup");
    expect(conversionArt("kontakt")).toBe("lead");
    expect(conversionArt("login")).toBeNull();
    expect(conversionArt("belegify")).toBeNull();
  });
});
