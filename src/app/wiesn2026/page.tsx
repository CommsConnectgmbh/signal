"use client";

// Aktionsseite zur Firmen Connect Wiesn am 26.09.2026 (Kaefer Wiesn-Schaenke).
// Die Plaetze werden VERGEBEN, nicht verlost: bewusste Auswahl, Gruppen
// bevorzugt. Kein Losentscheid, damit gar keine Gewinnspiel-/Gluecksspiel-
// Mechanik entsteht. Jeder traegt sich selbst ein und verlinkt seine Gruppe
// ueber das Gruppen-Feld.
//
// Eigenstaendige Vollbild-Landing OHNE Navbar/Footer (Rainers Vorgabe
// 26.08.2026): nur das Logo als Rueckweg zur Startseite, Wiesn-Gefuehl ueber
// ein bayerisches Rautenmuster im Markenblau, der Frage-Flow liegt als weisse
// Karte darauf (eine Frage pro Ansicht, Fortschrittsanzeige). Impressum und
// Datenschutz bleiben als Fusszeile erreichbar (Pflicht).
// Nicht in der Site-Navigation verlinkt, der Einstieg laeuft ueber den
// Instagram-Post (/wiesn leitet per next.config.ts hierher weiter).

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
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

/** Produkte, fuer die ein Bild in public/images/produkte/ liegt.
    Tagesteller hat (noch) keins und bekommt den Buchstaben-Fallback. */
const BILD_SLUGS = [
  "belegify",
  "obacht",
  "obacht-talents",
  "conduit",
  "simvi",
  "swing-and-savor",
  "dealbuddy",
];

function produktZuThema(key: string): Produkt | null {
  const thema = THEMEN.find((t) => t.key === key);
  if (!thema || !thema.produktSlug) return null;
  return produkte.find((p) => p.slug === thema.produktSlug) ?? null;
}

const inputKlasse =
  "w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition";

/* Bayerisches Rautenmuster: zwei diagonale Linienraster im Weiss der
   Textebene, bewusst leise. Traegt keine Information (aria-hidden). */
