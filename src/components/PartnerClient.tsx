"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { produkte } from "@/lib/produkte";

// Auf dieser Seite stehen bewusst KEINE Provisionszahlen. Sätze, Laufzeiten und
// Zuordnungsfenster stehen im Rahmenvertrag und in dessen Produkt-Anlagen
// (siehe vertrieb/), nicht öffentlich: öffentliche Provisionsangaben verwässern
// den Produktpreis und verhandeln gegen uns selbst.

const enter = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

const ablauf = [
  {
    nummer: "01",
    titel: "Anmelden",
    text: "Du meldest dich über das Formular unten an. Wir schauen uns an, mit wem du arbeitest und welche Produkte dazu passen.",
  },
  {
    nummer: "02",
    titel: "Rahmenvertrag unterschreiben",
    text: "Du bekommst einen Vertrag für das gesamte Portfolio. Die Konditionen je Produkt stehen als Anlage darin. Kommt ein Produkt dazu, kommt eine Anlage dazu, du unterschreibst nicht neu.",
  },
  {
    nummer: "03",
    titel: "Empfehlen",
    text: "Du bekommst deinen Empfehlungslink, Unterlagen und Zugang zum Partnerbereich. Abgeschlossen und abgerechnet wird von uns, du musst nichts verkaufen und nichts kassieren.",
  },
  {
    nummer: "04",
    titel: "Abrechnung",
    text: "Deine Provision wird automatisch gebucht, sobald der geworbene Kunde zahlt. Die Abrechnung erstellen wir per Gutschrift, du schreibst keine Rechnung.",
  },
];

const klarstellungen = [
  {
    titel: "Du bist Vermittler, nicht Vertreter",
    text: "Du empfiehlst und stellst Kontakt her. Verträge schließen wir im eigenen Namen. Du hast keine Abschlussvollmacht und keine Inkassoberechtigung, damit auch keine Haftung für den laufenden Vertrag.",
  },
  {
    titel: "Keine Kaltakquise",
    text: "Unaufgeforderte Werbung per Mail, Telefon oder Messenger ist ausgeschlossen. Das Programm ist auf Empfehlung in bestehende Beziehungen ausgelegt, nicht auf Massenansprache.",
  },
  {
    titel: "Keine Kosten, keine Abnahme",
    text: "Die Teilnahme kostet nichts. Es gibt keine Mindestumsätze, keine Startgebühr und keine Pflicht, ein Produkt selbst zu kaufen.",
  },
  {
    titel: "Dein Vertragspartner",
    text: "Comms Connect GmbH, handelnd unter der Marke Smart Signals. Damit läuft alles über eine Gesellschaft, egal wie viele Produkte du empfiehlst.",
  },
];

