"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const useCases = [
  {
    title: "Baustellen",
    description: "Konnektivität auf der Baustelle, auch tief unten.",
    tags: ["Plug & Play <60s", "500m WLAN", "IP67"],
  },
  {
    title: "Keller & Funklöcher",
    description: "Internet dorthin bringen, wo Mobilfunk nicht hinkommt.",
    tags: ["25m Cat6-Kabel", "Kein Techniker"],
  },
  {
    title: "Events & Messen",
    description: "Enterprise-WLAN für jede Veranstaltung.",
    tags: ["Dediziertes WLAN", "Unabhängig vom Mobilnetz"],
  },
  {
    title: "Netzfreiheit",
    description: "Jede SIM. Jeder Anbieter. Kein Vendor Lock-in.",
    tags: ["eSIM + Dual-SIM", "Auto-Failover", "Alle Netze"],
  },
  {
    title: "Starlink-Backup",
    description: "Kein Mobilfunk? Dann kommt das Internet von oben.",
    tags: ["WAN-Port", "Starlink-kompatibel", "Weltweit"],
  },
  {
    title: "Ausfallsicherung",
    description: "Festnetz weg, Betrieb läuft weiter.",
    tags: ["In <60s online", "Kein IT nötig", "VPN-fähig"],
  },
];

// Spec-Sheet-Daten für Overlay
const heroSpecs = [
  { label: "Plug & Play", value: "<60s" },
  { label: "WLAN-Reichweite", value: "500m" },
  { label: "Schutzklasse", value: "IP67" },
  { label: "SIM-Slots", value: "Dual + eSIM" },
];

export default function KofferPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* FULL-BLEED-HERO mit Spec-Overlay statt 2-Col-Stock-Foto */}
        <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#050A14]">
          <img
            src="/images/koffer-hero.webp"
            alt="5G Koffersystem"
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/60 to-transparent" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 w-full">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-4">Konnektivität</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight max-w-3xl">
              5G überall, wo Sie es brauchen.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              Keine Leitungen, keine Techniker, keine Wartezeit. Einstecken, starten, online. Für Baustellen, Events und als Ausfallsicherung im Festnetz.
            </p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
              {heroSpecs.map((spec) => (
                <div key={spec.label}>
                  <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">{spec.value}</p>
                  <p className="text-xs uppercase tracking-widest text-white/60 mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Anfrage stellen
              </Link>
            </div>
          </div>
        </section>

        {/* USE CASES — bleibt 3-Card-Grid, jetzt mit Brand-Tag */}
        <section className="bg-white py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Einsatzbereiche</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Für jeden Einsatz gemacht.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <div key={uc.title} className="bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-[#0F172A] mb-2">{uc.title}</h3>
                  <p className="text-sm text-[#475569] mb-4">{uc.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#EFF6FF] text-[#2D7FF9] border border-[#2D7FF9]/20 px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS — Spec-Table-Layout statt 4-Card-Grid */}
        <section className="bg-[#F8FAFC] py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Was das Koffersystem auszeichnet.</h2>
            <dl className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6">
                <dt className="text-base font-semibold text-[#0F172A]">Plug & Play</dt>
                <dd className="sm:col-span-2 text-sm text-[#475569] leading-relaxed">Keine Installation, kein Techniker. Steckdose rein, sofort online.</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6">
                <dt className="text-base font-semibold text-[#0F172A]">5G Ready</dt>
                <dd className="sm:col-span-2 text-sm text-[#475569] leading-relaxed">Unterstützt alle führenden 5G-Netze für maximale Geschwindigkeit.</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6">
                <dt className="text-base font-semibold text-[#0F172A]">IP67 Schutz</dt>
                <dd className="sm:col-span-2 text-sm text-[#475569] leading-relaxed">Wasser- und staubdicht für den Einsatz auf Baustellen und im Freien.</dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-6">
                <dt className="text-base font-semibold text-[#0F172A]">Dual-SIM</dt>
                <dd className="sm:col-span-2 text-sm text-[#475569] leading-relaxed">Zwei SIM-Karten für automatisches Failover und maximale Verfügbarkeit.</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-32 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">In 60 Sekunden online, überall.</h2>
            <p className="mt-4 text-[#475569]">Wir zeigen Ihnen, wie das 5G Koffersystem in Ihrem Szenario performt.</p>
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
