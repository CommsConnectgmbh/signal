import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smart-signals.de";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/produkte`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/mitarbeitervorteile`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/unternehmen`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/kontaktanfrage`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
