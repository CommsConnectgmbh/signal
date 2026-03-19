"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const highlights = [
  {
    title: "Gemeinsam stark",
    text: "Aus hunderten werden tausende Nummern – und damit eine Verhandlungsposition, die einzelne Unternehmen nie erreichen.",
  },
  {
    title: "Doppelte Vorteile",
    text: "Großkundenrabatte durch Bündelung plus individuelle Optimierung jedes einzelnen Vertrags.",
  },
  {
    title: "Sicher & fair",
    text: "Klare Maximalpreise, volle Transparenz bei allen Konditionen und keine versteckten Kosten.",
  },
  {
    title: "Spürbare Einsparungen",
    text: "Deutlich geringere Mobilfunkkosten – messbar, nachvollziehbar und ab dem ersten Monat wirksam.",
  },
];

const steps = [
  {
    number: "01",
    title: "Analyse",
    text: "Wir analysieren Ihre aktuellen Verträge und Kosten – kostenlos und unverbindlich.",
  },
  {
    number: "02",
    title: "Bündelung",
    text: "Ihr Volumen wird mit unserem Netzwerk gebündelt und erzielt so Großkundenkonditionen.",
  },
  {
    number: "03",
    title: "Einsparung",
    text: "Sie erhalten optimierte Verträge und sparen sofort – ohne Kündigung Ihrer alten Verträge.",
  },
];

export default function MobilfunkkostenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight">
                Mobilfunkkosten senken
              </h1>
              <p className="mt-4 text-lg text-[#475569] leading-relaxed">
                Wir bündeln alle Kunden und Rufnummern in unserem Portfolio. So entsteht ein Auftragsvolumen, das kein Einzelkunde erreichen kann.
              </p>
              <ul className="mt-6 space-y-2">
                {["Stärkere Verhandlungsposition", "Direkte Kostenvorteile", "Maximale Transparenz"].map((item) => (
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
                Jetzt anfragen
              </Link>
            </div>
            <div>
              <img
                src="/images/mobilfunkkosten.jpg"
                alt="Mobilfunkkosten senken"
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* WIE ES FUNKTIONIERT */}
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">So funktioniert’s</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">In drei Schritten zu niedrigeren Kosten</h2>
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

        {/* HIGHLIGHTS */}
        <section className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Unsere Stärken</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Warum Smart Signals beim Mobilfunk?</h2>
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

        {/* CTA */}
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Bis zu 30 % sparen – sofort</h2>
            <p className="mt-4 text-[#475569]">Lassen Sie uns Ihre aktuellen Mobilfunkkosten analysieren – kostenlos und unverbindlich.</p>
            <Link
              href="/kontaktanfrage"
              className="mt-8 inline-flex items-center gap-2 bg-[#16A34A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#15803D] transition-colors"
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
