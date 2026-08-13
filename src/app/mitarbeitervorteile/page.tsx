import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Das Geräte-Benefit-Programm betreiben wir nicht selbst. Anbieter ist
// JobHandy; Comms Connect stellt nur den Kontakt her. Deshalb zeigt diese
// Seite keine Konditionen, keine Preise und keinen Ersparnis-Rechner: Zahlen
// zu einem fremden Angebot können wir nicht verantworten, und sie veralten,
// ohne dass es hier jemand merkt.

const JOBHANDY_URL =
  "https://www.jobhandy.io/?utm_source=smart-signals.de&utm_medium=referral";

export const metadata = {
  title: "Mitarbeitervorteile",
  description:
    "Geräte-Benefit für Belegschaften: Mitarbeitende mieten Technik über den Arbeitgeber, für das Unternehmen kostenfrei. Anbieter ist JobHandy, wir stellen den Kontakt her.",
  alternates: { canonical: "https://smart-signals.de/mitarbeitervorteile" },
};

const punkte = [
  {
    titel: "Kostenfrei für den Arbeitgeber",
    text: "Das Programm verursacht für das Unternehmen keine Anschaffungskosten. Die Rate trägt der Mitarbeitende über die Gehaltsabrechnung.",
  },
  {
    titel: "Spürbar für die Belegschaft",
    text: "Mitarbeitende bekommen Technik zu Konditionen, die sie privat nicht bekommen. Ein Benefit, den man anfassen kann, statt eines weiteren Rabattportals.",
  },
  {
    titel: "Wenig Verwaltung",
    text: "Der Anbieter wickelt Auswahl, Vertrag und Lieferung ab. In der Lohnbuchhaltung bleibt die monatliche Rate.",
  },
];

const schritte = [
  {
    nummer: "01",
    titel: "Kontakt",
    text: "Sie sagen uns kurz, wie groß Ihr Team ist und worum es geht. Wir stellen den Kontakt zu JobHandy her.",
  },
  {
    nummer: "02",
    titel: "Einrichtung",
    text: "JobHandy klärt Konditionen, Vertrag und die Anbindung an Ihre Lohnabrechnung direkt mit Ihnen.",
  },
  {
    nummer: "03",
    titel: "Nutzung",
    text: "Ihre Mitarbeitenden wählen ihr Gerät, die Rate läuft über die Gehaltsabrechnung.",
  },
];

export default function MitarbeiterVorteilePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-[#0F172A]">

        {/* HERO */}
        <section className="px-4 sm:px-6 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
              Mitarbeitervorteile
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
              Technik als Benefit, ohne Kosten für den Betrieb
            </h1>
            <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-2xl">
              Mitarbeitende mieten Smartphones, Tablets oder Laptops über den
              Arbeitgeber und zahlen die Rate über die Gehaltsabrechnung. Für das
              Unternehmen entstehen keine Anschaffungskosten.
            </p>
            <p className="mt-4 text-lg text-[#475569] leading-relaxed max-w-2xl">
              Dieses Programm betreiben wir nicht selbst. Anbieter ist{" "}
              <a
                href={JOBHANDY_URL}
                target="_blank"
                rel="noopener"
                className="text-[#2D7FF9] hover:text-[#1F66D6] underline underline-offset-2"
              >
                JobHandy
              </a>
              . Wir kennen die Leute dahinter und stellen den Kontakt her.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={JOBHANDY_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Zu JobHandy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#0F172A] border border-[#E2E8F0] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-colors"
              >
                Über uns Kontakt herstellen
              </Link>
            </div>
          </div>
        </section>

        {/* WOFÜR DAS GUT IST */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
              Wofür das gut ist
            </h2>
            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {punkte.map((p) => (
                <div key={p.titel} className="py-8">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                    {p.titel}
                  </h3>
                  <p className="mt-2 text-[#475569] leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-[#94A3B8] leading-relaxed">
              Welche Geräte, Laufzeiten und Konditionen möglich sind und wie das
              steuerlich in Ihrem Fall zu bewerten ist, sagt Ihnen JobHandy
              verbindlich. Wir nennen hier bewusst keine Zahlen zu einem Angebot,
              das wir nicht selbst verantworten.
            </p>
          </div>
        </section>

        {/* ABLAUF */}
        <section className="px-4 sm:px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
              So läuft es ab
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schritte.map((s) => (
                <div key={s.nummer} className="flex gap-4">
                  <span className="shrink-0 text-2xl font-bold text-[#2D7FF9] tabular-nums">
                    {s.nummer}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{s.titel}</h3>
                    <p className="mt-1 text-sm text-[#475569] leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENZ */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8">
              <h2 className="text-lg font-semibold text-[#0F172A]">
                Wer hier welche Rolle hat
              </h2>
              <p className="mt-3 text-[#475569] leading-relaxed">
                Ihr Vertragspartner für das Geräte-Programm ist JobHandy, nicht
                die Comms Connect GmbH. Wir vermitteln den Kontakt und erhalten
                dafür keine Vergütung. Was Sie über unsere Software-Produkte
                lesen, betreiben wir dagegen selbst.
              </p>
              <Link
                href="/produkte"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2D7FF9] hover:text-[#1F66D6] transition-colors"
              >
                Zu unseren eigenen Produkten
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-32 md:py-40 bg-[#F8FAFC]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Interesse an dem Programm?
            </h2>
            <p className="mt-4 text-[#475569] leading-relaxed">
              Gehen Sie direkt zu JobHandy oder schreiben Sie uns, dann stellen
              wir den Kontakt her.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={JOBHANDY_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Zu JobHandy
              </a>
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
