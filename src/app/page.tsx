"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

/* ─────────────────────────────────────────────
   SVG ICONS (24x24, stroke, no fill)
   ───────────────────────────────────────────── */
const DeviceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12" y2="18.01" />
  </svg>
);

const SignalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01" />
    <path d="M7 20v-4" />
    <path d="M12 20v-8" />
    <path d="M17 20v-12" />
    <path d="M22 20v-16" />
  </svg>
);

const WifiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114 0" />
    <path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <line x1="12" y1="20" x2="12" y2="20.01" />
  </svg>
);

/* ═══════════════════════════════════════════════
   HOMEPAGE — HELL & FREUNDLICH
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#2563EB] selection:text-white overflow-x-hidden">
        {/* ─── SECTION 1: HERO ─── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden bg-white">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(226,232,240,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Soft blue glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563EB]/[0.04] rounded-full blur-[150px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8">
                B2B Solutions f&uuml;r den Mittelstand
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[#0F172A]"
            >
              Smarte B2B L&ouml;sungen f&uuml;r
              <br />
              <span className="text-[#2563EB]">
                Konnektivit&auml;t, Mobilit&auml;t
              </span>
              <br />
              und Mitarbeiter-Benefits
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#475569] text-lg md:text-xl max-w-3xl mx-auto mb-12"
            >
              Wir verbinden Unternehmen mit skalierbaren L&ouml;sungen f&uuml;r moderne Arbeitswelten
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a
                href="#produkte"
                className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-lg text-base hover:bg-[#1D4ED8] transition-colors shadow-lg shadow-[#2563EB]/20"
              >
                L&ouml;sungen entdecken
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#0F172A] font-semibold px-8 py-3.5 rounded-lg text-base hover:border-[#94A3B8] hover:bg-[#F8FAFC] transition-colors"
              >
                Beratung anfragen
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[#94A3B8] text-sm"
            >
              <span className="text-[#475569] font-medium">500+ Unternehmen</span>{" "}
              im DACH-Raum vertrauen uns
            </motion.p>
          </div>
        </section>

        {/* ─── SECTION 2: PRODUKTUBERSICHT ─── */}
        <Section className="py-24 bg-[#F8FAFC] px-4 sm:px-6" id="produkte">
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
                <a
                  href="https://company-phone.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-[#E2E8F0] rounded-xl p-8 h-full hover:border-[#2563EB] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-5 text-[#2563EB]">
                    <DeviceIcon />
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-xl mb-1">Company Phone</h3>
                  <p className="text-[#94A3B8] text-sm mb-6">Mitarbeiter-Benefits &amp; Ger&auml;te-Leasing</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Problem</span>
                      <p className="text-[#475569] text-sm mt-1">Mitarbeiterbindung ist teuer und klassische Benefits verpuffen</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">L&ouml;sung</span>
                      <p className="text-[#475569] text-sm mt-1">Steueroptimierte Ger&auml;teprogramme &uuml;ber die Gehaltsabrechnung</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Ergebnis</span>
                      <p className="text-[#0F172A] text-sm mt-1 font-medium">Attraktiver Arbeitgeber. 0&euro; Kosten. Zufriedene Mitarbeiter.</p>
                    </div>
                  </div>

                  <div className="text-[#2563EB] text-sm font-semibold flex items-center gap-1">
                    Mehr erfahren
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </div>
                </a>
              </motion.div>

              {/* Card 2 — Mobilfunk */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <a
                  href="https://www.comms-connect.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-[#E2E8F0] rounded-xl p-8 h-full hover:border-[#2563EB] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-5 text-[#2563EB]">
                    <SignalIcon />
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-xl mb-1">Mobilfunk &amp; Business L&ouml;sungen</h3>
                  <p className="text-[#94A3B8] text-sm mb-6">Kostenoptimierung &amp; Volumenb&uuml;ndelung</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Problem</span>
                      <p className="text-[#475569] text-sm mt-1">Zu hohe Mobilfunkkosten und ineffiziente Vertr&auml;ge</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">L&ouml;sung</span>
                      <p className="text-[#475569] text-sm mt-1">Optimierung und B&uuml;ndelung &uuml;ber unser Partnernetzwerk</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Ergebnis</span>
                      <p className="text-[#0F172A] text-sm mt-1 font-medium">Bis zu 30% weniger Kosten. Bessere Leistung.</p>
                    </div>
                  </div>

                  <div className="text-[#2563EB] text-sm font-semibold flex items-center gap-1">
                    Mehr erfahren
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </div>
                </a>
              </motion.div>

              {/* Card 3 — 5G Koffer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <a
                  href="https://case-connect.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white border border-[#E2E8F0] rounded-xl p-8 h-full hover:border-[#2563EB] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-5 text-[#2563EB]">
                    <WifiIcon />
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-xl mb-1">5G Koffersystem</h3>
                  <p className="text-[#94A3B8] text-sm mb-6">Enterprise-WLAN in Sekunden</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Problem</span>
                      <p className="text-[#475569] text-sm mt-1">Kein Internet auf Baustellen, Events oder tempor&auml;ren Standorten</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">L&ouml;sung</span>
                      <p className="text-[#475569] text-sm mt-1">Sofort einsatzbereite 5G Infrastruktur im Koffer</p>
                    </div>
                    <div>
                      <span className="text-[#2563EB] text-[10px] font-semibold uppercase tracking-widest">Ergebnis</span>
                      <p className="text-[#0F172A] text-sm mt-1 font-medium">In &lt;60s online. IP67. Dual-SIM. &Uuml;berall.</p>
                    </div>
                  </div>

                  <div className="text-[#2563EB] text-sm font-semibold flex items-center gap-1">
                    Mehr erfahren
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </div>
                </a>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  ),
                  title: "Ein Partner f\u00FCr alles",
                  description: "Konnektivit\u00E4t, Benefits und Mobilfunk aus einer Hand.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  ),
                  title: "Skalierbare L\u00F6sungen",
                  description: "F\u00FCr 10 oder 10.000 Mitarbeiter. Wir wachsen mit Ihrem Unternehmen.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                  title: "Starke Partner",
                  description: "Vodafone, Telekom, O2 \u2014 wir arbeiten mit den Besten.",
                },
                {
                  icon: (
                    <svg className="w-7 h-7" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  ),
                  title: "Pers\u00F6nliche Betreuung",
                  description: "Ihr Ansprechpartner vor Ort. Kein Callcenter.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-8 hover:border-[#2563EB]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-4 text-[#2563EB]">
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

        {/* ─── SECTION 4: USE CASES ─── */}
        <Section className="py-24 bg-[#F8FAFC] px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[#0F172A] text-4xl md:text-5xl font-bold tracking-tight mb-4"
              >
                In der Praxis
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  question: "Baustelle ohne Netz?",
                  answer: "5G Koffer aufstellen. In 60 Sekunden online.",
                  href: "https://case-connect.de",
                },
                {
                  question: "Mitarbeiter binden?",
                  answer: "Smartphones als Benefit. Steuerlich optimiert. 0\u20AC f\u00FCr den AG.",
                  href: "https://company-phone.de",
                },
                {
                  question: "Mobilfunk zu teuer?",
                  answer: "Vertr\u00E4ge b\u00FCndeln. Bis zu 30% sparen. Sofort.",
                  href: "https://www.comms-connect.de",
                },
              ].map((item, i) => (
                <motion.a
                  key={item.question}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group block border border-[#E2E8F0] bg-white rounded-xl p-6 hover:border-[#2563EB]/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1 text-[#2563EB]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#0F172A] font-semibold mb-1">{item.question}</p>
                      <p className="text-[#475569] text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── SECTION 5: PARTNER / NETZWERK ─── */}
        <Section className="py-20 bg-white px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-8 md:p-12"
            >
              <h3 className="text-[#0F172A] font-bold text-2xl mb-3">
                Teil unseres Netzwerks werden
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-6">
                F&uuml;r Vertriebspartner, die hochwertige B2B-L&ouml;sungen verkaufen und skalieren wollen.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {["Echte Produkte", "Klare Struktur", "Skalierbares Modell"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#475569] text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/partner"
                className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8] transition-colors"
              >
                Partner werden
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* ─── SECTION 6: CTA ─── */}
        <section className="relative py-32 bg-[#2563EB] px-4 sm:px-6 overflow-hidden">
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
                Jetzt Beratung anfragen
              </h2>
              <p className="text-white/80 text-lg mb-10">
                Wir analysieren Ihre Situation und zeigen Ihnen konkrete Einsparpotenziale.
              </p>

              <Link
                href="/kontaktanfrage"
                className="inline-flex items-center gap-2 bg-white text-[#2563EB] font-semibold px-10 py-4 rounded-lg text-lg hover:bg-[#F8FAFC] transition-colors shadow-lg"
              >
                Beratung anfragen
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
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
              <p className="text-white/50 text-xs mt-2">Kostenlos &amp; unverbindlich</p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
