"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Startseite", href: "/" },
  {
    label: "Leistungen",
    href: "/leistungen",
    dropdown: [
      { label: "Mitarbeitervorteile", href: "/mitarbeitervorteile" },
      { label: "Mobilfunkkosten senken", href: "/mobilfunkkosten" },
      { label: "5G Koffersystem", href: "/5g-koffer" },
    ],
  },
  { label: "Karriere", href: "/karriere" },
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
          <img src="/logo.png" alt="Smart Signals" className="h-8" />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label} className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}>
                <button
                  className="flex items-center gap-1 text-sm font-medium text-[#475569] hover:text-[#0F172A]"
                  onClick={() => setDropdownOpen((prev) => !prev)}>
                  {link.label}
                  <svg className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all ${
                  dropdownOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                  <ul className="min-w-[220px] rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-lg">
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}
                          className="block rounded-md px-4 py-2.5 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]">
                          {item.label}
                        </Link>
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
            className="hidden items-center gap-2 rounded-full bg-[#16A34A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15803D] md:inline-flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Jetzt unverbindlich anfragen
          </Link>
          <button className="relative h-6 w-6 md:hidden" onClick={() => setMobileOpen((p) => !p)}>
            <span className={`absolute left-0 block h-0.5 w-6 bg-[#0F172A] transition-all ${mobileOpen ? "top-3 rotate-45" : "top-1"}`} />
            <span className={`absolute left-0 top-3 block h-0.5 w-6 bg-[#0F172A] transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-6 bg-[#0F172A] transition-all ${mobileOpen ? "top-3 -rotate-45" : "top-5"}`} />
          </button>
        </div>
      </div>
      <div className={`overflow-hidden border-t border-[#E2E8F0] bg-white transition-all md:hidden ${mobileOpen ? "max-h-screen pb-6" : "max-h-0 border-t-0"}`}>
        <ul className="px-6 pt-4 space-y-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label}>
                <button className="flex w-full items-center justify-between py-3 text-base font-medium text-[#475569]"
                  onClick={() => setMobileDropdownOpen((p) => !p)}>
                  {link.label}
                  <svg className={`h-4 w-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className={`overflow-hidden transition-all ${mobileDropdownOpen ? "max-h-48" : "max-h-0"}`}>
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block py-2.5 pl-4 text-sm text-[#94A3B8] hover:text-[#0F172A]"
                        onClick={() => setMobileOpen(false)}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className="block py-3 text-base font-medium text-[#475569] hover:text-[#0F172A]"
                  onClick={() => setMobileOpen(false)}>{link.label}</Link>
              </li>
            )
          )}
          <li className="pt-4">
            <Link href="/kontaktanfrage"
              className="flex items-center justify-center rounded-full bg-[#16A34A] py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}>Jetzt unverbindlich anfragen</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
