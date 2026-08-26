"use client";

// Aktionsseite zur Firmen Connect Wiesn am 26.09.2026 (Kaefer Wiesn-Schaenke).
// Verlost werden Einzelplaetze: Gruppen tragen sich einzeln ein und verlinken
// sich ueber das Gruppen-Feld. Die Danke-Ansicht zeigt das zum gewaehlten
// Thema passende Produkt aus dem Portfolio.
// Nicht in der Navbar verlinkt, der Einstieg laeuft ueber den Instagram-Post
// (/wiesn leitet per next.config.ts hierher weiter).

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { produkte, type Produkt } from "@/lib/produkte";

const PLAETZE = 6;
const ANMELDESCHLUSS = "18.09.2026";
const ZIEHUNG = "21.09.2026";

type Thema = {
  key: string;
  label: string;
  detail: string;
  produktSlug: string | null;
};

const THEMEN: Thema[] = [
  {
    key: "belege",
    label: "Belege und Buchhaltung",
    detail: "Belege erfassen und an die Kanzlei übergeben",
    produktSlug: "belegify",
  },
  {
    key: "personal",
    label: "Personaleinsatz und Zeiterfassung",
    detail: "Wer arbeitet heute an welchem Standort",
    produktSlug: "obacht",
  },
  {
    key: "unterwegs",
    label: "Arbeiten von unterwegs",
    detail: "Der eigene Rechner, bedienbar vom Handy",
    produktSlug: "conduit",
  },
  {
    key: "kollegen",
    label: "Tipprunden mit Kollegen",
    detail: "Challenges im Team anlegen und nachhalten",
    produktSlug: "dealbuddy",
  },
  {
    key: "familie",
    label: "Familie und ältere Angehörige",
    detail: "Messenger und Notruf für Großeltern",
    produktSlug: "simvi",
  },
  {
    key: "golf",
    label: "Golfrunden mit Freunden",
    detail: "Turniere anlegen, Ergebnisse auswerten",
    produktSlug: "swing-and-savor",
  },
  {
    key: "mittagstisch",
    label: "Gäste für den Mittagstisch",
    detail: "Dein Tagesangebot auf der Karte, ein Foto genügt",
    produktSlug: "tagesteller",
  },
  {
    key: "partner",
    label: "Software empfehlen und mitverdienen",
    detail: "Das Smart-Signals-Partnerprogramm",
    produktSlug: null,
  },
];

function produktZuThema(key: string): Produkt | null {
  const thema = THEMEN.find((t) => t.key === key);
  if (!thema || !thema.produktSlug) return null;
  return produkte.find((p) => p.slug === thema.produktSlug) ?? null;
}

