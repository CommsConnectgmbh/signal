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
      { label: "Mobilfunkkosten", href: "/mobilfunkkosten" },
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
    <nav className="fixed top-0 z-50 w-full border-b border-[#1E293B] bg-[#050A14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Smart Signals" className="h-8 brightness-0 invert" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium text-[#94A3B8] transition-colors duration-200 hover:text-white"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200 ${
                    dropdownOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="min-w-[220px] rounded-lg border border-[#1E293B] bg-[#0A1628] p-2 shadow-xl">
                    {link.dropdown.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-4 py-2.5 text-sm text-[#94A3B8] transition-colors duration-150 hover:bg-[#1E293B]/50 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#94A3B8] transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-[#94A3B8] transition-colors hover:text-white md:inline-block"
          >
            Partner Login
          </Link>
          <Link
            href="/kontaktanfrage"
            className="hidden rounded-md bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-5 py-2 text-sm font-semibold text-[#050A14] transition-all duration-200 hover:opacity-90 hover:shadow-md md:inline-block"
          >
            Jetzt anfragen
          </Link>

          {/* Hamburger */}
          <button
            className="relative h-6 w-6 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
          >
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-[#F1F5F9] transition-all duration-300 ${
                mobileOpen ? "top-3 rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-6 bg-[#F1F5F9] transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-[#F1F5F9] transition-all duration-300 ${
                mobileOpen ? "top-3 -rotate-45" : "top-5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[#1E293B] bg-[#050A14] transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-screen pb-6" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-6 pt-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label}>
                <button
                  className="flex w-full items-center justify-between py-3 text-base font-medium text-[#94A3B8] transition-colors duration-200 hover:text-white"
                  onClick={() => setMobileDropdownOpen((prev) => !prev)}
                >
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileDropdownOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-2.5 pl-4 text-sm text-[#64748B] transition-colors duration-150 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium text-[#94A3B8] transition-colors duration-200 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li className="pt-4">
            <Link
              href="/kontaktanfrage"
              className="block rounded-md bg-gradient-to-r from-[#D4A843] to-[#F59E0B] px-5 py-3 text-center text-sm font-semibold text-[#050A14] transition-all duration-200 hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              Jetzt anfragen
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
