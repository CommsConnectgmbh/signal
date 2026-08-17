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
    default: "Smart Signals: Software empfehlen statt selbst bauen",
    template: "%s · Smart Signals",
  },
  description:
    "Partnerprogramm für Freelancer und Berater: sieben eigene Software-Produkte, ein Rahmenvertrag. Du empfiehlst, wir schließen ab, rechnen ab und machen den Support. Kein Invest, keine Abnahmepflicht.",
  keywords: [
    "Software als Vertriebspartner verkaufen",
    "SaaS Vertriebspartner werden",
    "Empfehlungsprogramm Software",
    "Freelancer Vertrieb Software",
    "Tippgeber Software Provision",
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
    title: "Smart Signals: Software empfehlen statt selbst bauen",
    description:
      "Sieben eigene Software-Produkte, ein Rahmenvertrag. Du empfiehlst, wir schließen ab und rechnen ab.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Signals: Software empfehlen statt selbst bauen",
    description:
      "Sieben eigene Software-Produkte, ein Rahmenvertrag. Du empfiehlst, wir schließen ab und rechnen ab.",
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
  themeColor: "#186088",
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

// Bewusst ein Inline-Skript im <head> statt einer Komponente: es muss vor dem
// ersten Paint laufen, sonst blitzt der fertige Inhalt kurz auf, bevor er sich
// versteckt. Und es versteckt nur, wenn es auch wieder einblenden kann.
const REVEAL_SCRIPT = `
(function () {
  var d = document, r = d.documentElement;
  if (!("IntersectionObserver" in window)) return;
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch (e) { return; }
  r.setAttribute("data-reveal", "");
  function init() {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.setAttribute("data-shown", "");
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
    var els = d.querySelectorAll(".ss-reveal");
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", init);
  else init();
})();
`;

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
        {/* Laeuft vor dem ersten Paint. Setzt den Verborgen-Zustand nur,
            wenn er ihn auch wieder aufloesen kann. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
