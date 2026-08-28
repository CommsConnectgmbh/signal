// Teilnahmebedingungen der Wiesn-Verlosung.
//
// Bewusst eine eigene Serverkomponente mit eigenem metadata-Block: Die Seite
// wird aus einem Instagram-Beitrag heraus verlinkt und muss dort eine eigene
// Vorschau haben. /wiesn2026 selbst ist "use client" und kann das nicht.
//
// Inhaltlich das Pflichtprogramm fuer ein Gewinnspiel in Deutschland:
// Veranstalter, Teilnahmeweg, Frist, Ziehung, Gewinn, Mindestalter und der
// Hinweis, dass Instagram nichts damit zu tun hat. Kein Einsatz, keine
// Kaufpflicht, damit bleibt es ein Gewinnspiel und wird kein Gluecksspiel.
// "Der Rechtsweg ist ausgeschlossen" steht bewusst NICHT drin, die Klausel
// ist in Deutschland unwirksam und macht die Bedingungen nur angreifbar.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teilnahmebedingungen Wiesn-Verlosung 2026 · Smart Signals",
  description:
    "Teilnahmebedingungen der Verlosung von 2 × 2 Plätzen in der Käfer Wiesn-Schänke am 26.09.2026.",
  alternates: { canonical: "https://smart-signals.de/wiesn2026/teilnahmebedingungen" },
  robots: { index: false, follow: true },
};

const ABSCHNITTE: { titel: string; text: string[] }[] = [
  {
    titel: "1. Veranstalter",
    text: [
      "Comms Connect GmbH, Tal 30, 80331 München, handelnd unter der Marke Smart Signals. " +
        "Eingetragen im Handelsregister München unter HRB 295951. Kontakt: info@smart-signals.de.",
    ],
  },
  {
    titel: "2. Gewinn",
    text: [
      "Verlost werden zwei Gewinne zu je zwei Plätzen am Tisch der Comms Connect GmbH in der " +
        "Käfer Wiesn-Schänke auf dem Oktoberfest München am Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr.",
      "Enthalten sind der Sitzplatz sowie Speisen und Getränke am Tisch im üblichen Rahmen. " +
        "Nicht enthalten sind An- und Abreise, Übernachtung und sonstige Kosten.",
      "Eine Barauszahlung, ein Umtausch oder eine Übertragung des Gewinns auf einen anderen Termin " +
        "sind nicht möglich. Der Gewinn ist auf eine andere Person übertragbar, wenn uns das bis zum " +
        "22.09.2026 mitgeteilt wird.",
    ],
  },
  {
    titel: "3. Teilnahme",
    text: [
      "Teilnahmeberechtigt sind natürliche Personen mit Wohnsitz in Deutschland, Österreich oder der " +
        "Schweiz, die am Tag der Ziehung das 18. Lebensjahr vollendet haben. Das Mindestalter ergibt " +
        "sich daraus, dass am Tisch alkoholische Getränke ausgeschenkt werden.",
      "Die Teilnahme erfolgt, indem der Verlosungsbeitrag auf dem Instagram-Konto @smartsignals.de " +
        "kommentiert wird. Wer den Beitrag zusätzlich in seiner Instagram-Story teilt und dabei " +
        "@smartsignals.de markiert, nimmt mit einem zweiten Los teil.",
      "Die Teilnahme ist kostenlos. Es ist kein Kauf und keine Zahlung erforderlich. Pro Person " +
        "werden höchstens zwei Lose gewertet.",
      "Ausgeschlossen sind Mitarbeiterinnen und Mitarbeiter der Comms Connect GmbH und deren Angehörige.",
    ],
  },
  {
    titel: "4. Frist und Ziehung",
    text: [
      "Teilnahmeschluss ist der 15.09.2026 um 23:59 Uhr. Danach eingehende Kommentare nehmen nicht teil.",
      "Die Gewinner werden am 16.09.2026 unter allen gültigen Losen ausgelost. Die Benachrichtigung " +
        "erfolgt über eine Direktnachricht auf Instagram. Meldet sich eine gewinnende Person nicht " +
        "innerhalb von 48 Stunden zurück, wird der Gewinn neu ausgelost.",
    ],
  },
  {
    titel: "5. Daten",
    text: [
      "Für die Durchführung verarbeiten wir den Instagram-Benutzernamen, den Kommentar und, im " +
        "Gewinnfall, den Namen zur Anmeldung am Tisch. Die Daten werden ausschließlich für die " +
        "Verlosung und die Durchführung der Veranstaltung genutzt und spätestens einen Monat nach " +
        "der Veranstaltung gelöscht. Eine Weitergabe an Dritte findet nicht statt, abgesehen von der " +
        "zur Tischreservierung erforderlichen Namensliste gegenüber dem Wiesn-Betrieb.",
      "Einzelheiten stehen in unserer Datenschutzerklärung.",
    ],
  },
  {
    titel: "6. Sonstiges",
    text: [
      "Diese Aktion steht in keiner Verbindung zu Instagram oder Meta und wird von Instagram weder " +
        "gesponsert noch unterstützt oder organisiert. Ansprüche aus der Verlosung richten sich " +
        "ausschließlich gegen die Comms Connect GmbH.",
      "Wir behalten uns vor, die Verlosung abzubrechen oder zu ändern, wenn sie aus technischen oder " +
        "rechtlichen Gründen nicht ordnungsgemäß durchgeführt werden kann. Sollte eine Bestimmung " +
        "dieser Bedingungen unwirksam sein, bleiben die übrigen wirksam.",
      "Stand: 29.08.2026.",
    ],
  },
];

export default function Teilnahmebedingungen() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand">Wiesn 2026</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Teilnahmebedingungen der Verlosung
      </h1>
      <p className="mt-4 text-text-secondary">
        2 × 2 Plätze in der Käfer Wiesn-Schänke am Samstag, 26.09.2026.
      </p>

      <div className="mt-12 space-y-10">
        {ABSCHNITTE.map((a) => (
          <section key={a.titel}>
            <h2 className="text-lg font-bold text-text-primary">{a.titel}</h2>
            <div className="mt-3 space-y-3">
              {a.text.map((t, i) => (
                <p key={i} className="text-sm leading-relaxed text-text-secondary">{t}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-border pt-6 text-sm text-text-muted">
        <Link href="/wiesn2026" className="text-brand hover:underline">Zurück zur Aktionsseite</Link>
        {" · "}
        <Link href="/impressum" className="text-brand hover:underline">Impressum</Link>
        {" · "}
        <Link href="/datenschutz" className="text-brand hover:underline">Datenschutz</Link>
      </p>
    </main>
  );
}
