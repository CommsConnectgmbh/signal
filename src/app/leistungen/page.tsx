import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Drei B2B-Module für den Mittelstand: Smartphones als Mitarbeiter-Benefit, gebündelte Mobilfunkkonditionen und 5G-Konnektivität aus dem Koffer. Neutral, verhandelt, ausgelagert.",
  alternates: { canonical: "https://smart-signals.de/leistungen" },
};

const leistungen = [
  {
    eyebrow: "Mitarbeiter-Benefits",
    title: "Smartphones als Steuer-Benefit",
    text: "Smartphones, Tablets und Laptops für Ihre Mitarbeiter und deren Familien – steuerlich begünstigt über die Gehaltsabrechnung. Kein Aufwand für den Arbeitgeber.",
    href: "/mitarbeitervorteile",
  },
  {
    eyebrow: "Procurement",
    title: "Mobilfunkkosten senken",
    text: "Wir bündeln Ihr Mobilfunkvolumen mit dem unserer Kunden und erreichen Konditionen, die einzelne Unternehmen nicht verhandeln können.",
    href: "/mobilfunkkosten",
  },
  {
    eyebrow: "Konnektivität",
    title: "5G Koffersystem",
    text: "Einstecken, starten, online. 5G-Konnektivität für Baustellen, Events und als Ausfallsicherung – in unter 60 Sekunden einsatzbereit.",
    href: "/5g-koffer",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-28 pb-32">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">
            Leistungen
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] mb-6">
            Ein Stack für Konnektivität, Mobilität und Benefits
          </h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Smart Signals bündelt drei Module zu einem belastbaren B2B-Stack für
            den Mittelstand. Wählen Sie den passenden Baustein.
          </p>
        </section>

        {/* Module */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leistungen.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 hover:shadow-md hover:border-[#2D7FF9] transition-all"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-3">
                  {l.eyebrow}
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                  {l.title}
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {l.text}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-[#2D7FF9] font-semibold text-sm">
                  Mehr erfahren
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto px-6 text-center mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Nicht sicher, welches Modul passt?
          </h2>
          <p className="mt-4 text-[#475569]">
            In einem kurzen Gespräch ordnen wir Ihren Bedarf ein und zeigen, wo
            Smart Signals den größten Hebel hat.
          </p>
          <Link
            href="/kontaktanfrage"
            className="mt-8 inline-flex items-center gap-2 bg-[#F08A3A] text-white font-semibold px-8 py-3.5 rounded-full text-base hover:bg-[#D97320] transition-colors"
          >
            Jetzt unverbindlich anfragen
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
