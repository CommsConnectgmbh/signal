import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /start ist die Klick-Tuer (Weiterleitung), keine Seite.
        disallow: ["/api", "/login", "/portal", "/start"],
      },
    ],
    sitemap: "https://smart-signals.de/sitemap.xml",
    host: "https://smart-signals.de",
  };
}