export default function WiesnPage() {
  const [form, setForm] = useState({
    name: "",
    firmenname: "",
    email: "",
    gruppe: "",
  });
  const [thema, setThema] = useState("");
  const [datenschutz, setDatenschutz] = useState(false);
  const [honey, setHoney] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!thema) {
      setError("Bitte wähle noch ein Thema aus.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const label = THEMEN.find((t) => t.key === thema)?.label ?? thema;
      const res = await fetch("/api/wiesn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, thema: label, _honey: honey }),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } catch {
      setError(
        "Die Anmeldung konnte nicht gesendet werden. Versuch es bitte noch einmal oder schreib an info@smart-signals.de."
      );
    } finally {
      setSending(false);
    }
  }

  const produkt = produktZuThema(thema);

  return (
    <>
      <Navbar />
      <main className="bg-white pt-28 pb-32">
        {submitted ? (
          <section className="max-w-2xl mx-auto px-6 text-center pt-12">
            <div className="w-20 h-20 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-4">
              Du bist im Lostopf.
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-12">
              Wir ziehen die Plätze am {ZIEHUNG} und melden uns per E-Mail.
              Schön, wenn es klappt: Rainer Roloff sitzt selbst mit am Tisch.
            </p>

            {produkt ? (
              <div className="text-left border border-border rounded-2xl p-8 shadow-sm">
                <p className="text-xs uppercase tracking-widest font-semibold text-brand mb-3">
                  Passt zu deinem Thema
                </p>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {produkt.name}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {produkt.beschreibung}
                </p>
                <a
                  href={produkt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors"
                >
                  {produkt.name} ausprobieren
                </a>
                <p className="text-xs text-text-muted mt-3">
                  Kein Muss für die Verlosung. Aber ein guter Gesprächseinstieg am Tisch.
                </p>
              </div>
            ) : (
              <div className="text-left border border-border rounded-2xl p-8 shadow-sm">
                <p className="text-xs uppercase tracking-widest font-semibold text-brand mb-3">
                  Passt zu deinem Thema
                </p>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Das Partnerprogramm
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Sieben eigene Software-Produkte, ein Rahmenvertrag. Du
                  empfiehlst, wir schließen ab, rechnen ab und machen den
                  Support. Auf der Wiesn erzählen wir dir gern, wie das läuft.
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors"
                >
                  Zum Partnerprogramm
                </Link>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-16">
              <p className="text-xs uppercase tracking-widest font-semibold text-brand mb-4">
                Firmen Connect Wiesn 2026
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
                Ein Tisch im Käfer-Zelt.
                <br />
                {PLAETZE} Plätze zu vergeben.
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Am Samstag, 26.09.2026, sitzen wir mit Unternehmern und
                Selbstständigen in der Käfer Wiesn-Schänke auf dem
                Oktoberfest. Verlost werden Einzelplätze: Kommt ihr als
                Gruppe, trägt sich jeder selbst ein und nennt die anderen.
                Rainer Roloff ist selbst am Tisch.
              </p>
            </section>

            {/* Eckdaten */}
            <section className="max-w-3xl mx-auto px-6 mb-20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                {[
                  ["Datum", "Sa., 26.09.2026"],
                  ["Ort", "Käfer Wiesn-Schänke"],
                  ["Plätze", String(PLAETZE)],
                  ["Anmeldung bis", ANMELDESCHLUSS],
                ].map(([label, value]) => (
                  <div key={label} className="bg-surface p-5 text-center">
                    <p className="text-xs text-text-muted mb-1">{label}</p>
                    <p className="text-sm font-semibold text-text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Formular */}
            <section className="max-w-2xl mx-auto px-6">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor="company_website">Website</label>
                  <input
                    id="company_website"
                    name="_honey"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                  />
                </div>

                {/* Schritt 1: Kontaktdaten */}
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-brand">01</span>
                    <h2 className="text-2xl font-bold text-text-primary">Wer kommt?</h2>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Jeder Platz wird einzeln verlost. Kommt ihr zu mehreren,
                    trägt sich jeder selbst ein und nennt unten die Gruppe.
                  </p>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Vor- und Nachname"
                    />
                  </div>
                  <div>
                    <label htmlFor="firmenname" className="block text-sm font-medium text-text-primary mb-2">
                      Firma
                    </label>
                    <input
                      type="text"
                      id="firmenname"
                      name="firmenname"
                      value={form.firmenname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Deine Firma"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="deine@email.de"
                    />
                  </div>
                  <div>
                    <label htmlFor="gruppe" className="block text-sm font-medium text-text-primary mb-2">
                      Deine Gruppe{" "}
                      <span className="text-text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="gruppe"
                      name="gruppe"
                      value={form.gruppe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Namen oder Gruppenname, z. B. Team Huber"
                    />
                    <p className="text-xs text-text-muted mt-2">
                      So wissen wir, wer zusammengehört. Eintragen muss sich
                      trotzdem jeder selbst.
                    </p>
                  </div>
                </div>

                {/* Schritt 2: Thema */}
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-brand">02</span>
                    <h2 className="text-2xl font-bold text-text-primary">
                      Was treibt dich gerade um?
                    </h2>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Eine Antwort genügt. So wissen wir, worüber wir am Tisch
                    reden, und zeigen dir danach das passende Werkzeug.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {THEMEN.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => {
                          setThema(t.key);
                          setError(null);
                        }}
                        aria-pressed={thema === t.key}
                        className={
                          "text-left p-4 rounded-xl border transition-colors " +
                          (thema === t.key
                            ? "border-brand bg-brand-soft"
                            : "border-border bg-surface hover:border-brand")
                        }
                      >
                        <p className="text-sm font-semibold text-text-primary">{t.label}</p>
                        <p className="text-xs text-text-muted mt-1">{t.detail}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Datenschutz + Submit */}
                <div className="space-y-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={datenschutz}
                      onChange={(e) => setDatenschutz(e.target.checked)}
                      required
                      className="mt-1 w-4 h-4 accent-brand"
                    />
                    <span className="text-sm text-text-secondary">
                      Ich bin einverstanden, dass meine Angaben zur Abwicklung
                      der Verlosung und zur Kontaktaufnahme rund um den Abend
                      verwendet werden. Details in der{" "}
                      <Link href="/datenschutz" className="text-brand hover:text-brand-hover underline">
                        Datenschutzerklärung
                      </Link>
                      .
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="text-sm text-danger text-center">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Wird gesendet ..." : "In den Lostopf"}
                  </button>

                  <p className="text-xs text-text-muted text-center leading-relaxed">
                    Teilnahme bis {ANMELDESCHLUSS}, Ziehung am {ZIEHUNG}.
                    Verlost werden Einzelplätze. Die Gewinner werden per
                    E-Mail benachrichtigt. Der Platz am
                    Tisch ist nicht übertragbar, eine Barauszahlung ist nicht
                    möglich, der Rechtsweg ist ausgeschlossen. Veranstalter der
                    Verlosung ist die Comms Connect GmbH.
                  </p>
                </div>
              </form>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
