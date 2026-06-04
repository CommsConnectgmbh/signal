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
    ];
  },
};

export default nextConfig;
