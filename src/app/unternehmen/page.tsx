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

      <main className="bg-white text-[#0F172A]">

        {/* HERO */}
        <section className="px-4 sm:px-6 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
              Unternehmen
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
              Ein Softwarehaus, kein Wiederverkäufer
            </h1>
            <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-2xl">
              Smart Signals ist die Marke, unter der die Comms Connect GmbH ihre
              eigenen Software-Produkte führt. Was hier steht, haben wir gebaut,
              betreiben wir selbst und verantworten wir auch.
            </p>
          </div>
        </section>

        {/* MARKE UND RECHTSTRÄGER */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Marke und Rechtsträger
            </h2>
            <div className="mt-8 space-y-5 text-[#475569] leading-relaxed">
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
                  className="text-[#2D7FF9] hover:text-[#1F66D6] underline underline-offset-2"
                >
                  comms-connect.de
                </a>{" "}
                richtig. Wer Software für seinen Betrieb sucht, hier.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#E2E8F0] pt-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Betreiber</dt>
                <dd className="mt-2 text-sm text-[#0F172A]">Comms Connect GmbH, München</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Produkte</dt>
                <dd className="mt-2 text-sm text-[#0F172A]">{produkte.length} eigene Anwendungen</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Betrieb</dt>
                <dd className="mt-2 text-sm text-[#0F172A]">Server in der EU</dd>
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
            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {grundsaetze.map((g) => (
                <div key={g.titel} className="py-8">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                    {g.titel}
                  </h3>
                  <p className="mt-2 text-[#475569] leading-relaxed">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-32 md:py-40 bg-[#F8FAFC]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Sehen Sie sich an, was wir gebaut haben
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/produkte"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Produkte ansehen
              </Link>
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#0F172A] border border-[#E2E8F0] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-colors"
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
