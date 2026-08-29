// Die Seite hinter dem Link in der Instagram-Bio.
//
// Warum eine eigene Seite statt Linktree: ein Klick weniger als ein fremder
// Dienst, kein fremdes Branding, keine Besucherdaten bei einem US-Anbieter,
// waehrend der restliche Stack EU-gehostet ist. Und warum ueberhaupt eine
// Seite statt der fuenf Links, die Instagram erlaubt: Fuenf Links klickt
// niemand durch, einer schon.
//
// Jeder Ausgang traegt utm-Marker. Das ist der Punkt, an dem die
// Briefkampagne im August gescheitert ist: Der Obacht-QR zeigte ohne Marker
// auf die Startseite, neun Tage lang war nicht messbar, ob ueberhaupt jemand
// scannte. Das hier ist die Gegenmassnahme, sie kostet nichts.
//
// Reihenfolge ist Absicht: Was gerade laeuft steht oben. Nach dem 19.09.
// faellt die Wiesn-Zeile automatisch raus, damit niemand ins Leere klickt.

import type { Metadata } from "next";
import Image from "next/image";
import { produkte } from "@/lib/produkte";

export const metadata: Metadata = {
  title: "Smart Signals: alle Produkte auf einen Blick",
  description:
    "Belegify, Obacht, Obacht Talents, Conduit, Tagesteller, Simvi, Swing & Savor und DealBuddy. Produktmarke der Comms Connect GmbH aus München.",
  alternates: { canonical: "https://smart-signals.de/links" },
  robots: { index: false, follow: true },
};

const WIESN_BIS = new Date("2026-09-19T23:59:59+02:00");

function marker(slot: string) {
  return `utm_source=instagram&utm_medium=bio&utm_campaign=links&utm_content=${slot}`;
}
function mitMarker(url: string, slot: string) {
  return url + (url.includes("?") ? "&" : "?") + marker(slot);
}

type Zeile = { titel: string; unter: string; url: string; slot: string; bild?: string };

export default function Links() {
  const jetzt = new Date();
  const wiesnLaeuft = jetzt <= WIESN_BIS;

  const oben: Zeile[] = wiesnLaeuft
    ? [{
        titel: "Wiesn 2026: Platz am Tisch",
        unter: "26.09. in der Käfer Wiesn-Schänke. Anmeldung bis 19.09.",
        url: "/wiesn2026",
        slot: "wiesn",
      }]
    : [];

  const produktZeilen: Zeile[] = produkte
    .filter((p) => p.status === "live")
    .map((p) => ({
      titel: p.name,
      unter: p.claim,
      url: p.url,
      slot: p.slug,
      bild: `/images/produkte/${p.slug}.webp`,
    }));

  const unten: Zeile[] = [
    {
      titel: "Partner werden",
      unter: "Du empfiehlst, wir schließen ab und rechnen ab.",
      url: "/#anmeldung",
      slot: "partner",
    },
  ];

  const zeile = (z: Zeile, hervorgehoben = false) => {
    const intern = z.url.startsWith("/");
    const ziel = intern ? z.url : mitMarker(z.url, z.slot);
    return (
      <a
        key={z.slot}
        href={ziel}
        {...(intern ? {} : { target: "_blank", rel: "noopener" })}
        className={[
          "flex items-center gap-4 rounded-2xl border px-5 py-4 transition-colors",
          hervorgehoben
            ? "border-accent bg-accent-soft hover:bg-accent-soft/70"
            : "border-border bg-white hover:border-brand",
        ].join(" ")}
      >
        {z.bild ? (
          <Image
            src={z.bild}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="h-14 w-14 shrink-0 rounded-xl bg-brand-soft"
          />
        )}
        <span className="min-w-0">
          <span className="block font-semibold text-text-primary">{z.titel}</span>
          <span className="block text-sm leading-snug text-text-secondary">{z.unter}</span>
        </span>
      </a>
    );
  };

  return (
    <div className="min-h-dvh bg-surface py-10 sm:py-16">
      <main className="mx-auto max-w-md px-5 sm:max-w-3xl">
       <div className="rounded-3xl bg-white px-5 py-10 sm:px-10 sm:py-12 sm:shadow-sm sm:ring-1 sm:ring-border">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="Smart Signals"
          width={600}
          height={319}
          className="mx-auto h-12 w-auto"
          priority
        />
        <p className="mt-5 text-balance text-sm leading-relaxed text-text-secondary">
          Bewirtungsbelege DATEV-fertig. Zeit, Personal und Gäste im Griff.
          Dazu Apps für Alltag, Familie und Freizeit.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">{oben.map((z) => zeile(z, true))}</div>
        {produktZeilen.map((z) => zeile(z))}
        {unten.map((z) => zeile(z))}
      </div>

      <p className="mt-10 text-center text-xs leading-relaxed text-text-muted">
        Smart Signals ist eine Marke der Comms Connect GmbH, Tal 30, 80331 München.
        <br />
        <a href="/impressum" className="underline hover:text-text-secondary">Impressum</a>
        {" · "}
        <a href="/datenschutz" className="underline hover:text-text-secondary">Datenschutz</a>
      </p>
       </div>
      </main>
    </div>
  );
}
