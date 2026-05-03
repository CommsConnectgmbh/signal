import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// next/font/google self-hostet die Schriften zur Build-Zeit auf der eigenen Domain
// (kein direkter Browser-Request an fonts.googleapis.com / fonts.gstatic.com).
// DSGVO-Vorteil: keine IP-Übermittlung an Google USA, kein Cookie-Consent für
// Schriftauslieferung erforderlich (vgl. LG München I 20.01.2022, Az. 3 O 17493/20).
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://smart-signals.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Smart Signals — Konnektivität, Mobilität & Mitarbeiter-Benefits für den Mittelstand",
    template: "%s · Smart Signals",
  },
  description:
    "Skalierbare B2B-Lösungen für Mobilfunkkosten, 5G-Konnektivität und Mitarbeiter-Benefits. Smart Signals verbindet den Mittelstand mit modernen Arbeitswelten — neutral, gebündelt, ausgelagert.",
  keywords: [
    "Mitarbeiter-Benefits Mittelstand",
    "Mobilfunkkosten senken",
    "5G Koffer",
    "Firmen-Smartphone",
    "B2B Mobilfunk",
    "Mobilfunk Pooling",
    "Diensthandy Benefit",
    "Sachbezug Smartphone",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Smart Signals",
    title: "Smart Signals — Konnektivität, Mobilität & Mitarbeiter-Benefits",
    description:
      "Skalierbare B2B-Lösungen für den Mittelstand. Mobilfunkkosten senken, 5G überall verfügbar, Smartphones als Mitarbeiter-Benefit — neutral und ausgelagert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Signals — B2B Konnektivität & Benefits",
    description:
      "Mobilfunkkosten senken, 5G überall, Smartphones als Benefit. Für den Mittelstand.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Smart Signals",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      description:
        "B2B-Brokerage für Konnektivität, Mobilität und Mitarbeiter-Benefits im deutschen Mittelstand.",
      areaServed: ["DE", "AT", "CH"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        availableLanguage: ["de", "en"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Smart Signals",
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
