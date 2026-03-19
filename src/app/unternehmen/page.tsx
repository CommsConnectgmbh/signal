import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    title: "Einfachheit",
    text: "Digitalisierung darf keine Hürde sein. Wir sprechen Klartext.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Kosteneffizienz",
    text: "Wir zeigen Wege, wie Digitalisierung Kosten spürbar senkt.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Fairness & Transparenz",
    text: "Keine versteckten Agenden, keine Abhängigkeiten.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Zukunftssicherheit",
    text: "Unsere Lösungen sind skalierbar und wachsen mit Ihrem Unternehmen.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
];

export default function UnternehmenPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero with background image ── */}
        <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
          <img
            src="https://onecdn.io/media/9fe5ce20-c8b1-4b87-8c66-364fca563d19/preview"
            alt="Smart Signals Unternehmen"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white">
              Smart Signals
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
              Ihre Partner für digitale Zukunftssicherheit
            </p>
          </div>
        </section>

        {/* ── About ── */}
        <section className="bg-[#FFFFFF] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl">
                  Das Fundament hinter smarten Lösungen
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-[#475569]">
                  Digitalisierung ist mehr als nur Software. Sie verändert, wie
                  Unternehmen arbeiten, wachsen und mit Kunden interagieren. Genau
                  hier setzt Smart Signals an: Wir helfen Unternehmen, Abläufe zu
                  hinterfragen, Prozesse zu digitalisieren und Kosten dauerhaft zu
                  senken.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-[#475569]">
                  Wir glauben, dass jede Organisation – unabhängig von Größe oder
                  Branche – von smarter Digitalisierung profitieren kann.
                </p>
              </div>
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/5d100e10-e9a2-4329-8967-14dd7b9f436e/preview"
                  alt="Über Smart Signals"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="bg-[#F8FAFC] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl">
                  Das Team hinter Smart Signals
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-[#475569]">
                  Unser Team besteht aus Beratern, Entwicklern, Prozess- und
                  Organisationsexperten, die eines verbindet: die Leidenschaft für
                  intelligente, bezahlbare Digitalisierung.
                </p>
              </div>
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/1bf5324d-d90d-4bee-af6f-0ae50a9065a2/preview"
                  alt="Das Smart Signals Team"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="bg-[#FFFFFF] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="w-full lg:w-1/3">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl">
                  Unsere Werte und Arbeitsweise
                </h2>
                <p className="mt-6 text-lg text-[#475569]">
                  Vier Prinzipien, die unsere Arbeit leiten.
                </p>
                <img
                  src="https://onecdn.io/media/d8decb8a-2801-4a31-ac6b-4d65485480f2/preview"
                  alt="Unsere Werte"
                  className="mt-10 hidden w-full rounded-3xl object-cover shadow-xl lg:block"
                />
              </div>
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {values.map((value) => (
                    <div
                      key={value.title}
                      className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                        {value.icon}
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">
                        {value.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                        {value.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Warum Smart Signals ── */}
        <section className="bg-[#F8FAFC] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/af41d2e9-aeac-4214-98c7-2ab6a94c4bea/preview"
                  alt="Warum Smart Signals"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl">
                  Warum Smart Signals?
                </h2>
                <p className="mt-8 text-lg leading-relaxed text-[#475569]">
                  Wir machen Abläufe günstiger, Digitalisierung einfach und
                  skalierbar – damit Ihr Unternehmen heute und in Zukunft optimal
                  aufgestellt ist.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Individuelle Beratung statt Standardlösungen",
                    "Messbare Ergebnisse ab dem ersten Monat",
                    "Langfristige Partnerschaft auf Augenhöhe",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-lg text-[#475569]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA with background image ── */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <img
            src="https://onecdn.io/media/bcdefadf-98af-4378-8511-abdc6796cd5f/preview"
            alt="Kontakt aufnehmen"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Bereit, den nächsten Schritt zu gehen?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen
              voranbringen können.
            </p>
            <div className="mt-10">
              <Link
                href="/kontaktanfrage"
                className="inline-block rounded-full bg-[#2563EB] px-8 py-4 text-lg font-medium text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.97]"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
