import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { referrerHost } from "@/lib/analytics/classify";
import {
  clientKindAus,
  istDokumentAufruf,
  istGezaehlterPfad,
  klickTyp,
  normalizePath,
  sendWebHit,
  utmAus,
} from "@/lib/analytics/web-hit";

// Serverseitige Reichweitenmessung.
//
// Im Proxy (Next 16, vormals Middleware) und nicht in den Seiten: die Seiten
// sind statisch und kommen aus dem Edge-Cache, eine Zaehlung im Rendering
// liefe bei Cache-Treffern gar nicht. Nicht im Browser: ein Script dort griffe
// auf das Endgeraet zu (§ 25 TDDDG). Hier wird nur ausgewertet, was die
// Anfrage ohnehin mitbringt, und nichts Personenbezogenes gespeichert.
//
// Es wird KEIN Cookie gesetzt und keine Antwort veraendert.
export function proxy(req: NextRequest, event: NextFetchEvent) {
  const path = normalizePath(req.nextUrl.pathname);

  if (
    istGezaehlterPfad(path) &&
    istDokumentAufruf({
      method: req.method,
      pathname: path,
      secFetchDest: req.headers.get("sec-fetch-dest"),
      accept: req.headers.get("accept"),
    })
  ) {
    const params = req.nextUrl.searchParams;
    // waitUntil statt await: die Seite wartet nie auf die Messung.
    event.waitUntil(
      sendWebHit({
        kind: "view",
        path,
        client_kind: clientKindAus(req.headers),
        referrer_host: referrerHost(req.headers.get("referer")),
        klick_typ: klickTyp(params),
        ...utmAus(params),
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  // Assets, Bilder, API und Dateien mit Endung erreichen den Proxy gar nicht
  // erst. Die feinere Pruefung steht in istDokumentAufruf.
  matcher: ["/((?!_next/static|_next/image|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
