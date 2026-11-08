import { beforeEach, describe, expect, it, vi } from "vitest";

// Mailversand und CRM abgeklemmt: getestet wird nur die Messung.
const gesendet: unknown[] = [];
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: async (m: unknown) => (gesendet.push(m), { data: { id: "x" }, error: null }) };
  },
}));
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

const { POST } = await import("@/app/api/contact/route");

const SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

function anfrage(body: Record<string, unknown>) {
  return new Request("https://smart-signals.de/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": SAFARI,
      host: "smart-signals.de",
      referer: "https://smart-signals.de/kontaktanfrage",
    },
    body: JSON.stringify(body),
  });
}

async function senden(body: Record<string, unknown>) {
  const res = await POST(anfrage(body));
  for (const fn of afterCalls.splice(0)) await fn();
  return res;
}

beforeEach(() => {
  sent.length = 0;
  gesendet.length = 0;
  afterCalls.length = 0;
  process.env.RESEND_API_KEY = "test";
  delete process.env.SUPABASE_URL_CRM;
});

describe("Kontaktformular: Messpunkt kontakt_gesendet", () => {
  it("erfolgreiche Anfrage: ein cta-Hit ohne Formularinhalte", async () => {
    const res = await senden({ firmenname: "Muster GmbH", email: "max@example.org", beschreibung: "Geheimtext" });
    expect(res.status).toBe(200);
    expect(sent).toEqual([
      {
        kind: "cta",
        path: "/start",
        ziel: "kontakt_gesendet",
        client_kind: "mensch",
        referrer_host: null,
        from_path: "/kontaktanfrage",
      },
    ]);
    const json = JSON.stringify(sent);
    for (const s of ["Muster", "max@example.org", "Geheimtext", "Mozilla"]) expect(json).not.toContain(s);
  });

  it("Honeypot, ungueltige Angaben, fehlende Konfiguration: nichts gezaehlt", async () => {
    expect((await senden({ firmenname: "A", email: "a@b.de", _honey: "x" })).status).toBe(204);
    expect((await senden({ firmenname: "", email: "kaputt" })).status).toBe(400);
    delete process.env.RESEND_API_KEY;
    expect((await senden({ firmenname: "A", email: "a@b.de" })).status).toBe(503);
    expect(sent).toHaveLength(0);
  });
});
