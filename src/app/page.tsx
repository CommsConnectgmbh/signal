"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   SECTION WRAPPER (scroll animation)
   ───────────────────────────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════
   HOMEPAGE — LIGHT THEME
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leistungenOpen, setLeistungenOpen] = useState(false);
  const leistungenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        leistungenRef.current &&
        !leistungenRef.current.contains(e.target as Node)
      ) {
        setLeistungenOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#2563EB]/20 selection:text-[#0F172A] overflow-x-hidden">
      {/* ─── STICKY NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#E2E8F0] ${
          navScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm"
            : "bg-white/60 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Smart Signals"
              className="h-9"
            />
          </Link>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Leistungen dropdown */}
            <div ref={leistungenRef} className="relative">
              <button
                onClick={() => setLeistungenOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                Leistungen
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    leistungenOpen ? "rotate-180" : ""
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
              {leistungenOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden">
                  <a
                    href="https://company-phone.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3 text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                    onClick={() => setLeistungenOpen(false)}
                  >
                    Company Phone ↗
                  </a>
                  <a
                    href="https://www.comms-connect.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3 text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                    onClick={() => setLeistungenOpen(false)}
                  >
                    Mobilfunk ↗
                  </a>
                  <a
                    href="https://case-connect.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3 text-sm text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
                    onClick={() => setLeistungenOpen(false)}
                  >
                    5G Koffersystem ↗
                  </a>
                </div>
              )}
            </div>

            <Link
              href="/unternehmen"
              className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Unternehmen
            </Link>
            <Link
              href="/partner"
              className="text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Karriere
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:inline-block text-sm text-[#475569] hover:text-[#0F172A] transition-colors"
            >
              Partner Login
            </Link>
            <Link
              href="/kontaktanfrage"
              className="hidden sm:inline-block bg-[#2563EB] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Jetzt beraten lassen
            </Link>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Men&uuml;"
            >
              <span
                className={`block w-5 h-0.5 bg-[#0F172A] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#0F172A] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[#0F172A] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden border-t border-[#E2E8F0] bg-white transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-4 space-y-1">
            <p className="text-[#94A3B8] text-xs uppercase tracking-widest pt-2 pb-1">
              Leistungen
            </p>
            <a href="https://company-phone.de" target="_blank" rel="noopener noreferrer" className="block py-3 pl-4 text-[#475569] hover:text-[#0F172A] transition-colors" onClick={() => setMobileMenuOpen(false)}>Company Phone ↗</a>
            <a href="https://www.comms-connect.de" target="_blank" rel="noopener noreferrer" className="block py-3 pl-4 text-[#475569] hover:text-[#0F172A] transition-colors" onClick={() => setMobileMenuOpen(false)}>Mobilfunk ↗</a>
            <a href="https://case-connect.de" target="_blank" rel="noopener noreferrer" className="block py-3 pl-4 text-[#475569] hover:text-[#0F172A] transition-colors" onClick={() => setMobileMenuOpen(false)}>5G Koffersystem ↗</a>
            <Link
              href="/unternehmen"
              className="block py-3 text-[#475569] hover:text-[#0F172A] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Unternehmen
            </Link>
            <Link
              href="/partner"
              className="block py-3 text-[#475569] hover:text-[#0F172A] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Karriere
            </Link>
            <Link
              href="/login"
              className="block py-3 text-[#475569] hover:text-[#0F172A] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner Login
            </Link>
            <Link
              href="/kontaktanfrage"
              className="block mt-2 text-center bg-[#2563EB] text-white font-semibold py-3 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jetzt beraten lassen
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC]">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2563EB]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#16A34A]/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border border-[#2563EB]/20 bg-[#EFF6FF] text-[#2563EB] text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8">
              Digitale Infrastruktur f&uuml;r den Mittelstand
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[#0F172A]"
          >
            Smarte L&ouml;sungen.
            <br />
            <span className="text-[#2563EB]">
              Messbare Ergebnisse.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#475569] text-lg md:text-xl max-w-3xl mx-auto mb-12"
          >
            Steuerlich beg&uuml;nstigte Mitarbeiter-Benefits. Optimierte
            Mobilfunkkosten. 5G Enterprise-Netzwerke. Alles aus einer Hand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/kontaktanfrage"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-lg text-base hover:bg-[#1D4ED8] transition-colors shadow-lg shadow-[#2563EB]/20"
            >
              Jetzt beraten lassen
              <span className="text-lg">&rarr;</span>
            </Link>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#0F172A] font-semibold px-8 py-3.5 rounded-lg text-base hover:border-[#94A3B8] hover:bg-[#F8FAFC] transition-colors"
            >
              Leistungen entdecken
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-[#EFF6FF] border-2 border-white flex items-center justify-center text-[9px] text-[#2563EB] font-medium shadow-sm"
                >
                  {["TW", "MK", "SR", "JL"][i]}
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8] text-sm">
              <span className="text-[#475569] font-medium">
                500+ Unternehmen
              </span>{" "}
              vertrauen uns im DACH-Raum
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: PRODUKTE / LEISTUNGEN ─── */}
      <Section className="py-24 bg-[#F8FAFC] px-4 sm:px-6" id="leistungen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#0F172A] text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Unsere L&ouml;sungen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#475569] text-lg"
            >
              Drei Produkte. Ein Ansprechpartner. Maximaler Mehrwert.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Company Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">&#x1F4F1;</span>
                  <span className="text-[10px] text-[#475569] border border-[#E2E8F0] rounded-full px-3 py-1 font-medium bg-[#F8FAFC]">
                    Mitarbeiter-Benefit
                  </span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-xl mb-3">
                  Company Phone
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6">
                  Steuerlich beg&uuml;nstigtes Smartphone-Leasing f&uuml;r Ihre
                  Mitarbeiter. 0&euro; Kosten f&uuml;r den Arbeitgeber. Auch
                  f&uuml;r Familienmitglieder.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Steuervorteil \u00A73 EStG",
                    "0\u20AC AG-Kosten",
                    "Auch f\u00FCr Familie",
                  ].map((point) => (
                    <span
                      key={point}
                      className="text-[11px] text-[#2563EB] bg-[#EFF6FF] rounded-full px-3 py-1 font-medium"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href="https://company-phone.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
                  >
                    Mehr erfahren ↗
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Mobilfunk Optimierung */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">&#x1F4F6;</span>
                  <span className="text-[10px] text-[#475569] border border-[#E2E8F0] rounded-full px-3 py-1 font-medium bg-[#F8FAFC]">
                    Kostenoptimierung
                  </span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-xl mb-3">
                  Mobilfunk Optimierung
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6">
                  Bis zu 30% weniger Mobilfunkkosten durch
                  Volumenb&uuml;ndelung. Wir verhandeln f&uuml;r Sie wie ein
                  Konzern.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Bis zu 30% sparen",
                    "Alle Netze",
                    "Lifecycle Management",
                  ].map((point) => (
                    <span
                      key={point}
                      className="text-[11px] text-[#2563EB] bg-[#EFF6FF] rounded-full px-3 py-1 font-medium"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href="https://www.comms-connect.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
                  >
                    Mehr erfahren ↗
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — 5G Koffersystem */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">&#x1F4E1;</span>
                  <span className="text-[10px] text-[#475569] border border-[#E2E8F0] rounded-full px-3 py-1 font-medium bg-[#F8FAFC]">
                    Enterprise-Netzwerk
                  </span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-xl mb-3">
                  5G Koffersystem
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-6">
                  Mobiles Enterprise-WLAN in unter 60 Sekunden.
                  IP67-gesch&uuml;tzt. Dual-SIM mit Auto-Failover.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "In <60s online",
                    "IP67 gesch\u00FCtzt",
                    "Starlink-kompatibel",
                  ].map((point) => (
                    <span
                      key={point}
                      className="text-[11px] text-[#2563EB] bg-[#EFF6FF] rounded-full px-3 py-1 font-medium"
                    >
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href="https://case-connect.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
                  >
                    Mehr erfahren ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── SECTION 3: WARUM SMART SIGNALS ─── */}
      <Section className="py-24 bg-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#0F172A] text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Warum Smart Signals?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#475569] text-lg"
            >
              Ihr zuverl&auml;ssiger Partner f&uuml;r digitale Infrastruktur
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                ),
                title: "Ein Ansprechpartner",
                description:
                  "F\u00FCr alle drei Produkte. Kein Vendor-Hopping, keine Abstimmungsprobleme.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                ),
                title: "Mittelstand-Expertise",
                description:
                  "\u00DCber 500 Unternehmen vertrauen uns. Wir kennen Ihre Herausforderungen.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                ),
                title: "Messbare Ergebnisse",
                description:
                  "Transparente Einsparungen vom ersten Tag an. Klar dokumentiert.",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                ),
                title: "Pers\u00F6nliche Beratung",
                description:
                  "Kein Callcenter. Ihr pers\u00F6nlicher Berater vor Ort.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-[#E2E8F0] bg-white rounded-xl p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-[#0F172A] font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SECTION 4: SOCIAL PROOF ─── */}
      <Section className="py-24 bg-[#F8FAFC] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-10 md:p-14 mb-16 shadow-sm relative overflow-hidden"
          >
            {/* Blue left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB]" />
            <div className="pl-6">
              <svg
                className="w-10 h-10 text-[#2563EB]/20 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <blockquote className="text-[#0F172A] text-lg md:text-xl leading-relaxed mb-6 max-w-3xl">
                &bdquo;Smart Signals hat unsere Mobilfunkkosten um 28% gesenkt und
                ein attraktives Benefit-Programm f&uuml;r unsere 120 Mitarbeiter
                eingef&uuml;hrt. Die Zusammenarbeit ist unkompliziert und professionell.&ldquo;
              </blockquote>
              <div>
                <p className="text-[#0F172A] font-semibold text-sm">
                  Thomas Weber, Gesch&auml;ftsf&uuml;hrer
                </p>
                <p className="text-[#94A3B8] text-sm mt-1">
                  BauTech M&uuml;nchen GmbH
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "500+", label: "Kunden" },
              { value: "30%", label: "\u00D8 Ersparnis" },
              { value: "0\u20AC", label: "AG-Kosten" },
              { value: "<60s", label: "5G online" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 text-center shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#2563EB]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[#475569] text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SECTION 5: CTA ─── */}
      <section className="relative py-32 bg-[#2563EB] px-4 sm:px-6 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.05] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Lassen Sie sich unverbindlich beraten
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Wir analysieren Ihr Einsparpotenzial &mdash; kostenlos und ohne
              Verpflichtung.
            </p>

            <Link
              href="/kontaktanfrage"
              className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#F8FAFC] transition-colors shadow-lg"
            >
              Jetzt Beratung anfordern
              <span className="text-xl">&rarr;</span>
            </Link>

            <p className="text-white/60 text-sm mt-6">
              Oder rufen Sie an:{" "}
              <a
                href="tel:+4915254564856"
                className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
              >
                +49 (0) 15254564856
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 6: KARRIERE TEASER ─── */}
      <Section className="py-16 bg-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border border-[#E2E8F0] bg-[#F8FAFC] rounded-2xl p-8 md:p-12">
          <div>
            <h3 className="text-[#0F172A] font-bold text-2xl mb-3">
              Karriere bei Smart Signals
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed max-w-lg">
              Werden Sie Teil unseres Vertriebsteams und beraten Sie Unternehmen
              zu digitalen L&ouml;sungen.
            </p>
          </div>
          <Link
            href="/partner"
            className="shrink-0 inline-flex items-center gap-2 border border-[#E2E8F0] bg-white text-[#0F172A] font-semibold px-6 py-3 rounded-lg text-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-sm"
          >
            Mehr erfahren &rarr;
          </Link>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            {/* Logo column */}
            <div>
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Smart Signals"
                  className="h-10"
                />
              </Link>
              <p className="mt-4 text-[#475569] text-sm">
                Digitale L&ouml;sungen f&uuml;r den Mittelstand
              </p>
            </div>

            {/* Leistungen */}
            <div>
              <h4 className="text-[#0F172A] text-xs font-semibold uppercase tracking-widest mb-4">
                Leistungen
              </h4>
              <div className="space-y-3">
                <a href="https://company-phone.de" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors">Company Phone ↗</a>
                <a href="https://www.comms-connect.de" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors">Mobilfunk Optimierung ↗</a>
                <a href="https://case-connect.de" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors">5G Koffersystem ↗</a>
              </div>
            </div>

            {/* Karriere */}
            <div>
              <h4 className="text-[#0F172A] text-xs font-semibold uppercase tracking-widest mb-4">
                Karriere
              </h4>
              <div className="space-y-3">
                <Link
                  href="/partner"
                  className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  Partner werden
                </Link>
                <Link
                  href="/login"
                  className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  Partner Login
                </Link>
              </div>
            </div>

            {/* Rechtliches */}
            <div>
              <h4 className="text-[#0F172A] text-xs font-semibold uppercase tracking-widest mb-4">
                Rechtliches
              </h4>
              <div className="space-y-3">
                <Link
                  href="/datenschutz"
                  className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  Datenschutzerkl&auml;rung
                </Link>
                <Link
                  href="/impressum"
                  className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  href="/kontaktanfrage"
                  className="block text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-8">
            <span className="text-[#94A3B8] text-xs">
              &copy; {new Date().getFullYear()} Smart Signals. Alle Rechte
              vorbehalten.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
