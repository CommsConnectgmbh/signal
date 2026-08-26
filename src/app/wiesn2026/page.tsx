"use client";

// Aktionsseite zur Firmen Connect Wiesn am 26.09.2026 (Kaefer Wiesn-Schaenke).
// Die Plaetze werden VERGEBEN, nicht verlost: bewusste Auswahl, Gruppen
// bevorzugt. Kein Losentscheid, damit gar keine Gewinnspiel-/Gluecksspiel-
// Mechanik entsteht. Jeder traegt sich selbst ein und verlinkt seine Gruppe
// ueber das Gruppen-Feld.
//
// Publikum ist NICHT steuerbar (Instagram): die erste Frage segmentiert
// deshalb selbst (Betrieb vs. privat), danach werden die drei passenden
// Apps einzeln vorgestellt (Bild, ein Satz, Link) mit "Interessiert mich /
// Eher nicht". So entsteht je Gast ein Interessenprofil, das als Thema in
// der Anmelde-Mail landet. Kontaktdaten kommen bewusst erst nach den Karten.
//
// Eigenstaendige Vollbild-Landing OHNE Navbar/Footer: nur das Logo als
// Rueckweg zur Startseite, bayerisches Rautenmuster im Markenblau, der Flow
// als weisse Karte darauf. Impressum/Datenschutz als Pflicht-Fusszeile.
// Nicht in der Site-Navigation verlinkt, Einstieg ueber den Instagram-Post
// (/wiesn leitet per next.config.ts hierher weiter).

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
// Anmeldeschluss ist der Wiesn-Anstich: der Tag laeuft noch als Werbetag mit.
// Zusagen einen Tag spaeter, damit allen eine Woche Planungszeit bleibt.
const ANMELDESCHLUSS = "19.09.2026";
const VERGABE = "20.09.2026";

/** Drei Karten je Publikum. Bilder liegen in public/images/produkte/. */
const BETRIEB_SLUGS = ["belegify", "obacht", "conduit"];
const PRIVAT_SLUGS = ["dealbuddy", "simvi", "swing-and-savor"];

type Segment = "betrieb" | "privat";

function kartenFuer(segment: Segment | null): Produkt[] {
  const slugs = segment === "privat" ? PRIVAT_SLUGS : BETRIEB_SLUGS;
  return slugs
    .map((s) => produkte.find((p) => p.slug === s))
    .filter((p): p is Produkt => Boolean(p));
}

const inputKlasse =
  "w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition";

/* Schleier ueber dem Zeltfoto. Oben und unten kraeftiger, damit Logo und
   Fusszeile in Weiss tragen; in der Mitte leicht, dort liegt ohnehin die
   weisse Karte. Traegt keine Information (aria-hidden). */
const schleierStil: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(10,7,4,0.72) 0%, rgba(10,7,4,0.34) 26%, rgba(10,7,4,0.34) 72%, rgba(10,7,4,0.76) 100%)",
};

