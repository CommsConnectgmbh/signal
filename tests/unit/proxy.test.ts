import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest, type NextFetchEvent } from "next/server";

const sent: unknown[] = [];
vi.mock("@/lib/analytics/web-hit", async (orig) => {
  const mod = await orig<typeof import("@/lib/analytics/web-hit")>();
  return { ...mod, sendWebHit: async (hit: unknown) => void sent.push(hit) };
});
const { proxy } = await import("@/proxy");

const SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

async function call(path: string, headers: Record<string, string>, method = "GET") {
  const waits: Promise<unknown>[] = [];
  const event = { waitUntil: (p: Promise<unknown>) => waits.push(p) } as unknown as NextFetchEvent;
  const res = proxy(new NextRequest(`https://smart-signals.de${path}`, { method, headers }), event);
  await Promise.all(waits);
  return { res, waits };
}

const DOC = { "user-agent": SAFARI, "sec-fetch-dest": "document", "sec-fetch-mode": "navigate", accept: "text/html" };

beforeEach(() => {
  sent.length = 0;
});

describe("Proxy: Reichweitenmessung", () => {
  it("zaehlt eine Dokument-Navigation, ohne Cookie und ohne die Antwort zu aendern", async () => {
    const { res, waits } = await call("/produkte/?utm_source=google&gclid=XYZ&email=a@b.de", {
      ...DOC,
      referer: "https://www.google.com/search?q=smart+signals",
    });
    expect(waits).toHaveLength(1);
    expect(sent).toEqual([
      {
        kind: "view",
        path: "/produkte",
        client_kind: "mensch",
        referrer_host: "www.google.com",
        klick_typ: "gclid",
        utm_source: "google",
      },
    ]);
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it.each([
    ["RSC-Fetch", "/produkte", { ...DOC, "sec-fetch-dest": "empty", accept: "*/*", rsc: "1" }, "GET"],
    ["Bild", "/icon.svg", { ...DOC, "sec-fetch-dest": "image", accept: "image/*" }, "GET"],
    ["Datei", "/robots.txt", DOC, "GET"],
    ["POST", "/", DOC, "POST"],
    ["Tuer", "/start", DOC, "GET"],
    ["Partner-Login", "/login", DOC, "GET"],
    ["Partner-Portal", "/portal/pipeline", DOC, "GET"],
    ["Kontaktformular-API", "/api/contact", DOC, "GET"],
  ])("zaehlt nicht: %s", async (_n, path, headers, method) => {
    const { waits } = await call(path, headers as Record<string, string>, method as string);
    expect(waits).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it("Bots werden als bot verbucht", async () => {
    await call("/", { "user-agent": "curl/8", accept: "text/html" });
    expect(sent).toMatchObject([{ client_kind: "bot" }]);
  });
});
