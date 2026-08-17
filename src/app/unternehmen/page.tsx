import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { produkte } from "@/lib/produkte";

export const metadata = {
  title: "Unternehmen",
  description:
    "Smart Signals ist die Produktmarke der Comms Connect GmbH. Wer dahinter steht, wie wir arbeiten und warum die Software von der Telekommunikation getrennt ist.",
  alternates: { canonical: "https://smart-signals.de/unternehmen" },
};

const grundsaetze = [
  {
    titel: "Wir bauen selbst",
    text: "Jedes Produkt unter dieser Marke ist von uns entwickelt. Wir vertreiben keine fremde Software weiter und sind deshalb nicht davon abhängig, ob ein anderer Hersteller eine Lücke schließt.",
  },
  {
    titel: "Wir bauen für kleine Betriebe",
    text: "Unsere Kunden haben keine IT-Abteilung. Was eine halbe Stunde Einarbeitung braucht, wird nicht benutzt. Deshalb ist jedes Produkt so gebaut, dass es nach dem ersten Öffnen verständlich ist.",
  },
  {
    titel: "Ein Produkt reicht",
    text: "Es gibt kein Paket, das man erst kaufen muss, und keine Grundgebühr für das Portfolio. Wer nur Belege digitalisieren will, zahlt nur dafür.",
  },
  {
    titel: "Wir sagen auch ab",
    text: "Wenn keines unserer Produkte zu einem Problem passt, sagen wir das. Ein Kunde, der das Falsche gekauft hat, kostet beide Seiten mehr, als er einbringt.",
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-text-primary">

        {/* HERO */}
        <section className="px-4 sm:px-6 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Unternehmen
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
              Ein Softwarehaus, kein Wiederverkäufer
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
              Smart Signals ist die Marke, unter der die Comms Connect GmbH ihre
              eigenen Software-Produkte führt. Was hier steht, haben wir gebaut,
              betreiben wir selbst und verantworten wir auch.
            </p>
          </div>
        </section>

        {/* MARKE UND RECHTSTRÄGER */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-surface">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Marke und Rechtsträger
            </h2>
            <div className="mt-8 space-y-5 text-text-secondary leading-relaxed">
              <p>
                Betreiber und Vertragspartner aller hier gelisteten Angebote ist
                die Comms Connect GmbH mit Sitz in München. Smart Signals ist die
                Produktmarke dieser Gesellschaft, keine eigene Firma. Rechnungen,
                Auftragsverarbeitungsverträge und Support laufen entsprechend über
                die Comms Connect GmbH.
              </p>
              <p>
                Die Trennung hat einen Grund: Die Comms Connect GmbH ist im
                Telekommunikationsgeschäft zu Hause und verhandelt dort Verträge
                für Unternehmen. Software ist ein anderes Geschäft mit anderen
                Kunden, anderen Zyklen und anderen Erwartungen. Deshalb führen wir
                sie unter einem eigenen Namen. Wer Mobilfunk sucht, ist auf{" "}
                <a
                  href="https://comms-connect.de"
                  target="_blank"
                  rel="noopener"
                  className="text-brand hover:text-brand-hover underline underline-offset-2"
                >
                  comms-connect.de
                </a>{" "}
                richtig. Wer Software für seinen Betrieb sucht, hier.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">Betreiber</dt>
                <dd className="mt-2 text-sm text-text-primary">Comms Connect GmbH, München</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">Produkte</dt>
                <dd className="mt-2 text-sm text-text-primary">{produkte.length} eigene Anwendungen</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">Betrieb</dt>
                <dd className="mt-2 text-sm text-text-primary">Server in der EU</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* GRUNDSÄTZE */}
        <section className="px-4 sm:px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
              Wonach wir entscheiden
            </h2>
            <div className="divide-y divide-border border-y border-border">
              {grundsaetze.map((g) => (
                <div key={g.titel} className="py-8">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    {g.titel}
                  </h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-32 md:py-40 bg-surface">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Sehen Sie sich an, was wir gebaut haben
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/produkte"
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-accent-hover transition-colors"
              >
                Produkte ansehen
              </Link>
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-text-primary border border-border hover:border-brand hover:text-brand transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
