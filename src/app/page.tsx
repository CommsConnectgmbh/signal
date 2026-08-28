import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerAnmeldung from "@/components/PartnerAnmeldung";
import { produkte } from "@/lib/produkte";

export const metadata = {
  title: "Software empfehlen statt selbst bauen",
  description:
    "Sieben eigene Software-Produkte, ein Rahmenvertrag. Du empfiehlst, Smart Signals schließt ab, rechnet ab und macht den Support. Kein Lager, kein Invest, keine Abnahmepflicht.",
  alternates: { canonical: "https://smart-signals.de" },
};

// Hier stehen bewusst KEINE Provisionszahlen. Sätze, Laufzeiten und
// Zuordnungsfenster stehen im Rahmenvertrag und dessen Produkt-Anlagen
// (siehe vertrieb/), nicht öffentlich: öffentliche Angaben verwässern den
// Produktpreis und verhandeln gegen uns selbst.

const argumente = [
  {
    titel: "Ein Vertrag für das ganze Portfolio",
    text: "Du unterschreibst einmal, nicht je Produkt. Kommt ein Produkt dazu, kommt eine Anlage dazu. Du unterschreibst nicht neu.",
    gross: true,
  },
  {
    titel: "Kein Lager, kein Invest",
    text: "Die Teilnahme kostet nichts. Keine Startgebühr, kein Mindestumsatz, keine Pflicht, ein Produkt selbst zu kaufen.",
  },
  {
    titel: "Support ist nicht dein Problem",
    text: "Fragen zum Produkt beantworten wir. Du verlierst keine Zeit mit Einrichtung oder Störungen.",
  },
  {
    titel: "Du empfiehlst, wir schließen ab",
    text: "Du stellst den Kontakt her. Vertrag, Rechnung und Inkasso laufen über uns. Du musst nichts verkaufen und nichts kassieren.",
    gross: true,
  },
];