export default function PartnerClient() {
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
      anrede: "",
      vorname: fd.get("vorname"),
      nachname: fd.get("nachname"),
      firmenname: fd.get("firmenname"),
      email: fd.get("email"),
      telefon: fd.get("telefon"),
      produkt: "Partnerprogramm",
      mitarbeiteranzahl: "",
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
        "Die Anmeldung konnte nicht gesendet werden. Bitte versuch es erneut oder schreib an info@smart-signals.de."
      );
    } finally {
      setSending(false);
    }
  };

  const mitProgramm = produkte.filter((p) => p.partnerprogramm === "aktiv");
  const inVorbereitung = produkte.filter((p) => p.partnerprogramm === "geplant");

  return (
    <>
      <Navbar />
      <main className="bg-white text-[#0F172A]">

        {/* HERO */}
        <section className="px-4 sm:px-6 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9]">
              Partnerprogramm
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
              Ein Vertrag für das ganze Portfolio
            </h1>
            <p className="mt-6 text-lg text-[#475569] leading-relaxed max-w-2xl">
              Du berätst Betriebe, Kanzleien oder Vereine und weißt, wo es hakt.
              Wir haben die Software dafür. Du empfiehlst, wir schließen ab und
              rechnen ab. Statt eines Vertrags je Produkt unterschreibst du
              einmal für alles.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#anmeldung"
                className="inline-flex items-center justify-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
              >
                Als Partner anmelden
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-[#0F172A] border border-[#E2E8F0] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-colors"
              >
                Partner-Login
              </Link>
            </div>
          </div>
        </section>

        {/* PRODUKTE IM PROGRAMM */}
        <section className="px-4 sm:px-6 py-20 md:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Was du empfehlen kannst
            </h2>
            <p className="mt-3 text-[#475569] leading-relaxed max-w-2xl">
              Die Konditionen unterscheiden sich je Produkt, weil sich die
              Produkte unterscheiden. Sie stehen als Anlage im Rahmenvertrag und
              nennen wir dir nach der Anmeldung.
            </p>

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                Programm läuft
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mitProgramm.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-lg font-bold text-[#0F172A]">{p.name}</h4>
                      <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2D7FF9]">
                        Aktiv
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#475569] leading-relaxed">{p.claim}</p>
                    <p className="mt-3 text-xs text-[#94A3B8]">{p.zielgruppe}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
                Kommt dazu
              </h3>
              <p className="mt-3 text-sm text-[#475569] leading-relaxed">
                {inVorbereitung.map((p) => p.name).join(", ")}. Für diese
                Produkte gibt es noch kein laufendes Programm. Sobald eines
                startet, kommt es als Anlage zu deinem bestehenden Vertrag dazu.
              </p>
            </div>
          </div>
        </section>

        {/* ABLAUF */}
        <section className="px-4 sm:px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10">
              So läuft es ab
            </h2>
            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {ablauf.map((schritt, i) => (
                <motion.div
                  key={schritt.nummer}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
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

        {/* KLARSTELLUNGEN */}
        <section className="px-4 sm:px-6 py-24 bg-[#0F172A]">
          <div className="mx-auto max-w-4xl">
            <motion.h2 {...enter} className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Damit es keine Missverständnisse gibt
            </motion.h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {klarstellungen.map((k, i) => (
                <motion.div
                  key={k.titel}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-base font-semibold text-white">{k.titel}</h3>
                  <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{k.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ANMELDUNG */}
        <section id="anmeldung" className="px-4 sm:px-6 py-24 md:py-32 scroll-mt-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Als Partner anmelden
            </h2>
            <p className="mt-3 text-[#475569] leading-relaxed">
              Wir melden uns mit dem Rahmenvertrag und den Konditionen. Die
              Teilnahme steht Unternehmern offen, Verbraucher können nicht
              teilnehmen.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#F08A3A]/30 bg-[#FFF1E5] p-8 text-center">
                <p className="text-lg font-semibold text-[#D97320]">Danke, angekommen.</p>
                <p className="mt-2 text-sm text-[#475569]">
                  Wir melden uns mit den Unterlagen bei dir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="partner_website">Website</label>
                  <input id="partner_website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="vorname" className="sr-only">Vorname</label>
                    <input id="vorname" name="vorname" type="text" autoComplete="given-name" required placeholder="Vorname"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                  <div>
                    <label htmlFor="nachname" className="sr-only">Nachname</label>
                    <input id="nachname" name="nachname" type="text" autoComplete="family-name" required placeholder="Nachname"
                      className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                  </div>
                </div>
                <div>
                  <label htmlFor="firmenname" className="block text-sm font-medium text-[#0F172A] mb-1">Firma</label>
                  <input id="firmenname" name="firmenname" type="text" autoComplete="organization" required placeholder="Name deiner Firma"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1">E-Mail-Adresse</label>
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="du@firma.de"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                </div>
                <div>
                  <label htmlFor="telefon" className="block text-sm font-medium text-[#0F172A] mb-1">Telefon (optional)</label>
                  <input id="telefon" name="telefon" type="tel" autoComplete="tel" placeholder="Für Rückfragen"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] transition-colors bg-white" />
                </div>
                <div>
                  <label htmlFor="beschreibung" className="block text-sm font-medium text-[#0F172A] mb-1">
                    Mit wem arbeitest du?
                  </label>
                  <textarea id="beschreibung" name="beschreibung" rows={3}
                    placeholder="Branche, Kundenkreis, welche Produkte dich interessieren"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm placeholder-[#94A3B8] focus:outline-none focus:border-[#2D7FF9] resize-none transition-colors bg-white" />
                </div>
                {error && <p role="alert" className="text-sm text-[#DC2626]">{error}</p>}
                <button type="submit" disabled={sending}
                  className="w-full bg-[#F08A3A] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#D97320] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? "Wird gesendet …" : "Anmeldung absenden"}
                </button>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Wir verwenden deine Angaben, um dir den Rahmenvertrag und die
                  Konditionen zu schicken. Näheres in der{" "}
                  <Link href="/datenschutz" className="underline underline-offset-2 hover:text-[#2D7FF9]">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
