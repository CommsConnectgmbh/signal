// Messpunkt fuer eine erfolgreich abgeschickte Anfrage (/api/contact).
//
// Bewusst ohne jede Formularangabe: weder Name noch Firma noch Produkt gehen
// in die Messung. Der Punkt sagt nur "eine Anfrage ist angekommen", von
// welcher eigenen Seite (Referer des Formular-Requests) und wie der Aufrufer
// eingestuft ist.

import { eigenerHerkunftsPfad, referrerHost } from "./classify";
import { clientKindAus, type WebHit } from "./web-hit";
import { TUER_PFAD } from "../tuer";

export const KONTAKT_ZIEL = "kontakt_gesendet";

export function kontaktGesendetHit(h: Headers): WebHit {
  const referer = h.get("referer");
  return {
    kind: "cta",
    // Der Messpunkt speichert nur Sitemap-Pfade und die Tuer-Pfade; als
    // /api/contact landete der Zaehler unter /:andere.
    path: TUER_PFAD,
    ziel: KONTAKT_ZIEL,
    client_kind: clientKindAus(h),
    referrer_host: referrerHost(referer),
    from_path: eigenerHerkunftsPfad(referer, h.get("host")),
  };
}
