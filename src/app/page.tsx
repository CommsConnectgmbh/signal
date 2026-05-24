"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

export default function HomePage() {
  const [anrede, setAnrede] = useState<"herr" | "frau">("herr");
  const [produkt, setProdukt] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-[#0F172A] overflow-x-hidden">

        {/* HERO */}
        <section className="flex items-center justify-center min-h-[70vh] px-4 sm:px-6 pt-32 pb-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#2D7FF9]/20 bg-[#EFF6FF] text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#2D7FF9] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2D7FF9]" />
              </span>
              Pre-Launch &middot; Smart Signals
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-[#0F172A]"
            >
              Klare Signale aus Ihrem Telco-Stack.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Smart Signals buendelt Mobilfunk, 5G-Konnektivitaet und Mitarbeiter-Benefits zu einem belastbaren B2B-Stack fuer den Mittelstand. Neutral, verhandelt, ausgelagert.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Waitlist beitreten
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#0F172A] border border-[#E2E8F0] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-colors"
              >
                Mehr erfahren
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PRODUKT-MOSAIK: 1 großes Featured-Card + 2 kleinere — bricht das 3er-Grid auf */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">

              {/* Featured Card (spans 2 cols, 2 rows on lg) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 lg:row-span-2 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href="/mitarbeitervorteile" className="block h-full flex flex-col">
                  <div className="aspect-[16/9] overflow-hidden bg-[#EFF6FF]">
                    <img src="/images/familie-handys.jpg" alt="Mitarbeiter Vorteilsprogramm" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">Mitarbeiter-Benefits</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
                      Smartphones als Steuer-Benefit
                    </h3>
                    <p className="text-[#475569] mb-6 leading-relaxed">
                      Smartphones, Tablets und Laptops für Ihre Mitarbeiter und deren Familien, steuerlich begünstigt über die Gehaltsabrechnung. Kein Aufwand für den Arbeitgeber.
                    </p>
                    <ul className="space-y-2 mb-8">
                      {["Arbeitgeber-Benefit ohne Kosten", "Exklusive Konditionen für Ihre Mitarbeiter", "Auch für Familienmitglieder nutzbar"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D7FF9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 text-[#2D7FF9] font-semibold text-sm">
                      Mehr erfahren
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2 (top right) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href="/mobilfunkkosten" className="block h-full p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3 block">Procurement</span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                    Mobilfunkkosten senken
                  </h3>
                  <p className="text-sm text-[#475569] mb-4">
                    Wir bündeln Ihr Mobilfunkvolumen mit dem unserer Kunden und erreichen Konditionen, die einzelne Unternehmen nicht verhandeln können.
                  </p>
                  <p className="text-2xl font-bold text-[#0F172A] mb-1">bis zu 30 %</p>
                  <p className="text-xs text-[#94A3B8]">Einsparung gegenüber Ihrem aktuellen Vertrag</p>
                </Link>
              </motion.div>

              {/* Card 3 (bottom right) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href="/5g-koffer" className="block h-full p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3 block">Konnektivität</span>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                    5G Koffersystem
                  </h3>
                  <p className="text-sm text-[#475569] mb-4">
                    Einstecken, starten, online. Für Baustellen, Events und als Ausfallsicherung.
                  </p>
                  <p className="text-2xl font-bold text-[#0F172A] mb-1">{"< 60 s"}</p>
                  <p className="text-xs text-[#94A3B8]">vom Auspacken bis zur Verbindung</p>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* KONTAKTFORMULAR */}
        <section className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="Smart Signals" className="max-w-[240px] w-full" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktanfrage</h2>
              {submitted ? (
                <div className="bg-[#FFF1E5] border border-[#F08A3A]/30 rounded-lg p-8 text-center">
                  <p className="text-[#D97320] font-semibold text-lg">Vielen Dank für Ihre Anfrage.</p>
                  <p className="text-[#475569] text-sm mt-2">Wir melden uns in Kürze bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    {(["herr", "frau"] as const).map((a) => (
                      <button key={a} type="button" onClick={() => setAnrede(a)}
                        className={"flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors " + (anrede === a ? "border-[#2D7FF9] bg-[#EFF6FF] text-[#2D7FF9]" : "border-[#E2E8F0] text-[#475569]")}>
                        <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 " + (anrede === a ? "border-[#2D7FF9]" : "border-[#94A3B8]")}>
                          {anrede === a && <span className="w-2 h-2 rounded-full bg-[#2D7FF9]" />}
                        </span>
                        {a === "herr" ? "Herr" : "Frau"}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Vorname" className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                    <input required placeholder="Nachname" className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Firmenname</label>
                    <input required placeholder="Geben Sie Ihren offiziellen Firmennamen ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">E-Mail-Adresse</label>
                    <input required type="email" placeholder="beispiel@firma.de" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Telefon</label>
                    <input placeholder="Geben Sie Ihre Telefonnummer ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Produktauswahl</label>
                    <select value={produkt} onChange={(e) => setProdukt(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#2D7FF9] bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option</option>
                      <option>Mitarbeiter Benefits</option>
                      <option>Mobilfunkkosten senken</option>
                      <option>5G Koffersystem</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Mitarbeiteranzahl</label>
                    <select value={mitarbeiter} onChange={(e) => setMitarbeiter(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#2D7FF9] bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option aus</option>
                      <option>0-50</option>
                      <option>50-100</option>
                      <option>100-500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Beschreibung (optional)</label>
                    <textarea rows={3} placeholder="Beschreiben Sie kurz das Thema Ihrer Anfrage"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] resize-none transition-colors bg-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#F08A3A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#D97320] transition-colors">
                    Anfrage einreichen
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
