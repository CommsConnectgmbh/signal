"use client";

import { motion } from "framer-motion";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Was genau macht Smart Signals?",
    a: "Smart Signals ist ein B2B-Brokerage fuer Konnektivitaet und Mitarbeiter-Benefits im deutschen Mittelstand. Wir verhandeln Mobilfunkkonditionen, setzen 5G-Konnektivitaet vor Ort um und bauen Smartphone-Benefit-Programme fuer Mitarbeiter. Neutral, gebuendelt, ausgelagert.",
  },
  {
    q: "Wann startet das neue Angebot?",
    a: "Die bestehenden Module Mitarbeiter-Benefits, Mobilfunkkosten und 5G-Koffer sind heute verfuegbar. Erweiterungen wie das mandantenfaehige Enterprise-Portal werden im Quartalstakt ausgerollt. Den genauen Status nennen wir Ihnen im Erstgespraech.",
  },
  {
    q: "Wie ist das Pricing-Modell aufgebaut?",
    a: "Wir arbeiten nicht mit pauschalen Abos. Starter-Projekte starten kostenfrei mit Bedarfsanalyse. Pro- und Enterprise-Pakete werden auf Basis Mitarbeiterzahl, Modul-Auswahl und vereinbarten SLAs kalkuliert. Sie bekommen vor Vertragsschluss eine klare Aufstellung.",
  },
  {
    q: "Wie steht es um DSGVO und Datenschutz?",
    a: "Alle Datenverarbeitungen liegen auf Servern in der EU. Wir schliessen mit jedem Kunden einen AV-Vertrag nach Art. 28 DSGVO. Mitarbeiterdaten fuer Benefit-Programme werden ausschliesslich pseudonymisiert an Carrier und Hersteller uebermittelt, sofern fuer die Vertragserfuellung erforderlich.",
  },
  {
    q: "Gibt es eine On-Premise- oder Private-Cloud-Option?",
    a: "Ja. Fuer Enterprise-Kunden mit besonderen Compliance-Anforderungen (Banken, Versicherungen, oeffentlicher Sektor) bieten wir eine Private-Cloud-Variante des Portals in einer dedizierten Tenant-Umgebung an. ISO 27001 und BSI C5 Type 2 sind in Vorbereitung.",
  },
  {
    q: "Welche Integrationen gibt es?",
    a: "Standard-Konnektoren fuer DATEV (Lohnabrechnung), SAP SuccessFactors, Personio und Microsoft Entra ID. Carrier-seitig sind Telekom, Vodafone und O2 angebunden. Weitere Systeme werden im Rahmen von Enterprise-Projekten umgesetzt.",
  },
  {
    q: "Wie lange dauert der Rollout?",
    a: "Ein Mobilfunk-Pooling-Wechsel dauert in der Regel zwei bis sechs Wochen, abhaengig von Carrier und Volumen. Mitarbeiter-Benefit-Programme sind innerhalb von acht Wochen produktiv. 5G-Koffer-Loesungen sind sofort einsetzbar.",
  },
  {
    q: "Wie wechsle ich von meinem aktuellen Anbieter?",
    a: "Wir uebernehmen die Kuendigung beim Bestandsanbieter, koordinieren die Portierung und stellen den parallelen Betrieb sicher, bis der Wechsel abgeschlossen ist. Ihre Mitarbeiter erleben keinen Ausfall.",
  },
];

const enter = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-28 px-4 sm:px-6 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            {...enter}
            className="text-xs font-semibold uppercase tracking-widest text-[#2D7FF9] inline-block mb-3"
          >
            Antworten
          </motion.span>
          <motion.h2
            {...enter}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] mb-4"
          >
            Haeufige Fragen
          </motion.h2>
          <motion.p
            {...enter}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#475569] leading-relaxed"
          >
            Wenn Ihre Frage hier nicht beantwortet wird, schreiben Sie uns. Wir antworten in der Regel innerhalb eines Werktags.
          </motion.p>
        </div>

        <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0] bg-white rounded-2xl px-6">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <span className="text-base sm:text-lg font-semibold text-[#0F172A] pr-4">
                  {item.q}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] text-[#475569] transition-colors group-open:bg-[#2D7FF9] group-open:border-[#2D7FF9] group-open:text-white">
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
