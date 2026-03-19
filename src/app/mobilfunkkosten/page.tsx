import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const highlights = [
  {
    title: "Gemeinsam stark",
    text: "Aus hunderten werden tausende Nummern – und damit eine Verhandlungsposition, die einzelne Unternehmen nie erreichen.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Doppelte Vorteile",
    text: "Großkundenrabatte durch Bündelung plus individuelle Optimierung jedes einzelnen Vertrags.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Sicher & fair",
    text: "Klare Maximalpreise, volle Transparenz bei allen Konditionen und keine versteckten Kosten.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Spürbare Einsparungen",
    text: "Deutlich geringere Mobilfunkkosten – messbar, nachvollziehbar und ab dem ersten Monat wirksam.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default function MobilfunkkostenPage() {
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
                <h1 className="text-4xl font-bold tracking-tight text-[#F1F5F9] md:text-6xl">
                  Mobilfunkkosten senken
                </h1>
                <p className="mt-6 max-w-xl text-lg text-[#94A3B8] md:text-xl">
                  Wir bündeln alle Kunden und Rufnummern in unserem Portfolio. So
                  entsteht ein Auftragsvolumen, das kein Einzelkunde erreichen kann.
                </p>

                {/* Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  {[
                    "Stärkere Verhandlungsposition",
                    "Direkte Kostenvorteile",
                    "Maximale Transparenz",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-[#0A1628] px-5 py-2.5 text-sm font-medium text-[#F1F5F9]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/kontaktanfrage"
                  className="mt-10 inline-block rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-8 py-3.5 text-base font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#D4A843]/25"
                >
                  Jetzt unverbindlich anfragen
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/02a2bf9e-8349-41b6-8175-190d116ff2a2/preview"
                  alt="Mobilfunkkosten senken"
                  className="w-full rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem / Solution ── */}
        <section>
          {/* Problem */}
          <div className="bg-[#0A1628] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                <div className="flex-1">
                  <img
                    src="https://onecdn.io/media/2707ff84-e9b4-4d3c-a3be-b3edf13a2ccb/preview"
                    alt="Das Problem – begrenzte Verhandlungsmacht"
                    className="w-full rounded-3xl object-cover shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B]">
                    Das Problem
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl">
                    Begrenzte Verhandlungsmacht.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                    Unternehmen mit einigen hundert Nummern stehen oft allein vor dem
                    Anbieter. Die Konditionen bleiben im Vergleich zu echten
                    Großkunden deutlich schlechter. Ohne ausreichendes Volumen fehlt
                    die Marktmacht.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-[#050A14] py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
                <div className="flex-1">
                  <img
                    src="https://onecdn.io/media/22122715-b34e-4144-87ba-b2960efd6b3b/preview"
                    alt="Die Lösung – gebündelte Verhandlungsstärke"
                    className="w-full rounded-3xl object-cover shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A843]">
                    Die Lösung
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl">
                    Mehrere tausend Nummern – eine starke Stimme.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                    Wir bündeln die Verträge und Nummern all unserer Kunden. Damit
                    treten wir beim Anbieter wie ein Konzernkunde auf und sichern
                    Rabatte, die ein einzelnes Unternehmen nie erreichen würde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="bg-[#0A1628] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
                  Warum Kunden mit uns sparen
                </h2>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#1E293B] bg-[#111D33] p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A843]/10 text-[#D4A843]">
                        {item.icon}
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-[#F1F5F9]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/ad6d4112-caaf-47e6-8ad4-e0ec36664e06/preview"
                  alt="Highlights – Warum Kunden mit uns sparen"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Story Cards: Mehr als nur günstige Tarife ── */}
        <section className="bg-[#050A14] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
              Mehr als nur günstige Tarife
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#94A3B8]">
              Hinter jeder Mobilfunkrechnung stecken Geschichten. Hier sind
              einige, die wir für unsere Kunden gelöst haben.
            </p>

            <div className="mt-16 space-y-10">
              {/* Story 1: Hardware-Friedhof */}
              <div className="flex flex-col overflow-hidden rounded-3xl bg-[#111D33] shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row">
                <div className="md:w-5/12">
                  <img
                    src="https://onecdn.io/media/bf2df469-893e-4056-9f8f-702d8039ae94/preview"
                    alt="Der Hardware-Friedhof"
                    className="h-full w-full object-cover md:rounded-l-3xl"
                    style={{ minHeight: "280px" }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
                  <h3 className="text-2xl font-bold tracking-tight text-[#F1F5F9]">
                    Der Hardware-Friedhof
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                    In Schubladen stapeln sich ungenutzte Smartphones und Tablets. Niemand
                    weiß, welche Geräte noch aktiv sind, welche ersetzt wurden und welche nur
                    Staub ansetzen. Wir haben Lifecycle Management aufgebaut: erfassen,
                    wiederverwenden, recyceln.
                  </p>
                  <Link
                    href="/dlm"
                    className="mt-6 inline-flex items-center text-base font-medium text-[#D4A843] transition-colors duration-200 hover:text-[#F59E0B]"
                  >
                    Zur DLM-Lösung
                    <span className="ml-1">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Story 2: Blind Billing (reversed) */}
              <div className="flex flex-col overflow-hidden rounded-3xl bg-[#111D33] shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row-reverse">
                <div className="md:w-5/12">
                  <img
                    src="https://onecdn.io/media/d2784758-5b87-425e-af23-13e55667dca7/preview"
                    alt="Blind Billing"
                    className="h-full w-full object-cover md:rounded-r-3xl"
                    style={{ minHeight: "280px" }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
                  <h3 className="text-2xl font-bold tracking-tight text-[#F1F5F9]">
                    Blind Billing
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                    Jeden Monat landet die Rechnung im Finanzteam. Dutzende Posten, kryptische
                    Codes, kaum nachvollziehbar. Wer prüft das? Meist niemand. Wir haben das
                    System geändert: Rechnungen transparent, Reports klar.
                  </p>
                </div>
              </div>

              {/* Story 3: Roaming-Desaster */}
              <div className="flex flex-col overflow-hidden rounded-3xl bg-[#111D33] shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row">
                <div className="md:w-5/12">
                  <img
                    src="https://onecdn.io/media/9ac3a52b-24d1-4e2f-9bc8-ef862f04b5fb/preview"
                    alt="Das globale Roaming-Desaster"
                    className="h-full w-full object-cover md:rounded-l-3xl"
                    style={{ minHeight: "280px" }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
                  <h3 className="text-2xl font-bold tracking-tight text-[#F1F5F9]">
                    Das globale Roaming-Desaster
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                    Eine Geschäftsreise, ein Videocall im Ausland – und plötzlich vierstellige
                    Beträge auf der Rechnung. Wir haben passende globale Pakete eingerichtet,
                    die solche Überraschungen verhindern.
                  </p>
                </div>
              </div>

              {/* Story 4: Tarif-Labyrinth (reversed) */}
              <div className="flex flex-col overflow-hidden rounded-3xl bg-[#111D33] shadow-sm transition-all duration-300 hover:shadow-lg md:flex-row-reverse">
                <div className="md:w-5/12">
                  <img
                    src="https://onecdn.io/media/3c41019e-d4d7-4697-a58c-40b6a84c41cd/preview"
                    alt="Verloren im Tarif-Labyrinth"
                    className="h-full w-full object-cover md:rounded-r-3xl"
                    style={{ minHeight: "280px" }}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
                  <h3 className="text-2xl font-bold tracking-tight text-[#F1F5F9]">
                    Verloren im Tarif-Labyrinth
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
                    Der Telekommarkt ist ein Labyrinth aus Tarifen, Optionen und
                    Sonderkonditionen. Wer soll da noch durchblicken? Wir setzen an: Mit
                    neutralen Benchmarks und strukturierter Analyse finden wir den optimalen
                    Weg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-gradient-to-b from-[#0A1628] to-[#050A14] py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
              Bereit, Mobilfunkkosten zu senken?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[#94A3B8]">
              Lassen Sie uns gemeinsam Ihr Einsparpotenzial analysieren –
              unverbindlich und kostenfrei.
            </p>
            <Link
              href="/kontaktanfrage"
              className="mt-10 inline-block rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-8 py-3.5 text-base font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#D4A843]/25"
            >
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
