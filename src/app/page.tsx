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

const produkteLive = [...produkteBetrieb, ...produktePrivat].filter(
  (p) => p.status === "live"
);

// Bewusst nur Zahlen, die aus produkte.ts folgen. Keine Kunden- oder
// Zeitersparnis-Behauptungen, die wir nicht belegen koennen.
const heroFakten = [
  { wert: String(produkteLive.length), label: "Produkte live" },
  { wert: String(produkteBetrieb.length), label: "davon für Betriebe" },
  { wert: "0", label: "davon zugekauft" },
];

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
      <div className="min-h-screen bg-white text-text-primary overflow-x-hidden">

        {/* HERO: Split statt zentriertem Textblock. Rechts ein echter
            Produkt-Screenshot, damit die Seite zeigt, was sie verkauft. */}
        <section className="px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">

            <div>
              <div
                className="ss-rise inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand/20 bg-brand-soft text-xs font-semibold uppercase tracking-widest text-brand"
              >
                Softwarehaus für kleine Betriebe
              </div>
              <h1
                style={{ animationDelay: "50ms" }}
                className="ss-rise text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-text-primary"
              >
                Software für Betriebe, die keine Zeit für Software haben.
              </h1>
              <p
                style={{ animationDelay: "100ms" }}
                className="ss-rise text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl mb-10"
              >
                Unter Smart Signals bündeln wir die Produkte, die wir selbst
                entwickeln: Buchhaltung, Personaleinsatz, Personalvermittlung und
                mehr. Jedes läuft eigenständig, alle kommen aus einem Haus.
              </p>
              <div
                style={{ animationDelay: "160ms" }}
                className="ss-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <Link
                  href="/produkte"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-accent-hover transition-colors"
                >
                  Produkte ansehen
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
                <Link
                  href="/partner"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-text-primary border border-border hover:border-brand hover:text-brand transition-colors"
                >
                  Partner werden
                </Link>
              </div>

              <dl
                style={{ animationDelay: "220ms" }}
                className="ss-rise mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-6"
              >
                {heroFakten.map((f) => (
                  <div key={f.label}>
                    <dt className="text-2xl font-bold tracking-tight text-text-primary">
                      {f.wert}
                    </dt>
                    <dd className="mt-1 text-xs text-text-secondary leading-snug">
                      {f.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              style={{ animationDelay: "200ms" }}
              className="ss-rise lg:justify-self-end w-full max-w-md"
            >
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-center gap-2 mb-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    Belegify · Buchhaltung
                  </span>
                </div>
                {/* Screenshot laeuft unten aus dem Rahmen, statt beschnitten zu wirken */}
                <div className="mx-auto -mb-12 w-[236px] sm:w-[268px] rounded-t-[2.25rem] border border-b-0 border-border bg-white p-2 pb-0 shadow-lg">
                  <div className="relative overflow-hidden rounded-t-[1.75rem] aspect-[9/17]">
                    <Image
                      src="/images/belegify-belege.png"
                      alt="Belegify: Belegübersicht mit Kategorien wie Bewirtung, Reise und Tanken"
                      fill
                      priority
                      sizes="(min-width: 640px) 268px, 236px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-text-muted">
                Eins von {produkteLive.length} Produkten. Jedes läuft für sich.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUKT-MOSAIK: zwei große Karten, der Rest als Liste daneben */}
        <section className="py-24 md:py-28 px-4 sm:px-6 bg-surface">
          <div className="max-w-6xl mx-auto">
            <motion.div {...enter} className="mb-12 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                Für Betriebe
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                Vier Produkte, die im Tagesgeschäft laufen
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
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
                    "group flex flex-col rounded-2xl border border-border bg-white p-8 hover:shadow-md transition-shadow " +
                    (p.featured ? "lg:col-span-2 lg:flex-row lg:items-start lg:gap-12" : "")
                  }
                >
                  <div className={p.featured ? "lg:w-1/2" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                      {p.kategorie}
                    </span>
                    <h3 className={"mt-3 font-bold text-text-primary " + (p.featured ? "text-2xl sm:text-3xl" : "text-lg")}>
                      {p.name}
                    </h3>
                    <p className="mt-2 text-text-primary font-medium">{p.claim}</p>
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                      {p.beschreibung}
                    </p>
                  </div>
                  <div className={"mt-6 flex flex-col " + (p.featured ? "lg:mt-0 lg:w-1/2" : "flex-1")}>
                    <ul className="space-y-2">
                      {p.punkte.map((punkt) => (
                        <li key={punkt} className="flex items-start gap-2 text-sm text-text-secondary">
                          <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {punkt}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-text-muted">{p.zielgruppe}</p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
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
            <div className="divide-y divide-border border-y border-border">
              {arbeitsweise.map((schritt, i) => (
                <motion.div
                  key={schritt.nummer}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-10 py-8"
                >
                  <span className="text-3xl font-bold text-brand tabular-nums shrink-0 w-16">
                    {schritt.nummer}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
                      {schritt.titel}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{schritt.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVAT */}
        <section className="py-20 md:py-24 px-4 sm:px-6 bg-surface">
          <div className="max-w-6xl mx-auto">
            <motion.div {...enter} className="mb-10 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
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
                  className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                      {p.kategorie}
                    </span>
                    {p.status === "vorbereitung" && (
                      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-hover">
                        In Vorbereitung
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{p.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{p.claim}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
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
        <section className="py-24 px-4 sm:px-6 bg-text-primary">
          <motion.div {...enter} className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Partnerprogramm
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sie beraten Betriebe. Wir liefern die Software.
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed max-w-2xl mx-auto">
              Ein Rahmenvertrag für das gesamte Portfolio statt eines Vertrags
              je Produkt. Sie empfehlen, wir schließen ab und rechnen ab.
            </p>
            <Link
              href="/partner"
              className="mt-8 inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-accent-hover transition-colors"
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
              <h2 className="text-2xl font-bold text-text-primary mb-6">Kontaktanfrage</h2>
              {submitted ? (
                <div className="bg-accent-soft border border-accent/30 rounded-lg p-8 text-center">
                  <p className="text-accent-hover font-semibold text-lg">Vielen Dank für Ihre Anfrage.</p>
                  <p className="text-text-secondary text-sm mt-2">Wir melden uns in Kürze bei Ihnen.</p>
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
                        className={"flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors " + (anrede === a ? "border-brand bg-brand-soft text-brand" : "border-border text-text-secondary")}>
                        <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 " + (anrede === a ? "border-brand" : "border-text-muted")}>
                          {anrede === a && <span className="w-2 h-2 rounded-full bg-brand" />}
                        </span>
                        {a === "herr" ? "Herr" : "Frau"}
                      </button>
                    ))}
                  </fieldset>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="vorname" className="sr-only">Vorname</label>
                      <input id="vorname" name="vorname" type="text" autoComplete="given-name" required placeholder="Vorname" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white" />
                    </div>
                    <div>
                      <label htmlFor="nachname" className="sr-only">Nachname</label>
                      <input id="nachname" name="nachname" type="text" autoComplete="family-name" required placeholder="Nachname" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="firmenname" className="block text-sm font-medium text-text-primary mb-1">Firmenname</label>
                    <input id="firmenname" name="firmenname" type="text" autoComplete="organization" required placeholder="Geben Sie Ihren offiziellen Firmennamen ein" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">E-Mail-Adresse</label>
                    <input id="email" name="email" required type="email" autoComplete="email" placeholder="beispiel@firma.de" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="telefon" className="block text-sm font-medium text-text-primary mb-1">Telefon</label>
                    <input id="telefon" name="telefon" type="tel" autoComplete="tel" placeholder="Geben Sie Ihre Telefonnummer ein" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="produkt" className="block text-sm font-medium text-text-primary mb-1">Produktauswahl</label>
                    <select id="produkt" name="produkt" value={produkt} onChange={(e) => setProdukt(e.target.value)}
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:outline-none focus:border-brand bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option</option>
                      {kontaktProduktOptionen.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mitarbeiteranzahl" className="block text-sm font-medium text-text-primary mb-1">Mitarbeiteranzahl</label>
                    <select id="mitarbeiteranzahl" name="mitarbeiteranzahl" value={mitarbeiter} onChange={(e) => setMitarbeiter(e.target.value)}
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-text-secondary focus:outline-none focus:border-brand bg-white transition-colors">
                      <option value="" disabled>Wählen Sie eine Option aus</option>
                      <option>1-10</option>
                      <option>10-50</option>
                      <option>50-250</option>
                      <option>250+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="beschreibung" className="block text-sm font-medium text-text-primary mb-1">Beschreibung (optional)</label>
                    <textarea id="beschreibung" name="beschreibung" rows={3} placeholder="Beschreiben Sie kurz das Thema Ihrer Anfrage"
                      className="w-full border border-border rounded-lg px-4 py-2.5 text-sm placeholder-text-muted focus:outline-none focus:border-brand resize-none transition-colors bg-white" />
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-danger">{error}</p>
                  )}
                  <button type="submit" disabled={sending} className="w-full bg-accent text-white font-semibold py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
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