const rautenStil: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 64px)," +
    "repeating-linear-gradient(-45deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 64px)",
};

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
    if (schritt === 0 && !form.name.trim()) {
      setError("Bitte gib deinen Namen an.");
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

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-brand-hover text-white">
      {/* Dekor: Rauten + weiches Licht oben, reines CSS, keine Information */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={rautenStil} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Kopf: nur das Logo, als Rueckweg zur Startseite */}
      <header className="relative z-10 flex justify-center pt-8">
        <Link href="/" aria-label="Zur Smart-Signals-Startseite">
          <Image
            src="/logo.png"
            alt="Smart Signals"
            width={600}
            height={319}
            priority
            className="h-9 w-auto brightness-0 invert"
          />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 py-14">
        <AnimatePresence mode="wait" initial={false}>
          {ansicht === "intro" && (
            <motion.div key="intro" {...stepMotion} className="mx-auto w-full max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Firmen Connect Wiesn 2026
              </p>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Ein Tisch im Käfer-Zelt.
                <br />
                {PLAETZE} Plätze zu vergeben.
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
                Am Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr sitzen wir mit
                Unternehmern und Selbstständigen in der Käfer Wiesn-Schänke
                auf dem Oktoberfest. Trag dich ein, wir vergeben die Plätze
                unter allen Anmeldungen, Gruppen bevorzugt. Rainer Roloff ist
                selbst am Tisch.
              </p>
              <button
                type="button"
                onClick={() => {
                  setAnsicht("flow");
                  window.scrollTo({ top: 0 });
                }}
                className="rounded-full bg-accent px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Platz anfragen
              </button>
              <p className="mt-4 text-sm text-white/60">
                Vier kurze Fragen, eine Bestätigung. Dauert unter zwei Minuten.
              </p>

              <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
                {ECKDATEN.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center"
                  >
                    <p className="mb-1 text-xs text-white/60">{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {ansicht === "flow" && (
            <motion.div key="flow" {...stepMotion} className="mx-auto w-full max-w-xl">
              <div className="rounded-3xl bg-white p-6 text-text-primary shadow-lg sm:p-10">
                {/* Fortschritt */}
                <div className="mb-8">
                  <div className="mb-3 flex items-baseline justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                      Firmen Connect Wiesn
                    </p>
                    <p className="text-xs text-text-muted">
                      Schritt {schritt + 1} von {SCHRITTE.length}
                    </p>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-border">
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
                    <h1 className="mb-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
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
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
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
                          <label htmlFor="firmenname" className="mb-2 block text-sm font-medium text-text-primary">
                            Firma{" "}
                            <span className="font-normal text-text-muted">(optional)</span>
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
                          <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
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
                          <label htmlFor="gruppe" className="mb-2 block text-sm font-medium text-text-primary">
                            Deine Gruppe{" "}
                            <span className="font-normal text-text-muted">(optional)</span>
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
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {THEMEN.map((t) => {
                            const p = t.produktSlug
                              ? produkte.find((pr) => pr.slug === t.produktSlug)
                              : null;
                            const bild =
                              p && BILD_SLUGS.includes(p.slug)
                                ? `/images/produkte/${p.slug}.webp`
                                : null;
                            return (
                              <div
                                key={t.key}
                                role="button"
                                tabIndex={0}
                                onClick={() => themaWaehlen(t.key)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    themaWaehlen(t.key);
                                  }
                                }}
                                aria-pressed={thema === t.key}
                                className={
                                  "ss-card cursor-pointer rounded-xl border p-4 text-left transition-colors " +
                                  (thema === t.key
                                    ? "border-brand bg-brand-soft"
                                    : "border-border bg-white")
                                }
                              >
                                <div className="flex items-start gap-3">
                                  {bild ? (
                                    <Image
                                      src={bild}
                                      alt={p ? p.name : ""}
                                      width={80}
                                      height={80}
                                      className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
                                    />
                                  ) : (
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-sm font-bold text-brand">
                                      {(p ? p.name : "Smart Signals").charAt(0)}
                                    </span>
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-text-primary">{t.label}</p>
                                    <p className="mt-1 text-xs text-text-muted">{t.detail}</p>
                                    {p ? (
                                      <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-2 inline-block text-xs font-medium text-brand underline hover:text-brand-hover"
                                      >
                                        Mehr auf {p.domain}
                                      </a>
                                    ) : (
                                      <a
                                        href="/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-2 inline-block text-xs font-medium text-brand underline hover:text-brand-hover"
                                      >
                                        Mehr auf smart-signals.de
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {error && (
                          <p role="alert" className="text-sm text-danger">
                            {error}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={zurueck}
                          className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
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
                        <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                          {(
                            [
                              ["Name", form.name],
                              ["Firma", form.firmenname || "Ohne Firma"],
                              ["E-Mail", form.email],
                              ["Gruppe", form.gruppe || "Komme allein"],
                              ["Thema", themaLabel],
                            ] as Array<[string, string]>
                          ).map(([label, value]) => (
                            <div key={label} className="flex items-baseline gap-4 bg-surface px-5 py-3">
                              <dt className="w-24 shrink-0 text-xs text-text-muted">{label}</dt>
                              <dd className="break-all text-sm font-medium text-text-primary">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={datenschutz}
                            onChange={(e) => setDatenschutz(e.target.checked)}
                            required
                            className="mt-1 h-4 w-4 accent-brand"
                          />
                          <span className="text-sm text-text-secondary">
                            Ich bin einverstanden, dass meine Angaben zur
                            Abwicklung der Platzvergabe und zur Kontaktaufnahme
                            rund um den Abend verwendet werden. Details in der{" "}
                            <Link href="/datenschutz" className="text-brand underline hover:text-brand-hover">
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
                            className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
                          >
                            Zurück
                          </button>
                          <button
                            type="submit"
                            disabled={sending}
                            className="rounded-full bg-accent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {sending ? "Wird gesendet ..." : "Platz anfragen"}
                          </button>
                        </div>

                        <p className="text-xs leading-relaxed text-text-muted">
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
              </div>
            </motion.div>
          )}

          {ansicht === "fertig" && (
            <motion.div key="fertig" {...stepMotion} className="mx-auto w-full max-w-2xl">
              <div className="rounded-3xl bg-white p-6 text-center text-text-primary shadow-lg sm:p-10">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
                  <svg
                    className="h-10 w-10 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  Deine Anmeldung ist drin.
                </h1>
                <p className="mb-10 text-lg leading-relaxed text-text-secondary">
                  Wir vergeben die Plätze am {VERGABE} und melden uns per
                  E-Mail. Gruppen werden bevorzugt. Schön, wenn es klappt:
                  Rainer Roloff sitzt selbst mit am Tisch.
                </p>

                {produkt ? (
                  <div className="ss-card rounded-2xl border border-border bg-white p-8 text-left shadow-sm">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
                      Passt zu deinem Thema
                    </p>
                    <h2 className="mb-2 text-2xl font-bold text-text-primary">
                      {produkt.name}
                    </h2>
                    <p className="mb-6 leading-relaxed text-text-secondary">
                      {produkt.beschreibung}
                    </p>
                    <a
                      href={produkt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      {produkt.name} ausprobieren
                    </a>
                    <p className="mt-3 text-xs text-text-muted">
                      Kein Muss für die Platzvergabe. Aber ein guter Gesprächseinstieg am Tisch.
                    </p>
                  </div>
                ) : (
                  <div className="ss-card rounded-2xl border border-border bg-white p-8 text-left shadow-sm">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
                      Passt zu deinem Thema
                    </p>
                    <h2 className="mb-2 text-2xl font-bold text-text-primary">
                      Das Partnerprogramm
                    </h2>
                    <p className="mb-6 leading-relaxed text-text-secondary">
                      Sieben eigene Software-Produkte, ein Rahmenvertrag. Du
                      empfiehlst, wir schließen ab, rechnen ab und machen den
                      Support. Auf der Wiesn erzählen wir dir gern, wie das läuft.
                    </p>
                    <Link
                      href="/"
                      className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      Zum Partnerprogramm
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal-Fusszeile: Pflichtlinks bleiben erreichbar */}
      <footer className="relative z-10 pb-8 text-center text-xs text-white/60">
        <p>
          Eine Aktion der Comms Connect GmbH
          {" · "}
          <Link href="/impressum" className="underline hover:text-white">
            Impressum
          </Link>
          {" · "}
          <Link href="/datenschutz" className="underline hover:text-white">
            Datenschutz
          </Link>
        </p>
      </footer>
    </div>
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
          className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          Zurück
        </button>
        <button
          type="submit"
          className="rounded-full bg-accent px-8 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Weiter
        </button>
      </div>
    </>
  );
}
