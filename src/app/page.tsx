"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <section className="flex items-center justify-center min-h-[60vh] px-4 sm:px-6 pt-24 pb-12 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10 text-[#0F172A]"
            >
              Mitarbeiter-Benefits & Mobilfunklösungen für den Mittelstand
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 bg-[#16A34A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#15803D] transition-colors shadow-lg shadow-[#16A34A]/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Jetzt unverbindlich anfragen
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PRODUKT-KARTEN */}
        <section className="py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href="/mitarbeitervorteile" className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-[#EFF6FF]">
                    <img src="/images/familie-handys.jpg" alt="Mitarbeiter Vorteilsprogramm" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-[#0F172A] font-bold text-xl block">Mitarbeiter</span>
                      <span className="text-[#0F172A] font-bold text-xl block">Vorteilsprogramm</span>
                    </div>
                    <p className="text-[#475569] text-sm mb-4">Mitarbeiterbenefits mit Steuervorteil – etwa für Produkte wie Handys</p>
                    <ul className="space-y-2 mb-6">
                      {["Arbeitgeber-Benefit", "Unternehmen zahlen 0 €", "Exklusive Konditionen für Ihre Mitarbeiter"].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-block bg-[#16A34A] text-white text-sm font-semibold px-6 py-2.5 rounded-full">Mehr Erfahren</span>
                  </div>
                </Link>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href="/mobilfunkkosten" className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-[#EFF6FF]">
                    <img src="/images/mobilfunkkosten.jpg" alt="Mobilfunkkosten senken" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-[#0F172A] font-bold text-xl block">Mobilfunkkosten</span>
                      <span className="text-[#0F172A] font-bold text-xl block">senken</span>
                    </div>
                    <p className="text-[#475569] text-sm mb-4">Wir bündeln das Mobilfunkvolumen mehrerer Unternehmen und erzielen dadurch bessere Preise.</p>
                    <ul className="space-y-2 mb-6">
                      {["Bis zu 30 % sparen.", "Sparen dank Volumenbündelung", "Verträge, die halten, was sie versprechen."].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-block bg-[#16A34A] text-white text-sm font-semibold px-6 py-2.5 rounded-full">Mehr Erfahren</span>
                  </div>
                </Link>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href="/5g-koffer" className="block">
                  <div className="aspect-[4/3] overflow-hidden bg-[#FFF8E1]">
                    <img src="/images/5g-koffersystem.jpg" alt="5G Koffersystem" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-[#0F172A] font-bold text-xl block">5G</span>
                      <span className="text-[#0F172A] font-bold text-xl block">Koffersystem</span>
                    </div>
                    <p className="text-[#475569] text-sm mb-4">Keine Leitungen. Keine Grenzen. 5G genau dort, wo Sie es brauchen. Einstecken. Starten.</p>
                    <ul className="space-y-2 mb-6">
                      {["Standorte in Minuten online.", "5G für Baustellen, Events & Messen.", "Ausfallsicherung bei Festnetz-Störung."].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-block bg-[#16A34A] text-white text-sm font-semibold px-6 py-2.5 rounded-full">Mehr Erfahren</span>
                  </div>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* KONTAKTFORMULAR */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <img src="/logo.png" alt="Smart Signals" className="max-w-[240px] w-full" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktanfrage</h2>
              {submitted ? (
                <div className="bg-[#F0F9F0] border border-[#16A34A]/30 rounded-lg p-8 text-center">
                  <p className="text-[#16A34A] font-semibold text-lg">Vielen Dank für Ihre Anfrage!</p>
                  <p className="text-[#475569] text-sm mt-2">Wir melden uns in Kürze bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    {(["herr", "frau"] as const).map((a) => (
                      <button key={a} type="button" onClick={() => setAnrede(a)}
                        className={"flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors " + (anrede === a ? "border-[#16A34A] bg-[#F0F9F0] text-[#16A34A]" : "border-[#E2E8F0] text-[#475569]")}>
                        <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 " + (anrede === a ? "border-[#16A34A]" : "border-[#94A3B8]")}>
                          {anrede === a && <span className="w-2 h-2 rounded-full bg-[#16A34A]" />}
                        </span>
                        {a === "herr" ? "Herr" : "Frau"}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Vorname" className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] transition-colors" />
                    <input required placeholder="Nachname" className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Firmenname</label>
                    <input required placeholder="Gebe Deinen offiziellen Firmennamen ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Emailadresse</label>
                    <input required type="email" placeholder="beispiel@gmx.de" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Telefon</label>
                    <input placeholder="Geben Sie Ihre Telefonnummer ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Produktauswahl</label>
                    <select value={produkt} onChange={(e) => setProdukt(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#16A34A] bg-white transition-colors">
                      <option value="" disabled>Wähle die richtige Option</option>
                      <option>Mitarbeiter Benefits</option>
                      <option>Mobilfunkkosten senken</option>
                      <option>5G Koffersystem</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Mitarbeiteranzahl</label>
                    <select value={mitarbeiter} onChange={(e) => setMitarbeiter(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#16A34A] bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option aus</option>
                      <option>0-50</option>
                      <option>50-100</option>
                      <option>100-500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1">Beschreibung (optional)</label>
                    <textarea rows={3} placeholder="Beschreibe kurz das Thema Deiner Anfrage"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#16A34A] resize-none transition-colors" />
                  </div>
                  <button type="submit" className="w-full bg-[#16A34A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#15803D] transition-colors">
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
