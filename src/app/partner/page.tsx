import PartnerClient from "@/components/PartnerClient";

export const metadata = {
  title: "Partnerprogramm",
  description:
    "Ein Rahmenvertrag für das gesamte Smart-Signals-Portfolio: empfehlen statt verkaufen, Konditionen je Produkt als Anlage. Für Berater, Kanzleien und Vertriebspartner.",
  alternates: { canonical: "https://smart-signals.de/partner" },
};

export default function PartnerPage() {
  return <PartnerClient />;
}
