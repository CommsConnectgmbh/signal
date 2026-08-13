import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Markenkonflikt aufgelöst: "5G Koffer" wird von Case Connect geführt.
      // Bündelt Ranking + Traffic auf die verkaufsfähige Seite (case-connect.de).
      {
        source: "/5g-koffer",
        destination: "https://case-connect.de",
        permanent: true,
      },
      // Markentrennung 2026-08-13: Smart Signals ist die Produktmarke der
      // Comms Connect GmbH und führt ausschließlich die eigenen Software-
      // Produkte. Das Telko-Geschäft (Mobilfunk-Brokerage) bleibt bei
      // Comms Connect. Bestehende Links und Rankings landen dort, statt
      // auf einer 404.
      {
        source: "/mobilfunkkosten",
        destination: "https://comms-connect.de",
        permanent: true,
      },
      // Die alte Leistungsübersicht ist die neue Produktübersicht.
      {
        source: "/leistungen",
        destination: "/produkte",
        permanent: true,
      },
      // Karriere war reines Vertriebler-Recruiting und geht im
      // Partnerprogramm auf.
      {
        source: "/karriere",
        destination: "/partner",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
