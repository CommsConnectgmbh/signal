"use client";

import Link from "next/link";

const features = [
  {
    title: "Mitarbeiter Benefits",
    desc: "Steuerlich begünstigte Vorteile für Ihre Mitarbeiter und deren Familien.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    title: "Mobilfunkkosten",
    desc: "Bis zu 30% Ersparnis durch Volumenbündelung mehrerer Unternehmen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
  },
  {
    title: "5G Koffersystem",
    desc: "Mobiles Enterprise-WLAN in unter 60 Sekunden. IP67-geschützt.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
  },
  {
    title: "Datensicherheit",
    desc: "Verschlüsselte Verbindungen und DSGVO-konforme Prozesse.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Familien inklusive",
    desc: "Partner, Kinder und Eltern profitieren von den Vorteilen mit.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "0 € für Arbeitgeber",
    desc: "Keine Implementierung, keine Verwaltung, kein Risiko.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function HomeClient() {
  return (
    <main>
      {/* ── Announcement Bar ── */}
      <div className="bg-[#f1f5f9] text-center">
        <Link
          href="/5g-koffer"
          className="inline-block px-4 py-2.5 text-sm text-[#0f172a] hover:underline"
        >
          Jetzt neu: 5G Koffersystem für Ihr Unternehmen &rarr;
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#0f172a] md:text-6xl lg:text-7xl">
            Mitarbeiter-Benefits &amp;&nbsp;Mobilfunklösungen für den Mittelstand.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#64748b]">
            Steuerlich begünstigte Benefits. Günstigere Mobilfunkverträge. 5G
            überall. Wir sind Ihr Partner für digitale Zukunftssicherheit.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/kontaktanfrage"
              className="inline-flex items-center rounded-md bg-[#0f172a] px-6 py-3 text-sm font-medium text-white"
            >
              Jetzt anfragen
            </Link>
            <Link
              href="#leistungen"
              className="inline-flex items-center rounded-md border border-[#e2e8f0] px-6 py-3 text-sm font-medium text-[#0f172a]"
            >
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="leistungen" className="border-t border-[#e2e8f0] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">
              Unsere Leistungen
            </h2>
            <p className="mt-3 text-[#64748b]">
              Was Smart Signals für Ihr Unternehmen tun kann.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-[#e2e8f0] p-6"
              >
                <div className="text-[#0f172a]">{f.icon}</div>
                <h3 className="mt-4 font-semibold text-[#0f172a]">{f.title}</h3>
                <p className="mt-1 text-sm text-[#64748b]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlight Text ── */}
      <section className="bg-[#f1f5f9] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg italic text-[#64748b]">
            Smart Signals bietet außerdem einen Blog und umfassende Beratung
            für Ihr Unternehmen.
          </p>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="border-t border-[#e2e8f0] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">
            Vertrauen durch Transparenz
          </h2>
          <p className="mt-3 text-[#64748b]">
            Über 500 Unternehmen im Mittelstand vertrauen Smart Signals.
          </p>
          <p className="mt-8 text-sm text-[#64748b]">
            Comms Connect GmbH &middot; München &middot; kontakt@smart-signals.de
          </p>
        </div>
      </section>
    </main>
  );
}
