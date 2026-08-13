import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInSection from "@/components/FadeInSection";
import { produkte, produkteBetrieb, produktePrivat } from "@/lib/produkte";

export const metadata = {
  title: "Produkte",
  description:
    "Alle Produkte von Smart Signals im Überblick: Belegify, Obacht, Obacht Talents, Conduit, Simvi, Swing & Savor und DealBuddy.",
  alternates: { canonical: "https://smart-signals.de/produkte" },
};

function Pfeil() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function ProduktePage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-[#0F172A]">

        {/* HERO */}
        <section className="px-4 sm:px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
              Portfolio
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
              Alles, was wir gebaut haben
            </h1>
            <p className="mt-5 text-lg text-[#475569] leading-relaxed max-w-2xl">
              Sieben Produkte, jedes mit eigener Seite, eigenem Vertrag und
              eigenem Preis. Die Preise stehen auf der jeweiligen Produktseite,
              damit sie dort aktuell bleiben.
            </p>
          </div>
        </section>

        {/* SPEC-TABLE: Überblick */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Produkt</th>
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Wofür</th>
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Für wen</th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Status</th>
                </tr>
              </thead>
              <tbody>
                {produkte.map((p) => (
                  <tr key={p.slug} className="border-b border-[#E2E8F0] align-top">
                    <td className="py-4 pr-4 font-semibold text-[#0F172A] whitespace-nowrap">{p.name}</td>
                    <td className="py-4 pr-4 text-sm text-[#475569]">{p.claim}</td>
                    <td className="py-4 pr-4 text-sm text-[#475569]">{p.zielgruppe}</td>
                    <td className="py-4 text-sm text-[#475569] whitespace-nowrap">
                      {p.status === "live" ? "Verfügbar" : "In Vorbereitung"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DETAILS: Betrieb */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">Für Betriebe</h2>
            <div className="space-y-6">
              {produkteBetrieb.map((p) => (
                <FadeInSection key={p.slug}>
                  <article className="rounded-2xl border border-[#E2E8F0] bg-white p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start">
                      <div className="md:w-1/2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                          {p.kategorie}
                        </span>
                        <h3 className="mt-3 text-xl font-bold text-[#0F172A]">{p.name}</h3>
                        <p className="mt-2 font-medium text-[#0F172A]">{p.claim}</p>
                        <p className="mt-3 text-sm text-[#475569] leading-relaxed">{p.beschreibung}</p>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D7FF9] hover:text-[#1F66D6] transition-colors"
                        >
                          {p.domain}
                          <Pfeil />
                        </a>
                      </div>
                      <div className="md:w-1/2">
                        <ul className="space-y-2">
                          {p.punkte.map((punkt) => (
                            <li key={punkt} className="flex items-start gap-2 text-sm text-[#475569]">
                              <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D7FF9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              {punkt}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-xs text-[#94A3B8]">{p.zielgruppe}</p>
                      </div>
                    </div>
                  </article>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* MITARBEITERVORTEILE */}
        <section className="px-4 sm:px-6 py-20 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                Arbeitgeber
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Mitarbeitervorteile</h2>
              <p className="mt-3 text-[#475569] leading-relaxed max-w-2xl">
                Neben der eigenen Software vermitteln wir ein Geräte-Benefit-
                Programm für Belegschaften: Mitarbeitende mieten Technik über den
                Arbeitgeber, für das Unternehmen kostenfrei. Anbieter ist
                JobHandy, wir stellen nur den Kontakt her.
              </p>
              <Link
                href="/mitarbeitervorteile"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2D7FF9] hover:text-[#1F66D6] transition-colors"
              >
                Mitarbeitervorteile ansehen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* PRIVAT */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">Für Privat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {produktePrivat.map((p) => (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                      {p.kategorie}
                    </span>
                    {p.status === "vorbereitung" && (
                      <span className="rounded-full bg-[#FFF1E5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#D97320]">
                        In Vorbereitung
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#475569] leading-relaxed">{p.beschreibung}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D7FF9]">
                    {p.domain}
                    <Pfeil />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-32 md:py-40 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Nicht sicher, was zu Ihrem Betrieb passt?
            </h2>
            <p className="mt-4 text-[#475569] leading-relaxed">
              Schreiben Sie uns, womit Sie sich gerade herumschlagen. Wenn keines
              unserer Produkte passt, sagen wir das auch.
            </p>
            <Link
              href="/kontaktanfrage"
              className="mt-8 inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
            >
              Anfrage stellen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
