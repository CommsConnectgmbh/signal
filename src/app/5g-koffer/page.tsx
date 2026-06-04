import { permanentRedirect } from "next/navigation";

// Markenkonflikt aufgelöst: "5G Koffer" wird von Case Connect geführt.
// Diese Seite leitet dauerhaft auf die verkaufsfähige Produktseite weiter,
// um Ranking + Traffic zu bündeln statt Keyword-Kannibalisierung.
export default function Page() {
  permanentRedirect("https://case-connect.de");
}
