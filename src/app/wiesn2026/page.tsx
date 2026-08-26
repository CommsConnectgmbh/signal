"use client";

// Aktionsseite zur Firmen Connect Wiesn am 26.09.2026 (Kaefer Wiesn-Schaenke).
// Die Plaetze werden VERGEBEN, nicht verlost: bewusste Auswahl, Gruppen
// bevorzugt. Kein Losentscheid, damit gar keine Gewinnspiel-/Gluecksspiel-
// Mechanik entsteht. Jeder traegt sich selbst ein und verlinkt seine Gruppe
// ueber das Gruppen-Feld.
//
// Aufbau: Aufmacher (Dekor-Ebene nach DESIGN.md Paragraph 10), dann ein
// Schritt-fuer-Schritt-Flow (eine Frage pro Ansicht, Fortschrittsanzeige),
// zum Schluss die Danke-Ansicht mit dem zum Thema passenden Produkt.
// Nicht in der Navbar verlinkt, der Einstieg laeuft ueber den Instagram-Post
// (/wiesn leitet per next.config.ts hierher weiter).

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { produkte, type Produkt } from "@/lib/produkte";

const PLAETZE = 20;
const ANMELDESCHLUSS = "18.09.2026";
const VERGABE = "21.09.2026";

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

const SCHRITTE = [
  "Wer kommt?",
  "Wie erreichen wir dich?",
  "Deine Gruppe",
  "Was treibt dich gerade um?",
  "Kurz prüfen und abschicken",
];

const ECKDATEN: Array<[string, string]> = [
  ["Datum", "Sa., 26.09.2026"],
  ["Uhrzeit", "11:30 bis 15:30 Uhr"],
  ["Ort", "Käfer Wiesn-Schänke"],
  ["Anmeldung bis", ANMELDESCHLUSS],
];

function produktZuThema(key: string): Produkt | null {
  const thema = THEMEN.find((t) => t.key === key);
  if (!thema || !thema.produktSlug) return null;
  return produkte.find((p) => p.slug === thema.produktSlug) ?? null;
}

const inputKlasse =
  "w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition";