export default function WiesnPage() {
  const [ansicht, setAnsicht] = useState<"intro" | "flow" | "fertig">("intro");
  const [schritt, setSchritt] = useState(0);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [interessen, setInteressen] = useState<Record<string, boolean>>({});
  const [partner, setPartner] = useState<boolean | null>(null);
  const [form, setForm] = useState({
    name: "",
    firmenname: "",
    email: "",
    gruppe: "",
  });
  const [datenschutz, setDatenschutz] = useState(false);
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ruhig = useReducedMotion();

  const karten = kartenFuer(segment);
  // Schrittfolge: Profil, 3 App-Karten, Partnerfrage, Name, E-Mail, Gruppe,
  // Zusammenfassung. Karten zuerst: erst neugierig machen, dann Daten.
  const titel = [
    "Was beschreibt dich am besten?",
    ...karten.map((p) => p.name),
    "Empfehlen und mitverdienen?",
    "Wer kommt?",
    "Wie erreichen wir dich?",
    "Deine Gruppe",
    "Kurz prüfen und abschicken",
  ];
  const NAME_SCHRITT = karten.length + 2;
  const EMAIL_SCHRITT = karten.length + 3;
  const GRUPPE_SCHRITT = karten.length + 4;
  const FINAL_SCHRITT = karten.length + 5;

  const stepMotion: HTMLMotionProps<"div"> = {
    initial: ruhig ? { opacity: 0 } : { opacity: 0, y: 8 },
    animate: ruhig ? { opacity: 1 } : { opacity: 1, y: 0 },
    exit: ruhig ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function profilWaehlen(s: Segment) {
    if (s !== segment) setInteressen({});
    setSegment(s);
    setError(null);
    setSchritt(1);
  }

  function karteBeantworten(slug: string, ja: boolean) {
    setInteressen((prev) => ({ ...prev, [slug]: ja }));
    setError(null);
    setSchritt((x) => x + 1);
  }

  function partnerBeantworten(ja: boolean) {
    setPartner(ja);
    setError(null);
    setSchritt((x) => x + 1);
  }

  function weiter() {
    if (schritt === NAME_SCHRITT && !form.name.trim()) {
      setError("Bitte gib deinen Namen an.");
      return;
    }
    if (schritt === EMAIL_SCHRITT && !/.+@.+\..+/.test(form.email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse an.");
      return;
    }
    setError(null);
    setSchritt((s) => Math.min(s + 1, titel.length - 1));
  }

  function zurueck() {
    setError(null);
    if (schritt === 0) {
      setAnsicht("intro");
      return;
    }
    setSchritt((s) => s - 1);
  }

  const interessiert = karten.filter((p) => interessen[p.slug]);

  function profilText() {
    return segment === "privat" ? "Privat unterwegs" : "Selbstständig / Betrieb";
  }

  async function absenden() {
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const thema = [
        profilText(),
        `Interessen: ${
          interessiert.length ? interessiert.map((p) => p.name).join(", ") : "keine"
        }`,
        `Partnerprogramm: ${partner ? "ja" : "eher nicht"}`,
      ].join(" | ");
      const res = await fetch("/api/wiesn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, thema, _honey: honey }),
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

  const aktuelleKarte =
    schritt >= 1 && schritt <= karten.length ? karten[schritt - 1] : null;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#0A0704] text-white">
      {/* Zeltfoto im Kaefer-Look als Buehne, darueber der Schleier */}
      <Image
        src="/images/wiesn-kaefer.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={schleierStil} />

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
            <motion.div key="intro" {...stepMotion} className="mx-auto w-full max-w-2xl">
              <div className="rounded-3xl bg-white p-8 text-text-primary shadow-lg sm:p-12">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
                  Firmen Connect Wiesn 2026
                </p>
                <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl">
                  Ein Tisch im Käfer-Zelt.
                  <br />
                  {PLAETZE} Plätze zu vergeben.
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                  Am Samstag, 26.09.2026, von 11:30 bis 15:30 Uhr sitzen wir in
                  der Käfer Wiesn-Schänke auf dem Oktoberfest. Kein Pitch,
                  keine Präsentation, nur Brezn, Bier und Leute, die man sonst
                  nur schreibt. Rainer Roloff ist selbst am Tisch.
                </p>

                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(
                    [
                      ["Datum", "Sa., 26.09."],
                      ["Uhrzeit", "11:30–15:30"],
                      ["Ort", "Käfer-Schänke"],
                      ["Anmeldung bis", ANMELDESCHLUSS],
                    ] as Array<[string, string]>
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border p-4 text-center"
                    >
                      <p className="mb-1 text-[11px] uppercase tracking-wider text-text-muted">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-text-primary">{value}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAnsicht("flow");
                    window.scrollTo({ top: 0 });
                  }}
                  className="w-full rounded-full bg-accent px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Platz anfragen
                </button>
                <p className="mt-3 text-center text-sm text-text-muted">
                  Ein paar kurze Fragen, ein Tipp pro Antwort. Dauert unter
                  zwei Minuten.
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <ul className="space-y-2.5">
                    {[
                      ["Antwort", `am ${VERGABE} per Mail`],
                      ["Tisch und Reservierung", "laufen über uns"],
                      ["Absage", "jederzeit möglich, sag einfach Bescheid"],
                    ].map(([fett, rest]) => (
                      <li key={fett} className="flex items-start gap-3 text-sm text-text-secondary">
                        <svg
                          aria-hidden
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          <strong className="font-semibold text-text-primary">{fett}</strong> {rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-2xl bg-surface p-5 text-sm leading-relaxed text-text-secondary">
                    <strong className="font-semibold text-text-primary">
                      Warum eine Anfrage und keine Buchung?
                    </strong>{" "}
                    Wir haben {PLAETZE} Plätze und vermutlich mehr Anfragen.
                    Statt „wer zuerst klickt" schauen wir sie uns an und
                    stellen den Tisch so zusammen, dass er zusammenpasst.
                    Gruppen werden dabei bevorzugt.
                  </p>
                </div>
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
                      Schritt {schritt + 1} von {titel.length}
                    </p>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-300"
                      style={{ width: `${((schritt + 1) / titel.length) * 100}%` }}
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
                      {titel[schritt]}
                    </h1>

                    {/* Profil */}
                    {schritt === 0 && (
                      <div className="space-y-6">
                        <p className="text-sm text-text-secondary">
                          Damit wir dir gleich die richtigen Werkzeuge zeigen.
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => profilWaehlen("betrieb")}
                            className="ss-card rounded-xl border border-border bg-white p-5 text-left transition-colors"
                          >
                            <p className="text-sm font-semibold text-text-primary">
                              Selbstständig oder im Betrieb
                            </p>
                            <p className="mt-1 text-xs text-text-muted">
                              Ich führe einen Betrieb, bin selbstständig oder
                              entscheide im Job mit
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => profilWaehlen("privat")}
                            className="ss-card rounded-xl border border-border bg-white p-5 text-left transition-colors"
                          >
                            <p className="text-sm font-semibold text-text-primary">
                              Privat unterwegs
                            </p>
                            <p className="mt-1 text-xs text-text-muted">
                              Ich bin einfach dabei, ganz ohne Firma
                            </p>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={zurueck}
                          className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
                        >
                          Zurück
                        </button>
                      </div>
                    )}

                    {/* App-Karten, eine pro Ansicht */}
                    {aktuelleKarte && (
                      <div className="space-y-5">
                        <Image
                          src={`/images/produkte/${aktuelleKarte.slug}.webp`}
                          alt={aktuelleKarte.name}
                          width={640}
                          height={360}
                          className="h-40 w-full rounded-xl border border-border object-cover"
                        />
                        <div>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand">
                            {aktuelleKarte.kategorie}
                          </p>
                          <p className="text-base font-semibold text-text-primary">
                            {aktuelleKarte.claim}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                            {aktuelleKarte.beschreibung}
                          </p>
                          <a
                            href={aktuelleKarte.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs font-medium text-brand underline hover:text-brand-hover"
                          >
                            Mehr auf {aktuelleKarte.domain}
                          </a>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => karteBeantworten(aktuelleKarte.slug, false)}
                            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-brand hover:text-text-primary"
                          >
                            Eher nicht
                          </button>
                          <button
                            type="button"
                            onClick={() => karteBeantworten(aktuelleKarte.slug, true)}
                            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                          >
                            Interessiert mich
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={zurueck}
                          className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
                        >
                          Zurück
                        </button>
                      </div>
                    )}

                    {/* Partnerfrage */}
                    {schritt === karten.length + 1 && (
                      <div className="space-y-5">
                        <p className="text-sm leading-relaxed text-text-secondary">
                          Alle Produkte kommen aus einem Haus. Wer sie
                          weiterempfiehlt, verdient mit: du empfiehlst, wir
                          schließen ab, rechnen ab und machen den Support.
                          Wäre das etwas für dich?
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => partnerBeantworten(false)}
                            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-brand hover:text-text-primary"
                          >
                            Eher nicht
                          </button>
                          <button
                            type="button"
                            onClick={() => partnerBeantworten(true)}
                            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                          >
                            Klingt interessant
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={zurueck}
                          className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
                        >
                          Zurück
                        </button>
                      </div>
                    )}

                    {/* Name + Firma */}
                    {schritt === NAME_SCHRITT && (
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

                    {/* E-Mail */}
                    {schritt === EMAIL_SCHRITT && (
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

                    {/* Gruppe */}
                    {schritt === GRUPPE_SCHRITT && (
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

                    {/* Zusammenfassung */}
                    {schritt === FINAL_SCHRITT && (
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
                              ["Profil", profilText()],
                              [
                                "Interessen",
                                interessiert.length
                                  ? interessiert.map((p) => p.name).join(", ")
                                  : "Erstmal keine",
                              ],
                              ["Empfehlen", partner ? "Klingt interessant" : "Eher nicht"],
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

                {interessiert.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                      Deine Merkliste zum Ausprobieren
                    </p>
                    {interessiert.map((p) => (
                      <div
                        key={p.slug}
                        className="ss-card flex items-center gap-4 rounded-2xl border border-border bg-white p-5 text-left"
                      >
                        <Image
                          src={`/images/produkte/${p.slug}.webp`}
                          alt={p.name}
                          width={96}
                          height={96}
                          className="h-14 w-14 shrink-0 rounded-xl border border-border object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-text-primary">{p.name}</p>
                          <p className="truncate text-xs text-text-muted">{p.claim}</p>
                        </div>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                        >
                          Ausprobieren
                        </a>
                      </div>
                    ))}
                    <p className="text-xs text-text-muted">
                      Kein Muss für die Platzvergabe. Aber ein guter Gesprächseinstieg am Tisch.
                    </p>
                  </div>
                ) : (
                  <div className="ss-card rounded-2xl border border-border bg-white p-8 text-left shadow-sm">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
                      Falls du doch neugierig wirst
                    </p>
                    <h2 className="mb-2 text-2xl font-bold text-text-primary">
                      Unsere Produkte im Überblick
                    </h2>
                    <p className="mb-6 leading-relaxed text-text-secondary">
                      Sieben eigene Software-Produkte aus einem Haus, vom
                      Belege-Erfassen bis zur Tipprunde im Freundeskreis. Auf
                      der Wiesn erzählen wir dir gern mehr.
                    </p>
                    <Link
                      href="/produkte"
                      className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      Zu den Produkten
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
