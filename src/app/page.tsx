"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import {
  kontaktProduktOptionen,
  produkteBetrieb,
  produktePrivat,
} from "@/lib/produkte";

const enter = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

const arbeitsweise = [
  {
    nummer: "01",
    titel: "Selbst gebaut, nicht weiterverkauft",
    text: "Jedes Produkt auf dieser Seite ist von uns entwickelt. Wenn etwas fehlt, entscheidet kein fremder Hersteller darüber, ob es kommt.",
  },
  {
    nummer: "02",
    titel: "Jedes Produkt steht für sich",
    text: "Sie buchen genau das Produkt, das Sie brauchen, mit eigenem Vertrag und eigenem Preis. Es gibt keine Plattform, die Sie erst kaufen müssen.",
  },
  {
    nummer: "03",
    titel: "Ein Ansprechpartner für alles",
    text: "Wer mehrere Produkte nutzt, hat trotzdem einen Ansprechpartner, eine Rechnungsstelle und einen Weg für Rückfragen.",
  },
];

export default function HomePage() {
  const [anrede, setAnrede] = useState<"herr" | "frau">("herr");
  const [produkt, setProdukt] = useState("");
  const [mitarbeiter, setMitarbeiter] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      anrede: anrede === "herr" ? "Herr" : "Frau",
      vorname: fd.get("vorname"),
      nachname: fd.get("nachname"),
      firmenname: fd.get("firmenname"),
      email: fd.get("email"),
      telefon: fd.get("telefon"),
      produkt,
      mitarbeiteranzahl: mitarbeiter,
      beschreibung: fd.get("beschreibung"),
      _honey: fd.get("_honey"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@smart-signals.de."
      );
    } finally {
      setSending(false);
    }
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
              Softwarehaus für kleine Betriebe
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-[#0F172A]"
            >
              Software für Betriebe, die keine Zeit für Software haben.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Unter Smart Signals bündeln wir die Produkte, die wir selbst
              entwickeln: Buchhaltung, Personaleinsatz, Personalvermittlung und
              mehr. Jedes läuft eigenständig, alle kommen aus einem Haus.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/produkte"
                className="inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Produkte ansehen
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <Link
                href="/partner"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#0F172A] border border-[#E2E8F0] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-colors"
              >
                Partner werden
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PRODUKT-MOSAIK: zwei große Karten, der Rest als Liste daneben */}
        <section className="py-24 md:py-28 px-4 sm:px-6 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...enter} className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                Für Betriebe
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                Vier Produkte, die im Tagesgeschäft laufen
              </h2>
              <p className="mt-3 text-[#475569] leading-relaxed">
                Jedes Produkt hat seine eigene Seite, seinen eigenen Vertrag und
                seinen eigenen Preis. Sie können mit einem anfangen und die
                anderen nie anfassen.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {produkteBetrieb.map((p, i) => (
                <motion.a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    "group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 hover:shadow-md transition-shadow " +
                    (p.featured ? "lg:col-span-2 lg:flex-row lg:items-start lg:gap-12" : "")
                  }
                >
                  <div className={p.featured ? "lg:w-1/2" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                      {p.kategorie}
                    </span>
                    <h3 className={"mt-3 font-bold text-[#0F172A] " + (p.featured ? "text-2xl sm:text-3xl" : "text-lg")}>
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[#0F172A] font-medium">{p.claim}</p>
                    <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                      {p.beschreibung}
                    </p>
                  </div>
                  <div className={"mt-6 flex flex-col " + (p.featured ? "lg:mt-0 lg:w-1/2" : "flex-1")}>
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
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2D7FF9]">
                      {p.domain}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ARBEITSWEISE: nummerierte Liste statt Karten-Grid */}
        <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.h2 {...enter} className="text-2xl sm:text-3xl font-bold tracking-tight mb-12">
              Wie wir arbeiten
            </motion.h2>
            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {arbeitsweise.map((schritt, i) => (
                <motion.div
                  key={schritt.nummer}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-8"
                >
                  <span className="text-3xl font-bold text-[#2D7FF9] tabular-nums shrink-0 w-16">
                    {schritt.nummer}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] mb-2">
                      {schritt.titel}
                    </h3>
                    <p className="text-[#475569] leading-relaxed">{schritt.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVAT */}
        <section className="py-20 md:py-24 px-4 sm:px-6 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...enter} className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
                Für Privat
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                Auch außerhalb des Betriebs
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {produktePrivat.map((p, i) => (
                <motion.a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
                  <p className="mt-2 text-sm text-[#475569] leading-relaxed">{p.claim}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D7FF9]">
                    {p.domain}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNER-BAND */}
        <section className="py-24 px-4 sm:px-6 bg-[#0F172A]">
          <motion.div {...enter} className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
              Partnerprogramm
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sie beraten Betriebe. Wir liefern die Software.
            </h2>
            <p className="mt-4 text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              Ein Rahmenvertrag für das gesamte Portfolio statt eines Vertrags
              je Produkt. Sie empfehlen, wir schließen ab und rechnen ab.
            </p>
            <Link
              href="/partner"
              className="mt-8 inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
            >
              Zum Partnerprogramm
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </motion.div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* KONTAKTFORMULAR */}
        <section className="py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center">
              <Image src="/logo.png" alt="Smart Signals" width={600} height={319} className="max-w-[240px] w-full h-auto" />
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
                  {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                    <label htmlFor="company_website">Website</label>
                    <input id="company_website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <fieldset className="flex gap-4">
                    <legend className="sr-only">Anrede</legend>
                    {(["herr", "frau"] as const).map((a) => (
                      <button key={a} type="button" onClick={() => setAnrede(a)} aria-pressed={anrede === a}
                        className={"flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors " + (anrede === a ? "border-[#2D7FF9] bg-[#EFF6FF] text-[#2D7FF9]" : "border-[#E2E8F0] text-[#475569]")}>
                        <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 " + (anrede === a ? "border-[#2D7FF9]" : "border-[#94A3B8]")}>
                          {anrede === a && <span className="w-2 h-2 rounded-full bg-[#2D7FF9]" />}
                        </span>
                        {a === "herr" ? "Herr" : "Frau"}
                      </button>
                    ))}
                  </fieldset>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="vorname" className="sr-only">Vorname</label>
                      <input id="vorname" name="vorname" type="text" autoComplete="given-name" required placeholder="Vorname" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                    </div>
                    <div>
                      <label htmlFor="nachname" className="sr-only">Nachname</label>
                      <input id="nachname" name="nachname" type="text" autoComplete="family-name" required placeholder="Nachname" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="firmenname" className="block text-sm font-medium text-[#0F172A] mb-1">Firmenname</label>
                    <input id="firmenname" name="firmenname" type="text" autoComplete="organization" required placeholder="Geben Sie Ihren offiziellen Firmennamen ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1">E-Mail-Adresse</label>
                    <input id="email" name="email" required type="email" autoComplete="email" placeholder="beispiel@firma.de" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="telefon" className="block text-sm font-medium text-[#0F172A] mb-1">Telefon</label>
                    <input id="telefon" name="telefon" type="tel" autoComplete="tel" placeholder="Geben Sie Ihre Telefonnummer ein" className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="produkt" className="block text-sm font-medium text-[#0F172A] mb-1">Produktauswahl</label>
                    <select id="produkt" name="produkt" value={produkt} onChange={(e) => setProdukt(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#2D7FF9] bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option</option>
                      {kontaktProduktOptionen.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mitarbeiteranzahl" className="block text-sm font-medium text-[#0F172A] mb-1">Mitarbeiteranzahl</label>
                    <select id="mitarbeiteranzahl" name="mitarbeiteranzahl" value={mitarbeiter} onChange={(e) => setMitarbeiter(e.target.value)}
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#475569] focus:outline-none focus:border-[#2D7FF9] bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option aus</option>
                      <option>1-10</option>
                      <option>10-50</option>
                      <option>50-250</option>
                      <option>250+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="beschreibung" className="block text-sm font-medium text-[#0F172A] mb-1">Beschreibung (optional)</label>
                    <textarea id="beschreibung" name="beschreibung" rows={3} placeholder="Beschreiben Sie kurz das Thema Ihrer Anfrage"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] resize-none transition-colors bg-white" />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-[#DC2626]">{error}</p>
                  )}
                  <button type="submit" disabled={sending} className="w-full bg-[#F08A3A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#D97320] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? "Wird gesendet …" : "Anfrage einreichen"}
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
