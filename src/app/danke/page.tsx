// Landeseite hinter dem Knopf auf Metas Dankeseite.
//
// Warum es diese Seite ueberhaupt gibt: Der Moment direkt nach dem Absenden
// des Instant-Formulars ist der einzige, in dem jemand noch Aufmerksamkeit
// fuer die Apps hat. Eine Mail spaeter erreicht davon nur einen Bruchteil,
// weil Formular-Leads ueberproportional Wegwerf-Adressen angeben. Der Knopf
// ist deshalb der Hauptweg, die Mail ist die zweite Chance.
//
// Und der eigentliche Grund fuer eine eigene Seite statt eines direkten
// Links auf belegify.app: Metas Dankeseite hat genau EINEN Knopf, aber es
// gibt zwei Apps. Hier stehen beide, jede mit eigenem utm_content, damit
// hinterher messbar ist, welche der beiden getragen hat. Ohne das waere die
// Kampagne eine Blackbox mit huebscher Lead-Zahl (gleiche Lehre wie bei der
// Briefkampagne im August, siehe Kommentar in /links).
//
// Die Plaetze werden VERGEBEN, nicht verlost. Kein Losentscheid, keine
// Ziehung, damit gar keine Gewinnspielmechanik entsteht. Wortlaut hier
// deshalb konsequent "Bewerbung" und "Vergabe", nie "Verlosung".

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { produkte, type Produkt } from "@/lib/produkte";

export const metadata: Metadata = {
  title: "Bewerbung für den Wiesn Tisch bestätigt",
  description:
    "Die Bewerbung für einen Platz an der Smart Signals Wiesn 2026 ist angekommen.",
  alternates: { canonical: "https://smart-signals.de/danke" },
  // Kein Index: Die Seite ergibt nur direkt nach dem Formular Sinn.
  robots: { index: false, follow: false },
};

const BEWERBUNGSSCHLUSS = "19.09.2026";
const VERGABE = "20.09.2026";

/* Genau zwei Apps, bewusst. Eine dritte verwaessert bei diesem Budget die
   Botschaft und die Auswertung gleichermassen. */
const GEZEIGT: { slug: string; ueberschrift: string; nutzen: string }[] = [
  {
    slug: "belegify",
    ueberschrift: "Bewirtungsbelege mit Belegify",
    nutzen:
      "Belegify erfasst Anlass, Teilnehmer und Trinkgeld direkt zum fotografierten Restaurantbeleg. Daraus entsteht ein prüfsicheres PDF, das die Steuerkanzlei direkt verarbeiten kann.",
  },
  {
    slug: "simvi",
    ueberschrift: "Einfach verbunden mit Simvi",
    nutzen:
      "Simvi bietet älteren Menschen einen übersichtlichen Messenger mit großer Schrift, großen Knöpfen und einem einzigen Knopf für den Notruf. Erwachsene Kinder können die App für Eltern oder Großeltern einrichten.",
  },
];

/** Jeder Ausgang traegt Marker, sonst ist die Kampagne nicht auswertbar. */
function mitMarker(url: string, slot: string) {
  const marker =
    "utm_source=meta&utm_medium=paid&utm_campaign=wiesn2026&utm_content=" + slot;
  return url + (url.includes("?") ? "&" : "?") + marker;
}

const schleierStil: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(10,7,4,0.72) 0%, rgba(10,7,4,0.34) 26%, rgba(10,7,4,0.34) 72%, rgba(10,7,4,0.76) 100%)",
};

export default function DankePage() {
  const karten = GEZEIGT.map((k) => ({
    ...k,
    produkt: produkte.find((p) => p.slug === k.slug) as Produkt,
  })).filter((k) => k.produkt);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#0A0704] text-white">
      <Image
        src="/images/wiesn-kaefer.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={schleierStil} />

      <header className="relative z-10 flex justify-center pt-8">
        <Link href="/" aria-label="Zur Smart-Signals-Startseite">
          <Image
            src="/logo.png"
            alt="Smart Signals"
            width={600}
            height={319}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 py-14">
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-3xl bg-white p-6 text-text-primary shadow-lg sm:p-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
              <svg
                className="h-10 w-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="mb-4 text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Bewerbung für den Wiesn Tisch bestätigt
            </h1>
            <p className="mb-3 text-center text-lg leading-relaxed text-text-secondary">
              Die Bewerbung ist angekommen. Bewerbungsschluss ist der{" "}
              {BEWERBUNGSSCHLUSS}. Die Zusagen werden am {VERGABE} verschickt.
            </p>
            <p className="mb-10 text-center leading-relaxed text-text-secondary">
              Bis dahin lohnt sich ein Blick auf die zwei Apps von Smart
              Signals für Situationen, die im Alltag schnell wichtig werden.
            </p>

            <div className="space-y-5">
              {karten.map(({ slug, ueberschrift, nutzen, produkt }) => (
                <div
                  key={slug}
                  className="ss-card overflow-hidden rounded-2xl border border-border bg-white text-left"
                >
                  <a
                    href={mitMarker(produkt.url, slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden"
                  >
                    <Image
                      src={`/images/wiesn-apps/${slug}.webp`}
                      alt={`${produkt.name} ansehen`}
                      width={960}
                      height={600}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </a>
                  <div className="p-6">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">
                      {produkt.kategorie}
                    </p>
                    <h2 className="mb-2 text-xl font-bold text-text-primary">
                      {ueberschrift}
                    </h2>
                    <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                      {nutzen}
                    </p>
                    <a
                      href={mitMarker(produkt.url, slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      {produkt.name} ansehen
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-text-muted">
              Hinweise zur Bewerbung und das Impressum sind unten auf der Seite
              verlinkt.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 pb-8 text-center text-xs text-white/60">
        <p>
          Eine Aktion der Comms Connect GmbH
          {" · "}
          <Link href="/impressum" className="underline hover:text-white">
            Impressum
          </Link>
          {" · "}
          <Link href="/datenschutz" className="underline hover:text-white">
            Datenschutz
          </Link>
          {" · "}
          <Link href="/wiesn2026/teilnahmebedingungen" className="underline hover:text-white">
            Bedingungen
          </Link>
        </p>
      </footer>
    </div>
  );
}
