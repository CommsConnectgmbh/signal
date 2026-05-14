"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VorteilsRechner from "@/components/VorteilsRechner";
import Link from "next/link";

const highlights = [
  {
    title: "Steuervorteil",
    text: "Ihre Mitarbeiter profitieren sofort, steuerlich begünstigt über die Payroll.",
  },
  {
    title: "Familien inklusive",
    text: "Partner, Kinder und Eltern können die Vorteile ebenfalls nutzen.",
  },
  {
    title: "0 € Aufwand für Arbeitgeber",
    text: "Keine Implementierung, keine Verwaltung, kein Risiko.",
  },
  {
    title: "Messbarer Nutzen",
    text: "Ein Benefit, der echte Entlastung schafft und Ihre Arbeitgebermarke stärkt.",
  },
];

const steps = [
  {
    number: "01",
    title: "Gerät auswählen",
    text: "Der Mitarbeitende wählt das Gerät seiner Wahl aus dem Katalog.",
  },
  {
    number: "02",
    title: "Gehaltsabrechnung",
    text: "Die monatliche Rate läuft steuerlich begünstigt über die Gehaltsabrechnung.",
  },
  {
    number: "03",
    title: "Lieferung",
    text: "Das Gerät kommt direkt an die Wunschadresse. Am Ende der Laufzeit: Herauskauf für 4,76 %.",
  },
];

export default function MitarbeiterVorteilePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO — kompakter, ohne identische 2-col-Image-Optik */}
        <section className="bg-white pt-32 pb-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-4">Mitarbeiter-Benefits</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.08] tracking-tight">
              Smartphones, die Ihre Mitarbeiter wirklich bekommen.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-[#475569] leading-relaxed">
              Exklusive Geräte-Konditionen für Ihr Team und deren Familien, steuerlich begünstigt über die Gehaltsabrechnung. Ohne Kosten, ohne Aufwand für den Arbeitgeber.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#rechner"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Zum Vorteilsrechner
              </a>
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 text-[#2D7FF9] font-semibold px-6 py-3.5 text-base hover:text-[#1F66D6] transition-colors"
              >
                Beratung anfragen
              </Link>
            </div>
          </div>
        </section>

        {/* CALCULATOR-FIRST: VorteilsRechner direkt nach Hero (statt am Ende) */}
        <VorteilsRechner />

        {/* PROBLEM / LÖSUNG */}
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Das Problem</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Benefits ohne Wirkung.</h2>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  Viele Unternehmen wollen ihren Mitarbeitern etwas bieten, aber klassische Vorteile sind teuer, kompliziert oder werden kaum genutzt. Rabattportale sind überfüllt und austauschbar, Hardware-Zuschüsse verursachen Verwaltungsaufwand, und echte finanzielle Entlastung bleibt meist aus.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Die Lösung</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Vorteile, die wirklich ankommen.</h2>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  Mit Smart Signals erhalten Ihre Mitarbeiter exklusive Angebote, zum Beispiel für Smartphones, steuerlich begünstigt über die Gehaltsabrechnung. Ohne Kosten für den Arbeitgeber, mit Wirkung bis in die Familien Ihrer Mitarbeiter. Smart. Fair. Sofort einsetzbar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS — Numbered Editorial-Liste statt 4-Card-Grid */}
        <section className="bg-[#F8FAFC] py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Warum Smart Signals</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-12">Was Smart Signals auszeichnet</h2>
            <ol className="space-y-10">
              {highlights.map((h, i) => (
                <li key={h.title} className="flex gap-6 items-start border-b border-[#E2E8F0] pb-10 last:border-b-0 last:pb-0">
                  <span className="text-4xl font-bold text-[#2D7FF9] tabular-nums shrink-0 w-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#0F172A]">{h.title}</h3>
                    <p className="mt-2 text-base text-[#475569] leading-relaxed">{h.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SCHRITTE — horizontale Stepper */}
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">So einfach geht es</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">In drei Schritten zum Benefit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#2D7FF9] text-white flex items-center justify-center font-bold text-sm">
                    {s.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{s.title}</h3>
                    <p className="mt-1 text-sm text-[#475569]">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F8FAFC] py-32 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Bereit für einen Benefit, der wirkt?</h2>
            <p className="mt-4 text-[#475569]">Wir zeigen Ihnen in einem kurzen Gespräch, wie Smart Signals in Ihrem Unternehmen läuft.</p>
            <Link
              href="/kontaktanfrage"
              className="mt-8 inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
            >
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
