import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Link from "next/link";

const useCases = [
  {
    title: "Baustellen",
    description: "Konnektivität auf der Baustelle – auch tief unten.",
    tags: ["Plug & Play <60s", "500m WLAN", "IP67"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
  {
    title: "Keller & Funklöcher",
    description: "Internet dorthin bringen, wo Mobilfunk nicht hinkommt.",
    tags: ["25m Cat6-Kabel", "Kein Techniker"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
  },
  {
    title: "Events & Messen",
    description: "Enterprise-WLAN für jede Veranstaltung.",
    tags: ["Dediziertes WLAN", "Unabhängig vom Mobilnetz"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Netzfreiheit",
    description: "Jede SIM. Jeder Anbieter. Kein Vendor Lock-in.",
    tags: ["eSIM + Dual-SIM", "Auto-Failover", "Alle Netze"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Starlink-Backup",
    description: "Kein Mobilfunk? Dann kommt das Internet von oben.",
    tags: ["WAN-Port", "Starlink-kompatibel", "Weltweit"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Ausfallsicherung",
    description: "Festnetz weg – Betrieb läuft weiter.",
    tags: ["In <60s online", "Kein IT nötig", "VPN-fähig"],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    question: "Für welche Einsätze eignet sich das System?",
    answer:
      "Ideal für Baustellen, Veranstaltungen, Messen, mobile Teams, Notfalleinsätze oder Standorte ohne feste Internetverbindung.",
  },
  {
    question: "Wie schnell ist die Internetverbindung?",
    answer:
      "Die Geschwindigkeit hängt vom lokalen 5G-Ausbau ab. In gut versorgten Gebieten sind mehrere hundert Mbit/s möglich.",
  },
  {
    question: "Benötigt der Koffer eine externe Stromquelle?",
    answer:
      "Er kann über den integrierten Akku oder externe Stromversorgung betrieben werden. Akkulaufzeit: 8-12 Stunden.",
  },
  {
    question: "Was beinhaltet der Koffer?",
    answer:
      "Ein leistungsstarker Router mit Dual-SIM-Slot, SD-WAN-Fähigkeit und Fernwartungsoption. Zusätzlich ein langes LAN-Kabel. Optional GPS-Tracker.",
  },
];

export default function FiveGKofferPage() {
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
                  Mobiles 5G-Koffersystem
                </h1>
                <p className="mt-6 max-w-xl text-lg text-[#94A3B8] md:text-xl">
                  Stabiles, verschlüsseltes WLAN an jedem Ort – ob auf Baustellen,
                  bei Veranstaltungen oder in mobilen Teams.
                </p>

                {/* Badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  {["Flexibel einsetzbar", "Robust & transportabel", "Sicher & verschlüsselt"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-[#0A1628] px-5 py-2.5 text-sm font-medium text-[#F1F5F9]"
                      >
                        {badge}
                      </span>
                    )
                  )}
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
                  src="https://onecdn.io/media/e470c0a3-ac87-4407-b7e9-168ad33b94ea/preview"
                  alt="5G-Koffersystem"
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
                    src="https://onecdn.io/media/85d6d043-7ac3-4c1d-bf29-c1ecfa2bc043/preview"
                    alt="Das Problem – Netzwerkausfall"
                    className="w-full rounded-3xl object-cover shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B]">
                    Das Problem
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl">
                    Wenn das Netzwerk ausfällt, steht alles still.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                    Auf der Baustelle stehen Maschinen still. Bei Events verlieren
                    Tausende die Verbindung.
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
                    src="https://onecdn.io/media/7f53da36-a3d5-4123-9957-3b7701e9d151/preview"
                    alt="Die Lösung – 5G-Koffersystem"
                    className="w-full rounded-3xl object-cover shadow-xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#D4A843]">
                    Die Lösung
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl">
                    Das 5G-Koffersystem.
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                    Ein tragbares Netzwerk in der Größe eines Aktenkoffers. Einstecken
                    – und Sie sind online. Sofort. Überall. Jederzeit.
                  </p>
                  <p className="mt-6 text-xl font-semibold text-[#F1F5F9]">
                    Entwickelt mit Premium-Komponenten und IP67-Schutz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="bg-[#0A1628] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center gap-16 lg:flex-row">
              <div className="w-full lg:w-1/3">
                <h2 className="text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
                  Entwickelt für echtes Business.
                </h2>
                <p className="mt-6 text-lg text-[#94A3B8]">
                  Sechs Einsatzszenarien. Eine Lösung.
                </p>
                <img
                  src="https://onecdn.io/media/196893f0-5b24-46d2-aa33-e261f0f2662a/preview"
                  alt="Use Cases Highlight"
                  className="mt-10 hidden w-full rounded-3xl object-cover shadow-xl lg:block"
                />
              </div>

              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {useCases.map((useCase) => (
                    <div
                      key={useCase.title}
                      className="rounded-2xl border border-[#1E293B] bg-[#111D33] p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A843]/10 text-[#D4A843]">
                        {useCase.icon}
                      </div>
                      <h3 className="mt-6 text-lg font-semibold text-[#F1F5F9]">
                        {useCase.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                        {useCase.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {useCase.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#D4A843]/10 px-3 py-1 text-xs font-medium text-[#D4A843]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#050A14] py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
              Häufige Fragen
            </h2>
            <div className="mt-16">
              <FAQ items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
