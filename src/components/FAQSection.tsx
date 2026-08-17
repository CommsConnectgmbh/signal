"use client";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "Was ist Smart Signals?",
    a: "Smart Signals ist die Marke, unter der wir unsere eigenen Software-Produkte bündeln. Entwickelt und betrieben werden sie von der Comms Connect GmbH. Jedes Produkt hat eine eigene Seite, einen eigenen Vertrag und einen eigenen Preis.",
  },
  {
    q: "Muss ich mehrere Produkte nehmen?",
    a: "Nein. Sie buchen genau das Produkt, das Sie brauchen. Es gibt keine Grundgebühr für das Portfolio und keine Plattform, die Sie vorher kaufen müssten.",
  },
  {
    q: "Wo finde ich die Preise?",
    a: "Auf der jeweiligen Produktseite. Wir führen die Preise bewusst nur an einer Stelle, damit sie überall aktuell sind.",
  },
  {
    q: "Wer ist mein Vertragspartner?",
    a: "Die Comms Connect GmbH, Tal 30, 80331 München. Smart Signals ist die Produktmarke dieser Gesellschaft, keine eigene Firma. Rechnungen und Auftragsverarbeitungsverträge laufen entsprechend über die Comms Connect GmbH.",
  },
  {
    q: "Wie steht es um Datenschutz?",
    a: "Die Produkte laufen auf Servern in der EU. Einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO stellen wir bereit. Details je Produkt stehen in dessen Datenschutzerklärung.",
  },
  {
    q: "Wer macht den Support?",
    a: "Der Support läuft direkt über das jeweilige Produkt, weil dort die Leute sitzen, die es gebaut haben. Wenn Sie nicht weiterkommen, erreichen Sie uns auch über das Kontaktformular auf dieser Seite.",
  },
  {
    q: "Kann ich die Produkte weiterempfehlen?",
    a: "Ja. Für Berater, Kanzleien und Vertriebspartner gibt es ein Partnerprogramm mit einem Rahmenvertrag für das gesamte Portfolio. Die Konditionen nennen wir nach der Anmeldung.",
  },
  {
    q: "Was ist mit Mobilfunk und Telekommunikation?",
    a: "Das ist das Geschäft der Comms Connect GmbH und läuft dort weiter, unter comms-connect.de. Smart Signals steht ausschließlich für die Software-Produkte.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-28 px-4 sm:px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="ss-reveal text-xs font-semibold uppercase tracking-widest text-brand inline-block mb-3"
          >
            Antworten
          </span>
          <h2
            style={{ animationDelay: "60ms" }}
            className="ss-reveal text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-4"
          >
            Häufige Fragen
          </h2>
          <p
            style={{ animationDelay: "120ms" }}
            className="ss-reveal text-lg text-text-secondary leading-relaxed"
          >
            Wenn Ihre Frage hier nicht beantwortet wird, schreiben Sie uns. Wir antworten in der Regel innerhalb eines Werktags.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border bg-white rounded-2xl px-6">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                <span className="text-base sm:text-lg font-semibold text-text-primary pr-4">
                  {item.q}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors group-open:bg-brand group-open:border-brand group-open:text-white">
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
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
