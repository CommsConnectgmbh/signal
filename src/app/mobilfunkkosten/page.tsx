"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const highlights = [
  {
    title: "Gemeinsam stark",
    text: "Aus hunderten Verträgen werden tausende Rufnummern, und damit eine Verhandlungsposition, die einzelne Unternehmen nicht erreichen.",
  },
  {
    title: "Doppelte Vorteile",
    text: "Großkundenrabatte durch Bündelung plus individuelle Optimierung jedes einzelnen Vertrags.",
  },
  {
    title: "Sicher und fair",
    text: "Klare Maximalpreise, volle Transparenz bei allen Konditionen, keine versteckten Kosten.",
  },
  {
    title: "Spürbare Einsparungen",
    text: "Deutlich geringere Mobilfunkkosten: messbar, nachvollziehbar, ab dem ersten Monat wirksam.",
  },
];

const steps = [
  {
    number: "01",
    title: "Analyse",
    text: "Wir analysieren Ihre aktuellen Verträge und Kosten, kostenlos und unverbindlich.",
  },
  {
    number: "02",
    title: "Bündelung",
    text: "Ihr Volumen wird mit unserem Netzwerk gebündelt und erzielt Großkundenkonditionen.",
  },
  {
    number: "03",
    title: "Einsparung",
    text: "Sie erhalten optimierte Verträge und sparen sofort, ohne Kündigung Ihrer alten Verträge.",
  },
];

// Beispielrechnung: 100-Mitarbeiter-Unternehmen
const exampleRows = [
  { label: "Tarifpreis pro Anschluss", before: "29,90 €", after: "18,90 €" },
  { label: "Datenvolumen", before: "20 GB", after: "Unlimited" },
  { label: "Mindestvertragslaufzeit", before: "24 Mon.", after: "1–24 Mon." },
  { label: "Servicepauschale", before: "4,90 €", after: "0,00 €" },
  { label: "Monatskosten gesamt (100 AP)", before: "3.480 €", after: "1.890 €" },
];

export default function MobilfunkkostenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO — kompaktes Statement statt 2-col-Image-Hero */}
        <section className="bg-white pt-32 pb-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-4">Procurement</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.05] tracking-tight max-w-4xl">
              Mobilfunkkosten senken durch Bündelung.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#475569] leading-relaxed">
              Wir bündeln das Volumen unserer Kunden zu einem Auftragsblock, der einzeln nicht verhandelbar ist. Sie erhalten Großkundenkonditionen, auch wenn Sie 50 oder 200 SIM-Karten haben.
            </p>
            <div className="mt-8">
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Kostenanalyse anfragen
              </Link>
            </div>
          </div>
        </section>

        {/* SPEC-TABLE: konkretes Vorher / Nachher statt Stock-Photo */}
        <section className="bg-[#F8FAFC] py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Beispielrechnung</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">Konkret: 100 Mitarbeiter, ein Jahr Pooling.</h2>
            <p className="text-[#475569] mb-10 max-w-2xl">
              Ein anonymisierter Vergleich aus dem letzten Onboarding. Ihre Konditionen variieren je nach Volumen und Anbieter.
            </p>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <tr>
                    <th className="py-4 px-4 sm:px-6 text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Position</th>
                    <th className="py-4 px-4 sm:px-6 text-xs font-semibold uppercase tracking-widest text-[#94A3B8] text-right">Vorher</th>
                    <th className="py-4 px-4 sm:px-6 text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] text-right">Nach Pooling</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleRows.map((row, i) => (
                    <tr key={row.label} className={"border-b border-[#E2E8F0] last:border-b-0 " + (i === exampleRows.length - 1 ? "bg-[#EFF6FF]/40 font-semibold" : "")}>
                      <td className="py-4 px-4 sm:px-6 text-sm text-[#0F172A]">{row.label}</td>
                      <td className="py-4 px-4 sm:px-6 text-sm text-[#475569] text-right tabular-nums">{row.before}</td>
                      <td className="py-4 px-4 sm:px-6 text-sm text-[#0F172A] text-right tabular-nums">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-[#94A3B8]">
              Quelle: Onboarding eines Bestandskunden 2026. Tarife anonymisiert.
            </p>
          </div>
        </section>

        {/* WIE ES FUNKTIONIERT — vertikale Steps */}
        <section className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">So funktioniert es</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">In drei Schritten zu niedrigeren Kosten</h2>
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

        {/* HIGHLIGHTS — kompaktes 2-Spalten-Grid mit Border-Trennung */}
        <section className="bg-[#F8FAFC] py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Unsere Stärken</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Warum Smart Signals beim Mobilfunk?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {highlights.map((h) => (
                <div key={h.title} className="border-l-2 border-[#2D7FF9] pl-6">
                  <h3 className="font-semibold text-[#0F172A]">{h.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-32 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Bis zu 30 % sparen, sofort.</h2>
            <p className="mt-4 text-[#475569]">Lassen Sie uns Ihre aktuellen Mobilfunkkosten analysieren, kostenlos und unverbindlich.</p>
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