export default function WiesnPage() {
  const [ansicht, setAnsicht] = useState<"intro" | "flow" | "fertig">("intro");
  const [schritt, setSchritt] = useState(0);
  const [form, setForm] = useState({
    name: "",
    firmenname: "",
    email: "",
    gruppe: "",
  });
  const [thema, setThema] = useState("");
  const [datenschutz, setDatenschutz] = useState(false);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ruhig = useReducedMotion();

  const stepMotion: HTMLMotionProps<"div"> = {
    initial: ruhig ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: ruhig ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: ruhig ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function weiter() {
    if (schritt === 0 && (!form.name.trim() || !form.firmenname.trim())) {
      setError("Bitte gib Name und Firma an.");
      return;
    }
    if (schritt === 1 && !/.+@.+\..+/.test(form.email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse an.");
      return;
    }
    setError(null);
    setSchritt((s) => Math.min(s + 1, SCHRITTE.length - 1));
  }

  function zurueck() {
    setError(null);
    if (schritt === 0) {
      setAnsicht("intro");
      return;
    }
    setSchritt((s) => s - 1);
  }

  function themaWaehlen(key: string) {
    setThema(key);
    setError(null);
    setSchritt(4);
  }

  async function absenden() {
    if (sending) return;
    if (!thema) {
      setError("Bitte wähle noch ein Thema aus.");
      setSchritt(3);
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
      setAnsicht("fertig");
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
  const themaLabel = THEMEN.find((t) => t.key === thema)?.label ?? "";
  const marqueeNamen = [...produkte.map((p) => p.name), "Partnerprogramm"];

  return (
    <>
      <Navbar />
      <main className="bg-white pt-20 pb-32">
        <AnimatePresence mode="wait" initial={false}>
          {ansicht === "intro" && (
            <motion.div key="intro" {...stepMotion}>
              {/* Aufmacher mit Dekor-Ebene */}
              <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24">
                <div aria-hidden className="ss-grid pointer-events-none absolute inset-0" />
                <div
                  aria-hidden
                  className="ss-glow pointer-events-none absolute -top-32 -right-24 h-[560px] w-[560px] rounded-full"
                />
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                  <p className="text-xs uppercase tracking-widest font-semibold text-brand mb-4">
                    Firmen Connect Wiesn 2026
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
                    Ein Tisch im Käfer-Zelt.
                    <br />
                    {PLAETZE} Plätze zu vergeben.
                  </h1>
                  <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                    Am Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr sitzen wir
                    mit Unternehmern und Selbstständigen in der Käfer
                    Wiesn-Schänke auf dem Oktoberfest. Trag dich ein, wir
                    vergeben die Plätze unter allen Anmeldungen, Gruppen
                    bevorzugt. Rainer Roloff ist selbst am Tisch.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAnsicht("flow");
                      window.scrollTo({ top: 0 });
                    }}
                    className="px-10 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors text-lg"
                  >
                    Platz anfragen
                  </button>
                  <p className="text-sm text-text-muted mt-4">
                    Vier kurze Fragen, eine Bestätigung. Dauert unter zwei
                    Minuten.
                  </p>
                </div>
              </section>

              {/* Eckdaten */}
              <section className="max-w-3xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ECKDATEN.map(([label, value]) => (
                    <div
                      key={label}
                      className="ss-card rounded-2xl border border-border bg-white p-5 text-center"
                    >
                      <p className="text-xs text-text-muted mb-1">{label}</p>
                      <p className="text-sm font-semibold text-text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Laufband: das Sortiment als leiser Hinweis auf den Gastgeber */}
              <div className="ss-marquee-mask border-y border-border bg-surface py-5 overflow-hidden">
                <div className="ss-marquee flex w-max">
                  {[0, 1].map((kopie) => (
                    <div key={kopie} className="flex items-center" aria-hidden={kopie === 1}>
                      {marqueeNamen.map((name) => (
                        <span
                          key={`${kopie}-${name}`}
                          className="flex items-center text-sm font-medium text-text-muted"
                        >
                          <span className="px-6">{name}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {ansicht === "flow" && (
            <motion.div key="flow" {...stepMotion}>
              <section className="max-w-xl mx-auto px-6 pt-16">
                {/* Fortschritt */}
                <div className="mb-10">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-xs uppercase tracking-widest font-semibold text-brand">
                      Firmen Connect Wiesn
                    </p>
                    <p className="text-xs text-text-muted">
                      Schritt {schritt + 1} von {SCHRITTE.length}
                    </p>
                  </div>
                  <div className="h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-300"
                      style={{ width: `${((schritt + 1) / SCHRITTE.length) * 100}%` }}
                    />
                  </div>
                </div>

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

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={schritt} {...stepMotion}>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-3">
                      {SCHRITTE[schritt]}
                    </h1>

                    {schritt === 0 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          weiter();
                        }}
                        className="space-y-6"
                      >
                        <p className="text-sm text-text-secondary">
                          Jeder trägt sich selbst ein, auch wer zu mehreren
                          kommt. Gruppen werden bei der Vergabe bevorzugt.
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
                            autoFocus
                            className={inputKlasse}
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
                            className={inputKlasse}
                            placeholder="Deine Firma"
                          />
                        </div>
                        <FlowNav zurueck={zurueck} error={error} />
                      </form>
                    )}

                    {schritt === 1 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          weiter();
                        }}
                        className="space-y-6"
                      >
                        <p className="text-sm text-text-secondary">
                          An diese Adresse geht die Zusage am {VERGABE}.
                        </p>
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
                            autoFocus
                            className={inputKlasse}
                            placeholder="deine@email.de"
                          />
                        </div>
                        <FlowNav zurueck={zurueck} error={error} />
                      </form>
                    )}

                    {schritt === 2 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          weiter();
                        }}
                        className="space-y-6"
                      >
                        <p className="text-sm text-text-secondary">
                          Kommst du mit Kollegen oder Freunden? Nenn ihre Namen
                          oder euren Gruppennamen, dann bleibt ihr bei der
                          Vergabe zusammen. Eintragen muss sich trotzdem jeder
                          selbst. Wer allein kommt, lässt das Feld einfach
                          leer.
                        </p>
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
                            autoFocus
                            className={inputKlasse}
                            placeholder="Namen oder Gruppenname, z. B. Team Huber"
                          />
                        </div>
                        <FlowNav zurueck={zurueck} error={error} />
                      </form>
                    )}

                    {schritt === 3 && (
                      <div className="space-y-6">
                        <p className="text-sm text-text-secondary">
                          Eine Antwort genügt. So wissen wir, worüber wir am
                          Tisch reden, und zeigen dir danach das passende
                          Werkzeug.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {THEMEN.map((t) => (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => themaWaehlen(t.key)}
                              aria-pressed={thema === t.key}
                              className={
                                "ss-card text-left p-4 rounded-xl border transition-colors " +
                                (thema === t.key
                                  ? "border-brand bg-brand-soft"
                                  : "border-border bg-white")
                              }
                            >
                              <p className="text-sm font-semibold text-text-primary">{t.label}</p>
                              <p className="text-xs text-text-muted mt-1">{t.detail}</p>
                            </button>
                          ))}
                        </div>
                        {error && (
                          <p role="alert" className="text-sm text-danger">
                            {error}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={zurueck}
                          className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
                        >
                          Zurück
                        </button>
                      </div>
                    )}

                    {schritt === 4 && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          absenden();
                        }}
                        className="space-y-6"
                      >
                        <dl className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
                          {(
                            [
                              ["Name", form.name],
                              ["Firma", form.firmenname],
                              ["E-Mail", form.email],
                              ["Gruppe", form.gruppe || "Komme allein"],
                              ["Thema", themaLabel],
                            ] as Array<[string, string]>
                          ).map(([label, value]) => (
                            <div key={label} className="flex items-baseline gap-4 px-5 py-3 bg-surface">
                              <dt className="w-24 shrink-0 text-xs text-text-muted">{label}</dt>
                              <dd className="text-sm font-medium text-text-primary break-all">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={datenschutz}
                            onChange={(e) => setDatenschutz(e.target.checked)}
                            required
                            className="mt-1 w-4 h-4 accent-brand"
                          />
                          <span className="text-sm text-text-secondary">
                            Ich bin einverstanden, dass meine Angaben zur
                            Abwicklung der Platzvergabe und zur Kontaktaufnahme
                            rund um den Abend verwendet werden. Details in der{" "}
                            <Link href="/datenschutz" className="text-brand hover:text-brand-hover underline">
                              Datenschutzerklärung
                            </Link>
                            .
                          </span>
                        </label>

                        {error && (
                          <p role="alert" className="text-sm text-danger">
                            {error}
                          </p>
                        )}

                        <div className="flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={zurueck}
                            className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
                          >
                            Zurück
                          </button>
                          <button
                            type="submit"
                            disabled={sending}
                            className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {sending ? "Wird gesendet ..." : "Platz anfragen"}
                          </button>
                        </div>

                        <p className="text-xs text-text-muted leading-relaxed">
                          Anmeldung bis {ANMELDESCHLUSS}, Zusagen verschicken
                          wir am {VERGABE} per E-Mail. Die Plätze werden von
                          uns vergeben, Gruppen bevorzugt; ein Anspruch auf
                          einen Platz besteht nicht, der Platz ist nicht
                          übertragbar. Gastgeber ist die Comms Connect GmbH.
                        </p>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>
              </section>
            </motion.div>
          )}

          {ansicht === "fertig" && (
            <motion.div key="fertig" {...stepMotion}>
              <section className="max-w-2xl mx-auto px-6 text-center pt-24">
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
                  Deine Anmeldung ist drin.
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed mb-12">
                  Wir vergeben die Plätze am {VERGABE} und melden uns per
                  E-Mail. Gruppen werden bevorzugt. Schön, wenn es klappt:
                  Rainer Roloff sitzt selbst mit am Tisch.
                </p>

                {produkt ? (
                  <div className="ss-card text-left border border-border rounded-2xl p-8 bg-white shadow-sm">
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
                      Kein Muss für die Platzvergabe. Aber ein guter Gesprächseinstieg am Tisch.
                    </p>
                  </div>
                ) : (
                  <div className="ss-card text-left border border-border rounded-2xl p-8 bg-white shadow-sm">
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

function FlowNav({
  zurueck,
  error,
}: {
  zurueck: () => void;
  error: string | null;
}) {
  return (
    <>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={zurueck}
          className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
        >
          Zurück
        </button>
        <button
          type="submit"
          className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors"
        >
          Weiter
        </button>
      </div>
    </>
  );
}
