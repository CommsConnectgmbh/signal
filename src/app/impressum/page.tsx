import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FFFFFF] pt-28 pb-32">
        <article className="mx-auto max-w-3xl px-6 prose prose-invert prose-headings:text-[#0F172A] prose-headings:tracking-tight prose-p:text-[#475569] prose-p:leading-relaxed">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-12">
            Impressum
          </h1>

          <div className="space-y-6 text-[#475569] leading-relaxed">
            <p className="text-lg font-semibold text-[#0F172A]">
              Comms Connect GmbH
            </p>
            <p>
              Tal 30
              <br />
              80331 München
            </p>
            <p>
              Handelsregister: HRB 295951
              <br />
              Registergericht: Amtsgericht München
            </p>
            <p>
              <strong className="text-[#0F172A]">
                Vertretungsberechtigter Geschäftsführer:
              </strong>
              <br />
              Rainer Roloff
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">
              Kontakt
            </h2>
            <p>
              Telefon: +49 (0) 15254564856
              <br />
              E-Mail:{" "}
              <a
                href="mailto:kontakt@smart-signals.de"
                className="text-[#2563EB] hover:underline"
              >
                kontakt@smart-signals.de
              </a>
            </p>
            <p>
              Smart Signals ist ein Angebot der Comms Connect GmbH.
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
              <br />
              DE451966748
            </p>

            <h2 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Die Comms Connect GmbH ist weder bereit noch verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
