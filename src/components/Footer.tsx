import Link from "next/link";
import Image from "next/image";
import { produkte } from "@/lib/produkte";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start">
          <div className="shrink-0">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Smart Signals" width={600} height={319} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted leading-relaxed">
              Smart Signals ist die Produktmarke der Comms Connect GmbH.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-primary">Produkte</h3>
            <ul className="space-y-2">
              {produkte.map((p) => (
                <li key={p.slug}>
                  <a href={p.url} target="_blank" rel="noopener"
                    className="text-sm text-text-secondary hover:text-brand transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/mitarbeitervorteile" className="text-sm text-text-secondary hover:text-brand transition-colors">
                  Mitarbeitervorteile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-primary">Unternehmen</h3>
            <ul className="space-y-2">
              <li><Link href="/produkte" className="text-sm text-text-secondary hover:text-brand transition-colors">Alle Produkte</Link></li>
              <li><Link href="/unternehmen" className="text-sm text-text-secondary hover:text-brand transition-colors">Über uns</Link></li>
              <li><Link href="/#anmeldung" className="text-sm text-text-secondary hover:text-brand transition-colors">Partner werden</Link></li>
              <li><Link href="/kontaktanfrage" className="text-sm text-text-secondary hover:text-brand transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-primary">Rechtsdokumente</h3>
            <ul className="space-y-2">
              <li><Link href="/datenschutz" className="text-sm text-text-secondary hover:text-brand transition-colors">Datenschutzerklärung</Link></li>
              <li><Link href="/impressum" className="text-sm text-text-secondary hover:text-brand transition-colors">Impressum</Link></li>
              <li><Link href="/login" className="text-sm text-text-secondary hover:text-brand transition-colors">Partner-Login</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-text-muted">
          Smart Signals ist eine Marke der Comms Connect GmbH, Tal 30, 80331 München.
          Vertragspartner aller hier gelisteten Angebote ist die Comms Connect GmbH.
        </p>
      </div>
    </footer>
  );
}