const ablauf = [
  {
    nummer: "01",
    titel: "Anmelden",
    text: "Du meldest dich über das Formular unten an. Wir schauen uns an, mit wem du arbeitest und welche Produkte dazu passen.",
  },
  {
    nummer: "02",
    titel: "Rahmenvertrag unterschreiben",
    text: "Du bekommst einen Vertrag für das gesamte Portfolio. Die Konditionen je Produkt stehen als Anlage darin.",
  },
  {
    nummer: "03",
    titel: "Empfehlen",
    text: "Du bekommst deinen Empfehlungslink, Unterlagen und Zugang zum Partnerbereich. Abgeschlossen und abgerechnet wird von uns.",
  },
  {
    nummer: "04",
    titel: "Abrechnung",
    text: "Deine Provision wird gebucht, sobald der geworbene Kunde zahlt. Die Abrechnung erstellen wir per Gutschrift, du schreibst keine Rechnung.",
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

const faqs = [
  {
    q: "Was kostet die Teilnahme?",
    a: "Nichts. Es gibt keine Startgebühr, keine Lizenz, kein Starterpaket und keine Pflicht, selbst ein Produkt zu kaufen. Wer dir so etwas verkaufen will, macht ein anderes Geschäft als wir.",
  },
  {
    q: "Wo stehen die Provisionen?",
    a: "Im Rahmenvertrag und in den Produkt-Anlagen dazu. Wir veröffentlichen keine Sätze, weil öffentliche Provisionsangaben den Produktpreis verwässern. Du bekommst die Konditionen vollständig, bevor du unterschreibst.",
  },
  {
    q: "Muss ich alle Produkte anbieten?",
    a: "Nein. Du empfiehlst, was zu deinem Kundenkreis passt. Der Rahmenvertrag deckt das Portfolio ab, verpflichtet dich aber zu keinem einzelnen Produkt.",
  },
  {
    q: "Brauche ich ein Gewerbe?",
    a: "Ja. Das Programm steht Unternehmern offen, Verbraucher können nicht teilnehmen. Abgerechnet wird per Gutschrift an deine Firma.",
  },
  {
    q: "Muss ich Kundengespräche oder Support übernehmen?",
    a: "Nein. Du stellst den Kontakt her, den Rest machen wir: Angebot, Vertrag, Einrichtung, Support und Rechnung.",
  },
  {
    q: "Ist das ein Strukturvertrieb mit Downline?",
    a: "Nein. Es gibt keine Ebenen, keine geworbenen Werber und keine Vergütung dafür, andere Partner anzuwerben. Vergütet wird ausschließlich der Kunde, den du bringst.",
  },
  {
    q: "Wie schnell kann ich anfangen?",
    a: "Sobald der Rahmenvertrag unterschrieben ist. Empfehlungslink, Unterlagen und der Zugang zum Partnerbereich kommen mit den Vertragsunterlagen.",
  },
];

function Check({ className = "text-accent" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      className={`shrink-0 ${className}`}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-brand">
      <span aria-hidden className="h-px w-6 bg-brand/40" />
      {children}
    </span>
  );
}

export default function HomePage() {
  const imProgramm = produkte.filter((p) => p.partnerprogramm === "aktiv");
  const inVorbereitung = produkte.filter((p) => p.partnerprogramm === "geplant");

  return (
    <>
      <Navbar />
      <main className="bg-white text-text-primary overflow-x-hidden">

        {/* HERO */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div aria-hidden className="ss-grid pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="ss-glow pointer-events-none absolute -top-32 -right-24 h-[560px] w-[560px] rounded-full"
          />

          <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
            <div>
              <div className="ss-rise inline-flex items-center gap-2 mb-6 rounded-full border border-brand/25 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand shadow-sm">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Partnerprogramm
              </div>
              <h1
                style={{ animationDelay: "50ms" }}
                className="ss-rise text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
              >
                Verkauf Software, die es schon gibt.
              </h1>
              <p
                style={{ animationDelay: "100ms" }}
                className="ss-rise text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl mb-10"
              >
                Du berätst Betriebe, Kanzleien oder Vereine und weißt, wo es
                hakt. Wir haben die Software dafür. Du empfiehlst, wir schließen
                ab, rechnen ab und machen den Support.
              </p>
              <div
                style={{ animationDelay: "160ms" }}
                className="ss-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <a
                  href="#anmeldung"
                  className="ss-cta inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-accent-hover"
                >
                  Partner werden
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
                <a
                  href="#sortiment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-text-primary border border-border bg-white hover:border-brand hover:text-brand transition-colors"
                >
                  Sortiment ansehen
                </a>
              </div>

              <dl
                style={{ animationDelay: "220ms" }}
                className="ss-rise mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-6"
              >
                <div>
                  <dt className="text-2xl font-bold tracking-tight">{produkte.length}</dt>
                  <dd className="mt-1 text-xs text-text-secondary leading-snug">Produkte im Haus</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold tracking-tight">{imProgramm.length}</dt>
                  <dd className="mt-1 text-xs text-text-secondary leading-snug">Programme aktiv</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold tracking-tight">0 €</dt>
                  <dd className="mt-1 text-xs text-text-secondary leading-snug">Einstieg</dd>
                </div>
              </dl>
            </div>

            {/* Das Angebot ist das Sortiment, also zeigt der Hero das Sortiment. */}
            <div
              style={{ animationDelay: "200ms" }}
              className="ss-rise lg:justify-self-end w-full max-w-md"
            >
              <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    Dein Sortiment
                  </span>
                  <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-brand">
                    {imProgramm.length} sofort vermittelbar
                  </span>
                </div>
                {/* Status je Produkt statt einer 7, die mehr verspricht als
                    offen steht. Auf einer Partnerseite ist Ueberversprechen
                    teurer als eine kleinere Zahl. */}
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {produkte.map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{p.name}</div>
                        <div className="text-xs text-text-secondary truncate">{p.kategorie}</div>
                      </div>
                      {p.partnerprogramm === "aktiv" ? (
                        <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-hover">
                          läuft
                        </span>
                      ) : p.partnerprogramm === "geplant" ? (
                        <span className="shrink-0 rounded-full bg-surface-hover border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                          Programm in Planung
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] uppercase tracking-wide text-text-muted">
                          kein Programm
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 text-sm font-medium">
                  <Check />
                  Ein Rahmenvertrag für alles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LAUFBAND: das Sortiment in Bewegung, statt einer Logo-Wand mit
            fremden Marken, die wir nicht haben. */}
        <div className="ss-marquee-mask border-y border-border bg-surface py-5 overflow-hidden">
          <div className="ss-marquee flex w-max">
            {[0, 1].map((durchlauf) => (
              <div key={durchlauf} aria-hidden={durchlauf === 1} className="flex items-center gap-10 pr-10">
                {produkte.map((p) => (
                  <span key={p.slug} className="flex items-center gap-2.5 whitespace-nowrap">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand/40" />
                    <span className="text-sm font-semibold">{p.name}</span>
                    <span className="text-sm text-text-secondary">{p.kategorie}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* WARUM */}
        <section className="px-4 sm:px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="ss-reveal mb-12 max-w-2xl">
              <Eyebrow>Warum mit uns</Eyebrow>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                Du bringst die Kunden. Den Rest haben wir.
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                Wir entwickeln jedes Produkt selbst. Wenn etwas fehlt,
                entscheidet kein fremder Hersteller darüber, ob es kommt.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {argumente.map((a, i) => (
                <div
                  key={a.titel}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={
                    "ss-reveal ss-card rounded-2xl border border-border bg-white p-8 " +
                    (a.gross ? "md:col-span-2" : "")
                  }
                >
                  <h3
                    className={
                      a.gross
                        ? "text-xl sm:text-2xl font-bold tracking-tight"
                        : "text-base sm:text-lg font-semibold"
                    }
                  >
                    {a.titel}
                  </h3>
                  <p className="mt-3 text-text-secondary leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SORTIMENT */}
        <section id="sortiment" className="px-4 sm:px-6 py-24 md:py-28 bg-surface scroll-mt-24">
          <div className="mx-auto max-w-6xl">
            <div className="ss-reveal mb-12 max-w-2xl">
              <Eyebrow>Das Sortiment</Eyebrow>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                Was du empfehlen kannst
              </h2>
              <p className="mt-3 text-text-secondary leading-relaxed">
                Für alle {imProgramm.length} läuft das Programm, du kannst sofort
                starten. Jedes löst ein konkretes Problem und hat seinen eigenen
                Kundenkreis. Du entscheidest, was zu deinen Leuten passt.
              </p>
            </div>

            {/* Bild fuehrt die Karte: der Partner sieht sofort, was sein
                Kunde zu sehen bekommt. Alle Aufnahmen im gleichen Viewport und
                Seitenverhaeltnis, damit sie als Serie wirken. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {imProgramm.map((p, i) => (
                <a
                  key={p.slug}
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  style={{ animationDelay: `${Math.min(i, 4) * 70}ms` }}
                  className="ss-reveal ss-card group flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
                >
                  <div className="relative aspect-[16/10] border-b border-border bg-surface">
                    <Image
                      src={`/images/produkte/${p.slug}.webp`}
                      alt={`Startseite von ${p.domain}`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                      {p.kategorie}
                    </span>
                    <h3 className="mt-2 text-lg font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{p.claim}</p>
                    <dl className="mt-4 border-t border-border pt-4">
                      <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary">
                        Für wen
                      </dt>
                      <dd className="mt-1 text-sm text-text-secondary">{p.zielgruppe}</dd>
                    </dl>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:text-brand-hover transition-colors">
                      {p.domain}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {inVorbereitung.length > 0 && (
              <div className="ss-reveal mt-10 rounded-2xl border border-dashed border-border bg-white p-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  Partnerprogramm in Planung
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  Die Software für {inVorbereitung.map((p) => p.name).join(" und ")} ist bereits live.{" "}
                  {inVorbereitung.length === 1
                    ? "Dafür gibt es allerdings noch kein laufendes Partnerprogramm."
                    : "Für diese Produkte gibt es allerdings noch kein laufendes Partnerprogramm."}{" "}
                  Sobald es startet, kommt es als Anlage zu deinem bestehenden
                  Vertrag dazu.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ABLAUF */}
        <section className="px-4 sm:px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="ss-reveal mb-12">
              <Eyebrow>Ablauf</Eyebrow>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
                So läuft es ab
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {ablauf.map((schritt, i) => (
                <div
                  key={schritt.nummer}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className="ss-reveal group flex flex-col sm:flex-row gap-4 sm:gap-10 py-8"
                >
                  <span className="text-3xl font-bold text-brand tabular-nums shrink-0 w-16">
                    {schritt.nummer}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{schritt.titel}</h3>
                    <p className="text-text-secondary leading-relaxed">{schritt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KLARTEXT */}
        <section className="relative overflow-hidden px-4 sm:px-6 py-24 bg-text-primary">
          <div
            aria-hidden
            className="ss-glow pointer-events-none absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full opacity-40"
          />
          <div className="relative mx-auto max-w-4xl">
            <h2 className="ss-reveal text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Damit es keine Missverständnisse gibt
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {klarstellungen.map((k, i) => (
                <div
                  key={k.titel}
                  style={{ animationDelay: `${Math.min(i, 4) * 60}ms` }}
                  className="ss-reveal rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="flex items-start gap-2.5 text-base font-semibold text-white">
                    <Check className="mt-1 text-brand-on-dark" />
                    {k.titel}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted-on-dark leading-relaxed">{k.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 sm:px-6 py-24 md:py-28 bg-surface">
          <div className="mx-auto max-w-3xl">
            <div className="ss-reveal mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Was Partner uns fragen
              </h2>
            </div>
            <div className="divide-y divide-border rounded-2xl border border-border bg-white px-6">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
                    {item.q}
                    <svg className="h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 group-open:rotate-45"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-text-secondary leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ANMELDUNG */}
        <section id="anmeldung" className="relative overflow-hidden px-4 sm:px-6 py-24 md:py-32 scroll-mt-24">
          <div aria-hidden className="ss-grid pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow>Anmeldung</Eyebrow>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Als Partner anmelden
            </h2>
            <p className="mt-3 text-text-secondary leading-relaxed">
              Wir melden uns mit dem Rahmenvertrag und den Konditionen. Die
              Teilnahme steht Unternehmern offen, Verbraucher können nicht
              teilnehmen.
            </p>
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 mt-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.3)]">
              <PartnerAnmeldung />
            </div>
            <p className="mt-8 text-sm text-text-secondary">
              Schon Partner?{" "}
              <Link href="/login" className="font-semibold text-brand hover:text-brand-hover transition-colors">
                Zum Partner-Login
              </Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
