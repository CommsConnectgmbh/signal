"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const useCases = [
  {
    title: "Baustellen",
    description: "Konnektivität auf der Baustelle – auch tief unten.",
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
    description: "Festnetz weg – Betrieb läuft weiter.",
    tags: ["In <60s online", "Kein IT nötig", "VPN-fähig"],
  },
];

const highlights = [
  { title: "Plug & Play", text: "Keine Installation, kein Techniker. Steckdose rein – sofort online." },
  { title: "5G Ready", text: "Unterstützt alle führenden 5G-Netze für maximale Geschwindigkeit." },
  { title: "IP67 Schutz", text: "Wasser- und staubdicht für den Einsatz auf Baustellen und im Freien." },
  { title: "Dual-SIM", text: "Zwei SIM-Karten für automatisches Failover und maximale Verfügbarkeit." },
];

export default function KofferPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] leading-tight">
                5G Koffersystem
              </h1>
              <p className="mt-4 text-lg text-[#475569] leading-relaxed">
                Keine Leitungen. Keine Grenzen. 5G genau dort, wo Sie es brauchen. Einstecken. Starten.
              </p>
              <ul className="mt-6 space-y-2">
                {["Standorte in Minuten online", "5G für Baustellen, Events & Messen", "Ausfallsicherung bei Festnetz-Störung"].map((item) => (
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
                src="/images/koffer-hero.webp"
                alt="5G Koffersystem"
                className="w-full rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Einsatzbereiche</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Für jeden Einsatz gemacht</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <div key={uc.title} className="bg-white rounded-xl border border-[#E2E8F0] p-6">
                  <h3 className="font-semibold text-[#0F172A] mb-2">{uc.title}</h3>
                  <p className="text-sm text-[#475569] mb-4">{uc.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {uc.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#F0F9F0] text-[#16A34A] border border-[#16A34A]/20 px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-10">Was das Koffersystem auszeichnet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4 p-6 rounded-xl border border-[#E2E8F0]">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">In 60 Sekunden online – überall</h2>
            <p className="mt-4 text-[#475569]">Erfahren Sie, wie das 5G Koffersystem Ihre Anforderungen erfüllt.</p>
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
