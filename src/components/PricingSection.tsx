"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Tier = {
  name: string;
  eyebrow: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    eyebrow: "Für Pilotprojekte",
    price: "ab 0 €",
    priceSuffix: "pro Monat",
    description:
      "Erstgespraech, Bedarfsanalyse und Einstieg in eines unserer Module. Geeignet fuer Unternehmen bis 50 Mitarbeiter.",
    features: [
      "Kostenfreie Bedarfsanalyse",
      "Ein Modul Ihrer Wahl",
      "Bis 50 Mitarbeiter",
      "Persoenlicher Ansprechpartner",
      "E-Mail-Support innerhalb 24 h",
    ],
    cta: "Anfragen",
    ctaHref: "/kontaktanfrage",
  },
  {
    name: "Pro",
    eyebrow: "Empfohlen fuer den Mittelstand",
    price: "individuell",
    priceSuffix: "auf Basis Mitarbeiterzahl",
    description:
      "Volle Bandbreite: Mobilfunk-Pooling, Mitarbeiter-Benefits und 5G-Konnektivitaet. Verhandlungen, Rollout und laufende Betreuung inklusive.",
    features: [
      "Alle drei Module kombinierbar",
      "Verhandlung mit Carriern und Herstellern",
      "Rollout-Begleitung",
      "Quartalsweise Reportings",
      "Dediziertes Account-Team",
      "Reaktionszeit unter 4 h",
      "On-Site-Termine nach Abstimmung",
    ],
    cta: "Anfragen",
    ctaHref: "/kontaktanfrage",
    featured: true,
  },
  {
    name: "Enterprise",
    eyebrow: "Ab 500 Mitarbeiter",
    price: "nach Aufwand",
    priceSuffix: "individuelles Modell",
    description:
      "Mandantenfaehige Loesung mit eigenem Portal, kundenspezifischen SLAs und Compliance-Anbindung an DATEV, SAP oder bestehende Prozesse.",
    features: [
      "Mandantenfaehiges Portal",
      "Custom SLAs und Sicherheitsstandards",
      "DATEV-, SAP- und HR-Integration",
      "Mehrere Standorte und Tochterfirmen",
      "Quartalsweise Business Reviews",
      "Eskalationspfad zur Geschaeftsleitung",
    ],
    cta: "Anfragen",
    ctaHref: "/kontaktanfrage",
  },
];

const enter = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <motion.span
            {...enter}
            className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] inline-block mb-3"
          >
            Pakete
          </motion.span>
          <motion.h2
            {...enter}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4"
          >
            Drei Wege, mit Smart Signals zu starten
          </motion.h2>
          <motion.p
            {...enter}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#475569] leading-relaxed"
          >
            Klare Pakete fuer Pilotprojekte, gewachsenen Mittelstand und mandantenfaehige Enterprise-Setups. Kein Abo, kein Kleingedrucktes. Alle Konditionen werden vor dem Start schriftlich fixiert.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={
                "relative flex flex-col rounded-2xl p-8 transition-shadow " +
                (tier.featured
                  ? "border-2 border-[#2D7FF9] bg-white shadow-md md:-translate-y-2"
                  : "border border-[#E2E8F0] bg-white hover:shadow-md")
              }
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2D7FF9] text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  Empfohlen
                </span>
              )}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] mb-2">
                  {tier.eyebrow}
                </p>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-[#0F172A]">{tier.price}</span>
                  <span className="text-sm text-[#94A3B8]">{tier.priceSuffix}</span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">{tier.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#475569]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2D7FF9"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.ctaHref}
                className={
                  "block text-center font-semibold py-3 rounded-full text-sm transition-colors " +
                  (tier.featured
                    ? "bg-[#F08A3A] text-white hover:bg-[#D97320]"
                    : "border border-[#E2E8F0] text-[#0F172A] hover:border-[#2D7FF9] hover:text-[#2D7FF9]")
                }
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-8">
          Alle Pakete ohne Setup-Gebuehr. Vertragslaufzeit und Konditionen werden je Kunde individuell verhandelt.
        </p>
      </div>
    </section>
  );
}
