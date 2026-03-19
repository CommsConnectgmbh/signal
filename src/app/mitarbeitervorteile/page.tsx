"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VorteilsRechner from "@/components/VorteilsRechner";
import Link from "next/link";

const highlights = [
  {
    title: "Steuervorteil",
    text: "Ihre Mitarbeiter profitieren sofort – steuerlich begünstigt über die Payroll.",
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
    text: "Der Mitarbeitende wählt ganz einfach das Gerät seiner Wahl aus dem Katalog.",
  },
  {
    number: "02",
    title: "Gehaltsabrechnung",
    text: "Die monatliche Rate wird über die Gehaltsabrechnung abgewickelt – steuerlich begünstigt.",
  },
  {
    number: "03",
    title: "Lieferung",
    text: "Das Gerät wird direkt an die Wunschadresse geliefert. Am Ende der Laufzeit: Herauskauf für 4,76 %.",
  },
];

export default function MitarbeiterVorteilePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight">
                Mitarbeitervorteile für Ihr Unternehmen
              </h1>
              <p className="mt-4 text-lg text-[#475569] leading-relaxed">
                Exklusive Benefits für Ihre Mitarbeiter und deren Familien – steuerlich begünstigt über die Gehaltsabrechnung. Ohne Kosten, ohne Aufwand.
              </p>
              <ul className="mt-6 space-y-2">
                {["0 € Aufwand", "Auch für Familienmitglieder nutzbar", "Steuerlich begünstigt über die Lohnabrechnung"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/kontaktanfrage"
                className="mt-8 inline-flex items-center gap-2 bg-[#16A34A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#15803D] transition-colors"
              >
                Zum Vorteilsrechner
              </Link>
            </div>
            <div>
              <img
                src="/images/familie-handys.jpg"
                alt="Familie mit Geräten"
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* PROBLEM / LÖSUNG */}
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Das Problem</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Benefits ohne Wirkung.</h2>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  Viele Unternehmen wollen ihren Mitarbeitern etwas bieten, aber klassische Vorteile sind teuer, kompliziert oder werden kaum genutzt. Rabattportale sind überfüllt und austauschbar. Hardware-Zuschüsse verursachen Verwaltungsaufwand. Und echte finanzielle Entlastung für Mitarbeiter bleibt meistens aus.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Die Lösung</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Vorteile, die wirklich ankommen.</h2>
                <p className="mt-4 text-[#475569] leading-relaxed">
                  Mit Smart Signals erhalten Ihre Mitarbeiter exklusive Angebote – z. B. für Produkte wie Smartphones – steuerlich begünstigt über die Gehaltsabrechnung. Ohne Kosten für Arbeitgeber. Ein moderner Benefit, der nicht nur dem Mitarbeiter nutzt, sondern auch seiner Familie. Smart. Fair. Sofort einsetzbar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Warum Smart Signals</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Was Smart Signals auszeichnet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4 p-6 rounded-xl border border-[#E2E8F0] bg-white">
                  <div className="shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{h.title}</h3>
                    <p className="mt-1 text-sm text-[#475569]">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCHRITTE */}
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">So einfach geht’s</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">In drei Schritten zum Benefit</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-sm">
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

        <VorteilsRechner />

      </main>
      <Footer />
    </>
  );
}
