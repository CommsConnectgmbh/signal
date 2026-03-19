"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import SpotlightCard from "./ui/SpotlightCard";
import Meteors from "./ui/Meteors";
import NumberTicker from "./ui/NumberTicker";

/* ─────────────────────────────────────────────
   ANIMATED COUNTER HOOK
   ───────────────────────────────────────────── */
function useCounter(end: number, duration = 2000, startOnView = false, ref?: React.RefObject<HTMLElement | null>) {
  const [count, setCount] = useState(0);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once: true, amount: 0.3 });

  useEffect(() => {
    if (startOnView && !inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startOnView, inView]);

  return count;
}

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
   KPI TILE
   ───────────────────────────────────────────── */
function KpiTile({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 2200, true, ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="border border-[#1E293B] bg-[#111D33] rounded-lg p-8 text-center"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4A843] to-[#F59E0B] bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="mt-3 text-[#94A3B8] text-sm tracking-wide">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STEP COMPONENT
   ───────────────────────────────────────────── */
function Step({
  number,
  title,
  description,
  delay,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="flex-1 relative"
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="w-12 h-12 rounded-full border-2 border-[#D4A843] flex items-center justify-center text-[#D4A843] font-bold text-lg mb-4">
          {number}
        </div>
        <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[220px]">
          {description}
        </p>
      </div>
      {!isLast && (
        <>
          <div className="hidden md:block absolute top-6 left-[calc(50%+30px)] right-[-30px] h-px bg-gradient-to-r from-[#D4A843]/60 to-[#D4A843]/10" />
          <div className="md:hidden w-px h-8 bg-gradient-to-b from-[#D4A843]/60 to-[#D4A843]/10 mx-auto mt-4" />
        </>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
   ───────────────────────────────────────────── */
function ProductCard({
  icon,
  title,
  problem,
  solution,
  target,
  delay,
  href,
}: {
  icon: string;
  title: string;
  problem: string;
  solution: string;
  target: string;
  delay: number;
  href: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
    <Link href={href}>
    <SpotlightCard className="p-8 flex flex-col h-full cursor-pointer">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-white font-bold text-xl mb-6">{title}</h3>

      <div className="space-y-4 flex-1">
        <div>
          <span className="text-[#D4A843] text-xs font-semibold uppercase tracking-wider">
            Problem &rarr;
          </span>
          <p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">
            {problem}
          </p>
        </div>
        <div>
          <span className="text-[#D4A843] text-xs font-semibold uppercase tracking-wider">
            L&ouml;sung &rarr;
          </span>
          <p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">
            {solution}
          </p>
        </div>
        <div>
          <span className="text-[#D4A843] text-xs font-semibold uppercase tracking-wider">
            Zielkunde &rarr;
          </span>
          <p className="text-[#94A3B8] text-sm mt-1 leading-relaxed">
            {target}
          </p>
        </div>
      </div>
      <div className="mt-6 text-[#D4A843] text-sm font-semibold">
        Mehr erfahren &rarr;
      </div>
    </SpotlightCard>
    </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   INCOME TIER
   ───────────────────────────────────────────── */
function IncomeTier({
  tier,
  deals,
  income,
  description,
  highlight,
  barHeight,
  delay,
}: {
  tier: string;
  deals: string;
  income: string;
  description: string;
  highlight: boolean;
  barHeight: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={`border rounded-lg p-8 text-center flex flex-col items-center ${
        highlight
          ? "border-[#D4A843] bg-[#111D33] ring-1 ring-[#D4A843]/20"
          : "border-[#1E293B] bg-[#0A1628]"
      }`}
    >
      {highlight && (
        <span className="text-[10px] uppercase tracking-widest text-[#D4A843] font-semibold mb-2">
          Beliebteste Stufe
        </span>
      )}
      <h3 className="text-white font-bold text-lg mb-1">{tier}</h3>
      <p className="text-[#64748B] text-sm mb-6">{deals}</p>

      {/* Bar visualization */}
      <div className="w-16 bg-[#1E293B] rounded-t-md mb-4 flex items-end justify-center overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: barHeight }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-gradient-to-t from-[#D4A843] to-[#F59E0B] rounded-t-md"
        />
      </div>

      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4A843] to-[#F59E0B] bg-clip-text text-transparent mb-2">
        {income}
      </div>
      <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[240px]">
        {description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE CARD
   ───────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className="border border-[#1E293B] bg-[#111D33] rounded-lg p-6"
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function PartnerClient() {
  const [formData, setFormData] = useState({
    name: "",
    erfahrung: "",
    einkommen: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-[#F1F5F9] selection:bg-[#D4A843]/30 selection:text-white overflow-x-hidden">
      {/* ─── STICKY NAV ─── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#1E293B] ${
          navScrolled
            ? "bg-[#050A14]/90 backdrop-blur-xl"
            : "bg-[#050A14]/60 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Smart Signals" className="h-8 brightness-0 invert" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/mitarbeitervorteile" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Benefits</Link>
            <Link href="/mobilfunkkosten" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Mobilfunk</Link>
            <Link href="/5g-koffer" className="text-sm text-[#94A3B8] hover:text-white transition-colors">5G Koffer</Link>
            <Link href="/unternehmen" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Unternehmen</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-block text-sm text-[#94A3B8] hover:text-white transition-colors">
              Partner Login
            </Link>
            <a
              href="#bewerben"
              className="hidden sm:inline-block bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Als Partner bewerben
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menü"
            >
              <span className={`block w-5 h-0.5 bg-[#F1F5F9] transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#F1F5F9] transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#F1F5F9] transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden border-t border-[#1E293B] bg-[#050A14] transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
          <div className="px-4 pt-4 space-y-1">
            <Link href="/mitarbeitervorteile" className="block py-3 text-[#94A3B8] hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Mitarbeitervorteile</Link>
            <Link href="/mobilfunkkosten" className="block py-3 text-[#94A3B8] hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Mobilfunkkosten senken</Link>
            <Link href="/5g-koffer" className="block py-3 text-[#94A3B8] hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>5G Koffersystem</Link>
            <Link href="/unternehmen" className="block py-3 text-[#94A3B8] hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Unternehmen</Link>
            <Link href="/login" className="block py-3 text-[#94A3B8] hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Partner Login</Link>
            <a href="#bewerben" className="block mt-2 text-center bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] font-semibold py-3 rounded-md" onClick={() => setMobileMenuOpen(false)}>Als Partner bewerben</a>
          </div>
        </div>
      </nav>

      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        {/* Meteors (Aceternity UI) */}
        <Meteors count={15} />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border border-[#D4A843]/40 bg-[#D4A843]/10 text-[#D4A843] text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-8">
              High Performance Sales Network
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Baue dein eigenes
            <br />
            <span className="bg-gradient-to-r from-[#D4A843] to-[#F59E0B] bg-clip-text text-transparent">
              B2B Vertriebsbusiness
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Skalierbare Produkte. Klare Provision. System statt Chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10"
          >
            {[
              "Wiederkehrende Ums\u00e4tze",
              "Fertige Produkte",
              "Skalierbares System",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-px bg-[#D4A843]" />
                <span className="text-[#94A3B8] text-sm">{text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href="#bewerben"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] font-semibold px-8 py-3.5 rounded-md text-base hover:opacity-90 transition-opacity"
            >
              Als Partner bewerben
              <span className="text-lg">&rarr;</span>
            </a>
            <p className="text-[#64748B] text-xs">
              Kein MLM. Kein Franchise. Ein echtes B2B Vertriebssystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: SOCIAL PROOF / KPI TILES ─── */}
      <Section className="py-24 bg-[#0A1628] px-4 sm:px-6" id="performance">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#D4A843] text-xs font-semibold uppercase tracking-[0.25em] mb-12 text-center"
          >
            Performance
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {[
              { value: 127, suffix: "+", label: "Aktive Partner" },
              { value: 2, suffix: "M €", label: "Monatlicher Umsatz" },
              { value: 18500, suffix: " €", label: "Top Performer / Monat" },
              { value: 98, suffix: "%", label: "Retention Rate" },
            ].map((kpi, i) => (
              <SpotlightCard key={kpi.label} className="p-8 text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4A843] to-[#F59E0B] bg-clip-text text-transparent">
                  <NumberTicker value={kpi.value} suffix={kpi.suffix} />
                </p>
                <p className="mt-2 text-sm text-[#94A3B8]">{kpi.label}</p>
              </SpotlightCard>
            ))}
          </div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <h3 className="text-white font-semibold text-lg mb-6 text-center">
              Top Performer Q1 2026
            </h3>
            <div className="border border-[#1E293B] rounded-lg overflow-hidden">
              {[
                {
                  rank: "#1",
                  name: "M. K.",
                  region: "M\u00fcnchen",
                  revenue: "18.500 \u20ac",
                  highlight: true,
                },
                {
                  rank: "#2",
                  name: "S. R.",
                  region: "Hamburg",
                  revenue: "14.200 \u20ac",
                  highlight: false,
                },
                {
                  rank: "#3",
                  name: "T. W.",
                  region: "Berlin",
                  revenue: "11.800 \u20ac",
                  highlight: false,
                },
              ].map((row, i) => (
                <div
                  key={row.rank}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < 2 ? "border-b border-[#1E293B]" : ""
                  } ${row.highlight ? "bg-[#D4A843]/[0.05]" : "bg-[#111D33]"}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-bold w-6 ${
                        row.highlight ? "text-[#D4A843]" : "text-[#64748B]"
                      }`}
                    >
                      {row.rank}
                    </span>
                    <span className="text-white font-medium text-sm">
                      {row.name}
                    </span>
                    <span className="text-[#64748B] text-sm hidden sm:inline">
                      {row.region}
                    </span>
                  </div>
                  <span
                    className={`font-semibold text-sm ${
                      row.highlight ? "text-[#D4A843]" : "text-[#94A3B8]"
                    }`}
                  >
                    {row.revenue}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Logo row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-10 md:gap-16"
          >
            {["Vodafone", "Telekom", "O2", "Samsung"].map((name) => (
              <span
                key={name}
                className="text-[#64748B]/60 text-sm md:text-base font-medium tracking-wider"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── SECTION 3: DAS SYSTEM ─── */}
      <Section className="py-24 bg-[#050A14] px-4 sm:px-6" id="system">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Das System
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#94A3B8] text-lg"
            >
              Vom Einstieg zum skalierbaren Business in 4 Schritten.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4">
            <Step
              number="01"
              title="Einstieg"
              description="Onboarding, Tools und erstes Training in 48h."
              delay={0}
              isLast={false}
            />
            <Step
              number="02"
              title="Verkaufen"
              description="Fertige Produkte an Unternehmen im Mittelstand."
              delay={0.15}
              isLast={false}
            />
            <Step
              number="03"
              title="Verdienen"
              description="Direkte Provision ab dem ersten Deal."
              delay={0.3}
              isLast={false}
            />
            <Step
              number="04"
              title="Skalieren"
              description="Eigenes Team aufbauen. Recurring Revenue."
              delay={0.45}
              isLast={true}
            />
          </div>
        </div>
      </Section>

      {/* ─── SECTION 4: PRODUKTE ─── */}
      <Section className="py-24 bg-[#0A1628] px-4 sm:px-6" id="produkte">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Was du verkaufst
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              icon="&#x1F4F6;"
              title="5G Koffersystem"
              problem="Unternehmen ohne Internet auf Baustellen, Events, in Kellern."
              solution="Mobiles 5G-Netzwerk in 60 Sekunden. IP67. Dual-SIM."
              target="Bau, Events, Industrie, IT-Abteilungen"
              href="/5g-koffer"
              delay={0}
            />
            <ProductCard
              icon="&#x1F4F1;"
              title="Company Phone"
              problem="Mitarbeiter wollen moderne Ger&auml;te. Unternehmen scheuen Kosten."
              solution="Steuerlich beg&uuml;nstigtes Leasing &uuml;ber die Gehaltsabrechnung. 0&euro; f&uuml;r AG."
              target="HR-Abteilungen, Gesch&auml;ftsf&uuml;hrer, 50-500 MA"
              href="/mitarbeitervorteile"
              delay={0.15}
            />
            <ProductCard
              icon="&#x1F4C9;"
              title="Mobilfunk Optimierung"
              problem="Mittelstand zahlt zu viel f&uuml;r Mobilfunk. Keine Verhandlungsmacht."
              solution="Volumenb&uuml;ndelung. Bis zu 30% weniger. Lifecycle Management."
              target="Gesch&auml;ftsf&uuml;hrer, IT-Leiter, Einkauf"
              href="/mobilfunkkosten"
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      {/* ─── SECTION 5: EINKOMMEN ─── */}
      <Section className="py-24 bg-[#050A14] px-4 sm:px-6" id="einkommen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Dein Einkommen
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#94A3B8] text-lg"
            >
              Transparent. Planbar. Skalierbar.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <IncomeTier
              tier="Starter"
              deals="5 Deals / Monat"
              income="~2.500 &euro;"
              description="Erste Kunden, erstes Einkommen"
              highlight={false}
              barHeight="60px"
              delay={0}
            />
            <IncomeTier
              tier="Performer"
              deals="15 Deals / Monat"
              income="~7.500 &euro;"
              description="Vollzeit. Eigene Kunden. Bestand w&auml;chst."
              highlight={true}
              barHeight="120px"
              delay={0.15}
            />
            <IncomeTier
              tier="Leader"
              deals="Team + Bestand"
              income="10.000 &euro;+"
              description="Eigenes Team. Recurring Revenue. Skalierung."
              highlight={false}
              barHeight="180px"
              delay={0.3}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#64748B] text-xs text-center max-w-xl mx-auto"
          >
            Einkommen abh&auml;ngig von individueller Leistung. Keine Garantie.
            Echte Zahlen aus dem Netzwerk.
          </motion.p>
        </div>
      </Section>

      {/* ─── SECTION 6: SYSTEM & SUPPORT ─── */}
      <Section className="py-24 bg-[#0A1628] px-4 sm:px-6" id="tools">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Dein System. Deine Tools.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard
              icon="&#x1F4CA;"
              title="CRM &amp; Pipeline"
              description="Eigenes CRM f&uuml;r Leads, Deals und Follow-ups."
              delay={0}
            />
            <FeatureCard
              icon="&#x1F393;"
              title="Schulungen"
              description="W&ouml;chentliche Trainings. Sales Playbooks. 1:1 Coaching."
              delay={0.1}
            />
            <FeatureCard
              icon="&#x1F680;"
              title="Marketing Tools"
              description="Fertige Materialien, Landingpages und Gespr&auml;chsleitf&auml;den."
              delay={0.2}
            />
            <FeatureCard
              icon="&#x1F91D;"
              title="Community"
              description="Netzwerk aus Performern. Events. Masterminds."
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      {/* ─── SECTION 7: CTA / APPLICATION ─── */}
      <section
        id="bewerben"
        className="relative py-32 bg-[#050A14] px-4 sm:px-6 overflow-hidden"
      >
        {/* Gold radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A843]/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Bist du bereit, dein eigenes System aufzubauen?
            </h2>
            <p className="text-[#94A3B8] text-lg">
              Bewirb dich jetzt. Wir melden uns innerhalb von 24h.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center border border-[#D4A843]/30 bg-[#D4A843]/[0.05] rounded-lg p-12"
            >
              <div className="text-4xl mb-4">&#x2713;</div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Bewerbung erhalten
              </h3>
              <p className="text-[#94A3B8]">
                Wir melden uns innerhalb von 24 Stunden bei dir.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#94A3B8] mb-1.5 font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vor- und Nachname"
                  className="w-full bg-[#111D33] border border-[#1E293B] text-white rounded-md px-4 py-3 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 transition-colors"
                />
              </div>

              {/* Erfahrung */}
              <div>
                <label
                  htmlFor="erfahrung"
                  className="block text-sm text-[#94A3B8] mb-1.5 font-medium"
                >
                  Vertriebserfahrung
                </label>
                <select
                  id="erfahrung"
                  name="erfahrung"
                  required
                  value={formData.erfahrung}
                  onChange={handleChange}
                  className="w-full bg-[#111D33] border border-[#1E293B] text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Bitte w&auml;hlen
                  </option>
                  <option value="keine">Keine</option>
                  <option value="1-2">1-2 Jahre Vertrieb</option>
                  <option value="3-5">3-5 Jahre Vertrieb</option>
                  <option value="5+">5+ Jahre Vertrieb</option>
                </select>
              </div>

              {/* Einkommen */}
              <div>
                <label
                  htmlFor="einkommen"
                  className="block text-sm text-[#94A3B8] mb-1.5 font-medium"
                >
                  Aktuelles Einkommen{" "}
                  <span className="text-[#64748B]">(optional)</span>
                </label>
                <select
                  id="einkommen"
                  name="einkommen"
                  value={formData.einkommen}
                  onChange={handleChange}
                  className="w-full bg-[#111D33] border border-[#1E293B] text-white rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 transition-colors appearance-none"
                >
                  <option value="">Bitte w&auml;hlen</option>
                  <option value="unter-3000">Unter 3.000&euro;</option>
                  <option value="3000-5000">3.000-5.000&euro;</option>
                  <option value="5000-10000">5.000-10.000&euro;</option>
                  <option value="ueber-10000">&Uuml;ber 10.000&euro;</option>
                </select>
              </div>

              {/* Motivation */}
              <div>
                <label
                  htmlFor="motivation"
                  className="block text-sm text-[#94A3B8] mb-1.5 font-medium"
                >
                  Motivation
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Warum willst du Partner werden?"
                  className="w-full bg-[#111D33] border border-[#1E293B] text-white rounded-md px-4 py-3 text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4A843] to-[#F59E0B] text-[#050A14] font-semibold py-3.5 rounded-md text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Jetzt bewerben
                <span>&rarr;</span>
              </button>

              <p className="text-[#64748B] text-xs text-center">
                100% vertraulich. Keine Verpflichtung.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#1E293B] bg-[#050A14] py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/">
                <img src="/logo.png" alt="Smart Signals" className="h-10 brightness-0 invert" />
              </Link>
              <p className="mt-4 text-[#64748B] text-sm">B2B Vertriebsbusiness für den Mittelstand</p>
            </div>
            <div>
              <h4 className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-4">Leistungen</h4>
              <div className="space-y-3">
                <Link href="/mitarbeitervorteile" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Mitarbeitervorteile</Link>
                <Link href="/mobilfunkkosten" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Mobilfunkkosten senken</Link>
                <Link href="/5g-koffer" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">5G Koffersystem</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-4">Unternehmen</h4>
              <div className="space-y-3">
                <Link href="/unternehmen" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Über uns</Link>
                <Link href="/karriere" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Karriere</Link>
                <Link href="/kontaktanfrage" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Kontakt</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[#D4A843] text-xs font-semibold uppercase tracking-widest mb-4">Rechtliches</h4>
              <div className="space-y-3">
                <Link href="/datenschutz" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Datenschutzerklärung</Link>
                <Link href="/impressum" className="block text-sm text-[#94A3B8] hover:text-white transition-colors">Impressum</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#1E293B] pt-8">
            <span className="text-[#64748B] text-xs">&copy; {new Date().getFullYear()} Smart Signals. Alle Rechte vorbehalten.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
