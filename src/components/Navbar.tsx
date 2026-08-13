"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { produkte } from "@/lib/produkte";

const navLinks = [
  { label: "Startseite", href: "/" },
  {
    label: "Produkte",
    href: "/produkte",
    dropdown: [
      ...produkte.map((p) => ({ label: p.name, href: p.url, extern: true })),
      { label: "Mitarbeitervorteile", href: "/mitarbeitervorteile", extern: false },
    ],
  },
  { label: "Partner", href: "/partner" },
  { label: "Unternehmen", href: "/unternehmen" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Smart Signals" width={600} height={319} priority className="h-8 w-auto" />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label} className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-[#475569] hover:text-[#0F172A]">
                  {link.label}
                  <svg className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className={`absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all ${
                  dropdownOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                  <ul className="min-w-[220px] rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-lg">
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        {item.extern ? (
                          <a href={item.href} target="_blank" rel="noopener"
                            className="flex items-center justify-between gap-2 rounded-md px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                            {item.label}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-[#94A3B8]">
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ) : (
                          <Link href={item.href}
                            className="block rounded-md px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-medium text-[#475569] hover:text-[#0F172A]">
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/kontaktanfrage"
            className="hidden items-center gap-2 rounded-full bg-[#F08A3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#D97320] md:inline-flex">
            Kontakt aufnehmen
          </Link>
          <button className="relative h-6 w-6 md:hidden" onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={mobileOpen}>
            <span className={`absolute left-0 block h-0.5 w-6 bg-[#0F172A] transition-all ${mobileOpen ? "top-3 rotate-45" : "top-1"}`} />
            <span className={`absolute left-0 top-3 block h-0.5 w-6 bg-[#0F172A] transition-all ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-6 bg-[#0F172A] transition-all ${mobileOpen ? "top-3 -rotate-45" : "top-5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className={`overflow-hidden border-t border-[#E2E8F0] bg-white transition-all md:hidden ${mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0"}`}>
        <ul className="space-y-1 px-6 py-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label}>
                <button
                  onClick={() => setMobileDropdownOpen((p) => !p)}
                  aria-expanded={mobileDropdownOpen}
                  className="flex w-full items-center justify-between py-2 text-sm font-medium text-[#475569]">
                  {link.label}
                  <svg className={`h-4 w-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className={`overflow-hidden pl-4 transition-all ${mobileDropdownOpen ? "max-h-[600px]" : "max-h-0"}`}>
                  <li>
                    <Link href="/produkte" onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-[#475569]">Übersicht</Link>
                  </li>
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      {item.extern ? (
                        <a href={item.href} target="_blank" rel="noopener" className="block py-2 text-sm text-[#475569]">
                          {item.label}
                        </a>
                      ) : (
                        <Link href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[#475569]">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm font-medium text-[#475569]">
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li className="pt-2">
            <Link href="/kontaktanfrage" onClick={() => setMobileOpen(false)}
              className="block rounded-full bg-[#F08A3A] px-5 py-2.5 text-center text-sm font-semibold text-white">
              Kontakt aufnehmen
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
