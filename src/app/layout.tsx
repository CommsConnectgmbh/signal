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
    default: "Smart Signals: Software für kleine und mittlere Betriebe",
    template: "%s · Smart Signals",
  },
  description:
    "Smart Signals bündelt die eigenen Software-Produkte der Comms Connect GmbH: Belegify für Belege, Obacht für Personaleinsatz, Obacht Talents für Personalvermittlung, Conduit für unterwegs.",
  keywords: [
    "Software für Handwerksbetriebe",
    "Belegerfassung DATEV",
    "Personaleinsatzplanung",
    "Zeiterfassung Betrieb",
    "Personalvermittlung Plattform",
    "Belegify",
    "Obacht",
    "Smart Signals",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "Smart Signals",
    title: "Smart Signals: Software für kleine und mittlere Betriebe",
    description:
      "Belege, Personaleinsatz, Personalvermittlung und mehr. Sieben eigene Produkte aus einem Haus, jedes einzeln buchbar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Signals: Software für kleine und mittlere Betriebe",
    description:
      "Belege, Personaleinsatz, Personalvermittlung und mehr. Sieben eigene Produkte, jedes einzeln buchbar.",
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
      logo: `${SITE_URL}/logo.png`,
      description:
        "Produktmarke der Comms Connect GmbH für eigene Software-Produkte: Belegerfassung, Personaleinsatz, Personalvermittlung und mehr.",
      parentOrganization: {
        "@type": "Organization",
        name: "Comms Connect GmbH",
        url: "https://comms-connect.de",
      },
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
