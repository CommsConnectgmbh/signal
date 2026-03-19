import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start gap-12">
        <Link href="/" className="inline-block shrink-0">
          <img src="/logo.png" alt="Smart Signals" className="h-10" />
        </Link>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Rechtsdokumente</h3>
          <ul className="space-y-2">
            <li><Link href="/datenschutz" className="text-sm text-[#475569] hover:text-[#16A34A] transition-colors">Datenschutzerklärung</Link></li>
            <li><Link href="/impressum" className="text-sm text-[#475569] hover:text-[#16A34A] transition-colors">Impressum</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0F172A]">Unternehmen</h3>
          <ul className="space-y-2">
            <li><Link href="/unternehmen" className="text-sm text-[#475569] hover:text-[#16A34A] transition-colors">Über uns</Link></li>
            <li><Link href="/karriere" className="text-sm text-[#475569] hover:text-[#16A34A] transition-colors">Karriere</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
