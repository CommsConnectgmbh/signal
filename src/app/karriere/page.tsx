import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

const targetGroups = [
  {
    title: "Quereinsteiger",
    text: "Du hast einen Vollzeitjob, willst aber neue Wege ausprobieren? Bei uns kannst du Smart Signals nebenbei testen.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    title: "Berufserfahrene",
    text: "Du bringst Erfahrung mit und willst mehr Verantwortung und Gestaltungsspielraum?",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
  },
  {
    title: "Studierende",
    text: "Starte während des Studiums und sammle wertvolle Praxiserfahrung.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const keyPoints = [
  "Du gestaltest deinen Arbeitsalltag selbst.",
  "Du bestimmst dein Wachstum.",
  "Du profitierst von einem modernen digitalen Umfeld.",
];

const faqItems = [
  {
    question: "Brauche ich Erfahrung?",
    answer: "Nein, Vorkenntnisse sind nicht nötig.",
  },
  {
    question: "Anstellung oder Selbstständigkeit?",
    answer: "Du arbeitest als selbstständiger Partner.",
  },
  {
    question: "Neben Vollzeitjob starten?",
    answer: "Ja, viele starten nebenberuflich.",
  },
  {
    question: "Wie werde ich bezahlt?",
    answer: "Erfolgsbasierte Vergütungsmodelle.",
  },
  {
    question: "Wie unterstützt mich Smart Signals?",
    answer: "Schulungen, Tools, Partnernetzwerk.",
  },
  {
    question: "Versteckte Kosten?",
    answer: "Nein. Du investierst nur Zeit und Engagement.",
  },
  {
    question: "Muss ich Kunden selbst suchen?",
    answer:
      "Du baust dein Netzwerk eigenständig auf – mit unserer Unterstützung.",
  },
];

export default function KarrierePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="bg-[#050A14] pb-24 pt-28 md:pb-32 md:pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#F1F5F9]">
                  Gestalte dein Leben selbst.
                </h1>
                <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#94A3B8] md:text-2xl">
                  Starte jetzt deine Karriere als Digital Solution Architekt.
                </p>
                <div className="mt-10">
                  <Link
                    href="/kontaktanfrage"
                    className="inline-block rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-8 py-4 text-lg font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#D4A843]/25 active:scale-[0.97]"
                  >
                    Jetzt bewerben
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/cca57e30-0706-4751-8b32-40c45f7a577c/preview"
                  alt="Karriere bei Smart Signals"
                  className="w-full rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Target Groups ── */}
        <section className="bg-[#0A1628] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
              Für wen ist das?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#94A3B8]">
              Egal ob Neustart, Karrierewechsel oder neben dem Studium – hier ist
              Platz für dich.
            </p>
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {targetGroups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-3xl border border-[#1E293B] bg-[#111D33] p-10 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A843]/10 text-[#D4A843]">
                    {group.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#F1F5F9]">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#94A3B8]">
                    {group.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Role Description ── */}
        <section className="bg-[#050A14] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              {/* Content */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A843]">
                  Dein Job. Dein Business. Deine Freiheit.
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl">
                  Was macht man als Digital Solution Architekt?
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-[#94A3B8]">
                  Als Digital Solution Architekt berätst du Unternehmen rund um
                  digitale Lösungen. Du analysierst bestehende Arbeitsabläufe,
                  identifizierst Optimierungspotenziale und findest die passenden
                  Lösungen – individuell und praxisnah.
                </p>

                <ul className="mt-8 space-y-4">
                  {keyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-[#D4A843]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-lg text-[#94A3B8]">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#111D33] p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">
                      Kein Vorwissen notwendig
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                      Wir begleiten dich mit Schulungen, Mentoring und einem starken
                      Netzwerk auf deinem Weg zum Erfolg.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#111D33] p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">
                      Karriere und Chancengleichheit
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                      Egal woher du kommst oder welchen Hintergrund du hast – bei
                      uns zählt dein Engagement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/11827872-297e-4975-90d5-0fc40d4fae4b/preview"
                  alt="Freiheit als Digital Solution Architekt"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#0A1628] py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
              Häufig gestellte Fragen
            </h2>
            <div className="mt-16">
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <img
            src="https://onecdn.io/media/9fe5ce20-c8b1-4b87-8c66-364fca563d19/preview"
            alt="Jetzt bewerben"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Werde Teil von Smart Signals und gestalte deine Zukunft selbst.
            </p>
            <div className="mt-10">
              <Link
                href="/kontaktanfrage"
                className="inline-block rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-8 py-4 text-lg font-medium text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.97]"
              >
                Jetzt bewerben
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
