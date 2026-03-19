import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VorteilsRechner from "@/components/VorteilsRechner";

const highlights = [
  {
    title: "Steuervorteil",
    text: "Ihre Mitarbeiter profitieren sofort – steuerlich begünstigt über die Payroll.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Familien inklusive",
    text: "Partner, Kinder und Eltern können die Vorteile ebenfalls nutzen.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "0 € Aufwand für Arbeitgeber",
    text: "Keine Implementierung, keine Verwaltung, kein Risiko.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Messbarer Nutzen",
    text: "Ein Benefit, der echte Entlastung schafft und Ihre Arbeitgebermarke stärkt.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Gerät auswählen",
    text: "Der Mitarbeitende wählt ganz einfach das Gerät seiner Wahl aus dem Katalog.",
  },
  {
    number: "02",
    title: "Gehaltsabrechnung",
    text: "Die monatliche Rate wird über die Gehaltsabrechnung abgewickelt – steuerlich begünstigt.",
  },
  {
    number: "03",
    title: "Lieferung",
    text: "Das Gerät wird direkt an die Wunschadresse geliefert. Am Ende der Laufzeit: Herauskauf für 4,76 %.",
  },
];

export default function MitarbeiterVorteilePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#050A14] to-[#111D33] pb-20 pt-28 md:pb-32 md:pt-32">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D4A843]/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#D4A843]/8 blur-3xl" />

          <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-16">
            {/* LEFT - Text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-[#F1F5F9] sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]">
                Mitarbeitervorteile{" "}
                <span className="bg-gradient-to-r from-[#D4A843] to-[#F59E0B] bg-clip-text text-transparent">
                  für Ihr Unternehmen
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#94A3B8] md:text-xl lg:mx-0">
                Exklusive Benefits für Ihre Mitarbeiter und deren Familien –
                steuerlich begünstigt über die Gehaltsabrechnung. Ohne Kosten,
                ohne Aufwand.
              </p>

              {/* Pill badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {[
                  { label: "0 € Aufwand", emoji: "✅" },
                  { label: "Familienmitglieder", emoji: "👨‍👩‍👧‍👦" },
                  { label: "Steuerlich begünstigt", emoji: "💶" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D4A843]/15 bg-[#111D33]/80 px-5 py-2.5 text-sm font-medium text-[#F1F5F9] shadow-sm backdrop-blur-sm"
                  >
                    <span>{badge.emoji}</span>
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href="#rechner"
                  className="inline-block rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-[#D4A843]/25 transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-xl hover:shadow-[#D4A843]/30"
                >
                  Zum Vorteilsrechner
                </a>
              </div>
            </div>

            {/* RIGHT - Image */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#D4A843]/20 to-[#F59E0B]/20 blur-2xl" />
                <img
                  src="https://onecdn.io/media/c889227a-1d47-4409-83cb-f6618991b0c6/preview"
                  alt="Familie mit Geräten"
                  className="relative w-full rounded-3xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem / Solution ── */}
        <section>
          {/* Problem */}
          <div className="bg-[#0A1628] py-20 md:py-28">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-20">
              {/* LEFT - Image */}
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/bbc99a8e-15ae-424b-b88b-364592122a7d/preview"
                  alt="Benefits ohne Wirkung"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>

              {/* RIGHT - Text */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">
                  Das Problem
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl lg:text-5xl">
                  Benefits ohne Wirkung.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                  Viele Unternehmen wollen ihren Mitarbeitern etwas bieten, aber
                  klassische Vorteile sind teuer, kompliziert oder werden kaum
                  genutzt. Rabattportale sind überfüllt und austauschbar.
                  Hardware-Zuschüsse verursachen Verwaltungsaufwand. Und echte
                  finanzielle Entlastung für Mitarbeiter bleibt meistens aus.
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-[#050A14] py-20 md:py-28">
            <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-20">
              {/* LEFT - Text */}
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A843]">
                  Die Lösung
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-4xl lg:text-5xl">
                  Vorteile, die wirklich ankommen.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#94A3B8]">
                  Mit Smart Signals erhalten Ihre Mitarbeiter exklusive Angebote –
                  z.&nbsp;B. für Produkte wie Smartphones – steuerlich begünstigt
                  über die Gehaltsabrechnung. Ohne Kosten für Arbeitgeber. Ein
                  moderner Benefit, der nicht nur dem Mitarbeiter nutzt, sondern
                  auch seiner Familie.
                </p>
                <p className="mt-8 text-2xl font-semibold tracking-tight text-[#F1F5F9]">
                  Smart. Fair. Sofort einsetzbar.
                </p>
              </div>

              {/* RIGHT - Image */}
              <div className="flex-1">
                <img
                  src="https://onecdn.io/media/2381340e-3e73-40bc-99d4-f34711c88de9/preview"
                  alt="Vorteile die ankommen"
                  className="w-full rounded-3xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="relative overflow-hidden bg-[#0A1628] py-24 md:py-32">
          {/* Background image (decorative, faded) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <img
              src="https://onecdn.io/media/dbac69ae-ffeb-46de-940e-7155e2ba8005/preview"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A843]">
                Warum Smart Signals
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
                Was Smart Signals auszeichnet
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
                Alles, was ein moderner Mitarbeitervorteil braucht – in einer Lösung.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-2xl bg-[#111D33] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Gradient border effect */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-[#D4A843]/10 via-transparent to-[#F59E0B]/10 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]" />

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4A843] to-[#F59E0B] text-white shadow-lg shadow-[#D4A843]/20 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-[#F1F5F9]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#94A3B8]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlights image */}
            <div className="mt-16">
              <img
                src="https://onecdn.io/media/dbac69ae-ffeb-46de-940e-7155e2ba8005/preview"
                alt="Smart Signals Highlights"
                className="mx-auto w-full max-w-4xl rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* ── Three Steps ── */}
        <section className="bg-[#050A14] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A843]">
                So einfach geht&apos;s
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F1F5F9] md:text-5xl">
                In drei Schritten zum Benefit
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative mt-20">
              {/* Connecting line (desktop only) */}
              <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-[#D4A843]/20 to-transparent md:block" />

              <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
                {steps.map((step, idx) => (
                  <div key={step.number} className="relative text-center">
                    {/* Number circle */}
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4A843] to-[#F59E0B] opacity-10" />
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4A843] bg-[#050A14]">
                        <span className="text-lg font-bold text-[#D4A843]">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Connector dots on mobile */}
                    {idx < steps.length - 1 && (
                      <div className="mx-auto my-4 flex flex-col items-center gap-1 md:hidden">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B]/30" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B]/20" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B]/10" />
                      </div>
                    )}

                    <h3 className="mt-6 text-xl font-semibold text-[#F1F5F9]">
                      {step.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-[#94A3B8]">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps image */}
            <div className="mt-20">
              <img
                src="https://onecdn.io/media/545f1803-d9dc-45e7-8bca-d25093a3adfb/preview"
                alt="Prozess Schritte"
                className="mx-auto w-full max-w-5xl rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section id="rechner">
          <VorteilsRechner />
        </section>
      </main>

      <Footer />
    </>
  );
}
