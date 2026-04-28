import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/login", "/portal"],
      },
    ],
    sitemap: "https://smart-signals.de/sitemap.xml",
    host: "https://smart-signals.de",
  };
}
