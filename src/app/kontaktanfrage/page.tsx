"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { kontaktProduktOptionen } from "@/lib/produkte";

export default function KontaktanfragePage() {
  const [form, setForm] = useState({
    anrede: "",
    firmenname: "",
    email: "",
    telefon: "",
    produkt: "",
    mitarbeiteranzahl: "",
    beschreibung: "",
  });
  const [honey, setHoney] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _honey: honey }),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@smart-signals.de."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-white pt-28 pb-32">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Kontaktanfrage
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Wir freuen uns auf Ihre Anfrage. Füllen Sie das Formular aus und wir
            melden uns schnellstmöglich bei Ihnen.
          </p>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Vielen Dank!
              </h2>
              <p className="text-lg text-text-secondary">
                Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in
                Kürze bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot — für Menschen unsichtbar, Bots füllen es aus */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="company_website">Website</label>
                <input
                  id="company_website"
                  name="_honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                />
              </div>
              {/* Anrede */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="anrede"
                    value="Herr"
                    checked={form.anrede === "Herr"}
                    onChange={handleChange}
                    className="w-4 h-4 text-brand accent-brand"
                  />
                  <span className="text-text-secondary">Herr</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="anrede"
                    value="Frau"
                    checked={form.anrede === "Frau"}
                    onChange={handleChange}
                    className="w-4 h-4 text-brand accent-brand"
                  />
                  <span className="text-text-secondary">Frau</span>
                </label>
              </div>

              {/* Firmenname */}
              <div>
                <label
                  htmlFor="firmenname"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Firmenname
                </label>
                <input
                  type="text"
                  id="firmenname"
                  name="firmenname"
                  value={form.firmenname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                  placeholder="Ihre Firma"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                  placeholder="ihre@email.de"
                />
              </div>

              {/* Telefon */}
              <div>
                <label
                  htmlFor="telefon"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                  placeholder="+49 ..."
                />
              </div>

              {/* Produktauswahl */}
              <div>
                <label
                  htmlFor="produkt"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Produktauswahl
                </label>
                <select
                  id="produkt"
                  name="produkt"
                  value={form.produkt}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition appearance-none"
                >
                  <option value="">Wählen Sie eine Option</option>
                  {kontaktProduktOptionen.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mitarbeiteranzahl */}
              <div>
                <label
                  htmlFor="mitarbeiteranzahl"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Mitarbeiteranzahl
                </label>
                <select
                  id="mitarbeiteranzahl"
                  name="mitarbeiteranzahl"
                  value={form.mitarbeiteranzahl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition appearance-none"
                >
                  <option value="">Wählen Sie eine Option</option>
                  <option value="0-50">0–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-500">100–500</option>
                  <option value="500+">500+</option>
                </select>
              </div>

              {/* Beschreibung */}
              <div>
                <label
                  htmlFor="beschreibung"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Beschreibung{" "}
                  <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  id="beschreibung"
                  name="beschreibung"
                  value={form.beschreibung}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition resize-none"
                  placeholder="Wie können wir Ihnen helfen?"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-danger text-center">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Wird gesendet …" : "Anfrage einreichen"}
              </button>

              <p className="text-xs text-text-muted text-center">
                Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
              </p>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
