// Die Tuer. Zaehlt den Klick und leitet weiter.
//
// Bewusst duenn: faellt die Messung aus, wird trotzdem weitergeleitet. Ein
// Besucher, der wegen unserer Statistik nicht ans Ziel kommt, kostet genau
// das, was hier gemessen werden soll.
//
// Zwei Wege hinein:
// - GET /start?ziel=partner: die CTAs (Partner werden, Kontakt, Login) zeigen
//   auf die Tuer; Klick zaehlen, 302 auf das hinterlegte Ziel.
// - POST /start?ziel=belegify mit Ping-To-Header: der Browser meldet einen
//   Klick auf einen direkten Produktlink (<a href=... ping=...>). Zaehlen,
//   204, keine Weiterleitung. Der Link selbst bleibt direkt (SEO).

import { after, NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { eigenerHerkunftsPfad, referrerHost } from "@/lib/analytics/classify";
import { clientKindAus, klickTyp, sendWebHit, utmAus, type WebHit } from "@/lib/analytics/web-hit";
import { istZiel, TUER_PFAD, ZIELE } from "@/lib/tuer";

export function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const zielParam = params.get("ziel");

  // Unbekanntes Ziel: zur Startseite, nichts messen. Kein offener Redirect,
  // die Adresse kommt nie aus der Anfrage.
  if (!istZiel(zielParam)) {
    return antwort(NextResponse.redirect(new URL("/", req.url), 302));
  }

  const ziel = zielParam;
  const utm = utmAus(params);

  // Eigene Ziele relativ zur aktuellen Adresse (bleibt auf dem Host), fremde
  // so wie hinterlegt. UTM der Tuer-Adresse reist nur in Ziele auf diesem
  // Host, nie zu einer anderen Website (Produktseiten, Partner JobHandy):
  // frei gewaehlte Werte wie utm_campaign=max-mustermann-0170123456 wuerden
  // sonst Personenangaben an eine andere Stelle tragen.
  const url = new URL(ZIELE[ziel], req.url);
  if (url.origin === new URL(req.url).origin) {
    for (const [k, v] of Object.entries(utm)) url.searchParams.set(k, v);
  }

  const referer = req.headers.get("referer");
  const hit: WebHit = {
    kind: "cta",
    path: TUER_PFAD,
    ziel,
    client_kind: clientKindAus(req.headers),
    referrer_host: referrerHost(referer),
    from_path: eigenerHerkunftsPfad(referer, req.headers.get("host")),
    klick_typ: klickTyp(params),
    ...utm,
  };

  // Nach der Antwort senden (auf Vercel ueber waitUntil): der Klick wartet
  // nie auf die Messung.
  after(() => sendWebHit(hit));

  return antwort(NextResponse.redirect(url, 302));
}

export function POST(req: NextRequest) {
  const zielParam = req.nextUrl.searchParams.get("ziel");
  // Nur echte Pings (der Browser setzt Ping-To) mit bekanntem Ziel zaehlen.
  if (req.headers.get("ping-to") !== null && istZiel(zielParam)) {
    const herkunft = req.headers.get("ping-from") ?? req.headers.get("referer");
    const hit: WebHit = {
      kind: "cta",
      path: TUER_PFAD,
      ziel: zielParam,
      client_kind: clientKindAus(req.headers),
      from_path: eigenerHerkunftsPfad(herkunft, req.headers.get("host")),
    };
    after(() => sendWebHit(hit));
  }
  return antwort(new NextResponse(null, { status: 204 }));
}

function antwort(res: NextResponse): NextResponse {
  // Die Tuer ist ein Durchgang, keine Seite.
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  // Eine gezaehlte Weiterleitung darf kein Cache wiederverwenden.
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const dynamic = "force-dynamic";
