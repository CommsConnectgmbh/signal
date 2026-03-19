import Link from "next/link";

const footerColumns = [
  {
    title: "Leistungen",
    links: [
      { label: "Mitarbeitervorteile", href: "/mitarbeitervorteile" },
      { label: "Mobilfunkkosten senken", href: "/mobilfunkkosten" },
      { label: "5G Koffersystem", href: "/5g-koffer" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "/unternehmen" },
      { label: "Karriere", href: "/karriere" },
      { label: "Kontakt", href: "/kontaktanfrage" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Datenschutzerklärung", href: "/datenschutz" },
      { label: "Impressum", href: "/impressum" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Smart Signals" className="h-10" />
            </Link>
            <p className="mt-4 text-sm text-[#94A3B8]">
              B2B Vertriebsbusiness für den Mittelstand
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#475569] transition-colors duration-200 hover:text-[#2563EB]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + Copyright */}
        <div className="mt-16 border-t border-[#E2E8F0] pt-8">
          <p className="text-xs text-[#94A3B8]">
            &copy; {currentYear} Smart Signals. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
